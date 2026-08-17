import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { PageHero } from "@/components/PageHero";
import { FAQSchema } from "@/components/Schema";
import { ServiceAccordion } from "@/components/ServiceAccordion";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { industryPages } from "@/content/industryPages";
import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * One shared renderer for every /services/<industry-slug> page (dev brief
 * follow-up: the six segments named in content/industries.ts had no pages of
 * their own). Each route file is just `export const metadata` + this
 * component with a slug — same thin-page pattern as /about, /pricing, /faq.
 */
export function IndustryPageTemplate({ slug }: { slug: string }) {
  const entry = industryPages.find((p) => p.slug === slug);
  if (!entry) return null;

  const relevantServices = services.filter((s) => entry.relevantServiceSlugs.includes(s.slug));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${entry.slug}#service`,
    name: entry.h1,
    description: entry.metaDescription,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "City", name: site.address.locality },
    ],
    url: `${site.url}/services/${entry.slug}`,
  };

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }, { name: entry.title, path: `/services/${entry.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <FAQSchema items={entry.faq} id={`${entry.slug}-faq`} />

      {/* Names the real town rather than just "South Africa" (SEO audit
          2026-08-16, item 19) — a genuine local anchor alongside the
          national positioning the rest of this page argues for. */}
      <PageHero
        eyebrow="Who we build for"
        title={entry.h1}
        intro={`${entry.heroIntro} We're based in George, on South Africa's Garden Route.`}
      >
        <RevealSection delay={0.14} className="mt-8 flex flex-wrap justify-center gap-2">
          {entry.keywordChips.map((chip) => (
            <span
              key={chip}
              className="font-ht-body rounded-pill inline-flex items-center border border-white/25 px-4 py-2 text-[13px] font-medium text-white"
            >
              {chip}
            </span>
          ))}
        </RevealSection>
      </PageHero>

      {/* Pain points — same numbered-card language as SixReasons/WhoWeBuildFor,
          kept to three so it reads as specific rather than padded. */}
      <section className="bg-ht-cream px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealStagger className="grid gap-5 sm:grid-cols-3" y={16}>
            {entry.painPoints.map((point, i) => (
              <HoverCard
                key={point.title}
                className="bg-white ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] rounded-card p-6 ring-2"
              >
                <p className="font-ht-display text-ht-crimson text-[13px] font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-ht-display text-ht-purple mt-3 text-[16px] font-bold">{point.title}</h2>
                <p className="text-ht-purple/70 mt-2.5 text-[14px] leading-[1.6]">{point.body}</p>
              </HoverCard>
            ))}
          </RevealStagger>

          <RevealSection delay={0.1} className="mt-10">
            <p className="text-ht-purple/70 mx-auto max-w-[70ch] text-center text-[16px] leading-[1.7]">
              {entry.localProof}
            </p>
          </RevealSection>

          {/* Honest placeholder (SEO audit 2026-08-16, item 18): this page
              describes who we build for, not proof we've already shipped
              for this specific segment — no case study on /work is a
              {entry.title} project. Silence there reads as an oversight;
              saying so plainly reads as momentum, same framing /work
              already uses for "coming soon". Deliberately doesn't claim an
              active project in this segment, since that isn't something we
              can currently verify. */}
          <RevealSection delay={0.14} className="mt-6">
            <div className="border-ht-purple/15 rounded-block mx-auto max-w-[70ch] border-2 border-dashed p-6 text-center">
              <p className="text-ht-purple/70 text-[14px] leading-[1.6]">
                We haven&rsquo;t published a live {entry.title.toLowerCase()} project yet.{" "}
                <Link href="/contact" className="text-ht-crimson font-bold underline underline-offset-4">
                  Get in touch and we&rsquo;ll tell you honestly what we&rsquo;re currently working on
                </Link>
                .
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* What's included — same accordion used on /services, filtered to
          what this segment actually needs. */}
      <section className="bg-ht-cream px-6 pb-16 sm:px-10 md:pb-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
              What&rsquo;s included
            </p>
            <h2 className="font-ht-display text-ht-purple mt-6 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold uppercase">
              Built around what {entry.title.toLowerCase()} businesses actually need.
            </h2>
          </RevealSection>

          <div className="mt-10">
            <ServiceAccordion services={relevantServices} variant="compact" />
          </div>

          <RevealSection delay={0.1}>
            <p className="text-ht-purple/70 mt-10 max-w-[58ch] text-[16px] leading-[1.7]">
              Every project is one fixed price. Pay a 50% deposit and the rest on completion, or spread it
              over 12 monthly instalments.{" "}
              <Link href="/pricing" className="text-ht-crimson font-bold underline underline-offset-4">
                See pricing
              </Link>{" "}
              or{" "}
              <Link href="/services" className="text-ht-crimson font-bold underline underline-offset-4">
                view every service
              </Link>
              .
            </p>
          </RevealSection>
        </div>
      </section>

      <div className="bg-ht-cream">
        <FAQAccordion items={entry.faq} heading={`Questions ${entry.title.toLowerCase()} businesses ask us.`} />
        <CTABand />
      </div>
    </>
  );
}
