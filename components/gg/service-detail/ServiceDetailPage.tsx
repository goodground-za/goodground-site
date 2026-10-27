import type { CSSProperties } from "react";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { getArticle } from "@/content/articles";
import { servicePages } from "@/content/servicePages";
import { site } from "@/content/site";

import { ArticleCover, type CoverTopic } from "../ArticleCover";
import { ButtonLink } from "../Button";
import { FaqAccordion, type FaqItem } from "../FaqAccordion";
import { GgShell } from "../GgShell";
import { GradientCta } from "../GradientCta";
import { Icon } from "../Icon";
import { ArrowChip, LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { PAIRS, SERVICE_VIEWS, type ServiceView } from "./data";
import { IncludedGrid } from "./IncludedGrid";
import { HeroVisual } from "./Visuals";
import "./service-detail.css";

/** The first `n` sentences of a paragraph (live hero copy is one long paragraph; the frames show 3 on desktop and 2 on phones). */
function sentences(text: string, n: number) {
  const parts = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  return parts.slice(0, n).join("").trim();
}

const NUMBER = ["01", "02", "03"];

/**
 * The Service detail template (/services/{seo|website-redesign|ux-design|
 * google-ads|meta-ads}). Live titles, H1s, meta, keyword chips and FAQs come
 * from content/servicePages.ts; the template-specific copy lives in ./data.ts.
 */
export function ServiceDetailPage({ slug }: { slug: ServiceView["slug"] }) {
  const entry = servicePages.find((p) => p.slug === slug)!;
  const view = SERVICE_VIEWS[slug];

  const articles = (entry.relatedArticleSlugs ?? [])
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const article = articles[0];

  const faqItems: FaqItem[] = entry.faq.map((item, i) => ({
    question: item.question,
    answer: [i === 0 && view.faqFirstAnswer ? view.faqFirstAnswer.long : (item.answer ?? "")],
    short: i === 0 && view.faqFirstAnswer ? { answer: [view.faqFirstAnswer.short] } : undefined,
  }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${entry.slug}#service`,
    name: entry.h1,
    description: entry.metaDescription,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "City", name: site.address.locality },
    ],
    url: `${site.url}/services/${entry.slug}`,
  };

  const ref = `service-${slug === "website-redesign" ? "website-redesign" : slug}`;
  const pairs = PAIRS.filter((p) => p.key !== slug);

  return (
    <GgShell crumbs={[{ label: "SERVICES", href: "/services" }, { label: view.name.toUpperCase() }]}>
      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }, { name: entry.title, path: `/services/${entry.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <FAQSchema items={entry.faq} id={`${entry.slug}-faq`} />

      <div className="sd-page">
        {/* 01 Hero */}
        <section className="hm-section hm-section--canvas sd-hero" aria-labelledby="sd-title">
          <div className="gg-wrap sd-hero__grid">
            <div className="sd-hero__copy" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                WHAT WE DO
              </Tag>
              <SplitHeading as="h1" id="sd-title" className="gg-display-l sd-h1" text={entry.h1.toUpperCase()} />
              <p className="gg-lead sd-hero__lead" data-part="sub">
                <Resp long={sentences(entry.heroIntro, 3)} short={sentences(entry.heroIntro, 2)} />
              </p>
              <ul className="sd-chips" data-reveal="stagger" style={{ "--gg-stagger-step": "40ms" } as CSSProperties}>
                {entry.keywordChips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
              <div className="sd-hero__buttons" data-part="cta">
                <ButtonLink href={`/start-project?ref=${ref}`} variant="coral">
                  Start your project
                </ButtonLink>
                <ButtonLink href="/pricing" variant="outline">
                  See pricing
                </ButtonLink>
              </div>
            </div>
            <HeroVisual kind={view.visual} />
          </div>
        </section>

        {/* 02 Problems */}
        <section className="hm-section hm-section--surface" aria-labelledby="sd-problems-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader
              id="sd-problems-title"
              layout="split"
              tag="WHY IT MATTERS"
              heading={view.problemsHeading}
              headingClass="gg-h2 hm-h2"
              sub={view.problemsSub}
              subClassName="hm-hide-phone"
            />
            <div className="sd-problems" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
              {view.problems.map((problem, i) => (
                <article key={problem.title} className="sd-problem">
                  <div className="sd-problem__top" data-reveal="line-mask">
                    <SplitHeading as="p" className="sd-problem__n" text={NUMBER[i]} />
                    <span className="sd-problem__chip" aria-hidden="true">
                      <Icon name={problem.icon} size={22} stroke={2} />
                    </span>
                  </div>
                  <div className="sd-problem__text">
                    <h3>
                      <Resp long={problem.title} short={problem.title} />
                    </h3>
                    <p>
                      <Resp long={problem.body} short={problem.short} />
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 What's included */}
        <section className="hm-section hm-section--canvas" aria-labelledby="sd-included-title">
          <div className="gg-wrap hm-stack">
            <div className="sd-incl-head" data-reveal="header">
              <div className="sd-incl-head__copy">
                <Tag data-part="tag">WHAT’S INCLUDED</Tag>
                <SplitHeading id="sd-included-title" className="gg-h2 hm-h2" text={view.includedHeading} />
              </div>
              <a className="sd-incl-head__link gg-text-link hm-hide-phone" href={`${view.includedLinkRef}`} data-part="cta">
                See it alongside every other service
                <Icon name="arrow-up-right" size={16} stroke={2.2} />
              </a>
            </div>
            <IncludedGrid items={view.included} />
          </div>
        </section>

        {/* 04 Built in, not bolted on (+ add-on band) */}
        <section className="hm-section sd-approach" aria-labelledby="sd-approach-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader id="sd-approach-title" tag="HOW WE DO IT" heading={view.approach.heading} headingClass="gg-h2 hm-h2 sd-approach__h" onDark />
            <div className="sd-cols" data-reveal="group">
              <div className="sd-bolted sd-fu" style={{ "--i": 0 } as CSSProperties}>
                <p className="gg-kicker">{view.approach.badLabel}</p>
                <ul>
                  {view.approach.bad.map((line) => (
                    <li key={line}>
                      <span aria-hidden="true">
                        <Icon name="x" size={14} stroke={2.4} />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sd-built sd-fu" style={{ "--i": 1 } as CSSProperties}>
                <p className="gg-kicker">{view.approach.goodLabel}</p>
                <ul>
                  {view.approach.good.map((line, i) => (
                    <li key={line}>
                      <span aria-hidden="true" style={{ "--i": i } as CSSProperties}>
                        <Icon name="check" size={14} stroke={2.6} />
                      </span>
                      <Resp long={line} short={view.approach.goodShort[i]} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {view.addOn ? (
              <div className="sd-addon" data-reveal="fade-up">
                <div className="sd-addon__copy">
                  <p className="gg-kicker">{view.addOn.kicker}</p>
                  <h3>
                    <Resp long={view.addOn.title} short={view.addOn.shortTitle} />
                  </h3>
                  <p className="sd-addon__body">{view.addOn.body}</p>
                </div>
                <p className="sd-addon__price">
                  <span className="gg-kicker">FROM</span>
                  <span className="sd-addon__amount">{view.addOn.from}</span>
                  <span className="sd-addon__note">{view.addOn.note}</span>
                </p>
                <ButtonLink href={view.addOn.href} variant="light" full>
                  {view.addOn.cta}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </section>

        {/* 05 Related reading */}
        {article ? (
          <section className="hm-section hm-section--canvas sd-related" aria-labelledby="sd-related-title">
            <div className="gg-wrap sd-related__grid">
              <div className="sd-related__copy" data-reveal="header">
                <Tag data-part="tag">RELATED READING</Tag>
                <SplitHeading id="sd-related-title" as="h2" className="gg-h2-side hm-h2" text={view.relatedHeading || "Related reading."} />
                <div data-part="cta" className="hm-hide-phone">
                  <ButtonLink href="/insights" variant="outline">
                    All insights
                  </ButtonLink>
                </div>
              </div>
              <LinkedCard href={`/insights/${article.slug}`} className="sd-article">
                <span className="sd-article__cover gg-card__cover">
                  <ArticleCover topic={article.category.toLowerCase() as CoverTopic} />
                </span>
                <span className="sd-article__body">
                  <Tag tone="plum">{article.category.toUpperCase()}</Tag>
                  <span className="sd-article__title">{article.title}</span>
                  <span className="sd-article__excerpt hm-hide-phone">{article.excerpt}</span>
                  <span className="sd-article__link">
                    Read the article <Icon name="arrow-up-right" size={16} stroke={2.2} />
                  </span>
                </span>
              </LinkedCard>
            </div>
          </section>
        ) : null}

        {/* 06 FAQ */}
        <section className="hm-section hm-section--canvas sd-faq" aria-labelledby="sd-faq-title">
          <div className="gg-wrap hm-faq">
            <div className="hm-faq__intro">
              <SectionHeader
                id="sd-faq-title"
                tag="FAQ"
                heading={view.faqHeading}
                headingClass="gg-h2-side hm-h2"
                sub="More answers on the FAQ page."
                subClassName="hm-hide-phone"
                cta={
                  <ButtonLink href="/faq" variant="outline" className="sd-faq__btn">
                    All FAQs
                  </ButtonLink>
                }
              />
            </div>
            <div className="hm-faq__list" data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as CSSProperties}>
              <FaqAccordion items={faqItems} tone="lilac" numbered />
            </div>
          </div>
        </section>

        {/* 07 Other services */}
        <section className="hm-section hm-section--surface sd-pairs" aria-labelledby="sd-pairs-title">
          <div className="gg-wrap hm-stack">
            <div className="sd-pairs__head" data-reveal="header">
              <h2 id="sd-pairs-title" className="sd-pairs__title" data-part="sub">
                Pairs well with
              </h2>
              <div data-part="cta" className="hm-hide-phone">
                <ButtonLink href="/services" variant="outline">
                  View every service
                </ButtonLink>
              </div>
            </div>
            <div className="sd-pairs__grid" data-reveal="stagger" style={{ "--gg-stagger-step": "60ms" } as CSSProperties}>
              {pairs.map((pair) => (
                <LinkedCard key={pair.key} href={pair.href} className={pair.plum ? "sd-pair sd-pair--plum" : "sd-pair"}>
                  <span className="sd-pair__top">
                    <span className="gg-kicker sd-pair__tag">{pair.tag}</span>
                    <ArrowChip size={32} className="sd-pair__chip" />
                    <Icon name="chev" size={18} stroke={2.2} className="sd-pair__chev" />
                  </span>
                  <span className="sd-pair__name">{pair.name}</span>
                </LinkedCard>
              ))}
            </div>
          </div>
        </section>
      </div>

      <GradientCta variant="inner" refSource={ref} />
    </GgShell>
  );
}
