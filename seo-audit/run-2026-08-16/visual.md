# GoodGround — Visual / Above-the-Fold Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Prior audit referenced:** `seo-audit/FULL-AUDIT-REPORT.md` (2026-07-20) — that audit was SEO-only and contained no visual/screenshot analysis, so there is nothing to cross-reference directly. This is the first visual pass on record for this site.
**Method:** Playwright/Chromium, viewport emulation at 1440×900 (desktop) and 390×844 (mobile), plus targeted close-up and time-series captures on `/pricing` to test the animated border-trail claim, and DOM/`getAnimations()` inspection to verify what's actually running (not just what a single frame shows).
**Screenshots:** `seo-audit/run-2026-08-16/screenshots/`

---

## Score: 74 / 100

The two confirmed copy/style changes (hero headline + CTA, "We specialise in" pill) landed cleanly and read well on both viewports. The `/work/b3tter-bottle` CTA/footer transition is clean, not clipped. The score is held down by one real defect: **the advertised animated border-trail on the pricing page's "Grow" card does not exist on the live site** — not "hard to see," but structurally absent. That was explicitly flagged as a known risk during the build and the risk materialized.

---

## Findings by severity

### Critical

**1. `/pricing` — Grow card border-trail animation is not present on production (desktop + mobile)**

Confirmed by three independent checks, not just visual inspection:

- **Time series:** 10 close-up frames of the Grow card border captured at ~400ms intervals (2x device scale factor) — `screenshots/pricing-grow-tight-0.png` through `-9.png`. The ring is pixel-identical across all frames. No moving highlight, no brightness pulse, nothing.
- **`getAnimations()` sweep:** queried every element on the page for active CSS/WAAPI animations — **zero animations found anywhere on the document**, not just on the card.
- **Computed style inspection:** the visible orange ring is a static `box-shadow: rgb(254,67,26) 0 0 0 2px, rgb(254,67,26) 0 14px 0 0` on the card `<div>`. No `::before`/`::after` pseudo-elements, no `animation-name`, no `<canvas>`, no SVG stroke animation among the card's 40 descendants (7 `<svg>` present, all static checkmark icons).

This isn't the anticipated risk of "the trail is there but blends into the ring" — there is no trail. Either it was never shipped to production, or a deploy reverted/dropped it. Confirmed on both desktop (`pricing-grow-tight-*.png`) and mobile (`pricing-grow-mobile.png`) — mobile shows the identical static ring.

**Fix:** treat as a missing feature, not a contrast tweak. Re-check the component that was supposed to ship this (likely a conic-gradient `::before` with a `background-position`/`rotate` CSS animation, or a `stroke-dashoffset` SVG animation) and confirm it's actually included in the deployed bundle — this smells like a build/deploy gap rather than a design decision, given the badge, ring, and hover-lift are all present and working, just not the animation.

### Medium

**2. `/pricing` desktop — "MOST POPULAR" badge sits proud of the card top edge with no visible motion to draw the eye to it**

With the border-trail absent, the Grow card currently differentiates itself only by a static orange ring (2px + 2px offset shadow) versus the pink/rose rings on the other three cards. That's a subtle, easy-to-miss distinction at a glance — the "most popular" signal is riding entirely on the badge text now. Not broken, but worth knowing this is currently doing less visual work than intended. Same root cause as finding 1; will likely resolve once the animation ships.

### Low

**3. Homepage — cookie consent banner sits directly under the primary CTA on both viewports**

Desktop and mobile (`home-desktop.png`, `home-mobile.png`): the banner overlaps the trust-line text ("Two ways to pay · Located in South Africa") on desktop and sits just below "Let's chat" on mobile. It does not cover the CTA button itself on either viewport, so this isn't blocking, but it's the first thing under the fold-line interaction and adds visual noise directly beneath the hero. Standard pre-consent pattern, not a defect — noting only because it's the first thing a first-time visitor sees stacked against the new hero copy.

