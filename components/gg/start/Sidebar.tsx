"use client";

import { useState, type CSSProperties } from "react";

import { launchTerms } from "@/content/websiteLaunch";
import { site } from "@/content/site";
import { PLANS, REPLY_TIME, type PlanKey } from "@/lib/enquiryShared";

import { Icon } from "../Icon";
import { STEPS, answerLabel, type Answers, type StepKey } from "./data";

const NEXT_STEPS = [
  `We reply within ${REPLY_TIME}`,
  "A short call to understand your business",
  "One fixed price, paid 50/50 or over 12 months",
];

/** One row of "Your answers". The value crossfades in and the row flashes blush for 600ms. */
function AnswerRow({ label, value, onEdit, locked }: { label: string; value?: string; onEdit?: () => void; locked?: boolean }) {
  const [seen, setSeen] = useState(value);
  const [flash, setFlash] = useState(0);
  if (seen !== value) {
    setSeen(value);
    if (value) setFlash((f) => f + 1);
  }
  return (
    <li className="sp-row" data-flash={flash ? (flash % 2 ? "a" : "b") : undefined}>
      <span className="sp-row__label">{label}</span>
      <span className="sp-row__value">
        {value ? (
          <>
            <strong key={value}>{value}</strong>
            {onEdit && !locked ? (
              <button type="button" className="sp-row__edit" onClick={onEdit} aria-label={`Edit ${label}`}>
                Edit
              </button>
            ) : null}
          </>
        ) : (
          <span className="sp-row__empty" aria-label="Not answered yet">
            —
          </span>
        )}
      </span>
    </li>
  );
}

function AnswerRows({
  answers,
  plan,
  done,
  onEdit,
}: {
  answers: Answers;
  plan?: PlanKey;
  done: boolean;
  onEdit: (step: number) => void;
}) {
  return (
    <ul className="sp-rows">
      {plan ? (
        <AnswerRow label="Plan" value={plan === "launch" ? `Launch · R${launchTerms.monthly}/mo` : PLANS[plan]} locked />
      ) : null}
      {STEPS.map((step, index) => (
        <AnswerRow
          key={step.key}
          label={step.label}
          value={answerLabel(step.key as StepKey, answers)}
          onEdit={() => onEdit(index)}
          locked={done}
        />
      ))}
    </ul>
  );
}

function WhatsNext() {
  return (
    <div className="sp-next">
      <p className="gg-kicker sp-next__title">WHAT HAPPENS NEXT</p>
      <ol>
        {NEXT_STEPS.map((text, i) => (
          <li key={text}>
            <span className="sp-next__n">{String(i + 1).padStart(2, "0")}</span>
            {text}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Desktop sidebar: sticky while the form scrolls (top 120px). Phones get the pieces below instead. */
export function Aside({
  answers,
  plan,
  done,
  onEdit,
  caseName,
}: {
  answers: Answers;
  plan?: PlanKey;
  done: boolean;
  onEdit: (step: number) => void;
  caseName?: string;
}) {
  return (
    <aside className="sp__aside" aria-label="Your answers and what happens next">
      <div className="sp__aside-in" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
        <div className="sp-answers">
          <p className="gg-kicker">YOUR ANSWERS</p>
          <AnswerRows answers={answers} plan={plan} done={done} onEdit={onEdit} />
        </div>
        {caseName ? (
          <p className="sp__ref">
            <Icon name="link" size={18} stroke={2} />
            You came from the {caseName} case study. We’ll mention it in our reply.
          </p>
        ) : null}
        <WhatsNext />
        <div className="sp-direct">
          <p className="gg-kicker">RATHER TALK DIRECTLY?</p>
          <ul>
            <li>
              <span className="sp-direct__icon" aria-hidden="true">
                <Icon name="mail" size={20} stroke={2} />
              </span>
              <span>
                <small>Email</small>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </li>
            <li>
              <span className="sp-direct__icon" aria-hidden="true">
                <Icon name="chat" size={20} stroke={2} />
              </span>
              <span>
                <small>WhatsApp</small>
                <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
                  Message us<span className="gg-sr-only"> (opens in new tab)</span>
                </a>
              </span>
            </li>
            <li>
              <span className="sp-direct__icon" aria-hidden="true">
                <Icon name="pin" size={20} stroke={2} />
              </span>
              <span>
                <small>Based in</small>
                <strong>
                  {site.address.locality}, {site.address.area}, {site.address.region}
                </strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

/** Phones: a collapsed "Your answers (n)" at the bottom of each step. */
export function AnswersAccordion({
  answers,
  plan,
  count,
  onEdit,
}: {
  answers: Answers;
  plan?: PlanKey;
  count: number;
  onEdit: (step: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? "sp-acc is-open" : "sp-acc"}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls="sp-acc-panel" onClick={() => setOpen(!open)}>
          Your answers ({count})
          <Icon name="chev" size={18} stroke={2.2} />
        </button>
      </h3>
      <div id="sp-acc-panel" className="sp-acc__panel" inert={!open}>
        <div className="sp-acc__in">
          <AnswerRows answers={answers} plan={plan} done={false} onEdit={onEdit} />
        </div>
      </div>
    </div>
  );
}

export function NextMobile() {
  return (
    <div className="sp-mobile-only">
      <WhatsNext />
    </div>
  );
}

export function DirectContactMobile() {
  return (
    <div className="sp-mobile-only sp-direct-mobile">
      <div>
        <a href={`mailto:${site.email}`}>
          <Icon name="mail" size={18} stroke={2} />
          Email us
        </a>
        <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
          <Icon name="chat" size={18} stroke={2} />
          WhatsApp<span className="gg-sr-only"> (opens in new tab)</span>
        </a>
      </div>
      <p>
        Based in {site.address.locality}, {site.address.area}, {site.address.region}
      </p>
    </div>
  );
}
