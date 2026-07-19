import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Block, BlockInner } from "@/components/Block";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal, RevealGroup, RevealItem } from "@/components/motion/KineticText";
import { ParableLink } from "@/components/ParableModal";
import { images } from "@/content/images";
import { process } from "@/content/process";

/**
 * `absolute` bypasses the layout's "%s | GoodGround" template, which would
 * otherwise append a second "GoodGround" to this title. Development-first, with
 * South Africa as the primary geography to match the homepage positioning.
 */
export const metadata: Metadata = {
  title: { absolute: "About GoodGround | Website Development Studio, South Africa" },
  description:
    "GoodGround is a website development studio in South Africa, founded on the belief that businesses grow best on strong foundations. Based in Brackenfell, Cape Town.",
  alternates: { canonical: "/about" },
};

/** Copy deck §2. Verbatim, with one exception noted at the founder story. */
const beliefs = [
  "Strong businesses are built on strong foundations.",
  "Strategy comes before design.",
  "Design should always solve a problem — never just decorate one.",
  "Growth is earned through consistency, not a single big launch.",
  "Simple is powerful.",
  "Relationships matter more than transactions — which is also why we don't ask for your entire budget on day one.",
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "About", path: "/about" }]} />

      {/* Text left (eyebrow + big H1 + founder story) balanced against the
          portrait image on the right, so the top of the page isn't a large empty
          field beside the headline. */}
      <section className="px-3 pt-10 pb-8 sm:px-5 sm:pt-16">
        <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="ember">About GoodGround</Eyebrow>
              </Reveal>
              <KineticText
                as="h1"
                phrases={["We believe every business", "deserves a strong foundation."]}
                className="font-heading text-pine mt-6 text-[clamp(2.25rem,5.2vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.03em]"
              />
              <Reveal delay={0.08}>
                <div className="text-bark mt-8 max-w-[46ch] space-y-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.65]">
                  {/* Founder named by experience rather than by name, at the
                      owner's request. This also settles the old unconfirmed
                      co-founder line: "We'd watched" reads fine for one founder. */}
                  <p className="font-heading font-bold">
                    GoodGround was founded in 2026 in Brackenfell, in Cape Town&rsquo;s Northern
                    Suburbs, by a web developer with more than 10 years&rsquo; experience across UX
                    and UI design, website design and graphic design.
                  </p>
                  <p className="text-bark-muted">
                    We&rsquo;d watched good businesses invest in websites that looked polished and
                    did nothing — no strategy behind the design, no plan for what happens after
                    launch, and often, an upfront bill that made &ldquo;getting a proper
                    website&rdquo; feel out of reach for a growing business. We started GoodGround to
                    fix both problems at once.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Image
                src={images.about.src}
                alt={images.about.alt}
                width={images.about.width}
                height={images.about.height}
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="ml-auto h-auto w-full max-w-[460px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/*
        Why the name. Typography-led rather than paired with a photo: the
        philosophy image is already shown on Home seconds before a visitor
        reaches this page, so repeating it here read as thin rather than
        considered. Every other client-supplied image is already in use
        elsewhere, so this section leans on the strongest asset it actually
        has — the copy itself — the same way the Services page does.
      */}
      <section className="border-bark/10 border-y px-3 py-16 sm:px-5 md:py-24">
        <div className="mx-auto grid max-w-[1434px] gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Eyebrow tone="ember">Why the name</Eyebrow>
          </div>

          <div className="lg:col-span-8">
            <div className="max-w-[52ch] text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.3]">
              <KineticText
                as="p"
                phrases={[
                  "The name comes from the biblical Parable of the Sower:",
                  "good ground is where seeds take root,",
                  "grow, and produce a harvest.",
                  "It's not a slogan we picked because it sounded nice —",
                  "it's how we think about building.",
                ]}
              />
            </div>
            <Reveal delay={0.1}>
              <p className="text-bark-muted mt-8 max-w-[52ch] text-[16px] leading-[1.7]">
                A logo without strategy has little value. A website without purpose rarely performs.
                Marketing can&rsquo;t fix a poor customer experience. Growth is the result of a
                strong foundation, not a substitute for one.
              </p>
              <p className="mt-5 text-[15px]">
                <ParableLink>Read the parable that inspired us →</ParableLink>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we believe. A numbered list, not cards: six one-line beliefs boxed
          six times would be a card grid for the sake of it. */}
      <Block tone="bark">
        <BlockInner>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>What we believe</Eyebrow>
                <h2 className="font-heading mt-6 max-w-[14ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                  Six things we don&rsquo;t argue about.
                </h2>
              </div>
            </div>

            <div className="lg:col-span-8">
              <RevealGroup className="border-t border-peach/20">
                {beliefs.map((belief, i) => (
                  <RevealItem key={belief}>
                    <div className="flex gap-6 border-b border-peach/20 py-5">
                      <span
                        aria-hidden="true"
                        className="font-heading text-ember pt-1 text-[13px] font-bold tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="max-w-[52ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.5] text-peach/90">
                        {belief}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </BlockInner>
      </Block>

      {/* How we work */}
      <section className="px-3 py-16 sm:px-5 md:py-24">
        <div className="mx-auto max-w-[1434px]">
          <Eyebrow tone="ember">How we work</Eyebrow>
          <h2 className="font-heading text-pine mt-6 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.03em]">
            Every project follows the same five stages.
          </h2>

          <RevealGroup className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((step) => (
              <RevealItem key={step.number}>
                <div className="border-t-2 border-ember/30 pt-4">
                  <p className="font-heading text-ember text-[13px] font-bold">{step.number}</p>
                  <h3 className="font-heading text-bark mt-2 text-[16px] font-bold">{step.title}</h3>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <p className="text-bark-muted mt-10 max-w-[58ch] text-[16px] leading-[1.7]">
              And every project can be paid off over 12 equal monthly instalments, so investing
              properly in your website doesn&rsquo;t mean disrupting your cash flow.{" "}
              <Link
                href="/#process"
                className="text-ember font-bold underline underline-offset-4"
              >
                See the full process
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Personal invitation. The copy deck gives this page its own closing, so
          the shared CTA banner would say the same thing twice. */}
      <section className="px-3 pb-16 sm:px-5 md:pb-24">
        <div className="bg-ember rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
          <div className="relative z-[2] px-6 py-14 sm:px-10 md:px-14 md:py-16">
            <div className="max-w-[44ch]">
              <KineticText
                phrases={["If you're building a business", "you plan to stick with", "for the long run,", "we'd like to hear about it."]}
                tone="light"
                className="font-heading text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em]"
              />
              <Reveal delay={0.08}>
                <p className="mt-5 text-[16px] leading-relaxed">
                  Get in touch, and let&rsquo;s talk about the ground you&rsquo;re building on.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/contact" variant="ink" size="lg">
                    Get in Touch
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
