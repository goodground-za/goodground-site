"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { CountUp } from "../CountUp";
import { Icon } from "../Icon";

const motionOff = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

const COLOURS = [
  { name: "Slate", a: "#2f4f5f", b: "#9cc9c2" },
  { name: "Stone", a: "#8f897b", b: "#e9e4d8" },
  { name: "Clay", a: "#8a3a22", b: "#ef8a5a" },
  { name: "Moss", a: "#3d5240", b: "#a8bd9a" },
  { name: "Mist", a: "#6f8f9f", b: "#d6e6ee" },
  { name: "Plum", a: "#2e1848", b: "#9a3348" },
];

/**
 * Colour switcher (B3TTER solution 01): a real, working mini switcher. Clicking
 * a swatch crossfades the bottle (400ms), moves the ring and updates the
 * "Colourway n of 6" label. A radiogroup: arrow keys move and select. Until
 * someone interacts it auto-cycles every 2.5s; any interaction stops that for
 * good, and it never auto-cycles with motion off. The bottle is an illustration.
 */
export function ColourSwitcher() {
  const [i, setI] = useState(1);
  const [touched, setTouched] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (touched || motionOff()) return;
    const timer = window.setInterval(() => setI((n) => (n + 1) % COLOURS.length), 2500);
    return () => window.clearInterval(timer);
  }, [touched]);

  const pick = (n: number) => {
    setTouched(true);
    setI(n);
  };
  const onKey = (event: KeyboardEvent, index: number) => {
    const move = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!move) return;
    event.preventDefault();
    const next = (index + move + COLOURS.length) % COLOURS.length;
    pick(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="cs-visual cs-visual--surface cs-colour">
      <div className="cs-colour__stage" role="img" aria-label={`Illustration of the bottle in ${COLOURS[i].name}`}>
        {COLOURS.map((c, n) => (
          <span
            key={c.name}
            className={n === i ? "cs-bottle is-on" : "cs-bottle"}
            style={{ background: `linear-gradient(160deg, ${c.a}, ${c.b})` }}
          />
        ))}
      </div>
      <div className="cs-colour__swatches" role="radiogroup" aria-label="Colourway">
        {COLOURS.map((c, n) => (
          <button
            key={c.name}
            ref={(el) => {
              buttons.current[n] = el;
            }}
            type="button"
            role="radio"
            aria-checked={n === i}
            aria-label={c.name}
            tabIndex={n === i ? 0 : -1}
            className={n === i ? "cs-swatch is-on" : "cs-swatch"}
            style={{ background: `linear-gradient(160deg, ${c.a}, ${c.b})` }}
            onClick={() => pick(n)}
            onKeyDown={(event) => onKey(event, n)}
          />
        ))}
      </div>
      <p className="cs-visual__cap" aria-live="polite">
        Colourway {i + 1} of {COLOURS.length}
      </p>
    </div>
  );
}

/** Spec bento (solution 02): mixed tile sizes, not a flat grid. Illustrative values, labelled as such. */
export function SpecBento() {
  return (
    <div className="cs-visual cs-visual--lilac cs-spec" data-reveal="stagger" style={{ "--gg-stagger-step": "60ms" } as CSSProperties}>
      <div className="cs-spec__row cs-spec__row--a">
        <div className="cs-tile cs-tile--ink">
          <strong>24h</strong>
          <span>Cold</span>
        </div>
        <div className="cs-tile cs-tile--narrow">
          <strong>750ml</strong>
          <span>Capacity</span>
        </div>
      </div>
      <div className="cs-spec__row">
        <div className="cs-tile">
          <strong>12h</strong>
          <span>Hot</span>
        </div>
        <div className="cs-tile">
          <strong>18/8</strong>
          <span>Stainless steel</span>
        </div>
        <div className="cs-tile">
          <strong>0</strong>
          <span>BPA</span>
        </div>
      </div>
      <p className="cs-visual__cap">Illustrative values, not the product’s real specification.</p>
    </div>
  );
}

/**
 * Payload bars (solution 03): "Original renders" fills first (1000ms), then
 * "Shipped" fills to its sliver (600ms) with a coral flash, then 97% counts up.
 * The figures are the case study's own measured results.
 */
export function PayloadBars() {
  return (
    <div className="cs-visual cs-visual--ink cs-pay" data-reveal="fill">
      <p className="gg-kicker cs-pay__label">PHOTOGRAPHY PAYLOAD</p>
      <div className="cs-pay__bar">
        <div className="cs-pay__head">
          <span>Original renders</span>
          <strong>56 MB</strong>
        </div>
        <div className="cs-pay__track">
          <span className="cs-pay__fill cs-pay__fill--full" />
        </div>
      </div>
      <div className="cs-pay__bar">
        <div className="cs-pay__head">
          <span>Shipped on the page</span>
          <strong>1.5 MB</strong>
        </div>
        <div className="cs-pay__track">
          <span className="cs-pay__fill cs-pay__fill--small" />
        </div>
      </div>
      <p className="cs-pay__big">
        <CountUp to={97} suffix="%" className="cs-pay__num" /> <span>lighter</span>
      </p>
    </div>
  );
}

const KEYS = ["Tab", "←", "→", "Enter"];
const LINE = "“Review 2 of 6. Five stars…” (only the visible review is announced)";

/**
 * Keyboard + motion (solution 04): keys press in sequence (Tab, ←, →, Enter),
 * each moving down 3px for 160ms, looping every 4s. The reduce-motion switch
 * slides on after the first loop and stays on; the screen-reader line types in
 * once at 30ms per character. Static (switch on, line complete) with motion off.
 */
export function KeyboardDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(-1);
  const [on, setOn] = useState(true);
  const [typed, setTyped] = useState(LINE.length);

  useEffect(() => {
    const el = root.current;
    if (!el || motionOff()) return;
    let loops = 0;
    let loop = 0;
    let typer = 0;
    const timers: number[] = [];
    const playLoop = () => {
      KEYS.forEach((_, k) => {
        timers.push(window.setTimeout(() => setPressed(k), 600 + k * 600));
        timers.push(window.setTimeout(() => setPressed(-1), 600 + k * 600 + 160));
      });
      loops += 1;
      if (loops === 1) timers.push(window.setTimeout(() => setOn(true), 3200));
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          window.clearInterval(loop);
          return;
        }
        if (loops === 0) {
          setOn(false);
          setTyped(0);
          let n = 0;
          typer = window.setInterval(() => {
            n += 1;
            setTyped(n);
            if (n >= LINE.length) window.clearInterval(typer);
          }, 30);
        }
        playLoop();
        loop = window.setInterval(playLoop, 4000);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(loop);
      window.clearInterval(typer);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div className="cs-visual cs-visual--blush cs-kbd" ref={root}>
      <div className="cs-kbd__keys" aria-hidden="true">
        {KEYS.map((k, n) => (
          <span key={k} className={pressed === n ? "cs-key is-down" : "cs-key"}>
            {k}
          </span>
        ))}
      </div>
      <div className="cs-kbd__switch">
        <span>
          <strong>Reduce motion</strong>
          <small>All animations off, not just slower</small>
        </span>
        <span className={on ? "cs-toggle is-on" : "cs-toggle"} role="img" aria-label={on ? "On" : "Off"}>
          <i />
        </span>
      </div>
      <div className="cs-kbd__sr">
        <Icon name="bell" size={18} stroke={2} />
        <span>{LINE.slice(0, typed)}</span>
      </div>
    </div>
  );
}
