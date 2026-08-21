"use client";

import { useEffect, useRef } from "react";

/**
 * Thin decorative progress bar. Purely cosmetic (no content depends on it),
 * so it's safe to be a client-only enhancement — a no-JS visitor simply
 * never sees it, nothing else on the page is affected.
 *
 * Two things this deliberately avoids:
 *
 * - It animates `transform: scaleX()`, not `width`. Width is a layout
 *   property, so writing it drives layout + paint + composite on every
 *   update; a scale runs on the compositor.
 * - It only does work when the page actually scrolls. The previous version
 *   ran an unconditional recursive rAF that read `scrollHeight` (a forced
 *   layout read) and wrote a style every frame for the life of the page,
 *   including while completely idle. Now a passive scroll listener requests
 *   a single frame and the loop stops again once it has painted.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const paint = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    // Coalesce bursts of scroll events into one write per frame.
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-[60] h-[3px] bg-transparent" aria-hidden="true">
      <div ref={ref} className="bg-ht-orange h-full w-full origin-left scale-x-0" />
    </div>
  );
}
