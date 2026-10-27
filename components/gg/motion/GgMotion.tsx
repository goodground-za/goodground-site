"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { formatNumber } from "../format";

/**
 * The one reveal helper for the redesign (global motion note 12:150).
 * Renders nothing; mount it once per page shell.
 *
 *   data-reveal="fade-up"   opacity + 24px rise, 700ms, plays once
 *   data-reveal="stagger"   children fade up 80ms apart (cap 8)
 *   data-reveal="header"    [data-part="tag|sub|cta"] fade up; [data-split] lines mask in
 *   data-reveal="line-mask" a [data-split] element on its own
 *   data-reveal="count-up"  see CountUp.tsx
 *   data-delay="ms"         offset for the whole element
 *   data-loop               CSS loop that pauses off-screen / tab hidden
 *
 * Triggers when the element's top passes 85% of the viewport (rootMargin
 * -15% bottom, threshold 0); count-ups at 50% visible. All start states live
 * under html.js in gg.css, so with no JS the page is simply complete.
 */

const EASE_OUT = bezier(0.16, 1, 0.3, 1);

export function GgMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionOff = () => reduce.matches || root.dataset.motion === "off";

    // --- Line splitting (HEADER REVEAL / LINE MASK) --------------------------
    const splits = Array.from(document.querySelectorAll<HTMLElement>("[data-split]"));
    const widths = new WeakMap<HTMLElement, number>();
    const resplit = () => {
      // Keyed on the PARENT's width: a shrink-wrapped heading changes its own
      // width when it is split, which would otherwise look like a resize.
      for (const el of splits) {
        const width = el.parentElement?.clientWidth ?? el.clientWidth;
        if (widths.get(el) === width) continue;
        widths.set(el, width);
        splitLines(el);
      }
    };
    // Rendered lines depend on the real font, so wait for it.
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) resplit();
    });
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resplit, 150);
    };
    window.addEventListener("resize", onResize);

    // --- Stagger indices -------------------------------------------------------
    document.querySelectorAll<HTMLElement>('[data-reveal="stagger"]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--gg-i", String(Math.min(i, 7)));
      });
    });

    document.querySelectorAll<HTMLElement>("[data-delay]").forEach((el) => {
      el.style.setProperty("--gg-delay", `${Number(el.dataset.delay) || 0}ms`);
    });

    // --- Reveal observer -------------------------------------------------------
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );
    document
      .querySelectorAll('[data-reveal]:not([data-reveal="count-up"]):not([data-reveal="fill"])')
      .forEach((el) => reveal.observe(el));

    // --- Count-ups ---------------------------------------------------------------
    // data-reveal="fill" (rings, bars) shares the count-up trigger so a number
    // and the ring around it start together. data-delay staggers a row of them.
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal="count-up"], [data-reveal="fill"]'),
    );
    const frames = new Set<number>();
    const timers = new Set<number>();
    const runCount = (el: HTMLElement) => {
      const digits = el.querySelector<HTMLElement>(".gg-count__digits");
      if (!digits) return;
      const to = Number(el.dataset.to);
      const decimals = Number(el.dataset.decimals) || 0;
      const format = (n: number) => formatNumber(n, decimals);
      if (motionOff()) {
        digits.textContent = format(to);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        digits.textContent = format(to * EASE_OUT(t));
        if (t < 1) frames.add(requestAnimationFrame(tick));
      };
      frames.add(requestAnimationFrame(tick));
    };
    const counter = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          counter.unobserve(el);
          if (el.dataset.reveal === "fill") {
            el.classList.add("is-in");
            // Numbers inside a ring count with it.
            el.querySelectorAll<HTMLElement>('[data-reveal="count-up"]').forEach(runCount);
            continue;
          }
          const delay = motionOff() ? 0 : Number(el.dataset.delay) || 0;
          if (delay) timers.add(window.setTimeout(() => runCount(el), delay));
          else runCount(el);
        }
      },
      // Phones count at 30% visible (Home 01 note).
      { threshold: window.innerWidth < 768 ? 0.3 : 0.5 },
    );
    for (const el of counters) {
      if (el.dataset.reveal === "count-up" && !motionOff()) {
        const digits = el.querySelector<HTMLElement>(".gg-count__digits");
        if (digits) digits.textContent = "0";
      }
      // A number inside a fill is driven by that fill, not on its own.
      if (el.dataset.reveal === "count-up" && el.closest('[data-reveal="fill"]')) continue;
      counter.observe(el);
    }

    // --- Loops pause off-screen and while the tab is hidden -------------------
    const loops = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
      }
    });
    document.querySelectorAll("[data-loop]").forEach((el) => loops.observe(el));
    const onVisibility = () => {
      if (document.hidden) root.dataset.tabHidden = "";
      else delete root.dataset.tabHidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      reveal.disconnect();
      counter.disconnect();
      loops.disconnect();
      frames.forEach(cancelAnimationFrame);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(resizeTimer);
    };
    // Re-scan after a client-side navigation brings in new markup.
  }, [pathname]);

  return null;
}

/**
 * Splits a heading into its rendered lines, each wrapped in an overflow mask.
 * Forced breaks (<br>) are kept. The original text is stored on first run so
 * re-splitting on resize starts clean, and the heading keeps its accessible
 * name through aria-label while the visual line spans are aria-hidden.
 */
function splitLines(el: HTMLElement) {
  if (el.dataset.text === undefined) el.dataset.text = el.innerText.trim();
  const text = el.dataset.text;

  // Pass 1: one plain inline span per word. Inline (not inline-block) so the
  // browser wraps exactly as it does for the real heading, text-wrap:balance
  // included.
  el.textContent = "";
  const words: HTMLSpanElement[] = [];
  text.split("\n").forEach((hardLine, lineIndex) => {
    if (lineIndex > 0) el.appendChild(document.createElement("br"));
    hardLine
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word, i) => {
        if (i > 0) el.appendChild(document.createTextNode(" "));
        const span = document.createElement("span");
        span.textContent = word;
        el.appendChild(span);
        words.push(span);
      });
  });

  // Pass 2: group by vertical position.
  const lines: string[][] = [];
  let lastTop = 0;
  for (const word of words) {
    const top = word.getBoundingClientRect().top;
    if (!lines.length || Math.abs(top - lastTop) > 2) {
      lines.push([]);
      lastTop = top;
    }
    lines[lines.length - 1].push(word.textContent ?? "");
  }

  el.textContent = "";
  // aria-label is only valid on headings; any other element (a price, a big
  // number) keeps its text for assistive tech in a visually hidden copy.
  const plain = text.replace(/\n/g, " ");
  if (/^H[1-6]$/.test(el.tagName)) {
    el.setAttribute("aria-label", plain);
  } else {
    const hidden = document.createElement("span");
    hidden.className = "gg-sr-only";
    hidden.textContent = plain;
    el.appendChild(hidden);
  }
  lines.forEach((line, i) => {
    const mask = document.createElement("span");
    mask.className = "gg-line";
    mask.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "gg-line__in";
    inner.style.setProperty("--gg-line-i", String(i));
    inner.textContent = line.join(" ");
    mask.appendChild(inner);
    el.appendChild(mask);
  });
}

/** CSS cubic-bezier as a JS easing function (for the count-up). */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    let t = x;
    for (let i = 0; i < 6; i++) {
      const err = sampleX(t) - x;
      const d = slopeX(t);
      if (Math.abs(err) < 1e-5 || Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sampleY(Math.min(1, Math.max(0, t)));
  };
}
