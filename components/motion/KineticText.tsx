"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

/**
 * The Aeline signature move (dev brief §5): a headline whose phrase-groups
 * brighten in one after another as the section scrolls into view.
 *
 * Two things this must not do:
 *  - Shift layout. The text occupies its final box from first paint; only
 *    opacity and a few px of transform animate. That keeps CLS at 0.
 *  - Fight the reader. Each group is 150-250ms, overlapping, so the line reads
 *    at normal speed rather than being spelled out.
 *
 * Under prefers-reduced-motion the whole thing collapses to plain visible text.
 */
export function KineticText({
  phrases,
  as: Tag = "h2",
  className = "",
  tone = "dark",
  once = true,
}: {
  /** Each string is one phrase-group, revealed as a unit. */
  phrases: string[];
  as?: ElementType;
  className?: string;
  /** Which surface this sits on, so the resting colour stays legible on it. */
  tone?: "dark" | "light";
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion.create(Tag);

  // Both resting values clear WCAG AA against their own surface, so a phrase is
  // readable before it resolves, not just after.
  const resting = tone === "light" ? "rgba(251,250,246,0.65)" : "#6b6960";
  const resolved = tone === "light" ? "rgba(251,250,246,1)" : "#1f3d2c";

  if (reduced) {
    return <Tag className={className}>{phrases.join(" ")}</Tag>;
  }

  return (
    <MotionTag
      data-reveal
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.5, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.09 }}
    >
      {phrases.map((phrase, i) => (
        <motion.span
          data-reveal
          key={`${phrase}-${i}`}
          // The reveal animates COLOUR, not opacity. A pre-reveal state of
          // opacity:0.18 is unreadable text sitting on the page, and WCAG wants
          // 4.5:1 at every frame, not just once the animation lands. Both resting
          // colours below clear AA on their surface (5.3:1 light, 5.8:1 dark).
          variants={{
            hidden: { color: resting, y: 5 },
            shown: { color: resolved, y: 0 },
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {phrase}
          {i < phrases.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/**
 * Same reveal grammar, but for a block that should resolve as one unit.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children on entry. Pair with <RevealItem>. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        shown: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
