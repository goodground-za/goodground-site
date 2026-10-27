import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { ArticleCover } from "@/components/gg/ArticleCover";
import { ButtonLink } from "@/components/gg/Button";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { Icon } from "@/components/gg/Icon";
import { ArrowChip, LinkedCard } from "@/components/gg/LinkedCard";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { ReadingProgress, ShareButton, ShareRow, Toc } from "@/components/gg/article/ArticleClient";
import { ArticleBlocks, slugify } from "@/components/gg/article/ArticleBlocks";
import { ShortAnswerCard } from "@/components/gg/article/ShortAnswer";
import { TOPIC_LABEL, TOPIC_TONE, articleCards, formatLong, type Topic } from "@/components/gg/insights/data";
import { articleWordCount, articles, getArticle, type Article } from "@/content/articles";
import { servicePages } from "@/content/servicePages";
import { site } from "@/content/site";
import "@/components/gg/article/article.css";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `${site.url}/insights/${article.slug}`;
  return {
    title: { absolute: `${article.metaTitle} | GoodGround` },
    description: article.metaDescription,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", url, title: article.metaTitle, description: article.metaDescription, publishedTime: article.date },
    // Without its own twitter block, this would inherit the root layout's static homepage
    // title/description on X/Twitter shares specifically.
    twitter: { card: "summary_large_image", title: article.metaTitle, description: article.metaDescription },
  };
}

