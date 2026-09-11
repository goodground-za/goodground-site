import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { InsightsList, type ArticleSummary } from "@/components/InsightsList";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/content/articles";
import { pageSocialMeta } from "@/lib/metadata";

// Kept under ~60 chars so it doesn't truncate in search results.
const title = "Website Advice for South African Businesses";
const description =
  "Practical articles on website design, online presence and growth for South African small businesses. No jargon, no spam.";
const path = "/insights";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

export default function InsightsPage() {
  // Only the fields the listing actually renders. Passing the full `articles`
  // array into the client component would serialise every article's `body`
  // blocks into the RSC payload for no reason. `articles` is maintained
  // newest-first, so its first entry is the featured one.
  const summaries: ArticleSummary[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    date: a.date,
    readingMinutes: a.readingMinutes,
  }));

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Insights", path: "/insights" }]} />

      <PageHero
        eyebrow="Insights"
        title="Practical ideas for building online."
        intro="Straight-talking articles on website design, online presence and growth for South African small businesses. No jargon, no filler."
      />

      {/* pb-[24vw]: last section before the footer's CloudDivider (same
          reasoning as CTABand). */}
      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[1434px]">
          <InsightsList articles={summaries} />
        </div>
      </section>
    </>
  );
}
