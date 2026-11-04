import { NextResponse } from "next/server";

import { briefSections, buildBrief, EMAIL_RE, overall, sanitizeAnswers, str } from "@/components/gg/onboarding/logic";
import { parsePlan, parseTrack, trackConfig } from "@/components/gg/onboarding/steps";
import { buildTime, localPlanBySlug } from "@/content/pricing";
import { site } from "@/content/site";
import { sendMail } from "@/lib/mailer";

/**
 * Receives a finished onboarding brief (the "Send my brief" button).
 *
 * WHAT IT DOES. Same-origin and size checks, the spam rules used by /api/enquiry (a filled honeypot
 * or a send under 3 seconds after the page loaded is answered like a success and nothing is sent),
 * a rate limit, then the answers are rebuilt from the question list (unknown keys dropped, choices
 * checked against their options, lengths capped) and emailed to the studio inbox as a Markdown
 * brief. If that fails the client sees a failure. If it works the brief counts as sent and a
 * confirmation goes to the address given in the brief (best effort, never an error).
 *
 * TRACKS (v2). The body may carry `track: "local"` (the short brief for monthly-plan clients, with
 * 4 steps plus Review) and, with it, an optional `plan` (local-start | local-plus | local-pro). Both
 * are whitelisted: anything else means the full brief. The track picks which steps the answers are
 * rebuilt from and which required answers are counted, so a local submission never fails (or shows
 * as "missing") for answers that only the full brief asks. Both show in the team email subject and
 * body, and in the client confirmation.
 *
 * WHAT IT DOES NOT DO YET: store drafts on a server, email a private link, attach a
 * PDF, or write to an admin view. Those wait on the storage region, retention period and recipient
 * decisions. Files are never uploaded here: the client pastes a share link to their own Google
 * Drive, Dropbox or OneDrive folder in the brief, so GoodGround stores none of their data.
 *
 * The rate limit and duplicate check are in-process (per warm serverless instance), as on the other
 * form routes: they raise the cost of casual abuse, they are not a hard ceiling.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 256 * 1024;
const RATE = { windowMs: 30 * 60 * 1000, max: 10 };
const MIN_FILL_MS = 3000;

const hits = new Map<string, { count: number; first: number }>();
const recent = new Map<string, number>();

function sweep(now: number) {
  for (const [k, v] of hits) if (now - v.first > RATE.windowMs) hits.delete(k);
  for (const [k, t] of recent) if (now - t > 15 * 60 * 1000) recent.delete(k);
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

const oneLine = (v: string) => v.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
const escapeHtml = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FAILURE = "We couldn’t send that just now. Your answers are saved on this device, so you can try again.";

export async function POST(request: Request) {
  const now = Date.now();
  sweep(now);
  const fail = (status: number, message = FAILURE) => NextResponse.json({ ok: false, message }, { status });

  const selfHost = new URL(request.url).host;
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && new URL(origin).host !== selfHost) return fail(403);
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return fail(403);
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return fail(413);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail(413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return fail(400);
  }

  // Spam rules: answered like a success, nothing sent.
  const loadedAt = Number(body.loadedAt);
  const tooFast = Number.isFinite(loadedAt) && loadedAt > 0 && now - loadedAt < MIN_FILL_MS;
  if ((typeof body.website === "string" && body.website.trim()) || tooFast) return NextResponse.json({ ok: true });

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) return fail(429);

  const consents = (body.consents ?? {}) as Record<string, unknown>;
  const confirmName = oneLine(typeof body.confirmName === "string" ? body.confirmName : "").slice(0, 120);
  if (consents.accuracy !== true || consents.rights !== true || consents.use !== true || confirmName.length < 2) {
    return fail(422, "Please tick all three confirmations and type your name before sending.");
  }

  const track = parseTrack(body.track);
  const local = track === "local";
  const list = trackConfig(track).steps;
  const plan = local ? parsePlan(body.plan) : "";
  const planName = plan ? localPlanBySlug(plan)?.name ?? "" : "";
  const trackLabel = local ? `Local plan${planName ? ` · ${planName}` : ""}` : "";

  const answers = sanitizeAnswers(body.answers, list);
  const email = str(answers, "email").trim();
  const business = oneLine(str(answers, "businessName")).slice(0, 120);
  const quoteRaw = (body.quote ?? null) as { package?: unknown; price?: unknown; payment?: unknown; addons?: unknown } | null;
  const quote = quoteRaw && !local
    ? [quoteRaw.package, quoteRaw.price, quoteRaw.payment, ...(Array.isArray(quoteRaw.addons) ? quoteRaw.addons : [])]
        .filter((x): x is string => typeof x === "string" && x.length > 0)
        .map((x) => oneLine(x).slice(0, 60))
        .join(" · ")
    : "";

  const fingerprint = `${email.toLowerCase()}|${confirmName.toLowerCase()}|${JSON.stringify(answers).length}`;
  if (recent.has(fingerprint)) return NextResponse.json({ ok: true });

  const summary = overall(answers, list);
  const brief = buildBrief(answers, { who: confirmName, business, quote, sent: new Date(now), track: trackLabel, list });
  const sent = await sendMail({
    subject: `${local ? "Local plan brief received" : "Client brief received"} · ${business || confirmName}${planName ? ` · ${planName}` : ""}${summary.missing.length ? ` · ${summary.missing.length} required missing` : ""}`,
    replyTo: EMAIL_RE.test(email) ? email : undefined,
    text: `${brief}\nConfirmed by: ${confirmName}\nConsents: accurate, right to use materials, use to deliver the project\n`,
  });
  if (!sent.ok) return fail(502);
  recent.set(fingerprint, now);

  // Confirmation to the client. Best effort.
  if (EMAIL_RE.test(email)) {
    try {
      const first = confirmName.split(/\s+/)[0] || "there";
      const sections = briefSections(answers, list).map((s) => `${String(s.n).padStart(2, "0")} ${s.name}`);
      const missingLine = summary.missing.length
        ? `${summary.missing.length} required answer(s) are still missing. We’ll follow up on those.`
        : "Every required answer is filled in.";
      const next = local
        ? ["We check what you’ve sent.", "We send a separate secure link for access to your accounts.", `We build your site in ${buildTime}, counted from now.`]
        : ["We confirm we’ve read it within one working day.", "We send a separate secure link for access to your accounts.", "We book your kick-off call."];
      const editNote = local
        ? "You can keep editing until your site goes live. After that, message us with any changes."
        : "You can keep editing until your kick-off call. After that, changes go through your project lead.";
      const lead = local ? `Thanks, ${first}. Your details are in, and a real person will read them.` : `Thanks, ${first}. Your brief is in, and a real person will read it.`;
      const text = [
        lead,
        ...(trackLabel ? ["", `Your plan: ${planName || "Local plan"}`] : []),
        "",
        missingLine,
        "",
        "WHAT HAPPENS NEXT",
        ...next.map((line, i) => `${i + 1}. ${line}`),
        "",
        "SECTIONS WE RECEIVED",
        ...sections,
        "",
        editNote,
        "",
        "The GoodGround team",
        site.email,
      ].join("\n");
      const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.55;max-width:560px">
<p style="font-size:17px">${escapeHtml(lead)}</p>${trackLabel ? `
<p>Your plan: <strong>${escapeHtml(planName || "Local plan")}</strong></p>` : ""}
<p>${escapeHtml(missingLine)}</p>
<p style="margin:20px 0 6px;font-weight:bold">What happens next</p>
<ol style="margin:0;padding-left:20px">${next.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ol>
<p style="color:#5f5b66">${escapeHtml(editNote)}</p>
<p>The GoodGround team<br><a href="mailto:${site.email}">${site.email}</a></p></div>`;
      const result = await sendMail({ to: email, fromName: "GoodGround", replyTo: site.email, subject: local ? "We’ve got your details" : "We’ve got your brief", text, html });
      if (!result.ok) console.error("[onboarding] confirmation failed:", result.reason);
    } catch (error) {
      console.error("[onboarding] confirmation threw:", (error as Error).name);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
