import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { launchEnquiry, launchFieldLimits, launchRoute } from "@/content/websiteLaunch";
import { WEB3FORMS_PUBLIC_KEY } from "@/lib/enquiry";

/**
 * Enquiry endpoint for the /website-launch promotion.
 *
 * WHY THIS EXISTS. Every other form on the site posts to Web3Forms straight
 * from the browser (lib/enquiry.ts). That is fine for a general "tell us about
 * your project" message, but this promotion has an eligibility rule, and a rule
 * enforced only by a checkbox in the DOM is not enforced at all. So the browser
 * posts here, this route re-checks everything server-side, and only then hands
 * the message to the same Web3Forms delivery the rest of the site uses.
 *
 * HOSTING. This site runs on Vercel, not PHP-enabled cPanel, so the handler is
 * a Next.js Route Handler rather than a PHP script with an SMTP library. Same
 * intent, the architecture this project actually has.
 *
 * WHAT IS AND IS NOT GUARANTEED. The rate limit and the duplicate check below
 * are in-process. On Vercel that means per serverless instance, and they reset
 * on a cold start, so they raise the cost of casual abuse without being a hard
 * ceiling. A durable limiter (Vercel KV, Upstash) is the production upgrade and
 * is written up in the README. This is deliberately stated rather than implied.
 */

export const runtime = "nodejs";
/** Never cached: every POST is a distinct submission. */
export const dynamic = "force-dynamic";

/** Reject oversized bodies before parsing them. */
const MAX_BODY_BYTES = 16 * 1024;

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
/** An identical enquiry inside this window is treated as a double submit. */
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

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

/**
 * Anything that ends up in a mail header (subject, display name, Reply-To) gets
 * its CR/LF stripped. Web3Forms takes JSON over HTTPS so nothing can be injected
 * at our boundary, but these values do become headers downstream, and a newline
 * in a header value is how header injection works.
 */
const headerSafe = (value: string) => value.replace(/[\r\n\t\v\f\u0085\u2028\u2029]+/g, " ").trim();

/** Body text is escaped for the same reason a template would escape it. */
const bodySafe = (value: string) =>
  value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Field = "name" | "businessName" | "email" | "about" | "timeline" | "eligibility";
type Errors = Partial<Record<Field, string>>;

export type LaunchEnquiryResponse = {
  ok: boolean;
  /** Present only on failure. Field-level, never echoing submitted values. */
  errors?: Errors;
  message?: string;
};

function validate(get: (k: string) => string): { errors: Errors; clean: Record<string, string> } {
  const errors: Errors = {};
  const name = get("name").trim();
  const businessName = get("businessName").trim();
  const email = get("email").trim();
  const about = get("about").trim();
  const timeline = get("timeline").trim();
  const eligibility = get("eligibility");

  if (!name) errors.name = "Please add your name.";
  else if (name.length > launchFieldLimits.name) errors.name = "That name is too long.";

  if (!businessName) errors.businessName = "Please add your business name.";
  else if (businessName.length > launchFieldLimits.businessName)
    errors.businessName = "That business name is too long.";

  if (!email) errors.email = "We need an email address to reply to.";
  else if (email.length > launchFieldLimits.email) errors.email = "That email address is too long.";
  else if (!EMAIL.test(email)) errors.email = "That email address doesn’t look right.";

  if (!about) errors.about = "Tell us a little about your new business.";
  else if (about.length > launchFieldLimits.about) errors.about = "Please shorten this a little.";

  if (timeline.length > launchFieldLimits.timeline) errors.timeline = "Please shorten this a little.";

  // The rule the whole promotion rests on. Checked here, not just in the DOM.
  if (eligibility !== "confirmed") {
    errors.eligibility = "Please confirm this is a new business without a website.";
  }

  return { errors, clean: { name, businessName, email, about, timeline } };
}

/** A form POST with no JavaScript gets a redirect; fetch() gets JSON. */
function wantsJson(request: Request): boolean {
  const accept = request.headers.get("accept") ?? "";
  return accept.includes("application/json");
}

