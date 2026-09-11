"use client";

import { useEffect } from "react";

/**
 * Fades sections in as they arrive, ported from the delivered package.
 *
 * Renders nothing. It exists so every section component can stay a server
 * component holding plain markup, with the one piece of behaviour lifted out.
 *
 * Two properties of the original are deliberate and worth keeping:
 *
 *  1. **The page is readable with no JavaScript at all.** `.reveal` elements
 *     are visible by default; the hidden state (`is-pending`) is only ever
 *     ADDED here, at runtime. Do the usual thing — hide in CSS, reveal in JS —
 *     and a script failure leaves a blank page.
 *
 *  2. **Only elements already below the fold are ever hidden.** Anything on
 *     screen at load stays put, so nothing above the fold flashes in. This is
 *     also why the effect has to run after paint rather than during render.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("is-pending");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px 32px 0px" }
    );

    const pending: Element[] = [];
    document.querySelectorAll(".reveal").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("is-pending");
        observer.observe(element);
        pending.push(element);
      }
    });

    return () => {
      observer.disconnect();
      // On unmount (a client-side route change away from the homepage) drop the
      // hidden state too, or anything still pending is left invisible in the
      // bfcache copy of the page.
      pending.forEach((el) => el.classList.remove("is-pending"));
    };
  }, []);

  return null;
}
