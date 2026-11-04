"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { localFromMonthly } from "@/content/pricing";

import { formatRand } from "../format";
import { Resp } from "../Resp";

type Mode = "monthly" | "12" | "50";

const ORDER: { mode: Mode; label: string }[] = [
  { mode: "monthly", label: "Monthly plan" },
  { mode: "12", label: "12 × monthly" },
  { mode: "50", label: "50 / 50" },
];

/**
 * The hero's payment chooser (Services 01): a real radiogroup of three. "Monthly
 * plan" (v2) shows twelve equal dots and the plan caption; "12 × monthly" shows
 * twelve bars (the first coral and taller); "50 / 50" swaps them for two wide
 * blocks, deposit and on completion. The caption changes with each. Defaults to
 * 12 × monthly. Arrow keys switch (wrapping). The ink pill slides between them.
 * With motion off the swap is instant (home.css/services.css transitions drop).
 */
export function PayChooser() {
  const [mode, setMode] = useState<Mode>("12");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const index = ORDER.findIndex((o) => o.mode === mode);

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + ORDER.length) % ORDER.length;
    setMode(ORDER[next].mode);
    buttons.current[next]?.focus();
  };

  return (
    <div className="sv-pay" data-reveal="fade-up" data-delay={250}>
      <p className="gg-kicker sv-pay__kicker">HOW YOU PAY</p>
      <h2 className="sv-pay__title" id="sv-pay-title">
        Choose how you pay
      </h2>
      <div className="sv-seg" role="radiogroup" aria-labelledby="sv-pay-title" data-n="3" data-i={index}>
        <span className="sv-seg__pill" aria-hidden="true" />
        {ORDER.map(({ mode: value, label }, i) => (
          <button
            key={value}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={mode === value}
            tabIndex={mode === value ? 0 : -1}
            className="sv-seg__opt"
            onClick={() => setMode(value)}
            onKeyDown={onKey}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="sv-viz" data-mode={mode} aria-hidden="true">
        <div className="sv-viz__dots">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="sv-viz__dot" style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <div className="sv-viz__bars">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={i === 0 ? "sv-viz__bar sv-viz__bar--first" : "sv-viz__bar"} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <div className="sv-viz__blocks">
          <span className="sv-viz__deposit">Deposit</span>
          <span className="sv-viz__done">On completion</span>
        </div>
      </div>
      <p className="sv-pay__caption" aria-live="polite">
        {mode === "monthly" ? (
          `From ${formatRand(localFromMonthly)}/mo on a 12-month plan, with a deposit of one month’s fee to start. Website, Google profile and AI report included.`
        ) : mode === "12" ? (
          <Resp
            long="The first instalment secures your booking. The other 11 start once your site is live."
            short="First instalment secures your booking; the rest start once you’re live."
          />
        ) : (
          "50% to start, 50% on completion."
        )}
      </p>
    </div>
  );
}
