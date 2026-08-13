import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { LiveMetrics } from "@/components/LiveMetrics";
import { PageHero } from "@/components/PageHero";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { featuredProject, otherProjects } from "@/content/projects";
import { pageSocialMeta } from "@/lib/metadata";

const title = { absolute: "Our Work | GoodGround Website Development" };
const description =
  "The websites we've built, starting with this one. Every project measured on real Core Web Vitals rather than described. A website development studio in George, South Africa.";
const path = "/work";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/**
 * Project list. The first entry in content/projects.ts gets the feature card;
 * everything after it fills the grid below, so adding a project is a content
 * change with no work here.
 *
 * The feature card is currently the studio's own site, which renders the live
 * performance readout instead of a screenshot. That is deliberate: GoodGround
 * launched in 2026 with no handed-over client work, and the honest answer to
 * "can these people build?" is a measurement of the only site they have built,
 * taken in the visitor's own browser. Replacing invented proof with verifiable
 * proof, rather than with an apology.
 */
export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Work", path: "/work" }]} />

      <PageHero
        eyebrow="Our Work"
        title="We'd rather be tested than believed."
        intro="Every studio says its websites are fast and well built. Below is ours, grading itself against Google's own benchmarks while you read this page."
      />

      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[1434px]">
          {/* Feature card */}
          <RevealSection>
            <article className="bg-ht-purple rounded-block overflow-hidden">
              <div className="p-8 sm:p-12 lg:p-14">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="bg-ht-orange text-ink font-ht-display rounded-pill px-3 py-1 text-[12px] font-bold tracking-[0.08em] uppercase">
                    Project 01
                  </span>
                  <span className="text-[13px] font-medium text-white/70">{featuredProject.sector}</span>
                  <span aria-hidden="true" className="hidden text-white/40 sm:inline">
                    ·
                  </span>
                  <span className="text-[13px] font-medium text-white/70">{featuredProject.year}</span>
                </div>

                <h2 className="font-ht-display mt-7 text-[clamp(1.75rem,4vw,3rem)] leading-[1.06] font-bold text-white uppercase">
                  {featuredProject.name}
                </h2>
                <SplitWords
                  as="p"
                  text={featuredProject.tagline}
                  className="font-ht-display text-ht-pink mt-3 max-w-[34ch] text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.25] font-bold"
                />

                <RevealSection delay={0.08}>
                  <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.7] text-white/80">
                    {featuredProject.summary}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {featuredProject.disciplines.map((d) => (
                      <li
                        key={d}
                        className="font-ht-body rounded-pill border border-white/25 px-4 py-1.5 text-[13px] font-medium text-white"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </RevealSection>
              </div>

              {/* The readout sits on cream inside the dark card so the numbers
                  read as a report attached to the project, not as decoration. */}
              <div className="bg-ht-cream px-8 pt-2 pb-10 sm:px-12 lg:px-14">
                <LiveMetrics />
              </div>
            </article>
          </RevealSection>

          {/* Remaining projects, or an honest placeholder until they land. */}
          {otherProjects.length > 0 ? (
            <>
              <h2 className="font-ht-display text-ht-purple mt-16 text-[clamp(1.25rem,2vw,1.6rem)] font-bold uppercase">
                More projects
              </h2>
              <RevealStagger className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3" y={16}>
                {otherProjects.map((project) => (
                  <article
                    key={project.slug}
                    className="rounded-card ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] flex h-full flex-col bg-white p-7 ring-2"
                  >
                    <div className="text-ht-purple/70 flex items-center gap-3 text-[13px] font-medium">
                      <span className="bg-ht-orange/10 text-ht-crimson rounded-pill px-3 py-1 font-bold">
                        {project.sector}
                      </span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="font-ht-display text-ht-purple mt-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-tight font-bold">
                      {project.name}
                    </h3>
                    <p className="text-ht-purple/70 mt-3 flex-1 text-[15px] leading-[1.6]">
                      {project.tagline}
                    </p>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ht-crimson mt-6 inline-flex items-center gap-2 text-[14px] font-bold"
                      >
                        Visit the site
                        <span aria-hidden="true">→</span>
                      </a>
                    ) : null}
                  </article>
                ))}
              </RevealStagger>
            </>
          ) : (
            <RevealSection>
              <div className="border-ht-purple/15 rounded-block mt-10 border-2 border-dashed p-8 text-center sm:p-12">
                <p className="font-ht-display text-ht-purple text-[clamp(1.15rem,2.2vw,1.6rem)] leading-snug font-bold">
                  Client projects are landing here shortly.
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
