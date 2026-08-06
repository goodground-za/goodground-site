import type { ReactNode } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

/**
 * Shared inner-page hero, promoted to the site's design language: a solid
 * ht-purple band (not a photo) so every inner page opens on a dark surface,
 * which is what keeps the fixed Nav's white/transparent styling readable
 * site-wide (see Nav.tsx) without needing a supplied photo for every page.
 * `pt-28`/`sm:pt-32` reserves room for the fixed nav pill; `rounded-b-*`
 * matches the same mobile/desktop radius step-down used on Hero.tsx and
 * every other section-overlap edge on the site.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Anything below the intro: jump-index chips, etc. */
  children?: ReactNode;
}) {
  return (
    <section className="bg-ht-purple relative z-10 rounded-b-[40px] px-6 pt-28 pb-16 text-center sm:rounded-b-[56px] sm:px-10 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-[900px]">
        <RevealSection>
          <Eyebrow tone="ember">{eyebrow}</Eyebrow>
        </RevealSection>
        <SplitWords
          as="h1"
          text={title}
          trigger="mount"
          className="font-ht-display mx-auto mt-4 max-w-[20ch] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] font-bold text-white uppercase"
        />

        {intro ? (
          <RevealSection delay={0.08} className="mt-6">
            <p className="font-ht-body mx-auto max-w-[56ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-white/75">
              {intro}
            </p>
          </RevealSection>
        ) : null}

        {children}
      </div>
    </section>
  );
}
