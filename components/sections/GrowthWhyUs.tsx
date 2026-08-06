import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { RevealStagger } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/** Ads copy deck §6 ("Why GoodGround"), matching the site's hard-shadow card trio. */
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
    <section className="px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-[1434px]">
        <SplitWords
          as="h2"
          text="Why grow with GoodGround."
          className="font-ht-display text-ht-purple max-w-[18ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold uppercase"
        />

        <RevealStagger className="mt-12 grid gap-5 md:grid-cols-3" y={16}>
          {reasons.map((reason, i) => (
            <HoverCard
              key={reason.title}
              className="bg-ht-orange ring-ht-crimson shadow-[0_14px_0_0_var(--color-ht-crimson)] rounded-card flex h-full flex-col p-7 ring-2"
            >
              <span aria-hidden="true" className="font-ht-display text-[15px] font-bold text-white/40 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-ht-display mt-5 text-[17px] font-bold text-balance text-white">{reason.title}</h3>
              <p className="mt-3 max-w-[34ch] text-[14px] leading-[1.6] text-white/85">{reason.body}</p>
            </HoverCard>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
