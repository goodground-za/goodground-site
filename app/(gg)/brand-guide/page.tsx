import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";

import { Button, ButtonLink } from "@/components/gg/Button";
import { GgShell } from "@/components/gg/GgShell";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { site } from "@/content/site";
import "@/components/gg/brandguide/brandguide.css";

// Internal reference, not a marketing page. Kept out of search entirely (index and follow both off)
// rather than relying on sitemap omission alone.
export const metadata: Metadata = {
  title: "Brand Guide",
  description: "Internal brand and design reference for GoodGround. Not for public search.",
  robots: { index: false, follow: false, nocache: true },
};

const jumpLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#logo", label: "Logo" },
  { href: "#color", label: "Color" },
  { href: "#type", label: "Typography" },
  { href: "#layout", label: "Layout & spacing" },
  { href: "#buttons", label: "Buttons & tags" },
  { href: "#elevation", label: "Edges & shadow" },
  { href: "#motion", label: "Motion" },
  { href: "#voice", label: "Voice & tone" },
  { href: "#a11y", label: "Accessibility" },
];

type Swatch = { name: string; token: string; hex: string; usage: string; dark?: boolean; line?: boolean };

const colors: Swatch[] = [
  { name: "Canvas", token: "--gg-canvas", hex: "#F7F7F4", usage: "The page. Ink on it is 17.6:1.", line: true },
  { name: "Surface", token: "--gg-surface", hex: "#FFFFFF", usage: "Cards, fields, the header pill and white sections.", line: true },
  { name: "Ink", token: "--gg-ink", hex: "#111111", usage: "Text, the primary button and the footer wordmark. White on ink is 18.9:1.", dark: true },
  { name: "Muted", token: "--gg-muted", hex: "#5F5B66", usage: "Secondary copy and captions. 6.2:1 on canvas.", dark: true },
  { name: "Line", token: "--gg-line", hex: "#E7E3DC", usage: "Hairlines and card borders.", line: true },
  { name: "Plum", token: "--gg-plum", hex: "#2E1848", usage: "Promotional and dark blocks: the short version, the Full Service band. White on plum is 15.7:1.", dark: true },
  { name: "Plum deep", token: "--gg-plum-deep", hex: "#1C0F2E", usage: "The deepest dark surface (menu, 404).", dark: true },
  { name: "Coral", token: "--gg-coral", hex: "#EF4A23", usage: "Fills, icons, focus rings and display-size type only. As small text it is 3.1 to 3.7:1, so it fails. Ink on coral is 5.1:1." },
  { name: "Coral text", token: "--gg-coral-text", hex: "#C2300E", usage: "Coral for small text and links on light surfaces. 4.7:1 or better on white, canvas, blush, lilac and mint.", dark: true },
  { name: "Coral fill", token: "--gg-coral-fill", hex: "#D0340F", usage: "Behind white labels (coral buttons). White on it is 5.02:1.", dark: true },
  { name: "Peach", token: "--gg-peach", hex: "#F7B48F", usage: "Accent on dark surfaces: totals, links on plum, active counts." },
  { name: "Lilac", token: "--gg-lilac", hex: "#EEE8F6", usage: "Soft tint for icon chips, open accordion rows and the why-we-ask card." },
  { name: "Blush", token: "--gg-blush", hex: "#FCEDE6", usage: "Soft warm tint: selected cards, warnings, the Launch Offer column." },
  { name: "Mint", token: "--gg-mint", hex: "#E3F1EA", usage: "Soft success tint: done states, notes, the quote card." },
];

