import { ButtonLink } from "@/components/Button";
import { KineticText, Reveal } from "@/components/motion/KineticText";

/**
 * Copy deck §1 Section 9, on the comp's orange block.
 *
 * The comp labels both buttons "Start Your Project". That reads as a comp slip
 * rather than intent, so the secondary keeps the copy deck's "Book a Free
 * Consultation" — two identical CTAs give the visitor no actual choice.
 */
export function CTABanner() {
  return (
    <section className="px-3 pt-8 pb-16 sm:px-5 md:pb-24">
      <div className="bg-ember rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
        <div className="relative z-[2] px-6 py-16 text-center sm:px-10 md:py-20">
          <KineticText
            phrases={["Ready to build on", "GoodGround?"]}
            tone="light"
            className="font-heading mx-auto max-w-[16ch] text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]"
          />
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-[46ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.4]">
              Let&rsquo;s create something built to grow — and a plan that makes it easy to start.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/start-project" variant="peach" size="lg">
                Start Your Project
              </ButtonLink>
              <ButtonLink href="/contact" variant="ink" size="lg">
                Book a Free Consultation
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
