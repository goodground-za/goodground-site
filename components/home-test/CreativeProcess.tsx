"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { processBanner } from "@/content/home-test";
import { process } from "@/content/process";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/**
 * The mockup's own subtitle under "OUR CREATIVE PROCESS" is a literal
 * placeholder ("Text goes here") — omitted rather than invented, same
 * principle as the FAQ's honest "still working this one out" state
 * elsewhere on the site. Steps use the real content/process.ts (6 steps).
 * A final non-numbered CTA card closes the strip, matching the size of the
 * step cards so the drag/arrow scroll math (which measures the first `li`)
 * stays correct.
 */
export function CreativeProcess() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScrollLeft: 0, moved: false, active: false });

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max <= 0 ? 1 : el.scrollLeft / max;
    setProgress(p);
    setAtStart(p <= 0.01);
    setAtEnd(p >= 0.99);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  // Mouse drag-to-scroll: native touch/trackpad scrolling already works on
  // the overflow-x-auto track, but a mouse has no scroll gesture of its own,
  // so desktop users need click-and-drag added explicitly.
  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLOListElement>) => {
    if (e.pointerType === "touch") return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false, active: true };
    setIsDragging(true);
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // Pointer capture can fail to attach (e.g. no live hardware pointer);
      // dragState.active still gates onPointerMove so dragging keeps working.
    }
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLOListElement>) => {
    const el = trackRef.current;
    if (!el || !dragState.current.active) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  }, []);

  const endDrag = useCallback((e: ReactPointerEvent<HTMLOListElement>) => {
    const el = trackRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    dragState.current.active = false;
    setIsDragging(false);
  }, []);

  // Swallow the click that follows a drag so links/buttons under the
  // pointer don't fire (e.g. "Start Your Project") when the user was
  // dragging, not clicking.
  const onClickCapture = useCallback((e: ReactMouseEvent<HTMLOListElement>) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  }, []);

  return (
    // z-10 + -mt-16: sits ABOVE the ServiceCarousel section before it (which
    // is kept behind at -z-10), pulled up to overlap its bottom strip — the
    // higher stacking means this section visually covers that overlap, so
    // the carousel reads as tucked in behind both this and Hero. rounded-t
    // reveals the carousel peeking through in the corners specifically.
    <section className="relative z-10 -mt-16 overflow-hidden rounded-t-[56px]">
      <div className="relative min-h-[70vh] w-full">
        <Image
          src={processBanner.src}
          alt="Four GoodGround team members, backlit against a clear sky"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="bg-ht-purple/45 absolute inset-0" />

        <div className="relative z-[2] px-6 pt-20 text-center sm:px-10">
          <SplitWords
            as="h2"
            text="Our Creative Process"
            className="font-ht-display mx-auto max-w-[16ch] text-[clamp(2rem,5vw,4rem)] font-bold text-white uppercase"
          />
        </div>

        <div className="relative z-[2] mt-10 px-6 sm:px-10">
          <div className="mx-auto h-[3px] max-w-[1600px] overflow-hidden rounded-full bg-white/25" role="presentation">
            <div
              className="bg-ht-orange h-full origin-left transition-transform duration-200 ease-out"
              style={{ transform: `scaleX(${Math.max(progress, 0.05)})` }}
            />
          </div>
        </div>

        <ol
          ref={trackRef}
          tabIndex={0}
          aria-label="Our creative process"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          className={`relative z-[2] mt-8 flex gap-5 overflow-x-auto px-6 pb-10 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing scroll-auto select-none" : "cursor-grab scroll-smooth"
          }`}
        >
          {process.map((item) => (
            <li
              key={item.number}
              className="rounded-card bg-ht-cream text-ht-purple ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] w-[80vw] shrink-0 p-7 ring-2 sm:w-[42vw] lg:w-[26%]"
            >
              <div className="flex items-center gap-2">
                <span className="border-ht-purple/40 text-ht-purple rounded-pill inline-block border px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
                  Step
                </span>
                <span className="font-ht-display bg-ht-purple grid size-7 place-items-center rounded-full text-[13px] font-bold text-white">
                  {item.number.replace(/^0/, "")}
                </span>
              </div>
              <h3 className="font-ht-display mt-5 text-[clamp(1.1rem,1.6vw,1.4rem)] font-bold">
                {item.title}
              </h3>
              <p className="font-ht-body mt-2 text-[14px] leading-[1.6] text-ht-purple/75">
                {item.description}
              </p>
            </li>
          ))}
          <li className="rounded-card bg-ht-purple ring-ht-orange shadow-[0_14px_0_0_var(--color-ht-orange)] flex w-[80vw] shrink-0 flex-col items-start justify-center p-7 ring-2 sm:w-[42vw] lg:w-[26%]">
            <h3 className="font-ht-display text-[clamp(1.1rem,1.6vw,1.4rem)] font-bold text-white">
              Ready to get started?
            </h3>
            <p className="font-ht-body mt-2 text-[14px] leading-[1.6] text-white/75">
              Let&rsquo;s talk about your project and see where it fits in the process.
            </p>
            <MagneticButton>
              <Link
                href="/start-project"
                className="font-ht-display bg-ht-orange rounded-pill mt-5 inline-block px-6 py-3 text-[13px] font-bold tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.03]"
              >
                Start Your Project
              </Link>
            </MagneticButton>
          </li>
          <li aria-hidden="true" className="w-2 shrink-0 sm:w-8" />
        </ol>

        {/* pb-24, not pb-10: reserves a strip of banner image below the
            arrows for WhoWeBuildFor's -mt-16 overlap to tuck into, so its
            rounded top corners peek this image rather than clipping the
            arrow buttons themselves. */}
        <div className="relative z-[2] flex justify-end gap-3 px-6 pb-24 sm:px-10">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            className="bg-ht-orange grid size-11 cursor-pointer place-items-center rounded-full text-white transition-[opacity] duration-150 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span className="sr-only">Previous step</span>
            <svg viewBox="0 0 24 24" className="size-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            className="bg-ht-orange grid size-11 cursor-pointer place-items-center rounded-full text-white transition-[opacity] duration-150 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span className="sr-only">Next step</span>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
