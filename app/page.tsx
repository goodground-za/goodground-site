import type { Metadata } from "next";
import { HomeSchema, ServicesSchema } from "@/components/Schema";
import { MobileStickyBar } from "@/components/hometest2/MobileStickyBar";
import { ScrollProgress } from "@/components/hometest2/ScrollProgress";
import { FAQSection } from "@/components/hometest2/sections/FAQSection";
import { HomeTest2Hero } from "@/components/hometest2/sections/Hero";
import { OurProcess } from "@/components/hometest2/sections/OurProcess";
import { OurStrategy } from "@/components/hometest2/sections/OurStrategy";
import { ReasonsToWorkWithUs } from "@/components/hometest2/sections/ReasonsToWorkWithUs";
import { ServicesLede } from "@/components/hometest2/sections/ServicesLede";
import { WhatWeBuild } from "@/components/hometest2/sections/WhatWeBuild";
import { WhoWeBuildFor } from "@/components/hometest2/sections/WhoWeBuildFor";
import { Work } from "@/components/hometest2/sections/Work";
import { services } from "@/content/services";

/**
 * Homepage. Promoted from /home-test-2 on 2026-08-20 after client approval,
 * replacing the previous section set (components/sections/*). Parkinsans and
 * Instrument Sans moved site-wide at the same time, so this page no longer
 * carries its own font-scoping layout.
 *
 * Title/description are carried over unchanged from the previous homepage:
 * they target "website development South Africa" (the primary keyword) and
 * are tuned SEO copy, not part of the visual design that changed.
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
      <ServicesSchema services={services} />
      {/* No FAQPage node here: /faq already emits the canonical FAQPage
          schema for this same question set (see Schema.tsx's HomeSchema
          comment). Repeating it put duplicate FAQPage content on two
          indexed URLs. */}

      <ScrollProgress />

      <HomeTest2Hero />
      <ServicesLede />
      <OurProcess />
      <Work />
      <WhoWeBuildFor />
      <WhatWeBuild />
      <ReasonsToWorkWithUs />
      <OurStrategy />
      <FAQSection />

      <MobileStickyBar />
    </>
  );
}