function redirectTo(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

function fail(request: Request, status: number, body: LaunchEnquiryResponse) {
  if (wantsJson(request)) return NextResponse.json(body, { status });
  return redirectTo(request, `${launchRoute.path}/enquiry-problem`);
}

export async function POST(request: Request) {
  const now = Date.now();
  sweep(now);

  /*
   * Same-origin check. A cross-site form can still POST here, so the Origin is
   * compared against this deployment's own host, which covers preview URLs and
   * localhost without listing them. Sec-Fetch-Site is checked where the browser
   * sends it. Neither header can be set by page JavaScript.
   */
  const selfHost = new URL(request.url).host;
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && new URL(origin).host !== selfHost) {
    return fail(request, 403, { ok: false, message: launchEnquiry.failure });
  }
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") {
    return fail(request, 403, { ok: false, message: launchEnquiry.failure });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return fail(request, 413, { ok: false, message: launchEnquiry.failure });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(request, 413, { ok: false, message: launchEnquiry.failure });
  }

  let get: (key: string) => string;
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      get = (k) => (typeof parsed[k] === "string" ? (parsed[k] as string) : "");
    } else {
      const params = new URLSearchParams(raw);
      get = (k) => params.get(k) ?? "";
    }
  } catch {
    return fail(request, 400, { ok: false, message: launchEnquiry.failure });
  }

  // Honeypot. A real person never fills this; a bot fills every field it finds.
  // Answered with the same shape as a success so a script learns nothing, but
  // nothing is sent.
  if (get("company_website").trim()) {
    if (wantsJson(request)) return NextResponse.json({ ok: true } satisfies LaunchEnquiryResponse);
    return redirectTo(request, `${launchRoute.path}/enquiry-received`);
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) {
    return fail(request, 429, { ok: false, message: launchEnquiry.failure });
  }

  const { errors, clean } = validate(get);
  if (Object.keys(errors).length > 0) {
    return fail(request, 422, { ok: false, errors, message: launchEnquiry.failure });
  }

  /*
   * Duplicate suppression. A double-clicked button, a retried fetch or a
   * refreshed POST inside the window is acknowledged without sending a second
   * message, so one enquiry does not become three leads in the inbox.
   */
  const fingerprint = createHash("sha256")
    .update(`${clean.email.toLowerCase()}|${clean.businessName.toLowerCase()}`)
    .digest("hex");
  if (recent.has(fingerprint)) {
    if (wantsJson(request)) return NextResponse.json({ ok: true } satisfies LaunchEnquiryResponse);
    return redirectTo(request, `${launchRoute.path}/enquiry-received`);
  }

  /*
   * DEVELOPMENT TRANSPORT. With LAUNCH_ENQUIRY_TRANSPORT=mock the enquiry is
   * logged and nothing is sent, so the whole path can be exercised without
   * mailing a real person. It is NOT a fake success: the route still ran every
   * validation, the eligibility check and the duplicate guard to get here, and
   * the response reflects what actually happened to the message.
   *
   * Never set this in production. It is logged at error level on every call so
   * a misconfiguration is loud in the deployment logs rather than silently
   * swallowing real leads. See the README.
   */
  if (process.env.LAUNCH_ENQUIRY_TRANSPORT === "mock") {
    console.error(
      "[website-launch] MOCK TRANSPORT ACTIVE — enquiry accepted and NOT delivered.",
      { business: clean.businessName.slice(0, 40), hasTimeline: Boolean(clean.timeline) },
    );
    recent.set(fingerprint, now);
    if (wantsJson(request)) {
      return NextResponse.json({ ok: true, message: launchEnquiry.success } satisfies LaunchEnquiryResponse);
    }
    return redirectTo(request, `${launchRoute.path}/enquiry-received`);
  }

  /*
   * Delivery. Recipient is fixed by the Web3Forms account this key belongs to,
   * not by anything in the request, so the endpoint cannot be turned into an
   * open relay. Server-side env wins; the public key is the zero-config
   * fallback the rest of the site already uses.
   */
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || WEB3FORMS_PUBLIC_KEY;
  if (!accessKey) {
    console.error("[website-launch] No Web3Forms access key configured.");
    return fail(request, 500, { ok: false, message: launchEnquiry.failure });
  }

  let accepted = false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: headerSafe(`Website Launch enquiry — ${clean.businessName}`),
        from_name: "GoodGround website",
        replyto: headerSafe(clean.email),
        Name: bodySafe(clean.name),
        Business: bodySafe(clean.businessName),
        Email: bodySafe(clean.email),
        "About the business": bodySafe(clean.about),
        "Preferred launch timing": bodySafe(clean.timeline) || "Not given",
        Eligibility: launchEnquiry.eligibilityLabel,
        Source: `${launchRoute.path} (Website Launch promotion)`,
      }),
    });
    const json = (await res.json()) as { success?: boolean };
    accepted = res.ok && json.success === true;
    if (!accepted) {
      // Status only. The provider's message can carry account details, and it
      // must not reach the browser or the logs of a shared deployment.
      console.error("[website-launch] Delivery rejected, status", res.status);
    }
  } catch (error) {
    console.error("[website-launch] Delivery threw:", (error as Error).name);
  }

  if (!accepted) {
    return fail(request, 502, { ok: false, message: launchEnquiry.failure });
  }

  recent.set(fingerprint, now);

  if (wantsJson(request)) {
    return NextResponse.json({ ok: true, message: launchEnquiry.success } satisfies LaunchEnquiryResponse);
  }
  return redirectTo(request, `${launchRoute.path}/enquiry-received`);
}

/** Anything but POST. Keeps the route from 405-ing with a stack trace. */
export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
