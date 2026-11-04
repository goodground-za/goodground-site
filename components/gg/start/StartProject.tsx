"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { newBusinessOffer } from "@/content/newBusinessOffer";
import { localPlans } from "@/content/pricing";
import { gardenRouteTowns, site } from "@/content/site";
import { funnelEvents, trackEvent } from "@/lib/analytics";
import {
  EMAIL_RE,
  GBP,
  REPLY_TIME,
  SERVICES,
  WEBSITE_RE,
  firstName,
  planSummary,
  resolvePlanOffer,
  type GbpKey,
} from "@/lib/enquiryShared";

import { Button, ButtonLink } from "../Button";
import { mailtoFor, postEnquiry } from "../enquiry";
import { CheckField, Field, TextArea } from "../Field";
import { formatRand } from "../format";
import { Icon } from "../Icon";
import { PlanTermButton } from "../shared/PlanTermModal";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { useLiveCounters } from "../useLiveCounters";
import {
  EMPTY_BUSINESS,
  TOTAL_STEPS,
  answerLabel,
  caseNameFromRef,
  packageName,
  parseArrival,
  stepsFor,
  trackOfAnswers,
  type Answers,
  type BusinessFields,
  type Context,
  type StepDef,
  type TrackId,
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

/** This month's offer spaces: the typed count the static page renders, replaced by the live one after load. */
export type Spots = { left: number; total: number; month: string; nextMonth: string; soldOut: boolean };
const FALLBACK_SPOTS: Spots = {
  left: Math.max(0, newBusinessOffer.spotsTotal - newBusinessOffer.spotsTaken),
  total: newBusinessOffer.spotsTotal,
  month: newBusinessOffer.month,
  nextMonth: newBusinessOffer.nextMonth,
  soldOut: newBusinessOffer.spotsTotal - newBusinessOffer.spotsTaken <= 0,
};

const BUSINESS_KEYS = ["businessName", "town", "mainServices", "websiteUrl"] as const;
type BizKey = (typeof BUSINESS_KEYS)[number];

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
 * 25:428, mobile 26:171 / 26:248 / 26:323), v2: three tracks in one form.
 *
 * Step 1 picks the track. "Get found online on a monthly plan" (Track A) goes
 * Which plan? > Your business > Your details and sends formType local-preview.
 * The other four options are Track B (the original form: Service > Size >
 * Timeline > Your details) and send formType start-project. Track C, the free
 * AI check, is reached with ?intent=ai-check, which hands off to
 * /services/ai-visibility#book. Both tracks are four steps.
 *
 * Steps with options are radiogroups of option cards (mouse or touch advances
 * 350ms later; arrow keys move without advancing; Enter or Space advances). The
 * business and details steps are forms. Every step adds ?step=n with pushState,
 * so Back works; answers live in sessionStorage until a successful send (the
 * WhatsApp consent tick is never stored). Context from the URL (plan, offer,
 * intent, package, service, ref, UTMs) is whitelisted in lib/enquiryShared.ts
 * and never written to the page as raw text.
 *
 * Step 2 of Track B (size) is not drawn in Figma: it uses the same 2 x 2 option
 * cards with the live form's labels. The plan step (Track A) reuses the
 * plan cards from /pricing.
 */
