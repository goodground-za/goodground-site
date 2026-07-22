import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, RevealGroup, RevealItem } from "@/components/motion/KineticText";
import { growthBenefits } from "@/content/growth-benefits";

/** Ads copy deck §4 ("Why it works for small businesses"), as a bark card grid. */
export function GrowthBenefits() {
  return (
    <section className="px-3 py-8 sm:px-5">
      <div className="bg-bark rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
        <div className="relative z-[2] px-6 py-14 sm:px-10 md:px-14 md:py-20">
          <Eyebrow>Why it works</Eyebrow>
          <KineticText
            as="h2"
            tone="light"
            phrases={["Why it works for", "small businesses."]}
            className="font-heading mt-6 max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]"
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {growthBenefits.map((benefit) => (
              <RevealItem key={benefit.title}>
                <div className="rounded-card bg-peach/10 border-peach/10 h-full border p-6">
                  <span
                    aria-hidden="true"
                    className="bg-ember text-peach grid size-8 shrink-0 place-items-center rounded-full"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <h3 className="font-heading text-peach mt-5 text-[16px] font-bold">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 max-w-[32ch] text-[14px] leading-[1.6] text-peach/75">
                    {benefit.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
