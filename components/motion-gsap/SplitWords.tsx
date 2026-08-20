"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, type ElementType } from "react";

/**
 * Word-by-word (never letter-by-letter, per the brief) headline reveal.
 * GSAP's own SplitText plugin is a paid Club GreenSock feature — this is a
 * small free equivalent: split on spaces, wrap each word in an
 * overflow-hidden mask so it rises up from behind its own line, and stagger
 * them in with a GSAP timeline. Same visual result, no paid dependency.
 */
export function SplitWords({
  text,
  as = "span",
  className = "",
  wordClassName = "",
  duration = 0.7,
  stagger = 0.06,
  delay = 0,
  trigger = "scroll",
  start = "top 85%",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  /** "mount" plays immediately (hero headline); "scroll" waits for viewport entry. */
  trigger?: "scroll" | "mount";
  start?: string;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const spans = el.querySelectorAll("[data-word]");
      gsap.set(spans, { opacity: 0, y: "0.6em" });
      const tween = gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power4.out",
        scrollTrigger: trigger === "scroll" ? { trigger: el, start, once: true } : undefined,
      });
      return () => {
        tween.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, [duration, stagger, delay, trigger, start, text]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        // pb/-mb pair: the mask is overflow-hidden, and at tight line-heights
        // a descender ("g", "y") drops below the content box and gets sliced.
        // The padding grows the mask downward far enough to clear one, and
        // the equal negative margin takes that height back out of layout so
        // line spacing is unchanged.
        <span
          key={`${word}-${i}`}
          className="inline-block -mb-[0.2em] overflow-hidden pb-[0.2em] align-bottom"
        >
          <span data-word className={`inline-block ${wordClassName}`}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
