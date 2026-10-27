"use client";

import { useEffect, useRef } from "react";

/**
 * Home 08's heading. Desktop (≥1200): the words start at 25% opacity and reach
 * 100% one after another as the section scrolls from 70% to 40% of the
 * viewport (scrubbed, linear). Everything else, and motion off: full opacity,
 * with the heading simply fading up on entry (data-reveal on the wrapper).
 */
export function HighlightHeading({ text, id }: { text: string; id?: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = heading.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    const html = document.documentElement;
    const desktop = window.matchMedia("(min-width: 1200px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches || reduce.matches || html.dataset.motion === "off") {
        spans.forEach((span) => span.style.removeProperty("opacity"));
        return;
      }
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (0.7 * vh - top) / (0.3 * vh)));
      spans.forEach((span, i) => {
        // Word i is fully lit once p has passed (i + 1) / n.
        const w = Math.min(1, Math.max(0, p * spans.length - i));
        span.style.opacity = (0.25 + 0.75 * w).toFixed(3);
      });
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    const flag = new MutationObserver(request);
    flag.observe(html, { attributes: true, attributeFilter: ["data-motion"] });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      flag.disconnect();
    };
  }, []);

  return (
    <h2 id={id} className="gg-h2 hm-h2 hm-story__title" ref={heading}>
      {words.map((word, i) => (
        <span key={i}>
          <span data-word="">{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}
