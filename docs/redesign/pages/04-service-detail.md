# Service detail template

| | |
|---|---|
| **URL** | `/services/{seo|website-redesign|ux-design|google-ads|meta-ads}` |
| **Figma page** | `95:158` |
| **Desktop frame (1440)** | 95:159 (SEO) |
| **Mobile frame (390)** | 98:201 (SEO) |
| **Extra states / boards** | Page note 99:293 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Only the SEO version is drawn. The other four use the same template with their live copy. Their hero visuals are described in the page note and need sign-off.
- Keep each live SEO title and H1.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Note · Service detail template — /services/{service-slug} — node 99:293
PAGE NOTE · TEMPLATE
Service detail template — /services/{service-slug}
Pages using it
/services/seo (shown) · /services/website-redesign · /services/ux-design · /services/google-ads · /services/meta-ads. Website development stays on /services itself (it is the main service), so it does not get its own detail page.
URL safety
These are the live URLs and are indexed. Keep them, and keep each page’s live SEO title (e.g. "SEO Services for Small Business | South Africa | GoodGround").
Service visual per page (hero card)
SEO: foundations checklist (shown). Website redesign: before/after slider of a page (illustration). UX & design: wireframe → design card that morphs on load. Google Ads: an ad preview card + "calls from ads" style mini chart labelled as illustration. Meta Ads: phone feed with a sponsored post card. Same plum card size and motion pattern for all.
CMS fields
name, slug, seoTitle, metaDescription, h1, intro, keywordChips[], visualType, problems[3] {title, body, short, icon}, included[] {title, body, icon}, approach {bad[3], good[3]}, addOn {title, body, fromPrice, ctaIntent} (optional), relatedArticles[], faqs[], tag (Flagship / Growth / Design / Existing sites).
Structured data
Service JSON-LD (name, provider GoodGround, areaServed ZA, offers.price only when a "from" price exists), FAQPage, BreadcrumbList Home › Services › {name}.
Analytics
service_cta_click {slug, position}, addon_cta_click {slug}, faq_open {slug, index}, related_article_click {slug, article}.

### Note · Hero + foundations card — node 99:229
SECTION 00–01
Layout
Light header, centre pill breadcrumb "SERVICES / {SERVICE}" ("Services" → /services). Left: tag, Oswald H1 (keep the live H1 wording per service), intro (first paragraph of the live copy), keyword chips, buttons. Right: a plum "service visual" card. For SEO it is the foundations checklist. Each service has its own visual (see page note). Mobile: chips scroll sideways, card drops under the buttons and shows 3 rows.
Motion
HEADER REVEAL → tag FADE-UP → H1 LINE MASK (90ms per line) → intro FADE-UP (300ms) → chips STAGGER 40ms → buttons (560ms). Card rises 48px + fades (motion/xl, delay 300). Rows build top to bottom (80ms stagger); each coral tick pops in after its row (scale 0→1, ease/back, 240ms).
Links
Start your project → /start-project?ref=service-seo. See pricing → /pricing. Keyword chips are labels, not links.
Reduced motion
Final state, 200ms opacity fade only.

### Note · Problems — node 99:240
SECTION 02
Content
Exactly 3 problems per service from the CMS (live copy). Number in Oswald coral + icon chip.
Motion
Header FADE-UP; cards STAGGER GRID 120ms. The number wipes up from a mask (LINE MASK, motion/md).
Mobile
Stacked rows, number left of the text, descriptions shortened (CMS field problems[].short).

### Note · What’s included — node 99:249
SECTION 03
Content
The live list (9 items for SEO; count varies per service, lay out in 3 columns, last row left-aligned). "See it alongside every other service" → /services#compare (comparison table on the Services page).
Motion
STAGGER GRID 50ms, row by row. Icon chips use the tint rotation mint → lilac → blush.
Mobile
Simple list with mint ticks. First 5 visible, then a "Show all 9" row that expands the rest (height animates grid-template-rows 0fr→1fr, motion/md). Label changes to "Show less".

