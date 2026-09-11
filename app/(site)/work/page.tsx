import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { caseStudies, caseStudyKindLabel } from "@/content/caseStudies";
import { pageSocialMeta } from "@/lib/metadata";

const title = { absolute: "Our Work | GoodGround Website Development" };
const description =
  "Case studies from GoodGround, a website studio in South Africa. Every project ends in numbers measured on the live site, with instructions to check them.";
const path = "/work";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/**
 * Case studies only. Add an entry to content/caseStudies.ts and it appears
 * here in the same order it sits in that array.
 *
 * Deliberately no "featured" project. An earlier version gave the first case
 * study a wide side-by-side treatment above the rest, which reads as "this
 * one matters more" whether or not that's the intent, especially once real
 * client work sits next to concept builds. Every card below gets identical
 * size and weight, so the ordering in the data file is chronological, not a
 * ranking.
 *
 * This page used to lead with a card for the studio's own site, rendering a
 * live Core Web Vitals readout in place of a screenshot. That existed because
 * there was no client work to show. Now that real case studies land here, the
 * self-referential card has been removed rather than left sitting above them.
 *
 * The no-fabrication rule still governs everything below: a project only
 * appears once it is genuinely live, concept builds are labelled as concept
 * builds, and the only numbers quoted are ones a reader can verify.
 */
export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Work", path: "/work" }]} />

      <PageHero
        eyebrow="Our Work"
        title="Built, then measured."
        intro="Every case study here ends in numbers taken from the live site, each one with instructions for checking it yourself. Where a project was a concept build rather than client work, it says so at the top."
      />

      {/* The homepage's own project grid, driven by content/caseStudies.ts
          rather than hand-written markup — same classes, same dark ground,
          same staggered offset column, so the "View all" link on the homepage
          lands somewhere that looks like where it came from. It used to be
          three white cards in a row on cream. */}
      <div className="home-2026">
        <section className="work section-dark section-pad">
          <div className="wrap">
            {caseStudies.length > 0 ? (
              <>
                <div className="project-grid">
                  {caseStudies.map((study, i) => (
                    <article
                      key={study.slug}
                      /* Every other card drops down a column. It is the
                         homepage's rhythm and it is purely visual — DOM order
                         is still the order in caseStudies.ts, so nothing here
                         ranks one project above another. */
                      className={i % 2 === 1 ? "project project-offset reveal" : "project reveal"}
                    >
                      <Link
                        className="project-image project-image-wide"
                        href={`/work/${study.slug}`}
                        aria-label={`View the ${study.client} case study`}
                      >
                        <Image
                          src={study.image}
                          alt={study.imageAlt}
                          width={1440}
                          height={900}
                          // A loading hint for the first card in DOM order.
                          // This is a performance signal, not a ranking: every
                          // card renders at the same size and weight.
                          priority={i === 0}
                          loading={i === 0 ? undefined : "lazy"}
                          sizes="(max-width: 900px) 100vw, 46vw"
                        />
                        {/* The glyph comes from CSS, not a text node. As a
                            text node it is the link's ONLY visible text, and
                            WCAG 2.5.3 then wants the accessible name to
                            contain it — Lighthouse flagged exactly that. A
                            generated glyph is not visible text, so the
                            aria-label stands on its own. Same arrow, same
                            U+FE0E text selector, drawn in the stylesheet. */}
                        <span className="project-open project-open--glyph" aria-hidden="true" />
                      </Link>

                      <div className="project-info">
                        <h2>
                          <Link href={`/work/${study.slug}`}>{study.client}</Link>
                        </h2>
                        <span className="project-kind">{caseStudyKindLabel(study.kind)}</span>
                      </div>

                      <div className="tags">
                        {study.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>

                      <p className="project-description">{study.summary}</p>
                    </article>
                  ))}
                </div>

                <div className="work-next reveal">
                  <div>
                    <h2>Your project could be next</h2>
                    <p>
                      We’re a young studio and we’d rather show you real, testable work than pad
                      this out with stock mock-ups.
                    </p>
                  </div>
                  <Link className="button button-white" href="/start-project">
                    <span>Start your project</span>
                    <span className="button-arrow" aria-hidden="true">
                      {"↗︎"}
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              /* Nothing published yet. Say so plainly rather than filling the
                 space with stock mock-ups or work that isn't ours. */
              <div className="work-next">
                <div>
                  <h2>Case studies are landing here shortly</h2>
                  <p>
                    We would rather show you the real thing once it is live than fill this space
                    with stock mock-ups or work that isn’t ours. Want to be one of the first?
                  </p>
                </div>
                <Link className="button button-orange" href="/start-project">
                  <span>Start your project</span>
                  <span className="button-arrow" aria-hidden="true">
                    {"↗︎"}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
