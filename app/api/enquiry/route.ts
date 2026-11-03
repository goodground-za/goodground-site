import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

import { newBusinessOffer } from "@/content/newBusinessOffer";
import { site } from "@/content/site";
import {
  CHECK_REPORT_TIME,
  EMAIL_RE,
  FORM_KINDS,
  GBP,
  INTENTS,
  LIMITS,
  OFFERS,
  PACKAGES,
  PLANS,
  PREVIEW_TIME,
  REPLY_TIME,
  SERVICES,
  SIZES,
  TIMELINES,
  TOPICS,
  UTM_KEYS,
  WEBSITE_RE,
  cleanRef,
  cleanUtm,
  firstName,
  pick,
  planSummary,
  resolvePlanOffer,
  trackOf,
  type FormKind,
  type GbpKey,
  type OfferKey,
  type PlanKey,
} from "@/lib/enquiryShared";
import { firstOfNextMonth, gateFreeCheck, longDate, type CheckGate } from "@/lib/freeCheck";
import { getOfferSpots } from "@/lib/liveCounters";
import { sendMail } from "@/lib/mailer";
import { turnstileRequired, verifyTurnstile } from "@/lib/turnstile";

/**
 * One endpoint for the redesigned forms: /start-project (Track B: start-project;
 * Track A: local-preview), /contact, the /pricing quote form, and from v2 the
 * New Business Offer form (new-business-offer) and the free AI visibility check
 * (ai-check).
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
 *     the retired /api/website-launch route).
 *  5. ai-check only: Cloudflare Turnstile (when a secret is set), then the
 *     free-check guardrails in lib/freeCheck.ts (30-day repeat, monthly cap).
 *     THE SITE NEVER RUNS A SCAN: it only records the request and tells the team.
 *  6. The enquiry to the studio inbox. If this fails the visitor sees a
 *     failure. If it works the enquiry counts as sent, whatever happens next.
 *  7. The auto-reply to the visitor, at most one per address per 10 minutes. If
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

type ErrorField =
  | "fullName" | "email" | "message" | "selection" | "businessName" | "town" | "mainServices"
  | "websiteUrl" | "phone" | "consent" | "eligibility" | "turnstile";

export type EnquiryResponse = {
  ok: boolean;
  errors?: Partial<Record<ErrorField, string>>;
  /** True when a confirmation email was actually sent, so the success copy can say so. */
  copy?: boolean;
  message?: string;
  /** ai-check only: what happened to the request. */
  result?: "booked" | "waitlist" | "repeat";
  /** ai-check repeat: the business and the date of the earlier check, for the on-page line. */
  business?: string;
  date?: string;
};

