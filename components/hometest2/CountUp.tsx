"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Counts a stat up to its final value when it scrolls into view.
 *
 * Works on the *rendered string*, not on a number prop, so "01", "20+" and
 * "100%" all animate without the caller having to describe their format:
 * the digits are parsed out, counted, and re-inserted with the surrounding
 * characters and any zero-padding preserved.
 *
 * The final value is what React renders. GSAP only ever overwrites it while
 * animating and puts it back on cleanup, so no-JS and reduced-motion
 * visitors see the real figure rather than a zero.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digits = value.match(/\d+/);
    if (!digits) return;

    const target = Number(digits[0]);
    const padTo = digits[0].length;
    const prefix = value.slice(0, digits.index);
    const suffix = value.slice((digits.index ?? 0) + digits[0].length);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { n: 0 };
      const tween = gsap.to(counter, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          const shown = String(Math.round(counter.n)).padStart(padTo, "0");
          el.textContent = `${prefix}${shown}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });

      el.textContent = `${prefix}${"0".padStart(padTo, "0")}${suffix}`;

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        el.textContent = value;
      };
    });

    return () => mm.revert();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
