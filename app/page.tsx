import type { Metadata } from "next";
import { HomeSchema } from "@/components/Schema";
import { About } from "@/components/sections/About";
import { CTABand } from "@/components/sections/CTABand";
import { CreativeProcess } from "@/components/sections/CreativeProcess";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Hero } from "@/components/sections/Hero";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { SixReasons } from "@/components/sections/SixReasons";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { WhoWeBuildFor } from "@/components/sections/WhoWeBuildFor";

/**
 * Title/description target "website development South Africa" (the primary
 * keyword), development-first. Kept from the previous homepage's metadata
 * (unchanged by the visual redesign) since it's tuned SEO copy, not part of
 * the design language.
 *
 * 2026-08-16: GoodGround is positioned nationally across the whole site. The
 * hero, every service and industry page, the FAQ, /about and /work all speak
 * to South Africa rather than naming a town.
 *
 * The one deliberate exception is content/site.ts -> address.locality, which
 * is still the real registered locality. It feeds the LocalBusiness postal
 * address and the footer, and it has to keep matching the Google Business
 * Profile. Changing it would be inaccurate and would break NAP consistency,
 * which is what local search actually keys on.
 */
export const metadata: Metadata = {
  title: "Website Development in South Africa | GoodGround",
  description:
    "A South African studio building custom, fast business websites. Pay a 50% deposit and the rest on completion, or split it over 12 monthly instalments.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeSchema />
      <Hero />
      <ServiceCarousel />
      <CreativeProcess />
      <WhoWeBuildFor />
      <WhatWeBuild />
      <About />
      <SixReasons />
      <FAQAccordion limit={4} />
      <CTABand />
    </>
  );
}
