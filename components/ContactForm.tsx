"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { sendEnquiry } from "@/lib/enquiry";

/**
 * Copy deck §4 (fields, labels, submit) and §5 (success message), verbatim.
 *
 * Submission has two honest paths, no faking:
 *  - If NEXT_PUBLIC_WEB3FORMS_KEY is set, it POSTs to Web3Forms (the studio's
 *    existing form tool) and shows the success state only on a real 200.
 *  - With no key yet, it builds a mailto to hello@goodground.co.za pre-filled
 *    with the enquiry and opens the visitor's mail app. The form works end to
 *    end today; adding the key later upgrades it to a silent send.
 *
 * Accessibility: every field has a real <label>, required fields are marked and
 * announced, errors are tied to inputs via aria-describedby, and the honeypot is
 * hidden from everyone including screen readers.
 */

const projectTypes = ["New Website", "Website Redesign", "Website Care Plan", "Not Sure Yet"];

type Status = "idle" | "submitting" | "success" | "mail" | "error";
type Errors = Partial<Record<"fullName" | "email" | "projectType" | "message", string>>;

const inputBase =
  "w-full rounded-2xl border bg-cream px-4 py-3 text-[15px] text-bark placeholder:text-bark-muted/60 " +
  "transition-colors duration-150 focus:border-ember focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    if (!String(data.get("fullName") ?? "").trim()) next.fullName = "Please add your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn't look right.";
    if (!String(data.get("projectType") ?? "")) next.projectType = "Pick the closest option.";
    if (!String(data.get("message") ?? "").trim()) next.message = "Tell us a little about the project.";
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: a real person never fills this.
    if (data.get("botcheck")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[data-field="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    const payload = Object.fromEntries(data.entries());
    const result = await sendEnquiry("New website enquiry via goodground.co.za", {
      Name: String(payload.fullName ?? ""),
      Business: String(payload.businessName ?? ""),
      Email: String(payload.email ?? ""),
      Phone: String(payload.phone ?? ""),
      "Project type": String(payload.projectType ?? ""),
      Timeline: String(payload.timeline ?? ""),
      Message: String(payload.message ?? ""),
    });
    setStatus(result);
  };

  if (status === "success" || status === "mail") {
    return (
      <div
        className="rounded-block bg-surface border-bark/10 border p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="bg-ember text-peach grid size-12 place-items-center rounded-full">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h2 className="font-heading text-bark mt-6 text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em]">
          {status === "success" ? "That's landed with us." : "Check your email app."}
        </h2>
        <p className="text-bark-muted mt-3 max-w-[46ch] text-[16px] leading-[1.6]">
          {status === "success"
            ? "Thanks. We'll be in touch within 1–2 business days to talk through your project."
            : `We've opened a message to ${site.email} with your details. Hit send and we'll take it from there.`}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-block bg-surface border-bark/10 border p-6 sm:p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required error={errors.fullName} autoComplete="name" />
        <Field label="Business Name" name="businessName" autoComplete="organization" />
        <Field label="Email" name="email" type="email" required error={errors.email} autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="mt-5">
        <FieldLabel htmlFor="projectType" label="Project Type" required />
        <select
          id="projectType"
          name="projectType"
          data-field="projectType"
          defaultValue=""
          aria-required
          aria-invalid={!!errors.projectType}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
          className={`${inputBase} ${errors.projectType ? "border-ember" : "border-bark/15"}`}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <FieldError id="projectType-error" message={errors.projectType} />
      </div>

      <div className="mt-5">
        <FieldLabel htmlFor="message" label="Tell us about your project" required />
        <textarea
          id="message"
          name="message"
          data-field="message"
          rows={5}
          aria-required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="What are you building, and what do you want it to do?"
          className={`${inputBase} resize-y ${errors.message ? "border-ember" : "border-bark/15"}`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div className="mt-5">
        <Field label="Approximate timeline" name="timeline" optional placeholder="e.g. in the next 2–3 months" />
      </div>

      {/* Honeypot: off-screen, never announced, never tab-focusable. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Do not fill this
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
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
  );
}

function FieldLabel({ htmlFor, label, required, optional }: { htmlFor: string; label: string; required?: boolean; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="font-heading text-bark mb-2 block text-[14px] font-bold">
      {label}
      {required ? <span className="text-ember"> *</span> : null}
      {optional ? <span className="text-bark-muted font-medium"> (optional)</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-ember mt-1.5 text-[13px] font-medium">
      {message}
    </p>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  error,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} required={required} optional={optional} />
      <input
        id={name}
        name={name}
        type={type}
        data-field={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputBase} ${error ? "border-ember" : "border-bark/15"}`}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}
