"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

/** "R8 500" — space-grouped thousands, the common SA rand convention, no decimals. */
export function formatRand(value: number) {
  return `R${Math.round(value).toLocaleString("en-ZA").replace(/,/g, " ")}`;
}

/**
 * Count-up tween for a rand figure — the "most premium detail" on the
 * pricing page, so it's built once here and reused for every package price
 * and the Build Your Own running total, rather than each spot rolling its
 * own animation. Tweens a proxy object and writes formatted text on every
 * tick (not the DOM node's `textContent` directly via a plain number tween,
 * which would print fractional rand mid-flight) via `gsap.matchMedia` so
 * reduced-motion visitors get the new value instantly instead of a tween.
 */
export function AnimatedNumber({
  value,
  className = "",
  duration = 0.6,
  format = formatRand,
}: {
  value: number;
  className?: string;
  duration?: number;
  /** Defaults to rand, so every existing pricing call site is unchanged. The
   *  /work page's live performance readout passes seconds/bytes formatters
   *  instead of duplicating this tween.
   *
   *  Pass a stable reference (a module-scope function, as every current caller
   *  does). An inline arrow would be a new identity each render and restart the
   *  tween, since this sits in the effect's dependencies. */
  format?: (value: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const proxyRef = useRef({ value });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const proxy = proxyRef.current;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(proxy, {
        value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(proxy.value);
        },
      });
      return () => {
        tween.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      proxy.value = value;
      el.textContent = format(value);
      return () => {};
    });

    return () => mm.revert();
  }, [value, duration, format]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
