import Link from "next/link";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/**
 * Ads copy deck §1 (Section intro). Introduces the Google Ads / Meta Ads
 * "Growth" services, folded into the Services page directly above the 05/06
 * deep-dive cards per the founder's placement choice (copy deck offered this
 * or a standalone /growth page).
 */
export function GrowthIntro() {
  return (
    <section className="border-ht-purple/10 scroll-mt-24 border-t py-14 md:py-20">
      <RevealSection>
        <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
          Growth services
        </p>
      </RevealSection>
      <SplitWords
        as="h2"
        text="Once the ground is ready, bring people to it."
        className="font-ht-display text-ht-purple mt-6 max-w-[18ch] text-[clamp(1.85rem,4.6vw,3.25rem)] leading-[1.05] font-bold uppercase"
      />
      <RevealSection delay={0.08}>
        <p className="text-ht-purple/70 mt-6 max-w-[56ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6]">
          A great website is the foundation. Paid ads are how the right people find it. We run
          Google and Meta campaigns that put your business in front of ready-to-buy customers,
          without the guesswork, the wasted budget, or the jargon.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <MagneticButton>
            <Link
              href="/start-project"
              className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-soft transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Start Your Project
            </Link>
          </MagneticButton>
          <Link href="#growth-how-it-works" className="text-ht-crimson font-bold underline underline-offset-4 hover:no-underline">
            See how it works →
          </Link>
        </div>
      </RevealSection>
    </section>
  );
}
