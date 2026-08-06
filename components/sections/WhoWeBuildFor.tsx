import Link from "next/link";
import { industries } from "@/content/industries";
import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";

export function WhoWeBuildFor() {
  return (
    // relative z-20 -mt-16: tucks this section's rounded top corners up
    // over CreativeProcess's reserved bottom strip (which is a plain
    // z-[2] on that page, so z-20 here safely wins), so the process
    // banner image shows through instead of the plain cream page background.
    // pb-[24vw]: WhatWeBuild's cloud divider scales with viewport width
    // (~21.5% of it, to keep its circles round rather than stretched), so
    // this reserved bottom strip has to scale the same way — a fixed px
    // padding would leave enough room on mobile but let the bumps bury
    // this section's card grid on wide desktop screens.
    <section className="bg-ht-orange relative z-20 -mt-16 overflow-hidden rounded-t-[40px] px-6 pt-20 pb-[24vw] sm:rounded-t-[56px] sm:px-10 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <RevealSection className="text-center">
          <h2 className="font-ht-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white uppercase">
            Who We Build For
          </h2>
          {/* font-semibold + this size clears the WCAG "large text" bold
              threshold (14pt/18.66px bold, 3:1 needed) — plain white at
              regular weight here was only 3.48:1, which fails at
              non-large-text weight. */}
          <p className="font-ht-body text-white font-semibold mx-auto mt-5 max-w-[52ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6]">
            We build for small and medium businesses across South Africa. Here&rsquo;s where
            we&rsquo;re usually the strongest fit:
          </p>
        </RevealSection>

        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <HoverCard
              key={industry.title}
              className="bg-ht-cream text-ht-purple rounded-card shadow-[0_14px_0_0_var(--color-ht-purple)] p-6"
            >
              <h3 className="font-ht-display text-[16px] font-bold uppercase">{industry.title}</h3>
              <p className="font-ht-body mt-2.5 text-[14px] leading-[1.6] text-ht-purple/75">
                {industry.description}
              </p>
            </HoverCard>
          ))}
        </RevealStagger>

        <RevealSection y={16} className="mt-12 flex justify-center">
          <MagneticButton>
            <Link
              href="/start-project"
              className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03]"
            >
              Let&rsquo;s Chat
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
          </MagneticButton>
        </RevealSection>
      </div>
    </section>
  );
}
