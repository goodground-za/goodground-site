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
