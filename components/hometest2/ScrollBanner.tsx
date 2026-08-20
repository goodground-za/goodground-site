"use client";

import { useRef, useState } from "react";
import { useDragScroll } from "@/components/hometest2/useDragScroll";

/**
 * Horizontal card banner: drag to pan, or use the arrows.
 *
 * The scroller is a plain `overflow-x-auto` element with CSS snap points, so
 * touch swipe, trackpad, shift+wheel and keyboard all work with no JS at all
 * — pointer-dragging and the arrows are affordances layered on top for
 * plain-mouse users, not the mechanism. The cards stay reachable if this
 * component never hydrates.
 *
 * Edge state is tracked from the scroll event only (never measured in an
 * effect): a banner always starts at scrollLeft 0, so `atStart` is correct on
 * first paint without touching the DOM during render.
 */
export function ScrollBanner({
  children,
  label,
  align = "center",
}: {
  children: React.ReactNode;
  label: string;
  /** Where the arrow pair sits under the banner. */
  align?: "center" | "end";
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const { dragging, handlers } = useDragScroll(scrollerRef);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  };

  const step = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Advance by one real card rather than a guessed pixel amount, so the
    // snap points and the arrows agree at every breakpoint.
    const card = el.querySelector("li");
    const distance = card ? card.getBoundingClientRect().width + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <div>
      {/* scroll-pl matches the horizontal padding: without it a snap-start
          card parks against the raw container edge and the left padding
          collapses. snap-mandatory is dropped while dragging, otherwise the
          browser keeps yanking the pan back to the nearest snap point. */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        {...handlers}
        className={`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 snap-x scroll-pl-8 overflow-x-auto px-6 pt-2 pb-5 sm:-mx-10 sm:scroll-pl-12 sm:px-10 ${
          dragging ? "cursor-grabbing select-none" : "snap-mandatory cursor-grab"
        }`}
      >
        <ul className="flex w-max list-none gap-7 pl-2">{children}</ul>
      </div>

      <div className={`mt-6 flex gap-3 ${align === "end" ? "justify-end pr-2" : "justify-center"}`}>
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label={`Previous ${label}`}
          className="border-ht-orange text-ht-orange grid size-12 place-items-center rounded-full border-2 bg-white transition-[transform,opacity] duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-35"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label={`Next ${label}`}
          className="border-ht-orange text-ht-orange grid size-12 place-items-center rounded-full border-2 bg-white transition-[transform,opacity] duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-35"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
