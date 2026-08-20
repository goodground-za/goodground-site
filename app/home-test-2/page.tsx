import type { Metadata } from "next";
import { FAQSchema, HomeSchema, ServicesSchema } from "@/components/Schema";
import { MobileStickyBar } from "@/components/hometest2/MobileStickyBar";
import { ScrollProgress } from "@/components/hometest2/ScrollProgress";
import { FAQSection } from "@/components/hometest2/sections/FAQSection";
import { HomeTest2Hero } from "@/components/hometest2/sections/Hero";
import { OurProcess } from "@/components/hometest2/sections/OurProcess";
import { OurStrategy } from "@/components/hometest2/sections/OurStrategy";
import { ServicesLede } from "@/components/hometest2/sections/ServicesLede";
import { Work } from "@/components/hometest2/sections/Work";
import { ReasonsToWorkWithUs } from "@/components/hometest2/sections/ReasonsToWorkWithUs";
import { WhatWeBuild } from "@/components/hometest2/sections/WhatWeBuild";
import { WhoWeBuildFor } from "@/components/hometest2/sections/WhoWeBuildFor";
import { faq } from "@/content/faq";
import { services } from "@/content/services";

/**
 * Structural rebuild of the homepage, second pass (2026-08-19): matches the
 * client reference "Good Ground - Website colour and layout.png" section
 * order and treatment exactly — a combination of the current live homepage
 * and the first home-test-2 draft. Isolated, unlinked route, same pattern
 * the live homepage itself was built and approved under back when it was
 * /home-test. noindex/nofollow until reviewed and (if approved) promoted.
 *
 * Fonts (Parkinsans/Instrument Sans) are scoped to this route via
 * app/home-test-2/layout.tsx, not applied site-wide yet — same
 * test-before-promote pattern as the layout itself.
 */
export const metadata: Metadata = {
  title: "Home Test 2 (draft) | GoodGround",
  robots: { index: false, follow: false },
};

const homepageFaq = faq.slice(0, 8).filter((item) => item.answer !== null);

export default function HomeTest2Page() {
  return (
    <>
      <HomeSchema />
      <ServicesSchema services={services} />
      <FAQSchema items={homepageFaq} id="home-test-2-faq" />

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
