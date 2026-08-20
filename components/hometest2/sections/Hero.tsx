import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/content/caseStudies";
import { workImages } from "@/content/homeTest2";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/**
 * Cream split hero: copy left, studio photograph bleeding off the right edge
 * with the newest case study surfaced as a card over it.
 *
 * The photograph carries its own cream gradient down the left side (baked
 * into the asset), which is why it sits flush against the background with no
 * border or mask of its own.
 */
export function HomeTest2Hero() {
  // "Latest" = first in the list, so adding a new case study promotes it here
  // automatically rather than leaving a hardcoded slug to go stale.
  const latest = caseStudies[0];
  const latestImage = workImages[latest.slug] ?? latest.image;

  return (
    <section className="bg-ht-cream relative overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 pt-28 pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:pt-32 lg:pb-16">
        <div className="px-6 sm:px-10 lg:pl-14 xl:pl-20">
          <SplitWords
            as="h1"
            text="We build websites that bring in business."
            trigger="mount"
            className="font-ht-display text-ht-orange max-w-[15ch] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.06] font-bold"
          />

          <p className="font-ht-body text-ht-purple/85 mt-8 max-w-[38ch] text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.55]">
            Custom-coded business websites for South African businesses that need to be found, and need to convert.
          </p>

          <MagneticButton className="mt-10 inline-block">
            <Link
              href="/start-project"
              className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-9 py-4 text-[16px] font-bold transition-transform duration-200 hover:scale-[1.03]"
            >
              Start your project
            </Link>
          </MagneticButton>
        </div>

        {/* Photograph runs to the viewport edge on large screens, so it sits
            outside the grid's padding rather than inside a padded column. */}
        <div className="relative">
          <Image
            src="/images/ht2/hero.webp"
            alt="The GoodGround studio: a team working together around a shared table"
            width={1600}
            height={1440}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="h-[320px] w-full object-cover object-center sm:h-[420px] lg:h-[560px]"
          />

          <div className="px-6 sm:px-10 lg:absolute lg:right-8 lg:bottom-8 lg:left-auto lg:w-[470px] lg:px-0 xl:right-14">
            <div className="border-ht-orange -mt-12 rounded-[18px] border-2 bg-white p-4 shadow-[var(--shadow-lift)] lg:mt-0">
              <div className="flex items-start gap-4">
                <Image
                  src={latestImage}
                  alt={latest.imageAlt}
                  width={1042}
                  height={1218}
                  loading="lazy"
                  sizes="200px"
                  className="h-[176px] w-[196px] shrink-0 rounded-[10px] object-cover object-top"
                />
                <div className="min-w-0 flex-1">
                  <span className="font-ht-display bg-ht-purple rounded-pill inline-block px-3 py-1 text-[11px] font-bold text-white">
                    Latest Project
                  </span>
                  <h2 className="font-ht-display text-ht-purple mt-2 truncate text-[1.05rem] font-bold">
                    {latest.client}
                  </h2>
                  <p className="font-ht-body text-ht-purple/70 mt-1 line-clamp-2 text-[12.5px] leading-snug">
                    {latest.standfirst}
                  </p>
                  {/* Inside the text column, not a full-width row beneath the
                      card: it keeps the button next to the copy it belongs to
                      and stops the card growing a third band of height. */}
                  <Link
                    href={`/work/${latest.slug}`}
                    className="font-ht-display bg-ht-orange text-ink rounded-pill mt-4 inline-block px-5 py-2 text-[13px] font-bold transition-transform duration-200 hover:scale-[1.03]"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
