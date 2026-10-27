import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { ButtonLink } from "@/components/gg/Button";
import { CountUp } from "@/components/gg/CountUp";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { Icon } from "@/components/gg/Icon";
import { Resp } from "@/components/gg/Resp";
import { SectionHeader } from "@/components/gg/SectionHeader";
import { FaqBlock } from "@/components/gg/shared/FaqBlock";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { formatRand } from "@/components/gg/format";
import {
  AXIS,
  EXTRA_ROUND,
  PAY_COLUMNS,
  RUSH,
  STEP_COLORS,
  STEP_NAMES,
  STEP_SHARES,
  afterOptions,
  afterSegments,
  beforeSteps,
  countsAsRound,
  countsAsScope,
  gantt,
  needs,
  payPlans,
  payPlansMobile,
  processFaq,
  quickFacts,
  rounds,
  together,
  tracker,
} from "@/components/gg/process/data";
import { ProcessNav, StepCards } from "@/components/gg/process/ProcessClient";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/process/process.css";

const title = { absolute: "Our Process | How We Build Websites | GoodGround" };
const description =
  "How a GoodGround website gets built, step by step: what we do, what we need from you, what you get, how long it takes and when you pay.";
const path = "/process";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${site.url}${path}`,
  name: "Our process",
  url: `${site.url}${path}`,
  isPartOf: { "@id": `${site.url}/#website` },
};

