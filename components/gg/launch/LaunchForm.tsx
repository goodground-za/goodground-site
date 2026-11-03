"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { gardenRouteTowns } from "@/content/site";
import { launchEnquiry, launchFieldLimits } from "@/content/websiteLaunch";
import { funnelEvents, promoEvents } from "@/lib/analytics";

import { Button } from "../Button";
import { postEnquiry, sourceParams } from "../enquiry";
import { CheckField, Field, TextArea } from "../Field";
import { Icon } from "../Icon";
import { useAvailability } from "./AvailabilityContext";

type FieldName = "fullName" | "businessName" | "town" | "mainService" | "email" | "message" | "launchTiming" | "eligibility";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOWN_MAX = 80;
const SERVICE_MAX = 300;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();

  const name = get("fullName");
  if (!name) errors.fullName = "Please add your name.";
  else if (name.length > launchFieldLimits.name) errors.fullName = "That name is too long.";

  const businessName = get("businessName");
  if (!businessName) errors.businessName = "Please add your business name.";
  else if (businessName.length > launchFieldLimits.businessName) errors.businessName = "That business name is too long.";

  const town = get("town");
  if (!town) errors.town = "Please add your town.";
  else if (town.length > TOWN_MAX) errors.town = "That town name is too long.";

  const service = get("mainService");
  if (!service) errors.mainService = "Tell us your main service.";
  else if (service.length > SERVICE_MAX) errors.mainService = "Please shorten this a little.";

  const email = get("email");
  if (!email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(email)) errors.email = "That email address doesn’t look right.";

  const about = get("message");
  if (!about) errors.message = "Tell us a little about your new business.";
  else if (about.length > launchFieldLimits.about) errors.message = "Please shorten this a little.";

  if (data.get("eligibility") !== "confirmed") errors.eligibility = "Please confirm this is a new business without a website.";
  return errors;
}

/**
 * Launch 10. The availability form for the New Business Offer. Submission is
 * never simulated: the success card appears only after /api/enquiry answers ok
 * (which only happens after the studio email was delivered). A failure keeps
 * every value. It is a real <form> with an action, so with no JavaScript it
 * still posts and lands on /thanks?form=new-business-offer. Tagged formType
 * new-business-offer, plan local-start and offer new-business (or
 * new-business-waitlist when the month is full); the server decides sold out
 * again from the live count and re-checks everything, including the eligibility
 * confirmation.
 */
export function LaunchForm() {
  const availability = useAvailability();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [first, setFirst] = useState("");
  const [copy, setCopy] = useState(false);
  const started = useRef(false);
  const converted = useRef(false);
  const loadedAt = useRef(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

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
    const get = (k: string) => String(data.get(k) ?? "").trim();
    setFirst(get("fullName").split(/\s+/)[0] ?? "");

    const result = await postEnquiry({
      formType: "new-business-offer",
      plan: "local-start",
      offer: availability.offer,
      fullName: get("fullName"),
      businessName: get("businessName"),
      town: get("town"),
      mainService: get("mainService"),
      email: get("email"),
      message: get("message"),
      launchTiming: get("launchTiming"),
      eligibility: "confirmed",
      pageUrl: window.location.pathname,
      loadedAt: String(loadedAt.current),
      website: get("website"),
      ...sourceParams("offer"),
    });

    if (result.status === "success") {
      if (!converted.current) {
        converted.current = true;
        promoEvents.leadSuccess();
        funnelEvents.enquirySent({ track: "local", plan: "local-start", ref: "offer" });
        if (availability.soldOut) funnelEvents.offerWaitlistJoin({ month: availability.nextMonth });
      }
      setCopy(result.copy);
      setStatus("success");
      return;
    }

    if (result.status === "invalid") {
      const e = result.errors;
      const next: Errors = {
        ...(e.fullName ? { fullName: e.fullName } : {}),
        ...(e.businessName ? { businessName: e.businessName } : {}),
        ...(e.town ? { town: e.town } : {}),
        ...(e.mainServices ? { mainService: e.mainServices } : {}),
        ...(e.email ? { email: e.email } : {}),
        ...(e.message ? { message: e.message } : {}),
        ...(e.eligibility ? { eligibility: e.eligibility } : {}),
      };
      if (Object.keys(next).length > 0) {
        setErrors(next);
        setStatus("idle");
        promoEvents.formError("validation");
        form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
        return;
      }
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
          {availability.soldOut
            ? `Thanks${first ? `, ${first}` : ""}. You’re on the ${availability.nextMonth} waitlist, and we’ll be in touch within 1–2 business days.`
            : `Thanks${first ? `, ${first}` : ""}. Your spot is held while we confirm, within 1–2 business days.`}
        </h3>
        <p>
          {copy ? "We’ve sent a confirmation to your inbox. " : ""}
          {launchEnquiry.success}
        </p>
      </div>
    );
  }

  return (
    <form className="ln-form" action="/api/enquiry" method="post" onSubmit={onSubmit} onInput={onFirstInteraction} noValidate>
      <input type="hidden" name="formType" value="new-business-offer" />
      <input type="hidden" name="plan" value="local-start" />
      <input type="hidden" name="offer" value={availability.offer} />
      <input type="hidden" name="pageUrl" value="/website-launch" />

      {/* Honeypot: off-screen rather than display:none, never announced. */}
      <div className="ln-form__trap" aria-hidden="true">
        <label htmlFor="ln-company-website">Do not fill this in</label>
        <input id="ln-company-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="ln-form__row">
        <Field label="Your name" name="fullName" idPrefix="ln" placeholder="Full name" autoComplete="name" required maxLength={launchFieldLimits.name} error={errors.fullName} />
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
      <div className="ln-form__row">
        <Field
          label="Town"
          name="town"
          idPrefix="ln"
          placeholder="George"
          autoComplete="address-level2"
          list="ln-towns"
          required
          maxLength={TOWN_MAX}
          error={errors.town}
        />
        <Field
          label="Main service"
          name="mainService"
          idPrefix="ln"
          placeholder="Plumber, café, photographer"
          required
          maxLength={SERVICE_MAX}
          error={errors.mainService}
        />
      </div>
      <datalist id="ln-towns">
        {gardenRouteTowns.map((town) => (
          <option key={town} value={town} />
        ))}
      </datalist>
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
        name="message"
        idPrefix="ln"
        placeholder="What you offer and who you want to reach"
        required
        rows={3}
        maxLength={launchFieldLimits.about}
        error={errors.message}
      />
      <Field
        label="When would you like to launch your website?"
        name="launchTiming"
        idPrefix="ln"
        placeholder="e.g. early December"
        optional
        autoComplete="off"
        maxLength={launchFieldLimits.timeline}
        error={errors.launchTiming}
        className="ln-form__extra"
      />

      {/* Required, unchecked by default, and not a marketing opt-in: it confirms one fact. */}
      <CheckField label={launchEnquiry.eligibilityLabel} name="eligibility" value="confirmed" idPrefix="ln" required error={errors.eligibility} />

      <Button type="submit" variant="coral" full disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : availability.cta}
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
