import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";

/**
 * Ads copy deck §1 (Section intro). Introduces the Google Ads / Meta Ads
 * "Growth" services, folded into the Services page directly above the 05/06
 * deep-dive cards per the founder's placement choice (copy deck offered this
 * or a standalone /growth page).
 */
export function GrowthIntro() {
  return (
    <section className="scroll-mt-24 border-bark/10 border-t py-14 md:py-20">
      <Eyebrow tone="ember">Growth services</Eyebrow>
      <KineticText
        as="h2"
        phrases={["Once the ground is ready,", "bring people to it."]}
        className="font-heading text-pine mt-6 max-w-[18ch] text-[clamp(1.85rem,4.6vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em]"
      />
      <Reveal delay={0.08}>
        <p className="text-bark-muted mt-6 max-w-[56ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6]">
          A great website is the foundation. Paid ads are how the right people find it. We run
          Google and Meta campaigns that put your business in front of ready-to-buy customers,
          without the guesswork, the wasted budget, or the jargon.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <ButtonLink href="/start-project" size="lg">
            Start Your Project
          </ButtonLink>
          <Link
            href="#growth-how-it-works"
            className="text-ember underline underline-offset-4 hover:no-underline"
          >
            See how it works →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
