"use client";

import { useEffect, useRef, useState } from "react";

import { Resp } from "../Resp";
import { NAV } from "./data";
import { scrollToAnchor } from "./scroll";

/**
 * Services 02: the sticky service nav with scroll-spy. It sticks 16px under the
 * top for as long as its wrapper (nav + overview + detail cards) is on screen,
 * so it releases at the end of section 04. Chips are real in-page links; a
 * click smooth-scrolls (120px offset) and updates the hash. The chip whose card
 * is most in view is active and the ink pill slides to it. On phones the row
 * scrolls sideways and the active chip is brought to the centre.
 */
export function ServiceNav() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  // Scroll-spy: the last card whose top has passed 35% of the viewport.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = 0;
      NAV.forEach((item, i) => {
        const el = document.getElementById(item.anchor);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  // Slide the pill under the active chip; keep it visible in the phone scroller.
  useEffect(() => {
    const ul = list.current;
    const chip = ul?.children[active + 1] as HTMLElement | undefined;
    if (!ul || !chip) return;
    ul.style.setProperty("--pill-x", `${chip.offsetLeft}px`);
    ul.style.setProperty("--pill-w", `${chip.offsetWidth}px`);
    const scroller = ul.parentElement;
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      const reduce =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
      scroller.scrollTo({ left: chip.offsetLeft - (scroller.clientWidth - chip.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    }
  }, [active]);

  return (
    <nav className="sv-nav" aria-label="Services">
      <div className="sv-nav__scroll">
        <ul className="sv-nav__list" ref={list}>
          <li className="sv-nav__pill" aria-hidden="true" />
          {NAV.map((item, i) => (
            <li key={item.anchor} className="sv-nav__item">
              <a
                href={`#${item.anchor}`}
                className={i === active ? "sv-nav__chip is-active" : "sv-nav__chip"}
                aria-current={i === active ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToAnchor(item.anchor);
                }}
              >
                <span className="gg-kicker sv-nav__n">{String(i + 1).padStart(2, "0")}</span>
                <Resp long={item.name} short={item.short} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