const radii = [
  { token: "--gg-r-pill", value: "999px", note: "Buttons, tags, pills, search, toggles, chips.", style: { borderRadius: 999, width: 64, height: 32 } },
  { token: "--gg-r-card", value: "20px, 24px from 768", note: "Cards, accordion rows, form groups.", style: { borderRadius: 24, width: 64, height: 64 } },
  { token: "--gg-r-card-lg", value: "24px, 28px from 768", note: "Large panels: step cards, the plum hero card.", style: { borderRadius: 28, width: 64, height: 64 } },
  { token: "--gg-r-cta", value: "32px, 40px from 768", note: "The gradient call-to-action card.", style: { borderRadius: 40, width: 64, height: 64 } },
  { token: "--gg-r-chip", value: "12px", note: "Icon chips and inputs.", style: { borderRadius: 12, width: 64, height: 64 } },
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="hm-section hm-section--canvas bgd-section" aria-labelledby={`${id}-title`}>
      <div className="gg-wrap">
        <header className="bgd-head" data-reveal="header">
          <Tag tone="neutral" data-part="tag">
            {eyebrow}
          </Tag>
          <SplitHeading as="h2" id={`${id}-title`} className="gg-h2 bgd-h2" text={title} />
        </header>
        {children}
      </div>
    </section>
  );
}

