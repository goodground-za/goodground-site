import type { ReactNode } from "react";
import { AmbientVideo } from "@/components/home2026/AmbientVideo";

/**
 * Shared inner-page hero, rebuilt 2026-09-11 onto the homepage's design.
 *
 * It renders inside its own `.home-2026` wrapper and uses the homepage's real
 * classes — `eyebrow`, `display-heading`, `accent-text`, `wrap`, `section-dark`
 * — rather than a Tailwind lookalike. Same stylesheet, same type ramp, same
 * gutter, so the pages cannot drift from the homepage as either one changes.
 *
 * The wrapper is on this section only. `home2026.css` styles bare elements and
 * out-specifies Tailwind utilities, so scoping a whole page body to it would
 * quietly break the body's own styling — see app/(site)/layout.tsx.
 *
 * The entrance is CSS (`hero-in`, the homepage hero's own keyframe), not the
 * `.reveal` observer: a page hero is always above the fold, and RevealObserver
 * deliberately never hides anything that is already on screen.
 *
 * `display-heading`, not `section-title`: page titles here are sentences ("We
 * believe every business deserves a strong foundation"), and `section-title` is
 * the 8.75rem treatment built for one or two words like "WORK."
 *
 * The eyebrow is kept as a required prop. It is a deliberate brand element on
 * this site (see AGENTS.md), and the new design uses eyebrows throughout, so it
 * carries over rather than being dropped.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  video = false,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Anything below the intro: jump-index chips, etc. */
  children?: ReactNode;
  /**
   * Run the homepage's ambient clip behind this hero.
   *
   * Deliberately opt-in and off by default. The file is 2.6MB, and a signature
   * that appears on every page stops being a signature — so it is reserved for
   * the few openings where a full-bleed moving background actually earns its
   * weight. Everything else opens on flat ink, which is the same surface the
   * clip sits on anyway.
   */
  video?: boolean;
}) {
  // The design's signature is an orange full stop after the heading ("Work.",
  // "Our process."). Titles here are written with their own trailing period, so
  // it gets moved into the accent span rather than doubled. A title that ends
  // on other terminal punctuation keeps it and gets no stop added.
  const stem = title.replace(/\.+$/, "");
  const closed = /[?!:]$/.test(stem);

  return (
    <div className="home-2026">
      <section className={`page-hero${video ? " page-hero--video" : " section-dark"}`}>
        {video ? <AmbientVideo /> : null}
        <div className="wrap page-hero__inner">
          <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>
          <h1 className="display-heading">
            {stem}
            {closed ? null : <span className="accent-text">.</span>}
          </h1>
          {intro ? <p className="page-hero__intro">{intro}</p> : null}
          {children}
        </div>
      </section>
    </div>
  );
}