const FAILURE = "We couldn’t send that just now. Your answers are saved, so you can try again.";
const TURNSTILE_FAILURE = "We couldn’t confirm you’re not a robot. Please try again.";

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

  const done = (extra: { copy: boolean; name: string; email: string; result?: EnquiryResponse["result"]; message?: string; business?: string; date?: string }) => {
    if (wantsJson) {
      return json({ ok: true, copy: extra.copy, result: extra.result, message: extra.message, business: extra.business, date: extra.date });
    }
    const target = new URL(`/thanks?form=${kind}`, request.url);
    if (extra.result && extra.result !== "booked") target.searchParams.set("result", extra.result);
    const res = NextResponse.redirect(target, 303);
    // The name and email reach /thanks through this short-lived cookie, never the URL.
    res.cookies.set(
      "gg_thanks",
      encodeURIComponent(
        JSON.stringify({ form: kind, name: firstName(extra.name), email: extra.email, business: extra.business, date: extra.date, next: extra.result === "waitlist" ? firstOfNextMonth(new Date(now)) : undefined }),
      ),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/thanks",
        maxAge: 300,
      },
    );
    return res;
  };

  // Spam rules: answered like a success, nothing sent.
  const loadedAt = Number(get("loadedAt"));
  const tooFast = Number.isFinite(loadedAt) && loadedAt > 0 && now - loadedAt < MIN_FILL_MS;
  if (get("website").trim() || tooFast) return done({ copy: false, name: get("fullName"), email: get("email"), result: kind === "ai-check" ? "booked" : undefined });

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) return bad(429, kind);

  // Validation.
  const fullName = oneLine(get("fullName")).slice(0, LIMITS.name + 1);
  const email = get("email").trim();
  const business = oneLine(get("businessName")).slice(0, LIMITS.business + 1);
  const phone = oneLine(get("phone") || get("whatsapp")).slice(0, LIMITS.phone + 1);
  const message = bodySafe(get("message")).trim();
  const selection = bodySafe(get("selection")).trim();
  // New Business Offer form only: when they would like to launch (free text, shown to the team).
  const launchTiming = oneLine(get("launchTiming")).slice(0, 121);
  const town = oneLine(get("town")).slice(0, LIMITS.town + 1);
  const mainServices = oneLine(get("mainServices") || get("mainService")).slice(0, LIMITS.services + 1);
  const websiteUrl = oneLine(get("websiteUrl")).slice(0, LIMITS.website + 1);
  const gbp = pick.gbp(get("gbp"));
  const yes = (key: string) => ["yes", "on", "true", "confirmed", "1"].includes(get(key).trim().toLowerCase());
  const whatsappOptIn = yes("whatsappOptIn");
  const marketingOptIn = yes("marketingOptIn");

  const isLocal = kind === "local-preview" || kind === "new-business-offer";
  const needsBusiness = isLocal || kind === "ai-check";

  const errors: NonNullable<EnquiryResponse["errors"]> = {};
  if (!fullName && kind !== "ai-check") errors.fullName = "Please add your name.";
  else if (fullName.length > LIMITS.name) errors.fullName = "That name is too long.";
  if (!email) errors.email = "We need an email to reply to.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "That email doesn’t look right.";
  if (kind === "contact" && !message) errors.message = "Add a message so we know how to help.";
  if (kind === "new-business-offer" && !message) errors.message = "Tell us a little about your new business.";
  if (kind === "new-business-offer" && launchTiming.length > 120) errors.message = errors.message ?? "One of the fields is too long.";
  if (message.length > LIMITS.message) errors.message = "Please shorten this a little.";
  if (selection.length > LIMITS.selection) errors.selection = "That selection is too long.";
  if (business.length > LIMITS.business || phone.length > LIMITS.phone) {
    errors.message = errors.message ?? "One of the fields is too long.";
  }
  if (needsBusiness) {
    if (!business) errors.businessName = "Please add your business name.";
    if (!town) errors.town = "Please add your town.";
    else if (town.length > LIMITS.town) errors.town = "That town name is too long.";
    if (!mainServices) errors.mainServices = "Tell us your main services.";
    else if (mainServices.length > LIMITS.services) errors.mainServices = "Please shorten this a little.";
    if (websiteUrl && (websiteUrl.length > LIMITS.website || !WEBSITE_RE.test(websiteUrl))) {
      errors.websiteUrl = "That website address doesn’t look right.";
    }
  }
  if (whatsappOptIn && !phone) errors.phone = "Add your WhatsApp number so we can message you.";
  if (kind === "ai-check" && !yes("consent")) errors.consent = "Please tick the box so we can run your check.";
  if (kind === "new-business-offer" && !yes("eligibility")) errors.eligibility = "Please confirm this is a new business without a website.";
  if (Object.keys(errors).length > 0) return wantsJson ? json({ ok: false, errors, message: FAILURE }, 422) : bad(422, kind);

  // Whitelisted context. Anything unknown is dropped.
  const service = pick.service(get("service"));
  const size = pick.size(get("size"));
  const timeline = pick.timeline(get("timeline"));
  let { plan, offer } = resolvePlanOffer(get("plan"), get("offer"));
  if (kind === "new-business-offer") {
    plan = "local-start";
    // The server decides sold out from the live count, whatever the page said.
    offer = (await getOfferSpots()).soldOut ? "new-business-waitlist" : "new-business";
  }
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

  // Track A needs a plan; a missing one is "Help me choose".
  if (kind === "local-preview" && !plan) plan = "local-help";

  // Turnstile (ai-check only, and only when a secret key is set).
  if (kind === "ai-check" && turnstileRequired()) {
    const ok = await verifyTurnstile(get("cf-turnstile-response") || get("turnstileToken"), ip);
    if (!ok) {
      return wantsJson ? json({ ok: false, errors: { turnstile: TURNSTILE_FAILURE }, message: TURNSTILE_FAILURE }, 422) : bad(422, kind);
    }
  }

  const fingerprint = createHash("sha256")
    .update(`${kind}|${email.toLowerCase()}|${business.toLowerCase()}|${message.slice(0, 80)}|${service ?? ""}|${plan ?? ""}`)
    .digest("hex");
  if (recentEnquiry.has(fingerprint)) return done({ copy: false, name: fullName, email, result: kind === "ai-check" ? "booked" : undefined });

  // Free-check guardrails. The site never runs a scan; this only decides how the request is handled.
  let gate: CheckGate | null = null;
  if (kind === "ai-check") gate = await gateFreeCheck({ business, town, website: websiteUrl });
  const result: EnquiryResponse["result"] =
    gate?.mode === "repeat" ? "repeat" : gate?.mode === "waitlist" ? "waitlist" : kind === "ai-check" ? "booked" : undefined;
  const repeatDate = gate?.mode === "repeat" ? longDate(gate.at) : undefined;

  // Studio email.
  const topicLabel = topic ? TOPICS[topic] : TOPICS.general;
  const formTag = kind === "ai-check" && result === "waitlist" ? "ai-check-waitlist" : kind;
  const where = ref ? `from ${ref}` : null;
  const subject = (() => {
    switch (kind) {
      case "contact":
        return `New message · ${topicLabel} · ${fullName}`;
      case "pricing-quote":
        return `New quote request · ${fullName}`;
      case "local-preview":
        return ["New preview request", plan ? PLANS[plan] : null, offer ? OFFERS[offer] : null, business, where].filter(Boolean).join(" · ");
      case "new-business-offer":
        return [offer === "new-business-waitlist" ? "New Business Offer WAITLIST" : "New Business Offer spot request", business, where].filter(Boolean).join(" · ");
      case "ai-check":
        return result === "repeat"
          ? `Repeat free-check request · resend earlier report · ${business}`
          : [result === "waitlist" ? "Free AI check WAITLIST" : "Free AI check request", business, town, where].filter(Boolean).join(" · ");
      default:
        return ["New enquiry", plan ? PLANS[plan] : intent ? INTENTS[intent] : pkg ? `${PACKAGES[pkg]} package` : "Project", service ? SERVICES[service] : null, where]
          .filter(Boolean)
          .join(" · ");
    }
  })();

  const track = trackOf(kind);
  const lines: string[] = [];
  if (track) lines.push(`Track: ${track === "local" ? "A · Monthly plan (local)" : track === "check" ? "C · Free AI check" : "B · Custom build"}`);
  if (kind === "ai-check" && result === "repeat") {
    lines.push(
      "REPEAT REQUEST: resend the earlier report. Do not run a second scan.",
      `Earlier check: ${repeatDate}`,
    );
  }
  if (kind === "ai-check" && result === "waitlist") {
    lines.push("WAITLIST: this month’s free checks are used up. Run it on the 1st of next month.");
    if (gate?.mode === "waitlist" && gate.alreadyWaiting) lines.push("(This business is already on the waitlist.)");
  }
  if (kind === "ai-check" && gate?.mode === "unconnected") {
    lines.push("Note: check storage is not connected, so the 30-day rule and the monthly cap were not applied to this request.");
  }
  lines.push(`Name: ${fullName || "-"}`, `Email: ${email}`);
  if (business) lines.push(`Business: ${business}`);
  if (needsBusiness) {
    lines.push(`Town: ${town}`, `Main services: ${mainServices}`);
    if (websiteUrl) lines.push(`Website: ${websiteUrl}`);
  }
  if (kind === "local-preview" && gbp) lines.push(`Google Business Profile: ${GBP[gbp]}`);
  if (phone) lines.push(`${kind === "ai-check" ? "WhatsApp" : "Phone"}: ${phone}`);
  if (plan && isLocal) lines.push(`Plan: ${planSummary(plan)}`);
  if (offer) lines.push(`Offer: ${OFFERS[offer]}${offer === "new-business" ? ` (${newBusinessOffer.summary})` : ""}`);
  if (isLocal || kind === "ai-check") {
    lines.push(`WhatsApp updates: ${whatsappOptIn ? `YES, consent given ${new Date(now).toISOString()}` : "no"}`);
  }
  if (kind === "ai-check") lines.push("Consent to run the check: yes", `Marketing opt-in: ${marketingOptIn ? "yes" : "no"}`);
  if (kind === "new-business-offer" && launchTiming) lines.push(`Would like to launch: ${launchTiming}`);
  if (kind === "start-project") {
    lines.push("", `Service: ${service ? SERVICES[service] : "-"}`, `Size: ${size ? SIZES[size] : "-"}`, `Timeline: ${timeline ? TIMELINES[timeline] : "-"}`);
    if (intent) lines.push(`Intent: ${INTENTS[intent]}`);
    if (pkg) lines.push(`Package: ${PACKAGES[pkg]}`);
  }
  if (kind === "contact") lines.push("", `Topic: ${topicLabel}`);
  if (kind === "pricing-quote" && selection) lines.push("", "What they picked:", selection);
  if (message) lines.push("", kind === "contact" ? "Message:" : "Anything else:", message);
  lines.push("", `Form: ${formTag}`);
  if (ref) lines.push(`Ref: ${ref}`);
  for (const [key, value] of utm) lines.push(`${key}: ${value}`);
  if (pagePath) lines.push(`Page: ${pagePath}`);
  lines.push(`Sent: ${new Date(now).toISOString()}`);

  const sent = await sendMail({ subject, replyTo: email, text: lines.join("\n") });
  if (!sent.ok) return wantsJson ? json({ ok: false, message: FAILURE }, 502) : bad(502, kind);
  recentEnquiry.set(fingerprint, now);

  // A repeat free check gets no new scan record and no second auto-reply: the
  // team resends the earlier report. The visitor sees the on-page line.
  if (result === "repeat") {
    return done({
      copy: false,
      name: fullName,
      email,
      result,
      business,
      date: repeatDate,
      message: `We checked ${business} on ${repeatDate}. We’ve re-sent your report to ${email}.`,
    });
  }
  const duplicateWait = gate?.mode === "waitlist" && gate.alreadyWaiting;

  // Auto-reply. Best effort; never an error for the visitor.
  let copy = false;
  const emailKey = email.toLowerCase();
  if (!duplicateWait && !recentReply.has(emailKey)) {
    recentReply.set(emailKey, now);
    try {
      const reply = buildAutoReply({
        kind, first: firstName(fullName), service, size, timeline, plan, offer, intent, pkg, topicLabel, message, selection,
        business, town, mainServices, websiteUrl, gbp, waitlist: result === "waitlist", nextMonthFirst: firstOfNextMonth(new Date(now)),
      });
      const mailed = await sendMail({
        to: email,
        fromName: "GoodGround",
        replyTo: site.email,
        subject: reply.subject,
        text: reply.text,
        html: reply.html,
      });
      copy = mailed.ok;
      if (!mailed.ok) console.error("[enquiry] auto-reply failed:", mailed.reason);
    } catch (error) {
      console.error("[enquiry] auto-reply threw:", (error as Error).name);
    }
  }

  return done({
    copy,
    name: fullName,
    email,
    result,
    business: kind === "ai-check" ? business : undefined,
    message: result === "waitlist"
      ? `We’re fully booked for free checks this month. You’re on the list, and we’ll run yours on ${firstOfNextMonth(new Date(now))}.`
      : undefined,
  });
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
  plan?: PlanKey;
  offer?: OfferKey;
  intent?: keyof typeof INTENTS;
  pkg?: keyof typeof PACKAGES;
  topicLabel: string;
  message: string;
  selection: string;
  business: string;
  town: string;
  mainServices: string;
  websiteUrl: string;
  gbp?: GbpKey;
  waitlist: boolean;
  nextMonthFirst: string;
};

