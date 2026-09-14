import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { intakeCopy, intakeRoute } from "@/content/launchIntake";
import { buildBrief } from "@/lib/intakeBrief";
import { validateIntake, type IntakeErrors } from "@/lib/intakeValidate";
import { sendMail } from "@/lib/mailer";

/**
 * Intake endpoint for /launch-offer-intake-form.
 *
 * Same shape as the /api/website-launch handler, and for the same reason: the
 * browser is not where a rule gets enforced. Every guard there applies here —
 * same-origin, honeypot, body cap, rate limit, duplicate suppression, and a
 * success that is only ever reported after the delivery provider accepted the
 * message.
 *
 * WHAT IS DIFFERENT. This form carries fifty-three answers rather than five, so
 * the body cap is larger, and the delivered message is a formatted brief rather
 * than a handful of labelled lines. Validation is not reimplemented here: it
 * imports the same validateIntake the browser ran, so the two cannot disagree
 * about which questions are required.
 *
 * WHAT IS NOT GUARANTEED. The rate limit and the duplicate check are
 * in-process. On Vercel that means per serverless instance, resetting on a cold
 * start, so they raise the cost of casual abuse without being a hard ceiling.
 * A durable limiter is the production upgrade. Stated rather than implied.
 */

export const runtime = "nodejs";
/** Never cached: every POST is a distinct submission. */
export const dynamic = "force-dynamic";

/** Fifty-three answers, several of them long. Still a firm ceiling. */
const MAX_BODY_BYTES = 128 * 1024;

/*
 * Deliberately looser than the short enquiry form's 5-per-10-minutes. The limit
 * is checked before validation, so every rejected attempt counts against it,
 * and this form has fifty-three questions — someone correcting a few server
 * side errors can legitimately submit several times in one sitting. Six locked
 * a real person out during testing. Twelve still stops bulk abuse.
 */
const RATE_LIMIT = { windowMs: 30 * 60 * 1000, max: 12 };
const DEDUPE_WINDOW_MS = 15 * 60 * 1000;

type Hit = { count: number; first: number };
const hits = new Map<string, Hit>();
const recent = new Map<string, number>();

function sweep(now: number) {
  for (const [k, v] of hits) if (now - v.first > RATE_LIMIT.windowMs) hits.delete(k);
  for (const [k, t] of recent) if (now - t > DEDUPE_WINDOW_MS) recent.delete(k);
}

function rateLimited(key: string, now: number): boolean {
  const hit = hits.get(key);
  if (!hit || now - hit.first > RATE_LIMIT.windowMs) {
    hits.set(key, { count: 1, first: now });
    return false;
  }
  hit.count += 1;
  return hit.count > RATE_LIMIT.max;
}

/** Body text keeps its line breaks and loses its control characters. */
const bodySafe = (value: string) =>
  value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

export type IntakeResponse = {
  ok: boolean;
  /** Field-level, and never echoing a submitted value back. */
  errors?: IntakeErrors;
  message?: string;
};

