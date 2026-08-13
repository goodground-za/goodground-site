"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";

/**
 * Category filter + article list for /insights.
 *
 * Deliberately takes a trimmed summary shape rather than the full `Article`:
 * passing `articles` straight through would serialise every article's entire
 * `body` block array into the RSC payload for a page that only renders titles
 * and excerpts. That's tens of KB of prose the listing never uses.
 *
 * Filtering is client-side and the default state renders every article, so the
 * server HTML a crawler sees still contains the whole list. No article is
 * hidden behind an interaction.
 */

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
};

const dateFmt = new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric" });

const ALL = "All";

/**
 * Wraps the results in the site's scroll-reveal on first paint, and in a plain
 * div once the visitor has filtered.
 *
 * The reveal is wrong for a filter interaction in two ways. It sets children to
 * `opacity: 0` and only tweens them back when the container scrolls into view,
 * so results landing below the fold stay invisible and the click looks like it
 * did nothing. And a card that survives a filter change can keep an inline
 * `opacity: 0` from that initial set. Swapping the wrapper sidesteps both:
 * unmounting the reveal reverts its inline styles, and the plain div's children
 * mount at their natural opacity.
 */
function ResultsWrap({
  reveal,
  stagger = false,
  className = "",
  children,
}: {
  reveal: boolean;
  stagger?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (!reveal) return <div className={className}>{children}</div>;
  if (stagger) {
    return (
      <RevealStagger className={className} y={16} duration={0.5} stagger={0.05}>
        {children}
      </RevealStagger>
    );
  }
  return <RevealSection className={className}>{children}</RevealSection>;
}

export function InsightsList({ articles }: { articles: ArticleSummary[] }) {
  const [active, setActive] = useState(ALL);
  // Scroll-reveal is right for the first paint (it matches every other section
  // on the site) but wrong for a filter: results that land below the fold would
  // sit invisible until the user scrolled, so clicking a category would look
  // like nothing happened. Once the visitor has filtered even once, results
  // render immediately instead.
  const [hasFiltered, setHasFiltered] = useState(false);

  const select = (name: string) => {
    setActive(name);
    setHasFiltered(true);
  };

  // Counts drive both the labels and the tab order. Sorted by volume so the
  // richest categories read first, with an alphabetical tiebreak so the order
  // is stable rather than dependent on array position.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return [{ name: ALL, count: articles.length }, ...sorted.map(([name, count]) => ({ name, count }))];
  }, [articles]);

  const visible = active === ALL ? articles : articles.filter((a) => a.category === active);

  // The featured treatment only makes sense for the full list, where "newest
  // article" is meaningful. Inside a filtered view every result is equally
  // relevant, so they all get the same card.
  const showFeatured = active === ALL && visible.length > 0;
  const featured = showFeatured ? visible[0] : null;
  const rest = showFeatured ? visible.slice(1) : visible;

  return (
    <>
      <RevealSection>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles by category">
          {categories.map((cat) => {
            const isActive = cat.name === active;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => select(cat.name)}
                aria-pressed={isActive}
                // py-3 not py-2.5: takes the tap target to 44px, the mobile
                // ergonomics bar. Most of this audience is on a phone.
                className={`font-ht-display rounded-pill inline-flex cursor-pointer items-center gap-2 px-5 py-3 text-[13px] font-bold tracking-wide uppercase transition-colors duration-150 ${
                  isActive
                    ? "bg-ht-orange text-ink"
                    : "text-ht-purple ring-ht-purple/15 hover:ring-ht-purple/40 bg-white ring-1"
                }`}
              >
                {cat.name}
                <span className={`tabular-nums ${isActive ? "text-ink/60" : "text-ht-purple/60"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Announced on filter change so a screen reader hears the result count
            instead of silently swapped content. */}
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
          {active === ALL ? "" : ` in ${active}`}.
        </p>
      </RevealSection>

      {featured ? (
        <ResultsWrap reveal={!hasFiltered} className="mt-10">
          <Link
            href={`/insights/${featured.slug}`}
            className="bg-ht-purple rounded-block group relative block overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift"
          >
            {/* Deliberately one column. A 8/4 split left the right third of a
                1300px card empty, and there is no article artwork to fill it
                with. Prominence comes from scale and the purple panel. */}
            <div className="p-8 sm:p-12 lg:p-14">
              {/* Separators hidden below sm: when this row wraps on a phone, a
                  trailing "·" was left dangling at the end of the first line. */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="bg-ht-orange text-ink font-ht-display rounded-pill px-3 py-1 text-[12px] font-bold tracking-[0.08em] uppercase">
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
        </ResultsWrap>
      ) : null}

      {rest.length > 0 ? (
        <>
          {showFeatured ? (
            <h2 className="font-ht-display text-ht-purple mt-16 text-[clamp(1.25rem,2vw,1.6rem)] font-bold uppercase">
              More articles
            </h2>
          ) : null}
          <ResultsWrap
            reveal={!hasFiltered}
            stagger
            className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${showFeatured ? "mt-6" : "mt-10"}`}
          >
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="rounded-card ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] group flex h-full flex-col bg-white p-7 ring-2 transition-transform duration-150 ease-out hover:-translate-y-1"
              >
                <div className="text-ht-purple/70 flex items-center gap-3 text-[13px] font-medium">
                  <span className="bg-ht-orange/10 text-ht-crimson rounded-pill px-3 py-1 font-bold">
                    {article.category}
                  </span>
                  <span>{article.readingMinutes} min read</span>
                </div>
                <h3 className="font-ht-display text-ht-purple mt-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-tight font-bold">
                  {article.title}
                </h3>
                <p className="text-ht-purple/70 mt-3 flex-1 text-[15px] leading-[1.6]">{article.excerpt}</p>
                <span className="text-ht-crimson mt-6 inline-flex items-center gap-2 text-[14px] font-bold">
                  Read the article
                  <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </ResultsWrap>
        </>
      ) : null}
    </>
  );
}
