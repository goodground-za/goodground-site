import type { CSSProperties } from "react";

import { formatNumber } from "./format";

/**
 * COUNT-UP number. Renders the final value on the server (so it is right with
 * JS off); the motion helper counts it up from 0 when it is half visible.
 *
 * Prefix/suffix stay static. Screen readers get the final value from
 * aria-label; the animated digits are aria-hidden. The digits' width is
 * reserved in ch (tabular figures), so nothing moves while it counts.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  delay,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** ms to wait after it comes into view, to stagger a row of them. */
  delay?: number;
  className?: string;
}) {
  const final = formatNumber(to, decimals);
  return (
    <span
      className={className ? `gg-count ${className}` : "gg-count"}
      data-reveal="count-up"
      data-to={to}
      data-decimals={decimals || undefined}
      data-delay={delay || undefined}
      role="text"
      aria-label={`${prefix}${final}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {/* Right-aligned only when a suffix follows, so the suffix never
            moves; otherwise left, so a prefix stays against the digits. */}
        <span
          className="gg-count__digits"
          style={{ minWidth: `${final.replace(/[^0-9]/g, "").length + (final.length - final.replace(/[^0-9]/g, "").length) * 0.4}ch`, textAlign: suffix ? "right" : "left" } as CSSProperties}
        >
          {final}
        </span>
        {suffix}
      </span>
    </span>
  );
}