### Note · How we do it + add-on band — node 99:258
SECTION 04
Content
Dark band. Two columns built from the long live paragraph: "Bolted on after launch" (muted, x icons) vs "Built in from day one" (white card, mint ticks). Then the coral add-on band: "Advanced SEO and site speed optimisation, as standalone add-ons", from R3,000, confirmed in a quote (live price, keep the "from" and "confirmed in a quote" wording).
Links
"Ask for an SEO audit" → /start-project?intent=seo-audit&ref=service-seo.
Motion
Left column FADE-UP, then the white card slides in from 32px right (motion/lg, ease/out). Ticks draw in (stroke-dashoffset, 200ms, 80ms stagger). Add-on band FADE-UP; price does not COUNT-UP (it is a "from" price, keep it calm).
Per service
Not every service has an add-on. Hide the band when service.addOn is empty.

### Note · Related reading — node 99:269
SECTION 05
Content
1 article (or up to 2) tagged with this service in the CMS; uses the Article cover component. Hide the section if none. Live SEO example → /insights/biggest-website-mistakes-south-african-smes-make.
Motion
LINKED CARD (whole card is one link; hover lift -4px, cover zooms 1.03 over motion/md).

### Note · Service FAQ — node 99:276
SECTION 06
Behaviour
Same accordion as everywhere: one open at a time, first open by default, numbered questions. FAQPage JSON-LD from the same data. "All FAQs" → /faq.

### Note · Pairs well with — node 99:281
SECTION 07
Content
All other services except the current one, Website development first (plum). Links: Website development → /services#website-development (it lives on the Services page), Website redesign → /services/website-redesign, UX & design → /services/ux-design, SEO → /services/seo, Google Ads → /services/google-ads, Meta Ads → /services/meta-ads.
Motion
STAGGER 60ms. Hover: card lifts, arrow chip turns coral and rotates 45°. Mobile: list rows with chevrons.

### Note · CTA + footer — node 99:288
SECTION 08–09
Shared gradient CTA card and footer. Start your project → /start-project?ref=service-{slug}.

### Note · Mobile differences — node 99:308
MOBILE
Changes
Hero visual shows 3 rows. Problems shortened. Included list collapses after 5 with "Show all". Approach shows only the "Built in" card. Add-on band stacks with full-width button. Related article loses its cover image. Other services become rows with chevrons.
Touch
All tap targets at least 44px; no hover-only content.

> Build notes:
> - FAQ answers 02–05 are not drawn. Take them from the live /services/seo page.
> - The hero visuals for redesign, UX, Google Ads and Meta Ads are described in the page note only. Build them in the same 440×506 plum card shell (pad 28, r 32, peach Oswald 13 kicker + mint pill, SemiBold 26 title) and show them to the user for sign-off before shipping.
> - "Pairs well with" excludes the current service. On the SEO page that means 5 cards (Website development, Website redesign, UX & design, Google Ads, Meta Ads).

## Layer-by-layer spec

