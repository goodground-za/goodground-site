"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { MONTHS, monthlyFor, PLACEHOLDER_PRICING, tiers } from "@/content/pricing";

const rand = (n: number) => `R${n.toLocaleString("en-ZA")}`;

/**
 * The single most important custom component on the site (dev brief §6).
 *
 * Three rules it must not break:
 *  1. It is an estimate, never a quote. No gateway, no binding terms, until the
 *     National Credit Act question is settled.
 *  2. It must never read as a subscription. The total and the end date are as
 *     prominent as the monthly figure.
 *  3. While PLACEHOLDER_PRICING is true, it says so in the UI rather than
 *     presenting invented numbers as real ones.
 */
export function PaymentCalculator({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [selected, setSelected] = useState(tiers[1].slug);
  const groupId = useId();
  const tier = tiers.find((t) => t.slug === selected) ?? tiers[0];
  const monthly = monthlyFor(tier.total);

  const dark = tone === "dark";

  return (
    // No outer card on the dark band: the result panel below is the only card
    // here, and wrapping it in a second one would nest cards.
    <div className={dark ? "" : "rounded-card border-peach/20 bg-cream shadow-soft border p-5 sm:p-7"}>
      <fieldset>
        <legend className={`text-[13px] font-medium ${dark ? "text-peach/65" : "text-bark-muted"}`}>
          Choose a project size
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-labelledby={groupId}>
          {tiers.map((t) => {
            const active = t.slug === selected;
            return (
              <button
                key={t.slug}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(t.slug)}
                className={`cursor-pointer rounded-2xl border px-4 py-3 text-left transition-colors duration-150 ${
                  active
                    ? dark
                      ? "border-ember bg-ember/15 text-peach"
                      : "border-ember bg-ember/8 text-bark"
                    : dark
                      ? "border-peach/25 text-peach/75 hover:border-peach/50"
                      : "border-peach/20 text-bark-muted hover:border-stone/50"
                }`}
              >
                <span className="font-heading block text-[15px] font-semibold">{t.name}</span>
                <span className="mt-0.5 block text-[13px] opacity-75">
                  {rand(t.total)} total
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* The maths, stated plainly: total ÷ 12 = monthly. */}
      <div
        className={`mt-6 rounded-card p-5 sm:p-6 ${
          dark ? "bg-peach/5 border border-peach/20" : "bg-cream"
        }`}
        aria-live="polite"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={`text-[15px] ${dark ? "text-peach/70" : "text-bark-muted"}`}>
            {rand(tier.total)} ÷ {MONTHS} months
          </span>
        </div>

        <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <AnimatedRand
            value={monthly}
            className={`font-heading text-[clamp(2.25rem,6vw,3.25rem)] leading-none font-semibold tracking-tight ${
              dark ? "text-peach" : "text-bark"
            }`}
          />
          <span className={`text-[16px] ${dark ? "text-peach/70" : "text-bark-muted"}`}>
            per month for {MONTHS} months
          </span>
        </p>

        <p
          className={`mt-4 flex items-start gap-2 text-[14px] font-medium ${
            dark ? "text-ember" : "text-ember"
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="mt-0.5 size-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m4 10.5 4 4 8-9" />
          </svg>
          12 payments, then it&rsquo;s yours — not an ongoing subscription.
        </p>
      </div>

      <ul className={`mt-6 grid gap-2 text-[14px] ${dark ? "text-peach/75" : "text-bark-muted"}`}>
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className={`mt-[7px] size-1.5 shrink-0 rounded-full ${
                dark ? "bg-ember" : "bg-ember"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>

      <p className={`mt-6 text-[13px] leading-relaxed ${dark ? "text-peach/55" : "text-bark-muted"}`}>
        {PLACEHOLDER_PRICING ? (
          <strong className={dark ? "text-peach" : "text-bark"}>
            Example figures only. Tier pricing isn&rsquo;t final yet.{" "}
          </strong>
        ) : null}
        These numbers illustrate the maths. We agree your fixed price with you before any work
        starts.
      </p>
    </div>
  );
}

function AnimatedRand({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reduced]);

  // tabular-nums stops the figure jittering while it counts.
  return <span className={`${className} tabular-nums`}>{rand(display)}</span>;
}