function wantsJson(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

function redirectTo(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

function fail(request: Request, status: number, body: IntakeResponse) {
  if (wantsJson(request)) return NextResponse.json(body, { status });
  return redirectTo(request, `${intakeRoute.path}/problem`);
}

export async function POST(request: Request) {
  const now = Date.now();
  sweep(now);

  /*
   * Same-origin. A cross-site form can still POST here, so Origin is compared
   * against this deployment's own host — which covers preview URLs and
   * localhost without listing them. Sec-Fetch-Site is checked where the browser
   * sends it. Neither header can be set by page JavaScript.
   */
  const selfHost = new URL(request.url).host;
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && new URL(origin).host !== selfHost) {
    return fail(request, 403, { ok: false, message: intakeCopy.failure });
  }
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") {
    return fail(request, 403, { ok: false, message: intakeCopy.failure });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return fail(request, 413, { ok: false, message: intakeCopy.failure });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(request, 413, { ok: false, message: intakeCopy.failure });
  }

  /*
   * One reader for both encodings. The JSON path already carries checkbox
   * groups as one joined string; the no-JavaScript form path repeats the field
   * name once per ticked box, so getAll is joined the same way here. Without
   * this, an unhydrated submission would silently keep only the last tick.
   */
  let read: (id: string) => string;
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      read = (k) => (typeof parsed[k] === "string" ? (parsed[k] as string) : "");
    } else {
      const params = new URLSearchParams(raw);
      read = (k) => {
        const all = params.getAll(k);
        return all.length > 1 ? all.join(" | ") : (all[0] ?? "");
      };
    }
  } catch {
    return fail(request, 400, { ok: false, message: intakeCopy.failure });
  }

  // Honeypot. Answered with the shape of a success so a script learns nothing,
  // but nothing is sent.
  if (read("company_website").trim()) {
    if (wantsJson(request)) return NextResponse.json({ ok: true } satisfies IntakeResponse);
    return redirectTo(request, `${intakeRoute.path}/submitted`);
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) {
    return fail(request, 429, { ok: false, message: intakeCopy.failure });
  }

  const errors = validateIntake(read);
  if (Object.keys(errors).length > 0) {
    return fail(request, 422, { ok: false, errors, message: intakeCopy.incomplete });
  }

  const businessName = read("business_name").trim();
  const email = read("email").trim();
  const contactName = read("your_name").trim();

  /*
   * Duplicate suppression. A double-clicked button, a retried fetch or a
   * refreshed POST inside the window is acknowledged without delivering the
   * brief twice.
   */
  const fingerprint = createHash("sha256")
    .update(`${email.toLowerCase()}|${businessName.toLowerCase()}`)
    .digest("hex");
  if (recent.has(fingerprint)) {
    if (wantsJson(request)) return NextResponse.json({ ok: true } satisfies IntakeResponse);
    return redirectTo(request, `${intakeRoute.path}/submitted`);
  }

  const brief = buildBrief(read);

  /*
   * DEVELOPMENT TRANSPORT. With LAUNCH_ENQUIRY_TRANSPORT=mock the brief is
   * logged and nothing is delivered, so the whole path can be exercised without
   * mailing anyone. It is NOT a fake success: every guard and the full
   * validation still ran to reach this point, and the response reflects what
   * actually happened to the message.
   *
   * Never set in production. Logged at error level on every call so a
   * misconfiguration is loud in the deployment log rather than silently
   * swallowing real briefs.
   */
  if (process.env.LAUNCH_ENQUIRY_TRANSPORT === "mock") {
    console.error("[launch-intake] MOCK TRANSPORT ACTIVE — brief accepted and NOT delivered.", {
      business: businessName.slice(0, 40),
      briefChars: brief.length,
    });
    recent.set(fingerprint, now);
    if (wantsJson(request)) {
      return NextResponse.json({ ok: true, message: intakeCopy.success } satisfies IntakeResponse);
    }
    return redirectTo(request, `${intakeRoute.path}/submitted`);
  }

  /*
   * Delivery, over the studio's own SMTP. The recipient comes from the
   * environment and never from the request, so this cannot be turned into an
   * open relay. Reply-To is the enquirer, so replying in the mail client
   * reaches them directly.
   */
  const sent = await sendMail({
    subject: `Project form — ${businessName}`,
    replyTo: email,
    text: [
      `Business: ${bodySafe(businessName)}`,
      `Contact: ${bodySafe(contactName)}`,
      `Email: ${bodySafe(email)}`,
      `Phone: ${bodySafe(read("phone").trim()) || "Not given"}`,
      `Source: ${intakeRoute.path} (launch offer intake)`,
      "",
      "----------------------------------------------------------------",
      "",
      brief,
    ].join("\n"),
  });

  if (!sent.ok) {
    return fail(request, 502, { ok: false, message: intakeCopy.failure });
  }

  recent.set(fingerprint, now);

  if (wantsJson(request)) {
    return NextResponse.json({ ok: true, message: intakeCopy.success } satisfies IntakeResponse);
  }
  return redirectTo(request, `${intakeRoute.path}/submitted`);
}

/** Anything but POST. Keeps the route from 405-ing with a stack trace. */
export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
