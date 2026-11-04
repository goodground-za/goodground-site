"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { book } from "@/content/aiVisibility";
import { gardenRouteTowns, site } from "@/content/site";
import { funnelEvents } from "@/lib/analytics";
import { EMAIL_RE, LIMITS, WEBSITE_RE } from "@/lib/enquiryShared";

import { Button } from "../Button";
import { postEnquiry, sourceParams } from "../enquiry";
import { CheckField, Field } from "../Field";
import { Icon } from "../Icon";
import { Turnstile, turnstileEnabled } from "../Turnstile";
import { useLiveCounters } from "../useLiveCounters";

type FieldName = "businessName" | "town" | "mainService" | "websiteUrl" | "email" | "whatsapp" | "consent" | "turnstile";
type Errors = Partial<Record<FieldName, string>>;
type Outcome =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error" }
  | { kind: "booked"; email: string }
  | { kind: "waitlist"; message: string }
  | { kind: "repeat"; message: string };

const KNOWN_TOWNS = new Set(gardenRouteTowns.map((town) => town.toLowerCase()));

const CHECK_WAIT = "Please wait for the check below to finish, then send again.";
const CHECK_BLOCKED = `The spam check couldn’t load. Check your connection or ad blocker, then try again, or email us at ${site.email} and we’ll book your check by hand.`;

function validate(data: FormData, needsToken: boolean, token: string, blocked: boolean): Errors {
  const errors: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();

  const business = get("businessName");
  if (!business) errors.businessName = "Please add your business name.";
  else if (business.length > LIMITS.business) errors.businessName = "That business name is too long.";

  const town = get("town");
  if (!town) errors.town = "Please add your town.";
  else if (town.length > LIMITS.town) errors.town = "That town name is too long.";

  const service = get("mainService");
  if (!service) errors.mainService = "Tell us your main service.";
  else if (service.length > LIMITS.services) errors.mainService = "Please shorten this a little.";

  const site = get("websiteUrl");
  if (site && (site.length > LIMITS.website || !WEBSITE_RE.test(site))) errors.websiteUrl = "That website address doesn’t look right.";

  const email = get("email");
  if (!email) errors.email = "We need an email address to send your report to.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "That email address doesn’t look right.";

  if (get("whatsapp").length > LIMITS.phone) errors.whatsapp = "That number is too long.";
  if (data.get("consent") !== "yes") errors.consent = "Please tick the box so we can run your check.";
  if (needsToken && !token) errors.turnstile = blocked ? CHECK_BLOCKED : CHECK_WAIT;
  return errors;
}

/** Only a town from our own list goes into analytics; anything typed freely is "other". */
const townForAnalytics = (town: string) => (KNOWN_TOWNS.has(town.trim().toLowerCase()) ? town.trim() : "other");

/** `industry-{slug}` refs say which industry page sent the visitor; otherwise none. */
const industryFromRef = (ref: string) => (/^industry-[a-z0-9-]{1,60}$/.test(ref) ? ref.slice("industry-".length) : undefined);

/**
 * The free AI visibility check (#book on the AI visibility page). It is a REQUEST: the form never
 * runs a scan. It posts to /api/enquiry as formType ai-check, which emails the
 * team, applies the 30-day rule and the monthly cap (lib/freeCheck.ts), and
 * answers with what happened:
 *   booked   "Thanks. Your check is booked." and the three steps
 *   repeat   "We checked {business} on {date}. We've re-sent your report to {email}."
 *   waitlist "Fully booked for free checks this month", kept for the 1st of next month
 * `full` is the same cap (typed when the static page was built, then the live
 * one from /api/offer-spots), so the card already says "fully booked" before
 * anyone types. Spam: honeypot ("website"), the
 * 3-second rule (loadedAt) and Cloudflare Turnstile when a site key is set.
 * With JavaScript off it still posts and lands on /thanks?form=ai-check.
 */
