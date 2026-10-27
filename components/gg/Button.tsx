import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "./Icon";

/**
 * Pill button with an arrow chip — Figma set 2:38.
 *
 * Renders <Link> for internal hrefs, <a> for mailto/tel/external ones, and
 * <button> when there is no href. Same look in all three.
 *
 * The chip holds two copies of the arrow. On hover the first slides out to the
 * top-right while the second slides in from the bottom-left (gg.css).
 */
export type ButtonStyle = "primary" | "light" | "coral" | "outline";

type Common = {
  variant?: ButtonStyle;
  /** Full width on its row: label left, chip right. */
  full?: boolean;
  className?: string;
  children: ReactNode;
};

function classes(variant: ButtonStyle, full: boolean, className?: string) {
  return ["gg-btn", variant !== "primary" && `gg-btn--${variant}`, full && "gg-btn--full", className]
    .filter(Boolean)
    .join(" ");
}

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="gg-btn__label">{children}</span>
      <span className="gg-btn__chip" aria-hidden="true">
        <span className="gg-btn__arrow">
          <Icon name="arrow-up-right" size={16} stroke={2.2} />
        </span>
        <span className="gg-btn__arrow">
          <Icon name="arrow-up-right" size={16} stroke={2.2} />
        </span>
      </span>
    </>
  );
}

const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#") || href.startsWith("?");

export function ButtonLink({
  href,
  variant = "primary",
  full = false,
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = classes(variant, full, className);

  if (isInternal(href)) {
    return (
      <Link href={href} className={cls} {...rest}>
        <Inner>{children}</Inner>
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <Inner>{children}</Inner>
    </a>
  );
}

export function Button({
  variant = "primary",
  full = false,
  className,
  children,
  type = "button",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={classes(variant, full, className)} {...rest}>
      <Inner>{children}</Inner>
    </button>
  );
}
