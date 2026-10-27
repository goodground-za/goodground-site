/**
 * The one number formatter for the redesign (README 6: "put the formatter in
 * one function so it can change in one place").
 *
 * GoodGround chose the space style on 27 Oct 2026: `R12 000`, decimals with a
 * point (`5.0`). The separator is a no-break space (U+00A0) so a price never
 * splits across two lines. "en-US" gives the comma grouping and the decimal
 * point; the comma is then swapped for the space. Copy written by hand in
 * `content/` and the page data files follows the same rule.
 */
const NBSP = " ";

export function formatNumber(value: number, decimals = 0): string {
  return value
    .toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    .replace(/,/g, NBSP);
}

/** `R12 000` (no-break space). */
export function formatRand(value: number): string {
  return `R${formatNumber(value)}`;
}
