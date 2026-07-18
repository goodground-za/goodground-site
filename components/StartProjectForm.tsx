"use client";

import { useEffect, useRef, useState } from "react";
import { sendEnquiry, type SendResult } from "@/lib/enquiry";
import { site } from "@/content/site";

/**
 * Multi-step project enquiry, in the spirit of the Grow Brand start-project flow
 * but adapted to GoodGround: three quick option steps then a details step.
 *
 * The option steps auto-advance on selection; the details step validates and
 * submits through the shared sendEnquiry helper, so it lands at
 * hello@goodground.co.za like every other form. Accessible: a live progressbar,
 * each step is a labelled region, options are aria-pressed toggles, focus moves
 * to the new step heading on change, and errors are tied to their inputs.
 */

type Choice = { value: string; label: string; desc: string };

const choiceSteps: { key: string; eyebrow: string; heading: string; sub: string; choices: Choice[] }[] = [
  {
    key: "projectType",
    eyebrow: "Let's get started",
    heading: "What can we help you with?",
    sub: "Choose the area you need help in.",
    choices: [
      { value: "New website", label: "New website", desc: "A brand-new site, built from scratch." },
      { value: "Website redesign", label: "Website redesign", desc: "Rebuild or refresh an existing site." },
      { value: "Website care plan", label: "Website care plan", desc: "Ongoing support after launch." },
      { value: "Not sure yet", label: "Not sure yet", desc: "Help me work out what I need." },
    ],
  },
  {
    key: "projectSize",
    eyebrow: "Roughly how big",
    heading: "How big is the project?",
    sub: "A rough idea is fine, we'll firm it up together.",
    choices: [
      { value: "Starter", label: "Starter", desc: "A few pages, a credible first website." },
      { value: "Standard", label: "Standard", desc: "An established business that needs to sell." },
      { value: "Custom", label: "Custom", desc: "Booking, e-commerce, integrations, scale." },
      { value: "Not sure", label: "Not sure", desc: "Let's scope it on a call." },
    ],
  },
  {
    key: "timeline",
    eyebrow: "Timeline",
    heading: "When would you like to start?",
    sub: "No pressure, it just helps us plan ahead.",
    choices: [
      { value: "As soon as possible", label: "As soon as possible", desc: "We're ready to go." },
      { value: "In 1–3 months", label: "In 1–3 months", desc: "Planning ahead." },
      { value: "In 3–6 months", label: "In 3–6 months", desc: "On the horizon." },
      { value: "Just exploring", label: "Just exploring", desc: "Gathering information for now." },
    ],
  },
];

const TOTAL_STEPS = choiceSteps.length + 1; // + details step

const inputBase =
  "w-full rounded-2xl border bg-cream px-4 py-3 text-[15px] text-bark placeholder:text-bark-muted/60 " +
  "transition-colors duration-150 focus:border-ember focus:outline-none";

type DetailErrors = Partial<Record<"fullName" | "email", string>>;

