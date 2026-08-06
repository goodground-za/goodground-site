import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { articles } from "@/content/articles";

const dateFmt = new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric" });

export const metadata: Metadata = {
  // Kept under ~60 chars so it doesn't truncate in search results. The layout
  // template appends " | GoodGround".
  title: "Website Advice for South African Businesses",
  description:
    "Practical articles on website design, online presence and growth for South African small businesses. No jargon, no spam.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Insights", path: "/insights" }]} />

      <PageHero
        eyebrow="Insights"
        title="Practical ideas for building online."
        intro="Straight-talking articles on website design, online presence and growth for South African small businesses. No jargon, no filler."
      />

      {/* Newest article gets the featured slot; everything else stacks three
          across on desktop. `articles` is maintained newest-first. pb-[24vw]:
          this is the last section before the footer's CloudDivider (same
          reasoning as CTABand). */}
      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <Link
              href={`/insights/${featured.slug}`}
              className="bg-ht-purple rounded-block group relative block overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift"
            >
              {/* Deliberately one column. A 8/4 split left the right third of a
                  1300px card empty, which is the same negative-space problem
                  PageHero was built to fix, and there is no article artwork to
                  fill it with. Prominence comes from scale and the purple panel. */}
              <div className="p-8 sm:p-12 lg:p-14">
                {/* Separators are hidden below sm: when this row wraps on a
                    phone, a trailing "·" was left dangling at the end of the
                    first line. The gap alone reads fine there. */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="bg-ht-orange font-ht-display rounded-pill px-3 py-1 text-[12px] font-bold tracking-[0.08em] text-white uppercase">
                    Featured
                  </span>
                  <span className="text-[13px] font-medium text-white/70">{featured.category}</span>
                  <span aria-hidden="true" className="hidden text-white/40 sm:inline">
                    ·
                  </span>
                  <span className="text-[13px] font-medium text-white/70">
                    {dateFmt.format(new Date(featured.date))}
                  </span>
                  <span aria-hidden="true" className="hidden text-white/40 sm:inline">
                    ·
                  </span>
                  <span className="text-[13px] font-medium text-white/70">
                    {featured.readingMinutes} min read
                  </span>
                </div>

                <h2 className="font-ht-display mt-7 max-w-[24ch] text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.04] font-bold text-white uppercase">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-[62ch] text-[clamp(1rem,1.45vw,1.2rem)] leading-[1.6] text-white/80">
                  {featured.excerpt}
                </p>

                <span className="mt-9 inline-flex items-center gap-2 text-[15px] font-bold text-white">
                  Read the article
                  <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </RevealSection>

          {rest.length > 0 ? (
            <>
              <h2 className="font-ht-display text-ht-purple mt-16 text-[clamp(1.25rem,2vw,1.6rem)] font-bold uppercase">
                More articles
              </h2>
              <RevealStagger className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3" y={16}>
                {rest.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/insights/${article.slug}`}
                    className="rounded-card ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] group flex h-full flex-col bg-white p-7 ring-2 transition-transform duration-150 ease-out hover:-translate-y-1"
                  >
                    <div className="text-ht-purple/60 flex items-center gap-3 text-[13px] font-medium">
                      <span className="bg-ht-orange/10 text-ht-orange rounded-pill px-3 py-1 font-bold">
                        {article.category}
                      </span>
                      <span>{article.readingMinutes} min read</span>
                    </div>
                    <h3 className="font-ht-display text-ht-purple mt-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-tight font-bold">
                      {article.title}
                    </h3>
                    <p className="text-ht-purple/70 mt-3 flex-1 text-[15px] leading-[1.6]">
                      {article.excerpt}
                    </p>
                    <span className="text-ht-orange mt-6 inline-flex items-center gap-2 text-[14px] font-bold">
                      Read the article
                      <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </RevealStagger>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
