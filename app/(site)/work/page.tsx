import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
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

      {/* pb-[24vw]: reserves room for the footer's CloudDivider, which scales
          with viewport width. Same reservation every other page here makes. */}
      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[1434px]">
          {caseStudies.length > 0 ? (
            <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" y={16}>
              {caseStudies.map((study, i) => (
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
                      // Only the first card in DOM order gets a loading hint;
                      // this is a performance signal, not a visual ranking.
                      // Every card below renders at identical size and weight.
                      priority={i === 0}
                      loading={i === 0 ? undefined : "lazy"}
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
                        {caseStudyKindLabel(study.kind)}
                      </span>
                    </div>
                    <h2 className="font-ht-display text-ht-purple mt-5 text-[clamp(1.15rem,2vw,1.45rem)] leading-tight font-bold">
                      {study.title}
                    </h2>
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
                      className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
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
