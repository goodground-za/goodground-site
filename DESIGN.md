---
name: GoodGround
description: Website development studio in George, South Africa. Plain, grounded, quietly confident.
colors:
  cream: "#fbf7ec"
  purple: "#2e1848"
  orange: "#fe431a"
  pink: "#fe9dd2"
  crimson: "#ac3026"
  ink: "#010602"
typography:
  display:
    fontFamily: "Parkinsans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Parkinsans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)"
    fontWeight: 400
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
  label:
    fontFamily: "Parkinsans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
rounded:
  pill: "999px"
  block: "40px"
  card: "24px"
  sm: "10px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.orange}"
  button-secondary:
    backgroundColor: "{colors.purple}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.orange}"
    rounded: "{rounded.pill}"
    padding: "14px 30px"
  card-offset:
    backgroundColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "24px"
---

# Design System: GoodGround

## Overview

**Creative North Star: "The Working Studio"**

GoodGround is a small team building real websites for real South African businesses, and the site is styled to look like exactly that: hands doing the work, not a stock-lifestyle mood board. The homepage hero is a photograph of the actual studio, not staged lifestyle photography, and every claim on the page is checkable (case studies link to live, testable URLs; unproven work says "coming soon" rather than inventing a number).

The palette is confident and unhedged rather than safe: a saturated signal orange against a warm paper cream, with a near-black purple for depth and gravity. There is no muted, corporate, "trustworthy blue" register here, and no soft pastel wash either. Typography is Parkinsans for every heading (a rounded, slightly playful geometric sans that still reads as competent) paired with Instrument Sans for body copy, which stays plain and gets out of the way.

Depth comes from one recurring device rather than shadows: a solid layer of orange sits offset behind a white or purple card, so the card appears to float slightly up and to the right of its own base. This is the site's one signature visual idea, and it shows up everywhere a "card" would otherwise need a border or a shadow: the Work banner, the FAQ accordion, the Process steps.

**Key Characteristics:**
- Photography is real, not stock: the studio, the actual product builds, the actual team.
- One accent colour (orange) carries every primary action, at full saturation, with no muted variant.
- Depth is an offset solid layer, not a blurred shadow.
- Motion always eases out, never bounces, and every tap gets a visible press response.
- Nothing is invented: no placeholder stats, no fabricated client logos, no "trusted by" bar with no names in it.

## Colors

The palette is small and every colour has exactly one job. There is no secondary or tertiary accent: orange alone carries every primary action across the whole site.

### Primary
- **Signal Orange** (`#fe431a`): The one action colour. Every primary button, every section that wants to feel energetic, the active state in navigation. Used at full saturation, never tinted down for a "calmer" variant, because there isn't one, it is either the accent or it is absent.

### Neutral
- **Studio Paper** (`#fbf7ec`): The base page background almost everywhere. A warm, slightly yellowed cream, not a clinical white, chosen so the page reads as paper rather than screen.
- **Workshop Purple** (`#2e1848`): The dark end of the palette. Dark section backgrounds, the footer, headings set on cream. Reads as depth and authority without going to pure black.
- **Ember Crimson** (`#ac3026`): A darker, desaturated cousin of the primary orange. Used specifically where orange itself would fail contrast (small accent text on a light surface) or where a hover state needs to read as "deeper," not "brighter."
- **Near-Black Ink** (`#010602`): Reserved for text that needs to sit directly on a bright orange or pink surface, where even Workshop Purple doesn't have enough contrast. Not used as a general text colour; body copy on cream uses Workshop Purple.
- **Soft Pink** (`#fe9dd2`): The smallest role in the palette. CTA band backgrounds and card ring/glow accents where a full orange fill would be too loud for the surface.

### Named Rules
**The Surface-Decides Rule.** Orange text passes contrast on Workshop Purple (4.50:1) and fails on Studio Paper or white (3.25:1). Crimson is the reverse: it passes on light surfaces (6.08:1+) and would fail on purple. Never pick the accent colour by habit; pick it by what's underneath it. This rule is load-bearing, not stylistic: the site failed a production accessibility audit in August 2026 specifically from getting this backwards.

**The One Voice Rule.** There is one primary accent, not a family of accent shades picked per section. If a component needs "a slightly different orange," the real answer is almost always Ember Crimson, not a new hex value.

## Typography

**Display Font:** Parkinsans (with ui-sans-serif, system-ui fallback)
**Body Font:** Instrument Sans (with the same fallback stack)

