# Rolling the homepage design across the whole site

**2026-09-11.** The homepage redesign is live. Johandre: *"redesign every page to
have the same look and feel as the home page — reuse the video element where you
see fit."* This is the coherence decision the homepage work deliberately left
open, now made.

## Why this is not 22 page rewrites

The site is well factored, and three things carry most of the weight:

| leverage point | reaches |
|---|---|
| `@theme` tokens in `globals.css` | **59 files** — type and colour everywhere |
| `PageHero` | **17 pages** |
| `Section` / `CTABand` | 13 / 12 pages |
| `ServicePageTemplate` + `IndustryPageTemplate` | the 11 service sub-pages (18 lines each) |
| `Nav` / `Footer` | every page |

So the order of work matters enormously. Tokens and chrome first; bespoke page
bodies last, and there are only about eight of those.

## The palette decision

The new design has **no purple**. The live site uses `--color-ht-purple`
(`#2e1848`) for dark sections, the footer and headings on cream. "Same look and
feel" means dark sections become ink.

| token | was | becomes |
|---|---|---|
| `--color-ht-cream` | `#fbf7ec` | `#f7f7f4` paper |
| `--color-ht-purple` | `#2e1848` | `#111111` ink |
| `--color-ht-orange` | `#fe431a` | `#f13e1b` |
| `--font-heading` | Parkinsans | Oswald |
| `--font-body` | Instrument Sans | IBM Plex Sans |

Purple survives in one place only: the `gg` mark inside the logo lockup, which
is artwork, not a UI colour.

## The video

Reused, but **not on every page** — it is 2.6MB, and a signature that appears
everywhere stops being a signature. Plan: `PageHero` gains an optional `video`
prop, default off, enabled on the few pages where a full-bleed opening actually
earns its weight (`/about`, `/services`, `/start-project`). Everywhere else
gets the same hero treatment on a flat ink ground.

## Order

1. **Tokens** — `globals.css`. Type and colour land on all 59 files at once.
2. **Chrome** — the whole site adopts the homepage's header and footer. These
   are already built (`HomeChrome`, `HomeFooter`); they move out of `home2026/`
   into shared use and `app/(site)/layout.tsx` uses them instead of
   `Nav`/`Footer`. One header and one footer for the entire site, literally the
   same components.
3. **Scope** — with every page on the new system, `home2026.css` stops needing
   to be scoped. The wrapper moves up rather than the rules being rewritten.
4. **Shared components** — `PageHero` (+ optional video), `Section`, `CTABand`,
   `FAQAccordion`, `Button`, then the two page templates.
5. **Bespoke pages**, largest first: `work/[slug]` (600 lines), `brand-guide`
   (529), `legal` (444), `insights/[slug]` (285), `about` (248), `services`
   (221), `work` (135), `contact` (132).

## Checkpoints

Stop and show after step 2, and again after step 4. Those are the two points
where the direction is visible and cheap to correct; discovering at step 5 that
the hero treatment is wrong would waste the most work.

## Rules that still apply

- **Pushing `main` deploys to production.** Explicit approval every time.
- The eyebrow label is a deliberate brand element (`AGENTS.md`) — the new design
  uses numbered eyebrows too, so this survives rather than being dropped.
- White on orange is for icons only, never body text.
- `app/not-found.tsx` keeps its own `metadata` export and must not set `robots`.

## Steps 1–2 done, 2026-09-11

**Tokens repointed** in `globals.css`. Type and colour reached all 59 files from
one edit: Oswald/IBM Plex Sans, `#f13e1b` orange, `#111111` ink, `#f7f7f4` paper.
`ht-pink` now points at the orange, since the new design has no pink.

**Chrome unified.** Every page now renders the homepage's header and footer —
literally `HomeChrome` and `HomeFooter`, not a second copy — so the two cannot
drift. Lenis came out of that layout: it drove GSAP's ScrollTrigger for the old
sections, and the new design scrolls natively.

### The mistake worth recording

The first attempt wrapped `{children}` in `.home-2026` too. `home2026.css`
styles bare elements, and `.home-2026 a` at (0,1,1) beats `.text-white` at
(0,1,0) — so the scope silently overrode the Tailwind utilities every existing
page body is built from, and the pricing hero's chips went ink-on-ink.

The scope now wraps **the chrome only**. Page bodies keep their utilities and
pick up the new look through the tokens. Each page opts into the scope as it is
actually redesigned. Wrapping everything at once looked like the tidy move and
was the wrong one.

### Contrast, measured not assumed

Two useful numbers from the new palette: orange is **4.90:1 on ink** (fine for
text) but only **3.59:1 on paper** — borders, icons and large text there, never
small body copy. That constraint is why `ht-pink → orange` could not simply be
waved through.

An automated audit — every text node, computed colour composited over its real
background, WCAG thresholds by size and weight — found **five genuine failures**
on `/pricing`. All were `text-ht-purple/50` on light grounds at 12–13px.

They were **pre-existing**, not caused by the swap: `/50` measured 3.14:1 before
and 3.49:1 after, so the change slightly improved them without clearing the bar.
Raised to `/70` (6.85:1), which is already this codebase's dominant convention.
`/pricing` and `/about` now audit clean.

Worth keeping: the first version of that audit reported eight failures at 1.11:1
that were not real. Tailwind v4 emits `oklab()` for opacity-modified colours and
the string parsing choked on it. Normalising every colour through a canvas
first is what made the numbers trustworthy.

### What has NOT changed yet

Page **bodies** still carry their old structure — card grids, offset shadows,
the old section rhythm. They are the right typeface and the right colours, but
not yet the homepage's *layout* language. That is steps 4–5.

