import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/hometest2/CountUp";
import { ScrollRevealText } from "@/components/hometest2/ScrollRevealText";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { headlineStats, serviceTiles, servicesLede } from "@/content/homeTest2";

/**
 * Positioning statement, the four headline offers as photo tiles, and the
 * numbers row beneath them.
 *
 * The figures in `headlineStats` are owner-confirmed (see content/homeTest2.ts)
 * rather than derived from anything in the codebase.
 */
export function ServicesLede() {
  return (
    <section id="services" className="bg-ht-cream px-6 pt-12 pb-20 sm:px-10 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-[1434px]">
        <RevealSection className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* h2 wrapper rather than styling the <p> as a heading: the wipe
              component owns the paragraph element, and this section still
              needs a real heading in the outline. */}
          {/* Type styles live on the h2, not the inner <p>: `max-w` in `ch`
              resolves against the element's own font-size, so on an unstyled
              h2 it measured against 16px and clamped the line far too short. */}
          <h2 className="font-ht-display text-ht-orange max-w-[46ch] text-[clamp(1.45rem,2.5vw,2.1rem)] leading-[1.3] font-bold">
            <ScrollRevealText text={`${servicesLede.lead} ${servicesLede.rest}`} />
          </h2>
          <MagneticButton className="shrink-0">
            <Link
              href="/services"
              className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-8 py-3.5 text-[15px] font-bold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              All services
            </Link>
          </MagneticButton>
        </RevealSection>

        <RevealStagger className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4" y={28}>
          {serviceTiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group rounded-block relative block overflow-hidden focus-visible:outline-none"
            >
              <Image
                src={tile.image}
                alt=""
                width={614}
                height={794}
                loading="lazy"
                sizes="(max-width: 1024px) 45vw, 23vw"
                className="aspect-[3/4] w-full object-cover transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.04]"
              />
              {/* Resting gradient: only the bottom third needs darkening for
                  the label. It deepens to a full scrim on hover so the blurb
                  underneath it stays readable over any part of the photo. */}
              <div className="from-ht-purple/95 absolute inset-0 bg-gradient-to-t from-0% to-transparent to-58% transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0" />
              <div className="bg-ht-purple/92 absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-ht-display text-[clamp(0.9rem,1.15vw,1.05rem)] leading-tight font-bold text-white">
                  {tile.title}
                </h3>

                {/* grid-template-rows 0fr -> 1fr animates open without needing
                    a hardcoded height, so a longer blurb cannot get clipped. */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-250 ease-[var(--ease-out)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="font-ht-body mt-3 text-[13.5px] leading-relaxed text-white/85">{tile.blurb}</p>
                    <span className="font-ht-display bg-ht-orange text-ink rounded-pill mt-4 inline-block px-5 py-2.5 text-[13px] font-bold">
                      View more
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </RevealStagger>

        <RevealStagger className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4" y={20}>
          {headlineStats.map((stat) => (
            <div key={stat.label}>
              <CountUp
                value={stat.value}
                className="font-ht-display text-ht-purple block text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none font-bold tabular-nums"
              />
              <p className="font-ht-body text-ht-purple/80 mx-auto mt-3 max-w-[18ch] text-[15px] leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
