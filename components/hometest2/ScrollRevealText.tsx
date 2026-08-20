"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Word-by-word colour wipe driven by scroll position: the sentence starts
 * muted and fills with the inherited accent colour as it crosses the viewport.
 *
 * The *resting* state is the finished one. Each word renders in the parent's
 * colour and only turns grey once `data-muted="true"` is set, which only JS
 * does. So a visitor with no JS, or with reduced motion on, gets a normal
 * fully-legible sentence instead of a permanently grey one.
 */
export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const spans = el.querySelectorAll<HTMLElement>("[data-word]");
      const setMuted = (from: number) => {
        spans.forEach((span, i) => {
          span.dataset.muted = i >= from ? "true" : "false";
        });
      };

      setMuted(0);

      // A bare ScrollTrigger, no tween: the change is a class swap per word,
      // and tweening between two colour spaces mid-scrub goes muddy in the
      // middle where a hard swap does not.
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "bottom 58%",
        scrub: 0.4,
        onUpdate: (self) => setMuted(Math.round(self.progress * spans.length)),
      });

      return () => {
        trigger.kill();
        spans.forEach((span) => {
          span.dataset.muted = "false";
        });
      };
    });

    return () => mm.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {/* The separating space is a sibling of the span, not inside it.
          Chrome trims leading/trailing whitespace inside an inline element
          when it computes the accessible name, so keeping the space in there
          made a screen reader announce the whole sentence as one run-on
          word. As a direct text child of the <p> it survives. */}
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            data-word
            data-muted="false"
            className="transition-colors duration-300 ease-[var(--ease-out)] data-[muted=true]:text-ht-purple/25"
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
