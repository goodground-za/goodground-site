import { services } from "@/content/services";
import { CloudDivider } from "@/components/CloudDivider";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { ServiceAccordion } from "@/components/ServiceAccordion";

export function WhatWeBuild() {
  return (
    // z-30 continues the ascending overlap stack (ServiceCarousel z-1 <
    // CreativeProcess z-10 < WhoWeBuildFor z-20) — needed so the scalloped
    // divider below, which pokes up into WhoWeBuildFor's box, paints above
    // that section's orange background instead of behind it.
    // rounded-b only (no overflow-hidden): the top is already "rounded" by
    // the CloudDivider's scallop shape, which pokes up above this section's
    // own box via a negative translate — overflow-hidden here would clip
    // that poke-up. Bottom corners just need the section's own background
    // box rounded, which border-radius does on its own without needing
    // overflow-hidden to clip anything.
    <section className="bg-ht-purple relative z-30 rounded-b-[40px] px-6 pt-8 pb-20 sm:px-10 sm:pt-10 sm:rounded-b-[56px] md:pb-28">
      <CloudDivider
        fill="var(--color-ht-purple)"
        className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full -translate-y-[calc(100%-3px)]"
      />

      <RevealSection className="mx-auto max-w-[1600px]">
        <p className="font-ht-display text-ht-pink text-center text-[13px] font-bold tracking-[0.15em] uppercase">
          Our Web Design Services
        </p>
        <h2 className="font-ht-display mt-3 text-center text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white uppercase">
          What We Build
        </h2>
        <p className="font-ht-body mx-auto mt-4 max-w-[46ch] text-center text-[15px] leading-[1.6] text-white/75">
          One team, one connected process. Here&rsquo;s what&rsquo;s actually included.
        </p>

        {/* compact: the full problem/approach/outcome text lives on /services
            (SEO audit 2026-08-16, item 5 — this section was byte-identical
            to /services, making up a large share of the homepage's word
            count). Home links out to the full detail instead of repeating it. */}
        <ServiceAccordion services={services} className="mt-10" variant="compact" />
      </RevealSection>
    </section>
  );
}
