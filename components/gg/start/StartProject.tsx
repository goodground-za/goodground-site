"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { launchTerms } from "@/content/websiteLaunch";
import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { PLANS, EMAIL_RE, REPLY_TIME, firstName } from "@/lib/enquiryShared";

import { Button, ButtonLink } from "../Button";
import { mailtoFor, postEnquiry } from "../enquiry";
import { Field, TextArea } from "../Field";
import { Icon } from "../Icon";
import { getAvailability } from "../launch/data";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import {
  STEPS,
  STEP_LABELS,
  TOTAL_STEPS,
  answerLabel,
  caseNameFromRef,
  packageName,
  parseArrival,
  type Answers,
  type Context,
  type StepKey,
} from "./data";
import { Aside, AnswersAccordion, DirectContactMobile, NextMobile } from "./Sidebar";

const STORAGE_KEY = "gg-start-project";
const motionOff = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

/** The current URL with ?step=n (step 1 has no parameter). */
const withStep = (n: number) => {
  const url = new URL(window.location.href);
  if (n > 0) url.searchParams.set("step", String(n + 1));
  else url.searchParams.delete("step");
  return url.toString();
};

type Details = { fullName: string; businessName: string; email: string; phone: string; message: string };
const EMPTY: Details = { fullName: "", businessName: "", email: "", phone: "", message: "" };
type Status = "idle" | "submitting" | "success" | "failed";

/** Height follows the content, with a transition (the card grows and shrinks between steps). */
function AutoHeight({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = inner.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    // No transition for the first measurement.
    const frame = requestAnimationFrame(() => setReady(true));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={ready ? "sp-auto is-ready" : "sp-auto"} // +8: the wrapper has 4px padding top and bottom (room for focus rings).
    style={height === undefined ? undefined : { height: height + 8 }}>
      <div ref={inner} className="sp-auto__in">
        {children}
      </div>
    </div>
  );
}

/**
 * /start-project (Figma 24:151, states 25:151 / 25:242 / 25:302 / 25:387 /
 * 25:428, mobile 26:171 / 26:248 / 26:323).
 *
 * Steps 1-3 are radiogroups of option cards (mouse or touch advances 350ms
 * later; arrow keys move without advancing; Enter or Space advances). Step 4 is
 * the details form. Every step adds ?step=n with pushState, so Back works;
 * answers live in sessionStorage until a successful send. Context from the URL
 * (plan, intent, package, service, ref, UTMs) is whitelisted in
 * lib/enquiryShared.ts and never written to the page as raw text.
 *
 * Step 2 (size) is not drawn in Figma: it uses the same 2 x 2 option cards with
 * the live form's labels and the question "How big is the project?".
 */
