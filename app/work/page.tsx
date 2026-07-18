import type { Metadata } from "next";
import { AuroraGlow } from "@/components/AuroraGlow";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";

export const metadata: Metadata = {
  title: { absolute: "Our Work | GoodGround Website Development" },
  description:
    "GoodGround is a new website development studio in South Africa. Our first case studies are on the way. Start your project and become one of them.",
  alternates: { canonical: "/work" },
};

/**
 * Coming-soon state. GoodGround was founded in 2026 with no launched projects
 * yet, so this is honest rather than a fabricated portfolio (CLAUDE.md §9).
 */
export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Work", path: "/work" }]} />

      <section className="px-3 py-8 sm:px-5 md:py-12">
        <div className="bg-bark rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
          <AuroraGlow intensity={0.45} />
          <div className="relative z-[2] px-6 py-20 sm:px-10 md:px-14 md:py-28">
            <Reveal>
              <Eyebrow>Our Work</Eyebrow>
            </Reveal>
            <KineticText
              as="h1"
              phrases={["Case studies,", "coming soon."]}
              tone="light"
              className="font-heading mt-6 max-w-[14ch] text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] font-bold tracking-[-0.03em]"
            />
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[52ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.6] text-peach/75">
                GoodGround was founded in 2026, so we&rsquo;re building our first projects right now.
                Rather than fill this page with stock mock-ups or borrowed work, we&rsquo;d rather show
                you the real thing when it&rsquo;s live.
              </p>
              <p className="mt-4 max-w-[52ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.6] text-peach/75">
                Want to be one of the first? Start your project, and your website could be the one we
                feature here.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/start-project" variant="peach" size="lg">
                  Start your project
                </ButtonLink>
                <ButtonLink href="/services" variant="outline" size="lg">
                  See what we do
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
