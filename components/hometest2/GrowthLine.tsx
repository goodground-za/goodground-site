import { RevealSection } from "@/components/motion-gsap/RevealSection";

/**
 * The page's one signature motif, tied to the "good ground" foundation
 * idea: a root-like line that grows in under a heading, left to right.
 * Reused under every major section heading instead of five different
 * flourishes. Purely decorative (aria-hidden) — never a load-bearing
 * content element, so it's safe to skip entirely under reduced motion
 * (RevealSection just leaves it at its final, fully-grown state).
 */
export function GrowthLine({ tone = "purple" }: { tone?: "purple" | "cream" }) {
  const stroke = tone === "cream" ? "var(--color-ht-cream)" : "var(--color-ht-orange)";
  return (
    <RevealSection y={0} duration={0.9} className="origin-left" start="top 90%">
      <svg viewBox="0 0 160 16" className="h-4 w-32" fill="none" aria-hidden="true">
        <path
          d="M1 8h158M40 8c0-4 4-6 8-4M90 8c0 4 5 6 9 4M130 8c0-3 3-5 6-3"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </RevealSection>
  );
}
