import Link from "next/link";
import { AccordionItem } from "@/components/hometest2/Accordion";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { strategyIntro, strategyPillars } from "@/content/homeTest2";

/**
 * Sticky-scroll via plain CSS (`sticky` + `self-start` on the left column),
 * not GSAP ScrollTrigger.pin — same visual effect, no JS required for it to
 * work, and no risk of the scroll-hijacking the brief explicitly warns
 * against. Falls back to a normal stacked layout under the md breakpoint
 * automatically, since `sticky` is a no-op in a single-column flow.
 */
export function OurStrategy() {
  return (
    <section id="strategy" className="bg-ht-cream px-6 py-20 sm:px-10 md:py-28">
      <div className="bg-ht-purple rounded-block mx-auto max-w-[1434px] p-8 sm:p-12 md:p-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <RevealSection>
              <p className="font-ht-display text-ht-pink text-[14px] font-bold tracking-wide">
                Why we start here
              </p>
              <h2 className="font-ht-display mt-3 max-w-[14ch] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] font-bold text-white">
                Our Strategy
              </h2>
              <p className="font-ht-body mt-6 max-w-[42ch] text-[15px] leading-relaxed text-white/75">
                {strategyIntro}
              </p>

              <AccordionItem
                className="mt-8 border-white/15"
                summary={
                  <span className="font-ht-display text-[14px] font-bold text-white/70">
                    Where the name comes from
                  </span>
                }
              >
                <p className="font-ht-body text-[14px] leading-relaxed text-white/70">
                  The name comes from the biblical Parable of the Sower: a farmer scatters seed on a path,
                  on rocky ground, among thorns, and on good soil. Only the good soil, prepared and
                  deep-rooted, produces a harvest. Good ground represents preparation, intention, and
                  growth &mdash; that&rsquo;s the ground we help you build on, before you grow.{" "}
                  <Link href="/about" className="text-ht-pink font-bold underline underline-offset-2">
                    Read the full story
                  </Link>
                  .
                </p>
              </AccordionItem>

              <MagneticButton className="mt-8 hidden md:inline-block">
                <Link
                  href="/contact"
                  className="font-ht-display border-ht-pink rounded-pill hover:text-ink hover:bg-ht-pink inline-flex items-center gap-2 border-2 px-7 py-3.5 text-[15px] font-bold text-white transition-[color,background-color,transform] duration-200 active:scale-[0.97]"
                >
                  Let&rsquo;s chat
                </Link>
              </MagneticButton>
            </RevealSection>
          </div>

          <div className="flex flex-col gap-5">
            {strategyPillars.map((pillar, i) => (
              <RevealSection key={pillar.title} delay={i * 0.05}>
                <div className="ring-ht-pink/20 rounded-card bg-white/5 p-7">
                  <span className="font-ht-display text-ht-pink text-[13px] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-ht-display mt-2 text-[1.2rem] leading-tight font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="font-ht-body mt-3 text-[14.5px] leading-relaxed text-white/75">{pillar.body}</p>
                </div>
              </RevealSection>
            ))}

            <MagneticButton className="mt-2 self-start md:hidden">
              <Link
                href="/contact"
                className="font-ht-display border-ht-pink rounded-pill inline-flex items-center gap-2 border-2 px-7 py-3.5 text-[15px] font-bold text-white"
              >
                Let&rsquo;s chat
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
