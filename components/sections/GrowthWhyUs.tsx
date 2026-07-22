import { RevealGroup, RevealItem } from "@/components/motion/KineticText";

/** Ads copy deck §6 ("Why GoodGround"), matching WhyUs.tsx's ember-card trio exactly. */
const reasons = [
  {
    title: "Foundation first, then growth",
    body: "We don't run ads to a weak website, it's pouring water on dry ground. Because we build the foundation, we make sure the traffic we send actually converts.",
  },
  {
    title: "Your budget, treated like ours",
    body: "We'd rather spend less and get you more. No inflated budgets, no clicks for the sake of clicks, just leads that turn into work.",
  },
  {
    title: "A partner, not a vendor",
    body: "The same team behind your site runs your ads. We think in seasons and years, not one-off campaigns, and we're in it with you after launch.",
  },
];

export function GrowthWhyUs() {
  return (
    <section className="px-3 py-16 sm:px-5 md:py-24">
      <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
        <h2 className="font-heading text-bark max-w-[18ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          Why grow with GoodGround.
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
