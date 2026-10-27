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

