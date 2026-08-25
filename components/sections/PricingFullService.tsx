"use client";

import { AnimatedNumber } from "@/components/AnimatedNumber";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import type { SelectedConfig } from "@/components/PricingEnquiryForm";
import { fullServicePackage } from "@/content/pricing";

/**
 * The one recurring offer on a page otherwise built entirely around fixed,
 * one-time prices. Deliberately styled as a dark full-width band rather than
 * a fifth white ring-card in the grid above: the four packages are visually
 * one family (same white/pink-ring language), and Full Service needs to read
 * as a different kind of purchase at a glance, not just a fifth option in
 * the same row. "Monthly Cancel anytime" is stated up front so nothing about
 * this reads like the fixed packages' "12 monthly instalments" payment plan,
 * which is explicitly not a subscription (see PRODUCT.md) — this one is.
 */
export function PricingFullService({ onSelect }: { onSelect: (config: SelectedConfig) => void }) {
  return (
    <section id="full-service" className="bg-ht-cream scroll-mt-24 px-6 pb-16 sm:px-10 md:pb-24">
      <div className="mx-auto max-w-[1434px]">
        <RevealSection>
          <div className="bg-ht-purple rounded-block relative overflow-hidden">
            <div className="grid gap-10 px-6 py-12 sm:px-10 md:grid-cols-12 md:items-center md:px-14 md:py-16">
              <div className="min-w-0 md:col-span-7">
                <span className="bg-ht-pink text-ht-purple rounded-pill inline-block px-4 py-1.5 text-[11px] font-bold tracking-wide uppercase">
                  Monthly · Cancel any time
                </span>
                <h2 className="font-ht-display mt-5 max-w-[18ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold text-white uppercase">
                  {fullServicePackage.name}
                </h2>
                <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-white/85">
                  {fullServicePackage.pitch}
                </p>

                <ul className="mt-7 space-y-2.5">
                  {fullServicePackage.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[14.5px] leading-[1.5] text-white/90">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="text-ht-pink mt-0.5 size-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 8 3.5 3.5L13 5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0 md:col-span-5 md:justify-self-end">
                <div className="rounded-card bg-ht-cream w-full p-7 sm:p-8 md:max-w-[360px]">
                  <p className="font-ht-display text-ht-purple/70 text-[13px] font-bold tracking-[0.1em] uppercase">
                    From
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <AnimatedNumber
                      value={fullServicePackage.monthlyFrom}
                      className="font-ht-display text-ht-purple text-[clamp(2rem,3.4vw,2.75rem)] font-bold tabular-nums"
                    />
                    <span className="text-ht-purple/70 text-[15px] font-semibold">/mo</span>
                  </div>
                  <p className="text-ht-purple/70 mt-3 text-[13px] leading-[1.5]">{fullServicePackage.note}</p>
                  <p className="text-ht-purple/60 mt-2 text-[12px] leading-[1.5]">{fullServicePackage.billing}</p>

                  <MagneticButton className="mt-6 block">
                    <button
                      type="button"
                      onClick={() =>
                        onSelect({ kind: "fullservice", monthlyFrom: fullServicePackage.monthlyFrom })
                      }
                      className="font-ht-display bg-ht-orange text-ink rounded-pill inline-flex h-12 w-full cursor-pointer items-center justify-center px-6 text-[13px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
                    >
                      Get a Full Service Quote
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
