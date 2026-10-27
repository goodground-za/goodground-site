"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The project cards: a three-column grid from 768, a snap carousel below.
 *
 * Phones: cards are 270 wide with the next one peeking in, no autoplay. The dot
 * for whichever card is at least 60% visible is active (24px coral), and a tap
 * scrolls to that card. The first time the carousel is half visible it nudges
 * 32px and back (700ms) to hint at swiping; never again, and not with motion off.
 */
export function WorkScroller({ children }: { children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Array.isArray(children) ? children.length : 1;

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".hm-proj-item"));

    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActive(cards.indexOf(entry.target as HTMLElement));
          }
        }
      },
      { root, threshold: [0.6] },
    );
    cards.forEach((card) => seen.observe(card));

    // One nudge, the first time it is 50% visible.
    const html = document.documentElement;
    const nudge = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        nudge.disconnect();
        const phone = window.matchMedia("(max-width: 767px)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!phone || reduce || html.dataset.motion === "off") return;
        root.scrollTo({ left: 32, behavior: "smooth" });
        window.setTimeout(() => root.scrollTo({ left: 0, behavior: "smooth" }), 350);
      },
      { threshold: 0.5 },
    );
    nudge.observe(root);

    return () => {
      seen.disconnect();
      nudge.disconnect();
    };
  }, []);

  const goTo = (index: number) => {
    const root = scroller.current;
    const card = root?.querySelectorAll<HTMLElement>(".hm-proj-item")[index];
    if (!root || !card) return;
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
    root.scrollTo({ left: card.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="hm-proj-block">
      <div className="hm-proj-scroll" ref={scroller} data-reveal="group">
        <ul className="hm-proj-list">{children}</ul>
      </div>
      <div className="hm-dots" role="group" aria-label="Project carousel">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className={i === active ? "hm-dot is-active" : "hm-dot"}
            aria-label={`Show project ${i + 1} of ${count}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
