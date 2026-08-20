"use client";

import { useEffect, useRef } from "react";

/**
 * Thin decorative progress bar. Purely cosmetic (no content depends on it),
 * so it's safe to be a client-only enhancement — a no-JS visitor simply
 * never sees it, nothing else on the page is affected.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
        el.style.width = `${pct}%`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-[60] h-[3px] bg-transparent" aria-hidden="true">
      <div ref={ref} className="bg-ht-orange h-full w-0" />
    </div>
  );
}
