import type { CSSProperties } from "react";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import {
  SAMPLE_CHECKS_PER_ENGINE,
  aiFaqOwn,
  aiPage,
  book,
  faqHeading,
  hero,
  how,
  included,
  method,
  sample,
  sampleSection,
  sampleTotals,
  stats,
  wilsonRange,
} from "@/content/aiVisibility";
import { sharedFaqBySlug } from "@/content/faq";
import { addOns, localPlans } from "@/content/pricing";
import { site } from "@/content/site";
import { firstOfNextMonth } from "@/lib/freeCheck";
import { getFreeCheckCounters } from "@/lib/liveCounters";

import { ButtonLink } from "../Button";
import type { FaqItem } from "../FaqAccordion";
import { formatRand } from "../format";
import { GgShell } from "../GgShell";
import { GradientCta } from "../GradientCta";
import { Icon } from "../Icon";
import { SectionHeader } from "../SectionHeader";
import { FaqBlock } from "../shared/FaqBlock";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { AiCheckForm } from "./AiCheckForm";
import { AiStickyBar, AiTracker } from "./AiClient";
import { BandPill } from "./BandPill";
import "./ai.css";

const plus = localPlans.find((p) => p.slug === "local-plus")!;
const pro = localPlans.find((p) => p.slug === "local-pro")!;
const fixPack = addOns.find((a) => a.id === "fix-pack")!;
const watch = addOns.find((a) => a.id === "visibility-watch")!;

/** The page's five questions: four of its own and the shared "Can you guarantee…" entry. */
const guarantee = sharedFaqBySlug("ai-guarantee");
const faqItems: FaqItem[] = [
  { question: aiFaqOwn.instant.question, answer: [aiFaqOwn.instant.answer] },
  { question: guarantee.question, answer: [guarantee.answer] },
  { question: aiFaqOwn.assistants.question, answer: [aiFaqOwn.assistants.answer] },
  { question: aiFaqOwn.needGoodground.question, answer: [aiFaqOwn.needGoodground.answer] },
  { question: aiFaqOwn.needFromMe.question, answer: [aiFaqOwn.needFromMe.answer], link: { label: "Book a free check →", href: "#book" } },
];

