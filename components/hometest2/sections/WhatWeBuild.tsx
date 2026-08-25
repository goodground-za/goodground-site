"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { services } from "@/content/services";

/**
 * Stacking-card scroll-jack: vertical scroll pins the section while each
 * card in turn slides up and settles onto the stack, until all six have
 * landed, then releases and vertical scrolling continues.
 *
 * Default (pre-JS, or under prefers-reduced-motion) render is a plain
 * vertical stack of full cards in normal document flow — no absolute
 * positioning, no pin. The stacking/pin effect is layered on top of that
 * via GSAP only once motion is confirmed allowed, so a no-JS visitor or a
 * reduced-motion one gets every card's full content, just not fanned.
 */
export function WhatWeBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => Boolean(c));
    if (!section || !frame || cards.length < 2) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      // Switch every card but the first to absolute, stacked on the same
      // spot, only once we're actually about to animate them — this is
      // what keeps the un-animated fallback a plain document-flow stack.
      gsap.set(section, { position: "relative" });
      // Clip here rather than in the markup: a waiting card parks exactly one
      // card-height below the frame and would otherwise be plainly visible in
      // the space under the stack. Applied via GSAP so the un-animated
      // fallback stays an unclipped column of six full cards.
      gsap.set(frame, { overflow: "hidden" });
      cards.forEach((card, i) => {
        if (i === 0) return;
        // No opacity fade: a card that arrives semi-transparent lets the card
        // underneath read straight through its text mid-transition. Solid
        // cards sliding up over each other is both cleaner and the reference.
        // 112 not 100 so it clears the frame's bottom padding too.
        gsap.set(card, { position: "absolute", inset: 0, yPercent: 112 });
      });

      const perCard = window.innerHeight * 0.6;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(cards.length - 1) * perCard}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(
          cards[i - 1],
          { scale: 1 - i * 0.03, y: -i * 14, rotate: i % 2 === 0 ? -1.5 : 1.5, duration: 1 },
          i - 1,
        ).to(card, { yPercent: 0, duration: 1 }, i - 1);
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    // This section gets pinned, so its own height is the viewport the visitor
    // is stuck looking at: anything past 100vh is simply unreachable while the
    // pin holds. min-h-screen + centred content keeps it exactly one viewport,
    // the generous top padding clears the fixed nav, and the max-height query
    // tightens everything again on short laptop screens where the default
    // padding pushed the card's bottom edge off the screen.
    <section
      ref={sectionRef}
      id="what-we-build"
      className="bg-ht-cream flex min-h-screen flex-col justify-center px-6 pt-28 pb-12 sm:px-10 md:pt-32 md:pb-16 [@media(max-height:760px)]:pt-24 [@media(max-height:760px)]:pb-8"
    >
      <div className="mx-auto max-w-[1434px]">
        <div className="text-center">
          <h2 className="font-ht-display text-ht-orange mx-auto max-w-[16ch] text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02] font-bold">
            What we build
          </h2>
          {/* Explicit break rather than a max-width doing it by accident, so
              the two sentences stay on their own lines at every size. */}
          <p className="font-ht-body text-ht-purple/80 mt-4 text-[15.5px] leading-relaxed text-balance">
            One team, one connected process.
            <br />
            Here is what we do.
          </p>
        </div>

        {/* px/pt/pb give the cards' shadows and the scaled-back stack room to
            breathe inside the clip GSAP applies to this frame. */}
        <div
          ref={frameRef}
          className="mx-auto mt-10 max-w-[980px] px-8 pt-10 pb-6 [@media(max-height:760px)]:mt-5 [@media(max-height:760px)]:pt-6 [@media(max-height:760px)]:pb-3"
        >
          {/* Viewport-relative floor, not a flat 440px: on a short screen a
              fixed minimum inflated this frame past the pinned viewport and
              cut the card off at the bottom. */}
          <div className="relative min-h-[min(440px,42vh)]">
          {services.map((s, i) => (
            <div
              key={s.slug}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="relative mb-6 overflow-hidden rounded-[28px] bg-white px-8 py-12 text-center shadow-[var(--shadow-lift)] sm:px-14 md:mb-0"
              style={{ zIndex: i + 1 }}
            >
              {/* Position number as a watermark rather than a label: it tells
                  you where you are in the stack without adding another line
                  of chrome above the title. */}
              <span
                aria-hidden="true"
                className="font-ht-display text-ht-orange/10 pointer-events-none absolute inset-0 grid place-items-center text-[clamp(8rem,18vw,15rem)] leading-none font-bold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <span className="font-ht-display bg-ht-purple rounded-pill inline-block px-4 py-1.5 text-[11px] font-bold tracking-wide text-white">
                  {s.flagship ? "Flagship" : s.monthly ? "Monthly" : s.growth ? "Growth" : "Included"}
                </span>
                <h3 className="font-ht-display text-ht-orange mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] font-bold">
                  {s.title}
                </h3>
                <p className="font-ht-body text-ht-purple/80 mx-auto mt-4 max-w-[42ch] text-[15px] leading-relaxed">
                  {s.description}
                </p>
                {s.relatedLink ? (
                  <Link
                    href={s.relatedLink.href}
                    className="font-ht-display bg-ht-orange text-ink rounded-pill mt-7 inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    See full details
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
