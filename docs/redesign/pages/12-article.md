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

