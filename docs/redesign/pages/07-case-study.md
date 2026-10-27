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

