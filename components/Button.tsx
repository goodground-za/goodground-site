import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Pill buttons, per the comp. Every combination below was contrast-checked
 * against the surface it is drawn on:
 *   peach on ember   5.4:1 · ink on peach 17:1 · peach on ink 16:1 · peach on bark 13.4:1
 */
type Variant = "ember" | "ink" | "peach" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-heading font-bold cursor-pointer " +
  "transition-[transform,background-color,box-shadow,border-color] duration-150 ease-out " +
  "motion-safe:hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  ember: "bg-ember text-peach shadow-soft hover:bg-ember/90 hover:shadow-lift",
  ink: "bg-ink text-peach shadow-soft hover:bg-bark hover:shadow-lift",
  peach: "bg-peach text-bark shadow-soft hover:bg-peach/85 hover:shadow-lift",
  outline: "border-2 border-peach/40 text-peach hover:border-peach hover:bg-peach/10",
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
