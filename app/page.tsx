import type { Metadata } from "next";
import { HomeSchema } from "@/components/Schema";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { WhyUs } from "@/components/sections/WhyUs";

/**
 * Title/description target "website development South Africa" (the primary
 * keyword), development-first, with Cape Town kept as the local anchor in the
 * hero trust line and schema address.
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
      <Philosophy />
      <WhatWeBuild />
      <Industries />
      <Process />
      {/* WhyUs renders the "Who we are" (AboutPreview) block inside its own
          forest panel, so AboutPreview is not placed separately here. */}
      <WhyUs />
      <Testimonials />
      <FAQ limit={4} />
      <CTABanner />
    </>
  );
}
