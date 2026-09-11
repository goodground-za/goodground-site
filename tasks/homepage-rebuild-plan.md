# Homepage rebuild — porting the delivered redesign

**2026-09-11.** A finished homepage redesign was delivered as static HTML/CSS/JS
in `website-and-ops/GoodGround-Homepage-Live-Files/`. The job is to make the
live Next.js homepage that page.

## What was delivered

Genuinely good work, not a scrape. Design tokens, `prefers-reduced-motion`
handling, `:focus-visible` outlines, a skip link, `sr-only`, a native `<dialog>`
menu with Escape and focus handling, semantic sections with `aria-labelledby`,
self-hosted woff2. 13 062px tall at 1440, eleven blocks:

`hero` (video) · `intro` · `work` · `services` · `process` · `reasons` ·
`strategy` · `industries` · `faq` · `contact` · `footer`

Its own design system, and it is **not** the current site's:

| | delivered | live site |
|---|---|---|
| display | Oswald 500/700 | Parkinsans |
| body | IBM Plex Sans 400 | Instrument Sans |
| accent | `#f13e1b` | `#fe431a` |
| dark | `#111111` ink | `#2e1848` purple |
| ground | `#f7f7f4` paper | `#fbf7ec` cream |

## Route B, not Route A

Their own notes flag it: the live homepage is served by Next.js, so dropping
`index.html` into a document root does not replace it. This gets ported into the
app.

## The structural catch

**The delivered page brings its own header AND its own footer.** The live site
renders `<Nav />` and `<Footer />` from `app/layout.tsx`, around every page. Port
naively and the homepage gets two of each.

So the chrome has to move down a level:

- root `app/layout.tsx` keeps `<html>`, `<body>`, fonts, analytics — **no chrome**
- new `app/(site)/layout.tsx` adds `<Nav />` + `<Footer />`
- every existing page directory moves into `app/(site)/`
- the homepage stays at `app/page.tsx` and renders its own chrome

Route groups are transparent to routing, so `/pricing` etc. keep their URLs. This
is the correct App Router pattern for "one page with different chrome"; the
alternative (hiding Nav/Footer with `usePathname()`) puts a client component in
the root layout to solve a routing problem.

## CSS: scoped, with its own tokens

The delivered `styles.css` styles bare elements (`h1`, `p`, `button`, `a`) and
sets `:root` font-family. Loaded globally it would fight `globals.css` on all 59
files that use the `ht-*` tokens.

So the homepage gets its **own token block and its own scope**, e.g. `--gg-paper`,
`--gg-ink`, `--gg-orange` under a `.home-2026` wrapper. Self-contained, cannot
leak, and if the design is later rolled out site-wide those tokens get promoted
to `globals.css` rather than rewritten.

## Steps

- [x] Fonts: `next/font/local` for Oswald 500/700 + IBM Plex Sans 400, from the
      supplied woff2. Scoped to the homepage, not swapped site-wide.
- [x] Assets into `public/` — images, video, poster, logo, mark, font licences.
- [x] Route groups: create `app/(site)/layout.tsx`, move existing pages into it,
      strip chrome from the root layout.
- [x] Port the eleven sections as components under `components/home2026/`.
- [x] Port `script.js`: video + motion toggle, `<dialog>` menu, reveal observer.
      React lifecycle, `prefers-reduced-motion` respected.
- [x] Absolute `https://www.goodground.co.za/...` links → relative, so preview
      and staging don't bounce to production.
- [x] **Keep** the existing `<HomeSchema />`, `<ServicesSchema />` and the page
      `metadata` export. Those are tuned SEO, not part of the visual work, and
      the delivered package has no equivalent.

## Verify

- [x] `tsc`, `eslint`, `next build` — clean, 0 errors.
- [x] Verified against the delivered page — see "Pixel parity" below.
- [x] Lighthouse mobile: **100 / 100 / 100 / 100, zero failed audits**.
- [x] Reduced motion: scoped CSS block intact, both JS paths honour the query.
- [x] Keyboard: dialog opens as a true modal, focus moves to Close, body locks, focus returns on close — and a menu anchor moves focus to the section with a temporary tabindex that is cleaned off on blur.

## The decision this does NOT settle

**Every other page will still be Parkinsans, cream and purple.** Click "All
services" from the new homepage and the type, the orange and the dark colour all
change. That is a real inconsistency and it is worth deciding deliberately, not
drifting into — but it is a decision best made looking at the finished homepage
next to an inner page, so it is not blocking this work.

Worth knowing when that conversation happens: the site is properly tokenised —
`--font-heading`, `--font-body`, `--color-ht-*`, used across 59 files — so
aligning type and accent colour site-wide is a token change, not 59 rewrites.
The purple is the genuine divergence, since the new design has no purple at all.

## Pixel parity

Every section landed at the same offset and height as the delivered page, and
the page totals the same 13 062px at 1440:

| | delivered | ported |
|---|---|---|
| hero | 0 / 900 | 0 / 900 |
| intro | 900 / 1173 | 900 / 1173 |
| work | 2073 / 2452 | 2073 / 2452 |
| services | 4525 / 1500 | 4525 / 1500 |
| process | 6025 / 1288 | 6025 / 1288 |
| reasons | 7313 / 1078 | 7313 / 1078 |
| strategy | 8391 / 1091 | 8391 / 1091 |
| industries | 9483 / 901 | 9483 / 901 |
| faq | 10383 / 1093 | 10383 / 1093 |
| contact | 11477 / 775 | 11477 / 775 |
| footer | 12252 / 810 | 12252 / 810 |

Also confirmed: one header, one footer, one `<main>`, one `<h1>` (no doubled
chrome); `/pricing` still has its own Nav and Footer and is still on Instrument
Sans, so neither design system leaks into the other; the `ProfessionalService`,
`WebSite` and six `Service` schema nodes all survive in the prerendered HTML.

## Deviations from the delivered markup — both invisible

1. **Two WCAG 2.5.3 (Label in Name) fixes.** The motion toggle showed "Pause
   motion" but was named "Pause background motion", and the B3TTER card showed a
   "Latest project" badge its accessible name never mentioned. Someone driving
   the page by voice could not say what they could see. The aria-label came off
   the toggle (its visible text already names it exactly) and the badge text was
   folded into the card's name. These were in the delivered package; porting a
   design faithfully does not mean porting its accessibility defects.

2. **31 internal `<a>` became `<Link>`.** A raw anchor to an in-app route does a
   full page reload and throws away the client-side navigation every other page
   gets. Anchors, `mailto:` and external links correctly stayed as `<a>`.

Also: 14 straight apostrophes became typographic, matching the design's own
usage elsewhere ("Let’s chat") and clearing react/no-unescaped-entities.

## Open

- **8 `no-img-element` warnings.** The delivered markup uses plain `<img>`.
  Converting to `next/image` would gain automatic optimisation but changes the
  markup and the loading behaviour of the design as delivered — worth deciding
  deliberately rather than as a lint reflex.
- **The old `components/hometest2/` sections are now unused by the homepage but
  left in place.** They are the rollback path if this redesign is not approved.
  `WhoWeBuildFor`, `WhatWeBuild` and `MobileStickyBar` are still used elsewhere.
- **Not pushed.** AGENTS.md: pushing `main` deploys straight to production with
  no staging step.
