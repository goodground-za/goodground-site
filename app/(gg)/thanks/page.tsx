import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { ButtonLink } from "@/components/gg/Button";
import { GgShell } from "@/components/gg/GgShell";
import { Icon, type IconName } from "@/components/gg/Icon";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { FocusOnLoad } from "@/components/gg/utility/FocusOnLoad";
import { site } from "@/content/site";
import { CHECK_REPORT_TIME, PREVIEW_TIME, REPLY_TIME } from "@/lib/enquiryShared";
import "@/components/gg/utility/utility.css";

/** The conversion URL and no-JS landing page: never indexed, never in the sitemap. */
export const metadata: Metadata = {
  // The root template adds " | GoodGround"; writing it here doubled it.
  title: "Thank you",
  description: "Your message reached GoodGround. Here is what happens next, and when to expect a reply.",
  robots: { index: false, follow: false },
};

const FORMS = ["start-project", "contact", "pricing-quote", "onboarding", "local-preview", "new-business-offer", "ai-check"] as const;
type Form = (typeof FORMS)[number];
const isForm = (v: unknown): v is Form => typeof v === "string" && (FORMS as readonly string[]).includes(v);

type Result = "waitlist" | "repeat" | undefined;

type Session = { name: string; email: string; copy: boolean; business: string; date: string; next: string };

/**
 * Name and email come from a short-lived, httpOnly cookie set by the server
 * for this one request (never from the URL: no personal data in a URL). Missing
 * or unreadable, the page falls back to the nameless copy.
 */
