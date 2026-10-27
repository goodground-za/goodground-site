"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

import { Icon, type IconName } from "../Icon";
import type { ServiceView } from "./data";

/**
 * The plum "service visual" card in the hero (Service detail, hero note
 * 99:229). One shell for all five services: peach Oswald kicker, a pill, a
 * SemiBold title, then the service's own illustration. SEO is drawn in Figma;
 * the other four are built from the page note and are for the owner to sign
 * off. Everything but the SEO checklist is labelled as an illustration.
 */
const SEO_ROWS: { icon: IconName; label: string }[] = [
  { icon: "bolt", label: "Fast load times" },
  { icon: "layers", label: "Page structure Google can read" },
  { icon: "pin", label: "Local SEO, town by town" },
  { icon: "chart", label: "Analytics + Search Console" },
  { icon: "code", label: "Schema markup" },
];

function Shell({
  kicker,
  pill,
  pillTone = "mint",
  title,
  children,
}: {
  kicker: string;
  pill: string;
  pillTone?: "mint" | "line";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="sd-visual" data-reveal="fade-up" data-delay={300}>
      <div className="sd-visual__top">
        <span className="gg-kicker sd-visual__kicker">{kicker}</span>
        <span className={`sd-visual__pill sd-visual__pill--${pillTone}`}>{pill}</span>
      </div>
      <p className="sd-visual__title">{title}</p>
      {children}
    </div>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="sd-ba" style={{ "--pos": `${pos}%` } as CSSProperties}>
      <div className="sd-ba__page sd-ba__page--after" aria-hidden="true">
        <span className="sd-ba__bar" />
        <span className="sd-ba__hero">Your business,<br />found first.</span>
        <span className="sd-ba__line" />
        <span className="sd-ba__line sd-ba__line--s" />
        <span className="sd-ba__btn">Get a quote</span>
      </div>
      <div className="sd-ba__page sd-ba__page--before" aria-hidden="true">
        <span className="sd-ba__bar sd-ba__bar--old" />
        <span className="sd-ba__hero sd-ba__hero--old">Welcome to our website</span>
        <span className="sd-ba__line sd-ba__line--old" />
        <span className="sd-ba__line sd-ba__line--old sd-ba__line--s" />
        <span className="sd-ba__btn sd-ba__btn--old">click here</span>
      </div>
      <span className="sd-ba__handle" aria-hidden="true" />
      <label className="gg-sr-only" htmlFor="sd-ba-range">
        Drag to compare the old page with the redesigned page
      </label>
      <input
        id="sd-ba-range"
        className="sd-ba__range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
      />
      <span className="sd-ba__tag sd-ba__tag--l">BEFORE</span>
      <span className="sd-ba__tag sd-ba__tag--r">AFTER</span>
    </div>
  );
}

export function HeroVisual({ kind, compact }: { kind: ServiceView["visual"]; compact?: boolean }) {
  if (kind === "seo") {
    return (
      <Shell kicker="SEO FOUNDATIONS" pill="Included in every build" title="Built in from the first line of code.">
        <ul className="sd-rows" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
          {SEO_ROWS.map((row, i) => (
            <li key={row.label} className={i >= 3 ? "sd-rows__more" : undefined}>
              <span className="sd-rows__icon" aria-hidden="true">
                <Icon name={row.icon} size={16} stroke={2} />
              </span>
              <span className="sd-rows__text">{row.label}</span>
              <span className="sd-rows__tick" aria-hidden="true" style={{ "--i": i } as CSSProperties}>
                <Icon name="check" size={12} stroke={2.8} />
              </span>
            </li>
          ))}
        </ul>
      </Shell>
    );
  }

  if (kind === "redesign") {
    return (
      <Shell kicker="WEBSITE REDESIGN" pill="Illustration" title="Same business, rebuilt properly.">
        <BeforeAfter />
        <p className="sd-visual__cap">Drag to compare. An illustration, not a client site.</p>
      </Shell>
    );
  }

  if (kind === "ux") {
    return (
      <Shell kicker="UX & DESIGN" pill="Illustration" title="From wireframe to design.">
        <div className="sd-morph" aria-hidden="true">
          <span className="sd-morph__nav" />
          <span className="sd-morph__hero" />
          <span className="sd-morph__row">
            <i />
            <i />
            <i />
          </span>
          <span className="sd-morph__cta" />
        </div>
        <p className="sd-visual__cap">The journey is mapped first, then the screen is designed around it.</p>
      </Shell>
    );
  }

  if (kind === "google") {
    return (
      <Shell kicker="GOOGLE ADS" pill="Illustration" title="Be there the moment they search.">
        <div className="sd-ad" aria-hidden="true">
          <p className="sd-ad__meta">
            <b>Ad</b> · yourbusiness.co.za
          </p>
          <p className="sd-ad__title">Emergency electrician near you</p>
          <p className="sd-ad__text">Same-day call-outs. Free quotes in 24 hours.</p>
        </div>
        <div className="sd-mini" aria-hidden="true">
          <p className="gg-kicker">CALLS FROM ADS</p>
          <div className="sd-mini__bars">
            {[40, 56, 52, 78, 70, 92].map((h, i) => (
              <span key={i} style={{ height: `${h}%`, "--i": i } as CSSProperties} />
            ))}
          </div>
        </div>
        {!compact ? <p className="sd-visual__cap">Illustration only, not client data.</p> : null}
      </Shell>
    );
  }

  return (
    <Shell kicker="META ADS" pill="Illustration" title="In front of the right people.">
      <div className="sd-phone" aria-hidden="true">
        <div className="sd-phone__post">
          <div className="sd-phone__head">
            <span className="sd-phone__avatar" />
            <span>
              <b>Your Business</b>
              <i>Sponsored</i>
            </span>
          </div>
          <span className="sd-phone__img" />
          <p>A new way to look after your garden.</p>
          <span className="sd-phone__cta">Learn more</span>
        </div>
        <div className="sd-phone__post sd-phone__post--ghost" />
      </div>
      {!compact ? <p className="sd-visual__cap">Illustration only, not a real ad.</p> : null}
    </Shell>
  );
}
