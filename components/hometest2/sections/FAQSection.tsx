import Link from "next/link";
import { FaqItem } from "@/components/hometest2/FaqItem";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { faq } from "@/content/faq";

// The 8 build-focused questions (payment, deposit, scope, cancellation,
// what's included, timeline, after launch, service area) — the same real
// content as content/faq.ts, just the subset relevant to this page rather
// than also carrying the Google/Meta Ads questions from a different offer.
const HOMEPAGE_FAQ = faq.slice(0, 8).filter((item) => item.answer !== null);

export function FAQSection() {
  return (
    // pb-[24vw]: last section before the footer, so it carries the
    // reservation for the footer's CloudDivider, which scales with viewport
    // width and would otherwise paint over the bottom of this section.
    <section id="faq" className="bg-white px-6 pt-20 pb-[24vw] sm:px-10 md:pt-28">
      <div className="mx-auto max-w-[880px]">
        <RevealSection className="text-center">
          <p className="font-ht-display text-ht-crimson border-ht-crimson/25 rounded-pill inline-block border-2 px-4 py-1.5 text-[12px] font-bold tracking-wide">
            FAQ
          </p>
          <h2 className="font-ht-display text-ht-orange mx-auto mt-5 max-w-[13ch] text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] font-bold">
            Everything you need to know
          </h2>
        </RevealSection>

        <RevealStagger className="mt-12 flex flex-col gap-3.5" y={20}>
          {HOMEPAGE_FAQ.map((item, i) => (
            <FaqItem key={item.question} index={i} question={item.question}>
              <p className="font-ht-body text-ht-purple/75 text-[14.5px] leading-relaxed">{item.answer}</p>
            </FaqItem>
          ))}
        </RevealStagger>

        <RevealSection className="mt-12 text-center">
          <MagneticButton className="inline-block">
            <Link
              href="/faq"
              className="font-ht-display border-ht-purple/25 text-ht-purple rounded-pill hover:border-ht-purple/60 inline-block border-2 px-7 py-3 text-[15px] font-bold transition-[color,border-color,transform] duration-200 active:scale-[0.97]"
            >
              Find all questions here
            </Link>
          </MagneticButton>
        </RevealSection>
      </div>
    </section>
  );
}
