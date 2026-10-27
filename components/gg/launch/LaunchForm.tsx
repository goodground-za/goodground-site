"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { launchEnquiry, launchFieldLimits } from "@/content/websiteLaunch";
import { promoEvents } from "@/lib/analytics";

import { Button } from "../Button";
import { CheckField, Field, TextArea } from "../Field";
import { Icon } from "../Icon";
import { getAvailability } from "./data";

type FieldName = "name" | "businessName" | "email" | "about" | "timeline" | "eligibility";
type Errors = Partial<Record<FieldName, string>>;
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
  else if (businessName.length > launchFieldLimits.businessName) errors.businessName = "That business name is too long.";

  const email = get("email");
  if (!email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(email)) errors.email = "That email address doesn’t look right.";

  const about = get("about");
  if (!about) errors.about = "Tell us a little about your new business.";
  else if (about.length > launchFieldLimits.about) errors.about = "Please shorten this a little.";

  if (data.get("eligibility") !== "confirmed") errors.eligibility = "Please confirm this is a new business without a website.";
  return errors;
}

/**
 * Launch 10. The availability form. Submission is never simulated: the success
 * card appears only after /api/website-launch answers ok (which only happens
 * after delivery). A failure keeps every value. It is a real <form> with an
 * action, so it still posts, and redirects to a confirmation page, with no
 * JavaScript. Tagged formType=launch-availability and plan=launch (or
 * launch-waitlist when the month is full); the server re-checks everything,
 * including the eligibility rule.
 */
export function LaunchForm() {
  const availability = getAvailability();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [first, setFirst] = useState("");
  const started = useRef(false);
  const converted = useRef(false);

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    promoEvents.formStart();
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      promoEvents.formError("validation");
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFirst(String(data.get("name") ?? "").trim().split(/\s+/)[0] ?? "");

    let response: Response;
    try {
      response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
    } catch {
      setStatus("error");
      promoEvents.formError("network");
      return;
    }

    let payload: { ok?: boolean; errors?: Errors } = {};
    try {
      payload = await response.json();
    } catch {
      /* a non-JSON body is a failure like any other */
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
      form.querySelector<HTMLElement>(`[name="${Object.keys(payload.errors)[0]}"]`)?.focus();
      return;
    }

    setStatus("error");
    promoEvents.formError("server");
  }

  if (status === "success") {
    return (
      <div className="ln-form ln-form--done" role="status">
        <span className="ln-form__done-icon" aria-hidden="true">
          <Icon name="check" size={22} stroke={2.6} />
        </span>
        <h3>
          Thanks{first ? `, ${first}` : ""}. We’ll {availability.soldOut ? "add you to the waitlist and " : ""}confirm availability within 1–2
          business days.
        </h3>
        <p>{launchEnquiry.success}</p>
      </div>
    );
  }

  return (
    <form className="ln-form" action="/api/website-launch" method="post" onSubmit={onSubmit} onInput={onFirstInteraction} noValidate>
      <input type="hidden" name="formType" value="launch-availability" />
      <input type="hidden" name="plan" value={availability.plan} />

      {/* Honeypot: off-screen rather than display:none, never announced. */}
      <div className="ln-form__trap" aria-hidden="true">
        <label htmlFor="ln-company-website">Do not fill this in</label>
        <input id="ln-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="ln-form__row">
        <Field label="Your name" name="name" idPrefix="ln" placeholder="Full name" autoComplete="name" required maxLength={launchFieldLimits.name} error={errors.name} />
        <Field
          label="Business name"
          name="businessName"
          idPrefix="ln"
          placeholder="Your new business"
          autoComplete="organization"
          required
          maxLength={launchFieldLimits.businessName}
          error={errors.businessName}
        />
      </div>
      <Field
        label="Email address"
        name="email"
        idPrefix="ln"
        type="email"
        inputMode="email"
        placeholder="name@business.co.za"
        autoComplete="email"
        required
        maxLength={launchFieldLimits.email}
        error={errors.email}
      />
      <TextArea
        label="Tell us about your new business"
        name="about"
        idPrefix="ln"
        placeholder="What you offer and who you want to reach"
        required
        rows={3}
        maxLength={launchFieldLimits.about}
        error={errors.about}
      />
      <Field
        label="When would you like to launch your website?"
        name="timeline"
        idPrefix="ln"
        placeholder="e.g. early December"
        optional
        autoComplete="off"
        maxLength={launchFieldLimits.timeline}
        error={errors.timeline}
        className="ln-form__extra"
      />

      {/* Required, unchecked by default, and not a marketing opt-in: it confirms one fact. */}
      <CheckField label={launchEnquiry.eligibilityLabel} name="eligibility" value="confirmed" idPrefix="ln" required error={errors.eligibility} />

      <Button type="submit" variant="coral" full disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : availability.soldOut ? availability.cta : "Check availability"}
      </Button>

      <p className="ln-form__fine">
        We use these details to respond to your enquiry. See our <Link href="/legal#privacy">privacy policy</Link>. Sending this form
        doesn’t commit you to a purchase.
      </p>

      <div role="status" aria-live="polite">
        {status === "error" ? <p className="ln-form__error">{launchEnquiry.failure}</p> : null}
      </div>
    </form>
  );
}
