import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/KineticText";
import { articles, type Block, getArticle } from "@/content/articles";
import { site } from "@/content/site";

const dateFmt = new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric" });

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: { absolute: `${article.metaTitle} | GoodGround` },
    description: article.metaDescription,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${site.url}/insights/${article.slug}`,
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: article.author, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/insights/${article.slug}`,
    keywords: article.keyword,
    inLanguage: "en-ZA",
  };

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="px-3 pt-10 pb-16 sm:px-5 sm:pt-16 md:pb-24">
        <div className="mx-auto max-w-[760px] px-3 sm:px-6">
          <Reveal>
            <Link href="/insights" className="text-bark-muted hover:text-ember inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors">
              <span aria-hidden="true">←</span> All insights
            </Link>
          </Reveal>

          <div className="text-bark-muted mt-8 flex flex-wrap items-center gap-3 text-[13px] font-medium">
            <Eyebrow tone="ember">{article.category}</Eyebrow>
            <span>{dateFmt.format(new Date(article.date))}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>

          <h1 className="font-heading text-pine mt-5 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.03em]">
            {article.title}
          </h1>
          <p className="text-bark-muted mt-5 text-[14px]">
            By {article.author}
          </p>

          <div className="mt-10">
            {article.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>

          {/* Soft CTA */}
          <div className="bg-ember rounded-block grain text-peach mt-14 overflow-hidden">
            <div className="relative z-[2] p-7 sm:p-10">
              <h2 className="font-heading text-[clamp(1.35rem,3vw,2rem)] leading-tight font-bold tracking-[-0.02em]">
                Ready to be found online?
              </h2>
              <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-peach/90">
                We build fast, honest websites for South African small businesses, paid over 12 equal
                monthly payments. Have a look at{" "}
                <Link href="/services" className="underline underline-offset-4 hover:no-underline">
                  what we do
                </Link>
                , or tell us about yours.
              </p>
              <div className="mt-6">
                <ButtonLink href="/start-project" variant="ink" size="lg">
                  Start your project →
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") {
    return (
      <h2 className="font-heading text-pine mt-10 mb-4 text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight font-bold tracking-[-0.02em]">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="my-5 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="text-bark flex items-start gap-3 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7]">
            <span aria-hidden="true" className="bg-ember mt-[11px] size-1.5 shrink-0 rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="border-ember my-8 border-l-2 pl-5">
        <p className="font-heading text-pine text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.4] font-bold italic">
          {block.text}
        </p>
      </blockquote>
    );
  }
  return (
    <p className="text-bark mt-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.75]">{block.text}</p>
  );
}
