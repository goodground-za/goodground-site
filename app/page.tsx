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
 * keyword), development-first, with George kept as the local anchor in the
 * hero trust line and schema address. Kept from the previous homepage's
 * metadata (unchanged by the visual redesign) since it's tuned SEO copy,
 * not part of the design language.
 */
export const metadata: Metadata = {
  title: "Website Development in South Africa | Pay Monthly | GoodGround",
  description:
    "A South African studio building custom, fast business websites. Spread the cost over 12 equal monthly payments, with no large upfront bill.",
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
