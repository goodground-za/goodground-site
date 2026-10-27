import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { Icon } from "./Icon";

/**
 * Any card with an arrow chip. The whole card is ONE <a>: nothing inside it
 * may be a link or a button. Its title should be the first text, so it is the
 * accessible name.
 *
 * Hover (fine pointers): lifts 4px, shadow, darker border, the chip rotates
 * 45° and turns ink. Wrap a cover image in `.gg-card__cover` to get the 1.03
 * zoom.
 */
export function LinkedCard({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const cls = className ? `gg-card ${className}` : "gg-card";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} style={style}>
      {children}
    </a>
  );
}

/** The round arrow chip a linked card carries. Decorative. */
export function ArrowChip({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className ? `gg-chip-arrow ${className}` : "gg-chip-arrow"}
      style={{ "--chip-size": `${size}px` } as CSSProperties}
      aria-hidden="true"
    >
      <Icon name="arrow-up-right" size={Math.round(size * 0.42)} stroke={2.2} />
    </span>
  );
}
