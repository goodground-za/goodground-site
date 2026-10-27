import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema, ServicesSchema } from "@/components/Schema";
import { FaqBlock } from "@/components/gg/shared/FaqBlock";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { Compare } from "@/components/gg/services/Compare";
import { DetailCards } from "@/components/gg/services/DetailCards";
import { Growth } from "@/components/gg/services/Growth";
import { PaymentBand, ServicesIndustries, WhyGrow } from "@/components/gg/services/Lower";
import { Overview } from "@/components/gg/services/Overview";
import { PayChooser } from "@/components/gg/services/PayChooser";
import { ServiceNav } from "@/components/gg/services/ServiceNav";
import { faq, type FAQItem } from "@/content/faq";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/services/services.css";

/** Copy deck §3, retargeted development-first / South Africa (kept from the live page). */
const title = { absolute: "Website Development Services in South Africa | GoodGround" };
// Kept under ~160 characters on purpose: this description regressed past
// 200 once before (SEO audit 2026-08-16) after copy edits crept in. If you
// touch this, re-measure the character count before committing.
const description =
  "Website development, UX design, SEO, Full Service monthly plans, and Google & Meta Ads. Built in South Africa, pay 50% upfront or spread it over 12 months.";
const path = "/services";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/**
 * A different slice from the homepage's FAQ preview, on purpose: the same Q&As
 * verbatim on two indexed URLs read as duplicate content. Picked by question
 * text so it survives a reorder of content/faq.ts.
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
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": `${site.url}/services#${s.slug}` },
    })),
  };

  return (
    <GgShell crumbs={[{ label: "SERVICES" }]}>
      <div className="sv-page">
      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }]} />
      <ServicesSchema services={services} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }} />
      <FAQSchema items={servicesFaqItems} id="services-faq" />

      <section className="hm-section hm-section--canvas sv-hero" aria-labelledby="sv-title">
        <div className="gg-wrap sv-hero__grid">
          <div className="sv-hero__copy" data-reveal="header">
            <Tag tone="coral" data-part="tag">
              WHAT WE DO
            </Tag>
            <SplitHeading as="h1" id="sv-title" className="gg-display-l sv-h1" text="WEBSITES BUILT PROPERLY. PAID FOR SENSIBLY." />
            <p className="gg-lead sv-hero__lead" data-part="sub">
              <span className="gg-resp-long">
                {/* Names the real town (SEO audit 2026-08-16, item 19) next to the national positioning. */}
                A website development and maintenance studio in George, working with businesses across South Africa. Designed, built, optimised for search and supported after launch, as one connected process. And every project offers a choice of how you pay.
              </span>
              <span className="gg-resp-short">
                Designed, built, optimised for search and supported after launch, as one connected process. And you choose how you pay.
              </span>
            </p>
          </div>
          <PayChooser />
        </div>
      </section>

      <div className="sv-zone">
        <ServiceNav />
        <Overview />
        <DetailCards />
      </div>
      <Compare />
      <Growth />
      <WhyGrow />
      <ServicesIndustries />
      <PaymentBand />

      <section className="hm-section hm-section--canvas sv-faq-section" aria-label="Questions about what we build">
        <div className="gg-wrap">
          <FaqBlock
            tag="FAQ"
            heading="Questions about what we build."
            items={servicesFaqItems.map((item) => ({ question: item.question, answer: [item.answer ?? ""] }))}
          />
        </div>
      </section>

      </div>
      <GradientCta
        variant="home"
        split
        size="l"
        tag="GROWTH STARTS HERE"
        headline={"READY TO BRING PEOPLE TO\nTHE GROUND YOU’VE BUILT?"}
        sub="Let’s turn your website into a source of steady, measurable growth, with a plan that makes it easy to start."
        primary={{ label: "Start your project", href: "/start-project?ref=services" }}
        secondary={{ label: "Book a free consultation", href: "/start-project?ref=services-consult" }}
      />
    </GgShell>
  );
}
