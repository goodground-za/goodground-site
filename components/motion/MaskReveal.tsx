"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A "rise into view behind a mask" reveal: the child sits below its own clip box
 * and slides up to fill it on load. Used for the hero wordmark, the one piece of
 * type big enough to earn a dedicated entrance.
 *
 * The pb/-mb pair gives the clip box room for descenders (the 'g' tails in
 * "GoodGround") without shifting layout, so the mask never eats them at rest.
 * Transform-only, so no layout cost. data-reveal + the noscript rule in
 * layout.tsx mean it ships fully visible if JS never runs.
 */
export function MaskReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <span className={`block ${className}`}>{children}</span>;

  return (
    <span className={`block overflow-hidden pb-[0.22em] -mb-[0.22em] ${className}`}>
      <motion.span
        data-reveal
        className="block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
