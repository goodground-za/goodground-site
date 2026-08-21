import Link from "next/link";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

export function CTABand() {
  return (
    // Outer section stays cream — it's just the breathing room around the
    // card, giving FAQAccordion's rounded pink block space to end before
    // this starts, rather than the orange butting straight up against it.
    // pb-[24vw]: same reasoning as WhoWeBuildFor — HomeTestFooter's cloud
    // divider scales with viewport width, so this reserved strip has to
    // scale the same way or the bumps bury the CTA card's own shadow on
    // wide screens.
    <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-20">
      <div className="mx-auto max-w-[1600px]">
        {/* Hard offset shadow (no blur), same "stacked card" language as the
            hover cards elsewhere on this page (shadow-[6px_6px_0_0_#2e1848]),
            just bigger and vertical-only — reads as a card lifted off a
            solid purple base rather than a soft drop shadow. */}
        <div className="bg-ht-orange rounded-block shadow-[0_14px_0_0_var(--color-ht-purple)] px-6 py-20 text-center sm:px-10 md:py-28">
          <RevealSection>
            {/* text-ink not text-white: white on this orange fails WCAG AA at
                this size/weight (3.48:1 vs the 4.5:1 needed). ink clears 5.87:1. */}
            <p className="font-ht-display text-ink text-[13px] font-bold tracking-[0.15em] uppercase">
              Get in touch
            </p>
            <SplitWords
              as="h2"
              text="Let's Talk About Your Project"
              className="font-ht-display mx-auto mt-4 max-w-[18ch] text-[clamp(2rem,5vw,4rem)] font-bold text-white"
            />

            {/* Matches the hero CTA: sentence case (so `uppercase` has to come
                off too) and no decorative arrow disc beside it. */}
            <div className="mt-9 flex items-center justify-center">
              <MagneticButton>
                <Link
                  href="/start-project"
                  className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[15px] font-bold tracking-wide shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                >
                  Let&rsquo;s chat
                </Link>
              </MagneticButton>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
