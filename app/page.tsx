import type { Metadata } from "next";
import { HomeSchema, ServicesSchema } from "@/components/Schema";
import { Contact } from "@/components/home2026/Contact";
import { Faq } from "@/components/home2026/Faq";
import { Hero } from "@/components/home2026/Hero";
import { HomeChrome } from "@/components/home2026/HomeChrome";
import { HomeFooter } from "@/components/home2026/HomeFooter";
import { Industries } from "@/components/home2026/Industries";
import { Intro } from "@/components/home2026/Intro";
import { Process } from "@/components/home2026/Process";
import { Reasons } from "@/components/home2026/Reasons";
import { RevealObserver } from "@/components/home2026/RevealObserver";
import { Services } from "@/components/home2026/Services";
import { Strategy } from "@/components/home2026/Strategy";
import { Work } from "@/components/home2026/Work";
import { services } from "@/content/services";
import "@/components/home2026/home2026.css";

/**
 * Homepage — 2026-09 redesign.
 *
 * Ported from the delivered static package in
 * website-and-ops/GoodGround-Homepage-Live-Files/. Section components are
 * verbatim markup; the interactive parts (hero video, menu dialog, reveals)
 * were rebuilt as React while keeping the original behaviour.
 *
 * This page does NOT sit inside app/(site)/, because the design brings its own
 * header, footer and <main>. The shared <Nav /> and <Footer /> live in
 * app/(site)/layout.tsx so every other page still gets them.
 *
 * Styling is scoped under .home-2026 (see home2026.css). The rest of the site
 * is still Parkinsans/Instrument Sans on the ht-* tokens, and nothing here
 * reaches it.
 *
 * Title/description are carried over unchanged from the previous homepage:
 * they target "website development South Africa" (the primary keyword) and are
 * tuned SEO copy, not part of the visual design that changed. Same for the
 * schema below — the delivered package had no equivalent, and dropping it
 * would lose the LocalBusiness and Service structured data.
 */
export const metadata: Metadata = {
  title: "Website Development in South Africa | GoodGround",
  description:
    "A South African studio building custom, fast business websites. Pay a 50% deposit and the rest on completion, or split it over 12 monthly instalments.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="home-2026">
      <HomeSchema />
      <ServicesSchema services={services} />
      {/* No FAQPage node here: /faq already emits the canonical FAQPage schema
          for this same question set (see Schema.tsx's HomeSchema comment).
          Repeating it put duplicate FAQPage content on two indexed URLs. */}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <HomeChrome />

      <main id="main">
        <Hero />
        <Intro />
        <Work />
        <Services />
        <Process />
        <Reasons />
        <Strategy />
        <Industries />
        <Faq />
        <Contact />
      </main>

      <HomeFooter />
      <RevealObserver />
    </div>
  );
}