export function StartProject() {
  const availability = getAvailability();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [details, setDetails] = useState<Details>(EMPTY);
  const [context, setContext] = useState<Context>({ utm: {} });
  const [touched, setTouched] = useState<Partial<Record<keyof Details, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverErrors, setServerErrors] = useState<Partial<Record<"fullName" | "email" | "message", string>>>({});
  const [copy, setCopy] = useState(false);
  const [sentName, setSentName] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [announce, setAnnounce] = useState("");
  const [ready, setReady] = useState(false);

  const loadedAt = useRef(0);
  const advanceTimer = useRef(0);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);

  const done = status === "success";

  /* ---- arrival: URL, then sessionStorage -------------------------------- */
  useEffect(() => {
    loadedAt.current = Date.now();
    const search = new URLSearchParams(window.location.search);
    const arrival = parseArrival(search, availability.soldOut);
    let nextAnswers = arrival.answers;
    let nextDetails = EMPTY;
    let nextStep = arrival.step;

    try {
      const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") {
        nextAnswers = { ...arrival.answers, ...(saved.answers ?? {}) };
        nextDetails = { ...EMPTY, ...(saved.details ?? {}) };
        if (Number.isInteger(saved.step)) nextStep = Math.max(arrival.step, saved.step);
      }
    } catch {
      /* storage can be blocked or hold junk; start clean */
    }

    // ?step=n, but never past the first unanswered question.
    const wanted = Number.parseInt(search.get("step") ?? "", 10);
    const firstOpen = STEPS.findIndex((s) => !nextAnswers[s.key]);
    const reachable = firstOpen === -1 ? TOTAL_STEPS - 1 : firstOpen;
    if (Number.isInteger(wanted) && wanted >= 1 && wanted <= TOTAL_STEPS) nextStep = Math.min(wanted - 1, reachable);
    nextStep = Math.min(nextStep, reachable);

    /* One state update per piece after mount, by design: server and first client render show step 1. */
    /* eslint-disable react-hooks/set-state-in-effect */
    setContext(arrival.context);
    setAnswers(nextAnswers);
    setDetails(nextDetails);
    setStep(nextStep);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    if (nextStep > 0) window.history.replaceState({ step: nextStep }, "", withStep(nextStep));
    trackEvent("step_view", { step: nextStep + 1 });
  }, [availability.soldOut]);

  // Persist (after arrival, so an empty first render never wipes a saved start).
  useEffect(() => {
    if (!ready || done) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, details, step }));
    } catch {
      /* fine without it */
    }
  }, [answers, details, step, ready, done]);

  // Browser Back / Forward between steps.
  useEffect(() => {
    const onPop = () => {
      const wanted = Number.parseInt(new URLSearchParams(window.location.search).get("step") ?? "1", 10);
      const target = Number.isInteger(wanted) ? Math.max(0, Math.min(TOTAL_STEPS - 1, wanted - 1)) : 0;
      setDir(target < step ? -1 : 1);
      setStep(target);
      focusNext.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [step]);

  // After a step change, focus the new question and announce it.
  useEffect(() => {
    if (!ready || !focusNext.current) return;
    focusNext.current = false;
    setAnnounce(`Step ${step + 1} of ${TOTAL_STEPS}: ${step < 3 ? STEPS[step].question : "How can we reach you?"}`);
    questionRef.current?.focus({ preventScroll: true });
    trackEvent("step_view", { step: step + 1 });
  }, [step, ready]);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  /* ---- navigation ------------------------------------------------------- */
  const commit = useCallback((to: number, push: boolean) => {
    setStep(to);
    focusNext.current = true;
    if (push) window.history.pushState({ step: to }, "", withStep(to));
    // On phones, bring the progress bar to the top after the first answer.
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.getElementById("sp-progress")?.scrollIntoView({ behavior: motionOff() ? "auto" : "smooth", block: "start" });
    }
  }, []);

  const go = useCallback(
    (to: number) => {
      if (leaving || to === step || to < 0 || to > TOTAL_STEPS - 1) return;
      setDir(to < step ? -1 : 1);
      if (motionOff()) {
        commit(to, true);
        return;
      }
      setLeaving(true);
      window.setTimeout(() => {
        commit(to, true);
        setLeaving(false);
      }, 200);
    },
    [commit, leaving, step],
  );

  const choose = (key: StepKey, value: string, how: "pointer" | "keyboard") => {
    window.clearTimeout(advanceTimer.current);
    setAnswers((prev) => ({ ...prev, [key]: value }));
    trackEvent("step_complete", { step: step + 1, answer: value });
    if (how === "keyboard") go(step + 1);
    else advanceTimer.current = window.setTimeout(() => go(step + 1), 350);
  };

  const select = (key: StepKey, value: string) => {
    // Arrow keys: move the selection, do not advance.
    window.clearTimeout(advanceTimer.current);
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const removeContext = (which: "plan" | "intent" | "pkg") => {
    setContext((c) => ({ ...c, [which]: undefined }));
    const url = new URL(window.location.href);
    url.searchParams.delete(which === "pkg" ? "package" : which);
    window.history.replaceState(window.history.state, "", url);
  };

  /* ---- details ---------------------------------------------------------- */
  const errorFor = (name: "fullName" | "email"): string | undefined => {
    if (serverErrors[name]) return serverErrors[name];
    if (!(touched[name] || submitted)) return undefined;
    if (name === "fullName") return details.fullName.trim() ? undefined : "Please add your name.";
    if (!details.email.trim()) return "We need an email to reply to.";
    return EMAIL_RE.test(details.email.trim()) ? undefined : "Add the rest of your email, for example name@business.co.za";
  };

  const set = (key: keyof Details, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    setServerErrors((e) => ({ ...e, [key]: undefined }));
  };

  const effectivePlan = context.plan;
  const submitLabel =
    effectivePlan === "launch-waitlist" ? "Join the waitlist" : context.intent === "quote" && !effectivePlan ? "Request my fixed quote" : "Send your enquiry";

  const send = async () => {
    setSubmitted(true);
    const first = errorFor("fullName") ? "fullName" : errorFor("email") ? "email" : null;
    // errorFor reads `submitted`, which has not applied yet; check directly.
    const nameBad = !details.fullName.trim();
    const emailBad = !EMAIL_RE.test(details.email.trim());
    if (nameBad || emailBad || first) {
      const target = nameBad ? "fullName" : "email";
      document.getElementById(`sp-${target}`)?.focus();
      document.getElementById(`sp-${target}`)?.scrollIntoView({ block: "center", behavior: motionOff() ? "auto" : "smooth" });
      return;
    }

    setStatus("submitting");
    const result = await postEnquiry({
      formType: "start-project",
      fullName: details.fullName,
      businessName: details.businessName,
      email: details.email,
      phone: details.phone,
      message: details.message,
      service: answers.service,
      size: answers.size,
      timeline: answers.timeline,
      plan: effectivePlan,
      intent: context.intent,
      package: context.pkg,
      ref: context.ref,
      ...context.utm,
      pageUrl: window.location.pathname,
      loadedAt: String(loadedAt.current),
      website: (document.getElementById("sp-website") as HTMLInputElement | null)?.value,
    });

    if (result.status === "success") {
      setSentName(firstName(details.fullName));
      setSentEmail(details.email.trim());
      setCopy(result.copy);
      setStatus("success");
      focusNext.current = false;
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      // Whitelisted values only; never a name, email or phone.
      trackEvent("enquiry_sent", {
        plan: effectivePlan ?? "none",
        intent: context.intent ?? "none",
        ref: context.ref ?? "none",
        service: answers.service ?? "none",
      });
      return;
    }
    if (result.status === "invalid") {
      setServerErrors(result.errors);
      setStatus("idle");
      return;
    }
    setStatus("failed");
  };

  const emailLink = mailtoFor(`Project enquiry${context.ref ? ` (from ${context.ref})` : ""}`, [
    `Service: ${answerLabel("service", answers) ?? "-"}`,
    `Size: ${answerLabel("size", answers) ?? "-"}`,
    `Timeline: ${answerLabel("timeline", answers) ?? "-"}`,
    ...(effectivePlan ? [`Plan: ${PLANS[effectivePlan]}`] : []),
    "",
    `Name: ${details.fullName}`,
    `Business: ${details.businessName}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    "",
    details.message,
  ]);

  /* ---- banner ------------------------------------------------------------ */
  const banner = (() => {
    if (effectivePlan === "launch") {
      return {
        tone: "blush" as const,
        title: `Launch offer · R${launchTerms.monthly} a month for ${launchTerms.months} months`,
        short: `Launch offer · R${launchTerms.monthly}/mo`,
        sub: `Domain, hosting and email included. ${availability.left} of ${availability.total} ${availability.month} spot${availability.left === 1 ? "" : "s"} left.`,
        shortSub: `${availability.left} of ${availability.total} ${availability.month} spots left.`,
        remove: "plan" as const,
      };
    }
    if (effectivePlan === "launch-waitlist") {
      return {
        tone: "blush" as const,
        title: `Join the ${availability.nextMonth} waitlist`,
        short: `Join the ${availability.nextMonth} waitlist`,
        sub: `${availability.month} is fully booked. We’ll tell you when a space opens.`,
        shortSub: `${availability.month} is fully booked.`,
        remove: "plan" as const,
      };
    }
    if (context.intent === "quote") {
      return {
        tone: "lilac" as const,
        title: "You’re asking for a fixed quote",
        short: "Fixed quote",
        sub: "We’ll reply with one fixed price and both ways to pay: 50/50, or 12 monthly instalments.",
        shortSub: "One fixed price, two ways to pay.",
        remove: "intent" as const,
      };
    }
    if (context.intent === "seo-audit") {
      return {
        tone: "lilac" as const,
        title: "You’re asking for an SEO audit",
        short: "SEO audit",
        sub: "Tell us about your site and we’ll come back with what we’d look at first.",
        shortSub: "We’ll tell you what we’d look at first.",
        remove: "intent" as const,
      };
    }
    if (context.pkg) {
      return {
        tone: "blush" as const,
        title: `${packageName(context.pkg)} package`,
        short: `${packageName(context.pkg)} package`,
        sub: "We’ll start from this package and quote for your project.",
        shortSub: "We’ll quote from this package.",
        remove: "pkg" as const,
      };
    }
    return null;
  })();

  const caseName = caseNameFromRef(context.ref);
  const answered = STEPS.filter((s) => answers[s.key]).length + (effectivePlan ? 1 : 0);
  const isDetails = step === 3;
  const current = isDetails ? null : STEPS[step];
  const rows = Boolean(banner) || step === 2;

  /* ---- render ------------------------------------------------------------ */
  const optionKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!current) return;
    const count = current.options.length;
    const move = (to: number) => {
      event.preventDefault();
      select(current.key, current.options[to].value);
      document.getElementById(`sp-opt-${current.key}-${to}`)?.focus();
    };
    if (event.key === "ArrowDown" || event.key === "ArrowRight") move((index + 1) % count);
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") move((index - 1 + count) % count);
    else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(current.key, current.options[index].value, "keyboard");
    }
  };

  return (
    <div className="sp" data-step={step} data-done={done ? "" : undefined}>
      <div className="gg-wrap sp__grid">
        <div className="sp__main">
          <div className="sp__intro" data-reveal="header">
            <Tag tone="coral" data-part="tag">
              START YOUR PROJECT
            </Tag>
            <SplitHeading as="h1" id="sp-title" className="gg-display-l sp__h1" text={"LET’S PLANT SOMETHING\nTHAT GROWS."} />
            <p className="gg-lead sp__lead" data-part="sub">
              <span className="gg-resp-long">
                A few quick questions, then your details. It takes about a minute, and there’s no obligation, just a starting point for the conversation.
              </span>
              <span className="gg-resp-short">A few quick questions, then your details. About a minute, no obligation.</span>
            </p>
          </div>

          <div className="sp__card" data-reveal="fade-up" data-delay={200}>
            {done ? (
              <div className="sp__done" role="status">
                <span className="sp__done-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
                  </svg>
                </span>
                <h2 tabIndex={-1} ref={(el) => el?.focus({ preventScroll: true })}>
                  Thanks{sentName ? `, ${sentName}` : ""}. Your enquiry is in.
                </h2>
                <p>
                  {copy ? `We’ve sent a copy to ${sentEmail}. ` : ""}Expect a reply within {REPLY_TIME}, usually sooner.
                </p>
                <div className="sp__wait">
                  <p className="gg-kicker">WHILE YOU WAIT</p>
                  <p>See how we measure every build in our case studies.</p>
                </div>
                <div className="sp__done-buttons">
                  <ButtonLink href="/work">See our work</ButtonLink>
                  <ButtonLink href="/" variant="outline">
                    Back to home
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <>
                <div id="sp-progress" className="sp__progress">
                  <div className="sp__progress-top">
                    <p className="sp__stepno gg-kicker" aria-hidden="true">
                      STEP {step + 1} OF {TOTAL_STEPS}
                    </p>
                    {step === 0 ? (
                      <p className="sp__about">About a minute</p>
                    ) : (
                      <button type="button" className="sp__back" onClick={() => go(step - 1)}>
                        <Icon name="back" size={15} stroke={2.2} />
                        Back
                      </button>
                    )}
                  </div>
                  <div className="sp__segments" role="progressbar" aria-label={`Step ${step + 1} of ${TOTAL_STEPS}`} aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-valuenow={step + 1}>
                    {STEP_LABELS.map((label, i) => (
                      <span key={label} className={i <= step ? "is-on" : undefined}>
                        <i />
                      </span>
                    ))}
                  </div>
                  <ul className="sp__labels" aria-hidden="true">
                    {STEP_LABELS.map((label, i) => (
                      <li key={label} className={i === step ? "is-current" : undefined}>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                {banner ? (
                  <div className={`sp__banner sp__banner--${banner.tone}`} data-ready={ready ? "" : undefined}>
                    <span className="sp__banner-icon" aria-hidden="true">
                      <Icon name="tag" size={18} stroke={2} />
                    </span>
                    <p className="sp__banner-text">
                      <strong>
                        <span className="gg-resp-long">{banner.title}</span>
                        <span className="gg-resp-short">{banner.short}</span>
                      </strong>
                      <span>
                        <span className="gg-resp-long">{banner.sub}</span>
                        <span className="gg-resp-short">{banner.shortSub}</span>
                      </span>
                    </p>
                    <button type="button" className="sp__banner-remove" onClick={() => removeContext(banner.remove)}>
                      Remove
                    </button>
                  </div>
                ) : null}

                <AutoHeight>
                  <div
                    key={step}
                    className={leaving ? "sp__pane is-leaving" : "sp__pane"}
                    data-dir={dir}
                    style={{ "--dir": dir } as CSSProperties}
                  >
                    {current ? (
                      <div role="group" aria-labelledby="sp-q">
                        <h2 id="sp-q" ref={questionRef} tabIndex={-1} className="sp__q">
                          {current.question}
                        </h2>
                        <p className="sp__sub">{current.sub}</p>
                        <div
                          className={rows ? "sp__opts sp__opts--rows" : "sp__opts"}
                          role="radiogroup"
                          aria-labelledby="sp-q"
                          data-key={current.key}
                        >
                          {current.options.map((option, index) => {
                            const selected = answers[current.key] === option.value;
                            const anySelected = Boolean(answers[current.key]);
                            return (
                              <button
                                key={option.value}
                                id={`sp-opt-${current.key}-${index}`}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                tabIndex={selected || (!anySelected && index === 0) ? 0 : -1}
                                className={selected ? "sp-opt is-on" : "sp-opt"}
                                onKeyDown={(event) => optionKeys(event, index)}
                                onClick={(event) => {
                                  // detail 0 = a keyboard "click"; handled in onKeyDown.
                                  if (event.detail === 0) return;
                                  choose(current.key, option.value, "pointer");
                                }}
                              >
                                <span className="sp-opt__icon" aria-hidden="true">
                                  <Icon name={option.icon} size={22} stroke={2} />
                                </span>
                                <span className="sp-opt__text">
                                  <strong>{option.label}</strong>
                                  <span>{option.desc}</span>
                                </span>
                                <span className="sp-opt__radio" aria-hidden="true">
                                  <Icon name="check" size={13} stroke={3} />
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="sp__foot">
                          <span>
                            <Icon name="lock" size={14} stroke={2.2} />
                            No obligation. We never share your details.
                          </span>
                          <span className="sp__foot-hint">Choosing an option moves you to the next step</span>
                        </p>
                      </div>
                    ) : (
                      <form
                        className="sp__form"
                        noValidate
                        aria-labelledby="sp-q"
                        onSubmit={(event) => {
                          event.preventDefault();
                          void send();
                        }}
                      >
                        <h2 id="sp-q" ref={questionRef} tabIndex={-1} className="sp__q">
                          How can we reach you?
                        </h2>
                        <p className="sp__sub">
                          <span className="gg-resp-long">We’ll get back to you within {REPLY_TIME}.</span>
                          <span className="gg-resp-short">We’ll reply within {REPLY_TIME}.</span>
                        </p>

                        <div className="sp__fields">
                          <Field
                            label="Full name"
                            name="fullName"
                            idPrefix="sp"
                            placeholder="Your name"
                            autoComplete="name"
                            required
                            value={details.fullName}
                            error={errorFor("fullName")}
                            onChange={(e) => set("fullName", e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                          />
                          <Field
                            label="Business name"
                            name="businessName"
                            idPrefix="sp"
                            placeholder="Business name"
                            autoComplete="organization"
                            optional
                            value={details.businessName}
                            onChange={(e) => set("businessName", e.target.value)}
                          />
                          <Field
                            label="Email"
                            name="email"
                            idPrefix="sp"
                            type="email"
                            placeholder="name@business.co.za"
                            autoComplete="email"
                            required
                            value={details.email}
                            error={errorFor("email")}
                            onChange={(e) => set("email", e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          />
                          <Field
                            label="Phone"
                            name="phone"
                            idPrefix="sp"
                            type="tel"
                            inputMode="tel"
                            placeholder="082 000 0000"
                            autoComplete="tel"
                            optional
                            value={details.phone}
                            onChange={(e) => set("phone", e.target.value)}
                          />
                        </div>
                        <TextArea
                          label="Anything else?"
                          name="message"
                          idPrefix="sp"
                          placeholder="Tell us more about what you’re building."
                          optional
                          rows={4}
                          value={details.message}
                          error={serverErrors.message}
                          onChange={(e) => set("message", e.target.value)}
                        />

                        <div className="sp__trap" aria-hidden="true">
                          <label htmlFor="sp-website">Do not fill this in</label>
                          <input id="sp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                        </div>

                        {status === "failed" ? (
                          <>
                            <div className="sp__fail" role="alert">
                              <Icon name="alert" size={22} stroke={2} />
                              <p>
                                <strong>We couldn’t send that just now.</strong>
                                <span>Your answers are saved. Try again, or email them to us in one tap.</span>
                              </p>
                            </div>
                            <div className="sp__fail-buttons">
                              <Button type="submit" variant="coral">
                                Try again
                              </Button>
                              <ButtonLink href={emailLink} variant="outline">
                                Email my answers instead
                              </ButtonLink>
                            </div>
                          </>
                        ) : (
                          <>
                            <Button type="submit" variant="coral" full disabled={status === "submitting"}>
                              {status === "submitting" ? "Sending…" : submitLabel}
                            </Button>
                            <p className="sp__fine">
                              <span className="gg-resp-long">By sending, you agree we can contact you about this enquiry. We never share your details.</span>
                              <span className="gg-resp-short">We never share your details.</span>
                            </p>
                          </>
                        )}
                      </form>
                    )}
                  </div>
                </AutoHeight>
              </>
            )}

            <noscript>
              <NoScriptForm />
            </noscript>
          </div>

          {!done ? <AnswersAccordion answers={answers} plan={effectivePlan} count={answered} onEdit={go} /> : null}
          {step === 0 || done ? <NextMobile /> : null}
          {step === 0 || done ? <DirectContactMobile /> : null}
          {caseName ? (
            <p className="sp__ref sp__ref--mobile">
              <Icon name="link" size={18} stroke={2} />
              You came from the {caseName} case study. We’ll mention it in our reply.
            </p>
          ) : null}
        </div>

        <Aside answers={answers} plan={effectivePlan} done={done} onEdit={go} caseName={caseName} />
      </div>

      <p className="gg-sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}

/** With JavaScript off the form still posts (and is redirected to /thanks). */
function NoScriptForm() {
  return (
    <form className="sp__noscript" action="/api/enquiry" method="post">
      <input type="hidden" name="formType" value="start-project" />
      <p className="sp__q">Tell us about your project</p>
      {STEPS.map((step) => (
        <label key={step.key} className="gg-field">
          <span className="gg-field__label">{step.question}</span>
          <select name={step.key} className="gg-field__control" defaultValue="">
            <option value="">Choose one</option>
            {step.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      <label className="gg-field">
        <span className="gg-field__label">Full name</span>
        <input name="fullName" className="gg-field__control" required autoComplete="name" />
      </label>
      <label className="gg-field">
        <span className="gg-field__label">Business name (optional)</span>
        <input name="businessName" className="gg-field__control" autoComplete="organization" />
      </label>
      <label className="gg-field">
        <span className="gg-field__label">Email</span>
        <input name="email" type="email" className="gg-field__control" required autoComplete="email" />
      </label>
      <label className="gg-field">
        <span className="gg-field__label">Phone (optional)</span>
        <input name="phone" type="tel" className="gg-field__control" autoComplete="tel" />
      </label>
      <label className="gg-field">
        <span className="gg-field__label">Anything else? (optional)</span>
        <textarea name="message" rows={4} className="gg-field__control gg-field__control--area" />
      </label>
      <div className="sp__trap" aria-hidden="true">
        <label>
          Do not fill this in
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" className="gg-btn gg-btn--coral">
        <span className="gg-btn__label">Send your enquiry</span>
      </button>
      <p className="sp__fine">
        Or email <a href={`mailto:${site.email}`}>{site.email}</a>. See our <Link href="/legal#privacy">privacy policy</Link>.
      </p>
    </form>
  );
}
