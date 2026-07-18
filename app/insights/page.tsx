import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/KineticText";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Insights | Website Design & Growth for South African Businesses",
  description:
    "Practical articles on website design, online presence and growth for South African small businesses. No jargon, no spam.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
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

      <section className="px-3 pb-16 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
          <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
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
                  <h2 className="font-heading text-pine mt-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-tight font-bold tracking-[-0.02em]">
                    {article.title}
                  </h2>
                  <p className="text-bark-muted mt-3 flex-1 text-[15px] leading-[1.6]">
                    {article.excerpt}
                  </p>
                  <span className="text-ember mt-6 inline-flex items-center gap-2 text-[14px] font-bold">
                    Read the article
                    <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
