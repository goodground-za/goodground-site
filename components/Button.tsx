import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Pill buttons, matching the promoted /home-test design language. Variant
 * NAMES are kept from the previous bark/ember palette (ember/ink/peach/
 * outline) even though the colors they map to have changed — every call
 * site across the app already picks the right variant by its conceptual
 * role (primary/dark-solid/light-pill/outline), so remapping colors here
 * needed no call-site changes.
 *
 * Contrast (2026-08-13 audit): `ember` previously used white on ht-orange,
 * measured 3.48:1 by Lighthouse — below the 4.5:1 AA bar at this button's
 * 14/15px bold size (the 3:1 large-text exemption needs 18.66px bold). Now
 * uses `text-ink`, which clears it at 5.86:1 while keeping the client's
 * orange exactly as supplied. Other variants: ht-purple on ht-cream 11.7:1,
 * white on ht-purple 11.7:1.
 */
type Variant = "ember" | "ink" | "peach" | "outline";

// Press feedback is scale(0.97) — enough to feel the interface "hear" the tap
// (Emil's bar is 0.95–0.98; the old 0.99 was too faint to register). The
// stronger ease-out curve comes from the --ease-out token override in
// globals.css, so every button inherits it without a per-variant change.
const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-ht-display font-bold uppercase tracking-wide cursor-pointer " +
  "transition-[transform,background-color,box-shadow,border-color] duration-150 ease-out " +
  "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  ember: "bg-ht-orange text-ink shadow-soft hover:bg-ht-orange/90 hover:shadow-lift",
  ink: "bg-ht-purple text-white shadow-soft hover:bg-ht-purple/90 hover:shadow-lift",
  peach: "bg-ht-cream text-ht-purple shadow-soft hover:bg-ht-cream/85 hover:shadow-lift",
  // Orange text, NOT crimson: `outline` has a transparent fill, so its label
  // sits on whatever surface it's dropped onto. Its only production use is the
  // cookie banner (Analytics.tsx), which is bg-ht-purple — orange reads 4.50:1
  // there, crimson would be 2.39:1. On a LIGHT surface this variant is the
  // wrong choice; use a crimson-text button instead (About.tsx has that pattern).
  outline: "border-2 border-ht-orange text-ht-orange hover:bg-ht-orange hover:text-ink",
};

const sizes = {
  md: "h-11 px-5 text-[14px]",
  lg: "h-13 px-7 text-[15px]",
};

type Props = {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  variant = "ember",
  size = "md",
  className = "",
  children,
  ...props
}: Props & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "ember",
  size = "md",
  className = "",
  children,
  ...props
}: Props & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
