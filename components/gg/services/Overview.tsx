"use client";

import { useRef, useState, type CSSProperties, type TouchEvent } from "react";

import { Icon } from "../Icon";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { GROUPS, type Group } from "./data";
import { scrollToAnchor } from "./scroll";

/**
 * Services 03: Build · Run · Grow. Three group cards on desktop (STAGGER GRID,
 * the big words as LINE MASK); on phones a Build | Run | Grow segmented control
 * shows one panel at a time (swipe also switches), defaulting to Build. Every
 * row links to its detail card.
 */
export function Overview() {
  const [tab, setTab] = useState<Group["key"]>("build");
  const [dir, setDir] = useState(1);
  const touch = useRef(0);
  const keys = GROUPS.map((g) => g.key);

  const go = (next: Group["key"]) => {
    setDir(keys.indexOf(next) >= keys.indexOf(tab) ? 1 : -1);
    setTab(next);
  };
  const onTouchEnd = (event: TouchEvent) => {
    const dx = event.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) < 50) return;
    const i = keys.indexOf(tab) + (dx < 0 ? 1 : -1);
    if (i >= 0 && i < keys.length) go(keys[i]);
  };

  return (
    <section className="hm-section hm-section--canvas sv-overview" aria-labelledby="sv-overview-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="sv-overview-title"
          layout="split"
          tag="THREE WAYS WE HELP"
          heading="Build it. Run it. Grow it."
          headingClass="gg-h2 hm-h2"
          sub="Seven services in three groups. Most clients start with a build, then add running and growth when they need it."
          subClassName="hm-hide-phone"
        />

        <div className="sv-seg sv-seg--phone" role="tablist" aria-label="Service groups" data-n="3" data-i={keys.indexOf(tab)}>
          <span className="sv-seg__pill" aria-hidden="true" />
          {GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={tab === g.key}
              aria-controls={`sv-group-${g.key}`}
              className="sv-seg__opt"
              onClick={() => go(g.key)}
            >
              {g.word.charAt(0) + g.word.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div
          className="sv-groups"
          data-reveal="stagger"
          style={{ "--gg-stagger-step": "120ms", "--dir": `${dir * 12}px` } as CSSProperties}
          onTouchStart={(event) => (touch.current = event.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          {GROUPS.map((g) => (
            <article
              key={g.key}
              id={`sv-group-${g.key}`}
              className={`sv-group sv-group--${g.theme}${tab === g.key ? " is-active" : ""}`}
              role="tabpanel"
            >
              <div className="sv-group__top" data-reveal="line-mask">
                <span className="gg-kicker sv-group__n">{g.n}</span>
                <SplitHeading as="p" className="sv-group__word" text={g.word} />
              </div>
              <h3 className="sv-group__title">{g.title}</h3>
              <p className="sv-group__text">{g.text}</p>
              <ul className="sv-rows">
                {g.rows.map((row) => (
                  <li key={row.anchor}>
                    <a
                      className="sv-row"
                      href={`#${row.anchor}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToAnchor(row.anchor);
                      }}
                    >
                      <span className="sv-row__icon" aria-hidden="true">
                        <Icon name={row.icon} size={18} stroke={2} />
                      </span>
                      <span className="sv-row__text">
                        <strong>{row.name}</strong>
                        <span>{row.meta}</span>
                      </span>
                      <Tag tone={row.tone} className="sv-row__tag">
                        {row.tag}
                      </Tag>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="sv-group__note">
                <Icon name="check" size={14} stroke={2.4} />
                {g.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
