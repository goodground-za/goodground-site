"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

/**
 * Scroll-triggered fade+rise entrance for a whole block. Uses
 * `gsap.matchMedia` (GSAP's own reduced-motion mechanism) so under
 * prefers-reduced-motion the `gsap.set`/tween never run at all — the element
 * simply stays at its natural, fully-visible server-rendered state. That
 * avoids the classic "opacity:0 baked into SSR HTML, no-JS visitor sees
 * nothing" bug by construction, rather than needing a `<noscript>` override.
 */
export function RevealSection({
  children,
  className = "",
  y = 40,
  duration = 0.8,
  delay = 0,
  start = "top 80%",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { opacity: 0, y });
      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, [y, duration, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Same mechanism, but staggers the direct children (a card grid, an
 * accordion's rows) instead of animating one block.
 */
export function RevealStagger({
  children,
  className = "",
  y = 24,
  duration = 0.8,
  stagger = 0.08,
  start = "top 80%",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = el.children;
      gsap.set(items, { opacity: 0, y });
      const tween = gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, [y, duration, stagger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
