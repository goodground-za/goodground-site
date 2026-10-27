/**
 * The one number formatter for the redesign (README 6: "put the formatter in
 * one function so it can change in one place").
 *
 * Writes numbers as designed — `12,000`, `5.0` — until GoodGround picks
 * between `R12,000` and `R12 000` (open item 4). "en-US" because en-ZA would
 * give `12 000` and `5,0`, which is the other option, not the designed one.
 */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** `R12,000`. */
export function formatRand(value: number): string {
  return `R${formatNumber(value)}`;
}
