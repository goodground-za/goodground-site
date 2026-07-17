import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,box-shadow,border-color] duration-150 ease-out " +
  "motion-safe:hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-growth-green text-white shadow-soft hover:bg-growth-green-hover hover:shadow-lift",
  secondary:
    "border border-forest-green/15 bg-surface text-forest-green hover:border-forest-green/30 hover:shadow-soft",
  ghost: "text-forest-green hover:bg-forest-green/5",
};

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

type Props = {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  variant = "primary",
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
  variant = "primary",
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
