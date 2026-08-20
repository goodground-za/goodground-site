"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { useDragScroll } from "@/components/hometest2/useDragScroll";
import { process } from "@/content/process";

// Registering twice (LenisProvider already registers ScrollTrigger) is a
// documented no-op in GSAP — safe per-module registration rather than
// threading a "make sure this runs first" import order requirement.
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Horizontal scroll-jack: vertical scroll pins this section in place while
 * the step track scrubs sideways, one full viewport of vertical scroll per
 * step, then releases and vertical scrolling continues normally.
 *
 * Reduced motion / no-JS fallback: before any JS runs, this is just a plain
 * `overflow-x-auto` flex row — every step is already in the DOM and
 * reachable by scrolling or swiping sideways, it just isn't pinned or
 * scroll-driven. The pin/scrub effect is added on top of that baseline
 * rather than replacing it, and is skipped entirely under
 * prefers-reduced-motion (the brief's "no scroll hijacking" rule applies
 * doubly hard to an actual pinned section).
 */
export function OurProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { dragging, handlers: dragHandlers } = useDragScroll(scrollerRef, { skipWhen: "(min-width: 768px)" });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const scroller = scrollerRef.current;
    if (!section || !track || !scroller) return;

    /**
     * How far the track has to travel for the last card's right edge to reach
     * the right edge of the visible strip.
     *
     * Measured against the scroller's *content box*, not the section. The
     * section spans the full viewport, but the track sits inside a padded
     * panel that is a couple of hundred pixels narrower, so measuring the
     * section under-counts the travel and the final card stops half cut off.
     *
     * A function, not a constant, so `invalidateOnRefresh` recomputes it when
     * the window resizes instead of reusing a stale first-paint value.
     */
    const travel = () => {
      const cs = getComputedStyle(scroller);
      const visible = scroller.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      return Math.max(0, track.scrollWidth - visible);
    };

    const mm = gsap.matchMedia();
    // Desktop-only, same as WhatWeBuild's stacking effect: a pinned
    // horizontal scrub reading naturally on a trackpad/wheel gets janky on
    // touch, where the same gesture (a vertical drag) is what the browser
    // already uses for normal page scrolling. Below md, this stays the
    // plain swipeable overflow-x-auto row it is before any JS runs.
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      if (travel() <= 0) return;

      const tween = gsap.to(track, {
        // Function-based so GSAP re-reads it on refresh alongside `end`.
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${travel()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActiveStep(Math.min(process.length - 1, Math.round(self.progress * (process.length - 1))));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const goTo = (index: number) => {
    // Each step owns an equal slice of the pinned scroll distance, so the
    // target scroll position is computed directly from the trigger's own
    // start/end rather than tracked as a second source of truth.
    const trigger = ScrollTrigger.getAll().find((t) => t.trigger === sectionRef.current);
    if (!trigger) {
      // No pin (mobile, or reduced motion) — scroll the scroller instead.
      // Must be the scroller, not the track: the track is `w-max`, so it is
      // never itself scrollable and scrollBy on it silently does nothing.
      const scroller = scrollerRef.current;
      const card = trackRef.current?.firstElementChild as HTMLElement | null;
      const stride = card ? card.getBoundingClientRect().width + 24 : 320;
      if (scroller) scroller.scrollBy({ left: index > activeStep ? stride : -stride, behavior: "smooth" });
      setActiveStep(index);
      return;
    }
    const target = trigger.start + (trigger.end - trigger.start) * (index / (process.length - 1));
    gsap.to(window, { scrollTo: target, duration: 0.8, ease: "power2.inOut" });
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-ht-cream relative flex h-screen items-center px-0 sm:px-6 lg:px-10"
    >
      <div className="relative mx-auto flex h-[min(90vh,880px)] w-full max-w-[1600px] flex-col justify-center overflow-hidden sm:rounded-[32px]">
        <div className="absolute inset-0">
          <Image
            src="/images/ht2/process-bg.webp"
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
          {/* Scrim only where type sits. The photograph is bright and the
              heading is white, so without this the top-left corner drops
              well under the 3:1 large-text floor on the pale window panes. */}
          <div className="from-ht-purple/80 absolute inset-0 bg-gradient-to-br via-transparent to-transparent" />
          <div className="from-ht-purple/55 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>

        <div className="relative z-10 w-full">
          <div className="px-6 sm:px-10 lg:px-14">
            <h2 className="font-ht-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02] font-bold text-white">
              Our Process
            </h2>
            <p className="font-ht-display mt-3 text-[clamp(1.15rem,1.9vw,1.6rem)] leading-tight font-bold text-white">
              From brief to final design
            </p>
          </div>

          {/* Progress rail: doubles as the reference's rule under the heading
              and as the "how far through the six steps am I" readout, so the
              scroll-jack isn't silent. */}
          <div className="mt-8 h-1.5 w-full overflow-hidden bg-white/35">
            <div
              className="bg-ht-orange h-full transition-[width] duration-300 ease-[var(--ease-out)]"
              style={{ width: `${((activeStep + 1) / process.length) * 100}%` }}
            />
          </div>

          {/* The scroll container has to be this outer element, not the track:
              the track is `w-max` (as wide as its own cards), so it can never
              overflow itself and overflow-x-auto on it does nothing — which
              left steps 2-6 clipped and unreachable on touch. */}
          {/* Drag is gated off at md and up: from there this scroller is
              driven by the pinned GSAP scrub, and writing scrollLeft by hand
              would fight the transform. Below md it is a normal slider. */}
          <div
            ref={scrollerRef}
            {...dragHandlers}
            className={`mt-8 snap-x scroll-pl-6 overflow-x-auto px-6 pt-2 pb-4 sm:scroll-pl-10 sm:px-10 lg:scroll-pl-14 lg:px-14 md:overflow-x-hidden ${
              dragging ? "cursor-grabbing select-none" : "snap-mandatory md:cursor-auto cursor-grab"
            }`}
          >
          <div ref={trackRef} className="flex w-max gap-6">
            {process.map((step) => (
              // Same double-edge treatment as the portfolio cards: an orange
              // layer offset down-left behind a white card, not a border.
              <div key={step.number} className="relative w-[300px] shrink-0 snap-start sm:w-[340px]">
              <div className="bg-ht-orange absolute inset-0 translate-x-[-7px] translate-y-[7px] rounded-[18px]" aria-hidden="true" />
              <div className="relative h-full rounded-[18px] bg-white p-6">
                <div className="flex items-center gap-2">
                  {/* crimson, not orange: at 11-12px these are normal-size
                      text needing 4.5:1, and ht-orange on white is 3.48:1.
                      ht-crimson is 6.55:1 and reads as the same accent. */}
                  <span className="font-ht-display border-ht-crimson text-ht-crimson rounded-pill inline-block border-2 px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
                    Step
                  </span>
                  <span className="font-ht-display border-ht-crimson text-ht-crimson grid size-7 place-items-center rounded-full border-2 text-[12px] font-bold">
                    {step.number}
                  </span>
                </div>
                {/* 1.2rem, not 1.15: ht-orange on white is 3.48:1, which
                    clears AA only as "large text" (>=18.66px bold). 1.15rem
                    lands at 18.4px and would fail as normal text. */}
                <h3 className="font-ht-display text-ht-orange mt-4 text-[1.2rem] leading-tight font-bold">
                  {step.title}
                </h3>
                  <p className="font-ht-body text-ht-purple/80 mt-3 text-[14px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

          <div className="mt-8 flex justify-end gap-3 px-6 sm:px-10 lg:px-14">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              aria-label="Previous step"
              className="border-ht-orange text-ht-orange grid size-12 place-items-center rounded-full border-2 bg-white transition-[transform,opacity] duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-35"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(process.length - 1, activeStep + 1))}
              disabled={activeStep === process.length - 1}
              aria-label="Next step"
              className="border-ht-orange text-ht-orange grid size-12 place-items-center rounded-full border-2 bg-white transition-[transform,opacity] duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-35"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
