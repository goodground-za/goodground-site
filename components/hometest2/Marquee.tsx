import type { ReactNode } from "react";

/**
 * Pure CSS continuous scroll — no JS at all, so there's nothing to fail if
 * scripts don't run. Content is duplicated once so the loop is seamless
 * (animating the row -50% lines the second copy up exactly where the first
 * started). Pauses on hover via CSS only; stops entirely under
 * prefers-reduced-motion.
 *
 * The @keyframes live in this file's own <style> tag rather than the site's
 * shared globals.css — this is a self-contained, noindex test route, so it
 * shouldn't add global CSS that every other page also has to carry.
 */
export function Marquee({ children, durationS = 32 }: { children: ReactNode; durationS?: number }) {
  return (
    <div className="ht2-marquee group/marquee overflow-hidden">
      <style>{`
        @keyframes ht2-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ht2-marquee__track {
          animation: ht2-marquee-scroll ${durationS}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ht2-marquee__track { animation: none; }
        }
      `}</style>
      <div className="ht2-marquee__track group-hover/marquee:[animation-play-state:paused] flex w-max gap-8">
        <div className="flex shrink-0 gap-8">{children}</div>
        <div className="flex shrink-0 gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
