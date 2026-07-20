import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { IndustryIcon } from "@/components/IndustryIcon";
import { KineticText, Reveal, RevealGroup, RevealItem } from "@/components/motion/KineticText";
import { industries } from "@/content/industries";

/**
 * Adapted from Grow Brand's "Industries we serve / Who we work with" homepage
 * section. That version names real past clients per category — GoodGround was
 * founded 2026 and has none yet, so the intro line is rewritten to make no
 * track-record claim ("built for" became "built for businesses like"), and no
 * card names a specific business. Categories only, honestly.
 */
export function Industries() {
  return (
    <section className="px-3 py-20 sm:px-5 md:py-28">
      <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
        <Eyebrow tone="ember">Industries we serve</Eyebrow>
        <KineticText
          phrases={["Who we build for."]}
          className="font-heading text-pine mt-6 max-w-[14ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]"
        />
        <Reveal delay={0.08}>
          <p className="text-bark-muted mt-6 max-w-[52ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6]">
            We build for small and medium businesses across South Africa. Here&rsquo;s where we&rsquo;re
            usually the strongest fit:
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <RevealItem key={industry.title}>
              <div className="rounded-card bg-bark grain h-full overflow-hidden">
                <div className="relative z-[2] p-6">
                  <span className="bg-peach/10 text-peach grid size-11 place-items-center rounded-2xl">
                    <IndustryIcon name={industry.icon} className="size-5" />
                  </span>
                  <h3 className="font-heading text-peach mt-5 text-[17px] font-bold">
                    {industry.title}
                  </h3>
                  <p className="mt-2.5 max-w-[32ch] text-[14px] leading-[1.6] text-peach/75">
                    {industry.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="border-bark/10 mt-10 flex flex-col items-start gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-bark-muted max-w-[46ch] text-[15px] leading-[1.6]">
              And plenty more. If your business isn&rsquo;t on this list, get in touch anyway. It
              usually just means we have a few questions first.
            </p>
            <ButtonLink href="/start-project" size="lg" className="shrink-0">
              Start the conversation →
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
