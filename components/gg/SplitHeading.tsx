import type { CSSProperties } from "react";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Oswald 500 advance widths in em, uppercase (measured in the browser from
 * the self-hosted font, 27 Oct 2026). Anything not listed counts as 0.6em,
 * wider than every letter but M and W, so an unknown glyph errs on the safe side. */
const OSWALD_EM: Record<string, number> = {
  A: 0.522, B: 0.557, C: 0.54, D: 0.557, E: 0.428, F: 0.413, G: 0.559, H: 0.586, I: 0.275, J: 0.326, K: 0.532,
  L: 0.421, M: 0.683, N: 0.545, O: 0.563, P: 0.527, Q: 0.564, R: 0.561, S: 0.494, T: 0.429, U: 0.566, V: 0.516,
  W: 0.713, X: 0.499, Y: 0.487, Z: 0.425, É: 0.428, "0": 0.534, "1": 0.382, "2": 0.496, "3": 0.496, "4": 0.504,
  "5": 0.493, "6": 0.521, "7": 0.413, "8": 0.51, "9": 0.521, ".": 0.217, ",": 0.213, "’": 0.191, "'": 0.149,
  "?": 0.483, "!": 0.233, "&": 0.587, "-": 0.314, ":": 0.239, ";": 0.251, "/": 0.397, "+": 0.433,
};

/** Width in em of the longest word, set in display caps, plus 3% for
 * rounding and kerning. A word cannot wrap, so this is the narrowest the
 * heading can ever be. */
function longestWordEm(text: string) {
  let max = 0;
  for (const word of text.toUpperCase().split(/\s+/)) {
    let em = 0;
    for (const ch of word) em += OSWALD_EM[ch] ?? 0.6;
    max = Math.max(max, em);
  }
  return Math.round(max * 1.03 * 1000) / 1000;
}

/**
 * A heading the motion helper splits into masked lines (HEADER REVEAL / LINE
 * MASK). `\n` in `text` is a forced break.
 *
 * It also carries `--gg-fit-em`, the em width of its longest word. Display
 * sizes cap themselves with `min(<size>, var(--gg-fit))` (gg.css), so on a
 * narrow phone a long word ("PHYSIOTHERAPISTS.", "GOODGROUND") shrinks to fit
 * its column instead of pushing the page sideways or being cut off by the
 * line mask. Headings that already fit keep their designed size.
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
  const fit = { "--gg-fit-em": longestWordEm(text), ...style } as CSSProperties;
  return <Tag id={id} className={className} style={fit} data-split="" dangerouslySetInnerHTML={{ __html: html }} />;
}
