"use client";

import { useEffect, useRef, useState } from "react";

import { fullServicePackage, localPlans } from "@/content/pricing";
import { gardenRouteTowns, site } from "@/content/site";
import { funnelEvents } from "@/lib/analytics";
import { PREVIEW_TIME } from "@/lib/enquiryShared";

import { Button } from "../Button";
import { postEnquiry } from "../enquiry";
import { Field, TextArea } from "../Field";
import { formatRand } from "../format";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { Tag } from "../Tag";
import { balanceOf, depositOf, fullService, instalmentFor, packageBySlug } from "./data";
import { scrollToId, usePricing } from "./PricingProvider";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"fullName" | "email" | "businessName" | "town" | "mainServices", string>>;

/** The "I'm interested in" select. A Local plan sends the short Track A form instead of a quote request. */
type Interest = "not-sure" | "local-start" | "local-plus" | "local-pro" | "full-service" | "custom";
const INTERESTS: { value: Interest; label: string }[] = [
  { value: "not-sure", label: "Not sure yet" },
  ...localPlans.map((plan) => ({ value: plan.slug as Interest, label: `${plan.name} · ${formatRand(plan.monthly)}/mo` })),
  { value: "full-service", label: `Full Service · from ${formatRand(fullServicePackage.monthlyFrom)}/mo` },
  { value: "custom", label: "A custom build" },
];
const isLocalInterest = (value: Interest) => value.startsWith("local-");
const interestLabel = (value: Interest) => INTERESTS.find((i) => i.value === value)?.label ?? "";

/**
 * Pricing 08. The quote form, with whatever the visitor picked attached. It
 * sends through the same path as every other form on the site (lib/enquiry.ts),
 * tagged formType pricing-quote, with the build or package in the message.
 *
 * Arriving from "View & send" or "Choose …" pulses the attached card once and
 * moves focus to the name field. With nothing attached the card is hidden.
 *
 * v2: "I'm interested in" picks the route. A Local plan is a free-preview
 * request (formType local-preview, same endpoint), so it also needs the
 * business name, town and main services the preview is built from; those
 * fields appear when a Local plan is chosen. Anything else stays a quote request.
 */
