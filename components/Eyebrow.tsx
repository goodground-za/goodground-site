/**
 * Matches the promoted /home-test design language's eyebrow treatment:
 * plain tracked uppercase text, not a filled pill — used above nearly every
 * section heading site-wide (e.g. "OUR WEB DESIGN SERVICES", "GET IN
 * TOUCH"). Tone prop values are kept from the previous palette (peach/ember)
 * so no call site needed updating; "ember" now maps to the pink used on
 * dark ht-purple/ht-orange surfaces (PageHero's band, accent sections),
 * default maps to ht-purple for light ht-cream surfaces.
 */
export function Eyebrow({ children, tone = "peach" }: { children: string; tone?: "peach" | "ember" }) {
  return (
    <p
      className={`font-ht-display inline-block text-[13px] font-bold tracking-[0.15em] uppercase ${
        tone === "ember" ? "text-ht-pink" : "text-ht-purple"
      }`}
    >
      {children}
    </p>
  );
}
