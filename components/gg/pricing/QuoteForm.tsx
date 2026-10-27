"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import { sendEnquiry } from "@/lib/enquiry";

import { Button } from "../Button";
import { Field, TextArea } from "../Field";
import { formatRand } from "../format";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { Tag } from "../Tag";
import { balanceOf, depositOf, fullService, instalmentFor, packageBySlug } from "./data";
import { scrollToId, usePricing } from "./PricingProvider";

type Status = "idle" | "submitting" | "success" | "mail" | "error";
type Errors = Partial<Record<"fullName" | "email", string>>;

/**
 * Pricing 08. The quote form, with whatever the visitor picked attached. It
 * sends through the same path as every other form on the site (lib/enquiry.ts),
 * tagged formType pricing-quote, with the build or package in the message.
 *
 * Arriving from "View & send" or "Choose …" pulses the attached card once and
 * moves focus to the name field. With nothing attached the card is hidden.
 */
export function QuoteForm() {
  const { attached, attachPulse, billing, lines, total, hasFrom, detach } = usePricing();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [more, setMore] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [firstName, setFirstName] = useState("");
  const form = useRef<HTMLFormElement>(null);

  // A new attachment pulses the card and moves focus to the name field.
  useEffect(() => {
    if (!attachPulse) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPulse(attachPulse);
    setStatus((s) => (s === "success" || s === "mail" ? "idle" : s));
    const timer = window.setTimeout(() => {
      form.current?.querySelector<HTMLElement>('[data-field="fullName"]')?.focus({ preventScroll: true });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [attachPulse]);

  const payLabel = billing === "deposit" ? "50% deposit" : "12 instalments";

  // What the card shows, and the text that goes in the email.
  const view = (() => {
    if (!attached) return null;
    if (attached.kind === "package") {
      const pkg = packageBySlug(attached.slug);
      if (!pkg) return null;
      return {
        title: "Attached: your package",
        chips: [`${pkg.name} package`, payLabel],
        left: `from ${formatRand(pkg.total)} · ${payLabel}`,
        right: billing === "deposit" ? `${formatRand(depositOf(pkg.total))} deposit` : `${formatRand(instalmentFor(pkg.total))}/mo`,
        edit: () => scrollToId("packages"),
        text: `${pkg.name} package, from ${formatRand(pkg.total)}. ${
          billing === "deposit"
            ? `50% deposit: ${formatRand(depositOf(pkg.total))} to start + ${formatRand(balanceOf(pkg.total))} on completion`
            : `12 monthly instalments of ${formatRand(instalmentFor(pkg.total))}`
        }`,
      };
    }
    if (attached.kind === "full-service") {
      return {
        title: "Attached: Full Service",
        chips: ["Full Service", "Month to month"],
        left: `from ${formatRand(fullService.monthlyFrom)}/mo · cancel any time`,
        right: `${formatRand(fullService.monthlyFrom)}/mo`,
        edit: () => scrollToId("full-service"),
        text: `Full Service, from ${formatRand(fullService.monthlyFrom)}/mo, month to month`,
      };
    }
    const list = lines.map((line) => `- ${line.name} (${line.from ? "from " : ""}${formatRand(line.amount)})`).join("\n");
    return {
      title: "Attached: your build",
      chips: lines.map((line) => line.name.replace(/^Base Build Fee$/, "Base build")),
      left: `${hasFrom ? "From " : ""}${formatRand(total)} · ${payLabel}`,
      right: billing === "deposit" ? `${formatRand(depositOf(total))} deposit` : `${formatRand(instalmentFor(total))}/mo`,
      edit: () => scrollToId("build-your-own"),
      text: `Build Your Own, ${hasFrom ? "from " : ""}${formatRand(total)} total\n${list}\nPayment: ${
        billing === "deposit"
          ? `50% deposit (${formatRand(depositOf(total))} to start + ${formatRand(balanceOf(total))} on completion)`
          : `12 monthly instalments of ${formatRand(instalmentFor(total))}`
      }`,
    };
  })();

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    if (!String(data.get("fullName") ?? "").trim()) next.fullName = "Please add your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn’t look right.";
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const el = event.currentTarget;
    const data = new FormData(el);
    if (data.get("botcheck")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setMore(true);
      el.querySelector<HTMLElement>(`[data-field="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const name = String(data.get("fullName") ?? "").trim();
    setFirstName(name.split(/\s+/)[0] ?? "");
    const result = await sendEnquiry("New pricing quote request via goodground.co.za", {
      "Form type": "pricing-quote",
      Name: name,
      Business: String(data.get("businessName") ?? ""),
      Email: String(data.get("email") ?? ""),
      Phone: String(data.get("phone") ?? ""),
      Selection: view ? view.text : "Nothing attached: wants to talk it through",
      Message: String(data.get("message") ?? ""),
    });
    setStatus(result);
  };

  return (
    <div className="pr-quote">
      <div className="pr-quote__copy" data-reveal="header">
        <Tag tone="on-dark" data-part="tag">
          GET YOUR QUOTE
        </Tag>
        <h2 className="gg-display-l pr-quote__title" id="quote-title">
          LET’S TURN THIS INTO A FIRM QUOTE.
        </h2>
        <p className="gg-lead pr-quote__lead" data-part="sub">
          <Resp
            long="Send us what you picked, or nothing at all and we’ll talk it through from scratch. Either way, we’ll come back with a firm quote and timeline, usually within a day or two."
            short="Send what you picked, or nothing at all. We’ll come back with a firm quote."
          />
        </p>

        {view ? (
          <div key={pulse} className={pulse ? "pr-attached is-pulse" : "pr-attached"} role="group" aria-label="Attached to your quote request">
            <div className="pr-attached__top">
              <p className="pr-attached__title">{view.title}</p>
              <span className="pr-attached__actions">
                <button type="button" className="pr-attached__edit" onClick={view.edit}>
                  <Icon name="pen" size={14} stroke={2.2} />
                  Edit
                </button>
                <button type="button" className="pr-attached__remove" onClick={detach}>
                  Remove
                </button>
              </span>
            </div>
            <ul className="pr-attached__chips">
              {view.chips.map((chip, i) => (
                <li key={`${chip}-${i}`}>{chip}</li>
              ))}
            </ul>
            <div className="pr-attached__sum">
              <span>{view.left}</span>
              <strong className="gg-number">{view.right}</strong>
            </div>
          </div>
        ) : null}
      </div>

      {status === "success" || status === "mail" ? (
        <div className="pr-quote__card pr-quote__done" role="status" aria-live="polite">
          <span className="pr-quote__done-icon" aria-hidden="true">
            <Icon name="check" size={22} stroke={2.6} />
          </span>
          <h3>{status === "success" ? `Thanks${firstName ? `, ${firstName}` : ""}. That’s landed with us.` : "Check your email app."}</h3>
          <p>
            {status === "success"
              ? "We’ll be in touch within 1–2 business days with a firm quote and timeline based on what you picked."
              : `We’ve opened a message to ${site.email} with your details. Hit send and we’ll take it from there.`}
          </p>
        </div>
      ) : (
        <form ref={form} className={more ? "pr-quote__card pr-form is-more" : "pr-quote__card pr-form"} onSubmit={onSubmit} noValidate aria-labelledby="quote-title">
          <div className="pr-form__row">
            <Field label="Full name" name="fullName" idPrefix="pq" placeholder="Your name" autoComplete="name" required error={errors.fullName} />
            <Field label="Business name" name="businessName" idPrefix="pq" placeholder="Business" optional autoComplete="organization" className="pr-form__extra" />
          </div>
          <div className="pr-form__row">
            <Field label="Email" name="email" idPrefix="pq" type="email" placeholder="name@business.co.za" autoComplete="email" required error={errors.email} />
            <Field label="Phone" name="phone" idPrefix="pq" type="tel" placeholder="082 000 0000" optional autoComplete="tel" className="pr-form__extra" />
          </div>
          <TextArea label="Anything else we should know?" name="message" idPrefix="pq" placeholder="Optional notes" optional rows={3} className="pr-form__extra" />

          <button type="button" className="pr-form__more" aria-expanded={more} onClick={() => setMore(true)} hidden={more}>
            + business name, phone, notes
          </button>

          <div aria-hidden="true" className="pr-form__trap">
            <label>
              Do not fill this
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {status === "error" ? (
            <p className="pr-form__error" role="alert">
              Something went wrong sending that. Please email us directly at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ) : null}

          <Button type="submit" variant="coral" full disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Get this quote"}
          </Button>
          <p className="pr-form__fine">Nothing is charged. We reply within 1–2 business days.</p>
        </form>
      )}
    </div>
  );
}
