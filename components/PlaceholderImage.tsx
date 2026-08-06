/**
 * Stand-in for a `next/image` wherever the client hasn't supplied a real
 * photo yet. On-brand (ht-orange/pink/purple over ht-cream), deliberately
 * reads as "a placeholder" rather than a broken image — a soft diagonal
 * wash, a few of the site's signature overlapping circles (echoing
 * CloudDivider), and a simple picture glyph, optionally labelled.
 *
 * Mirrors `next/image`'s two sizing modes so swapping in a real photo later
 * is a one-line change: pass `width`/`height` for an intrinsic box, or
 * `fill` to have it absolutely fill a positioned parent. `alt` is applied
 * via `role="img"`/`aria-label` on the wrapper (the inner SVG is
 * `aria-hidden`), so it announces exactly like a real image would once
 * replaced.
 */
type Props = {
  alt: string;
  className?: string;
  /** Small caption drawn under the icon, e.g. "Team photo coming soon". Omit for a bare icon. */
  label?: string;
} & ({ fill: true; width?: never; height?: never } | { fill?: false; width: number; height: number });

const SHAPES = [
  { cx: 18, cy: 22, r: 26, fill: "var(--color-ht-pink)", opacity: 0.55 },
  { cx: 82, cy: 78, r: 34, fill: "var(--color-ht-orange)", opacity: 0.45 },
  { cx: 78, cy: 15, r: 16, fill: "var(--color-ht-cream)", opacity: 0.35 },
] as const;

export function PlaceholderImage({ alt, className = "", label, fill, width, height }: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${fill ? "absolute inset-0" : ""} ${className}`}
      style={fill ? undefined : { width, height }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <rect width="100" height="100" fill="var(--color-ht-purple)" />
        {SHAPES.map((s) => (
          <circle key={s.cx} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} opacity={s.opacity} />
        ))}
        <g transform="translate(50 46)" opacity="0.85">
          <rect x="-14" y="-10" width="28" height="20" rx="3" fill="none" stroke="var(--color-ht-cream)" strokeWidth="2" />
          <circle cx="-6" cy="-3" r="2.4" fill="var(--color-ht-cream)" />
          <path d="M-14 6 L-4 -1 L4 4 L14 -4 L14 10 L-14 10 Z" fill="var(--color-ht-cream)" />
        </g>
      </svg>
      {label ? (
        <span className="font-ht-display absolute inset-x-0 bottom-4 px-4 text-center text-[11px] leading-[1.4] font-bold tracking-[0.1em] text-white/70 uppercase">
          {label}
        </span>
      ) : null}
    </div>
  );
}
