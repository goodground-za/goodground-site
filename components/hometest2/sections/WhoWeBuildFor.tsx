import Image from "next/image";
import Link from "next/link";
import { ScrollBanner } from "@/components/hometest2/ScrollBanner";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { industriesIntro, industryImages } from "@/content/homeTest2";
import { industries } from "@/content/industries";

/**
 * Heading and intro on the left, industries as a draggable photo banner on
 * the right.
 *
 * The left column also lists all six categories as plain links. The banner
 * only ever shows two or three at a time, so without the list a visitor has
 * to drag before they can tell whether their own industry is covered — which
 * is the one question this section exists to answer. The list also means
 * every category is reachable without touching the slider at all.
 */
export function WhoWeBuildFor() {
  return (
    <section id="who-we-build-for" className="bg-ht-cream overflow-x-clip py-20 md:py-28">
      <div className="mx-auto max-w-[1434px] px-6 sm:px-10">
        <RevealSection>
          <h2 className="font-ht-display text-ht-orange text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02] font-bold">
            Who we build for
          </h2>
        </RevealSection>
      </div>

      <div className="mx-auto mt-8 grid max-w-[1434px] items-start gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-12">
        <RevealSection>
          <p className="font-ht-body text-ht-purple/85 max-w-[42ch] text-[15.5px] leading-[1.65]">
            {industriesIntro}
          </p>

          {/* py-2 gives each link a ~40px hit area: as bare 24px text these
              were well under the touch-target minimum on a phone, which is
              where most of this audience arrives. The row gaps come down to
              match so the list occupies the same space as before. */}
          <ul className="mt-6 flex list-none flex-wrap gap-x-5 gap-y-0.5 lg:flex-col lg:gap-y-1">
            {industries.map((industry) => (
              <li key={industry.title}>
                <Link
                  href={industry.href}
                  className="font-ht-display text-ht-purple hover:text-ht-orange group inline-flex items-center gap-2 py-2 text-[15px] font-bold transition-colors duration-200"
                >
                  <span className="border-b-2 border-transparent group-hover:border-current">{industry.title}</span>
                  <span aria-hidden="true" className="text-ht-orange">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </RevealSection>

        <RevealSection>
          <ScrollBanner label="industries" align="end">
            {industries.map((industry) => (
              <li key={industry.title} className="w-[260px] shrink-0 snap-start sm:w-[300px]">
                <Link
                  href={industry.href}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="group rounded-block relative block overflow-hidden"
                >
                  <Image
                    src={industryImages[industry.icon]}
                    alt=""
                    width={700}
                    height={864}
                    loading="lazy"
                    sizes="300px"
                    draggable={false}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                  <div className="from-ht-purple absolute inset-0 bg-gradient-to-t from-0% to-transparent to-62%" />
                  <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
                    <h3 className="font-ht-display max-w-[11ch] text-[1.05rem] leading-tight font-bold text-white">
                      {industry.title}
                    </h3>
                    <span
                      className="border-ht-orange text-ht-orange grid size-10 shrink-0 place-items-center rounded-full border-2 bg-white transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ScrollBanner>
        </RevealSection>
      </div>
    </section>
  );
}
