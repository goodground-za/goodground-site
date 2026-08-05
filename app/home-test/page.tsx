import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { About } from "@/components/home-test/About";
import { CTABand } from "@/components/home-test/CTABand";
import { CreativeProcess } from "@/components/home-test/CreativeProcess";
import { FAQAccordion } from "@/components/home-test/FAQAccordion";
import { HomeTestFooter } from "@/components/home-test/HomeTestFooter";
import { HomeTestNav } from "@/components/home-test/HomeTestNav";
import { Hero } from "@/components/home-test/Hero";
import { ServiceCarousel } from "@/components/home-test/ServiceCarousel";
import { SixReasons } from "@/components/home-test/SixReasons";
import { WhatWeBuild } from "@/components/home-test/WhatWeBuild";
import { WhoWeBuildFor } from "@/components/home-test/WhoWeBuildFor";
import { LenisProvider } from "@/components/motion-gsap/LenisProvider";

// Bold only — the brief specifies Clash Display Bold for headings, no other
// weight is used anywhere on this page.
const clashDisplay = localFont({
  src: "../../public/home-test/fonts/ClashDisplay-Bold.otf",
  variable: "--font-clash-display",
  weight: "700",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * A/B test variant of the homepage: same real business content as `/`
 * (services, industries, process, FAQ, NAP), a completely different visual
 * system (palette, type, GSAP/Lenis motion) per the client's new comp.
 * Deliberately excluded from the sitemap and marked noindex — this is a
 * live test variant, not a page meant to be found or ranked independently.
 */
export const metadata: Metadata = {
  title: "GoodGround — Creative Studio Built for Growth",
  description:
    "GoodGround is an AI-first digital agency based in George, South Africa. We build websites and experiences that convert.",
  robots: { index: false, follow: false },
};

export default function HomeTestPage() {
  return (
    <div className={`${clashDisplay.variable} ${inter.variable} font-ht-body bg-ht-cream`}>
      <LenisProvider>
        <HomeTestNav />
        <main>
          <Hero />
          <ServiceCarousel />
          <CreativeProcess />
          <WhoWeBuildFor />
          <WhatWeBuild />
          <About />
          <SixReasons />
          <FAQAccordion />
          <CTABand />
        </main>
        <HomeTestFooter />
      </LenisProvider>
    </div>
  );
}
