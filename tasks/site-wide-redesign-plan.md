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

## Steps 3–5 done, 2026-09-11

### The three things that did most of the work

**`PageHero`**, rebuilt on the homepage's own classes — `eyebrow`,
`display-heading`, `accent-text`, `wrap`, `section-dark` — rather than a
Tailwind lookalike. Same stylesheet, same type ramp, same gutter, so the two
cannot drift as either changes. 17 pages, one file. It gained an optional
`video` prop, off by default and on for `/about`, `/services` and
`/start-project`: the clip is 2.6MB and a signature that appears everywhere
stops being one.

**One gutter.** Inner pages were on `px-6 sm:px-10` (24/40px) while the
homepage's `.wrap` is `clamp(1.25rem, 4.45vw, 5.5rem)` (20/64px), so a hero's
text started 24px further in than the section directly below it, on every page.
A new `px-gutter` utility carries the homepage's exact value; 56 class strings
across 21 files now use it.

**Flattening, at the token level.** `--radius-card` stays 24px (it is exactly
what the homepage gives its own images), `--radius-pill` stays.
`--radius-block` went 40px → 0 → **24px** — see the correction below. `--shadow-soft` and
`--shadow-lift` were redefined from blurs into **hairline rings** — the
homepage's real idiom — so 27 existing `shadow-soft` call sites picked up the
new language untouched. Separately, 26 hard offset shadows
(`shadow-[0_14px_0_0_var(--color-ht-pink)]`, a 14px solid orange bar under
every card) were deleted and their 2px orange rings dropped to hairlines.

### Components that became the homepage's, not lookalikes of it

| was | now |
|---|---|
| `CTABand` — orange card, offset shadow, centred | the homepage's `.contact` block, verbatim |
| `FAQAccordion` — pink rounded block, GSAP height tweens | the homepage's `.faq-list`: native `<details>`, hairline rules, numbered. A client component became a server one. |
| `PricingFAQ` — a near-duplicate of the above | deleted; `FAQAccordion` takes its items |
| `/work` — three white cards on cream | the homepage's `.project-grid`, dark, staggered, driven by `content/caseStudies.ts` |
| `GrowthWhyUs` — three solid orange cards, white text | the homepage's `.reason-grid` on paper |

### Two regressions from step 2 that this found

**`pb-[24vw]` in 13 places** reserved room for the old footer's CloudDivider
scallop. That footer was replaced by `HomeFooter` in step 2, so the reservation
had become **345px of dead cream at the bottom of every page**. Replaced with
`pb-20 md:pb-28`.

**The 404 had lost its header and footer entirely.** `app/not-found.tsx` sits at
the app root, outside the `(site)` route group, so it gets the root layout and
no group layout — and the root layout's chrome had moved into the group. The fix
is `SiteShell`, one component holding skip link, header, `<main>`, footer and
`RevealObserver`, now rendered by all three entry points (the group layout, the
homepage, the 404) so they cannot drift again.

### The most public place the old design survived

**Every social share card was still Parkinsans on purple.** `app/_og/card.tsx`
hard-codes its colours because it renders in Satori, not a browser, so the token
repoint never reached it. Now ink, `#f13e1b`, uppercase Oswald, and the
homepage's own wordmark SVG (fill injected at render time, since Satori does not
implement CSS filters). `Oswald-500.ttf` is the site's own woff2 re-flavoured
with fontTools — Satori cannot parse woff2.

While there: **Parkinsans and Instrument Sans were still being downloaded on
every page.** Nothing referenced their CSS variables after the token repoint.
Both removed from the root layout, along with the now-dead `Parkinsans-Bold.ttf`
and `Syne-Bold.ttf`.

### Contrast, re-measured

The audit from step 2 was rerun on every page. It needed one fix first: Chrome's
canvas `fillStyle` **does not accept `oklab()`**, so normalising through a canvas
— the step-2 fix — silently returned opaque black for every Tailwind
opacity-modified colour and reported white-on-white at 1.07:1. An explicit
oklab→sRGB conversion replaced it.

Twelve genuine failures on `/services`, all white on orange in the Growth block:
numbers at 1.64:1, titles at 3.86:1, body at 3.14:1. `AGENTS.md` is explicit that
white text never goes on this orange. Everything moved to ink, which is what the
homepage's own orange section uses. `/about`'s closing invitation and the
insights CTA had the same problem and got the same treatment; the insights one
had been *correct* at 4.88:1 against the old `#fe431a` and fell to 4.48:1 against
`#f13e1b`.

Every page now audits clean. `/`, `/services` and `/work` are Lighthouse mobile
100/100/100/100 with zero failed audits.

### Worth keeping

`/work`'s project cards failed WCAG 2.5.3 where the homepage's identical-looking
ones did not. The image link's only visible text was the decorative `↗`, and an
`aria-label` that does not contain it is a Label-in-Name mismatch. The fix is to
draw the glyph from CSS (`content`) instead of a text node — a generated glyph is
not visible text, so the `aria-label` stands alone.

