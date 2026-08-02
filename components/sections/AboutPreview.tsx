import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";

/**
 * Copy deck §1 Section 7. Rendered inside the WhyUs panel, over the forest half
 * of its shared background — so this is just the copy, no surface of its own. A
 * left-anchored scrim keeps it readable where it overlaps the brighter canopy.
 *
 * The founder is described by experience, not by name, at the owner's request.
 */
export function AboutPreview() {
  return (
    <div className="relative mt-10 md:mt-24">
      <div aria-hidden="true" className="forest-text-scrim absolute inset-0" />

      <div className="relative z-[2] mx-auto max-w-[1434px] px-6 pt-4 pb-14 sm:px-10 md:px-14 md:pt-0 md:pb-28">
        <div className="max-w-[48ch]">
          <Eyebrow tone="ember">Who we are</Eyebrow>

          <KineticText
            tone="light"
            phrases={["Built by people", "who care about", "the foundation."]}
            className="font-heading mt-6 max-w-[13ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.03] font-bold tracking-[-0.03em]"
          />

          <Reveal delay={0.08}>
            <p className="text-peach/85 mt-8 max-w-[44ch] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6]">
              We started GoodGround in George, on the Garden Route. Too many good businesses
              were being let down by websites that looked fine but did nothing for them. No strategy
              behind them, and no help after launch.
            </p>
            <div className="mt-9">
              <ButtonLink href="/about" variant="peach" size="lg">
                Read our story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
