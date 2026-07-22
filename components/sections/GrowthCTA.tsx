import { ButtonLink } from "@/components/Button";
import { KineticText, Reveal } from "@/components/motion/KineticText";

/**
 * Ads copy deck §8 (Closing call to action), mirroring CTABanner.tsx exactly.
 * Closes the Growth block specifically; the page's existing CTABanner still
 * closes the page as a whole further down, after the payment recap and FAQ.
 */
export function GrowthCTA() {
  return (
    <section className="px-3 pt-8 pb-16 sm:px-5 md:pb-24">
      <div className="bg-ember rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
        <div className="relative z-[2] px-6 py-16 text-center sm:px-10 md:py-20">
          <KineticText
            phrases={["Ready to bring people to", "the ground you've built?"]}
            tone="light"
            className="font-heading mx-auto max-w-[18ch] text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]"
          />
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-[46ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.4]">
              Let&rsquo;s turn your website into a source of steady, measurable growth, with a plan
              that makes it easy to start.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/start-project" variant="peach" size="lg">
                Start Your Project
              </ButtonLink>
              <ButtonLink href="/contact" variant="ink" size="lg">
                Book a Free Consultation
              </ButtonLink>
            </div>
            <p className="font-heading mt-8 text-[13px] font-bold tracking-[0.08em] text-peach/70 uppercase">
              Growth starts here.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