export default function ProcessPage() {
  return (
    <GgShell crumbs={[{ label: "OUR PROCESS" }]}>
      <div className="pc-page">
        <BreadcrumbSchema trail={[{ name: "Our process", path }]} />
        <FAQSchema items={processFaq.map((i) => ({ question: i.question, answer: i.answer.join(" ") }))} id="process-faq" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

        {/* 01 · Hero + project tracker ------------------------------------------------------ */}
        <section className="hm-section hm-section--canvas pc-hero" aria-labelledby="pc-title">
          <div className="gg-wrap pc-hero__grid">
            <div className="pc-hero__copy" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                OUR PROCESS
              </Tag>
              <SplitHeading as="h1" id="pc-title" className="gg-display-l pc-h1" text="HOW YOUR WEBSITE GETS BUILT, STEP BY STEP." />
              <p className="gg-lead pc-hero__lead" data-part="sub">
                <Resp
                  long="Every project follows the same six steps, run by one team. Here’s exactly what happens at each one: what we do, what we need from you, what you get, how long it takes and when you pay."
                  short="Six steps, one team. What we do, what you do, what you get, how long it takes and when you pay."
                />
              </p>
              <ul className="pc-facts" data-part="cta">
                {quickFacts.map((fact) => (
                  <li key={fact.label} className={fact.value === "1 month" ? "pc-facts__extra" : undefined}>
                    <strong className="gg-number">{fact.to !== null ? <CountUp to={fact.to} /> : fact.value}</strong>
                    <span>
                      <Resp long={fact.label} short={fact.short} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="pc-tracker" data-reveal="group" aria-label="An example project tracker">
              <div className="pc-tracker__head">
                <p>
                  <span>Your project</span>
                  <strong>Grow website</strong>
                </p>
                <Tag tone="on-dark">EXAMPLE</Tag>
              </div>
              <div className="pc-tracker__segs" aria-hidden="true">
                {tracker.segments.map((state, i) => (
                  <span key={i} className={state ? `is-${state}` : undefined} style={{ "--i": i } as CSSProperties} />
                ))}
              </div>
              <div className="pc-tracker__now">
                <span className="pc-tracker__eye" aria-hidden="true">
                  <Icon name="eye" size={18} stroke={2} />
                </span>
                <p>
                  <strong>Step 3 of 6 · Design</strong>
                  <span>First homepage design ready for your review</span>
                </p>
              </div>
              <ul className="pc-tracker__list">
                {tracker.rows.map((row, i) => (
                  <li key={row.title} className={row.done ? "is-done" : undefined} style={{ "--i": i } as CSSProperties}>
                    <span aria-hidden="true">
                      <Icon name="check" size={13} stroke={3} />
                    </span>
                    <p>
                      <strong>{row.title}</strong>
                      <small>{row.sub}</small>
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <div className="pc-zone">
          <ProcessNav />

          {/* 03 · Before we start ---------------------------------------------------------- */}
          <section id="before-we-start" className="hm-section hm-section--canvas pc-before" aria-labelledby="pc-before-title">
            <div className="gg-wrap">
              <SectionHeader
                tag="00 / BEFORE WE START"
                heading="From “yes” to kick-off."
                layout="split"
                id="pc-before-title"
                sub="Three short steps before the clock starts on your project."
                subClassName="hm-hide-phone"
              />
              <ol className="pc-before__row" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
                {beforeSteps.map((step, i) => (
                  <li key={step.title} className="pc-before__slot">
                    <div className="pc-before__card">
                      <span className="pc-before__chip" aria-hidden="true">
                        <Icon name={step.icon} size={22} stroke={2} />
                      </span>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      <p className="pc-before__note">{step.note}</p>
                    </div>
                    {i < beforeSteps.length - 1 ? (
                      <span className="pc-before__arrow" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 04 · Timelines by package ---------------------------------------------------------- */}
          <section className="hm-section hm-section--surface pc-time" aria-labelledby="pc-time-title">
            <div className="gg-wrap">
              <SectionHeader
                tag="HOW LONG IT TAKES"
                heading="Your timeline depends on your package."
                layout="split"
                id="pc-time-title"
                sub="Typical durations from kick-off to launch. Your exact dates are confirmed at kick-off and shown in your project plan."
                subClassName="hm-hide-phone"
              />

              {/* Desktop: the Gantt chart. */}
              <div className="pc-gantt" data-reveal="group">
                <div className="pc-gantt__axis" aria-hidden="true">
                  {AXIS.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
                {gantt.map((row, r) => (
                  <div key={row.name} className="pc-gantt__row" style={{ "--row": r } as CSSProperties}>
                    <p className="pc-gantt__label">
                      <strong>{row.name}</strong>
                      <span>{row.duration}</span>
                    </p>
                    <div className="pc-gantt__track" role="list" aria-label={`${row.name}: ${row.duration}`}>
                      {row.segments.map((segment, s) => (
                        <span
                          key={s}
                          role="listitem"
                          tabIndex={0}
                          className={s === 5 ? "pc-gantt__bar is-support" : "pc-gantt__bar"}
                          style={
                            {
                              left: `${segment.left}%`,
                              width: `${segment.width}%`,
                              "--seg": s,
                              "--bar": STEP_COLORS[s],
                            } as CSSProperties
                          }
                          data-tip={s === 5 ? "Beyond launch · one month of support, included" : `${STEP_NAMES[s]} · about ${STEP_SHARES[s]}% of your timeline`}
                          aria-label={s === 5 ? "Beyond launch, one month of support" : `${STEP_NAMES[s]}, about ${STEP_SHARES[s]} percent of your timeline`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <ul className="pc-gantt__legend">
                  {STEP_NAMES.map((name, i) => (
                    <li key={name}>
                      <i style={{ background: STEP_COLORS[i] }} className={i === 5 ? "is-support" : undefined} aria-hidden="true" />
                      {i === 5 ? "Beyond launch (1 month, after launch)" : name}
                    </li>
                  ))}
                </ul>
                <p className="pc-gantt__note">
                  Step proportions are indicative. Rush delivery ({formatRand(RUSH)}) cuts about a week; late content or feedback moves dates, not the price.
                </p>
              </div>

              {/* Below 1100px: one bar per package. */}
              <ul className="pc-bars" data-reveal="group" aria-label="Typical duration by package">
                {gantt.map((row, i) => (
                  <li key={row.name} style={{ "--i": i } as CSSProperties}>
                    <p>
                      <strong>{row.name}</strong>
                      <span>{row.duration}</span>
                    </p>
                    <span className="pc-bars__track" aria-hidden="true">
                      <i style={{ width: `${row.mobile}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 05 · The six steps ------------------------------------------------------------------ */}
          <section className="hm-section hm-section--canvas pc-steps-section" aria-labelledby="pc-steps-title">
            <div className="gg-wrap">
              <SectionHeader tag="THE SIX STEPS" tagTone="coral" heading="Every step, in detail." id="pc-steps-title" />
              <StepCards />
            </div>
          </section>
        </div>

        {/* 06 · When you pay -------------------------------------------------------------------------- */}
        <section className="hm-section hm-section--plum pc-pay" aria-labelledby="pc-pay-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="WHEN YOU PAY"
              tagTone="on-dark"
              heading="Payments, mapped to the work."
              layout="split"
              id="pc-pay-title"
              onDark
              sub="One fixed price either way. Here’s exactly when each payment falls."
              subClassName="hm-hide-phone"
            />

            <div className="pc-paytable-wrap" data-reveal="group">
              <table className="pc-paytable">
                <caption className="gg-sr-only">When each payment falls, by plan</caption>
                <thead>
                  <tr>
                    <th scope="col" className="pc-paytable__plan gg-kicker">
                      STEP
                    </th>
                    {PAY_COLUMNS.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payPlans.map((plan, r) => (
                    <tr key={plan.name}>
                      <th scope="row" className="pc-paytable__plan">
                        <strong>{plan.name}</strong>
                        <span>{plan.sub}</span>
                      </th>
                      {plan.cells.map((cell, c) => (
                        <td key={c}>
                          {cell ? (
                            <span
                              className={cell.due ? "pc-block is-due" : "pc-block"}
                              style={{ "--d": `${c * 100 + r * 150}ms` } as CSSProperties}
                            >
                              <strong className="gg-number">{cell.amount}</strong>
                              <small>{cell.caption}</small>
                            </span>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="pc-paycards">
              {payPlansMobile.map((plan) => (
                <li key={plan.name}>
                  <strong>{plan.name}</strong>
                  <span>
                    <i>{plan.a}</i>
                    <i>{plan.b}</i>
                  </span>
                </li>
              ))}
            </ul>

            <p className="pc-pay__note">
              Instalments 2–12 only begin once your site is completed; if the build takes longer because of us, your payments wait too.
            </p>
          </div>
        </section>

        {/* 07 · Revisions -------------------------------------------------------------------------------- */}
        <section className="hm-section hm-section--surface pc-rev" aria-labelledby="pc-rev-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="REVISIONS"
              heading="Clear rounds, so feedback never drags on."
              layout="split"
              id="pc-rev-title"
              sub="A round is one combined set of feedback from your final approver, which we then apply in full."
              subClassName="hm-hide-phone"
            />
            <div className="pc-rev__grid" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
              <div className="pc-rounds">
                <div className="pc-rounds__head gg-kicker">
                  <span>Package</span>
                  <span>Rounds included</span>
                </div>
                {rounds.map((row) => (
                  <div key={row.name} className="pc-rounds__row">
                    <span>{row.name}</span>
                    <strong className="gg-number">{row.rounds}</strong>
                  </div>
                ))}
                <div className="pc-rounds__row">
                  <span>Extra round</span>
                  <strong className="gg-number is-coral">{formatRand(EXTRA_ROUND)} each</strong>
                </div>
              </div>

              <ul className="pc-rounds-tiles" aria-label="Revision rounds by package">
                {rounds.map((row) => (
                  <li key={row.name}>
                    <strong className="gg-number">{row.rounds}</strong>
                    <span>{row.name}</span>
                  </li>
                ))}
              </ul>
              <p className="pc-rounds-extra">Extra rounds {formatRand(EXTRA_ROUND)} each.</p>

              <div className="pc-rev__cards">
                <div className="pc-count pc-count--yes">
                  <h3>Counts as one round</h3>
                  <ul>
                    {countsAsRound.map((line) => (
                      <li key={line}>
                        <span aria-hidden="true">
                          <Icon name="check" size={11} stroke={3} />
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pc-count pc-count--no">
                  <h3>Counts as new scope (quoted first)</h3>
                  <ul>
                    {countsAsScope.map((line) => (
                      <li key={line}>
                        <span aria-hidden="true">
                          <Icon name="x" size={11} stroke={3} />
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 08 · Your part ----------------------------------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas pc-needs" aria-labelledby="pc-needs-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="YOUR PART"
              heading="What we need from you, and when."
              layout="split"
              id="pc-needs-title"
              sub="Most delays come from waiting on content. Here’s everything up front, so nothing catches you out."
              subClassName="hm-hide-phone"
            />
            <ul className="pc-needs__list" data-reveal="stagger" style={{ "--gg-stagger-step": "60ms" } as CSSProperties}>
              {needs.map((need) => (
                <li key={need.text}>
                  <span className="pc-needs__chip" aria-hidden="true">
                    <Icon name={need.icon} size={20} stroke={2} />
                  </span>
                  <span className="pc-needs__text">
                    <Resp long={need.text} short={need.short} />
                  </span>
                  <span className="pc-needs__when">
                    <Resp long={need.when} short={need.shortWhen} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="pc-needs__note">
              <span aria-hidden="true">
                <Icon name="clock" size={16} stroke={2} />
              </span>
              We ask for feedback within 3 working days of each review link. Late content or feedback moves the launch date, never the price.
            </p>
          </div>
        </section>

        {/* 09 · Working together ------------------------------------------------------------------------------- */}
        <section className="hm-section hm-section--surface pc-together" aria-labelledby="pc-together-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="WORKING TOGETHER"
              heading="One team. One project lead. No chasing."
              layout="split"
              id="pc-together-title"
              sub="You always know who’s working on your site and what’s happening next."
              subClassName="hm-hide-phone"
            />
            <ul className="pc-together__grid" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
              {together.map((item) => (
                <li key={item.title}>
                  <span className="pc-together__chip" aria-hidden="true">
                    <Icon name={item.icon} size={22} stroke={2} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 10 · After launch ---------------------------------------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas pc-after" aria-labelledby="pc-after-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="AFTER LAUNCH"
              heading="Launch is the start, not the finish line."
              layout="split"
              id="pc-after-title"
              sub="Your first month of support is included. After that, choose how much you’d like us to look after."
              subClassName="hm-hide-phone"
            />
            <ol className="pc-after__strip" data-reveal="group">
              {afterSegments.map((segment, i) => (
                <li key={segment.label} className={`pc-after__seg pc-after__seg--${segment.tone}`} style={{ "--i": i } as CSSProperties}>
                  <span className="gg-kicker">{segment.label}</span>
                  <strong>{segment.text}</strong>
                </li>
              ))}
            </ol>
            <ul className="pc-after__options" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
              {afterOptions.map((option) => (
                <li key={option.title} className={`pc-opt pc-opt--${option.tone}`}>
                  <span className="pc-opt__chip" aria-hidden="true">
                    <Icon name={option.icon} size={24} stroke={2} />
                  </span>
                  <h3>{option.title}</h3>
                  <p>{option.body}</p>
                  <span className="pc-opt__price">
                    <Icon name="wallet" size={14} stroke={2.2} />
                    {option.price}
                  </span>
                  <ButtonLink href={option.button.href} variant={option.button.variant} className="pc-opt__btn">
                    {option.button.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 11 · Process FAQ ---------------------------------------------------------------------------------------------- */}
        <section className="hm-section hm-section--surface pc-faq-section" aria-label="Questions about how it works">
          <div className="gg-wrap">
            <FaqBlock
              tag="PROCESS QUESTIONS"
              heading="Questions about how it works."
              items={processFaq}
              onSurface
              cta={
                <ButtonLink href="/faq" variant="outline">
                  All FAQs
                </ButtonLink>
              }
            />
          </div>
        </section>
      </div>

      {/* 12 · CTA ------------------------------------------------------------------------------------------------------------- */}
      <GradientCta
        variant="home"
        tag="READY WHEN YOU ARE"
        headline="STEP ONE IS A CONVERSATION."
        sub="Tell us about your business. We’ll come back with a fixed price, a timeline and the dates for every step."
        primary={{ label: "Start your project", href: "/start-project?ref=process" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </GgShell>
  );
}
