import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { GgShell } from "@/components/gg/GgShell";
import { Icon } from "@/components/gg/Icon";
import { Resp } from "@/components/gg/Resp";
import { SectionHeader } from "@/components/gg/SectionHeader";
import { FaqBlock } from "@/components/gg/shared/FaqBlock";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { Configurator } from "@/components/gg/pricing/Configurator";
import { packageViews } from "@/components/gg/pricing/data";
import { pricingFaqItems } from "@/components/gg/pricing/faq";
import { FullServiceBand } from "@/components/gg/pricing/FullServiceBand";
import { Packages } from "@/components/gg/pricing/Packages";
import { PricingProvider } from "@/components/gg/pricing/PricingProvider";
import { QuoteForm } from "@/components/gg/pricing/QuoteForm";
import { ReviewCard } from "@/components/gg/pricing/ReviewCard";
import { WaysTable } from "@/components/gg/pricing/WaysTable";
import { fullServicePackage } from "@/content/pricing";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/pricing/pricing.css";

const title = { absolute: "Pricing | Website Design Packages, South Africa | GoodGround" };
const description =
  "Four website packages from R12 000, a build-your-own menu, or Full Service from R1 500/mo with hosting, mailboxes, SEO and maintenance included.";
const path = "/pricing";

// ?build= is the shared-link code for the configurator; it canonicalises away.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

const JUMP = [
  { href: "#ways-to-pay", label: "Ways to pay" },
  { href: "#packages", label: "Packages" },
  { href: "#full-service", label: "Full Service" },
  { href: "#build-your-own", label: "Build your own" },
];

/** Service with an Offer per package ("starting from" via minPrice) and Full Service as a monthly offer. */
function PricingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/pricing#service`,
    name: "Website design and development packages",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    url: `${site.url}${path}`,
    offers: [
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

export default function PricingPage() {
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
                    long="Pick a package, build your own from the menu, or have everything handled for one monthly price. Every price is a real number, and every build gives you a choice of how to pay."
                    short="Pick a package, build your own, or have everything handled monthly."
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
          <section id="ways-to-pay" className="hm-section hm-section--canvas pr-ways" aria-label="Four ways to pay">
            <div className="gg-wrap">
              <SectionHeader
                tag="WAYS TO PAY"
                heading="Four ways to pay, side by side."
                layout="split"
                sub="Package and Full Service figures are starting prices. Your quote confirms the real number before work begins, and it doesn’t change once you accept it."
                subClassName="hm-hide-phone"
              />
              <WaysTable />
            </div>
          </section>

          <section id="packages" className="hm-section hm-section--surface pr-packages" aria-label="The packages">
            <div className="gg-wrap">
              <Packages />
            </div>
          </section>

          <section id="full-service" className="hm-section hm-section--surface pr-fs-section" aria-label="Full Service">
            <div className="gg-wrap">
              <FullServiceBand />
            </div>
          </section>

          <section id="build-your-own" className="hm-section hm-section--canvas pr-build" aria-labelledby="pr-build-title">
            <div className="gg-wrap">
              <SectionHeader
                tag="BUILD YOUR OWN"
                tagTone="coral"
                heading="Pick a starting point. Add exactly what you need."
                sub="Every build starts from the same base. Add what your business needs, watch the total update live, and send it through when you’re ready."
                subClassName="hm-hide-phone"
                layout="split"
                id="pr-build-title"
              />
              <Configurator />
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
