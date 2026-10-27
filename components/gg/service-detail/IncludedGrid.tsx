"use client";

import { useState, type CSSProperties } from "react";

import { Icon } from "../Icon";
import type { Included } from "./data";

/**
 * "What's included": a 3-column grid of cards on tablet and desktop (last row
 * left-aligned, STAGGER GRID 50ms). On phones a simple list with mint ticks:
 * the first five show, then a "Show all N" row expands the rest (grid-rows
 * 0fr → 1fr) and flips to "Show less".
 */
export function IncludedGrid({ items }: { items: Included[] }) {
  const [all, setAll] = useState(false);
  const extra = items.length > 5;

  return (
    <>
      <div className="sd-inc" data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as CSSProperties}>
        {items.map((item) => (
          <article key={item.title} className="sd-inc__card">
            <span className={`sd-inc__chip sd-inc__chip--${item.tint}`} aria-hidden="true">
              <Icon name={item.icon} size={22} stroke={2} />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="sd-list">
        <ul>
          {items.slice(0, 5).map((item) => (
            <li key={item.title}>
              <span className="sd-list__tick" aria-hidden="true">
                <Icon name="check" size={13} stroke={2.6} />
              </span>
              {item.title}
            </li>
          ))}
        </ul>
        {extra ? (
          <div className={all ? "sd-list__more is-open" : "sd-list__more"}>
            <div id="sd-list-more">
              <ul>
                {items.slice(5).map((item) => (
                  <li key={item.title}>
                    <span className="sd-list__tick" aria-hidden="true">
                      <Icon name="check" size={13} stroke={2.6} />
                    </span>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {extra ? (
          <button type="button" className="sd-list__toggle" aria-expanded={all} aria-controls="sd-list-more" onClick={() => setAll(!all)}>
            {all ? "Show less" : `Show all ${items.length}`}
            <Icon name={all ? "minus" : "plus"} size={14} stroke={2.4} />
          </button>
        ) : null}
      </div>
    </>
  );
}
