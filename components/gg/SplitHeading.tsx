import type { CSSProperties } from "react";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * A heading the motion helper splits into masked lines (HEADER REVEAL / LINE
 * MASK). `\n` in `text` is a forced break.
 *
 * The text goes in through dangerouslySetInnerHTML on purpose: the helper
 * replaces these children at runtime, and React never reconciles the children
 * of an element rendered this way, so a client-side navigation cannot trip
 * over nodes it no longer owns.
 */
export function SplitHeading({
  as: Tag = "h2",
  text,
  id,
  className,
  style,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  text: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const html = text.split("\n").map(escape).join("<br>");
  return <Tag id={id} className={className} style={style} data-split="" dangerouslySetInnerHTML={{ __html: html }} />;
}
