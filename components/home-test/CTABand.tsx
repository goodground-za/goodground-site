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

            <div className="mt-9 flex items-center justify-center gap-3">
              <MagneticButton>
                <Link
                  href="/start-project"
                  className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03]"
                >
                  Let&rsquo;s Chat
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/start-project"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="text-ht-purple bg-ht-cream grid size-12 place-items-center rounded-full transition-transform duration-200 hover:scale-[1.08] hover:rotate-12"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </MagneticButton>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
