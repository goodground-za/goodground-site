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

