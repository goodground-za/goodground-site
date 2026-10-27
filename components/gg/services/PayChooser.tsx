"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { Resp } from "../Resp";

type Mode = "12" | "50";

/**
 * The hero's payment chooser (Services 01): a real radiogroup. "12 × monthly"
 * shows twelve bars (the first coral and taller); "50 / 50" swaps them for two
 * wide blocks, deposit and on completion, and the caption changes. Defaults to
 * 12 × monthly. Left/right/up/down switch. The ink pill slides between the two.
 * With motion off the swap is instant (home.css/services.css transitions drop).
 */
export function PayChooser() {
  const [mode, setMode] = useState<Mode>("12");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const order: Mode[] = ["50", "12"];

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const next: Mode = mode === "12" ? "50" : "12";
    setMode(next);
    buttons.current[order.indexOf(next)]?.focus();
  };

  return (
    <div className="sv-pay" data-reveal="fade-up" data-delay={250}>
      <p className="gg-kicker sv-pay__kicker">ONE FIXED PRICE</p>
      <h2 className="sv-pay__title" id="sv-pay-title">
        Choose how you pay
      </h2>
      <div className="sv-seg" role="radiogroup" aria-labelledby="sv-pay-title" data-mode={mode}>
        <span className="sv-seg__pill" aria-hidden="true" />
        {order.map((value, i) => (
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
            {value === "50" ? "50 / 50" : "12 × monthly"}
          </button>
        ))}
      </div>
      <div className="sv-viz" data-mode={mode} aria-hidden="true">
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
        {mode === "12" ? (
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
