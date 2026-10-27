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

