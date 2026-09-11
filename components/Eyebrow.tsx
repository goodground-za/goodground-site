/**
 * Matches the promoted /home-test design language's eyebrow treatment:
 * plain tracked uppercase text, not a filled pill — used above nearly every
 * section heading site-wide (e.g. "OUR WEB DESIGN SERVICES", "GET IN
 * TOUCH"). Tone prop values are kept from the previous palette (peach/ember)
 * so no call site needed updating.
 *
 * 2026-09-11: "ember" is white rather than an accent colour. The redesigned
 * homepage's eyebrows simply inherit their section's text colour — light on
 * dark, ink on light — and an accent-coloured eyebrow reads as a different
 * component. White on ink is 18.88:1; the accent would have been 4.90:1, which
 * passes but is needlessly quieter for a label this small.
 */
export function Eyebrow({ children, tone = "peach" }: { children: string; tone?: "peach" | "ember" }) {
  return (
    <p
      className={`font-ht-display inline-block text-[13px] font-bold tracking-[0.15em] uppercase ${
        tone === "ember" ? "text-white" : "text-ht-purple"
      }`}
    >
      {children}
    </p>
  );
}
