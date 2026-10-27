# Pricing

| | |
|---|---|
| **URL** | `/pricing` |
| **Figma page** | `50:150` |
| **Desktop frame (1440)** | 50:151 |
| **Mobile frame (390)** | 53:206 |
| **Extra states / boards** | Mobile build sheet 53:469 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Build-your-own configurator: prices and totals live in one data file so they change in one place.
- Package links pass ?package=micro|launch|grow|scale to /start-project; Full service passes ?service=full-service&ref=pricing.
- Number format is open item 4.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /pricing page — node 54:225
PAGE · READ FIRST
/pricing: one pricing source, the configurator and the quote form
ONE SOURCE OF TRUTH FOR EVERY PRICE
•  All prices on this page come from one pricing collection in the CMS: packages (name, from price, inclusions, best for, timeline, revisions, recommended flag), Full Service (from price), Launch Offer (monthly, months, total), base build fee and every à la carte item (category, name, price, unit: flat | per item | from).
•  The same collection feeds the /services price labels, the homepage launch offer, and the plan cards and add-on chips inside Insights articles. Change a price once; it updates everywhere.
•  All figures shown are from the live /pricing page. Grow keeps its live “RECOMMENDED” tag.
MONEY FORMATTING & MATHS
•  Format: “R12,000” (comma thousands). The live site uses a space (“R12 000”); pick one site-wide before launch.
•  12-instalment amount = total ÷ 12, rounded up to the nearest rand (R19,400 → R1,617). The final instalment balances the total. Deposit = total ÷ 2.
•  Items priced “from” (custom logo, illustrations, icon set) add their from-price and switch the total label to “From R…”, with a line: “Items marked ‘from’ are confirmed in your quote.”
CONFIGURATOR RULES
•  Base Build Fee (R6,000) is always included and can’t be removed.
•  Flat items use an Add / Added toggle. Per-item items (extra pages, complex pages, blog posts, copywriting, content upload, animations per page, illustrations per page, languages) use a stepper from 0 to 20.
•  Package hint: when the total comes within R3,000 of a package’s from-price (or passes it), suggest the highest such package, with “Compare” jumping to its card. One hint at a time.
•  The build is saved in localStorage and mirrored in the URL (?build=… compact code), so “Edit” from the quote form, refreshes and shared links all restore it.
QUOTE FORM (THIS PAGE)
•  “View & send” scrolls to #quote and attaches the build (chips, total, chosen payment option). “Choose {package}” attaches that package and billing choice the same way. “Edit” returns to the configurator.
•  Submits to the same endpoint as /start-project with formType=pricing-quote plus the build or package payload. Same validation, spam rules, auto-reply (subject “Your quote request is in”), success and failure states.
•  /start-project also accepts ?package=micro|launch|grow|scale for links from elsewhere (e.g. article plan cards).
SEO
•  <title>: “Pricing | Website Design Packages, South Africa | GoodGround” (keep live).
•  JSON-LD: Service with Offers for each package (price, priceCurrency ZAR, “starting from” via priceSpecification minPrice), Full Service as a monthly offer, plus FAQPage and BreadcrumbList.

### Notes · PR 01 Hero — node 54:244
01 · Hero + jump links
BEHAVIOUR
•  Tag FADE-UP → headline LINE MASK → copy and jump links FADE-UP.
•  Jump links smooth-scroll to #ways-to-pay, #packages, #full-service, #build-your-own (120px offset). They are anchors, not tabs.

### Notes · PR 02 Ways to pay — node 54:251
02 · Four ways to pay
ENTRANCE
•  HEADER REVEAL; row labels fade in; the four columns STAGGER GRID 100ms; inside each column the values reveal row by row (40ms stagger). Monthly and total figures COUNT-UP.
INTERACTION
•  Column hover (desktop): ring + others dim to 85% (as on the /services comparison).
•  Real table semantics: columns are the four ways; rows are Upfront, Monthly, How long, Total over 12 months, What you get, At the end.
MOBILE
•  Swipeable cards (scroll-snap, 280px) showing Monthly and Total; “See all details” expands that card to the full six rows (accordion).

### Notes · PR 03 Packages — node 54:264
03 · Packages + billing toggle
BILLING TOGGLE
•  Segmented control: “50% deposit” (default) | “12 monthly instalments”. The ink pill slides (motion/md).
•  Deposit view: big “from R12,000” with “R6,000 deposit + R6,000 on completion” in coral and “or R1,000/mo × 12” muted. Instalment view swaps them: big “R1,000/mo”, small “× 12 · total from R12,000”. Numbers crossfade with a 6px vertical slide (motion/sm); widths are reserved so cards don’t jump.
•  The choice is remembered (localStorage) and carried into “Choose {package}” and the configurator’s payment toggle.
ENTRANCE & HOVER
•  Cards STAGGER GRID 100ms; Grow lands last with scale 0.97 → 1.
•  Hover (desktop): non-recommended cards lift -4px; Grow keeps its lift and adds a soft coral glow (shadow 0 24px 48px coral at 20%).
MOBILE
•  Collapsed cards showing name and price; tap to expand inclusions (accordion, one open). Grow is open by default.

