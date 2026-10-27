import type { CSSProperties } from "react";
import Image from "next/image";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { CountUp } from "@/components/gg/CountUp";
import { GgShell } from "@/components/gg/GgShell";
import { Icon } from "@/components/gg/Icon";
import { formatRand } from "@/components/gg/format";
import { ButtonLink } from "@/components/gg/Button";
import { LinkedCard, ArrowChip } from "@/components/gg/LinkedCard";
import { Resp } from "@/components/gg/Resp";
import { SectionHeader } from "@/components/gg/SectionHeader";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { AvailabilityButton } from "@/components/gg/launch/AvailabilityButton";
import {
  afterTwelve,
  criteria,
  getAvailability,
  heroChecklist,
  keyFacts,
  launchFaqItems,
  launchWorkSlugs,
  moments,
  steps,
  terms,
} from "@/components/gg/launch/data";
import { EligibilityChecker } from "@/components/gg/launch/EligibilityChecker";
import { IncludedGroups } from "@/components/gg/launch/IncludedGroups";
import { LaunchFaq } from "@/components/gg/launch/LaunchFaq";
import { LaunchForm } from "@/components/gg/launch/LaunchForm";
import { StickyBar } from "@/components/gg/launch/StickyBar";
import { workProjects } from "@/components/gg/work/data";
import { launchOffer, launchRoute } from "@/content/websiteLaunch";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/launch/launch.css";

export const metadata: Metadata = {
  title: { absolute: launchRoute.title },
  description: launchRoute.description,
  alternates: { canonical: launchRoute.path },
  ...pageSocialMeta({ title: { absolute: launchRoute.title }, description: launchRoute.description, path: launchRoute.path }),
};

/**
 * Offer per the Figma note: price 950 ZAR a month, a 12-month term, the
 * eligibility, and availability read from the same data as the page (InStock or
 * SoldOut). NOTE the term and total are the open question in
 * content/websiteLaunch.ts (launchTerms).
 */
