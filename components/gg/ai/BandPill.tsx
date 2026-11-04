import { BAND_LABEL, bandFor, type Band } from "@/content/aiVisibility";

/**
 * The AI visibility band pill (the band rules in content/aiVisibility.ts,
 * shared with the scanner and the monthly report). Either pass the band or `named` / `checks` and let
 * bandFor decide, so the colour can never disagree with the rule.
 *
 *   Usually   mint on dark green text         (named in at least 2/3 of checks)
 *   Sometimes lilac on plum text              (1/3 to 2/3)
 *   Rarely    blush on coral text             (some, under 1/3)
 *   Not seen  white @14% on dark; line + muted text on light (none)
 *
 * `on` is the surface the pill sits on (only "Not seen" differs).
 */
export function BandPill({ band, named, checks, on = "light" }: { band?: Band; named?: number; checks?: number; on?: "light" | "dark" }) {
  const resolved = band ?? bandFor(named ?? 0, checks ?? 1);
  return <span className={`ai-band ai-band--${resolved} ai-band--on-${on}`}>{BAND_LABEL[resolved]}</span>;
}
