"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AuroraGlow } from "@/components/AuroraGlow";
import { Eyebrow } from "@/components/Eyebrow";
import { process } from "@/content/process";

/**
 * Copy deck §1 Section 5, drawn per the client's comp: a horizontal carousel
 * with an ember circle control, cards bleeding off the right edge, and a
 * progress bar tracking position.
 *
 * This replaces an earlier scroll-linked pinned track (dev brief §4.10). The
 * comp shows a manual next control, and pinning cost ~2.4 viewports of forced
 * scrolling in the middle of the page. A native scroll container also means
 * touch swipe and keyboard both work for free, and nothing is scroll-jacked.
 */
export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max <= 0 ? 1 : el.scrollLeft / max;
    setProgress(p);
    setAtEnd(p >= 0.99);
    setAtStart(p <= 0.01);
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
    // Advance by one card plus its gap, measured rather than assumed.
    const card = el.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section id="process" className="px-3 py-8 sm:px-5">
      <div className="bg-bark rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
        <AuroraGlow intensity={0.3} />
        <div className="relative z-[2] pt-14 pb-12 md:pt-20 md:pb-14">
          <div className="px-6 sm:px-10 md:px-14">
            <Eyebrow>Our Process</Eyebrow>
            <h2 className="font-heading mt-6 max-w-[14ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
              From first seed to lasting harvest.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.6] text-peach/70">
              We&rsquo;re a website development studio — every project we build includes the design,
              UX, and SEO foundations to make it work, not just look good.
            </p>

            <div
              className="mt-10 h-[3px] w-full overflow-hidden rounded-full bg-peach/20"
              role="presentation"
            >
              <div
                className="bg-ember h-full origin-left transition-transform duration-200 ease-out"
                style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }}
              />
            </div>
          </div>

          {/* Native scroll container: swipe, trackpad and keyboard all work, and
              the last card can reach the left edge thanks to the end spacer. */}
          {/* No scroll-snap: snap-mandatory parks the resting position a card's
              padding off zero, which breaks the at-start detection. The buttons
              already scroll by a measured card width. */}
          <ol
            ref={trackRef}
            tabIndex={0}
            aria-label="Our five-step process"
            className="mt-8 flex gap-5 overflow-x-auto scroll-smooth px-6 [scrollbar-width:none] sm:px-10 md:px-14 [&::-webkit-scrollbar]:hidden"
          >
            {process.map((step) => (
              <li
                key={step.number}
                className="rounded-card bg-peach text-bark w-[78vw] shrink-0 p-7 sm:w-[46vw] lg:w-[31%]"
              >
                <span className="font-heading bg-ember text-peach grid size-7 place-items-center rounded-full text-[13px] font-bold">
                  {step.number.replace(/^0/, "")}
                </span>
                <h3 className="font-heading mt-6 text-[clamp(1.15rem,1.7vw,1.5rem)] leading-tight font-bold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-bark-muted mt-3 text-[14px] leading-[1.6]">{step.description}</p>
              </li>
            ))}
            <li aria-hidden="true" className="w-2 shrink-0 sm:w-8" />
          </ol>

          <div className="mt-8 flex justify-end gap-3 px-6 sm:px-10 md:px-14">
            <CarouselButton dir={-1} onClick={() => step(-1)} disabled={atStart} />
            <CarouselButton dir={1} onClick={() => step(1)} disabled={atEnd} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  dir,
  onClick,
  disabled,
}: {
  dir: 1 | -1;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      // The comp draws only a forward control; a back control is added so the
      // carousel isn't a one-way trip, and both are 44px for touch.
      className="border-ember bg-ember text-peach grid size-11 cursor-pointer place-items-center rounded-full border-2 transition-[opacity,background-color] duration-150 hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-35"
    >
      <span className="sr-only">{dir === 1 ? "Next step" : "Previous step"}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-5 ${dir === -1 ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
