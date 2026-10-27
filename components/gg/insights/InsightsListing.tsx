"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { Button, ButtonLink } from "../Button";
import { ArticleCover } from "../ArticleCover";
import { Icon } from "../Icon";
import { LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { Tag } from "../Tag";
import { TOPIC_LABEL, TOPIC_TONE, formatLong, topicsPresent, type ArticleCard, type Topic } from "./data";

type Filter = "all" | Topic;
const PAGE = 9;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

/** The featured cover is a custom illustration: price bars that grow one after another (GoodGround last, coral). */
function PriceCover() {
  const bars = [
    { label: "DIY builder", pct: 28, tone: "25" },
    { label: "Freelancer", pct: 50, tone: "40" },
    { label: "Agency", pct: 92, tone: "55" },
    { label: "GoodGround", pct: 60, tone: "coral" },
  ];
  return (
    <div className="in-pricecover" role="img" aria-label="Illustration of build cost ranges for DIY builders, freelancers, agencies and GoodGround. Illustration only; real 2026 numbers are in the article.">
      <p className="gg-kicker in-pricecover__title" aria-hidden="true">
        WHAT A WEBSITE COSTS
      </p>
      <ul aria-hidden="true">
        {bars.map((bar, i) => (
          <li key={bar.label} style={{ "--i": i } as CSSProperties}>
            <span>{bar.label}</span>
            <span className="in-pricecover__track">
              <i className={`is-${bar.tone}`} style={{ width: `${bar.pct}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="in-pricecover__note" aria-hidden="true">
        Illustration only. Real 2026 numbers are in the article.
      </p>
    </div>
  );
}

function Meta({ card }: { card: ArticleCard }) {
  return (
    <span className="in-meta">
      <Tag tone={TOPIC_TONE[card.topic]}>{TOPIC_LABEL[card.topic].toUpperCase()}</Tag>
      <span className="in-meta__time">
        <Icon name="clock" size={14} stroke={2.2} />
        <span className="gg-resp-long">{card.minutes} min read</span>
        <span className="gg-resp-short">{card.minutes} min</span>
      </span>
    </span>
  );
}

/**
 * Insights 02-04: the topic filter, the featured article and the grid.
 *
 * Topic chips are a single-select radiogroup (arrow keys move and select) with
 * an ink pill that slides between them, live counts, an aria-live "Showing n
 * articles" and ?topic= in the URL. Filtering uses the same FLIP pass as /work
 * (leavers fade and scale to 0.96, stayers slide, entrants fade in). The
 * featured card hides when it is not in the chosen topic. After nine cards a
 * "Show more articles" button reveals nine more and focuses the first new card;
 * there is no infinite scroll. The "Ask a question" card is always last.
 */
export function InsightsListing({ cards }: { cards: ArticleCard[] }) {
  const featured = cards.find((c) => c.featured) ?? cards[0];
  const rest = useMemo(() => cards.filter((c) => c !== featured), [cards, featured]);

  const [filter, setFilter] = useState<Filter>("all");
  const [rendered, setRendered] = useState<string[]>(rest.map((c) => c.slug));
  const [leaving, setLeaving] = useState<string[]>([]);
  const [limit, setLimit] = useState(PAGE);
  const refs = useRef(new Map<string, HTMLElement>());
  const first = useRef(new Map<string, DOMRect>());
  const entering = useRef<string[]>([]);
  const timer = useRef(0);
  const focusNew = useRef<string | null>(null);

  const keys: Filter[] = ["all", ...topicsPresent];
  const count = (f: Filter) => cards.filter((c) => f === "all" || c.topic === f).length;
  const matches = useCallback((c: ArticleCard, f: Filter) => f === "all" || c.topic === f, []);
  const showFeatured = featured ? matches(featured, filter) : false;
  const total = count(filter);

  // ?topic= on arrival (set in a frame so state is not set synchronously in the effect).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const wanted = new URLSearchParams(window.location.search).get("topic");
      const f = topicsPresent.find((t) => t === wanted);
      if (f) {
        setFilter(f);
        setRendered(rest.filter((c) => c.topic === f).map((c) => c.slug));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [rest]);

  const apply = (next: Filter) => {
    setFilter(next);
    setLimit(PAGE);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("topic");
    else url.searchParams.set("topic", next);
    history.replaceState(null, "", url);

    const target = rest.filter((c) => matches(c, next)).map((c) => c.slug);
    window.clearTimeout(timer.current);
    if (reduced()) {
      setRendered(target);
      setLeaving([]);
      return;
    }
    first.current = new Map();
    refs.current.forEach((el, slug) => first.current.set(slug, el.getBoundingClientRect()));
    const going = rendered.filter((slug) => !target.includes(slug));
    entering.current = target.filter((slug) => !rendered.includes(slug));
    setLeaving(going);
    timer.current = window.setTimeout(
      () => {
        setLeaving([]);
        setRendered(target);
      },
      going.length ? 200 : 0,
    );
  };

  useLayoutEffect(() => {
    if (!first.current.size && !entering.current.length) return;
    refs.current.forEach((el, slug) => {
      if (entering.current.includes(slug)) {
        el.animate(
          [
            { opacity: 0, transform: "scale(0.96)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 300, delay: 60 * entering.current.indexOf(slug) + 200, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "backwards" },
        );
        return;
      }
      const before = first.current.get(slug);
      if (!before) return;
      const after = el.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (!dx && !dy) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 400, easing: "cubic-bezier(0.65,0,0.35,1)" });
    });
    first.current = new Map();
    entering.current = [];
  }, [rendered]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // After "Show more", focus the first new card.
  useEffect(() => {
    if (!focusNew.current) return;
    const el = refs.current.get(focusNew.current)?.querySelector<HTMLElement>("a");
    focusNew.current = null;
    el?.focus({ preventScroll: false });
  }, [limit]);

  const onKey = (event: React.KeyboardEvent, index: number) => {
    const move = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!move) return;
    event.preventDefault();
    const nextIndex = (index + move + keys.length) % keys.length;
    apply(keys[nextIndex]);
    (event.currentTarget.parentElement?.querySelectorAll("[role=radio]")[nextIndex] as HTMLElement | undefined)?.focus();
  };

  const visible = rest.filter((c) => rendered.includes(c.slug));
  const shown = visible.slice(0, limit);
  const hiddenCount = visible.length - shown.length;
  const pillIndex = keys.indexOf(filter);

  return (
    <div className="in-zone">
      <div className="in-filter-wrap">
        <div className="gg-wrap">
          <div className="in-filter">
            <div className="in-chips" role="radiogroup" aria-label="Topic" style={{ "--k": pillIndex, "--n": keys.length } as CSSProperties}>
              <span className="in-chips__pill" aria-hidden="true" />
              {keys.map((key, i) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={filter === key}
                  tabIndex={filter === key ? 0 : -1}
                  className="in-chip"
                  onClick={() => apply(key)}
                  onKeyDown={(event) => onKey(event, i)}
                >
                  {key === "all" ? "All" : TOPIC_LABEL[key]}
                  <span className="in-chip__count">{count(key)}</span>
                </button>
              ))}
            </div>
            <p className="in-count" role="status" aria-live="polite">
              Showing {total} article{total === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      <section className="hm-section hm-section--canvas in-featured-section" aria-label="Featured article">
        <div className="gg-wrap">
          {featured && showFeatured ? (
            <LinkedCard href={`/insights/${featured.slug}`} className="in-featured" data-reveal="group">
              <span className="in-featured__cover">{featured.slug.includes("website-cost") || featured.topic === "pricing" ? <PriceCover /> : <ArticleCover topic={featured.topic} />}</span>
              <span className="in-featured__body">
                <span className="in-meta in-meta--featured">
                  <Tag tone="coral">FEATURED</Tag>
                  <Tag tone={TOPIC_TONE[featured.topic]}>{TOPIC_LABEL[featured.topic].toUpperCase()}</Tag>
                  <span className="in-meta__date">
                    {formatLong(featured.date)} <span aria-hidden="true">·</span> {featured.minutes} min read
                  </span>
                </span>
                <span className="in-featured__title">{featured.title}</span>
                <span className="in-featured__excerpt">
                  <Resp long={featured.excerpt} short={featured.shortExcerpt} />
                </span>
                <span className="in-featured__cta">
                  <span className="gg-btn in-btnface">
                    <span className="gg-btn__label">Read the article</span>
                    <span className="gg-btn__chip" aria-hidden="true">
                      <Icon name="arrow-up-right" size={16} stroke={2.2} />
                    </span>
                  </span>
                </span>
              </span>
            </LinkedCard>
          ) : null}
        </div>
      </section>

      <section className="hm-section hm-section--canvas in-more" aria-labelledby="in-more-title">
        <div className="gg-wrap">
          <h2 id="in-more-title" className="in-more__title">
            More articles
          </h2>
          <ul className="in-grid">
            {shown.map((card) => (
              <li
                key={card.slug}
                className={leaving.includes(card.slug) ? "in-grid__item is-leaving" : "in-grid__item"}
                ref={(el) => {
                  if (el) refs.current.set(card.slug, el);
                  else refs.current.delete(card.slug);
                }}
              >
                <LinkedCard href={`/insights/${card.slug}`} className="in-card">
                  <span className="in-card__cover">
                    <ArticleCover topic={card.topic} />
                  </span>
                  <span className="in-card__body">
                    <Meta card={card} />
                    <span className="in-card__title">{card.title}</span>
                    <span className="in-card__excerpt">{card.excerpt}</span>
                    <span className="in-card__link">
                      Read the article
                      <Icon name="arrow-up-right" size={16} stroke={2.2} />
                    </span>
                  </span>
                </LinkedCard>
              </li>
            ))}
            <li className="in-grid__item in-grid__ask">
              <div className="in-ask">
                <span className="in-ask__icon" aria-hidden="true">
                  <Icon name="chat" size={26} stroke={2} />
                </span>
                <div className="in-ask__copy">
                  <h3>Got a question we haven’t answered yet?</h3>
                  <p>Ask us. If it’s useful to others, it might become the next article.</p>
                </div>
                <ButtonLink href="/contact?topic=general&ref=insights" variant="light">
                  Ask a question
                </ButtonLink>
              </div>
            </li>
          </ul>
          {hiddenCount > 0 ? (
            <div className="in-showmore">
              <Button
                variant="outline"
                onClick={() => {
                  focusNew.current = visible[limit]?.slug ?? null;
                  setLimit(limit + PAGE);
                }}
              >
                Show more articles
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
