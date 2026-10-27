import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { CountUp } from "@/components/gg/CountUp";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { Resp } from "@/components/gg/Resp";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { articleCards, formatShort, latestDate, topicsPresent } from "@/components/gg/insights/data";
import { InsightsListing } from "@/components/gg/insights/InsightsListing";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/insights/insights.css";

// Kept under ~60 chars so it doesn't truncate in search results (the live title).
const title = { absolute: "Website Advice for South African Businesses | GoodGround" };
const description =
  "Practical articles on website design, online presence and growth for South African small businesses. No jargon, no spam.";
const path = "/insights";

// ?topic= URLs canonicalise to /insights.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/** Blog + an ItemList of BlogPosting (headline, datePublished, url). */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${site.url}/insights#blog`,
      name: "GoodGround Insights",
      url: `${site.url}${path}`,
      publisher: { "@id": `${site.url}/#organization` },
      blogPost: articleCards.map((a) => ({ "@id": `${site.url}/insights/${a.slug}` })),
    },
    {
      "@type": "ItemList",
      itemListElement: articleCards.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "BlogPosting",
          "@id": `${site.url}/insights/${a.slug}`,
          headline: a.title,
          datePublished: a.date,
          url: `${site.url}/insights/${a.slug}`,
        },
      })),
    },
  ],
};

export default function InsightsPage() {
  return (
    <GgShell crumbs={[{ label: "INSIGHTS" }]}>
      <div className="in-page">
        <BreadcrumbSchema trail={[{ name: "Insights", path }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <section className="hm-section hm-section--canvas in-hero" aria-labelledby="in-title">
          <div className="gg-wrap in-hero__grid">
            <div className="in-hero__copy" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                INSIGHTS
              </Tag>
              <SplitHeading as="h1" id="in-title" className="gg-display-l in-h1" text="PRACTICAL IDEAS FOR BUILDING ONLINE." />
              <p className="gg-lead in-hero__lead" data-part="sub">
                <Resp
                  long="Straight-talking articles on website design, online presence and growth for South African small businesses. No jargon, no filler."
                  short="Straight-talking articles for South African small businesses. No jargon, no filler."
                />
              </p>
            </div>
            <dl className="in-summary" data-reveal="stagger" style={{ "--gg-stagger-step": "70ms" } as CSSProperties}>
              <div>
                <dd className="gg-number">
                  <CountUp to={articleCards.length} />
                </dd>
                <dt>articles</dt>
              </div>
              <div>
                <dd className="gg-number">
                  <CountUp to={topicsPresent.length} />
                </dd>
                <dt>topics</dt>
              </div>
              <div>
                <dd className="gg-number in-summary__date">{formatShort(latestDate)}</dd>
                <dt>latest article</dt>
              </div>
            </dl>
          </div>
        </section>

        <InsightsListing cards={articleCards} />
      </div>

      <GradientCta
        variant="home"
        tag="GET IN TOUCH"
        sub="Read enough? Tell us about your business and we’ll come back with a fixed price and a clear plan."
        refSource="insights"
        secondary={{ label: "hello@goodground.co.za", href: "mailto:hello@goodground.co.za" }}
      />
    </GgShell>
  );
}
