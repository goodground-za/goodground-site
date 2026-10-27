# GoodGround redesign: full build specification

This folder is the complete hand-off from the Figma design phase to the build. The goal is a site that matches the Figma frames 1:1 on desktop (1440) and mobile (390), with all the motion and interaction behaviour written in the Figma notes.

- **Figma file:** https://www.figma.com/design/PI4P3fF9RVIAiTI7ZMxohj (file key `PI4P3fF9RVIAiTI7ZMxohj`)
- **Live site (current):** https://www.goodground.co.za
- **Design status:** complete as of 26 October 2026. 18 Figma pages, every one with desktop and mobile frames, section notes and a page note.

Put this folder in the repo as `docs/redesign/` and keep it current as decisions change.

---

## 0. Contents

| File | What it covers |
|---|---|
| `README.md` (this file) | How to read the spec, design tokens, type scale, layout grid, every shared component, the global motion system, URL map, query parameters, SEO/analytics rules, confirmed decisions, open items, build order, QA checklist, frame index, starting prompt |
| `pages/01-home.md` | Home `/` |
| `pages/02-about.md` | About `/about` |
| `pages/03-services.md` | Services `/services` |
| `pages/04-service-detail.md` | Service detail template `/services/{service-slug}` (SEO example) |
| `pages/05-industry.md` | Industry template `/services/{industry-slug}` (Trades example) |
| `pages/06-work.md` | Work listing `/work` |
| `pages/07-case-study.md` | Case study template `/work/{slug}` (B3TTER example) |
| `pages/08-pricing.md` | Pricing `/pricing` |
| `pages/09-website-launch.md` | Website launch offer `/website-launch` |
| `pages/10-process.md` | Process `/process` (new) |
| `pages/11-insights.md` | Insights listing `/insights` |
| `pages/12-article.md` | Article template `/insights/{slug}` |
| `pages/13-start-project.md` | Start your project `/start-project` (multi-step) |
| `pages/14-contact.md` | Contact `/contact` |
| `pages/15-faq.md` | FAQ `/faq` |
| `pages/16-legal.md` | Legal `/legal` |
| `pages/17-onboarding.md` | Client onboarding `/onboarding` (new, private) |
| `pages/18-utility.md` | `/thanks` fallback and the 404 page |
| `ALL-IN-ONE.md` | This README and all 18 page files in one document, if a single file is easier to hand over |

Each page file has the same three parts:

1. **Page header:** URL, Figma page and frame node IDs, and build notes I added while writing the spec (gaps, conflicts, what is sample data).
2. **Figma notes (verbatim):** the page note and every section note, copied word for word. **These notes are the behaviour spec.** Where a note and this README disagree, the note wins for that page, unless the README says otherwise.
3. **Layer-by-layer spec:** every frame from the top down, with auto-layout, sizes, colours, radii and every text string with its font.

---

## 1. How to read the layer spec

Lines look like this:

```
- **Card name** (col gap 16, pad 32/32/32/32, 558×331, w:fill, bg surface, r 28, border line 1)
  - T "Some text" — IBM Plex Sans SemiBold 24/115% ls -2%, ink
  - ⧉ Button Style=Outline "View service" (164×54)
```

| Notation | Meaning | CSS |
|---|---|---|
| `col` / `row` | Auto-layout direction | `display:flex; flex-direction:column / row` |
| `gap N` | Space between children | `gap: Npx` |
| `pad T/R/B/L` (or one number) | Padding | `padding: T R B L` |
| `W×H` | Size of the frame in the design | Use as reference. Only fix a size when the note or the element needs it (icon chips, avatars, mock devices) |
| `w:fill` | Stretches to the parent width | `align-self: stretch` / `width:100%` |
| `h:fill` | Stretches to the parent height | `align-self: stretch` in a row |
| `grow` | Takes the remaining space | `flex: 1 1 0; min-width: 0` |
| `align X/Y` | Main-axis / cross-axis alignment. `space_between`, `center`, `max` (end), `baseline` | `justify-content` / `align-items` |
| `wrap` | Wraps | `flex-wrap: wrap` |
| `bg token` | Background from the colour tokens (section 2) | `background: var(--token)` |
| `bg #FFFFFF @8%` | White at 8% alpha | `rgba(255,255,255,.08)` |
| `r N` | Corner radius. `r 999` / `r 99` = pill | `border-radius` |
| `border token W` | Stroke inside the box. `border line 1/0/0/0` = top only | `border` / `box-shadow: inset` |
| `shadow 0 40 70 #2E1747@30%` | Drop shadow x y blur colour@alpha | `box-shadow: 0 40px 70px rgba(46,23,71,.30)` |
| `clip` | Clips children | `overflow:hidden` |
| `T "…" — Family Style size/lh% ls N%` | Text node. `lh` is line height as % of size. `ls` is letter spacing as % of size | `font: …; line-height: 1.55; letter-spacing: -0.02em` |
| `⧉ Component Prop=Value "label"` | An instance of a shared component (section 4) | Use the shared component |
| `icon name Npx` | Icon at that size | Section 4.10 |
| `⏎` inside text | A forced line break in the design | `<br>` or a balanced wrap that gives the same lines at 1440 / 390 |

**Letter spacing:** Figma's `ls 6%` means 0.06em. `ls -3%` means −0.03em.

**Line height:** `/92%` means `line-height: .92`. No `/` means the font's normal line height. Use `1.2` for Plex and `1.15` for Oswald where nothing is given.

**Text colour tokens** are written at the end of each text line (`ink`, `muted`, `surface` (white), `coral`, `plum`, `peach`, `onDarkMuted`).

Text in the spec is the real copy. Do not rewrite it. Where the live site has different copy for something the spec marks as "keep the live copy", use the live copy.

---

## 2. Design tokens

### 2.1 Colour (Figma variable collection "GoodGround Color")

```css
:root {
  --canvas:      #F7F7F4; /* page background */
  --surface:     #FFFFFF; /* cards, white sections, text on dark */
  --ink:         #111111; /* text, Primary button, dark pills */
  --muted:       #5F5B66; /* secondary text */
  --line:        #E7E3DC; /* borders, dividers, empty meter segments */
  --plum:        #2E1848; /* feature cards, open FAQ text, Plum tag text */
  --plum-deep:   #1C0F2E; /* dark sections, 404 page */
  --wine:        #712344; /* accent */
  --coral:       #EF4A23; /* brand accent, Coral button, numbers, ticks */
  --peach:       #F7B48F; /* kickers on dark backgrounds */
  --lilac:       #EEE8F6; /* tinted cards, open FAQ item, Plum tag bg */
  --blush:       #FCEDE6; /* tinted cards, Coral tag bg, error field bg */
  --mint:        #E3F1EA; /* "fix"/success tints, tick chips */
  --on-dark-muted:#BDB3CB; /* body text on dark */

  /* hero / brand */
  --hero:        #3A1A44; /* existing homepage hero + home CTA card base */
  --gradient-cta: linear-gradient(110deg, #3B1A4A 0%, #9A3348 40%, #C9583D 70%, #5A1E3C 100%);

  /* hover shades (from the global motion note) */
  --ink-hover:   #2B2B2B;
  --coral-hover: #D93C17;
  --light-hover: #F1EEE8;
}
```

Other colours that appear only inside illustrations (browser dots `#F26B5B #F5BE4F #5BC873`, project placeholder gradients, the browser mock gradient `#2E1848 → #9A3348 → #EF8A5A`) are written inline in the page specs. Keep them as local values, not tokens.

**Translucent whites on dark backgrounds:** 6%, 7%, 8%, 10%, 12%, 14% and 18% white are all used (fills and 1px borders). Use `rgba(255,255,255,.0N)` exactly as written.

**Shadows used:**

| Where | Value |
|---|---|
| Hero device / visual cards | `0 40px 70px rgba(46,23,71,.30)` |
| Floating cards (chooser, compact mock) | `0 20px 48px rgba(46,23,71,.10)` / `0 20px 40px rgba(46,23,71,.14)` |
| Linked card hover | `0 24px 48px rgba(46,24,72,.10)` |
| Sticky bars on mobile | `0 10px 30px rgba(0,0,0,.25)` |

### 2.2 Type

Two families, both from Google Fonts. Self-host them (woff2, `font-display: swap`, preload the two most used weights).

| Family | Weights | Used for |
|---|---|---|
| **Oswald** | 500 Medium, 600 SemiBold | Display headlines (always uppercase), kickers/labels (uppercase, tracked), big numbers, prices, MENU label |
| **IBM Plex Sans** | 400 Regular, 500 Medium, 600 SemiBold | Section headings (sentence case, negative tracking), card titles, body, buttons, form text, the "goodground" logo word |

Logo: the wordmark "goodground" is IBM Plex Sans SemiBold, letter spacing −3%, inside a pill. If the codebase already has an SVG logo, use it at the same size.

**Type scale as used in the frames (build these as utility classes or tokens):**

| Role | Desktop | Mobile |
|---|---|---|
| Display XL (CTA "GROWTH STARTS HERE.") | Oswald 500 120–140 / .92 | Oswald 500 60–72 / .92 |
| Display L (page H1) | Oswald 500 88–112 / .92 | Oswald 500 48–56 / .92–.94 |
| Section H2 | Plex 600 56 / 1.06, −3% | Plex 600 32–34 / 1.08–1.10, −2% |
| Sub-H2 (side columns, FAQ intro) | Plex 600 40–52 / 1.06–1.10, −2 to −3% | Plex 600 26–30 / 1.10, −2% |
| Card title L | Plex 600 34 / 1.15, −2% | Plex 600 20–22 / 1.20, −1% |
| Card title M | Plex 600 20–24 / 1.15–1.22, −1% | Plex 600 16–18 / 1.25–1.30 |
| Lead / intro | Plex 400 18–19 / 1.55 | Plex 400 16 / 1.55 |
| Body | Plex 400 15–17 / 1.55 | Plex 400 13–15 / 1.50–1.55 |
| Small / meta | Plex 400 12–14 | Plex 400 11–13 |
| Kicker / label | Oswald 500 11–14, +6 to +8% | Oswald 500 11–12, +6 to +8% |
| Big number | Oswald 500 28–72 / 1.0 | Oswald 500 24–40 / 1.0 |
| Button label | Plex 600 15 | Plex 600 15 |

Between the 390 and 1440 frames, scale display type fluidly with `clamp()` so that it hits the mobile value at 390 and the desktop value at 1440. Body text switches at the breakpoint instead.

Use `font-variant-numeric: tabular-nums` on every number that animates (COUNT-UP, prices in the configurator, meters).

### 2.3 Layout grid and spacing

| | Mobile < 768 | Tablet 768–1199 | Desktop ≥ 1200 |
|---|---|---|---|
| Design frame | 390 | (no frame: desktop layout, 2-column grids) | 1440 |
| Side gutter | 20 (some full-bleed card sections use 12) | 40 | 120 |
| Content width | 350 | fluid | 1200 max, centred |
| Section padding (vertical) | 64 typical (40–72) | 96 | 120 typical (48–120) |
| Header | pad 16, 74 tall | pad 28/40 | pad 28/40/28/40, 107 tall |

Above 1440 keep the content at 1200 and let the section backgrounds run full width.

**Radii:** pills and buttons 999. Desktop cards 20–32 (most often 28). Mobile cards 18–24. Icon chips 10–14 (8 on the smallest). Big CTA cards 40 desktop, 28–32 mobile.

**Spacing values used:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80, 96, 120. Make them a spacing scale.

---

## 3. Responsive rules

1. Build mobile-first from the 390 frame. Switch to the desktop layout at 1200px.
2. Tablet (768–1199): use the desktop structure, 40px gutters, and drop any 3- or 4-column grid to 2 columns. Two-column hero layouts (text + visual) stack when the visual would be narrower than 360px.
3. Every mobile frame has a "Mobile differences" note. Follow it exactly. These are not just reflows: content changes (shorter copy, fewer rows, list instead of cards, hidden checklists, "Show all" rows).
4. Shortened mobile copy: where the mobile text differs from desktop, it is listed in the mobile layer spec. Put both in the CMS/template (e.g. `problems[].short`) and render one per breakpoint. Do not truncate with CSS.
5. Horizontal chip rows on mobile scroll sideways: `overflow-x:auto; scroll-snap-type:x proximity; scrollbar-width:none;` with a 20px fade mask on the right edge.
6. Tap targets at least 44×44 everywhere.

---

## 4. Shared components (build these first)

All component sets live on the Home Page "Components" board (`2:17`) and the Onboarding components board (`56:151`). Inspect them with the Figma MCP (`get_design_context` / `get_screenshot` on the node ID) before building.

### 4.1 Button — set `2:38`

One pill with a label and a round arrow chip on the right.

| Part | Spec |
|---|---|
| Container | `row`, gap 16, padding 8 / 8 / 8 / 24, height 52, radius 999, align centre |
| Label | IBM Plex Sans SemiBold 15, normal line height, no tracking. Text prop `Label#2:0` |
| Arrow chip | 36×36, radius 999, centred icon `arrow-up-right` 16px, stroke 1.47px |

| Style | Background | Label | Chip bg | Icon | Hover bg |
|---|---|---|---|---|---|
| **Primary** | ink #111111 | white | white @20% | white | #2B2B2B |
| **Light** | white | ink | ink @8% | ink | #F1EEE8 |
| **Coral** | coral #EF4A23 | white | white @20% | white | #D93C17 |
| **Outline** | transparent + 1px ink border (total 54 tall) | ink | ink @8% | ink | ink @4% fill |

- **Hover** (fine pointers only): background shifts as above. The arrow slides out to the top-right while a copy slides in from the bottom-left (chip `overflow:hidden`). Chip scales 1→1.08. `motion/sm`, `ease/out`.
- **Pressed:** scale .97, `motion/xs`.
- **Focus-visible:** 2px coral outline, 3px offset, no animation.
- **Full-width** (mobile): `width:100%`. Label stays left, chip stays right (`justify-content: space-between`).
- Render as `<a>` for navigation and `<button>` for actions. Same look.
- Some buttons in the frames use a plain ghost pill instead (e.g. "How we work" on /thanks: white @14% fill, Plex SemiBold 15 white, pad 14/20). These are listed in the page specs where they occur.
- Home final CTA uses a Coral button whose label is the email address `hello@goodground.co.za` (mailto).

### 4.2 Tag — set `2:49`

Static label pill. Never animates on its own.

| Part | Spec |
|---|---|
| Container | `row`, padding 6 / 12, radius 999, height 30 (32 for Neutral because of its 1px border) |
| Label | Oswald Medium 12, letter spacing 6%, uppercase. Text prop `Label#2:5` |

| Tone | Background | Text | Border |
|---|---|---|---|
| Neutral | white | ink | 1px line |
| Dark | ink | white | none |
| Coral | blush #FCEDE6 | coral | none |
| Plum | lilac #EEE8F6 | plum | none |
| OnDark | white @12% | white | none |

Section-number tags like "01 / GOODGROUND" are Neutral (or OnDark on dark sections).

### 4.3 Article cover — set `41:177`

Generated cover art used on Insights cards, the article page and "Related reading". No photos.

| Part | Spec |
|---|---|
| Frame | 400×220 reference (scales to its card; on cards it is 300×320 or full card width), radius 20, `overflow:hidden` |
| Circles | white 45% Ø240 at (250, −60); white 30% Ø160 at (300, 110); white 25% Ø140 at (−40, 140). Position them as % of the frame so they scale |
| Icon chip | 64×64 white, radius 18, at (28, 28), icon 32px, stroke 2.67 |
| Word | Oswald Medium 56, at (28, 109), uppercase topic name |

| Topic | Background | Icon | Icon + word colour |
|---|---|---|---|
| Websites | lilac | code | plum |
| Growth | blush | up (trend arrow) | coral |
| Pricing | mint | tag | ink |

Build it as a component with a `topic` prop. New topics need a colour and icon decision first.

### 4.4 Form components — board `56:151`

Used by Onboarding (full set) and by Start project and Contact (Field, Radio card, Check chip).

**Form/Field** — `56:215`. Kind = Input | Textarea. State = Default | Focus | Filled | Error.

| Part | Spec |
|---|---|
| Wrapper | `col`, gap 8 |
| Label row | `row` gap 6: label Plex Medium 14 ink + requirement Plex Regular 13 muted ("Optional" / "Required") |
| Box | `row` gap 10, pad 14/16, radius 14, height 51 (Input) / 120 (Textarea, top-aligned) |
| Value | Plex Regular 16. Placeholder muted, filled ink |
| Hint | Plex Regular 13 / 1.45 muted. Error: coral |
| Default | bg canvas, 1px line border |
| Focus | bg white, 1.5px ink border |
| Filled | bg canvas, 1px line border, text ink |
| Error | bg blush, 1.5px coral border, alert icon 18px on the right, hint turns coral and holds the error message |

Input font size stays 16px on mobile so iOS does not zoom.

**Form/Radio card** — `56:228`. Selected = No | Yes.
- `row` gap 14, pad 16/18, radius 18. Radio 22×22 round. Text column gap 2: title Plex SemiBold 15 ink, description Plex Regular 13/1.45 muted.
- No: white, 1px line border, radio white with 1.5px line border.
- Yes: blush bg, 2px coral border, radio filled coral with white check 13px.
- Build as a real `<input type="radio">` inside a `<label>`, visually hidden input, focus ring on the card.

**Form/Check chip** — `56:237`. On = No | Yes.
- `row` gap 8, pad 10/16/10/12, radius 999. Box 18×18 radius 6. Label Plex Medium 14.
- No: white, 1px line border, box white with 1.5px line border, label ink.
- Yes: ink bg, box coral with white check 12px, label white.
- Real `<input type="checkbox">`.

**Form/File row** — `56:275`. Status = Uploading | Done | Error.
- `row` gap 12, pad 12/14, radius 14. File chip 36×36 lilac radius 10 with file icon 18. Text col gap 4: name Plex Medium 14 ink, meta Plex Regular 12 muted ("248 KB · uploaded").
- Uploading: white, 1px line; a 4px progress track (canvas, radius 99) between name and meta; x icon to cancel.
- Done: mint tick chip 24×24 + x to remove.
- Error: blush bg, 1px coral border, meta in coral, retry icon (coral) + x.

**Form/Step item** — `56:294`. State = Done | Current | Upcoming | Attention.
- `row` gap 12, pad 8/12/8/10, radius 12. Indicator 26×26 round with Oswald Medium 11 number ("01").
- Done: mint indicator with check, label Plex Medium 14 ink, transparent bg.
- Current: white bg row, ink indicator with white number, label Plex SemiBold 14 ink.
- Upcoming: white indicator with 1.5px line border, muted number and label.
- Attention: blush indicator with coral number, ink label, 8px coral dot at the end (step has an error or missing required field).

### 4.5 Site header

Three pills on one row, `space-between`.

| | Desktop | Mobile |
|---|---|---|
| Container | pad 28/40/28/40, 107 tall | pad 16, 74 tall |
| Logo pill | pad 10/20, ink bg, radius 999; "goodground" Plex SemiBold 24 −3% white (167×51) | pad 8/16, 138×42; Plex SemiBold 20 |
| Centre pill (breadcrumb / page name) | pad 12/20, white bg, 1px line border, radius 999, Oswald Medium 12 +6% ink, uppercase. e.g. "SERVICES", "SERVICES  /  SEO" (two spaces either side of the slash) | Hidden. Some pages show a text breadcrumb row inside the hero instead (Plex Regular 12 muted + Plex Medium 12 ink) |
| MENU pill | pad 10/20, ink bg, radius 999, "MENU" Oswald SemiBold 16 +2% white + menu icon 18 (106×44) | pad 10/16, 89×41, Oswald SemiBold 14 + icon 16 |

**Variants:**
- **Light** (default on every inner page): canvas background, ink logo and MENU pills, white centre pill.
- **Dark** (404 page): plumDeep background, **white** logo and MENU pills with ink text, no centre pill.
- **Hero** (Home only): the existing live header over the hero, pills in `#1A0D14` @55%. Unchanged.

Breadcrumb pill text links: in "SERVICES / SEO", "SERVICES" links to `/services`. In multi-part breadcrumbs only the parent parts are links; the current page is plain text with `aria-current="page"`.

**Menu:** the menu panel is **not redesigned**. Keep the live site's menu (open/close behaviour, animation and links) and apply the new tokens and fonts to it. Update its links to the URL map in section 7. If the live menu does not list Process, FAQ and Pricing, add them, and show the change to the user.

**Header behaviour on scroll:** not specified in the design. Keep the live behaviour. Elements that are said to "stick under the header" (filters, tab bars, TOC pill) assume a non-sticky header unless the live one is sticky; if it is, offset them by its height.

### 4.6 Footer (canonical)

The footer differs slightly between frames (some inner pages show a simplified one-row footer, some columns differ). **Use this one everywhere**, from Home section 11:

**Desktop** (inside the canvas section below the CTA card; `row`, pad 24/24/0/24, `space-between`, 4 columns):

| Column | Content |
|---|---|
| Brand | "goodground" Plex SemiBold 28 −3% ink; under it "Web development studio · South Africa" Plex Regular 14 muted (gap 12) |
| STUDIO | About `/about` · Work `/work` · Process `/process` · Our story `/about#our-story` |
| SERVICES | Website development `/services#website-development` · Full service `/services#full-service` · SEO `/services/seo` · Google & Meta Ads `/services/google-ads` |
| CONNECT | Instagram · Facebook (live profile URLs, new tab, `rel="noopener"`) · hello@goodground.co.za (`mailto:`) |

Column heading: Oswald Medium 12 +6% muted. Links: Plex Regular 15 ink, gap 10, TEXT LINK underline hover.

**Add a bottom row** (not drawn on Home but drawn on the simplified footers and needed for legal): "© 2026 GoodGround · George, Garden Route" Plex Regular 13 muted on the left; "Pricing · Insights · FAQ · Contact · Legal" Plex Medium 14 muted on the right. 1px line border on top, pad 24/0/32. Year comes from the server date.

**Mobile:** `col` gap 24, pad 12/12/0/12 (inside the 12px-gutter CTA section). Brand block (Plex SemiBold 24, tagline Plex Regular 13). Then 3 equal columns (gap 16): STUDIO (About · Work · Process · Our story), SERVICES (Websites · Full service · SEO · Ads), CONNECT (Instagram · Facebook · Email us). Headings Oswald Medium 11 +6%, links Plex Regular 14. Then the copyright row stacked.

Pages with a sticky bottom bar on mobile (Industry, Pricing, Website launch) need 96px bottom padding under the footer.

Pages without the gradient CTA card above the footer (Start project, Contact, Pricing) show the footer with a 1px line border on top, pad 40/48/48/48 desktop.

Motion: columns FADE-UP with a 60ms stagger when the footer enters.

### 4.7 Gradient CTA card ("GROWTH STARTS HERE.")

Appears at the end of most pages. Two versions exist in the frames; both are the same component with options.

| | Home / About / Work / Insights / Article / Case study / Services | Industry / Service detail |
|---|---|---|
| Section | canvas, pad 24/24/40/24 (card nearly full-bleed, 1392 wide) | surface, pad 0/120/40/120 (card 1200 wide) |
| Card bg | hero colour `#3A1A44` with the animated hero gradient | `--gradient-cta` |
| Card | `col` gap 40, pad 120/96/96/96, radius 40, left-aligned | `col` gap 28, pad 96/80/96/80, radius 40, centred |
| Tag | OnDark "GET IN TOUCH" | OnDark "GET IN TOUCH" / "READY WHEN YOU ARE" |
| Headline | Oswald Medium 140/.92 white, "GROWTH ⏎ STARTS HERE." | Oswald Medium 120/.92 white |
| Row | sub-copy Plex 18/1.5 white left, buttons right: Light "Start your project" + Coral "hello@goodground.co.za" | sub-copy (optional) Plex 18 onDarkMuted; Light "Start your project" + email pill (white @12%, pad 14/20, mail icon 18 + Plex Medium 16 white) |
| Mobile | pad 56/24/28/24, radius 32, Oswald 72, buttons full width | pad 48/24/48/24, radius 28, Oswald 60, Light button + email pill full width |

Motion: headline LINE MASK. Gradient drifts (background-position 0→100% over 18s, alternate). On desktop the Home version has a soft "cursor light" that follows the pointer (see Home section 11 note). Gradient pauses off-screen and with Pause motion. "Start your project" carries `?ref=` per page as listed in each page note.

### 4.8 Linked card

Any card with an arrow chip (services, projects, articles, industries, "Pairs well with").

- The **whole card is one `<a>`**. No nested links or buttons inside. The card title is its accessible name.
- Hover: translateY −4px, shadow `0 24px 48px rgba(46,24,72,.10)`, border line → ink @12%, arrow chip rotates 45° and turns ink with a white icon. `motion/md`, `ease/out`. Pressed: scale .99.
- Covers inside (article/project images) zoom to 1.03 on hover over `motion/md`.
- Focus-visible: 2px coral outline, 3px offset.

### 4.9 FAQ accordion

Used on Home 10, the FAQ page, Services, Pricing, Website launch, Process, Article, Industry 08 and Service 06. Other collapsible rows (Start project "Your answers", Website launch "What's included" groups) use the same height technique.

- **One item open at a time** on every page. First item open by default (except where the FAQ page note says otherwise for search results).
- Item: pad 24/28 desktop (18 mobile), radius 22 (18 mobile). Question Plex SemiBold 18–19 −1% (15/1.35 mobile). Optional number Oswald Medium 18 coral before the question (Service template, FAQ page).
- Closed: bg canvas on white sections / white on canvas sections; icon chip 36×36 (30 mobile) with plus 18 (15).
- Open: bg lilac, question in plum, chip plum with white minus, answer Plex Regular 16/1.55 muted (14 mobile).
- Height animates with the grid-rows technique: wrapper `display:grid; grid-template-rows:0fr → 1fr`, inner `overflow:hidden`, `motion/md`, `ease/in-out`. Icon rotates 180° while switching plus → minus.
- Markup: question is a `<button aria-expanded aria-controls>` inside a heading; the answer stays in the DOM with the `hidden` attribute (or `inert` + collapsed) so search engines read it.
- FAQPage JSON-LD is generated from the same data.

### 4.10 Icons

Line icons, 1.5–2.7px stroke depending on size, round caps and joins, drawn on a 24 grid and scaled (12–36px in the design). Names used in the spec: `arrow-up-right (arrowUR)`, `arrow`, `arrowR`, `chev`, `back`, `down`, `plus`, `minus`, `check`, `x`, `menu`, `search`, `mail`, `phone`, `chat`, `cal`, `clock`, `doc`, `file`, `alert`, `retry`, `lock`, `eye`, `star`, `pin`, `bolt`, `layers`, `chart`, `trend`, `up`, `code`, `shield`, `ads`, `target`, `users`, `layout`, `mobile`, `link`, `image`, `share`, `tag`, `quote`, `bell`.

Export the exact icon SVGs from the Figma file (component instances named `icon/<name>`) with `get_design_context` or `download_assets`. If one is missing, use the matching Lucide icon at the same size and stroke and say so in the PR.

Star icons in ratings are filled coral.

### 4.11 Section header

Tag + heading (+ optional sub-copy + optional CTA). Two layouts:
- **Stacked:** `col` gap 16–20.
- **Split (desktop):** `row`, `space-between`, aligned to the bottom (`align max`): tag + heading on the left (max ~720–820 wide), sub-copy or a link on the right (max ~400). Stacks on mobile.

Motion: HEADER REVEAL (section 5).

### 4.12 Other shared pieces

- **Industry card + "Not on the list?" card** (Home section 09 `7:69`, Services section 08 `38:246`). The dashed card says these are only some of the industries GoodGround works with. Its CTA goes to `/start-project?ref=industry-other`. No invented industry chips.
- **Payment band** (50/50 and 12×), shared by Industry, Services and Home 07 with slightly different layouts per page.
- **Sticky mobile bar** (Industry, Website launch, Pricing): dark pill pinned 16–20px from the bottom, respects `env(safe-area-inset-bottom)`. Appears once the hero CTA scrolls out (translateY 120%→0, `motion/md`, `ease/out`). Hides while the CTA card or form is in view.
- **Bottom sheets** (Work filter `21:344`, Pricing build sheet `53:469`, Onboarding steps `60:1068`, Article TOC): same sheet behaviour. Slide up from the bottom (`motion/md`), scrim ink @40%, drag handle, close button, focus trapped, Esc and scrim tap close it, body scroll locked.

---

## 5. Motion system

The full text of the global note `12:150` is at the top of `pages/01-home.md`. Summary for building the helper:

**Tokens**

```css
:root {
  --motion-xs: 120ms;  /* press, quick colour flicks */
  --motion-sm: 200ms;  /* button/link hover, icon chips */
  --motion-md: 400ms;  /* card hover, accordion, dots */
  --motion-lg: 700ms;  /* standard reveal (FADE-UP) */
  --motion-xl: 1200ms; /* count-ups, line draws, ring/bar fills */
  --stagger: 80ms;     /* cap at 8 items */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Patterns** (named in every note)

| Pattern | Behaviour |
|---|---|
| FADE-UP | opacity 0→1, translateY 24px→0, `motion/lg`, `ease/out`. Triggers when the element's top passes 85% of the viewport (`rootMargin: "0px 0px -15% 0px"`). Plays once |
| HEADER REVEAL | tag FADE-UP at 0 → heading split into rendered lines (re-split on resize), each line in an `overflow:hidden` wrapper, inner translateY 100%→0, 800ms `ease/out`, 90ms per line → sub-copy FADE-UP at +200ms → CTA FADE-UP at +300ms |
| STAGGER GRID | children FADE-UP with `--stagger` in reading order |
| LINE MASK | one heading line from HEADER REVEAL, used for big numbers and titles |
| COUNT-UP | 0→final over `motion/xl`, `ease/out`, at 50% visible. Tabular numbers, reserved width, static prefix/suffix, `aria-label` with the final value and animated digits `aria-hidden` |
| LINKED CARD | section 4.8 |
| TEXT LINK | underline scaleX 0→1 from the left on hover, retracts to the right, `motion/sm` |

**Implementation rules**

1. Add `<script>document.documentElement.classList.add('js')</script>` inline in `<head>`. Hidden start states only apply under `.js`, so the site works with JS off.
2. One small IntersectionObserver helper for every reveal: `data-reveal="fade-up|stagger|line-mask|count-up"`, `data-delay`, `data-stagger`. Unobserve after it plays.
3. GSAP + ScrollTrigger **only** for the scroll-linked pieces: Home 05 parallax, Home 06 process line, Home 08 heading highlight, the About story-image parallax, and the Industry local-search typing demo. Load GSAP only on pages that need it.
4. Animate only `transform` and `opacity` (plus `clip-path` and `stroke-dashoffset` where a note says so). The accordion uses grid rows.
5. `prefers-reduced-motion: reduce` **or** `html[data-motion="off"]` (set by the existing hero "Pause motion" toggle, saved in localStorage, applied in the inline head script before paint): no translate, scale, parallax, scrubbing or loops. Reveals become a 150–200ms opacity fade. Counters, rings and bars show final values. The toggle must be reachable on every page (keep it where the live site has it, and make sure inner pages read the stored value).
6. Loops (gradient drift, notification stack, pulse rings) pause off-screen and when `document.hidden`.
7. Hover styles only inside `@media (hover:hover) and (pointer:fine)`.
8. Targets: CLS 0, no animation long tasks over 50ms, lazy-load every image below the hero.

---

## 6. Content, CMS and data

- **Templates driven by data:** Service detail, Industry, Case study, Article, Insights listing, Work listing, FAQ. The CMS fields for each are listed in that page's page note. Use whatever CMS/content layer the codebase already has; if it has none, use typed content files (MDX/JSON) with the same field names.
- **Site settings** (editable without a deploy): trust bar numbers, Google rating and review link, launch-offer month and spots left, reply time ("1–2 business days"), email, WhatsApp number, social links.
- **Copy rules:**
  - Reply time is "1–2 business days" everywhere. The Onboarding "Sent" screen says "within one working day" on purpose (a different promise: confirming the brief was read). Keep it, but flag it to the user.
  - Payment copy: one fixed price; 50% deposit and 50% on completion, or 12 monthly instalments.
  - Prices: write them as designed (`R12,000`, `R845`, `R3,000`) until the user picks a format (open item 4). Put the formatter in one function so it can change in one place.
  - Illustrations (phone mocks, search results, ad previews, dashboards) are always labelled as illustrations in a caption and in alt text. No invented metrics or ranking promises.
  - Never show a placeholder or fake project. Industry pages use the honesty card when no project is published.
- **Sample data in the frames** (names like "Thandi", emails like `thandi@example.co.za`, "Your Trade Co.") is illustrative. Replace it with real data or keep it only inside clearly illustrative mock-ups.
- **Images:** the frames use gradient placeholders where photos go (projects, team, studio). Ask the user for real images (open item 6). Until then keep the gradients exactly as specified, never stock photos.

---

## 7. URL map

Keep every URL that exists on the live site. Several are indexed. Any live URL that changes needs a 301 (keep a `redirects` list in the repo).

| URL | Page | Spec file |
|---|---|---|
| `/` | Home (keep the existing hero exactly as it is) | `01-home.md` |
| `/about` (+ `#our-story`) | About | `02-about.md` |
| `/services` (+ `#website-development`, `#full-service`, `#compare`) | Services | `03-services.md` |
| `/services/seo`, `/services/website-redesign`, `/services/ux-design`, `/services/google-ads`, `/services/meta-ads` | Service detail template | `04-service-detail.md` |
| `/services/trades-and-home-services`, `/services/health-and-wellness`, `/services/hospitality-and-food`, `/services/retail-and-small-brands`, `/services/professional-and-consulting`, `/services/non-profits-and-community` | Industry template | `05-industry.md` |
| `/work` | Work listing | `06-work.md` |
| `/work/{slug}` | Case study. Project cards open this page, not the live site | `07-case-study.md` |
| `/pricing` | Pricing + build-your-own | `08-pricing.md` |
| `/website-launch` | Launch offer (incl. sold-out state) | `09-website-launch.md` |
| `/process` | **New.** How we work | `10-process.md` |
| `/insights` | Insights listing | `11-insights.md` |
| `/insights/{slug}` | Article | `12-article.md` |
| `/start-project` | Multi-step project enquiry | `13-start-project.md` |
| `/contact` | General contact (its own page; the old redirect is cancelled) | `14-contact.md` |
| `/faq` | FAQ with search | `15-faq.md` |
| `/legal` (`#notice`, `#privacy`, `#terms`) | Legal | `16-legal.md` |
| `/onboarding` | **New**, private (link sent to clients who accepted a quote), noindex | `17-onboarding.md` |
| `/thanks?form=start-project\|contact\|onboarding` | **New.** No-JS fallback + conversion URL, noindex | `18-utility.md` |
| any unknown path | 404, real HTTP 404 status, noindex | `18-utility.md` |

Note: the Figma page is called "Projects" but the URL is `/work`.

**Query parameters** (full spec in the Start project page note):

| Param | Values | Effect |
|---|---|---|
| `plan` | `launch` | Preselects the launch offer on /start-project |
| `package` | `micro`, `launch`, `grow`, `scale` | Preselects the package |
| `service` | `full-service` | Preselects Full service (from /pricing) |
| `intent` | `quote`, `seo-audit` (+ any `addOn.ctaIntent` value) | Sets the enquiry type |
| `ref` | `industry-{slug}`, `industry-other` (industry left empty), `service-{slug}`, `services`, `services-consult`, `case-{slug}`, `about`, `work`, `insights`, `pricing`, `404` | Records the source; `industry-*` also preselects the industry on step 1 |
| `topic` | `work-in-progress`, … (Contact topics) | Preselects the Contact topic |
| `form` | on /thanks only | Picks the copy variant |

Whitelist every value server-side. Unknown values are ignored. **Never put personal data in a URL.**

---

## 8. SEO, structured data, analytics, accessibility

- **SEO titles and meta descriptions:** keep the live ones for every existing URL. New pages get new ones (ask the user to confirm).
- **Structured data** (JSON-LD, generated from the same data the page renders):
  - Organization + LocalBusiness on Home (George, Garden Route; areaServed South Africa).
  - Service on every service and industry page (`offers.price` only where a "from" price exists).
  - FAQPage wherever an accordion of questions is shown.
  - BreadcrumbList on every page below Home.
  - Article on articles; CreativeWork on case studies.
- **Sitemap:** include all public pages; exclude `/thanks`, `/onboarding`, 404.
- **Analytics events:** each page note lists its events (e.g. `industry_cta_click`, `faq_open`, `service_card_click`, `page_not_found`). Implement exactly those names and properties through one `track(event, props)` helper using whatever analytics the site already runs. No personal data in event properties.
- **Accessibility:** WCAG 2.2 AA. One H1 per page (the Oswald display line). Visible focus on everything. Logical focus order. Form errors announced (`aria-live`/`aria-describedby`). Accordions, tabs, sheets and the multi-step forms follow the ARIA patterns. Check contrast for muted text on tinted cards and onDarkMuted on plum (both pass at the sizes used; keep sizes at or above the spec).

---

## 9. Confirmed decisions

1. Home hero banner stays exactly as it is live (gradient, header, menu, headline animation, Pause motion).
2. Launch offer sold out: full meter, buttons become "Join the {Next month} waitlist", "NEXT OPENING · {Month}" / "{MONTH} IS FULLY BOOKED" states, submissions tagged `plan=launch-waitlist`.
3. Project cards open `/work/{slug}`.
4. FAQ: one answer open at a time, everywhere.
5. Motion build: CSS + one IntersectionObserver helper; GSAP only for scroll-linked pieces.
6. `/contact` is its own page. Project enquiries go to `/start-project`.
7. Auto-reply email to the visitor after every successful enquiry (spec in the Start project page note).
8. Reply time "1–2 business days" everywhere.
9. Payment: one fixed price, 50/50 or 12 monthly instalments.
10. Industry pages: honesty card when an industry has no published project. Never fake projects.
11. Industry lists always say they are only some of the industries ("Not on the list?" card).
12. Illustrations are labelled as illustrations; no invented metrics.
13. Website development and Full service live on `/services` (anchors), not separate pages.
14. Industry pages stay at `/services/{industry-slug}` (their live URLs).
15. `/thanks` is the no-JS fallback; inline success states stay the main experience.

---

## 10. Open items (need the user's answer; do not invent)

1. **POPIA Information Officer** name and contact for the privacy policy.
2. **Third-party providers list** for the privacy policy (only Google is listed live).
3. **Terms & Conditions wording** from an attorney. The design is a draft structure.
4. **Number format:** `R12,000` (as designed) or `R12 000`.
5. **WhatsApp number** (contact page, industry mock-ups).
6. **Real photos:** team, studio, projects.
7. **FAQ answer 06:** "4–6 weeks" conflicts with the package timelines.
8. **Onboarding:** storage region and retention for uploads; whether "Online shop" and "Client login area" stay; who receives the "brief received" email.
9. **New copy to confirm:** Process page; Contact topics; About "On the web" lines; Services comparison "Ask us" cells; illustrative ad report numbers; hero visuals for Website redesign, UX & design, Google Ads and Meta Ads (described, not drawn).
10. **Redirects list** for any live URL that changes.
11. **FAQ answers 02–13** on the FAQ page, SEO FAQ 02–05 and Trades FAQ 02–04 are not written out in Figma. Take them from the live site.
12. **Start project step 2** and the **Legal notice tab** are not drawn. Build them in the same style from the notes and show them for sign-off.

When the build reaches one of these, stop and ask, or use the live content and flag it in the PR.

---

## 11. Build order

1. **Foundations:** tokens as CSS variables, fonts, base styles and type classes, the `js` / `data-motion` head script, the reveal helper, Button, Tag, Icon set, Linked card, Section header, Site header (+ live menu restyled), Footer, Gradient CTA, FAQ accordion, Article cover, bottom sheet. Build a private `/_styleguide` route showing every component and state next to its Figma screenshot. **Stop for review.**
2. **Home** (hero untouched).
3. **Services**, then **Service detail** (SEO first, then the other four), then **Industry** (Trades first, then the other five).
4. **Work listing** + **Case study**.
5. **Pricing** (configurator) + **Website launch**.
6. **Start project** (multi-step, query params, auto-reply, success/failure states) + **Contact** + **/thanks**.
7. **About** + **Process**.
8. **Insights** + **Article**.
9. **FAQ** (search) + **Legal** + **404**.
10. **Client onboarding** (largest; needs open item 8 first).
11. **QA** (section 12).

Review each page with the user before starting the next. Nothing goes live until the whole site is signed off.

---

## 12. 1:1 QA checklist (per page)

1. Open the desktop and mobile frames with `get_screenshot` and compare with the built page at exactly 1440×900 and 390×844 (browser devtools or Playwright screenshots). Overlay or side-by-side; differences above 2px in spacing, any wrong colour, font, weight or line break are bugs.
2. Check every text string against the spec (no paraphrasing).
3. Check every link target against the page note and section 7.
4. Play every motion described in the notes; then repeat with `prefers-reduced-motion` and with Pause motion on.
5. JavaScript off: everything visible and usable; forms post to the server and land on `/thanks`.
6. Keyboard only: focus order, visible focus, accordions, sheets, steppers, configurator.
7. Tablet 768 and 1024: no overflow, grids at 2 columns.
8. Lighthouse mobile: Performance ≥ 90, Accessibility 100, SEO 100, CLS 0.
9. Structured data validates (Rich Results Test). Analytics events fire with the right properties.
10. 404 returns HTTP 404. `/thanks` and `/onboarding` are noindex.

---

## 13. Frame index (Figma node IDs)

| Page | Figma page | Desktop | Mobile | Extra states / boards |
|---|---|---|---|---|
| Home | `0:1` | `2:50` | `9:84` | Components `2:17`, global motion note `12:150` |
| About | `31:150` | `31:151` | `32:176` | |
| Services | `35:150` | `35:151` | `39:229` | |
| Service detail (SEO) | `95:158` | `95:159` | `98:201` | |
| Industry (Trades) | `86:150` | `86:151` | `90:198` | Page note `91:326` |
| Work listing | `20:150` | `20:151` | `21:169` | Filter sheet `21:344` |
| Case study (B3TTER) | `15:150` | `15:151` | `18:171` | |
| Pricing | `50:150` | `50:151` | `53:206` | Build sheet `53:469` |
| Website launch | `74:150` | `74:151` | `77:215` | Sold out `77:407` |
| Process | `80:150` | `80:151` | `84:186` | |
| Insights | `41:150` | `41:178` | `42:212` | Cover set `41:177` |
| Article | `44:150` | `44:151` | `47:198` | |
| Start project | `24:150` | `24:151` | `26:171`, `26:248`, `26:323` | `?plan=launch` `25:151`, `?intent=quote` `25:242`, validation `25:302`, sent `25:387`, failed `25:428` |
| Contact | `29:150` | `29:151` | `30:172` | Sent `29:352`, validation `29:365`, email copied `29:376` |
| FAQ | `67:150` | `67:151` | `68:167` | Search results `67:400` |
| Legal | `69:150` | Privacy `69:151`, Terms `71:163` | `72:190` | |
| Onboarding | `56:150` | Welcome `57:150`; steps 1–12: `57:342`, `64:892`, `64:1208`, `58:345`, `64:1491`, `65:1396`, `58:689`, `65:1672`, `65:2157`, `66:2000`, `66:2282`, `66:2547`; Review `59:684`; Sent `59:975` | `60:757`, `60:823`, `60:950` | Steps sheet `60:1068`, form components `56:151` |
| Thank you | `100:158` | `100:159` | `100:227` | |
| 404 | `100:158` | `100:290` | `100:338` | |

**Using the Figma MCP during the build:** for any section, call `get_design_context` (fileKey `PI4P3fF9RVIAiTI7ZMxohj`, nodeId from this table or from the node IDs in the page files) for exact values and `get_screenshot` for a visual check. Treat generated code as a reference only; build with the project's own components and tokens.

---

## 14. Starting prompt for the VS Code session

> Read `docs/redesign/README.md` in full, then skim the page files in `docs/redesign/pages/`. The redesign is fully designed in Figma (file `PI4P3fF9RVIAiTI7ZMxohj`); these files are the written spec of every frame and note, and the goal is a 1:1 match on desktop (1440) and mobile (390).
>
> Before writing code: look at how this codebase is structured (framework, styling, content, forms, analytics) and write a short plan for how the tokens, components, motion helper and page templates fit into it. Then build **step 1 of the build order only** (foundations + a `/_styleguide` route), compare each component against its Figma node with `get_screenshot`, and stop for my review. Keep every existing live URL working. Where the spec lists an open item or something "not drawn", ask me instead of inventing it.


---

# Home

| | |
|---|---|
| **URL** | `/` |
| **Figma page** | `0:1` |
| **Desktop frame (1440)** | 2:50 |
| **Mobile frame (390)** | 9:84 |
| **Extra states / boards** | Components board 2:17 · global motion note 12:150 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- The hero (section 00) is the existing live hero. Do not rebuild or restyle it. Only hook "Pause motion" into html[data-motion="off"] and "Scroll to explore" into #trust.
- The note "MOTION & INTERACTION · READ FIRST" (12:150) at the top of this file is the global motion system for the whole site.
- Section 09 industries: the dashed "Not on the list?" card is part of the design. Its CTA goes to /start-project?ref=industry-other.
- Service links: Website development → /services#website-development, Full service → /services#full-service, SEO → /services/seo, Google Ads → /services/google-ads, Meta Ads → /services/meta-ads, UX & design → /services/ux-design.
- FAQ (section 10): one open at a time. Answers not written in Figma come from the live site.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · 00 Motion & interaction system — node 12:150
MOTION & INTERACTION · READ FIRST
Global motion system (applies to every section, desktop + mobile)
CONFIRMED BY GOODGROUND · 26 OCT 2026
•  Launch offer sold-out state: full bar, “Join the waitlist” button, “NEXT OPENING · {Next month}” tag (see 03).
•  Page URLs as written in the notes: /website-launch, /services/…, /services/…, /work, /about#our-story.
•  Project cards open their case study page (/work/{slug}), not the live site (see 05).
•  FAQ: only one answer open at a time (see 10).
•  Build: CSS + a small IntersectionObserver script for most motion; GSAP + ScrollTrigger only for the three scroll-linked pieces (05 parallax, 06 process line, 08 heading highlight).
•  Project enquiries → /start-project. /contact is its own page (general questions, existing clients, direct channels); the earlier redirect is cancelled. See the “Contact” page.
•  Auto-reply email to the visitor after every successful enquiry (spec in the /start-project page note).
PRINCIPLES
•  Motion explains, never decorates: every animation reveals hierarchy, shows a state change or confirms an action.
•  Animate only transform and opacity (plus clip-path / stroke-dashoffset where a note says so). Never animate width, height, top or left, except the FAQ accordion (grid-rows technique).
•  Every entrance plays once per page load. Nothing re-animates when scrolling back up (except scroll-scrubbed pieces in 06 and 08, which follow the scrollbar).
•  Everything must be fully visible and usable with JavaScript off: hidden start states only apply when <html> has class "js" (set it inline in <head>).
TIMING TOKENS
•  motion/xs = 120ms: press states, quick colour flicks
•  motion/sm = 200ms: button and link hovers, icon chips
•  motion/md = 400ms: card hovers, accordion, carousel dots
•  motion/lg = 700ms: standard reveal (FADE-UP)
•  motion/xl = 1200ms: count-ups, line draws, ring and bar fills
•  stagger/default = 80ms between siblings. Cap any stagger at 8 items (item 9+ uses item 8’s delay).
EASING TOKENS
•  ease/out = cubic-bezier(0.16, 1, 0.3, 1): all entrances and hover-in
•  ease/in-out = cubic-bezier(0.65, 0, 0.35, 1): toggles (accordion, dots, colour swaps)
•  ease/back = cubic-bezier(0.34, 1.56, 0.64, 1): small “pop” moments only (ticks, #1 tag, bars)
•  linear: scroll-scrubbed animations only
REVEAL PATTERNS (REFERENCED BY NAME IN EVERY SECTION NOTE)
•  FADE-UP: opacity 0→1 + translateY 24px→0, motion/lg, ease/out. Trigger when the element’s top passes 85% of the viewport height (IntersectionObserver, rootMargin "0px 0px -15% 0px", threshold 0). Plays once.
•  HEADER REVEAL (every “Section header”): tag FADE-UP at 0ms → heading split into rendered lines (re-split on resize), each line inside an overflow:hidden wrapper, inner line translateY 100%→0, 800ms ease/out, 90ms per line → sub-copy FADE-UP at +200ms → CTA FADE-UP at +300ms.
•  STAGGER GRID: children FADE-UP with stagger/default in reading order (left→right, then top→bottom).
•  LINE MASK: same as a single heading line in HEADER REVEAL (used for big numbers and titles).
•  COUNT-UP: number animates 0→final over motion/xl, ease/out, when 50% visible. Use font-variant-numeric: tabular-nums and reserve the final width (min-width in ch) so nothing shifts. Prefix/suffix (R, +, %) stay static. Screen readers get the final value (aria-label), animated digits are aria-hidden.
SHARED COMPONENT STATES
•  BUTTON (all styles) hover: background shifts (Primary #111111→#2B2B2B, Coral #EF4A23→#D93C17, Light #FFFFFF→#F1EEE8, Outline gains a 4% ink fill). Arrow icon slides out to the top-right while a copy slides in from the bottom-left (chip has overflow hidden); chip scales 1→1.08. motion/sm, ease/out.
•  BUTTON pressed: scale 0.97, motion/xs. Focus-visible: 2px coral outline, 3px offset, never animated.
•  LINKED CARD (any card with an arrow chip): the whole card is one <a> (no nested links). Hover: translateY -4px, shadow 0 24px 48px rgba(46,24,72,0.10), border line→ink at 12%, arrow chip rotates 45° and turns ink with a white icon. motion/md, ease/out. Pressed: scale 0.99.
•  TEXT LINK (footer, inline): underline draws left→right (scaleX 0→1, origin left) on hover, retracts to the right on leave. motion/sm.
•  TAGS are static and never animate on their own.
•  Hover styles only inside @media (hover: hover) and (pointer: fine). Touch devices get pressed states only.
REDUCED MOTION, “PAUSE MOTION” & PERFORMANCE
•  prefers-reduced-motion: reduce OR the hero’s existing “Pause motion” toggle (which must set html[data-motion="off"] and remember it in localStorage) → no translate, scale, parallax, scroll-scrubbing or loops. Reveals become a 150ms opacity fade. Count-ups, rings and bars show final values instantly. Carousel nudge and gradient drift are disabled.
•  Loops (notification stack, gradient drift, pulse ring, CTA gradient) pause when off-screen (IntersectionObserver) and when the tab is hidden (visibilitychange).
•  Touch targets ≥ 44×44px. Keyboard focus order follows visual order. Visible focus on every interactive element.
•  Suggested build: CSS transitions + one small IntersectionObserver helper for all reveals. GSAP + ScrollTrigger only for the scroll-scrubbed pieces (06 Process line, 08 heading highlight, 05 parallax). Lazy-load every image below the hero. Targets: CLS 0, no long tasks > 50ms caused by animation code.
BREAKPOINTS
•  Mobile < 768px → the 390 mobile frame. Tablet 768–1199px → desktop layout with 2-column grids and 40px side gutters. Desktop ≥ 1200px → the 1440 frame, 1200px content width, 120px gutters.
•  Each section note below ends with a “Mobile” block describing what changes on phones.

### Notes pointer · desktop — node 13:246
MOTION & INTERACTION NOTES
Each section of the desktop design has a note in this column, aligned with it. Read the global system note (far left) first: section notes refer to its patterns by name (FADE-UP, HEADER REVEAL, STAGGER GRID, LINE MASK, COUNT-UP, LINKED CARD).

### Notes · 00 Hero — node 12:175
MOTION & INTERACTION
00 · Hero (existing, unchanged)
UNCHANGED
•  Keep the current hero exactly as it is: the animated gradient, header and menu behaviour, headline animation and the “Pause motion” control.
HOOKS INTO THE NEW PAGE
•  “Scroll to explore” smooth-scrolls to #trust (scroll-behavior: smooth; instant jump when motion is off).
•  “Pause motion” must also set html[data-motion="off"] so every new section obeys it (see the global system note).
•  The Trust bar (01) starts its reveal 300ms after the hero intro finishes, so the two never compete.

### Notes · 01 Trust bar — node 12:185
MOTION & INTERACTION
01 · Trust bar
ENTRANCE
•  Card FADE-UP. If it is inside the first viewport, delay it until 300ms after the hero intro; otherwise trigger on scroll.
•  Stars fill one by one: each star scale 0.6→1 + opacity 0→1, 60ms stagger, ease/back.
•  Dividers draw scaleY 0→1 (origin centre), motion/md, once the card has landed.
•  Each stat runs COUNT-UP (20+, 10+, 100%, 12), all starting together with a 100ms left→right stagger.
INTERACTION
•  The “5.0 on Google” group is one link to the Google reviews page (new tab, rel="noopener"). Hover underlines “5.0 on Google” (TEXT LINK).
•  Stats are not interactive.
CONTENT
•  All four numbers and labels come from CMS / site settings so they can change without a deploy.
MOBILE
•  Rating on top, stats in a 2×2 grid. COUNT-UP triggers at 30% visible.

### Notes · 02 Why GoodGround — node 12:201
MOTION & INTERACTION
02 · Why GoodGround (intro bento)
ENTRANCE
•  HEADER REVEAL, then the three cards as a STAGGER GRID with a 120ms stagger.
CARD 1 · BUILT TO BE FOUND (SEARCH MOCK)
•  When the card is 40% visible, the search text types in at 35ms per character with a 1px blinking caret (1s cycle). The caret disappears 600ms after typing ends.
•  Results appear one by one: FADE-UP with an 8px offset, 120ms stagger.
•  The #1 result’s blush background wipes in left→right (clip-path inset(0 100% 0 0) → inset(0)), motion/md, then the “#1” tag pops (scale 0.6→1, ease/back).
CARD 2 · DESIGNED AROUND THE DECISION (NOTIFICATIONS)
•  Notifications drop in from above (translateY -12px→0 + opacity), 150ms stagger.
•  Loop: every 5s a new notification slides in at the top (cycle through about 6 realistic examples), the others shift down one slot (motion/md, ease/in-out) and the bottom one fades out and is removed. Max 3 visible; the 3rd sits at 60% opacity.
•  The loop pauses off-screen, while hovered (so it can be read) and when motion is off (static 3 items).
CARD 3 · AI-ACCELERATED (SCORE)
•  The ring draws 0→98% via stroke-dashoffset, motion/xl, ease/out, while the number counts 0→98 in sync.
•  The three bars fill width 0→value over 900ms with a 100ms stagger, starting 200ms after the ring.
INTERACTION & ACCESSIBILITY
•  These cards are informational: no link and no hover lift (keeps hover meaningful elsewhere).
•  Mock UIs are decorative (aria-hidden="true"); each card’s heading and description carry the meaning.
MOBILE
•  Cards stack. Each card’s mock animation triggers on its own when that card is 40% visible.

### Notes · 03 Launch offer — node 12:223
MOTION & INTERACTION
03 · Launch offer (pricing card)
ENTRANCE
•  Left column: HEADER REVEAL (tag, heading lines, copy, buttons).
•  Pricing card: FADE-UP + scale 0.96→1, 800ms, ease/out, starting 150ms after the heading.
•  “R845” uses LINE MASK, never a count-up (a price should never flash other numbers).
•  Checklist: each check chip pops (scale 0→1, ease/back), then its text fades in, 70ms stagger.
•  Availability bar fills 0→(taken ÷ total) over 1000ms, ease/out, after the checklist. The “x of y spots left” label fades in at the end.
AMBIENT
•  A soft coral radial glow (600px, 20% opacity, 120px blur) behind the pricing card drifts in a slow 14s alternate loop (±40px). Off when motion is off.
INTERACTION & DATA
•  “See the offer” → /website-launch. “How it works” → that page’s #how-it-works (until it exists: smooth-scroll to #pay on this page). “Claim a launch spot” → /start-project?plan=launch preselected.
•  Availability is data-driven: month = current month; spotsTotal (2) and spotsTaken come from the CMS.
•  Sold out (0 left): bar full in ink, label “Fully booked for {Month}”, button becomes “Join the waitlist” (→ ?plan=launch-waitlist), tag becomes “NEXT OPENING · {Next month}”.
•  Desktop: the pricing card lifts -4px on hover with a deeper shadow. Only the button is a link.
MOBILE
•  Card full width. Bar animation starts at 40% visible. “See the offer” sits below the card as a full-width button.

### Notes · 04 What we build — node 12:239
MOTION & INTERACTION
04 · What we build (services bento)
ENTRANCE
•  HEADER REVEAL → flagship and Full Service cards FADE-UP 100ms apart → the four small cards as a STAGGER GRID.
FLAGSHIP · WEBSITE DEVELOPMENT
•  On enter, the browser mock rises from translateY 40px with a 2° X-rotation that flattens to 0 (perspective 1200px), 900ms, ease/out.
•  The three benefit chips inside the mock slide in from the right (12px), 100ms stagger.
•  Whole card links to /services#website-development. LINKED CARD hover, plus the mock lifts an extra -6px and its gradient background-position shifts 20% (motion/lg) so the “site” feels alive.
FULL SERVICE
•  Statement rows tick in: each check icon draws (stroke-dashoffset) over 300ms, 80ms stagger, and its row text fades in with it.
•  Links to /services#full-service. LINKED CARD hover.
SMALL CARDS (UX, SEO, GOOGLE ADS, META ADS)
•  LINKED CARD hover + icon chip colour swap (lilac bg / plum icon → plum bg / white icon), motion/sm, ease/in-out.
•  Links: /services/ux-design, /services/seo, /services/google-ads, /services/meta-ads.
MOBILE
•  Same order. Small cards in a 2×2 grid with equal-height rows. Pressed state (scale 0.98) replaces hover.

### Notes · 05 Work — node 12:258
MOTION & INTERACTION
05 · Work (project showcase)
ENTRANCE
•  HEADER REVEAL (light-on-dark variant).
•  Featured image: clip-path inset(12% round 20px) → inset(0 round 20px) while the inner image scales 1.12→1, 1100ms, ease/out.
•  “B3TTER” LINE MASK → description and benefit ticks FADE-UP with an 80ms stagger → button last.
•  Project cards: STAGGER GRID 100ms, with the same clip-path reveal at a smaller inset (8%).
SCROLL (DESKTOP ONLY)
•  Featured image parallax: the image moves translateY -40px → +40px while the card crosses the viewport (scrubbed, linear). The container clips it.
INTERACTION
•  The featured card and each project card link to that project’s case study page at /work/{slug} (b3tter-bottle, point-break-surf, goodground-site, sunbird-early-learners — the slugs already live on goodground.co.za). Same tab. The case study template is on the “Case study template” page.
•  The case study page carries the “Visit live site” link (new tab, rel="noopener", with visually hidden “(opens in new tab)” text).
•  Each card is one <a> (LINKED CARD). Hover: image scale 1.04 (motion/lg), title underline draws, arrow chip rotates 45°.
•  “View all work” → /work. “Start your project” in the bottom bar → /start-project.
•  Images: real 16:10 screenshots as WebP/AVIF, lazy-loaded with width/height set, blurred placeholder that fades out over 300ms.
MOBILE (CAROUSEL)
•  Container: overflow-x auto, scroll-snap-type x mandatory; cards 270px wide, scroll-snap-align start, scroll-padding-left 20px, gap 12px, scrollbar hidden, native momentum. The next card always peeks in.
•  Dots: the active dot is whichever card is ≥ 60% visible (IntersectionObserver on the cards). Active = 24px coral, inactive = 8px white at 25%; width and colour transition motion/md, ease/in-out. Tapping a dot smooth-scrolls to its card.
•  The first time the carousel is 50% visible, it nudges once (scrolls 32px left and back, 700ms total) to hint at swiping. Never repeats; skipped when motion is off.
•  No autoplay. No parallax on mobile.

### Notes · 06 How we work — node 13:150
MOTION & INTERACTION
06 · How we work (process stepper)
ENTRANCE
•  HEADER REVEAL first.
SCROLL-LINKED PROGRESS (DESKTOP)
•  The line between the step dots is a grey track with an ink progress line on top (scaleX 0→1, origin left), scrubbed to scroll: it starts when the stepper’s top reaches 75% of the viewport and completes when it reaches 35%.
•  Each dot starts outlined (1.5px ink border, no fill, ink number). When the progress line reaches it, it fills ink with a white number (motion/sm) and its card FADE-UPs at that moment.
•  Step 06 “Beyond launch” fills coral instead and starts a soft pulse ring (scale 1→1.7, opacity 0.35→0, 1.8s, infinite; stops off-screen).
•  Scrolling back up reverses the line and the dot fills (scrubbed), but cards stay visible once shown.
•  No JS or motion off: everything shown in its final, filled state.
INTERACTION
•  Step cards are not interactive. “Start your project” → /start-project.
MOBILE (VERTICAL TIMELINE)
•  Same logic on the vertical rail: ink progress line scaleY 0→1 (origin top), scrubbed between rail top at 80% and rail bottom at 50% of the viewport. Dots fill as they are reached and each step’s text FADE-UPs as its dot fills.

### Notes · 07 Pay your way — node 13:166
MOTION & INTERACTION
07 · Pay your way (payment options)
ENTRANCE
•  HEADER REVEAL, then the two option cards FADE-UP 120ms apart.
OPTION 1 · 50 / 50
•  “50 / 50” uses LINE MASK.
•  The deposit block’s ink fill wipes in left→right (clip-path), motion/md; then the “On completion” block’s border draws in, motion/md. Each label fades in after its block.
OPTION 2 · 12 × MONTHLY
•  The 12 bars grow from 0 to full height (scaleY, origin bottom), 40ms stagger, ease/back. Bar 1 is coral; its legend label fades in last.
•  Desktop hover on a bar: it brightens to 30% white and a tooltip rises 4px + fades in above it (motion/sm): “Instalment 1 · secures your booking” or “Instalment n · after completion”.
•  Bars are aria-hidden; the legend text carries the meaning.
CARDS, QUOTE & CTA
•  Desktop: both option cards lift -4px on hover. They are not links.
•  Proof quote: FADE-UP; the heart icon does one heartbeat (scale 1→1.18→1, 500ms) as it lands. “Google review” links to the review (new tab).
•  “Get a fixed quote” → /start-project?intent=quote.
MOBILE
•  Cards stack. Bar tooltips are disabled (the legend covers it).

### Notes · 08 Our story & reasons — node 13:185
MOTION & INTERACTION
08 · Our story & reasons
DESKTOP
•  The left column is position: sticky (top: 120px) while the reason grid scrolls past; it releases when the grid ends.
•  Heading word-by-word highlight: words start at 25% opacity and reach 100% one after another as the section scrolls from 70% to 40% of the viewport (scrubbed, linear). Motion off: full opacity.
•  Body copy and button FADE-UP after the heading.
•  Reason cards: STAGGER GRID 70ms. Hover: icon chip rotates -8° and swaps to plum bg / white icon (motion/sm). No link, no lift.
•  “Read the full story” → /about#our-story.
MOBILE
•  No sticky column and no scrubbed highlight (the heading uses HEADER REVEAL).
•  Reason rows FADE-UP with a 60ms stagger; each divider draws scaleX 0→1 with its row.

### Notes · 09 Who we build for — node 13:195
MOTION & INTERACTION
09 · Who we build for (industries)
ENTRANCE
•  HEADER REVEAL, then the six cards as a STAGGER GRID with a 60ms stagger, row by row.
INTERACTION
•  Each card links to /services/{industry-slug}: trades-and-home-services, health-and-wellness, hospitality-and-food, retail-and-small-brands, professional-and-consulting, non-profits-and-community (live URLs, see Industry template page).
•  Hover: card background white→blush, icon chip blush→coral with a white icon, arrow chip moves +3px x / -3px y and rotates 45°. motion/md, ease/out. Focus-visible matches hover, plus the focus outline.
•  "Not on the list?" card (dashed border, after the grid): makes clear these six are only some of the industries we work with. Button "Tell us about your business" → /start-project?ref=industry-other (start-project leaves the industry field empty for this ref). Motion: FADE-UP after the grid STAGGER finishes; the + icon rotates 90° on card hover (motion/sm, ease/back). Mobile: stacked, full-width button.
MOBILE
•  Full-width rows. Pressed state: background blush (motion/xs) and the chevron nudges 3px right.

### Notes · 10 FAQ — node 13:208
MOTION & INTERACTION
10 · FAQ (accordion)
ACCORDION BEHAVIOUR
•  One item open at a time. The first item (“How do the two payment options work?”) is open on load.
•  The whole question row is the <button> (aria-expanded, aria-controls). The answer panel has role="region" and aria-labelledby pointing at its button.
•  Keyboard: Enter/Space toggle; Up/Down move focus between questions; Home/End jump to first/last.
•  Open: the panel uses display:grid with grid-template-rows 0fr→1fr, motion/md, ease/in-out; answer text fades 0→1 starting 100ms in. Close is the reverse (text fades first, then the height collapses).
•  The item restyles in the same transition: background surface→canvas, border fades out, icon chip canvas→ink, and the “+” rotates 90° while its vertical stroke scales to 0 so it becomes “−”.
•  If the opened question would sit above the viewport, scroll it into view (smooth, 120px offset).
•  Deep links: /#faq-{slug} opens that item and scrolls to it.
ENTRANCE
•  Left column HEADER REVEAL; accordion items STAGGER GRID with a 50ms stagger.
SEO & CONTACT CARD
•  Output FAQPage JSON-LD from the same CMS entries. Closed answers stay in the DOM (hidden by the grid technique, not display:none).
•  Contact card: the email is a mailto link; “All questions” → /faq. LINKED CARD hover.
MOBILE
•  Same behaviour. Each question row is at least 56px tall; the contact card sits below the list.

### Notes · 11 Final CTA + footer — node 13:224
MOTION & INTERACTION
11 · Final CTA + footer
GRADIENT CARD
•  Uses the same animated gradient as the hero (reuse the hero’s gradient code so they match exactly), running 1.5× slower. Paused when motion is off or off-screen.
•  Desktop only: a cursor-follow light, a 480px peach radial highlight at 25% opacity, follows the pointer inside the card with smoothing (lerp 0.08 per frame) and fades out over motion/lg on pointer leave.
ENTRANCE
•  Card FADE-UP + scale 0.98→1 (motion/lg). Tag → “GROWTH / STARTS HERE.” LINE MASK at 120ms per line, 900ms, ease/out → copy and buttons FADE-UP.
INTERACTION
•  “Start your project” → /start-project. The email button → mailto:hello@goodground.co.za.
FOOTER
•  Links use the TEXT LINK underline. Columns FADE-UP with a 60ms stagger when the footer enters.
•  The “goodground” logo smooth-scrolls to the top.
MOBILE
•  No cursor light; the gradient keeps running (paused when motion is off). Both buttons full width; footer stays 3 columns.

### Notes pointer · mobile — node 13:243
MOTION & INTERACTION NOTES
Mobile behaviour is specified in the “Mobile” block of each section note, in the notes column to the left of the desktop design. Start with the global system note.

## Layer-by-layer spec

### GoodGround Homepage — Concept v1 — node 2:50 (1440×11303)
- **GoodGround Homepage — Concept v1** (col, 1440×11303, bg canvas)
  - **00 · Hero (EXISTING — keep as-is)** (col, pad 28/40/28/40, 1440×784, w:fill, bg #3A1A44)
    - **Nav** (row, align space_between/center, 1360×54, w:fill)
      - **Frame** (row gap 12, pad 10/22/10/22, align center, 181×54, bg #1A0D14 @55%, r 999)
        - T "goodground" — IBM Plex Sans SemiBold 26 ls -3%, surface
      - **Frame** (row gap 12, pad 8/20/8/20, align center, 183×52, bg #1A0D14 @55%, r 999)
        - T "WEB DEVELOPMENT STUDIO ⏎ SOUTH AFRICA" — Oswald Medium 12 ls 6%, surface center
      - **Frame** (row gap 12, pad 12/20/12/20, align center, 102×48, bg #1A0D14 @55%, r 999)
        - T "MENU  ☰" — Oswald SemiBold 16 ls 2%, surface
    - **spacer** (free layout, 1360×267, w:fill, h:fill, grow)
    - **Hero content** (row, align space_between/max, 1360×349, w:fill)
      - **Frame** (col gap 24, 814×349)
        - T "ONE TEAM. ONE CONNECTED PROCESS." — Oswald Medium 13 ls 6%, surface
        - T "WE BUILD WEBSITES ⏎ THAT BRING IN ⏎ BUSINESS." — Oswald Medium 104/98%, surface
      - **Frame** (col gap 24, 380×154)
        - T "Custom-coded business websites for South African businesses that need to be found, and need to convert." — IBM Plex Sans Regular 17/150%, surface
        - ⧉ Button Style=Light "START YOUR PROJECT" (380×52, w:fill)
    - **Hero footer** (row, pad 40/0/0/0, align space_between, 1360×58, w:fill)
      - T "↓  SCROLL TO EXPLORE" — Oswald Medium 12 ls 6%, surface
      - T "INSTAGRAM   /   FACEBOOK   ·   PAUSE MOTION" — Oswald Medium 12 ls 6%, surface
    - **Note** (col, pad 12/16/12/16, 332×96, bg coral, r 12, at 1068,120)
      - T "HERO — UNCHANGED ⏎ Recreated here only as a reference so the new sections can be judged against it. The live animated hero stays exactly as it is." — IBM Plex Sans Medium 13/140%, surface
  - **01 · Trust bar** (col gap 56, pad 40/120/0/120, 1440×143, w:fill, bg canvas)
    - **Trust bar** (row, pad 24/32/24/32, align space_between/center, 1200×103, w:fill, bg surface, r 24, border line 1)
      - **Frame** (row gap 12, align center, 271×40)
        - **Frame** (row gap 2, 98×18)
          - icon star 18px
          - icon star 18px
          - icon star 18px
          - icon star 18px
          - icon star 18px
        - **Frame** (col gap 2, 161×40)
          - T "5.0 on Google" — IBM Plex Sans SemiBold 16, ink
          - T "From verified client reviews" — IBM Plex Sans Regular 13, muted
      - rectangle 1×40 line
      - **Frame** (row gap 12, align center, 175×53)
        - T "20+" — Oswald Medium 36, ink
        - T "years combined experience" — IBM Plex Sans Regular 14/130%, muted
      - rectangle 1×40 line
      - **Frame** (row gap 12, align center, 171×53)
        - T "10+" — Oswald Medium 36, ink
        - T "live, testable projects" — IBM Plex Sans Regular 14/130%, muted
      - rectangle 1×40 line
      - **Frame** (row gap 12, align center, 209×53)
        - T "100%" — Oswald Medium 36, ink
        - T "satisfied clients" — IBM Plex Sans Regular 14/130%, muted
      - rectangle 1×40 line
      - **Frame** (row gap 12, align center, 154×53)
        - T "12" — Oswald Medium 36, ink
        - T "month payment option" — IBM Plex Sans Regular 14/130%, muted
  - **02 · Why GoodGround (intro bento)** (col gap 56, pad 120, 1440×1005, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×229, w:fill)
      - **Frame** (col gap 20, 700×229)
        - ⧉ Tag Tone=Neutral "01 / GOODGROUND" (125×32)
        - T "Growth doesn’t start with marketing. It starts with the ground underneath it." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - **Frame** (col gap 24, 400×156)
        - T "We build AI-accelerated, search-first websites and digital systems that help South African businesses get found, get trusted and get enquiries." — IBM Plex Sans Regular 17/155%, muted
        - ⧉ Button Style=Outline "About us" (148×54)
    - **Bento** (row gap 24, 1200×480, w:fill)
      - **Card · Built to be found** (col gap 16, pad 32, align space_between, 384×480, w:fill, grow, bg lilac, r 28)
        - **Mock · search** (col gap 12, pad 16, 320×320, w:fill, bg surface, r 20, shadow 0 12 32 #2E1747@10%)
          - **Frame** (row gap 10, pad 10/14/10/14, align center, 288×38, w:fill, bg canvas, r 999)
            - icon search 16px
            - T "plumber near me pretoria" — IBM Plex Sans Regular 14, muted
          - **Frame** (col gap 4, pad 10/12/10/12, 288×94, w:fill, bg blush, r 12)
            - **Frame** (row gap 8, align center, 147×30)
              - T "yourbusiness.co.za" — IBM Plex Sans Regular 12, muted
              - ⧉ Tag Tone=Coral "#1" (36×30)
            - T "Your Business — 24/7 Plumbing in Pretoria" — IBM Plex Sans SemiBold 15, ink
          - **Frame** (col gap 4, pad 10/12/10/12, 288×60, w:fill, r 12)
            - **Frame** (row gap 8, align center, 90×16)
              - T "competitor.co.za" — IBM Plex Sans Regular 12, muted
            - T "Competitor Plumbing Services" — IBM Plex Sans Regular 15, muted
          - **Frame** (col gap 4, pad 10/12/10/12, 288×60, w:fill, r 12)
            - **Frame** (row gap 8, align center, 79×16)
              - T "directory.co.za" — IBM Plex Sans Regular 12, muted
            - T "Directory listing · Plumbers" — IBM Plex Sans Regular 15, muted
        - **Frame** (col gap 8, 320×108, w:fill)
          - T "Built to be found" — IBM Plex Sans SemiBold 24 ls -1%, ink
          - T "SEO foundations from day one: fast pages, proper structure and content written around how your customers actually search." — IBM Plex Sans Regular 15/150%, muted
      - **Card · Built to convert** (col gap 16, pad 32, align space_between, 384×480, w:fill, grow, bg ink, r 28)
        - **Mock · enquiries** (col gap 10, 320×200, w:fill)
          - **Frame** (row gap 12, pad 12/14/12/14, align center, 320×60, w:fill, bg surface, r 16)
            - **Frame** (row, align center/center, 36×36, bg blush, r 999)
              - icon mail 18px
            - **Frame** (col gap 2, 214×36, w:fill, grow)
              - T "New enquiry" — IBM Plex Sans SemiBold 14, ink
              - T "Contact form · Garden route" — IBM Plex Sans Regular 12, muted
            - T "2m" — IBM Plex Sans Regular 12, muted
          - **Frame** (row gap 12, pad 12/14/12/14, align center, 320×60, w:fill, bg surface, r 16)
            - **Frame** (row, align center/center, 36×36, bg blush, r 999)
              - icon cal 18px
            - **Frame** (col gap 2, 217×36, w:fill, grow)
              - T "Call booked" — IBM Plex Sans SemiBold 14, ink
              - T "Thursday · 10:00" — IBM Plex Sans Regular 12, muted
            - T "1h" — IBM Plex Sans Regular 12, muted
          - **Frame** (row gap 12, pad 12/14/12/14, align center, 320×60, w:fill, bg surface, r 16)
            - **Frame** (row, align center/center, 36×36, bg blush, r 999)
              - icon doc 18px
            - **Frame** (col gap 2, 217×36, w:fill, grow)
              - T "Quote requested" — IBM Plex Sans SemiBold 14, ink
              - T "Kitchen renovation" — IBM Plex Sans Regular 12, muted
            - T "3h" — IBM Plex Sans Regular 12, muted
        - **Frame** (col gap 8, 320×139, w:fill)
          - T "Designed around the decision" — IBM Plex Sans SemiBold 24 ls -1%, surface
          - T "Every page is laid out around what a visitor needs to see, in what order, before they trust you enough to get in touch." — IBM Plex Sans Regular 15/150%, onDarkMuted
      - **Card · Fast by default** (col gap 16, pad 32, align space_between, 384×480, w:fill, grow, bg blush, r 28)
        - **Mock · performance** (row gap 20, pad 20, align center, 320×152, w:fill, bg surface, r 20)
          - **Score ring** (free layout, 112×112)
            - ellipse 112×112 blush at 0,0
            - ellipse 112×112 coral at 0,0
            - T "98" — Oswald Medium 40, ink center
          - **Frame** (col gap 10, 148×98, w:fill, grow)
            - **Frame** (col gap 4, 148×26, w:fill)
              - **Frame** (row, align space_between, 148×16, w:fill)
                - T "Performance" — IBM Plex Sans Regular 12, muted
                - T "98" — IBM Plex Sans SemiBold 12, ink
              - **Frame** (row, 148×6, w:fill, bg canvas, r 99)
                - rectangle 118×6 coral r99
            - **Frame** (col gap 4, 148×26, w:fill)
              - **Frame** (row, align space_between, 148×16, w:fill)
                - T "SEO" — IBM Plex Sans Regular 12, muted
                - T "100" — IBM Plex Sans SemiBold 12, ink
              - **Frame** (row, 148×6, w:fill, bg canvas, r 99)
                - rectangle 120×6 coral r99
            - **Frame** (col gap 4, 148×26, w:fill)
              - **Frame** (row, align space_between, 148×16, w:fill)
                - T "Accessibility" — IBM Plex Sans Regular 12, muted
                - T "96" — IBM Plex Sans SemiBold 12, ink
              - **Frame** (row, 148×6, w:fill, bg canvas, r 99)
                - rectangle 115×6 coral r99
        - **Frame** (col gap 8, 320×139, w:fill)
          - T "AI-accelerated, human-finished" — IBM Plex Sans SemiBold 24 ls -1%, ink
          - T "Custom-coded, not templated. Work moves faster without feeling rushed, and every site ships fast, accessible and easy to grow." — IBM Plex Sans Regular 15/150%, muted
  - **03 · Launch offer (pricing card)** (col gap 56, pad 120, 1440×854, w:fill, bg plum)
    - **Frame** (row gap 80, align center, 1200×614, w:fill)
      - **Frame** (col gap 28, 620×421, w:fill, grow)
        - ⧉ Tag Tone=OnDark "THE GOODGROUND LAUNCH OFFER" (203×30)
        - T "Launch your first website for R845 a month." — IBM Plex Sans SemiBold 56/106% ls -3%, surface
        - T "Exclusively for new businesses without a website. We open two promotional spaces each month, and domain, hosting and email are included for the first 12 months." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Frame** (row gap 12, 360×52)
          - ⧉ Button Style=Coral "See the offer" (173×52)
          - ⧉ Button Style=Light "How it works" (175×52)
      - **Pricing card** (col gap 24, pad 40, 500×614, bg surface, r 32, border line 1, shadow 0 30 60 #000000@35%)
        - **Frame** (row, align space_between/center, 418×30, w:fill)
          - T "Launch plan" — IBM Plex Sans SemiBold 20, ink
          - ⧉ Tag Tone=Coral "NEW BUSINESSES" (114×30)
        - **Frame** (row gap 8, align baseline, 321×80)
          - T "R845" — Oswald Medium 80/100%, ink
          - T "/ month · 12 months" — IBM Plex Sans Regular 16, muted
        - rectangle 418×1 line
        - **Frame** (col gap 14, 418×186, w:fill)
          - **Frame** (row gap 12, align center, 418×26, w:fill)
            - **Frame** (row, align center/center, 26×26, bg mint, r 999)
              - icon check 13px
            - T "Custom one-page website" — IBM Plex Sans Regular 15, ink
          - **Frame** (row gap 12, align center, 418×26, w:fill)
            - **Frame** (row, align center/center, 26×26, bg mint, r 999)
              - icon check 13px
            - T "Domain registration & business email" — IBM Plex Sans Regular 15, ink
          - **Frame** (row gap 12, align center, 418×26, w:fill)
            - **Frame** (row, align center/center, 26×26, bg mint, r 999)
              - icon check 13px
            - T "Hosting included for 12 months" — IBM Plex Sans Regular 15, ink
          - **Frame** (row gap 12, align center, 418×26, w:fill)
            - **Frame** (row, align center/center, 26×26, bg mint, r 999)
              - icon check 13px
            - T "Detailed SEO setup" — IBM Plex Sans Regular 15, ink
          - **Frame** (row gap 12, align center, 418×26, w:fill)
            - **Frame** (row, align center/center, 26×26, bg mint, r 999)
              - icon check 13px
            - T "Submitted to Google for indexing" — IBM Plex Sans Regular 15, ink
        - **Frame** (col gap 10, pad 14/16/14/16, 418×63, w:fill, bg canvas, r 16)
          - **Frame** (row, align space_between, 386×17, w:fill)
            - T "November availability" — IBM Plex Sans Medium 13, ink
            - T "1 of 2 spots left" — IBM Plex Sans SemiBold 13, coral
          - **Frame** (row, 386×8, w:fill, bg line, r 99)
            - rectangle 210×8 coral r99
        - ⧉ Button Style=Primary "Claim a launch spot" (418×52, w:fill)
  - **04 · What we build (services bento)** (col gap 56, pad 120, 1440×1369, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×229, w:fill)
      - **Frame** (col gap 20, 700×229)
        - ⧉ Tag Tone=Neutral "02 / WHAT WE BUILD" (136×32)
        - T "Everything your website needs, from one connected team." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - **Frame** (col gap 24, 400×130)
        - T "Strategy, design, development and growth handled together, so nothing gets lost between suppliers." — IBM Plex Sans Regular 17/155%, muted
        - ⧉ Button Style=Outline "All services" (166×54)
    - **Services grid** (col gap 24, 1200×844, w:fill)
      - **Frame** (row gap 24, 1200×520, w:fill)
        - **Service · Website development** (col gap 16, pad 40, align space_between, 757×520, w:fill, grow, bg ink, r 28)
          - **Frame** (row, align space_between, 677×153, w:fill)
            - **Frame** (col gap 14, 360×153)
              - ⧉ Tag Tone=Coral "FLAGSHIP" (75×30)
              - T "Website development" — IBM Plex Sans SemiBold 36 ls -2%, surface
              - T "Custom-built, fast, and made to grow with your business." — IBM Plex Sans Regular 16/150%, onDarkMuted
            - **Frame** (row, align center/center, 44×44, bg surface, r 14)
              - icon arrow 22px
          - **Mock · browser** (col, 677×250, w:fill, bg surface, r 16)
            - **Frame** (row gap 6, pad 10/14/10/14, align center, 677×44, w:fill, bg canvas)
              - ellipse 10×10 #F26B5B
              - ellipse 10×10 #F5BE4F
              - ellipse 10×10 #5BC873
              - **Frame** (row, pad 4/12/4/12, 601×24, w:fill, grow, bg surface, r 99)
                - T "yourbusiness.co.za" — IBM Plex Sans Regular 12, muted
            - **Frame** (row gap 28, pad 28, 677×206, w:fill, h:fill, grow, bg gradient(#2E1848 0%, #9A3348 60%, #EF8A5A 100%))
              - **Frame** (col gap 12, 373×146, w:fill, grow)
                - T "Your business, ⏎ found first." — IBM Plex Sans SemiBold 28/110% ls -2%, surface
                - rectangle 220×8 #FFFFFF @50% r99
                - rectangle 180×8 #FFFFFF @35% r99
                - **Frame** (row, pad 8/16/8/16, 97×32, bg surface, r 99)
                  - T "Get a quote" — IBM Plex Sans SemiBold 12, ink
              - **Frame** (col gap 10, 220×128)
                - **Frame** (row gap 8, pad 10/12/10/12, align center, 220×36, w:fill, bg #FFFFFF @15%, r 12)
                  - icon check 14px
                  - T "Emergency call-outs" — IBM Plex Sans Medium 12, surface
                - **Frame** (row gap 8, pad 10/12/10/12, align center, 220×36, w:fill, bg #FFFFFF @15%, r 12)
                  - icon check 14px
                  - T "Free quotes in 24h" — IBM Plex Sans Medium 12, surface
                - **Frame** (row gap 8, pad 10/12/10/12, align center, 220×36, w:fill, bg #FFFFFF @15%, r 12)
                  - icon check 14px
                  - T "4.9 ★ on Google" — IBM Plex Sans Medium 12, surface
        - **Service · Full service** (col gap 16, pad 40, align space_between, 419×520, w:fill, grow, bg blush, r 28)
          - **Frame** (col gap 14, 339×153, w:fill)
            - ⧉ Tag Tone=Coral "MONTHLY" (72×30)
            - T "Full service" — IBM Plex Sans SemiBold 36 ls -2%, ink
            - T "Build, hosting, mailboxes, SEO and maintenance, all for one monthly price." — IBM Plex Sans Regular 16/150%, muted
          - **Mock · monthly statement** (col gap 10, pad 18/20/18/20, 339×189, w:fill, bg surface, r 20)
            - **Frame** (row, align space_between, 299×18, w:fill)
              - T "This month" — IBM Plex Sans SemiBold 14, ink
              - T "All covered" — IBM Plex Sans Medium 12, coral
            - **Frame** (row gap 10, align center, 299×17, w:fill)
              - icon check 14px
              - T "Website & updates" — IBM Plex Sans Regular 13, muted
            - **Frame** (row gap 10, align center, 299×17, w:fill)
              - icon check 14px
              - T "Hosting & SSL" — IBM Plex Sans Regular 13, muted
            - **Frame** (row gap 10, align center, 299×17, w:fill)
              - icon check 14px
              - T "Business mailboxes" — IBM Plex Sans Regular 13, muted
            - **Frame** (row gap 10, align center, 299×17, w:fill)
              - icon check 14px
              - T "SEO monitoring" — IBM Plex Sans Regular 13, muted
            - **Frame** (row gap 10, align center, 299×17, w:fill)
              - icon check 14px
              - T "Maintenance & backups" — IBM Plex Sans Regular 13, muted
      - **Frame** (row gap 24, 1200×300, w:fill)
        - **Service · UX & design** (col gap 20, pad 32, align space_between, 282×300, w:fill, grow, bg surface, r 28, border line 1)
          - **Frame** (row, align space_between/center, 216×48, w:fill)
            - **Frame** (row, align center/center, 48×48, bg lilac, r 14)
              - icon layout 24px
            - ⧉ Tag Tone=Plum "INCLUDED" (76×30)
          - **Frame** (col gap 8, 216×106, w:fill)
            - T "UX & design" — IBM Plex Sans SemiBold 22 ls -1%, ink
            - T "Every page designed around how your customers actually decide." — IBM Plex Sans Regular 15/150%, muted
        - **Service · SEO foundations** (col gap 20, pad 32, align space_between, 282×300, w:fill, grow, bg surface, r 28, border line 1)
          - **Frame** (row, align space_between/center, 216×48, w:fill)
            - **Frame** (row, align center/center, 48×48, bg lilac, r 14)
              - icon search 24px
            - ⧉ Tag Tone=Plum "INCLUDED" (76×30)
          - **Frame** (col gap 8, 216×83, w:fill)
            - T "SEO foundations" — IBM Plex Sans SemiBold 22 ls -1%, ink
            - T "Built to be found, not just built to look nice." — IBM Plex Sans Regular 15/150%, muted
        - **Service · Google Ads** (col gap 20, pad 32, align space_between, 282×300, w:fill, grow, bg surface, r 28, border line 1)
          - **Frame** (row, align space_between/center, 216×48, w:fill)
            - **Frame** (row, align center/center, 48×48, bg lilac, r 14)
              - icon target 24px
            - ⧉ Tag Tone=Neutral "GROWTH" (71×32)
          - **Frame** (col gap 8, 216×83, w:fill)
            - T "Google Ads" — IBM Plex Sans SemiBold 22 ls -1%, ink
            - T "Be there the moment someone searches for you." — IBM Plex Sans Regular 15/150%, muted
        - **Service · Meta Ads** (col gap 20, pad 32, align space_between, 282×300, w:fill, grow, bg surface, r 28, border line 1)
          - **Frame** (row, align space_between/center, 216×48, w:fill)
            - **Frame** (row, align center/center, 48×48, bg lilac, r 14)
              - icon users 24px
            - ⧉ Tag Tone=Neutral "GROWTH" (71×32)
          - **Frame** (col gap 8, 216×83, w:fill)
            - T "Meta Ads" — IBM Plex Sans SemiBold 22 ls -1%, ink
            - T "Stay in front of the people deciding whether to trust you." — IBM Plex Sans Regular 15/150%, muted
  - **05 · Work (project showcase)** (col gap 56, pad 120, 1440×1483, w:fill, bg ink)
    - **Section header** (row, align space_between/max, 1200×154, w:fill)
      - **Frame** (col gap 20, 700×109)
        - ⧉ Tag Tone=OnDark "03 / OUR CRAFT" (110×30)
        - T "Real builds, not mockups." — IBM Plex Sans SemiBold 56/106% ls -3%, surface
      - **Frame** (col gap 24, 400×154)
        - T "Every project is live at a public URL you can open, click through and test yourself. Each one says whether it’s client work or a concept build." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - ⧉ Button Style=Light "View all work" (178×52)
    - **Featured project** (row gap 48, pad 24/48/24/24, align center, 1200×488, w:fill, bg #FFFFFF @6%, r 32)
      - **Image · B3TTER screenshot (replace)** (col, pad 24, align max, 700×440, bg gradient(#1E2B3A 0%, #4A6B7C 60%, #C9D6CF 100%), r 20)
        - T "Project screenshot" — IBM Plex Sans Medium 13, surface
      - **Frame** (col gap 20, 380×375, w:fill, grow)
        - **Frame** (row gap 8, 224×30)
          - ⧉ Tag Tone=Coral "LATEST PROJECT" (109×30)
          - ⧉ Tag Tone=OnDark "CONCEPT BUILD" (107×30)
        - T "B3TTER" — Oswald Medium 64, surface
        - T "A complete product website for an insulated bottle, designed to look expensive, work for every visitor, and still load fast with dozens of high-resolution photos on the page." — IBM Plex Sans Regular 16/155%, onDarkMuted
        - **Frame** (row gap 24, 319×18)
          - **Frame** (row gap 6, align center, 64×18)
            - icon check 14px
            - T "Design" — IBM Plex Sans Medium 14, surface
          - **Frame** (row gap 6, align center, 106×18)
            - icon check 14px
            - T "Development" — IBM Plex Sans Medium 14, surface
          - **Frame** (row gap 6, align center, 101×18)
            - icon check 14px
            - T "Accessibility" — IBM Plex Sans Medium 14, surface
        - ⧉ Button Style=Light "View case study" (196×52)
    - **Frame** (row gap 24, 1200×349, w:fill)
      - **Project · Point Break Surf Academy** (col gap 20, 384×349, w:fill, grow)
        - **Image · screenshot (replace)** (col, 384×280, w:fill, bg gradient(#0F3B4C 0%, #2C8C99 60%, #F2D8A7 100%), r 24)
        - **Frame** (row, align space_between/center, 384×49, w:fill)
          - **Frame** (col gap 6, 303×49)
            - T "Point Break Surf Academy" — IBM Plex Sans SemiBold 20, surface
            - T "Concept build  ·  Design · Development · Booking UX" — IBM Plex Sans Regular 13, onDarkMuted
          - **Frame** (row, align center/center, 40×40, bg surface, r 999)
            - icon arrow 20px
      - **Project · GoodGround** (col gap 20, 384×349, w:fill, grow)
        - **Image · screenshot (replace)** (col, 384×280, w:fill, bg gradient(#2E1848 0%, #9A3348 60%, #EF8A5A 100%), r 24)
        - **Frame** (row, align space_between/center, 384×49, w:fill)
          - **Frame** (col gap 6, 253×49)
            - T "GoodGround" — IBM Plex Sans SemiBold 20, surface
            - T "Our own site  ·  Design · Development · SEO" — IBM Plex Sans Regular 13, onDarkMuted
          - **Frame** (row, align center/center, 40×40, bg surface, r 999)
            - icon arrow 20px
      - **Project · Sunbird Early Learners**

 (col gap 20, 384×349, w:fill, grow)
        - **Image · screenshot (replace)** (col, 384×280, w:fill, bg gradient(#F6C344 0%, #F28C38 60%, #E2574C 100%), r 24)
        - **Frame** (row, align space_between/center, 384×49, w:fill)
          - **Frame** (col gap 6, 276×49)
            - T "Sunbird Early Learners" — IBM Plex Sans SemiBold 20, surface
            - T "Concept build  ·  Design · Development · Motion" — IBM Plex Sans Regular 13, onDarkMuted
          - **Frame** (row, align center/center, 40×40, bg surface, r 999)
            - icon arrow 20px
    - **Your project next** (row, pad 16/16/16/32, align space_between/center, 1200×84, w:fill, bg #FFFFFF @6%, r 999)
      - T "Your project could be next. We’d rather show you real, testable work than pad this out with stock mock-ups." — IBM Plex Sans Regular 16, surface
      - ⧉ Button Style=Coral "Start your project" (206×52)
  - **06 · How we work (process stepper)** (col gap 56, pad 120, 1440×805, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×229, w:fill)
      - **Frame** (col gap 20, 700×229)
        - ⧉ Tag Tone=Neutral "04 / HOW WE WORK" (131×32)
        - T "From first brief to launch, you always know what’s next." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - **Frame** (col gap 24, 400×128)
        - T "Six clear steps, one team the whole way through, and a month of support included after launch." — IBM Plex Sans Regular 17/155%, muted
        - ⧉ Button Style=Primary "Start your project" (206×52)
    - **Stepper** (row gap 16, 1200×280, w:fill)
      - **Step 1** (col gap 20, 187×280, w:fill, grow)
        - **Frame** (row gap 8, align center, 187×40, w:fill)
          - **Frame** (row, align center/center, 40×40, bg ink, r 999)
            - T "01" — Oswald Medium 14, surface
          - rectangle 139×2 line
        - **Step card** (col gap 10, pad 24, 187×220, w:fill, bg surface, r 28, border line 1)
          - T "Research" — IBM Plex Sans SemiBold 20 ls -1%, ink
          - T "We learn your goals, customers and friction points before shaping anything." — IBM Plex Sans Regular 14/150%, muted
      - **Step 2** (col gap 20, 187×280, w:fill, grow)
        - **Frame** (row gap 8, align center, 187×40, w:fill)
          - **Frame** (row, align center/center, 40×40, bg ink, r 999)
            - T "02" — Oswald Medium 14, surface
          - rectangle 139×2 line
        - **Step card** (col gap 10, pad 24, 187×220, w:fill, bg surface, r 28, border line 1)
          - T "Direction" — IBM Plex Sans SemiBold 20 ls -1%, ink
          - T "Insights become flows, wireframes and prototypes that make the direction clear." — IBM Plex Sans Regular 14/150%, muted
      - **Step 3** (col gap 20, 187×280, w:fill, grow)
        - **Frame** (row gap 8, align center, 187×40, w:fill)
          - **Frame** (row, align center/center, 40×40, bg ink, r 999)
            - T "03" — Oswald Medium 14, surface
          - rectangle 139×2 line
        - **Step card** (col gap 10, pad 24, 187×220, w:fill, bg surface, r 28, border line 1)
          - T "Design" — IBM Plex Sans SemiBold 20 ls -1%, ink
          - T "Interface, content and assets designed with careful production detail." — IBM Plex Sans Regular 14/150%, muted
      - **Step 4** (col gap 20, 187×280, w:fill, grow)
        - **Frame** (row gap 8, align center, 187×40, w:fill)
          - **Frame** (row, align center/center, 40×40, bg ink, r 999)
            - T "04" — Oswald Medium 14, surface
          - rectangle 139×2 line
        - **Step card** (col gap 10, pad 24, 187×220, w:fill, bg surface, r 28, border line 1)
          - T "Revisions" — IBM Plex Sans SemiBold 20 ls -1%, ink
          - T "We refine against your feedback until every detail holds up." — IBM Plex Sans Regular 14/150%, muted
      - **Step 5** (col gap 20, 187×280, w:fill, grow)
        - **Frame** (row gap 8, align center, 187×40, w:fill)
          - **Frame** (row, align center/center, 40×40, bg ink, r 999)
            - T "05" — Oswald Medium 14, surface
          - rectangle 139×2 line
        - **Step card** (col gap 10, pad 24, 187×220, w:fill, bg surface, r 28, border line 1)
          - T "Handoff" — IBM Plex Sans SemiBold 20 ls -1%, ink
          - T "Files, guidelines and support so the work lands cleanly." — IBM Plex Sans Regular 14/150%, muted
      - **Step 6** (col gap 20, 187×280, w:fill, grow)
        - **Frame** (row gap 8, align center, 187×40, w:fill)
          - **Frame** (row, align center/center, 40×40, bg coral, r 999)
            - T "06" — Oswald Medium 14, surface
          - rectangle 139×2 canvas
        - **Step card** (col gap 10, pad 24, 187×220, w:fill, bg blush, r 28)
          - T "Beyond launch" — IBM Plex Sans SemiBold 20 ls -1%, ink
          - T "One month of support, included with every project." — IBM Plex Sans Regular 14/150%, muted
  - **07 · Pay your way (payment options)** (col gap 56, pad 120, 1440×1116, w:fill, bg surface)
    - **Section header** (row, align space_between/max, 1200×168, w:fill)
      - **Frame** (col gap 20, 700×168)
        - ⧉ Tag Tone=Coral "05 / CLEAR PRICING" (132×30)
        - T "One fixed price. ⏎ Two ways to pay." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - **Frame** (col gap 24, 400×154)
        - T "We agree one fixed price up front. No hourly billing and no scope surprises. Then you choose how to pay it." — IBM Plex Sans Regular 17/155%, muted
        - ⧉ Button Style=Primary "Get a fixed quote" (203×52)
    - **Frame** (row gap 24, 1200×520, w:fill)
      - **Option · 50/50** (col gap 28, pad 40, 588×520, w:fill, grow, bg canvas, r 28)
        - **Frame** (row, align space_between/center, 508×32, w:fill)
          - T "Option 1" — Oswald Medium 14 ls 6%, muted
          - ⧉ Tag Tone=Neutral "PAY ONCE" (77×32)
        - T "50 / 50" — Oswald Medium 72/100%, ink
        - T "A 50% deposit secures your project. The remaining 50% is paid on completion, before handover." — IBM Plex Sans Regular 16/155%, muted
        - **Viz · split** (row gap 8, 508×106, w:fill)
          - **Frame** (col gap 4, pad 18/20/18/20, 249×104, w:fill, grow, bg ink, r 18)
            - T "50%" — Oswald Medium 32, surface
            - T "Deposit · to start" — IBM Plex Sans Regular 13, onDarkMuted
          - **Frame** (col gap 4, pad 18/20/18/20, 251×106, w:fill, grow, bg surface, r 18, border line 1)
            - T "50%" — Oswald Medium 32, ink
            - T "On completion" — IBM Plex Sans Regular 13, muted
      - **Option · 12 instalments** (col gap 28, pad 40, 588×520, w:fill, grow, bg plum, r 28)
        - **Frame** (row, align space_between/center, 508×30, w:fill)
          - T "Option 2" — Oswald Medium 14 ls 6%, onDarkMuted
          - ⧉ Tag Tone=Coral "SPREAD THE COST" (119×30)
        - T "12 × monthly" — Oswald Medium 72/100%, surface
        - T "12 equal instalments. The first secures your booking; the remaining 11 only start once your project is complete, with support throughout." — IBM Plex Sans Regular 16/155%, onDarkMuted
        - **Viz · instalments** (col gap 12, 508×85, w:fill)
          - **Frame** (row gap 6, align max, 508×56, w:fill)
            - rectangle 37×56 coral r8
            - rectangle 37×56 #FFFFFF @16% r8 (×11 — bars 2–12 identical)
          - **Frame** (row, align space_between, 508×17, w:fill)
            - T "1st · secures your booking" — IBM Plex Sans Medium 13, peach
            - T "2–12 · after completion" — IBM Plex Sans Regular 13, onDarkMuted
    - **Proof quote** (row gap 16, pad 20/28/20/28, align center, 1200×76, w:fill, bg mint, r 20)
      - **Frame** (row, align center/center, 36×36, bg surface, r 999)
        - icon heart 18px
      - T "“One of the biggest benefits for us was the option to pay the project off over 12 months, while still receiving ongoing support.”  — Roam Local, Google review" — IBM Plex Sans Medium 15/150%, ink
  - **08 · Our story & reasons (good ground)** (col gap 56, pad 120, 1440×880, w:fill, bg lilac)
    - **Frame** (row gap 80, 1200×640, w:fill)
      - **Frame** (col gap 24, 440×441)
        - ⧉ Tag Tone=Plum "06 / WHY WE START HERE" (159×30)
        - T "Good ground grows good business." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
        - T "Our name comes from the Parable of the Sower: seed scattered on paths, rocks and thorns fails, but seed on prepared, deep-rooted soil produces a harvest. That’s the ground we help you build on, before you grow." — IBM Plex Sans Regular 17/160%, muted
        - ⧉ Button Style=Outline "Read the full story" (213×54)
      - **Frame** (col gap 20, 680×640, w:fill, grow)
        - **Frame** (row gap 20, 680×200, w:fill)
          - **Reason · Strategy first** (col gap 14, pad 28, 330×200, w:fill, grow, bg surface, r 28)
            - **Frame** (row, align center/center, 44×44, bg lilac, r 12)
              - icon compass 22px
            - T "Strategy first" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "The plan gets agreed with you before anything gets designed." — IBM Plex Sans Regular 15/150%, muted
          - **Reason · Personalised design** (col gap 14, pad 28, 330×200, w:fill, grow, bg surface, r 28)
            - **Frame** (row, align center/center, 44×44, bg lilac, r 12)
              - icon pen 22px
            - T "Personalised design" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "No recycled templates. Everything shaped around your goals." — IBM Plex Sans Regular 15/150%, muted
        - **Frame** (row gap 20, 680×200, w:fill)
          - **Reason · Problem solving** (col gap 14, pad 28, 330×200, w:fill, grow, bg surface, r 28)
            - **Frame** (row, align center/center, 44×44, bg lilac, r 12)
              - icon bulb 22px
            - T "Problem solving" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "We clarify friction and improve journeys, not just looks." — IBM Plex Sans Regular 15/150%, muted
          - **Reason · Quick turnaround** (col gap 14, pad 28, 330×200, w:fill, grow, bg surface, r 28)
            - **Frame** (row, align center/center, 44×44, bg lilac, r 12)
              - icon bolt 22px
            - T "Quick turnaround" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "AI-assisted and human-finished, so work moves faster." — IBM Plex Sans Regular 15/150%, muted
        - **Frame** (row gap 20, 680×200, w:fill)
          - **Reason · Clear pricing** (col gap 14, pad 28, 330×200, w:fill, grow, bg surface, r 28)
            - **Frame** (row, align center/center, 44×44, bg lilac, r 12)
              - icon tag 22px
            - T "Clear pricing" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "Simple scope, transparent effort, no surprise costs." — IBM Plex Sans Regular 15/150%, muted
          - **Reason · Support past launch** (col gap 14, pad 28, 330×200, w:fill, grow, bg surface, r 28)
            - **Frame** (row, align center/center, 44×44, bg lilac, r 12)
              - icon heart 22px
            - T "Support past launch" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "A month of support included, and Full Service after that." — IBM Plex Sans Regular 15/150%, muted
  - **09 · Who we build for (industries)** (col gap 56, pad 120, 1440×946, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×170, w:fill)
      - **Frame** (col gap 20, 700×170)
        - ⧉ Tag Tone=Neutral "07 / ACROSS SOUTH AFRICA" (174×32)
        - T "Built for the businesses that keep South Africa running." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Small and medium businesses where being easy to find and easy to trust decides whether someone gets in touch. Here are some of the industries we work with most." — IBM Plex Sans Regular 17/155%, muted
    - **Industry grid** (col gap 24, 1200×268, w:fill)
      - **Frame** (row gap 24, 1200×122, w:fill)
        - **Industry · Trades & home services** (row gap 20, pad 24, align center, 384×122, w:fill, grow, bg surface, r 24, border line 1)
          - **Frame** (row, align center/center, 56×56, bg blush, r 16)
            - icon wrench 28px
          - **Frame** (col gap 4, 202×72, w:fill, grow)
            - T "Trades & home services" — IBM Plex Sans SemiBold 19 ls -1%, ink
            - T "Plumbers, electricians, builders" — IBM Plex Sans Regular 14, muted
          - **Frame** (row, align center/center, 36×36, bg canvas, r 999)
            - icon arrow 18px
        - **Industry · Health & wellness** (row gap 20, pad 24, align center, 384×106, w:fill, grow, bg surface, r 24, border line 1)
          - **Frame** (row, align center/center, 56×56, bg blush, r 16)
            - icon heart 28px
          - **Frame** (col gap 4, 202×47, w:fill, grow)
            - T "Health & wellness" — IBM Plex Sans SemiBold 19 ls -1%, ink
            - T "Practices, clinics, studios" — IBM Plex Sans Regular 14, muted
          - **Frame** (row, align center/center, 36×36, bg canvas, r 999)
            - icon arrow 18px
        - **Industry · Hospitality & food** (row gap 20, pad 24, align center, 384×106, w:fill, grow, bg surface, r 24, border line 1)
          - **Frame** (row, align center/center, 56×56, bg blush, r 16)
            - icon cup 28px
          - **Frame** (col gap 4, 202×47, w:fill, grow)
            - T "Hospitality & food" — IBM Plex Sans SemiBold 19 ls -1%, ink
            - T "Restaurants, B&Bs, venues" — IBM Plex Sans Regular 14, muted
          - **Frame** (row, align center/center, 36×36, bg canvas, r 999)
            - icon arrow 18px
      - **Frame** (row gap 24, 1200×122, w:fill)
        - **Industry · Retail & small brands** (row gap 20, pad 24, align center, 384×106, w:fill, grow, bg surface, r 24, border line 1)
          - **Frame** (row, align center/center, 56×56, bg blush, r 16)
            - icon bag 28px
          - **Frame** (col gap 4, 202×47, w:fill, grow)
            - T "Retail & small brands" — IBM Plex Sans SemiBold 19 ls -1%, ink
            - T "Shops and product brands" — IBM Plex Sans Regular 14, muted
          - **Frame** (row, align center/center, 36×36, bg canvas, r 999)
            - icon arrow 18px
        - **Industry · Professional services** (row gap 20, pad 24, align center, 384×106, w:fill, grow, bg surface, r 24, border line 1)
          - **Frame** (row, align center/center, 56×56, bg blush, r 16)
            - icon brief 28px
          - **Frame** (col gap 4, 202×47, w:fill, grow)
            - T "Professional services" — IBM Plex Sans SemiBold 19 ls -1%, ink
            - T "Consultants, firms, advisors" — IBM Plex Sans Regular 14, muted
          - **Frame** (row, align center/center, 36×36, bg canvas, r 999)
            - icon arrow 18px
        - **Industry · Non-profits & community** (row gap 20, pad 24, align center, 384×122, w:fill, grow, bg surface, r 24, border line 1)
          - **Frame** (row, align center/center, 56×56, bg blush, r 16)
            - icon hand 28px
          - **Frame** (col gap 4, 202×72, w:fill, grow)
            - T "Non-profits & community" — IBM Plex Sans SemiBold 19 ls -1%, ink
            - T "NPOs, churches, schools" — IBM Plex Sans Regular 14, muted
          - **Frame** (row, align center/center, 36×36, bg canvas, r 999)
            - icon arrow 18px
    - **Not limited to these industries** (row gap 40, pad 32/40/32/40, align center, 1200×156, w:fill, bg surface, r 28, border line 1 dashed)
      - **Frame** (row, align center/center, 56×56, bg blush, r 999)
        - icon plus 22px (coral)
      - **Frame** (col gap 10, 710×90, w:fill, grow)
        - T "NOT ON THE LIST?" — Oswald Medium 12 ls 8%, coral
        - T "These are just some of the industries we work with." — IBM Plex Sans SemiBold 24/120% ls -1%, ink
        - T "If your business needs to be found and trusted online, we can build for it, whatever you do." — IBM Plex Sans Regular 15/155%, muted
      - ⧉ Button Style=Primary "Tell us about your business" (272×52)
  - **10 · FAQ** (col gap 56, pad 120, 1440×1030, w:fill, bg surface)
    - **Frame** (row gap 80, 1200×790, w:fill)
      - **Frame** (col gap 24, 420×548)
        - ⧉ Tag Tone=Neutral "08 / FAQ" (72×32)
        - T "Questions, answered." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
        - T "Everything you need to know about pricing, timelines and what happens after launch." — IBM Plex Sans Regular 17/155%, muted
        - **Contact card** (col gap 16, pad 28, 420×274, w:fill, bg canvas, r 28)
          - **Frame** (row, align center/center, 44×44, bg ink, r 999)
            - icon mail 22px
          - T "Still have a question?" — IBM Plex Sans SemiBold 20 ls -1%, ink
          - T "Email hello@goodground.co.za and a real person will get back to you." — IBM Plex Sans Regular 15/150%, muted
          - ⧉ Button Style=Outline "All questions" (177×54)
      - **Accordion** (col gap 12, 700×790, w:fill, grow)
        - **FAQ item (open)** (col gap 12, pad 20/20/20/28, 700×160, w:fill, bg canvas, r 20)
          - **Frame** (row gap 16, align center, 652×36, w:fill)
            - T "How do the two payment options work?" — IBM Plex Sans SemiBold 18 ls -1%, ink
            - **Frame** (row, align center/center, 36×36, bg ink, r 999)
              - icon minus 18px
          - T "We agree one fixed price up front. Then choose: a 50% deposit and 50% on completion, or 12 equal monthly instalments where the first secures your booking and the other 11 start once the project is complete." — IBM Plex Sans Regular 15/160%, muted
        - **FAQ item (closed — same spec for every closed item)** (col gap 12, pad 20/20/20/28, 700×78, w:fill, bg surface, r 20, border line 1)
          - **Frame** (row gap 16, align center, 650×36, w:fill)
            - T "{question}" — IBM Plex Sans SemiBold 18 ls -1%, ink
            - **Frame** (row, align center/center, 36×36, bg canvas, r 999)
              - icon plus 18px
        - Closed questions, in order: "Is there a deposit before you start?" · "What happens if the scope changes partway through?" · "What if I need to pause or cancel the project?" · "Do you only build websites, or handle design and SEO too?" · "How long does a typical project take?" · "What happens after my website launches?" · "Do you work with businesses anywhere in South Africa?"
  - **11 · Final CTA + footer** (col gap 24, pad 24/24/40/24, 1440×888, w:fill, bg canvas)
    - **CTA card** (col gap 40, pad 120/96/96/96, 1392×638, w:fill, bg #3A1A44, r 40)
      - ⧉ Tag Tone=OnDark "GET IN TOUCH" (97×30)
      - T "GROWTH ⏎ STARTS HERE." — Oswald Medium 140/92%, surface
      - **Frame** (row, align space_between/center, 1200×54, w:fill)
        - T "Tell us about your business and we’ll come back with a fixed price and a clear plan." — IBM Plex Sans Regular 18/150%, surface
        - **Frame** (row gap 12, 474×52)
          - ⧉ Button Style=Light "Start your project" (206×52)
          - ⧉ Button Style=Coral "hello@goodground.co.za" (256×52)
    - **Footer** (row, pad 24/24/0/24, align space_between, 1392×162, w:fill)
      - **Frame** (col gap 12, 245×66)
        - T "goodground" — IBM Plex Sans SemiBold 28 ls -3%, ink
        - T "Web development studio · South Africa" — IBM Plex Sans Regular 14, muted
      - **Frame** (col gap 10, 63×138)
        - T "STUDIO" — Oswald Medium 12 ls 6%, muted
        - T "About" / "Work" / "Process" / "Our story" — IBM Plex Sans Regular 15, ink (one per line)
      - **Frame** (col gap 10, 147×138)
        - T "SERVICES" — Oswald Medium 12 ls 6%, muted
        - T "Website development" / "Full service" / "SEO" / "Google & Meta Ads" — IBM Plex Sans Regular 15, ink
      - **Frame** (col gap 10, 167×108)
        - T "CONNECT" — Oswald Medium 12 ls 6%, muted
        - T "Instagram" / "Facebook" / "hello@goodground.co.za" — IBM Plex Sans Regular 15, ink

### GoodGround Homepage — Mobile v1 (390) — node 9:84 (390×12900)
- **GoodGround Homepage — Mobile v1 (390)** (col, 390×12900, bg canvas)
  - **00 · Hero (EXISTING — keep as-is)** (col, pad 20/20/24/20, 390×844, w:fill, bg #3A1A44)
    - **Frame** (row, align space_between/center, 350×49, w:fill)
      - **Frame** (row gap 10, pad 10/18/10/18, align center, 152×49, bg #1A0D14 @55%, r 999)
        - T "goodground" — IBM Plex Sans SemiBold 22 ls -3%, surface
      - **Frame** (row gap 10, pad 10/18/10/18, align center, 99×42, bg #1A0D14 @55%, r 999)
        - T "MENU" — Oswald SemiBold 15 ls 2%, surface
        - icon menu 18px
    - **spacer** (free layout, 350×263, w:fill, h:fill, grow)
    - **Frame** (col gap 20, 350×438, w:fill)
      - T "ONE TEAM. ONE CONNECTED PROCESS." — Oswald Medium 12 ls 6%, surface
      - T "WE BUILD ⏎ WEBSITES ⏎ THAT BRING IN ⏎ BUSINESS." — Oswald Medium 60/98%, surface
      - T "Custom-coded business websites for South African businesses that need to be found, and need to convert." — IBM Plex Sans Regular 16/150%, surface
      - ⧉ Button Style=Light "START YOUR PROJECT" (350×52, w:fill)
    - **Frame** (row, pad 32/0/0/0, align space_between, 350×50, w:fill)
      - T "↓  SCROLL TO EXPLORE" — Oswald Medium 12 ls 6%, surface
      - T "PAUSE MOTION" — Oswald Medium 12 ls 6%, surface
    - **Note** (col, pad 8/12/8/12, 232×30, bg coral, r 10, at 20,90) — design reference label only, do not build
  - **01 · Trust bar** (col gap 32, pad 24/20/0/20, 390×294, w:fill, bg canvas)
    - **Trust card** (col gap 16, pad 20, 350×270, w:fill, bg surface, r 24, border line 1)
      - **Frame** (row gap 12, align center, 308×36, w:fill)
        - **Frame** (row gap 2, 88×16)
          - icon star 16px (×5)
        - **Frame** (col, 208×36, w:fill, grow)
          - T "5.0 on Google" — IBM Plex Sans SemiBold 15, ink
          - T "From verified client reviews" — IBM Plex Sans Regular 12, muted
      - rectangle 308×1 line
      - **Frame** (row gap 12, 308×80, w:fill)
        - **Frame** (col gap 2, 148×80, w:fill, grow)
          - T "20+" — Oswald Medium 30, ink
          - T "years combined experience" — IBM Plex Sans Regular 13/130%, muted
        - **Frame** (col gap 2, 148×63, w:fill, grow)
          - T "10+" — Oswald Medium 30, ink
          - T "live, testable projects" — IBM Plex Sans Regular 13/130%, muted
      - **Frame** (row gap 12, 308×63, w:fill)
        - **Frame** (col gap 2, 148×63, w:fill, grow)
          - T "100%" — Oswald Medium 30, ink
          - T "satisfied clients" — IBM Plex Sans Regular 13/130%, muted
        - **Frame** (col gap 2, 148×63, w:fill, grow)
          - T "12" — Oswald Medium 30, ink
          - T "month payment option" — IBM Plex Sans Regular 13/130%, muted
  - **02 · Why GoodGround (intro cards)** (col gap 32, pad 72/20/72/20, 390×1576, w:fill, bg canvas)
    - **Section header** (col gap 16, 350×357, w:fill)
      - ⧉ Tag Tone=Neutral "01 / GOODGROUND" (125×32)
      - T "Growth doesn’t start with marketing. It starts with the ground underneath it." — IBM Plex Sans SemiBold 34/110% ls -2%, ink
      - T "We build AI-accelerated, search-first websites that help South African businesses get found, get trusted and get enquiries." — IBM Plex Sans Regular 16/155%, muted
      - ⧉ Button Style=Outline "About us" (148×54)
    - **Cards (swipe or stack)** (col gap 16, 350×1043, w:fill)
      - **Card · Built to be found** (col gap 24, pad 24, 350×365, w:fill, bg lilac, r 24)
        - **Frame** (col gap 8, pad 12, 302×189, w:fill, bg surface, r 16)
          - **Frame** (row gap 8, pad 8/12/8/12, align center, 278×33, w:fill, bg canvas, r 999)
            - icon search 14px
            - T "plumber near me pretoria" — IBM Plex Sans Regular 13, muted
          - **Frame** (col gap 2, pad 8/10/8/10, 278×66, w:fill, bg blush, r 10)
            - **Frame** (row gap 6, align center, 136×30)
              - T "yourbusiness.co.za" — IBM Plex Sans Regular 11, muted
              - ⧉ Tag Tone=Coral "#1" (36×30)
            - T "Your Business — 24/7 Plumbing" — IBM Plex Sans SemiBold 14, ink
          - **Frame** (col gap 2, pad 8/10/8/10, 278×50, w:fill, r 10)
            - **Frame** (row gap 6, align center, 82×14)
              - T "competitor.co.za" — IBM Plex Sans Regular 11, muted
            - T "Competitor Plumbing Services" — IBM Plex Sans Regular 14, muted
        - **Frame** (col gap 6, 302×104, w:fill)
          - T "Built to be found" — IBM Plex Sans SemiBold 22 ls -1%, ink
          - T "SEO foundations from day one: fast pages, proper structure and content written around how customers search." — IBM Plex Sans Regular 15/150%, muted
      - **Card · Designed around the decision** (col gap 24, pad 24, 350×348, w:fill, bg ink, r 24)
        - **Frame** (col gap 8, 302×172, w:fill)
          - **Frame** (row gap 10, pad 10/12/10/12, align center, 302×52, w:fill, bg surface, r 14)
            - **Frame** (row, align center/center, 32×32, bg blush, r 999)
              - icon mail 16px
            - **Frame** (col, 209×31, w:fill, grow)
              - T "New enquiry" — IBM Plex Sans SemiBold 13, ink
              - T "Contact form" — IBM Plex Sans Regular 11, muted
            - T "2m" — IBM Plex Sans Regular 11, muted
          - **Frame** (row gap 10, pad 10/12/10/12, align center, 302×52, w:fill, bg surface, r 14)
            - **Frame** (row, align center/center, 32×32, bg blush, r 999)
              - icon cal 16px
            - **Frame** (col, 213×31, w:fill, grow)
              - T "Call booked" — IBM Plex Sans SemiBold 13, ink
              - T "Thursday · 10:00" — IBM Plex Sans Regular 11, muted
            - T "1h" — IBM Plex Sans Regular 11, muted
          - **Frame** (row gap 10, pad 10/12/10/12, align center, 302×52, w:fill, bg surface, r 14)
            - **Frame** (row, align center/center, 32×32, bg blush, r 999)
              - icon doc 16px
            - **Frame** (col, 213×31, w:fill, grow)
              - T "Quote requested" — IBM Plex Sans SemiBold 13, ink
              - T "Kitchen renovation" — IBM Plex Sans Regular 11, muted
            - T "3h" — IBM Plex Sans Regular 11, muted
        - **Frame** (col gap 6, 302×104, w:fill)
          - T "Designed around the decision" — IBM Plex Sans SemiBold 22 ls -1%, surface
          - T "Every page is laid out around what a visitor needs to see before they trust you enough to get in touch." — IBM Plex Sans Regular 15/150%, onDarkMuted
      - **Card · AI-accelerated** (col gap 24, pad 24, 350×298, w:fill, bg blush, r 24)
        - **Frame** (row gap 16, pad 16, align center, 302×116, w:fill, bg surface, r 16)
          - **Score ring** (free layout, 84×84)
            - ellipse 84×84 blush at 0,0
            - ellipse 84×84 coral at 0,0
            - T "98" — Oswald Medium 30, ink
          - **Frame** (col gap 8, 170×82, w:fill, grow)
            - **Frame** (col gap 3, 170×22, w:fill)
              - **Frame** (row, align space_between, 170×14, w:fill)
                - T "Performance" — IBM Plex Sans Regular 11, muted
                - T "98" — IBM Plex Sans SemiBold 11, ink
              - **Frame** (row, 170×5, w:fill, bg canvas, r 99)
                - rectangle 147×5 coral r99
            - **Frame** (col gap 3, 170×22, w:fill)
              - **Frame** (row, align space_between, 170×14, w:fill)
                - T "SEO" — IBM Plex Sans Regular 11, muted
                - T "100" — IBM Plex Sans SemiBold 11, ink
              - **Frame** (row, 170×5, w:fill, bg canvas, r 99)
                - rectangle 150×5 coral r99
            - **Frame** (col gap 3, 170×22, w:fill)
              - **Frame** (row, align space_between, 170×14, w:fill)
                - T "Accessibility" — IBM Plex Sans Regular 11, muted
                - T "96" — IBM Plex Sans SemiBold 11, ink
              - **Frame** (row, 170×5, w:fill, bg canvas, r 99)
                - rectangle 144×5 coral r99
        - **Frame** (col gap 6, 302×110, w:fill)
          - T "AI-accelerated, human-finished" — IBM Plex Sans SemiBold 22 ls -1%, ink
          - T "Custom-coded, not templated. Fast, accessible and easy to grow." — IBM Plex Sans Regular 15/150%, muted
  - **03 · Launch offer (pricing card)** (col gap 32, pad 72/20/72/20, 390×1024, w:fill, bg plum)
    - **Frame** (col gap 16, 350×248, w:fill)
      - ⧉ Tag Tone=OnDark "LAUNCH OFFER" (102×30)
      - T "Launch your first website for R845 a month." — IBM Plex Sans SemiBold 34/110% ls -2%, surface
      - T "For new businesses without a website. Two promotional spaces each month, with domain, hosting and email included for 12 months." — IBM Plex Sans Regular 16/155%, onDarkMuted
    - **Pricing card** (col gap 20, pad 24, 350×516, w:fill, bg surface, r 28)
      - **Frame** (row, align space_between/center, 302×30, w:fill)
        - T "Launch plan" — IBM Plex Sans SemiBold 18, ink
        - ⧉ Tag Tone=Coral "NEW BUSINESSES" (114×30)
      - **Frame** (row gap 6, align baseline, 260×61)
        - T "R845" — Oswald Medium 60/100%, ink
        - T "/ month · 12 months" — IBM Plex Sans Regular 14, muted
      - rectangle 302×1 line
      - **Frame** (col gap 12, 302×168, w:fill) — 5 rows, each:
        - **Frame** (row gap 10, align center, 302×24, w:fill): **Frame** (24×24, bg mint, r 999, icon check 12px) + T "{item}" — IBM Plex Sans Regular 14, ink
        - Items: "Custom one-page website" · "Domain & business email" · "Hosting for 12 months" · "Detailed SEO setup" · "Submitted to Google for indexing"
      - **Frame** (col gap 8, pad 12/14/12/14, 302×56, w:fill, bg canvas, r 14)
        - **Frame** (row, align space_between, 274×16, w:fill)
          - T "November availability" — IBM Plex Sans Medium 12, ink
          - T "1 of 2 spots left" — IBM Plex Sans SemiBold 12, coral
        - **Frame** (row, 274×8, w:fill, bg line, r 99)
          - rectangle 150×8 coral r99
      - ⧉ Button Style=Primary "Claim a launch spot" (302×52, w:fill)
    - ⧉ Button Style=Coral "See the offer" (350×52, w:fill)
  - **04 · What we build (services)** (col gap 32, pad 72/20/72/20, 390×1477, w:fill, bg canvas)
    - **Section header** (col gap 16, 350×225, w:fill)
      - ⧉ Tag Tone=Neutral "02 / WHAT WE BUILD" (136×32)
      - T "Everything your website needs, from one connected team." — IBM Plex Sans SemiBold 34/110% ls -2%, ink
      - T "Strategy, design, development and growth handled together." — IBM Plex Sans Regular 16/155%, muted
    - **Service · Website development** (col gap 20, pad 24, 350×414, w:fill, bg ink, r 24)
      - **Frame** (row, align space_between/center, 302×36, w:fill)
        - ⧉ Tag Tone=Coral "FLAGSHIP" (75×30)
        - **Frame** (row, align center/center, 36×36, bg surface, r 999)
          - icon arrow 18px
      - **Frame** (col gap 6, 302×86, w:fill)
        - T "Website development" — IBM Plex Sans SemiBold 26 ls -1%, surface
        - T "Custom-built, fast, and made to grow with your business." — IBM Plex Sans Regular 15/150%, onDarkMuted
      - **Mock · browser** (col, 302×204, w:fill, bg surface, r 14)
        - **Frame** (row gap 5, pad 8/10/8/10, align center, 302×36, w:fill, bg canvas)
          - ellipse 8×8 #F26B5B
          - ellipse 8×8 #F5BE4F
          - ellipse 8×8 #5BC873
          - **Frame** (row, pad 3/10/3/10, 243×20, w:fill, grow, bg surface, r 99)
            - T "yourbusiness.co.za" — IBM Plex Sans Regular 11, muted
        - **Frame** (col gap 10, pad 20, 302×168, w:fill, bg gradient(#2E1848 0%, #9A3348 60%, #EF8A5A 100%))
          - T "Your business, ⏎ found first." — IBM Plex Sans SemiBold 22/110% ls -2%, surface
          - **Frame** (row gap 6, pad 8/10/8/10, align center, 141×30, bg #FFFFFF @15%, r 10)
            - icon check 12px
            - T "Emergency call-outs" — IBM Plex Sans Medium 11, surface
          - **Frame** (row gap 6, pad 8/10/8/10, align center, 121×30, bg #FFFFFF @15%, r 10)
            - icon check 12px
            - T "4.9 ★ on Google" — IBM Plex Sans Medium 11, surface
    - **Service · Full service** (col gap 16, pad 24, 350×186, w:fill, bg blush, r 24)
      - **Frame** (row, align space_between/center, 302×36, w:fill)
        - ⧉ Tag Tone=Coral "MONTHLY" (72×30)
        - **Frame** (row, align center/center, 36×36, bg surface, r 999)
          - icon arrow 18px
      - **Frame** (col gap 6, 302×86, w:fill)
        - T "Full service" — IBM Plex Sans SemiBold 26 ls -1%, ink
        - T "Build, hosting, mailboxes, SEO and maintenance, all for one monthly price." — IBM Plex Sans Regular 15/150%, muted
    - **Small services 2x2** (col gap 12, 350×326, w:fill) — two rows (row gap 12), each holding two cards:
      - **Service card** (col gap 12, pad 18, 169×157, w:fill, h:fill, grow, bg surface, r 20, border line 1): **Frame** (36×36, bg lilac, r 12, icon 18px) + T "{title}" — IBM Plex Sans SemiBold 16 ls -1%, ink + T "{line}" — IBM Plex Sans Regular 13/145%, muted
      - Cards: UX & design (icon layout) "Designed around how customers decide." · SEO foundations (icon search) "Built to be found, not just to look nice." · Google Ads (icon target) "Be there the moment they search." · Meta Ads (icon users) "Stay in front of people deciding to trust you."
    - ⧉ Button Style=Outline "All services" (166×54)
  - **05 · Work (swipe carousel)** (col gap 32, pad 72/20/72/20, 390×1305, w:fill, bg ink)
    - **Section header** (col gap 16, 350×186, w:fill)
      - ⧉ Tag Tone=OnDark "03 / OUR CRAFT" (110×30)
      - T "Real builds, not mockups." — IBM Plex Sans SemiBold 34/110% ls -2%, surface
      - T "Every project is live at a public URL you can open and test yourself." — IBM Plex Sans Regular 16/155%, onDarkMuted
    - **Featured project** (col gap 16, pad 12/12/24/12, 350×524, w:fill, bg #FFFFFF @6%, r 24)
      - **Image · B3TTER screenshot (replace)** (col, 326×220, w:fill, bg gradient(#1E2B3A 0%, #4A6B7C 60%, #C9D6CF 100%), r 16)
      - **Frame** (col gap 12, pad 0/8/0/8, 326×252, w:fill)
        - **Frame** (row gap 6, 173×30)
          - ⧉ Tag Tone=Coral "LATEST" (60×30)
          - ⧉ Tag Tone=OnDark "CONCEPT BUILD" (107×30)
        - T "B3TTER" — Oswald Medium 44, surface
        - T "A product website for an insulated bottle that looks expensive and still loads fast with dozens of high-res photos." — IBM Plex Sans Regular 15/155%, onDarkMuted
        - ⧉ Button Style=Light "View case study" (196×52)
    - **Carousel (horizontal swipe)** (row gap 12, 350×263, w:fill) — cards 270 wide:
      - **Project card** (col gap 12, 270×263): **Image** (270×200, r 20, gradient) + T "{name}" — IBM Plex Sans SemiBold 17, surface + T "{type}" — IBM Plex Sans Regular 13, onDarkMuted
      - Cards: Point Break Surf Academy · "Concept build" · gradient(#0F3B4C 0%, #2C8C99 60%, #F2D8A7 100%) — GoodGround · "Our own site" · gradient(#2E1848 0%, #9A3348 60%, #EF8A5A 100%) — Sunbird Early Learners · "Concept build" · gradient(#F6C344 0%, #F28C38 60%, #E2574C 100%)
    - **Carousel dots** (row gap 6, 52×8)
      - rectangle 24×8 coral r99
      - rectangle 8×8 #FFFFFF @25% r99
      - rectangle 8×8 #FFFFFF @25% r99
    - ⧉ Button Style=Light "View all work" (350×52, w:fill)
  - **06 · How we work (vertical timeline)** (col gap 32, pad 72/20/72/20, 390×1009, w:fill, bg canvas)
    - **Section header** (col gap 16, 350×159, w:fill)
      - ⧉ Tag Tone=Neutral "04 / HOW WE WORK" (131×32)
      - T "From first brief to launch, you always know what’s next." — IBM Plex Sans SemiBold 34/110% ls -2%, ink
    - **Timeline** (col, 350×590, w:fill) — each step:
      - **Step n** (row gap 16, 350×103, w:fill)
        - **Rail** (col, align center, 36×103, h:fill): **Dot** (36×36, bg ink, r 999, T "0n" — Oswald Medium 13, surface) + rectangle 2×67 line
        - **Text** (col gap 4, pad 6/0/28/0, 298×103, w:fill, grow): T "{title}" — IBM Plex Sans SemiBold 18 ls -1%, ink + T "{line}" — IBM Plex Sans Regular 14/150%, muted
      - Steps: 01 Research "We learn your goals, customers and friction points first." · 02 Direction "Insights become flows, wireframes and prototypes." · 03 Design "Interface, content and assets with careful detail." · 04 Revisions "We refine against your feedback until it all holds up." · 05 Handoff "Files, guidelines and support so it lands cleanly." · 06 Beyond launch "One month of support, included with every project." (step 6: dot bg coral, no rail line, height 75, text pad 6/0/0/0)
    - ⧉ Button Style=Primary "Start your project" (350×52, w:fill)
  - **07 · Pay your way (payment options)** (col gap 32, pad 72/20/72/20, 390×1328, w:fill, bg surface)
    - **Section header** (col gap 16, 350×186, w:fill)
      - ⧉ Tag Tone=Coral "05 / CLEAR PRICING" (132×30)
      - T "One fixed price. ⏎ Two ways to pay." — IBM Plex Sans SemiBold 34/110% ls -2%, ink
      - T "No hourly billing and no scope surprises. Agree the price, then choose how to pay it." — IBM Plex Sans Regular 16/155%, muted
    - **Option · 50/50** (col gap 16, pad 24, 350×313,

 w:fill, bg canvas, r 24)
      - **Frame** (row, align space_between/center, 302×32, w:fill)
        - T "OPTION 1" — Oswald Medium 12 ls 6%, muted
        - ⧉ Tag Tone=Neutral "PAY ONCE" (77×32)
      - T "50 / 50" — Oswald Medium 52/100%, ink
      - T "50% deposit to start, 50% on completion before handover." — IBM Plex Sans Regular 15/150%, muted
      - **Frame** (row gap 8, 302×87, w:fill)
        - **Frame** (col gap 2, pad 14/16/14/16, 146×85, w:fill, grow, bg ink, r 16)
          - T "50%" — Oswald Medium 26, surface
          - T "To start" — IBM Plex Sans Regular 12, onDarkMuted
        - **Frame** (col gap 2, pad 14/16/14/16, 148×87, w:fill, grow, bg surface, r 16, border line 1)
          - T "50%" — Oswald Medium 26, ink
          - T "On completion" — IBM Plex Sans Regular 12, muted
    - **Option · 12 instalments** (col gap 16, pad 24, 350×323, w:fill, bg plum, r 24)
      - **Frame** (row, align space_between/center, 302×30, w:fill)
        - T "OPTION 2" — Oswald Medium 12 ls 6%, onDarkMuted
        - ⧉ Tag Tone=Coral "SPREAD THE COST" (119×30)
      - T "12 × monthly" — Oswald Medium 52/100%, surface
      - T "The first instalment secures your booking. The other 11 start once your project is complete." — IBM Plex Sans Regular 15/150%, onDarkMuted
      - **Frame** (row gap 4, align max, 302×44, w:fill)
        - rectangle 22×44 coral r6
        - rectangle 22×44 #FFFFFF @16% r6 (×11 — bars 2–12 identical)
      - **Frame** (row, align space_between, 302×16, w:fill)
        - T "1st · books your slot" — IBM Plex Sans Medium 12, peach
        - T "2–12 · after launch" — IBM Plex Sans Regular 12, onDarkMuted
    - **Proof quote** (col gap 12, pad 20, 350×182, w:fill, bg mint, r 20)
      - **Frame** (row, align center/center, 32×32, bg surface, r 999)
        - icon heart 16px
      - T "“One of the biggest benefits for us was the option to pay the project off over 12 months, while still receiving ongoing support.”" — IBM Plex Sans Medium 15/150%, ink
      - T "Roam Local · Google review" — IBM Plex Sans Regular 13, muted
    - ⧉ Button Style=Primary "Get a fixed quote" (350×52, w:fill)
  - **08 · Our story & reasons** (col gap 32, pad 72/20/72/20, 390×967, w:fill, bg lilac)
    - **Section header** (col gap 16, 350×306, w:fill)
      - ⧉ Tag Tone=Plum "06 / WHY WE START HERE" (159×30)
      - T "Good ground grows good business." — IBM Plex Sans SemiBold 34/110% ls -2%, ink
      - T "Our name comes from the Parable of the Sower: only seed on prepared, deep-rooted soil produces a harvest. That’s the ground we help you build on." — IBM Plex Sans Regular 16/155%, muted
      - ⧉ Button Style=Outline "Read the full story" (213×54)
    - **Reasons list** (col, pad 0/20/0/20, 350×485, w:fill, bg surface, r 24) — 6 rows; every row except the last has a 1px line bottom border:
      - **Row** (row gap 14, pad 18/0/18/0, align center, 310×78, w:fill, border line 0/0/1/0)
        - **Frame** (row, align center/center, 40×40, bg lilac, r 12) → icon 20px
        - **Frame** (col gap 2, 256×41, w:fill, grow)
          - T "{title}" — IBM Plex Sans SemiBold 16 ls -1%, ink
          - T "{line}" — IBM Plex Sans Regular 13/140%, muted
      - Rows: compass "Strategy first" / "The plan is agreed before anything is designed." · pen "Personalised design" / "No recycled templates, ever." · bulb "Problem solving" / "We fix friction, not just looks." · bolt "Quick turnaround" / "AI-assisted, human-finished." · tag "Clear pricing" / "Simple scope, no surprise costs." · heart "Support past launch" / "A month of support included." (last row, no border)
  - **09 · Who we build for** (col gap 32, pad 72/20/72/20, 390×1181, w:fill, bg canvas)
    - **Section header** (col gap 16, 350×159, w:fill)
      - ⧉ Tag Tone=Neutral "07 / ACROSS SOUTH AFRICA" (174×32)
      - T "Built for the businesses that keep South Africa running." — IBM Plex Sans SemiBold 34/110% ls -2%, ink
    - **Frame** (col gap 10, 350×494, w:fill) — 6 rows, each:
      - **Industry row** (row gap 14, pad 14/16/14/14, align center, 350×74, w:fill, bg surface, r 20, border line 1)
        - **Frame** (row, align center/center, 44×44, bg blush, r 14) → icon 22px
        - **Frame** (col gap 2, 228×40, w:fill, grow)
          - T "{industry}" — IBM Plex Sans SemiBold 16 ls -1%, ink
          - T "{examples}" — IBM Plex Sans Regular 13, muted
        - icon chev 18px
      - Rows: wrench "Trades & home services" / "Plumbers, electricians, builders" · heart "Health & wellness" / "Practices, clinics, studios" · cup "Hospitality & food" / "Restaurants, B&Bs, venues" · bag "Retail & small brands" / "Shops and product brands" · brief "Professional services" / "Consultants, firms, advisors" · hand "Non-profits & community" / "NPOs, churches, schools"
    - **Not limited to these industries** (col gap 16, pad 24/20/24/20, 350×320, w:fill, bg surface, r 22, border line 1 dashed)
      - **Frame** (row, align center/center, 56×56, bg blush, r 999)
        - icon plus 22px (coral)
      - **Frame** (col gap 10, 308×130, w:fill)
        - T "NOT ON THE LIST?" — Oswald Medium 12 ls 8%, coral
        - T "These are just some of the industries we work with." — IBM Plex Sans SemiBold 20/120% ls -1%, ink
        - T "If your business needs to be found and trusted online, we can build for it, whatever you do." — IBM Plex Sans Regular 14/155%, muted
      - ⧉ Button Style=Primary "Tell us about your business" (308×52, w:fill)
  - **10 · FAQ** (col gap 32, pad 72/20/72/20, 390×1057, w:fill, bg surface)
    - **Section header** (col gap 16, 350×85, w:fill)
      - ⧉ Tag Tone=Neutral "08 / FAQ" (72×32)
      - T "Questions, answered." — IBM Plex Sans SemiBold 34/110% ls -2%, ink
    - **Accordion** (col gap 10, 350×688, w:fill)
      - **FAQ item (open)** (col gap 10, pad 16/14/16/18, 350×160, w:fill, bg canvas, r 18)
        - **Frame** (row gap 12, align center, 318×30, w:fill)
          - T "How do the two payment options work?" — IBM Plex Sans SemiBold 15 ls -1%, ink
          - **Frame** (row, align center/center, 30×30, bg ink, r 999)
            - icon minus 15px
        - T "One fixed price up front. Then choose: 50% deposit and 50% on completion, or 12 equal monthly instalments where the first secures your booking." — IBM Plex Sans Regular 14/155%, muted
      - **FAQ item (closed)** (col gap 10, pad 16/14/16/18, 350×64 (74 when the question wraps to 2 lines), w:fill, bg surface, r 18, border line 1)
        - **Frame** (row gap 12, align center, 316×30, w:fill)
          - T "{question}" — IBM Plex Sans SemiBold 15 ls -1%, ink
          - **Frame** (row, align center/center, 30×30, bg canvas, r 999)
            - icon plus 15px
      - Closed questions (shortened for mobile): "Is there a deposit before you start?" · "What if the scope changes partway through?" · "Can I pause or cancel the project?" · "Do you handle design and SEO too?" · "How long does a typical project take?" · "What happens after launch?" · "Do you work anywhere in South Africa?"
    - **Contact card** (row gap 14, pad 18, align center, 350×76, w:fill, bg canvas, r 20)
      - **Frame** (row, align center/center, 40×40, bg ink, r 999)
        - icon mail 20px
      - **Frame** (col gap 2, 260×39, w:fill, grow)
        - T "Still have a question?" — IBM Plex Sans SemiBold 15, ink
        - T "hello@goodground.co.za" — IBM Plex Sans Regular 13, coral
  - **11 · Final CTA + footer** (col gap 24, pad 12/12/32/12, 390×838, w:fill, bg canvas)
    - **CTA card** (col gap 24, pad 56/24/28/24, 366×560, w:fill, bg #3A1A44, r 32)
      - ⧉ Tag Tone=OnDark "GET IN TOUCH" (97×30)
      - T "GROWTH ⏎ STARTS ⏎ HERE." — Oswald Medium 72/92%, surface
      - T "Tell us about your business and we’ll come back with a fixed price and a clear plan." — IBM Plex Sans Regular 16/150%, surface
      - ⧉ Button Style=Light "Start your project" (318×52, w:fill)
      - ⧉ Button Style=Coral "hello@goodground.co.za" (318×52, w:fill)
    - **Footer** (col gap 24, pad 12/12/0/12, 366×210, w:fill)
      - **Frame** (col gap 6, 227×54)
        - T "goodground" — IBM Plex Sans SemiBold 24 ls -3%, ink
        - T "Web development studio · South Africa" — IBM Plex Sans Regular 13, muted
      - **Frame** (row gap 16, 342×120, w:fill) — 3 equal columns (col gap 8, w:fill, grow):
        - "STUDIO" (Oswald Medium 11 ls 6%, muted) → About · Work · Process · Our story
        - "SERVICES" → Websites · Full service · SEO · Ads
        - "CONNECT" → Instagram · Facebook · Email us
        - Links: IBM Plex Sans Regular 14, ink



---

# About

| | |
|---|---|
| **URL** | `/about (+ #our-story)` |
| **Figma page** | `31:150` |
| **Desktop frame (1440)** | 31:151 |
| **Mobile frame (390)** | 32:176 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- "On the web" lines are new copy. Confirm with the user (open item 9).
- Team and studio images are gradient placeholders until real photos arrive (open item 6).
- The story image parallax is scroll-scrubbed (GSAP).
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /about page — node 33:294
PAGE · READ FIRST
/about: content, links and SEO
CONTENT
•  All copy comes from the live /about page, lightly tightened. The founder is not named on the live site, so the design doesn’t name them either; add a name and photo only if you want to.
•  Stats: “10+ years founder experience” (live /about) and “20+ years combined experience” (live homepage). Keep both only if both stay true.
•  “On the web” lines on the four ground cards are new copy that maps each part of the parable to a website problem. Review before launch.
•  Hero image: a real photo of the studio or founder at work in George. 16:9 on desktop, 4:5 crop on mobile.
ANCHORS & LINKS
•  Section 02 has id="our-story" (homepage “Read the full story” → /about#our-story).
•  “Read the parable that inspired us” → same target as the live site. “See the full process” → /process. “View pricing” → same target as the live site.
•  Invitation: “Start your project” → /start-project?ref=about. “Get in touch” → /contact.
SEO
•  <title>: “About GoodGround | Website Development Studio, South Africa” (keep the live title).
•  JSON-LD: AboutPage + Organization (name, foundingDate 2026, location George, Western Cape, email, sameAs Instagram/Facebook).
•  One <h1> (the hero statement); section titles <h2>.

### Notes · A 01 Hero — node 33:307
MOTION & INTERACTION
01 · Hero
ENTRANCE
•  Tags FADE-UP → statement LINE MASK (120ms per line, 1000ms) → image clip-path reveal inset(10% round 32px) → inset(0 round 32px), image scale 1.1 → 1, 1100ms.
•  Stats strip rises 16px + fades in after the image; 10+, 20+ and 1 run COUNT-UP. “2026” never counts (a year should just appear).
SCROLL (DESKTOP)
•  Image parallax translateY -40px → +40px while it crosses the viewport (scrubbed). Stats strip stays pinned to the image.
MOBILE
•  Statement, then the 4:5 image, then the stats as a 2×2 card below it. No parallax.

### Notes · A 02 Why we started — node 33:320
MOTION & INTERACTION
02 · Why we started (id="our-story")
DESKTOP
•  The left label (“01 · Why we started”) is sticky (top 120px) while the right column scrolls.
•  Lead paragraph FADE-UP; the two problem cards STAGGER GRID 120ms with icon chips popping in (ease/back).
•  The mint “we started GoodGround to fix both” banner lands last: its sprout icon grows from the bottom (scaleY 0 → 1, 600ms, ease/back).
MOBILE
•  No sticky label; problem cards become compact rows.

### Notes · A 03 Why the name — node 33:330
MOTION & INTERACTION
03 · Why the name (the parable)
ENTRANCE
•  HEADER REVEAL. The four ground cards STAGGER GRID 120ms, left to right, so the story reads in order and ends on “Good ground”.
•  When “Good ground” lands, its sprout icon grows (scaleY 0 → 1, ease/back) and the three other cards settle to 85% opacity (motion/lg), so the eye ends on the good soil.
INTERACTION
•  Hover on any ground card (desktop): it returns to 100% opacity and lifts -4px. Not links.
•  The four statements reveal with LINE MASK, 120ms apart; the last one (“Growth is the result…”) is semibold.
•  “Read the parable” button: standard Button states.
MOBILE
•  The four grounds become a horizontal swipe carousel (scroll-snap, 240px cards, dots like the homepage work carousel). Statements stack in one card.

### Notes · A 04 What we believe — node 33:343
MOTION & INTERACTION
04 · What we believe
ENTRANCE
•  HEADER REVEAL; belief cards STAGGER GRID 80ms. Big numbers fade from 0 opacity as their card lands (no count-up).
•  Card 06 (dark) lands last with an extra scale 0.97 → 1 (motion/lg), because it explains the payment model.
INTERACTION
•  Hover (desktop): light cards lift -3px and their number colour goes from line to coral (motion/sm). Not links.
MOBILE
•  Single column list; FADE-UP 60ms stagger.

### Notes · A 05 How we work — node 33:356
MOTION & INTERACTION
05 · How we work
ENTRANCE
•  HEADER REVEAL; the six step dots fill one after another (ink, 100ms apart; step 06 coral) as the row enters. Not scroll-scrubbed here; the full scrubbed version lives on the homepage; the complete process is on /process.
•  Payment strip FADE-UP last; buttons standard.
MOBILE
•  Steps in a 2×3 grid; payment card full width with one button (“View pricing”).

### Notes · A 06 Invitation + footer — node 33:366
MOTION & INTERACTION
06 · Invitation + footer
BEHAVIOUR
•  Shared gradient CTA component (same as homepage section 11): LINE MASK headline, cursor light on desktop, buttons FADE-UP. “Start your project” → /start-project?ref=about; “Get in touch” → /contact.

## Layer-by-layer spec

### About — Desktop (1440) — node 31:151 (1440×5505)
- **About — Desktop (1440)** (col, 1440×5505, bg canvas)
  - **00 · Site header (light variant)** (row, pad 28/40/28/40, align space_between/center, 1440×107, w:fill)
    - **Logo pill** (row gap 10, pad 10/20/10/20, align center, 167×51, bg ink, r 999)
      - T "goodground" — IBM Plex Sans SemiBold 24 ls -3%, surface
    - **Breadcrumb pill** (row gap 10, pad 12/20/12/20, align center, 77×44, bg surface, r 999, border line 1)
      - T "ABOUT" — Oswald Medium 12 ls 6%, ink
    - **Menu pill** (row gap 10, pad 10/20/10/20, align center, 106×44, bg ink, r 999)
      - T "MENU" — Oswald SemiBold 16 ls 2%, surface
      - icon menu 18px
  - **01 · Hero** (col gap 40, pad 64/120/0/120, 1440×989, w:fill, bg canvas)
    - **Frame** (col gap 24, 1200×365, w:fill)
      - **Frame** (row gap 8, 386×32)
        - ⧉ Tag Tone=Coral "ABOUT GOODGROUND" (137×30)
        - ⧉ Tag Tone=Neutral "FOUNDED 2026 · GEORGE, SOUTH AFRICA" (241×32)
      - T "WE BELIEVE EVERY BUSINESS DESERVES A STRONG FOUNDATION." — Oswald Medium 112/92%, ink
    - **Image · studio / founder at work (replace)** (row, pad 32, align space_between/max, 1200×520, w:fill, bg gradient(#3B1A4A 0%, #9A3348 60%, #EF8A5A 100%), r 32)
      - T "Photo: studio or founder at work in George (replace)" — IBM Plex Sans Medium 13, surface (placeholder label, do not build)
      - **Stats strip** (row, pad 20/0/20/0, 673×112, bg surface, r 24)
        - **Stat** (col gap 2, pad 0/24/0/24, 122×72): T "2026" — Oswald Medium 36, ink + T "founded" — IBM Plex Sans Regular 13, muted
        - **Stat** (col gap 2, pad 0/24/0/24, 197×72, border line 0/0/0/1): T "10+" + T "years founder experience"
        - **Stat** (col gap 2, pad 0/24/0/24, 210×72, border line 0/0/0/1): T "20+" + T "years combined experience"
        - **Stat** (col gap 2, pad 0/24/0/24, 144×72, border line 0/0/0/1): T "1" + T "connected team"
  - **02 · Why we started** (col gap 56, pad 120, 1440×777, w:fill, bg canvas) — id="our-story"
    - **Frame** (row gap 80, 1200×537, w:fill)
      - **Sticky label** (col gap 12, 340×81)
        - T "01" — Oswald Medium 14 ls 6%, coral
        - T "Why we started" — IBM Plex Sans SemiBold 44/108% ls -2%, ink
      - **Frame** (col gap 28, 780×537, w:fill, grow)
        - T "GoodGround was founded in 2026 by a web developer with more than 10 years’ experience across UX and UI design, website design and graphic design." — IBM Plex Sans Medium 26/140% ls -1%, ink
        - T "We kept seeing good businesses run into the same two problems:" — IBM Plex Sans Regular 17/160%, muted
        - **Frame** (row gap 20, 780×228, w:fill)
          - **Problem card** (col gap 14, pad 28, 380×228, w:fill, h:fill, grow, bg surface, r 24, border line 1)
            - **Frame** (row, align center/center, 44×44, bg blush, r 12) → icon eye 22px
            - T "Websites that looked polished and did nothing" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "No strategy behind the design, and no plan for what happened after launch." — IBM Plex Sans Regular 15/150%, muted
          - **Problem card** (same spec)
            - **Frame** (44×44, bg blush, r 12) → icon wallet 22px
            - T "The whole bill, upfront" — IBM Plex Sans SemiBold 20 ls -1%, ink
            - T "Which put a proper website out of reach for a business that was still growing." — IBM Plex Sans Regular 15/150%, muted
        - **Banner** (row gap 14, pad 20/24/20/24, align center, 780×90, w:fill, bg mint, r 20)
          - **Frame** (row, align center/center, 40×40, bg surface, r 999) → icon sprout 20px
          - T "We started GoodGround to fix both at once: strategy-first websites, and a choice to pay 50/50 or over 12 months." — IBM Plex Sans SemiBold 17/145%, ink
  - **03 · Why the name (parable)** (col gap 56, pad 120, 1440×1213, w:fill, bg lilac)
    - **Section header** (row, align space_between/max, 1200×168, w:fill)
      - **Frame** (col gap 20, 720×168)
        - ⧉ Tag Tone=Plum "WHY THE NAME" (103×30)
        - T "Good ground is where seeds take root and grow." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "The name comes from the biblical Parable of the Sower. We didn’t pick it because it sounded nice. It’s how we think about building." — IBM Plex Sans Regular 17/155%, muted
    - **Four grounds** (row gap 16, 1200×288, w:fill) — 4 cards, each (col gap 14, pad 24, 288×288, w:fill, h:fill, grow, r 24):
      - **Ground card (light)**: bg surface · **Frame** (48×48, bg lilac, r 14) → icon 24px · T "{name}" — IBM Plex Sans SemiBold 22 ls -1%, ink · T "{parable line}" — IBM Plex Sans Regular 15/150%, muted · rectangle 240×1 line · **Frame** (col gap 4, w:fill): T "ON THE WEB" — Oswald Medium 11 ls 6%, coral + T "{web line}" — IBM Plex Sans Medium 15, ink
        - icon path · "The path" · "Seed lands on the surface and never takes hold." · "A website with no strategy"
        - icon rock · "Rocky ground" · "It sprouts fast, then withers without roots." · "A quick launch with no plan after it"
        - icon thorn · "Among thorns" · "It grows, but gets choked by everything around it." · "Good work buried by a poor experience"
      - **Ground · Good ground (dark)**: bg plum · icon chip bg coral (icon sprout 24px) · T "Good ground" — surface · T "Prepared, deep-rooted soil that produces a harvest." — onDarkMuted · divider #FFFFFF @20% · "ON THE WEB" — peach · T "A strong foundation, then growth" — surface
    - **Statements** (col, pad 0/32/0/32, 1200×295, w:fill, bg surface, r 24) — 4 rows (row gap 24, pad 22/0/22/0, align center, w:fill; rows 1–3 have border line 0/0/1/0):
      - T "0n" — Oswald Medium 14 ls 6%, coral + T "{statement}" — IBM Plex Sans Medium 22 ls -1%, ink
      - "01" "A logo without strategy has little value." · "02" "A website without purpose rarely performs." · "03" "Marketing can’t fix a poor customer experience." · "04" "Growth is the result of a strong foundation, not a substitute for one." (row 4 is IBM Plex Sans SemiBold 22)
    - ⧉ Button Style=Outline "Read the parable that inspired us" (317×54)
  - **04 · What we believe** (col gap 56, pad 120, 1440×928, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×170, w:fill)
      - **Frame** (col gap 20, 720×170)
        - ⧉ Tag Tone=Neutral "WHAT WE BELIEVE" (119×32)
        - T "Six things we don’t argue about." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
    - **Beliefs grid** (col gap 20, 1200×462, w:fill) — 2 rows of 3 (row gap 20; row 1 height 194, row 2 height 248), each card:
      - **Belief n** (col gap 20, pad 28/28/32/28, 387×h, w:fill, h:fill, grow, bg surface, r 24, border line 1): T "0n" — Oswald Medium 56/100%, line + T "{belief}" — IBM Plex Sans SemiBold 21/135% ls -1%, ink
      - 01 "Strong businesses are built on strong foundations." · 02 "Strategy comes before design." · 03 "Design should solve a problem, not decorate one." · 04 "Growth is earned through consistency, not a single big launch." · 05 "Simple is powerful."
      - **Belief 6 (dark)**: bg ink, no border, number coral, text surface: "Relationships matter more than transactions, which is why we don’t ask for your entire budget on day one."
  - **05 · How we work** (col gap 56, pad 120, 1440×761, w:fill, bg surface)
    - **Section header** (row, align space_between/max, 1200×170, w:fill)
      - **Frame** (col gap 20, 720×170)
        - ⧉ Tag Tone=Neutral "HOW WE WORK" (104×32)
        - T "Every project follows the same process." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Research, direction, design, revisions, handoff, and a month of support after launch." — IBM Plex Sans Regular 17/155%, muted
    - **Process (compact)** (row gap 12, 1200×110, w:fill) — 6 tiles (col gap 14, pad 20, 190×110, w:fill, grow, bg canvas, r 20):
      - **Frame** (row, align center/center, 34×34, bg ink, r 99) → T "0n" — Oswald Medium 13, surface
      - T "{step}" — IBM Plex Sans SemiBold 17 ls -1%, ink
      - 01 Research · 02 Direction · 03 Design · 04 Revisions · 05 Handoff · 06 Beyond launch (tile 06: bg blush, dot bg coral)
    - **Payment choice** (row gap 24, pad 24/24/24/32, align center, 1200×129, w:fill, bg plum, r 24)
      - **Frame** (col gap 6, 717×81, w:fill, grow)
        - T "And every project gives you a choice in how you pay." — IBM Plex Sans SemiBold 22 ls -1%, surface
        - T "A 50% deposit and the rest on completion, or 12 monthly instalments, so investing properly doesn’t disrupt your cash flow." — IBM Plex Sans Regular 15/150%, onDarkMuted
      - **Frame** (row gap 12, 403×52)
        - ⧉ Button Style=Light "See the full process" (221×52)
        - ⧉ Button Style=Coral "View pricing" (170×52)
  - **06 · Invitation CTA + footer** (col gap 24, pad 24/24/40/24, 1440×730, w:fill, bg canvas)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×480, w:fill, bg #3A1A44 (animated hero gradient), r 40)
      - **Frame** (col gap 24, 900×288, w:fill, grow)
        - ⧉ Tag Tone=OnDark "AN INVITATION" (101×30)
        - T "IF YOU’RE BUILDING A BUSINESS YOU PLAN TO STICK WITH, WE’D LIKE TO HEAR ABOUT IT." — Oswald Medium 64/96%, surface
        - T "Let’s talk about the ground you’re building on." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 300×116)
        - ⧉ Button Style=Light "Start your project" (300×52, w:fill)
        - ⧉ Button Style=Coral "Get in touch" (300×52, w:fill)
    - **Footer** — shared desktop footer, identical to Home section 11 (logo + tagline, STUDIO / SERVICES / CONNECT columns)

### About — Mobile (390) — node 32:176 (390×4858)
- **About — Mobile (390)** (col, 390×4858, bg canvas)
  - **Header** (row, pad 20/20/12/20, align space_between/center, 390×78, w:fill)
    - **Logo pill** (row gap 10, pad 10/18/10/18, align center, 142×46, bg ink, r 999) → T "goodground" — IBM Plex Sans SemiBold 20 ls -3%, surface
    - **Menu pill** (row gap 10, pad 10/18/10/18, align center, 99×42, bg ink, r 999) → T "MENU" — Oswald SemiBold 15 ls 2%, surface + icon menu 18px
  - **01 · Hero** (col gap 20, pad 24/20/40/20, 390×1047, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "ABOUT GOODGROUND" (137×30)
    - T "WE BELIEVE EVERY BUSINESS DESERVES A STRONG FOUNDATION." — Oswald Medium 52/94%, ink
    - T "Founded 2026 · George, South Africa" — IBM Plex Sans Medium 14, muted
    - **Image · studio / founder (replace, 4:5)** (col, 350×420, w:fill, bg gradient(#3B1A4A 0%, #9A3348 60%, #EF8A5A 100%), r 24)
    - **Stats 2x2** (col, 350×190, w:fill, bg surface, r 20, border line 1) — 2 rows × 2 cells (col gap 2, pad 16/12/16/18, 174×94, w:fill, grow): T value — Oswald Medium 30, ink + T label — IBM Plex Sans Regular 12, muted
      - "2026" founded · "10+" years founder experience · "20+" years combined · "1" connected team
  - **02 · Why we started** (col gap 20, pad 24/20/64/20, 390×581, w:fill, bg canvas)
    - T "01" — Oswald Medium 13 ls 6%, coral
    - T "Why we started" — IBM Plex Sans SemiBold 32 ls -2%, ink
    - T "GoodGround was founded in 2026 by a web developer with more than 10 years’ experience across UX and UI design, website design and graphic design." — IBM Plex Sans Medium 19/145% ls -1%, ink
    - **Problem row** (row gap 14, pad 16, 350×74, w:fill, bg surface, r 18, border line 1)
      - **Frame** (40×40, bg blush, r 12) → icon eye 20px
      - **Frame** (col gap 2, w:fill, grow): T "Polished websites that did nothing" — IBM Plex Sans SemiBold 16 ls -1%, ink + T "No strategy, no plan after launch." — IBM Plex Sans Regular 13, muted
    - **Problem row** (same spec): icon wallet · "The whole bill, upfront" · "Out of reach for a growing business."
    - **Banner** (row gap 12, pad 16, align center, 350×72, w:fill, bg mint, r 18)
      - **Frame** (36×36, bg surface, r 999) → icon sprout 18px
      - T "We started GoodGround to fix both at once." — IBM Plex Sans SemiBold 15, ink
  - **03 · Why the name** (col gap 20, pad 64/20/64/20, 390×952, w:fill, bg lilac)
    - ⧉ Tag Tone=Plum "WHY THE NAME" (103×30)
    - T "Good ground is where seeds take root and grow." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - T "From the biblical Parable of the Sower. It’s how we think about building." — IBM Plex Sans Regular 15/155%, muted
    - **Four grounds (swipe carousel)** (col gap 10, 350×204, w:fill)
      - **Track** (row gap 12, 350×186, w:fill) — cards 240 wide (col gap 12, pad 18, r 20):
        - **Ground card**: **Frame** (40×40, bg lilac, r 12) → icon 20px · T "{name}" — IBM Plex Sans SemiBold 18 ls -1%, ink · T "ON THE WEB" — Oswald Medium 10 ls 6%, coral · T "{web line}" — IBM Plex Sans Medium 14, ink
        - path "The path" "A website with no strategy" · rock "Rocky ground" "A quick launch with no plan after it" · thorn "Among thorns" "Good work buried by a poor experience" · Good ground (bg plum, chip coral, icon sprout, text surface, kicker peach) "A strong foundation, then growth"
      - **Dots** (row gap 6, 66×8): rectangle 24×8 plum r99 (active) + 3 × rectangle 8×8 surface r99
    - **Statements** (col, pad 0/18/0/18, 350×285, w:fill, bg surface, r 20) — 4 rows (row gap 14, pad 16/0/16/0, w:fill; rows 1–3 border line 0/0/1/0): T "0n" — Oswald Medium 12 ls 6%, coral + T "{statement}" — IBM Plex Sans Medium 16/140% ls -1%, ink (same 4 statements as desktop)
    - ⧉ Button Style=Outline "Read the parable" (350×54, w:fill)
  - **04 · What we believe** (col gap 20, pad 64/20/64/20, 390×872, w:fill, bg canvas)
    - ⧉ Tag Tone=Neutral "WHAT WE BELIEVE" (119×32)
    - T "Six things we don’t argue about." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Belief rows** (row gap 16, pad 18, 350×66–124, w:fill, bg surface, r 18, border line 1): T "0n" — Oswald Medium 28/100%, line + T "{belief}" — IBM Plex Sans SemiBold 16/140% ls -1%, ink (same 6 beliefs; Belief 6 bg ink, number coral, text surface, no border)
  - **05 · How we work** (col gap 20, pad 64/20/64/20, 390×646, w:fill, bg surface)
    - ⧉ Tag Tone=Neutral "HOW WE WORK" (104×32)
    - T "Every project follows the same process." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Steps 2×3** (col gap 8, 350×172, w:fill) — 3 rows (row gap 8) of 2 tiles (row gap 10, pad 12, align center, 171×52, w:fill, grow, bg canvas, r 14): **Dot** (28×28, bg ink, r 99) → T "0n" — Oswald Medium 11, surface + T "{step}" — IBM Plex Sans SemiBold 14, ink (tile 06: bg blush, dot coral)
    - **Payment card** (col gap 12, pad 20, 350×184, w:fill, bg plum, r 20)
      - T "A choice in how you pay" — IBM Plex Sans SemiBold 20 ls -1%, surface
      - T "50% deposit and 50% on completion, or 12 monthly instalments." — IBM Plex Sans Regular 14/150%, onDarkMuted
      - ⧉ Button Style=Coral "View pricing" (310×52, w:fill)
  - **06 · Invitation + footer** (col gap 20, pad 12/12/32/12, 390×682, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×461, w:fill, bg #3A1A44, r 32)
      - ⧉ Tag Tone=OnDark "AN INVITATION" (101×30)
      - T "IF YOU’RE BUILDING A BUSINESS YOU PLAN TO STICK WITH, WE’D LIKE TO HEAR ABOUT IT." — Oswald Medium 40/98%, surface
      - ⧉ Button Style=Light "Start your project" (318×52, w:fill)
      - ⧉ Button Style=Coral "Get in touch" (318×52, w:fill)
    - **Footer** (col gap 20, pad 12/12/0/12, 366×157, w:fill)
      - T "goodground" — IBM Plex Sans SemiBold 24 ls -3%, ink
      - **Frame** (row gap 16, 342×94, w:fill) — 3 columns (col gap 8, w:fill, grow): "STUDIO" (Oswald Medium 11 ls 6%, muted) About · Work · Process — "SERVICES" Websites · Full service · SEO — "CONNECT" Instagram · Facebook · Email us (links IBM Plex Sans Regular 14, ink)



---

# Services

| | |
|---|---|
| **URL** | `/services (+ #website-development, #full-service, #compare)` |
| **Figma page** | `35:150` |
| **Desktop frame (1440)** | 35:151 |
| **Mobile frame (390)** | 39:229 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Website development and Full service live here as anchored sections; they have no detail pages.
- Comparison table cells marked "Ask us" need the user's confirmation (open item 9).
- Section 08 industries includes the "Not on the list?" card (desktop and mobile).
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /services page — node 40:267
PAGE · READ FIRST
/services: content, data, links and SEO
CONTENT
•  All service copy comes from the live /services page, tightened to fit the cards. Prices and terms are exactly as live: Full Service from R1,500/month, no minimum term; Care Plans priced per site, 30 days’ notice; ads = monthly fee + a budget you control, 30 days’ notice.
•  New structure: the seven services are grouped as Build (Development, UX & Design, SEO), Run (Full Service, Care Plans) and Grow (Google Ads, Meta Ads).
NEEDS YOUR CONFIRMATION
•  Comparison table (05): every “Ask us” cell is something the live copy doesn’t state (for example whether Full Service includes round-the-clock monitoring or the Google reviews refresh). Replace each with ✓ or — once confirmed.
•  Growth report mock (06): the figures (R4,000, 32 leads, R125) are illustrative and labelled so on the page. Keep the label, or swap in a real anonymised report.
•  FAQ answers 2–4 are not on the live page (only the questions). The first answer is written from your service copy; supply the rest.
DATA
•  Service names, tags, headlines, prices, problem/approach/outcome text and CTAs come from one services collection in the CMS, so the overview (03), detail cards (04), mobile tabs and the comparison table never disagree.
•  Each service has an anchor: #website-development, #ux-design, #seo, #full-service, #care-plans, #google-ads, #meta-ads. Homepage service cards link to /services#{anchor} until the individual /services/{slug} pages exist.
LINKS
•  “Start your project” → /start-project?service={slug}&ref=services (Development preselects new-website; ads use not-sure).
•  “See Full Service pricing” and “See pricing” → the existing pricing page. “Ask about a Care Plan” → /contact?topic=support. “Book a free consultation” → /start-project?ref=services-consult. Detail links (“Full SEO details →” etc.) → the existing detail pages.
SEO
•  <title>: “Website Development Services in South Africa | GoodGround” (keep live).
•  JSON-LD: one Service per service (name, description, provider GoodGround, areaServed South Africa, offers with price where public: Full Service from R1,500/month), plus FAQPage and BreadcrumbList.

> Build note (added in the brief): the individual detail pages now exist as the Service detail template — /services/seo, /services/website-redesign, /services/ux-design, /services/google-ads, /services/meta-ads. Website development and Full service stay as anchors on this page (#website-development, #full-service).

### Notes · S 01 Hero — node 40:286
MOTION & INTERACTION
01 · Hero + payment chooser
ENTRANCE
•  Tag FADE-UP → headline LINE MASK (120ms per line) → copy FADE-UP → payment card FADE-UP + scale 0.96 → 1 at +250ms.
PAYMENT CHOOSER (INTERACTIVE)
•  The segmented toggle is a real control (radiogroup). Its ink pill slides between options (translateX, motion/md, ease/in-out).
•  “12 × monthly”: 12 bars grow from the bottom (scaleY, 30ms stagger, ease/back), bar 1 coral and taller; caption: “The first instalment secures your booking…”.
•  “50 / 50”: the bars morph into two wide blocks (ink “Deposit” / outlined “On completion”) by animating widths in a single FLIP pass (motion/md); caption changes to “50% to start, 50% on completion.”
•  Defaults to “12 × monthly”. Keyboard: arrow keys switch. Motion off: instant swap.
MOBILE
•  Same card, full width under the copy.

### Notes · S 02 Service nav — node 40:299
MOTION & INTERACTION
02 · Sticky service nav (scroll-spy)
BEHAVIOUR
•  Sticks under the header (top 16px) from the moment it reaches it until the end of section 04, with a white background, soft shadow and 12px backdrop blur.
•  Each chip jumps to its service card (smooth scroll, 120px offset) and updates the URL hash (history.replaceState).
•  Scroll-spy: the chip whose card is most in view becomes active; the ink active pill slides to it (translateX + width, motion/md).
MOBILE
•  Horizontal scrolling chips with a right-edge fade; the active chip auto-scrolls into view (scrollIntoView inline: "center", smooth).

### Notes · S 03 Overview — node 40:309
MOTION & INTERACTION
03 · Build · Run · Grow overview
ENTRANCE
•  HEADER REVEAL; the three group cards STAGGER GRID 120ms; the big BUILD / RUN / GROW words use LINE MASK inside each card; service rows inside each card FADE-UP 60ms apart.
INTERACTION
•  Each service row is a link to its detail card (same behaviour as the sticky nav). Hover: row background lightens/darkens one step and the tag shifts 2px left (motion/sm).
MOBILE
•  Segmented control Build | Run | Grow switches one panel (crossfade + 12px slide in the direction of travel, motion/md). Swiping the panel left/right also switches. Default: Build.

### Notes · S 04 Detail cards — node 40:322
MOTION & INTERACTION
04 · Service detail cards
ENTRANCE
•  Each card: left column FADE-UP; the three Problem → Approach → Outcome boxes FADE-UP 100ms apart, so the card reads as a story. The Outcome box’s icon pops last (ease/back).
INTERACTION
•  Not hoverable as a whole (it holds several links). Buttons and detail links use their standard states.
•  Each card has its anchor id; arriving with a hash scrolls to it and briefly outlines the card (2px coral ring fading over 1.2s).
MOBILE
•  The first card (or the hash target) is open; the others are collapsed rows. Opening one closes the others (accordion, grid-rows technique, motion/md).
•  Inside an open card, the Problem | Approach | Outcome segmented control swaps the text (crossfade, motion/sm). Default tab: Approach. Swipe left/right also switches.

### Notes · S 05 Compare — node 40:335
MOTION & INTERACTION
05 · After-launch comparison
ENTRANCE
•  HEADER REVEAL; table FADE-UP; then each row reveals top to bottom (40ms stagger) with its ticks popping in (ease/back).
INTERACTION
•  Column hover (desktop): the hovered plan’s column gets a 2px inner ring and the other columns dim to 80% (motion/sm).
•  Real <table> markup with <th scope="col"> plan names and <th scope="row"> features. Ticks have visually hidden “Included”, dashes “Not included”.
MOBILE
•  A segmented control (Build plan | Care Plan | Full Service) switches one plan panel at a time (crossfade, motion/md). Default: Full Service. The CTA under it changes with the selected plan.

### Notes · S 06 Growth — node 40:348
MOTION & INTERACTION
06 · Growth services (dark)
ENTRANCE
•  Headline LINE MASK; copy and buttons FADE-UP.
•  Report mock: card FADE-UP + scale 0.96 → 1; the three numbers COUNT-UP; the stacked weekly bars grow from the bottom (scaleY, 80ms stagger), Google segment first, then Meta on top.
•  Reasons: STAGGER GRID 60ms with icon chips popping. Steps: dots fill 1 → 4 (120ms apart), connecting lines draw left → right, step 4 coral.
INTERACTION
•  Report mock is decorative (aria-hidden) and keeps its “ILLUSTRATIVE” label.
•  Hover on a bar (desktop): tooltip “Week n · Google x · Meta y” (fade + 4px rise, motion/sm).
MOBILE
•  Report mock simplified to the three numbers; reasons become a checklist; steps stack vertically.

### Notes · S 07–08 — node 40:361
MOTION & INTERACTION
07 · Why grow  ·  08 · Industries
07 · WHY GROW
•  HEADER REVEAL; three cards STAGGER GRID 120ms; card 03 (plum) lands last with scale 0.97 → 1. Not links.
08 · INDUSTRIES
•  STAGGER GRID 60ms. Each card links to /services/{industry-slug}; hover = homepage section 09 hover (blush background, coral icon chip, arrow rotates 45°).
•  Mobile: full-width rows with chevrons.
•  "Not on the list?" card after the grid (same component and behaviour as homepage section 09): these six are only some of the industries we work with. Button → /start-project?ref=industry-other. FADE-UP after the grid STAGGER; + icon rotates 90° on hover. Mobile: stacked, full-width button.

### Notes · S 09–11 — node 40:371
MOTION & INTERACTION
09 · Payment  ·  10 · FAQ  ·  11 · CTA
09 · PAYMENT BAND
•  Band FADE-UP; “50 / 50” and “12 ×” LINE MASK inside their tiles. Blog link card is a LINKED CARD.
10 · FAQ
•  Same accordion behaviour, keyboard support and FAQPage JSON-LD as homepage section 10. One open at a time; the first is open on load.
11 · CTA + FOOTER
•  Shared gradient CTA component. “Start your project” → /start-project?ref=services; “Book a free consultation” → /start-project?ref=services-consult.

### Notes pointer · mobile — node 40:384
Mobile behaviour (tabs, plan switcher, accordion) is in the “Mobile” block of each note, left of the desktop page.

## Layer-by-layer spec

### Services — Desktop (1440) — node 35:151 (1440×11516)
- **Services — Desktop (1440)** (col, 1440×11516, bg canvas)
  - **00 · Site header (light variant)** (row, pad 28/40/28/40, align space_between/center, 1440×107, w:fill) — logo pill (167×51, bg ink) · breadcrumb pill T "SERVICES" — Oswald Medium 12 ls 6%, ink (92×44, bg surface, border line 1) · MENU pill (106×44, bg ink). Same spec as About header.
  - **01 · Hero** (col gap 48, pad 64/120/48/120, 1440×562, w:fill, bg canvas)
    - **Frame** (row gap 64, align max, 1200×450, w:fill)
      - **Frame** (col gap 24, 736×450, w:fill, grow)
        - ⧉ Tag Tone=Coral "WHAT WE DO" (90×30)
        - T "WEBSITES BUILT PROPERLY. PAID FOR SENSIBLY." — Oswald Medium 104/92%, ink
        - T "A website development and maintenance studio in George, working with businesses across South Africa. Designed, built, optimised for search and supported after launch, as one connected process. And every project offers a choice of how you pay." — IBM Plex Sans Regular 18/155%, muted
      - **Payment chooser card** (col gap 18, pad 28, 400×309, bg surface, r 28, border line 1, shadow 0 20 48 #2E1747@10%)
        - T "ONE FIXED PRICE" — Oswald Medium 12 ls 6%, muted
        - T "Choose how you pay" — IBM Plex Sans SemiBold 24 ls -1%, ink
        - **Segmented toggle** (row gap 4, pad 4, 342×46, w:fill, bg canvas, r 999)
          - **Option** (row, pad 10/0/10/0, align center, 165×38, w:fill, grow, r 999) → T "50 / 50" — IBM Plex Sans SemiBold 14, ink
          - **Option (selected)** (row, pad 10/0/10/0, align center, 165×38, w:fill, grow, bg ink, r 999) → T "12 × monthly" — IBM Plex Sans SemiBold 14, surface
        - **Bars** (row gap 4, align max (bottom), 342×44, w:fill)
          - rectangle 25×44 coral r6 (bar 1, taller)
          - rectangle 25×32 lilac r6 (×11 — bars 2–12)
        - T "The first instalment secures your booking. The other 11 start once your site is live." — IBM Plex Sans Regular 13/150%, muted
  - **02 · Sticky service nav (scroll-spy)** (col gap 48, pad 0/120/32/120, 1440×83, w:fill, bg canvas)
    - **Service nav** (row gap 6, pad 6, align center, 1200×51, w:fill, bg surface, r 999, border line 1) — 7 equal chips (row gap 8, pad 10/14/10/14, align center/center, 164×37, w:fill, grow, r 999):
      - Active chip: bg ink · T "01" — Oswald Medium 11, peach · T "Website Development" — IBM Plex Sans Medium 13, surface
      - Inactive chips: no bg · T "0n" — Oswald Medium 11, muted · T "{name}" — IBM Plex Sans Medium 13, ink
      - Chips: 01 Website Development · 02 UX & Design · 03 SEO Foundations · 04 Full Service · 05 Care Plans · 06 Google Ads · 07 Meta Ads
  - **03 · Overview (Build · Run · Grow)** (col gap 32, pad 48/120/120/120, 1440×853, w:fill, bg canvas)
    - **Frame** (row, align space_between/max, 1200×107, w:fill)
      - **Frame** (col gap 16, 561×107)
        - ⧉ Tag Tone=Neutral "THREE WAYS WE HELP" (140×32)
        - T "Build it. Run it. Grow it." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Seven services in three groups. Most clients start with a build, then add running and growth when they need it." — IBM Plex Sans Regular 17/155%, muted
    - **Overview bento** (row gap 20, 1200×546, w:fill) — 3 group cards (col gap 20, pad 28, ~388×546, w:fill, h:fill, grow, r 28):
      - **Group · Build** (bg surface, border line 1)
        - **Frame** (row, align space_between/center, 330×65, w:fill): T "01" — Oswald Medium 13 ls 6%, coral · T "BUILD" — Oswald Medium 44, ink
        - T "A website that works as hard as you do" — IBM Plex Sans SemiBold 20 ls -1%, ink
        - T "Custom-built, designed around how customers decide, and found on Google from launch." — IBM Plex Sans Regular 14/150%, muted
        - **Service rows** (col gap 8, 330×212, w:fill) — each row (row gap 12, pad 12/14/12/12, align center, w:fill, bg canvas, r 16): **Frame** (36×36, bg lilac, r 10) → icon 18px · **Frame** (col, w:fill, grow): T "{name}" — IBM Plex Sans SemiBold 15, ink + T "{meta}" — IBM Plex Sans Regular 12, muted · Tag
          - icon code · "Website Development" · "Fixed price · 50/50 or 12 months" · ⧉ Tag Tone=Coral "FLAGSHIP"
          - icon layout · "UX & Design" · "Included in every build" · ⧉ Tag Tone=Neutral "INCLUDED"
          - icon search · "SEO Foundations" · "Included in every build" · ⧉ Tag Tone=Neutral "INCLUDED"
        - **Footnote** (row gap 8, pad 10/12/10/12, align center, 330×37, w:fill, bg mint, r 12): icon check 14px · T "UX and SEO are included, never extra line items" — IBM Plex Sans Medium 13, ink
      - **Group · Run** (bg blush)
        - T "02" — Oswald Medium 13 ls 6%, coral · T "RUN" — Oswald Medium 44, ink
        - T "Everything handled after launch" — IBM Plex Sans SemiBold 20 ls -1%, ink
        - T "Hosting, mailboxes, updates, monitoring and SEO, so you never manage a technical detail." — IBM Plex Sans Regular 14/150%, muted
        - Service rows (bg surface): icon repeat · "Full Service" · "From R1,500/month · cancel any time" · ⧉ Tag Tone=Neutral "MONTHLY" — icon shield · "Website Care Plans" · "Priced per site · 30 days’ notice" · ⧉ Tag Tone=Neutral "MONTHLY"
        - Footnote (bg mint, 330×54): icon check · "Basic maintenance included while you pay off a 12-month build"
      - **Group · Grow** (bg plum)
        - T "03" — Oswald Medium 13 ls 6%, peach · T "GROW" — Oswald Medium 44, surface
        - T "Bring the right people to it" — IBM Plex Sans SemiBold 20 ls -1%, surface
        - T "Google and Meta campaigns aimed at ready-to-buy customers, measured in leads, not likes." — IBM Plex Sans Regular 14/150%, onDarkMuted
        - Service rows (bg #FFFFFF @8%, icon chip bg coral, name surface, meta onDarkMuted): icon target · "Google Ads" · "Monthly fee + a budget you control" · ⧉ Tag Tone=OnDark "GROWTH" — icon users · "Meta Ads" · "Facebook & Instagram" · ⧉ Tag Tone=OnDark "GROWTH"
        - Footnote (bg #FFFFFF @8%, text surface): icon check · "No lock-in. Cancel with 30 days’ notice"
  - **04 · Everything we build, in detail** (col gap 24, pad 120, 1440×3536, w:fill, bg surface)
    - **Frame** (col gap 16, pad 0/0/24/0, 1200×131, w:fill)
      - ⧉ Tag Tone=Neutral "IN DETAIL" (76×32)
      - T "Everything we build, in detail." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
    - **Detail card template** — every service card is (row gap 48, pad 40, 1200×~428, w:fill, bg canvas, r 32), id = the service anchor:
      - **Left column** (col gap 18, 420 wide)
        - **Title row** (row gap 12, align center, 420×48, w:fill): **Icon chip** (48×48, r 14) → icon 24px · T "0n" — Oswald Medium 28, line · spacer (w:fill, grow) · Tag
        - T "{service name}" — IBM Plex Sans SemiBold 32/110% ls -2%, ink
        - T "{headline}" — IBM Plex Sans Medium 18/140%, muted
        - **Price chip** (row gap 10, pad 12/16/12/14, align center, 420×44, w:fill, bg surface, r 14, border line 1): icon tag 16px · T "{price line}" — IBM Plex Sans SemiBold 14, ink
        - Button (when present)
        - Detail link (when present) — IBM Plex Sans Medium 14, coral
      - **Problem · Approach · Outcome** (col gap 12, 652×348, w:fill, grow) — 3 boxes (row gap 16, pad 20/24/20/20, w:fill, r 20):
        - Box 1 bg surface · **Frame** (36×36, bg canvas, r 999) → icon alert 18px · **Frame** (col gap 6, w:fill, grow): T "THE PROBLEM" — Oswald Medium 11 ls 6%, muted + T "{text}" — IBM Plex Sans Regular 15/155%, ink
        - Box 2 bg surface · icon compass · "OUR APPROACH"
        - Box 3 bg {outcome tint} · chip bg surface · icon sprout · "THE OUTCOME"
    - **Card 01 · Website Development** — chip bg ink, icon code · ⧉ Tag Tone=Coral "FLAGSHIP" · headline "A website that works as hard as you do." · price "Fixed price · 50% deposit or 12 monthly instalments" · ⧉ Button Style=Coral "Start your project" (206×52) · link "Redesigning an existing site? See website redesign →" · outcome tint mint
      - Problem: "Most business websites are built fast and then left alone. They get slow and outdated, and quietly cost you customers every month."
      - Approach: "We design and build custom websites from the ground up: fast, properly mobile, and structured around how your customers decide, not a generic template."
      - Outcome: "A site that loads quickly, looks credible on any device, and gives your business a front door worth walking through."
    - **Card 02 · UX & Design** — chip bg ink, icon layout · ⧉ Tag Tone=Plum "INCLUDED" · "Design that’s judged by results, not just looks." · price "Included in every build" · no button · link "Full UX & Design details →" · outcome tint mint
      - Problem: "A beautiful site that confuses visitors, buries your contact details or takes six clicks to explain what you do loses the customer before they act."
      - Approach: "We map the customer journey before designing a single screen: what a visitor needs to see, and in what order, before they trust you enough to act."
      - Outcome: "A site people can actually use. Visitors find what they need, and you get more enquiries as a result."
    - **Card 03 · SEO Foundations** (height 405) — chip bg ink, icon search · ⧉ Tag Tone=Plum "INCLUDED" · "Search visibility designed in from the start." · price "Included in every build" · link "Full SEO details →" · outcome tint mint
      - Problem: "A gorgeous website nobody can find on Google isn’t an investment. It’s a cost."
      - Approach: "Solid technical SEO from day one: fast load times, proper page structure, local SEO for South African search, and content built around how customers search."
      - Outcome: "A site that works in search from launch, not a second project six months later to “fix the SEO”."
    - **Card 04 · Full Service** — chip bg coral, icon repeat · ⧉ Tag Tone=Coral "MONTHLY" · "Everything handled, for one monthly price." · price "From R1,500/month · no minimum term, cancel any time" (chip wraps to 62 tall) · ⧉ Button Style=Primary "See Full Service pricing" (246×52) · outcome tint blush
      - Problem: "Someone still has to run hosting and mailboxes, keep software updated, watch security and stay on top of SEO. Most owners don’t have the time or background."
      - Approach: "We build the site, then keep running it: hosting and mailboxes managed for you, ongoing SEO, updates and maintenance, all handled monthly."
      - Outcome: "A site that stays fast, secure and found, without you managing a single technical detail."
    - **Card 05 · Website Care Plans** — chip bg coral, icon shield · ⧉ Tag Tone=Coral "MONTHLY" · "Someone looking after the site every month." · price "Priced per site · cancel on 30 days’ notice" · ⧉ Button Style=Primary "Ask about a Care Plan" (237×52) · outcome tint blush
      - Problem: "Websites rarely fail loudly. A page slows, a certificate lapses, a server falls over on a Saturday night, and it costs enquiries before anyone notices."
      - Approach: "Round-the-clock monitoring, certificate tracking, software updates, agreed content updates, and a monthly refresh of your latest Google reviews."
      - Outcome: "A site still fast, up and saying the right thing a year after launch, with a short monthly note on what was checked and changed."
    - **Card 06 · Google Ads** — chip bg plum, icon target · ⧉ Tag Tone=Dark "GROWTH" · "Be there the moment someone searches for you." · price "Monthly management fee + an ad budget you control" · ⧉ Button Style=Primary "Start your project" · link "Full Google Ads details →" · outcome tint lilac
      - Problem: "Most small businesses either don’t advertise on Google or hand it to someone who burns the budget on broad keywords and vague clicks."
      - Approach: "Campaigns built around what customers type when they’re ready to act, with tight keywords, honest ad copy, proper tracking and matching landing pages."
      - Outcome: "Qualified enquiries you can measure, a cost-per-lead you understand, and a tap you turn up when quiet and down when full."
    - **Card 07 · Meta Ads (Facebook & Instagram)** (height 452) — chip bg plum, icon users · ⧉ Tag Tone=Dark "GROWTH" · "Stay in front of the people deciding whether to trust you." · price "Monthly management fee + an ad budget you control" · ⧉ Button Style=Primary "Start your project" · link "Full Meta Ads details →" · outcome tint lilac
      - Problem: "Boosting a post feels like marketing but rarely builds anything. It reaches the wrong people and stops working the second you stop paying."
      - Approach: "Campaigns around real audiences: your area, your ideal customer, and past site visitors, with scroll-stopping creative and quiet remarketing."
      - Outcome: "A brand people recognise before they need you, steady local interest, and warm leads that already know who you are."
  - **05 · Looking after your site (compare)** (col gap 48, pad 120, 1440×1273, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×170, w:fill)
      - **Frame** (col gap 20, 720×170)
        - ⧉ Tag Tone=Neutral "AFTER LAUNCH" (104×32)
        - T "Three ways your site is looked after." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Basic care is included while you pay off a 12-month build. After that, pick the level of help you want." — IBM Plex Sans Regular 17/155%, muted
    - **Comparison table** (col, 1200×815, w:fill, bg surface, r 28, border line 1) — columns: feature 360 wide, then 3 equal plan columns (~279). Column backgrounds: Build plan = canvas, Care Plan = surface, Full Service = plum.
      - **Header row** (row, 1198×142): feature cell (col, pad 28/0/28/28, align max) T "WHAT’S COVERED" — Oswald Medium 12 ls 6%, muted · plan cells (col gap 6, pad 28/24/28/24):
        - "12-month build plan" — IBM Plex Sans SemiBold 20 ls -1%, ink · "Included while paying off" — IBM Plex Sans Medium 14, coral
        - "Website Care Plan" · "Priced per site" (coral)
        - "Full Service" — surface · "From R1,500/month" — peach · ⧉ Tag Tone=Coral "MOST HANDS-OFF" (116×30)
      - **Feature rows** (row, ~1198×53–59, border line 1/0/0/0): feature cell (row, pad 16/16/16/28, align center, 360) T "{feature}" — IBM Plex Sans Medium 15, ink · plan cells (row gap 8, pad 16/24/16/24, align center, h:fill). Cell content types: ✓ = **Frame** (26×26, r 999, bg mint — bg coral in the plum column) → icon check 13px · — = icon minus 18px · text = IBM Plex Sans Medium 14, ink · "Ask us" = IBM Plex Sans Regular 14, muted (onDarkMuted in plum column)
        - Basic maintenance: ✓ · ✓ · ✓
        - Health checks & site monitoring: "Basic" · "Around the clock, alerts in minutes" · "Ask us"
        - Security certificate tracking: "Ask us" · ✓ · "Ask us"
        - Software kept up to date: "Ask us" · ✓ · ✓
        - Content updates: — · "As agreed" · "Ask us"
        - Latest Google reviews refreshed monthly: — · ✓ · "Ask us"
        - Monthly note on what changed: — · ✓ · "Ask us"
        - Hosting & mailboxes managed: "Ask us" · "Ask us" · ✓ (continues in next chunk)

        - Ongoing SEO work: — · — · ✓
        - Term: "While paying off" · "30 days’ notice" · "No minimum term" (surface text in plum column)
      - **CTA row** (row, 1198×99, border line 1/0/0/0): empty feature cell (pad 20/0/20/28) · plan cells (pad 20/24/24/24):
        - ⧉ Button Style=Outline "Start a 12-month build" (245×54)
        - ⧉ Button Style=Outline "Ask about a Care Plan" (239×54)
        - ⧉ Button Style=Coral "See Full Service pricing" (246×52)
  - **06 · Growth services** (col gap 48, pad 120, 1440×1512, w:fill, bg ink)
    - **Frame** (row gap 64, align center, 1200×487, w:fill)
      - **Frame** (col gap 24, 636×430, w:fill, grow)
        - ⧉ Tag Tone=OnDark "GROWTH SERVICES" (123×30)
        - T "A great website nobody visits is a shop with the lights off." — IBM Plex Sans SemiBold 52/108% ls -3%, surface
        - T "SEO grows visibility over time, but it won’t fill next week’s diary. Your customers are already searching on Google when they’re ready to buy, and scrolling Instagram and Facebook when they’re deciding who to trust. Paid ads close that gap with real, measurable demand, pointed at the site you’ve already built." — IBM Plex Sans Regular 17/160%, onDarkMuted
        - **Frame** (row gap 12, 420×52)
          - ⧉ Button Style=Coral "Start your project" (206×52)
          - ⧉ Button Style=Light "See how it works" (202×52)
      - **Mock · monthly ad report (illustrative)** (col gap 20, pad 28, 500×487, bg surface, r 28)
        - **Frame** (row, align space_between/center, 444×32, w:fill)
          - T "Your monthly report" — IBM Plex Sans SemiBold 18 ls -1%, ink
          - ⧉ Tag Tone=Neutral "ILLUSTRATIVE" (98×32)
        - **KPI tiles** (row gap 10, 444×97, w:fill) — 3 tiles (col gap 2, pad 12/14/12/14, 141×97, w:fill, grow, bg canvas, r 14): label IBM Plex Sans Regular 12, muted · value Oswald Medium 26, ink · sub IBM Plex Sans Regular 11, muted
          - "Spend" "R4,000" "Budget you set" · "Leads" "32" "Calls + forms" · "Cost per lead" "R125" "Plain-language"
        - **Leads by week** (row gap 14, pad 8/0/0/0, align max (bottom), 444×174, w:fill) — 4 columns (col gap 6, align center, 101 wide, w:fill, grow): stacked bar (col gap 2) = peach rectangle (Meta, on top) + coral rectangle (Google, bottom), then T "Week n" — IBM Plex Sans Regular 11, muted
          - Week 1: peach 36 / coral 60 · Week 2: 48 / 72 · Week 3: 48 / 96 · Week 4: 60 / 84 (heights in px)
        - **Legend** (row gap 16): ellipse 10×10 coral + T "Google Ads" · ellipse 10×10 peach + T "Meta Ads" — IBM Plex Sans Regular 12, muted
        - T "Example layout only, not client data. Real reports show your spend, leads and cost per result in plain language." — IBM Plex Sans Regular 11/145%, muted
    - **Why it works (7)** (col gap 16, 1200×413, w:fill)
      - T "Why it works for small businesses" — IBM Plex Sans SemiBold 28 ls -1%, surface
      - Row 1 (row gap 16, 4 cards, 288×194) and Row 2 (row gap 16, 3 cards, 389×151) — each card (col gap 12, pad 22, w:fill, h:fill, grow, bg #FFFFFF @6%, r 20): **Frame** (40×40, bg coral, r 12) → icon 20px · T "{title}" — IBM Plex Sans SemiBold 17 ls -1%, surface · T "{line}" — IBM Plex Sans Regular 14/150%, onDarkMuted
        - eye "Results you can see" "Every rand tracked to a click, a call or an enquiry."
        - up "You’re found first" "At the top when customers search, above competitors relying on luck."
        - scale "Start small, scale sensibly" "Begin with a budget that suits you; grow it as results earn it."
        - brain "A better plan beats a bigger budget" "Smart targeting out-thinks the big players."
        - tap "Turn the tap up or down" "Busy season or quiet month, we adjust in days."
        - link "Ads that match your website" "One consistent story, so it converts better."
        - users "One team, one relationship" "The people who built your site run your ads."
    - **How growth works** (col gap 20, pad 32, 1200×276, w:fill, bg #FFFFFF @6%, r 28)
      - **Frame** (row, align space_between/center, 1136×36, w:fill)
        - T "Growth you can actually budget for" — IBM Plex Sans SemiBold 28 ls -1%, surface
        - ⧉ Tag Tone=Coral "NO LOCK-IN · 30 DAYS’ NOTICE" (184×30)
      - **Steps** (row gap 16, 1136×116, w:fill) — 4 steps (col gap 10, 272×116, w:fill, grow):
        - **Frame** (row gap 8, align center, w:fill): **Dot** (32×32, bg surface, r 99) → T "n" — Oswald Medium 14, ink · rectangle 232×1 #FFFFFF @20% (connector)
        - T "{title}" — IBM Plex Sans SemiBold 17 ls -1%, surface · T "{line}" — IBM Plex Sans Regular 14/150%, onDarkMuted
        - 1 "We learn your business" "Goals, best customers, and what a good lead is worth to you." · 2 "We build the campaigns" "Accounts, tracking, audiences and creative, set up properly." · 3 "We launch and manage" "Cut what doesn’t work, put more behind what does." · 4 (dot bg coral, number surface) "You see the harvest" "A plain-language monthly report: spend, leads, cost per result."
      - T "Clear monthly fee. Budget you control. Cancel with 30 days’ notice." — IBM Plex Sans Medium 15, peach
  - **07 · Why grow with GoodGround** (col gap 48, pad 120, 1440×643, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×111, w:fill)
      - **Frame** (col gap 20, 720×111)
        - ⧉ Tag Tone=Neutral "ONE TEAM, ONE CONNECTED PROCESS" (222×32)
        - T "Why grow with GoodGround." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "The team that built your foundation is the team that brings people to it. Nothing gets handed to a third party halfway through." — IBM Plex Sans Regular 17/155%, muted
    - **Frame** (row gap 20, 1200×244, w:fill) — 3 cards (col gap 16, pad 32, ~387×244, w:fill, h:fill, grow, r 28):
      - Card header (row, align space_between/center, w:fill): **Frame** (48×48, r 14) → icon 24px · T "0n" — Oswald Medium 28
      - Card 01 (bg surface, border line 1; chip bg lilac; number line): icon sprout · "Foundation first, then growth" — IBM Plex Sans SemiBold 22 ls -1%, ink · "We don’t run ads to a weak website; that’s pouring water on dry ground. Because we build the foundation, the traffic we send converts." — IBM Plex Sans Regular 15/155%, muted
      - Card 02 (same): icon wallet · "Your budget, treated like ours" · "We’d rather spend less and get you more. No inflated budgets, no clicks for the sake of clicks."
      - Card 03 (bg plum; chip bg coral; number onDarkMuted; title surface; body onDarkMuted): icon hand · "A partner, not a vendor" · "The same team behind your site runs your ads. We think in seasons and years, not one-off campaigns."
  - **08 · Industries we build for** (col gap 48, pad 120, 1440×1006, w:fill, bg surface)
    - **Section header** (row, align space_between/max, 1200×111, w:fill)
      - **Frame** (col gap 20, 720×111)
        - ⧉ Tag Tone=Neutral "WHO WE BUILD FOR" (129×32)
        - T "Industries we build for." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
    - **Grid** (col gap 16, 1200×403, w:fill) — 2 rows of 3 cards (row 1 height 204, row 2 height 183), each card (col gap 12, pad 24, 389 wide, w:fill, h:fill, grow, bg canvas, r 24):
      - **Card top** (row, align space_between/center, 341×44, w:fill): **Frame** (44×44, bg blush, r 14) → icon 22px · **Frame** (34×34, bg surface, r 999) → icon arrow 17px
      - T "{industry}" — IBM Plex Sans SemiBold 19 ls -1%, ink
      - T "{description}" — IBM Plex Sans Regular 14/150%, muted
      - wrench "Trades & home services" "Electricians, builders and tradespeople who need to be found locally and look credible before the quote."
      - heart "Health & wellness" "Clinics and practices that need to feel trustworthy and make booking simple."
      - cup "Hospitality & food" "Cafés and small venues that need to look as good online as in person, with menus, hours and an easy way to get in touch."
      - bag "Retail & small brands" "Makers and local shops that need an online shopfront that does the product justice."
      - brief "Professional & consulting" "Accountants, consultants and agencies whose site is often the first proof of credibility."
      - hand "Non-profits & community" "Organisations doing real work that need to tell their story plainly and bring in support."
    - **Not limited to these industries** (row gap 40, pad 32/40/32/40, align center, 1200×156, w:fill, bg canvas, r 28, border line 1 dashed) — same component as Home section 09 (blush plus chip 56×56, "NOT ON THE LIST?", "These are just some of the industries we work with.", "If your business needs to be found and trusted online, we can build for it, whatever you do.", ⧉ Button Style=Primary "Tell us about your business" 272×52). On this white section the card fill is canvas instead of surface.
  - **09 · Payment band** (col gap 48, pad 120/120/0/120, 1440×596, w:fill, bg canvas)
    - **Payment band** (row gap 48, pad 48, align center, 1200×358, w:fill, bg plum, r 32)
      - **Frame** (col gap 16, 604×262, w:fill, grow)
        - ⧉ Tag Tone=OnDark "HOWEVER YOU BUILD WITH US" (184×30)
        - T "You choose how you pay." — IBM Plex Sans SemiBold 44 ls -2%, surface
        - T "Every website project is quoted as one fixed price. Pay 50% upfront and the rest on completion, or split it into 12 monthly instalments. No surprise final invoice, either way." — IBM Plex Sans Regular 16/155%, onDarkMuted
        - ⧉ Button Style=Coral "See pricing" (162×52)
      - **Frame** (row gap 12, 452×123)
        - **Tile** (col gap 6, pad 24, 220×123, bg #FFFFFF @8%, r 24): T "50 / 50" — Oswald Medium 52/100%, surface · T "Deposit, then on completion" — IBM Plex Sans Regular 13, onDarkMuted
        - **Tile** (same): T "12 ×" · T "Monthly instalments"
    - **Blog link card (LINKED CARD)** (row gap 12, pad 16/16/16/24, align center, 1200×70, w:fill, bg surface, r 20, border line 1)
      - T "Not sure a website is the right spend right now? Read why it matters for South African businesses." — IBM Plex Sans Medium 15, ink
      - **Frame** (36×36, bg canvas, r 999) → icon arrow 18px
  - **10 · FAQ** (col gap 48, pad 120, 1440×648, w:fill, bg canvas)
    - **Frame** (row gap 80, 1200×408, w:fill)
      - **Frame** (col gap 20, 420×154)
        - ⧉ Tag Tone=Neutral "FAQ" (46×32)
        - T "Questions about what we build." — IBM Plex Sans SemiBold 48/106% ls -2%, ink
      - **Accordion** (col gap 12, 700×408, w:fill, grow)
        - **Item (open)** (col gap 12, pad 20/20/20/28, 700×138, w:fill, bg surface, r 20, border line 1)
          - **Frame** (row gap 16, align center, 650×36): T "Do you only build websites, or do you handle design and SEO too?" — IBM Plex Sans SemiBold 18 ls -1%, ink · **Frame** (36×36, bg ink, r 999) → icon minus 18px
          - T "UX & design and SEO foundations are included in every build, not sold as extras. Hosting, care and ads are available monthly when you need them." — IBM Plex Sans Regular 15/160%, muted
        - **Items (closed)** (col gap 12, pad 20/20/20/28, 700×78, bg surface, r 20, border line 1; chip 36×36 bg canvas, icon plus): "How long does a typical project take?" · "What happens after my website launches?" · "What’s the difference between Google Ads and Meta Ads?"
  - **11 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×697, w:fill, bg canvas)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×447, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 880×255, w:fill, grow)
        - ⧉ Tag Tone=OnDark "GROWTH STARTS HERE" (142×30)
        - T "READY TO BRING PEOPLE TO THE GROUND YOU’VE BUILT?" — Oswald Medium 80/94%, surface
        - T "Let’s turn your website into a source of steady, measurable growth, with a plan that makes it easy to start." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 320×116)
        - ⧉ Button Style=Light "Start your project" (320×52, w:fill)
        - ⧉ Button Style=Coral "Book a free consultation" (320×52, w:fill)
    - **Footer** — shared desktop footer (see Home section 11)

### Services — Mobile (390) — node 39:229 (390×6099)
- **Services — Mobile (390)** (col, 390×6099, bg canvas)
  - **Header** — shared mobile header (logo pill 142×46 + MENU pill 99×42, pad 20/20/12/20)
  - **01 · Hero** (col gap 16, pad 24/20/24/20, 390×580, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "WHAT WE DO" (90×30)
    - T "WEBSITES BUILT PROPERLY. PAID FOR SENSIBLY." — Oswald Medium 56/94%, ink
    - T "Designed, built, optimised for search and supported after launch, as one connected process. And you choose how you pay." — IBM Plex Sans Regular 16/155%, muted
    - **Payment chooser card** (col gap 14, pad 20, 350×220, w:fill, bg surface, r 24, border line 1)
      - T "Choose how you pay" — IBM Plex Sans SemiBold 18 ls -1%, ink
      - **Segmented control** (row gap 4, pad 4, 308×43, w:fill, bg canvas, r 999): "50 / 50" (pad 9/0/9/0, IBM Plex Sans SemiBold 13, ink) · "12 × monthly" (selected: bg ink, text surface)
      - **Bars** (row gap 3, align max, 308×36): rectangle 23×36 coral r5 + 11 × rectangle 23×26 lilac r5
      - T "First instalment secures your booking; the rest start once you’re live." — IBM Plex Sans Regular 12/145%, muted
  - **02 · Sticky service chips (scroll)** (col gap 16, pad 8/0/8/20, 390×55, w:fill, bg canvas)
    - **Chip row** (row gap 8, 370×39, w:fill, horizontal scroll, right-edge fade) — chips (row, pad 10/14/10/14, r 999), text IBM Plex Sans Medium 13:
      - Active: "Development" (bg ink, text surface)
      - Inactive (bg surface, border line 1, text ink): "UX & Design" · "SEO" · "Full Service" · "Care Plans" · "Google Ads" · "Meta Ads"
  - **03 · Build · Run · Grow (tabs)** (col gap 16, pad 56/20/56/20, 390×526, w:fill, bg canvas)
    - T "Build it. Run it. Grow it." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Segmented control** (row gap 4, pad 4, 350×43, w:fill, bg canvas, r 999): "Build" (selected: bg ink, surface) · "Run" · "Grow" — IBM Plex Sans SemiBold 13
    - **Tab panel · Build** (col gap 10, pad 16, 350×304, w:fill, bg surface, r 24, border line 1)
      - T "A website that works as hard as you do" — IBM Plex Sans SemiBold 18 ls -1%, ink
      - Service rows (row gap 12, pad 12, align center, 316×60–74, w:fill, bg canvas, r 16): chip 36×36 bg lilac r 10 → icon 18px · name IBM Plex Sans SemiBold 14, ink · meta IBM Plex Sans Regular 12, muted · Tag
        - code "Website Development" "Fixed price · 50/50 or 12 months" Coral "FLAGSHIP"
        - layout "UX & Design" "Included in every build" Neutral "INCLUDED"
        - search "SEO Foundations" "Included in every build" Neutral "INCLUDED"
      - Run and Grow panels use the same layout with the desktop Run / Grow content.
  - **04 · In detail** (col gap 16, pad 56/20/56/20, 390×1099, w:fill, bg surface)
    - T "Everything we build, in detail." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Service · 01 Website Development (open)** (col gap 14, pad 18/18/20/18, 350×421, w:fill, bg canvas, r 24)
      - **Frame** (row gap 12, align center, 314×52, w:fill): **Frame** (40×40, bg ink, r 12) → icon code 20px · T "Website Development" — IBM Plex Sans SemiBold 20 ls -1%, ink · ⧉ Tag Tone=Coral "FLAGSHIP"
      - T "A website that works as hard as you do." — IBM Plex Sans Medium 15, muted
      - **Segmented control** (row gap 4, pad 4, 314×43, w:fill, bg canvas, r 999): "Problem" · "Approach" (selected: bg ink, surface) · "Outcome" — IBM Plex Sans SemiBold 13
      - T "We design and build custom websites from the ground up: fast, properly mobile, and structured around how your customers decide, not a generic template." — IBM Plex Sans Regular 15/155%, ink
      - **Price chip** (row gap 8, pad 10/12/10/12, align center, 314×54, w:fill, bg surface, r 12): icon tag 14px · T "Fixed price · 50% deposit or 12 monthly instalments" — IBM Plex Sans SemiBold 13, ink
      - ⧉ Button Style=Coral "Start your project" (314×52, w:fill)
    - **Closed rows** (row gap 12, pad 14, align center, 350×64, w:fill, bg canvas, r 18): **Frame** (36×36, bg surface, r 10) → icon 18px · T "{name}" — IBM Plex Sans SemiBold 15, ink · Tag · **Frame** (28×28, bg surface, r 999) → icon plus 14px
      - layout "UX & Design" Plum "INCLUDED" · search "SEO Foundations" Plum "INCLUDED" · repeat "Full Service" Coral "MONTHLY" · shield "Website Care Plans" Coral "MONTHLY" · target "Google Ads" Dark "GROWTH" · users "Meta Ads" Dark "GROWTH"
  - **05 · Compare (plan switcher)** (col gap 16, pad 56/20/56/20, 390×639, w:fill, bg canvas)
    - T "Three ways your site is looked after." — IBM Plex Sans SemiBold 28/110% ls -2%, ink
    - **Segmented control** (row gap 4, pad 4, 350×43, w:fill, bg canvas, r 999): "Build plan" · "Care Plan" · "Full Service" (selected: bg ink, surface)
    - **Plan panel · Full Service** (col, pad 18/18/8/18, 350×322, w:fill, bg plum, r 24)
      - **Header** (row, pad 0/0/12/0, align space_between/center, 314×57): T "Full Service" — IBM Plex Sans SemiBold 20 ls -1%, surface · T "From R1,500/month · no minimum term" — IBM Plex Sans Medium 13, peach
      - **Feature rows** (row, pad 12/0/12/0, align space_between/center, 314×49, w:fill, border #FFFFFF @15% 1/0/0/0): T "{feature}" — IBM Plex Sans Medium 14, surface · ✓ = **Frame** (24×24, bg coral, r 999) → icon check 12px
        - "Basic maintenance" ✓ · "Software kept up to date" ✓ · "Hosting & mailboxes managed" ✓ · "Ongoing SEO work" ✓ · "Monitoring, certificates, reviews" → T "Ask us" — IBM Plex Sans Regular 13, onDarkMuted
    - ⧉ Button Style=Coral "See Full Service pricing" (350×52, w:fill) (changes with the selected plan: Build plan → "Start a 12-month build", Care Plan → "Ask about a Care Plan")
  - **06 · Growth** (col gap 16, pad 56/20/56/20, 390×959, w:fill, bg ink)
    - ⧉ Tag Tone=OnDark "GROWTH SERVICES" (123×30)
    - T "A great website nobody visits is a shop with the lights off." — IBM Plex Sans SemiBold 30/112% ls -2%, surface
    - T "Paid ads close the gap with real, measurable demand, pointed at the site you’ve built." — IBM Plex Sans Regular 15/155%, onDarkMuted
    - **Mock · monthly report (illustrative)** (col gap 12, pad 16, 350×143, w:fill, bg surface, r 20)
      - **Frame** (row, align space_between/center, 318×32): T "Monthly report" — IBM Plex Sans SemiBold 15, ink · ⧉ Tag Tone=Neutral "ILLUSTRATIVE"
      - **Tiles** (row gap 8, 318×67) — 3 tiles (col, pad 10, w:fill, grow, bg canvas, r 12): label IBM Plex Sans Regular 11, muted · value Oswald Medium 22, ink — "Spend" "R4,000" · "Leads" "32" · "Per lead" "R125"
    - **Checklist** (col gap 8, 350×342, w:fill) — 7 rows (row gap 10, pad 12/14/12/14, align center, 350×42, w:fill, bg #FFFFFF @6%, r 14): icon check 16px · T "{reason}" — IBM Plex Sans Medium 14, surface
      - "Results you can see" · "You’re found first" · "Start small, scale sensibly" · "A better plan beats a bigger budget" · "Turn the tap up or down" · "Ads that match your website" · "One team, one relationship"
    - T "Clear monthly fee. Budget you control. Cancel with 30 days’ notice." — IBM Plex Sans Medium 14, peach
    - ⧉ Button Style=Coral "Start your project" (350×52, w:fill)
  - **08 · Industries** (col gap 16, pad 56/20/56/20, 390×868, w:fill, bg surface)
    - T "Industries we build for." — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Industry rows** (row gap 10, pad 14/14/14/16, align center, 350×48, w:fill, bg canvas, r 16): T "{industry}" — IBM Plex Sans Medium 15, ink · icon chevron 18px
      - "Trades & home services" · "Health & wellness" · "Hospitality & food" · "Retail & small brands" · "Professional & consulting" · "Non-profits & community"
    - **Not limited to these industries** (col gap 16, pad 24/20/24/20, 350×320, w:fill, bg canvas, r 22, border line 1 dashed) — same as Home mobile section 09 (plus chip, kicker, 20px heading, 14px body, full-width ⧉ Button Style=Primary "Tell us about your business")
  - **09 · Payment + FAQ** (col gap 16, pad 56/20/56/20, 390×644, w:fill, bg canvas)
    - **Payment card** (col gap 12, pad 20, 350×189, w:fill, bg plum, r 24)
      - T "You choose how you pay." — IBM Plex Sans SemiBold 24 ls -1%, surface
      - T "One fixed price: 50% upfront and 50% on completion, or 12 monthly instalments." — IBM Plex Sans Regular 14/150%, onDarkMuted
      - ⧉ Button Style=Coral "See pricing" (310×52, w:fill)
    - T "Questions about what we build." — IBM Plex Sans SemiBold 24 ls -1%, ink
    - **FAQ rows (closed)** (row gap 10, pad 14/12/14/16, align center, 350×58, w:fill, bg surface, r 16, border line 1): T "{question}" — IBM Plex Sans SemiBold 14, ink · **Frame** (28×28, bg canvas, r 999) → icon plus 14px
      - "Do you handle design and SEO too?" · "How long does a typical project take?" · "What happens after launch?" · "Google Ads vs Meta Ads?"
  - **11 · CTA + footer** (col gap 16, pad 12/12/32/12, 390×651, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×434, w:fill, bg #3A1A44, r 32)
      - ⧉ Tag Tone=OnDark "GROWTH STARTS HERE" (142×30)
      - T "READY TO BRING PEOPLE TO THE GROUND YOU’VE BUILT?" — Oswald Medium 44/96%, surface
      - ⧉ Button Style=Light "Start your project" (318×52, w:fill)
      - ⧉ Button Style=Coral "Book a free consultation" (318×52, w:fill)
    - **Footer** — shared mobile footer (see About mobile)



---

# Service detail template

| | |
|---|---|
| **URL** | `/services/{seo|website-redesign|ux-design|google-ads|meta-ads}` |
| **Figma page** | `95:158` |
| **Desktop frame (1440)** | 95:159 (SEO) |
| **Mobile frame (390)** | 98:201 (SEO) |
| **Extra states / boards** | Page note 99:293 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Only the SEO version is drawn. The other four use the same template with their live copy. Their hero visuals are described in the page note and need sign-off.
- Keep each live SEO title and H1.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Note · Service detail template — /services/{service-slug} — node 99:293
PAGE NOTE · TEMPLATE
Service detail template — /services/{service-slug}
Pages using it
/services/seo (shown) · /services/website-redesign · /services/ux-design · /services/google-ads · /services/meta-ads. Website development stays on /services itself (it is the main service), so it does not get its own detail page.
URL safety
These are the live URLs and are indexed. Keep them, and keep each page’s live SEO title (e.g. "SEO Services for Small Business | South Africa | GoodGround").
Service visual per page (hero card)
SEO: foundations checklist (shown). Website redesign: before/after slider of a page (illustration). UX & design: wireframe → design card that morphs on load. Google Ads: an ad preview card + "calls from ads" style mini chart labelled as illustration. Meta Ads: phone feed with a sponsored post card. Same plum card size and motion pattern for all.
CMS fields
name, slug, seoTitle, metaDescription, h1, intro, keywordChips[], visualType, problems[3] {title, body, short, icon}, included[] {title, body, icon}, approach {bad[3], good[3]}, addOn {title, body, fromPrice, ctaIntent} (optional), relatedArticles[], faqs[], tag (Flagship / Growth / Design / Existing sites).
Structured data
Service JSON-LD (name, provider GoodGround, areaServed ZA, offers.price only when a "from" price exists), FAQPage, BreadcrumbList Home › Services › {name}.
Analytics
service_cta_click {slug, position}, addon_cta_click {slug}, faq_open {slug, index}, related_article_click {slug, article}.

### Note · Hero + foundations card — node 99:229
SECTION 00–01
Layout
Light header, centre pill breadcrumb "SERVICES / {SERVICE}" ("Services" → /services). Left: tag, Oswald H1 (keep the live H1 wording per service), intro (first paragraph of the live copy), keyword chips, buttons. Right: a plum "service visual" card. For SEO it is the foundations checklist. Each service has its own visual (see page note). Mobile: chips scroll sideways, card drops under the buttons and shows 3 rows.
Motion
HEADER REVEAL → tag FADE-UP → H1 LINE MASK (90ms per line) → intro FADE-UP (300ms) → chips STAGGER 40ms → buttons (560ms). Card rises 48px + fades (motion/xl, delay 300). Rows build top to bottom (80ms stagger); each coral tick pops in after its row (scale 0→1, ease/back, 240ms).
Links
Start your project → /start-project?ref=service-seo. See pricing → /pricing. Keyword chips are labels, not links.
Reduced motion
Final state, 200ms opacity fade only.

### Note · Problems — node 99:240
SECTION 02
Content
Exactly 3 problems per service from the CMS (live copy). Number in Oswald coral + icon chip.
Motion
Header FADE-UP; cards STAGGER GRID 120ms. The number wipes up from a mask (LINE MASK, motion/md).
Mobile
Stacked rows, number left of the text, descriptions shortened (CMS field problems[].short).

### Note · What’s included — node 99:249
SECTION 03
Content
The live list (9 items for SEO; count varies per service, lay out in 3 columns, last row left-aligned). "See it alongside every other service" → /services#compare (comparison table on the Services page).
Motion
STAGGER GRID 50ms, row by row. Icon chips use the tint rotation mint → lilac → blush.
Mobile
Simple list with mint ticks. First 5 visible, then a "Show all 9" row that expands the rest (height animates grid-template-rows 0fr→1fr, motion/md). Label changes to "Show less".

### Note · How we do it + add-on band — node 99:258
SECTION 04
Content
Dark band. Two columns built from the long live paragraph: "Bolted on after launch" (muted, x icons) vs "Built in from day one" (white card, mint ticks). Then the coral add-on band: "Advanced SEO and site speed optimisation, as standalone add-ons", from R3,000, confirmed in a quote (live price, keep the "from" and "confirmed in a quote" wording).
Links
"Ask for an SEO audit" → /start-project?intent=seo-audit&ref=service-seo.
Motion
Left column FADE-UP, then the white card slides in from 32px right (motion/lg, ease/out). Ticks draw in (stroke-dashoffset, 200ms, 80ms stagger). Add-on band FADE-UP; price does not COUNT-UP (it is a "from" price, keep it calm).
Per service
Not every service has an add-on. Hide the band when service.addOn is empty.

### Note · Related reading — node 99:269
SECTION 05
Content
1 article (or up to 2) tagged with this service in the CMS; uses the Article cover component. Hide the section if none. Live SEO example → /insights/biggest-website-mistakes-south-african-smes-make.
Motion
LINKED CARD (whole card is one link; hover lift -4px, cover zooms 1.03 over motion/md).

### Note · Service FAQ — node 99:276
SECTION 06
Behaviour
Same accordion as everywhere: one open at a time, first open by default, numbered questions. FAQPage JSON-LD from the same data. "All FAQs" → /faq.

### Note · Pairs well with — node 99:281
SECTION 07
Content
All other services except the current one, Website development first (plum). Links: Website development → /services#website-development (it lives on the Services page), Website redesign → /services/website-redesign, UX & design → /services/ux-design, SEO → /services/seo, Google Ads → /services/google-ads, Meta Ads → /services/meta-ads.
Motion
STAGGER 60ms. Hover: card lifts, arrow chip turns coral and rotates 45°. Mobile: list rows with chevrons.

### Note · CTA + footer — node 99:288
SECTION 08–09
Shared gradient CTA card and footer. Start your project → /start-project?ref=service-{slug}.

### Note · Mobile differences — node 99:308
MOBILE
Changes
Hero visual shows 3 rows. Problems shortened. Included list collapses after 5 with "Show all". Approach shows only the "Built in" card. Add-on band stacks with full-width button. Related article loses its cover image. Other services become rows with chevrons.
Touch
All tap targets at least 44px; no hover-only content.

> Build notes:
> - FAQ answers 02–05 are not drawn. Take them from the live /services/seo page.
> - The hero visuals for redesign, UX, Google Ads and Meta Ads are described in the page note only. Build them in the same 440×506 plum card shell (pad 28, r 32, peach Oswald 13 kicker + mint pill, SemiBold 26 title) and show them to the user for sign-off before shipping.
> - "Pairs well with" excludes the current service. On the SEO page that means 5 cards (Website development, Website redesign, UX & design, Google Ads, Meta Ads).

## Layer-by-layer spec

### Service — Desktop (1440) · SEO — node 95:159 (1440×5767)
- **Service — Desktop (1440) · SEO** (col, 1440×5767, bg canvas)
  - **00 · Site header (light variant)** (row, pad 28/40/28/40, align space_between/center, 1440×107): logo pill (row, pad 10/20/10/20, 167×51, bg ink, r 999) T "goodground" — IBM Plex Sans SemiBold 24 ls -3%, surface · breadcrumb pill (row, pad 12/20/12/20, 132×44, bg surface, r 999, border line 1) T "SERVICES  /  SEO" — Oswald Medium 12 ls 6%, ink · MENU pill (row gap 10, pad 10/20/10/20, 106×44, bg ink, r 999) T "MENU" — Oswald SemiBold 16 ls 2%, surface + icon menu 18px
  - **01 · Hero + foundations card** (col gap 48, pad 48/120/120/120, 1440×792, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×624)
      - **Frame** (col gap 24, 696 wide, w:fill, grow)
        - ⧉ Tag Tone=Coral "WHAT WE DO"
        - T "SEO SERVICES FOR SMALL BUSINESSES ACROSS SOUTH AFRICA." — Oswald Medium 88/92%, ink
        - T "A gorgeous website nobody can find on Google isn’t an investment. It’s a cost. Every GoodGround site is built on solid technical SEO from day one: fast load times, proper page structure, and content built around how your customers actually search." — IBM Plex Sans Regular 18/155%, muted
        - **Keyword chips** (row gap 8): chips (row, pad 8/14/8/14, bg surface, r 99, border line 1) T — IBM Plex Sans Medium 14, ink — "Local SEO" · "Technical SEO" · "SEO for small business" · "Local SEO South Africa"
        - **Frame** (row gap 12): ⧉ Button Style=Coral "Start your project" (206×52) · ⧉ Button Style=Outline "See pricing" (164×54)
      - **Visual · SEO foundations checklist (illustration)** (col gap 14, pad 28, 440×506, bg plum, r 32, shadow 0 40 70 #2E1747@30%)
        - **Frame** (row, align space_between/center): T "SEO FOUNDATIONS" — Oswald Medium 13 ls 8%, peach · pill (row, pad 5/10/5/10, bg mint, r 99) T "Included in every build" — IBM Plex Sans SemiBold 11, ink
        - T "Built in from the first line of code." — IBM Plex Sans SemiBold 26/118% ls -1%, surface
        - 5 rows (row gap 12, pad 12/14/12/14, align center, 384×56, w:fill, bg #FFFFFF @7%, r 16): **Frame** (32×32, bg plumDeep, r 10) → icon 16px · T — IBM Plex Sans Medium 15, surface (grow) · tick (24×24, bg coral, r 999) → icon check 12px
          - bolt "Fast load times" · layers "Page structure Google can read" · pin "Local SEO, town by town" · chart "Analytics + Search Console" · code "Schema markup"
  - **02 · Problems** (col gap 48, pad 120, 1440×747, w:fill, bg surface)
    - **Section header** (row, align space_between/max (bottom)): **Frame** (col gap 20, 760 wide): ⧉ Tag Tone=Neutral "WHY IT MATTERS" · T "Most SEO problems aren’t exotic." — IBM Plex Sans SemiBold 56/106% ls -3%, ink — side T "They’re ordinary things done wrong or skipped entirely. Fixing the ordinary things properly does more for most small businesses than any exotic tactic." — IBM Plex Sans Regular 17/155%, muted
    - **Frame** (row gap 20): 3 cards (col gap 14, pad 28, 387×289, w:fill, h:fill, grow, bg canvas, r 28): **Frame** (row, align space_between/center): T "0n" — Oswald Medium 40, coral + chip (44×44, bg surface, r 12) → icon 22px · T title — IBM Plex Sans SemiBold 22/122% ls -1%, ink · T body — IBM Plex Sans Regular 15/155%, muted
      - 01 search "The site is invisible for the exact searches that matter" / "A business with no local SEO can lose the customer to a competitor with a worse product and a better-structured website, simply because Google could read one site and not the other."
      - 02 bolt "Technical debt quietly caps how high you can rank" / "Slow load times and messy page structure hold a site back no matter how good the content is. No amount of extra content fixes a technical ceiling."
      - 03 layers "SEO gets bolted on after launch, badly" / "A site built first and optimised later usually needs a second project just to fix what should have been right from the start."
  - **03 · What’s included** (col gap 48, pad 120, 1440×853, w:fill, bg canvas)
    - **Section header** (row, align space_between/max): **Frame** (col gap 20, 720 wide): ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Nine things every GoodGround site gets right." — IBM Plex Sans SemiBold 56/106% ls -3%, ink — link (row gap 8): T "See it alongside every other service" — IBM Plex Sans SemiBold 15, ink + icon arrowUR 16px
    - **Included grid 3×3** (col gap 16; rows row gap 16): cards (row gap 16, pad 24, 389×121, w:fill, h:fill, grow, bg surface, r 24, border line 1): chip (44×44, r 12) → icon 22px · **Frame** (col gap 6, grow): T — IBM Plex Sans SemiBold 18 ls -1%, ink + T — IBM Plex Sans Regular 14/150%, muted
      - Row 1: mint bolt "Fast load times" / "Built in from the first line of code, not optimised in afterward." · lilac layers "Readable page structure" / "Proper headings search engines can actually read." · blush pin "Local SEO" / "For South African search, town by town."
      - Row 2: lilac users "Content around real searches" / "How your customers search, not how you’d describe the business internally." · blush chart "Analytics + Search Console" / "Set up correctly from launch." · mint link "Clean URLs + XML sitemap" / "So Google can find and understand every page."
      - Row 3: blush code "Structured data" / "Schema that describes your business correctly to search engines." · mint image "Alt text + compression" / "Pages stay fast and accessible without losing useful context." · lilac share "Internal linking" / "Authority and relevance flow through the site."
  - **04 · Built in, not bolted on** (col gap 48, pad 120, 1440×928, w:fill, bg plumDeep)
    - **Section header**: **Frame** (col gap 20, 820 wide): ⧉ Tag Tone=OnDark "HOW WE DO IT" · T "The same people who build the site think about how it ranks." — IBM Plex Sans SemiBold 56/106% ls -3%, surface
    - **Frame** (row gap 20)
      - **Bolted on** (col gap 14, pad 32, 591×233, w:fill, h:fill, grow, bg #FFFFFF @6%, r 28, border #FFFFFF @14% 1): T "BOLTED ON AFTER LAUNCH" — Oswald Medium 14 ls 8%, onDarkMuted · rows (row gap 12): chip (28×28, bg #FFFFFF @10%, r 999) icon x 14px + T — IBM Plex Sans Regular 16/150%, onDarkMuted — "A developer who doesn’t understand your site applies a generic checklist" · "Structure gets fixed after Google has already indexed it" · "Changing it means starting the ranking clock over"
      - **Built in** (col gap 14, pad 32, 589×233, w:fill, h:fill, grow, bg surface, r 28): T "BUILT IN FROM DAY ONE" — Oswald Medium 14 ls 8%, coral · rows (row gap 12): chip (28×28, bg mint, r 999) icon check 14px + T — IBM Plex Sans Regular 16/150%, ink — "SEO decisions get made during the build, when they’re cheapest" · "Every recommendation is grounded in how the site is actually built" · "No second project needed to fix what should have been right"
    - **Add-on band** (row gap 32, pad 28/32/28/40, align center, 1200×191, w:fill, bg coral, r 28)
      - **Frame** (col gap 6, w:fill, grow): T "ALREADY HAVE A SITE?" — Oswald Medium 13 ls 8%, surface · T "Advanced SEO and site speed optimisation, as standalone add-ons." — IBM Plex Sans SemiBold 24/120% ls -1%, surface · T "Keyword research, schema markup and meta strategy. We audit the site first, so the quote reflects what it actually needs." — IBM Plex Sans Regular 15/150%, surface
      - **Price** (col gap 2): T "FROM" — Oswald Medium 12 ls 8%, surface · T "R3,000" — Oswald Medium 56/100%, surface · T "confirmed in a quote" — IBM Plex Sans Regular 12, surface
      - ⧉ Button Style=Light "Ask for an SEO audit" (226×52)
  - **05 · Related reading** (col gap 48, pad 120/120/60/120, 1440×502, w:fill, bg canvas)
    - **Frame** (row gap 56, align center)
      - **Frame** (col gap 16, 420 wide): ⧉ Tag Tone=Neutral "RELATED READING" · T "Before you spend a rand on SEO, read this." — IBM Plex Sans SemiBold 40/110% ls -2%, ink · ⧉ Button Style=Outline "All insights"
      - **Article card (LINKED CARD)** (row, 724×322, w:fill, grow, bg surface, r 28, border line 1, clip)
        - ⧉ Article cover Topic=Websites "WEBSITES" (300×320)
        - **Frame** (col gap 12, pad 32, align center (vertical), w:fill, h:fill, grow): ⧉ Tag Tone=Plum "WEBSITES" · T "The biggest website mistakes South African SMEs make (and how to fix them)" — IBM Plex Sans SemiBold 22/125% ls -1%, ink · T "Most small business websites don’t fail because they look bad. They fail for duller reasons: nobody can find them, they’re slow on a phone, and they never ask anyone to do anything." — IBM Plex Sans Regular 14/155%, muted · link (row gap 8): T "Read the article" — IBM Plex Sans SemiBold 14, ink + icon arrowUR 16px
  - **06 · Service FAQ** (col gap 48, pad 60/120/120/120, 1440×788, w:fill, bg canvas)
    - **Frame** (row gap 80)
      - **Frame** (col gap 20, 420 wide): ⧉ Tag Tone=Neutral "FAQ" · T "Questions about SEO." — IBM Plex Sans SemiBold 48/106% ls -3%, ink · T "More answers on the FAQ page." — IBM Plex Sans Regular 16, muted · ⧉ Button Style=Outline "All FAQs"
      - **Accordion** (col gap 12, 700 wide, grow) — numbered variant on a canvas section: items (col gap 12, pad 24/28/24/28, w:fill, r 22): **Frame** (row gap 16, align center): T "0n" — Oswald Medium 18, coral · T question — IBM Plex Sans SemiBold 19 ls -1% (grow) · chip 36×36 r 999 → icon 18px
        - Open (bg lilac, question plum, chip plum + minus): 01 "Do you offer SEO as a standalone service, or only with a new website?" — answer "SEO foundations come standard with every website we build. If you already have a site, Advanced SEO and site speed optimisation are available as standalone add-ons, from R3,000 and confirmed in a quote. We audit the existing site first so the quote reflects what it actually needs." — IBM Plex Sans Regular 16/155%, muted
        - Closed (bg surface, question ink, chip canvas + plus): 02 "How long does SEO take to show results?" · 03 "Do you do local SEO for my town specifically?" · 04 "What’s the difference between SEO foundations and Advanced SEO?" · 05 "Can you fix SEO on a site you didn’t build?"
  - **07 · Other services** (col gap 48, pad 96/120/96/120, 1440×446, w:fill, bg surface)
    - **Frame** (row, align space_between/center): T "Pairs well with" — IBM Plex Sans SemiBold 40 ls -2%, ink · ⧉ Button Style=Outline "View every service"
    - **Frame** (row gap 16): 5 cards (col gap 28, pad 22, 227×152, w:fill, h:fill, grow, r 22): **Frame** (row, align space_between/center): T tag — Oswald Medium 11 ls 8% + arrow chip (32×32, r 999) → icon arrowUR 16px · T name — IBM Plex Sans SemiBold 20/120% ls -1%
      - bg plum, tag peach, chip coral, name surface: "FLAGSHIP" / "Website development"
      - bg canvas, tag muted, chip surface, name ink: "EXISTING SITES" / "Website redesign" · "DESIGN" / "UX & design" · "GROWTH" / "Google Ads" · "GROWTH" / "Meta Ads"
  - **08 · CTA** (col gap 48, pad 0/120/40/120, 1440×480, w:fill, bg surface)
    - **Gradient CTA card** (col gap 28, pad 96/80/96/80, align center, 1200×440, w:fill, bg gradient(#3B1A4A 0%, #9A3348 40%, #C9583D 70%, #5A1E3C 100%), r 40): ⧉ Tag Tone=OnDark "GET IN TOUCH" · T "GROWTH STARTS HERE." — Oswald Medium 120/92%, surface · **Frame** (row gap 12): ⧉ Button Style=Light "Start your project" + email pill (row gap 8, pad 14/20/14/20, bg #FFFFFF @12%, r 99) icon mail 18px + T "hello@goodground.co.za" — IBM Plex Sans Medium 16, surface
  - **09 · Footer** — simplified one-row footer in this frame; build the shared desktop footer (see README).

### Service — Mobile (390) · SEO — node 98:201 (390×5082)
- **Service — Mobile (390) · SEO** (col, 390×5082, bg canvas)
  - **00 · Header** — shared mobile header (logo pill 138×42 + MENU pill 89×41, pad 16)
  - **01 · Hero** (col gap 20, pad 16/20/48/20, 390×976, w:fill, bg canvas)
    - **Breadcrumb** (row gap 6): T "Services  /" — IBM Plex Sans Regular 12, muted · T "SEO" — IBM Plex Sans Medium 12, ink
    - ⧉ Tag Tone=Coral "WHAT WE DO"
    - T "SEO SERVICES FOR SMALL BUSINESSES ACROSS SOUTH AFRICA." — Oswald Medium 48/94%, ink
    - T "A gorgeous website nobody can find on Google isn’t an investment. It’s a cost. Every GoodGround site is built on solid technical SEO from day one." — IBM Plex Sans Regular 16/155%, muted
    - **Keyword chips (h-scroll)** (row gap 8, clip): (pad 7/12/7/12) T — IBM Plex Sans Medium 13 — "Local SEO" · "Technical SEO" · "SEO for small business" (+ the 4th scrolls in)
    - ⧉ Button Style=Coral "Start your project" (w:fill) · ⧉ Button Style=Outline "See pricing" (w:fill)
    - **Foundations card (compact)** (col gap 10, pad 20/18/20/18, 350×262, w:fill, bg plum, r 24): T "SEO FOUNDATIONS · INCLUDED" — Oswald Medium 11 ls 8%, peach · T "Built in from the first line of code." — IBM Plex Sans SemiBold 20/110% ls -2%, surface · 3 rows (row gap 10, pad 10/12/10/12, 48 tall, bg #FFFFFF @7%, r 14): chip 28×28 plumDeep r 8 → icon 14px · T — IBM Plex Sans Medium 14, surface · tick 22×22 coral → check 11px — "Fast load times" · "Readable page structure" · "Local SEO, town by town"
  - **02 · Problems** (col gap 12, pad 64/20/64/20, 390×644, bg surface)
    - ⧉ Tag Tone=Neutral "WHY IT MATTERS" · T "Most SEO problems aren’t exotic." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - 3 rows (row gap 14, pad 18, 350×122, bg canvas, r 20): T "0n" — Oswald Medium 26, coral · **Frame** (col gap 4, grow): T — IBM Plex Sans SemiBold 16/130%, ink + T — IBM Plex Sans Regular 13/150%, muted
      - "The site is invisible for the searches that matter" / "A competitor with a worse product and a better-structured site gets the customer."
      - "Technical debt caps how high you can rank" / "No amount of extra content fixes a technical ceiling."
      - "SEO gets bolted on after launch, badly" / "Usually a second project just to fix what should have been right."
  - **03 · What’s included** (col gap 10, pad 64/20/64/20, 390×572, bg canvas)
    - ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Nine things every site gets right." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Included list** (col, 350 wide, bg surface, r 20, border line 1, clip): rows (row gap 12, pad 14/16/14/16, 54–55 tall, border-top line 1 except first): tick (26×26, bg mint, r 999) icon check 13px + T — IBM Plex Sans Medium 15, ink — "Fast load times" · "Readable page structure" · "Local SEO, town by town" · "Content around real searches" · "Analytics + Search Console" · (4 hidden) · **Show all row** (row gap 6, pad 14/0/14/0, align center/center, 46 tall, bg canvas): T "Show all 9" — IBM Plex Sans SemiBold 14, ink + icon plus 14px
  - **04 · Built in, not bolted on** (col gap 14, pad 64/20/64/20, 390×694, bg plumDeep)
    - ⧉ Tag Tone=OnDark "HOW WE DO IT" · T "The same people who build the site think about how it ranks." — IBM Plex Sans SemiBold 28/110% ls -2%, surface
    - **Built-in card** (col gap 10, pad 18, bg surface, r 20): T "BUILT IN FROM DAY ONE" — Oswald Medium 12 ls 8%, coral · rows (row gap 10): tick 22×22 mint → check 11px + T — IBM Plex Sans Regular 14/145%, ink — "Decisions made during the build, when they’re cheapest" · "Grounded in how the site is actually built" · "No second project to fix it later"
    - **Add-on** (col gap 8, pad 20/18/20/18, bg coral, r 20): T "ALREADY HAVE A SITE?" — Oswald Medium 12 ls 8%, surface · T "Advanced SEO + site speed add-ons" — IBM Plex Sans SemiBold 19/120%, surface · **Frame** (row gap 8, align baseline): T "from" — IBM Plex Sans Regular 13 + T "R3,000" — Oswald Medium 36, surface · ⧉ Button Style=Light "Ask for an SEO audit" (w:fill)
  - **05 · Related reading** (col gap 14, pad 64/20/32/20, bg canvas)
    - ⧉ Tag Tone=Neutral "RELATED READING"
    - **Card** (col gap 10, pad 18, bg surface, r 20, border line 1, no cover): ⧉ Tag Tone=Plum "WEBSITES" · T "The biggest website mistakes South African SMEs make (and how to fix them)" — IBM Plex Sans SemiBold 18/128%, ink · link T "Read the article" — IBM Plex Sans SemiBold 13 + icon arrowUR 14px
  - **06 · FAQ** (col gap 10, pad 32/20/64/20, bg canvas)
    - ⧉ Tag Tone=Neutral "FAQ" · T "Questions about SEO." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - Items (col gap 10, pad 18, r 18): **Frame** (row gap 12): T — IBM Plex Sans SemiBold 15/135% + chip 30×30 → icon 15px (no numbers on mobile)
      - Open (lilac, plum, chip plum minus): "Do you offer SEO as a standalone service, or only with a new website?" — "SEO foundations come standard with every build. For existing sites, Advanced SEO and speed optimisation are add-ons from R3,000, confirmed in a quote." — IBM Plex Sans Regular 14/155%, muted
      - Closed (surface, ink, chip canvas plus): "How long does SEO take to show results?" · "Do you do local SEO for my town specifically?" · "What’s the difference between foundations and Advanced SEO?" · "Can you fix SEO on a site you didn’t build?"
    - ⧉ Button Style=Outline "All FAQs" (w:fill)
  - **07 · Other services** (col gap 10, pad 56/20/56/20, bg surface)
    - T "Pairs well with" — IBM Plex Sans SemiBold 26/110% ls -2%, ink
    - Rows (row, pad 16/14/16/18, align space_between/center, 350×52, bg canvas, r 16): T — IBM Plex Sans Medium 15, ink + icon chev 18px — "Website development" · "Website redesign" · "UX & design" · "Google Ads" · "Meta Ads"
  - **08 · CTA** (col gap 20, pad 0/20/24/20, bg surface)
    - **Gradient card** (col gap 18, pad 48/24/48/24, 350×445, r 28, same gradient): ⧉ Tag Tone=OnDark "GET IN TOUCH" · T "GROWTH STARTS HERE." — Oswald Medium 60/92%, surface · ⧉ Button Style=Light "Start your project" (w:fill) · email pill (pad 14/0/14/0, w:fill, bg #FFFFFF @12%, r 99) icon mail 16px + T "hello@goodground.co.za" — IBM Plex Sans Medium 15, surface
  - **09 · Footer** — simplified here; build the shared mobile footer.



---

# Industry template

| | |
|---|---|
| **URL** | `/services/{trades-and-home-services|health-and-wellness|hospitality-and-food|retail-and-small-brands|professional-and-consulting|non-profits-and-community}` |
| **Figma page** | `86:150` |
| **Desktop frame (1440)** | 86:151 (Trades) |
| **Mobile frame (390)** | 90:198 (Trades) |
| **Extra states / boards** | Page note 91:326 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Only Trades & home services is drawn. The other five use the same template and their live copy, chips, towns and FAQs.
- Honest proof section switches to project cards when the industry has published case studies.
- Mobile has a sticky action bar; leave 96px under the footer.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Note · Industry page template — /services/{industry-slug} — node 91:326
PAGE NOTE · TEMPLATE
Industry page template — /services/{industry-slug}
URL (important)
The live site already serves industry pages at /services/{industry-slug}, e.g. /services/trades-and-home-services. Keep these URLs (they are indexed). Earlier notes that said /industries/{slug} have been updated to this pattern.
Industries using this template
trades-and-home-services · health-and-wellness · hospitality-and-food · retail-and-small-brands · professional-and-consulting · non-profits-and-community
CMS fields per industry
name, slug, seoTitle (keep the live one, e.g. "Website Design for Electricians & Plumbers | GoodGround"), metaDescription, h1, intro, tradeChips[] (3–6), mockup {businessName, headline, badge, areas[]}, journey[3] {title, body}, problems[3] {title, problem, fix, icon}, localSearch {heading, body, query, towns[]}, flagshipChecklist[5], includedServices[4] (reference to service entries), faqs[4–6], caseStudies (auto: published work items tagged with this industry).
Structured data
Service JSON-LD (serviceType "Website design", provider GoodGround, areaServed South Africa), FAQPage from faqs, BreadcrumbList Home › Services › {name}.
States
A) No case studies → honesty card (05). B) 1+ case studies → project cards. Mockups (hero phone, search card) are always labelled as illustrations in alt text: "Illustration of a trades website on a phone".
Analytics
Fire industry_cta_click {slug, position: hero|cta|sticky} on Start your project clicks; faq_open {slug, index}; service_card_click {slug, service}.
Mobile only
Sticky action bar (Start your project + Email) slides up from the bottom once the hero CTA scrolls out of view (translateY 120%→0, motion/md, ease/out); hides when the CTA card is in view and on scroll down faster than 1200px/s; respects iOS safe-area inset.

### Note · Hero with phone mock — node 91:243
SECTION 00–01 · HEADER + HERO
Layout
Light header variant (canvas bg). Centre pill = breadcrumb "SERVICES / {INDUSTRY NAME}" — "Services" links to /services. Hero: 2 columns (text fills, phone mock 340 wide). Mobile: breadcrumb text row above the tag, phone mock becomes a compact flat card under the buttons.
Motion on load
HEADER REVEAL then: tag FADE-UP (motion/sm, delay 0). H1 LINE MASK per line (motion/lg, ease/out, 90ms stagger between lines). Intro FADE-UP delay 300. Trade chips STAGGER (40ms each, from 420). Buttons FADE-UP delay 560. Phone mock: rises 48px + fades in (motion/xl, ease/out, delay 300); inside the screen the rows build top to bottom (80ms stagger), then the stars fill left to right (60ms each) and "Call now" pulses once (scale 1→1.04→1, ease/back, 400ms).
Interaction
Trade chips are not links (decorative labels of who it is for). Desktop hover on phone mock: tilts max 4° toward the cursor (rotateX/Y with perspective 1200px, lerp 0.12), resets on leave; disabled on touch and reduced motion. Primary CTA → /start-project?ref=industry-trades-and-home-services. "See pricing" → /pricing.
Mobile
Trade chip row scrolls horizontally (overflow-x:auto, scroll-snap x proximity, no visible scrollbar, 20px right fade mask). Buttons full width.
Reduced motion
Everything appears in its final state with a 200ms opacity fade only. No tilt, no pulse.

### Note · The moment that decides the job — node 91:256
SECTION 02
Layout
Three step cards in a row with arrow chips between; the third (the outcome) is plum. Mobile: vertical stack, icon left.
Motion
On enter (IntersectionObserver, threshold 0.3): cards STAGGER from left (120ms gap, FADE-UP 24px). Arrow chips draw in after the card before them: scaleX 0→1 from left, motion/sm. The plum card lands last and its icon chip pops (scale 0.6→1, ease/back, 360ms). Mobile: same order, top to bottom.
Interaction
None (not links). No hover state, so no pointer cursor.

### Note · Problems we fix — node 91:265
SECTION 03
Layout
Each row = problem (white, left) + fix (mint, right) in one rounded card. Mobile: fix becomes a mint footer strip under the problem.
Motion
Header FADE-UP. Each row on enter: problem half FADE-UP, then the mint half wipes in from the left (clip-path inset(0 100% 0 0) → inset(0 0 0 0), motion/md, ease/out, 160ms after). Number "01/02/03" COUNT-UP is not used: it is a label. Rows enter one by one as they scroll in, not as a group.
Interaction
Static. Copy per industry comes from the CMS problems[] list (exactly 3).

### Note · Built for local search — node 91:274
SECTION 04
Layout
Dark plumDeep band. Left: copy + service-area chips (example towns — the template pulls the industry’s example towns from the CMS; for trades: Garden Route towns). Right: illustrated search results card with a caption that it is an illustration, not a ranking promise. Keep that caption on every industry.
Motion (GSAP, scroll-linked)
When the card reaches 60% of the viewport: the query types itself into the search field ("plumber in george", 45ms per character, blinking coral caret 1s steps). After typing, the three results drop in (STAGGER 100ms, 16px). Then the highlighted result gets its lilac fill (background fade 240ms) and the two others dim to 55% opacity. Plays once; does not reverse on scroll up.
Area chips
STAGGER in (40ms). Hover (desktop): border goes to 40% white, pin icon nudges up 2px. Not links.
Reduced motion
Show the final state: full query, results visible, no typing.

### Note · Honest proof (no live project yet) — node 91:285
SECTION 05
Rule
If the industry has 0 published case studies, show this blush honesty card. If it has 1 or more, replace the whole card with LINKED CARD(s) from /work filtered by this industry (same component as the work listing), heading "Recent trades projects". Never show a placeholder or fake project.
Copy
"We haven’t published a live {industry} project yet." Body and buttons as shown. "Ask what we’re working on" → /contact?topic=work-in-progress&ref=industry-{slug}. "See all our work" → /work.
Motion
Card FADE-UP; eye icon blinks once when it enters (scaleY 1→0.1→1 over 260ms).

### Note · What’s included (bento) — node 91:294
SECTION 06
Layout
Bento: flagship plum card (left, full height, with a 5-item checklist specific to the industry) + SEO (mint) + Full Service (lilac) + Google Ads (white). Every card is a LINKED CARD → /services#website-development, /services/seo, /services#full-service, /services/google-ads (live links: development and full service live on the Services page; SEO and Google Ads have their own detail pages). Mobile: single column, checklist hidden on the flagship card to keep it short.
Motion
STAGGER GRID (flagship first, then 02, 03, 04; 90ms). Checklist rows tick in one by one after the flagship lands (check icon draws via stroke-dashoffset, 200ms each, 70ms stagger).
Interaction
LINKED CARD hover: lift -4px, shadow grows, arrow moves 3px up-right; whole card clickable (one <a>, with the title as its accessible name). Focus ring 2px coral, offset 3px.

### Note · Payment band — node 91:303
SECTION 07
Content
Same copy on every industry page: one fixed price, Option A 50/50, Option B 12 monthly instalments. "See pricing" → /pricing, "View every service" → /services.
Motion
Band FADE-UP. "50 / 50" and "12×" use LINE MASK (motion/md). No COUNT-UP (these are not quantities).

### Note · Industry FAQ — node 91:310
SECTION 08
Behaviour
Accordion, only one item open at a time (confirmed rule). First item open by default. Open item: lilac background, plum text, minus icon in a plum circle. Height animates with grid-template-rows 0fr→1fr (motion/md, ease/in-out); the icon rotates 180° while switching plus→minus.
Content + SEO
4–6 questions per industry from the CMS. Output FAQPage JSON-LD from the same data. "All FAQs" → /faq.
A11y
Each question is a <button aria-expanded aria-controls>. Answers stay in the DOM (hidden attr when closed) so search engines can read them.

### Note · CTA + footer — node 91:319
SECTION 09–10
CTA
Gradient card (shared component). "Start your project" → /start-project?ref=industry-trades-and-home-services (the start-project page shows "Trades & home services" as the selected industry when ref starts with industry-). Email pill → mailto:hello@goodground.co.za. Headline LINE MASK; gradient drifts slowly (background-position 0→100% over 18s, alternate; paused when off-screen and with Pause motion).
Footer
Shared footer.

### Note · Mobile differences — node 91:343
MOBILE
Spacing
20px side padding, sections 64px top/bottom, H2 34px, display H1 52px Oswald.
Changes vs desktop
Phone mock → compact flat card. Journey → vertical list. Problem rows → stacked card with mint fix strip. Search mock shows 2 results. Bento → single column, no checklist. Payment options side by side under the heading. CTA headline 60px.
Sticky bar
Dark pill pinned 20px from the bottom (shown here at the bottom of the frame). Behaviour in the page note.
Touch
All tap targets at least 44px. No hover-only content.

> Build note: the industry FAQ answers 2–4 are on the live trades page ("Yes, contact/quote form + tap-to-call"; "Yes"; "No — builders, roofers, painters, landscapers and most home-service businesses"). Use the live wording.

## Layer-by-layer spec

### Industry — Desktop (1440) · Trades & home services — node 86:151 (1440×6671)
- **Industry — Desktop (1440)** (col, 1440×6671, bg canvas)
  - **00 · Site header (light variant)** — shared; breadcrumb pill T "SERVICES  /  TRADES & HOME SERVICES" (252×44)
  - **01 · Hero + phone mock** (col gap 48, pad 48/120/120/120, 1440×820, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×652, w:fill)
      - **Frame** (col gap 24, 796×652, w:fill, grow)
        - ⧉ Tag Tone=Coral "WHO WE BUILD FOR"
        - T "WEBSITES FOR ELECTRICIANS, PLUMBERS AND BUILDERS." — Oswald Medium 96/92%, ink
        - T "A homeowner comparing three quotes will look you up before they call. If all they find is a Facebook page that hasn’t posted since last winter, you’ve already lost ground. We build websites for tradespeople that make the case for you before the phone rings." — IBM Plex Sans Regular 18/155%, muted
        - **Trade chips** (row gap 8): chips (row, pad 8/14/8/14, bg surface, r 99, border line 1) T — IBM Plex Sans Medium 14, ink: "Electricians" · "Plumbers" · "Builders" · "Contractors" · "Handymen"
        - **Frame** (row gap 12): ⧉ Button Style=Coral "Start your project" · ⧉ Button Style=Outline "See pricing"
      - **Mock · trades site on a phone (illustration)** (col, pad 12, 340×483, bg ink (device bezel), r 44, shadow 0 40 70 #2E1747@30%)
        - **Screen** (col gap 12, pad 16, 316×459, w:fill, bg surface, r 34)
          - **Frame** (row, align space_between/center): T "Your Trade Co." — IBM Plex Sans SemiBold 15, ink · badge (row, pad 4/8/4/8, bg blush, r 99) T "24/7 emergencies" — IBM Plex Sans SemiBold 10, coral
          - T "Licensed plumbers in George & the Garden Route" — IBM Plex Sans SemiBold 22/115% ls -1%, ink
          - **Rating** (row gap 6, align center): icon star 14px ×5 (coral) + T "4.9 · 180 Google reviews" — IBM Plex Sans Regular 12, muted
          - **Areas** (row gap 6, pad 8/10/8/10, align center, w:fill, bg canvas, r 12): icon pin 14px + T "George · Wilderness · Mossel Bay · Knysna" — IBM Plex Sans Regular 12, ink
          - **Quote form** (col gap 8, pad 12, 284×207, w:fill, bg lilac, r 16): T "Request a callout" — IBM Plex Sans SemiBold 14, ink · 3 inputs (row, pad 8/10/8/10, h 32, w:fill, bg surface, r 10) T — IBM Plex Sans Regular 12, muted: "Your name" · "Phone number" · "What’s the problem?" · submit (row, pad 10/0/10/0, align center, w:fill, bg ink, r 99) T "Get my quote" — IBM Plex Sans SemiBold 13, surface
          - **Sticky call bar** (row gap 8, w:fill): 2 pills (row gap 6, pad 12/0/12/0, align center/center, w:fill, grow, r 99): coral + icon phone 14px + T "Call now" (surface) · mint + icon chat 14px + T "WhatsApp" (ink) — IBM Plex Sans SemiBold 13
  - **02 · The moment that decides the job** (col gap 48, pad 120, 1440×668, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "THE MOMENT THAT DECIDES THE JOB" · T "They look you up before they call." · side copy "Most people check out a tradesperson on their phone, standing in the kitchen or the driveway. That moment decides who gets the call."
    - **Journey** (row gap 16, align center, 1200×210) — 3 cards (col gap 12, pad 24, 355×210, w:fill, h:fill, grow, r 24) with arrow chips (36×36, bg canvas, r 999, icon arrowR 18px) between
      - Card: **Frame** (44×44, r 12) → icon 22px · T — IBM Plex Sans SemiBold 20 ls -1% · T — IBM Plex Sans Regular 14/150%
      - bg canvas, chip surface, icon quote: "Three quotes in hand" / "A homeowner has a problem and a few names."
      - bg canvas, icon search: "A quick search on their phone" / "“Plumber near me”, your name, your reviews."
      - bg plum, chip coral, icon phone, text surface / onDarkMuted: "They call the one that looks established" / "Clear services, real reviews, a number they can tap."
  - **03 · Problems we fix** (col gap 16, pad 120, 1440×1166, w:fill, bg canvas)
    - **Section header** (pad bottom 32): ⧉ Tag Tone=Neutral "WHAT USUALLY GOES WRONG" · T "Three ways trades lose jobs online, and how we fix each one."
    - **Problem row** (row, 1200 wide, w:fill, bg surface, r 28, border line 1, clip)
      - **Problem half** (col gap 12, pad 28/32/28/32, w:fill, grow): **Frame** (row gap 12, align center): T "0n" — Oswald Medium 28, coral + ⧉ Tag Tone=Coral "THE PROBLEM" · T title — IBM Plex Sans SemiBold 22 ls -1%, ink · T body — IBM Plex Sans Regular 15/155%, muted
      - **Fix half** (col gap 12, pad 28/32/28/32, w:fill, h:fill, grow, bg mint): **Frame** (row gap 12, align center): **Frame** (40×40, bg surface, r 12) → icon 20px + T "WHAT WE BUILD" — Oswald Medium 12 ls 6%, muted · T fix — IBM Plex Sans SemiBold 19/140% ls -1%, ink
      - 01 · icon search · "You’re the best in the area and nobody can tell" · "Word of mouth doesn’t show up in a Google search. If someone searches “electrician near me” and you’re not there, a competitor with a worse callout rate and a better website gets the job." · fix "Local SEO built around your services and every town you cover, so “plumber in George” has something real to find."
      - 02 · icon mobile · "Your current site doesn’t work on site" · "Most people check out a tradesperson from a phone. A site that isn’t built mobile-first loses them before they find your number." · fix "Mobile-first pages designed for one thumb: fast, clear, and your number never more than a tap away."
      - 03 · icon phone · "No easy way to actually get in touch" · "A buried contact form or a phone number nobody made tappable costs you jobs you never even hear about." · fix "Tap-to-call, a WhatsApp button and a callout or quote-request form on every page."
  - **04 · Built for local search** (col gap 48, pad 120, 1440×665, w:fill, bg plumDeep)
    - **Frame** (row gap 64, align center, 1200×425)
      - **Frame** (col gap 24, 576 wide, w:fill, grow)
        - ⧉ Tag Tone=OnDark "LOCAL SEARCH"
        - T "So “plumber in [your town]” has something real to find." — IBM Plex Sans SemiBold 52/106% ls -3%, surface
        - T "We build for tradespeople across South Africa: city electricians, coastal builders, rural contractors. Every site is built around the towns you actually work in, not just the one on your invoice." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Service-area chips (example)** (row wrap gap 8): chips (row gap 6, pad 8/14/8/14, align center, bg #FFFFFF @8%, r 99, border #FFFFFF @18% 1): icon pin 14px (peach) + T — IBM Plex Sans Medium 14, surface — "George" · "Wilderness" · "Mossel Bay" · "Knysna" · "Oudtshoorn" · "Plettenberg Bay"
      - **Mock · local search results (illustration)** (col gap 12, pad 24, 560×372, bg surface, r 28)
        - **Search field** (row gap 10, pad 14/16/14/16, align center, w:fill, bg canvas, r 99): icon search 18px (muted) · T "plumber in george" — IBM Plex Sans Regular 16, ink · caret rectangle 2×20 coral
        - **Result (highlighted)** (row gap 14, pad 14/16/14/16, align center, w:fill, bg lilac, r 18): **Frame** (col gap 4, w:fill, grow): T "Your Trade Co. · Plumbers in George" — IBM Plex Sans SemiBold 16, plum + **Frame** (row gap 4) icon star 12px ×5 (coral) + T "4.9 · Website · Open 24 hours" — IBM Plex Sans Regular 12, muted · **Call pill** (row, pad 6/10/6/10, bg coral, r 99) T "Call" — IBM Plex Sans SemiBold 12, surface
        - **Result (dimmed)** (row gap 14, pad 14/16/14/16, w:fill, bg surface, r 18, border line 1, opacity 55%): T — IBM Plex Sans SemiBold 16, ink + 3 muted stars + T — IBM Plex Sans Regular 12, muted
          - "Another plumbing business" "Facebook page · Last post 9 months ago" · "Garden Route plumbing directory" "Listing only · No website"
        - T "Illustration of the goal, not a ranking promise. Search results depend on Google." — IBM Plex Sans Regular 12, muted
  - **05 · Honest proof** (col gap 48, pad 120/120/60/120, 1440×460, w:fill, bg canvas)
    - **Honesty card** (row gap 48, pad 48/56/48/56, align center, 1200×280, w:fill, bg blush, r 32)
      - **Frame** (72×72, bg surface, r 999) → icon eye 36px (coral)
      - **Frame** (col gap 12, w:fill, grow): ⧉ Tag Tone=Coral "STRAIGHT ANSWER" · T "We haven’t published a live trades & home services project yet." — IBM Plex Sans SemiBold 34/115% ls -2%, ink · T "Get in touch and we’ll tell you honestly what we’re currently working on, and show you sites we’ve built in other industries." — IBM Plex Sans Regular 17/155%, muted
      - **Frame** (col gap 10): ⧉ Button Style=Primary "Ask what we’re working on" (271×52) · ⧉ Button Style=Outline "See all our work" (198×54)
  - **06 · What’s included** (col gap 48, pad 60/120/120/120, 1440×1106, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Everything a trades business needs to get found and called." · side copy "Each card links to the full service page."
    - **Bento** (row gap 20, 1200×708)
      - **Flagship card** (col gap 16, pad 32, 622×708, w:fill, h:fill, grow, bg plum, r 28)
        - **Top** (row, pad 0/0/12/0, align space_between/center): **Frame** (48×48, bg coral, r 14) icon code 24px · ⧉ Tag Tone=OnDark "FLAGSHIP"
        - spacer (grow)
        - **Included in every trades site** (col gap 10, w:fill) — rows (row gap 12, pad 12/16/12/16, align center, 558×44, w:fill, bg #FFFFFF @7%, r 14): check icon 18px (peach stroke) + T — IBM Plex Sans Medium 15, surface
          - "Service pages for each job you do" · "A page for every town you cover" · "Google reviews pulled onto the site" · "Callout and quote-request form" · "Tap-to-call and WhatsApp on every page"
        - T "01 · WEBSITE DEVELOPMENT" — Oswald Medium 14 ls 6%, peach
        - T "A website that works as hard as you do." — IBM Plex Sans SemiBold 34/115% ls -2%, surface
        - T "Mobile-first, fast, with your services, service area, reviews and a tap-to-call button on every page." — IBM Plex Sans Regular 15/155%, onDarkMuted
        - **Link** (row gap 8): T "View service" — IBM Plex Sans SemiBold 14, surface + icon arrowUR 16px
      - **Right column** (col gap 20, 558 wide, w:fill, grow)
        - **Row** (row gap 20, 558×357): 2 cards (col gap 16, pad 32, w:fill, h:fill, grow, r 28): **Top** (row, align space_between/center): **Frame** (48×48, bg canvas, r 14) → icon 24px + Tag · spacer (grow) · T kicker — Oswald Medium 14 ls 6%, coral · T title — IBM Plex Sans SemiBold 24/115% ls -2%, ink · T body — IBM Plex Sans Regular 15/155%, muted · link "View service" + icon arrowUR 16px (ink)
          - bg mint · icon trend · ⧉ Tag Tone=Neutral "INCLUDED" · "02 · SEO FOUNDATIONS" · "Found for the towns you work in." · "Service-area pages, Google Business Profile tune-up, local schema."
          - bg lilac · icon shield · ⧉ Tag Tone=Neutral "MONTHLY" · "03 · FULL SERVICE" · "We keep it running." · "Hosting, updates, backups and small content changes."
        - **Wide card** (col gap 16, pad 32, 558×331, w:fill, bg surface, r 28, border line 1): icon ads · ⧉ Tag Tone=Coral "GROWTH" · "04 · GOOGLE ADS" · "Show up first when the geyser bursts." · "Call-focused campaigns for emergency and high-value jobs, with a clear monthly report."
  - **07 · Payment band** (col gap 48, pad 0/120/120/120, 1440×350, w:fill, bg canvas)
    - **Payment band** (row, 1200×230, w:fill, bg surface, r 32, border line 1, clip)
      - **Frame** (col gap 12, pad 40/48/40/48, 600 wide): ⧉ Tag Tone=Plum "PRICING" · T "Every project is one fixed price." — IBM Plex Sans SemiBold 36/110% ls -2%, ink · **Frame** (row gap 12): ⧉ Button Style=Primary "See pricing" · ⧉ Button Style=Outline "View every service"
      - **Option tiles** (col gap 8, pad 40, align center, w:fill, h:fill, grow): T label — Oswald Medium 12 ls 6%, muted · T value — Oswald Medium 64/100%, ink · T — IBM Plex Sans Regular 14/150%, muted
        - bg lilac: "OPTION A" "50 / 50" "Deposit to start, the rest on completion."
        - bg blush: "OPTION B" "12×" "Spread it over 12 monthly instalments."
  - **08 · Trades FAQ** (col gap 48, pad 120, 1440×674, w:fill, bg surface)
    - **Frame** (row gap 80)
      - **Frame** (col gap 20, 420 wide): ⧉ Tag Tone=Neutral "QUESTIONS FROM TRADES" · T "Things tradespeople ask us." — IBM Plex Sans SemiBold 48/106% ls -3%, ink · T "More answers on the FAQ page." — IBM Plex Sans Regular 16, muted · ⧉ Button Style=Outline "All FAQs"
      - **Accordion** (col gap 12, 700 wide) — this page's accordion variant: open item bg lilac (question plum, chip bg plum + icon minus 18px white); closed items bg canvas (chip bg surface + icon plus 18px); pad 24/28/24/28, r 22; question IBM Plex Sans SemiBold 19 ls -1%
        - Open: "Can you show my service area instead of just one town?" — "Yes. We build the site and its SEO around every area you cover, with a page or section for each town so people searching there can find you." — IBM Plex Sans Regular 16/155%, muted
        - Closed: "Can people request a callout or quote directly from the site?" · "I already have some good reviews. Can they go on the site?" · "Do you only build for electricians and plumbers?"
  - **09 · CTA** (col gap 48, pad 0/120/40/120, 1440×531, w:fill, bg surface)
    - **Gradient CTA card** (col gap 28, pad 96/80/96/80, align center (centred variant), 1200×491, w:fill, bg gradient(#3B1A4A 0%, #9A3348 40%, #C9583D 70%, #5A1E3C 100%), r 40)
      - ⧉ Tag Tone=OnDark "READY WHEN YOU ARE"
      - T "GROWTH STARTS HERE." — Oswald Medium 120/92%, surface
      - T "Tell us about your trade and the towns you cover. We reply within 1–2 business days." — IBM Plex Sans Regular 18, onDarkMuted
      - **Frame** (row gap 12): ⧉ Button Style=Light "Start your project" · **Email pill** (row gap 8, pad 14/20/14/20, align center, bg #FFFFFF @12%, r 99): icon mail 18px + T "hello@goodground.co.za" — IBM Plex Sans Medium 16, surface
  - **10 · Footer** — this frame shows a simplified one-row footer (logo · "Work Services Pricing Insights About Contact Legal" · "© 2026 GoodGround · George, Garden Route"). Build the shared desktop footer instead (see the README).

### Industry — Mobile (390) · Trades & home services — node 90:198 (390×6931)
- **Industry — Mobile** (col, 390×6931, bg canvas)
  - **00 · Header** (row, pad 16, align space_between/center, 390×74): logo pill (row, pad 8/16/8/16, 138×42, bg ink, r 99) · MENU pill (row gap 8, pad 10/16/10/16, 89×41, bg ink, r 99) — the shared mobile header
  - **01 · Hero** (col gap 20, pad 16/20/40/20, 390×861, w:fill, bg canvas)
    - **Breadcrumb** (row gap 6): T "Services  /" — IBM Plex Sans Regular 12, muted · T "Trades & home services" — IBM Plex Sans Medium 12, ink
    - ⧉ Tag Tone=Coral "WHO WE BUILD FOR"
    - T "WEBSITES FOR ELECTRICIANS, PLUMBERS AND BUILDERS." — Oswald Medium 52/94%, ink
    - T "A homeowner comparing three quotes will look you up before they call. We build websites for tradespeople that make the case for you before the phone rings." — IBM Plex Sans Regular 16/155%, muted
    - **Trade chips (horizontal scroll)** (row gap 8, w:fill, clip): chips (row, pad 7/12/7/12, bg surface, r 99, border line 1) T — IBM Plex Sans Medium 13, ink — same five trades
    - ⧉ Button Style=Coral "Start your project" (350×52, w:fill) · ⧉ Button Style=Outline "See pricing" (350×54, w:fill)
    - **Mock · trades site (compact)** (col gap 10, pad 16, 350×184, w:fill, bg surface, r 28, border line 1, shadow 0 20 40 #2E1747@14%): header row "Your Trade Co." + "24/7 emergencies" badge · T "Licensed plumbers in George & the Garden Route" — IBM Plex Sans SemiBold 19/115% ls -1%, ink · rating (stars 13px) · call bar ("Call now" coral / "WhatsApp" mint, pad 11/0/11/0)
  - **02 · The moment** (col gap 24, pad 64/20/64/20, 390×598, w:fill, bg surface)
    - ⧉ Tag Tone=Neutral "THE MOMENT THAT DECIDES THE JOB" · T "They look you up before they call." — IBM Plex Sans SemiBold 34/108% ls -2%, ink
    - **Journey (vertical)** (col gap 12): rows (row gap 14, pad 16, w:fill, r 20): **Frame** (40×40, r 12) → icon 20px · **Frame** (col gap 4, w:fill, grow): T — IBM Plex Sans SemiBold 16 + T — IBM Plex Sans Regular 13/150% — same three moments (third row bg plum, chip coral, text surface / onDarkMuted)
  - **03 · Problems we fix** (col gap 16, pad 64/20/64/20, 390×1076, w:fill, bg canvas)
    - ⧉ Tag Tone=Neutral "WHAT USUALLY GOES WRONG" · T "Three ways trades lose jobs online." — IBM Plex Sans SemiBold 34/108% ls -2%, ink
    - **Problem card** (col, 350 wide, w:fill, bg surface, r 22, border line 1, clip)
      - **Top** (col gap 10, pad 20): T "0n" — Oswald Medium 24, coral · T title — IBM Plex Sans SemiBold 18/125% ls -1%, ink · T body — IBM Plex Sans Regular 14/155%, muted
      - **Fix strip** (row gap 12, pad 16/20/16/20, align center, 348×72, w:fill, bg mint): **Frame** (36×36, bg surface, r 10) → icon 18px · T — IBM Plex Sans SemiBold 14/140%, ink
      - 01 search "You’re the best in the area and nobody can tell" / "Word of mouth doesn’t show up in Google. Search “electrician near me” and a competitor with a better website gets the job." / "Local SEO built around your services and every town you cover."
      - 02 mobile "Your current site doesn’t work on site" / "People check you out from a phone. A site that isn’t mobile-first loses them before they find your number." / "Mobile-first pages, with your number never more than a tap away."
      - 03 phone "No easy way to actually get in touch" / "A buried form or a number nobody made tappable costs you jobs you never hear about." / "Tap-to-call, WhatsApp and a quote form on every page."
  - **04 · Local search** (col gap 24, pad 64/20/64/20, 390×698, w:fill, bg plumDeep)
    - ⧉ Tag Tone=OnDark "LOCAL SEARCH" · T "So “plumber in [your town]” has something real to find." — IBM Plex Sans SemiBold 30/108% ls -2%, surface · T "Every site is built around the towns you actually work in, not just the one on your invoice." — IBM Plex Sans Regular 15/155%, onDarkMuted
    - **Mock · local search (compact)** (col gap 10, pad 14, 350×228, w:fill, bg surface, r 22)
      - search (row gap 8, pad 11/14/11/14, bg canvas, r 99): icon search 16px + T "plumber in george" — IBM Plex Sans Regular 14, ink
      - highlighted result (row gap 10, pad 11/12/11/12, bg lilac, r 14): T "Your Trade Co. · Plumbers" — IBM Plex Sans SemiBold 14, plum + T "★ 4.9 · Website · Open 24 hours" — IBM Plex Sans Regular 11, muted · Call pill
      - dimmed result (opacity 55%, bg surface, border line 1): "Another plumbing business" / "Facebook page · Last post 9 months ago"
      - T "Illustration of the goal, not a ranking promise." — IBM Plex Sans Regular 11, muted
    - **Area chips** (row wrap gap 8): (pad 7/12/7/12) icon pin 13px + T — IBM Plex Sans Medium 13, surface — "George" · "Wilderness" · "Mossel Bay" · "Knysna"
  - **05 · Honest proof** (col gap 24, pad 48/20/24/20, 390×496, w:fill, bg canvas)
    - **Card** (col gap 14, pad 24/22/24/22, 350×424, w:fill, bg blush, r 24): **Frame** (48×48, bg surface, r 999) icon eye 24px · ⧉ Tag Tone=Coral "STRAIGHT ANSWER" · T "We haven’t published a live trades & home services project yet." — IBM Plex Sans SemiBold 22/120% ls -1%, ink · T "Get in touch and we’ll tell you honestly what we’re working on." — IBM Plex Sans Regular 14/155%, muted · (continues in the next chunk)

      - ⧉ Button Style=Primary "Ask what we’re working on" (306×52, w:fill)
      - ⧉ Button Style=Outline "See all our work" (306×54, w:fill)
  - **06 · What’s included** (col gap 12, pad 40/20/48/20, 390×1196, w:fill, bg canvas)
    - ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Everything a trades business needs." — IBM Plex Sans SemiBold 34/108% ls -2%, ink
    - 4 cards (col gap 10, pad 20, 350 wide, w:fill, r 22): **Top** (row, align space_between/center, 40 tall): **Frame** (40×40, r 12) → icon 20px + Tag · T kicker — Oswald Medium 12 ls 6% · T title — IBM Plex Sans SemiBold 20/120% ls -1% · T body — IBM Plex Sans Regular 14/155% · link (row gap 6): T "View service" — IBM Plex Sans SemiBold 13 + icon arrowUR 14px
      - bg plum, chip coral, icon code, ⧉ Tag OnDark "FLAGSHIP", kicker peach, text surface / onDarkMuted: "01 · WEBSITE DEVELOPMENT" / "A website that works as hard as you do." / "Mobile-first, with your services, service area, reviews and tap-to-call on every page." (no checklist on mobile)
      - bg mint, chip canvas, icon trend, ⧉ Tag Neutral "INCLUDED", kicker coral: "02 · SEO FOUNDATIONS" / "Found for the towns you work in." / "Service-area pages, Google Business Profile tune-up, local schema."
      - bg lilac, icon shield, ⧉ Tag Neutral "MONTHLY": "03 · FULL SERVICE" / "We keep it running." / "Hosting, updates, backups and small content changes."
      - bg surface + border line 1, icon ads, ⧉ Tag Coral "GROWTH": "04 · GOOGLE ADS" / "Show up first when the geyser bursts." / "Call-focused campaigns for emergency and high-value jobs."
  - **07 · Payment** (col gap 12, pad 0/20/64/20, 390×482, w:fill, bg canvas)
    - **Card** (col, 350×288, w:fill, bg surface, r 24, border line 1, clip)
      - **Frame** (col gap 12, pad 24/20/20/20): ⧉ Tag Tone=Plum "PRICING" · T "Every project is one fixed price." — IBM Plex Sans SemiBold 24/115% ls -1%, ink
      - **Tiles** (row, 144 tall): 2 tiles (col gap 6, pad 20/16/20/20, w:fill, grow): T — Oswald Medium 11 ls 6%, muted · T — Oswald Medium 40/100%, ink · T — IBM Plex Sans Regular 12/150%, muted
        - lilac: "OPTION A" "50/50" "Deposit, then the rest on completion." · blush: "OPTION B" "12×" "12 monthly instalments."
    - ⧉ Button Style=Primary "See pricing" (w:fill) · ⧉ Button Style=Outline "View every service" (w:fill)
  - **08 · Trades FAQ** (col gap 12, pad 64/20/64/20, 390×740, w:fill, bg surface)
    - ⧉ Tag Tone=Neutral "QUESTIONS FROM TRADES" · T "Things tradespeople ask us." — IBM Plex Sans SemiBold 34/108% ls -2%, ink
    - Accordion items (col gap 10, pad 18, w:fill, r 18): **Frame** (row gap 12): T question — IBM Plex Sans SemiBold 15/135% + chip 30×30 r 999 → icon 15px
      - Open (bg lilac, question plum, chip plum + minus): "Can you show my service area instead of just one town?" — answer "Yes. We build the site and its SEO around every area you cover, with a page or section for each town." — IBM Plex Sans Regular 14/155%, muted
      - Closed (bg canvas, question ink, chip surface + plus): "Can people request a callout or quote directly from the site?" · "I already have some good reviews. Can they go on the site?" · "Do you only build for electricians and plumbers?"
    - ⧉ Button Style=Outline "All FAQs" (w:fill)
  - **09 · CTA** (col gap 24, pad 0/20/24/20, 390×533, w:fill, bg surface)
    - **Gradient card** (col gap 18, pad 48/24/48/24, 350×509, w:fill, bg gradient(#3B1A4A 0%, #9A3348 40%, #C9583D 70%, #5A1E3C 100%), r 28)
      - ⧉ Tag Tone=OnDark "READY WHEN YOU ARE" · T "GROWTH STARTS HERE." — Oswald Medium 60/92%, surface · T "Tell us about your trade and the towns you cover." — IBM Plex Sans Regular 15/155%, onDarkMuted
      - ⧉ Button Style=Light "Start your project" (w:fill) · **Email pill** (row gap 8, pad 14/0/14/0, align center/center, w:fill, 48 tall, bg #FFFFFF @12%, r 99): icon mail 16px + T "hello@goodground.co.za" — IBM Plex Sans Medium 15, surface
  - **10 · Footer** (col gap 10, pad 24/20/96/20, 390×177, bg surface) — simplified here (logo + "© 2026 GoodGround · George, Garden Route"). Build the shared mobile footer, keeping 96px bottom padding so the sticky bar never covers it.
  - **Sticky action bar (appears after hero)** (row gap 8, pad 8, 358×58, bg ink, r 99, shadow 0 10 30 #000000@25%, fixed 16px from left/right, 20px + safe-area from bottom)
    - **Start pill** (row, pad 12/0/12/0, align center/center, w:fill, grow, bg coral, r 99): T "Start your project" — IBM Plex Sans SemiBold 14, surface
    - **Email pill** (row gap 6, pad 12/16/12/16, align center, 89×42, bg #FFFFFF @12%, r 99): icon mail 14px + T "Email" — IBM Plex Sans SemiBold 14, surface



---

# Work listing

| | |
|---|---|
| **URL** | `/work` |
| **Figma page** | `20:150` |
| **Desktop frame (1440)** | 20:151 |
| **Mobile frame (390)** | 21:169 |
| **Extra states / boards** | Filter sheet 21:344 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Figma page is called "Projects"; the URL is /work.
- Project cards open /work/{slug}, never the live site directly.
- Project images are gradient placeholders until real screenshots arrive.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /work page data & rules — node 22:192
PAGE · READ FIRST
/work listing: data, fairness and SEO
APPLIES TO
•  The /work page. Motion uses the global motion system on the “Homepage concept” page; cards link to the template on the “Case study template” page.
DATA (FROM THE CASE STUDY CMS ENTRIES, NOTHING TYPED TWICE)
•  Per card: title, slug, type, services (tags), cardSummary (max ~200 characters), keyResult (one headline result, required for publishing), cardImage (16:10), dateAdded.
•  Hero summary counts (case studies, concept builds, own site) are calculated from the entries, never typed by hand. A “Client work” count appears automatically once one exists.
•  Filter chips are generated from the types and services actually in use, each with its live count.
FAIRNESS (FROM YOUR OWN SITE AUDIT)
•  Every project gets the same card size. No featured or oversized card on this page.
•  Default order: dateAdded, newest first. Stable and predictable, not hand-picked.
•  The “Your project could be next” card is always last and is never filtered out.
PLACEHOLDERS IN THIS DESIGN
•  Only B3TTER’s key result is real (from its live case study). The other three “MEASURED” lines are placeholders: fill in each project’s headline result from its case study.
•  All images are placeholder gradients: use real 16:10 screenshots.
SEO
•  <title>: “Our Work | GoodGround Website Development”.
•  JSON-LD ItemList of the case studies (position, url, name) + BreadcrumbList (Home › Work).
•  Filtered URLs (?type=…&service=…) use rel="canonical" pointing to /work.
•  One <h1> (“Built, then measured.”); card titles are <h2>.

### Notes · W 00 Header — node 22:211
00 · Site header
BEHAVIOUR
•  Same header and menu as the rest of the site (light variant). The centre pill reads “OUR WORK” and is the current page (aria-current="page").
MOBILE
•  Centre pill hidden.

### Notes · W 01 Hero — node 22:221
01 · Page hero
ENTRANCE
•  Tag FADE-UP → “BUILT, / THEN MEASURED.” LINE MASK, 1000ms, 120ms per line → intro copy FADE-UP at +200ms.
•  Summary card rows STAGGER GRID 70ms; each number runs COUNT-UP (4, 3, 1, 100%).
MOBILE
•  Summary becomes a 3-up strip (case studies, concept, own site). Same reveals.

### Notes · W 02 Filter bar — node 22:231
02 · Filter bar
LOGIC
•  Type chips (All, Concept builds, Our own site, and Client work when it exists) are single-select. Service chips are multi-select.
•  A project shows when it matches the selected type AND has at least one of the selected services. No services selected = all services.
•  Chips that would give zero results stay visible but disabled (40% opacity, aria-disabled="true", count shows 0).
•  Results line under the bar (“Showing 3 of 4”) updates on every change and is an aria-live="polite" region.
•  Filters sync to the URL with history.replaceState (?type=concept&service=design,seo), so filtered views can be shared and reload correctly.
MOTION
•  Type group: one ink “active” pill slides between chips (translateX + width, motion/md, ease/in-out); the text colour swaps at the halfway point.
•  Service chip on: background transparent → ink, text → white, and a small check icon slides in from the left (the chip widens smoothly), motion/sm.
•  When any service is selected, a “Clear filters” text link fades in at the end of the bar.
•  Sticky: once the bar scrolls under the header it sticks (top 16px), gains a white background, a soft shadow and 12px backdrop blur (motion/sm). It un-sticks when the grid ends.
KEYBOARD & ACCESSIBILITY
•  Type chips are a radiogroup: arrow keys move and select. Service chips are toggle buttons (aria-pressed). Every chip ≥ 44px tall.
MOBILE
•  Chip row scrolls horizontally (no snap), with a 24px fade on the right edge as a scroll hint. Service filters move into one “Services” chip.
•  “Services” opens the bottom sheet shown beside the mobile frame: sheet slides up translateY 100% → 0 (motion/md, ease/out) over a 40% ink backdrop that fades in. Drag handle, swipe down or tap the backdrop to close; Esc closes; focus is trapped inside while open.
•  The sheet’s button label updates live (“Show 3 projects”); “Clear” resets services. Applying closes the sheet and runs the grid filter animation.
•  The chip row sticks under the header while scrolling the list.

### Notes · W 03 Project grid — node 22:247
03 · Project grid
ENTRANCE
•  Cards STAGGER GRID, 100ms stagger; each image uses the clip-path reveal at inset 8% with the image scaling 1.08 → 1.
•  “Your project could be next” card FADE-UPs last.
FILTERING ANIMATION (FLIP)
•  Cards leaving: fade out + scale 0.96, 200ms.
•  Cards staying: slide from old to new grid position using transforms, 400ms, ease/in-out.
•  Cards entering: fade in + scale 0.96 → 1, 300ms, 60ms stagger, starting as the movers settle.
•  Motion off: instant swap, no movement.
EMPTY STATE
•  If nothing matches: one card in place of the grid, “No projects match these filters”, with a “Clear filters” button (Outline). FADE-UP.
CARDS
•  Whole card is one link to /work/{slug} (same tab). LINKED CARD hover + image scale 1.04 (motion/lg), title underline draws, arrow chip rotates 45°.
•  Prefetch the case study on hover or focus (<link rel="prefetch">).
•  Cards in a row share the same height; the “MEASURED” line always sits at the bottom.
•  “Your project could be next”: on hover the dashed slot border slowly marches (dash offset, 1.2s linear loop, hover only). Button → /start-project?ref=work.
MOBILE
•  Single column list. Pressed state scale 0.99. Same filtering animation (vertical only).

### Notes · W 04 How we measure — node 22:266
04 · How we measure
ENTRANCE
•  HEADER REVEAL; the three cards STAGGER GRID 120ms; each icon chip pops (scale 0.6 → 1, ease/back); the large step numbers fade in last.
INTERACTION
•  Not interactive.
MOBILE
•  Stacked rows, FADE-UP 80ms stagger.

### Notes · W 05 CTA + footer — node 22:279
05 · CTA + footer
BEHAVIOUR
•  Shared component, identical to homepage section 11. “Start your project” → /start-project?ref=work.

### Notes pointers — nodes 22:286, 22:289
Mobile behaviour is in the “Mobile” block of each note, left of the desktop design. Read the page note (far left) first.
Mobile-only state: the Services filter sheet. Behaviour in note 02 · Filter bar → Mobile.

## Layer-by-layer spec

### Work listing — Desktop (1440) — node 20:151 (1440×3839)
- **Work listing — Desktop (1440)** (col, 1440×3839, bg canvas)
  - **00 · Site header (light variant)** — shared light header; centre pill T "OUR WORK" — Oswald Medium 12 ls 6%, ink (99×44, bg surface, border line 1)
  - **01 · Page hero** (col gap 48, pad 64/120/56/120, 1440×481, w:fill, bg canvas)
    - **Frame** (row gap 64, align space_between/max, 1200×361, w:fill)
      - **Frame** (col gap 24, 820×340, w:fill, grow)
        - ⧉ Tag Tone=Coral "OUR WORK" (81×30)
        - T "BUILT, ⏎ THEN MEASURED." — Oswald Medium 112/92%, ink
        - T "Every case study here ends in numbers taken from the live site, each with instructions for checking it yourself. Where a project was a concept build rather than client work, it says so at the top." — IBM Plex Sans Regular 18/155%, muted
      - **Summary card** (col, pad 0/28/0/28, 380×361, bg surface, r 24, border line 1) — 4 rows (row gap 16, pad 18/0/18/0, align center, 322×90, w:fill; rows 1–3 border line 0/0/1/0): T value — Oswald Medium 36, ink · T label — IBM Plex Sans Medium 15, muted
        - "4" case studies · "3" concept builds · "1" our own site · "100%" numbers you can check
  - **02 · Filter bar** (col gap 12, pad 0/120/32/120, 1440×117, w:fill, bg canvas)
    - **Filter bar** (row gap 8, pad 8/20/8/8, align center, 1200×56, w:fill, bg surface, r 999, border line 1)
      - **Type chips** (row gap 8, pad 10/13/10/13, align center, h 38, r 999): T label — IBM Plex Sans Medium 14 · count badge (row, pad 1/7/1/7, 22×18, r 99) T — IBM Plex Sans SemiBold 12
        - Active "All" (bg ink, text surface, badge bg #FFFFFF @20% text surface) "4"
        - "Concept builds" (no bg, text ink, badge bg canvas text muted) "3"
        - "Our own site" "1"
      - rectangle 1×24 line (divider)
      - **Service chips** (row gap 8, pad 10/13/10/13, align center, h 38, r 999, no bg) T — IBM Plex Sans Medium 14, ink: "Design" · "Development" · "Accessibility" · "Performance" · "Booking UX" · "SEO" · "Motion"
    - **Results count (aria-live)** (row, align max, 1200×17, w:fill)
      - T "Showing 4 of 4" — IBM Plex Sans Regular 13, muted
  - **03 · Project grid (equal weight)** (col gap 24, pad 16/120/120/120, 1440×1740, w:fill, bg canvas)
    - 2 rows (row gap 24, 1200×654) of 2 cards. **Project card** (col gap 24, pad 16/16/32/16, 588×654, w:fill, h:fill, grow, bg surface, r 32, border line 1):
      - **Image (16:10)** (col, pad 16/0/0/16, 554×360, w:fill, gradient placeholder, r 20) → type Tag top-left
      - **Body** (col gap 14, pad 0/16/0/16, 554×~220, w:fill)
        - **Title row** (row gap 16, align space_between/center, 522×48, w:fill): T "{title}" — IBM Plex Sans SemiBold 30/115% ls -2%, ink · **Frame** (48×48, bg canvas, r 999) → icon arrow 24px
        - T "{summary}" — IBM Plex Sans Regular 16/155%, muted
        - **Service ticks** (row gap 16, 522×17): each (row gap 6, align center) icon check 14px + T "{service}" — IBM Plex Sans Medium 13, ink
        - **Key result** (row gap 10, pad 10/14/10/14, align center, 522×38, w:fill, r 12): T "MEASURED" — Oswald Medium 11 ls 6% · T "{result}" — IBM Plex Sans 14. Real result: bg mint, kicker ink, value SemiBold ink. Placeholder: bg canvas, kicker muted, value Regular muted.
    - Cards in order:
      - **B3TTER** — gradient(#1E2B3A 0%, #4A6B7C 60%, #C9D6CF 100%) · ⧉ Tag Tone=Neutral "CONCEPT BUILD" · "A concept product site that shows what a premium single-product page can look like: beautiful photography that loads fast, and an experience that works with a mouse, a keyboard or a screen reader." · Design, Development, Accessibility, Performance · result (real, mint) "100 Accessibility · 56 MB → 1.5 MB photos"
      - **Point Break Surf Academy** — gradient(#0F3B4C 0%, #2C8C99 60%, #F2D8A7 100%) · Neutral "CONCEPT BUILD" · "A concept booking site for a surf academy: pricing, itineraries, coach bios and a custom package builder on one page, without a single visitor waiting for anything to load." · Design, Development, Booking UX, Performance · placeholder "Key result from the case study"
      - **GoodGround** — gradient(#2E1848 0%, #9A3348 60%, #EF8A5A 100%) · ⧉ Tag Tone=Dark "OUR OWN SITE" · "Our own site, built and checked the way we check every client’s: what we found when we audited ourselves, and what we fixed." · Design, Development, SEO, Performance · placeholder
      - **Sunbird Early Learners** — gradient(#F6C344 0%, #F28C38 60%, #E2574C 100%) · Neutral "CONCEPT BUILD" · "A concept preschool site built from one reference photo, with its own brand and voice and a fully working booking and enrolment flow, without a line of backend code." · Design, Development, Motion, Booking UX · placeholder
    - **Your project could be next** (row gap 48, pad 24/24/24/48, align space_between/center, 1200×248, w:fill, bg plum, r 32)
      - **Frame** (col gap 10, 768×74, w:fill, grow)
        - T "Your project could be next" — IBM Plex Sans SemiBold 30 ls -2%, surface
        - T "We’re a young studio and we’d rather show you real, testable work than pad this out with stock mock-ups." — IBM Plex Sans Regular 16/155%, onDarkMuted
      - **Empty slot** (col gap 14, align center/center, 360×200, bg #FFFFFF @4%, r 20, border #FFFFFF @35% 1.5 dashed)
        - T "Your business here" — IBM Plex Sans Medium 15, surface
        - ⧉ Button Style=Coral "Start your project" (206×52)
  - **04 · How we measure** (col gap 48, pad 120, 1440×667, w:fill, bg surface)
    - **Frame** (row, align space_between/max, 1200×168, w:fill)
      - **Frame** (col gap 20, 760×168)
        - ⧉ Tag Tone=Plum "HOW WE MEASURE" (120×30)
        - T "No vanity metrics. ⏎ Only numbers you can check." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "If a project has no customers yet, we say so and report build quality instead of inventing results." — IBM Plex Sans Regular 17/155%, muted
    - **Frame** (row gap 24, 1200×211, w:fill) — 3 cards (col gap 16, pad 28, 384×211, w:fill, h:fill, grow, bg canvas, r 24):
      - **Card top** (row, align space_between/center, w:fill): **Frame** (48×48, bg lilac, r 14) → icon 24px · T "0n" — Oswald Medium 28, line
      - T "{title}" — IBM Plex Sans SemiBold 22 ls -1%, ink · T "{body}" — IBM Plex Sans Regular 15/150%, muted
      - code "01" "Built" "Every site is custom-coded, then deployed to a public URL you can open."
      - gauge "02" "Measured on the live URL" "Lighthouse, page weight, third-party requests and console errors, taken from the live site."
      - eye "03" "Checkable by you" "Each figure comes with instructions to verify it in your own browser in under a minute."
  - **05 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×727, w:fill, bg canvas)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×477, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 880×285, w:fill, grow)
        - ⧉ Tag Tone=OnDark "GET IN TOUCH" (97×30)
        - T "GROWTH ⏎ STARTS HERE." — Oswald Medium 96/94%, surface
        - T "Tell us about your business and we’ll come back with a fixed price and a clear plan." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 320×116)
        - ⧉ Button Style=Light "Start your project" (320×52, w:fill)
        - ⧉ Button Style=Coral "hello@goodground.co.za" (320×52, w:fill)
    - **Footer** — shared desktop footer

### Work listing — Mobile (390) — node 21:169 (390×4086)
- **Work listing — Mobile (390)** (col, 390×4086, bg canvas)
  - **00 · Site header** — shared mobile header (no centre pill)
  - **01 · Page hero** (col gap 24, pad 32/20/24/20, 390×545, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "OUR WORK" (81×30)
    - T "BUILT, ⏎ THEN ⏎ MEASURED." — Oswald Medium 72/92%, ink
    - T "Every case study ends in numbers taken from the live site, with instructions for checking them yourself. Concept builds are labelled as concept builds." — IBM Plex Sans Regular 16/155%, muted
    - **Summary strip** (row, pad 14/0/14/0, 350×89, w:fill, bg surface, r 18, border line 1) — 3 cells (col gap 2, pad 0/12/0/16, w:fill, grow; cells 2–3 border line 0/0/0/1): T — Oswald Medium 28, ink · T — IBM Plex Sans Regular 12, muted — "4" case studies · "3" concept · "1" own site
  - **02 · Filter (horizontal scroll)** (col gap 10, pad 8/0/8/20, 390×82, w:fill, bg canvas)
    - **Filter chips (scrolls)** (row gap 8, 370×40, w:fill) — chips (row gap 6, pad 10/14/10/14, align center, r 999), label IBM Plex Sans Medium 14, count IBM Plex Sans SemiBold 12:
      - "All" "4" (active: bg ink, text surface)
      - "Concept builds" "3" · "Our own site" "1" (bg surface, border line 1, label ink, count muted)
      - "Services" with icon filter 16px (bg surface, border line 1) — opens the filter sheet
    - **Frame** (row, pad 0/20/0/0, align max, 370×16): T "Showing 4 of 4" — IBM Plex Sans Regular 12, muted
  - **03 · Project list** (col gap 16, pad 8/20/48/20, 390×2015, w:fill, bg canvas)
    - **Project card** (col gap 14, pad 10/10/20/10, 350×~412–443, w:fill, bg surface, r 24, border line 1):
      - **Image (16:10)** (col, pad 12/0/0/12, 328×206, w:fill, gradient, r 16) → type Tag
      - **Body** (col gap 10, pad 0/10/0/10, 328 wide, w:fill)
        - **Title row** (row gap 12, align center, 308×40, w:fill): T "{title}" — IBM Plex Sans SemiBold 22/115% ls -1%, ink · **Frame** (40×40, bg canvas, r 999) → icon arrow 20px
        - T "{short summary}" — IBM Plex Sans Regular 14/150%, muted
        - T "{services joined with ·}" — IBM Plex Sans Medium 12, coral
        - **Key result** (row gap 8, pad 8/12/8/12, align center, 308×32, w:fill, r 10): T "MEASURED" — Oswald Medium 10 ls 6% · T "{result}" — IBM Plex Sans 12 (real = bg mint, SemiBold ink; placeholder = bg canvas, Regular muted)
    - Cards:
      - B3TTER · "A premium single-product page: beautiful photography that loads fast, and works with a mouse, keyboard or screen reader." · "Design · Development · Accessibility · Performance" · "100 Accessibility · 56 MB → 1.5 MB"
      - Point Break Surf Academy · "A one-page booking site with pricing, itineraries, coach bios and a package builder, with no waiting." · "Design · Development · Booking UX · Performance" · placeholder
      - GoodGround (Tag Dark "OUR OWN SITE") · "Our own site, audited the way we audit clients’, and what we fixed." · "Design · Development · SEO · Performance" · placeholder
      - Sunbird Early Learners · "A preschool site built from one reference photo, with a working booking and enrolment flow." · "Design · Development · Motion · Booking UX" · placeholder
    - **Your project could be next** (col gap 14, pad 24/20/20/20, 350×195, w:fill, bg plum, r 24)
      - T "Your project could be next" — IBM Plex Sans SemiBold 22 ls -1%, surface
      - T "We’d rather show you real, testable work than pad this out with stock mock-ups." — IBM Plex Sans Regular 14/150%, onDarkMuted
      - ⧉ Button Style=Coral "Start your project" (310×52, w:fill)
  - **04 · How we measure** (col gap 24, pad 64/20/64/20, 390×579, w:fill, bg surface)
    - ⧉ Tag Tone=Plum "HOW WE MEASURE" (120×30)
    - T "No vanity metrics. Only numbers you can check." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Rows** (col gap 12, 350×303, w:fill) — 3 rows (row gap 14, pad 16, align center, 350×93, w:fill, bg canvas, r 18): **Frame** (44×44, bg lilac, r 12) → icon 22px · T title — IBM Plex Sans SemiBold 16 ls -1%, ink · T body — IBM Plex Sans Regular 13/145%, muted
      - code "Built" "Custom-coded and deployed to a public URL." · gauge "Measured on the live URL" "Lighthouse, page weight, requests and errors." · eye "Checkable by you" "Instructions to verify each figure in your browser."
  - **05 · CTA + footer** (col gap 24, pad 12/12/32/12, 390×787, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×509, w:fill, bg #3A1A44, r 32)
      - ⧉ Tag Tone=OnDark "GET IN TOUCH" (97×30)
      - T "GROWTH ⏎ STARTS ⏎ HERE." — Oswald Medium 64/92%, surface
      - T "Tell us about your business and we’ll come back with a fixed price and a clear plan." — IBM Plex Sans Regular 15/150%, surface
      - ⧉ Button Style=Light "Start your project" (318×52, w:fill)
      - ⧉ Button Style=Coral "hello@goodground.co.za" (318×52, w:fill)
    - **Footer** — shared mobile footer (with tagline, 4 links per column as on Home mobile)

### State · Services filter sheet (opens from “Services” chip) — node 21:344 (390×523)
- **Bottom sheet** (col gap 16, pad 12/20/28/20, align center, 390×523, bg surface, r 28 (top corners), shadow 0 -8 40 #000000@18%)
  - rectangle 40×4 line r99 (drag handle)
  - **Frame** (row, align space_between/center, 350×23, w:fill)
    - T "Filter by service" — IBM Plex Sans SemiBold 18 ls -1%, ink
    - T "Clear" — IBM Plex Sans Medium 14, coral
  - **Options** (col, 350×356, w:fill) — 7 rows (row gap 12, pad 14/0/14/0, align center, 350×51, w:fill; rows 1–6 border line 0/0/1/0):
    - Checkbox **Frame** (22×22, r 6): checked = bg ink + icon check 14px; unchecked = bg surface, border line 1.5
    - T "{service}" — IBM Plex Sans Medium 15, ink · T "{count}" — IBM Plex Sans Regular 13, muted
    - Design 4 (checked) · Development 4 · Performance 3 · Booking UX 2 · Accessibility 1 · SEO 1 · Motion 1
  - ⧉ Button Style=Primary "Show 4 projects" (350×52, w:fill)



---

# Case study template

| | |
|---|---|
| **URL** | `/work/{slug} (example: B3TTER)` |
| **Figma page** | `15:150` |
| **Desktop frame (1440)** | 15:151 |
| **Mobile frame (390)** | 18:171 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- The video block is a placeholder for a walkthrough clip; the custom player spec is in the notes.
- Results numbers must be real; do not invent metrics.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · Case study template & data — node 19:192
TEMPLATE · READ FIRST
Case study template: structure, data and SEO
APPLIES TO
•  Every page at /work/{slug}: b3tter-bottle, point-break-surf, goodground-site, sunbird-early-learners (and any future project).
•  Motion uses the global motion system on the “Homepage concept” page (tokens, FADE-UP, HEADER REVEAL, STAGGER GRID, LINE MASK, COUNT-UP, LINKED CARD, reduced motion and “Pause motion”). Nothing here overrides it.
CMS FIELDS PER PROJECT
•  title, slug, type (Concept build | Client work), year, service, details (stack line), summary (one sentence under the title).
•  heroMedia: video (MP4/WebM, poster image, duration, captions file if it has audio) OR image; mobilePoster (4:5).
•  liveUrl, client, industry, services.
•  brief (lead paragraph + optional supporting line).
•  challenge: lead line, 2–3 problem cards (icon, title, one line), closing line.
•  solution: intro line + 2–6 feature blocks. Each block: kicker, title, body, 1–3 points, visual (image | colour-switcher | spec-bento | payload-bars | keyboard-demo | custom). Blocks alternate text-left / visual-left automatically.
•  results: 2–6 stat cards (value, label, howToCheck, highlight yes/no) + optional honesty note.
•  Next project is automatic: the next item in /work order; the last one wraps to the first.
LAYOUT RULES
•  Section order is fixed: header → hero → snapshot → brief & challenge → solution → results → next case study → CTA + footer.
•  Optional sections collapse cleanly: no honesty note = no gap; fewer than 4 features = fewer rows; 2–3 results = one row; 4–5 = the 2 + 3 layout in the design; 6 = 3 + 3.
•  A Client work project shows a “CLIENT WORK” tag (Neutral) instead of the coral “CONCEPT BUILD” tag, and can add a client quote card after results (reuse the homepage proof-quote style).
SEO
•  <title>: “{Title}: {summary short} | GoodGround”. Meta description = summary.
•  OG image = hero poster (1200×630 crop).
•  JSON-LD: CreativeWork (name, dateCreated = year, creator = GoodGround, url = liveUrl) + BreadcrumbList (Home › Work › {Title}).
•  One <h1> (the project name). Section titles are <h2>, feature titles <h3>.

### Notes · CS 00 Header — node 19:208
00 · Site header (light variant)
BEHAVIOUR
•  Same header and menu behaviour as the rest of the site. Light variant (ink pills on canvas) because this page starts on a light background.
•  The centre pill is a breadcrumb: “WORK” links to /work, the project name is the current page (aria-current="page").
MOBILE
•  Breadcrumb pill hidden; the “All work” back link under it does the same job.

### Notes · CS 01 Case hero — node 19:218
01 · Case hero + walkthrough video
ENTRANCE
•  “All work” back link and tags FADE-UP (0ms, 80ms).
•  Project name: LINE MASK at the large size, 1000ms, ease/out, 120ms after the tags.
•  Summary FADE-UP at +200ms. Meta card rows STAGGER GRID 60ms, starting at +250ms.
•  Video card: clip-path inset(8% round 32px) → inset(0 round 32px) while the poster scales 1.08→1, 1100ms, ease/out, starting at +300ms.
VIDEO BEHAVIOUR
•  preload="none" with a WebP poster, so nothing heavy loads until needed.
•  When the card is 50% visible and motion is allowed, play a muted, looping 8-second preview (a separate short clip, not the full file). Pause it when it leaves view.
•  Clicking the play button (or Space/Enter when it has focus) plays the full walkthrough inline, from the start, with custom controls: play/pause, scrub bar, elapsed/total time, mute, fullscreen. Controls fade out after 2s without pointer movement and return on move or focus.
•  The scrub bar is a range input: arrow keys seek 5s; it shows a buffered track (white 30%) under the progress (white).
•  “Open the live site” opens liveUrl in a new tab (rel="noopener", hidden “(opens in new tab)” text).
•  Reduced motion / Pause motion: no preview loop; poster only until the visitor presses play.
MOBILE
•  4:5 portrait poster. Tapping play uses the native fullscreen player (playsinline off). No preview loop on mobile data (check navigator.connection.saveData, and skip the preview below 768px).
•  “Open the live site” sits under the video as a full-width button; meta and snapshot merge into one list below it.

### Notes · CS 02 Snapshot — node 19:231
02 · Snapshot
ENTRANCE
•  Strip FADE-UP; the three columns STAGGER GRID 80ms; vertical dividers draw scaleY 0→1 after the columns land.
INTERACTION
•  Not interactive. If a value has a related page (for example Industry), it can become a TEXT LINK later.
MOBILE
•  Merged into the hero meta list (rows FADE-UP 60ms stagger, dividers draw scaleX 0→1).

### Notes · CS 03 Brief & challenge — node 19:244
03 · The brief & the challenge
DESKTOP
•  Each row’s left label (number + title) is position: sticky (top 120px) while its right column scrolls, released at the end of the row.
•  Labels: LINE MASK. Lead paragraph FADE-UP. Supporting line FADE-UP at +150ms.
•  The divider between rows draws scaleX 0→1 (origin left), motion/xl.
•  Problem cards: STAGGER GRID 120ms; each icon chip pops (scale 0.6→1, ease/back) as its card lands. Cards are not interactive.
MOBILE
•  No sticky labels. Same reveals, top to bottom.

### Notes · CS 04 Solution — node 19:254
04 · The solution (feature blocks)
EVERY FEATURE ROW
•  Text column FADE-UP (kicker, title, body, points with 70ms stagger; each point’s check pops in).
•  Visual card slides in from its own side: translateX ±48px → 0 + opacity, 900ms, ease/out, 100ms after the text starts.
•  Each visual’s micro-animation starts when the visual is 40% visible, pauses off-screen, and shows its final state when motion is off.
VISUAL · COLOUR SWITCHER (LIVE DEMO)
•  A real, working mini switcher: clicking a swatch crossfades the bottle photo (400ms, ease/in-out), moves the selected ring and updates the “Colourway n of 6” label.
•  Keyboard: swatches are a radiogroup; arrow keys move and select, matching the real B3TTER site.
•  Until someone interacts, it auto-cycles every 2.5s. Any interaction stops the cycle for good. No auto-cycle when motion is off.
VISUAL · SPEC BENTO
•  Tiles STAGGER GRID with scale 0.94→1 (ease/back, 60ms stagger). Numeric values COUNT-UP. Hover on a tile: lift -3px (motion/sm).
VISUAL · PAYLOAD BARS
•  The “Original renders” bar fills to full width over 1000ms, then the “Shipped” bar fills to its tiny width over 600ms with a coral flash. Then “97%” COUNT-UP. The values on the right count with their bars.
VISUAL · KEYBOARD DEMO
•  Keys press in sequence (Tab → ← → → → Enter): each press moves the key down 3px and removes its shadow for 160ms. Loops every 4s.
•  The reduce-motion switch slides on (knob translateX, motion/sm) after the first loop and stays on.
•  The screen-reader line types in at 30ms per character, once.
MOBILE
•  Visual above the text in every block. Same micro-animations, triggered at 40% visible. The colour switcher swatches are 44px tap targets.

### Notes · CS 05 Results — node 19:276
05 · The results
ENTRANCE
•  HEADER REVEAL (light-on-dark).
•  Stat cards STAGGER GRID 80ms. Values COUNT-UP (100, 100, 0, 0).
•  Payload card: “56 MB” appears first, then the arrow draws left→right (stroke, motion/md), then “1.5 MB” counts down from 56.0 to 1.5 with one decimal place, motion/xl.
•  Honesty note FADE-UP last; its info icon fades in after the text.
INTERACTION
•  Cards are not links. Each “how to check” line stays plain text (no tooltip needed).
•  “Open the live site” → liveUrl in a new tab.
MOBILE
•  Payload card full width on top, then two rows of two. Same animations.

### Notes · CS 06 Next case study — node 19:289
06 · Next case study
BEHAVIOUR
•  Whole card is one link to the next project’s case study (same tab). Next = following project in /work order; the last one wraps to the first.
•  LINKED CARD hover, plus image scale 1.04 (motion/lg) and the arrow chip moves +4px right and rotates 45°.
•  On hover or focus, prefetch the next page (<link rel="prefetch">) so it opens instantly.
•  Entrance: FADE-UP; the image uses the clip-path reveal at inset 8%.
MOBILE
•  Stacked card (image on top). Pressed state scale 0.99.

### Notes · CS 07 CTA + footer — node 19:299
07 · CTA + footer
BEHAVIOUR
•  Identical to homepage section 11 (same gradient code, cursor light on desktop, LINE MASK headline, footer links). Build it once as a shared component.
•  “Start your project” → /start-project?ref=case-{slug}, so enquiries show which case study they came from. “See all work” → /work.
MOBILE
•  Same as homepage section 11 on mobile: stacked headline, two full-width buttons.

## Layer-by-layer spec

### Case study — B3TTER — Desktop (1440) — node 15:151 (1440×7272)
- **Case study — B3TTER — Desktop (1440)** (col, 1440×7272, bg canvas)
  - **00 · Site header (light variant)** — shared; centre breadcrumb pill T "WORK  /  B3TTER" — Oswald Medium 12 ls 6%, ink (132×44)
  - **01 · Case hero** (col gap 48, pad 56/120/64/120, 1440×1225, w:fill, bg canvas)
    - **Back link** (row gap 8, align center, 77×18): icon back 16px · T "All work" — IBM Plex Sans Medium 14, muted
    - **Frame** (row gap 64, align space_between/max, 1200×311, w:fill)
      - **Frame** (col gap 20, 780×302, w:fill, grow)
        - **Tags** (row gap 8): ⧉ Tag Tone=Coral "CONCEPT BUILD" (107×30) · ⧉ Tag Tone=Neutral "2026" (53×32)
        - T "B3TTER" — Oswald Medium 180/90%, ink
        - T "A premium product page for a single-item brand, built to look expensive, work for every visitor and stay fast." — IBM Plex Sans Medium 24/140% ls -1%, ink
      - **Meta card** (col, pad 0/28/0/28, 420×311, bg surface, r 24, border line 1) — rows (col gap 6, pad 20/0/20/0, w:fill; rows 1–2 border line 0/0/1/0): T label — Oswald Medium 12 ls 6%, muted · T value — IBM Plex Sans Medium 16/145%, ink
        - "YEAR" "2026" · "SERVICE" "Design & front-end development" · "DETAILS" "Hand-written HTML, CSS and JavaScript. No framework, no build step, no third-party requests."
    - **Media · walkthrough video (replace)** (col, pad 32, align space_between, 1200×680, w:fill, poster placeholder bg gradient(#1E2B3A 0%, #4A6B7C 60%, #C9D6CF 100%), r 32)
      - **Top bar** (row, align space_between/center, 1136×52, w:fill)
        - **Label pill** (row gap 8, pad 8/14/8/14, align center, 324×33, bg #000000 @35%, r 999): ellipse 8×8 coral · T "Full walkthrough · recorded end to end, no cuts" — IBM Plex Sans Medium 13, surface
        - ⧉ Button Style=Light "Open the live site" (205×52)
      - **Centre** (row, align center, 1136×104, w:fill): **Play button** (row, align center/center, 104×104, bg surface, r 999) → icon play 36px
      - **Scrub row** (row gap 12, align center, 1136×16, w:fill): track (row, w:fill, grow, h 4, bg #FFFFFF @30%, r 99) → progress rectangle 260×4 surface r99 · T time/caption — IBM Plex Sans Regular 12, surface (the placeholder line "Video placeholder — replace with the walkthrough clip" is a design label)
  - **02 · Snapshot** (col gap 56, pad 0/120/120/120, 1440×254, w:fill, bg canvas)
    - **Snapshot strip** (row, pad 28/0/28/0, 1200×134, w:fill, bg surface, r 24, border line 1) — 3 columns (col gap 8, pad 0/32/0/32, ~400×76, w:fill, h:fill, grow; columns 2–3 border line 0/0/0/1): T label — Oswald Medium 12 ls 6%, coral · T value — IBM Plex Sans Medium 18/140% ls -1%, ink
      - "CLIENT" "B3TTER (a GoodGround concept brand)" · "INDUSTRY" "Outdoor gear, direct to consumer" · "SERVICES" "Design, front-end build, image optimisation, accessibility, SEO setup"
  - **03 · The brief & the challenge** (col gap 56, pad 120, 1440×873, w:fill, bg surface)
    - **Row · brief** (row gap 80, 1200×183, w:fill)
      - **Sticky label** (col gap 12, 320×77): T "01" — Oswald Medium 14 ls 6%, coral · T "The brief" — IBM Plex Sans SemiBold 40/110% ls -2%, ink
      - **Frame** (col gap 24, 800×183, w:fill, grow)
        - T "B3TTER needed a product page that could carry a premium single-item brand on its own: no supporting range, no category page to lean on, just one bottle that had to look and feel expensive from the first scroll." — IBM Plex Sans Medium 24/145% ls -1%, ink
        - T "The walkthrough above is recorded end to end rather than cut together, so what you see is exactly what a visitor gets." — IBM Plex Sans Regular 17/160%, muted
    - rectangle 1200×1 line (divider)
    - **Row · challenge** (row gap 80, 1200×337, w:fill)
      - **Sticky label** (col gap 12, 320×77): T "02" · T "The challenge"
      - **Frame** (col gap 24, 800×337, w:fill, grow)
        - T "Most product pages for physical goods fail in the same two places." — IBM Plex Sans Medium 24/145% ls -1%, ink
        - **Problem cards** (row gap 20, 800×200, w:fill) — 2 cards (col gap 14, pad 28, 390×200, w:fill, h:fill, grow, bg canvas, r 24): **Frame** (44×44, bg blush, r 12) → icon 22px · T title — IBM Plex Sans SemiBold 20 ls -1%, ink · T body — IBM Plex Sans Regular 15/150%, muted
          - phone "Photos stall the page on a phone" "Studio and lifestyle photography is so heavy the page freezes on mobile data."
          - keyboard "Interactive parts assume a mouse" "Colour pickers, review sliders and galleries leave keyboard and screen-reader users stuck."
        - T "Our self-imposed brief: dozens of photos, a live colour switcher, a scrolling review carousel, and a rule that none of it could cost a single point on accessibility." — IBM Plex Sans Regular 17/160%, muted
  - **04 · The solution (feature blocks)** (col gap 56, pad 120, 1440×2474, w:fill, bg canvas)
    - **Section header** (row, align space_between/max, 1200×170, w:fill)
      - **Frame** (col gap 20, 700×170)
        - ⧉ Tag Tone=Neutral "03 / THE SOLUTION" (127×32)
        - T "Four problems, solved one at a time." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Colour without clutter, a specifications section people actually read, photography that stays light, and accessibility that’s checked rather than assumed." — IBM Plex Sans Regular 17/155%, muted
    - **Feature row template** (row gap 80, align center, 1200×460, w:fill) — text column (col gap 20, ~520 wide, w:fill, grow) and visual card (600×460, w:fill, grow, r 32) alternate sides (row 1 text-left, row 2 visual-left, …)
      - Text column: T "0n  ·  {KICKER}" — Oswald Medium 13 ls 6%, coral · T title — IBM Plex Sans SemiBold 36/112% ls -2%, ink · T body — IBM Plex Sans Regular 17/160%, muted · **Points** (col gap 10): rows (row gap 10, align center, h 24): **Frame** (24×24, bg mint, r 999) → icon check 12px + T — IBM Plex Sans Medium 15, ink
    - **Feature 01 · COLOUR** (text left)
      - Title "The product carries the colour, the interface stays silent" · body "The entire interface is black and white. Every bit of colour comes from the bottle itself, so a six-colourway range feels like a range, not decoration."
      - Points: "Fades between six real photographs, not one tinted image" · "Every photo preloaded, so no white flash" · "Arrow keys flip through colours"
      - **Visual · colour switcher** (col gap 24, pad 40, align center/center, bg surface, border line 1)
        - **Image · bottle cut-out (replace)** (150×280, placeholder gradient(#2F4F5F 0%, #3F7F86 60%, #9CC9C2 100%), r 120)
        - **Swatches** (row gap 12, 300×40): 6 swatch circles 40×40 (one per colourway; selected swatch has an outer ring)
        - T "Colourway 2 of 6" — IBM Plex Sans Medium 13, muted
    - **Feature 02 · SPECIFICATIONS** (visual left)
      - **Visual · spec bento** (col gap 12, pad 40, align center/center, bg lilac)
        - Row 1 (row gap 12, 520×190): tile (col gap 4, pad 16/18/16/18, align max (bottom), w:fill, grow, bg ink, r 18) T "24h" — Oswald Medium 34, surface + T "Cold" — IBM Plex Sans Regular 12, onDarkMuted · tile (150 wide, bg surface) "750ml" "Capacity"
        - Row 2 (row gap 12, 520×170): 3 tiles (w:fill, grow, bg surface, r 18): "12h" "Hot" · "18/8" "Stainless steel" · "0" "BPA" (value Oswald Medium 34, ink; label IBM Plex Sans Regular 12, muted)
        - T "Illustrative values — use the real spec data" — IBM Plex Sans Regular 11, muted
      - Title "A spec section that doesn’t feel like a spec sheet" · body "Large and small tiles instead of a wall of identical boxes give the eye somewhere to land. Every layout was checked by hand at every width, with no odd gaps or leftover tiles."
      - Points: "Mixed tile sizes, not a flat grid" · "No orphan tiles at any width"
    - **Feature 03 · PERFORMANCE** (text left)
      - Title "56 MB of photography, shipped as 1.5 MB" · body "Twenty-seven original photos came in at 56 MB. Each was compressed and resized to exactly the size it needed, and every cut-out stayed perfectly transparent. Nothing is fetched from anywhere else on the internet."
      - Points: "27 photos, 1.5 MB total" · "Transparent cut-outs preserved" · "Zero third-party requests"
      - **Visual · payload bars** (col gap 28, pad 40, align center, bg ink)
        - T "PHOTOGRAPHY PAYLOAD" — Oswald Medium 12 ls 6%, onDarkMuted
        - Bar 1 (col gap 10, 520×71): **Frame** (row, align space_between/center): T "Original renders" — IBM Plex Sans Regular 14, onDarkMuted + T "56 MB" — Oswald Medium 28, surface · track (520×20, bg #FFFFFF @10%, r 99) → fill 480×20 #FFFFFF @35%
        - Bar 2: T "Shipped on the page" + T "1.5 MB" · track → fill 13×20 coral
        - **Frame** (row gap 12, align baseline): T "97%" — Oswald Medium 88/100%, peach · T "lighter" — IBM Plex Sans Medium 18, surface
    - **Feature 04 · ACCESSIBILITY** (visual left)
      - **Visual · keyboard + motion** (col gap 20, pad 40, align center/center, bg blush)
        - **Keys** (row gap 10, 280×51): key caps (row, pad 14/18/14/18, align center, h 51, bg surface, r 14, border line 1, shadow 0 4 0 #121212@12%) T — IBM Plex Sans SemiBold 16, ink: "Tab" · "←" · "→" · "Enter"
        - **Reduce-motion row** (row gap 14, pad 16/20/16/20, align center, 520×70, w:fill, bg surface, r 18): **Frame** (col gap 2, w:fill, grow): T "Reduce motion" — IBM Plex Sans SemiBold 15, ink + T "All animations off, not just slower" — IBM Plex Sans Regular 12, muted · switch 48 wide (on state)
        - **Screen-reader line** (row gap 10, pad 14/20/14/20, align center, 520×46, w:fill, bg ink, r 18): icon speaker 18px · T "“Review 2 of 6. Five stars…” (only the visible review is announced)" — IBM Plex Sans Regular 13, surface
      - Title "Accessible because it was checked, not assumed" · body "The colour switcher, review carousel and mobile menu all work with a keyboard as well as a mouse. Screen readers only hear the review on screen, the carousel stops the moment anyone interacts, and reduced motion turns every animation off completely."
      - Points: "Full keyboard support" · "Screen-reader friendly carousel" · "Reduced motion respected"
  - **05 · The results** (col gap 56, pad 120, 1440×1131, w:fill, bg ink)
    - **Section header** (row, align space_between/max, 1200×168, w:fill)
      - **Frame** (col gap 20, 700×168)
        - ⧉ Tag Tone=OnDark "04 / THE RESULTS" (118×30)
        - T "Measured on the live URL. Check them yourself." — IBM Plex Sans SemiBold 56/106% ls -3%, surface
      - T "Every figure below tells you exactly how to verify it in your own browser, in under a minute." — IBM Plex Sans Regular 17/155%, onDarkMuted
    - **Results grid** (col gap 20, 1200×415, w:fill) — stat card (col gap 12, pad 28, r 24): T value — Oswald Medium 64/100%, surface · T label — IBM Plex Sans SemiBold 17, surface · T how-to-check — IBM Plex Sans Regular 14/150%, onDarkMuted. Normal cards bg #FFFFFF @6%; highlight card bg coral (how-to-check in surface).
      - Row 1 (row gap 20, 1200×187): "100" "Lighthouse Accessibility" "Run Lighthouse against the live URL in Chrome DevTools." · "100" "Lighthouse Best Practices" "Same audit, same run." (each 590 wide, w:fill, grow)
      - Row 2 (row gap 20, 1200×208): highlight 580 wide "56 MB → 1.5 MB" "Photography payload" "Compare the source renders with the shipped assets in the Network panel." · "0" "Third-party requests" "Open the Network panel and filter by domain. Everything is first-party." · "0" "Console errors" "Open the Console on the live URL." (each 290, w:fill, grow)
    - **Honesty note** (row gap 16, pad 20/24/20/24, 1200×88, w:fill, bg #FFFFFF @6%, r 20, border #FFFFFF @12% 1)
      - icon info 22px
      - T "These are build-quality measurements, not business outcomes. B3TTER is a concept brand with no customers, so there is no traffic, revenue or conversion data to report, and we are not going to invent any." — IBM Plex Sans Regular 15/155%, surface
    - ⧉ Button Style=Light "Open the live site" (205×52)
  - **06 · Next case study** (col gap 56, pad 120/120/24/120, 1440×454, w:fill, bg canvas)
    - **Next project card (LINKED CARD)** (row gap 48, pad 24/48/24/24, align center, 1200×310, w:fill, bg surface, r 32, border line 1)
      - **Image · Point Break screenshot (replace)** (420×260, placeholder gradient(#0F3B4C 0%, #2C8C99 60%, #F2D8A7 100%), r 20)
      - **Frame** (col gap 14, w:fill, grow)
        - T "NEXT CASE STUDY" — Oswald Medium 13 ls 6%, coral
        - T "Point Break Surf Academy" — IBM Plex Sans SemiBold 40/110% ls -2%, ink
        - T "Concept build  ·  Design · Development · Booking UX" — IBM Plex Sans Regular 15, muted
      - **Arrow chip** (row, align center/center, 64×64, bg ink, r 999) → icon arrow 32px
  - **07 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×754, w:fill, bg canvas)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×504, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 900×312, w:fill, grow)
        - ⧉ Tag Tone=OnDark "YOUR PROJECT" (102×30)
        - T "WANT A WEBSITE ⏎ LIKE THIS?" — Oswald Medium 96/94%, surface
        - T "Tell us what you sell and who you sell it to. We’ll tell you honestly whether a new site is the thing that will move the needle." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 300×116)
        - ⧉ Button Style=Light "Start your project" (300×52, w:fill)
        - ⧉ Button Style=Coral "See all work" (300×52, w:fill)
    - **Footer** — shared desktop footer

### Case study — B3TTER — Mobile (390) — node 18:171 (390×6928)
- **Case study — B3TTER — Mobile (390)** (col, 390×6928, bg canvas)
  - **00 · Site header** — shared mobile header
  - **01 · Case hero** (col gap 24, pad 24/20/40/20, 390×1492, w:fill, bg canvas)
    - **Back link** (row gap 8): icon back 16px · T "All work" — IBM Plex Sans Medium 14, muted
    - **Tags** (row gap 8): ⧉ Tag Tone=Coral "CONCEPT BUILD" · ⧉ Tag Tone=Neutral "2026"
    - T "B3TTER" — Oswald Medium 96/90%, ink
    - T "A premium product page for a single-item brand, built to look expensive, work for every visitor and stay fast." — IBM Plex Sans Medium 19/140% ls -1%, ink
    - **Media · walkthrough video (replace, 4:5)** (col, align center/center, 350×440, w:fill, poster gradient placeholder, r 24) → **Play** (80×80, bg surface, r 999) icon play 28px
    - T "Full walkthrough · recorded end to end, no cuts. Portrait 4:5 crop on mobile." — IBM Plex Sans Regular 13, muted (caption)
    - ⧉ Button Style=Primary "Open the live site" (350×52, w:fill)
    - **Meta + snapshot** (col, pad 0/20/0/20, 350×517, w:fill, bg surface, r 20, border line 1) — rows (col gap 4, pad 16/0/16/0, w:fill; all but last border line 0/0/1/0): T label — Oswald Medium 11 ls 6% (muted for YEAR/SERVICE, coral for the rest) · T value — IBM Plex Sans Medium 15/145%, ink
      - "YEAR" "2026" · "SERVICE" "Design & front-end development" · "CLIENT" "B3TTER (a GoodGround concept brand)" · "INDUSTRY" "Outdoor gear, direct to consumer" · "SERVICES" "Design, front-end build, image optimisation, accessibility, SEO setup" · "DETAILS" "Hand-written HTML, CSS and JavaScript. No framework, no build step, no third-party requests."
  - **03 · The brief & the challenge** (col gap 28, pad 64/20/64/20, 390×837, w:fill, bg surface)
    - **Label** (col gap 8): T "01" — Oswald Medium 13 ls 6%, coral · T "The brief" — IBM Plex Sans SemiBold 32 ls -2%, ink
    - T "B3TTER needed a product page that could carry a premium single-item brand on its own: just one bottle that had to look and feel expensive from the first scroll." — IBM Plex Sans Medium 19/145% ls -1%, ink
    - rectangle 350×1 line
    - **Label**: T "02" · T "The challenge"
    - T "Most product pages for physical goods fail in the same two places." — IBM Plex Sans Medium 19/145% ls -1%, ink
    - **Problem rows** (row gap 14, pad 18, 350×103, w:fill, bg canvas, r 20): **Frame** (40×40, bg blush, r 12) → icon 20px · **Frame** (col gap 4, w:fill, grow): T — IBM Plex Sans SemiBold 16 ls -1%, ink + T — IBM Plex Sans Regular 14/150%, muted
      - phone "Photos stall the page on a phone" "Heavy photography freezes the page on mobile data."
      - keyboard "Interactive parts assume a mouse" "Keyboard and screen-reader users get stuck."
  - **04 · The solution** (col gap 28, pad 64/20/64/20, 390×2297, w:fill, bg canvas)
    - **Section header** (col gap 14): ⧉ Tag Tone=Neutral "03 / THE SOLUTION" · T "Four problems, solved one at a time." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Feature block (mobile)** (col gap 16, 350 wide, w:fill): visual card (350×300, pad 24/20/24/20, r 24) on top, then T "0n  ·  {KICKER}" — Oswald Medium 12 ls 6%, coral · T title — IBM Plex Sans SemiBold 24/115% ls -1%, ink · T body — IBM Plex Sans Regular 15/155%, muted (no point list on mobile)
    - **COLOUR**: visual bg surface, border line 1, col gap 16, centred: bottle placeholder 96×180 r 80 + 6 swatches 44×44 (row gap 8) · title "The product carries the colour, the interface stays silent" · body "Every bit of colour comes from the bottle. Swatches fade between six real photographs, preloaded, and work with arrow keys."
    - **SPECIFICATIONS**: visual bg lilac, col gap 10: row 1 (row gap 10, 310×110) "24h" Cold (bg ink) + "750ml" Capacity · row 2 "12h" Hot · "18/8" Steel · "0" BPA — tiles (col gap 2, pad 12/14/12/14, align bottom, r 14) value Oswald Medium 26, label IBM Plex Sans Regular 11 · title "A spec section that doesn’t feel like a spec sheet" · body "Large and small tiles give the eye somewhere to land, with no orphan tiles at any width."
    - **PERFORMANCE**: visual bg ink, col gap 18, centred: bar rows (col gap 8, 310×55) "Original renders" "56 MB" (Oswald Medium 22) track 14 tall fill full @35% · "Shipped" "1.5 MB" fill 9 wide coral · "97%" — Oswald Medium 64/100%, peach + "lighter" — IBM Plex Sans Medium 16, surface · title "56 MB of photography, shipped as 1.5 MB" · body "27 photos compressed and resized to exactly what they need, transparent cut-outs kept, nothing fetched from third parties."
    - **ACCESSIBILITY**: visual bg blush, col gap 16, centred: key caps (row gap 8; pad 12/14/12/14, h 44, r 12, shadow 0 3 0 #121212@12%) "Tab" "←" "→" "Enter" — IBM Plex Sans SemiBold 14 · reduce-motion row (row gap 12, pad 14/16/14/16, 310×64, bg surface, r 16): "Reduce motion" — SemiBold 14 + "All animations off" — Regular 12 muted · switch 44 wide (on) · title "Accessible because it was checked, not assumed" · body "Everything works by keyboard, screen readers only hear the visible review, and reduced motion turns every animation off."
  - **05 · The results** (col gap 28, pad 64/20/64/20, 390×1049, w:fill, bg ink)
    - **Section header** (col gap 14): ⧉ Tag Tone=OnDark "04 / THE RESULTS" · T "Measured on the live URL. Check them yourself." — IBM Plex Sans SemiBold 32/110% ls -2%, surface
    - **Stats** (col gap 12, 350×524) — card (col gap 8, pad 20, r 20): value Oswald Medium 44/100%, surface · label IBM Plex Sans SemiBold 15, surface · check IBM Plex Sans Regular 13/150% (onDarkMuted; surface on the coral card)
      - Highlight (350×160, bg coral): "56 MB → 1.5 MB" "Photography payload" "Compare source renders with shipped assets in the Network panel."
      - Row (row gap 12, 160 tall, bg #FFFFFF @6%): "100" "Accessibility" "Lighthouse on the live URL." · "100" "Best Practices" "Same audit, same run."
      - Row (180 tall): "0" "Third-party requests" "Network panel, filter by domain." · "0" "Console errors" "Console on the live URL."
    - **Honesty note** (row gap 12, pad 16, 350×112, w:fill, bg #FFFFFF @6%, r 16): icon info 20px · T "Build-quality measurements, not business outcomes. B3TTER is a concept brand with no customers, so there is no traffic, revenue or conversion data to report." — IBM Plex Sans Regular 13/155%, surface
    - ⧉ Button Style=Light "Open the live site" (350×52, w:fill)
  - **06 · Next case study** (col gap 28, pad 64/20/16/20, 390×374, w:fill, bg canvas)
    - **Next project card** (col gap 14, pad 12/12/20/12, 350×294, w:fill, bg surface, r 24, border line 1)
      - **Image · Point Break (replace)** (324×200, w:fill, gradient placeholder, r 16)
      - **Frame** (row gap 12, pad 0/8/0/8, align center, 324×46, w:fill)
        - **Frame** (col gap 4, w:fill, grow): T "NEXT CASE STUDY" — Oswald Medium 11 ls 6%, coral · (continues)


          - T "Point Break Surf Academy" — IBM Plex Sans SemiBold 20 ls -1%, ink
        - **Arrow chip** (row, align center/center, 44×44, bg ink, r 999) → icon arrow 22px
  - **07 · CTA + footer** (col gap 24, pad 12/12/32/12, 390×801, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×523, w:fill, bg #3A1A44, r 32)
      - ⧉ Tag Tone=OnDark "YOUR PROJECT" (102×30)
      - T "WANT A ⏎ WEBSITE ⏎ LIKE THIS?" — Oswald Medium 60/94%, surface
      - T "Tell us what you sell and who you sell it to. We’ll tell you honestly whether a new site will move the needle." — IBM Plex Sans Regular 15/150%, surface
      - ⧉ Button Style=Light "Start your project" (318×52, w:fill)
      - ⧉ Button Style=Coral "See all work" (318×52, w:fill)
    - **Footer** — shared mobile footer (with tagline, as on Home mobile)



---

# Pricing

| | |
|---|---|
| **URL** | `/pricing` |
| **Figma page** | `50:150` |
| **Desktop frame (1440)** | 50:151 |
| **Mobile frame (390)** | 53:206 |
| **Extra states / boards** | Mobile build sheet 53:469 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Build-your-own configurator: prices and totals live in one data file so they change in one place.
- Package links pass ?package=micro|launch|grow|scale to /start-project; Full service passes ?service=full-service&ref=pricing.
- Number format is open item 4.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /pricing page — node 54:225
PAGE · READ FIRST
/pricing: one pricing source, the configurator and the quote form
ONE SOURCE OF TRUTH FOR EVERY PRICE
•  All prices on this page come from one pricing collection in the CMS: packages (name, from price, inclusions, best for, timeline, revisions, recommended flag), Full Service (from price), Launch Offer (monthly, months, total), base build fee and every à la carte item (category, name, price, unit: flat | per item | from).
•  The same collection feeds the /services price labels, the homepage launch offer, and the plan cards and add-on chips inside Insights articles. Change a price once; it updates everywhere.
•  All figures shown are from the live /pricing page. Grow keeps its live “RECOMMENDED” tag.
MONEY FORMATTING & MATHS
•  Format: “R12,000” (comma thousands). The live site uses a space (“R12 000”); pick one site-wide before launch.
•  12-instalment amount = total ÷ 12, rounded up to the nearest rand (R19,400 → R1,617). The final instalment balances the total. Deposit = total ÷ 2.
•  Items priced “from” (custom logo, illustrations, icon set) add their from-price and switch the total label to “From R…”, with a line: “Items marked ‘from’ are confirmed in your quote.”
CONFIGURATOR RULES
•  Base Build Fee (R6,000) is always included and can’t be removed.
•  Flat items use an Add / Added toggle. Per-item items (extra pages, complex pages, blog posts, copywriting, content upload, animations per page, illustrations per page, languages) use a stepper from 0 to 20.
•  Package hint: when the total comes within R3,000 of a package’s from-price (or passes it), suggest the highest such package, with “Compare” jumping to its card. One hint at a time.
•  The build is saved in localStorage and mirrored in the URL (?build=… compact code), so “Edit” from the quote form, refreshes and shared links all restore it.
QUOTE FORM (THIS PAGE)
•  “View & send” scrolls to #quote and attaches the build (chips, total, chosen payment option). “Choose {package}” attaches that package and billing choice the same way. “Edit” returns to the configurator.
•  Submits to the same endpoint as /start-project with formType=pricing-quote plus the build or package payload. Same validation, spam rules, auto-reply (subject “Your quote request is in”), success and failure states.
•  /start-project also accepts ?package=micro|launch|grow|scale for links from elsewhere (e.g. article plan cards).
SEO
•  <title>: “Pricing | Website Design Packages, South Africa | GoodGround” (keep live).
•  JSON-LD: Service with Offers for each package (price, priceCurrency ZAR, “starting from” via priceSpecification minPrice), Full Service as a monthly offer, plus FAQPage and BreadcrumbList.

### Notes · PR 01 Hero — node 54:244
01 · Hero + jump links
BEHAVIOUR
•  Tag FADE-UP → headline LINE MASK → copy and jump links FADE-UP.
•  Jump links smooth-scroll to #ways-to-pay, #packages, #full-service, #build-your-own (120px offset). They are anchors, not tabs.

### Notes · PR 02 Ways to pay — node 54:251
02 · Four ways to pay
ENTRANCE
•  HEADER REVEAL; row labels fade in; the four columns STAGGER GRID 100ms; inside each column the values reveal row by row (40ms stagger). Monthly and total figures COUNT-UP.
INTERACTION
•  Column hover (desktop): ring + others dim to 85% (as on the /services comparison).
•  Real table semantics: columns are the four ways; rows are Upfront, Monthly, How long, Total over 12 months, What you get, At the end.
MOBILE
•  Swipeable cards (scroll-snap, 280px) showing Monthly and Total; “See all details” expands that card to the full six rows (accordion).

### Notes · PR 03 Packages — node 54:264
03 · Packages + billing toggle
BILLING TOGGLE
•  Segmented control: “50% deposit” (default) | “12 monthly instalments”. The ink pill slides (motion/md).
•  Deposit view: big “from R12,000” with “R6,000 deposit + R6,000 on completion” in coral and “or R1,000/mo × 12” muted. Instalment view swaps them: big “R1,000/mo”, small “× 12 · total from R12,000”. Numbers crossfade with a 6px vertical slide (motion/sm); widths are reserved so cards don’t jump.
•  The choice is remembered (localStorage) and carried into “Choose {package}” and the configurator’s payment toggle.
ENTRANCE & HOVER
•  Cards STAGGER GRID 100ms; Grow lands last with scale 0.97 → 1.
•  Hover (desktop): non-recommended cards lift -4px; Grow keeps its lift and adds a soft coral glow (shadow 0 24px 48px coral at 20%).
MOBILE
•  Collapsed cards showing name and price; tap to expand inclusions (accordion, one open). Grow is open by default.

### Notes · PR 04 Full Service — node 54:277
04 · Full Service
BEHAVIOUR
•  Band FADE-UP; inclusion chips STAGGER 50ms; “R1,500” COUNT-UP. Button → /start-project?service=full-service&ref=pricing.

### Notes · PR 05 Configurator — node 54:284
05 · Build-your-own configurator
ADDING & REMOVING
•  Add → Added: the button fills ink, the plus rotates into a check (motion/sm); the row background flashes blush for 600ms.
•  Stepper: − / + change the count (min 0, max 20); holding a button repeats after 400ms. The row turns blush with a coral border when the count is above 0. Keyboard: the value is an input type="number"; arrow keys change it.
•  Category headers show “{n} added · {total} items”. Groups with something added open by default; others start closed.
LIVE SUMMARY (DESKTOP, STICKY TOP 120PX)
•  New line items slide in from the right (12px + fade, motion/sm); removed ones collapse (height to 0, motion/sm). Each has a remove “×”.
•  The total rolls to its new value (COUNT-UP from the old value, 500ms). The payment split updates with it.
•  Payment toggle: 50% deposit shows two tiles (deposit / on completion); 12 instalments shows the monthly figure. Same pill animation as the packages toggle.
•  Package hint slides down when its rule is met and up when it isn’t (motion/md).
•  An aria-live region announces “Total now R19,400”.
MOBILE
•  The summary becomes a sticky total bar fixed to the bottom of the screen (total + monthly figure + “View & send”). It appears once the configurator enters view and hides when the quote form is visible.
•  Tapping the bar opens the “Your build” bottom sheet (state frame beside the mobile page) with line items, payment toggle and “Send this build”. Same sheet behaviour as other sheets (drag, backdrop, Esc, focus trap).
•  Each item row stacks its name above the price and control; controls are at least 44px.

### Notes · PR 06–08 — node 54:297
06 · Review  ·  07 · FAQ  ·  08 · Quote form
06 · REVIEW
•  Card FADE-UP; stars fill in sequence (60ms); the “12 × monthly” bars grow (30ms stagger).
07 · FAQ
•  Same accordion and FAQPage behaviour as elsewhere; first item open.
08 · QUOTE FORM
•  Arriving from “View & send” or “Choose …”: the attached-build card pulses once (coral ring fading over 1.2s) and focus moves to the name field.
•  With nothing attached, the attached card is hidden and the copy reads “or nothing at all and we’ll talk it through”.
•  Field behaviour, sending, success and failure exactly as /start-project Step 4.
MOBILE
•  Form full width; the sticky total bar hides while the form is in view.

### Notes pointer · mobile — node 54:313
MOBILE · PAGE + “YOUR BUILD” SHEET
The sticky total bar sits at the bottom of the screen while the configurator is in view; tapping it opens the sheet on the right. Behaviour is in note 05.

## Layer-by-layer spec

### Pricing — Desktop (1440) — node 50:151 (1440×8195)
- **Pricing — Desktop (1440)** (col, 1440×8195, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "PRICING" (86×44)
  - **01 · Hero** (col gap 48, pad 64/120/56/120, 1440×570, w:fill, bg canvas)
    - **Frame** (col gap 24, 1200×450, w:fill)
      - ⧉ Tag Tone=Coral "PRICING" (68×30)
      - T "SIMPLE PRICING, BUILT AROUND WHAT YOU ACTUALLY NEED." — Oswald Medium 104/92%, ink
      - **Frame** (row gap 48, align space_between/max, 1200×84, w:fill)
        - T "Pick a package, build your own from the menu, or have everything handled for one monthly price. Every price is a real number, and every build gives you a choice of how to pay." — IBM Plex Sans Regular 18/155%, muted
        - **Jump links** (row gap 8, 539×40) — pills (row gap 6, pad 10/14/10/16, align center, r 999): T — IBM Plex Sans Medium 14 · icon down 14px
          - "Ways to pay" (bg ink, text surface) · "Packages" · "Full Service" · "Build your own" (bg surface, border line 1, text ink)
  - **02 · Four ways to pay (comparison)** (col gap 48, pad 120, 1440×1069, w:fill, bg canvas) — id="ways-to-pay"
    - **Section header** (row, align space_between/max, 1200×111, w:fill)
      - **Frame** (col gap 20, 760×111)
        - ⧉ Tag Tone=Neutral "WAYS TO PAY" (94×32)
        - T "Four ways to pay, side by side." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Package and Full Service figures are starting prices. Your quote confirms the real number before work begins, and it doesn’t change once you accept it." — IBM Plex Sans Regular 17/155%, muted
    - **Ways-to-pay comparison** (row gap 12, 1200×670, w:fill)
      - **Row labels** (col, pad 120/0/0/0, 150×670, h:fill) — label cells (row, pad 14/0/0/0, w:fill) T — Oswald Medium 12 ls 6%, muted, with heights matching the value rows:
        - "UPFRONT" 56 · "MONTHLY" 56 · "HOW LONG" 96 · "TOTAL OVER 12 MONTHS" 64 · "WHAT YOU GET" 110 · "AT THE END" 80
      - **Way column** (col, pad 20, ~252×670, w:fill, grow, r 24):
        - **Head** (col gap 4, 210×100, w:fill): T name — IBM Plex Sans SemiBold 19/120% ls -1% · T sub — IBM Plex Sans Regular 13/140%
        - **Value cells** (col, pad 14/0/10/0, w:fill, border 1/0/0/0 line — #FFFFFF @15% in the plum column), heights 56/56/96/64/110/80. Text values: IBM Plex Sans Medium 13.5/140%. Money values: Oswald Medium 22.
        - **CTA cell** (col, pad 12/0/0/0, w:fill) → Button
      - Column 1 · **A package, paid by deposit** (bg surface, border line 1, text ink, sub muted): sub "Micro, Launch, Grow or Scale" · Upfront "Half the price, from R6,000" · Monthly "Nothing" (Oswald) · How long "Other half on completion, before handover" · Total "From R12,000" (Oswald) · What you get "The build. Hosting, domain and upkeep arranged separately." · At the end "Paid off. The site is yours." · ⧉ Button Style=Outline "See the packages" (208×54)
      - Column 2 · **A package, in 12 instalments** (bg surface, border line 1): sub "Micro, Launch, Grow or Scale" · "First instalment, from R1,000" · "From R1,000" (Oswald) · "12 payments: the first books your slot, the other 11 start once your site is finished" · "From R12,000" (Oswald) · "The build, with basic maintenance and monitoring while you pay it off." · "Paid off. The site is yours." · ⧉ Button Style=Outline "See the packages"
      - Column 3 · **Full Service** (bg plum, text surface, sub onDarkMuted): sub "One monthly price, everything handled" · "No separate build fee" · "From R1,500" (Oswald) · "Month to month. Cancel any time." · "From R18,000" (Oswald) · "Build, hosting, mailboxes, ongoing SEO, updates and maintenance." · "No end date. It runs for as long as you stay on it." · ⧉ Button Style=Coral "See Full Service" (195×52)
      - Column 4 · **Website Launch Offer** (bg blush, text ink): sub "New businesses without a website. One page." · "No deposit" · "R845" (Oswald, coral) · "12 months" · "R10,140" (Oswald) · "One-page site, SEO setup, and domain, hosting and email for 12 months." · "Yours: we transfer the domain and site, or you move to a Care Plan." · ⧉ Button Style=Outline "See the Launch Offer" (232×54)
  - **03 · Packages (with billing toggle)** (col gap 48, pad 120, 1440×1407, w:fill, bg surface) — id="packages"
    - **Section header** (row, align space_between/max, 1200×170, w:fill)
      - **Frame** (col gap 20, 760×170)
        - ⧉ Tag Tone=Neutral "THE PACKAGES" (103×32)
        - T "Four starting points. Pick the one closest to your brief." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - **Billing toggle** (row gap 4, pad 4, 321×50, bg canvas, r 999)
        - **Option (selected)** (row, pad 12/18/12/18, 119×42, bg ink, r 999) → T "50% deposit" — IBM Plex Sans SemiBold 14, surface
        - **Option** (row, pad 12/18/12/18, 190×42, r 999) → T "12 monthly instalments" — IBM Plex Sans SemiBold 14, ink
    - **Package cards** (row gap 16, 1200×777, w:fill) — 4 cards (col gap 16, pad 24, 288×777, w:fill, grow, r 28):
      - **Name row** (row, align space_between/center, 240×36): T NAME — Oswald Medium 24 ls 4% · optional Tag
      - T "{tagline}" — IBM Plex Sans Regular 14/150%
      - **Price block** (col gap 4, pad 8/0/8/0, w:fill): **Frame** (row gap 6, align baseline): T "from" — IBM Plex Sans Regular 13 + T "{price}" — Oswald Medium 48/100% · T "{deposit split}" — IBM Plex Sans Medium 13 (coral; peach on Grow) · T "{monthly}" — IBM Plex Sans Regular 13
      - Button (240×52, w:fill)
      - rectangle 240×1 (line; #FFFFFF @15% on Grow)
      - **Inclusions** (col gap 10, w:fill): rows (row gap 10, w:fill) icon check 16px + T — IBM Plex Sans Regular 14/140%
      - spacer (grow) so every card's "Best for" box sits at the bottom
      - **Best for** (col gap 6, pad 12/14/12/14, w:fill, r 14): T "Best for: …" — IBM Plex Sans Regular 12.5/145% · **Frame** (row gap 6, align center) icon clock 14px + T timeline — IBM Plex Sans Medium 12.5
    - **Micro** — bg canvas, text ink, muted subcopy · "A sharp, single-page site for a strong first impression." · from R12,000 · "R6,000 deposit + R6,000 on completion" · "or R1,000/mo × 12" · ⧉ Button Style=Primary "Choose Micro"
      - Inclusions: "1 page with distinct scroll sections" · "Fully custom-coded, mobile-responsive" · "Custom micro-interactions" · "Contact section with working form" · "Basic on-page SEO" · "1 round of revisions"
      - Best for (bg surface): "Best for: Solo freelancers, personal brands, pop-ups, events, holding pages" · "~1 week"
    - **Launch** — bg canvas · "A clean, professional website to get you online fast." · from R21,000 · "R10,500 deposit + R10,500 on completion" · "or R1,750/mo × 12" · ⧉ Button Style=Primary "Choose Launch"
      - Inclusions: "Up to 5 pages" · "Fully custom-coded, mobile-responsive" · "Contact form with email notifications" · "Basic on-page SEO" · "Social media links" · "1 round of revisions"
      - Best for: "Best for: New businesses or solo founders who need a credible presence" · "~2 weeks"
    - **Grow** — bg plum, text surface, subcopy onDarkMuted · ⧉ Tag Tone=Coral "RECOMMENDED" (103×30) · "Fully custom, with the interactive touches that make you stand out." · from R32,000 · "R16,000 deposit + R16,000 on completion" (peach) · "or R2,667/mo × 12" · ⧉ Button Style=Coral "Choose Grow"
      - Inclusions: "Up to 10 pages, incl. Blog/News" · "Unique design, no templates" · "Custom interactive elements" · "Forms with conditional logic" · "Integrations: maps, booking, WhatsApp" · "SEO + Analytics & Search Console" · "2 rounds of revisions"
      - Best for (bg #FFFFFF @8%, text surface, timeline peach): "Best for: Small businesses ready to market online and stand out" · "~3–4 weeks"
    - **Scale** — bg canvas · "A fully custom platform built to be your business hub online." · from R45,000 · "R22,500 deposit + R22,500 on completion" · "or R3,750/mo × 12" · ⧉ Button Style=Primary "Choose Scale"
      - Inclusions: "15+ pages, fully custom" · "Advanced functionality: multi-step forms, calculators, APIs" · "Advanced interactive design" · "Advanced SEO + speed optimisation" · "Copywriting guidance for key pages" · "3 rounds of revisions" · "1-hour training session"
      - Best for: "Best for: Businesses that need the site to be a real sales or operations tool" · "~4–6 weeks, priority scheduling"
    - **Starting prices strip** (row gap 24, pad 24/28/24/28, align center, 1200×124, w:fill, bg mint, r 24)
      - **Frame** (col gap 6, 948×76, w:fill, grow)
        - T "These are starting prices, not quotes." — IBM Plex Sans SemiBold 20 ls -1%, ink
        - T "A five-page site for a plumber and one for a law firm rarely take the same work. We look at your project first and come back with a price, usually within a day or two. Once you accept it, that’s the price: nothing gets added at the end. No e-commerce or member-portal builds." — IBM Plex Sans Regular 14/155%, muted
      - ⧉ Button Style=Primary "Get my price" (172×52)
  - **04 · Full Service** (col gap 40, pad 0/120/120/120, 1440×505, w:fill, bg surface) — id="full-service"
    - **Full Service band** (row gap 48, pad 48, align center, 1200×385, w:fill, bg plum, r 32)
      - **Frame** (col gap 16, 696×289, w:fill, grow)
        - ⧉ Tag Tone=OnDark "MONTHLY · CANCEL ANY TIME" (176×30)
        - T "FULL SERVICE" — Oswald Medium 56, surface
        - T "Everything handled, for one monthly price. We build the site, host it, run the mailboxes, and keep it working." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Inclusion chips** (row wrap gap 10, 696×76, w:fill) — chips (row gap 8, pad 8/14/8/12, align center, bg #FFFFFF @8%, r 99): icon check 14px + T — IBM Plex Sans Medium 13, surface
          - "Website build, custom-coded" · "Hosting, managed" · "Business mailboxes, managed" · "Ongoing SEO" · "Updates & maintenance"
      - **Price card** (col gap 12, pad 28, 360×249, bg surface, r 24)
        - **Frame** (row gap 6, align baseline): T "from" — IBM Plex Sans Regular 13, muted · T "R1,500" — Oswald Medium 56/100%, ink · T "/mo" — IBM Plex Sans Regular 16, muted
        - T "Exact monthly price depends on your website’s requirements and is confirmed in your quote. No minimum term." — IBM Plex Sans Regular 13/150%, muted
        - ⧉ Button Style=Coral "Get a Full Service quote" (304×52, w:fill)
  - **05 · Build your own (configurator)** (col gap 40, pad 120, 1440×1934, w:fill, bg canvas) — id="build-your-own"
    - **Frame** (row, align space_between/max, 1200×168, w:fill)
      - **Frame** (col gap 20, 760×168)
        - ⧉ Tag Tone=Coral "BUILD YOUR OWN" (116×30)
        - T "Pick a starting point. Add exactly what you need." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Every build starts from the same base. Add what your business needs, watch the total update live, and send it through when you’re ready." — IBM Plex Sans Regular 17/155%, muted
    - **Configurator** (row gap 32, 1200×1486, w:fill)
      - **Item menu** (col gap 12, 748×1486, w:fill, grow)
        - **Base build (always included)** (row gap 16, pad 22/24/22/24, 748×111, w:fill, bg ink, r 22)
          - **Frame** (36×36, bg surface, r 999) → icon lock 18px
          - **Frame** (col gap 4, w:fill, grow): T "Base Build Fee" — IBM Plex Sans SemiBold 18, surface · T "Homepage, fully custom-coded & mobile-responsive, 1 contact form, basic on-page SEO, 1 round of revisions." — IBM Plex Sans Regular 13.5/150%, onDarkMuted
          - T "R6,000" — Oswald Medium 28, surface
        - **Group (accordion)** (col, pad 0/24/0/24, 748 wide, w:fill, bg surface, r 22, border line 1)
          - **Group header** (row gap 12, pad 18/0/18/0, align center, 698×59, w:fill): T "{group}" — IBM Plex Sans SemiBold 18 ls -1%, ink · T "{n added · } {total} items" — IBM Plex Sans Regular 13 (coral when something is added, else muted) · icon chevron 18px
          - **Item row** (row gap 16, pad 14/0/14/0, align center, 698×62–67, w:fill, border line 1/0/0/0): T "{item}" — IBM Plex Sans 15 (Medium ink when selected, Regular ink when not) · T "{price}" — IBM Plex Sans SemiBold 15 (ink when selected, muted when not) · control
          - **Stepper** (row gap 4, pad 4, align center, 102×38, r 999): **Frame** (28×28, r 999) icon minus 14px · value T — IBM Plex Sans SemiBold 14, ink · **Frame** (28×28, bg surface, r 999) icon plus 14px. Count > 0: bg blush, border coral 1, minus button bg surface. Count 0: bg surface, border line 1, minus button bg canvas.
          - **Toggle · added** (row gap 6, pad 8/14/8/12, align center, 86×33, bg ink, r 999): icon check 14px + T "Added" — IBM Plex Sans SemiBold 13, surface
          - **Toggle · add** (row gap 6, pad 8/14/8/12, align center, 73×35, bg surface, r 999, border line 1): icon plus 14px + T "Add" — IBM Plex Sans SemiBold 13, ink
        - Groups shown in the design (open groups list their items):
          - **Pages** — "2 added · 4 items" (open)
            - "Additional standard page (About, Services, Contact…)" · "R2,500 each" · stepper = 2
            - "Complex / custom-layout page" · "R4,000 each" · stepper = 0
            - "Blog / News section setup (template + first post)" · "R4,500" · Added
            - "Additional blog post (written & uploaded)" · "R600 each" · stepper = 0
          - **Design** — "4 items" (closed)
          - **Functionality & interactivity** — "7 items" (closed)
          - **Integrations** — "1 added · 6 items" (open)
            - "Google Maps embed" R700 Add · "WhatsApp chat button" R900 Added · "Calendar / booking widget" R2,000 Add · "Newsletter signup (Mailchimp or similar)" R1,200 Add · "Social media feed embed" R1,000 Add · "Live chat widget" R1,300 Add
          - **SEO & performance** — "1 added · 3 items" (open)
            - "Advanced SEO (keywords, schema, meta strategy)" R3,000 Added · "Site speed optimisation" R2,500 Add · "Google Analytics & Search Console setup" R1,000 Add
          - **Content** — "3 items" (closed)
          - **Extras** — "5 items" (closed)
          - (Closed groups' items come from the live /pricing page's à la carte list.)
        - T "All à la carte prices are per item unless stated. Your free quote confirms the final total before work begins." — IBM Plex Sans Regular 13, muted
      - **Your build (sticky summary)** (col gap 16, pad 28, 420×727, bg surface, r 28, border line 1, shadow 0 20 48 #2E1747@10%) — position sticky top 120
        - **Frame** (row, align space_between/center, 362×29): T "Your build" — IBM Plex Sans SemiBold 22 ls -1%, ink · T "Reset" — IBM Plex Sans Medium 13, coral
        - **Line items** (col gap 10, 362×150, w:fill) — rows (row gap 10, align center, w:fill): T name — IBM Plex Sans Regular 14, ink (w:fill) · T price — IBM Plex Sans SemiBold 14, ink · remove **Frame** (22×22, bg canvas, r 999) → icon x 11px (empty 22×22 slot for the base fee)
          - "Base Build Fee" R6,000 (no remove) · "Additional standard page × 2" R5,000 · "Blog / News section setup" R4,500 · "WhatsApp chat button" R900 · "Advanced SEO" R3,000
        - rectangle 362×1 line
        - **Total** (row, align space_between/baseline, 362×54): T "Total, fixed" — IBM Plex Sans Medium 15, muted · T "R19,400" — Oswald Medium 52/100%, ink
        - **Payment toggle** (row gap 4, pad 4, 362×45, w:fill, bg canvas, r 999): "50% deposit" · "12 instalments" (selected: bg ink, text surface) — IBM Plex Sans SemiBold 13
        - **Split (12 instalments)** (col gap 6, pad 14/16/14/16, 362×132, w:fill, bg blush, r 16)
          - **Frame** (row gap 6, align baseline): T "R1,617" — Oswald Medium 30, coral · T "/mo × 12" — IBM Plex Sans Regular 14, muted
          - T "The first instalment books your slot; the other 11 start once your site is finished. Rounded to the rand; the final instalment balances the total." — IBM Plex Sans Regular 12/150%, muted
        - **Package hint** (row gap 10, pad 12/14/12/14, 362×62, w:fill, bg mint, r 14): icon bulb 18px · T "Close to Launch (from R21,000): up to 5 pages, contact form, basic SEO and social links. Compare →" — IBM Plex Sans Regular 12.5/150%, ink
        - ⧉ Button Style=Coral "View & send" (362×52, w:fill)
        - T "Sends this build with your quote request. Nothing is charged." — IBM Plex Sans Regular 12, muted
  - **06 · From a client** (col gap 40, pad 120, 1440×632, w:fill, bg surface)
    - **Review card** (row gap 48, pad 48, align center, 1200×392, w:fill, bg canvas, r 32)
      - **Frame** (col gap 20, 756×296, w:fill, grow)
        - **Stars** (row gap 3, 112×20): icon star 20px ×5

        - T "“One of the biggest benefits for us was the option to pay the project off over 12 months, while still receiving ongoing support throughout that period.”" — IBM Plex Sans SemiBold 30/130% ls -1%, ink
        - T "We partnered with GoodGround from the very early stages of Roam Local, helping us turn our initial idea into a clear plan and ultimately a fully developed website. Communication was excellent, everything was clearly explained, and we always knew where the project stood." — IBM Plex Sans Regular 16/160%, muted
        - **Frame** (row gap 16, align center, 756×21, w:fill)
          - T "Roam Local" — IBM Plex Sans SemiBold 16, ink
          - T "Read the full review on Google →" — IBM Plex Sans Medium 14, coral
      - **Their plan** (col gap 12, pad 24, 300×210, bg plum, r 24)
        - T "HOW THEY PAID" — Oswald Medium 12 ls 6%, onDarkMuted
        - T "12 × monthly" — Oswald Medium 40, surface
        - **Bars** (row gap 3, align max, 252×32, w:fill): rectangle 18×32 coral r4 + 11 × rectangle 18×24 #FFFFFF @20% r4
        - T "With ongoing support throughout." — IBM Plex Sans Regular 13, onDarkMuted
  - **07 · FAQ** (col gap 40, pad 120, 1440×972, w:fill, bg canvas)
    - **Frame** (row gap 80, 1200×732, w:fill)
      - **Frame** (col gap 20, 400×154)
        - ⧉ Tag Tone=Neutral "COMMON QUESTIONS" (135×32)
        - T "Before you send that enquiry." — IBM Plex Sans SemiBold 48/106% ls -2%, ink
      - **Accordion** (col gap 10, 720×732, w:fill, grow)
        - **Item (open)** (col gap 10, pad 16/16/16/24, 720×124, w:fill, bg surface, r 18, border line 1)
          - **Frame** (row gap 12, align center, 678×32): T "Do these prices include hosting and a domain?" — IBM Plex Sans SemiBold 16, ink · **Frame** (32×32, bg ink, r 999) → icon minus 16px
          - T "No. Hosting, domain and upkeep are arranged separately from the build price. Full Service and the Website Launch Offer are the exceptions: both include hosting in the monthly price." — IBM Plex Sans Regular 15/160%, muted
        - **Items (closed)** (col gap 10, pad 16/16/16/24, 720×66, bg surface, r 18, border line 1; chip 32×32 bg canvas, icon plus 16px; question IBM Plex Sans SemiBold 16, ink):
          - "How do I pay, and is there a deposit?" · "Why does every package say “from”?" · "What if my scope grows partway through?" · "What looks after the site once it’s live?" · "Full Service or instalments: which should I choose?" · "Do I own my website?" · "How many rounds of revisions do I get?" · "How soon will I hear back after I enquire?"
  - **08 · Get your quote (form)** (col gap 40, pad 120, 1440×773, w:fill, bg plum) — id="quote"
    - **Frame** (row gap 64, 1200×533, w:fill)
      - **Frame** (col gap 20, 616×533, w:fill, grow)
        - ⧉ Tag Tone=OnDark "GET YOUR QUOTE" (113×30)
        - T "LET’S TURN THIS INTO A FIRM QUOTE." — Oswald Medium 80/94%, surface
        - T "Send us what you picked, or nothing at all and we’ll talk it through from scratch. Either way, we’ll come back with a firm quote and timeline, usually within a day or two." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Attached build (from configurator)** (col gap 10, pad 18/20/18/20, 616×140, w:fill, bg #FFFFFF @8%, r 20)
          - **Frame** (row, align space_between/center, 576×20): T "Attached: your build" — IBM Plex Sans SemiBold 15, surface · **Frame** (row gap 6, align center) icon edit 14px + T "Edit" — IBM Plex Sans Medium 13, peach
          - **Chips** (row wrap gap 8, 576×28, w:fill) — chips (row, pad 6/10/6/10, bg #FFFFFF @10%, r 99) T — IBM Plex Sans Medium 12, surface: "Base build" · "2 extra pages" · "Blog setup" · "WhatsApp button" · "Advanced SEO"
          - **Frame** (row, align space_between/baseline, 576×36): T "R19,400 · 12 instalments" — IBM Plex Sans Medium 14, onDarkMuted · T "R1,617/mo" — Oswald Medium 24, surface
      - **Quote form** (col gap 16, pad 32, 520×464, bg surface, r 28)
        - **Field pattern**: label row (row gap 6) T label — IBM Plex Sans Medium 14, ink + optional T "Optional" — IBM Plex Sans Regular 13, muted · input (row, pad 14/16/14/16, align center, h 50, w:fill, bg canvas, r 14, border line 1) placeholder IBM Plex Sans Regular 15, muted
        - **Row** (row gap 12, 456×74): "Full name" / "Your name" · "Business name" (Optional) / "Business"
        - **Row** (row gap 12, 456×74): "Email" / "name@business.co.za" · "Phone" (Optional) / "082 000 0000"
        - **Field** (456×120): "Anything else we should know?" (Optional) / textarea 456×96 "Optional notes"
        - ⧉ Button Style=Coral "Get this quote" (456×52, w:fill)
        - T "Nothing is charged. We reply within 1–2 business days." — IBM Plex Sans Regular 12, muted
  - **09 · Footer** (row, pad 40/48/48/48, align space_between, 1440×226, w:fill) — shared desktop footer (no CTA card on this page; this frame lists About · Work · Insights · Pricing in STUDIO — use the canonical footer)

### Pricing — Mobile (390) — node 53:206 (390×3832)
- **Pricing — Mobile (390)** (col, 390×3832, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 16, pad 24/20/24/20, 390×348, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "PRICING" (68×30)
    - T "SIMPLE PRICING, BUILT AROUND WHAT YOU ACTUALLY NEED." — Oswald Medium 50/94%, ink
    - T "Pick a package, build your own, or have everything handled monthly." — IBM Plex Sans Regular 16/155%, muted
  - **02 · Ways to pay (swipe cards)** (col gap 16, pad 48/20/48/20, 390×381, w:fill, bg canvas)
    - T "Four ways to pay, side by side." — IBM Plex Sans SemiBold 28/110% ls -2%, ink
    - **Swipe track** (row gap 12, 350×207, w:fill, scroll-snap) — cards (col gap 10, pad 18, 280×~206, r 22):
      - T name — IBM Plex Sans SemiBold 17 · 2 value blocks (col gap 2): T label — Oswald Medium 10 ls 6% + T value — Oswald Medium 22 · T "See all details" — IBM Plex Sans Medium 13 (coral; peach on plum)
      - "Package, by deposit" (bg surface, border line 1): MONTHLY "Nothing monthly" · TOTAL OVER 12 MONTHS "From R12,000"
      - "Package, 12 instalments" (bg surface, border line 1): "From R1,000/mo" · "From R12,000"
      - "Full Service" (bg plum, text surface, labels onDarkMuted): "From R1,500/mo" · "From R18,000"
      - "Website Launch Offer" (bg blush): "R845/mo" · "R10,140"
  - **03 · Packages** (col gap 16, pad 48/20/48/20, 390×1021, w:fill, bg surface)
    - T "Four starting points." — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Billing toggle** (row gap 4, pad 4, 350×43, w:fill, bg canvas, r 999): "50% deposit" · "12 instalments" (selected: bg ink, surface) — IBM Plex Sans SemiBold 13 (shown here in the instalment view)
    - **Package (collapsed)** (col gap 12, pad 18, 350×125, w:fill, bg canvas, r 22)
      - **Frame** (row gap 10, align center, 314×30): T NAME — Oswald Medium 20 ls 4%, ink · **Frame** (30×30, bg surface, r 999) → icon chevron 15px
      - **Frame** (row gap 8, align baseline, 314×47): T "{monthly}" — Oswald Medium 32, ink · T "× 12 · total from {price}" — IBM Plex Sans Regular 12, muted
      - MICRO "R1,000/mo" "× 12 · total from R12,000" · LAUNCH "R1,750/mo" "× 12 · total from R21,000" · SCALE "R3,750/mo" "× 12 · total from R45,000"
    - **Package · Grow (open)** (col gap 12, pad 18, 350×391, w:fill, bg plum, r 22)
      - **Frame** (row gap 10, align center, 314×30): T "GROW" — Oswald Medium 20 ls 4%, surface · ⧉ Tag Tone=Coral "RECOMMENDED" · **Frame** (30×30, bg coral, r 999) → icon up 15px
      - **Frame** (row gap 8, align baseline): T "R2,667/mo" — Oswald Medium 32, surface · T "× 12 · total from R32,000" — IBM Plex Sans Regular 12, onDarkMuted
      - Inclusion rows (row gap 8, align center, 314×17): icon check 14px + T — IBM Plex Sans Regular 13, surface: "Up to 10 pages, incl. Blog/News" · "Unique design, no templates" · "Custom interactive elements" · "Integrations: maps, booking, WhatsApp" · "SEO + Analytics & Search Console" · "2 rounds of revisions"
      - **Frame** (row gap 6, align center): icon clock 14px + T "~3–4 weeks" — IBM Plex Sans Medium 12, peach
      - ⧉ Button Style=Coral "Choose Grow" (314×52, w:fill)
  - **04 · Full Service** (col gap 16, pad 0/20/48/20, 390×306, w:fill, bg surface)
    - **Frame** (col gap 12, pad 20, 350×258, w:fill, bg plum, r 24)
      - T "FULL SERVICE" — Oswald Medium 32, surface
      - **Frame** (row gap 6, align baseline): T "from R1,500" — Oswald Medium 28, peach · T "/mo · cancel any time" — IBM Plex Sans Regular 12, onDarkMuted
      - T "Build, hosting, mailboxes, ongoing SEO, updates and maintenance." — IBM Plex Sans Regular 14/150%, onDarkMuted
      - ⧉ Button Style=Coral "Get a Full Service quote" (310×52, w:fill)
  - **05 · Build your own** (col gap 16, pad 48/20/120/20, 390×959, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "BUILD YOUR OWN" (116×30)
    - T "Add exactly what you need." — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Base fee row** (row gap 12, pad 16, align center, 350×64, w:fill, bg ink, r 18): **Frame** (32×32, bg surface, r 999) → icon lock 16px · T "Base Build Fee · included" — IBM Plex Sans SemiBold 14, surface · T "R6,000" — Oswald Medium 20, surface
    - **Group · Pages (open)** (col, pad 0/16/0/16, 350×329, w:fill, bg surface, r 18, border line 1)
      - **Header** (row gap 8, pad 16/0/16/0, align center, 316×53): T "Pages" — IBM Plex Sans SemiBold 16, ink · T "2 added" — IBM Plex Sans Regular 12, coral · icon up 16px
      - **Item (stacked)** (col gap 8, pad 12/0/12/0, 316 wide, w:fill, border line 1/0/0/0): T name — IBM Plex Sans 14 · **Frame** (row, align space_between/center, 316×42): T price — IBM Plex Sans SemiBold 14 · control (stepper 110×42 with 32×32 buttons, or Added pill 90×37 pad 10/16/10/14)
        - "Additional standard page" · "R2,500 each" · stepper 2 (bg blush, border coral 1)
        - "Complex / custom-layout page" · "R4,000 each" (muted) · stepper 0 (bg surface, border line 1)
        - "Blog / News section setup" · "R4,500" · Added (bg ink)
    - **Groups (closed)** (col, pad 0/16/0/16, 350×55, bg surface, r 18, border line 1) header row (row gap 8, pad 16/0/16/0): T name — IBM Plex Sans SemiBold 16, ink · T count — IBM Plex Sans Regular 12 · icon chevron 16px
      - "Integrations" "1 added" (coral) · "SEO & performance" "1 added" (coral) · "Design" "4 items" (muted) · "Functionality" "7 items" (muted)
  - **Sticky total bar (fixed to viewport bottom)** (row gap 12, pad 12/12/12/20, align center, 358×64, bg ink, r 999, fixed 16px from the left and bottom)
    - **Frame** (col, w:fill, grow): T "YOUR TOTAL" — Oswald Medium 10 ls 6%, onDarkMuted · **Frame** (row gap 6, align baseline): T "R19,400" — Oswald Medium 22, surface + T "or R1,617/mo" — IBM Plex Sans Regular 11, onDarkMuted
    - **Button** (row gap 6, pad 12/16/12/16, align center, 133×42, bg coral, r 999): T "View & send" — IBM Plex Sans SemiBold 14, surface · icon up 14px
  - **08 · Quote form** (col gap 16, pad 48/20/48/20, 390×474, w:fill, bg plum)
    - T "LET’S TURN THIS INTO A FIRM QUOTE." — Oswald Medium 44/94%, surface
    - **Form card** (col gap 12, pad 18, 350×280, w:fill, bg surface, r 22)
      - Fields (col gap 6): label IBM Plex Sans Medium 14, ink · input (row, pad 12/14/12/14, 314×46, bg canvas, r 12, border line 1) placeholder IBM Plex Sans Regular 15, muted — "Full name" / "Your name" · "Email" / "name@business.co.za"
      - T "+ business name, phone, notes" — IBM Plex Sans Regular 12, muted (tapping reveals the optional fields)
      - ⧉ Button Style=Coral "Get this quote" (314×52, w:fill)
  - **Footer** (col gap 20, pad 24/24/96/24, 390×265, w:fill) — shared mobile footer; 96px bottom padding leaves room for the sticky bar

### State · Your build sheet (opens from total bar) — node 53:469 (390×539)
- **Bottom sheet** (col gap 14, pad 12/20/24/20, align center, 390×539, bg surface, r 28 (top), shadow 0 -8 40 #000000@18%)
  - rectangle 40×4 line r99 (drag handle)
  - **Frame** (row, align space_between/center, 350×26): T "Your build" — IBM Plex Sans SemiBold 20 ls -1%, ink · T "Reset" — IBM Plex Sans Medium 13, coral
  - **Line items** (col gap 10, 350×160) — rows (row gap 10, align center, 350×24): name IBM Plex Sans Regular 14, ink · price IBM Plex Sans SemiBold 14, ink · remove (24×24, bg canvas, r 999, icon x 12px; empty slot on the base fee)
    - "Base Build Fee" R6,000 · "Additional standard page × 2" R5,000 · "Blog / News setup" R4,500 · "WhatsApp chat button" R900 · "Advanced SEO" R3,000
  - **Total** (row, align space_between/baseline, 350×59): T "Total, fixed" — IBM Plex Sans Regular 14, muted · T "R19,400" — Oswald Medium 40, ink
  - **Payment toggle** (row gap 4, pad 4, 350×43, bg canvas, r 999): "50% deposit" (selected: bg ink, surface) · "12 instalments" — IBM Plex Sans SemiBold 13
  - **Split (deposit view)** (row gap 8, 350×75) — 2 tiles (col gap 2, pad 12/14/12/14, w:fill, grow, bg blush, r 14): T "R9,700" — Oswald Medium 22, coral + T "Deposit, to start" / "On completion" — IBM Plex Sans Regular 12, muted
  - ⧉ Button Style=Coral "Send this build" (350×52, w:fill)



---

# Website launch offer

| | |
|---|---|
| **URL** | `/website-launch` |
| **Figma page** | `74:150` |
| **Desktop frame (1440)** | 74:151 |
| **Mobile frame (390)** | 77:215 |
| **Extra states / boards** | Sold-out state 77:407 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Month, spots left and the sold-out state come from site settings.
- Sold-out: every "Check availability" becomes "Join the {Next month} waitlist"; submissions tagged plan=launch-waitlist.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /website-launch page — node 78:252
PAGE · READ FIRST
/website-launch: content, availability data and the form
URL
•  The live page is /website-launch (there is no /launch-offer). All earlier notes that said /launch-offer now point here. Keep the live <title> “First Website for New Businesses | R845/month | GoodGround”.
CONTENT
•  All copy, inclusions, steps and the 10 FAQ answers come from the live page, condensed for cards; meaning unchanged.
•  New in this design: the hero offer card with the R845 × 12 = R10,140 maths, the eligibility checker, the 12-payment timeline, the “after month 12” choice cards and the intake calendar. They only restate what the live page already says.
•  The project cards reuse the /work card component and link to their case studies.
AVAILABILITY DATA (ONE SOURCE)
•  Spots per month (2) and spots taken come from the same CMS values the homepage offer section and /pricing use. Month names are generated, never typed.
•  Live pill, offer-card meter, intake calendar, sticky mobile bar and form banner all read the same numbers.
•  Sold out for the current month: see the state frame. Pill grey “{Month} is fully booked”, meter full in ink, “Next opening: {Next month}, 2 spots”, every “Check availability” becomes “Join the {Next month} waitlist”.
•  The intake calendar shows the current month plus the next two. Months further out show “2 spots open” until bookings exist.
ELIGIBILITY CHECKER
•  Two segmented questions (new business? / already have a website?). Yes + No = mint “Good news: you qualify”; anything else = blush message suggesting the Launch package or a redesign, with “See packages” → /pricing#packages.
•  It’s guidance only: it doesn’t block the form. The form keeps its own required confirmation checkbox.
AVAILABILITY FORM
•  Fields from the live form: name*, business name*, email*, about the business*, launch timing (optional), “I confirm this is a new business without a website”* plus the hidden honeypot.
•  Submits to the shared endpoint with formType=launch-availability and plan=launch (or plan=launch-waitlist when sold out). Same validation, spam rules, success and failure states and auto-reply as /start-project.
•  Any “Check availability” button on the page smooth-scrolls to this form and focuses the name field. Links from other pages (homepage offer, /pricing) go to /website-launch#check-availability. /start-project?plan=launch remains supported for older links.
SEO
•  JSON-LD: Offer (price 845 ZAR per month, 12-month term, eligibility “new businesses without a website”, availability InStock/SoldOut from the live data) + FAQPage + BreadcrumbList.

### Notes · /website-launch motion & interaction — node 78:274
MOTION & INTERACTION
Section behaviour
HERO
•  Tags and live pill FADE-UP; the coral dot pulses (scale 1→1.8 ring, 2s loop; off when motion is off). Headline LINE MASK; copy and buttons FADE-UP.
•  Offer card: FADE-UP + scale 0.96→1; “R845” LINE MASK; the maths row fills left to right (R845 → × 12 → R10,140 with a COUNT-UP); checklist ticks pop 70ms apart; the availability meter fills its taken segments last.
•  Key facts strip: STAGGER GRID 80ms.
JOURNEY & ELIGIBILITY
•  The three moments STAGGER left to right with the arrow chips sliding in between (motion/md); the plum third moment lands last.
•  Eligibility checker: segmented controls animate their pill (motion/md); the result card swaps between mint and blush with a crossfade and 6px rise (motion/sm). aria-live announces the result.
INCLUDED, NUMBERS, INTAKE
•  Included groups STAGGER GRID 120ms; item rows FADE-UP 50ms apart inside each group.
•  12-payment bars grow from the bottom (scaleY, 30ms stagger); “R10,140 total” COUNT-UP.
•  Intake calendar rows FADE-UP; filled dots pop in coral (ease/back).
STEPS, FAQ, FORM
•  How it works: dots fill 1→4 (120ms apart), lines draw between them, cards FADE-UP.
•  FAQ: shared accordion (one open at a time, first open, FAQPage markup).
•  Form: same field behaviour as /start-project Step 4. On success the form card crossfades to “Thanks, {first name}. We’ll confirm availability within 1–2 business days.”
MOBILE
•  Offer card sits directly under the headline. “What’s included” becomes an accordion (one open, first open). FAQ shows 4 questions plus “+ 6 more” which expands the rest.
•  Sticky offer bar (R845/month + spots left + Check availability) appears once the hero offer card scrolls out of view and hides while the form is visible.

## Layer-by-layer spec

### Website launch — Desktop (1440) — node 74:151 (1440×8559)
- **Website launch — Desktop (1440)** (col, 1440×8559, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "WEBSITE LAUNCH OFFER" (169×44)
  - **01 · Hero + offer card** (col gap 48, pad 48/120/80/120, 1440×900, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×624, w:fill)
      - **Frame** (col gap 24, 696×624, w:fill, grow)
        - **Frame** (row gap 8, align center): ⧉ Tag Tone=Coral "FOR NEW BUSINESSES WITHOUT A WEBSITE" · **Live availability pill** (row gap 8, pad 6/14/6/12, align center, 180×30, bg ink, r 99): ellipse 8×8 coral (pulsing) + T "1 SLOT LEFT FOR OCTOBER" — Oswald Medium 12 ls 6%, surface
        - T "LAUNCH YOUR FIRST WEBSITE FOR R845 A MONTH." — Oswald Medium 104/92%, ink
        - T "Give your new business a professional place online, designed to help customers understand your services, trust your business and get in touch. We handle the planning, design and launch. You focus on getting your business started." — IBM Plex Sans Regular 18/155%, muted
        - **Frame** (row gap 12): ⧉ Button Style=Coral "Check availability" (207×52) · ⧉ Button Style=Outline "What’s included" (198×54)
      - **Offer card** (col gap 20, pad 32, 440×624, bg plum, r 32, shadow 0 30 60 #2E1747@25%)
        - **Frame** (row, align space_between/center, 376×30): T "Website Launch" — IBM Plex Sans SemiBold 18, surface · ⧉ Tag Tone=Coral "NO DEPOSIT"
        - **Price** (row gap 8, align baseline): T "R845" — Oswald Medium 88/100%, surface · T "/ month" — IBM Plex Sans Regular 16, onDarkMuted
        - **Total maths** (row, 376×75, w:fill, bg #FFFFFF @8%, r 16) — 3 cells (col gap 2, pad 12/12/12/16, w:fill, grow; cells 2–3 border #FFFFFF @12% 0/0/0/1): T value — Oswald Medium 22 + T label — IBM Plex Sans Regular 12, onDarkMuted
          - "R845" (surface) "monthly" · "× 12" (surface) "months" · "R10,140" (peach) "total"
        - **Checklist** (col gap 10, 376×118): rows (row gap 10, align center): **Frame** (22×22, bg coral, r 99) icon check 11px + T — IBM Plex Sans Medium 14, surface
          - "Custom one-page website" · "Domain registration & business email" · "Hosting for 12 months" · "Detailed SEO setup + Google indexing"
        - **Availability meter** (col gap 8, pad 14/16/14/16, 376×61, w:fill, bg surface, r 16)
          - **Frame** (row, align space_between): T "October intake" — IBM Plex Sans Medium 13, ink · T "1 of 2 spots left" — IBM Plex Sans SemiBold 13, coral
          - **Segments** (row gap 6, 344×8): 2 × rectangle 169×8 r99 — taken = coral, open = line (one segment per spot)
        - ⧉ Button Style=Coral "Check availability" (376×52, w:fill)
        - T "No obligation. We confirm availability and fit before you book." — IBM Plex Sans Regular 12, onDarkMuted
    - **Key facts** (row, pad 20/0/20/0, 1200×100, w:fill, bg surface, r 24, border line 1) — 4 cells (row gap 12, pad 0/20/0/24, align center, w:fill, grow; cells 2–4 border line 0/0/0/1): **Frame** (40×40, bg blush, r 12) → icon 20px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, ink + T — IBM Plex Sans Regular 13/140%, muted
      - file "One page" "Custom, designed around your business" · mail "Domain and email" "Registered and set up for you" · search "SEO and Google" "Prepared, submitted for indexing" · cal "12 months" "Domain, hosting and email fees included"
  - **02 · Why it matters (journey)** (col gap 48, pad 120, 1440×782, w:fill, bg surface)
    - **Section header** (row, align space_between/max): **Frame** (col gap 20, 760): ⧉ Tag Tone=Neutral "WHY IT MATTERS" · T "Give people a clear next step when they hear about your business." — IBM Plex Sans SemiBold 56/106% ls -3%, ink · T "We plan your first website around these three moments, so potential customers can understand your business and act with confidence." — IBM Plex Sans Regular 17/155%, muted (400 wide)
    - **Journey** (row gap 16, align center, 1200×265, w:fill) — 3 moment cards (col gap 14, pad 28, 355×265, w:fill, h:fill, grow, r 28) with arrow chips (36×36, bg canvas, r 999, icon arrowR 18px) between:
      - T "0n" — Oswald Medium 14 · **Frame** (48×48, r 14) → icon 24px · T title — IBM Plex Sans SemiBold 22 ls -1% · T body — IBM Plex Sans Regular 15/155%
      - Moment 1 (bg canvas, number coral, chip bg surface, icon ear): "Someone hears about you" / "You’ve shared what you do and handed over your details. That’s where their interest starts."
      - Moment 2 (bg canvas, icon eye): "They want to know more" / "Now they need a place to learn more about you and how to contact you."
      - Moment 3 (bg plum, number peach, chip bg coral, icon chat, title surface, body onDarkMuted): "They decide whether to ask" / "A page that explains what you offer, who you help and how to enquire."
  - **03 · Is this you? (eligibility checker)** (col gap 48, pad 120, 1440×738, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×498, w:fill)
      - **Frame** (col gap 20, 696×478, w:fill, grow)
        - ⧉ Tag Tone=Plum "IS THIS YOU?"
        - T "Made for brand-new businesses." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
        - **Criteria rows** (row gap 14, pad 14/16/14/16, align center, 696×58, w:fill, r 16): status chip 28×28 r 99 + T — IBM Plex Sans Medium 15/145%, ink
          - yes rows (bg surface, border line 1; chip bg mint + icon check 14px): "You’re starting a new business, or you’ve recently started trading." · "You don’t have a website yet. A social page or a domain you already own is fine." · "You want customers to find you, understand what you offer and get in touch."
          - no row (bg blush; chip bg surface + icon x 14px): "Not for website redesigns or replacing a website you already have."
      - **Eligibility checker (interactive)** (col gap 16, pad 28, 440×498, bg surface, r 28, border line 1)
        - T "Check in 5 seconds" — IBM Plex Sans SemiBold 20 ls -1%, ink
        - **Question** (col gap 8, 382×71): T "Is your business new, or about to start trading?" — IBM Plex Sans Medium 14, ink · **Segmented** (row gap 4, pad 4, 382×45, bg canvas, r 999): "Yes" (selected: bg ink, surface) · "No" — IBM Plex Sans SemiBold 13
        - **Question**: T "Does your business already have a website?" · segmented "No" (selected) · "Yes"
        - **Result · qualifies** (row gap 12, pad 14/16/14/16, align center, 382×65, w:fill, bg mint, r 16): **Frame** (32×32, bg surface, r 99) icon check 16px · **Frame** (col, w:fill, grow): T "Good news: you qualify." — IBM Plex Sans SemiBold 15, ink + T "Check if October’s last slot is still open." — IBM Plex Sans Regular 13, muted
        - ⧉ Button Style=Coral "Check availability" (382×52, w:fill)
        - **Result · not eligible (alt state)** (row gap 10, pad 12/14/12/14, 382×75, w:fill, bg blush, r 14): message "This offer is for new businesses without a website. A Launch package or a redesign may suit you better." + "See packages" link (→ /pricing#packages) — shown in place of the mint result for any other answer combination
  - **04 · What’s included** (col gap 48, pad 120, 1440×1175, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Your first website, with the setup handled." · side copy "An agreed scope, a planned launch and a website designed around your business goals, through one clear process."
    - **Frame** (row gap 20, 1200×585, w:fill) — 3 group cards (col gap 16, pad 28, 387×585, w:fill, h:fill, grow, bg canvas, r 28):
      - **Card top** (row, align space_between/center): **Frame** (48×48, r 14) → icon 24px · T "0n" — Oswald Medium 28, line
      - T group title — IBM Plex Sans SemiBold 22 ls -1%, ink
      - **Item** (row gap 12, pad 14, w:fill, bg surface, r 16): **Frame** (22×22, bg mint, r 99) icon check 11px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 14, ink + T — IBM Plex Sans Regular 13/150%, muted
      - **01 Planning and design** (chip lilac, icon pen): "Website planning around your goals" / "We learn about your business, customers and the enquiries you want. That shapes your page, its sections and contact options." · "A custom one-page website" / "Sections for what you do, who you help and how to get in touch, agreed before the build begins." · "Responsive across devices" / "Pages, navigation and forms adapt to phones, tablets and desktops."
      - **02 Domain, email and hosting** (chip blush, icon globe): "Domain registration and setup" / "We help you choose an available domain and connect your website and email." · "Professional business email" / "Addresses on your domain, like hello@yourbusiness.co.za." · "Fees for 12 months" / "Domain, hosting and email fees included for the first year. Your proposal confirms allowances and continuation costs."
      - **03 Search and launch** (chip mint, icon rocket): "Detailed SEO setup" / "Keyword research, titles, descriptions, headings, internal links, clean URLs, image optimisation and structured data." · "Search Console and indexing" / "We connect Google Search Console, submit your sitemap and request indexing." · "A clear way to enquire" / "Prominent contact buttons and a working enquiry form." · "Performance and launch checks" / "Images, speed, links, forms and mobile layouts checked before go-live."
    - **Summary bar** (row gap 16, pad 16/16/16/24, align center, 1200×84, w:fill, bg plum, r 999): T "That’s your whole first website: planned, built, launched and submitted to Google." — IBM Plex Sans SemiBold 16, surface · ⧉ Button Style=Coral "Check availability"
  - **05 · What it costs, and after 12 months** (col gap 48, pad 120, 1440×722, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Coral "THE NUMBERS" · T "R845 a month. No deposit. No surprises." · side copy "One clear monthly amount for 12 months, and a simple choice when the year ends."
    - **Frame** (row gap 24, 1200×266, w:fill)
      - **12-month timeline** (col gap 16, pad 28/32/28/32, 736×266, w:fill, h:fill, grow, bg surface, r 28, border line 1)
        - **Frame** (row, align space_between/baseline): T "Your 12 payments" — IBM Plex Sans SemiBold 20 ls -1%, ink · T "R10,140 total" — Oswald Medium 28, coral
        - **Bars** (row gap 6, align max, 670×76) — 12 columns (col gap 6, align center, w:fill, grow): rectangle 50×56 r8 (M1 coral, M2–M12 lilac) + T "M1"…"M12" — IBM Plex Sans Regular 11, muted
        - **Ticks** (row gap 24): icon check 14px + T — IBM Plex Sans Medium 13, ink: "R845 each month" · "Domain, hosting and email fees included" · "No deposit upfront"
      - **After 12 months** (col gap 12, pad 28, 440×266, h:fill, bg plum, r 28)
        - T "After month 12, you choose" — IBM Plex Sans SemiBold 20 ls -1%, surface
        - Choice rows (row gap 12, pad 14, w:fill, bg #FFFFFF @8%, r 16): **Frame** (36×36, bg coral, r 10) → icon 18px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, surface + T — IBM Plex Sans Regular 13/150%, onDarkMuted
          - swap "Take it with you" "We transfer your domain and website to you." · shield "Stay looked after" "Move to our maintenance plan; we keep handling hosting, domain fees and upkeep."
  - **06 · Our approach (work)** (col gap 48, pad 120, 1440×766, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "OUR APPROACH" · T "See how we approach website design." · side copy "Open a project. Try the navigation. Follow the enquiry process."
    - **Frame** (row gap 24, 1200×308) — 3 LINKED CARDS (col gap 14, pad 12/12/20/12, 384×308, w:fill, grow, bg canvas, r 28): image (360×220, gradient placeholder, r 18) · row (row gap 12, pad 0/8/0/8, align center): **Frame** (col gap 2, w:fill, grow): T name — IBM Plex Sans SemiBold 18, ink + T type — IBM Plex Sans Regular 13, muted · **Frame** (36×36, bg surface, r 999) icon arrow 18px
      - "GoodGround" "Our own site" · "B3TTER" "Concept build" · "Sunbird Early Learners" "Concept build" (same gradients as /work)
  - **07 · Two new businesses each month (intake)** (col gap 48, pad 120, 1440×513, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×273)
      - **Frame** (col gap 20, w:fill, grow): ⧉ Tag Tone=Coral "LIMITED INTAKE" · T "Two new businesses each month." — IBM Plex Sans SemiBold 56/106% ls -3%, ink · T "We open two spaces through this promotion each month, so every business gets proper time for planning, design, development and testing. Once they’re booked, we’ll discuss the next available intake with you." — IBM Plex Sans Regular 17/160%, muted
      - **Intake calendar** (col gap 10, pad 24, 460×273, bg surface, r 28, border line 1)
        - T "Upcoming intakes" — IBM Plex Sans SemiBold 18, ink
        - **Month rows** (row gap 14, pad 14/16/14/16, align center, 410×48, w:fill, r 16): T month — IBM Plex Sans SemiBold 15, ink (w:fill) · **Spot dots** (2 dots, 34px group; filled = coral, open = line) · T status — IBM Plex Sans Medium 13
          - "October 2026" (bg blush; 1 dot filled) "1 spot left" (coral) · "November 2026" (bg canvas) "2 spots open" (muted) · "December 2026" (bg canvas) "2 spots open" (muted)
        - T "Live from the booking calendar. Filled spots shown in coral." — IBM Plex Sans Regular 12, muted
  - **08 · How it works** (col gap 48, pad 120, 1440×650, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "HOW IT WORKS" · T "From your business idea to your first website."
    - **Steps** (row gap 16, 1200×192) — 4 steps (col gap 14, 288 wide, w:fill, grow): **Rail** (row gap 8, align center): **Dot** (40×40, bg ink, r 99) → T "0n" — Oswald Medium 14, surface + rectangle 240×2 line (no line after step 4) · **Card** (col gap 8, pad 22, w:fill, bg canvas, r 20): T — IBM Plex Sans SemiBold 18 ls -1%, ink + T — IBM Plex Sans Regular 14/150%, muted
      - 01 "Tell us about your business" "What you offer, who you want to reach and when you hope to launch."
      - 02 "Review your proposal" "We confirm availability, what’s included, payment terms and the timeline. You decide."
      - 03 "Review your website" "We design and build to the agreed brief; you give feedback within the included revision rounds."
      - 04 (dot coral, card bg blush) "Approve and launch" "Final checks, publish, and your pages are submitted to Google for indexing."
  - **09 · FAQ** (col gap 48, pad 120, 1440×1069, w:fill, bg canvas)
    - **Frame** (row gap 80): **Frame** (col gap 20, 400): ⧉ Tag Tone=Neutral "FAQ" · T "Your questions, answered." — IBM Plex Sans SemiBold 48/106% ls -2%, ink
    - **Accordion** (col gap 10, 720×829)
      - Open (col gap 10, pad 16/16/16/24, 720×127, bg surface, r 18, border ink 1.5): T "Who qualifies for this offer?" — IBM Plex Sans SemiBold 16, ink + **Frame** (34×34, bg ink, r 999) icon minus 17px · T "Exclusively new businesses that don’t have a website. You can be preparing to launch or have recently started trading. The offer doesn’t cover redesigns or replacements." — IBM Plex Sans Regular 15/160%, muted
      - Closed (720×68, bg surface, r 18, border line 1, chip bg canvas icon plus 17px): "I have a social media page. Can I still apply?" · "What if I’ve already registered a domain?" · "What do I need to provide?" · "How long will my website take?" · "Will my website appear on Google?" · "Does the package include ongoing SEO?" · "Is there a deposit?" · "What happens after the first 12 months?" · "Can I add more pages or extra features?"
  - **10 · Check availability (form)** (col gap 48, pad 120, 1440×911, w:fill, bg plum) — id="check-availability"
    - **Frame** (row gap 64, 1200×671)
      - **Frame** (col gap 20, 596×517, w:fill, grow)
        - ⧉ Tag Tone=OnDark "CHECK AVAILABILITY"
        - T "GET YOUR FIRST BUSINESS WEBSITE UNDERWAY." — Oswald Medium 80/94%, surface
        - T "R845 a month, with domain, hosting and email fees included for the first 12 months. Exclusively for new businesses without a website." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Availability banner** (row gap 10, pad 12/16/12/16, align center, 596×60, w:fill, bg #FFFFFF @8%, r 16): ellipse 8×8 coral · T "1 slot left for October. Tell us about your business and we’ll confirm whether it’s still open." — IBM Plex Sans Medium 14, surface
        - **Ticks** (col gap 8): icon check 14px + T — IBM Plex Sans Medium 14, surface: "Takes about a minute" · "Commits you to nothing" · "We reply about availability and next steps"
      - **Availability form** (col gap 16, pad 32, 540×671, bg surface, r 28)
        - Row: ⧉ Form/Field Input Default "Your name" placeholder "Full name" · ⧉ Form/Field Input Default "Business name" placeholder "Your new business"
        - ⧉ Form/Field Input Default "Email address" placeholder "name@business.co.za"
        - ⧉ Form/Field Textarea Default "Tell us about your new business" placeholder "What you offer and who you want to reach"
        - ⧉ Form/Field Input Default "When would you like to launch your website?" (Optional) placeholder "e.g. early December"
        - **Eligibility confirmation (required)** (row gap 12, pad 12/14/12/14, 476×46, w:fill, bg canvas, r 14): checkbox 22×22 r 6 (checked: bg ink + icon check 13px) · T "I confirm this is a new business and it doesn’t have a website." — IBM Plex Sans Medium 14/145%, ink
        - ⧉ Button Style=Coral "Check availability" (476×52, w:fill)
        - T "We use these details to respond to your enquiry. See our privacy policy. Sending this form doesn’t commit you to a purchase." — IBM Plex Sans Regular 12/150%, muted
  - **11 · Footer** — desktop footer with LEGAL column (SERVICES here lists "Website development" · "Website launch offer" · "Full service" · "Google & Meta Ads")

### Website launch — Mobile (390) — node 77:215 (390×3490)
- **Website launch — Mobile (390)** (col, 390×3490, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero + offer card** (col gap 16, pad 16/20/32/20, 390×821, w:fill, bg canvas)
    - **Live pill** (row gap 8, pad 6/14/6/12, align center, 168×28, bg ink, r 99): ellipse 8×8 coral + T "1 SLOT LEFT FOR OCTOBER" — Oswald Medium 11 ls 6%, surface
    - T "LAUNCH YOUR FIRST WEBSITE FOR R845 A MONTH." — Oswald Medium 52/94%, ink
    - T "For new businesses without a website. We plan, design and launch it; you focus on your business." — IBM Plex Sans Regular 16/155%, muted
    - **Offer card** (col gap 14, pad 20, 350×451, w:fill, bg plum, r 24)
      - **Price** (row gap 6, align baseline): T "R845" — Oswald Medium 64/100%, surface · T "/ month · 12 months" — IBM Plex Sans Regular 13, onDarkMuted
      - **Tiles** (row gap 8, 310×64): 2 tiles (col, pad 10/12/10/12, w:fill, grow, bg #FFFFFF @8%, r 12): T — Oswald Medium 20, peach + T — IBM Plex Sans Regular 11, onDarkMuted — "R10,140" "total" · "R0" "deposit"
      - (continues in the next chunk)

      - **Checklist** rows (row gap 10, align center): **Frame** (20×20, bg coral, r 999) icon check 11px + T — IBM Plex Sans Medium 14, surface: "One-page custom website" · "Domain & business email" · "Hosting for 12 months" · "SEO setup + Google indexing"
      - **Meter** (col gap 6, pad 12/14/12/14, 310×52, w:fill, bg surface, r 14): **Frame** (row, align space_between): T "October intake" — IBM Plex Sans Medium 12, ink + T "1 of 2 left" — IBM Plex Sans SemiBold 12, coral · segments (row gap 6): 2 × rectangle 138×6 r99 (coral taken, line open)
      - ⧉ Button Style=Coral "Check availability" (310×52, w:fill)
  - **02 · Is this you?** (col gap 16, pad 40/20/40/20, 390×448, w:fill, bg surface)
    - ⧉ Tag Tone=Plum "IS THIS YOU?"
    - T "Made for brand-new businesses." — IBM Plex Sans SemiBold 30/110% ls -2%, ink
    - Rows (row gap 12, pad 12/14/12/14, align center, 350×48, w:fill, r 14): chip 24×24 r 999 + T — IBM Plex Sans Medium 14, ink
      - bg canvas + mint check: "New, or recently started trading" · "No website yet (a social page is fine)" · "You want customers to find and contact you"
      - bg blush + surface x: "Not for redesigns or replacements"
    - (The interactive checker is desktop-only; on mobile the criteria list is enough.)
  - **03 · What’s included (accordion)** (col gap 16, pad 40/20/40/20, 390×450, w:fill, bg canvas)
    - T "Your first website, with the setup handled." — IBM Plex Sans SemiBold 30/110% ls -2%, ink
    - **Open group** (col gap 10, pad 16/14/16/16, 350×146, w:fill, bg surface, r 18, border ink 1.5): **Frame** (row gap 10, align center): T "01" — Oswald Medium 13, coral · T "Planning and design" — IBM Plex Sans SemiBold 16, ink · T "3 items" — IBM Plex Sans Regular 12, muted · item rows (row gap 10): **Frame** (20×20, bg mint, r 999) icon check 11px + T — IBM Plex Sans Regular 14, ink: "Website planning around your goals" · "A custom one-page website" · "Responsive across devices"
    - **Closed groups** (col, pad 16/14/16/16, 350×55, bg surface, r 18, border line 1): "02 Domain, email and hosting · 3 items" · "03 Search and launch · 4 items"
  - **04 · After 12 months** (col gap 16, pad 40/20/40/20, 390×277, w:fill, bg plum)
    - T "After month 12, you choose" — IBM Plex Sans SemiBold 24 ls -1%, surface
    - Tiles (col gap 2, pad 14/16/14/16, 350×67, w:fill, bg #FFFFFF @8%, r 16): T — IBM Plex Sans SemiBold 15, surface + T — IBM Plex Sans Regular 13, onDarkMuted — "Take it with you" "We transfer your domain and website to you." · "Stay looked after" "Move to our maintenance plan."
  - **05 · FAQ** (col gap 16, pad 40/20/40/20, 390×476, w:fill, bg canvas)
    - T "Your questions, answered." — IBM Plex Sans SemiBold 28 ls -1%, ink
    - Rows (row gap 10, pad 14/12/14/16, align center, 350×58, w:fill, bg surface, r 16, border line 1): T — IBM Plex Sans SemiBold 14, ink + **Frame** (28×28, bg canvas, r 999) icon plus 15px — "Who qualifies for this offer?" · "Is there a deposit?" · "What happens after the first 12 months?" · "Will my website appear on Google?"
    - **More row** (350×48, same style): T "+ 6 more questions" — IBM Plex Sans SemiBold 14, muted (expands the rest)
  - **06 · Availability form** (col gap 16, pad 40/20/40/20, 390×789, w:fill, bg plum)
    - T "GET YOUR FIRST BUSINESS WEBSITE UNDERWAY." — Oswald Medium 40/96%, surface
    - **Form card** (col gap 12, pad 18, 350×579, w:fill, bg surface, r 22)
      - ⧉ Form/Field "Your name" "Full name" · "Business name" "Your new business" · "Email address" "name@business.co.za" · Textarea "Tell us about your new business" "What you offer" (all full width, 314)
      - **Confirmation** (row gap 10, pad 10/12/10/12, 314×54, w:fill, bg canvas, r 12): checkbox 22×22 r 6 (unchecked: bg surface, border line 1.5) · T "I confirm this is a new business without a website." — IBM Plex Sans Medium 13, ink
      - ⧉ Button Style=Coral "Check availability" (314×52, w:fill)
  - **Footer** (col gap 20, pad 24/24/96/24, 390×151, w:fill, bg surface) — logo only in this frame; use the shared mobile footer (96px bottom padding leaves room for the sticky bar)
  - **Sticky offer bar (appears after hero)** (row gap 10, pad 8/8/8/18, align center, 358×60, bg ink, r 999, fixed 16px from the left and bottom)
    - **Frame** (col, w:fill, grow): T "R845 / month" — Oswald Medium 18, surface · T "1 of 2 October spots left" — IBM Plex Sans Regular 11, peach
    - **Button** (row, pad 12/16/12/16, 139×41, bg coral, r 999): T "Check availability" — IBM Plex Sans SemiBold 13, surface

### State · Sold out for the month (offer card + hero pill) — node 77:407 (520×572)
- **Hero pill (sold out)** (row gap 8, pad 6/14/6/12, align center, 185×30, bg line, r 99): ellipse 8×8 muted · T "OCTOBER IS FULLY BOOKED" — Oswald Medium 12 ls 6%, ink
- **Offer card (sold out)** (col gap 16, pad 28, 454×342, w:fill, bg plum, r 28)
  - **Price** (row gap 8, align baseline): T "R845" — Oswald Medium 72/100%, surface · T "/ month" — IBM Plex Sans Regular 15, onDarkMuted
  - **Meter** (col gap 8, pad 14/16/14/16, 398×61, w:fill, bg surface, r 16): **Frame** (row, align space_between): T "October intake" — IBM Plex Sans Medium 13, ink + T "Fully booked" — IBM Plex Sans SemiBold 13, ink · segments 2 × rectangle 180×8 ink r99
  - **Next opening** (row gap 10, pad 12/14/12/14, align center, 398×52, w:fill, bg #FFFFFF @8%, r 14): **Frame** (28×28, bg coral, r 999) icon bell 15px · T "Next opening: November, 2 spots." — IBM Plex Sans SemiBold 14, surface
  - ⧉ Button Style=Coral "Join the November waitlist" (398×52, w:fill)
- Annotation: "All “Check availability” buttons on the page become “Join the {Next month} waitlist”; the form heading and submit label change to match, and submissions are tagged plan=launch-waitlist."



---

# Process (new page)

| | |
|---|---|
| **URL** | `/process` |
| **Figma page** | `80:150` |
| **Desktop frame (1440)** | 80:151 |
| **Mobile frame (390)** | 84:186 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- New page. The copy is new and needs the user's confirmation (open item 9).
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /process page — node 85:195
PAGE · READ FIRST
/process: a new page, where its content comes from
WHY IT EXISTS
•  New page (it doesn’t exist on the live site). It’s the destination for every “See the full process” link: About, homepage process section, Services, the launch offer page and the onboarding welcome screen.
•  Title: “Our Process | How We Build Websites | GoodGround”. Add “Process” to the main menu and footer (shown in the footer here).
CONTENT FROM YOUR LIVE SITE (CONFIRMED)
•  The six step names and one-line descriptions (homepage and About).
•  Payment options and when they fall; instalments 2–12 start on completion.
•  Revision rounds per package (Micro/Launch 1, Grow 2, Scale 3) and R1,500 per extra round; rush delivery R3,500.
•  Package timelines (Micro ~1 week, Launch ~2, Grow ~3–4, Scale ~4–6), one month of support, Care Plan and Full Service terms, reply time 1–2 business days.
NEW COPY TO CONFIRM BEFORE LAUNCH
•  Each step’s “What we do / What you do / What you get” lists and the share of the timeline (15/15/30/20/20%). They describe how you work today in plain terms; adjust anything that isn’t true.
•  “Feedback within 3 working days of each review link”.
•  “A named project lead”, “Weekly progress update” and the three standard calls (kick-off, design walk-through, handover).
•  “Fixes for things we got wrong never use up a round” and “Changing direction after design approval counts as new scope”.
•  Process FAQ answers for: slow content or feedback, seeing the site while it’s built, and who owns the website (ownership needs your decision; it also belongs in the Terms).
FIXES ELSEWHERE
•  FAQ answer 06 (“most projects take 4–6 weeks”) should match this page’s package timelines.
•  The project tracker in the hero is an illustration (labelled EXAMPLE). If you later give clients a live project dashboard, this is its design language.
DATA
•  Package timelines, revision rounds, prices and the support month come from the shared pricing collection, so this page never disagrees with /pricing.

### Notes · /process motion & interaction — node 85:214
MOTION & INTERACTION
Section behaviour
HERO
•  Headline LINE MASK, copy and quick facts FADE-UP (numbers COUNT-UP).
•  Project tracker: card FADE-UP + scale 0.96→1; the six progress segments fill one by one (coral for done, peach for current), then the checklist rows tick in. Loops once only.
STEP NAV & TIMELINE
•  Sticky step nav with scroll-spy (same as /services); clicking smooth-scrolls to the step card.
•  Gantt chart: each package row’s step segments grow left to right in sequence (scaleX, 80ms stagger, motion/xl total per row), rows 120ms apart. Hover a segment: tooltip “Design · about 30% of your timeline”.
STEP CARDS
•  Each card FADE-UPs; its big number LINE MASKs; the three columns STAGGER 100ms; payment and revision callouts slide in last (6px + fade).
•  Desktop: as each card crosses the middle of the viewport, its number in the sticky nav becomes active.
PAYMENTS, REVISIONS, NEEDS
•  Payment timeline: the coral payment blocks pop in at their step columns (ease/back) left to right, row by row.
•  Revisions table rows reveal top to bottom; the “counts / doesn’t count” cards STAGGER.
•  Needs checklist rows FADE-UP 60ms apart; their “when” pills slide in from the right.
AFTER LAUNCH, FAQ, CTA
•  After-launch strip fills left to right like a progress bar (motion/xl); option cards STAGGER. FAQ: shared accordion. CTA: shared gradient component.
MOBILE
•  Step chips stick under the header. Steps become an accordion (one open; the first open). Inside an open step, a segmented control switches We do / You do / You get (crossfade). The Gantt becomes one bar per package; the payment table becomes three cards.

## Layer-by-layer spec

### Process — Desktop (1440) — node 80:151 (1440×11204)
- **Process — Desktop (1440)** (col, 1440×11204, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "OUR PROCESS" (116×44)
  - **01 · Hero + project tracker** (col gap 48, pad 48/120/64/120, 1440×763, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×651, w:fill)
      - **Frame** (col gap 24, 696×651, w:fill, grow)
        - ⧉ Tag Tone=Coral "OUR PROCESS"
        - T "HOW YOUR WEBSITE GETS BUILT, STEP BY STEP." — Oswald Medium 104/92%, ink
        - T "Every project follows the same six steps, run by one team. Here’s exactly what happens at each one: what we do, what we need from you, what you get, how long it takes and when you pay." — IBM Plex Sans Regular 18/155%, muted
        - **Quick facts** (row gap 10, 696×81) — 4 tiles (col, pad 12/16/12/16, w:fill, grow, bg surface, r 16, border line 1): T value — Oswald Medium 26, ink + T label — IBM Plex Sans Regular 12, muted — "6" steps · "1–6" weeks, by package · "1" fixed price · "1 month" support included
      - **Project tracker (illustrative)** (col gap 16, pad 28, 440×349, bg plum, r 32, shadow 0 30 60 #2E1747@25%)
        - **Frame** (row, align space_between/center): **Frame** (col): T "Your project" — IBM Plex Sans Regular 12, onDarkMuted + T "Grow website" — IBM Plex Sans SemiBold 18, surface · ⧉ Tag Tone=OnDark "EXAMPLE"
        - **Progress segments** (row gap 4, 384×8): 6 × rectangle 61×8 r99 — 2 coral (done), 1 peach (current), 3 #FFFFFF @15%
        - **Current step** (row gap 12, pad 14/16/14/16, align center, 384×64, w:fill, bg surface, r 18): **Frame** (36×36, bg blush, r 999) icon eye 18px · **Frame** (col, w:fill, grow): T "Step 3 of 6 · Design" — IBM Plex Sans SemiBold 15, ink + T "First homepage design ready for your review" — IBM Plex Sans Regular 12, muted
        - **Checklist rows** (row gap 12, align center, 384×34): **Frame** (24×24, r 99) icon check 13px (done: bg coral; upcoming: bg surface) · **Frame** (col): T — IBM Plex Sans SemiBold 14, surface + T — IBM Plex Sans Regular 12, onDarkMuted
          - (done) "Research" "Brief and goals agreed" · (done) "Direction" "Wireframes approved" · (next) "Next: your feedback" "Review link sent · round 1 of 2"
  - **02 · Sticky step nav (scroll-spy)** (col gap 48, pad 0/120/24/120, 1440×75, w:fill, bg canvas)
    - **Step nav** (row gap 6, pad 6, align center, 1200×51, w:fill, bg surface, r 999, border line 1) — 7 equal chips (row gap 8, pad 10/14/10/14, align center/center, w:fill, grow, r 999): T "0n" — Oswald Medium 11 (peach when active, muted otherwise) · T name — IBM Plex Sans Medium 13 (surface active, ink otherwise); active chip bg ink
      - 00 Before we start (active) · 01 Research · 02 Direction · 03 Design · 04 Revisions · 05 Handoff · 06 Beyond launch
  - **03 · Before we start (step 00)** (col gap 48, pad 72/120/72/120, 1440×550, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Neutral "00 / BEFORE WE START" · T "From “yes” to kick-off." · side copy "Three short steps before the clock starts on your project."
    - **Frame** (row gap 16, align center, 1200×247) — 3 cards (col gap 12, pad 24, ~364×247, w:fill, h:fill, grow, bg surface, r 24, border line 1) separated by T "→" — IBM Plex Sans SemiBold 24, muted
      - Card: **Frame** (44×44, bg lilac, r 12) → icon 22px · T title — IBM Plex Sans SemiBold 19 ls -1%, ink · T body — IBM Plex Sans Regular 14/150%, muted · **Note** (row, pad 8/12/8/12, w:fill, bg canvas, r 12) T — IBM Plex Sans Medium 13, ink
      - receipt "Accept your fixed quote" / "One price, agreed before any work starts. Choose 50/50 or 12 instalments." / note "You pay: the deposit, or your first instalment, to book your slot."
      - doc "Complete your onboarding brief" / "A private online form for everything we need: business, goals, brand, content and access." / note "Saves as you go. Rough notes are fine."
      - cal "Kick-off call" / "We walk through your brief, confirm the plan and timeline, and agree how we’ll keep in touch." / note "You leave with dates for every step."
  - **04 · Timelines by package (Gantt)** (col gap 48, pad 120, 1440×802, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "HOW LONG IT TAKES" · T "Your timeline depends on your package." · side copy "Typical durations from kick-off to launch. Your exact dates are confirmed at kick-off and shown in your project plan."
    - **Timeline chart** (col gap 14, pad 28/32/28/32, 1200×344, w:fill, bg canvas, r 28)
      - **Axis** (row, pad 0/0/0/200, 1136×16): "Kick-off" · "Week 1" … "Week 6" — IBM Plex Sans Regular 12, muted (evenly spread across the 936px track ≈ 156px per week)
      - **Package rows** (row, align center, 1136×37): **Label** (col, 200 wide): T name — IBM Plex Sans SemiBold 16, ink + T duration — IBM Plex Sans Regular 12, muted · **Track** (free layout, 936×36, w:fill, grow) → segment rectangles h 36 r8 at x positions:
        - Step colours: Research #2E1848 · Direction #5B3A7A · Design #EF4A23 · Revisions #F7B48F · Handoff #9A3348 · Beyond launch #E3F1EA with a line stroke (always 124 wide = the support month)
        - Micro "~1 week": 18@0 · 18@21 · 38@41 · 25@83 · 25@110 · support 124@144
        - Launch "~2 weeks": 38@0 · 38@41 · 80@83 · 52@165 · 52@220 · support 124@281
        - Grow "~3–4 weeks": 69@0 · 69@72 · 141@144 · 93@289 · 93@385 · support 124@487
        - Scale "~4–6 weeks": 100@0 · 100@103 · 203@206 · 135@413 · 135@550 · support 124@694
      - **Legend** (row wrap gap 16, pad 8/0/0/0): swatch rectangle 14×14 r4 + T — IBM Plex Sans Regular 12, muted: "Research" · "Direction" · "Design" · "Revisions" · "Handoff" · "Beyond launch (1 month, after launch)"
      - T "Step proportions are indicative. Rush delivery (R3,500) cuts about a week; late content or feedback moves dates, not the price." — IBM Plex Sans Regular 12, muted
  - **05 · The six steps (deep dives)** (col gap 24, pad 120, 1440×2771, w:fill, bg canvas)
    - **Frame** (col gap 16, pad 0/0/24/0): ⧉ Tag Tone=Coral "THE SIX STEPS" · T "Every step, in detail." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
    - **Step card template** (row gap 40, pad 40, 1200 wide, w:fill, bg surface, r 32, border line 1)
      - **Left** (col gap 16, 340 wide): **Frame** (row gap 12, align center): T "0n" — Oswald Medium 64/100%, coral + **Frame** (44×44, bg lilac, r 12) → icon 22px · T step — IBM Plex Sans SemiBold 32 ls -2%, ink · T description — IBM Plex Sans Regular 16/155%, muted · **Time pill** (row gap 8, pad 8/14/8/12, align center, bg canvas, r 99): icon clock 14px + T "About {n}% of your timeline" — IBM Plex Sans Medium 13, ink · optional callout
      - **Columns** (row gap 16, 738 wide, w:fill, grow) — 3 columns (col gap 12, pad 20, w:fill, h:fill, grow, r 20):
        - Header (row gap 8, align center): icon 16px + T — Oswald Medium 11 ls 6%, muted: users "WHAT WE DO" (bg canvas) · user "WHAT YOU DO" (bg canvas) · gift "WHAT YOU GET" (bg mint)
        - Items (row gap 8): icon check 14px + T — IBM Plex Sans Regular 14/145%, ink
      - **Payment moment callout** (row gap 10, pad 12/14/12/14, 340 wide, w:fill, bg blush, r 16): icon wallet 18px · **Frame** (col gap 2): T "PAYMENT" — Oswald Medium 10 ls 6%, coral + T — IBM Plex Sans Medium 13/145%, ink
      - **Revision rounds callout** (col gap 6, pad 12/14/12/14, bg lilac, r 16): T "REVISION ROUNDS" — Oswald Medium 10 ls 6%, plum + lines IBM Plex Sans Medium 13, ink
    - **01 Research** (icon search; "About 15% of your timeline") — "We understand your goals, users and friction points before shaping the solution."
      - Payment callout: "Deposit or first instalment paid at booking"
      - We do: "Review your onboarding brief and goals" · "Study your customers and competitors" · "Audit your current site and search presence, if you have one" · "Research the search terms and areas to target"
      - You do: "Complete your onboarding brief" · "Join the kick-off call" · "Approve access through our secure request"
      - You get: "A written project plan: goals, pages and how we’ll measure success" · "A first sitemap" · "Dates for every step"
    - **02 Direction** (icon compass; 15%) — "We turn insights into flows, wireframes and prototypes that make the direction clear."
      - We do: "Page structure and navigation" · "Wireframes for your key pages" · "The visitor journey to your ONE main action" · "A content plan: who writes what, by when"
      - You do: "Review the wireframes" · "Approve the structure" · "Start gathering any content you’re supplying"
      - You get: "Approved sitemap and wireframes" · "A content checklist with due dates"
    - **03 Design** (icon pen; 30%) — "We design the interface, system, content and assets with careful production detail."
      - We do: "Visual design for your homepage and key pages" · "Mobile-first layouts" · "Copywriting, if it’s part of your package" · "Your site built on a private review link"
      - You do: "Review designs on the review link" · "Supply the remaining content and photos"
      - You get: "Your designed site, live on a private preview link"
    - **04 Revisions** (icon refresh; 20%) — "We refine the work against your feedback, tightening details until everything holds up."
      - Revision rounds callout: "Micro & Launch: 1 round" · "Grow: 2 rounds" · "Scale: 3 rounds" · "Extra rounds: R1,500 each"
      - We do: "Apply your feedback, round by round" · "Test on phones, tablets and desktops" · "Speed, accessibility and SEO checks"
      - You do: "Send one combined set of feedback per round" · "Final approver signs off"
      - You get: "An approved, tested site, ready to launch"
    - **05 Handoff** (icon rocket; 20%) — "We hand off files, guidelines and support so the work lands cleanly."
      - Payment callout: "50/50: balance due before handover · 12-month plan: instalments 2–12 start once your site is completed"
      - We do: "Launch and connect your domain" · "Submit your site to Google Search Console" · "Set up analytics behind a consent banner" · "Hand over logins, files and a short guide" · "Scale: a 1-hour training session"
      - You do: "Approve go-live" · "Settle the balance (50/50 option)"
      - You get: "Your live website" · "All files and access details" · "A handover guide"
    - **06 Beyond launch** — dark variant: card bg plum, no border, number peach, icon chip bg coral (icon heart), title surface, description onDarkMuted, time pill bg #FFFFFF @10% "1 month after launch" (surface text); columns bg #FFFFFF @6% (You get: #FFFFFF @12%), headers peach, item text surface
      - Description "One month of support, included."
      - We do: "Fix anything that isn’t right" · "Keep an eye on speed, uptime and forms" · "Small tweaks as real visitors arrive"
      - You do: "Tell us if anything looks off"
      - You get: "A smooth first month, then a choice of ongoing care"
  - **06 · When you pay (payments on the timeline)** (col gap 48, pad 120, 1440×987, w:fill, bg plum)
    - **Section header** (light-on-dark): ⧉ Tag Tone=OnDark "WHEN YOU PAY" · T "Payments, mapped to the work." — surface · side copy "One fixed price either way. Here’s exactly when each payment falls." — onDarkMuted
    - **Payment timeline** (col, 1200×460, w:fill, bg #FFFFFF @6%, r 28)
      - **Header row** (row, pad 16/0/16/0): label cell (220 wide, pad left 24) T "STEP" — Oswald Medium 11 ls 6%, onDarkMuted · 7 equal step columns (pad left 8, w:fill, grow) T — IBM Plex Sans Medium 13, surface: "Book" · "Research" · "Direction" · "Design" · "Revisions" · "Handoff" · "After launch"
      - **Plan rows** (row, pad 18/0/18/0, align center, 137 tall, border #FFFFFF @12% 1/0/0/0): label (col gap 2, pad left 24, 220 wide): T plan — IBM Plex Sans SemiBold 16, surface + T sub — IBM Plex Sans Regular 12, onDarkMuted · step cells (row, pad 0/8/0/8, w:fill, grow) holding payment blocks (col gap 2, pad 10/12/10/12, w:fill, r 14): T amount — Oswald Medium 18, surface + T caption — IBM Plex Sans Regular 11, surface. Due payments bg coral; ongoing monthly bg #FFFFFF @12%.
        - "50 / 50" / "Deposit + completion": Book → coral "50%" "to book your slot" · Handoff → coral "50%" "before handover"
        - "12 instalments" / "Same total, spread": Book → coral "1 of 12" "books your slot" · Handoff → coral "2 of 12" "starts on completion" · After launch → ongoing "3–12" "monthly"
        - "Website Launch Offer" / "R845 × 12": Book → coral "R845" "month 1" · Research → ongoing "R845" "monthly" · After launch → ongoing "…to month 12"
    - T "Instalments 2–12 only begin once your site is completed; if the build takes longer because of us, your payments wait too." — IBM Plex Sans Medium 15/150%, peach
  - **07 · How revisions work** (col gap 48, pad 120, 1440×838, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "REVISIONS" · T "Clear rounds, so feedback never drags on." · side copy "A round is one combined set of feedback from your final approver, which we then apply in full."
    - **Frame** (row gap 24, 1200×380)
      - **Rounds by package** (col, 588×380, w:fill, grow, bg canvas, r 24)
        - Header (row, pad 16/24/16/24, bg lilac): T "Package" · T "Rounds included" — Oswald Medium 12 ls 6%, plum (space-between)
        - Rows (row, pad 16/24/16/24, 66 tall, border line 1/0/0/0, space-between): T — IBM Plex Sans SemiBold 16, ink · T — Oswald Medium 22, ink
          - "Micro" "1" · "Launch" "1" · "Grow" "2" · "Scale" "3" · "Extra round" "R1,500 each" (coral)
      - **Frame** (col gap 12, 588 wide, w:fill, grow)
        - **Counts as one round** (col gap 10, pad 20/24/20/24, w:fill, bg mint, r 24): T "Counts as one round" — IBM Plex Sans SemiBold 17, ink · rows (row gap 10): **Frame** (22×22, bg surface, r 99) icon check 11px + T — IBM Plex Sans Regular 14/150%, ink
          - "All your feedback on a design, sent together" · "Comments from everyone, combined by your final approver" · "Fixes for things we got wrong (these never use up a round)"
        - **Counts as new scope (quoted first)** (col gap 10, pad 20/24/20/24, w:fill, bg blush, r 24): T "Counts as new scope (quoted first)" · rows with icon x 11px:
          - "A new page or feature that wasn’t in your quote" · (continues in the next chunk)

          - "Changing direction after the design is approved"
  - **08 · What we need from you, and when** (col gap 48, pad 120, 1440×1009, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Neutral "YOUR PART" · T "What we need from you, and when." · side copy "Most delays come from waiting on content. Here’s everything up front, so nothing catches you out."
    - **Needs checklist** (col, 1200×439, w:fill, bg surface, r 28, border line 1) — rows (row gap 16, pad 16/24/16/24, align center, ~1198×73, w:fill; rows 2–6 border line 1/0/0/0): **Frame** (40×40, bg blush, r 12) → icon 20px · T — IBM Plex Sans Medium 16, ink (w:fill) · **When pill** (row, pad 6/12/6/12, bg canvas, r 99) T — IBM Plex Sans SemiBold 12, ink
      - doc "Your onboarding brief" — "Before kick-off"
      - key "Access to domain, hosting and email (via our secure request)" — "Research"
      - list "Approval of the sitemap and wireframes" — "End of Direction"
      - image "Your logo, photos and any text you’re supplying" — "Start of Design"
      - thumb "One combined set of feedback per round" — "Revisions"
      - check "Final sign-off from your approver" — "End of Revisions"
    - **Note** (row gap 12, pad 16/20/16/20, align center, 1200×64, w:fill, bg mint, r 18): **Frame** (32×32, bg surface, r 99) icon clock 16px · T "We ask for feedback within 3 working days of each review link. Late content or feedback moves the launch date, never the price." — IBM Plex Sans Medium 14/150%, ink
  - **09 · How we work together** (col gap 48, pad 120, 1440×836, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "WORKING TOGETHER" · T "One team. One project lead. No chasing." · side copy "You always know who’s working on your site and what’s happening next."
    - **Grid** (col gap 16) — 2 rows (row gap 16) of 3 cards (col gap 12, pad 24, 389×181, w:fill, h:fill, grow, bg canvas, r 24): **Frame** (44×44, bg lilac, r 12) → icon 22px · T — IBM Plex Sans SemiBold 18 ls -1%, ink · T — IBM Plex Sans Regular 14/150%, muted
      - user "A named project lead" "One person who knows your project, from kick-off to launch."
      - chat "WhatsApp and email" "Quick questions on WhatsApp; decisions confirmed in writing by email."
      - clock "Replies within 1–2 business days" "Usually much sooner during your project."
      - link "Private review links" "See your real site as it’s built, on any device."
      - video "Calls when they help" "Kick-off, design walk-through and handover; more if you need them."
      - list "Weekly progress update" "A short note: what’s done, what’s next, anything we need."
  - **10 · After launch** (col gap 48, pad 120, 1440×970, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Neutral "AFTER LAUNCH" · T "Launch is the start, not the finish line." · side copy "Your first month of support is included. After that, choose how much you’d like us to look after."
    - **After-launch timeline** (row, 1200×125, w:fill, bg surface, r 24, border line 1, clip) — 4 segments (col gap 6, pad 18/20/18/20, w:fill, h:fill, grow; segments 2–4 border line 0/0/0/1): T label — Oswald Medium 12 ls 6% · T — IBM Plex Sans SemiBold 15/140%
      - bg coral (text surface): "LAUNCH" "Your site goes live"
      - bg mint: "MONTH 1" (muted) "Support included, every project" (ink)
      - bg lilac: "MONTHS 2–12" "On the 12-month plan: basic maintenance, health checks and monitoring included"
      - bg canvas: "THEN" "Care Plan, Full Service, or look after it yourself"
    - **Option cards** (row gap 20, 1200×339) — 3 cards (col gap 14, pad 28, ~388×339, w:fill, grow, r 28): **Frame** (48×48, r 14) → icon 24px · T — IBM Plex Sans SemiBold 22 ls -1% · T — IBM Plex Sans Regular 15/155% · **Price chip** (row gap 8, pad 8/12/8/12, align center, w:fill, r 12): icon wallet 14px + T — IBM Plex Sans SemiBold 13 · spacer (grow) · Button
      - bg surface, border line 1 (chip bg lilac, icon heart): "Look after it yourself" / "We hand over everything you need. You can always call on us later." / "Free" / ⧉ Button Style=Outline "Read the handover guide"
      - bg blush (chip bg surface, icon shield): "Website Care Plan" / "Round-the-clock monitoring, certificate tracking, updates, content changes and a monthly note." / "Priced per site · 30 days’ notice" / ⧉ Button Style=Outline "Ask about a Care Plan"
      - bg plum (chip bg coral, icon repeat, text surface / onDarkMuted, price chip bg #FFFFFF @10%): "Full Service" / "Hosting, mailboxes, ongoing SEO, updates and maintenance in one monthly price." / "From R1,500/month · cancel any time" / ⧉ Button Style=Coral "See Full Service pricing"
  - **11 · Process FAQ** (col gap 48, pad 120, 1440×757, w:fill, bg surface)
    - **Frame** (row gap 80): **Frame** (col gap 20, 400): ⧉ Tag Tone=Neutral "PROCESS QUESTIONS" · T "Questions about how it works." — IBM Plex Sans SemiBold 48/106% ls -2%, ink · ⧉ Button Style=Outline "All FAQs"
    - **Accordion** (col gap 10, 720×517) — items bg canvas on this white section
      - Open (pad 16/16/16/24, border ink 1.5): "What happens if the project scope changes partway through?" — "We’ll always let you know before any change affects the price. If you add scope beyond what was agreed, we quote it separately rather than silently adjusting what you’ve already agreed to pay."
      - Closed (720×68, border line 1, chip bg surface icon plus 17px): "What if I need to pause or cancel partway through?" · "What if I’m slow with content or feedback?" · "Can I see the site while it’s being built?" · "Who owns the website when it’s done?" · "What happens after my website launches?"
  - **12 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×739, w:fill)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×489, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 880×297, w:fill, grow): ⧉ Tag Tone=OnDark "READY WHEN YOU ARE" · T "STEP ONE IS A CONVERSATION." — Oswald Medium 104/92%, surface · T "Tell us about your business. We’ll come back with a fixed price, a timeline and the dates for every step." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 320×116): ⧉ Button Style=Light "Start your project" · ⧉ Button Style=Coral "See pricing"
    - **Footer** — desktop footer with LEGAL column (STUDIO here: About · Process · Work · Insights)

### Process — Mobile (390) — node 84:186 (390×3839)
- **Process — Mobile** (col, 390×3839, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 16, pad 16/20/24/20, 390×450, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "OUR PROCESS"
    - T "HOW YOUR WEBSITE GETS BUILT, STEP BY STEP." — Oswald Medium 50/94%, ink
    - T "Six steps, one team. What we do, what you do, what you get, how long it takes and when you pay." — IBM Plex Sans Regular 16/155%, muted
    - **Quick facts** (row gap 8, 350×69): 3 tiles (col, pad 10/12/10/12, w:fill, grow, bg surface, r 14, border line 1): T — Oswald Medium 22, ink + T — IBM Plex Sans Regular 11, muted — "6" steps · "1–6" weeks · "1" fixed price
    - (The project tracker is desktop-only.)
  - **02 · Sticky step chips** (col gap 16, pad 4/0/8/20, 390×51, w:fill, bg canvas) — horizontally scrolling chips (row, pad 10/14/10/14, r 999) T — IBM Plex Sans Medium 13: "Before" · "01 Research" (active: bg ink, surface) · "02 Direction" · "03 Design" · "04 Revisions" · "05 Handoff" · "06 After" (inactive: bg surface, border line 1, ink)
  - **03 · Timeline by package** (col gap 16, pad 40/20/40/20, 390×324, w:fill, bg surface)
    - T "How long it takes" — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Package bars** (col gap 6, 350×36): **Frame** (row, align space_between): T name — IBM Plex Sans SemiBold 14, ink + T duration — IBM Plex Sans Regular 12, muted · track (350×12, bg canvas, r 99) → coral fill r99
      - "Micro" "~1 week" fill 58 · "Launch" "~2 weeks" fill 117 · "Grow" "~3–4 weeks" fill 204 · "Scale" "~4–6 weeks" fill 292
  - **04 · Steps (accordion)** (col gap 16, pad 40/20/40/20, 390×917, w:fill, bg canvas)
    - T "Every step, in detail." — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Step (open)** (col gap 12, pad 16/14/16/16, 350×340, w:fill, bg surface, r 20, border ink 1.5)
      - **Head** (row gap 12, align center): T "01" — Oswald Medium 26, coral · T "Research" — IBM Plex Sans SemiBold 18 ls -1%, ink · **Frame** (30×30, bg ink, r 999) icon minus 15px
      - T "We understand your goals, users and friction points before shaping the solution." — IBM Plex Sans Regular 14/150%, muted
      - **Pills** (row gap 8): (row gap 6, pad 6/12/6/10, r 99) icon 12px + T — IBM Plex Sans Medium 12, ink — clock "~15% of timeline" (bg canvas) · wallet "Paid at booking" (bg blush)
      - **Segmented** (row gap 4, pad 4, 317×40, bg canvas, r 999): "We do" (selected bg ink, surface) · "You do" · "You get" — IBM Plex Sans SemiBold 12
      - Items (row gap 8): icon check 14px + T — IBM Plex Sans Regular 14, ink — "Review your brief and goals" · "Study your customers and competitors" · "Audit your current site, if any" · "Research search terms and areas"
    - **Steps (closed)** (col, pad 16/14/16/16, 350×73, bg surface, r 20, border line 1): T "0n" — Oswald Medium 26, coral · T name — IBM Plex Sans SemiBold 18 ls -1%, ink · **Frame** (30×30, bg canvas, r 999) icon plus 15px — 02 Direction · 03 Design · 04 Revisions · 05 Handoff · 06 Beyond launch
  - **05 · When you pay** (col gap 16, pad 40/20/40/20, 390×431, w:fill, bg plum)
    - T "When you pay" — IBM Plex Sans SemiBold 28 ls -2%, surface
    - **Plan cards** (col gap 8, pad 14/16/14/16, 350×89, w:fill, bg #FFFFFF @8%, r 18): T plan — IBM Plex Sans SemiBold 16, surface · **Frame** (row gap 8): 2 blocks (row, pad 8/10/8/10, w:fill, grow, bg coral, r 12) T — IBM Plex Sans Medium 12, surface
      - "50 / 50": "50% at booking" · "50% before handover"
      - "12 instalments": "1st at booking" · "2–12 from completion"
      - "Launch Offer": "R845 monthly" · "for 12 months"
  - **06 · Revisions + your part** (col gap 16, pad 40/20/40/20, 390×633, w:fill, bg canvas)
    - T "Revisions and your part" — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Rounds** (row gap 8, 350×72): 4 tiles (col, pad 10, align center, w:fill, grow, bg surface, r 14, border line 1): T — Oswald Medium 24, ink + T — IBM Plex Sans Regular 11, muted — "1" Micro · "1" Launch · "2" Grow · "3" Scale
    - T "Extra rounds R1,500 each." — IBM Plex Sans Medium 13, coral
    - **Needs rows** (row gap 10, pad 12/12/12/14, align center, 350×50, w:fill, bg surface, r 14, border line 1): T — IBM Plex Sans Medium 14, ink (w:fill) · when pill (row, pad 5/10/5/10, bg canvas, r 99) T — IBM Plex Sans SemiBold 11, ink
      - "Onboarding brief" "Before kick-off" · "Secure access" "Research" · "Wireframe approval" "Direction" · "Logo, photos, text" "Design" · "Combined feedback" "Revisions" · "Final sign-off" "Revisions"
  - **07 · After launch** (col gap 16, pad 40/20/40/20, 390×444, w:fill, bg surface)
    - T "After launch" — IBM Plex Sans SemiBold 28 ls -2%, ink
    - Tiles (col gap 2, pad 14/16/14/16, 350×66, w:fill, r 16): T — IBM Plex Sans SemiBold 15 + T — IBM Plex Sans Regular 12
      - bg mint "Month 1" "Support included" · bg canvas "Look after it yourself" "Free · handover guide" · bg blush "Care Plan" "Per site · 30 days’ notice" · bg plum (surface / onDarkMuted) "Full Service" "From R1,500/month"
  - **08 · CTA + footer** (col gap 16, pad 12/12/32/12, 390×511, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×294, w:fill, bg #3A1A44, r 32): T "STEP ONE IS A CONVERSATION." — Oswald Medium 42/94%, surface · ⧉ Button Style=Light "Start your project" (318×52, w:fill) · ⧉ Button Style=Coral "See pricing" (318×52, w:fill)
    - **Footer** — mobile footer with LEGAL column: STUDIO (About · Process · Work) · SERVICES (Websites · Full service · SEO) · LEGAL (Notice · Privacy · Terms)



---

# Insights listing

| | |
|---|---|
| **URL** | `/insights` |
| **Figma page** | `41:150` |
| **Desktop frame (1440)** | 41:178 |
| **Mobile frame (390)** | 42:212 |
| **Extra states / boards** | Article cover set 41:177 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Article covers are generated by the Article cover component (no photos).
- The footer in this frame differs; use the canonical footer from the README.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /insights page — node 43:274
PAGE · READ FIRST
/insights: data, filtering and SEO
CONTENT & DATA
•  All titles, excerpts, topics, dates and read times come from the live /insights articles (excerpts lightly shortened for card length).
•  Per article in the CMS: title, slug, topic (Websites | Growth | Pricing), datePublished, dateUpdated, readTime (calculated from word count at ~230 words per minute), excerpt (max ~180 characters), featured (true/false), cover (optional image).
•  Exactly one article is featured. If none is flagged, the newest one is featured automatically.
•  The hero summary (article count, topic count, latest date) is calculated, never typed.
COVERS
•  “Article cover” is a component with one variant per topic (left of this note). It’s used whenever an article has no custom cover, so the grid always looks consistent.
•  The featured cover is a custom illustration per article. The pricing one (bars for DIY, freelancer, agency, GoodGround) has no figures and carries the line “Illustration only. Real 2026 numbers are in the article.” Keep that line.
ORDER & FILTERING
•  Order: newest first (datePublished). The featured article is not repeated in “More articles”.
•  Topic chips work like the /work type filter: single-select, live counts, URL synced as ?topic=websites, aria-live “Showing n articles”, FLIP animation.
•  When a topic is selected, the featured card hides if it isn’t in that topic, and the grid shows only that topic.
•  After 9 articles in the grid, a “Show more articles” button (Outline) loads 9 more and moves focus to the first new card. No infinite scroll.
LINKS
•  Cards → /insights/{slug} (article template still to be designed).
•  “Ask a question” → /contact?topic=general&ref=insights. CTA “Start your project” → /start-project?ref=insights.
SEO
•  <title>: “Website Advice for South African Businesses | GoodGround” (keep live).
•  JSON-LD: Blog + ItemList of BlogPosting (headline, datePublished, url), BreadcrumbList. ?topic URLs use rel="canonical" → /insights.

> Build note: the article template has since been designed (page “Insights article template”), so cards link to it.

### Notes · I 01 Hero — node 43:293
01 · Hero
ENTRANCE
•  Tag FADE-UP → headline LINE MASK (120ms per line) → intro FADE-UP → summary card rows STAGGER GRID 70ms. “6” and “3” COUNT-UP; the date simply fades in.
MOBILE
•  Summary card hidden (the chip counts carry the same information).

### Notes · I 02 Topic filter — node 43:303
02 · Topic filter
BEHAVIOUR
•  Single-select radiogroup; the ink active pill slides between chips (translateX + width, motion/md). Arrow keys move and select.
•  Sticky under the header while scrolling the articles (same treatment as the /work filter).
•  On change: the grid uses the FLIP filter animation from /work (leaving cards fade + scale 0.96, staying cards slide, new cards fade in).
MOBILE
•  Chips scroll horizontally with a right-edge fade; they stick under the header.

### Notes · I 03 Featured — node 43:313
03 · Featured article
ENTRANCE
•  Card FADE-UP. Inside the cover, the four bars grow from 0 to their widths one after another (scaleX, origin left, 120ms stagger, ease/out); the GoodGround bar is last and coral.
•  Meta tags and date FADE-UP, title LINE MASK, excerpt and button FADE-UP.
INTERACTION
•  Whole card is one link (LINKED CARD hover). On hover the bars replay a short 4% width “breath” (motion/md) and the button arrow slides. Prefetch the article on hover or focus.
MOBILE
•  Cover above the text; bars animate when the card is 40% visible.

### Notes · I 04 Articles — node 43:326
04 · More articles
ENTRANCE
•  “More articles” heading LINE MASK; cards STAGGER GRID 90ms in reading order; the dark “Ask a question” card lands last.
CARDS
•  Each card is one link (LINKED CARD hover). On hover the cover’s topic word slides up 4px and the decorative circles drift 8px (motion/lg); “Read the article” arrow slides +3px x / -3px y.
•  Read time sits next to the topic tag with a clock icon. Cards in a row share the same height.
MOBILE
•  Compact rows: a 96px cover thumbnail, topic tag, read time and title. The excerpt is hidden. Pressed state scale 0.99.

### Notes · I 05 CTA + footer — node 43:339
05 · CTA + footer
BEHAVIOUR
•  Shared gradient CTA component. “Start your project” → /start-project?ref=insights.

## Layer-by-layer spec

### Insights — Desktop (1440) — node 41:178 (1440×3319)
- **Insights — Desktop (1440)** (col, 1440×3319, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "INSIGHTS" (91×44)
  - **01 · Hero** (col gap 40, pad 64/120/40/120, 1440×547, w:fill, bg canvas)
    - **Frame** (row gap 64, align max, 1200×443, w:fill)
      - **Frame** (col gap 24, 796×443, w:fill, grow)
        - ⧉ Tag Tone=Coral "INSIGHTS" (73×30)
        - T "PRACTICAL IDEAS FOR BUILDING ONLINE." — Oswald Medium 112/92%, ink
        - T "Straight-talking articles on website design, online presence and growth for South African small businesses. No jargon, no filler." — IBM Plex Sans Regular 18/155%, muted
      - **Summary card** (col, pad 0/24/0/24, 340×227, bg surface, r 24, border line 1) — rows (row gap 14, pad 16/0/16/0, align center, 290 wide, w:fill; rows 1–2 border line 0/0/1/0):
        - T "6" — Oswald Medium 32, ink · T "articles" — IBM Plex Sans Medium 14, muted
        - T "3" — Oswald Medium 32 · "topics"
        - T "13 Aug 2026" — Oswald Medium 22, ink · "latest article"
  - **02 · Topic filter** (col gap 12, pad 0/120/24/120, 1440×76, w:fill, bg canvas)
    - **Frame** (row, align space_between/center, 1200×52, w:fill)
      - **Topic chips (radiogroup)** (row gap 6, pad 6, 451×52, bg surface, r 999, border line 1) — chips (row gap 8, pad 10/16/10/16, align center, h 38, r 999), label IBM Plex Sans Medium 14, count badge (pad 1/7/1/7, 22×18, r 99) IBM Plex Sans SemiBold 12:
        - "All" "6" (active: bg ink, text surface, badge #FFFFFF @20%)
        - "Websites" "3" · "Growth" "2" · "Pricing" "1" (text ink, badge bg canvas, count muted)
      - T "Showing 6 articles" — IBM Plex Sans Regular 14, muted
  - **03 · Featured article** (col gap 40, pad 16/120/24/120, 1440×502, w:fill, bg canvas)
    - **Featured card** (row gap 48, pad 20/48/20/20, align center, 1200×462, w:fill, bg surface, r 32, border line 1)
      - **Cover · price ranges (illustration)** (col gap 16, pad 36, align max (bottom), 600×420, bg plum, r 24)
        - T "WHAT A WEBSITE COSTS" — Oswald Medium 13 ls 6%, onDarkMuted
        - 4 bar rows (col gap 8, 528×44, w:fill): T "{label}" — IBM Plex Sans Medium 14, surface · track (row, 528×18, w:fill, bg #FFFFFF @8%, r 99) → fill rectangle h 18 r99
          - "DIY builder" fill 148 #FFFFFF @25% · "Freelancer" fill 264 #FFFFFF @40% · "Agency" fill 486 #FFFFFF @55% · "GoodGround" fill 317 coral
        - T "Illustration only. Real 2026 numbers are in the article." — IBM Plex Sans Regular 12, onDarkMuted
      - **Frame** (col gap 20, 482×357, w:fill, grow)
        - **Meta row** (row gap 8, align center, 482×32, w:fill): ⧉ Tag Tone=Coral "FEATURED" · ⧉ Tag Tone=Neutral "PRICING" · T "13 August 2026  ·  10 min read" — IBM Plex Sans Regular 14, muted
        - T "How much does a website cost in South Africa? (2026 guide, with real numbers)" — IBM Plex Sans SemiBold 40/110% ls -2%, ink
        - T "Most website pricing pages hide the number behind a quote form. This one doesn’t. Real 2026 prices for DIY builders, freelancers, agencies, and GoodGround’s own fixed packages." — IBM Plex Sans Regular 17/160%, muted
        - ⧉ Button Style=Primary "Read the article" (194×52)
  - **04 · More articles** (col gap 24, pad 56/120/120/120, 1440×1320, w:fill, bg canvas)
    - T "More articles" — IBM Plex Sans SemiBold 32 ls -2%, ink
    - Grid: 2 rows (row gap 24) of 3 cards. **Article card** (col gap 18, pad 12/12/24/12, ~384×513–541, w:fill, h:fill, grow, bg surface, r 28, border line 1):
      - ⧉ Article cover Topic={topic} (358×220, w:fill)
      - **Body** (col gap 12, pad 0/12/0/12, w:fill)
        - **Meta** (row gap 10, align center, w:fill): topic Tag (Growth = Coral, Websites = Plum, Pricing = Neutral) · **Frame** (row gap 6) icon clock 14px + T "{n} min read" — IBM Plex Sans Regular 13, muted
        - T "{title}" — IBM Plex Sans SemiBold 22/125% ls -1%, ink
        - T "{excerpt}" — IBM Plex Sans Regular 15/155%, muted
        - **Link** (row gap 8, align center): T "Read the article" — IBM Plex Sans SemiBold 14, coral · icon arrow 16px
    - Cards in order:
      1. Growth · 9 min · "Website vs Facebook page: which one actually grows your business?" · "A Facebook page took an afternoon to build. That speed is exactly the problem. What a website does that a Facebook page structurally cannot."
      2. Websites · 7 min · "How to build a website that converts customers and grows with your business" · "Build conversion and growth into the same site from day one, and neither costs you customers later."
      3. Websites · 8 min · "Why hand-coded websites will always beat drag-and-drop website builders" · "Builders win the first afternoon. Hand-coded sites win every day after that. What you’re trading for the convenience."
      4. Websites · 9 min · "The biggest website mistakes South African SMEs make (and how to fix them)" · "Nobody can find them, they’re slow on a phone, and they never ask anyone to do anything."
      5. Growth · 7 min · "Why every small business in South Africa needs a website (and what a good one actually does)" · "Word of mouth has a ceiling. Why a solid website is the difference between being found and being forgotten."
      6. **Ask a question card** (col gap 16, pad 32, align space_between, 409×541, w:fill, h:fill, grow, bg ink, r 28)
         - **Frame** (52×52, bg coral, r 16) → icon help 26px
         - **Frame** (col gap 10, w:fill): T "Got a question we haven’t answered yet?" — IBM Plex Sans SemiBold 28/115% ls -1%, surface · T "Ask us. If it’s useful to others, it might become the next article." — IBM Plex Sans Regular 15/155%, onDarkMuted
         - ⧉ Button Style=Light "Ask a question" (187×52)
  - **05 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×767, w:fill, bg canvas)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×517, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 880×325, w:fill, grow)
        - ⧉ Tag Tone=OnDark "GET IN TOUCH" (97×30)
        - T "GROWTH STARTS HERE." — Oswald Medium 120/92%, surface
        - T "Read enough? Tell us about your business and we’ll come back with a fixed price and a clear plan." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 320×116)
        - ⧉ Button Style=Light "Start your project" (320×52, w:fill)
        - ⧉ Button Style=Coral "hello@goodground.co.za" (320×52, w:fill)
    - **Footer** — shared desktop footer (this frame lists "Insights" in the STUDIO column in place of "Process"; use the canonical footer from the README)

### Insights — Mobile (390) — node 42:212 (390×2643)
- **Insights — Mobile (390)** (col, 390×2643, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 16, pad 24/20/16/20, 390×372, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "INSIGHTS" (73×30)
    - T "PRACTICAL IDEAS FOR BUILDING ONLINE." — Oswald Medium 60/92%, ink
    - T "Straight-talking articles for South African small businesses. No jargon, no filler." — IBM Plex Sans Regular 16/155%, muted
  - **02 · Topic chips (scroll)** (col gap 8, pad 8/0/8/20, 390×80, w:fill, bg canvas)
    - **Chip row** (row gap 8, 370×40) — chips (row gap 6, pad 10/14/10/14, align center, r 999): label IBM Plex Sans Medium 14, count IBM Plex Sans SemiBold 12
      - "All" "6" (bg ink, surface) · "Websites" "3" · "Growth" "2" · "Pricing" "1" (bg surface, border line 1, label ink, count muted)
    - T "Showing 6 articles" — IBM Plex Sans Regular 12, muted (right-aligned, pad right 20)
  - **03 · Featured** (col gap 16, pad 8/20/8/20, 390×516, w:fill, bg canvas)
    - **Featured card** (col gap 16, pad 10/10/20/10, 350×500, w:fill, bg surface, r 24, border line 1)
      - **Cover** (col gap 10, pad 20, 328×206, w:fill, bg plum, r 18) — 4 bar rows (col gap 6, 288×34): label IBM Plex Sans Medium 12, surface · track 288×12 bg #FFFFFF @8% r99 → fills: DIY 81 @25% · Freelancer 145 @40% · Agency 267 @55% · GoodGround 174 coral
      - **Body** (col gap 12, pad 0/10/0/10, 328×246, w:fill)
        - **Meta** (row gap 6, align center): ⧉ Tag Tone=Coral "FEATURED" · ⧉ Tag Tone=Neutral "PRICING" · T "10 min" — IBM Plex Sans Regular 12, muted
        - T "How much does a website cost in South Africa? (2026 guide, with real numbers)" — IBM Plex Sans SemiBold 24/118% ls -1%, ink
        - T "Real 2026 prices for DIY builders, freelancers, agencies and GoodGround’s fixed packages." — IBM Plex Sans Regular 14/150%, muted
        - ⧉ Button Style=Primary "Read the article" (308×52, w:fill)
  - **04 · More articles** (col gap 12, pad 24/20/48/20, 390×937, w:fill, bg canvas)
    - T "More articles" — IBM Plex Sans SemiBold 24 ls -1%, ink
    - **Article row** (row gap 14, pad 10/14/10/10, align center, 350×118 (134 when the title wraps to 4 lines), w:fill, bg surface, r 20, border line 1)
      - ⧉ Article cover Topic={topic} (96×96)
      - **Frame** (col gap 6, 214 wide, w:fill, grow)
        - **Meta** (row gap 6, align center): topic Tag · T "{n} min" — IBM Plex Sans Regular 11, muted
        - T "{title}" — IBM Plex Sans SemiBold 15/130% ls -1%, ink
      - Rows: same 5 articles as desktop, same order
    - **Ask a question card** (col gap 12, pad 20, 350×156, w:fill, bg ink, r 24)
      - T "Got a question we haven’t answered yet?" — IBM Plex Sans SemiBold 20 ls -1%, surface
      - ⧉ Button Style=Light "Ask a question" (310×52, w:fill)
  - **05 · CTA + footer** (col gap 16, pad 12/12/32/12, 390×660, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×443, w:fill, bg #3A1A44, r 32)
      - ⧉ Tag Tone=OnDark "GET IN TOUCH" (97×30)
      - T "GROWTH STARTS HERE." — Oswald Medium 64/92%, surface
      - ⧉ Button Style=Light "Start your project" (318×52, w:fill)
      - ⧉ Button Style=Coral "hello@goodground.co.za" (318×52, w:fill)
    - **Footer** — shared mobile footer



---

# Insights article template

| | |
|---|---|
| **URL** | `/insights/{slug} (example: website cost guide)` |
| **Figma page** | `44:150` |
| **Desktop frame (1440)** | 44:151 |
| **Mobile frame (390)** | 47:198 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Reading progress bar is pinned to the very top of the viewport.
- Article body comes from the CMS (rich text). Map each rich-text block to the styles in the spec (TL;DR card, tables, plan cards, callouts).
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · Article template — node 48:225
TEMPLATE · READ FIRST
/insights/{slug}: content blocks, data and SEO
APPLIES TO
•  Every article at /insights/{slug}. Example content is the live “How much does a website cost in South Africa?” guide, condensed. Motion uses the global system on the “Homepage concept” page.
ARTICLE FIELDS
•  title, slug, topic, excerpt, datePublished, dateUpdated, readTime (calculated), author (GoodGround by default), shortAnswer (optional TL;DR card: one sentence + an optional chart), ogImage (auto-generated from the title if empty), related (optional manual picks).
CONTENT BLOCKS (WRITERS PICK FROM THESE, IN ANY ORDER)
•  Lead paragraph · H2 (adds a TOC entry and an anchor) · H3 · Paragraph (18px, 170% line height, 720px max width).
•  Option list (label, sub-label, value, highlight yes/no) · Factor list (icon, title, line) · Checklist (interactive) · Callout (tip, warning or note) · Pull quote.
•  Data table (header row + rows) · Range chart (label, from, to, optional inner “typical” band; scale set per chart) · Bar comparison chart (label + value).
•  Plan cards: pulled live from the pricing data, never typed into the article, so an article can’t show an old price. Shows “Prices correct as of {date}” under the block.
•  Add-on chips: also from pricing data; each chip opens the build-your-own tool with that item preselected.
•  Payment options: the shared 50/50 vs 12-month component.
•  Quick answers: accordion, also output as FAQPage JSON-LD.
END OF ARTICLE
•  Share row, author card, then “Keep reading”: 3 articles, manual picks first, then same topic, then newest; never the current article.
•  CTA copy can be set per article (default: “Ready to be found online?”). “Start your project” → /start-project?ref=insights-{slug}.
SEO
•  <title> from an SEO title field (live example: “Website Cost in South Africa: 2026 Guide & Real Prices | GoodGround”).
•  JSON-LD: BlogPosting (headline, datePublished, dateModified, author/publisher Organization, image) + FAQPage (quick answers) + BreadcrumbList (Home › Insights › {Topic} › {Title}).
•  Charts are real HTML/SVG with text labels, not images, so the numbers are readable by search engines and screen readers.

### Notes · AR 00 Header — node 48:244
00 · Header + reading progress
BEHAVIOUR
•  Standard header (light variant); centre pill shows “INSIGHTS / {TOPIC}”.
•  Reading progress: a 4px coral bar along the very top of the viewport, scaleX 0 → 1 (origin left) tied to scroll through the article body only (from the lead paragraph to the end of the quick answers). Linear, no easing. It stays visible when motion is off, because it’s information rather than decoration.

### Notes · AR 01 Hero — node 48:251
01 · Article hero + short answer
ENTRANCE
•  Back link and meta FADE-UP → title LINE MASK (90ms per line) → byline FADE-UP.
•  Short answer card FADE-UP at +250ms; its sentence fades in, then each range bar grows from its start value to its end value (scaleX from the left edge of the bar, 700ms, 120ms stagger). The peach “typical” band grows last.
INTERACTION
•  Hover or focus on a range bar (desktop): tooltip with the exact range, e.g. “Small studio: R12,000 – R45,000 · most land R21,000 – R32,000” (motion/sm).
•  Share: on mobile uses the native share sheet (navigator.share); on desktop opens a small menu (WhatsApp, LinkedIn, Facebook, Copy link). Copy shows the “Link copied” toast.
MOBILE
•  Title 32px; share is an icon button. Range bars stack with labels above each bar.

### Notes · AR 02 Body — node 48:264
02 · Body, table of contents and content blocks
TABLE OF CONTENTS (DESKTOP)
•  Sticky (top 120px) beside the article. Built from the H2s.
•  Scroll-spy: the active section gets the coral bar and white background (motion/sm); clicking smooth-scrolls to the heading (120px offset) and updates the URL hash.
•  Under the list: “{n} of {total} sections · ~{x} min left”, recalculated as you scroll.
READING MOTION (DELIBERATELY CALM)
•  Paragraphs and headings do NOT animate in; reading text should simply be there.
•  Content blocks (lists, tables, charts, cards) get a subtle FADE-UP with 12px instead of 24px. Charts animate their bars once when 40% visible.
•  Pull quote: the coral line draws top to bottom (scaleY, motion/lg) as the quote fades in.
INTERACTIVE BLOCKS
•  Checklist: real checkboxes; ticking animates the box fill and check stroke (motion/sm). State is saved per article in localStorage, so a returning reader sees their ticks. A “Reset” link appears once anything is ticked.
•  Plan cards: LINKED CARD hover → /pricing#{plan}. Add-on chips: hover background canvas → blush; click → build-your-own tool with that item added.
•  Quick answers: same accordion as the homepage FAQ (one open at a time; first open on load).
MOBILE
•  TOC becomes a sticky pill under the header showing the current section (“On this page · 2 of 8”). Tapping it opens a bottom sheet listing all sections (same sheet behaviour as the /work filter); choosing one closes the sheet and scrolls.
•  Plan cards become a horizontal swipe row (scroll-snap, dots). Checklist and accordions full width. Tables with 3+ columns scroll horizontally inside their card with a right-edge fade.

### Notes · AR 03 Keep reading — node 48:280
03 · Keep reading
BEHAVIOUR
•  Heading LINE MASK; three cards STAGGER GRID 90ms; LINKED CARD hover with the Article cover hover from /insights. Prefetch on hover or focus.
MOBILE
•  Compact rows with 88px covers (two shown).

### Notes · AR 04 CTA + footer — node 48:290
04 · CTA + footer
BEHAVIOUR
•  Shared gradient CTA. Headline and tag can be set per article. “See how pricing works” → /pricing.

## Layer-by-layer spec

### Article — Desktop (1440) — node 44:151 (1440×8723)
- **Article — Desktop (1440)** (col, 1440×8723, bg canvas)
  - **00 · Site header + reading progress** — shared light header; centre pill T "INSIGHTS  /  PRICING" (156×44); **Reading progress** rectangle h 4 coral, pinned to the very top of the viewport (shown at 504 wide = ~35% read)
  - **01 · Article hero** (col gap 24, pad 48/240/48/240, 1440×946, w:fill) — content width 960
    - **Back link** (row gap 8): icon back 16px · T "All insights" — IBM Plex Sans Medium 14, muted
    - **Meta** (row gap 10, align center): ⧉ Tag Tone=Neutral "PRICING" · T "13 August 2026" · T "·" · **Frame** (row gap 6) icon clock 14px + T "10 min read" — all IBM Plex Sans Regular 14, muted
    - T "How much does a website cost in South Africa? (2026 guide, with real numbers)" — IBM Plex Sans SemiBold 64/106% ls -3%, ink
    - **Byline row** (row, pad 8/0/0/0, align space_between/center, 960×48, w:fill)
      - **Author** (row gap 12, align center): **Avatar** (40×40, bg ink, r 999) → T "gg" — IBM Plex Sans SemiBold 15, surface · **Frame** (col): T "By GoodGround" — IBM Plex Sans SemiBold 14, ink + T "Web development studio, George" — IBM Plex Sans Regular 12, muted
      - **Share** (row gap 8, pad 10/16/10/16, align center, 96×40, bg surface, r 999, border line 1): icon share 16px + T "Share" — IBM Plex Sans Medium 14, ink
    - **Short answer card (TL;DR)** (col gap 24, pad 36/40/36/40, 960×452, w:fill, bg plum, r 32)
      - **Frame** (row, align space_between/center, 880×30): ⧉ Tag Tone=OnDark "THE SHORT ANSWER" · T "One-off build prices, 2026" — IBM Plex Sans Regular 13, onDarkMuted
      - T "A custom-coded business website costs R12,000 to R45,000 as one fixed price. Most small businesses land between R21,000 and R32,000." — IBM Plex Sans SemiBold 26/135% ls -1%, surface
      - **Range chart** (col gap 16, 880×170, w:fill)
        - **Axis** (row, pad 0/0/0/180, 880×14): T "R0" · "R30k" · "R60k" · "R90k" · "R120k" · "R150k+" — IBM Plex Sans Regular 11, onDarkMuted (spread evenly across the 700px track)
        - **Range row** (row, align center, 880×36, w:fill): **Label** (col gap 2, 180 wide): T name — IBM Plex Sans SemiBold 14, surface + T range — IBM Plex Sans Regular 12 · **Track** (free layout, 700×16, w:fill, grow, bg #FFFFFF @6%, r 99) → bar rectangle(s) h 16 r99 placed by value (scale R0–R150k over 700px)
          - "Freelancer" "R5,000 – R15,000" (onDarkMuted): bar 47 wide at x 23, #FFFFFF @40%
          - "Small studio" "R12,000 – R45,000" (peach): bar 154 wide at x 56, coral + inner "typical" band 51 wide at x 98, peach (R21k–R32k)
          - "Large agency" "R30,000 – R150,000+" (onDarkMuted): bar 560 wide at x 140, #FFFFFF @40%
      - **Legend row** (row gap 24, 880×38): **Frame** (row gap 8, align center) rectangle 24×10 peach r99 + T "Where most small businesses land: R21,000 – R32,000" — IBM Plex Sans Regular 13, surface · T "DIY builders aren’t on this chart: they’re rented, at R150 – R500 a month, for as long as you run the site." — IBM Plex Sans Regular 13/145%, onDarkMuted
  - **02 · Body (TOC + article)** (row gap 100, pad 48/240/96/120, 1440×6253, w:fill)
    - **Table of contents (sticky)** (col gap 4, 260×358)
      - T "ON THIS PAGE" — Oswald Medium 12 ls 6%, muted
      - **TOC item** (row gap 10, pad 8/0/8/12, align center, 260×34, w:fill, r 10): rectangle 3×18 r2 · T — IBM Plex Sans 14
        - Inactive: bar line, text Regular muted, no bg
        - Active: bg surface, bar coral, text SemiBold ink
        - Items: "The short answer" · "What decides the price" (active) · "Comparing two quotes" · "GoodGround’s 2026 pricing" · "Two ways to pay" · "The hidden costs" · "Why cheapest costs more" · "Quick answers"
      - **Progress line** (row gap 8, pad 16/0/0/0): T "2 of 8 sections · ~7 min left" — IBM Plex Sans Regular 12, muted
    - **Article column (720)** (col gap 28, 720×6109, w:fill, grow)
      - **Lead paragraph**: T "That’s the real range. Nobody else publishes it this plainly, because most studios want you on a call before they say a number. This guide breaks down what decides the price, what GoodGround charges for each package in 2026, and how to avoid paying for the wrong thing." — IBM Plex Sans Medium 21/160%, ink
      - **H2** (col gap 8, pad 24/0/0/0, w:fill, id = anchor): T — IBM Plex Sans SemiBold 34/115% ls -2%, ink
      - **Paragraph**: T — IBM Plex Sans Regular 18/170%, ink
      - Sequence (in order):
        1. H2 #short-answer "The short answer: real 2026 price ranges"
        2. P "Four options exist, and each one trades cost against control. Know which trade you’re making before you commit."
        3. **Option list** (col gap 12, 720×497) — rows (row gap 20, pad 20/24/20/24, 720×115, w:fill, bg surface, r 20, border line 1): **Frame** (col gap 4, w:fill, grow): **Frame** (row gap 8, align center) T label — IBM Plex Sans SemiBold 18 ls -1%, ink + T sub-label — IBM Plex Sans Regular 13, muted · T description — IBM Plex Sans Regular 15/155%, muted · **Value** (col, align max) T — Oswald Medium 22, ink
           - "DIY builder" "Wix, Squarespace, GoDaddy" "No upfront cost, but you rent the site for as long as you run it, and you build it yourself." "R150 – R500 / month"
           - "Freelancer" "Working alone" "Cheaper than a studio, but quality, reliability and support after launch vary enormously." "R5,000 – R15,000"
           - **Highlighted** (bg blush, border coral 1.5, value coral): "Small studio" "Fixed-price, custom-coded" "One quoted price, no monthly rental, built by a team you can hold to a contract." "R12,000 – R45,000"
           - "Large agency" "Retainer model" "Frequently with an ongoing monthly fee layered on top of the build cost." "R30,000 – R150,000+"
        4. **Callout (tip)** (row gap 14, pad 18/24/18/20, 720×82, w:fill, bg mint, r 18): **Frame** (32×32, bg surface, r 999) → icon spark 16px · T "Match the spend to the job. A one-page site for a pop-up stall doesn’t need R30,000; a ten-page site meant to carry a business for five years shouldn’t sit on a R200-a-month template." — IBM Plex Sans Medium 15/155%, ink. (Warning callouts: bg blush; note callouts: bg lilac.)
        5. H2 #what-decides-the-price "What actually decides the price"
        6. P "Every quote, ours included, comes down to the same handful of variables."
        7. **Factor list** (col, pad 0/24/0/24, 720×540, w:fill, bg surface, r 24, border line 1) — rows (row gap 16, pad 16/0/16/0, align center, 670×77, w:fill; all but last border line 0/0/1/0): **Frame** (40×40, bg lilac, r 12) → icon 20px · **Frame** (col gap 2, w:fill, grow): T title — IBM Plex Sans SemiBold 16, ink + T line — IBM Plex Sans Regular 14/150%, muted · T "0n" — Oswald Medium 16, line
           - file "Number of pages" "Each page needs its own layout, content and testing."
           - code "Custom code vs a template" "Built from scratch for your brand costs more, and looks like it."
           - zap "Functionality" "A contact form is cheap; a quote calculator or booking widget adds real hours."
           - spark "Design complexity" "Animations and interactive elements have to be built and tested, not just drawn."
           - search "SEO depth" "Titles and headings are standard; keyword research, schema and speed work are deeper."
           - pen "Copywriting" "Writing the words is a different skill, priced separately almost everywhere."
           - cal "Revisions & timeline" "More rounds cost more time; a rush job usually carries a rush fee."
        8. P "Two businesses can ask for “a five-page site” and land on very different quotes. The page count was never the real variable; the functionality behind each page is."
        9. H2 #comparing-quotes "How to compare two quotes without getting confused"
        10. P "A R12,000 quote and a R25,000 quote for what looks like the same project usually aren’t quoting the same project at all. Ask these five questions of any quote, ours included."
        11. **Checklist** (col gap 10, pad 24, 720×422, w:fill, bg lilac, r 24)
            - T "5 QUESTIONS TO ASK ANY QUOTE" — Oswald Medium 12 ls 6%, plum
            - Rows (row gap 14, pad 14/16/14/16, align center, 672×52 (72 when wrapping), w:fill, bg surface, r 14): checkbox 24×24 r 7 (checked = bg ink + icon check 14px; unchecked = bg surface, border line 1.5) · T — IBM Plex Sans Medium 15/145%, ink
              - (checked) "Is the design template-based, or built from scratch for your brand?"
              - (checked) "Is SEO basic (titles and headings), or does it include keyword research, schema and speed work?"
              - "How many revision rounds are included, and what happens after that?"
              - "Does the price include copywriting, or do you supply every word?"
              - "Is the number fixed, or can it grow once the project starts?"
            - T "Tick them off as you go (interactive, saved on this device only)." — IBM Plex Sans Regular 12, muted
        12. H2 #goodground-pricing "GoodGround’s actual 2026 pricing"
        13. P "Each package price is where that package starts. Your own number is confirmed in the quote and fixed before we start, with no surprise invoice at the end."
        14. **Plan cards** (col gap 12, 720×623) — 2 rows (row gap 12) of 2 cards (col gap 12, pad 22, ~354 wide, w:fill, h:fill, grow, r 22):
            - T name — IBM Plex Sans SemiBold 20 ls -1% · **Price** (row gap 6, align baseline): T "from" — IBM Plex Sans Regular 13 + T price — Oswald Medium 36 · **Chips** (row gap 8): chips (row, pad 5/10/5/10, r 99) T — IBM Plex Sans Medium 12 · 3 ticks (row gap 8, align center) icon check 14px + T — IBM Plex Sans Regular 14 · T "Suits: …" — IBM Plex Sans Regular 13/145%
            - Micro (bg surface, border line 1, chips bg canvas): from R12,000 · "1 page" "~1 week" · "Fully custom-coded" "Micro-interactions" "Working contact form" · "Suits: Freelancers, pop-ups and holding pages"
            - Launch: from R21,000 · "Up to 5 pages" "~2 weeks" · "Custom-coded" "Contact form" "Basic on-page SEO" · "Suits: A new business that needs a credible presence"
            - Grow (bg plum, text surface, chips #FFFFFF @10%, suits onDarkMuted): from R32,000 · "Up to 10 pages" "3–4 weeks" · "Blog included" "Custom interactive elements" "SEO, Analytics & Search Console" · "Suits: A business ready to market itself properly"
            - Scale: from R45,000 · "15+ pages" "4–6 weeks" · "Advanced custom functionality" "Advanced SEO & speed" "Training session" · "Suits: A site that needs to be a real sales tool"
            - Under the block (from the note): "Prices correct as of {date}"
        15. **Add-on chips** (col gap 14, pad 22/24/22/24, 720×248, w:fill, bg surface, r 22, border line 1)
            - T "None fit? Build your own from a R6,000 base build (one homepage, one contact form, basic SEO) and add exactly what you need:" — IBM Plex Sans Medium 15/155%, ink
            - **Chips** (row wrap gap 8): chip (row gap 8, pad 8/12/8/12, align center, bg canvas, r 99): icon plus 14px · T name — IBM Plex Sans Regular 13, ink · T price — IBM Plex Sans SemiBold 13, ink
              - "Extra standard page" R2,500 · "Complex custom page" R4,000 · "Blog setup" R4,500 · "Advanced SEO" R3,000 · "Conditional-logic form" R1,500
            - ⧉ Button Style=Outline "Open the build-your-own tool" (291×54)
        16. H2 #two-ways-to-pay "Two ways to pay for it"
        17. P "The price is fixed either way. How you pay it is your choice, and neither option changes the total."
        18. **Payment options** (row gap 12, 720×184) — 2 cards (col gap 8, pad 22, w:fill, h:fill, grow, r 22):
            - bg surface, border line 1: T "50 / 50" — Oswald Medium 40, ink · T "50% deposit" — IBM Plex Sans SemiBold 16, ink · T "Half upfront secures the project; the other half on completion, before handover." — IBM Plex Sans Regular 14/150%, muted
            - bg blush: T "12 ×" — Oswald Medium 40, coral · T "12-month plan" · T "The first instalment books your slot; the other 11 start once the project is complete."
        19. H2 #hidden-costs "The costs nobody mentions until after you’ve paid"
        20. P "A build price and a running cost are two different numbers. Hosting, a domain and ongoing maintenance sit outside the build price almost everywhere, including on GoodGround’s four packages. Full Service and the Website Launch Offer are the exceptions: both include hosting."
        21. **Data table** (col, 720×215, w:fill, bg surface, r 20, border line 1)
            - Header row (row, 718×46, bg canvas): 3 equal cells (row, pad 14/16/14/20, w:fill, grow) T — Oswald Medium 12 ls 6%, muted: "RUNNING COST" · "TYPICAL RANGE" · "HOW OFTEN"
            - Body rows (row, border line 1/0/0/0): cells (pad 14/16/14/20) col 1 IBM Plex Sans Regular 15, ink · col 2 IBM Plex Sans SemiBold 15, ink · col 3 IBM Plex Sans Regular 15, ink
              - ".co.za domain" "R150 – R300" "Per year" · "Hosting" "R100 – R500" "Per month" · "Maintenance" "Varies, or included in Full Service" "Ongoing"
        22. H2 #cheapest-costs-more "Why the cheapest option often costs more"
        23. P "A R200-a-month builder looks cheaper than a R32,000 fixed build on the day you sign up. Run the maths past year three and the picture changes."
        24. **Bar comparison chart (rent vs own)** (col gap 18, pad 28, 720×357, w:fill, bg ink, r 24)
            - **Frame** (row, align space_between/center): T "Builder rent, paid so far" — IBM Plex Sans SemiBold 16, surface · T "at R200 / month" — IBM Plex Sans Regular 13, onDarkMuted
            - **Bars** (row gap 16, align max (bottom), 664×200) — 3 columns (col gap 6, align center, w:fill, grow): T value — Oswald Medium 18, surface · rectangle (w:fill, r 10, #FFFFFF @30%) · T label — IBM Plex Sans Regular 12, onDarkMuted
              - "R2,400" h 43 "Year 1" · "R4,800" h 87 "Year 2" · "R7,200" h 130 "Year 3"
            - T "…and you still don’t own the site, can’t take it elsewhere, and built it yourself. A fixed-price build costs more on day one and belongs to you outright from day one." — IBM Plex Sans Regular 14/155%, onDarkMuted
        25. **Pull quote** (row gap 20, pad 16/0/16/8, 720×146): rectangle 4×114 coral r2 · T "You’re not comparing a cheap website to an expensive one. You’re comparing rent to ownership." — IBM Plex Sans SemiBold 30/125% ls -1%, ink
        26. P "A cheap freelancer carries a different risk: no company behind the contract, and support that depends on one person’s availability. Ask what happens if they’re unavailable for a month."
        27. H2 #quick-answers "Quick answers"
        28. **Accordion (quick answers)** (col gap 10, 720×428)
            - Open (col gap 10, pad 16/16/16/22, 720×124, bg surface, r 18, border line 1): **Frame** (row gap 12, align center) T "Does the price include hosting and a domain?" — IBM Plex Sans SemiBold 16, ink + **Frame** (32×32, bg ink, r 999) icon minus 16px · T "No. Those are arranged separately from the build price, and we’ll point you in the right direction when you enquire." — IBM Plex Sans Regular 15/160%, muted
            - Closed (720×66, chip bg canvas, icon plus): "Is there a deposit?" · "What if my project needs more than a package includes?" · "How long does a build take?" · "How do I get an exact number for my project?"
        29. **Article end (share + author)** (col gap 20, pad 24/0/0/0, 720×217)
            - rectangle 720×1 line
            - **Share row** (row, align space_between/center, 720×39): T "Share this guide" — IBM Plex Sans SemiBold 16, ink · pills (row gap 8; each row gap 8, pad 10/14/10/14, align center, bg surface, r 999, border line 1) icon 16px + T — IBM Plex Sans Medium 13, ink: chat "WhatsApp" · in "LinkedIn" · fb "Facebook" · link "Copy link"
            - **Author card** (row gap 16, pad 22/24/22/24, align center, 720×113, w:fill, bg surface, r 22, border line 1): **Avatar** (52×52, bg ink, r 999) → T "gg" — IBM Plex Sans SemiBold 18, surface · **Frame** (col gap 4, w:fill, grow): T "Written by GoodGround" — IBM Plex Sans SemiBold 16, ink + T "A web development studio in George, building fast, honest websites for South African small businesses." — IBM Plex Sans Regular 14/150%, muted · ⧉ Button Style=Outline "About us" (148×54)
  - **03 · Related articles** (col gap 32, pad 96/120/96/120, 1440×663, w:fill, bg surface)
    - **Frame** (row, align space_between/max, 1200×54): T "Keep reading" — IBM Plex Sans SemiBold 40 ls -2%, ink · ⧉ Button Style=Outline "All insights" (163×54)
    - **Cards** (row gap 24, 1200×385) — 3 cards (col gap 16, pad 12/12/22/12, 384×385, w:fill, h:fill, grow, bg canvas, r 28): ⧉ Article cover (360×220) · **Frame** (col gap 10, pad 0/12/0/12): meta row (topic Tag + icon clock 14px + "{n} min read" IBM Plex Sans Regular 13, muted) · T title — IBM Plex Sans SemiBold 20/125% ls -1%, ink
      - Websites · 8 min · "Why hand-coded websites will always beat drag-and-drop website builders"
      - Websites · 9 min · "The biggest website mistakes South African SMEs make (and how to fix them)"
      - Growth · 9 min · "Website vs Facebook page: which one actually grows your business?"
  - **04 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×754, w:fill, bg canvas)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×504, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 880×312, w:fill, grow)
        - ⧉ Tag Tone=OnDark "YOUR NUMBER, IN TWO DAYS" (176×30)
        - T "READY TO BE FOUND ONLINE?" — Oswald Medium 96/94%, surface
        - T "We build fast, honest websites for South African small businesses, with a choice of how you pay. Tell us about yours and get a firm number back within two business days." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 320×116)
        - ⧉ Button Style=Light "Start your project" (320×52, w:fill)
        - ⧉ Button Style=Coral "See how pricing works" (320×52, w:fill)
    - **Footer** — shared desktop footer

### Article — Mobile (390) — node 47:198 (390×3459)

- **Article — Mobile (390)** (col, 390×3459, bg canvas) — a condensed version of the same article
  - **Header + progress** — shared mobile header; reading progress rectangle h 3 coral pinned to the top (shown 140 wide)
  - **01 · Hero** (col gap 16, pad 24/20/24/20, 390×707, w:fill, bg canvas)
    - **Back link**: icon back 16px · T "All insights" — IBM Plex Sans Medium 14, muted
    - **Meta** (row gap 8, align center): ⧉ Tag Tone=Neutral "PRICING" · T "13 Aug 2026 · 10 min" — IBM Plex Sans Regular 13, muted
    - T "How much does a website cost in South Africa? (2026 guide, with real numbers)" — IBM Plex Sans SemiBold 32/112% ls -2%, ink
    - **Byline** (row, align space_between/center, 350×40): T "By GoodGround" — IBM Plex Sans SemiBold 14, ink · **Share icon button** (40×40, bg surface, r 999) → icon share 20px
    - **Short answer card** (col gap 14, pad 20, 350×361, w:fill, bg plum, r 24)
      - ⧉ Tag Tone=OnDark "THE SHORT ANSWER"
      - T "A custom-coded business website costs R12,000 – R45,000 as one fixed price. Most land between R21,000 and R32,000." — IBM Plex Sans SemiBold 18/140%, surface
      - **Range rows** (col gap 6, 310×35): **Frame** (row, align space_between): T label — IBM Plex Sans SemiBold 13, surface + T range — IBM Plex Sans Regular 12 · track (310×12, bg #FFFFFF @6%, r 99) with bars placed by value
        - "Freelancer" "R5k – R15k" (onDarkMuted): bar 21 at x 10, #FFFFFF @40%
        - "Small studio" "R12k – R45k" (peach): bar 68 at x 25 coral + typical band 23 at x 43 peach
        - "Large agency" "R30k – R150k+" (onDarkMuted): bar 248 at x 62, #FFFFFF @40%
      - T "DIY builders: R150 – R500 a month, rented." — IBM Plex Sans Regular 12, onDarkMuted
  - **02 · On this page (sticky dropdown)** (col gap 16, pad 8/20/8/20, 390×74, w:fill, bg canvas)
    - **TOC pill (sticky)** (row gap 10, pad 12/14/12/16, align center, 350×58, w:fill, bg surface, r 999, border line 1)
      - icon list 18px
      - **Frame** (col, w:fill, grow): T "On this page · 2 of 8" — IBM Plex Sans Regular 11, muted · T "What decides the price" — IBM Plex Sans SemiBold 14, ink
      - icon chevron 18px
  - **03 · Body** (col gap 20, pad 24/20/40/20, 390×1651, w:fill, bg canvas)
    - Lead: T "That’s the real range. Nobody else publishes it this plainly. This guide breaks down what decides the price and what GoodGround charges in 2026." — IBM Plex Sans Medium 18/160%, ink
    - H2: IBM Plex Sans SemiBold 26/118% ls -1%, ink · Paragraph: IBM Plex Sans Regular 17/170%, ink
    - H2 "The short answer: real 2026 price ranges" · P "Four options exist, and each trades cost against control."
    - **Option rows** (row gap 10, pad 14/16/14/16, align center, 350×55, w:fill, bg surface, r 16, border line 1): T label — IBM Plex Sans SemiBold 15, ink (w:fill) · T value — Oswald Medium 17, ink
      - "DIY builder" "R150 – R500 /mo" · "Freelancer" "R5,000 – R15,000" · highlighted (bg blush, border coral 1.5, value coral) "Small studio" "R12,000 – R45,000" · "Large agency" "R30,000 – R150,000+"
    - H2 "GoodGround’s actual 2026 pricing"
    - **Plan cards (swipe)** (row gap 12, 350×137, scroll-snap) — cards (col gap 8, pad 18, 240×137, r 20): T name — IBM Plex Sans SemiBold 17 · **Price** (row gap 6, align baseline): T "from" — IBM Plex Sans Regular 12 + T price — Oswald Medium 30 · T meta — IBM Plex Sans Regular 13
      - Micro (bg surface, border line 1) R12,000 "1 page · ~1 week" · Launch R21,000 "Up to 5 pages · ~2 weeks" · Grow (bg plum, text surface, muted onDarkMuted) R32,000 "Up to 10 pages · 3–4 weeks" · Scale R45,000 "15+ pages · 4–6 weeks"
    - **Dots** (row gap 6, 66×8): rectangle 24×8 coral r99 + 3 × rectangle 8×8 line r99
    - **Checklist** (col gap 8, pad 16, 350×234, w:fill, bg lilac, r 20)
      - T "5 QUESTIONS TO ASK ANY QUOTE" — Oswald Medium 11 ls 6%, plum
      - Rows (row gap 12, pad 12, align center, 318×46, w:fill, bg surface, r 12): checkbox 22×22 r 6 (checked = bg ink + icon check 13px; unchecked = border line 1.5) · T — IBM Plex Sans Medium 14, ink
        - (checked) "Template or built from scratch?" · "Basic SEO or the deeper work?" · "How many revision rounds?"
      - T "+ 2 more" — IBM Plex Sans Regular 12, muted (expands the remaining items)
    - **Pull quote** (row gap 14, 350×112): rectangle 4×112 coral r2 · T "You’re not comparing a cheap website to an expensive one. You’re comparing rent to ownership." — IBM Plex Sans SemiBold 22/125% ls -1%, ink
    - H2 "Quick answers"
    - **Accordion rows (closed)** (row gap 10, pad 14/12/14/16, align center, 350×58–66, w:fill, bg surface, r 16, border line 1): T — IBM Plex Sans SemiBold 14, ink · **Frame** (28×28, bg canvas, r 999) → icon plus 14px
      - "Does the price include hosting and a domain?" · "Is there a deposit?" · "How long does a build take?"
    - **Share** (row gap 8, 350×44): 2 pills (row, pad 12/14/12/14, align center, w:fill, grow, bg surface, r 999, border line 1) T — IBM Plex Sans Medium 14, ink: "WhatsApp" · "Copy link"
    - (Other desktop blocks — factor list, data table, payment options, bar chart, author card — use the same components at full width on mobile; the design shows a condensed selection.)
  - **04 · Keep reading** (col gap 16, pad 40/20/40/20, 390×369, w:fill, bg surface)
    - T "Keep reading" — IBM Plex Sans SemiBold 24 ls -1%, ink
    - **Rows** (row gap 14, pad 10/14/10/10, align center, 350×113, w:fill, bg canvas, r 20): ⧉ Article cover (88×88) · **Frame** (col gap 6, w:fill, grow): topic Tag + T title — IBM Plex Sans SemiBold 15/130%, ink
      - Websites "Why hand-coded websites will always beat drag-and-drop builders" · Growth "Website vs Facebook page: which one actually grows your business?"
  - **05 · CTA + footer** (col gap 16, pad 12/12/32/12, 390×580, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×363, w:fill, bg #3A1A44, r 32)
      - T "READY TO BE FOUND ONLINE?" — Oswald Medium 52/94%, surface
      - ⧉ Button Style=Light "Start your project" (318×52, w:fill)
      - ⧉ Button Style=Coral "See how pricing works" (318×52, w:fill)
    - **Footer** — shared mobile footer



---

# Start your project (multi-step)

| | |
|---|---|
| **URL** | `/start-project (?plan, ?package, ?service, ?intent, ?ref)` |
| **Figma page** | `24:150` |
| **Desktop frame (1440)** | 24:151 |
| **Mobile frame (390)** | 26:171, 26:248, 26:323 |
| **Extra states / boards** | ?plan=launch 25:151 · ?intent=quote 25:242 · validation 25:302 · sent 25:387 · failed 25:428 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Step 2 is not drawn. Build it in the same style from the notes and show it for sign-off.
- Whitelist every query value (list in the README, section 7).
- Auto-reply email spec is in the page note.
- No-JS: the form posts to the server and redirects to /thanks?form=start-project.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /start-project data, URL parameters & submission — node 27:176
PAGE · READ FIRST
/start-project: URL parameters, data and submission
PROJECT ENQUIRIES (UPDATED · 26 OCT 2026)
•  Every “Start your project”, “Claim a launch spot” and “Get a fixed quote” link points to /start-project.
•  /contact is its own page again (see the “Contact” page) for general questions, existing clients and direct channels. The earlier 301 redirect is cancelled; only /contact links that carry ?plan or ?intent are sent here with their parameters.
•  The sidebar keeps email, WhatsApp and location as a shortcut.
STEPS AND FIELDS (SAME AS THE LIVE FORM)
•  Step 1 · service: new-website | redesign | full-service | not-sure.
•  Step 2 · size: starter | standard | custom | not-sure.
•  Step 3 · timeline: asap | 1-3-months | 3-6-months | exploring.
•  Step 4 · fullName (required), businessName, email (required), phone, message. Plus a hidden honeypot field (“website”) for spam.
URL PARAMETERS (WHITELISTED VALUES ONLY)
•  ?plan=launch → coral “Launch offer” banner (price and spots from the same CMS values as homepage section 03). Pre-answers service = new-website and size = starter, and opens at Step 3. Summary shows “Plan · Launch · R845/mo”.
•  If the launch offer is sold out when they arrive, ?plan=launch behaves exactly like ?plan=launch-waitlist.
•  ?plan=launch-waitlist → banner “Join the {Next month} waitlist”, same pre-answers, submit button reads “Join the waitlist”.
•  ?intent=quote → lilac “Fixed quote” banner, nothing pre-answered, submit button reads “Request my fixed quote”.
•  ?service=new-website | redesign | full-service | not-sure → pre-answers Step 1 and opens at Step 2 (use from the /services/… pages).
•  ?ref=home | work | case-{slug} | service-{slug} → stored as a hidden field. For case-{slug}, the sidebar shows a mint chip “You came from the {Project} case study” (name looked up from the slug; unknown slug = no chip).
•  utm_source, utm_medium, utm_campaign, utm_term and utm_content are kept as hidden fields.
•  Parameters combine: plan + ref both apply. If plan and intent are both present, the plan banner shows and intent is still stored.
•  Unknown values are ignored silently. Never write raw parameter text into the page.
•  “Remove” on a banner clears that parameter (history.replaceState), keeps any answers given, and stays on the current step.
STEP STATE
•  Each step change adds ?step=n with history.pushState, so the browser Back button goes to the previous step.
•  Answers are kept in sessionStorage, so a refresh or an accidental Back keeps everything. Cleared after a successful send.
SUBMISSION
•  POST to the existing form endpoint. Payload: all answers, plan, intent, ref, UTMs, page URL and timestamp.
•  Email subject to GoodGround, e.g. “New enquiry · Launch · New website · from case-b3tter-bottle”.
•  Validation runs in the browser and again on the server. Reject submissions where the honeypot is filled or the form was sent less than 3 seconds after loading.
•  Success → success state, plus an automatic confirmation email to the visitor with a copy of their answers (confirmed: see “Auto-reply email” below).
•  Failure → send-failed state. Answers kept; “Email my answers instead” opens a mailto: with subject and body pre-filled.
ANALYTICS & SEO
•  Events: step_view (n), step_complete (n, answer), enquiry_sent (plan, intent, ref, service). Never send name, email or phone to analytics.
•  <title>: “Start Your Project | GoodGround Website Development”. JSON-LD WebPage (ContactPage + LocalBusiness now live on /contact). Filtered or parameter URLs are canonical to /start-project.
AUTO-REPLY EMAIL (CONFIRMED · 26 OCT 2026)
•  When: sent by the server straight after the enquiry is saved and passes spam checks (honeypot and the 3-second rule). Never sent for rejected submissions.
•  From: “GoodGround <hello@goodground.co.za>”, Reply-To: hello@goodground.co.za, so a reply goes straight to the team.
•  Subject: “We’ve got your enquiry, {First name}”. Waitlist: “You’re on the {Month} launch waitlist”. Quote: “Your fixed-quote request is in”.
•  Body, in this order: thank-you line → a summary of their answers (service, size, timeline, plan if any, their message) → “What happens next” (reply within 1–2 business days → short call → one fixed price, paid 50/50 or over 12 months) → link to /work → sign-off from the team with email and WhatsApp.
•  Format: simple branded HTML (logo, canvas background, ink text, one coral link) plus a plain-text version. No tracking pixels or click tracking.
•  Delivery: use a transactional email provider with SPF, DKIM and DMARC set up for goodground.co.za so it lands in the inbox, not spam.
•  Limits: at most one auto-reply per email address every 10 minutes. If the auto-reply fails, the enquiry still counts as sent (log the failure; never show the visitor an error for it).
•  Success screen copy stays: “We’ve sent a copy to {email}”.

> Build note: other query values used elsewhere in the designs — ?ref=industry-{slug}, ?ref=industry-other (leave the industry empty), ?ref=service-{slug}, ?ref=services, ?ref=services-consult, ?ref=about, ?ref=work, ?ref=insights, ?ref=404, ?service=full-service&ref=pricing, ?intent=seo-audit, ?package=micro|launch|grow|scale (from the pricing notes) — must be added to the whitelist.

### Notes · SP Header — node 27:223
00 · Site header
BEHAVIOUR
•  Same header as the rest of the site (light variant). Centre pill “START YOUR PROJECT” is the current page; hidden on mobile.

### Notes · SP Main — node 27:198
01 · Intro, form card and sidebar
ENTRANCE
•  Tag FADE-UP → title LINE MASK (120ms per line) → intro copy FADE-UP.
•  Form card FADE-UP at +200ms. Sidebar cards STAGGER GRID 100ms. A context banner (if any) slides down + fades in after the card lands (motion/md).
OPTIONS (STEPS 1–3)
•  Each step is a radiogroup of option cards. Hover: border ink 1.5px, background canvas (motion/sm).
•  Selecting: border coral 2px, background blush, icon chip turns white with a coral icon, radio fills coral and its check pops in (scale 0.6 → 1, ease/back).
•  Mouse or touch selection auto-advances 350ms later, so the choice is seen. Keyboard: arrow keys move the selection without advancing; Enter or Space advances.
•  “Back” returns to the previous step with its answer still selected.
STEP TRANSITION
•  Outgoing content: translateX -24px + fade out, 200ms. Incoming: translateX 24px → 0 + fade in, 300ms, ease/out. Going Back reverses the direction.
•  The card’s height animates between steps (measure, then transition height, motion/md, ease/in-out).
•  Progress: the next segment fills scaleX 0 → 1 (motion/md); the current step label turns semibold.
•  Focus moves to the new step’s question (tabindex="-1"), and an aria-live region announces “Step 2 of 4: How big is the project?”.
SIDEBAR
•  Sticky (top 120px) while the form scrolls.
•  When an answer is chosen, its row value crossfades from “—” to the answer and the row flashes blush for 600ms. An “Edit” link appears and jumps back to that step.
STEP 4 · DETAILS
•  Labels sit above fields (no floating labels). Focus: 2px ink ring.
•  Correct autocomplete and keyboard: name, organization, email (type="email"), tel (type="tel", inputmode="tel").
•  Errors appear on blur or submit, never while typing the first time. The error text slides down 4px + fades in; the field turns blush with a coral border and icon. aria-invalid and aria-describedby are set.
•  On submit with errors: focus the first invalid field and scroll it into view.
•  Sending: button label “Sending…”, the arrow chip becomes a spinner, the button is disabled (minimum 600ms so it never flickers).
SUCCESS & FAILURE
•  Success: the form card content crossfades to the success state; the check icon draws in (stroke, 500ms) and its chip scales 0.8 → 1. Focus moves to the success heading.
•  Failure: the error banner (role="alert") slides down above the button; nothing typed is lost.
MOBILE
•  Intro shows on Step 1 only. After the first answer, the page smooth-scrolls so the progress bar sits at the top.
•  The progress bar (with Back and “Step n of 4”) sticks under the header with a 12px backdrop blur.
•  The sidebar becomes a collapsed “Your answers (n)” accordion at the bottom of each step. “What happens next” and direct contact show on Step 1 and on the success screen only.
•  Option cards are full width, at least 64px tall. Same step transitions.

### Notes · SP States — node 27:230
STATES
States shown below
ORDER
•  1 · Arrived with ?plan=launch (opens at Step 3).
•  2 · Arrived with ?intent=quote.
•  3 · Step 4 with a validation error and ?ref=case-b3tter-bottle.
•  4 · Sent successfully.
•  5 · Send failed.
•  Mobile equivalents of Step 1, the launch arrival and Step 4 are in the frames to the right of the desktop page.
EXAMPLE CONTENT
•  “Thandi Mokoena” and “Mokoena Plumbing” are made-up example data for the design only.

## Layer-by-layer spec

> The state frames carry a "STATE" kicker, a title and an explanation line at the top: those are annotations, not UI.

### Start project — Desktop (1440) · Step 1 default — node 24:151 (1440×1504)
- **Start project — Desktop (1440) · Step 1 default** (col, 1440×1504, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "START YOUR PROJECT" (156×44)
  - **01 · Main (form + summary)** (row gap 48, pad 48/120/120/120, 1440×1170, w:fill)
    - **Left column** (col gap 40, 752×1002, w:fill, grow)
      - **Intro** (col gap 20, 752×375, w:fill)
        - ⧉ Tag Tone=Coral "START YOUR PROJECT" (138×30)
        - T "LET’S PLANT SOMETHING ⏎ THAT GROWS." — Oswald Medium 88/94%, ink
        - T "A few quick questions, then your details. It takes about a minute, and there’s no obligation, just a starting point for the conversation." — IBM Plex Sans Regular 18/155%, muted
      - **Form card · Step 1** (col gap 32, pad 36/40/40/40, 752×587, w:fill, bg surface, r 32, border line 1)
        - **Progress** (col gap 12, 670×65, w:fill)
          - **Frame** (row, align space_between, 670×19): T "STEP 1 OF 4" — Oswald Medium 13 ls 6%, coral · T "About a minute" — IBM Plex Sans Regular 13, muted
          - **Segments** (row gap 6, 670×6): 4 × rectangle 163×6 r99 — done/current = ink, upcoming = line
          - **Labels** (row gap 6, 670×16): "Service" (IBM Plex Sans SemiBold 12, ink — current) · "Size" · "Timeline" · "Your details" (IBM Plex Sans Regular 12, muted)
        - **Question** (col gap 8, 670×71): T "What can we help you with?" — IBM Plex Sans SemiBold 32 ls -2%, ink · T "Choose the area you need help in." — IBM Plex Sans Regular 16, muted
        - **Options (radiogroup)** (col gap 16, 670×260, w:fill) — 2 rows (row gap 16) of 2 option cards
          - **Option card** (row gap 16, pad 20, ~327×112–132, w:fill, h:fill, grow, bg surface, r 20, border line 1): **Icon chip** (44×44, bg lilac, r 12) → icon 22px · **Frame** (col gap 4, w:fill, grow): T title — IBM Plex Sans SemiBold 18 ls -1%, ink + T sub — IBM Plex Sans Regular 14/150%, muted · **Radio** (22×22, bg surface, r 99, border line 1.5)
          - Hover state (shown on "Website redesign"): bg canvas, border ink 1.5
          - Selected state: bg blush, border coral 2, icon chip bg surface (coral icon), radio bg coral with icon check 13px
          - spark "New website" "A brand-new site, built from scratch." · refresh "Website redesign" "Rebuild or refresh an existing site." · repeat "Full Service" "Build, hosting, mailboxes, SEO and maintenance, monthly." · help "Not sure yet" "Help me work out what I need."
        - **Footer row** (row, align space_between/center, 670×17): **Frame** (row gap 8) icon lock 14px + T "No obligation. We never share your details." — IBM Plex Sans Regular 13, muted · T "Choosing an option moves you to the next step" — IBM Plex Sans Regular 13, muted
    - **Summary sidebar (sticky)** (col gap 20, 400×738)
      - **Your answers** (col, pad 24/28/12/28, 400×214, w:fill, bg surface, r 24, border line 1)
        - T "YOUR ANSWERS" — Oswald Medium 12 ls 6%, muted
        - Rows (row, pad 16/0/16/0, align space_between, 342×53, w:fill; rows 1–2 border line 0/0/1/0): T label — IBM Plex Sans Regular 15, muted · T value — IBM Plex Sans SemiBold 15 ("—" muted when empty, ink when answered, followed by an "Edit" link IBM Plex Sans Medium 12, coral)
          - "Service" · "Size" · "Timeline"
      - **What happens next** (col gap 16, pad 24/28/28/28, 400×222, w:fill, bg plum, r 24)
        - T "WHAT HAPPENS NEXT" — Oswald Medium 12 ls 6%, onDarkMuted
        - Steps (row gap 14, w:fill): **Number chip** (30×30, bg #FFFFFF @12%, r 99) → T "0n" — Oswald Medium 12, surface · T — IBM Plex Sans Medium 15/145%, surface
          - "01" "We reply within 1–2 business days" · "02" "A short call to understand your business" · "03" "One fixed price, paid 50/50 or over 12 months"
      - **Rather talk directly** (col, pad 24/28/12/28, 400×262, w:fill, bg surface, r 24, border line 1)
        - T "RATHER TALK DIRECTLY?" — Oswald Medium 12 ls 6%, muted
        - Rows (row gap 14, pad 14/0/14/0, align center, 342×69, w:fill; rows 1–2 border line 0/0/1/0): **Frame** (40×40, bg blush, r 999) → icon 20px · **Frame** (col gap 2, w:fill, grow): T label — IBM Plex Sans Regular 12, muted + T value — IBM Plex Sans SemiBold 15, ink
          - mail "Email" "hello@goodground.co.za" · chat "WhatsApp" "Message us" · pin "Based in" "George, Garden Route, Western Cape"
  - **02 · Footer** (row, pad 40/48/48/48, align space_between, 1440×227, w:fill, border line 1/0/0/0) — shared footer content (no CTA card on this page)

### Start project — Mobile · Step 1 default — node 26:171 (390×1208)
- **Start project — Mobile · Step 1 default** (col, 390×1208, bg canvas)
  - **Header** — shared mobile header
  - **Intro** (col gap 16, pad 24/20/8/20, 390×303, w:fill)
    - ⧉ Tag Tone=Coral "START YOUR PROJECT" (138×30)
    - T "LET’S PLANT ⏎ SOMETHING ⏎ THAT GROWS." — Oswald Medium 56/94%, ink
    - T "A few quick questions, then your details. About a minute, no obligation." — IBM Plex Sans Regular 16/155%, muted
  - **Sticky progress** (col gap 10, pad 14/20/14/20, 390×62, w:fill, bg canvas, border line 0/0/1/0; sticky with 12px backdrop blur)
    - **Frame** (row, align space_between/center, 350×18): left slot = T "About a minute" — IBM Plex Sans Regular 13, muted on Step 1, or **Back** (row gap 6) icon back 16px + T "Back" — IBM Plex Sans Medium 14, ink on later steps · T "STEP n OF 4" — Oswald Medium 12 ls 6%, coral
    - **Segments** (row gap 4, 350×5): 4 × rectangle 85×5 r99 (ink done, line upcoming)
  - **Body** (col gap 20, pad 24/20/32/20, 390×765, w:fill)
    - T "What can we help you with?" — IBM Plex Sans SemiBold 26 ls -1%, ink
    - T "Choose the area you need help in." — IBM Plex Sans Regular 15, muted
    - **Options** (col gap 10, 350×348) — option row (row gap 14, pad 16, align center, 350×75 (93 when text wraps), w:fill, bg surface, r 18, border line 1): icon chip 40×40 bg lilac r 12 (icon 20px) · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 16 ls -1%, ink + T — IBM Plex Sans Regular 13/140%, muted · radio 22×22 (border line 1.5)
      - Same four options as desktop
    - **What happens next** (col gap 12, pad 20, 350×146, w:fill, bg plum, r 20)
      - T "WHAT HAPPENS NEXT" — Oswald Medium 11 ls 6%, onDarkMuted
      - T "01  We reply within 1–2 business days" / "02  A short call about your business" / "03  One fixed price, 50/50 or 12 months" — IBM Plex Sans Medium 14, surface
    - **Direct contact** (row gap 10, 350×44, w:fill): 2 pills (row gap 8, pad 12/14/12/14, align center/center, w:fill, grow, bg surface, r 999, border line 1): icon mail 18px "Email us" · icon chat 18px "WhatsApp" — IBM Plex Sans Medium 14, ink
    - T "Based in George, Garden Route, Western Cape" — IBM Plex Sans Regular 13, muted

### Start project — Mobile · Step 3 (?plan=launch) — node 26:248 (390×774)
- **Start project — Mobile · Step 3 (?plan=launch)** (col, 390×774, bg canvas)
  - **Header** — shared mobile header (intro hidden after Step 1)
  - **Sticky progress** — Back + "STEP 3 OF 4"; segments 1–3 ink, 4 line
  - **Body** (col gap 20, pad 24/20/32/20, 390×634, w:fill)
    - **Context banner** (row gap 12, pad 14, 350×64, w:fill, bg blush, r 16)
      - **Frame** (32×32, bg surface, r 999) → icon tag 16px
      - **Frame** (col gap 2, w:fill, grow): T "Launch offer · R845/mo" — IBM Plex Sans SemiBold 14, ink · T "1 of 2 November spots left." — IBM Plex Sans Regular 12, muted
      - T "Remove" — IBM Plex Sans Medium 12, coral
    - T "When would you like to start?" — IBM Plex Sans SemiBold 26 ls -1%, ink
    - T "No pressure, it just helps us plan." — IBM Plex Sans Regular 15, muted
    - **Options** (col gap 10, 350×332)
      - **Selected** "As soon as possible" / "We’re ready to go." — row bg blush, border coral 2, icon chip bg surface (icon zap 20px), radio bg coral with icon check 13px
      - icon cal "In 1–3 months" / "Planning ahead." · icon cal "In 3–6 months" / "On the horizon." · icon compass "Just exploring" / "Gathering information."
    - **Your answers (collapsible)** (col, pad 14/18/14/18, 350×48, w:fill, bg surface, r 18, border line 1): **Frame** (row, align space_between/center) T "Your answers (3)" — IBM Plex Sans SemiBold 14, ink · icon chevron 18px

### Start project — Mobile · Step 4 details — node 26:323 (390×980)
- **Start project — Mobile · Step 4 details** (col, 390×980, bg canvas)
  - **Header** + **Sticky progress** (Back, "STEP 4 OF 4", all 4 segments ink)
  - **Body** (col gap 20, pad 24/20/32/20, 390×840, w:fill)
    - T "How can we reach you?" — IBM Plex Sans SemiBold 26 ls -1%, ink
    - T "We’ll reply within 1–2 business days." — IBM Plex Sans Regular 15, muted
    - **Fields** (col gap 6, 350 wide): label row (row gap 6) T — IBM Plex Sans Medium 14, ink + optional "Optional" — IBM Plex Sans Regular 13, muted · input (row, pad 14/16/14/16, 350×51, w:fill, bg surface, r 14, border line 1) value IBM Plex Sans Regular 16 (ink when filled, muted placeholder)
      - "Full name" / "Thandi Mokoena" (filled) · "Business name" Optional / "Business name" · "Email" / "name@business.co.za" · "Phone" Optional / "082 000 0000" · "Anything else?" Optional / textarea 350×110 "Tell us more about what you’re building."
    - **Your answers (collapsible)** — "Your answers (3)" + chevron
    - ⧉ Button Style=Coral "Send your enquiry" (350×52, w:fill)
    - T "We never share your details." — IBM Plex Sans Regular 12, muted

### State · Arrived with ?plan=launch (from “Claim a launch spot”) — node 25:151 (1440×899)
Annotation: "Service and size are pre-answered from the offer, so the visitor lands on Step 3. They can still go Back and change anything."
- **Layout** (row gap 48, pad 0/72/0/72, 1344×698)
  - **Form card · Step 3 · launch** (col gap 28, pad 36/40/40/40, 752×698, w:fill, grow, bg surface, r 32, border line 1)
    - **Progress** (col gap 12, 670×37): **Frame** (row, align space_between/center): T "STEP 3 OF 4" — Oswald Medium 13 ls 6%, coral · **Back** (row gap 6) icon back 14px + T "Back" — IBM Plex Sans Medium 13, muted · segments 1–3 ink, 4 line (163×6)
    - **Context banner** (row gap 14, pad 16/18/16/18, 670×74, w:fill, bg blush, r 18)
      - **Frame** (36×36, bg surface, r 999) → icon tag 18px
      - **Frame** (col gap 2, w:fill, grow): T "Launch offer · R845 a month for 12 months" — IBM Plex Sans SemiBold 15, ink · T "Domain, hosting and email included. 1 of 2 November spots left." — IBM Plex Sans Regular 13/150%, muted
      - T "Remove" — IBM Plex Sans Medium 13, coral
    - **Question** (col gap 8): T "When would you like to start?" — IBM Plex Sans SemiBold 32 ls -2%, ink · T "No pressure, it just helps us plan ahead." — IBM Plex Sans Regular 16, muted
    - **Options (single column on Step 3)** (col gap 12, 670×354) — rows (row gap 16, pad 18/20/18/20, align center, 670×79, w:fill, r 20): icon chip 40×40 r 12 (icon 20px) · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 17 ls -1%, ink + T — IBM Plex Sans Regular 13, muted · radio 22×22
      - Selected (bg blush, border coral 2, chip bg surface, radio coral + check): zap "As soon as possible" "We’re ready to go."
      - Default (bg surface, border line 1, chip bg lilac): cal "In 1–3 months" "Planning ahead." · cal "In 3–6 months" "On the horizon." · compass "Just exploring" "Gathering information for now."
  - **Summary sidebar** (col gap 16, 400×243) → **Your answers** (col, pad 24/28/12/28, bg surface, r 24, border line 1)
    - T "YOUR ANSWERS" — Oswald Medium 12 ls 6%, muted
    - Rows (row gap 12, pad 14/0/14/0, align space_between/center, 342×47, border bottom except last): label IBM Plex Sans Regular 14, muted · **Frame** (row gap 10, align center): value IBM Plex Sans SemiBold 14, ink + "Edit" IBM Plex Sans Medium 12, coral
      - "Plan" "Launch · R845/mo" (no Edit) · "Service" "New website" Edit · "Size" "Starter" Edit · "Timeline" "As soon as possible" Edit

### State · Arrived with ?intent=quote (from “Get a fixed quote”) — node 25:242 (1440×812)
Annotation: "No answers are pre-filled; the banner and the final button change to match the visitor’s intent."
- **Form card · Step 1 · quote** (col gap 28, pad 36/40/40/40, 752×611, w:fill, grow, bg surface, r 32, border line 1)
  - **Progress**: T "STEP 1 OF 4" · segment 1 ink, 2–4 line
  - **Context banner** (row gap 14, pad 16/18/16/18, 670×74, w:fill, bg lilac, r 18)
    - **Frame** (36×36, bg surface, r 999) → icon tag 18px
    - **Frame** (col gap 2, w:fill, grow): T "You’re asking for a fixed quote" — IBM Plex Sans SemiBold 15, ink · T "We’ll reply with one fixed price and both ways to pay: 50/50, or 12 monthly instalments." — IBM Plex Sans Regular 13/150%, muted
  - T "What can we help you with?" — IBM Plex Sans SemiBold 32 ls -2%, ink
  - **Options** (col gap 12) — same row style as the launch state: "New website" "A brand-new site, built from scratch." · "Website redesign" "Rebuild or refresh an existing site." · (annotation) "…same four options as Step 1. On Step 4 the button reads “Request my fixed quote”."
- **Summary sidebar** (400×196) → "YOUR ANSWERS" with "Service" "—" · "Size" "—" · "Timeline" "—" (all muted)

### State · Step 4 · Your details, with a validation error and ?ref=case-b3tter-bottle — node 25:302 (1440×966)
Annotation: "Errors show after leaving a field (on blur) or on submit, never while typing the first time."
- **Layout** (row gap 48, pad 0/72/0/72, 1344×765)
  - **Form card · Step 4 · details** (col gap 28, pad 36/40/40/40, 752×765, w:fill, grow, bg surface, r 32, border line 1)
    - **Progress**: "STEP 4 OF 4" + Back · all 4 segments ink
    - **Question** (col gap 8): T "How can we reach you?" — IBM Plex Sans SemiBold 32 ls -2%, ink · T "We’ll get back to you within 1–2 business days." — IBM Plex Sans Regular 16, muted
    - **Field pattern** (col gap 8): label row (row gap 6) T — IBM Plex Sans Medium 14, ink (+ "Optional" — IBM Plex Sans Regular 13, muted) · input (row gap 10, pad 14/16/14/16, align center, h 51, w:fill, bg canvas, r 14, border line 1) T — IBM Plex Sans Regular 16
    - **Row** (row gap 16, 670×77): "Full name" / "Thandi Mokoena" (ink) · "Business name" Optional / "Mokoena Plumbing" (ink)
    - **Row** (row gap 16, 670×120):
      - **Email (error)**: input bg blush, border coral 1.5, h 52 · T "thandi@mokoena" — ink · icon alert 18px (coral) · error line (row gap 6, align center) T "Add the rest of your email, for example name@business.co.za" — IBM Plex Sans Medium 13, coral
      - "Phone" Optional / "082 000 0000" (muted)
    - **Field** (670×146): "Anything else?" Optional / textarea 670×120 "Tell us more about what you’re building." (muted)
    - ⧉ Button Style=Coral "Send your enquiry" (670×52, w:fill)
    - T "By sending, you agree we can contact you about this enquiry. We never share your details." — IBM Plex Sans Regular 12, muted
  - **Summary sidebar** — continues in the next chunk


  - **Summary sidebar** (col gap 16, 400×278)
    - **Your answers** (col, pad 24/28/12/28, 400×196, bg surface, r 24, border line 1): "Service" "New website" Edit · "Size" "Standard" Edit · "Timeline" "In 1–3 months" Edit
    - **Ref chip (from ?ref)** (row gap 12, pad 14/20/14/20, align center, 400×66, w:fill, bg mint, r 18)
      - icon link 18px
      - T "You came from the B3TTER case study. We’ll mention it in our reply." — IBM Plex Sans Regular 13/145%, ink

> Step 2 (size) is not drawn as its own frame. Build it with the same option-card grid as Step 1 (2 × 2), using the live form's labels for starter | standard | custom | not-sure, and the question "How big is the project?" (the aria-live text in note 01).

### State · Sent successfully — node 25:387 (1440×661)
Annotation: "Replaces the form card in place; the summary stays so the visitor can see what they sent."
- **Form card · Success** (col gap 20, pad 36/40/40/40, 752×460, w:fill, grow, bg surface, r 32, border line 1)
  - **Frame** (row, align center/center, 72×72, bg mint, r 999) → icon check 34px
  - T "Thanks, Thandi. Your enquiry is in." — IBM Plex Sans SemiBold 32 ls -2%, ink
  - T "We’ve sent a copy to thandi@mokoena.co.za. Expect a reply within 1–2 business days, usually sooner." — IBM Plex Sans Regular 16/155%, muted
  - **While you wait** (col gap 10, pad 18/20/18/20, 670×84, w:fill, bg canvas, r 18)
    - T "WHILE YOU WAIT" — Oswald Medium 12 ls 6%, muted
    - T "See how we measure every build in our case studies." — IBM Plex Sans Medium 15, ink
  - **Frame** (row gap 12): ⧉ Button Style=Primary "See our work" (176×52) · ⧉ Button Style=Outline "Back to home" (181×54)
- **Summary sidebar** (400×196) — "YOUR ANSWERS" rows without Edit links: "Service" "New website" · "Size" "Standard" · "Timeline" "In 1–3 months"

### State · Send failed (network or server error) — node 25:428 (1440×505)
Annotation: "Nothing the visitor typed is lost. They can retry or use email, with their answers pre-filled."
- **Form card · Send failed** (col gap 28, pad 36/40/40/40, 752×304, w:fill, grow, bg surface, r 32, border line 1)
  - **Progress**: "STEP 4 OF 4" + Back · all 4 segments ink
  - **Error banner (role=alert)** (row gap 14, pad 16/18/16/18, 670×79, w:fill, bg blush, r 18, border coral 1.5)
    - icon alert 22px (coral)
    - **Frame** (col gap 4, w:fill, grow): T "We couldn’t send that just now." — IBM Plex Sans SemiBold 15, ink · T "Your answers are saved. Try again, or email them to us in one tap." — IBM Plex Sans Regular 13/150%, muted
  - **Frame** (row gap 12): ⧉ Button Style=Coral "Try again" (148×52) · ⧉ Button Style=Outline "Email my answers instead" (267×54)
  - (The filled fields stay above the banner in the real page; this state frame shows only the banner area.)
- **Summary sidebar** (400×196) — same rows as the success state



---

# Contact

| | |
|---|---|
| **URL** | `/contact (?topic)` |
| **Figma page** | `29:150` |
| **Desktop frame (1440)** | 29:151 |
| **Mobile frame (390)** | 30:172 |
| **Extra states / boards** | Sent 29:352 · validation 29:365 · email copied 29:376 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Contact is its own page; the old redirect to /start-project is cancelled.
- Contact topics are new copy (open item 9). WhatsApp number is open item 5.
- No-JS: redirect to /thanks?form=contact.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /contact page — node 33:182
PAGE · READ FIRST
/contact: purpose, routing, form and SEO
PURPOSE (CONFIRMED 26 OCT 2026)
•  /contact is its own page again (the earlier redirect to /start-project is cancelled). It covers general questions, existing clients and direct channels.
•  Project enquiries still go to /start-project. Every “Start your project”, “Claim a launch spot” and “Get a fixed quote” link points there; “Get in touch” and “Contact” links point here.
•  Old links that arrive at /contact with ?plan or ?intent are redirected to /start-project with the same parameters.
QUICK MESSAGE FORM
•  Fields: name (required), email (required), topic, message (required), plus the hidden honeypot field.
•  Topics: General question | A new project | Existing project or support | Partnerships | Press | Something else.
•  Choosing “A new project” shows an inline hint card: “For projects, the 4-step form gets you a fixed price faster” with a button to /start-project?ref=contact. Their typed message is not lost if they stay.
•  /contact?topic=support (or any topic slug) preselects the topic; used by links for existing clients.
•  Submits to the same endpoint as /start-project with formType=contact. Email subject to GoodGround: “New message · {Topic} · {Name}”.
•  Auto-reply: same rules as /start-project, subject “We’ve got your message, {First name}”.
•  Same validation, spam rules, sending, success and failure behaviour as /start-project Step 4.
CHANNELS
•  Email: shows hello@goodground.co.za; “Copy” uses the Clipboard API (falls back to selecting the text).
•  WhatsApp: wa.me link with the business number from site settings (number to be supplied). Opens in a new tab or the app.
•  Location: a static map image (no live Google Maps embed, so no third-party requests on load). Clicking it opens Google Maps for George in a new tab.
•  Instagram and Facebook links open in new tabs.
SEO
•  <title>: “Contact GoodGround | Website Development, South Africa” (keep the live title).
•  JSON-LD: ContactPage + LocalBusiness (George, Western Cape, email, sameAs Instagram/Facebook). /start-project switches to a plain WebPage.

### Notes · C 01 Hero — node 33:198
01 · Hero
ENTRANCE
•  Tag FADE-UP → headline LINE MASK (120ms per line) → copy FADE-UP → reply-time pill FADE-UP.
•  The green dot in the reply-time pill has a soft pulse ring (scale 1 → 1.8, opacity 0.4 → 0, 2s loop). Off when motion is off.
MOBILE
•  Same; the pill sits under the copy.

### Notes · C 02 Routes — node 33:208
02 · Choose your route
ENTRANCE
•  Three route cards STAGGER GRID 100ms. The plum “Start a project” card lands first.
INTERACTION
•  Each card is one link (LINKED CARD hover): Start a project → /start-project?ref=contact. Ask a question → smooth-scrolls to the quick message form and focuses the name field. Already working with us? → WhatsApp (new tab).
MOBILE
•  Start a project stays a full plum card; the other two become compact rows with a chevron. Pressed state scale 0.99.

### Notes · C 03 Form + channels — node 33:221
03 · Quick message form + channels
ENTRANCE
•  Form column FADE-UP; channel cards STAGGER GRID 80ms; the map card uses the clip-path reveal (inset 8%).
FORM
•  Field behaviour, errors, sending and success exactly as /start-project Step 4 (see that page’s note 01). The success state replaces the form in place; “Send another message” resets it.
•  Choosing “A new project” as the topic slides the hint card down under the topic field (motion/md).
CHANNELS
•  Hover (desktop): channel card background canvas → blush (motion/sm).
•  Copy: the button label changes to “Copied” with a check for 2s, and a toast “Email address copied” rises from the bottom centre (translateY 16px → 0 + fade, motion/sm), stays 2.5s, then fades. role="status".
•  Map card hover: image scale 1.03 (motion/lg); the location pill lifts 2px.
MOBILE
•  Form full width; channels below as rows. Tapping the email row copies it and shows the toast. WhatsApp opens the app.

### Notes · C 04 Quick answers — node 33:237
04 · Quick answers
BEHAVIOUR
•  Cards STAGGER GRID 80ms. Each is a LINKED CARD to the matching FAQ item: /#faq-payment-options, /#faq-project-length, /work.
MOBILE
•  Rows with chevrons; pressed state background canvas.

## Layer-by-layer spec

### Contact — Desktop (1440) — node 29:151 (1440×2475)
- **Contact — Desktop (1440)** (col, 1440×2475, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "CONTACT" (89×44)
  - **01 · Hero** (col gap 48, pad 64/120/48/120, 1440×534, w:fill, bg canvas)
    - **Frame** (row gap 64, align space_between/max, 1200×422, w:fill)
      - **Frame** (col gap 24, 899×422, w:fill, grow)
        - ⧉ Tag Tone=Coral "GET IN TOUCH" (97×30)
        - T "LET’S BUILD SOMETHING ⏎ THAT LASTS." — Oswald Medium 104/92%, ink
        - T "Every project starts with a conversation, not a contract. Pick the route that fits, and a real person will get back to you." — IBM Plex Sans Regular 18/155%, muted
      - **Reply time pill** (row gap 12, pad 14/22/14/18, align center, 301×50, bg surface, r 999, border line 1)
        - ellipse 10×10 #2FA36B (green status dot, pulse ring)
        - T "We reply within 1–2 business days" — IBM Plex Sans Medium 15, ink
  - **02 · Choose your route** (col gap 24, pad 0/120/56/120, 1440×333, w:fill, bg canvas)
    - **Route cards** (row gap 24, 1200×277, w:fill) — 3 cards (col gap 20, pad 32, align space_between, ~384×277, w:fill, h:fill, grow, r 28):
      - Card header (row, align space_between/center, 319×48): **Frame** (48×48, r 14) → icon 24px · kicker T — Oswald Medium 12 ls 6%
      - **Frame** (col gap 8, w:fill): T "{title}" — IBM Plex Sans SemiBold 28 ls -2% · T "{body}" — IBM Plex Sans Regular 15/155%
      - Button
      - **Start a project** — bg plum · chip bg coral, icon spark · kicker "MOST ENQUIRIES" onDarkMuted · title surface "Start a project" · body onDarkMuted "Four quick questions, about a minute. We’ll come back with a fixed price, split however you’d like to pay it." · ⧉ Button Style=Coral "Start your project" (206×52)
      - **Ask a question** — bg surface, border line 1 · chip bg lilac, icon help · kicker "GENERAL" muted · title ink "Ask a question" · body muted "Not ready for a project yet? Send us a quick message below about anything at all." · ⧉ Button Style=Outline "Write a message" (201×54)
      - **Already working with us?** — bg surface, border line 1 · chip bg lilac, icon user · kicker "EXISTING CLIENTS" · "Already working with us?" · "For changes, support or your Full Service plan, message us directly and we’ll pick it up." · ⧉ Button Style=Outline "WhatsApp us" (179×54)
  - **03 · Message form + channels** (col gap 48, pad 120, 1440×870, w:fill, bg surface)
    - **Frame** (row gap 64, 1200×630, w:fill)
      - **Quick message form** (col gap 24, 696×630, w:fill, grow)
        - ⧉ Tag Tone=Neutral "QUICK MESSAGE" (111×32)
        - T "Send us a quick message" — IBM Plex Sans SemiBold 44/110% ls -2%, ink
        - T "For project enquiries, the 4-step project form gets you a fixed price faster." — IBM Plex Sans Regular 16/150%, muted
        - **Field pattern** (col gap 8): label row (row gap 6) T "{label}" — IBM Plex Sans Medium 14, ink · input (row gap 8, pad 14/16/14/16, align center, h 51, w:fill, bg canvas, r 14, border line 1) T placeholder — IBM Plex Sans Regular 16, muted (filled value = ink)
        - **Row** (row gap 16, 696×77, w:fill): "Your name" / "Full name" (340, w:fill, grow) · "Email" / "name@business.co.za" (340, w:fill, grow)
        - **Field** (696×77): "What’s it about?" / select showing "General question" (ink) + icon chevron 18px
        - **Field** (696×176): "Message" / textarea 696×150 "How can we help?"
        - ⧉ Button Style=Primary "Send message" (185×52)
      - **Channels** (col gap 16, 440×570)
        - **Channel row** (row gap 16, pad 18/16/18/20, align center, 440×80, w:fill, bg canvas, r 20): **Frame** (44×44, bg blush, r 999) → icon 22px · **Frame** (col gap 2, w:fill, grow): T label — IBM Plex Sans Regular 13, muted + T value — IBM Plex Sans SemiBold 16, ink · optional action pill (row gap 6, pad 8/12/8/12, align center, bg surface, r 999, border line 1) icon 14px + T — IBM Plex Sans Medium 13, ink
          - mail · "Email" · "hello@goodground.co.za" · action icon copy "Copy"
          - chat · "WhatsApp" · "Message us directly" · action icon arrow "Open"
          - clock · "Reply time" · "Within 1–2 business days" · no action
        - **Socials** (row gap 12, 440×46): 2 pills (row gap 10, pad 14/16/14/16, align center, 214×46, w:fill, grow, bg canvas, r 16): icon ig 18px "Instagram" · icon fb 18px "Facebook" — IBM Plex Sans Medium 14, ink
        - **Location card · static map (replace)** (col, pad 20, align max (bottom), 440×220, w:fill, bg gradient(#DDE8DF 0%, #C7D9E6 100%) placeholder for the static map image, r 20)
          - **Location pill** (row gap 12, pad 12/16/12/14, align center, 361×58, bg surface, r 16)
            - icon pin 20px
            - **Frame** (col): T "George, Garden Route" — IBM Plex Sans SemiBold 14, ink · T "Western Cape · working with clients across South Africa" — IBM Plex Sans Regular 12, muted
  - **04 · Before you message (quick answers)** (col gap 24, pad 96/120/96/120, 1440×404, w:fill, bg canvas)
    - T "Quick answers" — IBM Plex Sans SemiBold 32 ls -2%, ink
    - **Frame** (row gap 16, 1200×146, w:fill) — 3 LINKED CARDS (col gap 10, pad 24, 389×146, w:fill, h:fill, grow, bg surface, r 20, border line 1):
      - **Card top** (row, align space_between/center, 339×32): T kicker — Oswald Medium 11 ls 6%, coral · **Frame** (32×32, bg canvas, r 999) → icon arrow 16px
      - T question — IBM Plex Sans SemiBold 18 ls -1%, ink · T answer — IBM Plex Sans Regular 14/150%, muted
      - "PRICING" "How do the payment options work?" "One fixed price: 50/50, or 12 monthly instalments." → /#faq-payment-options
      - "TIMELINES" "How long does a project take?" "See typical timelines in our FAQ." → /#faq-project-length
      - "PROOF" "Can I see your work first?" "Every case study has numbers you can check." → /work
  - **05 · Footer** (row, pad 40/48/48/48, align space_between, 1440×227, w:fill, border line 1/0/0/0) — shared desktop footer content; on this page there is no CTA card above it, so it carries a 1px top border.

### Contact — Mobile (390) — node 30:172 (390×2350)
- **Contact — Mobile (390)** (col, 390×2350, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 16, pad 24/20/24/20, 390×380, w:fill)
    - ⧉ Tag Tone=Coral "GET IN TOUCH" (97×30)
    - T "LET’S BUILD ⏎ SOMETHING ⏎ THAT LASTS." — Oswald Medium 60/92%, ink
    - T "Every project starts with a conversation, not a contract." — IBM Plex Sans Regular 16/155%, muted
    - **Reply pill** (row gap 10, pad 10/16/10/14, align center, 237×39, bg surface, r 999, border line 1): ellipse 8×8 #2FA36B · T "Reply within 1–2 business days" — IBM Plex Sans Medium 13, ink
  - **02 · Routes** (col gap 10, pad 8/20/32/20, 390×410, w:fill)
    - **Route · Start a project** (col gap 14, pad 20, 350×202, w:fill, bg plum, r 24)
      - **Frame** (row gap 12, align center, 310×40): **Frame** (40×40, bg coral, r 12) → icon spark 20px · T "Start a project" — IBM Plex Sans SemiBold 22 ls -1%, surface
      - T "Four quick questions. We’ll come back with a fixed price." — IBM Plex Sans Regular 14/150%, onDarkMuted
      - ⧉ Button Style=Coral "Start your project" (310×52, w:fill)
    - **Route rows** (row gap 14, pad 16, align center, 350×74, w:fill, bg surface, r 20, border line 1): **Frame** (40×40, bg lilac, r 12) → icon 20px · **Frame** (col gap 2, w:fill, grow): T title — IBM Plex Sans SemiBold 16 ls -1%, ink + T sub — IBM Plex Sans Regular 13, muted · icon chevron 18px
      - help "Ask a question" "Send a quick message below" · user "Already working with us?" "WhatsApp us for changes or support"
  - **03 · Quick message** (col gap 16, pad 40/20/40/20, 390×662, w:fill, bg surface)
    - ⧉ Tag Tone=Neutral "QUICK MESSAGE" (111×32)
    - T "Send us a quick message" — IBM Plex Sans SemiBold 30/110% ls -2%, ink
    - Fields (col gap 6, w:fill): label IBM Plex Sans Medium 14, ink · input (row, pad 14/16/14/16, align center, 350×51, bg canvas, r 14, border line 1) placeholder IBM Plex Sans Regular 16, muted
      - "Your name" / "Full name" · "Email" / "name@business.co.za" · "What’s it about?" / "General question" (ink) + icon chevron · "Message" / textarea 350×120 "How can we help?"
    - ⧉ Button Style=Primary "Send message" (350×52, w:fill)
  - **04 · Channels** (col gap 10, pad 40/20/24/20, 390×333, w:fill)
    - T "Or reach us directly" — IBM Plex Sans SemiBold 22 ls -1%, ink
    - **Channel rows** (row gap 14, pad 14/16/14/14, align center, 350×70, w:fill, bg surface, r 18, border line 1): **Frame** (40×40, bg blush, r 999) → icon 20px · **Frame** (col, w:fill, grow): T label — IBM Plex Sans Regular 12, muted + T value — IBM Plex Sans SemiBold 15, ink
      - mail "Email · tap to copy" "hello@goodground.co.za" · chat "WhatsApp" "Message us directly" · pin "Based in" "George, Garden Route"
  - **05 · Quick answers** (col gap 10, pad 24/20/40/20, 390×285, w:fill)
    - T "Quick answers" — IBM Plex Sans SemiBold 22 ls -1%, ink
    - **Rows** (row gap 12, pad 16, align center, 350×54, w:fill, bg surface, r 16, border line 1): T — IBM Plex Sans Medium 15, ink · icon chevron 18px
      - "How do the payment options work?" · "How long does a project take?" · "Can I see your work first?"
  - **Footer** (col gap 20, pad 24/24/32/24, 390×202, w:fill, border line 1/0/0/0) — shared mobile footer content with a 1px top border (no CTA card on this page)

### State · Message sent (replaces the form in place) — node 29:352 (760×406)
(The "STATE" kicker and the state title are annotation labels, not part of the UI.)
- **Success panel** (col gap 20, pad 32/40/40/40, bg surface, r 28, border line 1)
  - **Frame** (64×64, bg mint, r 999) → icon check 30px
  - T "Thanks, your message is in." — IBM Plex Sans SemiBold 32 ls -2%, ink
  - T "We’ve sent a copy to your inbox and will reply within 1–2 business days." — IBM Plex Sans Regular 16/155%, muted
  - ⧉ Button Style=Outline "Send another message" (245×54)

### State · Validation error (on blur or submit) — node 29:365 (760×264)
- **Field in error** (col gap 8, 678×103, w:fill)
  - T "Email" — IBM Plex Sans Medium 14, ink
  - **Input** (row, pad 14/16/14/16, align center, 678×52, w:fill, bg blush, r 14, border coral 1.5)
    - T "hello@business" — IBM Plex Sans Regular 16, ink
    - icon alert 18px (coral)
  - T "Add the rest of your email, for example name@business.co.za" — IBM Plex Sans Medium 13, coral

### State · Email copied (toast, bottom centre, 2.5s) — node 29:376 (520×203)
- **Toast (role=status)** (row gap 10, pad 12/20/12/18, align center, 201×42, bg ink, r 999)
  - icon check 16px
  - T "Email address copied" — IBM Plex Sans Medium 14, surface



---

# FAQ

| | |
|---|---|
| **URL** | `/faq` |
| **Figma page** | `67:150` |
| **Desktop frame (1440)** | 67:151 |
| **Mobile frame (390)** | 68:167 |
| **Extra states / boards** | Search results state 67:400 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Answers 02–13 are not written in Figma. Take them from the live FAQ page.
- FAQ 06 "4–6 weeks" conflicts with package timelines (open item 7).
- One answer open at a time.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /faq page — node 72:400
PAGE · READ FIRST
/faq: content, search, topics and motion
CONTENT
•  All 13 questions and answers are the live text; answer 07 is lightly shortened. Questions are grouped into three topics: Payments & pricing (01–04), Website projects (05–08), Ads & growth (09–13).
•  FAQ entries live in one CMS collection (question, answer, topic, order, related link). The homepage, /services, /pricing and article “quick answers” pull from the same collection, so an answer is only ever edited once.
•  Check before launch: answer 06 says most projects take 4–6 weeks, while /pricing shows Micro at ~1 week and Launch at ~2 weeks. Align the wording (for example “1 to 6 weeks depending on the package”).
•  Answer 04 links to the Terms & conditions, which don’t exist yet (see the Legal page).
SEARCH
•  Instant client-side search over questions and answers as you type (debounced 150ms); “/” focuses the field on desktop.
•  Matching words are highlighted in the results; the results replace the topic groups until the field is cleared (× button or Esc).
•  Results line is aria-live (“3 results for ‘deposit’”). No results: the “No questions match… Ask us instead” card with the Ask a question button (state frame below the page).
TOPICS
•  Topic cards in the hero and the sticky topic list both smooth-scroll to their group (120px offset); scroll-spy highlights the current group in the list. Mobile: horizontal topic chips that stick under the header.
ACCORDION
•  One answer open at a time (your confirmed rule); the first is open on load. Same grid-rows animation, keyboard support (Enter/Space, Up/Down, Home/End) and aria attributes as the homepage FAQ.
•  Each question has a permanent anchor (/faq#deposit, /faq#payment-options…). Arriving with a hash opens that answer and scrolls to it. “Copy link” copies that URL and shows the “Link copied” toast.
•  “Helpful? Yes / No” sends an analytics event only (no personal data) and swaps to “Thanks for letting us know”.
•  Related links inside answers (for example “See pricing →”) come from the CMS.
MOTION & SEO
•  Hero: tag, LINE MASK headline, copy and search FADE-UP; topic cards STAGGER GRID. Groups FADE-UP as they enter; items inside stagger 40ms.
•  JSON-LD FAQPage with all 13 questions (answers stay in the DOM when closed). Keep the live title “Frequently Asked Questions | GoodGround”.

> Build note: the answers to questions 02–13 are the live /faq answers (only answer 01 is written out in the design). Copy them from the live site into the FAQ collection.

## Layer-by-layer spec

### FAQ — Desktop (1440) — node 67:151 (1440×3066)
- **FAQ — Desktop (1440)** (col, 1440×3066, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "FAQ" (62×44)
  - **01 · Hero + search** (col gap 24, pad 56/240/40/240, align center, 1440×604, w:fill) — centred, content 960
    - ⧉ Tag Tone=Coral "FAQ" (44×30)
    - T "EVERY QUESTION WE’RE ACTUALLY ASKED." — Oswald Medium 104/92%, ink, centred
    - T "Answered plainly. No chatbot, no call centre, just a straight answer or an honest admission that we haven’t settled something yet." — IBM Plex Sans Regular 18/155%, muted, centred
    - **Search field** (row gap 12, pad 8/8/8/24, align center, 960×60, w:fill, bg surface, r 999, border line 1, shadow 0 12 32 #2E1747@8%)
      - icon search 22px
      - T placeholder "Search 13 questions, e.g. “deposit” or “contract”" — IBM Plex Sans Regular 17, muted (w:fill)
      - **Key hint** (row, pad 6/10/6/10, 26×29, bg canvas, r 8) → T "/" — IBM Plex Sans SemiBold 13, muted
      - **Search button** (row, pad 12/20/12/20, 86×42, bg ink, r 999) → T "Search" — IBM Plex Sans SemiBold 14, surface
    - **Topic cards** (row gap 16, 960×74, w:fill) — 3 cards (row gap 14, pad 16/18/16/18, align center, 309×74, w:fill, grow, bg surface, r 20, border line 1): **Frame** (40×40, r 12) → icon 20px · **Frame** (col, w:fill, grow): T title — IBM Plex Sans SemiBold 16, ink + T count — IBM Plex Sans Regular 13, muted
      - chip bg blush, icon wallet "Payments & pricing" "4 questions" · chip bg lilac, icon code "Website projects" "4 questions" · chip bg mint, icon up "Ads & growth" "5 questions"
  - **02 · Questions (topic nav + groups)** (row gap 64, pad 40/120/96/120, 1440×1639, w:fill)
    - **Topic nav (sticky)** (col gap 4, 280×376)
      - T "TOPICS" — Oswald Medium 12 ls 6%, muted
      - Items (row gap 10, pad 10/14/10/14, align center, 280×40, w:fill, r 12): T label — IBM Plex Sans 15 (w:fill) · T count — IBM Plex Sans SemiBold 13, muted
        - Active "All questions" "13" (bg surface, label SemiBold ink) · "Payments & pricing" "4" · "Website projects" "4" · "Ads & growth" "5" (no bg, label Medium muted)
      - **Still stuck card** (col gap 12, pad 20, 280×178, w:fill, bg plum, r 20)
        - T "Didn’t find your question?" — IBM Plex Sans SemiBold 17, surface
        - T "Ask us. A real person replies within 1–2 business days." — IBM Plex Sans Regular 13/150%, onDarkMuted
        - ⧉ Button Style=Coral "Ask a question" (187×52)
    - **Question groups** (col gap 48, 856×1503, w:fill, grow)
      - **Group header** (row gap 12, pad 0/0/8/0, align center, 856×44): **Frame** (36×36, r 10) → icon 18px (same tint/icon as the topic card) · T "{topic}" — IBM Plex Sans SemiBold 28 ls -1%, ink
      - **FAQ item (open)** (col gap 12, pad 18/18/18/24, 856×255, w:fill, bg surface, r 20, border ink 1.5)
        - **Question row** (row gap 16, align center, w:fill): T "01" — Oswald Medium 14, coral · T question — IBM Plex Sans SemiBold 18 ls -1%, ink (w:fill) · **Frame** (34×34, bg ink, r 999) → icon minus 17px
        - **Answer** (col gap 14, pad 0/0/0/34, w:fill)
          - T "We agree on one fixed price for your project up front. No hourly billing and no scope surprises. From there, you choose how to pay it: a 50% deposit to secure the project and the remaining 50% on completion, before handover, or 12 equal monthly instalments, where the first instalment secures your booking and the remaining 11 become payable once the project is completed. Either way, you always know exactly what you’re paying and when." — IBM Plex Sans Regular 16/165%, muted
          - **Answer tools** (row gap 16, align center, w:fill): **Copy link** (row gap 6) icon link 14px + T "Copy link" — IBM Plex Sans Medium 13, muted · **Helpful** (row gap 8, align center) T "Helpful?" — IBM Plex Sans Regular 13, muted + pills (row, pad 5/12/5/12, bg canvas, r 99) T "Yes" / "No" — IBM Plex Sans Medium 12, ink · **Related link** T "See pricing →" — IBM Plex Sans SemiBold 13, coral
      - **FAQ item (closed)** (col gap 12, pad 18/18/18/24, 856×72, w:fill, bg surface, r 20, border line 1): question row with T "0n" coral + question + **Frame** (34×34, bg canvas, r 999) → icon plus 17px
      - **Group · Payments & pricing** (chip blush, icon wallet): 01 "How do the two payment options work?" (open) · 02 "Is there a deposit before you start?" · 03 "What happens if the project scope changes partway through?" · 04 "What if I need to pause or cancel partway through the project?"
      - **Group · Website projects** (chip lilac, icon code): 05 "Do you only build websites, or do you handle design and SEO too?" · 06 "How long does a typical project take?" · 07 "What happens after my website launches?" · 08 "Do you work with businesses anywhere in South Africa?"
      - **Group · Ads & growth** (chip mint, icon up): 09 "How much should I spend on ads?" · 10 "Do I need a new website to start?" · 11 "What’s the difference between Google Ads and Meta Ads?" · 12 "Is there a long contract?" · 13 "Will I own my ad accounts?"
  - **03 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×716, w:fill)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×466, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 880×274, w:fill, grow): ⧉ Tag Tone=OnDark "GET IN TOUCH" · T "GROWTH STARTS HERE." — Oswald Medium 120/92%, surface
      - **Frame** (col gap 12, 320×116): ⧉ Button Style=Light "Start your project" (320×52, w:fill) · ⧉ Button Style=Coral "hello@goodground.co.za" (320×52, w:fill)
    - **Footer** — desktop footer variant with a **LEGAL** column in place of CONNECT: "LEGAL" → "Legal notice" · "Privacy policy" · "Terms & conditions"; STUDIO here lists About · Work · Insights · FAQ (see the canonical footer in the README)

### FAQ — Mobile (390) — node 68:167 (390×2479)
- **FAQ — Mobile (390)** (col, 390×2479, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero + search** (col gap 14, pad 24/20/24/20, 390×396, w:fill)
    - ⧉ Tag Tone=Coral "FAQ" (44×30)
    - T "EVERY QUESTION WE’RE ACTUALLY ASKED." — Oswald Medium 52/94%, ink
    - T "Answered plainly. No chatbot, no call centre." — IBM Plex Sans Regular 16/155%, muted
    - **Search** (row gap 10, pad 14/18/14/18, align center, 350×51, w:fill, bg surface, r 999, border line 1): icon search 20px · T "Search 13 questions" — IBM Plex Sans Regular 16, muted
    - **Topic chips (scroll, sticky)** (row gap 8, 350×39) — chips (row, pad 10/14/10/14, r 999) T — IBM Plex Sans Medium 13: "All 13" (bg ink, surface) · "Payments 4" · "Projects 4" · "Ads 5" (bg surface, border line 1, ink)
  - **02 · Questions** (col gap 14, pad 8/20/32/20, 390×1469, w:fill)
    - Group titles: T — IBM Plex Sans SemiBold 22 ls -1%, ink ("Payments & pricing", "Website projects", "Ads & growth")
    - **Item (open)** (col gap 10, pad 14/12/14/16, 350×201, w:fill, bg surface, r 16, border ink 1.5): row (row gap 10, align center) T "01" — Oswald Medium 12, coral · T question — IBM Plex Sans SemiBold 15/135%, ink · **Frame** (30×30, bg ink, r 999) icon minus 15px · T "We agree on one fixed price up front. Then you choose: a 50% deposit and 50% on completion, or 12 equal monthly instalments where the first secures your booking and the other 11 start once the project is complete." — IBM Plex Sans Regular 15/160%, muted
    - **Items (closed)** (col gap 10, pad 14/12/14/16, 350×60 (70 when the question wraps), w:fill, bg surface, r 16, border line 1): T "0n" coral · question · **Frame** (30×30, bg canvas, r 999) icon plus 15px — same 13 questions as desktop
    - **Ask card** (col gap 12, pad 20, 350×127, w:fill, bg plum, r 20): T "Didn’t find your question?" — IBM Plex Sans SemiBold 18, surface · ⧉ Button Style=Coral "Ask a question" (310×52, w:fill)
  - **03 · CTA + footer** (col gap 14, pad 12/12/32/12, 390×536, w:fill)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×321, w:fill, bg #3A1A44, r 32): T "GROWTH STARTS HERE." — Oswald Medium 64/92%, surface · ⧉ Button Style=Light "Start your project" (318×52, w:fill)
    - **Footer** — mobile footer with LEGAL column: STUDIO (About · Work · FAQ) · SERVICES (Websites · Full service · SEO) · LEGAL (Notice · Privacy · Terms)

### State · Search results (“deposit”) — node 67:400 (920×565)
- **Search field (active)** (row gap 12, pad 16/16/16/24, align center, 838×57, w:fill, bg surface, r 999, border ink 1.5): icon search 22px · T "deposit" — IBM Plex Sans Regular 17, ink · icon x 18px (clear)
- T "3 results for “deposit”" — IBM Plex Sans SemiBold 15, muted (aria-live)
- **Result** (col gap 6, pad 16/20/16/20, 838×77, w:fill, bg canvas, r 18): T question — IBM Plex Sans SemiBold 16, ink · T snippet with the match highlighted — IBM Plex Sans Regular 14, muted
  - "Is there a deposit before you start?" — "With the deposit option, yes: 50% upfront secures the project…"
  - "How do the two payment options work?" — "…a 50% deposit to secure the project and the remaining 50% on completion…"
  - "What if I need to pause or cancel partway through?" — "…the outstanding balance of that agreed price becomes payable…"
- **No results variant** (row gap 12, pad 16/20/16/20, 838×69, w:fill, bg blush, r 18): **Frame** (36×36, bg surface, r 999) icon chat 18px · **Frame** (col gap 2, w:fill, grow): T "No questions match ‘{query}’. Ask us instead." — IBM Plex Sans SemiBold 14, ink + the Ask a question button (annotation: "Shows instead of the list when nothing matches, with the Ask a question button.")



---

# Legal

| | |
|---|---|
| **URL** | `/legal (#notice, #privacy, #terms)` |
| **Figma page** | `69:150` |
| **Desktop frame (1440)** | Privacy 69:151 · Terms 71:163 |
| **Mobile frame (390)** | 72:190 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- The Legal notice tab is not drawn. Build it in the same document style with the live legal notice text.
- POPIA Information Officer, providers list and Terms wording are open items 1–3. Do not invent legal text.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /legal page — node 72:358
PAGE · READ FIRST
/legal: structure, content and what’s missing
STRUCTURE
•  One page, three documents in tabs: Legal notice (#notice), Privacy policy (#privacy), Terms & conditions (#terms). The tab bar sticks under the header; switching tabs swaps the document (crossfade, motion/md), updates the hash and scrolls to the top of the document.
•  Old links: /legal#terms currently points to the legal notice. After launch #terms opens Terms & conditions, and #notice is the legal notice. Section anchors from the live page (#sec-collection, #sec-rights, #sec-cookies…) keep working.
•  Each document has its own sticky contents list (scroll-spy, coral active bar) and a “Last updated” date taken from the CMS, changed only when the wording changes.
•  Legal notice tab: section 01 from the live page plus the company details card (not drawn separately; same layout as the privacy view).
CONTENT
•  Privacy and legal notice wording is the live text, lightly shortened for readability; meaning unchanged. Have your attorney approve the final wording.
•  “The short version” and the plain-language summaries are new and must match the full text.
•  The Terms & conditions view is a design draft. Its summaries come from what your site already promises (fixed price, payment options, scope changes, cancellation, revisions, monthly services). Sections 1 and 16 (“signed contract wins”, “changes never affect signed contracts”) are suggestions for your attorney. Ownership, warranties/liability and disputes need your attorney.
MISSING TODAY (POPIA)
•  The privacy policy doesn’t name your Information Officer. POPIA expects their name and contact details; the design shows the field in coral until it’s added.
•  The provider table lists only Google today. Add your email/form, hosting and any other providers that process personal data (shown in coral as “to add”).
•  Cookie preferences: the live policy says to clear site data to change your choice. The design adds a real toggle here and a “Cookie settings” footer link that reopens the banner.
INTERACTION
•  Copy (registration number): copies and shows the “Copied” toast.
•  Make a privacy request: opens mailto:hello@goodground.co.za with subject “Privacy request: {type}”; on desktop, choosing a right card first preselects the type.
•  Cookie toggle: on = load GA4 and store consent; off = remove GA cookies and stop loading it. Takes effect immediately with a toast.
•  Download as PDF (Terms): generated from the same content.
•  Motion: calm reading rules from the article template (no paragraph animations; cards FADE-UP 12px).
SEO
•  Keep <title> “Legal Notice & Privacy Policy | GoodGround” (add “& Terms” once terms are live). Pages are indexable but excluded from the sitemap priority list.

## Layer-by-layer spec

### Legal — Desktop (1440) · Privacy policy — node 69:151 (1440×5971)
- **Legal — Desktop (1440) · Privacy policy** (col, 1440×5971, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "LEGAL" (74×44)
  - **01 · Hero + tabs** (col gap 24, pad 56/120/32/120, 1440×494, w:fill)
    - **Tags** (row gap 8): ⧉ Tag Tone=Coral "LEGAL" · ⧉ Tag Tone=Neutral "LAST UPDATED 26 OCT 2026"
    - T "LEGAL NOTICE, PRIVACY & TERMS." — Oswald Medium 104/92%, ink
    - T "GoodGround is committed to transparency, data protection and responsible use of information. Here’s exactly how we work, in plain language first and full detail below." — IBM Plex Sans Regular 18/155%, muted
    - **Document tabs (sticky)** (row gap 4, pad 4, 465×54, bg surface, r 999, border line 1) — tabs (row, pad 12/22/12/22, h 44, r 999) T — IBM Plex Sans SemiBold 15: "Legal notice" · "Privacy policy" (active: bg ink, text surface) · "Terms & conditions"
  - **02 · Body (TOC + document)** (row gap 80, pad 24/240/96/120, 1440×5143, w:fill)
    - **Contents (sticky)** (col gap 2, 280×562)
      - T "ON THIS PAGE" — Oswald Medium 12 ls 6%, muted
      - **Item** (row gap 10, pad 7/0/7/12, align center, 280×32, w:fill, r 10): rectangle 3×16 r2 (line; coral when active) · T "0n" — Oswald Medium 11, muted · T label — IBM Plex Sans 14 (Regular muted; active SemiBold ink with bg surface)
      - Items: 02 Privacy policy · 03 Data collection (active) · 04 How we use your data · 05 Artificial intelligence (AI) · 06 Non-personal data · 07 Recruitment · 08 Data sharing · 09 International transfers · 10 Your rights (POPIA) · 11 Data retention · 12 Data security · 13 Cookies · 14 Third-party links · 15 Minors · 16 Updates · 17 Contact
    - **Document column (720)** (col gap 28, 720×5023, w:fill, grow)
      - T "Who’s responsible for your data" — IBM Plex Sans SemiBold 20 ls -1%, ink
      - **Company details card** (col, pad 8/28/8/28, 720×378, w:fill, bg surface, r 24, border line 1) — rows (row gap 16, pad 14/0/14/0, align center, w:fill; all but last border line 0/0/1/0): T label — Oswald Medium 11 ls 6%, muted · T value — IBM Plex Sans Medium 15, ink
        - "REGISTERED COMPANY NAME" "GoodGround (Pty) Ltd"
        - "TRADING AS" "GoodGround"
        - "REGISTRATION NUMBER" "2024/641034/07" + **Copy pill** (row gap 6, pad 6/12/6/10, align center, bg canvas, r 99) icon copy 14px + T "Copy" — IBM Plex Sans Medium 12, ink
        - "FOUNDED" "2026"
        - "REGISTERED LOCATION" "George, Garden Route, Western Cape, South Africa"
        - "VAT STATUS" "Not VAT registered; all prices are VAT inclusive"
        - "INFORMATION OFFICER (POPIA)" "Name and email to be added" (coral) + ⧉ Tag Tone=Coral "REQUIRED BY POPIA"
      - **The short version** (col gap 16, pad 28, 720×283, w:fill, bg plum, r 28)
        - ⧉ Tag Tone=OnDark "THE SHORT VERSION"
        - 2 rows (row gap 12) of 2 tiles (row gap 12, pad 16, w:fill, h:fill, grow, bg #FFFFFF @8%, r 18): **Frame** (36×36, bg coral, r 10) → icon 18px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, surface + T — IBM Plex Sans Regular 13/145%, onDarkMuted
          - ban "We never sell your data" "Not to anyone, ever." · cookie "Analytics only if you say yes" "Nothing loads until you accept." · spark "AI helps; people decide" "Every AI-assisted output is reviewed by our team." · user "Your data, your rights" "Ask to see, fix or delete it any time."
      - **Section pattern** (col gap 12, pad 16/0/0/0, w:fill): **Heading** (row gap 12, align baseline): T "0n" — Oswald Medium 16, coral · T title — IBM Plex Sans SemiBold 28 ls -1%, ink · then paragraphs T — IBM Plex Sans Regular 17/170%, ink (footnote paragraphs IBM Plex Sans Regular 15/165%, muted)
      - **Chip list card** (col gap 10, pad 18/20/18/20, w:fill, bg surface, r 20, border line 1): T lead — IBM Plex Sans SemiBold 15, ink · **Chips** (row wrap gap 8): chips (row gap 6, pad 7/14/7/12, align center, bg canvas, r 99) icon check 13px + T — IBM Plex Sans Regular 13.5, ink
      - **02 Privacy policy**: "We take your privacy seriously. This section explains how we collect, use, store and protect your personal information in line with applicable laws, including the Protection of Personal Information Act (POPIA)."
      - **03 Data collection**: "We only collect personal data that is necessary to deliver our services and improve your experience."
        - Chip card "You may provide information when you:" — "Submit a contact or project form" · "Request a quote or proposal" · "Subscribe to updates" · "Apply for a job" · "Communicate with us directly"
        - Chip card "Personal data collected may include:" — "Full name" · "Email address" · "Phone number" · "Company or business name" · "Project details and requirements" · "Anything else you choose to share"
        - Footnote (muted): "Providing this information is voluntary. If required information is not provided, we may not be able to deliver certain services."
      - **04 How we use your data**: chip card "We use your data to:" — "Respond to enquiries" · "Deliver services and manage projects" · "Improve our website and services" · "Analyse site performance" · "Send updates or marketing, with your consent" · footnote "We process your data based on legitimate business interests, contractual necessity, or your explicit consent."
      - **05 Artificial intelligence (AI)**: "GoodGround uses AI tools to support how we deliver our services. AI is a productivity tool, not a replacement for human expertise or decision-making."
        - Chip card "AI may assist with:" — "Content and copywriting" · "Design concepts" · "Website development" · "Research and brainstorming" · "Workflow automation" · "Administrative support"
        - **Callout · human review** (row gap 12, pad 16/18/16/18, 720×98, w:fill, bg mint, r 18): **Frame** (32×32, bg surface, r 999) icon check 16px · T "All AI-assisted work is reviewed, edited and approved by a member of the GoodGround team before it’s delivered or published. We don’t intentionally use confidential client information to train public AI models." — IBM Plex Sans Medium 14/155%, ink
      - **06 Non-personal data collection**: "We may automatically collect non-identifiable data to improve performance and find technical issues. It does not personally identify you." · chip card "This may include:" — "IP address" · "Browser type and device" · "Pages visited and time spent" · "Referral sources"
      - **07 Recruitment and candidate data**: "If you apply for a role, we use your data to review your application, assess your experience, manage hiring and consider you for future roles. We keep it for up to 24 months unless you ask us to delete it sooner, and you can request access, correction or deletion at any time."
      - **08 Data sharing and third parties**: "We do not sell, rent or trade your personal information. We share data only with trusted providers we need to run the business, and where the law requires it or to prevent fraud or security threats."
        - **Provider table** (col, 720×197, w:fill, bg surface, r 18, border line 1)
          - Header (row, bg canvas, 42 tall): 3 equal cells (pad 13/14/13/18) T — Oswald Medium 11 ls 6%, muted: "PROVIDER" · "PURPOSE" · "WHEN"
          - Rows (row, border line 1/0/0/0): col 1 IBM Plex Sans SemiBold 14 · cols 2–3 IBM Plex Sans Regular 14, ink
            - "Google (Analytics 4)" · "Analytics and performance" · "Only after you accept cookies"
            - "Email and form provider (to add)" (coral) · "Receiving and replying to enquiries" · "When you contact us"
            - "Hosting provider (to add)" (coral) · "Running this website" · "Every visit"
      - **09 International data transfers**: "As we work with global tools, your data may be processed outside South Africa. When it is, we make sure appropriate safeguards are in place and that it’s handled in line with applicable data protection laws."
      - **10 Your rights under POPIA**: "You can exercise any of these rights by emailing us. We’ll respond within a reasonable time, and you can also complain to the Information Regulator of South Africa."
        - **Rights grid** (col gap 12) — 3 rows of 2 cards (row gap 12, pad 16, w:fill, h:fill, grow, bg surface, r 18, border line 1): **Frame** (36×36, bg lilac, r 10) → icon 18px · T — IBM Plex Sans SemiBold 15, ink + T — IBM Plex Sans Regular 13/145%, muted
          - eye "Access" "See the personal data we hold about you" · edit "Correct" "Fix or update inaccurate data" · trash "Delete" "Ask us to delete your data" · pause "Object or restrict" "Limit how we process it" · undo "Withdraw consent" "At any time, for anything you consented to" · download "Transfer" "Get your data in a usable format"
        - **Frame** (row gap 12, align center): ⧉ Button Style=Primary "Make a privacy request" (245×52) · T "Opens an email to hello@goodground.co.za with the request type filled in." — IBM Plex Sans Regular 13, muted
      - **11 Data retention**: "We keep personal data only as long as we need it, depending on why it was collected, legal and regulatory requirements, and business needs. When it’s no longer needed, it’s securely deleted or anonymised."
      - **12 Data security**: "We take reasonable technical and organisational steps to protect your data: secure hosting, restricted access, encrypted connections and regular monitoring. No online system is completely secure, so you share information at your own risk."
      - **13 Cookies and tracking technologies**: "We use Google Analytics 4 to understand which pages visitors find useful. Its cookies only load if you accept them. Decline, and the analytics script is never loaded. The rest of the site works exactly the same either way. We don’t use advertising or cross-site tracking cookies."
        - **Cookie settings card** (row gap 16, pad 16/16/16/20, align center, 720×74, w:fill, bg surface, r 20, border line 1): **Frame** (40×40, bg blush, r 999) icon cookie 20px · **Frame** (col gap 2, w:fill, grow): T "Your current choice" — IBM Plex Sans Regular 13, muted + T "Analytics cookies: Off" — IBM Plex Sans SemiBold 16, ink · **Toggle switch** 48 wide (off state)
        - T "Change your choice here at any time; it takes effect immediately." — IBM Plex Sans Regular 14, muted
      - **14 Third-party links**: "Our website may link to other websites. We don’t control them and aren’t responsible for their content or policies, so please read their privacy policies before sharing personal data."
      - **15 Minors**: "Our services aren’t intended for anyone under 16. We don’t knowingly collect personal data from minors without a parent’s or guardian’s consent, and we remove it promptly if we find any."
      - **16 Updates to this policy**: "We may update this legal notice and privacy policy from time to time. Changes are published on this page with a new “Last updated” date."
      - **17 Contact**
        - **Contact card** (row gap 16, pad 20/16/20/24, align center, 720×92, w:fill, bg plum, r 24): **Frame** (44×44, bg coral, r 999) icon mail 22px · **Frame** (col gap 2, w:fill, grow): T "Questions about this policy or your data?" — IBM Plex Sans SemiBold 17, surface + T "hello@goodground.co.za" — IBM Plex Sans Medium 15, peach · ⧉ Button Style=Light "Get in touch" (169×52)
  - **03 · Footer** (row, pad 40/48/48/48, align space_between, 1440×227, w:fill, bg surface, border line 1/0/0/0) — desktop footer with LEGAL column: "Legal notice" · "Privacy policy" · "Terms & conditions" · "Cookie settings" (reopens the cookie banner)

### Legal — Desktop (1440) · Terms & conditions (draft structure) — node 71:163 (1440×4705)
- **Legal — Terms & conditions** (col, 1440×4705, bg canvas)
  - **00 · Site header** — same as the privacy view
  - **01 · Hero + tabs** (col gap 24, pad 56/120/32/120, 1440×517)
    - Tags · title "LEGAL NOTICE, PRIVACY & TERMS." (no intro paragraph in this view)
    - **Document tabs**: "Terms & conditions" active (bg ink, text surface)
    - **Draft banner (design file only — does NOT ship)** (row gap 12, pad 16/20/16/20, 1200×79, w:fill, bg blush, r 18, border coral 1.5): icon alert 20px · T "DESIGN DRAFT: GoodGround has no Terms & Conditions page yet. The section structure and plain-language summaries below come from what your site already promises. The full legal wording must come from your attorney before launch. This banner does not ship." — IBM Plex Sans Medium 14/155%, ink
  - **02 · Body (TOC + terms)** (row gap 80, pad 24/240/96/120, 1440×3854, w:fill)
    - **Contents (sticky)** (col gap 2, 280×634) — same item pattern as the privacy TOC (items can wrap to 50 tall)
      - 01 About these terms (active) · 02 Quotes and fixed prices · 03 Payment options · 04 Scope changes · 05 Pausing and cancelling a project · 06 Your responsibilities · 07 Revisions · 08 Timelines · 09 Ownership and intellectual property · 10 Hosting, domains and third-party services · 11 Monthly services · 12 AI-assisted work · 13 Warranties and liability · 14 Confidentiality and personal information · 15 Disputes and governing law · 16 Changes to these terms
      - **Download** (row gap 8, pad 16/0/0/12, align center): icon download 16px · T "Download as PDF" — IBM Plex Sans Medium 14, ink
    - **Terms column (720)** (col gap 24, 720×3734, w:fill, grow)
      - **Term pattern** (col gap 12, pad 12/0/0/0, w:fill)
        - **Heading** (row gap 12, align baseline): T "0n" — Oswald Medium 16, coral · T title — IBM Plex Sans SemiBold 26 ls -1%, ink
        - **In plain language** (row gap 12, pad 14/16/14/16, w:fill, bg mint, r 16): icon info 18px · **Frame** (col gap 2, w:fill, grow): T "IN PLAIN LANGUAGE" — Oswald Medium 10 ls 6%, muted + T summary — IBM Plex Sans Medium 14.5/155%, ink
        - **Full wording (placeholder)** (col gap 8, 720×46): 3 grey bars (rectangles 700/644/420 × 10, line, r99) — replaced by the attorney's text
      - 01 About these terms — "These terms apply to every project and monthly service we provide. Your signed quote and contract sit alongside them; if they ever disagree, your signed contract wins."
      - 02 Quotes and fixed prices — "Every website project gets one fixed price before work begins. Package prices are starting points; your quote confirms the real number, and it doesn’t change once you accept it."
      - 03 Payment options — "Pay a 50% deposit and 50% on completion, before handover; or 12 equal monthly instalments, where the first books your slot and the other 11 start once the project is completed. The total is the same either way."
      - 04 Scope changes — (continues in the next chunk)

      - 04 Scope changes — "We tell you before any change affects the price. Extra scope is quoted separately; we never adjust what you’ve already agreed to pay."
      - 05 Pausing and cancelling a project — "The project price is fixed. If you cancel partway through, the outstanding balance of the agreed price becomes payable, whichever payment option you chose."
      - 06 Your responsibilities — "Supplying content, feedback and approvals on time, giving us the access we need, and making sure you have the right to use what you give us."
      - 07 Revisions — "Each package includes set revision rounds (Micro and Launch: 1, Grow: 2, Scale: 3). Extra rounds are R1,500 each."
      - 08 Timelines — "Timelines are estimates agreed at kick-off. Delays in content, feedback or access move the timeline, not the price."
      - 09 Ownership and intellectual property — **attorney-needed variant** (summary box bg blush, kicker coral): "Who owns the site, code, designs and content, and when ownership passes (for example on final payment). Needs your decision."
      - 10 Hosting, domains and third-party services — "Hosting, domains and email are arranged separately unless you’re on Full Service or the Website Launch Offer. Third-party tools are governed by their own terms."
      - 11 Monthly services — "Full Service: month to month, cancel any time. Care Plans and ad management: 30 days’ notice. Ad budgets are paid to Google or Meta and your ad accounts always belong to you."
      - 12 AI-assisted work — "We use AI tools to work faster; a person on our team reviews and approves everything before it reaches you."
      - 13 Warranties and liability — attorney-needed (blush): "What we guarantee, and the limits of our liability. Wording from your attorney."
      - 14 Confidentiality and personal information — "We keep your business information confidential and handle personal information as described in our Privacy policy."
      - 15 Disputes and governing law — attorney-needed (blush): "South African law applies. How disagreements are resolved. Wording from your attorney."
      - 16 Changes to these terms — "We may update these terms; changes apply to new quotes, never to a contract you’ve already signed."
      - **Questions card** (row gap 16, pad 20/16/20/24, align center, 720×92, w:fill, bg plum, r 24): **Frame** (col gap 2, w:fill, grow): T "Questions about these terms?" — IBM Plex Sans SemiBold 17, surface + T "Ask before you sign. We’ll explain anything in plain language." — IBM Plex Sans Regular 14, onDarkMuted · ⧉ Button Style=Light "Get in touch" (169×52)
  - **03 · Footer** — same LEGAL-column footer as the privacy view

### Legal — Mobile (390) · Privacy policy — node 72:190 (390×2136)
- **Legal — Mobile** (col, 390×2136, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 14, pad 24/20/24/20, 390×318, w:fill)
    - **Tags** (row gap 6): ⧉ Tag Tone=Coral "LEGAL" · ⧉ Tag Tone=Neutral "UPDATED 26 OCT 2026"
    - T "LEGAL NOTICE, PRIVACY & TERMS." — Oswald Medium 48/94%, ink
    - **Document tabs** (row gap 4, pad 4, 350×48, w:fill, bg surface, r 999, border line 1) — 3 equal tabs (row, pad 10/0/10/0, align center, w:fill, grow, r 999) T — IBM Plex Sans SemiBold 14: "Notice" · "Privacy" (active bg ink, surface) · "Terms"
    - **On this page (sticky)** (row gap 10, pad 12/14/12/16, align center, 350×58, w:fill, bg surface, r 999, border line 1): icon list 18px · **Frame** (col, w:fill, grow): T "On this page · 3 of 16" — IBM Plex Sans Regular 11, muted + T "Data collection" — IBM Plex Sans SemiBold 14, ink · icon chevron 18px (opens a bottom sheet of sections)
  - **02 · Document** (col gap 20, pad 8/20/40/20, 390×1513, w:fill)
    - **The short version** (col gap 10, pad 18, 350×202, w:fill, bg plum, r 22): ⧉ Tag Tone=OnDark "THE SHORT VERSION" · rows (row gap 10, align center): **Frame** (24×24, bg coral, r 999) icon check 12px + T — IBM Plex Sans Medium 14, surface — "We never sell your data" · "Analytics only if you say yes" · "AI helps; people decide" · "Your data, your rights"
    - **Company details (compact)** (col, pad 0/16/0/16, 350×187, w:fill, bg surface, r 18, border line 1) — rows (col gap 2, pad 12/0/12/0, w:fill; border bottom except last): T label — Oswald Medium 10 ls 6%, muted · T value — IBM Plex Sans Medium 15, ink
      - "COMPANY" "GoodGround (Pty) Ltd" · "REG. NUMBER" "2024/641034/07" · "INFORMATION OFFICER" "To be added" (coral)
    - **Section (mobile)** (col gap 8, w:fill): **Heading** (row gap 10, align baseline): T "0n" — Oswald Medium 14, coral · T title — IBM Plex Sans SemiBold 22 ls -1%, ink · paragraph IBM Plex Sans Regular 16/170%, ink
      - 02 "Privacy policy" — "We explain how we collect, use, store and protect your personal information under POPIA."
      - 03 "Data collection" — "We only collect what we need to deliver our services." + chips (row wrap gap 6; chip row gap 6, pad 6/12/6/10, bg surface, r 99; icon check 12px + T IBM Plex Sans Regular 13, ink): "Full name" · "Email" · "Phone" · "Business name" · "Project details"
      - 10 "Your rights under POPIA" — rows (row gap 10, pad 12/12/12/14, align center, 350×44, w:fill, bg surface, r 14, border line 1): T — IBM Plex Sans Medium 14, ink + icon chevron 16px: "Access your data" · "Correct it" · "Delete it" · "Object or restrict" · "Withdraw consent" · "Transfer it" · then ⧉ Button Style=Primary "Make a privacy request" (350×52, w:fill)
      - 13 "Cookies" — **Cookie row** (row gap 12, pad 14, align center, 350×66, w:fill, bg surface, r 16, border line 1): **Frame** (36×36, bg blush, r 999) icon cookie 18px · **Frame** (col, w:fill, grow): T "Analytics cookies" — IBM Plex Sans Regular 12, muted + T "Off" — IBM Plex Sans SemiBold 15, ink · toggle switch 48 wide
      - Annotation: "…sections 04–09, 11, 12 and 14–17 follow the same pattern."
    - **Contact card** (col gap 12, pad 18, 350×144, w:fill, bg plum, r 22): T "Questions about this policy or your data?" — IBM Plex Sans SemiBold 17, surface · ⧉ Button Style=Light "Get in touch" (314×52, w:fill)
  - **Footer** (col gap 20, pad 24/24/32/24, 390×227, w:fill, bg surface) — mobile footer with LEGAL column: STUDIO (About · Work · FAQ) · SERVICES (Websites · Full service · SEO) · LEGAL (Notice · Privacy · Terms · Cookies)

> The Legal notice tab (#notice) is not drawn as its own frame: build it with the same hero, tabs, sticky contents and document column — section 01 (the live legal-notice text) followed by the Company details card.



---

# Client onboarding (new, private)

| | |
|---|---|
| **URL** | `/onboarding (private link, noindex)` |
| **Figma page** | `56:150` |
| **Desktop frame (1440)** | Welcome 57:150 · steps 57:342, 64:892, 64:1208, 58:345, 64:1491, 65:1396, 58:689, 65:1672, 65:2157, 66:2000, 66:2282, 66:2547 · Review 59:684 · Sent 59:975 |
| **Mobile frame (390)** | 60:757, 60:823, 60:950 |
| **Extra states / boards** | Steps sheet 60:1068 · form components 56:151 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Largest piece. Needs the storage, retention and recipient decisions first (open item 8).
- The full field inventory for all 13 steps is in this file.
- The Sent screen says "within one working day" on purpose; flag it to the user.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · Onboarding page — node 62:892
FLOW · READ FIRST
Client onboarding: how it works end to end
PURPOSE
•  A private, multi-step brief sent to a client as soon as they accept their quote. It collects everything needed to design and build the site: people, business, offer, goals, customers, brand, content, features, access, legal.
•  Based on the onboarding document you supplied, rebranded for GoodGround and turned from a download-and-email pack into a hosted form that saves as you go.
ACCESS
•  After quote acceptance, the client gets an email with a private link: /onboarding/{token}. The token is long, random and unguessable; the page is noindex and never linked from the site.
•  Opening the link on a new device asks for a 6-digit code sent to the client’s email (no passwords to create).
•  Prefilled from the quote: client name, email, business name, accepted package and add-ons, payment option. Shown read-only on the Welcome screen and Step 4.
•  The link stays editable until the kick-off call, then turns read-only (“changes go through your project lead”).
SAVING & SENDING
•  Every answer autosaves to the server; files upload straight to storage. There is no download-and-email step.
•  Clients can send with gaps; required answers that are missing are listed on Review and marked on the stepper.
•  On send: GoodGround gets an email with a link to the brief in the admin view plus a generated PDF; the client gets a confirmation email with the same PDF (same auto-reply rules as /start-project).
•  “Download a PDF copy” is available on Review and after sending.
PRIVACY (POPIA)
•  Answers and files are stored with access limited to the GoodGround project team. Retention: kept for the life of the project plus an agreed period, then deleted on request. Confirm the storage region and retention period before build.
•  The Review consents (accuracy, rights to materials, use for delivery) are required to send. Link to a short privacy note.
•  Never collect passwords: the form says so on every step, and access requests happen through a separate secure process.
CHANGES FROM THE SOURCE DOCUMENT
•  “Grow Brand” wording replaced by GoodGround everywhere (consents, “who writes the text”, “who updates after launch”).
•  “What are you working with us on?” uses GoodGround’s services and is pre-ticked from the quote.
•  “Package or budget agreed” is replaced by the read-only quote card.
•  “Continue from a saved file” and “Your pack is ready” are replaced by autosave and online sending.
NEEDS YOUR DECISION
•  Storage region and how long briefs and files are kept.
•  Whether “Online shop” and “Client login area” stay as feature options (your pricing page says no e-commerce or member-portal builds).
•  Who on your team receives the “brief received” email.

### Notes · Onboarding motion & interaction — node 62:914
MOTION & INTERACTION
Behaviour of the form (all steps)
LAYOUT
•  Desktop: sticky sidebar stepper (top 24px), step card, sticky help rail; the footer bar sticks to the bottom of the viewport. Mobile: sticky step header (opens the steps sheet), sticky footer with Back and Save and continue.
•  Every step can be opened from the stepper in any order. Step states: Done, Current, Upcoming, Attention (visited, required answers missing).
AUTOSAVE
•  Saves 800ms after the last keystroke, and immediately on choice changes and uploads. Status in the top bar: “Saving…” (spinner) → “Saved just now” → “Saved 3 min ago”.
•  Offline: “Offline: saved on this device”, kept in IndexedDB and synced when back online. Conflicts (two devices): last write wins per field, with a toast “Updated from another device”.
STEPS
•  Save and continue: saves, marks the step Done (or Attention if required answers are missing), then moves on. It never blocks; Review is the only place sending is blocked by missing consents.
•  Transition: outgoing step fades and slides 24px left, incoming fades in from 24px right (motion/md); Back reverses. Scroll to top of the card; focus moves to the step title and an aria-live region announces “Step 7 of 13: Your brand”.
•  Sidebar progress bar and the done count animate (scaleX, motion/md). The Done check pops in (ease/back).
•  “Skip for now” moves on without marking anything; “Save & finish later” shows a sheet confirming the link has been emailed.
FIELDS
•  Labels above fields; “Optional” on non-required fields only. Errors only on blur or Save (format errors such as email, URL, phone), shown as the Error variant with a specific message.
•  Conditional questions slide open under their trigger (height + fade, motion/md) and close the same way. Answers in hidden questions are kept while editing, but not sent.
•  Radio cards and check chips: selected state animates fill and check (motion/sm). Radio groups use arrow keys; chips are toggle buttons.
•  Repeat groups: “Add another …” inserts a new block that slides in and focuses its first field; “Remove” deletes it with an “Undo” toast for 5 seconds.
•  Dates use the native date picker. URLs auto-add https:// on blur. Phone numbers accept local or +27 formats.
UPLOADS
•  Drag and drop or browse (desktop); “Choose files” and “Take a photo” (mobile). Multiple files at once; up to 50 MB per file, 2 GB per brief. Resumable uploads so a dropped connection doesn’t restart large files.
•  Each file shows a File row: Uploading (progress bar), Done (check, image thumbnail where possible), Error (reason + retry). Unsupported types (for example HEIC) explain how to fix them.
•  Very large photo collections can be shared as a Google Drive, Dropbox or WeTransfer link instead (Step 8).
REVIEW
•  Completion ring = answered required questions ÷ total required questions. Missing required answers are listed with “Answer now”, which opens the step and focuses the field.
•  “Send my brief” is disabled until all three consents are ticked and the name is typed; it shows “Sending…”, then the success screen (check draws in, motion/lg).

### Field inventory (the complete list of questions per step) — nodes 63:892–63:954
Key: * required · [type] · {options} · → shown only when

#### 01 · You & your team
•  Your full name* [text] (prefilled)
•  Your role in the business [text]
•  Email address* [email] (prefilled)
•  Mobile number* [tel]
•  Best way to reach you [radio] {Email · Phone call · WhatsApp}
•  Best days and times to reach you [text]
•  Are you the person who gives final approval?* [radio] {Yes · No}
•  Final approver’s name* [text] → approval = No
•  Their role [text] → approval = No
•  Their email* [email] → approval = No
•  Who else will give feedback? [repeat: Name, Role, Email]
•  Dates you or your approver will be unavailable [textarea]

#### 02 · Business details
•  Registered business name* [text] (prefilled)
•  Trading name, if different [text]
•  Type of business* [select] {Private company (Pty) Ltd · Sole proprietor · Close corporation (CC) · Partnership · Non-profit company (NPC) or NPO · Trust · Other}
•  Registration number [text] → type is not Sole proprietor or Partnership
•  VAT number [text]
•  Directors or office bearers [textarea] → type is Pty Ltd, CC, NPC/NPO or Trust
•  Physical business address* [textarea]
•  Postal address, if different [textarea]
•  Where should your address appear? [radio] {On the contact page and in the footer · Suburb and city on the contact page; full address on the legal page only · Home-based or mobile: legal page only}
•  Business phone · WhatsApp number · Business email for the website [tel/tel/email]
•  Trading hours · Areas you serve [textarea]
•  Year started · Number of people [text]
•  Industry bodies, associations or accreditations [textarea]
•  Google Business Profile · Facebook · Instagram · LinkedIn · TikTok · YouTube [url each]
•  Other profiles or directory listings [textarea]

#### 03 · What you do
•  What do you do and for whom? (1–2 sentences)* [textarea]
•  Your story [textarea]
•  What makes you different?* [textarea]
•  Your services or products* [repeat: Name*, What’s included, Who it’s for, Price or from price, Importance {Most important · Important · Less important}]
•  If visitors remember only three things, what should they be? [textarea]
•  Awards, certifications and qualifications [repeat: What it is, Year, OK to show? {Yes · No}]
•  Numbers you’re proud of, that you can back up [textarea]
•  Guarantees, warranties or promises [textarea]
•  Well-known clients or partners we may name [textarea]

#### 04 · Goals
•  From your accepted quote [read-only card: package, price, payment option, add-ons]
•  What are you working with us on?* [checks, pre-ticked from quote] {A new website · A redesign · Full Service · A monthly Care Plan · SEO and content · Google Ads · Meta Ads · A new brand · A brand refresh · Not sure yet}
•  What must the website achieve?* [checks] {Get more enquiries · Get bookings or appointments · Sell products online · Build credibility and trust · Show our work · Inform and educate · Recruit staff · Support existing customers}
•  The ONE action you most want a visitor to take* [radio] {Call us · WhatsApp us · Fill in a contact form · Request a quote · Book online · Buy online · Visit our premises · Sign up or subscribe}
•  Other actions that also matter [checks] {same 8 + Follow us on social media}
•  In 12 months, how will you know it’s working? [textarea]
•  Monthly enquiries or sales from the internet now [text]
•  How do customers find you today? [checks] {Google search · Google Maps · Word of mouth and referrals · Facebook · Instagram · TikTok · LinkedIn · Online directories · Signage and walk-ins · Advertising}
•  Ideal launch date [date]
•  How fixed is that date? [radio] {Fixed: there’s an event or launch · Preferred · Flexible}
•  What’s happening on that date? [text] → Fixed

#### 05 · Your customers
•  Your main types of customer* [repeat: Who are they?*, What they need, What worries them, What makes them decide, Where they are (area, age, online habits)]
•  Languages your customers speak [checks] {English · Afrikaans · isiZulu · isiXhosa · Sesotho · Setswana}
•  Should the website be in more than one language? [radio] {English only · English plus another language · Not sure} (note: extra languages are a R5,000 add-on each)
•  Questions customers always ask [repeat: Question, Your answer]

#### 06 · Competitors & inspiration
•  Your main competitors [repeat: Name, Website, What they do well online, Where they’re weak]
•  Websites you like [repeat: Website, What exactly you like]
•  Websites you don’t like [repeat: Website, What you don’t like]
•  How should your website feel? [checks] {Professional · Friendly · Bold · Calm · Premium · Playful · Modern · Classic · Warm · Minimal · Energetic · Trustworthy · Natural and earthy · Technical and expert}
•  How should it definitely NOT feel? [textarea]

#### 07 · Your brand
•  Where is your brand at?* [radio] {Complete brand · Logo only · New brand (part of our project) · Brand refresh}
•  Upload your logo files* [files]
•  Brand guide or style guide [files] → Complete brand or Brand refresh
•  Brand colours [repeat: Colour (picker + hex), Name, Used for {Main colour · Second colour · Accent · Background · Text · Other}]
•  Heading font · Body font [text]
•  Where do your fonts come from? [radio] {Google Fonts (free) · Adobe Fonts · We bought a licence · Don’t know}
•  Font files [files] → We bought a licence
•  Tagline or slogan [text]
•  Brand rules, or things never to do [textarea]
•  Is your business name final? [radio] {Yes · No, we’d like help with naming} → New brand
•  Story or meaning behind the name · Ideas or symbols for the logo · Colours you love · Colours to avoid [text/textarea] → New brand or Brand refresh
•  Logos or brands you admire [repeat: Brand name or link, What you like] → New brand or Brand refresh
•  Where must your logo work? [checks] {Website · Social profile picture · Signage · Vehicle branding · Uniforms and embroidery · Packaging and labels · Business cards and stationery · Merchandise} → New brand or Brand refresh

#### 08 · Pages & content
•  Your current website [url]
•  What should we keep? · What should we change or remove? [textarea] → current website filled
•  Which pages do you think you need? [checks] {Home · About us · Services (one page) · Services (a page each) · Products · Portfolio or gallery · Testimonials and reviews · Team · Pricing · FAQ · Blog or news · Contact · Bookings · Careers · Locations or branches} (show the page allowance of their package next to the count)
•  Anything specific about any page? [textarea]
•  Who will write the website text?* [radio] {GoodGround writes it from this brief · I’ll supply the text · A mix} (GoodGround writing beyond the package is the R1,200/page copywriting add-on)
•  Existing text to reuse [files]
•  Photos for the website* [radio] {We have professional photos · Some photos (phone or amateur) · We need stock photos · We’d like to book a photographer · Not sure}
•  Photos of team, premises, work, products [files]
•  Big photo or video collection link [url]
•  Video links to feature [textarea]
•  Testimonials [repeat: What they said*, Their name*, Role/company/town, Agreed to be quoted?* {Yes · Not yet}]
•  Link to your Google or other reviews [url]
•  Projects or case studies [repeat: Project name, Client (if agreed), What you did and the result, Link, Photos]
•  Team members [repeat: Name, Role, Short bio, Photos]
•  Files visitors can download (price lists, menus, brochures) [files]

#### 09 · Features & tools
•  Which email address(es) should enquiries go to?* [text]
•  Which of these do you need? [checks] {Contact form · Click-to-call · WhatsApp button · Online booking · Quote request form · Newsletter sign-up · Google Map · Show our Google reviews · Instagram or social feed · Blog · Online payments · Online shop · Live chat · Client login area · Job applications · Multiple languages} (items not in the quote show “May change your quote”)
•  Booking system you use or prefer [text] → Online booking
•  Newsletter tool [text] → Newsletter sign-up
•  Payment provider [text] → Online payments or Online shop
•  Do you use a CRM? [text]
•  Already set up? [checks] {Google Analytics · Search Console · Tag Manager · Google Business Profile · Meta Pixel · Don’t know}
•  What would you type into Google to find a business like yours? [textarea]
•  Towns, suburbs or regions to target [textarea]
•  Anything else the website must do? [textarea]

#### 10 · Domain, hosting & access
•  Your domain name(s)* [text]
•  Where is your domain registered? [select] {Domains.co.za · Afrihost · Xneelo · Hetzner · GoDaddy · Hostinger · 1-grid · Register Domain SA · Cloudflare · Google or Squarespace Domains · Other · Don’t know}
•  Who can log in to manage your domain?* [radio] {Me or someone in my business · Our previous web developer · Our IT company · I don’t know}
•  Where is your current website hosted? [select] {Xneelo · Afrihost · Hetzner · Domains.co.za · Hostinger · GoDaddy · SiteGround · Wix/Squarespace/Shopify · Other · No website yet · Don’t know}
•  What is it built with? [select] {WordPress · Wix · Squarespace · Shopify · Webflow · Custom-built · No website yet · Don’t know}
•  Who provides your business email?* [select] {Google Workspace · Microsoft 365 · Email from our web host · Personal Gmail/Outlook.com · Other · Don’t know}
•  Previous developer’s contact details [textarea]
•  Who will update the website after launch?* [radio] {Me · Someone on my team · GoodGround (Care Plan or Full Service) · It will rarely need updating}
•  How comfortable is that person? [radio] {Very comfortable · Some experience · Beginner} → Me or Someone on my team
•  Which of these can you give us access to? [checks] {Domain/DNS · Hosting account · Current website admin · Google Business Profile · Search Console · Google Analytics · Facebook and Instagram business accounts · I’ll need help with all of this} → triggers the secure access request after sending

#### 11 · Legal & privacy
•  Your Information Officer under POPIA: name and email* [text]
•  Registered with the Information Regulator? [radio] {Yes · No · Don’t know}
•  Existing privacy policy, terms or disclaimers [files] · or a link [url]
•  What personal information will your forms collect? [textarea]
•  Will you sell or take payment online? [radio] {Yes · No · Maybe later}
•  Returns, refunds and cancellation policy* [textarea] → sells online = Yes
•  Delivery areas, time frames and costs [textarea] → sells online = Yes
•  Booking cancellation policy [textarea] → features include Online booking
•  Is your industry regulated? [checks] {Financial services (FSCA/FAIS) · Health (HPCSA or another council) · Legal (LPC) · Property (PPRA) · Alcohol or gambling · Education · No, or not sure}
•  Disclaimers your regulator requires [textarea] → any regulated industry ticked
•  Is the website aimed at children (under 18)? [radio] {No · Yes}
•  Do you send marketing emails or SMSes? [radio] {Yes, only to people who opted in · Yes · Not yet}

#### 12 · Anything else
•  Important dates during the project [textarea]
•  Anything you’re worried about? [textarea]
•  What went well or badly with past websites or agencies? [textarea]
•  Anything else we should know? [textarea]
•  Any other files [files]

#### 13 · Review & send
•  Completion overview, missing required answers, section list with Edit links
•  Consent*: “The information in this brief is accurate to the best of my knowledge.” [checkbox]
•  Consent*: “I have the right to use the logos, photos and text I’ve provided, or I’ve noted where I’m unsure.” [checkbox]
•  Consent*: “I agree that GoodGround may use this information to deliver my project, as described in the privacy note.” [checkbox]
•  Your name, to confirm* [text]
•  Send my brief · Download a PDF copy

## Layer-by-layer spec

> Board layout in Figma: row 1 "DESKTOP · WELCOME, STEPS 1, 4, 7, REVIEW, SENT"; row 2 "MOBILE · WELCOME, STEP 7, REVIEW, STEPS SHEET"; row 3 "DESKTOP · STEPS 2, 3, 5, 6, 8, 9, 10, 11, 12". The form components (Form/Field, Form/Radio card, Form/Check chip, Form/File row, Form/Step item) are specified in the Components file.

### Shared desktop shell (every desktop onboarding screen)
- **Screen** (col, 1440 wide, bg canvas)
  - **Top bar** (row gap 16, pad 18/32/18/32, align center, 1440×91, w:fill, bg surface, border line 0/0/1/0)
    - **Logo pill** (row, pad 8/16/8/16, 138×42, bg ink, r 999) → T "goodground" — IBM Plex Sans SemiBold 20 ls -3%, surface
    - **Title** (col, w:fill, grow): T "Client onboarding" — IBM Plex Sans SemiBold 15, ink · T "{Business} · {Package} website" (e.g. "Mokoena Plumbing · Grow website") — IBM Plex Sans Regular 13, muted
    - **Autosave status** (row gap 6, align center): **Frame** (20×20, bg mint, r 99) → icon check 10px · T status — IBM Plex Sans Regular 13, muted ("Saves automatically" on Welcome; "Saved just now" / "Saving…" / "Saved 3 min ago" / "Offline: saved on this device" while editing)
    - ⧉ Button Style=Outline "Save & finish later" (212×54)
  - **Body** (row gap 32, pad 32/32/48/32, w:fill)
    - **Sidebar · stepper (sticky top 24)** (col gap 4, pad 20/16/20/16, 300×713, bg surface, r 24, border line 1)
      - **Head** (col gap 8, pad 0/10/12/10, 266×73): T "YOUR BRIEF" — Oswald Medium 12 ls 6%, muted · T "{n} of 13 sections done" — IBM Plex Sans SemiBold 16, ink · progress track (246×6, bg canvas, r 99) → fill coral r99 (width = n/13; 6px minimum)
      - 13 × ⧉ Form/Step item (266×42, w:fill) — states Done / Current / Upcoming / Attention: "01 You & your team" · "02 Business details" · "03 What you do" · "04 Goals" · "05 Your customers" · "06 Competitors & inspiration" · "07 Your brand" · "08 Pages & content" · "09 Features & tools" · "10 Domain, hosting & access" · "11 Legal & privacy" · "12 Anything else" · "13 Review & send"
    - **Main** (col gap 24, 712 wide, w:fill, grow) — step card + sticky step footer
    - **Help rail (sticky)** (col gap 16, 300×445)
      - **Why we ask** (col gap 10, pad 20, 300 wide, bg lilac, r 20): **Frame** (row gap 8) icon help 18px + T "Why we ask" — IBM Plex Sans SemiBold 15, ink · T "{step-specific reason}" — IBM Plex Sans Regular 14/155%, muted
      - **Need help?** (col gap 12, pad 20, 300×167, bg surface, r 20, border line 1): T "Stuck on a question?" — IBM Plex Sans SemiBold 15, ink · T "Skip it and keep going, or message your GoodGround project lead." — IBM Plex Sans Regular 14/155%, muted · pill (row gap 8, pad 10/16/10/14, bg canvas, r 999) icon chat 16px + T "WhatsApp us" — IBM Plex Sans Medium 13, ink
      - **No passwords notice** (row gap 10, pad 14/16/14/16, 300×88, bg blush, r 16): icon lock 18px · T "Please don’t type passwords anywhere in this form. We’ll send you a secure way to share access." — IBM Plex Sans Medium 13/150%, ink
- **Step card** (col gap 28, pad 36/40/36/40, 712 wide, w:fill, bg surface, r 28, border line 1)
  - **Step head** (col gap 10, 630×104): **Frame** (row gap 10, align center): T "STEP n OF 13" — Oswald Medium 13 ls 6%, coral + T "· about {x} min" — IBM Plex Sans Regular 13, muted · T "{step title}" — IBM Plex Sans SemiBold 36/110% ls -2%, ink · T "{step intro}" — IBM Plex Sans Regular 16/155%, muted
  - **Question group** (col gap 14–16, 630 wide, w:fill): **Frame** (col gap 4): T "{group title}" — IBM Plex Sans SemiBold 18 ls -1%, ink (+ optional coral "*" / helper T — IBM Plex Sans Regular 14/150%, muted) · then fields / radio cards (2 per row, row gap 16) / check chips (row wrap gap 8)
  - **Conditional block** (col gap 16, pad 20, w:fill, bg canvas, r 20) — appears under its trigger
  - **Repeat group block** (col gap 14, pad 16/20/20/20, w:fill, bg surface, r 20, border line 1): **Frame** (row, align space_between/center): T "{ITEM} n" — Oswald Medium 12 ls 6%, muted · **Remove** (row gap 6) icon trash 16px + T "Remove" — IBM Plex Sans Medium 13, muted · fields
  - **Add another** (row gap 8, pad 12/18/12/16, align center/center, 630×44, w:fill, bg surface, r 999, border line 1 dashed): icon plus 16px · T "Add another {item}" — IBM Plex Sans Medium 14, ink
- **Step footer (sticky)** (row gap 12, pad 16/20/16/20, align center, 712×88, w:fill, bg surface, r 999, border line 1): ⧉ Button Style=Outline "Back" (121×54) · spacer (grow) · T "Skip for now" — IBM Plex Sans Medium 14, muted · ⧉ Button Style=Coral "Save and continue" (212×52)

### Onboarding — Desktop · Welcome — node 57:150 (1440×1222)
- Shell with stepper "0 of 13 sections done" (all steps Upcoming), autosave "Saves automatically"
- **Main** (col gap 24, 712×1051)
  - **Welcome card** (col gap 24, pad 48, 712×589, w:fill, bg plum, r 32)
    - ⧉ Tag Tone=OnDark "WELCOME, THANDI" (120×30)
    - T "LET’S BUILD YOUR BRIEF." — Oswald Medium 88/94%, surface
    - T "Everything we need to design and build your website, in one place. Answer in your own words; rough notes are fine. Skip anything you’re unsure of and come back to it later." — IBM Plex Sans Regular 18/155%, onDarkMuted
    - **Chips** (row gap 10): chips (row gap 8, pad 8/14/8/12, align center, bg #FFFFFF @10%, r 99) icon check 14px + T — IBM Plex Sans Medium 13, surface: "13 short sections" · "Saves as you go" · "Finish in more than one sitting"
    - **Accepted quote** (row gap 16, pad 16/20/16/20, align center, 616×84, w:fill, bg #FFFFFF @8%, r 18)
      - **Frame** (col gap 2, w:fill, grow): T "YOUR ACCEPTED QUOTE" — Oswald Medium 11 ls 6%, onDarkMuted · T "Grow website · R32,000 · 12 monthly instalments" — IBM Plex Sans SemiBold 15, surface
      - ⧉ Button Style=Coral "Start my brief" (180×52)
  - **Frame** (row gap 24, 712×438) — 2 cards (col, pad 28, 344×438, w:fill, h:fill, grow, bg surface, r 24, border line 1)
    - **Have these ready** (col gap 12): T "Have these ready" — IBM Plex Sans SemiBold 20 ls -1%, ink · T "Not essential, but they make it quicker." — IBM Plex Sans Regular 14, muted · rows (row gap 12, align center): **Frame** (32×32, bg lilac, r 10) → icon 16px + T — IBM Plex Sans Medium 14, ink
      - image "Logo files (SVG, AI or PNG)" · palette "Brand colours and fonts, if you have them" · image "Photos of your team, premises and work" · doc "Any text, brochures or menus to reuse" · star "Reviews and testimonials" · globe "Who manages your domain and email" · shield "Your POPIA Information Officer’s details"
    - **How it works** (col gap 16): T "How it works" — IBM Plex Sans SemiBold 20 ls -1%, ink · steps (row gap 14): **Number** (32×32, bg ink, r 99) → T "0n" — Oswald Medium 12, surface · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, ink + T — IBM Plex Sans Regular 14/150%, muted
      - "01" "Answer what you can" "Every answer saves to your private link as you type." · "02" "Add your files" "Upload logos, photos and documents straight into the form." · "03" "Review and send" "We check it, then book your kick-off call."
- **Help rail** — "Why we ask": "This brief replaces back-and-forth emails. The more you tell us now, the fewer questions we ask later, and the faster your site goes live."

### Onboarding — Desktop · Step 1 You & your team — node 57:342 (1440×1871)
- Shell: autosave "Saved just now"; stepper "0 of 13" with 01 Current
- **Step card** (712×1588): "STEP 1 OF 13" "· about 4 min" · title "You and your team" · intro "Who we’ll be working with, and who signs off the work."
  - **Group · About you** (col gap 16): T "About you"
    - Row: ⧉ Form/Field Kind=Input State=Filled "Your full name" = "Thandi Mokoena" · ⧉ Form/Field Kind=Input State=Filled "Your role in the business" (Optional) = "Owner"
    - Row: ⧉ Form/Field Kind=Input State=Filled "Email address" = "thandi@mokoenaplumbing.co.za" · ⧉ Form/Field Kind=Input State=Focus "Mobile number" = "082 555 0142", helper "We’ll only use this about your project."
  - **Group · Best way to reach you** (col gap 16): T "Best way to reach you"
    - Row of 3 ⧉ Form/Radio card: Selected "WhatsApp" / "Quick questions and updates" · "Phone call" / "For anything detailed" · "Email" / "Written updates"
    - ⧉ Form/Field Kind=Input State=Default "Best days and times to reach you" (Optional) placeholder "e.g. weekdays after 2pm"
  - **Group · Final approval** (col gap 16): T "Final approval" · helper "The person who says “yes, go live”."
    - Row of 2 ⧉ Form/Radio card: "Yes, that’s me" / "I approve the final work" · Selected "No, someone else" / "Add their details below"
    - **Conditional · approver details** (col gap 16, pad 20, 630×210, bg canvas, r 20): row ⧉ Field Filled "Final approver’s name" = "Sipho Mokoena" · ⧉ Field Filled "Their role" (Optional) = "Co-owner" · ⧉ Field Filled "Their email" = "sipho@mokoenaplumbing.co.za" (full width)
  - **Group · Who else will give feedback?**: T "Who else will give feedback?" · helper "Optional. Add anyone who should see drafts."
    - **Repeat group · person 1**: "PERSON 1" + Remove · 3 fields in a row: "Name" (Optional) = "Lerato Dube" · "Role" (Optional) = "Office manager" · "Email" (Optional) placeholder "name@business.co.za"
    - **Add another** "Add another person"
  - ⧉ Form/Field Kind=Textarea State=Default "Any dates you or your approver will be unavailable during the project?" (Optional) placeholder "e.g. away 12–20 December" (630×146)
- **Step footer** — Back · Skip for now · Save and continue
- **Help rail** — "Why we ask": "Knowing who approves the work avoids delays at the end. Drafts go to everyone you list; sign-off comes from the final approver only."

### Onboarding — Desktop · Step 4 Goals — node 58:345 (1440×2469)
- Shell: stepper "3 of 13 sections done" (progress fill 57 of 246), steps 01–03 Done, 04 Current
- **Step card** (712×2186): "STEP 4 OF 13" "· about 5 min" · title "Goals for the project" · intro "What success looks like, so every design decision can be measured against it."
  - **From your quote (read-only)** (row gap 14, pad 16/18/16/18, align center, 630×86, w:fill, bg mint, r 18)
    - **Frame** (36×36, bg surface, r 999) → icon receipt 18px
    - **Frame** (col gap 2, w:fill, grow): T "FROM YOUR ACCEPTED QUOTE" — Oswald Medium 11 ls 6%, muted · T "Grow website · R32,000 · 12 monthly instalments · Blog setup and WhatsApp button added" — IBM Plex Sans SemiBold 14, ink
    - T "Not right? Tell us" — IBM Plex Sans Medium 13, coral
  - **Group · What are you working with us on?** — helper "Pre-ticked from your quote. Add anything else you’re considering." · ⧉ Form/Check chip (row wrap gap 8): On "A new website" · "A redesign of our current website" · "Full Service (monthly)" · "A monthly Care Plan" · "SEO and content" · "Google Ads" · "Meta Ads" · "A new brand (logo and identity)" · "A refresh of our existing brand" · "Not sure yet"
  - **Group · What must the website achieve?** — helper "Tick all that apply." · chips: On "Get more enquiries" · "Get bookings or appointments" · "Sell products online" · On "Build credibility and trust" · On "Show our work" · "Inform and educate" · "Recruit staff" · "Support existing customers"
  - **Group · The ONE action you most want a visitor to take** — helper "Everything on the site will lead here." · 4 rows of 2 ⧉ Form/Radio card: "Call us" / "Tap-to-call on mobile" · "WhatsApp us" / "Start a chat" · "Fill in a contact form" / "Send an enquiry" · Selected "Request a quote" / "Describe the job" · "Book online" / "Choose a time" · "Buy online" / "Checkout on the site" · "Visit our premises" / "Get directions" · "Sign up or subscribe" / "Join a list"
  - **Group · Other actions that also matter** · chips: On "Call us" · "WhatsApp us" · On "Fill in a contact form" · On "Request a quote" · "Book online" · "Buy online" · "Visit our premises" · "Sign up or subscribe" · "Follow us on social media"
  - (continues in the next chunk)

  - ⧉ Form/Field Kind=Textarea State=Filled "In 12 months, how will you know the website is working?" (Optional) = "At least 20 quote requests a month from the website, and people telling us they found us on Google." (630×146)
  - ⧉ Form/Field Kind=Input State=Default "Roughly how many enquiries or sales come from the internet each month now?" (Optional) placeholder "A rough guess is fine", hint "This becomes the starting point we measure against." (630×104)
  - **Group · How do customers find you today?** · chips: "Google search" · On "Google Maps" · On "Word of mouth and referrals" · On "Facebook" · "Instagram" · "TikTok" · "LinkedIn" · "Online directories" · On "Signage and walk-ins" · "Advertising"
  - **Group · Timing**
    - Row: ⧉ Field Filled "Ideal launch date" (Optional) = "15 February 2027" · ⧉ Field Filled "What’s happening on that date?" (Optional) = "Start of our busy season"
    - Row of 3 ⧉ Form/Radio card: Selected "Fixed" / "There’s an event or launch" · "Preferred" / "A target we’d like to hit" · "Flexible" / "Whenever it’s ready"
- **Step footer** — Back · Skip for now · Save and continue
- **Help rail** (Why we ask + No passwords; this step omits the "Need help?" card) — "Why we ask": "Your answers here become the yardstick for the whole project. When we propose a layout or feature, we’ll show how it serves these goals."

### Onboarding — Desktop · Step 7 Your brand — node 58:689 (1440×1942)
- Shell: stepper "5 of 13 sections done" (fill 95/246); 01–04 Done, 05 Attention, 06 Done, 07 Current, 08–13 Upcoming
- **Step card** (712×1659): "STEP 7 OF 13" "· about 8 min" · "Your brand" · "Logos, colours and fonts, so the site looks unmistakably like you."
  - **Group · Where is your brand at?** — 2 rows of 2 ⧉ Form/Radio card: "Complete brand" / "Logo, colours, fonts and guidelines" · Selected "Logo only" / "No full brand guide" · "New brand" / "It’s part of our project" · "Brand refresh" / "Refresh our existing brand"
  - **Group · Upload your logo files** — helper "SVG, AI, EPS or PDF are best. High-resolution PNG works too. Max 50 MB per file."
    - **Dropzone** (col gap 10, pad 28/24/28/24, align center, 630×164, w:fill, bg canvas, r 20, border line 1.5 dashed): **Frame** (48×48, bg surface, r 999) → icon upload 24px · T "Drag files here, or browse" — IBM Plex Sans SemiBold 15, ink · T "You can add more files later" — IBM Plex Sans Regular 13, muted
    - ⧉ Form/File row Status=Done "mokoena-logo-full-colour.svg" / "42 KB · uploaded" (630×64)
    - ⧉ Form/File row Status=Uploading "mokoena-logo-white.png" / "Uploading… 64%" (630×72)
    - ⧉ Form/File row Status=Error "van-signage-photo.heic" / "HEIC isn’t supported yet. Export as JPG or PNG." (630×64)
  - **Group · Your brand colours** — helper "Paste a hex code, or pick a colour from your logo."
    - **Colour row** (row gap 12, pad 12, align center, 630×72, w:fill, bg surface, r 16, border line 1): swatch rectangle 44×44 r12 (the colour) · hex input (row gap 6, pad 12/14/12/14, align center, 110×46, bg canvas, r 12, border line 1) T — IBM Plex Sans Medium 15, ink · name input (same, w:fill, grow) T — IBM Plex Sans Regular 15, ink · "Used for" select (same, w:fill, grow) T + icon chevron 16px · icon trash 18px
      - #0B4F8A "Mokoena Blue" "Main colour" · #F2A900 "Safety Yellow" "Highlights & buttons"
    - **Add another** "Add a colour"
  - **Group · Fonts** — row: ⧉ Field Default "Font used for headings" (Optional) placeholder "e.g. Montserrat", hint "Not sure? Leave it; we’ll identify it from your logo." · ⧉ Field Default "Font used for body text" (Optional) placeholder "e.g. Open Sans"
  - ⧉ Field Filled "Tagline or slogan, if you have one" (Optional) = "No job too small, no leak too big." (630×77)
  - ⧉ Field Textarea Default "Brand rules we must follow, or things never to do" (Optional) placeholder "e.g. never stretch the logo; never use red" (630×146)
- **Step footer** — Back · Skip for now · Save and continue
- **Help rail** — "Why we ask": "We match your existing brand exactly. If anything is missing, we’ll pick colours and fonts that fit your logo and show you before we use them."

### Onboarding — Desktop · Step 13 Review & send — node 59:684 (1440×1929)
- Shell variant: top bar 79 tall with no "Save & finish later" button; stepper "10 of 13 sections done" (fill 191/246); 05 and 11 Attention, 13 Current, others Done; **no help rail** — the main column widens to 1044
- **Review card** (col gap 28, pad 36/40/36/40, 1044×1770, w:fill, bg surface, r 28, border line 1)
  - **Head** (col gap 10): T "STEP 13 OF 13" — Oswald Medium 13 ls 6%, coral · T "Review and send" — IBM Plex Sans SemiBold 36 ls -2%, ink · T "Check what’s missing, confirm the details below, then send. You can still send with gaps; we’ll follow up on anything we need." — IBM Plex Sans Regular 16/155%, muted
  - **Completion overview** (row gap 24, pad 24, align center, 962×160, w:fill, bg plum, r 24)
    - **Completion ring** (112×112): ellipse track #FFFFFF @12% + ellipse arc coral (92%) + T "92%" — Oswald Medium 30, surface (centred)
    - **Frame** (col gap 6, w:fill, grow): T "Almost there, Thandi" — IBM Plex Sans SemiBold 22 ls -1%, surface · T "10 of 12 sections complete · 2 required answers missing · 14 files uploaded (86 MB)" — IBM Plex Sans Regular 14/150%, onDarkMuted
  - **Missing required answers** (col gap 10, pad 18/20/18/20, 962×197, w:fill, bg blush, r 20)
    - **Frame** (row gap 10, align center): icon alert 20px (coral) · T "2 required answers missing" — IBM Plex Sans SemiBold 16, ink
    - Rows (row gap 12, pad 12/14/12/14, align center, 922×60, w:fill, bg surface, r 14): **Frame** (col gap 2, w:fill, grow): T section — Oswald Medium 11 ls 6%, coral + T question — IBM Plex Sans Medium 14, ink · T "Answer now →" — IBM Plex Sans SemiBold 13, coral
      - "YOUR CUSTOMERS" "Your main types of customer" · "LEGAL & PRIVACY" "Your Information Officer under POPIA: name and email"
  - **Section list** (col, 962×685, w:fill, bg surface, r 20, border line 1) — 12 rows (row gap 14, pad 14/20/14/20, align center, 960×57, w:fill; all but last border line 0/0/1/0):
    - status chip (28×28, r 999): complete = bg mint + icon check 14px; missing = bg blush + icon alert 14px
    - T "0n  {Section}" — IBM Plex Sans Medium 15, ink (w:fill)
    - status pill (row, pad 4/10/4/10, r 99) T — IBM Plex Sans Medium 12: complete = bg canvas, muted; missing = bg blush, coral
    - **Edit** (row gap 6) icon edit 14px + T "Edit" — IBM Plex Sans Medium 13, ink
    - Rows: 01 You & your team "Complete · 2 optional skipped" · 02 Business details "Complete · 1 optional skipped" · 03 What you do "Complete" · 04 Goals "Complete · 3 optional skipped" · 05 Your customers "1 required missing" · 06 Competitors & inspiration "Complete · 5 optional skipped" · 07 Your brand "Complete · 2 optional skipped" · 08 Pages & content "Complete · 4 optional skipped" · 09 Features & tools "Complete · 1 optional skipped" · 10 Domain, hosting & access "Complete" · 11 Legal & privacy "1 required missing" · 12 Anything else "Complete · 2 optional skipped"
  - **Confirmations** (col gap 12, 962×244)
    - T "Please confirm" — IBM Plex Sans SemiBold 18 ls -1%, ink
    - Rows (row gap 12, pad 14/16/14/16, 962×52, w:fill, r 16): checkbox 22×22 r 6 · T — IBM Plex Sans Medium 14/150%, ink. Checked row: bg canvas, border canvas 1, box bg ink + icon check 13px. Unchecked row: bg surface, border line 1, box bg surface + border line 1.5.
      - (checked) "The information in this brief is accurate to the best of my knowledge."
      - (checked) "I have the right to use the logos, photos and text I’ve provided, or I’ve noted where I’m unsure."
      - (unchecked) "I agree that GoodGround may use this information to deliver my project, as described in the privacy note."
    - **Frame** (row gap 8, align center): icon eye 16px · T "Read the privacy note" — IBM Plex Sans Medium 13, coral
  - ⧉ Form/Field Kind=Input State=Filled "Your name, to confirm" = "Thandi Mokoena" (962×77)
  - **Send actions** (row gap 12, align center, 962×54): ⧉ Button Style=Outline "Back" · spacer · **Frame** (row gap 6) icon download 16px + T "Download a PDF copy" — IBM Plex Sans Medium 14, ink · ⧉ Button Style=Coral "Send my brief" (181×52) (disabled until all consents + name)

### Onboarding — Desktop · Sent — node 59:975 (1440×993)
- Top bar (79 tall, no Save & finish later) · no stepper, no help rail
- **Main** (col gap 24, pad 0/200/0/200, w:fill, grow) — content 976 wide
  - **Success card** (col gap 24, pad 56, 976×424, w:fill, bg plum, r 32)
    - **Frame** (72×72, bg coral, r 999) → icon check 34px
    - T "BRIEF RECEIVED. THANK YOU, THANDI." — Oswald Medium 72/94%, surface
    - T "Your answers and 14 files are safely with us. We’ve emailed you a copy. We’ll confirm we’ve read it within one working day." — IBM Plex Sans Regular 18/155%, onDarkMuted
  - **What happens next** (col gap 16, pad 28/32/28/32, 976×267, w:fill, bg surface, r 28, border line 1)
    - T "What happens next" — IBM Plex Sans SemiBold 22 ls -1%, ink
    - Rows (row gap 16): **Frame** (40×40, bg lilac, r 12) → icon 20px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 16, ink + T — IBM Plex Sans Regular 14/150%, muted
      - cal "01  We review your brief" "Within one working day we’ll confirm and follow up on the 2 missing answers."
      - lock "02  We ask for access, securely" "A separate secure link for domain, hosting and email access. Never by email."
      - cal "03  Kick-off call" "We walk through the plan, timeline and first designs."
  - **Frame** (row gap 12): ⧉ Button Style=Outline "Download a PDF copy" (237×54) · ⧉ Button Style=Outline "Edit my answers" (201×54)
  - T "You can keep editing until your kick-off call. After that, changes go through your project lead." — IBM Plex Sans Regular 13, muted

### Shared mobile shell (onboarding)
- **Top bar** (row gap 10, pad 14/16/14/16, align center, 390×62, w:fill, bg surface, border line 0/0/1/0): logo pill (row, pad 6/12/6/12, 109×33, bg ink, r 999) T "goodground" — IBM Plex Sans SemiBold 16 ls -3%, surface · spacer · **Frame** (20×20, bg mint, r 999) icon check 10px · T "Saved" — IBM Plex Sans Regular 12, muted
- **Sticky step header** (col gap 10, pad 12/16/12/16, 390×93, w:fill, bg canvas, border line 0/0/1/0)
  - **Step pill** (row gap 10, pad 10/12/10/14, align center, 358×54, w:fill, bg surface, r 999, border line 1): icon list 18px · **Frame** (col, w:fill, grow): T "Step n of 13" — IBM Plex Sans Regular 11, muted + T "{step}" — IBM Plex Sans SemiBold 14, ink · icon chevron 18px — opens the steps sheet
  - **Segments** (row gap 3, 358×4): 13 × rectangle 25×4 r99 — done ink, current coral, upcoming line
- **Body** (col gap 20, pad 20/16/24/16, w:fill)
- **Sticky footer** (row gap 10, pad 12/16/20/16, align center, 390×87, w:fill, bg surface, border line 1/0/0/0): ⧉ Button Style=Outline "Back" (121×54) · ⧉ Button Style=Coral "Save and continue" (227×52, w:fill)

### Onboarding — Mobile · Welcome — node 60:757 (390×921)
- Top bar only (no step header, no footer)
- **Body** (col gap 20, pad 20/16/24/16)
  - **Welcome card** (col gap 16, pad 24/20/24/20, 358×478, w:fill, bg plum, r 24)
    - ⧉ Tag Tone=OnDark "WELCOME, THANDI"
    - T "LET’S BUILD YOUR BRIEF." — Oswald Medium 48/94%, surface
    - T "Everything we need to build your website, in one place. Rough notes are fine; skip what you’re unsure of." — IBM Plex Sans Regular 15/155%, onDarkMuted
    - Ticks (row gap 8): icon check 14px + T — IBM Plex Sans Medium 13, surface: "13 short sections" · "Saves as you go"
    - **Quote** (col gap 2, pad 12/14/12/14, 318×59, w:fill, bg #FFFFFF @8%, r 14): T "YOUR ACCEPTED QUOTE" — Oswald Medium 10 ls 6%, onDarkMuted · T "Grow website · R32,000 · 12 instalments" — IBM Plex Sans SemiBold 14, surface
    - ⧉ Button Style=Coral "Start my brief" (318×52, w:fill)
  - **Have these ready** (col gap 10, pad 18, 358×256, w:fill, bg surface, r 20, border line 1): T "Have these ready" — IBM Plex Sans SemiBold 17, ink · rows (row gap 10, align center) icon check 14px + T — IBM Plex Sans Regular 14, ink: "Logo files" · "Brand colours and fonts" · "Photos of your team and work" · "Text, brochures or menus" · "Reviews and testimonials" · "Who manages your domain and email" · "POPIA Information Officer details"
  - **No passwords** (row gap 10, pad 12/14/12/14, 358×41, w:fill, bg blush, r 14): icon lock 16px · T "Never type passwords in this form." — IBM Plex Sans Medium 13, ink

### Onboarding — Mobile · Step 7 Your brand — node 60:823 (390×1402)
- Mobile shell: step pill "Step 7 of 13" / "Your brand"; segments 1–6 ink, 7 coral, 8–13 line
- **Body**
  - T "Your brand" — IBM Plex Sans SemiBold 28 ls -1%, ink · T "Logos, colours and fonts, so the site looks unmistakably like you." — IBM Plex Sans Regular 15/155%, muted
  - T "Where is your brand at?" — IBM Plex Sans SemiBold 16, ink · 4 full-width ⧉ Form/Radio card (358 wide): "Complete brand" · Selected "Logo only" · "New brand" · "Brand refresh" (same sub-lines as desktop)
  - T "Upload your logo files" — IBM Plex Sans SemiBold 16, ink
  - **Upload buttons** (row gap 10, 358×44): 2 pills (row gap 8, pad 12/14/12/14, align center/center, w:fill, grow, bg surface, r 999, border line 1): icon upload 16px "Choose files" · icon camera 16px "Take a photo" — IBM Plex Sans Medium 14, ink
  - ⧉ Form/File row Status=Done "mokoena-logo.svg" / "42 KB · uploaded" · ⧉ Form/File row Status=Uploading "logo-white.png" / "Uploading… 64%"
  - T "Your brand colours" — IBM Plex Sans SemiBold 16, ink
  - **Colour rows (compact)** (row gap 12, pad 12, align center, 358×66, w:fill, bg surface, r 16, border line 1): swatch 40×40 r10 · **Frame** (col, w:fill, grow): T hex — IBM Plex Sans SemiBold 14, ink + T "{name} · {use}" — IBM Plex Sans Regular 12, muted · icon chevron 16px (tap to edit)
    - #0B4F8A "Mokoena Blue · Main colour" · #F2A900 "Safety Yellow · Highlights"
  - ⧉ Form/Field Kind=Input State=Default "Font used for headings" (Optional) placeholder "e.g. Montserrat"
- **Sticky footer** — Back · Save and continue

### Onboarding — Mobile · Review & send — node 60:950 (390×1237)
- Mobile shell: step pill "Step 13 of 13" / "Review & send"; segments 1–12 ink, 13 coral
- **Body**
  - T "Review and send" — IBM Plex Sans SemiBold 28 ls -1%, ink
  - **Completion** (row gap 14, pad 16, align center, 358×88, w:fill, bg plum, r 20): **Frame** (56×56, bg coral, r 999) → T "92%" — Oswald Medium 18, surface · **Frame** (col gap 2, w:fill, grow): T "Almost there" — IBM Plex Sans SemiBold 17, surface + T "2 required answers missing · 14 files" — IBM Plex Sans Regular 12, onDarkMuted
  - **Missing** (col gap 8, pad 14, 358×136, w:fill, bg blush, r 18): **Frame** (row gap 8) icon alert 18px + T "2 required answers missing" — IBM Plex Sans SemiBold 14, ink · rows (row gap 8, pad 10/12/10/12, align center, 330×37, bg surface, r 12): T — IBM Plex Sans Medium 13, ink + T "Answer →" — IBM Plex Sans SemiBold 12, coral — "Your main types of customer" · "POPIA Information Officer"
  - **Section list** (col, pad 0/14/0/14, 358×289, w:fill, bg surface, r 18, border line 1) — rows (row gap 10, pad 12/0/12/0, align center, w:fill, border bottom): status chip 24×24 (mint check / blush alert) · T — IBM Plex Sans Medium 14, ink · T "Edit" — IBM Plex Sans Medium 12, coral
    - "You & your team" · "Business details" · "What you do" · "Goals" · "Your customers" (alert) · last row T "…7 more sections" — IBM Plex Sans Medium 14, muted (expands)
  - T "Please confirm" — IBM Plex Sans SemiBold 16, ink
  - Consent rows (row gap 10, pad 12, 358×48, w:fill, bg surface, r 14, border line 1): checkbox 22×22 r 6 · T — IBM Plex Sans Medium 13/145%, ink — (checked) "The information is accurate." · (checked) "I have the right to use what I’ve provided." · (unchecked) "GoodGround may use it to deliver my project."
  - ⧉ Form/Field Kind=Input State=Filled "Your name, to confirm" = "Thandi Mokoena"
- **Sticky footer** — ⧉ Button Style=Outline "Back" · ⧉ Button Style=Coral "Send my brief"

### State · Mobile steps sheet (opens from step header) — node 60:1068 (390×680)
- **Bottom sheet** (col gap 4, pad 12/16/24/16, align center, 390×680, bg surface, r 28 (top), shadow 0 -8 40 #000000@18%)
  - rectangle 40×4 line r99 (drag handle)
  - **Frame** (row, pad 8/0/8/0, align space_between/center, 358×38): T "Your brief · 5 of 13 done" — IBM Plex Sans SemiBold 17, ink · icon x 20px (close)
  - 13 × ⧉ Form/Step item (358×42, w:fill): Done ×4 · Attention "05 Your customers" · Done "Competitors & inspiration" · Current "07 Your brand" · Upcoming 08–13


### Onboarding form components — node 56:151 (1796×1156)
The five form components every onboarding screen is built from (variant props in the names).

- **Form/Field** — Kind = Input | Textarea · State = Default | Focus | Filled | Error
  - **Field** (col gap 8, 380 wide in the board; w:fill when used)
    - **Label row** (row gap 6, align center, h 18, w:fill): T "{Label}" — IBM Plex Sans Medium 14, ink · T "Optional" — IBM Plex Sans Regular 13, muted (only on optional fields)
    - **Box** (row gap 10, pad 14/16/14/16, align center (Input) / top (Textarea), r 14, w:fill) — Input height 51; Textarea height 120
      - Default: bg canvas, border line 1 · T placeholder — IBM Plex Sans Regular 16, muted
      - Focus: bg surface, border ink 1.5 (box 52 tall) · placeholder muted
      - Filled: bg canvas, border line 1 · T value — IBM Plex Sans Regular 16, ink
      - Error: bg blush, border coral 1.5 · T value — ink · icon alert 18px (coral) at the right
    - **Hint / error** (optional): T — IBM Plex Sans Regular 13/145%, muted (coral in Error state)
- **Form/Radio card** — Selected = No | Yes
  - No (row gap 14, pad 16/18/16/18, ~380×75, bg surface, r 18, border line 1): **Radio** (22×22, bg surface, r 99, border line 1.5) · **Frame** (col gap 2, w:fill, grow): T title — IBM Plex Sans SemiBold 15, ink + T description — IBM Plex Sans Regular 13/145%, muted (description optional)
  - Yes (77 tall): bg blush, border coral 2 · Radio bg coral + icon check 13px
- **Form/Check chip** — On = No | Yes
  - No (row gap 8, pad 10/16/10/12, align center, h 40, bg surface, r 999, border line 1): box (18×18, bg surface, r 6, border line 1.5) · T — IBM Plex Sans Medium 14, ink
  - Yes (h 38): bg ink, no border · box bg coral + icon check 12px · T surface
- **Form/File row** — Status = Uploading | Done | Error
  - Common (row gap 12, pad 12/14/12/14, align center, ~420 wide, r 14): **File chip** (36×36, bg lilac, r 10) → icon file 18px · **Frame** (col gap 4, w:fill, grow): T filename — IBM Plex Sans Medium 14, ink + status line
  - Uploading (72 tall, bg surface, border line 1): progress track (w:fill, h 4, bg canvas, r 99) → coral fill · T "Uploading… 64%" — IBM Plex Sans Regular 12, muted · icon x 18px (cancel)
  - Done (64 tall, bg surface, border line 1): T "{size} · uploaded" — IBM Plex Sans Regular 12, muted · **Frame** (24×24, bg mint, r 99) icon check 13px · icon x 18px (remove). Image files show a thumbnail in place of the file chip.
  - Error (64 tall, bg blush, border coral 1): T reason — IBM Plex Sans Regular 12, coral · icon retry 18px · icon x 18px
- **Form/Step item** — State = Done | Current | Upcoming | Attention
  - Common (row gap 12, pad 8/12/8/10, align center, 260×42 (w:fill in the stepper), r 12): **Indicator** (26×26, r 99) · T step name — IBM Plex Sans 14
  - Done: indicator bg mint + icon check 13px · name Medium ink
  - Current: row bg surface · indicator bg ink + T "0n" — Oswald Medium 11, surface · name SemiBold ink
  - Upcoming: indicator bg surface, border line 1.5 + T "0n" — Oswald Medium 11, muted · name Medium muted
  - Attention: indicator bg blush + T "0n" — Oswald Medium 11, coral · name Medium ink · trailing ellipse 8×8 coral

### Onboarding — Desktop · Step 2 Business details — node 64:892 (1440×2624)
- Shell: stepper "1 of 13 sections done" (fill 19/246); 01 Done, 02 Current
- **Step card** (col gap 20, 712×2341): head (pad bottom 8) "STEP 2 OF 13" "· about 6 min" · "Your business details" · "The official details we need for your contact page, footer and legal pages."
  - **Group heading** pattern on this and later steps: (col gap 4, pad 8/0/0/0, w:fill) T — IBM Plex Sans SemiBold 18 ls -1%, ink (+ helper IBM Plex Sans Regular 14/150%, muted)
  - Heading "Registered details"
    - Row: Field Filled "Registered business name" = "Mokoena Plumbing (Pty) Ltd" · Field Filled "Trading name, if different" (Optional) = "Mokoena Plumbing"
    - Field Filled "Type of business" = "Private company (Pty) Ltd", hint "Choose from the list" (full width; it is a select)
    - **Conditional block** (col gap 16, pad 16/20/20/20, 630×307, bg canvas, r 20): **Frame** (row gap 6, align center) icon info 14px + T "Shown because you chose a (Pty) Ltd" — IBM Plex Sans Regular 12, muted · row: Field Filled "Registration number" (Optional) = "2019/123456/07" · Field Default "VAT number, if VAT registered" (Optional) "e.g. 4123456789" · Field Textarea Filled "Directors or office bearers (full names)" (Optional) = "Thandi Mokoena, Sipho Mokoena"
  - Heading "Address" — row of 2 textareas: Filled "Physical business address" = "14 Market Street, George, 6529" · Default "Postal address, if different" (Optional) "PO Box…"
  - Heading "Where should your address appear on the website?" — row of 3 radio cards: "Contact page and footer" / "Full address, everywhere" · Selected "Suburb and city only" / "Full address on the legal page only" · "Home-based or mobile" / "Legal page only"
  - Heading "Contact details for the website" — row of 3 fields: "Business phone" = "044 555 0100" · "WhatsApp number" = "082 555 0142" · "Business email" = "info@mokoenaplumbing.co.za" (all Optional, Filled)
  - Row of 2 textareas: "Trading hours" = "Mon–Fri 7:30–17:00, Sat 8:00–12:00, 24/7 emergencies" · "Areas you serve" = "George, Wilderness, Mossel Bay, Knysna"
  - Row: "Year the business started" = "2019" · "How many people work in the business?" = "8"
  - Textarea "Industry bodies, associations or accreditations" = "PIRB registered, IOPSA member"
  - Heading "Online profiles" + helper "Paste the full link to each one you have." — 3 rows of 2 fields: "Google Business Profile" = "https://g.page/mokoena-plumbing" · "Facebook page" = "https://facebook.com/mokoenaplumbing" · "Instagram" "https://instagram.com/…" · "LinkedIn" "https://linkedin.com/company/…" · "TikTok" "https://tiktok.com/@…" · "YouTube" "https://youtube.com/@…"
  - Textarea Default "Other profiles or directory listings" "e.g. Snupit, Yellow Pages"
- **Help rail** — "Why we ask": "These details appear on your contact and legal pages, and help Google show the right business information in search and on Maps."

### Onboarding — Desktop · Step 3 What you do — node 64:1208 (1440×2775)
- Shell: "2 of 13 sections done" (fill 38); 01–02 Done, 03 Current
- **Step card** (712×2492): "STEP 3 OF 13" "· about 10 min" · "What you do" · "Your offer in your own words. This becomes the backbone of your homepage and services pages."
  - Textarea Filled "In one or two sentences, what do you do and for whom?" = "We fix, install and maintain plumbing for homes and businesses across the Garden Route, with 24/7 emergency call-outs."
  - Textarea Default "Your story: how and why did the business start?" (Optional) "A few lines is plenty"
  - Textarea Filled "What makes you different from the alternatives?" = "We arrive within 60 minutes for emergencies, quote before we start, and clean up after ourselves."
  - Heading "Your services or products" + "Add each one you want on the website."
    - **Repeat · SERVICE 1** (630×398): row "Name" = "Burst pipes & leaks" · "Price or “from” price" (Optional) = "Call-out from R650" · textarea "What it is and what’s included" = "Leak detection, repairs and pipe replacement, 24/7." · row "Who it’s for" = "Homeowners and landlords" · "How important is it to your business?" = "Most important" (select)
    - **Repeat · SERVICE 2** (630×307): "Name" = "Geyser installation" · "Price or “from” price" "e.g. from R8,500" · textarea "What it is and what’s included" "Describe it in a sentence or two"
    - **Add another** "Add another service"
  - Textarea Filled "If visitors remember only three things about you, what should they be?" (Optional) = "Fast emergency response · Honest upfront quotes · Qualified, insured plumbers"
  - Heading "Awards, certifications and qualifications"
    - **Repeat · AWARD 1** (630×238): row "What it is" = "PIRB Licensed Plumber" · "Year" = "2019" · row of 2 radio cards (title only): Selected "Show on the website" · "Keep it private"
    - **Add another** "Add another award or certification"
  - Textarea Filled "Numbers you’re proud of, that you can back up" (Optional) = "1,200+ jobs completed · 4.9 stars from 180 Google reviews", hint "Only numbers you could prove if asked."
  - Row of 2 textareas: "Guarantees, warranties or promises" = "12-month workmanship guarantee" · "Well-known clients we may name" "Only with their permission"
- **Help rail** — "We write and structure your pages from these answers. The clearer the “what makes you different”, the stronger your homepage."

### Onboarding — Desktop · Step 5 Your customers — node 64:1491 (1440×2026)
- Shell: "4 of 13 sections done" (fill 76); 01–04 Done, 05 Current
- **Step card** (712×1743): "STEP 5 OF 13" "· about 6 min" · "Your customers" · "Who you serve, and what they need to hear before they choose you."
  - Heading "Your main types of customer" + "Add up to four. Think of the people who bring in most of your work."
    - **Repeat · CUSTOMER TYPE 1** (630×419): Field "Who are they?" = "Homeowners with an emergency" (full width) · row of 2 textareas "What do they need from you?" = "Someone reliable, fast, who won’t overcharge" · "What worries them or makes them hesitate?" = "Hidden costs; strangers in the house" · row of 2 fields "What makes them decide to buy?" = "Reviews, a quick reply, a clear price" · "Where are they? (area, age, online habits)" = "Garden Route, 30–65, Google on mobile"
    - **Repeat · CUSTOMER TYPE 2** (collapsed to its first field, 630×147): "Who are they?" = "Property managers and landlords"
    - **Add another** "Add another customer type"
  - Heading "Languages your customers speak" — chips: On "English" · On "Afrikaans" · "isiZulu" · On "isiXhosa" · "Sesotho" · "Setswana"
  - Heading "Should the website be in more than one language?" — row of 3 radio cards: Selected "English only" · "English plus another language" / "Extra languages are R5,000 each" · "Not sure" / "We’ll advise"
  - Heading "Questions customers always ask, with your answers" + "These become your FAQ section."
    - **Repeat · QUESTION 1** (630×307): Field "Question" = "Do you charge for a quote?" · Textarea "Your answer" = "No. Quotes are free; call-outs for emergencies start at R650."
    - **Add another** "Add another question"
- **Help rail** — "Pages that speak to a specific customer convert far better than pages written for everyone. Your FAQs also become a page Google can show in search."

### Onboarding — Desktop · Step 6 Competitors & inspiration — node 65:1396 (1440×2264)
- Shell: "5 of 13 sections done" (fill 95); 01–05 Done, 06 Current
- **Step card** (712×1981): "STEP 6 OF 13" "· about 6 min" · "Competitors and inspiration" · "Who you’re up against, and the kind of websites you like (and don’t)."
  - Heading "Your main competitors"
    - **Repeat · COMPETITOR 1**: row "Name" = "Garden Route Plumbers" · "Website" = "https://gardenrouteplumbers.co.za" · row of 2 textareas "What do they do well online?" = "Lots of Google reviews; clear prices" · "Where are they weak?" = "Slow site, hard to use on a phone"
    - **Add another** "Add another competitor"
  - Heading "Websites you like" + "Any industry. Tell us what exactly you like."
    - **Repeat · WEBSITE 1**: "Website" = "https://www.revolut.com" · textarea "What exactly do you like about it?" = "Clean, confident, easy to scan on a phone"
    - **Add another** "Add another website you like"
  - Heading "Websites you don’t like"
    - **Repeat · WEBSITE 1**: "Website" "https://…" · textarea "What don’t you like?" "e.g. too busy, pop-ups everywhere"
    - **Add another** "Add another"
  - Heading "How should your website feel?" + "Pick up to five." — chips: On "Professional" · On "Friendly" · "Bold" · "Calm" · "Premium" · "Playful" · On "Modern" · "Classic" · "Warm" · "Minimal" · "Energetic" · On "Trustworthy" · "Natural and earthy" · On "Technical and expert"
  - Textarea Filled "How should it definitely NOT feel?" = "Cheap, cluttered or salesy"
- **Help rail** — "Seeing what you like and dislike saves whole rounds of design revisions. Competitors show us where your site can stand out."

### Onboarding — Desktop · Step 8 Pages & content — node 65:1672 (1440×4018)
- Shell: "6 of 13 sections done" (fill 114); 01–04 Done, 05 Attention, 06–07 Done, 08 Current (continues in the next chunk)

- **Step card** (col gap 20, 712×3735): "STEP 8 OF 13" "· about 12 min" · "Website pages and content" · "The pages, words, photos and proof that go on your site."
  - Field Filled "Your current website, if you have one" (Optional) = "https://mokoenaplumbing.co.za"
  - **Conditional · Shown because you have a current website** (630×214, bg canvas, r 20): info line · row of 2 textareas "What should we keep from your current website?" = "Our services list and the photo of the team" · "What should we change or remove?" = "The old prices and the slideshow"
  - Heading "Which pages do you think you need?" + helper "Your Grow package includes up to 10 pages. 8 selected." (live count vs package allowance)
    - chips: On "Home" · On "About us" · "Services (one page)" · On "Services (a page each)" · "Products" · On "Portfolio or gallery" · On "Testimonials and reviews" · "Team" · "Pricing" · On "FAQ" · On "Blog or news" · On "Contact" · "Bookings" · "Careers" · "Locations or branches"
  - Textarea Default "Anything specific about any page?" (Optional) "e.g. the gallery should be sorted by job type"
  - Heading "Who will write the website text?" — row of 3 radio cards: "GoodGround writes it" / "From this brief (copywriting add-on)" · "I’ll supply the text" / "We’ll edit it for the web" · Selected "A mix" / "I’ll supply some, you write the rest"
  - **Compact dropzone** (col gap 8, pad 22/24/22/24, align center, 630×87, w:fill, bg canvas, r 20, border line 1.5 dashed): **Frame** (row gap 12, align center): **Frame** (40×40, bg surface, r 999) icon upload 20px · **Frame** (col gap 2): T title — IBM Plex Sans SemiBold 15, ink + T sub — IBM Plex Sans Regular 13, muted
    - "Existing text to reuse" / "Word documents, PDFs, brochures, menus"
  - ⧉ Form/File row Done "services-list-2024.docx" / "38 KB · uploaded"
  - Heading "Photos for the website" — row of 3 + row of 2 radio cards: "Professional photos" / "We have them" · Selected "Some photos" / "Phone or amateur" · "Stock photos" / "We need them" · "Book a photographer" / "We’d like to" · "Not sure" / "We’ll advise"
  - Compact dropzone "Upload photos of your team, premises, work and products" / "Drag files here, or browse · max 50 MB each"
  - File rows: Done "team-outside-van.jpg" "4.2 MB · uploaded" · Done "geyser-install-before-after.jpg" "3.1 MB · uploaded" · Uploading "bathroom-renovation-12.jpg" "Uploading… 38%"
  - Row: Field Default "A big photo or video collection? Paste a link" (Optional) "Google Drive, Dropbox or WeTransfer" · Field Default "Video links to feature" (Optional) "YouTube or Vimeo"
  - Heading "Testimonials"
    - **Repeat · TESTIMONIAL 1** (630×398): Textarea "What they said" = "They arrived within the hour on a Sunday night and fixed our burst pipe. Fair price, no mess." · row "Their name" = "Annelie V." · "Role, company or town" (Optional) = "Homeowner, Wilderness" · row of 2 radio cards: Selected "Yes, they agreed to be quoted" · "Not yet" / "We’ll ask before launch"
    - **Add another** "Add another testimonial"
  - Field Filled "Link to your Google or other reviews" (Optional) = "https://g.page/mokoena-plumbing/review"
  - Heading "Projects or case studies to feature" + "Optional. Great for the portfolio page."
    - **Repeat · PROJECT 1**: row "Project name" = "Guesthouse re-plumb, Knysna" · "Client (if they agreed to be named)" "Leave blank to keep private" · textarea "What you did, and the result" = "Replaced all copper piping in 12 rooms over 4 days with no guest downtime."
    - **Add another** "Add another project"
  - Heading "Team members to show on the website" + "Optional."
    - **Repeat · TEAM MEMBER 1**: row "Name" = "Sipho Mokoena" · "Role" = "Master plumber" · textarea "Short bio" "One or two sentences"
    - **Add another** "Add another team member"
  - Compact dropzone "Files visitors should be able to download" / "Price lists, menus, brochures · optional"
- **Help rail** — "Content is the most common reason websites launch late. Telling us early what exists, and who writes the rest, keeps your timeline on track."

### Onboarding — Desktop · Step 9 Features & tools — node 65:2157 (1440×1893)
- Shell: "7 of 13 sections done" (fill 134); 05 Attention; 09 Current
- **Step card** (712×1610): "STEP 9 OF 13" "· about 6 min" · "Features and tools" · "What the site needs to do, and the tools it should connect to."
  - Field Filled "Which email address(es) should website enquiries go to?" = "info@mokoenaplumbing.co.za, thandi@mokoenaplumbing.co.za", hint "Separate several addresses with commas."
  - Heading "Which of these do you need?" — chips: On "Contact form" · On "Click-to-call button" · On "WhatsApp button" · On "Online booking" · On "Quote request form" · "Newsletter sign-up" · On "Google Map" · On "Show our Google reviews" · "Instagram or social feed" · On "Blog" · "Online payments" · "Online shop" · "Live chat" · "Client login area" · "Job applications" · "Multiple languages"
  - **Info note** (row gap 10, pad 12/16/12/16, 630×64, w:fill, bg mint, r 14): icon info 16px · T "Included in your Grow package: calendar or booking widget, Google Map and WhatsApp button. Anything ticked that isn’t included is flagged like this before we start." — IBM Plex Sans Medium 13/150%, ink
  - **Conditional · Shown because you ticked Online booking** (630×307): Field Filled "Which booking system do you use or prefer?" = "Calendly" · Textarea Default "Your booking cancellation policy" "We’ll show this on the booking page"
  - Field Default "Do you use a CRM or customer database?" "e.g. HubSpot, a spreadsheet, none"
  - Heading "Do you already have any of these set up?" — chips: "Google Analytics" · "Google Search Console" · "Google Tag Manager" · On "Google Business Profile" · "Meta (Facebook) Pixel" · "Don’t know"
  - Textarea Filled "What would you type into Google to find a business like yours?" = "plumber george, emergency plumber garden route, geyser installation george"
  - Row of 2 textareas: "Which towns, suburbs or regions should we target?" = "George, Wilderness, Mossel Bay, Knysna, Plettenberg Bay" · "Anything else the website must do?" "Anything we haven’t asked"
- **Help rail** — "Features shape both the build and your quote. If you tick something that isn’t in your quote, we’ll talk it through before we start."

### Onboarding — Desktop · Step 10 Domain, hosting & access — node 66:2000 (1440×1981)
- Shell: "8 of 13 sections done" (fill 153); 10 Current
- **Step card** (712×1698): "STEP 10 OF 13" "· about 5 min" · "Domain, hosting and access" · "Where your domain, website and email live today, and who can log in."
  - **Warning note** (row gap 10, pad 12/16/12/16, 630×64, w:fill, bg blush, r 14): icon lock 16px · T "Never type passwords here. After you send the brief, we’ll email you a secure way to give us access to the accounts you tick below." — IBM Plex Sans Medium 13/150%, ink
  - Field Filled "Your domain name(s)" = "mokoenaplumbing.co.za", hint "Add every domain you own, separated by commas."
  - Row: select "Where is your domain registered?" = "Domains.co.za" hint "Choose from the list, or “Don’t know”." · select "Where is your current website hosted?" = "Afrihost" hint "Choose from the list."
  - Heading "Who can log in to manage your domain?" — 2×2 radio cards: "Me or someone in my business" · Selected "Our previous web developer" · "Our IT company" · "I don’t know" / "We’ll help you find out"
  - Row: "What is your current website built with?" = "WordPress" · "Who provides your business email?" = "Google Workspace (Gmail)"
  - Textarea Filled "Previous developer’s name and contact details, if we need a handover" = "Jaco at Coastal Web, jaco@coastalweb.co.za"
  - Heading "Who will update the website after launch?" — 2×2 radio cards: "Me" · Selected "Someone on my team" · "GoodGround" / "On a Care Plan or Full Service" · "It will rarely need updating"
  - **Conditional** (630×181) info line "How comfortable is that person with editing websites? (shown because someone on your team will update it)" · row of 3 radio cards: "Very comfortable" · Selected "Some experience" · "Beginner"
  - Heading "Which of these can you give us access to?" + "We’ll send step-by-step instructions for each." — chips: On "Domain / DNS" · On "Hosting account" · On "Current website admin" · On "Google Business Profile" · "Google Search Console" · "Google Analytics" · On "Facebook and Instagram business accounts" · "I’ll need help with all of this"
- **Help rail** — "A smooth move to your new site depends on getting into the right accounts. We only ask who has access here; the actual access happens later, securely."

### Onboarding — Desktop · Step 11 Legal & privacy — node 66:2282 (1440×2073)
- Shell: "9 of 13 sections done" (fill 172); 11 Current
- **Step card** (712×1790): "STEP 11 OF 13" "· about 6 min" · "Legal and privacy" · "What your site needs to stay on the right side of POPIA and your industry’s rules."
  - ⧉ Form/Field Kind=Input **State=Error** "Your Information Officer under POPIA: name and email" placeholder "e.g. Thandi Mokoena, thandi@mokoenaplumbing.co.za", error "Required. Usually the owner or managing director."
  - Heading "Is your Information Officer registered with the Information Regulator?" — 3 radio cards: "Yes" · "No" / "We can point you to how" · Selected "Don’t know"
  - Compact dropzone "Existing privacy policy, terms or disclaimers" / "PDF or Word · optional"
  - Field Default "Or a link to them" "https://…"
  - Textarea Filled "What personal information will your website forms collect?" = "Name, phone, email, address and a description of the job."
  - Heading "Will you sell or take payment online?" — 3 radio cards: "Yes" · Selected "No" · "Maybe later"
  - Info note (bg mint, 630×44): "Returns, refunds and delivery questions appear only if you sell online."
  - Textarea Filled "Your booking cancellation policy" = "Cancel at least 2 hours before your slot at no charge.", hint "Shown because you ticked Online booking in Features."
  - Heading "Is your industry regulated?" — chips: "Financial services (FSCA / FAIS)" · "Health (HPCSA or another council)" · "Legal (LPC)" · "Property (PPRA)" · "Alcohol or gambling" · "Education" · On "No, or not sure"
  - Heading "Is the website aimed at children (under 18)?" — 2 radio cards: Selected "No" · "Yes"
  - Heading "Do you send marketing emails or SMSes?" — 3 radio cards: "Yes, only to people who opted in" · "Yes" · Selected "Not yet"
- **Help rail** — "Why we ask" (180 tall): "South African law (POPIA) requires a named Information Officer and a privacy policy for any site that collects personal information, which every contact form does."

### Onboarding — Desktop · Step 12 Anything else — node 66:2547 (1440×1388)
- Shell: "10 of 13 sections done" (fill 191); 12 Current
- **Step card** (712×1105): "STEP 12 OF 13" "· about 4 min" · "Anything else" · "The last few things that help the project run smoothly."
  - Textarea Filled "Important dates during the project" = "Closed 23 Dec – 3 Jan. Trade show in Cape Town, 10–12 March."
  - Textarea Filled "Anything you’re worried about with this project?" = "That it takes too much of our time to get the content together."
  - Textarea Filled "What went well or badly with past websites or agencies?" = "Our last developer stopped answering after launch, and we couldn’t update anything ourselves."
  - Textarea Default "Anything else we should know?" "Anything at all"
  - Compact dropzone "Any other files you’d like to share" / "Optional · max 50 MB each"
  - File row Done "vehicle-wrap-design.pdf" "2.4 MB · uploaded"
  - Info note (bg mint): "Next: review everything, see what’s missing, and send. You can still send with gaps."
- **Step footer** — on this step the primary button reads ⧉ Button Style=Coral "Save and review" (198×52)
- **Help rail** — "This is where the useful surprises come out: a busy season, a past bad experience, a file you forgot. Nothing is too small."



---

# Utility pages: /thanks and 404

| | |
|---|---|
| **URL** | `/thanks?form=start-project|contact|onboarding · any unknown path (404)` |
| **Figma page** | `100:158` |
| **Desktop frame (1440)** | /thanks 100:159 · 404 100:290 |
| **Mobile frame (390)** | /thanks 100:227 · 404 100:338 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- /thanks is noindex and not in the sitemap. Name and email come from the server session only.
- 404 must return HTTP 404.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Note · Thank-you page (fallback + conversion URL) — node 101:186
UTILITY · /thanks
Why it exists
Start project, Contact and Onboarding already have inline success states (designed on their pages), and those stay the main experience. This page is the server-side fallback: if JavaScript fails or is off, the form posts normally and the server redirects here. It also gives Google Ads / Analytics a clean conversion URL.
URL + variants
/thanks?form=start-project (shown) · /thanks?form=contact → tag "MESSAGE SENT", H1 "THANKS, {NAME}. MESSAGE RECEIVED.", step 3 becomes "We take it from there" · /thanks?form=onboarding → tag "ONBOARDING COMPLETE", step 3 "We start your build". Unknown or missing form → start-project copy without the name.
Data
Name and email are read from the server session for this one request only. Never put them in the URL (privacy rule). If missing, H1 is "THANKS. WE’VE GOT IT." and the email line becomes "A copy is on its way to your inbox."
Copy consistency
Reply time is "1–2 business days" everywhere (matches Start project + Contact). Industry page CTA line updated to match.
Motion
Badge: mint ring scales 0.6→1 (ease/back, 400ms), check draws in (stroke-dashoffset, 500ms). H1 LINE MASK. Step cards STAGGER 120ms. Focus moves to the H1 on load.
SEO
noindex, nofollow. Not in the sitemap.
Links
See our work → /work · How we work → /process.

### Note · Not-found page — node 101:203
UTILITY · 404
Look
Dark plumDeep page with the dark header variant (white logo pill + white menu pill). Big Oswald line "THIS ISN’T GOOD GROUND." and a glass card with a gradient "404" and five popular pages.
Behaviour
Returns real HTTP 404 status (not a 200 page). noindex. Old live URLs that changed must 301 to their new home first (keep a redirects list in the repo), so visitors only land here for truly broken links.
Links
Back to home → / · Start your project → /start-project?ref=404 · Services → /services · Our work → /work · Pricing → /pricing · Insights → /insights · Contact → /contact.
Motion
H1 LINE MASK. The gradient in "404" drifts slowly (background-position 0→100%, 12s, alternate; off with Pause motion / reduced motion). Popular rows STAGGER 50ms; hover = row background 6%→12% white, chevron moves 3px right.
Analytics
Fire page_not_found {path, referrer} so broken links can be found and redirected.

> Build notes:
> - "Thandi" and thandi@example.co.za are sample data. Render the real name and email from the server session only.
> - Step 3 copy for the contact and onboarding variants: only the titles are given in the note. Keep the label and body of the start-project version unless the user supplies new copy, and flag it.
> - "404" text uses the gradient as a text fill: `background: <gradient>; background-clip: text; color: transparent; background-size: 200% 100%`.

## Layer-by-layer spec

### Thank you — Desktop (1440) · /thanks?form=start-project — node 100:159 (1440×1247)
- **Thank you — Desktop** (col, 1440×1247, bg canvas)
  - **00 · Header** (row, pad 28/40/28/40, align space_between/center, 1440×107): logo pill (pad 10/20/10/20, 167×51, bg ink, r 99) · breadcrumb pill (row, pad 12/20/12/20, 226×44, bg surface, r 99, border line 1) T "START YOUR PROJECT  /  RECEIVED" — Oswald Medium 12 ls 6%, ink · MENU pill (row gap 8, pad 10/16/10/16, 94×44, bg ink, r 99)
  - **01 · Confirmation** (col gap 32, pad 48/120/96/120, align center, 1440×1016, w:fill)
    - **Frame** (col gap 24, align center (horizontal), 1200 wide)
      - **Success badge (animated)** (96×96, bg mint, r 999) → inner (64×64, bg coral, r 999) → icon check 32px (surface stroke)
      - ⧉ Tag Tone=Coral "BRIEF RECEIVED"
      - T "THANKS, THANDI. WE’VE GOT IT." — Oswald Medium 104/92%, ink, centred
      - T "Your project details are with us. A copy is on its way to thandi@example.co.za, so you have a record of what you sent." — IBM Plex Sans Regular 19/155%, muted, centred (max ~760px)
    - **What happens next** (row gap 16, 1200×242): 3 cards (col gap 14, pad 28, ~390×242, w:fill, h:fill, grow, r 28): **Frame** (row gap 12, align center): chip (44×44, r 12) → icon 22px + T "0n" — Oswald Medium 28, coral · **Frame** (col gap 6): T label — Oswald Medium 11 ls 8%, muted · T title — IBM Plex Sans SemiBold 22 ls -1%, ink · T body — IBM Plex Sans Regular 15/150%, muted
      - bg surface + border line 1, chip coral, icon mail: "NOW" / "Check your inbox" / "An automatic confirmation with a summary of your brief. Check spam if it isn’t there in a few minutes."
      - bg lilac, chip surface, icon chat: "WITHIN 1–2 BUSINESS DAYS" / "We reply personally" / "A real person reads your brief and replies with questions or a time to talk."
      - bg blush, chip surface, icon doc: "AFTER A SHORT CALL" / "You get a fixed-price quote" / "One clear price and timeline, with the 50/50 or 12-month payment option."
    - **Meanwhile** (row gap 32, pad 32/32/32/40, align center, 1200×118, bg gradient(#3B1A4A 0%, #9A3348 40%, #C9583D 70%, #5A1E3C 100%), r 32)
      - **Frame** (col gap 6, grow): T "WHILE YOU WAIT" — Oswald Medium 12 ls 8%, peach · T "See what we’ve built, or how a project runs from brief to launch." — IBM Plex Sans SemiBold 24/125% ls -1%, surface
      - **Frame** (row gap 10): ⧉ Button Style=Light "See our work" (176×52) · ghost pill (row, pad 14/20/14/20, 134×48, bg #FFFFFF @14%, r 99) T "How we work" — IBM Plex Sans SemiBold 15, surface
  - **Footer** — simplified here; use the shared desktop footer.

### Thank you — Mobile (390) — node 100:227 (390×1277)
- **Thank you — Mobile** (col, 390×1277, bg canvas)
  - **00 · Header** — shared mobile header (ink pills)
  - **01 · Confirmation** (col gap 20, pad 24/20/48/20, w:fill) — left-aligned on mobile
    - **Frame** (col gap 16): badge (72×72 mint → 48×48 coral → check 24px) · ⧉ Tag Tone=Coral "BRIEF RECEIVED" · T "THANKS, THANDI. WE’VE GOT IT." — Oswald Medium 52/92%, ink · T (same body) — IBM Plex Sans Regular 16/155%, muted
    - **What happens next** (col gap 10): 3 rows (row gap 14, pad 16, w:fill, r 20; same bg/chip colours as desktop): chip (40×40, r 12) → icon 20px (no number on mobile) · **Frame** (col gap 6, grow): T label — Oswald Medium 11 ls 8%, muted · T title — IBM Plex Sans SemiBold 16 ls -1%, ink · T body — IBM Plex Sans Regular 13/150%, muted — same three steps
    - **Meanwhile** (col gap 14, pad 24/20/24/20, 350×244, w:fill, gradient, r 24): T "WHILE YOU WAIT" — Oswald Medium 12 ls 8%, peach · T (same) — IBM Plex Sans SemiBold 19/125% ls -1%, surface · ⧉ Button Style=Light "See our work" (w:fill) · ghost pill "How we work" (w:fill, 48 tall, centred)
  - **Footer** — shared mobile footer

### 404 — Desktop (1440) — node 100:290 (1440×824)
- **404 — Desktop** (col, 1440×824, bg plumDeep)
  - **00 · Header (dark variant)** (row, pad 28/40/28/40, align space_between/center, 1440×103): logo pill (pad 8/16/8/16, 159×47, bg surface, r 99) T "goodground" — IBM Plex Sans SemiBold 24 ls -3%, ink · MENU pill (row gap 8, pad 10/16/10/16, 89×41, bg surface, r 99) T "MENU" — Oswald SemiBold 14 ls 2%, ink + icon menu 16px
  - **01 · Not found** (row gap 80, pad 72/120/120/120, align center, 1440×721)
    - **Frame** (col gap 24, 680 wide, grow): ⧉ Tag Tone=OnDark "ERROR 404" · T "THIS ISN’T GOOD GROUND." — Oswald Medium 112/92%, surface · T "The page you’re looking for has moved, or never existed. Nothing to build on here, but the rest of the site is solid." — IBM Plex Sans Regular 19/155%, onDarkMuted · **Frame** (row gap 12): ⧉ Button Style=Coral "Back to home" (179×52) · ⧉ Button Style=Light "Start your project" (206×52)
    - **Popular pages** (col gap 12, pad 24, 440×529, bg #FFFFFF @6%, r 28, border #FFFFFF @12% 1)
      - T "404" — Oswald SemiBold 160/90%, gradient text fill (#3B1A4A → #9A3348 → #C9583D → #5A1E3C)
      - T "POPULAR PAGES" — Oswald Medium 12 ls 8%, peach
      - 5 rows (row, pad 14/12/14/16, align space_between/center, 390×49, w:fill, bg #FFFFFF @6%, r 14): T — IBM Plex Sans Medium 16, surface + icon chev 18px — "Services" · "Our work" · "Pricing" · "Insights" · "Contact"

### 404 — Mobile (390) — node 100:338 (390×1024)
- **404 — Mobile** (col, 390×1024, bg plumDeep)
  - **00 · Header (dark variant)** (row, pad 16, 390×74): logo pill (pad 8/16/8/16, 138×42, bg surface) T "goodground" — IBM Plex Sans SemiBold 20 ls -3%, ink · MENU pill (89×41, bg surface) ink text
  - **01 · Not found** (col gap 28, pad 32/20/56/20)
    - **Frame** (col gap 18): ⧉ Tag Tone=OnDark "ERROR 404" · T "THIS ISN’T GOOD GROUND." — Oswald Medium 56/92%, surface · T (same body) — IBM Plex Sans Regular 16/155%, onDarkMuted · **Frame** (col gap 12): ⧉ Button Coral "Back to home" (w:fill) · ⧉ Button Light "Start your project" (w:fill)
    - **Popular pages** (col gap 12, pad 16, 350×455, w:fill, bg #FFFFFF @6%, r 22, border #FFFFFF @12% 1): T "404" — Oswald SemiBold 96/90%, gradient text · T "POPULAR PAGES" — Oswald Medium 12 ls 8%, peach · same 5 rows (316×49)


