import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ParableLink } from "@/components/ParableModal";
import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { process } from "@/content/process";
import { pageSocialMeta } from "@/lib/metadata";

/**
 * `absolute` bypasses the layout's "%s | GoodGround" template, which would
 * otherwise append a second "GoodGround" to this title. Development-first, with
 * South Africa as the primary geography to match the homepage positioning.
 */
const title = { absolute: "About GoodGround | Website Development Studio, South Africa" };
const description =
  "A website development studio working with businesses across South Africa, built on the idea that they grow best on strong foundations.";
const path = "/about";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/** Copy deck §2. Verbatim, with one exception noted at the founder story. */
const beliefs = [
  "Strong businesses are built on strong foundations.",
  "Strategy comes before design.",
  "Design should solve a problem, not decorate one.",
  "Growth is earned through consistency, not a single big launch.",
  "Simple is powerful.",
  "Relationships matter more than transactions, which is why we don't ask for your entire budget on day one.",
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "About", path: "/about" }]} />

      <PageHero
        eyebrow="About GoodGround"
        title="We believe every business deserves a strong foundation."
      >
        {/* Names the real town rather than just "South Africa" (SEO audit
            2026-08-16, item 19) — a genuine local anchor alongside the
            national positioning the rest of this page argues for. */}
        <div className="mt-6 flex">
          <span className="font-ht-body text-[13px] font-medium text-white/60">
            Founded 2026 · George, South Africa
          </span>
        </div>
      </PageHero>

      {/* Founder story, paired with a portrait card in the same hard-shadow
          language as every other card on the site. */}
      <section className="bg-ht-cream px-gutter py-16 md:py-24">
        <div className="mx-auto grid max-w-[1434px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <RevealSection className="min-w-0 lg:col-span-7">
            <div className="text-ht-purple max-w-[46ch] space-y-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.65]">
              {/* Founder named by experience rather than by name, at the
                  owner's request. The copy deck's "We'd both watched" implied
                  a second founder we can't confirm, so this reads as "We kept
                  seeing", which works for one founder without inventing one. */}
              <p className="font-ht-display font-bold">
                GoodGround was founded in 2026 by a web developer
                with more than 10 years&rsquo; experience across UX and UI design, website design and
                graphic design.
              </p>
              <p className="text-ht-purple/70">
                We kept seeing good businesses pay for websites that looked polished and did nothing
                for them. There was no strategy behind the design and no plan for what happened after
                launch. On top of that, the bill usually landed upfront, which put a proper website
                out of reach for a business that was still growing. We started GoodGround to fix both
                problems at once.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={0.08} className="min-w-0 lg:col-span-5">
            <div className="rounded-card ring-ht-purple/12 relative aspect-[4/5] w-full overflow-hidden ring-1">
              <Image
                src="/images/about-founder.png"
                alt="Two GoodGround creatives reviewing work together"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Why the name. Typography-led rather than paired with a photo: the
          same theme opens the homepage's About panel, but this page's own
          telling goes further, so it earns its own section rather than
          reusing that component verbatim. Inset as a rounded block (like
          CTABand/GrowthBenefits) rather than a full-bleed section, so the
          rounded corners are actually visible against the cream sections
          above and below it. */}
      <section className="bg-ht-cream relative z-10 px-gutter py-8">
        <div className="bg-ht-purple rounded-block mx-auto max-w-[1434px] overflow-hidden">
          <div className="grid gap-10 px-gutter py-16 md:py-24 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-4">
              <RevealSection>
                <p className="font-ht-display text-ht-pink text-[13px] font-bold tracking-[0.15em] uppercase">
                  Why the name
                </p>
              </RevealSection>
            </div>

            <div className="min-w-0 lg:col-span-8">
              <SplitWords
                as="p"
                text="The name comes from the biblical Parable of the Sower: good ground is where seeds take root, grow, and produce a harvest. We didn't pick it because it sounded nice. It's how we think about building."
                className="font-ht-display max-w-[52ch] text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.3] font-bold text-white"
              />
              <RevealSection delay={0.1}>
                <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.7] text-white/70">
                  A logo without strategy has little value. A website without purpose rarely performs.
                  Marketing can&rsquo;t fix a poor customer experience. Growth is the result of a strong
                  foundation, not a substitute for one.
                </p>
                <p className="mt-5 text-[15px]">
                  <ParableLink className="text-ht-pink decoration-ht-pink/40 hover:decoration-ht-pink">
                    Read the parable that inspired us →
                  </ParableLink>
                </p>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* What we believe — six one-line beliefs, kept as a numbered list
          (not a card grid, which would be six cards for the sake of it). */}
      <section className="bg-ht-cream px-gutter py-16 md:py-24">
        <div className="mx-auto grid max-w-[1434px] gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
                What we believe
              </p>
              <h2 className="font-ht-display text-ht-purple mt-6 max-w-[14ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold uppercase">
                Six things we don&rsquo;t argue about.
              </h2>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <RevealStagger className="border-ht-purple/15 border-t" y={16}>
              {beliefs.map((belief, i) => (
                <div key={belief} className="border-ht-purple/15 flex gap-6 border-b py-5">
                  <span aria-hidden="true" className="font-ht-display text-ht-crimson pt-1 text-[13px] font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ht-purple/85 max-w-[52ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.5]">
                    {belief}
                  </p>
                </div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* How we work — same content/process.ts data as the homepage's
          Creative Process banner, recapped here as a compact grid rather
          than repeating the full-bleed photo treatment. */}
      <section className="bg-ht-cream px-gutter pb-16 md:pb-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">How we work</p>
            <h2 className="font-ht-display text-ht-purple mt-6 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold uppercase">
              Every project follows the same process.
            </h2>
          </RevealSection>

          <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" y={16}>
            {process.map((step) => (
              <HoverCard
                key={step.number}
                className="bg-white ring-ht-purple/12 rounded-card p-6 ring-1"
              >
                <p className="font-ht-display text-ht-crimson text-[13px] font-bold">{step.number}</p>
                <h3 className="font-ht-display text-ht-purple mt-2 text-[16px] font-bold">{step.title}</h3>
                <p className="text-ht-purple/70 mt-2 text-[14px] leading-[1.6]">{step.description}</p>
              </HoverCard>
            ))}
          </RevealStagger>

          <RevealSection>
            <p className="text-ht-purple/70 mt-10 max-w-[58ch] text-[16px] leading-[1.7]">
              And every project gives you a choice in how you pay: a 50% deposit and the rest on
              completion, or 12 monthly instalments, so investing properly in your website
              doesn&rsquo;t mean disrupting your cash flow.{" "}
              <Link href="/#process" className="text-ht-crimson font-bold underline underline-offset-4">
                See the full process
              </Link>{" "}
              or{" "}
              <Link href="/pricing" className="text-ht-crimson font-bold underline underline-offset-4">
                view pricing
              </Link>
              .
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Personal invitation. The copy deck gives this page its own closing, so
          the shared CTA band would say the same thing twice.

          Ink on orange, left-aligned, on the homepage's own .section-orange —
          it was centred white-on-orange, which AGENTS.md rules out for text and
          which was the last centred block on a page that is otherwise ranged
          left throughout. */}
      <div className="home-2026">
        <section className="section-orange section-pad growth-cta" aria-labelledby="about-invite">
          <div className="wrap">
            <p className="eyebrow">An invitation</p>
            <h2 className="display-heading reveal" id="about-invite">
              If you’re building a business you plan to stick with, we’d like to hear about it
            </h2>
            <p className="growth-cta__lede reveal">
              Get in touch, and let’s talk about the ground you’re building on.
            </p>
            <div className="growth-cta__actions">
              <Link className="button button-white" href="/contact">
                <span>Get in touch</span>
                <span className="button-arrow" aria-hidden="true">
                  {"↗︎"}
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
