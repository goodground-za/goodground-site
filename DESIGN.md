---
name: GoodGround
description: Website development studio in George, South Africa. Plain, grounded, quietly confident. Warm canvas, ink type, plum and coral accents.
colors:
  canvas: "#F7F7F4"
  surface: "#FFFFFF"
  ink: "#111111"
  muted: "#5F5B66"
  line: "#E7E3DC"
  plum: "#2E1848"
  plum-deep: "#1C0F2E"
  coral: "#EF4A23"
  coral-text: "#C2300E"
  coral-fill: "#D0340F"
  peach: "#F7B48F"
  lilac: "#EEE8F6"
  blush: "#FCEDE6"
  mint: "#E3F1EA"
typography:
  display:
    fontFamily: "Oswald, Arial Narrow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(56px, 35.2px + 5.333vw, 112px)"
    fontWeight: 500
    lineHeight: 0.92
  h2:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(32px, 23.09px + 2.286vw, 56px)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  kicker:
    fontFamily: "Oswald, Arial Narrow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.06em"
rounded:
  pill: "999px"
  chip: "12px"
  card: "20px"
  card-lg: "24px"
  cta: "32px"
spacing:
  gutter: "20px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
  button-coral:
    backgroundColor: "{colors.coral-fill}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  button-light:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
---

# Design System: GoodGround

Source of truth for the look: `components/gg/gg.css` (tokens and shared components) and the private `/brand-guide` and `/_styleguide` pages, which show every value and component as built. This file records the decisions behind them. It replaces the earlier palette (cream, purple, orange, pink) and the Parkinsans and Instrument Sans pairing, which were retired by the October 2026 redesign from the Figma file PI4P3fF9RVIAiTI7ZMxohj.

## Overview

A warm off-white canvas, near-black type, and two accents with distinct jobs: plum for weight and promotion, coral for the one action. Cards are white with a hairline, corners are generous, buttons are pills with an arrow chip. Headlines are tall condensed Oswald in capitals; everything that has to be read is IBM Plex Sans. It should feel like a straight-talking craftsperson who built the thing, not a template: the site is also the portfolio.

The Home hero keeps the live gradient-video hero, scoped under `.home-2026` (`components/home2026`). It is the one place that carries its own variables, by design.

## Colour

- **Canvas, surface, ink, muted, line.** The neutral set. Ink on canvas is 17.6:1, muted on canvas 6.2:1.
- **Plum and plum-deep.** Dark and promotional surfaces: the Full Service band, summary cards, the cookie banner, the menu. White on plum is 15.7:1.
- **Coral.** `coral` is for fills, icons, focus rings and display-size type only: as small text it is 3.1 to 3.7:1 and fails. Use `coral-text` for small text and links on light surfaces (4.7:1 or better on white, canvas, blush, lilac, mint) and `coral-fill` behind white labels (5.02:1).
- **Peach.** Accent on dark surfaces (totals, links on plum). Coral would be 4.1:1 there.
- **Lilac, blush, mint.** Soft tints for icon chips, selected and warning states, success states.
- One gradient only: `--gg-gradient-cta`, plum to wine to coral to plum, on the call-to-action card.

## Typography

Two faces, self-hosted. **Oswald 500**, uppercase, line-height 0.92: every page H1, large numbers, route labels, kickers. **IBM Plex Sans** 400, 500 and 600: section titles, paragraphs, forms, buttons. Titles under the H1 are Plex SemiBold in sentence case with tight negative tracking. Scale classes: `gg-display-xl|l|m`, `gg-h2`, `gg-h2-side`, `gg-title-l`, `gg-lead`, `gg-body`, `gg-kicker`, `gg-number`. Body measure stays between 45 and 75 characters.

## Layout and spacing

Content width 1200px. Gutter 20px, 40px from 768, 120px from 1200. Section padding 64px, 96px from 768, 120px from 1200. Spacing is on a 4px base. Breakpoints: 390 (phone), 768, 1100 to 1200. Every page is checked at 1440, 820 and 390.

## Components

Button (primary ink, coral, outline, light; pill with an arrow chip that slides on hover), Tag, SectionHeader, SplitHeading, FaqAccordion (one open at a time, first open, anchors), GradientCta, BottomSheet, PillToggle, Field/TextArea/CheckField, LinkedCard, ArticleCover, CountUp, Icon (Lucide shapes at one stroke), SiteHeader and SiteFooter (canonical, with a "Cookie settings" link). All live in `components/gg/`. Page-specific pieces are namespaced per page (`pr-`, `ln-`, `fq-`, `lg-`, `ob-`, `bgd-` and so on) beside their page's CSS.

## Elevation

Hairline first, shadow second. Four shadows exist: visual (hero illustrations), float (menus and sheets), hover (card lift), sticky (floating bars). On dark surfaces separation is a white 8 to 14% border or nothing.

## Motion

Declared with `data-reveal` (fade-up, stagger, header, group, line-mask, count-up, fill) and run once by one helper (`components/gg/motion/GgMotion.tsx`). Timings 120, 200, 400, 700 and 1200ms; `ease-out` cubic-bezier(.16, 1, .3, 1), `ease-in-out` cubic-bezier(.65, 0, .35, 1), a back ease for small pops only. Motion explains hierarchy or feedback and never decorates; prices never count up through other numbers. `prefers-reduced-motion` and `html[data-motion="off"]` jump everything to its end state, and pages work with no JavaScript.

## Do and don't

- Do use `coral-text` for any small coral text and white labels only on `coral-fill`.
- Do keep one coral button per page or step.
- Do not use Oswald for anything that must be read as a sentence.
- Do not add a third typeface, new gradients, or a fifth shadow.
- Do not invent statistics, quotes, clients or case studies. Where proof does not exist, say so.
- Do not write em dashes in user-facing copy.
