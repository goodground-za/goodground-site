"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis smooth scroll into GSAP's ticker so ScrollTrigger measures
 * against Lenis's virtual scroll position rather than the browser's native
 * one — the standard Lenis+GSAP integration recipe.
 *
 * Skipped entirely under prefers-reduced-motion: the page falls back to
 * native scroll with no smoothing, matching how every other animated
 * component on this site treats reduced motion.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: false,
    });
    lenis.on("scroll", ScrollTrigger.update);

    // Lenis's own autoResize watches document.documentElement via a
    // ResizeObserver, which does NOT fire when page content grows the
    // document's scrollHeight without changing the <html> element's own box
    // size — a known Lenis limitation. Without this, Lenis's cached scroll
    // limit falls behind the page's real height (late-loading fonts/images,
    // expanding accordions, etc.), and scrolling silently stops partway down
    // every page once the real height has outgrown what Lenis measured at
    // construction. ScrollTrigger's own refresh detection IS reliable (it
    // re-measures on window load/resize and whenever triggers change), so
    // resync Lenis to it instead of trusting Lenis's own observer alone.
    const handleResize = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", handleResize);
    window.addEventListener("load", handleResize);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener("refresh", handleResize);
      window.removeEventListener("load", handleResize);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
