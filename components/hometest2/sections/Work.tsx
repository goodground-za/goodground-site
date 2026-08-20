import Image from "next/image";
import Link from "next/link";
import { ScrollBanner } from "@/components/hometest2/ScrollBanner";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { caseStudies } from "@/content/caseStudies";
import { workImages, workIntro } from "@/content/homeTest2";

/**
 * Case studies as a horizontal banner. One row rather than a wrapping grid:
 * there are four studies and a three-column grid orphaned the fourth, and a
 * banner absorbs a fifth or sixth without the layout changing.
 */
export function Work() {
  return (
    <section id="work" className="bg-ht-cream px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[1434px]">
        <RevealSection>
          <h2 className="font-ht-display text-ht-orange text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02] font-bold">
            Work
          </h2>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <p className="font-ht-body text-ht-purple/85 max-w-[54ch] text-[15.5px] leading-[1.6]">{workIntro}</p>
            <MagneticButton className="shrink-0">
              <Link
                href="/work"
                className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-8 py-3.5 text-[15px] font-bold transition-transform duration-200 hover:scale-[1.03]"
              >
                View all
              </Link>
            </MagneticButton>
          </div>
        </RevealSection>

        <RevealSection className="mt-10">
          <ScrollBanner label="case studies" align="end">
            {caseStudies.map((study) => {
              const art = workImages[study.slug] ?? study.image;
              return (
                <li key={study.slug} className="w-[300px] shrink-0 snap-start sm:w-[380px]">
                  <Link
                    href={`/work/${study.slug}`}
                    className="group rounded-block relative block overflow-hidden"
                  >
                    <Image
                      src={art}
                      alt={study.imageAlt}
                      width={1042}
                      height={1218}
                      loading="lazy"
                      sizes="380px"
                      draggable={false}
                      className="aspect-[5/6] w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                    <div className="from-ht-purple absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

                    <div className="absolute right-5 bottom-5 left-5">
                      <ul className="flex list-none flex-wrap gap-2">
                        {study.tags.slice(0, 3).map((tag) => (
                          <li
                            key={tag}
                            className="font-ht-display text-ht-purple rounded-pill bg-white px-3 py-1 text-[11px] font-bold"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <h3 className="font-ht-display text-[1.15rem] leading-tight font-bold text-white">
                          {study.client}
                        </h3>
                        <span
                          className="border-ht-orange text-ht-orange grid size-11 shrink-0 place-items-center rounded-full border-2 bg-white transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17 17 7M9 7h8v8" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ScrollBanner>
        </RevealSection>

        <RevealSection className="mx-auto mt-14 max-w-[860px]">
          <div className="border-ht-orange rounded-block border-2 bg-white px-8 py-10 text-center sm:px-12">
            <h3 className="font-ht-display text-ht-orange text-[clamp(1.4rem,2.6vw,2rem)] leading-tight font-bold">
              Your project could be next
            </h3>
            <p className="font-ht-body text-ht-purple/80 mx-auto mt-4 max-w-[48ch] text-[15px] leading-relaxed">
              We&rsquo;re a young studio and we&rsquo;d rather show you real, testable work than pad this out with
              stock mock-ups.
            </p>
            <MagneticButton className="mt-7 inline-block">
              <Link
                href="/start-project"
                className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-8 py-3.5 text-[15px] font-bold transition-transform duration-200 hover:scale-[1.03]"
              >
                Start your project
              </Link>
            </MagneticButton>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