/** Service (the free check price 0, Visibility Watch per month), FAQPage and BreadcrumbList. */
function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${aiPage.path}#service`,
    name: aiPage.serviceName,
    description: aiPage.description,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    url: `${site.url}${aiPage.path}`,
    offers: [
      { "@type": "Offer", name: "Free AI visibility check", price: 0, priceCurrency: "ZAR", url: `${site.url}${aiPage.path}#book` },
      {
        "@type": "Offer",
        name: watch.name,
        priceCurrency: "ZAR",
        url: `${site.url}${aiPage.path}#included`,
        priceSpecification: { "@type": "UnitPriceSpecification", price: watch.price, priceCurrency: "ZAR", unitCode: "MON" },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/**
 * /services/ai-visibility (spec page 19, mockups/ai-visibility.html).
 *
 * The hook page for Track C: does AI matter for me (hero, stats), how do you
 * check it honestly (how it works, the sample, the method), and what do I get
 * and what does it cost (included plans, the booking form). THE PAGE NEVER RUNS
 * A SCAN: the sample is fictional and labelled EXAMPLE DATA, and the form only
 * takes a request. Whether the month's free checks are used up is read on the
 * server (Upstash Redis when connected, the typed settings otherwise).
 */
export async function AiVisibilityPage() {
  const counters = await getFreeCheckCounters();
  const nextRun = firstOfNextMonth();

  return (
    <GgShell crumbs={[{ label: "SERVICES", href: "/services" }, { label: "AI VISIBILITY" }]} footer={{ stickyBar: true }}>
      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }, { name: aiPage.breadcrumb, path: aiPage.path }]} />
      <ServiceSchema />
      <FAQSchema items={faqItems.map((i) => ({ question: i.question, answer: i.answer.join(" ") }))} id="ai-faq" />
      <AiTracker />

      <div className="ai-page">
        {/* 01 Hero ------------------------------------------------------------ */}
        <section className="hm-section hm-section--canvas ai-hero" aria-labelledby="ai-title">
          <div className="gg-wrap ai-hero__grid">
            <div className="ai-hero__copy" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                {hero.tag}
              </Tag>
              <SplitHeading as="h1" id="ai-title" className="gg-display-l ai-h1" text={hero.h1} />
              <p className="gg-lead ai-hero__lead" data-part="sub">
                <span className="gg-resp-short">{hero.ledeShort}</span>
                <span className="gg-resp-long">{hero.lede}</span>
              </p>
              <div className="ai-hero__buttons" data-part="cta">
                <ButtonLink href="#book" variant="coral" data-ai-cta="hero">
                  Book a free check
                </ButtonLink>
                <ButtonLink href="#sample" variant="outline">
                  See a sample report
                </ButtonLink>
              </div>
            </div>

            <aside className="ai-peek" aria-label="Example result" data-reveal="fade-up" data-delay={150}>
              <Tag tone="on-dark">{hero.exampleTag}</Tag>
              <p className="ai-peek__q">
                We asked: <b>“{sample.question}”</b> and {sample.similarQuestions} similar questions, {sample.runsEach} times each.
              </p>
              <ul className="ai-peek__rows" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
                {sample.engines.map((engine) => (
                  <li key={engine.name} className="ai-peek__row">
                    <span>{engine.name}</span>
                    <span className="ai-peek__n gg-number">
                      {engine.named} of {SAMPLE_CHECKS_PER_ENGINE}
                    </span>
                    <BandPill named={engine.named} checks={SAMPLE_CHECKS_PER_ENGINE} on="dark" />
                  </li>
                ))}
              </ul>
              <p className="ai-peek__foot">{sample.heroFoot}</p>
            </aside>
          </div>
        </section>

        {/* 02 Why it matters --------------------------------------------------- */}
        <section className="hm-section hm-section--surface ai-stats-section" aria-labelledby="ai-why-title">
          <div className="gg-wrap">
            <h2 className="gg-sr-only" id="ai-why-title">
              Why AI visibility matters
            </h2>
            <ul className="ai-stats" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
              {stats.map((stat) => (
                <li key={stat.value} className="ai-stat">
                  {/* Sourced figures are masked in, never counted up. */}
                  <div data-reveal="line-mask">
                    <SplitHeading as="p" className="gg-number ai-stat__num" text={stat.value} />
                  </div>
                  <p className="ai-stat__label">{stat.label}</p>
                  <p className="ai-stat__src">
                    <span className="gg-sr-only">Source: </span>
                    {stat.source}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 How it works ---------------------------------------------------- */}
        <section id="how" className="hm-section hm-section--canvas ai-how" aria-labelledby="ai-how-title">
          <div className="gg-wrap">
            <SectionHeader tag={how.tag} heading={how.heading} id="ai-how-title" />
            <ol className="ai-steps" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
              {how.steps.map((step, i) => (
                <li key={step.title} className="ai-step">
                  <span className="ai-step__kicker gg-kicker">STEP {i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {"engines" in step ? (
                    <ul className="ai-engines" aria-label="The four assistants we ask">
                      {step.engines.map((engine) => (
                        <li key={engine}>{engine}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 04 Sample report --------------------------------------------------- */}
        <section id="sample" className="hm-section hm-section--surface ai-sample" aria-labelledby="ai-sample-title">
          <div className="gg-wrap">
            <SectionHeader
              tag={sampleSection.tag}
              heading={sampleSection.heading}
              layout="split"
              sub={sampleSection.side}
              id="ai-sample-title"
              subClassName="hm-hide-phone"
            />
            {/* Real content, not aria-hidden: the EXAMPLE DATA pill comes first in the DOM, so it is read first. */}
            <div id="ai-sample-report" className="ai-report" role="group" aria-labelledby="ai-report-title" data-reveal="fade-up">
              <div className="ai-report__head">
                <span className="ai-sample-flag">Example data</span>
                <div>
                  <span className="ai-report__label gg-kicker">
                    AI visibility check · {sample.town} · {sample.period}
                  </span>
                  <h3 id="ai-report-title">
                    {sample.business} was named in {sampleTotals.named} of {sampleTotals.answers} AI answers
                  </h3>
                </div>
              </div>

              <ul className="ai-ecards" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
                {sample.engines.map((engine) => {
                  const [low, high] = wilsonRange(engine.named, SAMPLE_CHECKS_PER_ENGINE);
                  return (
                    <li key={engine.name} className="ai-ecard">
                      <p className="ai-ecard__top">
                        <span>{engine.name}</span>
                        <BandPill named={engine.named} checks={SAMPLE_CHECKS_PER_ENGINE} />
                      </p>
                      <p className="ai-ecard__n gg-number">
                        {engine.named} <small>of {SAMPLE_CHECKS_PER_ENGINE} checks</small>
                      </p>
                      <p className="ai-ecard__range">
                        Likely true rate {low}–{high}%
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="ai-report__cols">
                <div>
                  <h4 className="ai-report__sub gg-kicker">Who AI names instead</h4>
                  <table className="ai-table">
                    <thead>
                      <tr>
                        <th scope="col">Business</th>
                        <th scope="col">Answers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sample.namedInstead.map((row) => (
                        <tr key={row.business}>
                          <td>{row.business}</td>
                          <td>{row.answers}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="ai-report__sub gg-kicker">What to fix first</h4>
                  <ol className="ai-fix">
                    {sample.fixFirst.map((item) => (
                      <li key={item.title}>
                        {item.title}
                        <span>{item.body}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 How we report --------------------------------------------------- */}
        <section className="hm-section hm-section--plum ai-method" aria-labelledby="ai-method-title">
          <div className="gg-wrap ai-method__grid">
            <div className="ai-method__copy" data-reveal="header">
              <Tag tone="on-dark" data-part="tag">
                {method.tag}
              </Tag>
              <SplitHeading as="h2" id="ai-method-title" className="gg-display-m ai-method__title" text={method.h2} />
              <p className="gg-lead ai-method__lead" data-part="sub">
                {method.lede}
              </p>
            </div>
            <ul className="ai-honest" data-reveal="fade-up">
              {method.rows.map((row) => (
                <li key={row.title}>
                  <b>{row.title}</b>
                  <span>{row.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 06 Included -------------------------------------------------------- */}
        <section id="included" className="hm-section hm-section--surface ai-included" aria-labelledby="ai-included-title">
          <div className="gg-wrap">
            <SectionHeader
              tag={included.tag}
              heading={included.heading}
              layout="split"
              id="ai-included-title"
              cta={
                <a className="ai-textlink" href={included.compare.href}>
                  {included.compare.label}
                </a>
              }
            />
            <ul className="ai-inc-grid" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
              <li className="ai-inc ai-inc--feature">
                <h3 className="ai-inc__name">{plus.name}</h3>
                <p className="ai-inc__price">
                  <span className="gg-number">{formatRand(plus.monthly)}</span>
                  <small>/mo</small>
                </p>
                <p className="ai-inc__text">Website, Google profile care and your monthly AI Visibility Report.</p>
                <ul className="ai-feats">
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    10 questions, 4 assistants, 3 runs each
                  </li>
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    Who’s named instead of you
                  </li>
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    Fix Pack at {formatRand(fixPack.priceOnPlus ?? fixPack.price)} instead of {formatRand(fixPack.price)}
                  </li>
                </ul>
                <ButtonLink href="/pricing#monthly" variant="coral" full data-ai-plan={plus.slug}>
                  See {plus.name}
                </ButtonLink>
              </li>
              <li className="ai-inc">
                <h3 className="ai-inc__name">{pro.name}</h3>
                <p className="ai-inc__price">
                  <span className="gg-number">{formatRand(pro.monthly)}</span>
                  <small>/mo</small>
                </p>
                <p className="ai-inc__text">Everything in {plus.name}, measured from three spots around your area.</p>
                <ul className="ai-feats">
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    AI report from 3 locations
                  </li>
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    Competitor table and quarterly call
                  </li>
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    AI Visibility Fix Pack included
                  </li>
                </ul>
                <ButtonLink href="/pricing#monthly" full data-ai-plan={pro.slug}>
                  See {pro.name}
                </ButtonLink>
              </li>
              <li className="ai-inc">
                <h3 className="ai-inc__name">{watch.name}</h3>
                <p className="ai-inc__price">
                  <span className="gg-number">{formatRand(watch.price)}</span>
                  <small>{watch.unit}</small>
                </p>
                <p className="ai-inc__text">Already have a site we built? Add the monthly AI Visibility Report on its own.</p>
                <ul className="ai-feats">
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    Same monthly report
                  </li>
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    Fix Pack from {formatRand(fixPack.price)} once-off
                  </li>
                  <li>
                    <Icon name="check" size={16} stroke={2.4} />
                    Cancel any month
                  </li>
                </ul>
                <ButtonLink href="#book" variant="outline" full data-ai-cta="included" data-ai-plan="visibility-watch">
                  Ask about Watch
                </ButtonLink>
              </li>
            </ul>
          </div>
        </section>

        {/* 07 Book a free check ---------------------------------------------- */}
        <section id="book" className="hm-section hm-section--plum ai-book" aria-labelledby="ai-book-title">
          <div className="gg-wrap ai-book__grid">
            <div className="ai-book__copy" data-reveal="header">
              <Tag tone="on-dark" data-part="tag">
                {book.tag}
              </Tag>
              <SplitHeading as="h2" id="ai-book-title" className="gg-display-m ai-book__title" text={book.h2} />
              <p className="gg-lead ai-book__lead" data-part="sub">
                {book.lede}
              </p>
              <ul className="ai-ticks" data-part="cta">
                {book.ticks.map((line) => (
                  <li key={line}>
                    <Icon name="check" size={14} stroke={2.6} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <AiCheckForm full={counters.full} nextRun={nextRun} />
          </div>
        </section>

        {/* 08 FAQ ------------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ai-faq-section" aria-label="Common questions">
          <div className="gg-wrap">
            <FaqBlock tag={faqHeading.tag} heading={faqHeading.heading} items={faqItems} />
          </div>
        </section>
      </div>

      {/* 09 CTA ---------------------------------------------------------------- */}
      <GradientCta
        variant="inner"
        track="check"
        refSource="ai-visibility"
        primary={{ label: "Book a free check", href: "#book" }}
        headingId="ai-cta-heading"
      />
      <AiStickyBar />
    </GgShell>
  );
}
