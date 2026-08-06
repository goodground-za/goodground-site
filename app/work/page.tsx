import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";

export const metadata: Metadata = {
  title: { absolute: "Our Work | GoodGround Website Development" },
  description:
    "GoodGround is a new website development studio in South Africa. Our first case studies are on the way. Start your project and become one of them.",
  alternates: { canonical: "/work" },
};

/**
 * Coming-soon state. GoodGround was founded in 2026 with no launched projects
 * yet, so this is honest rather than a fabricated portfolio (CLAUDE.md §9).
 * pb-[24vw] on PageHero's own bottom (via a wrapping div, since this is the
 * only section on the page) reserves room for the footer's CloudDivider —
 * same reasoning as CTABand.
 */
export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Work", path: "/work" }]} />

      <div className="bg-ht-cream pb-[24vw]">
        <PageHero
          eyebrow="Our Work"
          title="Case studies, coming soon."
          intro="GoodGround was founded in 2026, so we're building our first projects right now. Rather than fill this page with stock mock-ups or borrowed work, we'd rather show you the real thing when it's live. Want to be one of the first? Start your project, and your website could be the one we feature here."
        >
          <RevealSection delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton>
              <Link
                href="/start-project"
                className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03]"
              >
                Start Your Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/services"
                className="font-ht-display rounded-pill inline-block border-2 border-white px-7 py-3.5 text-[14px] font-bold tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.03]"
              >
                See What We Do
              </Link>
            </MagneticButton>
          </RevealSection>
        </PageHero>
      </div>
    </>
  );
}
