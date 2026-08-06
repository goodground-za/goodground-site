/**
 * The client's reference art directly: five circles resting on a shared
 * baseline, overlapping enough that the valleys between them sit well
 * above the baseline (a tangent scallop's valleys would touch it
 * instead) — small, stepping up to a big centre bump, stepping back
 * down, with the two end bumps cropped by the canvas edge exactly as in
 * the source image. Drawn once (not tiled) in a fixed 2000x430 design
 * space matching that image's own proportions, and scaled by width only
 * (no preserveAspectRatio="none") so the circles stay genuinely round —
 * this makes the divider tall relative to section width by design, so
 * whatever sits above it needs enough reserved bottom space to accommodate.
 *
 * Shared scallop-transition primitive used anywhere one section needs to
 * "grow" out of the top of another (e.g. WhatWeBuild tucking under
 * WhoWeBuildFor, the footer tucking under CTABand) — pass a different
 * `fill` per call site.
 */
const CLOUD_CIRCLES = [
  { cx: 100, r: 180 },
  { cx: 560, r: 360 },
  { cx: 1000, r: 430 },
  { cx: 1440, r: 360 },
  { cx: 1900, r: 180 },
];

export function CloudDivider({ className, fill }: { className: string; fill: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 2000 430">
      {CLOUD_CIRCLES.map((c) => (
        <circle key={c.cx} cx={c.cx} cy={430} r={c.r} fill={fill} />
      ))}
    </svg>
  );
}
