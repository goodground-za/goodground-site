"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cycles through a list of words/phrases in place, for a "we specialise in X"
 * style line. Every word stays mounted, stacked in the same CSS grid cell
 * (`grid-area: 1/1`), so the container's intrinsic width is the widest word
 * from first paint — the active word only ever crossfades in place, it never
 * changes the box size. That's what keeps this at 0 CLS, the same
 * space-reservation trick KineticText uses for its own reveal.
 *
 * Reduced motion: stops cycling and simply shows the first word, so nothing
 * flashes for a visitor who asked motion off.
 */
export function RotatingWords({
  words,
  interval = 2000,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduced, words, interval]);

  return (
    <span className={`relative inline-grid align-middle ${className}`}>
      {words.map((word, i) => {
        const active = reduced ? i === 0 : i === index;
        return (
          <motion.span
            key={word}
            aria-hidden="true"
            className="pointer-events-none [grid-area:1/1] whitespace-nowrap"
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        );
      })}

      {/* The full list, once, for screen readers — the rotation above is
          purely decorative and hidden from them via aria-hidden. */}
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
