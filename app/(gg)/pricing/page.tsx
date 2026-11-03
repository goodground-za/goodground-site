import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { GgShell } from "@/components/gg/GgShell";
import { Icon } from "@/components/gg/Icon";
import { Resp } from "@/components/gg/Resp";
import { FaqBlock } from "@/components/gg/shared/FaqBlock";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { formatRand } from "@/components/gg/format";
import { BuildYourOwn } from "@/components/gg/pricing/BuildYourOwn";
import { packageViews } from "@/components/gg/pricing/data";
import { pricingFaqItems } from "@/components/gg/pricing/faq";
import { MonthlyPlans } from "@/components/gg/pricing/MonthlyPlans";
import { Packages } from "@/components/gg/pricing/Packages";
import { PricingProvider } from "@/components/gg/pricing/PricingProvider";
import { QuoteForm } from "@/components/gg/pricing/QuoteForm";
import { ReviewCard } from "@/components/gg/pricing/ReviewCard";
import { fullServicePackage, localFromMonthly, localPlans } from "@/content/pricing";
import { site } from "@/content/site";
import { getOfferSpots } from "@/lib/liveCounters";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/pricing/pricing.css";

const title = { absolute: "Pricing | Website Design Packages, South Africa | GoodGround" };
const description = `Monthly website plans from ${formatRand(localFromMonthly)} with no deposit, four custom website packages from ${formatRand(packageViews[0].total)}, a build-your-own menu, and Full Service from ${formatRand(fullServicePackage.monthlyFrom)}/mo.`;
const path = "/pricing";

// ?build= is the shared-link code for the configurator; it canonicalises away.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

const JUMP = [
  { href: "#monthly", label: "Monthly plans" },
  { href: "#custom", label: "Custom builds" },
  { href: "#build-your-own", label: "Build your own" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Service with an Offer per Local plan (price per month, ZAR), an Offer per
 * custom package ("starting from" via minPrice) and Full Service as a monthly offer.
 */
function PricingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/pricing#service`,
    name: "Website plans, packages and Full Service",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    url: `${site.url}${path}`,
    offers: [
      ...localPlans.map((plan) => ({
        "@type": "Offer",
        name: `${plan.name} monthly plan`,
        description: plan.tagline,
        priceCurrency: "ZAR",
        url: `${site.url}/pricing#plan-${plan.slug}`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.monthly,
          priceCurrency: "ZAR",
          unitCode: "MON",
        },
      })),
      ...packageViews.map((pkg) => ({
        "@type": "Offer",
        name: `${pkg.name} website package`,
        description: pkg.tagline,
        priceCurrency: "ZAR",
        url: `${site.url}/pricing#package-${pkg.slug}`,
        priceSpecification: { "@type": "PriceSpecification", minPrice: pkg.total, priceCurrency: "ZAR" },
      })),
      {
        "@type": "Offer",
        name: "Full Service",
        description: fullServicePackage.pitch,
        priceCurrency: "ZAR",
        url: `${site.url}/pricing#full-service`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: fullServicePackage.monthlyFrom,
          priceCurrency: "ZAR",
          unitCode: "MON",
        },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function PricingPage() {
  // The live count (Upstash Redis when connected, the typed fallback otherwise).
  const spots = await getOfferSpots();

  return (
    <GgShell crumbs={[{ label: "PRICING" }]}>
      <div className="pr-page">
        <BreadcrumbSchema trail={[{ name: "Pricing", path }]} />
        <FAQSchema items={pricingFaqItems.map((i) => ({ question: i.question, answer: i.answer.join(" ") }))} id="pricing-faq" />
        <PricingSchema />

        <section className="hm-section hm-section--canvas pr-hero" aria-labelledby="pr-title">
          <div className="gg-wrap">
            <div className="pr-hero__stack" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                PRICING
              </Tag>
              <SplitHeading as="h1" id="pr-title" className="gg-display-l pr-h1" text="SIMPLE PRICING, BUILT AROUND WHAT YOU ACTUALLY NEED." />
              <div className="pr-hero__row" data-part="sub">
                <p className="gg-lead pr-hero__lead">
                  <Resp
                    long="Two ways to work with us: a monthly plan that gets you found on Google, Maps and AI, or a custom website built to your brief. Every price is a real number, and nothing gets added at the end."
                    short="A monthly plan to get found online, or a custom website built to your brief."
                  />
                </p>
                <nav className="pr-jump" aria-label="On this page">
                  {JUMP.map((link, i) => (
                    <a key={link.href} href={link.href} className={i === 0 ? "pr-jump__pill is-first" : "pr-jump__pill"}>
                      {link.label}
                      <Icon name="down" size={14} stroke={2.2} />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        <PricingProvider>
          <section id="monthly" className="hm-section hm-section--surface pr-monthly" aria-label="Monthly plans">
            <div className="gg-wrap">
              <MonthlyPlans offer={spots} />
            </div>
          </section>

          <section id="custom" className="hm-section hm-section--canvas pr-packages" aria-label="Custom builds">
            {/* Old links used #packages; it still scrolls here. */}
            <span id="packages" className="pr-anchor" aria-hidden="true" />
            <div className="gg-wrap">
              <Packages />
            </div>
          </section>

          <section id="build-your-own" className="hm-section hm-section--canvas pr-build" aria-labelledby="pr-build-title">
            <div className="gg-wrap">
              <BuildYourOwn />
            </div>
          </section>

          <section className="hm-section hm-section--surface pr-review-section" aria-label="From a client">
            <div className="gg-wrap">
              <ReviewCard />
            </div>
          </section>

          <section className="hm-section hm-section--canvas pr-faq-section" aria-label="Common questions">
            <div className="gg-wrap">
              <FaqBlock tag="COMMON QUESTIONS" heading="Before you send that enquiry." items={pricingFaqItems} />
            </div>
          </section>

          <section id="quote" className="hm-section hm-section--plum pr-quote-section" aria-labelledby="quote-title">
            <div className="gg-wrap">
              <QuoteForm />
            </div>
          </section>
        </PricingProvider>
      </div>
    </GgShell>
  );
}
