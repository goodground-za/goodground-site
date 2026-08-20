"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { sixReasons } from "@/content/homepage";

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical timeline: a rail down the left with a numbered node per reason,
 * filling orange as you scroll past each one — the brief's "each reason
 * appears one after the other", read as progress rather than as six separate
 * entrance animations.
 *
 * The rail is decoration on top of a plain ordered list: every reason's text
 * is in the document from the start, so nothing here depends on JS running
 * or on the scroll ever reaching this section.
 */
export function ReasonsToWorkWithUs() {
  const listRef = useRef<HTMLOListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  // Under reduced motion the rail never scrubs, so start it complete rather
  // than leaving a permanently empty track. Lazy initialiser (matchMedia is
  // synchronous) rather than an effect, to avoid the extra render pass.
  const [progress, setProgress] = useState(
    () => (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0),
  );

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rail = ScrollTrigger.create({
        trigger: list,
        start: "top 70%",
        end: "bottom 80%",
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });

      // Each reason rises into place as it reaches the lower third of the
      // viewport, so they arrive one after the other on the way down. The
      // hidden from-state is set by GSAP rather than in CSS, so a visitor
      // whose JS never runs gets six plainly visible items instead of six
      // invisible ones.
      const items = itemsRef.current.filter((el): el is HTMLLIElement => Boolean(el));
      const entrances = items.map((item) =>
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 82%", toggleActions: "play none none reverse" },
          },
        ),
      );

      return () => {
        rail.kill();
        entrances.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  // Node 1 reads as reached the moment the rail starts, matching the
  // reference's first-node-orange resting state.
  const reachedIndex = Math.floor(progress * (sixReasons.length - 1));

  return (
    <section id="reasons" className="bg-ht-cream px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[900px]">
        <RevealSection className="text-center">
          <h2 className="font-ht-display text-ht-purple mx-auto max-w-[13ch] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-bold">
            Reasons to work with us
          </h2>
          <p className="font-ht-body text-ht-purple/75 mx-auto mt-6 max-w-[46ch] text-[16px] leading-relaxed">
            Every project is shaped from first brief to final handoff. No recycled templates, no rushed work.
          </p>
        </RevealSection>

        <ol ref={listRef} className="relative mx-auto mt-16 max-w-[580px] list-none">
          {/* Rail track, then the orange fill over it. Both start at the
              first node's centre and stop at the last node's centre so the
              line never floats past the numbers. */}
          <div className="bg-ht-purple/20 absolute top-4 bottom-4 left-4 w-0.5 -translate-x-1/2" aria-hidden="true" />
          <div
            className="bg-ht-orange absolute top-4 left-4 w-0.5 origin-top -translate-x-1/2"
            style={{ height: `calc(${progress * 100}% - ${progress * 32}px)` }}
            aria-hidden="true"
          />

          {sixReasons.map((reason, i) => {
            const reached = i <= reachedIndex;
            const active = i === reachedIndex;
            return (
              // Highlight is carried by colour and the node's fill only, never
              // by opacity: GSAP owns this element's opacity for the entrance,
              // and a second writer would fight it mid-animation.
              <li
                key={reason.title}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className="relative pb-11 pl-14 last:pb-0"
              >
                <span
                  className={`font-ht-display absolute top-0 left-0 grid size-8 place-items-center rounded-full border-2 text-[13px] font-bold transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out)] ${
                    // Contrast, not taste: cream-on-orange is ~1.9:1 and
                    // orange-on-cream is 3.48:1, both short of the 4.5:1 these
                    // 13px numerals need. ink-on-orange is 5.87:1 and
                    // crimson-on-cream is 6.12:1.
                    active
                      ? "border-ht-orange bg-ht-orange text-ink scale-110"
                      : reached
                        ? "border-ht-crimson bg-ht-cream text-ht-crimson"
                        : "border-ht-purple/50 bg-ht-cream text-ht-purple/75"
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3
                  className={`font-ht-display pt-1 text-[15px] leading-tight font-bold tracking-wide uppercase transition-colors duration-300 ${
                    active ? "text-ht-crimson" : "text-ht-purple"
                  }`}
                >
                  {reason.title}
                </h3>
                <p className="font-ht-body text-ht-purple/75 mt-3 text-[14.5px] leading-relaxed">{reason.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