const topicOf = (article: Article): Topic => {
  const key = article.category.toLowerCase();
  return key === "growth" || key === "pricing" ? key : "websites";
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const topic = topicOf(article);
  const articleUrl = `${site.url}/insights/${article.slug}`;
  const headings = article.body.flatMap((b) => (b.type === "h2" ? [{ id: slugify(b.text), text: b.text }] : []));
  const faqs = article.body.flatMap((b) => (b.type === "faq" ? b.items : []));

  // Keep reading: manual picks first (none yet), then the same topic, then the newest; never this article.
  const others = articleCards.filter((c) => c.slug !== article.slug);
  const keep = [...others.filter((c) => c.topic === topic), ...others.filter((c) => c.topic !== topic)].slice(0, 3);

  const relatedServices = (article.relatedServiceSlugs ?? [])
    .map((s) => servicePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": articleUrl,
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: article.author, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: articleUrl,
    // The per-article opengraph-image route Next already generates (1200x630).
    image: `${articleUrl}/opengraph-image`,
    keywords: article.keyword,
    inLanguage: "en-ZA",
    // Derived from the real content, so neither can drift from what is on the page.
    wordCount: articleWordCount(article),
    articleSection: article.category,
  };

  return (
    <GgShell crumbs={[{ label: "INSIGHTS", href: "/insights" }, { label: TOPIC_LABEL[topic].toUpperCase() }]}>
      <div className="ar-page">
        <ReadingProgress ids={headings.map((h) => h.id)} />
        <BreadcrumbSchema
          trail={[
            { name: "Insights", path: "/insights" },
            { name: TOPIC_LABEL[topic], path: `/insights?topic=${topic}` },
            { name: article.title, path: `/insights/${article.slug}` },
          ]}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {faqs.length ? <FAQSchema items={faqs.map((f) => ({ question: f.question, answer: f.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") }))} id="article-faq" /> : null}

        {/* 01 · Hero + short answer ------------------------------------------------------ */}
        <section className="hm-section hm-section--canvas ar-hero" aria-labelledby="ar-title">
          <div className="gg-wrap">
            <div className="ar-hero__col">
              <div className="ar-hero__copy" data-reveal="header">
                <Link href="/insights" className="ar-back" data-part="tag">
                  <Icon name="back" size={16} stroke={2.2} />
                  All insights
                </Link>
                <p className="ar-meta" data-part="tag">
                  <Tag tone={TOPIC_TONE[topic]}>{TOPIC_LABEL[topic].toUpperCase()}</Tag>
                  <span>{formatLong(article.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="ar-meta__time">
                    <Icon name="clock" size={14} stroke={2.2} />
                    {article.readingMinutes} min read
                  </span>
                </p>
                <SplitHeading as="h1" id="ar-title" className="ar-h1" text={article.title} />
                <div className="ar-byline" data-part="sub">
                  <p className="ar-byline__author">
                    <span className="ar-avatar" aria-hidden="true">
                      gg
                    </span>
                    <span>
                      <strong>By {article.author}</strong>
                      <small>Web development studio, George</small>
                    </span>
                  </p>
                  <ShareButton url={articleUrl} title={article.title} />
                </div>
              </div>
              {article.shortAnswer ? <ShortAnswerCard data={article.shortAnswer} /> : null}
            </div>
          </div>
        </section>

        {/* 02 · Body ------------------------------------------------------------------------------- */}
        <section className="ar-zone">
          <div className="gg-wrap ar-zone__grid">
            <Toc items={headings} minutes={article.readingMinutes} />
            <article className="ar-article">
              <div id="article-body" className="ar-article__body">
                <ArticleBlocks blocks={article.body} slug={article.slug} />
              </div>
              <div id="article-body-end" />

              <div className="ar-end">
                <ShareRow url={articleUrl} title={article.title} />
                {relatedServices.length > 0 ? (
                  <div className="ar-related">
                    <p className="gg-kicker">RELATED SERVICES</p>
                    <ul>
                      {relatedServices.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`}>
                            {s.title}
                            <Icon name="arrow-up-right" size={14} stroke={2.2} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="ar-author">
                  <span className="ar-avatar ar-avatar--lg" aria-hidden="true">
                    gg
                  </span>
                  <p>
                    <strong>Written by GoodGround</strong>
                    <span>A web development studio in George, building fast, honest websites for South African small businesses.</span>
                  </p>
                  <ButtonLink href="/about" variant="outline">
                    About us
                  </ButtonLink>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 03 · Keep reading ------------------------------------------------------------------------ */}
        <section className="hm-section hm-section--surface ar-keep" aria-labelledby="ar-keep-title">
          <div className="gg-wrap">
            <div className="ar-keep__head">
              <h2 id="ar-keep-title">Keep reading</h2>
              <ButtonLink href="/insights" variant="outline" className="ar-hide-phone">
                All insights
              </ButtonLink>
            </div>
            <ul className="ar-keep__grid" data-reveal="stagger" style={{ "--gg-stagger-step": "90ms" } as React.CSSProperties}>
              {keep.map((card, i) => (
                <li key={card.slug} className={i >= 2 ? "ar-hide-phone" : undefined}>
                  <LinkedCard href={`/insights/${card.slug}`} className="ar-keepcard">
                    <span className="ar-keepcard__cover">
                      <ArticleCover topic={card.topic} />
                    </span>
                    <span className="ar-keepcard__body">
                      <span className="ar-keepcard__meta">
                        <Tag tone={TOPIC_TONE[card.topic]}>{TOPIC_LABEL[card.topic].toUpperCase()}</Tag>
                        <span>
                          <Icon name="clock" size={14} stroke={2.2} />
                          {card.minutes} min read
                        </span>
                      </span>
                      <span className="ar-keepcard__title">{card.title}</span>
                    </span>
                    <ArrowChip size={32} className="ar-keepcard__chip" />
                  </LinkedCard>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* 04 · CTA ------------------------------------------------------------------------------------- */}
      <GradientCta
        variant="home"
        tag={topic === "pricing" ? "YOUR NUMBER, IN TWO DAYS" : "GET IN TOUCH"}
        headline="READY TO BE FOUND ONLINE?"
        sub="We build fast, honest websites for South African small businesses, with a choice of how you pay. Tell us about yours and get a firm number back within two business days."
        primary={{ label: "Start your project", href: `/start-project?ref=insights-${article.slug}` }}
        secondary={{ label: "See how pricing works", href: "/pricing" }}
      />
    </GgShell>
  );
}