export function StartProject({ spots: typedSpots = FALLBACK_SPOTS }: { spots?: Spots }) {
  const live = useLiveCounters();
  const spots = live?.offer ?? typedSpots;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [details, setDetails] = useState<Details>(EMPTY);
  const [business, setBusiness] = useState<BusinessFields>(EMPTY_BUSINESS);
  const [whatsapp, setWhatsapp] = useState(false);
  const [context, setContext] = useState<Context>({ utm: {} });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bizSubmitted, setBizSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverErrors, setServerErrors] = useState<Partial<Record<string, string>>>({});
  const [copy, setCopy] = useState(false);
  const [sent, setSent] = useState<{ name: string; email: string; track: TrackId; offer?: string }>({ name: "", email: "", track: "custom" });
  const [leaving, setLeaving] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [announce, setAnnounce] = useState("");
  const [ready, setReady] = useState(false);

  const loadedAt = useRef(0);
  const advanceTimer = useRef(0);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);

  const done = status === "success";
  const track = trackOfAnswers(answers);
  const steps = stepsFor(track);
  const current: StepDef = steps[Math.min(step, steps.length - 1)];
  const isLocal = track === "local";

  /** Is this step's question answered (for "never past the first unanswered question")? */
  const answered = useCallback(
    (def: StepDef, a: Answers, b: BusinessFields, d: Details) => {
      if (def.kind === "options") return Boolean(a[def.key as "service" | "size" | "timeline"]);
      if (def.kind === "plans") return Boolean(a.plan);
      if (def.kind === "business") return Boolean(d.businessName.trim() && b.town.trim() && b.mainServices.trim());
      return false;
    },
    [],
  );

  /* ---- arrival: URL, then sessionStorage -------------------------------- */
  useEffect(() => {
    loadedAt.current = Date.now();
    const search = new URLSearchParams(window.location.search);
    const arrival = parseArrival(search, typedSpots.soldOut);
    if (arrival.handoff) {
      // Track C lives on the AI visibility page; ref is kept in the link.
      window.location.replace(arrival.handoff);
      return;
    }
    let nextAnswers = arrival.answers;
    let nextDetails = EMPTY;
    let nextBusiness = EMPTY_BUSINESS;
    let nextStep = arrival.step;

    try {
      const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") {
        nextAnswers = { ...arrival.answers, ...(saved.answers ?? {}) };
        // A link with a plan wins over what an earlier visit left behind.
        if (arrival.answers.plan) nextAnswers = { ...nextAnswers, service: "local", plan: arrival.answers.plan };
        nextDetails = { ...EMPTY, ...(saved.details ?? {}) };
        nextBusiness = { ...EMPTY_BUSINESS, ...(saved.business ?? {}) };
        if (Number.isInteger(saved.step)) nextStep = Math.max(arrival.step, saved.step);
      }
    } catch {
      /* storage can be blocked or hold junk; start clean */
    }

    // ?step=n, but never past the first unanswered question.
    const arrivalSteps = stepsFor(trackOfAnswers(nextAnswers));
    const wanted = Number.parseInt(search.get("step") ?? "", 10);
    const firstOpen = arrivalSteps.findIndex((s) => s.kind !== "details" && !answered(s, nextAnswers, nextBusiness, nextDetails));
    const reachable = firstOpen === -1 ? TOTAL_STEPS - 1 : firstOpen;
    if (Number.isInteger(wanted) && wanted >= 1 && wanted <= TOTAL_STEPS) nextStep = Math.min(wanted - 1, reachable);
    nextStep = Math.min(nextStep, reachable);

    /* One state update per piece after mount, by design: server and first client render show step 1. */
    /* eslint-disable react-hooks/set-state-in-effect */
    setContext(arrival.context);
    setAnswers(nextAnswers);
    setDetails(nextDetails);
    setBusiness(nextBusiness);
    setStep(nextStep);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    if (nextStep > 0) window.history.replaceState({ step: nextStep }, "", withStep(nextStep));
    trackEvent("step_view", { step: nextStep + 1 });
  }, [typedSpots.soldOut, answered]);

  // The live count arrives after load: a link that asked for the New Business Offer follows it
  // (open space, or the waitlist), unless the visitor already removed the banner.
  useEffect(() => {
    if (!live) return;
    const search = new URLSearchParams(window.location.search);
    if (resolvePlanOffer(search.get("plan"), search.get("offer")).offer !== "new-business") return;
    const next = live.offer.soldOut ? "new-business-waitlist" : "new-business";
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- reacts to the live count arriving, once */
    setContext((c) => (c.offer && c.offer !== next ? { ...c, offer: next } : c));
  }, [live]);

  // Persist (after arrival, so an empty first render never wipes a saved start).
  // The WhatsApp consent tick is deliberately not stored: consent is given in the moment.
  useEffect(() => {
    if (!ready || done) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, details, business, step }));
    } catch {
      /* fine without it */
    }
  }, [answers, details, business, step, ready, done]);

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
    setAnnounce(`Step ${step + 1} of ${TOTAL_STEPS}: ${current.question}`);
    questionRef.current?.focus({ preventScroll: true });
    trackEvent("step_view", { step: step + 1 });
  }, [step, ready, current.question]);

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

  const removeContext = (which: "offer" | "intent" | "pkg") => {
    setContext((c) => ({ ...c, [which]: undefined }));
    const url = new URL(window.location.href);
    url.searchParams.delete(which === "pkg" ? "package" : which);
    // The retired ?plan=launch link carried the offer in its plan value.
    if (which === "offer" && (url.searchParams.get("plan") ?? "").startsWith("launch")) url.searchParams.delete("plan");
    window.history.replaceState(window.history.state, "", url);
  };

  const choose = (key: StepDef["key"], value: string, how: "pointer" | "keyboard") => {
    window.clearTimeout(advanceTimer.current);
    setAnswers((prev) => ({ ...prev, [key]: value }) as Answers);
    // Another plan than Local Start ends the New Business Offer (it applies to Local Start only).
    if (key === "plan" && value !== "local-start" && context.offer) removeContext("offer");
    trackEvent("step_complete", { step: step + 1, answer: value });
    if (key === "plan") funnelEvents.planCardClick({ plan: value, ref: context.ref ?? "none" });
    if (how === "keyboard") go(step + 1);
    else advanceTimer.current = window.setTimeout(() => go(step + 1), 350);
  };

  const select = (key: StepDef["key"], value: string) => {
    // Arrow keys: move the selection, do not advance.
    window.clearTimeout(advanceTimer.current);
    setAnswers((prev) => ({ ...prev, [key]: value }) as Answers);
  };

  // "Start over" (QA 27 Oct 2026): the tab otherwise reopens on the saved step
  // with the last person's name and email still filled in. Context from the
  // link (offer, package, ref) stays; only what was chosen or typed goes.
  const hasProgress =
    step > 0 ||
    Object.values(answers).some(Boolean) ||
    Object.values(details).some((v) => v.trim()) ||
    Object.values(business).some((v) => v.trim());
  const startOver = () => {
    window.clearTimeout(advanceTimer.current);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing saved to clear */
    }
    setAnswers({});
    setDetails(EMPTY);
    setBusiness(EMPTY_BUSINESS);
    setWhatsapp(false);
    setTouched({});
    setSubmitted(false);
    setBizSubmitted(false);
    setServerErrors({});
    setStatus("idle");
    setDir(-1);
    // Links that pre-answer the form (plan, service, package) go too, or a reload would answer it again.
    const url = new URL(window.location.href);
    for (const key of ["plan", "service", "package"]) url.searchParams.delete(key);
    window.history.replaceState(window.history.state, "", url);
    commit(0, step !== 0);
  };

  /* ---- business step ---------------------------------------------------- */
  const bizValue = (key: BizKey) => (key === "businessName" ? details.businessName : business[key]);
  const bizError = (key: BizKey): string | undefined => {
    if (serverErrors[key]) return serverErrors[key];
    if (!(touched[key] || bizSubmitted)) return undefined;
    const value = bizValue(key).trim();
    if (key === "businessName") return value ? undefined : "Please add your business name.";
    if (key === "town") return value ? undefined : "Please add your town.";
    if (key === "mainServices") return value ? undefined : "Tell us your main services, for example “geyser repairs, bathroom plumbing”.";
    return !value || WEBSITE_RE.test(value) ? undefined : "That website address doesn’t look right. For example mokoena.co.za";
  };
  const bizBad = (key: BizKey) => {
    const value = bizValue(key).trim();
    if (key === "websiteUrl") return Boolean(value) && !WEBSITE_RE.test(value);
    return !value;
  };

  const setBiz = (key: keyof BusinessFields, value: string) => {
    setBusiness((b) => ({ ...b, [key]: value }));
    setServerErrors((e) => ({ ...e, [key]: undefined }));
  };

  const continueFromBusiness = () => {
    setBizSubmitted(true);
    const bad = BUSINESS_KEYS.find(bizBad);
    if (bad) {
      document.getElementById(`sp-${bad}`)?.focus();
      document.getElementById(`sp-${bad}`)?.scrollIntoView({ block: "center", behavior: motionOff() ? "auto" : "smooth" });
      return;
    }
    go(step + 1);
  };

  /* ---- details ---------------------------------------------------------- */
  const errorFor = (name: "fullName" | "email" | "phone"): string | undefined => {
    if (serverErrors[name]) return serverErrors[name];
    if (!(touched[name] || submitted)) return undefined;
    if (name === "fullName") return details.fullName.trim() ? undefined : "Please add your name.";
    if (name === "phone") return whatsapp && !details.phone.trim() ? "Add your WhatsApp number so we can message you." : undefined;
    if (!details.email.trim()) return "We need an email to reply to.";
    return EMAIL_RE.test(details.email.trim()) ? undefined : "Add the rest of your email, for example name@business.co.za";
  };

  const set = (key: keyof Details, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    setServerErrors((e) => ({ ...e, [key]: undefined }));
  };

  const offerNow = context.offer && (answers.service === "local" || !answers.service) ? context.offer : undefined;
  const submitLabel = isLocal
    ? offerNow === "new-business-waitlist"
      ? "Join the waitlist"
      : "Start my plan"
    : context.intent === "quote"
      ? "Request my fixed quote"
      : "Send your enquiry";

  const send = async () => {
    setSubmitted(true);
    const nameBad = !details.fullName.trim();
    const emailBad = !EMAIL_RE.test(details.email.trim());
    const phoneBad = isLocal && whatsapp && !details.phone.trim();
    if (nameBad || emailBad || phoneBad) {
      const target = nameBad ? "fullName" : emailBad ? "email" : "phone";
      document.getElementById(`sp-${target}`)?.focus();
      document.getElementById(`sp-${target}`)?.scrollIntoView({ block: "center", behavior: motionOff() ? "auto" : "smooth" });
      return;
    }

    setStatus("submitting");
    const common = {
      fullName: details.fullName,
      businessName: details.businessName,
      email: details.email,
      phone: details.phone,
      message: details.message,
      ref: context.ref,
      ...context.utm,
      pageUrl: window.location.pathname,
      loadedAt: String(loadedAt.current),
      website: (document.getElementById("sp-website") as HTMLInputElement | null)?.value,
    };
    const result = await postEnquiry(
      isLocal
        ? {
            ...common,
            formType: "local-preview",
            plan: answers.plan,
            offer: offerNow,
            town: business.town,
            mainServices: business.mainServices,
            websiteUrl: business.websiteUrl,
            gbp: business.gbp || undefined,
            whatsappOptIn: whatsapp ? "yes" : undefined,
          }
        : {
            ...common,
            formType: "start-project",
            service: answers.service === "local" ? undefined : answers.service,
            size: answers.size,
            timeline: answers.timeline,
            intent: context.intent,
            package: context.pkg,
          },
    );

    if (result.status === "success") {
      setSent({ name: firstName(details.fullName), email: details.email.trim(), track, offer: offerNow });
      setCopy(result.copy);
      setStatus("success");
      focusNext.current = false;
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      // Whitelisted values only; never a name, email, phone or business name.
      if (isLocal) {
        funnelEvents.previewRequestSent({ plan: answers.plan ?? "none", offer: offerNow ?? "none", ref: context.ref ?? "none" });
        funnelEvents.enquirySent({ track: "local", plan: answers.plan, ref: context.ref });
      } else {
        funnelEvents.enquirySent({ track: "custom", service: answers.service, package: context.pkg, ref: context.ref, intent: context.intent });
      }
      return;
    }
    if (result.status === "invalid") {
      setServerErrors(result.errors);
      setStatus("idle");
      // An error on the business step sends the visitor back to it.
      if (isLocal && BUSINESS_KEYS.some((k) => result.errors[k])) {
        const at = steps.findIndex((s) => s.kind === "business");
        if (at >= 0 && at !== step) go(at);
      }
      return;
    }
    setStatus("failed");
  };

  const emailLink = mailtoFor(isLocal ? `Monthly plan request${context.ref ? ` (from ${context.ref})` : ""}` : `Project enquiry${context.ref ? ` (from ${context.ref})` : ""}`, [
    ...(isLocal
      ? [
          `Plan: ${answers.plan ? planSummary(answers.plan) : "-"}`,
          `Business: ${details.businessName}`,
          `Town: ${business.town}`,
          `Main services: ${business.mainServices}`,
          `Website: ${business.websiteUrl}`,
          `Google Business Profile: ${business.gbp ? GBP[business.gbp] : "-"}`,
        ]
      : [
          `Service: ${answerLabel("service", answers) ?? "-"}`,
          `Size: ${answerLabel("size", answers) ?? "-"}`,
          `Timeline: ${answerLabel("timeline", answers) ?? "-"}`,
        ]),
    "",
    `Name: ${details.fullName}`,
    ...(isLocal ? [] : [`Business: ${details.businessName}`]),
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    "",
    details.message,
  ]);

  /* ---- banner ------------------------------------------------------------ */
  const banner = (() => {
    if (offerNow === "new-business") {
      return {
        tone: "blush" as const,
        title: "New Business Offer · first month free",
        short: "New Business Offer · first month free",
        sub: `Your deposit covers month two, and the business mailbox is free for 12 months. ${spots.left} of ${spots.total} ${spots.month} space${spots.left === 1 ? "" : "s"} left.`,
        shortSub: `Deposit covers month two. ${spots.left} of ${spots.total} spaces left.`,
        remove: "offer" as const,
      };
    }
    if (offerNow === "new-business-waitlist") {
      return {
        tone: "blush" as const,
        title: `Join the ${spots.nextMonth} waitlist`,
        short: `Join the ${spots.nextMonth} waitlist`,
        sub: `${spots.month} is fully booked. We’ll tell you when a space opens.`,
        shortSub: `${spots.month} is fully booked.`,
        remove: "offer" as const,
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
  const summary = { steps, answers, business: { name: details.businessName, town: business.town } };
  const answeredCount = steps.filter((s) => s.kind !== "details" && answered(s, answers, business, details)).length;
  const rows = Boolean(banner) || current.key === "timeline";

  /* ---- render ------------------------------------------------------------ */
  const optionKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (current.kind !== "options" && current.kind !== "plans") return;
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

  const answerFor = (key: StepDef["key"]): string | undefined =>
    key === "service" ? answers.service : key === "size" ? answers.size : key === "timeline" ? answers.timeline : key === "plan" ? answers.plan : undefined;

  return (
    <div className="sp" data-step={step} data-done={done ? "" : undefined} data-track={track}>
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
              <Success sent={sent} copy={copy} spots={spots} />
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
                    {steps.map((s, i) => (
                      <span key={s.key} className={i <= step ? "is-on" : undefined}>
                        <i />
                      </span>
                    ))}
                  </div>
                  <ul className="sp__labels" aria-hidden="true">
                    {steps.map((s, i) => (
                      <li key={s.key} className={i === step ? "is-current" : undefined}>
                        {s.label}
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
                    key={`${track}-${step}`}
                    className={leaving ? "sp__pane is-leaving" : "sp__pane"}
                    data-dir={dir}
                    style={{ "--dir": dir } as CSSProperties}
                  >
                    {current.kind === "options" || current.kind === "plans" ? (
                      <div role="group" aria-labelledby="sp-q">
                        {current.key === "size" && answers.service === "not-sure" ? (
                          <p className="sp__hint">
                            <Icon name="bulb" size={18} stroke={2} />
                            <span>
                              Most small businesses start with a monthly plan. <Link href="/pricing#monthly">See plans →</Link>
                            </span>
                          </p>
                        ) : null}
                        <h2 id="sp-q" ref={questionRef} tabIndex={-1} className="sp__q">
                          {current.question}
                        </h2>
                        <p className="sp__sub">
                          {current.kind === "plans" ? (
                            <>
                              Every plan is a <PlanTermButton placement="start-plan-step">12-month plan</PlanTermButton>. A deposit of one month’s fee starts your build.
                            </>
                          ) : (
                            current.sub
                          )}
                        </p>
                        <div
                          className={
                            current.kind === "plans" ? "sp__opts sp__opts--plans" : rows ? "sp__opts sp__opts--rows" : current.key === "service" ? "sp__opts sp__opts--service" : "sp__opts"
                          }
                          role="radiogroup"
                          aria-labelledby="sp-q"
                          data-key={current.key}
                        >
                          {current.options.map((option, index) => {
                            const selected = answerFor(current.key) === option.value;
                            const anySelected = Boolean(answerFor(current.key));
                            const plan = current.kind === "plans" && option.price !== undefined;
                            const cls = [
                              plan ? "sp-opt sp-plan" : "sp-opt",
                              option.highlight ? "sp-opt--plum" : "",
                              option.value === "local-plus" ? "sp-plan--popular" : "",
                              selected ? "is-on" : "",
                            ]
                              .filter(Boolean)
                              .join(" ");
                            return (
                              <button
                                key={option.value}
                                id={`sp-opt-${current.key}-${index}`}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                tabIndex={selected || (!anySelected && index === 0) ? 0 : -1}
                                className={cls}
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
                                  {plan ? (
                                    <span className="sp-plan__head">
                                      <strong>{option.label}</strong>
                                      <span className="sp-plan__price">{option.price}</span>
                                      {option.badge ? <span className="sp-plan__badge">{option.badge}</span> : null}
                                    </span>
                                  ) : (
                                    <strong>{option.label}</strong>
                                  )}
                                  <span>{option.desc}</span>
                                  {option.highlights ? (
                                    <span className="sp-plan__list">
                                      {option.highlights.map((line) => (
                                        <span key={line} className="sp-plan__item">
                                          <Icon name="check" size={14} stroke={2.6} />
                                          {line}
                                        </span>
                                      ))}
                                    </span>
                                  ) : null}
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
                            {current.kind === "plans" ? "Nothing is built until your deposit is paid." : "No obligation. We never share your details."}
                          </span>
                          <span className="sp__foot-hint">Choosing an option moves you to the next step</span>
                        </p>
                      </div>
                    ) : current.kind === "business" ? (
                      <form
                        className="sp__form"
                        noValidate
                        aria-labelledby="sp-q"
                        onSubmit={(event) => {
                          event.preventDefault();
                          continueFromBusiness();
                        }}
                      >
                        <h2 id="sp-q" ref={questionRef} tabIndex={-1} className="sp__q">
                          {current.question}
                        </h2>
                        <p className="sp__sub">{current.sub}</p>
                        <div className="sp__fields">
                          <Field
                            label="Business name"
                            name="businessName"
                            idPrefix="sp"
                            placeholder="Mokoena Plumbing"
                            autoComplete="organization"
                            required
                            value={details.businessName}
                            error={bizError("businessName")}
                            onChange={(e) => set("businessName", e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, businessName: true }))}
                          />
                          <Field
                            label="Town"
                            name="town"
                            idPrefix="sp"
                            placeholder="George"
                            autoComplete="address-level2"
                            list="sp-towns"
                            required
                            value={business.town}
                            error={bizError("town")}
                            onChange={(e) => setBiz("town", e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, town: true }))}
                          />
                        </div>
                        <datalist id="sp-towns">
                          {gardenRouteTowns.map((town) => (
                            <option key={town} value={town} />
                          ))}
                        </datalist>
                        <Field
                          label="Main services"
                          name="mainServices"
                          idPrefix="sp"
                          placeholder="Geyser repairs, bathroom plumbing, drain cleaning"
                          required
                          hint="A few words, separated by commas."
                          value={business.mainServices}
                          error={bizError("mainServices")}
                          onChange={(e) => setBiz("mainServices", e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, mainServices: true }))}
                        />
                        <Field
                          label="Current website"
                          name="websiteUrl"
                          idPrefix="sp"
                          type="text"
                          inputMode="url"
                          autoComplete="url"
                          placeholder="mokoena.co.za"
                          optional
                          value={business.websiteUrl}
                          error={bizError("websiteUrl")}
                          onChange={(e) => setBiz("websiteUrl", e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, websiteUrl: true }))}
                        />
                        <fieldset className="sp-seg">
                          <legend>
                            Do you have a Google Business Profile? <span className="gg-field__opt">Optional</span>
                          </legend>
                          <div className="sp-seg__row">
                            {(Object.keys(GBP) as GbpKey[]).map((key) => (
                              <label key={key} className="sp-seg__item">
                                <input
                                  type="radio"
                                  name="gbp"
                                  value={key}
                                  checked={business.gbp === key}
                                  onChange={() => setBiz("gbp", key)}
                                />
                                <span>{GBP[key]}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                        <Button type="submit" variant="coral" full>
                          Continue
                        </Button>
                        <p className="sp__fine">We use this to prepare your plan. We never share your details.</p>
                      </form>
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
                          {current.question}
                        </h2>
                        <p className="sp__sub">
                          <span className="gg-resp-long">{isLocal ? `We’ll email you a deposit invoice within ${REPLY_TIME}.` : `We’ll get back to you within ${REPLY_TIME}.`}</span>
                          <span className="gg-resp-short">{isLocal ? `Deposit invoice within ${REPLY_TIME}.` : `We’ll reply within ${REPLY_TIME}.`}</span>
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
                          {isLocal ? null : (
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
                          )}
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
                            optional={!whatsapp}
                            required={whatsapp}
                            value={details.phone}
                            error={errorFor("phone")}
                            onChange={(e) => set("phone", e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                          />
                        </div>
                        <TextArea
                          label="Anything else?"
                          name="message"
                          idPrefix="sp"
                          placeholder={isLocal ? "Anything we should know about your business?" : "Tell us more about what you’re building."}
                          optional
                          rows={4}
                          value={details.message}
                          error={serverErrors.message}
                          onChange={(e) => set("message", e.target.value)}
                        />

                        {isLocal ? (
                          <CheckField
                            className="sp__consent"
                            label="WhatsApp me updates about my plan"
                            hint="We’ll only use your number to message you about your plan. You can stop at any time. This is separate from any marketing."
                            name="whatsappOptIn"
                            idPrefix="sp"
                            checked={whatsapp}
                            onChange={setWhatsapp}
                          />
                        ) : null}

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
                              <span className="gg-resp-long">By sending, you agree we can contact you about this {isLocal ? "request" : "enquiry"}. We never share your details.</span>
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

          {!done ? (
            <AnswersAccordion summary={summary} count={answeredCount} onEdit={go} onStartOver={hasProgress ? startOver : undefined} />
          ) : null}
          {step === 0 || done ? <NextMobile track={done ? sent.track : track} /> : null}
          {step === 0 || done ? <DirectContactMobile /> : null}
          {caseName ? (
            <p className="sp__ref sp__ref--mobile">
              <Icon name="link" size={18} stroke={2} />
              You came from the {caseName} case study. We’ll mention it in our reply.
            </p>
          ) : null}
        </div>

        <Aside
          summary={summary}
          track={done ? sent.track : track}
          done={done}
          onEdit={go}
          caseName={caseName}
          onStartOver={hasProgress && !done ? startOver : undefined}
        />
      </div>

      <p className="gg-sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}

/** The sent state, per track. */
function Success({ sent, copy, spots }: { sent: { name: string; email: string; track: TrackId; offer?: string }; copy: boolean; spots: Spots }) {
  const local = sent.track === "local";
  const waitlist = sent.offer === "new-business-waitlist";
  const heading = local
    ? waitlist
      ? `You’re on the ${spots.nextMonth} waitlist${sent.name ? `, ${sent.name}` : ""}.`
      : `Thanks${sent.name ? `, ${sent.name}` : ""}. We’ve got your plan request.`
    : `Thanks${sent.name ? `, ${sent.name}` : ""}. Your enquiry is in.`;
  return (
    <div className="sp__done" role="status">
      <span className="sp__done-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
        </svg>
      </span>
      <h2 tabIndex={-1} ref={(el) => el?.focus({ preventScroll: true })}>
        {heading}
      </h2>
      <p>
        {copy ? `We’ve sent a copy to ${sent.email}. ` : ""}
        {local
          ? sent.offer === "new-business"
            ? `Your New Business Offer space is held while we confirm, within ${REPLY_TIME}.`
            : waitlist
              ? "We’ll tell you as soon as a space opens."
              : `We’ll email you a deposit invoice (one month’s fee) within ${REPLY_TIME}.`
          : `Expect a reply within ${REPLY_TIME}, usually sooner.`}
      </p>
      <div className="sp__wait">
        <p className="gg-kicker">WHILE YOU WAIT</p>
        {local ? (
          <p>
            Meanwhile, <Link href="/services/ai-visibility#sample">see how AI sees you →</Link>
          </p>
        ) : (
          <p>See how we measure every build in our case studies.</p>
        )}
      </div>
      <div className="sp__done-buttons">
        <ButtonLink href="/work">See our projects</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </div>
  );
}

/** With JavaScript off the forms still post (and are redirected to /thanks): one per track. */
function NoScriptForm() {
  const from = formatRand(localPlans[0].monthly);
  return (
    <div className="sp__noscript-wrap">
      <form className="sp__noscript" action="/api/enquiry" method="post">
        <input type="hidden" name="formType" value="local-preview" />
        <p className="sp__q">Get found on a monthly plan</p>
        <p className="sp__fine">From {from} a month on a 12-month plan. A deposit of one month’s fee starts your build.</p>
        <label className="gg-field">
          <span className="gg-field__label">Which plan?</span>
          <select name="plan" className="gg-field__control" defaultValue="local-plus">
            {localPlans.map((plan) => (
              <option key={plan.slug} value={plan.slug}>
                {plan.name} · {formatRand(plan.monthly)}/mo
              </option>
            ))}
            <option value="local-help">Help me choose</option>
          </select>
        </label>
        <label className="gg-field">
          <span className="gg-field__label">Business name</span>
          <input name="businessName" className="gg-field__control" required autoComplete="organization" />
        </label>
        <label className="gg-field">
          <span className="gg-field__label">Town</span>
          <input name="town" className="gg-field__control" required autoComplete="address-level2" />
        </label>
        <label className="gg-field">
          <span className="gg-field__label">Main services</span>
          <input name="mainServices" className="gg-field__control" required />
        </label>
        <label className="gg-field">
          <span className="gg-field__label">Current website (optional)</span>
          <input name="websiteUrl" className="gg-field__control" autoComplete="url" />
        </label>
        <label className="gg-field">
          <span className="gg-field__label">Full name</span>
          <input name="fullName" className="gg-field__control" required autoComplete="name" />
        </label>
        <label className="gg-field">
          <span className="gg-field__label">Email</span>
          <input name="email" type="email" className="gg-field__control" required autoComplete="email" />
        </label>
        <label className="gg-field">
          <span className="gg-field__label">Phone (optional)</span>
          <input name="phone" type="tel" className="gg-field__control" autoComplete="tel" />
        </label>
        <label className="gg-check__row">
          <input name="whatsappOptIn" type="checkbox" value="yes" />
          <span>WhatsApp me updates about my plan (needs a phone number above)</span>
        </label>
        <div className="sp__trap" aria-hidden="true">
          <label>
            Do not fill this in
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button type="submit" className="gg-btn gg-btn--coral">
          <span className="gg-btn__label">Start my plan</span>
        </button>
      </form>

      <form className="sp__noscript" action="/api/enquiry" method="post">
        <input type="hidden" name="formType" value="start-project" />
        <p className="sp__q">Or tell us about a custom project</p>
        <label className="gg-field">
          <span className="gg-field__label">What can we help you with?</span>
          <select name="service" className="gg-field__control" defaultValue="">
            <option value="">Choose one</option>
            {(["new-website", "redesign", "full-service", "not-sure"] as const).map((key) => (
              <option key={key} value={key}>
                {SERVICES[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="gg-field">
          <span className="gg-field__label">How big is the project?</span>
          <select name="size" className="gg-field__control" defaultValue="">
            <option value="">Choose one</option>
            <option value="starter">Starter</option>
            <option value="standard">Standard</option>
            <option value="custom">Custom</option>
            <option value="not-sure">Not sure</option>
          </select>
        </label>
        <label className="gg-field">
          <span className="gg-field__label">When would you like to start?</span>
          <select name="timeline" className="gg-field__control" defaultValue="">
            <option value="">Choose one</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3-months">In 1–3 months</option>
            <option value="3-6-months">In 3–6 months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </label>
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
    </div>
  );
}