export function QuoteForm() {
  const { attached, attachPulse, billing, lines, total, hasFrom, detach, setBuildOpen } = usePricing();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [more, setMore] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [firstName, setFirstName] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const loadedAt = useRef(0);
  const [copy, setCopy] = useState(false);
  const [interest, setInterest] = useState<Interest>("not-sure");
  const [doneLocal, setDoneLocal] = useState(false);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  // A new attachment pulses the card and moves focus to the name field.
  useEffect(() => {
    if (!attachPulse) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPulse(attachPulse);
    setStatus((s) => (s === "success" ? "idle" : s));
    const timer = window.setTimeout(() => {
      form.current?.querySelector<HTMLElement>('[data-field="fullName"]')?.focus({ preventScroll: true });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [attachPulse]);

  // What the visitor attached tells us what they are interested in (unless they already chose a Local plan).
  useEffect(() => {
    if (!attached) return;
    const next: Interest = attached.kind === "full-service" ? "full-service" : "custom";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInterest((current) => (isLocalInterest(current) ? current : next));
  }, [attached, attachPulse]);

  const local = isLocalInterest(interest);
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
        edit: () => scrollToId("custom"),
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
      edit: () => {
        setBuildOpen(true);
        scrollToId("build-your-own");
      },
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
    if (local) {
      if (!String(data.get("businessName") ?? "").trim()) next.businessName = "Please add your business name.";
      if (!String(data.get("town") ?? "").trim()) next.town = "Please add your town.";
      if (!String(data.get("mainServices") ?? "").trim()) next.mainServices = "Tell us your main services.";
    }
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const el = event.currentTarget;
    const data = new FormData(el);
    
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setMore(true);
      el.querySelector<HTMLElement>(`[data-field="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const name = String(data.get("fullName") ?? "").trim();
    // Split on whitespace (it was /s+/, which split "Chris" into "Chri").
    setFirstName(name.split(/\s+/)[0] ?? "");
    const notes = String(data.get("message") ?? "");
    const common = {
      fullName: name,
      businessName: String(data.get("businessName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      ref: "pricing",
      pageUrl: window.location.pathname,
      loadedAt: String(loadedAt.current),
      website: String(data.get("website") ?? ""),
    };
    const result = await postEnquiry(
      local
        ? {
            ...common,
            formType: "local-preview",
            plan: interest,
            town: String(data.get("town") ?? ""),
            mainServices: String(data.get("mainServices") ?? ""),
            // A custom package or build they had attached stays in the team's email.
            message: [notes, view ? `Also had attached: ${view.text}` : ""].filter(Boolean).join("\n\n"),
          }
        : {
            ...common,
            formType: "pricing-quote",
            message: notes,
            selection: [`Interested in: ${interestLabel(interest)}`, view ? view.text : "Nothing attached: wants to talk it through"].join("\n"),
          },
    );
    if (result.status === "success") {
      if (local) {
        funnelEvents.previewRequestSent({ plan: interest, offer: "none", ref: "pricing" });
        funnelEvents.enquirySent({ track: "local", plan: interest, ref: "pricing" });
      } else {
        funnelEvents.enquirySent({ track: "custom", service: interest === "full-service" ? "full-service" : undefined, ref: "pricing" });
      }
      setDoneLocal(local);
      setCopy(result.copy);
      setStatus("success");
    } else if (result.status === "invalid") {
      const e = result.errors;
      setErrors({
        ...(e.fullName ? { fullName: e.fullName } : {}),
        ...(e.email ? { email: e.email } : {}),
        ...(e.businessName ? { businessName: e.businessName } : {}),
        ...(e.town ? { town: e.town } : {}),
        ...(e.mainServices ? { mainServices: e.mainServices } : {}),
      });
      setStatus("idle");
    } else {
      setStatus("error");
    }
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

      {status === "success" ? (
        <div className="pr-quote__card pr-quote__done" role="status" aria-live="polite">
          <span className="pr-quote__done-icon" aria-hidden="true">
            <Icon name="check" size={22} stroke={2.6} />
          </span>
          {doneLocal ? (
            <>
              <h3>{`Thanks${firstName ? `, ${firstName}` : ""}. We’re building your preview.`}</h3>
              <p>
                {copy ? "We’ve sent a copy to your inbox. " : ""}Your free preview will be ready within {PREVIEW_TIME}. You review it and ask for changes, and your
                first debit runs only when you approve it to go live.
              </p>
            </>
          ) : (
            <>
              <h3>{`Thanks${firstName ? `, ${firstName}` : ""}. That’s landed with us.`}</h3>
              <p>
                {copy ? "We’ve sent a copy to your inbox. " : ""}We’ll be in touch within 1–2 business days with a firm quote and timeline based on what you picked.
              </p>
            </>
          )}
        </div>
      ) : (
        // action/method: with JavaScript off it still posts to the same route
        // (which answers a form post with a 303 to /thanks), as Contact does,
        // instead of a GET that would put the details in the URL.
        <form
          ref={form}
          className={more ? "pr-quote__card pr-form is-more" : "pr-quote__card pr-form"}
          action="/api/enquiry"
          method="post"
          onSubmit={onSubmit}
          noValidate
          aria-labelledby="quote-title"
        >
          <input type="hidden" name="formType" value={local ? "local-preview" : "pricing-quote"} />
          <input type="hidden" name="ref" value="pricing" />
          {local ? (
            <input type="hidden" name="plan" value={interest} />
          ) : (
            <input
              type="hidden"
              name="selection"
              value={[`Interested in: ${interestLabel(interest)}`, view ? view.text : "Nothing attached: wants to talk it through"].join("\n")}
            />
          )}
          <div className="pr-form__row">
            <Field label="Full name" name="fullName" idPrefix="pq" placeholder="Your name" autoComplete="name" required error={errors.fullName} />
            <Field
              label="Business name"
              name="businessName"
              idPrefix="pq"
              placeholder="Business"
              optional={!local}
              required={local}
              autoComplete="organization"
              error={errors.businessName}
              className={local ? undefined : "pr-form__extra"}
            />
          </div>
          <div className="pr-form__row">
            <Field label="Email" name="email" idPrefix="pq" type="email" placeholder="name@business.co.za" autoComplete="email" required error={errors.email} />
            <Field label="Phone" name="phone" idPrefix="pq" type="tel" placeholder="082 000 0000" optional autoComplete="tel" className="pr-form__extra" />
          </div>
          <div className="gg-field">
            <label className="gg-field__label" htmlFor="pq-interest">
              I’m interested in
            </label>
            <div className="pr-select">
              <select
                id="pq-interest"
                name="interest"
                className="gg-field__control"
                value={interest}
                onChange={(event) => {
                  const next = event.target.value as Interest;
                  setInterest(next);
                  if (isLocalInterest(next)) setMore(true);
                }}
              >
                {INTERESTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon name="chev" size={18} stroke={2.2} />
            </div>
          </div>
          {local ? (
            <>
              <div className="pr-form__row">
                <Field
                  label="Town"
                  name="town"
                  idPrefix="pq"
                  placeholder="George"
                  autoComplete="address-level2"
                  list="pq-towns"
                  required
                  error={errors.town}
                />
                <Field label="Main services" name="mainServices" idPrefix="pq" placeholder="Geyser repairs, drain cleaning" required error={errors.mainServices} />
              </div>
              <datalist id="pq-towns">
                {gardenRouteTowns.map((town) => (
                  <option key={town} value={town} />
                ))}
              </datalist>
              <p className="pr-form__local-note">A Local plan starts with a free preview, so we need a few details about your business.</p>
            </>
          ) : null}
          <TextArea label="Anything else we should know?" name="message" idPrefix="pq" placeholder="Optional notes" optional rows={3} className="pr-form__extra" />

          <button type="button" className="pr-form__more" aria-expanded={more} onClick={() => setMore(true)} hidden={more}>
            + business name, phone, notes
          </button>

          <div aria-hidden="true" className="pr-form__trap">
            <label>
              Do not fill this
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {status === "error" ? (
            <p className="pr-form__error" role="alert">
              Something went wrong sending that. Please email us directly at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ) : null}

          <Button type="submit" variant="coral" full disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : local ? "Get my free preview" : "Get this quote"}
          </Button>
          <p className="pr-form__fine">
            {local
              ? `Nothing is charged. Your free preview is ready within ${PREVIEW_TIME}, and your first debit runs only when you approve it.`
              : "Nothing is charged. We reply within 1–2 business days."}
          </p>
        </form>
      )}
    </div>
  );
}
