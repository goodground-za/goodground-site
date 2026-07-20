import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/KineticText";
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
        phrases={["Practical ideas", "for building online."]}
        intro={
          <>
            Straight-talking articles on website design, online presence and growth for South
            African small businesses. No jargon, no filler.
          </>
        }
      />

      {/* Newest article gets the featured slot; everything else stacks three
          across on desktop. `articles` is maintained newest-first. */}
      <section className="px-3 pb-16 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
          <Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="bg-bark rounded-block grain group relative block overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift [&_:focus-visible]:outline-peach"
            >
              {/* Deliberately one column. A 8/4 split left the right third of a
                  1300px card empty, which is the same negative-space problem
                  PageHero was built to fix, and there is no article artwork to
                  fill it with. Prominence comes from scale and the bark panel. */}
              <div className="relative z-[2] p-8 sm:p-12 lg:p-14">
                {/* Separators are hidden below sm: when this row wraps on a
                    phone, a trailing "·" was left dangling at the end of the
                    first line. The gap alone reads fine there. */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="bg-ember text-peach rounded-pill font-heading px-3 py-1 text-[12px] font-bold tracking-[0.08em] uppercase">
                    Featured
                  </span>
                  <span className="text-peach/70 text-[13px] font-medium">{featured.category}</span>
                  <span aria-hidden="true" className="text-peach/40 hidden sm:inline">
                    ·
                  </span>
                  <span className="text-peach/70 text-[13px] font-medium">
                    {dateFmt.format(new Date(featured.date))}
                  </span>
                  <span aria-hidden="true" className="text-peach/40 hidden sm:inline">
                    ·
                  </span>
                  <span className="text-peach/70 text-[13px] font-medium">
                    {featured.readingMinutes} min read
                  </span>
                </div>

                <h2 className="font-heading text-peach mt-7 max-w-[24ch] text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.04] font-bold tracking-[-0.03em]">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-[62ch] text-[clamp(1rem,1.45vw,1.2rem)] leading-[1.6] text-peach/80">
                  {featured.excerpt}
                </p>

                <span className="text-peach mt-9 inline-flex items-center gap-2 text-[15px] font-bold">
                  Read the article
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          {rest.length > 0 ? (
            <>
              <h2 className="font-heading text-pine mt-16 text-[clamp(1.25rem,2vw,1.6rem)] font-bold tracking-[-0.02em]">
                More articles
              </h2>
              <RevealGroup className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <RevealItem key={article.slug}>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="rounded-block bg-surface border-bark/10 group flex h-full flex-col border p-7 transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-lift"
                    >
                      <div className="text-bark-muted flex items-center gap-3 text-[13px] font-medium">
                        <span className="bg-ember/10 text-ember rounded-pill px-3 py-1 font-bold">
                          {article.category}
                        </span>
                        <span>{article.readingMinutes} min read</span>
                      </div>
                      <h3 className="font-heading text-pine mt-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-tight font-bold tracking-[-0.02em]">
                        {article.title}
                      </h3>
                      <p className="text-bark-muted mt-3 flex-1 text-[15px] leading-[1.6]">
                        {article.excerpt}
                      </p>
                      <span className="text-ember mt-6 inline-flex items-center gap-2 text-[14px] font-bold">
                        Read the article
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-150 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
