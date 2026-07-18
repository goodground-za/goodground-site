import { RevealGroup, RevealItem } from "@/components/motion/KineticText";

/**
 * Copy deck §1 Section 6, on cream with three ember cards per the comp.
 *
 * The comp rewrites the first card: the deck says "We don't open Figma until we
 * understand your business", the comp says "We don't start developing". The
 * comp is the newer client artifact, so it wins — and it reads better for a
 * development studio besides.
 */
const reasons = [
  {
    title: "Strategy before design",
    body: "We don't start developing until we understand your business. Design without strategy is decoration.",
  },
  {
    title: "Built for the long term",
    body: "We think in years, not launch dates. Every decision is made with growth in mind.",
  },
  {
    title: "A partner, not a vendor",
    body: "We build with you. Our Care Plans mean the relationship doesn't end at launch — and neither does the payment shock.",
  },
];

export function WhyUs() {
  return (
    <section className="px-3 py-16 sm:px-5 md:py-24">
      <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
        <h2 className="font-heading text-bark max-w-[18ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          We build foundations, not just front-ends.
        </h2>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {reasons.map((reason) => (
            <RevealItem key={reason.title}>
              <div className="rounded-card bg-ember grain h-full overflow-hidden">
                <div className="relative z-[2] p-7">
                  <h3 className="font-heading text-peach text-[17px] font-bold">{reason.title}</h3>
                  <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.6] text-peach/85">
                    {reason.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