### Notes · PR 04 Full Service — node 54:277
04 · Full Service
BEHAVIOUR
•  Band FADE-UP; inclusion chips STAGGER 50ms; “R1,500” COUNT-UP. Button → /start-project?service=full-service&ref=pricing.

### Notes · PR 05 Configurator — node 54:284
05 · Build-your-own configurator
ADDING & REMOVING
•  Add → Added: the button fills ink, the plus rotates into a check (motion/sm); the row background flashes blush for 600ms.
•  Stepper: − / + change the count (min 0, max 20); holding a button repeats after 400ms. The row turns blush with a coral border when the count is above 0. Keyboard: the value is an input type="number"; arrow keys change it.
•  Category headers show “{n} added · {total} items”. Groups with something added open by default; others start closed.
LIVE SUMMARY (DESKTOP, STICKY TOP 120PX)
•  New line items slide in from the right (12px + fade, motion/sm); removed ones collapse (height to 0, motion/sm). Each has a remove “×”.
•  The total rolls to its new value (COUNT-UP from the old value, 500ms). The payment split updates with it.
•  Payment toggle: 50% deposit shows two tiles (deposit / on completion); 12 instalments shows the monthly figure. Same pill animation as the packages toggle.
•  Package hint slides down when its rule is met and up when it isn’t (motion/md).
•  An aria-live region announces “Total now R19,400”.
MOBILE
•  The summary becomes a sticky total bar fixed to the bottom of the screen (total + monthly figure + “View & send”). It appears once the configurator enters view and hides when the quote form is visible.
•  Tapping the bar opens the “Your build” bottom sheet (state frame beside the mobile page) with line items, payment toggle and “Send this build”. Same sheet behaviour as other sheets (drag, backdrop, Esc, focus trap).
•  Each item row stacks its name above the price and control; controls are at least 44px.

### Notes · PR 06–08 — node 54:297
06 · Review  ·  07 · FAQ  ·  08 · Quote form
06 · REVIEW
•  Card FADE-UP; stars fill in sequence (60ms); the “12 × monthly” bars grow (30ms stagger).
07 · FAQ
•  Same accordion and FAQPage behaviour as elsewhere; first item open.
08 · QUOTE FORM
•  Arriving from “View & send” or “Choose …”: the attached-build card pulses once (coral ring fading over 1.2s) and focus moves to the name field.
•  With nothing attached, the attached card is hidden and the copy reads “or nothing at all and we’ll talk it through”.
•  Field behaviour, sending, success and failure exactly as /start-project Step 4.
MOBILE
•  Form full width; the sticky total bar hides while the form is in view.

### Notes pointer · mobile — node 54:313
MOBILE · PAGE + “YOUR BUILD” SHEET
The sticky total bar sits at the bottom of the screen while the configurator is in view; tapping it opens the sheet on the right. Behaviour is in note 05.

## Layer-by-layer spec

