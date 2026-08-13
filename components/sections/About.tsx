import Link from "next/link";
import { ParableLink } from "@/components/ParableModal";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/**
 * Same "Growth starts with the ground you build on" copy as the live site's
 * Philosophy section (including the Parable of the Sower story) — duplicated
 * locally rather than imported, since that text lives inline in a component
 * from an unrelated design system, not in a shared content file.
 */
export function About() {
  return (
    <section className="bg-ht-cream px-6 py-20 sm:px-10 md:py-28">
      <RevealSection className="mx-auto max-w-[1600px]">
        {/* Was the bare word "About" — a category label that told the reader
            nothing and restated the section below it. This says what the
            section actually argues. */}
        <h2 className="font-ht-display text-ht-purple text-center text-[clamp(1.75rem,3.6vw,3rem)] font-bold uppercase">
          Why We Start With The Foundation
        </h2>

        <div className="ring-ht-pink rounded-block bg-white/70 mt-10 p-8 ring-2 sm:p-12">
          <SplitWords
            as="h3"
            text="Growth starts with the ground you build on"
            className="font-ht-display text-ht-purple max-w-[24ch] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] font-bold uppercase"
          />

          <div className="font-ht-body text-ht-purple/85 mt-8 grid gap-8 text-[15px] leading-[1.7] sm:grid-cols-2 sm:text-[16px]">
            <p>
              Every business wants the same thing, more enquiries, more customers, more
              opportunity. But growth doesn&rsquo;t start with marketing. It starts with the
              foundation underneath it.
            </p>
            <p>
              Good ground is where seeds take root, grow, and produce a harvest. Businesses work
              the same way. A logo without strategy has little value. A website without purpose
              rarely performs. No amount of marketing can fix a weak foundation.
            </p>
          </div>

          <p className="font-ht-display text-ht-purple mt-8 max-w-[36ch] text-[clamp(1.1rem,1.8vw,1.5rem)] leading-snug font-bold uppercase">
            That&rsquo;s the ground we help you build on, before you grow
          </p>

          <div className="mt-8 flex flex-col items-start gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-ht-body text-ht-purple/70 max-w-[48ch] text-[14px] leading-relaxed italic">
              The name comes from the biblical{" "}
              <ParableLink className="text-ht-crimson decoration-ht-orange/40 hover:decoration-ht-orange">
                Parable of the Sower
              </ParableLink>
              . Good ground represents preparation, intention, and growth.
            </p>
            {/* hover:text-ink not hover:text-white: white on this orange
                fails WCAG AA at this size/weight; ink clears it. */}
            <MagneticButton className="shrink-0">
              <Link
                href="/about"
                className="font-ht-display border-ht-orange text-ht-crimson rounded-pill hover:text-ink inline-flex items-center gap-2 border-2 px-6 py-3 text-[13px] font-bold tracking-wide uppercase transition-colors duration-200 hover:bg-ht-orange"
              >
                About Us
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