function buildAutoReply(input: ReplyInput) {
  const { kind, first } = input;
  const month = newBusinessOffer.nextMonth;
  const hello = first ? `Thanks, ${first}.` : "Thanks.";

  let subject: string;
  let opening: string;
  let steps: string[];
  let closing: { text: string; url: string; label: string }[];

  const workLink = { text: "In the meantime, ", url: `${site.url}/work`, label: "see how we measure every build" };
  const sampleLink = { text: "Meanwhile, ", url: `${site.url}/services/ai-visibility#sample`, label: "see how AI sees you" };

  switch (kind) {
    case "contact":
      subject = `We’ve got your message, ${first}`;
      opening = `${hello} Your message is in, and a real person will read it.`;
      steps = [`We reply within ${REPLY_TIME}`, "A short call to understand your business", "One fixed price, paid 50/50 or over 12 months"];
      closing = [workLink];
      break;
    case "pricing-quote":
      subject = "Your quote request is in";
      opening = `${hello} Your enquiry is in, and a real person will read it.`;
      steps = [`We reply within ${REPLY_TIME}`, "A short call to understand your business", "One fixed price, paid 50/50 or over 12 months"];
      closing = [workLink];
      break;
    case "local-preview":
      subject = `Your free preview is on its way, ${first}`;
      opening = `${hello} Your free preview request is in, and a real person will read it.`;
      steps = [`We build your preview within ${PREVIEW_TIME}`, "You review it and ask for changes", "You approve it to go live. Your first debit runs only then"];
      closing = [sampleLink, { text: "Or ", url: `${site.url}/pricing#monthly`, label: "compare the monthly plans again" }];
      break;
    case "new-business-offer":
      subject = input.waitlist || input.offer === "new-business-waitlist"
        ? `You’re on the ${month} New Business Offer waitlist`
        : "Your New Business Offer spot request is in";
      opening = input.offer === "new-business-waitlist"
        ? `${hello} The offer is fully booked this month, so you’re on the ${month} waitlist.`
        : `${hello} Your spot request is in, and your spot is held while we confirm.`;
      steps = input.offer === "new-business-waitlist"
        ? [`We tell you as soon as a space opens in ${month}`, `We build your free preview within ${PREVIEW_TIME}`, "You approve it to go live. Your first debit runs only then"]
        : [
            `We confirm your spot within ${REPLY_TIME}`,
            `We build your free preview within ${PREVIEW_TIME}`,
            "You approve it to go live. Your first month is free, and the business mailbox is free for 12 months",
          ];
      closing = [{ text: "How the offer works: ", url: `${site.url}${newBusinessOffer.path}`, label: "read it again" }];
      break;
    case "ai-check":
      subject = input.waitlist ? "You’re on the waitlist for your free AI visibility check" : "Your free AI visibility check is booked";
      opening = input.waitlist
        ? `${hello} We’re fully booked for free checks this month, so you’re on the list. We’ll run yours on ${input.nextMonthFirst}.`
        : `${hello} Your free AI visibility check is booked, and a real person will review it before it reaches you.`;
      steps = input.waitlist
        ? [`We run your check on ${input.nextMonthFirst}`, "A person reviews it", `Your report reaches you within ${CHECK_REPORT_TIME} of that`]
        : ["We run your check", "A person reviews it", `Your report reaches you within ${CHECK_REPORT_TIME}`];
      closing = [
        { text: "The report shows how often ChatGPT, Gemini and Google’s AI recommend your business when local customers ask, and what to fix first. ", url: `${site.url}/services/ai-visibility#sample`, label: "See a sample report" },
        { text: "Or ", url: `${site.url}/pricing#monthly`, label: "see the monthly plans" },
      ];
      break;
    default:
      subject = input.intent === "quote" ? "Your fixed-quote request is in" : `We’ve got your enquiry, ${first}`;
      opening = `${hello} Your enquiry is in, and a real person will read it.`;
      steps = [`We reply within ${REPLY_TIME}`, "A short call to understand your business", "One fixed price, paid 50/50 or over 12 months"];
      closing = [workLink];
  }

  const summary: [string, string][] = [];
  if (kind === "start-project") {
    if (input.service) summary.push(["Service", SERVICES[input.service]]);
    if (input.size) summary.push(["Size", SIZES[input.size]]);
    if (input.timeline) summary.push(["Timeline", TIMELINES[input.timeline]]);
    if (input.pkg) summary.push(["Package", PACKAGES[input.pkg]]);
  }
  if (kind === "local-preview" || kind === "new-business-offer") {
    if (input.plan) summary.push(["Plan", planSummary(input.plan)]);
    if (input.offer === "new-business") summary.push(["Offer", newBusinessOffer.summary]);
  }
  if (input.business && (kind === "local-preview" || kind === "new-business-offer" || kind === "ai-check")) {
    summary.push(["Business", input.business], ["Town", input.town], [kind === "ai-check" ? "Main service" : "Main services", input.mainServices]);
    if (input.websiteUrl) summary.push(["Website", input.websiteUrl]);
    if (input.gbp) summary.push(["Google Business Profile", GBP[input.gbp]]);
  }
  if (kind === "contact") summary.push(["Topic", input.topicLabel]);
  if (kind === "pricing-quote" && input.selection) summary.push(["What you picked", input.selection]);
  if (input.message) summary.push([kind === "contact" ? "Your message" : "Anything else", input.message]);

  const text = [
    opening,
    "",
    "WHAT YOU SENT",
    ...summary.map(([k, v]) => `${k}: ${v}`),
    "",
    "WHAT HAPPENS NEXT",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    ...closing.map((c) => `${c.text}${c.label}: ${c.url}`),
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
  const links = closing
    .map((c) => `<p style="font-size:14px;line-height:1.6;margin:0 0 12px">${escapeHtml(c.text)}<a href="${c.url}" style="color:#c2300e">${escapeHtml(c.label)}</a>.</p>`)
    .join("");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f7f7f4;font-family:Arial,Helvetica,sans-serif;color:#111111">
<div style="max-width:560px;margin:0 auto">
<p style="font-size:24px;font-weight:700;letter-spacing:-0.03em;margin:0 0 24px">goodground</p>
<div style="background:#ffffff;border:1px solid #e7e3dc;border-radius:16px;padding:28px">
<p style="font-size:16px;line-height:1.55;margin:0 0 20px">${escapeHtml(opening)}</p>
${rows ? `<p style="font-size:12px;letter-spacing:0.08em;color:#5f5b66;margin:0 0 6px">WHAT YOU SENT</p><table style="border-collapse:collapse;margin:0 0 20px">${rows}</table>` : ""}
<p style="font-size:12px;letter-spacing:0.08em;color:#5f5b66;margin:0 0 6px">WHAT HAPPENS NEXT</p>
<ol style="margin:0 0 20px;padding-left:20px;font-size:14px;line-height:1.6">${steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
${links}
<p style="font-size:14px;line-height:1.6;margin:8px 0 0">The GoodGround team<br>${escapeHtml(site.email)}<br>WhatsApp: ${escapeHtml(site.whatsapp.link)}</p>
</div></div></body></html>`;

  return { subject, text, html };
}
