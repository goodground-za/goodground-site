import Link from "next/link";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { navLinks } from "@/content/site";

/**
 * 404. Copy verbatim from the copy deck §5. Rendered inside the root layout, so
 * nav and footer are already present; this is just the panel. Given a warm
 * branded treatment rather than a cold error, with links out so it's useful.
 * pb-[24vw] reserves room for the footer's CloudDivider (same reasoning as
 * CTABand), since this is the only section on the page.
 */
export default function NotFound() {
  return (
    <div className="bg-ht-cream pb-[24vw]">
      <section className="bg-ht-purple relative z-10 rounded-b-[40px] px-6 pt-28 pb-16 text-center sm:rounded-b-[56px] sm:px-10 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-[900px]">
          <RevealSection>
            <p className="font-ht-display text-ht-pink text-[13px] font-bold tracking-[0.15em] uppercase">404</p>
          </RevealSection>

          <SplitWords
            as="h1"
            text="This page hasn't taken root."
            trigger="mount"
            className="font-ht-display mx-auto mt-4 max-w-[20ch] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] font-bold text-white uppercase"
          />

          <RevealSection delay={0.1} className="mt-6">
            <p className="mx-auto max-w-[46ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-white/75">
              The page you&rsquo;re looking for doesn&rsquo;t exist &mdash; but the rest of GoodGround does.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton>
                <Link
                  href="/"
                  className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03]"
                >
                  Back to Home →
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/start-project"
                  className="font-ht-display rounded-pill inline-block border-2 border-white px-7 py-3.5 text-[14px] font-bold tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.03]"
                >
                  Start Your Project
                </Link>
              </MagneticButton>
            </div>

            <nav aria-label="Popular pages" className="border-white/15 mt-12 border-t pt-6">
              <p className="text-[13px] font-medium tracking-[0.12em] text-white/50 uppercase">
                Or head somewhere useful
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-pill border-white/20 hover:border-white/50 inline-block border px-4 py-2 text-[14px] font-medium text-white/85 transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
