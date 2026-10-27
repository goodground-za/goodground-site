"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { Icon } from "../Icon";

/**
 * Desktop hover tilt for the hero phone: up to 4° toward the cursor
 * (perspective 1200px, lerp 0.12). Off on touch and with reduced motion or
 * "Pause motion".
 */
export function PhoneTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const html = document.documentElement;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let frame = 0;
    const tick = () => {
      current = { x: current.x + (target.x - current.x) * 0.12, y: current.y + (target.y - current.y) * 0.12 };
      el.style.transform = `perspective(1200px) rotateX(${current.y.toFixed(2)}deg) rotateY(${current.x.toFixed(2)}deg)`;
      const settled = Math.abs(target.x - current.x) < 0.01 && Math.abs(target.y - current.y) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const off = () => reduce.matches || html.dataset.motion === "off";
    const onMove = (event: PointerEvent) => {
      if (off()) return;
      const r = el.getBoundingClientRect();
      const dx = (event.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (event.clientY - (r.top + r.height / 2)) / (r.height / 2);
      target = { x: Math.max(-1, Math.min(1, dx)) * 4, y: Math.max(-1, Math.min(1, dy)) * -4 };
      run();
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
      run();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="id-tilt" ref={ref}>
      {children}
    </div>
  );
}

/**
 * Local search illustration. When 60% visible the query types itself (45ms per
 * character, blinking caret), then the results drop in 100ms apart and the
 * highlighted result takes its lilac fill while the others dim to 55%. Plays
 * once. Complete in the HTML for JS-off, reduced motion and "Pause motion".
 */
export function LocalSearchMock({
  query,
  hit,
  dim,
  callLabel,
}: {
  query: string;
  hit: { title: string; sub: string };
  dim: [{ t: string; s: string }, { t: string; s: string }];
  callLabel: string;
}) {
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
          text.textContent = query.slice(0, n);
          if (n < query.length) return;
          window.clearInterval(type);
          el.classList.add("is-typed");
          timers.push(window.setTimeout(() => el.classList.add("is-hit"), 100 * 3 + 200));
        }, 45);
        timers.push(type);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, [query]);

  return (
    <div className="id-search" ref={root} role="img" aria-label="Illustration of local search results, not a ranking promise">
      <div className="id-search__bar">
        <Icon name="search" size={18} stroke={2} />
        <span className="id-search__query">
          <span ref={typed}>{query}</span>
          <span className="id-search__caret" />
        </span>
      </div>
      <div className="id-search__row id-search__row--hit" style={{ "--i": 0 } as CSSProperties}>
        <span>
          <strong>{hit.title}</strong>
          <small>
            <Stars />
            {hit.sub}
          </small>
        </span>
        <span className="id-search__call">{callLabel}</span>
      </div>
      {dim.map((row, i) => (
        <div key={row.t} className="id-search__row id-search__row--dim" style={{ "--i": i + 1 } as CSSProperties}>
          <span>
            <strong>{row.t}</strong>
            <small>{row.s}</small>
          </span>
        </div>
      ))}
      <p className="id-search__cap">
        <span className="gg-resp-long">Illustration of the goal, not a ranking promise. Search results depend on Google.</span>
        <span className="gg-resp-short">Illustration of the goal, not a ranking promise.</span>
      </p>
    </div>
  );
}

function Stars() {
  return (
    <span className="id-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={12} stroke={1.5} />
      ))}
    </span>
  );
}

/**
 * Mobile sticky action bar (Industry note 91:326): slides up once the hero CTA
 * has scrolled out of view, hides while the closing CTA card is in view and on
 * a fast scroll down (> 1200px/s). Respects the iOS safe-area inset.
 */
export function StickyBar({ startHref, email }: { startHref: string; email: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector<HTMLElement>(".id-hero__buttons");
    const cta = document.querySelector<HTMLElement>(".gg-cta-section");
    if (!heroCta) return;
    let heroGone = false;
    let ctaVisible = false;
    let fast = false;
    let last = { y: window.scrollY, t: performance.now() };
    let timer = 0;
    const update = () => setShow(heroGone && !ctaVisible && !fast);

    const hero = new IntersectionObserver(([entry]) => {
      heroGone = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    });
    hero.observe(heroCta);
    const ctaObs = new IntersectionObserver(([entry]) => {
      ctaVisible = entry.isIntersecting;
      update();
    });
    if (cta) ctaObs.observe(cta);

    const onScroll = () => {
      const now = performance.now();
      const speed = ((window.scrollY - last.y) / Math.max(1, now - last.t)) * 1000;
      last = { y: window.scrollY, t: now };
      if (speed > 1200) {
        fast = true;
        update();
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          fast = false;
          update();
        }, 400);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      hero.disconnect();
      ctaObs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={show ? "id-sticky is-on" : "id-sticky"} aria-hidden={!show}>
      <a className="id-sticky__start" href={startHref} tabIndex={show ? 0 : -1}>
        Start your project
      </a>
      <a className="id-sticky__mail" href={`mailto:${email}`} tabIndex={show ? 0 : -1}>
        <Icon name="mail" size={14} stroke={2} />
        Email
      </a>
    </div>
  );
}
