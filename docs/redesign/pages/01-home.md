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

