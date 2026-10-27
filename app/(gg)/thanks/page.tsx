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
import { REPLY_TIME } from "@/lib/enquiryShared";
import "@/components/gg/utility/utility.css";

/** The conversion URL and no-JS landing page: never indexed, never in the sitemap. */
export const metadata: Metadata = {
  title: "Thank you | GoodGround",
  robots: { index: false, follow: false },
};

type Form = "start-project" | "contact" | "onboarding";
const isForm = (v: unknown): v is Form => v === "start-project" || v === "contact" || v === "onboarding";

/**
 * Name and email come from a short-lived, httpOnly cookie set by the server
 * for this one request (never from the URL: no personal data in a URL). Missing
 * or unreadable, the page falls back to the nameless copy.
 */
async function readSession(): Promise<{ name: string; email: string }> {
  try {
    const raw = (await cookies()).get("gg_thanks")?.value;
    if (!raw) return { name: "", email: "" };
    const data = JSON.parse(decodeURIComponent(raw)) as { name?: unknown; email?: unknown };
    const name = typeof data.name === "string" ? data.name.replace(/[^\p{L}\p{M}' .-]/gu, "").trim().slice(0, 40) : "";
    const email = typeof data.email === "string" && data.email.length <= 254 && /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/.test(data.email) ? data.email : "";
    return { name, email };
  } catch {
    return { name: "", email: "" };
  }
}

const COPY: Record<Form, { crumb: string; tag: string; head: (name: string) => string; body: (email: string) => string; third: string }> = {
  "start-project": {
    crumb: "START YOUR PROJECT",
    tag: "BRIEF RECEIVED",
    head: (n) => (n ? `THANKS, ${n}. WE’VE GOT IT.` : "THANKS. WE’VE GOT IT."),
    body: (e) =>
      `Your project details are with us. ${e ? `A copy is on its way to ${e}` : "A copy is on its way to your inbox"}, so you have a record of what you sent.`,
    third: "You get a fixed-price quote",
  },
  contact: {
    crumb: "CONTACT",
    tag: "MESSAGE SENT",
    head: (n) => (n ? `THANKS, ${n}. MESSAGE RECEIVED.` : "THANKS. MESSAGE RECEIVED."),
    body: (e) => `Your message is with us. ${e ? `A copy is on its way to ${e}` : "A copy is on its way to your inbox"}, so you have a record of what you sent.`,
    third: "We take it from there",
  },
  onboarding: {
    crumb: "ONBOARDING",
    tag: "ONBOARDING COMPLETE",
    head: (n) => (n ? `THANKS, ${n}. WE’VE GOT IT.` : "THANKS. WE’VE GOT IT."),
    body: (e) => `Your onboarding details are with us. ${e ? `A copy is on its way to ${e}` : "A copy is on its way to your inbox"}, so you have a record of what you sent.`,
    third: "We start your build",
  },
};

const STEPS: { label: string; title: string; body: string; icon: IconName; tone: "surface" | "lilac" | "blush" }[] = [
  {
    label: "NOW",
    title: "Check your inbox",
    body: "An automatic confirmation with a summary of your brief. Check spam if it isn’t there in a few minutes.",
    icon: "mail",
    tone: "surface",
  },
  {
    label: `WITHIN ${REPLY_TIME.toUpperCase()}`,
    title: "We reply personally",
    body: "A real person reads your brief and replies with questions or a time to talk.",
    icon: "chat",
    tone: "lilac",
  },
  {
    label: "AFTER A SHORT CALL",
    title: "You get a fixed-price quote",
    body: "One clear price and timeline, with the 50/50 or 12-month payment option.",
    icon: "doc",
    tone: "blush",
  },
];

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ form?: string; status?: string }> }) {
  const params = await searchParams;
  const form: Form = isForm(params.form) ? params.form : "start-project";
  const failed = params.status === "failed";
  const { name, email } = await readSession();
  const copy = COPY[form];

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
                : copy.body(email)}
            </p>
            {failed ? (
              <div className="th__fail-buttons">
                <ButtonLink href={form === "contact" ? "/contact" : "/start-project"} variant="coral">
                  Try again
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
                {STEPS.map((step, i) => (
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
                      <span className="th-step__title">{i === 2 ? copy.third : step.title}</span>
                      <span className="th-step__body">{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="th__meanwhile" data-reveal="fade-up">
                <div>
                  <p className="gg-kicker th__meanwhile-kicker">WHILE YOU WAIT</p>
                  <p className="th__meanwhile-title">See what we’ve built, or how a project runs from brief to launch.</p>
                </div>
                <div className="th__meanwhile-buttons">
                  <ButtonLink href="/work" variant="light">
                    See our work
                  </ButtonLink>
                  <ButtonLink href="/process" className="th__ghost" variant="outline">
                    How we work
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
