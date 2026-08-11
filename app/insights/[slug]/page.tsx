import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
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

      {/* Compact dark band (same nav-contrast role as PageHero) sized to the
          article's own meta/title rather than a full generic hero, so the
          long-form reading body below isn't preceded by a lot of purple. */}
      <section className="bg-ht-purple relative z-10 rounded-b-[40px] px-6 pt-28 pb-14 sm:rounded-b-[56px] sm:px-10 sm:pt-32">
        <div className="mx-auto max-w-[760px]">
          <RevealSection>
            <Link href="/insights" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white/70 transition-colors hover:text-white">
              <span aria-hidden="true">←</span> All insights
            </Link>
          </RevealSection>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[13px] font-medium text-white/70">
            <span className="font-ht-display text-ht-pink text-[13px] font-bold tracking-[0.1em] uppercase">
              {article.category}
            </span>
            <span>{dateFmt.format(new Date(article.date))}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>

          <SplitWords
            as="h1"
            text={article.title}
            trigger="mount"
            className="font-ht-display mt-5 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] font-bold text-white uppercase"
          />
          <p className="mt-5 text-[14px] text-white/60">By {article.author}</p>
        </div>
      </section>

      {/* pb-[24vw]: last section before the footer's CloudDivider. */}
      <article className="bg-ht-cream px-6 pt-14 pb-[24vw] sm:px-10">
        <div className="mx-auto max-w-[760px]">
          <div>
            {article.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>

          {/* Soft CTA */}
          <div className="bg-ht-orange rounded-block shadow-[0_14px_0_0_var(--color-ht-purple)] mt-14 overflow-hidden">
            <div className="p-7 sm:p-10">
              <h2 className="font-ht-display text-[clamp(1.35rem,3vw,2rem)] leading-tight font-bold text-white uppercase">
                Ready to be found online?
              </h2>
              <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-white/90">
                We build fast, honest websites for South African small businesses, with a choice of
                how you pay for them. Have a look at{" "}
                <Link href="/services" className="underline underline-offset-4 hover:no-underline">
                  what we do
                </Link>
                , or tell us about yours.
              </p>
              <div className="mt-6">
                <MagneticButton>
                  <Link
                    href="/start-project"
                    className="font-ht-display bg-ht-purple rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide text-white uppercase shadow-soft transition-transform duration-200 hover:scale-[1.03]"
                  >
                    Start your project →
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

/**
 * Renders `[label](/path)` inside article text as a real link.
 *
 * The content model is deliberately plain typed data with no JSX (no CMS, see
 * the project constraint), so contextual internal links had no way to exist.
 * A tiny markdown-ish parser keeps `content/articles.ts` as data while letting
 * articles link to each other, which is what the SEO audit asked for.
 *
 * Internal paths use next/link; anything else renders as a normal anchor with
 * rel="noopener noreferrer" since it leaves the site.
 */
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function withLinks(text: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [full, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      href.startsWith("/") ? (
        <Link
          key={`${href}-${at}`}
          href={href}
          className="text-ht-orange font-medium underline underline-offset-4 hover:no-underline"
        >
          {label}
        </Link>
      ) : (
        <a
          key={`${href}-${at}`}
          href={href}
          rel="noopener noreferrer"
          className="text-ht-orange font-medium underline underline-offset-4 hover:no-underline"
        >
          {label}
        </a>
      ),
    );
    last = at + full.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length ? out : text;
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") {
    return (
      <h2 className="font-ht-display text-ht-purple mt-10 mb-4 text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight font-bold uppercase">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="my-5 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="text-ht-purple flex items-start gap-3 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7]">
            <span aria-hidden="true" className="bg-ht-orange mt-[11px] size-1.5 shrink-0 rounded-full" />
            <span>{withLinks(item)}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="border-ht-orange my-8 border-l-2 pl-5">
        <p className="font-ht-display text-ht-purple text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.4] font-bold italic">
          {block.text}
        </p>
      </blockquote>
    );
  }
  return (
    <p className="text-ht-purple/85 mt-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.75]">{withLinks(block.text)}</p>
  );
}
