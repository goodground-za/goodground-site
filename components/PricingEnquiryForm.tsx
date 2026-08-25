"use client";

import { useEffect, useState } from "react";
import { formatRand } from "@/components/AnimatedNumber";
import { site } from "@/content/site";
import { sendEnquiry } from "@/lib/enquiry";

/**
 * Either a clicked fixed package, or the current Build Your Own selection —
 * set by PricingPackages/PricingConfigurator, read here to prefill the
 * enquiry so the studio doesn't have to ask what the visitor picked.
 */
export type SelectedConfig =
  | { kind: "package"; slug: string; name: string; total: number }
  | { kind: "custom"; items: { label: string; price: number }[]; total: number }
  | { kind: "fullservice"; monthlyFrom: number };

type Status = "idle" | "submitting" | "success" | "mail" | "error";
type Errors = Partial<Record<"fullName" | "email", string>>;

const inputBase =
  "w-full rounded-2xl border bg-ht-cream px-4 py-3 text-[15px] text-ht-purple placeholder:text-ht-purple/40 " +
  "transition-colors duration-150 focus:border-ht-orange focus:outline-none";

function summaryText(config: SelectedConfig) {
  if (config.kind === "package") return `${config.name} package — ${formatRand(config.total)}`;
  if (config.kind === "fullservice") return `Full Service — from ${formatRand(config.monthlyFrom)}/mo`;
  const lines = config.items.map((item) => `- ${item.label} (${formatRand(item.price)})`).join("\n");
  return `Build Your Own — ${formatRand(config.total)} total\n${lines}`;
}

/**
 * Modeled directly on ContactForm.tsx (same field set, validation, honeypot,
 * sendEnquiry() submission path, success/error states) — the one difference
 * is the read-only configuration summary sourced from whichever CTA path
 * (a package card, or the configurator's "Get This Quote") brought the
 * visitor here.
 */
export function PricingEnquiryForm({ selectedConfig }: { selectedConfig: SelectedConfig | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  // Re-arm the form if the visitor changes their selection after a previous submission.
  useEffect(() => {
    setStatus("idle");
  }, [selectedConfig]);

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    if (!String(data.get("fullName") ?? "").trim()) next.fullName = "Please add your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn't look right.";
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("botcheck")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[data-field="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    const payload = Object.fromEntries(data.entries());
    const result = await sendEnquiry("New pricing enquiry via goodground.co.za", {
      Name: String(payload.fullName ?? ""),
      Business: String(payload.businessName ?? ""),
      Email: String(payload.email ?? ""),
      Phone: String(payload.phone ?? ""),
      Configuration: selectedConfig ? summaryText(selectedConfig) : "Not specified",
      Message: String(payload.message ?? ""),
    });
    setStatus(result);
  };

  if (status === "success" || status === "mail") {
    return (
      <div
        className="rounded-block ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] bg-white p-8 ring-2 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="bg-ht-orange grid size-12 place-items-center rounded-full text-white">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h2 className="font-ht-display text-ht-purple mt-6 text-[clamp(1.5rem,3vw,2rem)] font-bold">
          {status === "success" ? "That's landed with us." : "Check your email app."}
        </h2>
        <p className="text-ht-purple/70 mt-3 max-w-[46ch] text-[16px] leading-[1.6]">
          {status === "success"
            ? "Thanks. We'll be in touch within 1–2 business days with a firm quote based on what you picked."
            : `We've opened a message to ${site.email} with your details. Hit send and we'll take it from there.`}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-block ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] bg-white p-6 ring-2 sm:p-8 md:p-10"
    >
      {selectedConfig ? (
        <div className="bg-ht-cream rounded-card mb-6 p-5">
          <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.1em] uppercase">
            Your configuration
          </p>
          {selectedConfig.kind === "package" ? (
            <p className="text-ht-purple/80 mt-2 text-[14px]">
              {selectedConfig.name} package — {formatRand(selectedConfig.total)}
            </p>
          ) : selectedConfig.kind === "fullservice" ? (
            <p className="text-ht-purple/80 mt-2 text-[14px]">
              Full Service — from {formatRand(selectedConfig.monthlyFrom)}/mo
            </p>
          ) : (
            <>
              <ul className="text-ht-purple/80 mt-2 space-y-1 text-[13.5px]">
                {selectedConfig.items.map((item) => (
                  <li key={item.label} className="flex justify-between gap-4">
                    <span>{item.label}</span>
                    <span className="tabular-nums">{formatRand(item.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-ht-purple mt-3 border-t border-ht-purple/10 pt-3 text-[14px] font-bold">
                Total: {formatRand(selectedConfig.total)}
              </p>
            </>
          )}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required error={errors.fullName} autoComplete="name" />
        <Field label="Business Name" name="businessName" autoComplete="organization" />
        <Field label="Email" name="email" type="email" required error={errors.email} autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="mt-5">
        <FieldLabel htmlFor="message" label="Anything else we should know?" optional />
        <textarea
          id="message"
          name="message"
          data-field="message"
          rows={5}
          placeholder="Tell us about the business and what you want the site to do (optional if your configuration above says it all)."
          className={`${inputBase} resize-y border-ht-purple/15`}
        />
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Do not fill this
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" ? (
        <p className="text-ht-crimson mt-6 text-[14px] font-medium" role="alert">
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
        className="rounded-pill bg-ht-orange font-ht-display text-ink mt-8 inline-flex h-13 cursor-pointer items-center justify-center gap-2 px-7 text-[15px] font-bold uppercase tracking-wide shadow-soft transition-[transform,background-color] duration-150 hover:bg-ht-orange/90 motion-safe:hover:scale-[1.02] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get This Quote"}
        {status === "submitting" ? null : <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
  optional,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="font-ht-display text-ht-purple mb-2 block text-[14px] font-bold">
      {label}
      {required ? <span className="text-ht-crimson"> *</span> : null}
      {optional ? <span className="text-ht-purple/70 font-medium"> (optional)</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-ht-crimson mt-1.5 text-[13px] font-medium">
      {message}
    </p>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} required={required} />
      <input
        id={name}
        name={name}
        type={type}
        data-field={name}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputBase} ${error ? "border-ht-orange" : "border-ht-purple/15"}`}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}