async function readSession(): Promise<Session> {
  const empty: Session = { name: "", email: "", copy: false, business: "", date: "", next: "" };
  try {
    const raw = (await cookies()).get("gg_thanks")?.value;
    if (!raw) return empty;
    const data = JSON.parse(decodeURIComponent(raw)) as Record<string, unknown>;
    const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[^\p{L}\p{M}\p{N}' .,&()-]/gu, "").trim().slice(0, max) : "");
    const email = typeof data.email === "string" && data.email.length <= 254 && /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/.test(data.email) ? data.email : "";
    return {
      name: text(data.name, 40),
      email,
      // Only true when the server really sent the automatic copy (it sends at most one per address per 10 minutes).
      copy: data.copy === true,
      business: text(data.business, 120),
      date: text(data.date, 30),
      next: text(data.next, 20),
    };
  } catch {
    return empty;
  }
}

type Step = { label: string; title: string; body: string; icon: IconName; tone: "surface" | "lilac" | "blush" };
type Action = { label: string; href: string };
type Copy = {
  crumb: string;
  tag: string;
  head: (name: string) => string;
  body: (s: Session) => string;
  steps: Step[];
  meanwhile: { title: string; primary: Action; secondary: Action };
  retry: Action;
};

/** The "you have a record" sentence: promised only when a copy was really sent, otherwise neutral. */
const record = (s: Session) =>
  s.copy
    ? `${s.email ? `A copy is on its way to ${s.email}` : "A copy is on its way to your inbox"}, so you have a record of what you sent.`
    : "We’ll reply by email.";
const named = (name: string, line: string, fallback: string) => (name ? `THANKS, ${name}. ${line}` : fallback);

const DEFAULT_MEANWHILE = {
  title: "See what we’ve built, or how a project runs from brief to launch.",
  primary: { label: "See our projects", href: "/work" },
  secondary: { label: "How we work", href: "/process" },
};

const COPY: Record<Form, Copy> = {
  "start-project": {
    crumb: "START YOUR PROJECT",
    tag: "BRIEF RECEIVED",
    head: (n) => named(n, "WE’VE GOT IT.", "THANKS. WE’VE GOT IT."),
    body: (s) => `Your project details are with us. ${record(s)}`,
    steps: [
      { label: "NOW", title: "Check your inbox", body: "An automatic confirmation with a summary of your brief. Check spam if it isn’t there in a few minutes.", icon: "mail", tone: "surface" },
      { label: `WITHIN ${REPLY_TIME.toUpperCase()}`, title: "We reply personally", body: "A real person reads your brief and replies with questions or a time to talk.", icon: "chat", tone: "lilac" },
      { label: "AFTER A SHORT CALL", title: "You get a fixed-price quote", body: "One clear price and timeline, with the 50/50 or 12-month payment option.", icon: "doc", tone: "blush" },
    ],
    meanwhile: DEFAULT_MEANWHILE,
    retry: { label: "Try again", href: "/start-project" },
  },
  contact: {
    crumb: "CONTACT",
    tag: "MESSAGE SENT",
    head: (n) => named(n, "MESSAGE RECEIVED.", "THANKS. MESSAGE RECEIVED."),
    body: (s) => `Your message is with us. ${record(s)}`,
    steps: [
      { label: "NOW", title: "Check your inbox", body: "An automatic confirmation with a copy of your message. Check spam if it isn’t there in a few minutes.", icon: "mail", tone: "surface" },
      { label: `WITHIN ${REPLY_TIME.toUpperCase()}`, title: "We reply personally", body: "A real person reads your message and replies with an answer or a time to talk.", icon: "chat", tone: "lilac" },
      { label: "IF IT’S A PROJECT", title: "A fixed price, no surprises", body: "One clear price and timeline, with the 50/50 or 12-month payment option.", icon: "doc", tone: "blush" },
    ],
    meanwhile: DEFAULT_MEANWHILE,
    retry: { label: "Try again", href: "/contact" },
  },
  "pricing-quote": {
    crumb: "PRICING",
    tag: "QUOTE REQUESTED",
    head: (n) => named(n, "WE’VE GOT YOUR REQUEST.", "THANKS. WE’VE GOT YOUR REQUEST."),
    body: (s) => `Your quote request is with us. ${record(s)}`,
    steps: [
      { label: "NOW", title: "Check your inbox", body: "An automatic confirmation with a summary of what you picked. Check spam if it isn’t there in a few minutes.", icon: "mail", tone: "surface" },
      { label: `WITHIN ${REPLY_TIME.toUpperCase()}`, title: "We reply personally", body: "A real person reads your request and replies with questions or a time to talk.", icon: "chat", tone: "lilac" },
      { label: "AFTER A SHORT CALL", title: "You get a fixed-price quote", body: "One clear price and timeline, with the 50/50 or 12-month payment option.", icon: "doc", tone: "blush" },
    ],
    meanwhile: DEFAULT_MEANWHILE,
    retry: { label: "Try again", href: "/pricing" },
  },
  onboarding: {
    crumb: "ONBOARDING",
    tag: "ONBOARDING COMPLETE",
    head: (n) => named(n, "WE’VE GOT IT.", "THANKS. WE’VE GOT IT."),
    body: (s) => `Your onboarding details are with us. ${record(s)}`,
    steps: [
      { label: "NOW", title: "Check your inbox", body: "An automatic confirmation with a summary of your brief. Check spam if it isn’t there in a few minutes.", icon: "mail", tone: "surface" },
      { label: `WITHIN ${REPLY_TIME.toUpperCase()}`, title: "We reply personally", body: "A real person reads your brief and replies with questions or a time to talk.", icon: "chat", tone: "lilac" },
      { label: "AFTER A SHORT CALL", title: "We start your build", body: "One clear price and timeline, with the 50/50 or 12-month payment option.", icon: "doc", tone: "blush" },
    ],
    meanwhile: DEFAULT_MEANWHILE,
    retry: { label: "Try again", href: "/start-project" },
  },
  // Each of these is also a conversion URL.
  "local-preview": {
    crumb: "FREE PREVIEW",
    tag: "PREVIEW REQUESTED",
    head: (n) => named(n, "WE’RE BUILDING YOUR PREVIEW.", "THANKS. WE’RE BUILDING YOUR PREVIEW."),
    body: (s) => `Your free preview request is with us. ${record(s)}`,
    steps: [
      { label: `WITHIN ${PREVIEW_TIME.toUpperCase()}`, title: "Preview within 5 working days", body: "We build a preview of your website and send you the link.", icon: "layout", tone: "surface" },
      { label: "YOUR TURN", title: "You review it", body: "Tell us what to change. Nothing is charged while you look.", icon: "eye", tone: "lilac" },
      { label: "WHEN YOU’RE HAPPY", title: "Approve, then your first debit", body: "Your site goes live when you approve it, and your first debit runs only then.", icon: "check", tone: "blush" },
    ],
    meanwhile: {
      title: "While we build, see how AI engines see local businesses today.",
      primary: { label: "See a sample report", href: "/services/ai-visibility#sample" },
      secondary: { label: "How we work", href: "/process" },
    },
    retry: { label: "Try again", href: "/start-project" },
  },
  "new-business-offer": {
    crumb: "NEW BUSINESS OFFER",
    tag: "SPACE REQUESTED",
    head: (n) => named(n, "YOUR SPACE IS HELD.", "THANKS. YOUR SPACE IS HELD."),
    body: (s) => `Your space is held while we confirm. ${record(s)}`,
    steps: [
      { label: `WITHIN ${REPLY_TIME.toUpperCase()}`, title: "We confirm your space within 1–2 business days", body: "A real person reads your request and confirms by email.", icon: "mail", tone: "surface" },
      { label: "THEN", title: "We build your free preview", body: `Ready to review within ${PREVIEW_TIME} of your space being confirmed.`, icon: "layout", tone: "lilac" },
      { label: "WHEN YOU’RE HAPPY", title: "Approve it to go live", body: "Your first month is free, and the business mailbox is free for 12 months.", icon: "check", tone: "blush" },
    ],
    meanwhile: {
      title: "While you wait, see how AI engines see local businesses today.",
      primary: { label: "See a sample report", href: "/services/ai-visibility#sample" },
      secondary: { label: "How we work", href: "/process" },
    },
    retry: { label: "Try again", href: "/website-launch" },
  },
  "ai-check": {
    crumb: "AI VISIBILITY CHECK",
    tag: "CHECK BOOKED",
    head: (n) => named(n, "YOUR CHECK IS BOOKED.", "THANKS. YOUR CHECK IS BOOKED."),
    body: (s) => `Your free AI visibility check is booked. ${record(s)}`,
    steps: [
      { label: "STEP ONE", title: "We run it", body: "We check how ChatGPT, Gemini and Google’s AI answer when local customers ask.", icon: "search", tone: "surface" },
      { label: "STEP TWO", title: "A person reviews it", body: "Someone on the team reads the results before they reach you.", icon: "user", tone: "lilac" },
      { label: `WITHIN ${CHECK_REPORT_TIME.toUpperCase()}`, title: "Report within 2 business days", body: "Your report arrives by email, with the first fix we’d make.", icon: "doc", tone: "blush" },
    ],
    meanwhile: {
      title: "While you wait, see what a report looks like, or what a monthly plan covers.",
      primary: { label: "See a sample report", href: "/services/ai-visibility#sample" },
      secondary: { label: "See monthly plans", href: "/pricing#monthly" },
    },
    retry: { label: "Try again", href: "/services/ai-visibility#book" },
  },
};

/** The New Business Offer form has one more outcome: the month filled up, so the request is a waitlist entry. */
const OFFER_WAITLIST: { tag: string; head: (n: string) => string; body: (s: Session) => string; steps: Step[] } = {
  tag: "ON THE WAITLIST",
  head: (n) => named(n, "YOU’RE ON THE WAITLIST.", "THANKS. YOU’RE ON THE WAITLIST."),
  body: (s) => `The offer is fully booked this month, so you’re on the ${s.next ? `${s.next} waitlist` : "waitlist for next month"}. ${record(s)}`,
  steps: [
    { label: "WHEN A SPACE OPENS", title: "We tell you", body: "A real person emails you as soon as a space opens.", icon: "mail", tone: "surface" },
    { label: "THEN", title: "We build your free preview", body: `Ready to review within ${PREVIEW_TIME}.`, icon: "layout", tone: "lilac" },
    { label: "WHEN YOU’RE HAPPY", title: "Approve it to go live", body: "Your first debit runs only then.", icon: "check", tone: "blush" },
  ],
};

/** The free check has two more outcomes: a waitlist entry, and a repeat inside 30 days. */
const CHECK_RESULTS: Record<Exclude<Result, undefined>, { tag: string; head: (n: string) => string; body: (s: Session) => string; steps: Step[] }> = {
  waitlist: {
    tag: "ON THE LIST",
    head: (n) => named(n, "YOU’RE ON THE LIST.", "THANKS. YOU’RE ON THE LIST."),
    body: (s) =>
      `We’re fully booked for free checks this month. We’ll run yours on ${s.next || "the 1st of next month"}. ${record(s)}`,
    steps: [
      { label: "NEXT MONTH", title: "We run it", body: "Your check is first in line when the new month starts.", icon: "search", tone: "surface" },
      { label: "STEP TWO", title: "A person reviews it", body: "Someone on the team reads the results before they reach you.", icon: "user", tone: "lilac" },
      { label: `WITHIN ${CHECK_REPORT_TIME.toUpperCase()}`, title: "Report within 2 business days", body: "Your report arrives by email, with the first fix we’d make.", icon: "doc", tone: "blush" },
    ],
  },
  repeat: {
    tag: "ALREADY CHECKED",
    head: (n) => named(n, "WE’VE CHECKED THIS ONE.", "THANKS. WE’VE CHECKED THIS ONE."),
    body: (s) => `We checked ${s.business || "your business"} on ${s.date || "an earlier date"}. We’ve re-sent your report to ${s.email || "your inbox"}.`,
    steps: [
      { label: "NOW", title: "Check your inbox", body: "Your earlier report is on its way again. Check spam if it isn’t there in a few minutes.", icon: "mail", tone: "surface" },
      { label: "ANY TIME", title: "Reply with questions", body: "Reply to that email and a real person will talk it through with you.", icon: "chat", tone: "lilac" },
      { label: "WHEN YOU’RE READY", title: "Fix what it found", body: "The monthly plans include the report and the work that follows from it.", icon: "wrench", tone: "blush" },
    ],
  },
};

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ form?: string; status?: string; result?: string }> }) {
  const params = await searchParams;
  const form: Form = isForm(params.form) ? params.form : "start-project";
  const failed = params.status === "failed";
  const result: Result =
    form === "ai-check" && (params.result === "waitlist" || params.result === "repeat")
      ? params.result
      : form === "new-business-offer" && params.result === "waitlist"
        ? "waitlist"
        : undefined;
  const session = await readSession();
  const { name } = session;
  const base = COPY[form];
  const copy = result ? { ...base, ...(form === "new-business-offer" ? OFFER_WAITLIST : CHECK_RESULTS[result]) } : base;
  // The inbox step promises an automatic confirmation: say so only when one was really sent.
  const steps = copy.steps.map((step) =>
    !session.copy && step.body.startsWith("An automatic confirmation")
      ? { ...step, title: "Watch your inbox", body: "We’ll reply by email. Check spam if you don’t hear from us in the time below." }
      : step,
  );

  return (
    <GgShell crumbs={[{ label: copy.crumb }, { label: failed ? "NOT SENT" : "RECEIVED" }]}>
      <section className="th" aria-labelledby="th-title">
        <div className="gg-wrap th__wrap">
          <div className="th__top" data-reveal="header">
            {failed ? (
              <span className="th__badge th__badge--fail" aria-hidden="true">
                <span>
                  <Icon name="alert" size={32} stroke={2.2} />
                </span>
              </span>
            ) : (
              <span className="th__badge" aria-hidden="true">
                <span>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
                  </svg>
                </span>
              </span>
            )}
            <Tag tone="coral" data-part="tag">
              {failed ? "NOT SENT" : copy.tag}
            </Tag>
            <SplitHeading
              as="h1"
              id="th-title"
              className="gg-display-l th__h1"
              text={failed ? "WE COULDN’T SEND THAT." : copy.head(name.toUpperCase())}
            />
            <p className="gg-lead th__lead" data-part="sub">
              {failed
                ? `Something went wrong on our side. Nothing was lost: email us at ${site.email} and we’ll pick it up, or go back and try the form again.`
                : copy.body(session)}
            </p>
            {failed ? (
              <div className="th__fail-buttons">
                <ButtonLink href={copy.retry.href} variant="coral">
                  {copy.retry.label}
                </ButtonLink>
                <ButtonLink href={`mailto:${site.email}`} variant="outline">
                  Email us instead
                </ButtonLink>
              </div>
            ) : null}
          </div>

          {failed ? null : (
            <>
              <ol className="th__steps" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
                {steps.map((step, i) => (
                  <li key={step.title} className={`th-step th-step--${step.tone}`}>
                    <span className="th-step__top">
                      <span className="th-step__chip" aria-hidden="true">
                        <Icon name={step.icon} size={22} stroke={2} />
                      </span>
                      <span className="th-step__n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="th-step__text">
                      <span className="gg-kicker th-step__label">{step.label}</span>
                      <span className="th-step__title">{step.title}</span>
                      <span className="th-step__body">{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="th__meanwhile" data-reveal="fade-up">
                <div>
                  <p className="gg-kicker th__meanwhile-kicker">WHILE YOU WAIT</p>
                  <p className="th__meanwhile-title">{copy.meanwhile.title}</p>
                </div>
                <div className="th__meanwhile-buttons">
                  <ButtonLink href={copy.meanwhile.primary.href} variant="light">
                    {copy.meanwhile.primary.label}
                  </ButtonLink>
                  <ButtonLink href={copy.meanwhile.secondary.href} className="th__ghost" variant="outline">
                    {copy.meanwhile.secondary.label}
                  </ButtonLink>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <FocusOnLoad targetId="th-title" />
    </GgShell>
  );
}
