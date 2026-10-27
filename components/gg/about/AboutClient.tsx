"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { Button } from "../Button";
import { Icon, type IconName } from "../Icon";
import { grounds, soils } from "./data";

const motionOff = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

/**
 * About 01 image. The frame reveals (clip-path inset 10% to 0, rounded 32px, with
 * the picture settling from scale 1.1) when it enters, and on desktop the
 * picture drifts from -40px to +40px while the frame crosses the viewport
 * (scrubbed). No parallax below 1100px or with motion off.
 */
export function ParallaxMedia({ children, className }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    const picture = layer.current;
    if (!el || !picture) return;
    const desktop = window.matchMedia("(min-width: 1100px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!desktop.matches || motionOff()) {
        picture.style.setProperty("--parallax", "0px");
        return;
      }
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      picture.style.setProperty("--parallax", `${-40 + 80 * progress}px`);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div ref={frame} className={className ? `ab-media ${className}` : "ab-media"} data-reveal="group">
      <div ref={layer} className="ab-media__layer">
        <div className="ab-media__img" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

/**
 * About 03: the four grounds. From 768px a grid that staggers in (so the story
 * reads left to right and ends on "Good ground", whose sprout grows while the
 * others settle to 85%). On phones a swipe carousel (scroll-snap, 240px cards)
 * with dots.
 */
export function Grounds() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const card = el.children[0] as HTMLElement | undefined;
      if (!card) return;
      const step = card.offsetWidth + 12;
      setActive(Math.max(0, Math.min(grounds.length - 1, Math.round(el.scrollLeft / step))));
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", request, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", request);
    };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: i * (card.offsetWidth + 12), behavior: motionOff() ? "auto" : "smooth" });
  };

  return (
    <div className="ab-grounds-wrap">
      <ul ref={track} className="ab-grounds" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
        {grounds.map((ground) => (
          <li key={ground.name} className="ab-ground-slot">
            <div className={ground.good ? "ab-ground ab-ground--good" : "ab-ground"}>
            <span className="ab-ground__chip" aria-hidden="true">
              <Icon name={ground.icon as IconName} size={24} stroke={2} />
            </span>
            <h3 className="ab-ground__name">{ground.name}</h3>
            <p className="ab-ground__parable">{ground.parable}</p>
            <hr className="ab-ground__rule" />
            <p className="ab-ground__web">
              <span className="gg-kicker">ON THE WEB</span>
              {ground.web}
            </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="ab-dots" role="group" aria-label="Choose a ground">
        {grounds.map((ground, i) => (
          <button
            key={ground.name}
            type="button"
            className={i === active ? "is-active" : undefined}
            aria-label={`Show ${ground.name}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

/** "Read the parable that inspired us": an outline button that opens the four soils in a native dialog. */
export function ParableButton({ label, short }: { label: string; short?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  const open = () => {
    opener.current = document.activeElement;
    dialog.current?.showModal();
    document.body.classList.add("gg-scroll-locked");
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <Button variant="outline" onClick={open} className="ab-parable__btn">
        {short ? (
          <>
            <span className="gg-resp-long">{label}</span>
            <span className="gg-resp-short">{short}</span>
          </>
        ) : (
          label
        )}
      </Button>
      <dialog
        ref={dialog}
        className="ab-dialog"
        aria-labelledby="ab-parable-title"
        onClose={() => {
          document.body.classList.remove("gg-scroll-locked");
          if (opener.current instanceof HTMLElement) opener.current.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="ab-dialog__in">
          <div className="ab-dialog__head">
            <h2 id="ab-parable-title">The Parable of the Sower</h2>
            <button type="button" className="ab-dialog__close" onClick={close} aria-label="Close">
              <Icon name="x" size={18} />
            </button>
          </div>
          <p className="ab-dialog__lead">
            Our name comes from this story: a sower scatters seed, and what happens to it depends on the ground it lands on.
          </p>
          <ul className="ab-soils">
            {soils.map((soil) => (
              <li key={soil.name} className={soil.good ? "is-good" : undefined}>
                <p className="gg-kicker">{soil.heart}</p>
                <h3>{soil.name}</h3>
                <p>{soil.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