**And a build-environment trap:** writing CSS escapes through a Bash heredoc,
`97\FE0E` arrived at Python as `97`, whose `` is a valid **octal**
escape — the stylesheet shipped `U+0011` followed by the literal characters `97`.
It rendered as a control character in a circle and nothing errored. Write the
actual glyph, or check the bytes (`grep | cat -A`) after any escape round-trip.

### What is deliberately NOT done

- **Container widths.** Inner pages cap at `max-w-[1434px]`; the homepage's
  `.wrap` runs to 1920. They agree at 1440 and diverge above it. Changing the cap
  would reflow every prose measure on the site, which is a separate decision.
- **`ServiceAccordion`** is still rounded hairline cards rather than the
  homepage's flat `.service-row` list. It reads consistently and its
  expand/collapse has no counterpart on the homepage to copy.
- **`components/hometest2/`** is untouched. It is the rollback path.

## 2026-09-12 — three corrections from Johandre

### The logos and the footer were still pointing at a single page

The delivered design was one page, so its logo lockups and five of its footer
links were in-page anchors. The menu was fixed on 2026-09-11; the footer and the
two logos were missed, and once the design went site-wide they were simply dead:
there is no `#services` on `/about`, and the logo scrolled you to the top of the
page you were already on.

Now every footer link goes to a real page, matching `navLinks` in
`content/site.ts` and the menu in `HomeChrome`, and all three logo lockups
(header, menu, footer wordmark) go to `/`. `#top` survives in one place only, the
back-to-top control, where it is correct — `#top` is the header's id and every
page renders it.

**The one thing that broke doing it:** wrapping the footer's `gg` mark in a link
collapsed it to 0×0. `goodground-mark.svg` carries only a `viewBox`, so it has no
intrinsic width; that was fine while the `<img>` was a block-level child of a
full-width column, and degenerate the moment its parent was shrink-to-fit. Fixed
with an explicit `width` on the mark rather than by removing the link.

### `--radius-block: 0` was wrong

Reported as "some of the containers on the inner pages have 90 degree corners".
The reasoning behind 0 was right about the homepage and wrong about what the
token controls. The homepage genuinely has no rounded **section** edges — still
true, and its sections carry no radius token at all. But **every** `rounded-block`
call site is an inset **panel**: a form, a dark bento block, a case-study figure.
Squaring those did not match the homepage; it left hard corners on a page whose
cards were still 24px.

The site now has one container radius. `--radius-block` and `--radius-card` are
both 24px, deliberately identical: a panel and a card side by side with different
corners is the inconsistency the token exists to prevent. Sections stay square by
having no radius, not by this being 0.

### Verified after

Header, menu and footer logos all navigate to `/`; the menu logo also closes the
dialog and releases the scroll lock. Every footer destination returns 200 and
both `/legal` anchors exist. Every painted inset container on `/services` is
24px or a pill; what remains at 0 is full-bleed bands and hairline-ruled rows,
which is the homepage's own idiom. `/` and `/contact` are Lighthouse mobile
100/100/100/100, zero failed audits. No horizontal scroll at 390px.

## 2026-09-12 — the clip goes on every hero

Johandre's call, overriding the reservation above. `PageHero`'s `video` prop
defaults to `true`, the three explicit opt-ins came off, and the article header
on `/insights/[slug]` — which is a hero banner but not a `PageHero` — gets the
clip as a background layer behind its own markup.

The prop stays, so a hero can still opt out. Nothing does.

### It could not just be switched on

**Caching.** Files in `public/` are served `max-age=0, must-revalidate`. That was
survivable on one page; on seventeen it means every navigation revalidates 2.6MB
before the video can start. `next.config.ts` now sends
`max-age=86400, stale-while-revalidate=604800` for the clip and its poster. Not
`immutable`: the filename is stable, so an immutable year would mean a replaced
clip never reaching anyone who had already visited.

**Contrast.** The delivered hero's scrim runs 8% at the top to 48% at the bottom,
which works because the only small text over it sits at the very bottom. An
inner-page hero puts an eyebrow and an intro much higher up. Measured against the
moving footage — sampling the decoded frames at five points through the clip and
compositing the CSS gradient by hand, rather than eyeballing one screenshot —
the eyebrow came out at **3.43:1** and the intro at **4.44:1**, both under the
bar. The article header was worse: its category label was the accent orange over
the clip's own reddish orange at **1.30:1**, and the back link at 3.44:1.

Two new scrims, one per variant, and the article's category label is now white
like every other eyebrow on the site. Re-measured: nothing under 7.8:1 on a
`PageHero`, and all 24 text nodes in the article header clear the bar.

**Do not "simplify" either scrim back to the hero gradient.**

### The measurement bug worth remembering

The first article-header run reported three elements at ~1.1:1. They were fine.
`text-white/90` computes to `oklab()`, and the inline sampler only parsed
`rgb()` — so it read the lightness as a red channel and called white black. The
same trap as the step-2 audit, in a different script. Any colour read out of
`getComputedStyle` in this codebase needs an oklab path.

### Still not on /work/[slug]

A case study's hero is the project's own full-bleed screenshot. That is the
thing the page is about, so putting the GoodGround clip there would replace the
content with branding. Left alone deliberately — say the word if it should
change.
