"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";

/**
 * A light that travels around the inside edge of its parent.
 *
 * Adapted from the Motion Primitives "border trail" pattern. The original
 * imports from `@/components/core/border-trail`, which does not exist here, so
 * it lives in components/motion/ alongside the other framer-motion pieces
 * (motion-gsap/ is for the GSAP ones).
 *
 * The parent must be `position: relative` and `overflow: hidden`, otherwise the
 * light will not follow the corners or will spill outside them.
 *
 * Motion respects prefers-reduced-motion: with it on, the light parks at the
 * top-left instead of circling, so the card still reads as highlighted without
 * anything moving.
 */
export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  style,
  borderWidth = 1,
}: {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  style?: React.CSSProperties;
  /**
   * Thickness of the band the light is masked into, in px. Match it to the
   * host's own border or ring width, otherwise the light sits inside the ring
   * instead of running along it and reads as much fainter than intended.
   */
  borderWidth?: number;
}) {
  const reduce = useReducedMotion();

  const defaultTransition: Transition = {
    repeat: Infinity,
    duration: 6,
    ease: "linear",
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ borderWidth }}
    >
      {/* No default background colour on purpose. The upstream version sets
          bg-zinc-500, which shows through wherever the caller's gradient is
          transparent and turns a soft tail muddy grey. Callers pass their own. */}
      <motion.div
        className={`absolute aspect-square ${className ?? ""}`}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={reduce ? undefined : { offsetDistance: ["0%", "100%"] }}
        transition={
          reduce
            ? undefined
            : {
                ...(transition ?? defaultTransition),
                ...(delay !== undefined ? { delay } : {}),
              }
        }
      />
    </div>
  );
}
