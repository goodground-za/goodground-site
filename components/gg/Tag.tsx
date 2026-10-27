import type { ReactNode } from "react";

/**
 * Static label pill — Figma set 2:49. Never animates on its own.
 * Section-number tags ("01 / GOODGROUND") are Neutral, or OnDark on dark.
 */
export type TagTone = "neutral" | "dark" | "coral" | "plum" | "on-dark";

export function Tag({
  tone = "neutral",
  className,
  children,
  ...rest
}: {
  tone?: TagTone;
  className?: string;
  children: ReactNode;
  "data-part"?: string;
}) {
  return (
    <span className={`gg-tag gg-tag--${tone}${className ? ` ${className}` : ""}`} {...rest}>
      {children}
    </span>
  );
}
