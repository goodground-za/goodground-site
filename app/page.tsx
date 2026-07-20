import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { HomeSchema } from "@/components/Schema";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { PaymentPlan } from "@/components/sections/PaymentPlan";
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
      <Marquee
        items={[
          "Website Development",
          "UX & Design",
          "SEO Foundations",
          "Website Care Plans",
          "12 Equal Monthly Payments",
          "Built in South Africa",
        ]}
      />
      {/* The stat strip (12 / 0 / 1:1 / 100%) is not in the client's comp. The
          component and content/stats.ts remain if it comes back. */}
      <Philosophy />
      <WhatWeBuild />
      <Industries />
      <PaymentPlan />
      <Process />
      <WhyUs />
      <Testimonials />
      <AboutPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
