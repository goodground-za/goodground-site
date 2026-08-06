import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { growthBenefits } from "@/content/growth-benefits";

/** Ads copy deck §4 ("Why it works for small businesses"), as a dark card grid. */
export function GrowthBenefits() {
  return (
    <section className="px-6 py-8 sm:px-10">
      <div className="bg-ht-purple rounded-block mx-auto max-w-[1434px] overflow-hidden">
        <div className="px-6 py-14 sm:px-10 md:px-14 md:py-20">
          <RevealSection>
            <p className="font-ht-display text-ht-pink text-[13px] font-bold tracking-[0.15em] uppercase">Why it works</p>
          </RevealSection>
          <SplitWords
            as="h2"
            text="Why it works for small businesses."
            className="font-ht-display mt-6 max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] font-bold text-white uppercase"
          />

          <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" y={16}>
            {growthBenefits.map((benefit) => (
              <HoverCard key={benefit.title} className="rounded-card border-white/10 bg-white/10 h-full border p-6">
                <span aria-hidden="true" className="bg-ht-orange grid size-8 shrink-0 place-items-center rounded-full text-white">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="font-ht-display mt-5 text-[16px] font-bold text-white">{benefit.title}</h3>
                <p className="mt-2.5 max-w-[32ch] text-[14px] leading-[1.6] text-white/75">{benefit.body}</p>
              </HoverCard>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
