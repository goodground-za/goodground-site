"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { heroImage, heroImageMobile } from "@/content/homepage";
import { RotatingWords } from "@/components/motion/RotatingWords";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { SplitWords } from "@/components/motion-gsap/SplitWords";

// Same specialty list the studio has always led with — kept verbatim from
// the previous Hero's copy deck.
const SPECIALTIES = [
  "Website Development",
  "Website Design",
  "UX Design",
  "UI Design",
  "Branding",
  "Graphic Design",
  "SEO",
  "Digital Marketing Campaigns",
];

/**
 * Promoted from the approved /home-test variant. The micro-trust line was
 * flagged in the previous Hero as the studio's one real differentiator and
 * worth keeping above the fold. Updated 2026-08-11: the old single "12 equal
 * monthly payments, no large upfront cost" claim no longer holds now that
 * there are two payment options (one of which — the 50% deposit — is a
 * large upfront cost by design), so this links straight to /pricing instead
 * of asserting a specific plan.
 */
export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (bgRef.current) {
        tl.fromTo(bgRef.current, { scale: 1.15 }, { scale: 1, duration: 1.4, ease: "circ.out" }, 0);
      }
      if (copyRef.current) {
        tl.fromTo(copyRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9);
      }
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.15);
      }
      return () => {
        tl.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    // z-10 + rounded-b: sits ABOVE the ServiceCarousel section that follows
    // (which is pulled up underneath via its own -mt and kept behind via
    // -z-10), so Hero's rounded bottom corners reveal the carousel peeking
    // through rather than plain page background.
    <section className="relative z-10 flex min-h-[100svh] items-center overflow-hidden rounded-b-[40px] sm:rounded-b-[56px]">
      <div ref={bgRef} className="absolute inset-0">
        {/* Landscape crop reads well on wide screens but crops too tight on
            mobile, so a portrait crop of the same shoot swaps in below the
            sm breakpoint instead. */}
        <Image
          src={heroImageMobile.src}
          alt="Two GoodGround creatives reviewing a website design together"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <Image
          src={heroImage.src}
          alt="Two GoodGround creatives reviewing a website design together"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover sm:block"
        />
        <div aria-hidden="true" className="from-ht-purple/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-6 pt-24 pb-20 text-center sm:px-10 md:px-14">
        <SplitWords
          as="h1"
          text="We're a website development studio based in South Africa, building AI-accelerated sites that convert."
          trigger="mount"
          delay={0.15}
          className="font-ht-display mx-auto max-w-[34ch] text-[clamp(1.85rem,3.6vw,3.25rem)] leading-[1.15] font-bold text-white"
        />

        <div ref={copyRef} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="font-ht-body text-[15px] font-bold text-white sm:text-[17px]">We specialise in:</span>
          {/* Purple pill, white text: 15.67:1. This used to be orange with ink
              text, because white on that orange is only 3.48:1 and fails AA.
              Purple sidesteps that entirely and holds the same contrast rule. */}
          <RotatingWords words={SPECIALTIES} className="bg-ht-purple rounded-pill px-5 py-2 text-[15px] font-bold text-white sm:text-[17px]" />
        </div>

        <div ref={ctaRef}>
          {/* Sentence case, so the `uppercase` class has to go too: leaving it
              on would render "LET'S CHAT" no matter what the text says. The
              decorative arrow disc that sat beside this was removed. */}
          <div className="mt-8 flex items-center justify-center">
            <MagneticButton>
              <Link
                href="/start-project"
                className="font-ht-display bg-ht-cream text-ht-crimson rounded-pill inline-block px-7 py-3.5 text-[15px] font-bold tracking-wide shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03]"
              >
                Let&rsquo;s chat
              </Link>
            </MagneticButton>
          </div>

          {/* The studio's one real differentiator — kept above the fold.
              "Two ways to pay" links to /pricing, where both options are
              actually broken down per package. The second item names the
              real town rather than just "South Africa" (SEO audit
              2026-08-16, item 19) — a genuine local anchor without giving
              up the national positioning the rest of the page argues for. */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[13px] font-medium text-white/80">
            {["Two ways to pay", "Based in George, building nationwide"].map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden="true" className="hidden size-1 rounded-full bg-white/50 sm:block" /> : null}
                {item === "Two ways to pay" ? (
                  <Link href="/pricing" className="underline decoration-white/40 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-white">
                    {item}
                  </Link>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="motion-safe:animate-[scroll-cue_2.4s_ease-in-out_infinite] absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 sm:block"
      >
        <svg viewBox="0 0 24 24" className="size-6 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
