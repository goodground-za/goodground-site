"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient animated warmth for the dark (bark) bands. Technique adapted from the
 * 21st.dev "AuroraBackground" (an animated repeating-linear-gradient shifted via
 * background-position), recoloured from its cool blue/violet original to the
 * brand's ember, gold and peach so it reads as firelight or low sun rather than
 * a tech aurora. Blurred and screened over the dark ground, masked to pool in
 * the centre.
 *
 * Styles are inline, not Tailwind arbitrary classes: the gradient's nested var()
 * and commas don't survive Tailwind v4's arbitrary-value parser. Decorative and
 * aria-hidden; frozen for reduced-motion. Background-position only, so no layout
 * cost and no CLS.
 */

// Literal hex, not var(): a var()-color with a position stop inside a gradient
// computes to `none` in Chrome. These brand colours are fixed (no dark mode),
// so hardcoding is safe. ember / sunlight-gold / ember / peach / ember.
const AURORA =
  "repeating-linear-gradient(110deg,#ac4119 6%,#f2b84b 14%,#ac4119 22%,#fde5c1 30%,#ac4119 38%)";

const MASK = "radial-gradient(ellipse at center, black 25%, transparent 78%)";

export function AuroraGlow({ className = "", intensity = 0.55 }: { className?: string; intensity?: number }) {
  const reduced = useReducedMotion();

  return (
    // The wrapper is a plain overflow-hidden clip with NO filter of its own:
    // `overflow:hidden` + `filter` together fail to clip in some Chrome builds,
    // which let the 200%-wide layer escape and forced horizontal scroll. Keeping
    // the clip element filter-free makes the clip reliable; the blur/blend/mask
    // live on the inner layer instead.
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Drift via translateX (compositor-only, no per-frame repaint). The layer
          is 200% wide with a repeating gradient, so a -50% shift is seamless. */}
      <motion.div
        className="absolute inset-y-[-25%] left-0 w-[200%]"
        style={{
          backgroundImage: AURORA,
          opacity: intensity,
          mixBlendMode: "screen",
          filter: "blur(48px)",
          WebkitMaskImage: MASK,
          maskImage: MASK,
        }}
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
      />
    </div>
  );
}