export function StartProjectForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [details, setDetails] = useState({ fullName: "", businessName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<DetailErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | SendResult>("idle");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to the step heading on change so a screen reader announces it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const choose = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: DetailErrors = {};
    if (!details.fullName.trim()) next.fullName = "Please add your name.";
    if (!details.email.trim()) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) next.email = "That email doesn't look right.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    const result = await sendEnquiry("New project enquiry via goodground.co.za", {
      "Project type": answers.projectType ?? "-",
      "Project size": answers.projectSize ?? "-",
      Timeline: answers.timeline ?? "-",
      Name: details.fullName,
      Business: details.businessName,
      Email: details.email,
      Phone: details.phone,
      Message: details.message,
    });
    setStatus(result);
  };

  if (status === "success" || status === "mail") {
    return (
      <div className="rounded-block bg-surface border-bark/10 border p-8 text-center sm:p-12" role="status" aria-live="polite">
        <span className="bg-ember text-peach mx-auto grid size-12 place-items-center rounded-full">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h2 className="font-heading text-bark mt-6 text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em]">
          {status === "success" ? "That's landed with us." : "Check your email app."}
        </h2>
        <p className="text-bark-muted mx-auto mt-3 max-w-[44ch] text-[16px] leading-[1.6]">
          {status === "success"
            ? "Thanks. We'll be in touch within 1–2 business days to talk through your project."
            : `We've opened a message to ${site.email} with your answers. Hit send and we'll take it from there.`}
        </p>
      </div>
    );
  }

  const isDetails = step === choiceSteps.length;

  return (
    <div className="rounded-block bg-surface border-bark/10 border p-6 sm:p-8 md:p-10">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-bark-muted text-[13px] font-bold tracking-[0.1em] uppercase" aria-hidden="true">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="text-bark-muted hover:text-ember inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-medium transition-colors"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back
          </button>
        ) : null}
      </div>
      <div
        className="bg-cream mt-3 h-[6px] w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-label={`Step ${step + 1} of ${TOTAL_STEPS}`}
      >
        <div
          className="bg-ember h-full origin-left rounded-full transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${(step + 1) / TOTAL_STEPS})` }}
        />
      </div>

      {/* Choice steps */}
      {!isDetails ? (
        <div role="group" aria-labelledby="step-heading" className="mt-8">
          <p className="text-ember font-heading text-[13px] font-bold">{choiceSteps[step].eyebrow}</p>
          <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="font-heading text-bark mt-2 text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight font-bold tracking-[-0.02em] outline-none">
            {choiceSteps[step].heading}
          </h2>
          <p className="text-bark-muted mt-2 text-[15px]">{choiceSteps[step].sub}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {choiceSteps[step].choices.map((choice) => {
              const selected = answers[choiceSteps[step].key] === choice.value;
              return (
                <button
                  key={choice.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(choiceSteps[step].key, choice.value)}
                  className={`rounded-card group cursor-pointer border p-5 text-left transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 ${
                    selected ? "border-ember bg-ember/8" : "border-bark/15 bg-cream hover:border-ember/50"
                  }`}
                >
                  <span className="font-heading text-bark block text-[16px] font-bold">{choice.label}</span>
                  <span className="text-bark-muted mt-1 block text-[13px] leading-[1.5]">{choice.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // Details step
        <form onSubmit={submit} noValidate className="mt-8">
          <p className="text-ember font-heading text-[13px] font-bold">Almost done</p>
          <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="font-heading text-bark mt-2 text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight font-bold tracking-[-0.02em] outline-none">
            How can we reach you?
          </h2>
          <p className="text-bark-muted mt-2 text-[15px]">
            We&rsquo;ll get back to you within 1&ndash;2 business days.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <DetailField label="Full Name" name="fullName" required value={details.fullName} error={errors.fullName} onChange={(v) => setDetails((d) => ({ ...d, fullName: v }))} autoComplete="name" />
            <DetailField label="Business Name" name="businessName" value={details.businessName} onChange={(v) => setDetails((d) => ({ ...d, businessName: v }))} autoComplete="organization" />
            <DetailField label="Email" name="email" type="email" required value={details.email} error={errors.email} onChange={(v) => setDetails((d) => ({ ...d, email: v }))} autoComplete="email" />
            <DetailField label="Phone" name="phone" type="tel" value={details.phone} onChange={(v) => setDetails((d) => ({ ...d, phone: v }))} autoComplete="tel" />
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="font-heading text-bark mb-2 block text-[14px] font-bold">
              Anything else? <span className="text-bark-muted font-medium">(optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={details.message}
              onChange={(e) => setDetails((d) => ({ ...d, message: e.target.value }))}
              placeholder="Tell us more about what you're building."
              className={`${inputBase} resize-y border-bark/15`}
            />
          </div>

          {status === "error" ? (
            <p className="text-ember mt-6 text-[14px] font-medium" role="alert">
              Something went wrong sending that. Please email us directly at{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-pill bg-ember font-heading text-peach mt-8 inline-flex h-13 cursor-pointer items-center justify-center gap-2 px-7 text-[15px] font-bold shadow-soft transition-[transform,background-color] duration-150 hover:bg-ember/90 motion-safe:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send Your Enquiry"}
            {status === "submitting" ? null : <span aria-hidden="true">→</span>}
          </button>
        </form>
      )}
    </div>
  );
}

function DetailField({
  label,
  name,
  type = "text",
  required,
  value,
  error,
  onChange,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-heading text-bark mb-2 block text-[14px] font-bold">
        {label}
        {required ? <span className="text-ember"> *</span> : <span className="text-bark-muted font-medium"> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} ${error ? "border-ember" : "border-bark/15"}`}
      />
      {error ? (
        <p id={`${name}-error`} className="text-ember mt-1.5 text-[13px] font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}
