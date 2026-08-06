"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { heroImage } from "@/content/homepage";
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
 * Promoted from the approved /home-test variant. The micro-trust line ("No
 * large upfront cost" / "12 equal monthly payments" / "Based in George")
 * was flagged in the previous Hero as the studio's one real differentiator
 * and worth keeping above the fold — the home-test comp didn't carry it, so
 * it's re-added here under the CTAs rather than silently dropped.
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
        <Image
          src={heroImage.src}
          alt="Two GoodGround creatives reviewing a website design together"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="from-ht-purple/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-6 pt-24 pb-20 text-center sm:px-10 md:px-14">
        <SplitWords
          as="h1"
          text="We're an AI-first digital agency based in George, South Africa. We build websites and experiences that convert."
          trigger="mount"
          delay={0.15}
          className="font-ht-display mx-auto max-w-[34ch] text-[clamp(1.85rem,3.6vw,3.25rem)] leading-[1.15] font-bold text-white"
        />

        <div ref={copyRef} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="font-ht-body text-[15px] font-bold text-white sm:text-[17px]">We specialise in:</span>
          {/* white on the orange pill is 3.48:1, under the 4.5:1 WCAG AA bar
              at this size/weight — flagged, not silently fixed, since it's
              matching the client-approved comp exactly. */}
          <RotatingWords words={SPECIALTIES} className="bg-ht-orange rounded-pill px-5 py-2 text-[15px] font-bold text-white sm:text-[17px]" />
        </div>

        <div ref={ctaRef}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <MagneticButton>
              <Link
                href="/start-project"
                className="font-ht-display bg-ht-cream text-ht-crimson rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03]"
              >
                Let&rsquo;s Chat
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/start-project"
                aria-hidden="true"
                tabIndex={-1}
                className="text-ht-crimson bg-ht-cream grid size-12 place-items-center rounded-full transition-transform duration-200 hover:scale-[1.08] hover:rotate-12"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </Link>
            </MagneticButton>
          </div>

          {/* The studio's one real differentiator — kept above the fold. */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[13px] font-medium text-white/80">
            {["No large upfront cost", "12 equal monthly payments", "Based in George"].map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden="true" className="hidden size-1 rounded-full bg-white/50 sm:block" /> : null}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="animate-bounce motion-reduce:animate-none absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 sm:block"
      >
        <svg viewBox="0 0 24 24" className="size-6 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
