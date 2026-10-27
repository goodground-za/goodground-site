"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { Icon } from "../Icon";
import { Tag } from "../Tag";

const QUERY = "plumber near me pretoria";

/**
 * Home 02, card 1: a search result mock.
 *
 * Complete in the HTML (JS off, reduced motion, "Pause motion"). When motion is
 * on, it is armed on mount and, once 40% visible, types the query at 35ms per
 * character with a blinking caret, then shows the results 120ms apart, wipes
 * the #1 result's blush in and pops its tag. Driven through classes on the
 * root and the typed text node, not React state, so nothing re-renders.
 */
export function SearchMock() {
  const root = useRef<HTMLDivElement>(null);
  const typed = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const text = typed.current;
    if (!el || !text) return;
    const html = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || html.dataset.motion === "off") return;

    el.classList.add("is-armed");
    text.textContent = "";
    const timers: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let n = 0;
        const type = window.setInterval(() => {
          n += 1;
          text.textContent = QUERY.slice(0, n);
          if (n < QUERY.length) return;
          window.clearInterval(type);
          el.classList.add("is-typed");
          // The caret goes 600ms after typing ends.
          timers.push(window.setTimeout(() => el.classList.add("is-done"), 600));
        }, 35);
        timers.push(type);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, []);

  return (
    <div className="hm-search" ref={root} aria-hidden="true">
      <div className="hm-search__bar">
        <Icon name="search" size={16} stroke={2} />
        <span className="hm-search__query">
          <span ref={typed}>{QUERY}</span>
          <span className="hm-search__caret" />
        </span>
      </div>
      <div className="hm-search__result hm-search__result--hit" style={{ "--gg-i": 0 } as CSSProperties}>
        <div className="hm-search__url">
          <span>yourbusiness.co.za</span>
          <Tag tone="coral" className="hm-search__tag">
            #1
          </Tag>
        </div>
        <p className="hm-search__title">
          <span className="gg-resp-long">Your Business — 24/7 Plumbing in Pretoria</span>
          <span className="gg-resp-short">Your Business — 24/7 Plumbing</span>
        </p>
      </div>
      <div className="hm-search__result" style={{ "--gg-i": 1 } as CSSProperties}>
        <div className="hm-search__url">
          <span>competitor.co.za</span>
        </div>
        <p className="hm-search__title hm-search__title--quiet">Competitor Plumbing Services</p>
      </div>
      <div className="hm-search__result hm-search__result--extra" style={{ "--gg-i": 2 } as CSSProperties}>
        <div className="hm-search__url">
          <span>directory.co.za</span>
        </div>
        <p className="hm-search__title hm-search__title--quiet">Directory listing · Plumbers</p>
      </div>
    </div>
  );
}
