import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { PageHero } from "@/components/PageHero";
import { FAQSchema, ServicesSchema } from "@/components/Schema";
import { ServiceAccordion } from "@/components/ServiceAccordion";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { GrowthBenefits } from "@/components/sections/GrowthBenefits";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { GrowthHowItWorks } from "@/components/sections/GrowthHowItWorks";
import { GrowthIntro } from "@/components/sections/GrowthIntro";
import { GrowthProblem } from "@/components/sections/GrowthProblem";
import { GrowthWhyUs } from "@/components/sections/GrowthWhyUs";
import { faq, type FAQItem } from "@/content/faq";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";

/** Copy deck §3, retargeted development-first / South Africa. */
const title = { absolute: "Website Development Services in South Africa | GoodGround" };
const description =
  "Website development, UX and design, SEO foundations, care plans, and Google & Meta Ads management. Built in-house in South Africa — pay a 50% deposit and the rest on completion, or spread it over 12 monthly instalments.";
const path = "/services";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/**
 * A different slice from the homepage's `faq.slice(0, 4)` preview, on
 * purpose: showing the exact same 4 Q&As verbatim on two indexed URLs read
 * as duplicate content to search engines. This picks the questions most
 * relevant to what this page is actually about (scope, timeline, and the
 * ads services covered below) by question text rather than array index, so
 * it doesn't silently break if content/faq.ts gets reordered.
 */
const servicesFaqQuestions = [
  "Do you only build websites, or do you handle design and SEO too?",
  "How long does a typical project take?",
  "What happens after my website launches?",
  "What's the difference between Google Ads and Meta Ads?",
];
const servicesFaqItems = servicesFaqQuestions
  .map((q) => faq.find((item) => item.question === q))
  .filter((item): item is FAQItem => Boolean(item));

export default function ServicesPage() {
  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/services#list`,
    name: "GoodGround services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": `${site.url}/services#${s.slug}` },
    })),
  };

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }]} />
      <ServicesSchema services={services} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }} />
      <FAQSchema items={servicesFaqItems} id="services-faq" />

      <PageHero
        eyebrow="What we do"
        title="Websites built properly. Paid for sensibly."
        intro="We're a website development and maintenance studio. Every project we take on is designed, built, optimised for search, and supported after launch, as one connected process, not four separate line items. And every project offers a choice of how you pay for it."
      >
        {/* Jump index */}
        <RevealSection delay={0.14} className="mt-8 flex justify-center">
          <ul className="flex flex-wrap justify-center gap-2">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`#${s.slug}`}
                  className="font-ht-body rounded-pill inline-flex items-center gap-2 border border-white/25 px-4 py-2 text-[14px] font-medium text-white transition-colors duration-150 hover:border-white"
                >
                  <span className="font-ht-display text-ht-pink text-[12px] font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </RevealSection>
      </PageHero>

      {/* Service deep-dives — same accordion used on the homepage's What We
          Build, applied here to the full list. The h2 is load-bearing, not
          decoration: ServiceAccordion's rows are h3, so without a section
          heading this page jumped h1 → h3 and failed Lighthouse's
          heading-order audit. On the homepage WhatWeBuild supplies its own h2,
          which is why it only showed up here. */}
      <div className="bg-ht-cream mx-auto max-w-[1434px] px-6 pt-14 sm:px-10 md:pt-20">
        <RevealSection>
          <h2 className="font-ht-display text-ht-purple max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold uppercase">
            Everything we build, in detail.
          </h2>
        </RevealSection>
        <div className="mt-10">
          <ServiceAccordion services={services} />
        </div>
      </div>

      <div className="bg-ht-cream">
        {services.some((s) => s.growth) ? (
          <div className="mx-auto max-w-[1434px] px-6 sm:px-10">
            <GrowthIntro />
            <GrowthProblem />
          </div>
        ) : null}

        <GrowthBenefits />
        <GrowthHowItWorks />
        <GrowthWhyUs />
        <GrowthCTA />

        {/* Payment recap */}
        <section className="px-6 py-8 sm:px-10">
          <div className="bg-ht-purple rounded-block mx-auto max-w-[1434px] overflow-hidden">
            <div className="grid gap-8 px-6 py-14 sm:px-10 md:grid-cols-12 md:items-center md:px-14 md:py-16">
              <div className="min-w-0 md:col-span-8">
                <SplitWords
                  as="h2"
                  text="However you build with us, you choose how you pay."
                  className="font-ht-display max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold text-white uppercase"
                />
                <RevealSection delay={0.08}>
                  <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.65] text-white/85">
                    Every website project, regardless of size or scope, is quoted as one fixed price.
                    Pay 50% upfront and the rest on completion, or split it into 12 monthly
                    instalments. No surprise final invoice, either way.
                  </p>
                </RevealSection>
              </div>
              <div className="min-w-0 md:col-span-4 md:justify-self-end">
                <MagneticButton>
                  <Link
                    href="/pricing"
                    className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-soft transition-transform duration-200 hover:scale-[1.03]"
                  >
                    See Pricing →
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual link into the blog. Before this the article had exactly one
            inbound link (the /insights listing), so nothing passed relevance to it
            from the commercial pages. */}
        <section className="px-6 pb-4 sm:px-10">
          <div className="mx-auto max-w-[1434px]">
            <p className="text-ht-purple/70 text-[15px] leading-[1.7]">
              Not sure a website is the right spend right now?{" "}
              <Link
                href="/insights/why-small-businesses-in-south-africa-need-a-website"
                className="text-ht-crimson underline underline-offset-4 hover:no-underline"
              >
                We wrote about why it matters for South African businesses
              </Link>
              .
            </p>
          </div>
        </section>

        <FAQAccordion items={servicesFaqItems} heading="Questions about what we build." />
        <CTABand />
      </div>
    </>
  );
}