### Service — Desktop (1440) · SEO — node 95:159 (1440×5767)
- **Service — Desktop (1440) · SEO** (col, 1440×5767, bg canvas)
  - **00 · Site header (light variant)** (row, pad 28/40/28/40, align space_between/center, 1440×107): logo pill (row, pad 10/20/10/20, 167×51, bg ink, r 999) T "goodground" — IBM Plex Sans SemiBold 24 ls -3%, surface · breadcrumb pill (row, pad 12/20/12/20, 132×44, bg surface, r 999, border line 1) T "SERVICES  /  SEO" — Oswald Medium 12 ls 6%, ink · MENU pill (row gap 10, pad 10/20/10/20, 106×44, bg ink, r 999) T "MENU" — Oswald SemiBold 16 ls 2%, surface + icon menu 18px
  - **01 · Hero + foundations card** (col gap 48, pad 48/120/120/120, 1440×792, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×624)
      - **Frame** (col gap 24, 696 wide, w:fill, grow)
        - ⧉ Tag Tone=Coral "WHAT WE DO"
        - T "SEO SERVICES FOR SMALL BUSINESSES ACROSS SOUTH AFRICA." — Oswald Medium 88/92%, ink
        - T "A gorgeous website nobody can find on Google isn’t an investment. It’s a cost. Every GoodGround site is built on solid technical SEO from day one: fast load times, proper page structure, and content built around how your customers actually search." — IBM Plex Sans Regular 18/155%, muted
        - **Keyword chips** (row gap 8): chips (row, pad 8/14/8/14, bg surface, r 99, border line 1) T — IBM Plex Sans Medium 14, ink — "Local SEO" · "Technical SEO" · "SEO for small business" · "Local SEO South Africa"
        - **Frame** (row gap 12): ⧉ Button Style=Coral "Start your project" (206×52) · ⧉ Button Style=Outline "See pricing" (164×54)
      - **Visual · SEO foundations checklist (illustration)** (col gap 14, pad 28, 440×506, bg plum, r 32, shadow 0 40 70 #2E1747@30%)
        - **Frame** (row, align space_between/center): T "SEO FOUNDATIONS" — Oswald Medium 13 ls 8%, peach · pill (row, pad 5/10/5/10, bg mint, r 99) T "Included in every build" — IBM Plex Sans SemiBold 11, ink
        - T "Built in from the first line of code." — IBM Plex Sans SemiBold 26/118% ls -1%, surface
        - 5 rows (row gap 12, pad 12/14/12/14, align center, 384×56, w:fill, bg #FFFFFF @7%, r 16): **Frame** (32×32, bg plumDeep, r 10) → icon 16px · T — IBM Plex Sans Medium 15, surface (grow) · tick (24×24, bg coral, r 999) → icon check 12px
          - bolt "Fast load times" · layers "Page structure Google can read" · pin "Local SEO, town by town" · chart "Analytics + Search Console" · code "Schema markup"
  - **02 · Problems** (col gap 48, pad 120, 1440×747, w:fill, bg surface)
    - **Section header** (row, align space_between/max (bottom)): **Frame** (col gap 20, 760 wide): ⧉ Tag Tone=Neutral "WHY IT MATTERS" · T "Most SEO problems aren’t exotic." — IBM Plex Sans SemiBold 56/106% ls -3%, ink — side T "They’re ordinary things done wrong or skipped entirely. Fixing the ordinary things properly does more for most small businesses than any exotic tactic." — IBM Plex Sans Regular 17/155%, muted
    - **Frame** (row gap 20): 3 cards (col gap 14, pad 28, 387×289, w:fill, h:fill, grow, bg canvas, r 28): **Frame** (row, align space_between/center): T "0n" — Oswald Medium 40, coral + chip (44×44, bg surface, r 12) → icon 22px · T title — IBM Plex Sans SemiBold 22/122% ls -1%, ink · T body — IBM Plex Sans Regular 15/155%, muted
      - 01 search "The site is invisible for the exact searches that matter" / "A business with no local SEO can lose the customer to a competitor with a worse product and a better-structured website, simply because Google could read one site and not the other."
      - 02 bolt "Technical debt quietly caps how high you can rank" / "Slow load times and messy page structure hold a site back no matter how good the content is. No amount of extra content fixes a technical ceiling."
      - 03 layers "SEO gets bolted on after launch, badly" / "A site built first and optimised later usually needs a second project just to fix what should have been right from the start."
  - **03 · What’s included** (col gap 48, pad 120, 1440×853, w:fill, bg canvas)
    - **Section header** (row, align space_between/max): **Frame** (col gap 20, 720 wide): ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Nine things every GoodGround site gets right." — IBM Plex Sans SemiBold 56/106% ls -3%, ink — link (row gap 8): T "See it alongside every other service" — IBM Plex Sans SemiBold 15, ink + icon arrowUR 16px
    - **Included grid 3×3** (col gap 16; rows row gap 16): cards (row gap 16, pad 24, 389×121, w:fill, h:fill, grow, bg surface, r 24, border line 1): chip (44×44, r 12) → icon 22px · **Frame** (col gap 6, grow): T — IBM Plex Sans SemiBold 18 ls -1%, ink + T — IBM Plex Sans Regular 14/150%, muted
      - Row 1: mint bolt "Fast load times" / "Built in from the first line of code, not optimised in afterward." · lilac layers "Readable page structure" / "Proper headings search engines can actually read." · blush pin "Local SEO" / "For South African search, town by town."
      - Row 2: lilac users "Content around real searches" / "How your customers search, not how you’d describe the business internally." · blush chart "Analytics + Search Console" / "Set up correctly from launch." · mint link "Clean URLs + XML sitemap" / "So Google can find and understand every page."
      - Row 3: blush code "Structured data" / "Schema that describes your business correctly to search engines." · mint image "Alt text + compression" / "Pages stay fast and accessible without losing useful context." · lilac share "Internal linking" / "Authority and relevance flow through the site."
  - **04 · Built in, not bolted on** (col gap 48, pad 120, 1440×928, w:fill, bg plumDeep)
    - **Section header**: **Frame** (col gap 20, 820 wide): ⧉ Tag Tone=OnDark "HOW WE DO IT" · T "The same people who build the site think about how it ranks." — IBM Plex Sans SemiBold 56/106% ls -3%, surface
    - **Frame** (row gap 20)
      - **Bolted on** (col gap 14, pad 32, 591×233, w:fill, h:fill, grow, bg #FFFFFF @6%, r 28, border #FFFFFF @14% 1): T "BOLTED ON AFTER LAUNCH" — Oswald Medium 14 ls 8%, onDarkMuted · rows (row gap 12): chip (28×28, bg #FFFFFF @10%, r 999) icon x 14px + T — IBM Plex Sans Regular 16/150%, onDarkMuted — "A developer who doesn’t understand your site applies a generic checklist" · "Structure gets fixed after Google has already indexed it" · "Changing it means starting the ranking clock over"
      - **Built in** (col gap 14, pad 32, 589×233, w:fill, h:fill, grow, bg surface, r 28): T "BUILT IN FROM DAY ONE" — Oswald Medium 14 ls 8%, coral · rows (row gap 12): chip (28×28, bg mint, r 999) icon check 14px + T — IBM Plex Sans Regular 16/150%, ink — "SEO decisions get made during the build, when they’re cheapest" · "Every recommendation is grounded in how the site is actually built" · "No second project needed to fix what should have been right"
    - **Add-on band** (row gap 32, pad 28/32/28/40, align center, 1200×191, w:fill, bg coral, r 28)
      - **Frame** (col gap 6, w:fill, grow): T "ALREADY HAVE A SITE?" — Oswald Medium 13 ls 8%, surface · T "Advanced SEO and site speed optimisation, as standalone add-ons." — IBM Plex Sans SemiBold 24/120% ls -1%, surface · T "Keyword research, schema markup and meta strategy. We audit the site first, so the quote reflects what it actually needs." — IBM Plex Sans Regular 15/150%, surface
      - **Price** (col gap 2): T "FROM" — Oswald Medium 12 ls 8%, surface · T "R3,000" — Oswald Medium 56/100%, surface · T "confirmed in a quote" — IBM Plex Sans Regular 12, surface
      - ⧉ Button Style=Light "Ask for an SEO audit" (226×52)
  - **05 · Related reading** (col gap 48, pad 120/120/60/120, 1440×502, w:fill, bg canvas)
    - **Frame** (row gap 56, align center)
      - **Frame** (col gap 16, 420 wide): ⧉ Tag Tone=Neutral "RELATED READING" · T "Before you spend a rand on SEO, read this." — IBM Plex Sans SemiBold 40/110% ls -2%, ink · ⧉ Button Style=Outline "All insights"
      - **Article card (LINKED CARD)** (row, 724×322, w:fill, grow, bg surface, r 28, border line 1, clip)
        - ⧉ Article cover Topic=Websites "WEBSITES" (300×320)
        - **Frame** (col gap 12, pad 32, align center (vertical), w:fill, h:fill, grow): ⧉ Tag Tone=Plum "WEBSITES" · T "The biggest website mistakes South African SMEs make (and how to fix them)" — IBM Plex Sans SemiBold 22/125% ls -1%, ink · T "Most small business websites don’t fail because they look bad. They fail for duller reasons: nobody can find them, they’re slow on a phone, and they never ask anyone to do anything." — IBM Plex Sans Regular 14/155%, muted · link (row gap 8): T "Read the article" — IBM Plex Sans SemiBold 14, ink + icon arrowUR 16px
  - **06 · Service FAQ** (col gap 48, pad 60/120/120/120, 1440×788, w:fill, bg canvas)
    - **Frame** (row gap 80)
      - **Frame** (col gap 20, 420 wide): ⧉ Tag Tone=Neutral "FAQ" · T "Questions about SEO." — IBM Plex Sans SemiBold 48/106% ls -3%, ink · T "More answers on the FAQ page." — IBM Plex Sans Regular 16, muted · ⧉ Button Style=Outline "All FAQs"
      - **Accordion** (col gap 12, 700 wide, grow) — numbered variant on a canvas section: items (col gap 12, pad 24/28/24/28, w:fill, r 22): **Frame** (row gap 16, align center): T "0n" — Oswald Medium 18, coral · T question — IBM Plex Sans SemiBold 19 ls -1% (grow) · chip 36×36 r 999 → icon 18px
        - Open (bg lilac, question plum, chip plum + minus): 01 "Do you offer SEO as a standalone service, or only with a new website?" — answer "SEO foundations come standard with every website we build. If you already have a site, Advanced SEO and site speed optimisation are available as standalone add-ons, from R3,000 and confirmed in a quote. We audit the existing site first so the quote reflects what it actually needs." — IBM Plex Sans Regular 16/155%, muted
        - Closed (bg surface, question ink, chip canvas + plus): 02 "How long does SEO take to show results?" · 03 "Do you do local SEO for my town specifically?" · 04 "What’s the difference between SEO foundations and Advanced SEO?" · 05 "Can you fix SEO on a site you didn’t build?"
  - **07 · Other services** (col gap 48, pad 96/120/96/120, 1440×446, w:fill, bg surface)
    - **Frame** (row, align space_between/center): T "Pairs well with" — IBM Plex Sans SemiBold 40 ls -2%, ink · ⧉ Button Style=Outline "View every service"
    - **Frame** (row gap 16): 5 cards (col gap 28, pad 22, 227×152, w:fill, h:fill, grow, r 22): **Frame** (row, align space_between/center): T tag — Oswald Medium 11 ls 8% + arrow chip (32×32, r 999) → icon arrowUR 16px · T name — IBM Plex Sans SemiBold 20/120% ls -1%
      - bg plum, tag peach, chip coral, name surface: "FLAGSHIP" / "Website development"
      - bg canvas, tag muted, chip surface, name ink: "EXISTING SITES" / "Website redesign" · "DESIGN" / "UX & design" · "GROWTH" / "Google Ads" · "GROWTH" / "Meta Ads"
  - **08 · CTA** (col gap 48, pad 0/120/40/120, 1440×480, w:fill, bg surface)
    - **Gradient CTA card** (col gap 28, pad 96/80/96/80, align center, 1200×440, w:fill, bg gradient(#3B1A4A 0%, #9A3348 40%, #C9583D 70%, #5A1E3C 100%), r 40): ⧉ Tag Tone=OnDark "GET IN TOUCH" · T "GROWTH STARTS HERE." — Oswald Medium 120/92%, surface · **Frame** (row gap 12): ⧉ Button Style=Light "Start your project" + email pill (row gap 8, pad 14/20/14/20, bg #FFFFFF @12%, r 99) icon mail 18px + T "hello@goodground.co.za" — IBM Plex Sans Medium 16, surface
  - **09 · Footer** — simplified one-row footer in this frame; build the shared desktop footer (see README).

### Service — Mobile (390) · SEO — node 98:201 (390×5082)
- **Service — Mobile (390) · SEO** (col, 390×5082, bg canvas)
  - **00 · Header** — shared mobile header (logo pill 138×42 + MENU pill 89×41, pad 16)
  - **01 · Hero** (col gap 20, pad 16/20/48/20, 390×976, w:fill, bg canvas)
    - **Breadcrumb** (row gap 6): T "Services  /" — IBM Plex Sans Regular 12, muted · T "SEO" — IBM Plex Sans Medium 12, ink
    - ⧉ Tag Tone=Coral "WHAT WE DO"
    - T "SEO SERVICES FOR SMALL BUSINESSES ACROSS SOUTH AFRICA." — Oswald Medium 48/94%, ink
    - T "A gorgeous website nobody can find on Google isn’t an investment. It’s a cost. Every GoodGround site is built on solid technical SEO from day one." — IBM Plex Sans Regular 16/155%, muted
    - **Keyword chips (h-scroll)** (row gap 8, clip): (pad 7/12/7/12) T — IBM Plex Sans Medium 13 — "Local SEO" · "Technical SEO" · "SEO for small business" (+ the 4th scrolls in)
    - ⧉ Button Style=Coral "Start your project" (w:fill) · ⧉ Button Style=Outline "See pricing" (w:fill)
    - **Foundations card (compact)** (col gap 10, pad 20/18/20/18, 350×262, w:fill, bg plum, r 24): T "SEO FOUNDATIONS · INCLUDED" — Oswald Medium 11 ls 8%, peach · T "Built in from the first line of code." — IBM Plex Sans SemiBold 20/110% ls -2%, surface · 3 rows (row gap 10, pad 10/12/10/12, 48 tall, bg #FFFFFF @7%, r 14): chip 28×28 plumDeep r 8 → icon 14px · T — IBM Plex Sans Medium 14, surface · tick 22×22 coral → check 11px — "Fast load times" · "Readable page structure" · "Local SEO, town by town"
  - **02 · Problems** (col gap 12, pad 64/20/64/20, 390×644, bg surface)
    - ⧉ Tag Tone=Neutral "WHY IT MATTERS" · T "Most SEO problems aren’t exotic." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - 3 rows (row gap 14, pad 18, 350×122, bg canvas, r 20): T "0n" — Oswald Medium 26, coral · **Frame** (col gap 4, grow): T — IBM Plex Sans SemiBold 16/130%, ink + T — IBM Plex Sans Regular 13/150%, muted
      - "The site is invisible for the searches that matter" / "A competitor with a worse product and a better-structured site gets the customer."
      - "Technical debt caps how high you can rank" / "No amount of extra content fixes a technical ceiling."
      - "SEO gets bolted on after launch, badly" / "Usually a second project just to fix what should have been right."
  - **03 · What’s included** (col gap 10, pad 64/20/64/20, 390×572, bg canvas)
    - ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Nine things every site gets right." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - **Included list** (col, 350 wide, bg surface, r 20, border line 1, clip): rows (row gap 12, pad 14/16/14/16, 54–55 tall, border-top line 1 except first): tick (26×26, bg mint, r 999) icon check 13px + T — IBM Plex Sans Medium 15, ink — "Fast load times" · "Readable page structure" · "Local SEO, town by town" · "Content around real searches" · "Analytics + Search Console" · (4 hidden) · **Show all row** (row gap 6, pad 14/0/14/0, align center/center, 46 tall, bg canvas): T "Show all 9" — IBM Plex Sans SemiBold 14, ink + icon plus 14px
  - **04 · Built in, not bolted on** (col gap 14, pad 64/20/64/20, 390×694, bg plumDeep)
    - ⧉ Tag Tone=OnDark "HOW WE DO IT" · T "The same people who build the site think about how it ranks." — IBM Plex Sans SemiBold 28/110% ls -2%, surface
    - **Built-in card** (col gap 10, pad 18, bg surface, r 20): T "BUILT IN FROM DAY ONE" — Oswald Medium 12 ls 8%, coral · rows (row gap 10): tick 22×22 mint → check 11px + T — IBM Plex Sans Regular 14/145%, ink — "Decisions made during the build, when they’re cheapest" · "Grounded in how the site is actually built" · "No second project to fix it later"
    - **Add-on** (col gap 8, pad 20/18/20/18, bg coral, r 20): T "ALREADY HAVE A SITE?" — Oswald Medium 12 ls 8%, surface · T "Advanced SEO + site speed add-ons" — IBM Plex Sans SemiBold 19/120%, surface · **Frame** (row gap 8, align baseline): T "from" — IBM Plex Sans Regular 13 + T "R3,000" — Oswald Medium 36, surface · ⧉ Button Style=Light "Ask for an SEO audit" (w:fill)
  - **05 · Related reading** (col gap 14, pad 64/20/32/20, bg canvas)
    - ⧉ Tag Tone=Neutral "RELATED READING"
    - **Card** (col gap 10, pad 18, bg surface, r 20, border line 1, no cover): ⧉ Tag Tone=Plum "WEBSITES" · T "The biggest website mistakes South African SMEs make (and how to fix them)" — IBM Plex Sans SemiBold 18/128%, ink · link T "Read the article" — IBM Plex Sans SemiBold 13 + icon arrowUR 14px
  - **06 · FAQ** (col gap 10, pad 32/20/64/20, bg canvas)
    - ⧉ Tag Tone=Neutral "FAQ" · T "Questions about SEO." — IBM Plex Sans SemiBold 32/110% ls -2%, ink
    - Items (col gap 10, pad 18, r 18): **Frame** (row gap 12): T — IBM Plex Sans SemiBold 15/135% + chip 30×30 → icon 15px (no numbers on mobile)
      - Open (lilac, plum, chip plum minus): "Do you offer SEO as a standalone service, or only with a new website?" — "SEO foundations come standard with every build. For existing sites, Advanced SEO and speed optimisation are add-ons from R3,000, confirmed in a quote." — IBM Plex Sans Regular 14/155%, muted
      - Closed (surface, ink, chip canvas plus): "How long does SEO take to show results?" · "Do you do local SEO for my town specifically?" · "What’s the difference between foundations and Advanced SEO?" · "Can you fix SEO on a site you didn’t build?"
    - ⧉ Button Style=Outline "All FAQs" (w:fill)
  - **07 · Other services** (col gap 10, pad 56/20/56/20, bg surface)
    - T "Pairs well with" — IBM Plex Sans SemiBold 26/110% ls -2%, ink
    - Rows (row, pad 16/14/16/18, align space_between/center, 350×52, bg canvas, r 16): T — IBM Plex Sans Medium 15, ink + icon chev 18px — "Website development" · "Website redesign" · "UX & design" · "Google Ads" · "Meta Ads"
  - **08 · CTA** (col gap 20, pad 0/20/24/20, bg surface)
    - **Gradient card** (col gap 18, pad 48/24/48/24, 350×445, r 28, same gradient): ⧉ Tag Tone=OnDark "GET IN TOUCH" · T "GROWTH STARTS HERE." — Oswald Medium 60/92%, surface · ⧉ Button Style=Light "Start your project" (w:fill) · email pill (pad 14/0/14/0, w:fill, bg #FFFFFF @12%, r 99) icon mail 16px + T "hello@goodground.co.za" — IBM Plex Sans Medium 15, surface
  - **09 · Footer** — simplified here; build the shared mobile footer.