**4. `/work/b3tter-bottle` — full-page automated screenshots render large blank sections**

Worth recording so it isn't mistaken for a live bug: a naive `full_page` screenshot of this route shows several sections (the "Snapshot" stats block, mid-page reveals) as blank white/purple gaps. This is a false artifact of scroll-triggered reveal animations that don't fire correctly under Playwright's synthetic full-page capture — confirmed by re-capturing with manual incremental scrolling, at which point all sections render with full content (`work-scroll-00.png` through `-11.png`). No actual defect on the live page; flagging so this doesn't get "re-fixed" from a bad screenshot in a future pass.

---

## What changed since 2026-07-20

The 2026-07-20 audit was SEO/technical only — it did not screenshot or visually assess any page. Everything below is being confirmed for the first time in this pass, checked against the change description provided for this task rather than a prior visual baseline:

| Change | Status |
|---|---|
| Homepage hero headline now reads "We're a website development studio based in South Africa, building AI-accelerated sites that convert." | **Confirmed live**, desktop and mobile (`home-desktop.png`, `home-mobile.png`) |
| CTA buttons now sentence case "Let's chat", no decorative arrow-circle | **Confirmed** — plain pill button, sentence case, no icon, both viewports |
| "We specialise in" pill is now solid purple background with white text | **Confirmed** — reads clearly against the hero photo background on both viewports |
| `/pricing` Grow card animated border-trail light | **Not confirmed — does not exist on production.** See Critical finding 1 |

---

## Page-by-page notes

### Homepage — desktop (1440×900)
Above-the-fold is clean: H1, specialism pill, and "Let's chat" CTA are all visible without scrolling. Hero photography (two people with camera/laptop) reads well against the purple nav bar. Nav pills and "START YOUR PROJECT" CTA in the header are legible and well-spaced. No overlapping elements, no layout shift concerns from a static capture.

### Homepage — mobile (390×844)
Hamburger menu present and correctly positioned. H1 wraps to six lines at this width — long, but not truncated or overflowing, and the CTA is still visible in the initial viewport above the cookie banner. Pill and CTA both meet a reasonable touch-target size visually. No horizontal scroll observed.

### `/pricing` — desktop and mobile
Hero section (headline, "View packages" / "Build your own" CTAs) renders correctly on both viewports. Four-card package grid is clean, consistent card heights, readable price hierarchy. The Grow card's "MOST POPULAR" badge is correctly positioned and legible. See Critical/Medium findings above for the animation gap — that is the only real issue on this page.

### `/work/b3tter-bottle` — desktop
Case study hero screenshot block renders correctly once scroll-triggered content is given time to reveal (see Low finding 4 for the false-blank artifact caveat). The "Want a website like this?" CTA block at the bottom is fully visible with both buttons intact, sitting cleanly above the cloud-shaped divider — **confirmed not clipped** (`work-scroll-09.png`, `work-bottom-footer.png`). Footer below the divider renders correctly with all link columns and the large wordmark watermark intact.

---

## Screenshots captured

All in `seo-audit/run-2026-08-16/screenshots/`:

- `home-desktop.png`, `home-mobile.png`
- `pricing-desktop.png`, `pricing-mobile.png`, `pricing-fullpage.png`
- `pricing-grow-closeup-0.png` … `-4.png` (1440×1000, cookie banner visible)
- `pricing-grow-tight-0.png` … `-9.png` (2x DPI close crop on the Grow card border, ~400ms apart — the animation test series)
- `pricing-grow-mobile.png`
- `work-scroll-00.png` … `-11.png` (incremental scroll capture of the full case-study page)
- `work-bottom-footer.png` (footer + CTA transition)

---

## Verification note

Per the two-pass workflow, this is Pass 1 (baseline/diagnostic) for the border-trail defect specifically — it should not be marked resolved until a Pass 2 capture, taken after the animation is redeployed, shows active motion in the `getAnimations()` check and in a repeat of the tight time-series capture.
