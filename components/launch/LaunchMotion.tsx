"use client";

import { useEffect } from "react";

/**
 * Section reveals for /website-launch. Renders nothing.
 *
 * Three properties are deliberate:
 *
 *  1. THE PAGE IS READABLE WITH NO JAVASCRIPT. Elements are visible by default.
 *     The hidden state (`data-reveal-pending`) is only ever ADDED here, at
 *     runtime. Hide in CSS and reveal in JS, and a script failure leaves a blank
 *     page.
 *  2. NOTHING ALREADY ON SCREEN IS EVER HIDDEN, so the hero and the primary CTA
 *     never flash in. This is also why the effect runs after paint.
 *  3. REDUCED MOTION SKIPS IT ENTIRELY. Not a shorter animation: no animation,
 *     and no hidden state to recover from. The CSS carries the same guard so
 *     the two cannot disagree.
 *
 * Stagger comes from a per-group index rather than a fixed nth-child rule, so a
 * row of three reveals in sequence without hard-coding how many there are.
 */
export function LaunchMotion() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".gg-launch [data-reveal]"),
    );
    if (nodes.length === 0) return;

    const pending: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.dataset.revealPending = "false";
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    nodes.forEach((el) => {
      // Below the fold only. Anything visible at load stays put.
      if (el.getBoundingClientRect().top <= window.innerHeight) return;
      el.dataset.revealPending = "true";
      const index = Number(el.dataset.revealIndex ?? 0);
      // Small stagger, capped so a long group never feels like a queue.
      el.style.transitionDelay = `${Math.min(index, 4) * 70}ms`;
      pending.push(el);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      // Clear the hidden state on unmount, or anything still pending is left
      // invisible in the bfcache copy of the page.
      pending.forEach((el) => {
        el.dataset.revealPending = "false";
        el.style.transitionDelay = "";
      });
    };
  }, []);

  return null;
}