export function AiCheckForm({ full: typedFull, nextRun: typedNextRun }: { full: boolean; nextRun: string }) {
  // The page is static: it renders the typed budget and the live one replaces it after load.
  const liveCheck = useLiveCounters()?.freeCheck;
  const full = liveCheck ? liveCheck.full : typedFull;
  const nextRun = liveCheck ? liveCheck.nextRun : typedNextRun;
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState("");
  const [tokenReset, setTokenReset] = useState(0);
  // The spam check can be blocked (ad blocker, strict network): say so, and let the visitor retry or email.
  const [blocked, setBlocked] = useState(false);
  const [challengeKey, setChallengeKey] = useState(0);
  const blockedBox = useRef<HTMLDivElement>(null);
  const loadedAt = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  // The form is replaced by a result: move focus to its heading so screen readers hear it.
  useEffect(() => {
    if (outcome.kind === "booked" || outcome.kind === "waitlist" || outcome.kind === "repeat") heading.current?.focus();
  }, [outcome.kind]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (outcome.kind === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data, turnstileEnabled, token, blocked);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      if (firstBad === "turnstile" && blocked) blockedBox.current?.focus();
      else form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setOutcome({ kind: "submitting" });
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const source = sourceParams("ai-visibility");
    const result = await postEnquiry({
      formType: "ai-check",
      businessName: get("businessName"),
      town: get("town"),
      mainService: get("mainService"),
      websiteUrl: get("websiteUrl"),
      email: get("email"),
      whatsapp: get("whatsapp"),
      consent: "yes",
      marketingOptIn: data.get("marketingOptIn") === "yes" ? "yes" : undefined,
      "cf-turnstile-response": token,
      pageUrl: window.location.pathname,
      loadedAt: String(loadedAt.current),
      website: get("website"),
      ...source,
    });

    if (result.status === "success") {
      if (result.result === "repeat") {
        setOutcome({
          kind: "repeat",
          message: result.message ?? `We checked ${result.business ?? "your business"} on ${result.date ?? "an earlier date"}. We’ve re-sent your report to ${get("email")}.`,
        });
      } else if (result.result === "waitlist") {
        funnelEvents.aiCheckWaitlistJoin({ ref: source.ref });
        setOutcome({
          kind: "waitlist",
          message: result.message ?? `We’re fully booked for free checks this month. You’re on the list, and we’ll run yours on ${nextRun}.`,
        });
      } else {
        funnelEvents.aiCheckRequestSent({ ref: source.ref, town: townForAnalytics(get("town")), industry: industryFromRef(source.ref) });
        setOutcome({ kind: "booked", email: get("email") });
      }
      return;
    }

    // A token is single use: ask for a fresh one before the next try.
    setToken("");
    setTokenReset((n) => n + 1);

    if (result.status === "invalid") {
      const e = result.errors;
      const next: Errors = {
        ...(e.businessName ? { businessName: e.businessName } : {}),
        ...(e.town ? { town: e.town } : {}),
        ...(e.mainServices ? { mainService: e.mainServices } : {}),
        ...(e.websiteUrl ? { websiteUrl: e.websiteUrl } : {}),
        ...(e.email ? { email: e.email } : {}),
        ...(e.consent ? { consent: e.consent } : {}),
        ...(e.turnstile ? { turnstile: e.turnstile } : {}),
      };
      if (Object.keys(next).length > 0) {
        setErrors(next);
        setOutcome({ kind: "idle" });
        form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
        return;
      }
    }
    setOutcome({ kind: "error" });
  }

  if (outcome.kind === "booked" || outcome.kind === "waitlist" || outcome.kind === "repeat") {
    return (
      <div className="ai-form ai-form--done" role="status">
        <span className="ai-form__done-icon" aria-hidden="true">
          <Icon name={outcome.kind === "waitlist" ? "bell" : "check"} size={22} stroke={2.6} />
        </span>
        {outcome.kind === "booked" ? (
          <>
            <h3 ref={heading} tabIndex={-1}>
              Thanks. Your check is booked.
            </h3>
            <ol className="ai-form__steps">
              <li>We run your check.</li>
              <li>A person reviews it.</li>
              <li>You get the report within 2 business days.</li>
            </ol>
            <p>
              We’ve sent a confirmation to {outcome.email}. Meanwhile, <Link href="#sample">see what a report looks like</Link>.
            </p>
          </>
        ) : (
          <>
            <h3 ref={heading} tabIndex={-1}>
              {outcome.kind === "waitlist" ? "You’re on the list." : "We’ve already checked you."}
            </h3>
            <p>{outcome.message}</p>
          </>
        )}
      </div>
    );
  }

  const busy = outcome.kind === "submitting";

  return (
    <form className="ai-form" action="/api/enquiry" method="post" onSubmit={onSubmit} noValidate aria-labelledby="ai-book-title">
      <input type="hidden" name="formType" value="ai-check" />
      <input type="hidden" name="pageUrl" value="/services/ai-visibility" />

      {full ? (
        <div className="ai-form__banner" role="note">
          <strong>Fully booked for free checks this month</strong>
          <span>Leave your details and we’ll run yours on {nextRun}.</span>
        </div>
      ) : null}

      {/* Honeypot: off-screen rather than display:none, never announced. */}
      <div className="ai-form__trap" aria-hidden="true">
        <label htmlFor="ai-company-website">Do not fill this in</label>
        <input id="ai-company-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Business name" name="businessName" idPrefix="ai" placeholder="Outeniqua Plumbing" autoComplete="organization" required maxLength={LIMITS.business} error={errors.businessName} />
      <div className="ai-form__row">
        <Field label="Town" name="town" idPrefix="ai" placeholder="George" autoComplete="address-level2" list="ai-towns" required maxLength={LIMITS.town} error={errors.town} />
        <Field label="Main service" name="mainService" idPrefix="ai" placeholder="Plumber" required maxLength={LIMITS.services} error={errors.mainService} />
      </div>
      <datalist id="ai-towns">
        {gardenRouteTowns.map((town) => (
          <option key={town} value={town} />
        ))}
      </datalist>
      <Field
        label="Website"
        name="websiteUrl"
        idPrefix="ai"
        inputMode="url"
        autoComplete="url"
        placeholder="yourbusiness.co.za"
        optional
        maxLength={LIMITS.website}
        error={errors.websiteUrl}
      />
      <div className="ai-form__row">
        <Field label="Email" name="email" idPrefix="ai" type="email" inputMode="email" placeholder="name@business.co.za" autoComplete="email" required maxLength={LIMITS.email} error={errors.email} />
        <Field label="WhatsApp" name="whatsapp" idPrefix="ai" type="tel" inputMode="tel" placeholder="082 000 0000" autoComplete="tel" optional maxLength={LIMITS.phone} error={errors.whatsapp} />
      </div>

      {/* POPIA: consent to run the check is required; the marketing opt-in is separate and unticked. */}
      <CheckField
        label={
          <>
            I agree that GoodGround may use these details to run my check and contact me about it, as set out in the{" "}
            <Link href="/legal#privacy" target="_blank" rel="noopener">
              privacy notice
            </Link>
            .
          </>
        }
        name="consent"
        value="yes"
        idPrefix="ai"
        required
        error={errors.consent}
      />
      <CheckField label={book.marketing} name="marketingOptIn" value="yes" idPrefix="ai" />

      <Turnstile
        key={challengeKey}
        onToken={setToken}
        onStatus={(status) => setBlocked(status === "blocked")}
        resetKey={tokenReset}
        hidden={blocked}
      />
      {blocked ? (
        <div ref={blockedBox} className="ai-form__blocked" role="alert" tabIndex={-1}>
          <p>{CHECK_BLOCKED}</p>
          <button
            type="button"
            className="ai-form__retry"
            onClick={() => {
              setBlocked(false);
              setToken("");
              setErrors((e) => ({ ...e, turnstile: undefined }));
              setChallengeKey((n) => n + 1);
            }}
          >
            Try the check again
          </button>
        </div>
      ) : errors.turnstile ? (
        <p className="gg-field__error" role="alert" data-field="turnstile">
          {errors.turnstile}
        </p>
      ) : null}

      <Button type="submit" variant="coral" full disabled={busy}>
        {busy ? "Sending…" : full ? book.waitlistButton : book.button}
      </Button>
      <p className="ai-form__fine">{full ? `We’ll run your check on ${nextRun} and send the report within 2 business days of that.` : book.note}</p>

      <div role="status" aria-live="polite">
        {outcome.kind === "error" ? (
          <p className="ai-form__error">We couldn’t send that just now. Your answers are still here, so you can try again, or email hello@goodground.co.za.</p>
        ) : null}
      </div>
    </form>
  );
}
