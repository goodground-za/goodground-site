"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { PricingEnquiryForm, type SelectedConfig } from "@/components/PricingEnquiryForm";
import { PricingConfigurator } from "@/components/sections/PricingConfigurator";
import { PricingFAQ } from "@/components/sections/PricingFAQ";
import { PricingPackages } from "@/components/sections/PricingPackages";

/**
 * Owns the single piece of state the brief calls for — whichever package or
 * à la carte configuration the visitor last picked — and scrolls the shared
 * enquiry form into view when either CTA path fires. Split out from
 * app/pricing/page.tsx (a server component) so that page can still export
 * static `metadata`, which a "use client" file can't do.
 */
export function PricingPageClient() {
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelect = (config: SelectedConfig) => {
    setSelectedConfig(config);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PricingPackages onSelectPackage={handleSelect} />

      {/* Bridge between the two sections — every other inner page on the
          site alternates cream sections with a purple/pink block for
          rhythm; without this the pricing page was cream from PageHero all
          the way to the footer, flatter than everywhere else on the site. */}
      <section className="bg-ht-cream px-6 py-8 sm:px-10">
        <div className="bg-ht-purple rounded-block mx-auto max-w-[1434px] overflow-hidden">
          <div className="grid gap-8 px-6 py-14 sm:px-10 md:grid-cols-12 md:items-center md:px-14 md:py-16">
            <div className="min-w-0 md:col-span-8">
              <SplitWords
                as="h2"
                text="Need something these four don't quite cover?"
                className="font-ht-display max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold text-white uppercase"
              />
              <RevealSection delay={0.08}>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.65] text-white/85">
                  Start from scratch and add exactly what you need. The price is fixed before work
                  begins, and you still get the same choice: 50% deposit and the rest on completion,
                  or 12 monthly instalments.
                </p>
              </RevealSection>
            </div>
            <div className="min-w-0 md:col-span-4 md:justify-self-end">
              <MagneticButton>
                <Link
                  href="#build-your-own"
                  className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-soft transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                >
                  Build Your Own ↓
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <PricingConfigurator onQuoteRequest={handleSelect} />
      <PricingFAQ />

      <section
        ref={formRef}
        id="enquiry"
        className="bg-ht-cream scroll-mt-24 px-6 pt-4 pb-[24vw] sm:px-10 md:pt-6"
      >
        <div className="mx-auto max-w-[720px]">
          <div className="mb-10 text-center">
            <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
              Get your quote
            </p>
            <h2 className="font-ht-display text-ht-purple mx-auto mt-6 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold uppercase">
              Let's turn this into a firm quote.
            </h2>
            <p className="text-ht-purple/70 mx-auto mt-5 max-w-[52ch] text-[16px] leading-[1.65]">
              Send us what you picked (or nothing at all — we're happy to talk it through from
              scratch) and we'll come back with a firm quote and timeline.
            </p>
          </div>
          <PricingEnquiryForm selectedConfig={selectedConfig} />
        </div>
      </section>
    </>
  );
}