**Character:** Parkinsans is a rounded geometric sans with just enough personality to feel human without tipping into "friendly startup" cliché; it carries every heading, every button label, every nav item. Instrument Sans is a plain, highly legible workhorse that disappears into the background for body copy, forms, and captions, so the display face is the only place voice lives.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 6vw, 5.5rem)`, 1.02 line-height): Hero headlines. Fluid, so it scales continuously with viewport rather than jumping at breakpoints.
- **H3** (700, `clamp(1.5rem, 2.5vw, 2rem)`): Section and card headings.
- **Body Large** (400, `clamp(1.1rem, 1.6vw, 1.4rem)`): Hero subheads and lede paragraphs, anywhere body copy needs to carry more visual weight than a caption.
- **Body** (400, `1rem`): Default paragraph text. Fixed, not fluid; body copy doesn't need to scale with viewport the way a headline does.
- **Label** (700, `0.8125rem`, uppercase in practice): Eyebrows, badges, nav items, button labels.

### Named Rules
**The Balance Rule.** Every `h1`–`h4` gets `text-wrap: balance` globally, and paragraphs get `text-wrap: pretty`. Ragged headline line-lengths and single-word orphans are treated as a defect, not a rounding error, and are fixed at the base-layer level so no component has to remember to do it.

**The Tight-Tracking Rule.** Headings carry `-0.02em` letter-spacing as a base-layer default. Parkinsans at display sizes reads slightly loose without it.

## Layout

Sections are full-width, edge-to-edge blocks that alternate background colour (cream, purple, orange) to mark a change of subject, rather than using a container with visible margins to separate content. Within a section, content is constrained to a `max-w-[1434px]` centred container with responsive horizontal padding (`px-6` on mobile, up to `px-10`+ on larger screens).

Several sections are pinned full-viewport panels driven by scroll (the Process step-through, the What We Build card stack), which is a deliberate exception to normal document flow: they claim exactly `100vh` and release once their internal sequence completes. Card banners (Work, Who We Build For) use native horizontal scroll with CSS snap points rather than a JS carousel library, so touch, trackpad, and keyboard all work without a custom driver.

Spacing is not on a single rigid numeric scale; it's expressed mostly through Tailwind's default spacing scale (multiples of 4px) chosen per-context, with generous section padding (`py-20` to `py-28`) and tighter internal card padding (`p-6` to `p-8`).

## Elevation & Depth

The site is flat at rest. There is no ambient shadow system carrying every card; depth is conveyed structurally instead, through one signature device.

**The Offset-Edge Rule.** A card's depth comes from a second, solid-colour layer (almost always Signal Orange) positioned directly behind it and offset down-and-left by 6–7px (`translate-x-[-7px] translate-y-[7px]`), rather than from a blurred `box-shadow`. The result reads as two flat sheets stacked slightly apart, not a card floating above a surface with light behind it. This is the newest and most distinctive part of the current design and should be the default answer for "how does this card show depth," ahead of a shadow.

### Shadow Vocabulary
Two neutral, ink-tinted shadow tokens survive from an earlier phase of the site and are still current, used specifically on buttons and on pages that predate the offset-edge motif (the pricing and service pages):
- **Soft** (`0 1px 2px rgb(1 6 2 / 0.05), 0 8px 24px -8px rgb(1 6 2 / 0.1)`): Resting elevation for buttons and small interactive elements.
- **Lift** (`0 2px 4px rgb(1 6 2 / 0.06), 0 16px 40px -12px rgb(1 6 2 / 0.18)`): Hover/active elevation for the same elements, and resting elevation for larger cards outside the offset-edge system.

Shadows are tinted with the ink hue (`rgb(1 6 2)`) rather than pure black, so they read slightly warm instead of greying the surface under them.

## Shapes

Corners are large and confident, never sharp. Three radius steps cover almost everything: a **pill** (`999px`) for every button and nav pill, a **block** radius (`40px`) for large section-level containers, and a **card** radius (`24px`) for mid-sized cards. Individual homepage sections sometimes use one-off radii in the 10–32px range sized to their own card, but new components should reach for the three shared steps before inventing a fourth.

The one recurring custom silhouette is `CloudDivider`: a row of five overlapping circles forming a scalloped, cloud-like edge, used wherever one full-bleed section needs to visually "grow" out of the section above it (most consistently, the footer's top edge). It is drawn once per breakpoint at a fixed aspect ratio and scaled by width only, so the circles stay genuinely round rather than stretching.

## Components

Buttons, cards and navigation should all feel **confident and unhurried**: generous padding, a strong-but-controlled ease-out curve on every interaction, and a visible press response on every tap. Nothing bounces; nothing feels rushed.

### Buttons
- **Shape:** Full pill (`rounded-pill`, `999px`).
- **Primary:** Signal Orange background, Near-Black Ink text (`bg-ht-orange text-ink`), never white text at normal button-label sizes, that combination fails contrast. Generous horizontal padding.
- **Secondary:** Workshop Purple background, white text.
- **Outline:** Transparent fill, 2px orange border, orange text, fills solid orange with ink text on hover. Only correct on a surface where orange text itself would already pass contrast, it inverts to the primary treatment on interaction rather than staying an outline forever.
- **Hover / Active:** `hover:scale-[1.02–1.03]` on an ease-out curve, `active:scale-[0.97]` press feedback on every button on the site without exception. This was a systematic gap fixed sitewide in August 2026, treat its absence on any new button as a defect, not an oversight.

**Note on implementation:** two parallel button patterns currently exist in the codebase, a shared `Button`/`ButtonLink` primitive (`components/Button.tsx`, used on `/legal`, `/brand-guide`, and the cookie banner) and a repeated raw Tailwind class string used throughout the newer homepage sections. They agree on every visual rule above. Don't introduce a third pattern; extend one of the two existing ones.

### Cards (signature: the offset-edge card)
- **Corner Style:** 18–28px radius depending on card size.
- **Background:** White (on cream/orange sections) or a lighter surface (on purple sections).
- **Depth Strategy:** The Offset-Edge Rule (see Elevation & Depth), not a shadow.
- **Border:** None, in the offset-edge system; the offset layer itself does the work a border or shadow would otherwise do.
- **Internal Padding:** 24–32px.

### Accordion (FAQ)
Built on native `<details>`/`<summary>` rather than a JS-controlled component, so every answer is present in the server-rendered HTML and works with zero JavaScript. A closed row is a plain cream card with a numbered index and an outlined `+` toggle; opening it lifts the row onto the offset-edge treatment (it turns white, gains the orange offset layer) and the toggle fills solid orange and rotates to `×`. React state exists only to drive the height and colour animation; the disclosure itself stays uncontrolled.

### Navigation
Two variants, chosen by route rather than by prop (`Nav` is mounted once in the root layout): a **dark variant** for every page that opens on a purple or photographic hero (transparent pill that fills Workshop Purple with a blur on scroll, white pill nav links, white logo), and a **light variant** for the one page that opens on cream (white pill bar, Workshop-Purple logo, Ember-Crimson nav links). Both share the same floating-pill shape, the same scroll-triggered background transition, and the same mobile hamburger-to-panel behaviour.

## Do's and Don'ts

### Do:
- **Do** pick the accent colour (orange vs. crimson vs. purple) by what surface it sits on, per the Surface-Decides Rule, every time, not from habit.
- **Do** use the offset-edge treatment as the default depth answer for a new card before reaching for a shadow.
- **Do** add `active:scale-[0.97]` (or equivalent press feedback) to every new interactive element; this is a checked convention, not a nice-to-have.
- **Do** gate every animation on `prefers-reduced-motion`, both via the global CSS block and per-component where GSAP is used (`gsap.matchMedia`).
- **Do** keep claims checkable: link to something real, or say "coming soon." Never invent a stat, a client count, or a testimonial.

### Don't:
- **Don't** put white text on a Signal Orange background at normal text sizes (under ~18.66px bold); it fails WCAG AA. Use Near-Black Ink instead, or reserve white for large display type where the 3:1 large-text exemption applies.
- **Don't** introduce a bounce or elastic easing curve anywhere. Every animation on the site eases out on an exponential curve and never overshoots; this is a deliberate, checked constraint, not an absence of decision.
- **Don't** reach for a soft blurred shadow as a card's primary depth cue on the newer homepage sections; that's the older pattern the offset-edge motif replaced.
- **Don't** add a kicker/eyebrow label above a heading reflexively. Several were removed from the homepage as decoration that added nothing the heading didn't already say; only add one where it carries real information (e.g. "FAQ" as a section identifier), not as a default ornament.
- **Don't** ship a component that skips the `prefers-reduced-motion` gate, even for something that feels purely decorative (a progress bar, a background drift). The site has been caught by this class of bug before.
