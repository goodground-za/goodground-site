"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { launchEnquiry, launchFieldLimits, launchOffer } from "@/content/websiteLaunch";
import { promoEvents } from "@/lib/analytics";

/**
 * The enquiry form for the Website Launch promotion.
 *
 * SUBMISSION IS NEVER SIMULATED. The success panel appears only after
 * /api/website-launch has returned ok, which itself only happens after the
 * delivery provider accepted the message. There is no timer, no optimistic
 * state and no client-only success path. A failure keeps every entered value.
 *
 * IT WORKS WITHOUT JAVASCRIPT. The element is a real form with an action and a
 * method, so an unhydrated browser posts it normally and the route answers with
 * a redirect to a confirmation page. With JavaScript the submit is intercepted
 * and the same route answers with JSON, which buys field-level errors and
 * keeps the visitor on the page.
 *
 * VALIDATION IS MIRRORED, NOT TRUSTED. The checks below are for fast feedback.
 * The same rules run again on the server, including the eligibility rule, which
 * is the one that actually decides whether an enquiry belongs in this promotion.
 */

type Field = "name" | "businessName" | "email" | "about" | "timeline" | "eligibility";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();

  const name = get("name");
  if (!name) errors.name = "Please add your name.";
  else if (name.length > launchFieldLimits.name) errors.name = "That name is too long.";

  const businessName = get("businessName");
  if (!businessName) errors.businessName = "Please add your business name.";
  else if (businessName.length > launchFieldLimits.businessName)
    errors.businessName = "That business name is too long.";

  const email = get("email");
  if (!email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(email)) errors.email = "That email address doesn’t look right.";

  const about = get("about");
  if (!about) errors.about = "Tell us a little about your new business.";
  else if (about.length > launchFieldLimits.about) errors.about = "Please shorten this a little.";

  if (data.get("eligibility") !== "confirmed") {
    errors.eligibility = "Please confirm this is a new business without a website.";
  }
  return errors;
}

