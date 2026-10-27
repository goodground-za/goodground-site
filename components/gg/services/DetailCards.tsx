"use client";

import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Tag } from "../Tag";
import { DETAILS, type Detail } from "./data";

type Tab = "problem" | "approach" | "outcome";
const TABS: { key: Tab; label: string; icon: "alert" | "compass" | "sprout"; kicker: string }[] = [
  { key: "problem", label: "Problem", icon: "alert", kicker: "THE PROBLEM" },
  { key: "approach", label: "Approach", icon: "compass", kicker: "OUR APPROACH" },
  { key: "outcome", label: "Outcome", icon: "sprout", kicker: "THE OUTCOME" },
];

/**
 * Services 04: every service as a Problem → Approach → Outcome story. Desktop
 * shows all seven fully. Phones show an accordion (the first card, or the hash
 * target, open; opening one closes the others) with a Problem | Approach |
 * Outcome control inside the open card (default Approach; swipe also switches).
 * Arriving with a hash scrolls to the card and outlines it in coral for 1.2s.
 */
export function DetailCards() {
  const [open, setOpen] = useState<string>(DETAILS[0].id);
  const [tab, setTab] = useState<Record<string, Tab>>({});
  const [ring, setRing] = useState<string | null>(null);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!DETAILS.some((d) => d.id === id)) return;
    // Open it and outline it once the page has settled.
    const timer = window.setTimeout(() => {
      setOpen(id);
      setRing(id);
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120 });
      window.setTimeout(() => setRing(null), 1200);
    }, 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="hm-section hm-section--surface sv-detail" aria-labelledby="sv-detail-title">
      <div className="gg-wrap hm-stack sv-detail__stack">
        <div className="sv-detail__head" data-reveal="header">
          <Tag data-part="tag">IN DETAIL</Tag>
          <h2 id="sv-detail-title" className="gg-h2 hm-h2" data-part="sub">
            Everything we build, in detail.
          </h2>
        </div>
        <div className="sv-cards">
          {DETAILS.map((d) => (
            <Card
              key={d.id}
              d={d}
              isOpen={open === d.id}
              ringed={ring === d.id}
              tab={tab[d.id] ?? "approach"}
              onToggle={() => setOpen(open === d.id ? "" : d.id)}
              onTab={(t) => setTab((prev) => ({ ...prev, [d.id]: t }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  d,
  isOpen,
  ringed,
  tab,
  onToggle,
  onTab,
}: {
  d: Detail;
  isOpen: boolean;
  ringed: boolean;
  tab: Tab;
  onToggle: () => void;
  onTab: (t: Tab) => void;
}) {
  const touch = useRef(0);
  const text: Record<Tab, string> = { problem: d.problem, approach: d.approach, outcome: d.outcome };
  const onTouchEnd = (event: TouchEvent) => {
    const dx = event.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) < 50) return;
    const i = TABS.findIndex((t) => t.key === tab) + (dx < 0 ? 1 : -1);
    if (i >= 0 && i < TABS.length) onTab(TABS[i].key);
  };
  const cls = ["sv-card", isOpen && "is-open", ringed && "is-ringed"].filter(Boolean).join(" ");

  return (
    <>
    {d.id === "seo" ? <span id="seo-foundations" className="sv-alias" /> : null}
    <article id={d.id} className={cls} data-reveal="group">
      <button
        type="button"
        className="sv-card__toggle"
        aria-expanded={isOpen}
        aria-controls={`${d.id}-panel`}
        onClick={onToggle}
      >
        <span className={`sv-card__chip sv-card__chip--${d.chip}`}>
          <Icon name={d.icon} size={20} stroke={2} />
        </span>
        <span className="sv-card__name-m">{d.name}</span>
        <Tag tone={d.tone}>{d.tag}</Tag>
        <span className="sv-card__plus" aria-hidden="true" />
      </button>

      <div id={`${d.id}-panel`} className="sv-card__panel" role="region" aria-label={d.name}>
        <div className="sv-card__inner">
          <div className="sv-card__left sv-fu" style={{ "--i": 0 } as CSSProperties}>
            <div className="sv-card__title">
              <span className={`sv-card__chip sv-card__chip--${d.chip} sv-card__chip--lg`}>
                <Icon name={d.icon} size={24} stroke={2} />
              </span>
              <span className="sv-card__n">{d.n}</span>
              <Tag tone={d.tone}>{d.tag}</Tag>
            </div>
            <h3 className="sv-card__name">{d.name}</h3>
            <p className="sv-card__headline">{d.headline}</p>
            <p className="sv-card__price">
              <Icon name="tag" size={16} stroke={2} />
              {d.price}
            </p>
            {d.button ? (
              <div className="sv-card__cta">
                <ButtonLink href={d.button.href} variant={d.button.variant}>
                  {d.button.label}
                </ButtonLink>
              </div>
            ) : null}
            {d.link ? (
              <a className="sv-card__link gg-text-link" href={d.link.href}>
                {d.link.label}
              </a>
            ) : null}
          </div>

          <div className="sv-seg sv-seg--card" role="tablist" aria-label={`${d.name}: problem, approach, outcome`} data-i={TABS.findIndex((t) => t.key === tab)}>
            <span className="sv-seg__pill" aria-hidden="true" />
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                className="sv-seg__opt"
                onClick={() => onTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            className="sv-boxes"
            onTouchStart={(event) => (touch.current = event.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            {TABS.map((t, i) => (
              <div
                key={t.key}
                className={`sv-box sv-box--${t.key === "outcome" ? d.tint : "plain"} sv-fu${tab === t.key ? " is-tab" : ""}`}
                style={{ "--i": i + 1 } as CSSProperties}
              >
                <span className="sv-box__icon" aria-hidden="true">
                  <Icon name={t.icon} size={18} stroke={2} />
                </span>
                <div className="sv-box__text">
                  <p className="gg-kicker sv-box__kicker">{t.kicker}</p>
                  <p>{text[t.key]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
