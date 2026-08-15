import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { caseStudies } from "@/content/caseStudies";
import { pageSocialMeta } from "@/lib/metadata";

const title = { absolute: "Our Work | GoodGround Website Development" };
const description =
  "Case studies from GoodGround, a website development studio in George, South Africa. Every project ends in numbers measured on the live site, with instructions for checking them yourself.";
const path = "/work";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/**
 * Case studies only. Add an entry to content/caseStudies.ts and it appears
 * here: the first one gets the wide feature treatment, the rest fill the grid
 * below, so ordering in that array is the ordering on this page.
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
  const [featured, ...rest] = caseStudies;

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Work", path: "/work" }]} />

      <PageHero
        eyebrow="Our Work"
        title="Built, then measured."
        intro="Every case study here ends in numbers taken from the live site, each one with instructions for checking it yourself. Where a project was a concept build rather than client work, it says so at the top."
      />

      {/* pb-[24vw]: reserves room for the footer's CloudDivider, which scales
          with viewport width. Same reservation every other page here makes. */}
      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[1434px]">
          {featured ? (
            <>
              {/* Feature: first case study, image and copy side by side. */}
              <RevealSection>
                <article className="rounded-block ring-ht-pink shadow-[0_18px_0_0_var(--color-ht-pink)] overflow-hidden bg-white ring-2">
                  <div className="grid lg:grid-cols-2">
                    {/* object-contain, not cover: this is a screenshot of a
                        website, and cropping it slices the client's own logo off
                        the edge. The shot is on white and so is the card, so the
                        letterboxing is invisible. */}
                    <Link
                      href={`/work/${featured.slug}`}
                      className="flex items-center justify-center bg-white p-6 lg:order-2 lg:p-8"
                    >
                      <Image
                        src={featured.image}
                        alt={featured.imageAlt}
                        width={1440}
                        height={900}
                        priority
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="rounded-card h-auto w-full object-contain"
                      />
                    </Link>

                    <div className="p-8 sm:p-12 lg:order-1 lg:p-14">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="bg-ht-orange text-ink font-ht-display rounded-pill px-3 py-1 text-[12px] font-bold tracking-[0.08em] uppercase">
                          {featured.client}
                        </span>
                        <span className="border-ht-purple/25 text-ht-purple/80 rounded-pill border px-3 py-1 text-[12px] font-medium">
                          {featured.kind === "concept" ? "Concept build" : "Client project"}
                        </span>
                        <span className="text-ht-purple/70 text-[13px] font-medium">
                          {featured.year}
                        </span>
                      </div>

                      <h2 className="font-ht-display text-ht-purple mt-7 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.08] font-bold">
                        {featured.title}
                      </h2>
                      <SplitWords
                        as="p"
                        text={featured.summary}
                        className="text-ht-purple/75 mt-5 max-w-[54ch] text-[15px] leading-[1.7]"
                      />

                      <ul className="mt-7 flex flex-wrap gap-2">
                        {featured.tags.map((t) => (
                          <li
                            key={t}
                            className="font-ht-body border-ht-purple/20 text-ht-purple/80 rounded-pill border px-4 py-1.5 text-[13px] font-medium"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <MagneticButton>
                          <Link
                            href={`/work/${featured.slug}`}
                            className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03]"
                          >
                            Read the case study
                          </Link>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </article>
              </RevealSection>

              {/* Everything after the first one. */}
              {rest.length > 0 ? (
                <RevealStagger className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3" y={16}>
                  {rest.map((study) => (
                    <article
                      key={study.slug}
                      className="rounded-card ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] flex h-full flex-col overflow-hidden bg-white ring-2"
                    >
                      <Link href={`/work/${study.slug}`} className="block">
                        <Image
                          src={study.image}
                          alt={study.imageAlt}
                          width={1440}
                          height={900}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
                          className="h-auto w-full"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium">
                          <span className="bg-ht-orange/10 text-ht-crimson rounded-pill px-3 py-1 font-bold">
                            {study.client}
                          </span>
                          <span className="border-ht-purple/20 text-ht-purple/70 rounded-pill border px-3 py-1">
                            {study.kind === "concept" ? "Concept build" : "Client project"}
                          </span>
                        </div>
                        <h3 className="font-ht-display text-ht-purple mt-5 text-[clamp(1.15rem,2vw,1.45rem)] leading-tight font-bold">
                          {study.title}
                        </h3>
                        <p className="text-ht-purple/70 mt-3 flex-1 text-[15px] leading-[1.6]">
                          {study.summary}
                        </p>
                        <Link
                          href={`/work/${study.slug}`}
                          className="text-ht-crimson mt-6 inline-flex items-center gap-2 text-[14px] font-bold"
                        >
                          Read the case study
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </RevealStagger>
              ) : null}
            </>
          ) : (
            /* Nothing published yet. Say so plainly rather than filling the
               space with stock mock-ups or work that isn't ours. */
            <RevealSection>
              <div className="border-ht-purple/15 rounded-block border-2 border-dashed p-8 text-center sm:p-12">
                <p className="font-ht-display text-ht-purple text-[clamp(1.15rem,2.2vw,1.6rem)] leading-snug font-bold">
                  Case studies are landing here shortly.
                </p>
                <p className="text-ht-purple/70 mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.7]">
                  We would rather show you the real thing once it is live than fill this space with
                  stock mock-ups or work that isn&rsquo;t ours. Want to be one of the first?
                </p>
                <div className="mt-7">
                  <MagneticButton>
                    <Link
                      href="/start-project"
                      className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03]"
                    >
                      Start Your Project
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </RevealSection>
          )}
        </div>
      </section>
    </>
  );
}
