"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { carouselCards } from "@/content/home-test";
import { RevealSection } from "@/components/motion-gsap/RevealSection";

const N = carouselCards.length;

/** Shortest circular distance from `active`, e.g. for N=5: -2..2. */
function offsetFrom(i: number, active: number) {
  let offset = i - active;
  if (offset > N / 2) offset -= N;
  if (offset < -N / 2) offset += N;
  return offset;
}

/**
 * A fan carousel, not a scroller: all five cards are always on stage. The
 * centre card is the only one that shows its description; the arrows rotate
 * which card holds the centre slot, sliding every card to its new position
 * (each card is a stable DOM node keyed by label, so GSAP animates it
 * smoothly from one slot to the next rather than swapping content between
 * fixed positions).
 */
export function ServiceCarousel() {
  const [active, setActive] = useState(2);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstRun = useRef(true);

  useLayoutEffect(() => {
    // First run (mount) snaps straight to position — only arrow-triggered
    // rotations should visibly animate, not a fan-out-from-a-pile effect
    // nobody asked for.
    const animateThisRun = !isFirstRun.current;
    isFirstRun.current = false;

    const mm = gsap.matchMedia();

    const apply = (animate: boolean) => {
      carouselCards.forEach((_, i) => {
        const el = cardRefs.current[i];
        const descEl = descRefs.current[i];
        if (!el) return;
        const offset = offsetFrom(i, active);
        const width = el.getBoundingClientRect().width;
        const spacing = width * 0.66;
        const target = {
          // xPercent centres the card against its `left: 50%` base position;
          // GSAP composes it with the pixel `x` offset into one transform.
          // A separate Tailwind translate-x-1/2 class would just get
          // clobbered, since GSAP writes the whole `transform` property.
          xPercent: -50,
          x: offset * spacing,
          y: Math.abs(offset) * 26,
          rotate: offset * 6,
          scale: 1 - Math.abs(offset) * 0.14,
          zIndex: 10 - Math.abs(offset),
        };
        const descTarget = { height: offset === 0 ? "auto" : 0, opacity: offset === 0 ? 1 : 0 };
        if (animate) {
          gsap.to(el, { ...target, duration: 0.7, ease: "power4.out" });
          if (descEl) gsap.to(descEl, { ...descTarget, duration: 0.45, ease: "circ.out" });
        } else {
          gsap.set(el, target);
          if (descEl) gsap.set(descEl, descTarget);
        }
      });
    };

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      apply(animateThisRun);
      return () => {};
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      apply(false);
      return () => {};
    });

    return () => mm.revert();
  }, [active]);

  const rotate = (dir: 1 | -1) => setActive((a) => (a + dir + N) % N);

  return (
    // z-[1], NOT a negative z-index: a negative value sinks the section
    // behind the page's own background layer entirely (verified — it just
    // vanished under the wrapping div's bg-ht-cream). What actually creates
    // "behind Hero and Creative Process" is a LOWER *positive* z-index than
    // those two (both z-10), within the shared stacking context they're
    // already siblings in. -mt-16 tucks the top under Hero; Creative Process
    // handles the bottom overlap on its own side.
    <section className="bg-ht-cream relative z-[1] -mt-16 overflow-hidden rounded-[56px] py-20 md:py-28">
      <RevealSection className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <h2 className="font-ht-display text-ht-purple mx-auto max-w-[20ch] text-center text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.15] font-bold">
          We help you design and build better digital products. All in ONE place!
        </h2>
      </RevealSection>

      {/* Full-bleed stage, deliberately outside the max-w heading column —
          the brief wants the fan to span basically the whole page width,
          with the outer two cards clipped by the section's own edges. */}
      <div className="relative mt-12 h-[340px] w-full sm:h-[380px] md:h-[430px] lg:h-[480px]">
        {carouselCards.map((card, i) => {
          const isCenter = offsetFrom(i, active) === 0;
          return (
            <div
              key={card.label}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute top-0 left-1/2 w-[220px] sm:w-[300px] md:w-[380px] lg:w-[440px]"
            >
              <div
                className={`rounded-card overflow-hidden bg-white shadow-[0_16px_40px_-16px_rgba(46,24,72,0.35)] ring-4 transition-shadow duration-500 ${
                  isCenter ? "ring-ht-pink shadow-[0_20px_50px_-14px_rgba(254,157,210,0.6)]" : "ring-transparent"
                }`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={card.image.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, (max-width: 1024px) 380px, 440px"
                    className="object-cover"
                  />
                </div>
                <div className="bg-ht-orange px-6 py-4">
                  <p className="font-ht-display text-[15px] font-bold text-white uppercase sm:text-[17px]">
                    {card.label}
                  </p>
                  <div
                    ref={(el) => {
                      descRefs.current[i] = el;
                    }}
                    className="h-0 overflow-hidden opacity-0"
                  >
                    <p className="font-ht-body mt-2 text-[13px] leading-snug text-white/90 sm:text-[14px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => rotate(-1)}
          className="text-ht-purple border-ht-purple/30 hover:border-ht-purple grid size-11 cursor-pointer place-items-center rounded-full border-2 bg-ht-cream transition-colors"
        >
          <span className="sr-only">Previous service</span>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => rotate(1)}
          className="text-ht-purple border-ht-purple/30 hover:border-ht-purple grid size-11 cursor-pointer place-items-center rounded-full border-2 bg-ht-cream transition-colors"
        >
          <span className="sr-only">Next service</span>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
