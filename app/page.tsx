import type { Metadata } from "next";
import { HomeSchema, ServicesSchema } from "@/components/Schema";
import { Contact } from "@/components/home2026/Contact";
import { Faq } from "@/components/home2026/Faq";
import { Hero } from "@/components/home2026/Hero";
import { Industries } from "@/components/home2026/Industries";
import { Intro } from "@/components/home2026/Intro";
import { Process } from "@/components/home2026/Process";
import { Reasons } from "@/components/home2026/Reasons";
import { Services } from "@/components/home2026/Services";
import { SiteShell } from "@/components/home2026/SiteShell";
import { Strategy } from "@/components/home2026/Strategy";
import { Work } from "@/components/home2026/Work";
import { services } from "@/content/services";

/**
 * Homepage — 2026-09 redesign.
 *
 * Ported from the delivered static package in
 * website-and-ops/GoodGround-Homepage-Live-Files/. Section components are
 * verbatim markup; the interactive parts (hero video, menu dialog, reveals)
 * were rebuilt as React while keeping the original behaviour.
 *
 * This page sits outside app/(site)/ for historical reasons — it was ported
 * before the rest of the site adopted this design — and now gets the same
 * chrome through SiteShell, which is what app/(site)/layout.tsx renders too.
 *
 * It passes `scopeBody` because every section here is built on home2026.css's
 * own classes. Inner pages must not: their bodies are still Tailwind, and the
 * scope's bare-element rules out-specify those utilities. See SiteShell.
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
    <SiteShell scopeBody>
      <HomeSchema />
      <ServicesSchema services={services} />
      {/* No FAQPage node here: /faq already emits the canonical FAQPage schema
          for this same question set (see Schema.tsx's HomeSchema comment).
          Repeating it put duplicate FAQPage content on two indexed URLs. */}

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
    </SiteShell>
  );
}