### Pricing — Desktop (1440) — node 50:151 (1440×8195)
- **Pricing — Desktop (1440)** (col, 1440×8195, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "PRICING" (86×44)
  - **01 · Hero** (col gap 48, pad 64/120/56/120, 1440×570, w:fill, bg canvas)
    - **Frame** (col gap 24, 1200×450, w:fill)
      - ⧉ Tag Tone=Coral "PRICING" (68×30)
      - T "SIMPLE PRICING, BUILT AROUND WHAT YOU ACTUALLY NEED." — Oswald Medium 104/92%, ink
      - **Frame** (row gap 48, align space_between/max, 1200×84, w:fill)
        - T "Pick a package, build your own from the menu, or have everything handled for one monthly price. Every price is a real number, and every build gives you a choice of how to pay." — IBM Plex Sans Regular 18/155%, muted
        - **Jump links** (row gap 8, 539×40) — pills (row gap 6, pad 10/14/10/16, align center, r 999): T — IBM Plex Sans Medium 14 · icon down 14px
          - "Ways to pay" (bg ink, text surface) · "Packages" · "Full Service" · "Build your own" (bg surface, border line 1, text ink)
  - **02 · Four ways to pay (comparison)** (col gap 48, pad 120, 1440×1069, w:fill, bg canvas) — id="ways-to-pay"
    - **Section header** (row, align space_between/max, 1200×111, w:fill)
      - **Frame** (col gap 20, 760×111)
        - ⧉ Tag Tone=Neutral "WAYS TO PAY" (94×32)
        - T "Four ways to pay, side by side." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Package and Full Service figures are starting prices. Your quote confirms the real number before work begins, and it doesn’t change once you accept it." — IBM Plex Sans Regular 17/155%, muted
    - **Ways-to-pay comparison** (row gap 12, 1200×670, w:fill)
      - **Row labels** (col, pad 120/0/0/0, 150×670, h:fill) — label cells (row, pad 14/0/0/0, w:fill) T — Oswald Medium 12 ls 6%, muted, with heights matching the value rows:
        - "UPFRONT" 56 · "MONTHLY" 56 · "HOW LONG" 96 · "TOTAL OVER 12 MONTHS" 64 · "WHAT YOU GET" 110 · "AT THE END" 80
      - **Way column** (col, pad 20, ~252×670, w:fill, grow, r 24):
        - **Head** (col gap 4, 210×100, w:fill): T name — IBM Plex Sans SemiBold 19/120% ls -1% · T sub — IBM Plex Sans Regular 13/140%
        - **Value cells** (col, pad 14/0/10/0, w:fill, border 1/0/0/0 line — #FFFFFF @15% in the plum column), heights 56/56/96/64/110/80. Text values: IBM Plex Sans Medium 13.5/140%. Money values: Oswald Medium 22.
        - **CTA cell** (col, pad 12/0/0/0, w:fill) → Button
      - Column 1 · **A package, paid by deposit** (bg surface, border line 1, text ink, sub muted): sub "Micro, Launch, Grow or Scale" · Upfront "Half the price, from R6,000" · Monthly "Nothing" (Oswald) · How long "Other half on completion, before handover" · Total "From R12,000" (Oswald) · What you get "The build. Hosting, domain and upkeep arranged separately." · At the end "Paid off. The site is yours." · ⧉ Button Style=Outline "See the packages" (208×54)
      - Column 2 · **A package, in 12 instalments** (bg surface, border line 1): sub "Micro, Launch, Grow or Scale" · "First instalment, from R1,000" · "From R1,000" (Oswald) · "12 payments: the first books your slot, the other 11 start once your site is finished" · "From R12,000" (Oswald) · "The build, with basic maintenance and monitoring while you pay it off." · "Paid off. The site is yours." · ⧉ Button Style=Outline "See the packages"
      - Column 3 · **Full Service** (bg plum, text surface, sub onDarkMuted): sub "One monthly price, everything handled" · "No separate build fee" · "From R1,500" (Oswald) · "Month to month. Cancel any time." · "From R18,000" (Oswald) · "Build, hosting, mailboxes, ongoing SEO, updates and maintenance." · "No end date. It runs for as long as you stay on it." · ⧉ Button Style=Coral "See Full Service" (195×52)
      - Column 4 · **Website Launch Offer** (bg blush, text ink): sub "New businesses without a website. One page." · "No deposit" · "R845" (Oswald, coral) · "12 months" · "R10,140" (Oswald) · "One-page site, SEO setup, and domain, hosting and email for 12 months." · "Yours: we transfer the domain and site, or you move to a Care Plan." · ⧉ Button Style=Outline "See the Launch Offer" (232×54)
  - **03 · Packages (with billing toggle)** (col gap 48, pad 120, 1440×1407, w:fill, bg surface) — id="packages"
    - **Section header** (row, align space_between/max, 1200×170, w:fill)
      - **Frame** (col gap 20, 760×170)
        - ⧉ Tag Tone=Neutral "THE PACKAGES" (103×32)
        - T "Four starting points. Pick the one closest to your brief." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - **Billing toggle** (row gap 4, pad 4, 321×50, bg canvas, r 999)
        - **Option (selected)** (row, pad 12/18/12/18, 119×42, bg ink, r 999) → T "50% deposit" — IBM Plex Sans SemiBold 14, surface
        - **Option** (row, pad 12/18/12/18, 190×42, r 999) → T "12 monthly instalments" — IBM Plex Sans SemiBold 14, ink
    - **Package cards** (row gap 16, 1200×777, w:fill) — 4 cards (col gap 16, pad 24, 288×777, w:fill, grow, r 28):
      - **Name row** (row, align space_between/center, 240×36): T NAME — Oswald Medium 24 ls 4% · optional Tag
      - T "{tagline}" — IBM Plex Sans Regular 14/150%
      - **Price block** (col gap 4, pad 8/0/8/0, w:fill): **Frame** (row gap 6, align baseline): T "from" — IBM Plex Sans Regular 13 + T "{price}" — Oswald Medium 48/100% · T "{deposit split}" — IBM Plex Sans Medium 13 (coral; peach on Grow) · T "{monthly}" — IBM Plex Sans Regular 13
      - Button (240×52, w:fill)
      - rectangle 240×1 (line; #FFFFFF @15% on Grow)
      - **Inclusions** (col gap 10, w:fill): rows (row gap 10, w:fill) icon check 16px + T — IBM Plex Sans Regular 14/140%
      - spacer (grow) so every card's "Best for" box sits at the bottom
      - **Best for** (col gap 6, pad 12/14/12/14, w:fill, r 14): T "Best for: …" — IBM Plex Sans Regular 12.5/145% · **Frame** (row gap 6, align center) icon clock 14px + T timeline — IBM Plex Sans Medium 12.5
    - **Micro** — bg canvas, text ink, muted subcopy · "A sharp, single-page site for a strong first impression." · from R12,000 · "R6,000 deposit + R6,000 on completion" · "or R1,000/mo × 12" · ⧉ Button Style=Primary "Choose Micro"
      - Inclusions: "1 page with distinct scroll sections" · "Fully custom-coded, mobile-responsive" · "Custom micro-interactions" · "Contact section with working form" · "Basic on-page SEO" · "1 round of revisions"
      - Best for (bg surface): "Best for: Solo freelancers, personal brands, pop-ups, events, holding pages" · "~1 week"
    - **Launch** — bg canvas · "A clean, professional website to get you online fast." · from R21,000 · "R10,500 deposit + R10,500 on completion" · "or R1,750/mo × 12" · ⧉ Button Style=Primary "Choose Launch"
      - Inclusions: "Up to 5 pages" · "Fully custom-coded, mobile-responsive" · "Contact form with email notifications" · "Basic on-page SEO" · "Social media links" · "1 round of revisions"
      - Best for: "Best for: New businesses or solo founders who need a credible presence" · "~2 weeks"
    - **Grow** — bg plum, text surface, subcopy onDarkMuted · ⧉ Tag Tone=Coral "RECOMMENDED" (103×30) · "Fully custom, with the interactive touches that make you stand out." · from R32,000 · "R16,000 deposit + R16,000 on completion" (peach) · "or R2,667/mo × 12" · ⧉ Button Style=Coral "Choose Grow"
      - Inclusions: "Up to 10 pages, incl. Blog/News" · "Unique design, no templates" · "Custom interactive elements" · "Forms with conditional logic" · "Integrations: maps, booking, WhatsApp" · "SEO + Analytics & Search Console" · "2 rounds of revisions"
      - Best for (bg #FFFFFF @8%, text surface, timeline peach): "Best for: Small businesses ready to market online and stand out" · "~3–4 weeks"
    - **Scale** — bg canvas · "A fully custom platform built to be your business hub online." · from R45,000 · "R22,500 deposit + R22,500 on completion" · "or R3,750/mo × 12" · ⧉ Button Style=Primary "Choose Scale"
      - Inclusions: "15+ pages, fully custom" · "Advanced functionality: multi-step forms, calculators, APIs" · "Advanced interactive design" · "Advanced SEO + speed optimisation" · "Copywriting guidance for key pages" · "3 rounds of revisions" · "1-hour training session"
      - Best for: "Best for: Businesses that need the site to be a real sales or operations tool" · "~4–6 weeks, priority scheduling"
    - **Starting prices strip** (row gap 24, pad 24/28/24/28, align center, 1200×124, w:fill, bg mint, r 24)
      - **Frame** (col gap 6, 948×76, w:fill, grow)
        - T "These are starting prices, not quotes." — IBM Plex Sans SemiBold 20 ls -1%, ink
        - T "A five-page site for a plumber and one for a law firm rarely take the same work. We look at your project first and come back with a price, usually within a day or two. Once you accept it, that’s the price: nothing gets added at the end. No e-commerce or member-portal builds." — IBM Plex Sans Regular 14/155%, muted
      - ⧉ Button Style=Primary "Get my price" (172×52)
  - **04 · Full Service** (col gap 40, pad 0/120/120/120, 1440×505, w:fill, bg surface) — id="full-service"
    - **Full Service band** (row gap 48, pad 48, align center, 1200×385, w:fill, bg plum, r 32)
      - **Frame** (col gap 16, 696×289, w:fill, grow)
        - ⧉ Tag Tone=OnDark "MONTHLY · CANCEL ANY TIME" (176×30)
        - T "FULL SERVICE" — Oswald Medium 56, surface
        - T "Everything handled, for one monthly price. We build the site, host it, run the mailboxes, and keep it working." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Inclusion chips** (row wrap gap 10, 696×76, w:fill) — chips (row gap 8, pad 8/14/8/12, align center, bg #FFFFFF @8%, r 99): icon check 14px + T — IBM Plex Sans Medium 13, surface
          - "Website build, custom-coded" · "Hosting, managed" · "Business mailboxes, managed" · "Ongoing SEO" · "Updates & maintenance"
      - **Price card** (col gap 12, pad 28, 360×249, bg surface, r 24)
        - **Frame** (row gap 6, align baseline): T "from" — IBM Plex Sans Regular 13, muted · T "R1,500" — Oswald Medium 56/100%, ink · T "/mo" — IBM Plex Sans Regular 16, muted
        - T "Exact monthly price depends on your website’s requirements and is confirmed in your quote. No minimum term." — IBM Plex Sans Regular 13/150%, muted
        - ⧉ Button Style=Coral "Get a Full Service quote" (304×52, w:fill)
  - **05 · Build your own (configurator)** (col gap 40, pad 120, 1440×1934, w:fill, bg canvas) — id="build-your-own"
    - **Frame** (row, align space_between/max, 1200×168, w:fill)
      - **Frame** (col gap 20, 760×168)
        - ⧉ Tag Tone=Coral "BUILD YOUR OWN" (116×30)
        - T "Pick a starting point. Add exactly what you need." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
      - T "Every build starts from the same base. Add what your business needs, watch the total update live, and send it through when you’re ready." — IBM Plex Sans Regular 17/155%, muted
    - **Configurator** (row gap 32, 1200×1486, w:fill)
      - **Item menu** (col gap 12, 748×1486, w:fill, grow)
        - **Base build (always included)** (row gap 16, pad 22/24/22/24, 748×111, w:fill, bg ink, r 22)
          - **Frame** (36×36, bg surface, r 999) → icon lock 18px
          - **Frame** (col gap 4, w:fill, grow): T "Base Build Fee" — IBM Plex Sans SemiBold 18, surface · T "Homepage, fully custom-coded & mobile-responsive, 1 contact form, basic on-page SEO, 1 round of revisions." — IBM Plex Sans Regular 13.5/150%, onDarkMuted
          - T "R6,000" — Oswald Medium 28, surface
        - **Group (accordion)** (col, pad 0/24/0/24, 748 wide, w:fill, bg surface, r 22, border line 1)
          - **Group header** (row gap 12, pad 18/0/18/0, align center, 698×59, w:fill): T "{group}" — IBM Plex Sans SemiBold 18 ls -1%, ink · T "{n added · } {total} items" — IBM Plex Sans Regular 13 (coral when something is added, else muted) · icon chevron 18px
          - **Item row** (row gap 16, pad 14/0/14/0, align center, 698×62–67, w:fill, border line 1/0/0/0): T "{item}" — IBM Plex Sans 15 (Medium ink when selected, Regular ink when not) · T "{price}" — IBM Plex Sans SemiBold 15 (ink when selected, muted when not) · control
          - **Stepper** (row gap 4, pad 4, align center, 102×38, r 999): **Frame** (28×28, r 999) icon minus 14px · value T — IBM Plex Sans SemiBold 14, ink · **Frame** (28×28, bg surface, r 999) icon plus 14px. Count > 0: bg blush, border coral 1, minus button bg surface. Count 0: bg surface, border line 1, minus button bg canvas.
          - **Toggle · added** (row gap 6, pad 8/14/8/12, align center, 86×33, bg ink, r 999): icon check 14px + T "Added" — IBM Plex Sans SemiBold 13, surface
          - **Toggle · add** (row gap 6, pad 8/14/8/12, align center, 73×35, bg surface, r 999, border line 1): icon plus 14px + T "Add" — IBM Plex Sans SemiBold 13, ink
        - Groups shown in the design (open groups list their items):
          - **Pages** — "2 added · 4 items" (open)
            - "Additional standard page (About, Services, Contact…)" · "R2,500 each" · stepper = 2
            - "Complex / custom-layout page" · "R4,000 each" · stepper = 0
            - "Blog / News section setup (template + first post)" · "R4,500" · Added
            - "Additional blog post (written & uploaded)" · "R600 each" · stepper = 0
          - **Design** — "4 items" (closed)
          - **Functionality & interactivity** — "7 items" (closed)
          - **Integrations** — "1 added · 6 items" (open)
            - "Google Maps embed" R700 Add · "WhatsApp chat button" R900 Added · "Calendar / booking widget" R2,000 Add · "Newsletter signup (Mailchimp or similar)" R1,200 Add · "Social media feed embed" R1,000 Add · "Live chat widget" R1,300 Add
          - **SEO & performance** — "1 added · 3 items" (open)
            - "Advanced SEO (keywords, schema, meta strategy)" R3,000 Added · "Site speed optimisation" R2,500 Add · "Google Analytics & Search Console setup" R1,000 Add
          - **Content** — "3 items" (closed)
          - **Extras** — "5 items" (closed)
          - (Closed groups' items come from the live /pricing page's à la carte list.)
        - T "All à la carte prices are per item unless stated. Your free quote confirms the final total before work begins." — IBM Plex Sans Regular 13, muted
      - **Your build (sticky summary)** (col gap 16, pad 28, 420×727, bg surface, r 28, border line 1, shadow 0 20 48 #2E1747@10%) — position sticky top 120
        - **Frame** (row, align space_between/center, 362×29): T "Your build" — IBM Plex Sans SemiBold 22 ls -1%, ink · T "Reset" — IBM Plex Sans Medium 13, coral
        - **Line items** (col gap 10, 362×150, w:fill) — rows (row gap 10, align center, w:fill): T name — IBM Plex Sans Regular 14, ink (w:fill) · T price — IBM Plex Sans SemiBold 14, ink · remove **Frame** (22×22, bg canvas, r 999) → icon x 11px (empty 22×22 slot for the base fee)
          - "Base Build Fee" R6,000 (no remove) · "Additional standard page × 2" R5,000 · "Blog / News section setup" R4,500 · "WhatsApp chat button" R900 · "Advanced SEO" R3,000
        - rectangle 362×1 line
        - **Total** (row, align space_between/baseline, 362×54): T "Total, fixed" — IBM Plex Sans Medium 15, muted · T "R19,400" — Oswald Medium 52/100%, ink
        - **Payment toggle** (row gap 4, pad 4, 362×45, w:fill, bg canvas, r 999): "50% deposit" · "12 instalments" (selected: bg ink, text surface) — IBM Plex Sans SemiBold 13
        - **Split (12 instalments)** (col gap 6, pad 14/16/14/16, 362×132, w:fill, bg blush, r 16)
          - **Frame** (row gap 6, align baseline): T "R1,617" — Oswald Medium 30, coral · T "/mo × 12" — IBM Plex Sans Regular 14, muted
          - T "The first instalment books your slot; the other 11 start once your site is finished. Rounded to the rand; the final instalment balances the total." — IBM Plex Sans Regular 12/150%, muted
        - **Package hint** (row gap 10, pad 12/14/12/14, 362×62, w:fill, bg mint, r 14): icon bulb 18px · T "Close to Launch (from R21,000): up to 5 pages, contact form, basic SEO and social links. Compare →" — IBM Plex Sans Regular 12.5/150%, ink
        - ⧉ Button Style=Coral "View & send" (362×52, w:fill)
        - T "Sends this build with your quote request. Nothing is charged." — IBM Plex Sans Regular 12, muted
  - **06 · From a client** (col gap 40, pad 120, 1440×632, w:fill, bg surface)
    - **Review card** (row gap 48, pad 48, align center, 1200×392, w:fill, bg canvas, r 32)
      - **Frame** (col gap 20, 756×296, w:fill, grow)
        - **Stars** (row gap 3, 112×20): icon star 20px ×5

        - T "“One of the biggest benefits for us was the option to pay the project off over 12 months, while still receiving ongoing support throughout that period.”" — IBM Plex Sans SemiBold 30/130% ls -1%, ink
        - T "We partnered with GoodGround from the very early stages of Roam Local, helping us turn our initial idea into a clear plan and ultimately a fully developed website. Communication was excellent, everything was clearly explained, and we always knew where the project stood." — IBM Plex Sans Regular 16/160%, muted
        - **Frame** (row gap 16, align center, 756×21, w:fill)
          - T "Roam Local" — IBM Plex Sans SemiBold 16, ink
          - T "Read the full review on Google →" — IBM Plex Sans Medium 14, coral
      - **Their plan** (col gap 12, pad 24, 300×210, bg plum, r 24)
        - T "HOW THEY PAID" — Oswald Medium 12 ls 6%, onDarkMuted
        - T "12 × monthly" — Oswald Medium 40, surface
        - **Bars** (row gap 3, align max, 252×32, w:fill): rectangle 18×32 coral r4 + 11 × rectangle 18×24 #FFFFFF @20% r4
        - T "With ongoing support throughout." — IBM Plex Sans Regular 13, onDarkMuted
  - **07 · FAQ** (col gap 40, pad 120, 1440×972, w:fill, bg canvas)
    - **Frame** (row gap 80, 1200×732, w:fill)
      - **Frame** (col gap 20, 400×154)
        - ⧉ Tag Tone=Neutral "COMMON QUESTIONS" (135×32)
        - T "Before you send that enquiry." — IBM Plex Sans SemiBold 48/106% ls -2%, ink
      - **Accordion** (col gap 10, 720×732, w:fill, grow)
        - **Item (open)** (col gap 10, pad 16/16/16/24, 720×124, w:fill, bg surface, r 18, border line 1)
          - **Frame** (row gap 12, align center, 678×32): T "Do these prices include hosting and a domain?" — IBM Plex Sans SemiBold 16, ink · **Frame** (32×32, bg ink, r 999) → icon minus 16px
          - T "No. Hosting, domain and upkeep are arranged separately from the build price. Full Service and the Website Launch Offer are the exceptions: both include hosting in the monthly price." — IBM Plex Sans Regular 15/160%, muted
        - **Items (closed)** (col gap 10, pad 16/16/16/24, 720×66, bg surface, r 18, border line 1; chip 32×32 bg canvas, icon plus 16px; question IBM Plex Sans SemiBold 16, ink):
          - "How do I pay, and is there a deposit?" · "Why does every package say “from”?" · "What if my scope grows partway through?" · "What looks after the site once it’s live?" · "Full Service or instalments: which should I choose?" · "Do I own my website?" · "How many rounds of revisions do I get?" · "How soon will I hear back after I enquire?"
  - **08 · Get your quote (form)** (col gap 40, pad 120, 1440×773, w:fill, bg plum) — id="quote"
    - **Frame** (row gap 64, 1200×533, w:fill)
      - **Frame** (col gap 20, 616×533, w:fill, grow)
        - ⧉ Tag Tone=OnDark "GET YOUR QUOTE" (113×30)
        - T "LET’S TURN THIS INTO A FIRM QUOTE." — Oswald Medium 80/94%, surface
        - T "Send us what you picked, or nothing at all and we’ll talk it through from scratch. Either way, we’ll come back with a firm quote and timeline, usually within a day or two." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Attached build (from configurator)** (col gap 10, pad 18/20/18/20, 616×140, w:fill, bg #FFFFFF @8%, r 20)
          - **Frame** (row, align space_between/center, 576×20): T "Attached: your build" — IBM Plex Sans SemiBold 15, surface · **Frame** (row gap 6, align center) icon edit 14px + T "Edit" — IBM Plex Sans Medium 13, peach
          - **Chips** (row wrap gap 8, 576×28, w:fill) — chips (row, pad 6/10/6/10, bg #FFFFFF @10%, r 99) T — IBM Plex Sans Medium 12, surface: "Base build" · "2 extra pages" · "Blog setup" · "WhatsApp button" · "Advanced SEO"
          - **Frame** (row, align space_between/baseline, 576×36): T "R19,400 · 12 instalments" — IBM Plex Sans Medium 14, onDarkMuted · T "R1,617/mo" — Oswald Medium 24, surface
      - **Quote form** (col gap 16, pad 32, 520×464, bg surface, r 28)
        - **Field pattern**: label row (row gap 6) T label — IBM Plex Sans Medium 14, ink + optional T "Optional" — IBM Plex Sans Regular 13, muted · input (row, pad 14/16/14/16, align center, h 50, w:fill, bg canvas, r 14, border line 1) placeholder IBM Plex Sans Regular 15, muted
        - **Row** (row gap 12, 456×74): "Full name" / "Your name" · "Business name" (Optional) / "Business"
        - **Row** (row gap 12, 456×74): "Email" / "name@business.co.za" · "Phone" (Optional) / "082 000 0000"
        - **Field** (456×120): "Anything else we should know?" (Optional) / textarea 456×96 "Optional notes"
        - ⧉ Button Style=Coral "Get this quote" (456×52, w:fill)
        - T "Nothing is charged. We reply within 1–2 business days." — IBM Plex Sans Regular 12, muted
  - **09 · Footer** (row, pad 40/48/48/48, align space_between, 1440×226, w:fill) — shared desktop footer (no CTA card on this page; this frame lists About · Work · Insights · Pricing in STUDIO — use the canonical footer)

### Pricing — Mobile (390) — node 53:206 (390×3832)
- **Pricing — Mobile (390)** (col, 390×3832, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 16, pad 24/20/24/20, 390×348, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "PRICING" (68×30)
    - T "SIMPLE PRICING, BUILT AROUND WHAT YOU ACTUALLY NEED." — Oswald Medium 50/94%, ink
    - T "Pick a package, build your own, or have everything handled monthly." — IBM Plex Sans Regular 16/155%, muted
  - **02 · Ways to pay (swipe cards)** (col gap 16, pad 48/20/48/20, 390×381, w:fill, bg canvas)
    - T "Four ways to pay, side by side." — IBM Plex Sans SemiBold 28/110% ls -2%, ink
    - **Swipe track** (row gap 12, 350×207, w:fill, scroll-snap) — cards (col gap 10, pad 18, 280×~206, r 22):
      - T name — IBM Plex Sans SemiBold 17 · 2 value blocks (col gap 2): T label — Oswald Medium 10 ls 6% + T value — Oswald Medium 22 · T "See all details" — IBM Plex Sans Medium 13 (coral; peach on plum)
      - "Package, by deposit" (bg surface, border line 1): MONTHLY "Nothing monthly" · TOTAL OVER 12 MONTHS "From R12,000"
      - "Package, 12 instalments" (bg surface, border line 1): "From R1,000/mo" · "From R12,000"
      - "Full Service" (bg plum, text surface, labels onDarkMuted): "From R1,500/mo" · "From R18,000"
      - "Website Launch Offer" (bg blush): "R845/mo" · "R10,140"
  - **03 · Packages** (col gap 16, pad 48/20/48/20, 390×1021, w:fill, bg surface)
    - T "Four starting points." — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Billing toggle** (row gap 4, pad 4, 350×43, w:fill, bg canvas, r 999): "50% deposit" · "12 instalments" (selected: bg ink, surface) — IBM Plex Sans SemiBold 13 (shown here in the instalment view)
    - **Package (collapsed)** (col gap 12, pad 18, 350×125, w:fill, bg canvas, r 22)
      - **Frame** (row gap 10, align center, 314×30): T NAME — Oswald Medium 20 ls 4%, ink · **Frame** (30×30, bg surface, r 999) → icon chevron 15px
      - **Frame** (row gap 8, align baseline, 314×47): T "{monthly}" — Oswald Medium 32, ink · T "× 12 · total from {price}" — IBM Plex Sans Regular 12, muted
      - MICRO "R1,000/mo" "× 12 · total from R12,000" · LAUNCH "R1,750/mo" "× 12 · total from R21,000" · SCALE "R3,750/mo" "× 12 · total from R45,000"
    - **Package · Grow (open)** (col gap 12, pad 18, 350×391, w:fill, bg plum, r 22)
      - **Frame** (row gap 10, align center, 314×30): T "GROW" — Oswald Medium 20 ls 4%, surface · ⧉ Tag Tone=Coral "RECOMMENDED" · **Frame** (30×30, bg coral, r 999) → icon up 15px
      - **Frame** (row gap 8, align baseline): T "R2,667/mo" — Oswald Medium 32, surface · T "× 12 · total from R32,000" — IBM Plex Sans Regular 12, onDarkMuted
      - Inclusion rows (row gap 8, align center, 314×17): icon check 14px + T — IBM Plex Sans Regular 13, surface: "Up to 10 pages, incl. Blog/News" · "Unique design, no templates" · "Custom interactive elements" · "Integrations: maps, booking, WhatsApp" · "SEO + Analytics & Search Console" · "2 rounds of revisions"
      - **Frame** (row gap 6, align center): icon clock 14px + T "~3–4 weeks" — IBM Plex Sans Medium 12, peach
      - ⧉ Button Style=Coral "Choose Grow" (314×52, w:fill)
  - **04 · Full Service** (col gap 16, pad 0/20/48/20, 390×306, w:fill, bg surface)
    - **Frame** (col gap 12, pad 20, 350×258, w:fill, bg plum, r 24)
      - T "FULL SERVICE" — Oswald Medium 32, surface
      - **Frame** (row gap 6, align baseline): T "from R1,500" — Oswald Medium 28, peach · T "/mo · cancel any time" — IBM Plex Sans Regular 12, onDarkMuted
      - T "Build, hosting, mailboxes, ongoing SEO, updates and maintenance." — IBM Plex Sans Regular 14/150%, onDarkMuted
      - ⧉ Button Style=Coral "Get a Full Service quote" (310×52, w:fill)
  - **05 · Build your own** (col gap 16, pad 48/20/120/20, 390×959, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "BUILD YOUR OWN" (116×30)
    - T "Add exactly what you need." — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Base fee row** (row gap 12, pad 16, align center, 350×64, w:fill, bg ink, r 18): **Frame** (32×32, bg surface, r 999) → icon lock 16px · T "Base Build Fee · included" — IBM Plex Sans SemiBold 14, surface · T "R6,000" — Oswald Medium 20, surface
    - **Group · Pages (open)** (col, pad 0/16/0/16, 350×329, w:fill, bg surface, r 18, border line 1)
      - **Header** (row gap 8, pad 16/0/16/0, align center, 316×53): T "Pages" — IBM Plex Sans SemiBold 16, ink · T "2 added" — IBM Plex Sans Regular 12, coral · icon up 16px
      - **Item (stacked)** (col gap 8, pad 12/0/12/0, 316 wide, w:fill, border line 1/0/0/0): T name — IBM Plex Sans 14 · **Frame** (row, align space_between/center, 316×42): T price — IBM Plex Sans SemiBold 14 · control (stepper 110×42 with 32×32 buttons, or Added pill 90×37 pad 10/16/10/14)
        - "Additional standard page" · "R2,500 each" · stepper 2 (bg blush, border coral 1)
        - "Complex / custom-layout page" · "R4,000 each" (muted) · stepper 0 (bg surface, border line 1)
        - "Blog / News section setup" · "R4,500" · Added (bg ink)
    - **Groups (closed)** (col, pad 0/16/0/16, 350×55, bg surface, r 18, border line 1) header row (row gap 8, pad 16/0/16/0): T name — IBM Plex Sans SemiBold 16, ink · T count — IBM Plex Sans Regular 12 · icon chevron 16px
      - "Integrations" "1 added" (coral) · "SEO & performance" "1 added" (coral) · "Design" "4 items" (muted) · "Functionality" "7 items" (muted)
  - **Sticky total bar (fixed to viewport bottom)** (row gap 12, pad 12/12/12/20, align center, 358×64, bg ink, r 999, fixed 16px from the left and bottom)
    - **Frame** (col, w:fill, grow): T "YOUR TOTAL" — Oswald Medium 10 ls 6%, onDarkMuted · **Frame** (row gap 6, align baseline): T "R19,400" — Oswald Medium 22, surface + T "or R1,617/mo" — IBM Plex Sans Regular 11, onDarkMuted
    - **Button** (row gap 6, pad 12/16/12/16, align center, 133×42, bg coral, r 999): T "View & send" — IBM Plex Sans SemiBold 14, surface · icon up 14px
  - **08 · Quote form** (col gap 16, pad 48/20/48/20, 390×474, w:fill, bg plum)
    - T "LET’S TURN THIS INTO A FIRM QUOTE." — Oswald Medium 44/94%, surface
    - **Form card** (col gap 12, pad 18, 350×280, w:fill, bg surface, r 22)
      - Fields (col gap 6): label IBM Plex Sans Medium 14, ink · input (row, pad 12/14/12/14, 314×46, bg canvas, r 12, border line 1) placeholder IBM Plex Sans Regular 15, muted — "Full name" / "Your name" · "Email" / "name@business.co.za"
      - T "+ business name, phone, notes" — IBM Plex Sans Regular 12, muted (tapping reveals the optional fields)
      - ⧉ Button Style=Coral "Get this quote" (314×52, w:fill)
  - **Footer** (col gap 20, pad 24/24/96/24, 390×265, w:fill) — shared mobile footer; 96px bottom padding leaves room for the sticky bar

### State · Your build sheet (opens from total bar) — node 53:469 (390×539)
- **Bottom sheet** (col gap 14, pad 12/20/24/20, align center, 390×539, bg surface, r 28 (top), shadow 0 -8 40 #000000@18%)
  - rectangle 40×4 line r99 (drag handle)
  - **Frame** (row, align space_between/center, 350×26): T "Your build" — IBM Plex Sans SemiBold 20 ls -1%, ink · T "Reset" — IBM Plex Sans Medium 13, coral
  - **Line items** (col gap 10, 350×160) — rows (row gap 10, align center, 350×24): name IBM Plex Sans Regular 14, ink · price IBM Plex Sans SemiBold 14, ink · remove (24×24, bg canvas, r 999, icon x 12px; empty slot on the base fee)
    - "Base Build Fee" R6,000 · "Additional standard page × 2" R5,000 · "Blog / News setup" R4,500 · "WhatsApp chat button" R900 · "Advanced SEO" R3,000
  - **Total** (row, align space_between/baseline, 350×59): T "Total, fixed" — IBM Plex Sans Regular 14, muted · T "R19,400" — Oswald Medium 40, ink
  - **Payment toggle** (row gap 4, pad 4, 350×43, bg canvas, r 999): "50% deposit" (selected: bg ink, surface) · "12 instalments" — IBM Plex Sans SemiBold 13
  - **Split (deposit view)** (row gap 8, 350×75) — 2 tiles (col gap 2, pad 12/14/12/14, w:fill, grow, bg blush, r 14): T "R9,700" — Oswald Medium 22, coral + T "Deposit, to start" / "On completion" — IBM Plex Sans Regular 12, muted
  - ⧉ Button Style=Coral "Send this build" (350×52, w:fill)