export function LaunchForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const started = useRef(false);
  /** The conversion fires once per page view, after backend acceptance. */
  const converted = useRef(false);

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    promoEvents.formStart();
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // double-click guard
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      promoEvents.formError("validation");
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    let response: Response;
    try {
      response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
    } catch {
      // The request never reached the server. Values stay exactly as typed.
      setStatus("error");
      promoEvents.formError("network");
      return;
    }

    let payload: { ok?: boolean; errors?: Errors } = {};
    try {
      payload = await response.json();
    } catch {
      // Fall through: a non-JSON body is a failure like any other.
    }

    if (response.ok && payload.ok) {
      if (!converted.current) {
        converted.current = true;
        promoEvents.leadSuccess();
      }
      setStatus("success");
      return;
    }

    if (payload.errors && Object.keys(payload.errors).length > 0) {
      setErrors(payload.errors);
      setStatus("idle");
      promoEvents.formError("validation");
      const first = Object.keys(payload.errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("error");
    promoEvents.formError("server");
  }

  if (status === "success") {
    return (
      <div className="gg-launch__form">
        <div className="gg-launch__status gg-launch__status--ok" role="status">
          <p>{launchEnquiry.success}</p>
        </div>
      </div>
    );
  }

  const describe = (field: Field, hintId?: string) => {
    const ids = [errors[field] ? `gl-${field}-error` : null, hintId ?? null].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
  };

  return (
    <form
      className="gg-launch__form"
      action="/api/website-launch"
      method="post"
      onSubmit={onSubmit}
      onInput={onFirstInteraction}
      noValidate
    >
      {/* Honeypot. Off-screen rather than display:none, and never announced. */}
      <div className="gg-launch__hp" aria-hidden="true">
        <label htmlFor="gl-company-website">Do not fill this in</label>
        <input id="gl-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="gg-launch__fields gg-launch__fields--two">
        <div className="gg-launch__field">
          <label htmlFor="gl-name">
            Your name <span className="gg-launch__req" aria-hidden="true">*</span>
          </label>
          <input
            id="gl-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={launchFieldLimits.name}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
          />
          {errors.name ? (
            <span className="gg-launch__error" id="gl-name-error">
              {errors.name}
            </span>
          ) : null}
        </div>

        <div className="gg-launch__field">
          <label htmlFor="gl-business">
            Business name <span className="gg-launch__req" aria-hidden="true">*</span>
          </label>
          <input
            id="gl-business"
            name="businessName"
            type="text"
            required
            autoComplete="organization"
            maxLength={launchFieldLimits.businessName}
            aria-required="true"
            aria-invalid={errors.businessName ? true : undefined}
            aria-describedby={describe("businessName")}
          />
          {errors.businessName ? (
            <span className="gg-launch__error" id="gl-businessName-error">
              {errors.businessName}
            </span>
          ) : null}
        </div>
      </div>

      <div className="gg-launch__fields" style={{ marginTop: "1.25rem" }}>
        <div className="gg-launch__field">
          <label htmlFor="gl-email">
            Email address <span className="gg-launch__req" aria-hidden="true">*</span>
          </label>
          <input
            id="gl-email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            maxLength={launchFieldLimits.email}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
          />
          {errors.email ? (
            <span className="gg-launch__error" id="gl-email-error">
              {errors.email}
            </span>
          ) : null}
        </div>

        <div className="gg-launch__field">
          <label htmlFor="gl-about">
            Tell us about your new business{" "}
            <span className="gg-launch__req" aria-hidden="true">*</span>
          </label>
          <textarea
            id="gl-about"
            name="about"
            required
            rows={4}
            maxLength={launchFieldLimits.about}
            aria-required="true"
            aria-invalid={errors.about ? true : undefined}
            aria-describedby={describe("about")}
          />
          {errors.about ? (
            <span className="gg-launch__error" id="gl-about-error">
              {errors.about}
            </span>
          ) : null}
        </div>

        <div className="gg-launch__field">
          <label htmlFor="gl-timeline">
            When would you like to launch your website?{" "}
            <span className="gg-launch__optional">(optional)</span>
          </label>
          <input
            id="gl-timeline"
            name="timeline"
            type="text"
            autoComplete="off"
            maxLength={launchFieldLimits.timeline}
            aria-invalid={errors.timeline ? true : undefined}
            aria-describedby={describe("timeline")}
          />
          {errors.timeline ? (
            <span className="gg-launch__error" id="gl-timeline-error">
              {errors.timeline}
            </span>
          ) : null}
        </div>
      </div>

      {/* Eligibility. Unchecked by default, required, and NOT a marketing
          opt-in: it confirms one fact and nothing else. */}
      <div
        className="gg-launch__check"
        data-invalid={errors.eligibility ? "true" : undefined}
        style={{ marginTop: "1.25rem" }}
      >
        <input
          id="gl-eligibility"
          name="eligibility"
          type="checkbox"
          value="confirmed"
          required
          aria-required="true"
          aria-invalid={errors.eligibility ? true : undefined}
          aria-describedby={errors.eligibility ? "gl-eligibility-error" : undefined}
        />
        <div>
          <label htmlFor="gl-eligibility">{launchEnquiry.eligibilityLabel}</label>
          {errors.eligibility ? (
            <span className="gg-launch__error" id="gl-eligibility-error">
              {errors.eligibility}
            </span>
          ) : null}
        </div>
      </div>

      <p className="gg-launch__privacy">
        We use these details to respond to your enquiry. See our{" "}
        <Link href="/legal#privacy">privacy policy</Link>.
      </p>

      <button
        type="submit"
        className="gg-launch__btn gg-launch__btn--lg gg-launch__submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : launchOffer.cta}
      </button>

      <p className="gg-launch__form-support">{launchEnquiry.submitSupport}</p>

      {/* Always in the DOM so a screen reader hears the change rather than the
          arrival of a new region. */}
      <div role="status" aria-live="polite">
        {status === "error" ? (
          <div className="gg-launch__status gg-launch__status--bad">
            <p>{launchEnquiry.failure}</p>
          </div>
        ) : null}
        {status === "submitting" ? <span className="gg-launch__hp">Sending your enquiry.</span> : null}
      </div>
    </form>
  );
}
