import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { HoverCard } from "@/components/motion-gsap/HoverCard";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { PageHero } from "@/components/PageHero";
import { FAQSchema } from "@/components/Schema";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { getArticle } from "@/content/articles";
import { servicePages } from "@/content/servicePages";
import { site } from "@/content/site";

/**
 * One shared renderer for every /services/<slug> dedicated service page (dev
 * brief follow-up: individual services had real search demand but no URL of
 * their own). Each route file is just `export const metadata` + this
 * component with a slug, same thin-page pattern as the industry pages
 * (components/sections/IndustryPageTemplate.tsx).
 */
export function ServicePageTemplate({ slug }: { slug: string }) {
  const entry = servicePages.find((p) => p.slug === slug);
  if (!entry) return null;

  const relatedArticles = (entry.relatedArticleSlugs ?? [])
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

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

      <PageHero eyebrow="What we do" title={entry.h1} intro={entry.heroIntro}>
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

      {/* Pain points, same numbered-card language as the industry pages. */}
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
        </div>
      </section>

      {/* What's included + local proof, in the purple band used across the
          rest of the site for a mid-page tonal break. */}
      <section className="bg-ht-cream relative z-10 px-6 pb-8 sm:px-10">
        <div className="bg-ht-purple rounded-block mx-auto max-w-[1434px] overflow-hidden">
          <div className="grid gap-10 px-6 py-14 sm:px-10 md:py-20 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-5">
              <RevealSection>
                <p className="font-ht-display text-ht-pink text-[13px] font-bold tracking-[0.15em] uppercase">
                  What&rsquo;s included
                </p>
                <h2 className="font-ht-display mt-4 max-w-[18ch] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] font-bold text-white uppercase">
                  {entry.title}
                </h2>
              </RevealSection>
              {entry.serviceRef ? (
                <RevealSection delay={0.08} className="mt-6">
                  <Link
                    href={`/services#${entry.serviceRef}`}
                    className="text-ht-pink text-[14px] font-bold underline underline-offset-4 hover:no-underline"
                  >
                    See it alongside every other service →
                  </Link>
                </RevealSection>
              ) : null}
            </div>

            <div className="min-w-0 lg:col-span-7">
              <RevealStagger className="space-y-4" y={12}>
                {entry.included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="bg-ht-orange mt-[9px] size-1.5 shrink-0 rounded-full" />
                    <p className="text-[15px] leading-[1.65] text-white/85">{item}</p>
                  </div>
                ))}
              </RevealStagger>

              <RevealSection delay={0.1} className="mt-8">
                <p className="text-[15px] leading-[1.65] text-white/70">{entry.localProof}</p>
              </RevealSection>

              <RevealSection delay={0.14} className="mt-8">
                <MagneticButton>
                  <Link
                    href={entry.ctaHref}
                    className="font-ht-display bg-ht-cream text-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase shadow-soft transition-transform duration-200 hover:scale-[1.03]"
                  >
                    {entry.ctaLabel}
                  </Link>
                </MagneticButton>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related reading (SEO audit 2026-08-16, item 7): links the blog and
          this service together in both directions, where relatedArticleSlugs
          is set. The article itself links back via its own related-services
          block. */}
      {relatedArticles.length > 0 ? (
        <section className="bg-ht-cream px-6 pb-4 sm:px-10">
          <div className="mx-auto max-w-[1434px]">
            <RevealSection>
              <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
                Related reading
              </p>
            </RevealSection>
            <RevealStagger className="mt-5 grid gap-5 sm:grid-cols-2" y={16}>
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/insights/${article.slug}`} className="block">
                  <HoverCard className="bg-white ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] rounded-card h-full p-6 ring-2">
                    <h3 className="font-ht-display text-ht-purple text-[15px] font-bold leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-ht-purple/70 mt-2.5 text-[13.5px] leading-[1.6]">{article.excerpt}</p>
                  </HoverCard>
                </Link>
              ))}
            </RevealStagger>
          </div>
        </section>
      ) : null}

      <div className="bg-ht-cream">
        <FAQAccordion items={entry.faq} heading={`Questions about ${entry.title.toLowerCase()}.`} />
        <CTABand />
      </div>
    </>
  );
}