function LaunchSchema() {
  const availability = getAvailability();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: launchOffer.name,
    serviceType: "Website design and development for new businesses",
    description: launchRoute.description,
    url: `${site.url}${launchRoute.path}`,
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
    areaServed: { "@type": "Country", name: "South Africa" },
    audience: { "@type": "Audience", audienceType: "New businesses without an existing website" },
    offers: {
      "@type": "Offer",
      name: launchOffer.name,
      description: `${launchOffer.eligibility} ${launchOffer.includedFees}`,
      priceCurrency: "ZAR",
      availability: availability.soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      eligibleCustomerType: "New businesses without a website",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: terms.monthly,
        priceCurrency: "ZAR",
        unitCode: "MON",
        billingDuration: terms.months,
      },
      url: `${site.url}${launchRoute.path}`,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function Meter({ availability, size }: { availability: ReturnType<typeof getAvailability>; size: "lg" | "sm" }) {
  const { month, total, taken, left, soldOut } = availability;
  return (
    <div className={`ln-meter ln-meter--${size}`} data-reveal="fill">
      <p className="ln-meter__row">
        <span>{month} intake</span>
        <strong className={soldOut ? "is-full" : undefined}>
          {soldOut ? (
            "Fully booked"
          ) : (
            <>
              <span className="gg-resp-long">
                {left} of {total} spots left
              </span>
              <span className="gg-resp-short">
                {left} of {total} left
              </span>
            </>
          )}
        </strong>
      </p>
      <div
        className="ln-meter__segments"
        role="img"
        aria-label={`${taken} of ${total} ${month} spots taken`}
        style={{ "--total": total } as CSSProperties}
      >
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={soldOut ? "is-full" : i < taken ? "is-taken" : undefined} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

export default function WebsiteLaunchPage() {
  const availability = getAvailability();
  const projects = launchWorkSlugs
    .map((slug) => workProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <GgShell crumbs={[{ label: "WEBSITE LAUNCH OFFER" }]} footer={{ stickyBar: true }}>
      <div className="ln-page">
        <BreadcrumbSchema trail={[{ name: "Website launch offer", path: launchRoute.path }]} />
        <FAQSchema items={launchFaqItems.map((i) => ({ question: i.question, answer: i.answer.join(" ") }))} id="launch-faq" />
        <LaunchSchema />

        {/* 01 · Hero + offer card ------------------------------------------------ */}
        <section id="gg-launch-hero" className="hm-section hm-section--canvas ln-hero" aria-labelledby="ln-title">
          <div className="gg-wrap">
            <div className="ln-hero__grid">
              <div className="ln-hero__copy" data-reveal="header">
                <div className="ln-hero__tags" data-part="tag">
                  <Tag tone="coral" className="ln-hero__tag">
                    FOR NEW BUSINESSES WITHOUT A WEBSITE
                  </Tag>
                  <span className={availability.soldOut ? "ln-pill is-full" : "ln-pill"}>
                    <i aria-hidden="true" />
                    {availability.pill}
                  </span>
                </div>
                <SplitHeading as="h1" id="ln-title" className="gg-display-l ln-h1" text="LAUNCH YOUR FIRST WEBSITE FOR R950 A MONTH." />
                <p className="gg-lead ln-hero__lead" data-part="sub">
                  <Resp
                    long="Give your new business a professional place online, designed to help customers understand your services, trust your business and get in touch. We handle the planning, design and launch. You focus on getting your business started."
                    short="For new businesses without a website. We plan, design and launch it; you focus on your business."
                  />
                </p>
                <div className="ln-hero__buttons" data-part="cta">
                  <AvailabilityButton placement="hero" />
                  <ButtonLink href="#whats-included" variant="outline">
                    What’s included
                  </ButtonLink>
                </div>
              </div>

              <div id="ln-offer-card" className={availability.soldOut ? "ln-card is-sold-out" : "ln-card"} data-reveal="fade-up" data-delay={150}>
                <div className="ln-card__head">
                  <p className="ln-card__name">Website Launch</p>
                  {availability.soldOut ? null : <Tag tone="coral">NO DEPOSIT</Tag>}
                </div>
                <div className="ln-card__price" data-reveal="line-mask">
                  <SplitHeading as="p" className="gg-number ln-card__amount" text={launchOffer.price} />
                  <span className="ln-card__period">
                    <span className="gg-resp-long">/ month</span>
                    <span className="gg-resp-short">/ month · 12 months</span>
                  </span>
                </div>

                {availability.soldOut ? null : (
                  <>
                    <dl className="ln-maths">
                      <div>
                        <dt className="gg-sr-only">Monthly</dt>
                        <dd>
                          <strong>R{terms.monthly}</strong>
                          <span>monthly</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="gg-sr-only">Months</dt>
                        <dd>
                          <strong>× {terms.months}</strong>
                          <span>months</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="gg-sr-only">Total</dt>
                        <dd className="is-total">
                          <strong>
                            <CountUp to={terms.total} prefix="R" />
                          </strong>
                          <span>total</span>
                        </dd>
                      </div>
                    </dl>
                    <dl className="ln-tiles">
                      <div>
                        <dt className="gg-sr-only">Total</dt>
                        <dd>
                          <strong>{formatRand(terms.total)}</strong>
                          <span>total</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="gg-sr-only">Deposit</dt>
                        <dd>
                          <strong>R{terms.deposit}</strong>
                          <span>deposit</span>
                        </dd>
                      </div>
                    </dl>
                    <ul className="ln-checks">
                      {heroChecklist.map((item, i) => (
                        <li key={item.long} style={{ "--i": i } as CSSProperties}>
                          <span className="ln-checks__chip" aria-hidden="true">
                            <Icon name="check" size={11} stroke={3} />
                          </span>
                          <Resp long={item.long} short={item.short} />
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Meter availability={availability} size="lg" />

                {availability.soldOut ? (
                  <p className="ln-next">
                    <span aria-hidden="true">
                      <Icon name="bell" size={15} stroke={2.2} />
                    </span>
                    Next opening: {availability.nextMonth}, {availability.total} spots.
                  </p>
                ) : null}

                <AvailabilityButton placement="offer-card" full />
                {availability.soldOut ? null : (
                  <p className="ln-card__fine">No obligation. We confirm availability and fit before you book.</p>
                )}
              </div>
            </div>

            <ul className="ln-facts" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
              {keyFacts.map((fact) => (
                <li key={fact.title}>
                  <span className="ln-facts__icon" aria-hidden="true">
                    <Icon name={fact.icon} size={20} stroke={2} />
                  </span>
                  <span>
                    <strong>{fact.title}</strong>
                    <span>{fact.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 02 · Why it matters ---------------------------------------------------- */}
        <section className="hm-section hm-section--surface ln-journey" aria-label="Why it matters">
          <div className="gg-wrap">
            <SectionHeader
              tag="WHY IT MATTERS"
              heading="Give people a clear next step when they hear about your business."
              layout="split"
              sub="We plan your first website around these three moments, so potential customers can understand your business and act with confidence."
              subClassName="hm-hide-phone"
            />
            <ol className="ln-moments" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
              {moments.map((moment, i) => (
                <li key={moment.n} className="ln-moment-slot">
                  <div className={`ln-moment ln-moment--${moment.tone}`}>
                    <span className="ln-moment__n">{moment.n}</span>
                    <span className="ln-moment__icon" aria-hidden="true">
                      <Icon name={moment.icon} size={24} stroke={2} />
                    </span>
                    <h3>{moment.title}</h3>
                    <p>{moment.body}</p>
                  </div>
                  {i < moments.length - 1 ? (
                    <span className="ln-moment__arrow" aria-hidden="true">
                      <Icon name="chev" size={18} stroke={2.2} />
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 03 · Is this you? ------------------------------------------------------ */}
        <section className="hm-section hm-section--canvas ln-eligible" aria-labelledby="ln-eligible-title">
          <div className="gg-wrap ln-eligible__grid">
            <div className="ln-eligible__copy">
              <SectionHeader tag="IS THIS YOU?" tagTone="plum" heading="Made for brand-new businesses." headingClass="gg-h2 ln-h2" id="ln-eligible-title" />
              <ul className="ln-criteria" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
                {criteria.yes.map((line, i) => (
                  <li key={line} className="is-yes">
                    <span className="ln-criteria__chip" aria-hidden="true">
                      <Icon name="check" size={14} stroke={2.8} />
                    </span>
                    <Resp long={line} short={criteria.yesShort[i]} />
                  </li>
                ))}
                <li className="is-no">
                  <span className="ln-criteria__chip" aria-hidden="true">
                    <Icon name="x" size={14} stroke={2.8} />
                  </span>
                  <Resp long={criteria.no} short={criteria.noShort} />
                </li>
              </ul>
            </div>
            <div className="ln-eligible__checker" data-reveal="fade-up">
              <EligibilityChecker />
            </div>
          </div>
        </section>

        {/* 04 · What's included --------------------------------------------------- */}
        <section id="whats-included" className="hm-section hm-section--surface ln-included" aria-labelledby="ln-included-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="WHAT’S INCLUDED"
              heading="Your first website, with the setup handled."
              layout="split"
              id="ln-included-title"
              sub="An agreed scope, a planned launch and a website designed around your business goals, through one clear process."
              subClassName="hm-hide-phone"
            />
            <IncludedGroups />
            <div className="ln-summary" data-reveal="fade-up">
              <p>That’s your whole first website: planned, built, launched and submitted to Google.</p>
              <AvailabilityButton placement="inclusions" />
            </div>
          </div>
        </section>

        {/* 05 · The numbers ------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ln-numbers" aria-labelledby="ln-numbers-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="THE NUMBERS"
              tagTone="coral"
              heading="R950 a month. No deposit. No surprises."
              layout="split"
              id="ln-numbers-title"
              sub="One clear monthly amount for 12 months, and a simple choice when the year ends."
              subClassName="hm-hide-phone"
            />
            <div className="ln-money">
              <div className="ln-timeline" data-reveal="group">
                <div className="ln-timeline__head">
                  <h3>Your 12 payments</h3>
                  <p className="gg-number">
                    <CountUp to={terms.total} prefix="R" /> total
                  </p>
                </div>
                <ol className="ln-bars" aria-label="Twelve monthly payments of R950">
                  {Array.from({ length: terms.months }, (_, i) => (
                    <li key={i} style={{ "--i": i } as CSSProperties}>
                      <span className={i === 0 ? "ln-bars__bar is-first" : "ln-bars__bar"} />
                      <span className="ln-bars__label">M{i + 1}</span>
                    </li>
                  ))}
                </ol>
                <ul className="ln-ticks">
                  {[`R${terms.monthly} each month`, "Domain, hosting and email fees included", "No deposit upfront"].map((line) => (
                    <li key={line}>
                      <Icon name="check" size={14} stroke={2.6} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ln-after" data-reveal="fade-up" data-delay={120}>
                <h3>After month 12, you choose</h3>
                <ul>
                  {afterTwelve.map((choice) => (
                    <li key={choice.title}>
                      <span className="ln-after__icon" aria-hidden="true">
                        <Icon name={choice.icon} size={18} stroke={2} />
                      </span>
                      <span>
                        <strong>{choice.title}</strong>
                        <span>{choice.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 06 · Our approach ------------------------------------------------------ */}
        <section className="hm-section hm-section--surface ln-work" aria-labelledby="ln-work-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="OUR APPROACH"
              heading="See how we approach website design."
              layout="split"
              id="ln-work-title"
              sub="Open a project. Try the navigation. Follow the enquiry process."
              subClassName="hm-hide-phone"
            />
            <ul className="ln-work__grid" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
              {projects.map((project) => (
                <li key={project.slug}>
                  <LinkedCard href={`/work/${project.slug}`} className="ln-wcard">
                    <span className="ln-wcard__img gg-card__cover">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={720}
                        height={440}
                        sizes="(min-width: 1200px) 360px, (min-width: 768px) 33vw, 100vw"
                        className="ln-wcard__pic"
                      />
                    </span>
                    <span className="ln-wcard__row">
                      <span className="ln-wcard__text">
                        <span className="ln-wcard__title">{project.title}</span>
                        <span className="ln-wcard__type">{project.kind === "studio" ? "Our own site" : "Concept build"}</span>
                      </span>
                      <ArrowChip size={36} />
                    </span>
                  </LinkedCard>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 07 · Intake ------------------------------------------------------------ */}
        <section className="hm-section hm-section--canvas ln-intake" aria-labelledby="ln-intake-title">
          <div className="gg-wrap ln-intake__grid">
            <div className="ln-intake__copy" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                LIMITED INTAKE
              </Tag>
              <SplitHeading as="h2" id="ln-intake-title" className="gg-h2 ln-h2" text="Two new businesses each month." />
              <p className="gg-lead" data-part="sub">
                We open two spaces through this promotion each month, so every business gets proper time for planning, design,
                development and testing. Once they’re booked, we’ll discuss the next available intake with you.
              </p>
            </div>
            <div className="ln-calendar" data-reveal="group">
              <h3>Upcoming intakes</h3>
              <ul>
                {availability.intakes.map((intake, i) => (
                  <li key={intake.label} className={intake.filled > 0 ? "has-filled" : undefined} style={{ "--i": i } as CSSProperties}>
                    <span className="ln-calendar__month">{intake.label}</span>
                    <span className="ln-calendar__dots" aria-hidden="true">
                      {Array.from({ length: availability.total }, (_, d) => (
                        <i key={d} className={d < intake.filled ? "is-filled" : undefined} style={{ "--d": d } as CSSProperties} />
                      ))}
                    </span>
                    <span className="ln-calendar__status">
                      {intake.open === 0 ? "Fully booked" : `${intake.open} spot${intake.open === 1 ? "" : "s"} ${intake.filled > 0 ? "left" : "open"}`}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="ln-calendar__note">Filled spots shown in coral.</p>
            </div>
          </div>
        </section>

        {/* 08 · How it works ------------------------------------------------------ */}
        <section className="hm-section hm-section--surface ln-steps-section" aria-labelledby="ln-steps-title">
          <div className="gg-wrap">
            <SectionHeader tag="HOW IT WORKS" heading="From your business idea to your first website." id="ln-steps-title" />
            <ol className="ln-steps" data-reveal="group">
              {steps.map((step, i) => (
                <li key={step.n} className={i === steps.length - 1 ? "is-last" : undefined} style={{ "--i": i } as CSSProperties}>
                  <div className="ln-steps__rail">
                    <span className="ln-steps__dot">{step.n}</span>
                    <span className="ln-steps__line" aria-hidden="true" />
                  </div>
                  <div className="ln-steps__card">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 09 · FAQ --------------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ln-faq-section" aria-label="Your questions, answered">
          <div className="gg-wrap">
            <LaunchFaq />
          </div>
        </section>

        {/* 10 · Check availability (form) ------------------------------------------ */}
        <section id="check-availability" className="hm-section hm-section--plum ln-form-section" aria-labelledby="ln-form-title">
          <div className="gg-wrap ln-form-grid">
            <div className="ln-form-copy" data-reveal="header">
              <Tag tone="on-dark" data-part="tag">
                {availability.soldOut ? "JOIN THE WAITLIST" : "CHECK AVAILABILITY"}
              </Tag>
              <SplitHeading
                as="h2"
                id="ln-form-title"
                className="gg-display-m ln-form-title"
                text={availability.soldOut ? `JOIN THE ${availability.nextMonth.toUpperCase()} WAITLIST.` : "GET YOUR FIRST BUSINESS WEBSITE UNDERWAY."}
              />
              <p className="gg-lead ln-form-lead" data-part="sub">
                R950 a month, with domain, hosting and email fees included for the first 12 months. Exclusively for new businesses
                without a website.
              </p>
              <p className="ln-banner" data-part="sub">
                <i aria-hidden="true" />
                {availability.soldOut
                  ? `${availability.month} is fully booked. Tell us about your business and we’ll add you to the ${availability.nextMonth} waitlist.`
                  : `${availability.left} slot${availability.left === 1 ? "" : "s"} left for ${availability.month}. Tell us about your business and we’ll confirm whether ${availability.left === 1 ? "it’s" : "they’re"} still open.`}
              </p>
              <ul className="ln-form-ticks" data-part="cta">
                {["Takes about a minute", "Commits you to nothing", "We reply about availability and next steps"].map((line) => (
                  <li key={line}>
                    <Icon name="check" size={14} stroke={2.6} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <LaunchForm />
          </div>
        </section>

        <StickyBar />
      </div>
    </GgShell>
  );
}
