"use client";

import { useState, type ReactNode } from "react";

/**
 * A single FAQ row, styled as a card that "activates" when opened: it lifts
 * onto the orange offset edge used by the cards elsewhere on this page, and
 * the toggle fills in and spins from + to ×.
 *
 * Native <details>/<summary> underneath, so every answer is in the
 * server-rendered HTML and opening works with zero JavaScript. React's `open`
 * state only mirrors the DOM's own toggle to drive the height animation and
 * the colour swap; the <details> stays uncontrolled, so a no-JS visitor gets
 * the browser's instant toggle rather than a broken half-animated one.
 *
 * <summary> has to be the first child of <details>, so the card styling lives
 * on <details> itself and the offset layer is a sibling in the wrapper.
 */
export function FaqItem({
  index,
  question,
  children,
}: {
  index: number;
  question: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={`bg-ht-orange pointer-events-none absolute inset-0 translate-x-[-6px] translate-y-[6px] rounded-[18px] transition-opacity duration-300 ease-[var(--ease-out)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <details
        onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
        className={`group relative overflow-hidden rounded-[18px] border-2 transition-colors duration-300 ease-[var(--ease-out)] ${
          open ? "border-ht-orange bg-white" : "border-ht-purple/10 bg-ht-cream hover:border-ht-orange/40"
        }`}
      >
        <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:gap-5 sm:p-6 [&::-webkit-details-marker]:hidden">
          {/* Decorative: the question already names the row for a screen
              reader, and "zero one" in front of it only adds noise. */}
          <span
            aria-hidden="true"
            className="font-ht-display text-ht-crimson shrink-0 text-[15px] font-bold tabular-nums"
          >
            {number}
          </span>
          <span className="font-ht-display text-ht-purple flex-1 text-[1rem] leading-snug font-bold sm:text-[1.05rem]">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={`grid size-9 shrink-0 place-items-center rounded-full border-2 transition-[transform,background-color,border-color,color] duration-300 ease-[var(--ease-out)] ${
              open
                ? "border-ht-orange bg-ht-orange text-ink rotate-[135deg]"
                : "border-ht-crimson/45 text-ht-crimson group-hover:border-ht-crimson"
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </summary>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[4.4rem]">{children}</div>
          </div>
        </div>
      </details>
    </div>
  );
}
