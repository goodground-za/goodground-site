import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/** Ads copy deck §2 ("Why small businesses need this"), framed the GoodGround way. */
export function GrowthProblem() {
  return (
    <section className="border-ht-purple/10 border-t py-14 md:py-20">
      <SplitWords
        as="h2"
        text="A great website nobody visits is a shop with the lights off."
        className="font-ht-display text-ht-purple max-w-[22ch] text-[clamp(1.85rem,4.6vw,3.25rem)] leading-[1.05] font-bold uppercase"
      />
      <RevealSection delay={0.08}>
        <div className="text-ht-purple/85 mt-8 max-w-[62ch] space-y-5 text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.6]">
          <p>
            You&rsquo;ve invested in a proper foundation: a site that&rsquo;s fast, credible, and built to
            convert. But a foundation only pays off when people actually stand on it.
          </p>
          <p>
            Most small businesses hit the same wall. They rely on word of mouth and the occasional
            referral, then wonder why the quiet months stay quiet. SEO grows your visibility over
            time, but it&rsquo;s slow, and it won&rsquo;t fill next week&rsquo;s diary.
          </p>
          <p>
            Meanwhile, your customers are already searching, on Google when they&rsquo;re ready to
            buy, and on Instagram and Facebook when they&rsquo;re deciding who to trust. If you&rsquo;re
            not showing up in those two places, a competitor with a smaller product and a bigger ad
            budget is winning work that should be yours.
          </p>
          <p className="font-ht-display text-ht-purple text-[clamp(1.05rem,1.4vw,1.2rem)] leading-snug font-bold">
            That&rsquo;s the gap paid ads close. Not vanity clicks. Not boosted posts that vanish
            overnight. Real, measurable demand, pointed straight at the website you&rsquo;ve already
            built.
          </p>
        </div>
      </RevealSection>
    </section>
  );
}
