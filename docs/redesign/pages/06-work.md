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

