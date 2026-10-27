import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

import { getAvailability } from "@/components/gg/launch/data";
import { site } from "@/content/site";
import {
  EMAIL_RE,
  FORM_KINDS,
  INTENTS,
  LIMITS,
  PACKAGES,
  PLANS,
  REPLY_TIME,
  SERVICES,
  SIZES,
  TIMELINES,
  TOPICS,
  UTM_KEYS,
  cleanRef,
  cleanUtm,
  firstName,
  pick,
  type FormKind,
} from "@/lib/enquiryShared";
import { sendMail } from "@/lib/mailer";

/**
 * One endpoint for the redesigned forms: /start-project, /contact and the
 * /pricing quote form (formType start-project | contact | pricing-quote).
 *
 * WHAT IT DOES, in the order the Figma note asks for it:
 *  1. Same-origin and size checks.
 *  2. Spam: a filled honeypot ("website") or a submission under 3 seconds after
 *     the page loaded is answered like a success but nothing is sent. Never an
 *     error a bot can learn from, never an auto-reply.
 *  3. Validation again on the server (names, email, lengths, every whitelisted
 *     value). Unknown values are dropped, not echoed.
 *  4. Rate limit and duplicate suppression (in-process, per warm serverless
 *     instance: raises the cost of casual abuse, not a hard ceiling, as with
 *     /api/website-launch).
 *  5. The enquiry to the studio inbox. If this fails the visitor sees a
 *     failure. If it works the enquiry counts as sent, whatever happens next.
 *  6. The auto-reply to the visitor, at most one per address per 10 minutes. If
 *     it fails it is logged and the visitor never hears about it.
 *
 * No JavaScript: a plain form POST is answered with a redirect to /thanks (with
 * the name and email in a short-lived cookie, never in the URL).
 *
 * DELIVERABILITY: the auto-reply is only as good as the sending domain. SPF,
 * DKIM and DMARC for goodground.co.za must be set up on the mail host (infra,
 * not code).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 24 * 1024;
const RATE = { windowMs: 10 * 60 * 1000, max: 8 };
const WINDOW = 10 * 60 * 1000;
const MIN_FILL_MS = 3000;

type Hit = { count: number; first: number };
const hits = new Map<string, Hit>();
const recentEnquiry = new Map<string, number>();
const recentReply = new Map<string, number>();

function sweep(now: number) {
  for (const [k, v] of hits) if (now - v.first > RATE.windowMs) hits.delete(k);
  for (const [k, t] of recentEnquiry) if (now - t > WINDOW) recentEnquiry.delete(k);
  for (const [k, t] of recentReply) if (now - t > WINDOW) recentReply.delete(k);
}

function rateLimited(key: string, now: number) {
  const hit = hits.get(key);
  if (!hit || now - hit.first > RATE.windowMs) {
    hits.set(key, { count: 1, first: now });
    return false;
  }
  hit.count += 1;
  return hit.count > RATE.max;
}

const bodySafe = (value: string) =>
  value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
const oneLine = (value: string) => bodySafe(value).replace(/\s+/g, " ").trim();
const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type EnquiryResponse = {
  ok: boolean;
  errors?: Partial<Record<"fullName" | "email" | "message" | "selection", string>>;
  /** True when a confirmation email was actually sent, so the success copy can say so. */
  copy?: boolean;
  message?: string;
};

const FAILURE = "We couldn’t send that just now. Your answers are saved, so you can try again.";

