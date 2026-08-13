"use client";

import { AnimatedNumber, formatRand } from "@/components/AnimatedNumber";
import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import type { SelectedConfig } from "@/components/PricingEnquiryForm";
import { balanceFor, depositFor, monthlyInstalmentFor, packages, packagesFootnote } from "@/content/pricing";

/**
 * Section 1: the four fixed packages, side by side on desktop and stacked
 * on mobile. Each card carries the same hard-shadow ring language used for
 * every other card on the site (ServiceAccordion, "How we work" on /about).
 * "Grow" is flagged as the recommended middle tier — a common comparison
 * anchor, and the package the brief's own worked example ("add extra pages
 * to Package 1") implies most visitors land on.
 */
export function PricingPackages({ onSelectPackage }: { onSelectPackage: (config: SelectedConfig) => void }) {
  return (
    <section id="packages" className="bg-ht-cream scroll-mt-24 px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-[1434px]">
        <RevealSection className="text-center">
          <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
            Fixed packages
          </p>
          <h2 className="font-ht-display text-ht-purple mx-auto mt-6 max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold uppercase">
            Four starting points. Pick the one closest to your brief.
          </h2>
          <p className="text-ht-purple/70 mx-auto mt-5 max-w-[56ch] text-[16px] leading-[1.65]">
            Every package is a fixed, one-time price — no surprise line items. Pay a 50% deposit now
            and the rest on completion, or split it into 12 monthly instalments. Need something in
            between? Add to any package from the à la carte menu below.
          </p>
        </RevealSection>

        <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" y={20}>
          {packages.map((pkg) => {
            const recommended = pkg.slug === "grow";
            return (
              <HoverCard
                key={pkg.slug}
                as="div"
                className={`rounded-card relative flex h-full flex-col bg-white p-6 ring-2 sm:p-7 ${
                  recommended
                    ? "ring-ht-orange shadow-[0_14px_0_0_var(--color-ht-orange)]"
                    : "ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)]"
                }`}
              >
                {recommended ? (
                  <span className="bg-ht-orange text-ink rounded-pill absolute -top-3 left-6 px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
                    Most popular
                  </span>
                ) : null}

                <h3 className="font-ht-display text-ht-purple text-[20px] font-bold uppercase">{pkg.name}</h3>
                <p className="text-ht-purple/70 mt-2 min-h-[3.3em] text-[14px] leading-[1.55]">{pkg.pitch}</p>

                <div className="border-ht-purple/10 mt-5 border-t pt-5">
                  <AnimatedNumber value={pkg.total} className="font-ht-display text-ht-purple text-[clamp(1.75rem,3vw,2.25rem)] font-bold tabular-nums" />
                  <div className="text-ht-purple/70 mt-2 space-y-1 text-[12.5px] leading-[1.4] font-medium">
                    <p>
                      <span className="text-ht-purple/80 font-semibold">{formatRand(depositFor(pkg.total))}</span> deposit
                      + <span className="text-ht-purple/80 font-semibold">{formatRand(balanceFor(pkg.total))}</span> on completion
                    </p>
                    <p>
                      or <span className="text-ht-purple/80 font-semibold">{formatRand(monthlyInstalmentFor(pkg.total))}</span>/mo × 12
                    </p>
                  </div>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-ht-purple/80 flex gap-2.5 text-[13.5px] leading-[1.5]">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="text-ht-crimson mt-0.5 size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 8 3.5 3.5L13 5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="text-ht-purple/70 border-ht-purple/10 mt-6 border-t pt-4 text-[12.5px] leading-[1.5]">
                  <span className="font-bold">Best for:</span> {pkg.bestFor}
                </p>
                <p className="text-ht-purple/50 mt-2 text-[12px]">Timeline: {pkg.timeline}</p>

                <button
                  type="button"
                  onClick={() =>
                    onSelectPackage({ kind: "package", slug: pkg.slug, name: pkg.name, total: pkg.total })
                  }
                  className={`font-ht-display rounded-pill mt-6 inline-flex h-12 cursor-pointer items-center justify-center px-6 text-[13px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.02] ${
                    recommended ? "bg-ht-orange text-ink" : "bg-ht-purple text-white"
                  }`}
                >
                  Choose {pkg.name}
                </button>
              </HoverCard>
            );
          })}
        </RevealStagger>

        <RevealSection delay={0.1}>
          <p className="text-ht-purple/70 mx-auto mt-10 max-w-[70ch] text-center text-[13px] leading-[1.6]">
            {packagesFootnote}
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
