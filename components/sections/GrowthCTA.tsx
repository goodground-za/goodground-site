import Link from "next/link";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/**
 * Ads copy deck §8 (Closing call to action), mirroring CTABand's visual
 * language. Closes the Growth block specifically; the page's own CTABand
 * still closes the page as a whole further down, after the payment recap
 * and FAQ.
 */
export function GrowthCTA() {
  return (
    <section className="px-6 pt-8 pb-16 sm:px-10 md:pb-24">
      <div className="bg-ht-orange rounded-block shadow-[0_14px_0_0_var(--color-ht-purple)] mx-auto max-w-[1434px] overflow-hidden">
        <RevealSection className="px-6 py-16 text-center sm:px-10 md:py-20">
          <SplitWords
            as="h2"
            text="Ready to bring people to the ground you've built?"
            className="font-ht-display mx-auto max-w-[18ch] text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-bold text-white uppercase"
          />
          <p className="font-ht-body mx-auto mt-6 max-w-[46ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.4] text-white/90">
            Let&rsquo;s turn your website into a source of steady, measurable growth, with a plan
            that makes it easy to start.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <Link
                href="/start-project"
                className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03]"
              >
                Start Your Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/contact"
                className="font-ht-display rounded-pill inline-block border-2 border-white px-7 py-3.5 text-[14px] font-bold tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.03]"
              >
                Book a Free Consultation
              </Link>
            </MagneticButton>
          </div>
          <p className="font-ht-display mt-8 text-[13px] font-bold tracking-[0.08em] text-white/70 uppercase">
            Growth starts here.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
