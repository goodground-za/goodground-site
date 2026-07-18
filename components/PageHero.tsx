import type { ReactNode } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";

/**
 * Shared inner-page hero. The headline sits left and the lead paragraph sits
 * bottom-aligned on the right, so the top half of every inner page isn't a big
 * empty cream field to the right of the H1 (the negative space these pages had
 * when the heading and intro were both stacked on the left).
 */
export function PageHero({
  eyebrow,
  phrases,
  intro,
  children,
}: {
  eyebrow: string;
  phrases: string[];
  intro?: ReactNode;
  /** Anything below the headline row: jump-index chips, etc. */
  children?: ReactNode;
}) {
  return (
    <section className="px-3 pt-10 pb-8 sm:px-5 sm:pt-16">
      <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="ember">{eyebrow}</Eyebrow>
            </Reveal>
            <KineticText
              as="h1"
              phrases={phrases}
              className="font-heading text-pine mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.03] font-bold tracking-[-0.03em]"
            />
          </div>

          {intro ? (
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="text-bark-muted max-w-[48ch] text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.55] lg:pb-2">
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}
