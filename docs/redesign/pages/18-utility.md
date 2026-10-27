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