function Spec({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="bgd-spec">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function BrandGuidePage() {
  return (
    <GgShell crumbs={[{ label: "BRAND GUIDE" }]}>
      <div className="bgd-page">
        {/* Hero --------------------------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas bgd-hero" aria-labelledby="bgd-title">
          <div className="gg-wrap">
            <div className="bgd-hero__col" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                INTERNAL, NO INDEX
              </Tag>
              <SplitHeading as="h1" id="bgd-title" className="gg-display-l bgd-h1" text="GOODGROUND BRAND GUIDE." />
              <p className="gg-lead bgd-lead" data-part="sub">
                The single source of truth for how GoodGround looks and sounds: colour, type, spacing, components, motion and voice, as actually built on this site. Every value below is read from the live stylesheet, not a moodboard. A working example of each component is on the private /_styleguide page.
              </p>
              <nav aria-label="Brand guide sections" className="bgd-jump" data-part="cta">
                {jumpLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Overview ----------------------------------------------------------------------- */}
        <Section id="overview" eyebrow="WHO WE ARE" title="Brand overview.">
          <div className="bgd-two">
            <Spec
              rows={[
                ["Name", site.name],
                ["Legal name", site.legalName],
                ["Registration no.", site.registrationNumber],
                ["Tagline", site.tagline],
                ["Founded", site.foundingDate],
                ["Based", `${site.address.locality}, ${site.address.region}`],
                ["Serves", site.areaServed],
              ]}
            />
            <div className="bgd-prose">
              <p>
                GoodGround is a website development studio building custom, fast business websites across South Africa, with a choice of how to pay instead of one large upfront invoice. The voice is direct, specific and confident, closer to a straight-talking contractor than a corporate agency.
              </p>
              <ul className="bgd-rules">
                {[
                  "Say what a thing does before saying why it matters.",
                  "Specificity over adjectives: a number or a named outcome beats “stunning” or “seamless”.",
                  "“X, not just Y” is a deliberate, recurring construction in this brand’s voice.",
                  "Confident, not salesy. No exclamation marks in body copy.",
                ].map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Logo --------------------------------------------------------------------------- */}
        <Section id="logo" eyebrow="MARK" title="Logo.">
          <div className="bgd-logos">
            <div className="bgd-logo bgd-logo--ink">
              <span className="bgd-wordmark">goodground</span>
            </div>
            <div className="bgd-logo bgd-logo--plum">
              <Image src="/logos/gg-horizontal.svg" alt="GoodGround horizontal logo, white on plum" width={160} height={30} className="bgd-logo__img bgd-logo__img--white" />
            </div>
            <div className="bgd-logo bgd-logo--surface">
              <Image src="/logos/gg-stacked.svg" alt="GoodGround stacked logo on white" width={100} height={80} className="bgd-logo__img bgd-logo__img--tall" />
            </div>
            <div className="bgd-logo bgd-logo--coral">
              <Image src="/logos/gg-mark.svg" alt="GoodGround mark only, white on coral" width={64} height={64} className="bgd-logo__img bgd-logo__img--white bgd-logo__img--mark" />
            </div>
          </div>
          <div className="bgd-two">
            <div className="bgd-prose">
              <h3>Where each one is used</h3>
              <ul className="bgd-list">
                <li>
                  <b>Wordmark pill.</b> “goodground” in IBM Plex Sans SemiBold, white on an ink pill. The site header, the footer and the onboarding bar.
                </li>
                <li>
                  <code>/logos/gg-horizontal.svg</code>: horizontal lockup for documents and email.
                </li>
                <li>
                  <code>/logos/gg-stacked.svg</code>: square and social profile placements.
                </li>
                <li>
                  <code>/logos/gg-mark.svg</code>: tight spaces and favicon-adjacent uses.
                </li>
              </ul>
            </div>
            <div className="bgd-prose">
              <h3>Usage rules</h3>
              <ul className="bgd-list">
                <li>Pure white on every dark or coral surface, never tinted.</li>
                <li>Never stretched, rotated or recoloured outside the palette below.</li>
                <li>Clear space on every side: the height of the mark itself.</li>
                <li>Never on a busy photograph without a solid colour or a scrim behind it.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Color -------------------------------------------------------------------------- */}
        <Section id="color" eyebrow="PALETTE" title="Colour.">
          <ul className="bgd-swatches">
            {colors.map((c) => (
              <li key={c.token} className="bgd-swatch">
                <span className={c.line ? "bgd-swatch__chip has-line" : "bgd-swatch__chip"} style={{ background: c.hex, color: c.dark ? "#fff" : "#111" } as CSSProperties}>
                  {c.name}
                </span>
                <span className="bgd-swatch__body">
                  <strong>{c.hex}</strong>
                  <code>{c.token}</code>
                  <small>{c.usage}</small>
                </span>
              </li>
            ))}
          </ul>
          <p className="bgd-note">
            Coral is the one colour that cannot be used as it is: brand coral fails WCAG AA as small text. Use <code>--gg-coral-text</code> for text and links on light surfaces and <code>--gg-coral-fill</code> behind white labels. Plain coral stays for icons, focus rings and display-size type. The call-to-action card uses one gradient (<code>--gg-gradient-cta</code>, plum to wine to coral to plum); do not invent others.
          </p>
        </Section>

        {/* Type --------------------------------------------------------------------------- */}
        <Section id="type" eyebrow="TYPE SYSTEM" title="Typography.">
          <div className="bgd-two">
            <div className="bgd-card">
              <p className="gg-kicker">DISPLAY</p>
              <p className="bgd-sample-display">Oswald</p>
              <p className="bgd-small">
                Medium (500), uppercase, line-height 0.92. Page headlines, big numbers, section kickers and route labels. <code>--gg-font-display</code>.
              </p>
            </div>
            <div className="bgd-card">
              <p className="gg-kicker">BODY AND TITLES</p>
              <p className="bgd-sample-body">IBM Plex Sans</p>
              <p className="bgd-small">
                Regular (400), Medium (500), SemiBold (600). Section titles, paragraphs, forms, captions and buttons. <code>--gg-font-body</code>. Self-hosted, so the licences travel with the files.
              </p>
            </div>
          </div>
          <ul className="bgd-scale">
            {[
              ["gg-display-xl", "72 to 140px", "Oswald 500, 0.92. Home hero only.", "gg-display-xl"],
              ["gg-display-l", "56 to 112px", "Oswald 500, 0.92. Every page H1.", "gg-display-l"],
              ["gg-display-m", "48 to 88px", "Oswald 500, 0.92. Large closing statements.", "gg-display-m"],
              ["gg-h2", "32 to 56px", "Plex SemiBold, 1.07, tracking -2.5%. Section titles.", "gg-h2"],
              ["gg-h2-side", "28 to 48px", "Plex SemiBold. Titles beside a body column.", "gg-h2-side"],
              ["gg-title-l", "20 to 34px", "Plex SemiBold. Card and sub-section titles.", "gg-title-l"],
              ["gg-lead", "16px (18 from 768)", "Plex Regular, 1.55. Intro paragraphs.", "gg-lead"],
              ["gg-body", "14 to 15px", "Plex Regular, 1.55. Default copy.", "gg-body"],
              ["gg-kicker", "12px", "Oswald 500, tracking 6%, uppercase. Tags and labels.", "gg-kicker"],
            ].map(([cls, size, note, c]) => (
              <li key={cls}>
                <p className={`${c} bgd-scale__sample`}>{cls === "gg-kicker" ? "SECTION KICKER" : cls.startsWith("gg-display") ? "AA" : "The quick brown fox"}</p>
                <p className="bgd-scale__meta">
                  <code>.{cls}</code> <span>{size}</span>
                  <small>{note}</small>
                </p>
              </li>
            ))}
          </ul>
          <p className="bgd-note">Two typefaces only. Body text measure stays between 45 and 75 characters. Headings are never mixed with a third face.</p>
        </Section>

        {/* Layout ------------------------------------------------------------------------- */}
        <Section id="layout" eyebrow="STRUCTURE" title="Layout and spacing.">
          <div className="bgd-two">
            <div>
              <h3 className="bgd-h3">Corner radius scale</h3>
              <ul className="bgd-radii">
                {radii.map((r) => (
                  <li key={r.token}>
                    <span className="bgd-radii__box" style={r.style as CSSProperties} aria-hidden="true" />
                    <span>
                      <strong>
                        <code>{r.token}</code> · {r.value}
                      </strong>
                      <small>{r.note}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bgd-card">
              <h3 className="bgd-h3">Grid</h3>
              <Spec
                rows={[
                  ["Content width", "1200px"],
                  ["Gutter", "20px · 40px at 768 · 120px at 1200"],
                  ["Section padding", "64px · 96px at 768 · 120px at 1200"],
                  ["Breakpoints", "390 (phone), 768 (tablet), 1100 to 1200 (desktop)"],
                ]}
              />
              <p className="bgd-small">
                Spacing is on a 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 120). No one-off values like 23px. Whitespace is a design element: if a block feels cramped, add room, not a border.
              </p>
            </div>
          </div>
        </Section>

        {/* Buttons ------------------------------------------------------------------------ */}
        <Section id="buttons" eyebrow="COMPONENTS" title="Buttons and tags.">
          <div className="bgd-stage">
            <Button variant="primary">Primary</Button>
            <Button variant="coral">Coral</Button>
            <Button variant="outline">Outline</Button>
            <span className="bgd-stage__dark">
              <Button variant="light">Light</Button>
            </span>
          </div>
          <div className="bgd-stage">
            <Tag tone="neutral">NEUTRAL</Tag>
            <Tag tone="coral">CORAL</Tag>
            <Tag tone="dark">DARK</Tag>
            <Tag tone="plum">PLUM</Tag>
            <span className="bgd-stage__dark">
              <Tag tone="on-dark">ON DARK</Tag>
            </span>
          </div>
          <ul className="bgd-list bgd-list--wide">
            <li>
              <b>Primary (ink)</b> is the default action. <b>Coral</b> is the one main action on a page or a step. <b>Outline</b> is secondary or back. <b>Light</b> is only for plum, ink and gradient surfaces.
            </li>
            <li>Every button is a pill with a round arrow chip on the right. On hover the arrow slides out to the top right while a copy slides in from the bottom left.</li>
            <li>Hover states only on fine pointers. Press scales down slightly. Disabled is 45% opacity with no pointer events.</li>
            <li>Tags are static labels. They never animate on their own.</li>
          </ul>
          <ButtonLink href="/start-project" variant="primary">
            Live example: links to /start-project
          </ButtonLink>
        </Section>

        {/* Elevation ---------------------------------------------------------------------- */}
        <Section id="elevation" eyebrow="ELEVATION" title="Edges before shadows.">
          <p className="bgd-prose bgd-prose--one">
            Cards separate from the canvas with a 1px hairline (<code>--gg-line</code>) first and a shadow second. Four shadows exist and nothing else: visual (large hero illustrations), float (menus and sheets), hover (card lift) and sticky (floating bars). On a dark surface a dark hairline is invisible, which is correct: dark sections separate with a white 8 to 10% border or with nothing at all.
          </p>
          <ul className="bgd-shadows">
            {[
              ["--gg-shadow-visual", "0 40px 70px rgba(46,23,71,.30)", "Hero illustrations"],
              ["--gg-shadow-float", "0 20px 48px rgba(46,23,71,.10)", "Floating cards, menus"],
              ["--gg-shadow-hover", "0 24px 48px rgba(46,24,72,.10)", "Card hover"],
              ["--gg-shadow-sticky", "0 10px 30px rgba(0,0,0,.25)", "Sticky bars"],
            ].map(([token, value, use]) => (
              <li key={token}>
                <span className="bgd-shadows__box" style={{ boxShadow: `var(${token})` }} aria-hidden="true" />
                <code>{token}</code>
                <small>
                  {use} · {value}
                </small>
              </li>
            ))}
          </ul>
        </Section>

        {/* Motion ------------------------------------------------------------------------- */}
        <Section id="motion" eyebrow="INTERACTION" title="Motion.">
          <div className="bgd-two">
            <div className="bgd-card">
              <h3 className="bgd-h3">Timing</h3>
              <Spec
                rows={[
                  ["--gg-motion-xs", "120ms"],
                  ["--gg-motion-sm", "200ms · micro-interactions"],
                  ["--gg-motion-md", "400ms · state changes, accordions"],
                  ["--gg-motion-lg", "700ms · reveals"],
                  ["--gg-motion-xl", "1200ms · large illustrations"],
                  ["--gg-stagger", "80ms between siblings"],
                  ["--gg-ease-out", "cubic-bezier(.16, 1, .3, 1)"],
                  ["--gg-ease-in-out", "cubic-bezier(.65, 0, .35, 1)"],
                  ["--gg-ease-back", "cubic-bezier(.34, 1.56, .64, 1) · small pops"],
                ]}
              />
            </div>
            <div className="bgd-prose">
              <h3>How it behaves</h3>
              <ul className="bgd-list">
                <li>
                  Reveals are declared with <code>data-reveal</code> (fade-up, stagger, header, group, line-mask, count-up, fill), run once, and are handled by one helper, not per-component scripts.
                </li>
                <li>
                  Motion reinforces hierarchy or feedback. Nothing moves for decoration, and prices never count up or flash other numbers.
                </li>
                <li>
                  <code>prefers-reduced-motion</code> and <code>html[data-motion=&quot;off&quot;]</code> switch everything to its end state. Pages are readable with no JavaScript.
                </li>
                <li>Verify animation by forcing completion, never by waiting on the clock.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Voice -------------------------------------------------------------------------- */}
        <Section id="voice" eyebrow="COPY" title="Voice and tone.">
          <div className="bgd-two">
            <div className="bgd-prose">
              <h3>Hard rules</h3>
              <ul className="bgd-list">
                <li>No fabricated stats, quotes, client logos or testimonials, ever. Every number must be one we can prove.</li>
                <li>No em dashes in user-facing copy.</li>
                <li>The founder is not named on the marketing pages. The one exception is the POPIA Information Officer on /legal, which the law requires.</li>
                <li>Reply time is always “1 to 2 business days”.</li>
                <li>Active voice. Cut filler words and weak adverbs.</li>
                <li>Every article is run through the humanizer audit before it is published.</li>
              </ul>
            </div>
            <div className="bgd-prose">
              <h3>Tone reference</h3>
              <p>
                Write like a specific, credible person who has actually built the thing being described, not a brochure. Prefer a concrete number or outcome over an adjective. “X, not just Y” is a deliberate brand construction, not a writing tell to avoid. Headlines on pages are uppercase display; everything else is sentence case.
              </p>
            </div>
          </div>
        </Section>

        {/* Accessibility ------------------------------------------------------------------ */}
        <Section id="a11y" eyebrow="STANDARDS" title="Accessibility.">
          <div className="bgd-two">
            <div className="bgd-card">
              <h3 className="bgd-h3">Focus ring</h3>
              <p className="bgd-small">
                A plain 2px coral outline with a 3px offset on every interactive element (white on the gradient card). It is a real <code>outline</code>, not a box-shadow, so it survives forced-colors and high-contrast modes. Keyboard order always follows reading order, and every control is reachable without a mouse.
              </p>
            </div>
            <div className="bgd-card">
              <h3 className="bgd-h3">Contrast floor</h3>
              <p className="bgd-small">
                WCAG 2.1 AA. Body text 4.5:1, large text 3:1. Brand coral never carries small text (use coral text). Touch targets are at least 44px on phones. Target for every page: Lighthouse mobile Accessibility 100, SEO 100.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </GgShell>
  );
}
