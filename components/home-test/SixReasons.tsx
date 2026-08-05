import { sixReasons } from "@/content/home-test";
import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";

export function SixReasons() {
  return (
    <section className="bg-ht-cream px-6 pt-8 pb-20 sm:px-10 sm:pt-10 md:pb-28">
      <div className="mx-auto max-w-[1600px]">
        <RevealSection className="text-center">
          <h2 className="font-ht-display text-ht-purple text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase">
            Six Reasons to Choose Us
          </h2>
          <p className="font-ht-body text-ht-purple/70 mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.6]">
            Every project is shaped to feel considered from first brief to final handoff. No
            recycled templates, no rushed work.
          </p>
        </RevealSection>

        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sixReasons.map((reason) => (
            <HoverCard
              key={reason.title}
              className="rounded-card shadow-[0_14px_0_0_var(--color-ht-purple)] bg-white p-7"
            >
              <h3 className="font-ht-display text-ht-purple text-[16px] font-bold uppercase">
                {reason.title}
              </h3>
              <p className="font-ht-body text-ht-purple/70 mt-3 text-[14px] leading-[1.6]">
                {reason.body}
              </p>
            </HoverCard>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
