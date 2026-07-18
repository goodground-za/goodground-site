import Link from "next/link";
import { AuroraGlow } from "@/components/AuroraGlow";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";
import { navLinks } from "@/content/site";

/**
 * 404. Copy verbatim from the copy deck §5. Rendered inside the root layout, so
 * nav and footer are already present; this is just the panel. Given a warm
 * branded treatment rather than a cold error, with links out so it's useful.
 */
export default function NotFound() {
  return (
    <section className="px-3 py-8 sm:px-5 md:py-12">
      <div className="bg-bark rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
        <AuroraGlow intensity={0.5} />
        <div className="relative z-[2] px-6 py-24 sm:px-10 md:px-14 md:py-32">
          <Reveal>
            <Eyebrow>404</Eyebrow>
          </Reveal>

          <KineticText
            as="h1"
            tone="light"
            phrases={["This page", "hasn't taken root."]}
            className="font-heading mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] font-bold tracking-[-0.03em]"
          />

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[46ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.6] text-peach/75">
              The page you&rsquo;re looking for doesn&rsquo;t exist &mdash; but the rest of
              GoodGround does.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/" variant="peach" size="lg">
                Back to Home →
              </ButtonLink>
              <ButtonLink href="/start-project" variant="outline" size="lg">
                Start your project
              </ButtonLink>
            </div>

            <nav aria-label="Popular pages" className="mt-12 border-t border-peach/15 pt-6">
              <p className="text-[13px] font-medium tracking-[0.12em] text-peach/50 uppercase">
                Or head somewhere useful
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-pill border border-peach/20 px-4 py-2 text-[14px] font-medium text-peach/85 transition-colors duration-150 hover:border-peach/50 hover:text-peach"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
