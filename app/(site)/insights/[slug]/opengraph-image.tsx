import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";
import { articles, getArticle } from "@/content/articles";

export const alt = "GoodGround Insights article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Without this the article OG images render on demand instead of at build time.
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

// Next 16: params is a Promise and must be awaited, same as the page itself.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  return renderOgCard({
    eyebrow: "Insights",
    // metaTitle, not title: the H1 carries a parenthetical that runs too long
    // for a 1200x630 card.
    title: article?.metaTitle ?? "Insights",
  });
}
