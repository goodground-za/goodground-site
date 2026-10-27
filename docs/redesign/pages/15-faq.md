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

