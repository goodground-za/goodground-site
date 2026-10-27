import type { Metadata } from "next";
import { HomeSchema, ServicesSchema } from "@/components/Schema";
import { GgMotion } from "@/components/gg/motion/GgMotion";
import { GradientCta } from "@/components/gg/GradientCta";
import { HomeFaq } from "@/components/gg/home/HomeFaq";
import { Industries } from "@/components/gg/home/Industries";
import { LaunchOffer } from "@/components/gg/home/LaunchOffer";
import { PayYourWay } from "@/components/gg/home/PayYourWay";
import { ProcessStepper } from "@/components/gg/home/ProcessStepper";
import { ServicesBento } from "@/components/gg/home/ServicesBento";
import { StoryReasons } from "@/components/gg/home/StoryReasons";
import { TrustBar } from "@/components/gg/home/TrustBar";
import { WhyBento } from "@/components/gg/home/WhyBento";
import { WorkShowcase } from "@/components/gg/home/WorkShowcase";
import { SiteFooter } from "@/components/gg/SiteFooter";
import { Hero } from "@/components/home2026/Hero";
import { HomeChrome } from "@/components/home2026/HomeChrome";
import { services } from "@/content/services";
import "@/components/gg/home/home.css";
import "@/components/home2026/home2026.css";

/**
 * Homepage — Figma redesign (Oct 2026), sections 00–11.
 *
 * The hero (section 00) is the existing live hero and is NOT rebuilt: it keeps
 * its own header and menu (HomeChrome) and its styles, both scoped under
 * .home-2026. Everything after it is the new system (.gg, components/gg/home).
 * The two scopes sit side by side, never nested, so home2026.css's bare-element
 * rules cannot reach the new sections.
 *
 * The page is only partly on the new chrome: its header is the hero's, so the
 * shared SiteHeader is not used here. The footer and the closing CTA are.
 *
 * Title/description are carried over unchanged from the previous homepage:
 * they target "website development South Africa" (the primary keyword) and are
 * tuned SEO copy, not part of the visual design that changed. Same for the
 * schema below.
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
      <div className="home-2026">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <HomeChrome />
      </div>

      <main id="main">
        <div className="home-2026">
          <HomeSchema />
          <ServicesSchema services={services} />
          {/* No FAQPage node here: /faq already emits the canonical FAQPage schema
              for this same question set (see Schema.tsx's HomeSchema comment).
              Repeating it put duplicate FAQPage content on two indexed URLs. */}
          <Hero />
        </div>

        <div className="gg">
          <TrustBar />
          <WhyBento />
          <LaunchOffer />
          <ServicesBento />
          <WorkShowcase />
          <ProcessStepper />
          <PayYourWay />
          <StoryReasons />
          <Industries />
          <HomeFaq />
          <GradientCta variant="home" />
        </div>
      </main>

      <div className="gg">
        <SiteFooter />
        <GgMotion />
      </div>
    </>
  );
}