export async function POST(request: Request) {
  const now = Date.now();
  sweep(now);

  const json = (body: EnquiryResponse, status = 200) => NextResponse.json(body, { status });
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");

  // Same-origin (Origin and Sec-Fetch-Site cannot be set by page script).
  const selfHost = new URL(request.url).host;
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const bad = (status: number, kind: FormKind = "start-project") =>
    wantsJson ? json({ ok: false, message: FAILURE }, status) : NextResponse.redirect(new URL(`/thanks?form=${kind}&status=failed`, request.url), 303);

  if (origin && new URL(origin).host !== selfHost) return bad(403);
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return bad(403);
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return bad(413);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return bad(413);

  let get: (key: string) => string;
  try {
    if ((request.headers.get("content-type") ?? "").includes("application/json")) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      get = (k) => (typeof parsed[k] === "string" ? (parsed[k] as string) : "");
    } else {
      const params = new URLSearchParams(raw);
      get = (k) => params.get(k) ?? "";
    }
  } catch {
    return bad(400);
  }

  const kind: FormKind = (FORM_KINDS as string[]).includes(get("formType")) ? (get("formType") as FormKind) : "start-project";

  const done = (extra: { copy: boolean; name: string; email: string }) => {
    if (wantsJson) return json({ ok: true, copy: extra.copy });
    const res = NextResponse.redirect(new URL(`/thanks?form=${kind}`, request.url), 303);
    // The name and email reach /thanks through this short-lived cookie, never the URL.
    res.cookies.set("gg_thanks", encodeURIComponent(JSON.stringify({ form: kind, name: firstName(extra.name), email: extra.email })), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/thanks",
      maxAge: 300,
    });
    return res;
  };

  // Spam rules: answered like a success, nothing sent.
  const loadedAt = Number(get("loadedAt"));
  const tooFast = Number.isFinite(loadedAt) && loadedAt > 0 && now - loadedAt < MIN_FILL_MS;
  if (get("website").trim() || tooFast) return done({ copy: false, name: get("fullName"), email: get("email") });

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) return bad(429, kind);

  // Validation.
  const fullName = oneLine(get("fullName")).slice(0, LIMITS.name + 1);
  const email = get("email").trim();
  const business = oneLine(get("businessName")).slice(0, LIMITS.business + 1);
  const phone = oneLine(get("phone")).slice(0, LIMITS.phone + 1);
  const message = bodySafe(get("message")).trim();
  const selection = bodySafe(get("selection")).trim();

  const errors: NonNullable<EnquiryResponse["errors"]> = {};
  if (!fullName) errors.fullName = "Please add your name.";
  else if (fullName.length > LIMITS.name) errors.fullName = "That name is too long.";
  if (!email) errors.email = "We need an email to reply to.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "That email doesn’t look right.";
  if (kind === "contact" && !message) errors.message = "Add a message so we know how to help.";
  if (message.length > LIMITS.message) errors.message = "Please shorten this a little.";
  if (selection.length > LIMITS.selection) errors.selection = "That selection is too long.";
  if (business.length > LIMITS.business || phone.length > LIMITS.phone) {
    errors.message = errors.message ?? "One of the fields is too long.";
  }
  if (Object.keys(errors).length > 0) return wantsJson ? json({ ok: false, errors, message: FAILURE }, 422) : bad(422, kind);

  // Whitelisted context. Anything unknown is dropped.
  const service = pick.service(get("service"));
  const size = pick.size(get("size"));
  const timeline = pick.timeline(get("timeline"));
  const plan = pick.plan(get("plan"));
  const intent = pick.intent(get("intent"));
  const pkg = pick.package(get("package"));
  const topic = pick.topic(get("topic"));
  const ref = cleanRef(get("ref"));
  const utm = UTM_KEYS.flatMap((key) => {
    const value = cleanUtm(get(key));
    return value ? [[key, value] as const] : [];
  });
  // Only the path of the page the form was on, never a full URL with query data.
  const pagePath = (() => {
    const value = get("pageUrl");
    return value.startsWith("/") && value.length <= 200 ? value.split("?")[0] : "";
  })();

  const fingerprint = createHash("sha256").update(`${kind}|${email.toLowerCase()}|${message.slice(0, 80)}|${service ?? ""}`).digest("hex");
  if (recentEnquiry.has(fingerprint)) return done({ copy: false, name: fullName, email });

  // Studio email.
  const topicLabel = topic ? TOPICS[topic] : TOPICS.general;
  const subject =
    kind === "contact"
      ? `New message · ${topicLabel} · ${fullName}`
      : kind === "pricing-quote"
        ? `New quote request · ${fullName}`
        : ["New enquiry", plan ? PLANS[plan] : intent ? INTENTS[intent] : pkg ? `${PACKAGES[pkg]} package` : "Project", service ? SERVICES[service] : null, ref ? `from ${ref}` : null]
            .filter(Boolean)
            .join(" · ");

  const lines: string[] = [];
  lines.push(`Name: ${fullName}`, `Email: ${email}`);
  if (business) lines.push(`Business: ${business}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (kind === "start-project") {
    lines.push("", `Service: ${service ? SERVICES[service] : "-"}`, `Size: ${size ? SIZES[size] : "-"}`, `Timeline: ${timeline ? TIMELINES[timeline] : "-"}`);
    if (plan) lines.push(`Plan: ${PLANS[plan]}`);
    if (intent) lines.push(`Intent: ${INTENTS[intent]}`);
    if (pkg) lines.push(`Package: ${PACKAGES[pkg]}`);
  }
  if (kind === "contact") lines.push("", `Topic: ${topicLabel}`);
  if (kind === "pricing-quote" && selection) lines.push("", "What they picked:", selection);
  if (message) lines.push("", kind === "contact" ? "Message:" : "Anything else:", message);
  lines.push("", `Form: ${kind}`);
  if (ref) lines.push(`Ref: ${ref}`);
  for (const [key, value] of utm) lines.push(`${key}: ${value}`);
  if (pagePath) lines.push(`Page: ${pagePath}`);
  lines.push(`Sent: ${new Date(now).toISOString()}`);

  const sent = await sendMail({ subject, replyTo: email, text: lines.join("\n") });
  if (!sent.ok) return wantsJson ? json({ ok: false, message: FAILURE }, 502) : bad(502, kind);
  recentEnquiry.set(fingerprint, now);

  // Auto-reply. Best effort; never an error for the visitor.
  let copy = false;
  const emailKey = email.toLowerCase();
  if (!recentReply.has(emailKey)) {
    recentReply.set(emailKey, now);
    try {
      const reply = buildAutoReply({ kind, first: firstName(fullName), service, size, timeline, plan, intent, pkg, topicLabel, message, selection });
      const result = await sendMail({
        to: email,
        fromName: "GoodGround",
        replyTo: site.email,
        subject: reply.subject,
        text: reply.text,
        html: reply.html,
      });
      copy = result.ok;
      if (!result.ok) console.error("[enquiry] auto-reply failed:", result.reason);
    } catch (error) {
      console.error("[enquiry] auto-reply threw:", (error as Error).name);
    }
  }

  return done({ copy, name: fullName, email });
}

export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}

/* ------------------------------------------------------------ auto-reply */

type ReplyInput = {
  kind: FormKind;
  first: string;
  service?: keyof typeof SERVICES;
  size?: keyof typeof SIZES;
  timeline?: keyof typeof TIMELINES;
  plan?: keyof typeof PLANS;
  intent?: keyof typeof INTENTS;
  pkg?: keyof typeof PACKAGES;
  topicLabel: string;
  message: string;
  selection: string;
};

function buildAutoReply(input: ReplyInput) {
  const { kind, first } = input;
  const month = getAvailability().nextMonth;

  const subject =
    kind === "contact"
      ? `We’ve got your message, ${first}`
      : kind === "pricing-quote"
        ? "Your quote request is in"
        : input.plan === "launch-waitlist"
          ? `You’re on the ${month} launch waitlist`
          : input.intent === "quote"
            ? "Your fixed-quote request is in"
            : `We’ve got your enquiry, ${first}`;

  const opening =
    kind === "contact"
      ? `Thanks, ${first}. Your message is in, and a real person will read it.`
      : `Thanks, ${first}. Your enquiry is in, and a real person will read it.`;

  const summary: [string, string][] = [];
  if (kind === "start-project") {
    if (input.plan) summary.push(["Plan", PLANS[input.plan]]);
    if (input.service) summary.push(["Service", SERVICES[input.service]]);
    if (input.size) summary.push(["Size", SIZES[input.size]]);
    if (input.timeline) summary.push(["Timeline", TIMELINES[input.timeline]]);
    if (input.pkg) summary.push(["Package", PACKAGES[input.pkg]]);
  }
  if (kind === "contact") summary.push(["Topic", input.topicLabel]);
  if (kind === "pricing-quote" && input.selection) summary.push(["What you picked", input.selection]);
  if (input.message) summary.push([kind === "contact" ? "Your message" : "Anything else", input.message]);

  const steps = [`We reply within ${REPLY_TIME}`, "A short call to understand your business", "One fixed price, paid 50/50 or over 12 months"];
  const workUrl = `${site.url}/work`;

  const text = [
    opening,
    "",
    "WHAT YOU SENT",
    ...summary.map(([k, v]) => `${k}: ${v}`),
    "",
    "WHAT HAPPENS NEXT",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    `In the meantime, see how we measure every build: ${workUrl}`,
    "",
    "The GoodGround team",
    site.email,
    `WhatsApp: ${site.whatsapp.link}`,
  ].join("\n");

  const rows = summary
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5f5b66;vertical-align:top;font-size:14px">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:14px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f7f7f4;font-family:Arial,Helvetica,sans-serif;color:#111111">
<div style="max-width:560px;margin:0 auto">
<p style="font-size:24px;font-weight:700;letter-spacing:-0.03em;margin:0 0 24px">goodground</p>
<div style="background:#ffffff;border:1px solid #e7e3dc;border-radius:16px;padding:28px">
<p style="font-size:16px;line-height:1.55;margin:0 0 20px">${escapeHtml(opening)}</p>
${rows ? `<p style="font-size:12px;letter-spacing:0.08em;color:#5f5b66;margin:0 0 6px">WHAT YOU SENT</p><table style="border-collapse:collapse;margin:0 0 20px">${rows}</table>` : ""}
<p style="font-size:12px;letter-spacing:0.08em;color:#5f5b66;margin:0 0 6px">WHAT HAPPENS NEXT</p>
<ol style="margin:0 0 20px;padding-left:20px;font-size:14px;line-height:1.6">${steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
<p style="font-size:14px;line-height:1.6;margin:0 0 20px">In the meantime, <a href="${workUrl}" style="color:#c2300e">see how we measure every build</a>.</p>
<p style="font-size:14px;line-height:1.6;margin:0">The GoodGround team<br>${escapeHtml(site.email)}<br>WhatsApp: ${escapeHtml(site.whatsapp.link)}</p>
</div></div></body></html>`;

  return { subject, text, html };
}
