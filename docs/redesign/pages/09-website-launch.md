# Website launch offer

| | |
|---|---|
| **URL** | `/website-launch` |
| **Figma page** | `74:150` |
| **Desktop frame (1440)** | 74:151 |
| **Mobile frame (390)** | 77:215 |
| **Extra states / boards** | Sold-out state 77:407 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Month, spots left and the sold-out state come from site settings.
- Sold-out: every "Check availability" becomes "Join the {Next month} waitlist"; submissions tagged plan=launch-waitlist.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /website-launch page — node 78:252
PAGE · READ FIRST
/website-launch: content, availability data and the form
URL
•  The live page is /website-launch (there is no /launch-offer). All earlier notes that said /launch-offer now point here. Keep the live <title> “First Website for New Businesses | R845/month | GoodGround”.
CONTENT
•  All copy, inclusions, steps and the 10 FAQ answers come from the live page, condensed for cards; meaning unchanged.
•  New in this design: the hero offer card with the R845 × 12 = R10,140 maths, the eligibility checker, the 12-payment timeline, the “after month 12” choice cards and the intake calendar. They only restate what the live page already says.
•  The project cards reuse the /work card component and link to their case studies.
AVAILABILITY DATA (ONE SOURCE)
•  Spots per month (2) and spots taken come from the same CMS values the homepage offer section and /pricing use. Month names are generated, never typed.
•  Live pill, offer-card meter, intake calendar, sticky mobile bar and form banner all read the same numbers.
•  Sold out for the current month: see the state frame. Pill grey “{Month} is fully booked”, meter full in ink, “Next opening: {Next month}, 2 spots”, every “Check availability” becomes “Join the {Next month} waitlist”.
•  The intake calendar shows the current month plus the next two. Months further out show “2 spots open” until bookings exist.
ELIGIBILITY CHECKER
•  Two segmented questions (new business? / already have a website?). Yes + No = mint “Good news: you qualify”; anything else = blush message suggesting the Launch package or a redesign, with “See packages” → /pricing#packages.
•  It’s guidance only: it doesn’t block the form. The form keeps its own required confirmation checkbox.
AVAILABILITY FORM
•  Fields from the live form: name*, business name*, email*, about the business*, launch timing (optional), “I confirm this is a new business without a website”* plus the hidden honeypot.
•  Submits to the shared endpoint with formType=launch-availability and plan=launch (or plan=launch-waitlist when sold out). Same validation, spam rules, success and failure states and auto-reply as /start-project.
•  Any “Check availability” button on the page smooth-scrolls to this form and focuses the name field. Links from other pages (homepage offer, /pricing) go to /website-launch#check-availability. /start-project?plan=launch remains supported for older links.
SEO
•  JSON-LD: Offer (price 845 ZAR per month, 12-month term, eligibility “new businesses without a website”, availability InStock/SoldOut from the live data) + FAQPage + BreadcrumbList.

### Notes · /website-launch motion & interaction — node 78:274
MOTION & INTERACTION
Section behaviour
HERO
•  Tags and live pill FADE-UP; the coral dot pulses (scale 1→1.8 ring, 2s loop; off when motion is off). Headline LINE MASK; copy and buttons FADE-UP.
•  Offer card: FADE-UP + scale 0.96→1; “R845” LINE MASK; the maths row fills left to right (R845 → × 12 → R10,140 with a COUNT-UP); checklist ticks pop 70ms apart; the availability meter fills its taken segments last.
•  Key facts strip: STAGGER GRID 80ms.
JOURNEY & ELIGIBILITY
•  The three moments STAGGER left to right with the arrow chips sliding in between (motion/md); the plum third moment lands last.
•  Eligibility checker: segmented controls animate their pill (motion/md); the result card swaps between mint and blush with a crossfade and 6px rise (motion/sm). aria-live announces the result.
INCLUDED, NUMBERS, INTAKE
•  Included groups STAGGER GRID 120ms; item rows FADE-UP 50ms apart inside each group.
•  12-payment bars grow from the bottom (scaleY, 30ms stagger); “R10,140 total” COUNT-UP.
•  Intake calendar rows FADE-UP; filled dots pop in coral (ease/back).
STEPS, FAQ, FORM
•  How it works: dots fill 1→4 (120ms apart), lines draw between them, cards FADE-UP.
•  FAQ: shared accordion (one open at a time, first open, FAQPage markup).
•  Form: same field behaviour as /start-project Step 4. On success the form card crossfades to “Thanks, {first name}. We’ll confirm availability within 1–2 business days.”
MOBILE
•  Offer card sits directly under the headline. “What’s included” becomes an accordion (one open, first open). FAQ shows 4 questions plus “+ 6 more” which expands the rest.
•  Sticky offer bar (R845/month + spots left + Check availability) appears once the hero offer card scrolls out of view and hides while the form is visible.

## Layer-by-layer spec

### Website launch — Desktop (1440) — node 74:151 (1440×8559)
- **Website launch — Desktop (1440)** (col, 1440×8559, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "WEBSITE LAUNCH OFFER" (169×44)
  - **01 · Hero + offer card** (col gap 48, pad 48/120/80/120, 1440×900, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×624, w:fill)
      - **Frame** (col gap 24, 696×624, w:fill, grow)
        - **Frame** (row gap 8, align center): ⧉ Tag Tone=Coral "FOR NEW BUSINESSES WITHOUT A WEBSITE" · **Live availability pill** (row gap 8, pad 6/14/6/12, align center, 180×30, bg ink, r 99): ellipse 8×8 coral (pulsing) + T "1 SLOT LEFT FOR OCTOBER" — Oswald Medium 12 ls 6%, surface
        - T "LAUNCH YOUR FIRST WEBSITE FOR R845 A MONTH." — Oswald Medium 104/92%, ink
        - T "Give your new business a professional place online, designed to help customers understand your services, trust your business and get in touch. We handle the planning, design and launch. You focus on getting your business started." — IBM Plex Sans Regular 18/155%, muted
        - **Frame** (row gap 12): ⧉ Button Style=Coral "Check availability" (207×52) · ⧉ Button Style=Outline "What’s included" (198×54)
      - **Offer card** (col gap 20, pad 32, 440×624, bg plum, r 32, shadow 0 30 60 #2E1747@25%)
        - **Frame** (row, align space_between/center, 376×30): T "Website Launch" — IBM Plex Sans SemiBold 18, surface · ⧉ Tag Tone=Coral "NO DEPOSIT"
        - **Price** (row gap 8, align baseline): T "R845" — Oswald Medium 88/100%, surface · T "/ month" — IBM Plex Sans Regular 16, onDarkMuted
        - **Total maths** (row, 376×75, w:fill, bg #FFFFFF @8%, r 16) — 3 cells (col gap 2, pad 12/12/12/16, w:fill, grow; cells 2–3 border #FFFFFF @12% 0/0/0/1): T value — Oswald Medium 22 + T label — IBM Plex Sans Regular 12, onDarkMuted
          - "R845" (surface) "monthly" · "× 12" (surface) "months" · "R10,140" (peach) "total"
        - **Checklist** (col gap 10, 376×118): rows (row gap 10, align center): **Frame** (22×22, bg coral, r 99) icon check 11px + T — IBM Plex Sans Medium 14, surface
          - "Custom one-page website" · "Domain registration & business email" · "Hosting for 12 months" · "Detailed SEO setup + Google indexing"
        - **Availability meter** (col gap 8, pad 14/16/14/16, 376×61, w:fill, bg surface, r 16)
          - **Frame** (row, align space_between): T "October intake" — IBM Plex Sans Medium 13, ink · T "1 of 2 spots left" — IBM Plex Sans SemiBold 13, coral
          - **Segments** (row gap 6, 344×8): 2 × rectangle 169×8 r99 — taken = coral, open = line (one segment per spot)
        - ⧉ Button Style=Coral "Check availability" (376×52, w:fill)
        - T "No obligation. We confirm availability and fit before you book." — IBM Plex Sans Regular 12, onDarkMuted
    - **Key facts** (row, pad 20/0/20/0, 1200×100, w:fill, bg surface, r 24, border line 1) — 4 cells (row gap 12, pad 0/20/0/24, align center, w:fill, grow; cells 2–4 border line 0/0/0/1): **Frame** (40×40, bg blush, r 12) → icon 20px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, ink + T — IBM Plex Sans Regular 13/140%, muted
      - file "One page" "Custom, designed around your business" · mail "Domain and email" "Registered and set up for you" · search "SEO and Google" "Prepared, submitted for indexing" · cal "12 months" "Domain, hosting and email fees included"
  - **02 · Why it matters (journey)** (col gap 48, pad 120, 1440×782, w:fill, bg surface)
    - **Section header** (row, align space_between/max): **Frame** (col gap 20, 760): ⧉ Tag Tone=Neutral "WHY IT MATTERS" · T "Give people a clear next step when they hear about your business." — IBM Plex Sans SemiBold 56/106% ls -3%, ink · T "We plan your first website around these three moments, so potential customers can understand your business and act with confidence." — IBM Plex Sans Regular 17/155%, muted (400 wide)
    - **Journey** (row gap 16, align center, 1200×265, w:fill) — 3 moment cards (col gap 14, pad 28, 355×265, w:fill, h:fill, grow, r 28) with arrow chips (36×36, bg canvas, r 999, icon arrowR 18px) between:
      - T "0n" — Oswald Medium 14 · **Frame** (48×48, r 14) → icon 24px · T title — IBM Plex Sans SemiBold 22 ls -1% · T body — IBM Plex Sans Regular 15/155%
      - Moment 1 (bg canvas, number coral, chip bg surface, icon ear): "Someone hears about you" / "You’ve shared what you do and handed over your details. That’s where their interest starts."
      - Moment 2 (bg canvas, icon eye): "They want to know more" / "Now they need a place to learn more about you and how to contact you."
      - Moment 3 (bg plum, number peach, chip bg coral, icon chat, title surface, body onDarkMuted): "They decide whether to ask" / "A page that explains what you offer, who you help and how to enquire."
  - **03 · Is this you? (eligibility checker)** (col gap 48, pad 120, 1440×738, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×498, w:fill)
      - **Frame** (col gap 20, 696×478, w:fill, grow)
        - ⧉ Tag Tone=Plum "IS THIS YOU?"
        - T "Made for brand-new businesses." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
        - **Criteria rows** (row gap 14, pad 14/16/14/16, align center, 696×58, w:fill, r 16): status chip 28×28 r 99 + T — IBM Plex Sans Medium 15/145%, ink
          - yes rows (bg surface, border line 1; chip bg mint + icon check 14px): "You’re starting a new business, or you’ve recently started trading." · "You don’t have a website yet. A social page or a domain you already own is fine." · "You want customers to find you, understand what you offer and get in touch."
          - no row (bg blush; chip bg surface + icon x 14px): "Not for website redesigns or replacing a website you already have."
      - **Eligibility checker (interactive)** (col gap 16, pad 28, 440×498, bg surface, r 28, border line 1)
        - T "Check in 5 seconds" — IBM Plex Sans SemiBold 20 ls -1%, ink
        - **Question** (col gap 8, 382×71): T "Is your business new, or about to start trading?" — IBM Plex Sans Medium 14, ink · **Segmented** (row gap 4, pad 4, 382×45, bg canvas, r 999): "Yes" (selected: bg ink, surface) · "No" — IBM Plex Sans SemiBold 13
        - **Question**: T "Does your business already have a website?" · segmented "No" (selected) · "Yes"
        - **Result · qualifies** (row gap 12, pad 14/16/14/16, align center, 382×65, w:fill, bg mint, r 16): **Frame** (32×32, bg surface, r 99) icon check 16px · **Frame** (col, w:fill, grow): T "Good news: you qualify." — IBM Plex Sans SemiBold 15, ink + T "Check if October’s last slot is still open." — IBM Plex Sans Regular 13, muted
        - ⧉ Button Style=Coral "Check availability" (382×52, w:fill)
        - **Result · not eligible (alt state)** (row gap 10, pad 12/14/12/14, 382×75, w:fill, bg blush, r 14): message "This offer is for new businesses without a website. A Launch package or a redesign may suit you better." + "See packages" link (→ /pricing#packages) — shown in place of the mint result for any other answer combination
  - **04 · What’s included** (col gap 48, pad 120, 1440×1175, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "WHAT’S INCLUDED" · T "Your first website, with the setup handled." · side copy "An agreed scope, a planned launch and a website designed around your business goals, through one clear process."
    - **Frame** (row gap 20, 1200×585, w:fill) — 3 group cards (col gap 16, pad 28, 387×585, w:fill, h:fill, grow, bg canvas, r 28):
      - **Card top** (row, align space_between/center): **Frame** (48×48, r 14) → icon 24px · T "0n" — Oswald Medium 28, line
      - T group title — IBM Plex Sans SemiBold 22 ls -1%, ink
      - **Item** (row gap 12, pad 14, w:fill, bg surface, r 16): **Frame** (22×22, bg mint, r 99) icon check 11px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 14, ink + T — IBM Plex Sans Regular 13/150%, muted
      - **01 Planning and design** (chip lilac, icon pen): "Website planning around your goals" / "We learn about your business, customers and the enquiries you want. That shapes your page, its sections and contact options." · "A custom one-page website" / "Sections for what you do, who you help and how to get in touch, agreed before the build begins." · "Responsive across devices" / "Pages, navigation and forms adapt to phones, tablets and desktops."
      - **02 Domain, email and hosting** (chip blush, icon globe): "Domain registration and setup" / "We help you choose an available domain and connect your website and email." · "Professional business email" / "Addresses on your domain, like hello@yourbusiness.co.za." · "Fees for 12 months" / "Domain, hosting and email fees included for the first year. Your proposal confirms allowances and continuation costs."
      - **03 Search and launch** (chip mint, icon rocket): "Detailed SEO setup" / "Keyword research, titles, descriptions, headings, internal links, clean URLs, image optimisation and structured data." · "Search Console and indexing" / "We connect Google Search Console, submit your sitemap and request indexing." · "A clear way to enquire" / "Prominent contact buttons and a working enquiry form." · "Performance and launch checks" / "Images, speed, links, forms and mobile layouts checked before go-live."
    - **Summary bar** (row gap 16, pad 16/16/16/24, align center, 1200×84, w:fill, bg plum, r 999): T "That’s your whole first website: planned, built, launched and submitted to Google." — IBM Plex Sans SemiBold 16, surface · ⧉ Button Style=Coral "Check availability"
  - **05 · What it costs, and after 12 months** (col gap 48, pad 120, 1440×722, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Coral "THE NUMBERS" · T "R845 a month. No deposit. No surprises." · side copy "One clear monthly amount for 12 months, and a simple choice when the year ends."
    - **Frame** (row gap 24, 1200×266, w:fill)
      - **12-month timeline** (col gap 16, pad 28/32/28/32, 736×266, w:fill, h:fill, grow, bg surface, r 28, border line 1)
        - **Frame** (row, align space_between/baseline): T "Your 12 payments" — IBM Plex Sans SemiBold 20 ls -1%, ink · T "R10,140 total" — Oswald Medium 28, coral
        - **Bars** (row gap 6, align max, 670×76) — 12 columns (col gap 6, align center, w:fill, grow): rectangle 50×56 r8 (M1 coral, M2–M12 lilac) + T "M1"…"M12" — IBM Plex Sans Regular 11, muted
        - **Ticks** (row gap 24): icon check 14px + T — IBM Plex Sans Medium 13, ink: "R845 each month" · "Domain, hosting and email fees included" · "No deposit upfront"
      - **After 12 months** (col gap 12, pad 28, 440×266, h:fill, bg plum, r 28)
        - T "After month 12, you choose" — IBM Plex Sans SemiBold 20 ls -1%, surface
        - Choice rows (row gap 12, pad 14, w:fill, bg #FFFFFF @8%, r 16): **Frame** (36×36, bg coral, r 10) → icon 18px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, surface + T — IBM Plex Sans Regular 13/150%, onDarkMuted
          - swap "Take it with you" "We transfer your domain and website to you." · shield "Stay looked after" "Move to our maintenance plan; we keep handling hosting, domain fees and upkeep."
  - **06 · Our approach (work)** (col gap 48, pad 120, 1440×766, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "OUR APPROACH" · T "See how we approach website design." · side copy "Open a project. Try the navigation. Follow the enquiry process."
    - **Frame** (row gap 24, 1200×308) — 3 LINKED CARDS (col gap 14, pad 12/12/20/12, 384×308, w:fill, grow, bg canvas, r 28): image (360×220, gradient placeholder, r 18) · row (row gap 12, pad 0/8/0/8, align center): **Frame** (col gap 2, w:fill, grow): T name — IBM Plex Sans SemiBold 18, ink + T type — IBM Plex Sans Regular 13, muted · **Frame** (36×36, bg surface, r 999) icon arrow 18px
      - "GoodGround" "Our own site" · "B3TTER" "Concept build" · "Sunbird Early Learners" "Concept build" (same gradients as /work)
  - **07 · Two new businesses each month (intake)** (col gap 48, pad 120, 1440×513, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×273)
      - **Frame** (col gap 20, w:fill, grow): ⧉ Tag Tone=Coral "LIMITED INTAKE" · T "Two new businesses each month." — IBM Plex Sans SemiBold 56/106% ls -3%, ink · T "We open two spaces through this promotion each month, so every business gets proper time for planning, design, development and testing. Once they’re booked, we’ll discuss the next available intake with you." — IBM Plex Sans Regular 17/160%, muted
      - **Intake calendar** (col gap 10, pad 24, 460×273, bg surface, r 28, border line 1)
        - T "Upcoming intakes" — IBM Plex Sans SemiBold 18, ink
        - **Month rows** (row gap 14, pad 14/16/14/16, align center, 410×48, w:fill, r 16): T month — IBM Plex Sans SemiBold 15, ink (w:fill) · **Spot dots** (2 dots, 34px group; filled = coral, open = line) · T status — IBM Plex Sans Medium 13
          - "October 2026" (bg blush; 1 dot filled) "1 spot left" (coral) · "November 2026" (bg canvas) "2 spots open" (muted) · "December 2026" (bg canvas) "2 spots open" (muted)
        - T "Live from the booking calendar. Filled spots shown in coral." — IBM Plex Sans Regular 12, muted
  - **08 · How it works** (col gap 48, pad 120, 1440×650, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "HOW IT WORKS" · T "From your business idea to your first website."
    - **Steps** (row gap 16, 1200×192) — 4 steps (col gap 14, 288 wide, w:fill, grow): **Rail** (row gap 8, align center): **Dot** (40×40, bg ink, r 99) → T "0n" — Oswald Medium 14, surface + rectangle 240×2 line (no line after step 4) · **Card** (col gap 8, pad 22, w:fill, bg canvas, r 20): T — IBM Plex Sans SemiBold 18 ls -1%, ink + T — IBM Plex Sans Regular 14/150%, muted
      - 01 "Tell us about your business" "What you offer, who you want to reach and when you hope to launch."
      - 02 "Review your proposal" "We confirm availability, what’s included, payment terms and the timeline. You decide."
      - 03 "Review your website" "We design and build to the agreed brief; you give feedback within the included revision rounds."
      - 04 (dot coral, card bg blush) "Approve and launch" "Final checks, publish, and your pages are submitted to Google for indexing."
  - **09 · FAQ** (col gap 48, pad 120, 1440×1069, w:fill, bg canvas)
    - **Frame** (row gap 80): **Frame** (col gap 20, 400): ⧉ Tag Tone=Neutral "FAQ" · T "Your questions, answered." — IBM Plex Sans SemiBold 48/106% ls -2%, ink
    - **Accordion** (col gap 10, 720×829)
      - Open (col gap 10, pad 16/16/16/24, 720×127, bg surface, r 18, border ink 1.5): T "Who qualifies for this offer?" — IBM Plex Sans SemiBold 16, ink + **Frame** (34×34, bg ink, r 999) icon minus 17px · T "Exclusively new businesses that don’t have a website. You can be preparing to launch or have recently started trading. The offer doesn’t cover redesigns or replacements." — IBM Plex Sans Regular 15/160%, muted
      - Closed (720×68, bg surface, r 18, border line 1, chip bg canvas icon plus 17px): "I have a social media page. Can I still apply?" · "What if I’ve already registered a domain?" · "What do I need to provide?" · "How long will my website take?" · "Will my website appear on Google?" · "Does the package include ongoing SEO?" · "Is there a deposit?" · "What happens after the first 12 months?" · "Can I add more pages or extra features?"
  - **10 · Check availability (form)** (col gap 48, pad 120, 1440×911, w:fill, bg plum) — id="check-availability"
    - **Frame** (row gap 64, 1200×671)
      - **Frame** (col gap 20, 596×517, w:fill, grow)
        - ⧉ Tag Tone=OnDark "CHECK AVAILABILITY"
        - T "GET YOUR FIRST BUSINESS WEBSITE UNDERWAY." — Oswald Medium 80/94%, surface
        - T "R845 a month, with domain, hosting and email fees included for the first 12 months. Exclusively for new businesses without a website." — IBM Plex Sans Regular 17/155%, onDarkMuted
        - **Availability banner** (row gap 10, pad 12/16/12/16, align center, 596×60, w:fill, bg #FFFFFF @8%, r 16): ellipse 8×8 coral · T "1 slot left for October. Tell us about your business and we’ll confirm whether it’s still open." — IBM Plex Sans Medium 14, surface
        - **Ticks** (col gap 8): icon check 14px + T — IBM Plex Sans Medium 14, surface: "Takes about a minute" · "Commits you to nothing" · "We reply about availability and next steps"
      - **Availability form** (col gap 16, pad 32, 540×671, bg surface, r 28)
        - Row: ⧉ Form/Field Input Default "Your name" placeholder "Full name" · ⧉ Form/Field Input Default "Business name" placeholder "Your new business"
        - ⧉ Form/Field Input Default "Email address" placeholder "name@business.co.za"
        - ⧉ Form/Field Textarea Default "Tell us about your new business" placeholder "What you offer and who you want to reach"
        - ⧉ Form/Field Input Default "When would you like to launch your website?" (Optional) placeholder "e.g. early December"
        - **Eligibility confirmation (required)** (row gap 12, pad 12/14/12/14, 476×46, w:fill, bg canvas, r 14): checkbox 22×22 r 6 (checked: bg ink + icon check 13px) · T "I confirm this is a new business and it doesn’t have a website." — IBM Plex Sans Medium 14/145%, ink
        - ⧉ Button Style=Coral "Check availability" (476×52, w:fill)
        - T "We use these details to respond to your enquiry. See our privacy policy. Sending this form doesn’t commit you to a purchase." — IBM Plex Sans Regular 12/150%, muted
  - **11 · Footer** — desktop footer with LEGAL column (SERVICES here lists "Website development" · "Website launch offer" · "Full service" · "Google & Meta Ads")

### Website launch — Mobile (390) — node 77:215 (390×3490)
- **Website launch — Mobile (390)** (col, 390×3490, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero + offer card** (col gap 16, pad 16/20/32/20, 390×821, w:fill, bg canvas)
    - **Live pill** (row gap 8, pad 6/14/6/12, align center, 168×28, bg ink, r 99): ellipse 8×8 coral + T "1 SLOT LEFT FOR OCTOBER" — Oswald Medium 11 ls 6%, surface
    - T "LAUNCH YOUR FIRST WEBSITE FOR R845 A MONTH." — Oswald Medium 52/94%, ink
    - T "For new businesses without a website. We plan, design and launch it; you focus on your business." — IBM Plex Sans Regular 16/155%, muted
    - **Offer card** (col gap 14, pad 20, 350×451, w:fill, bg plum, r 24)
      - **Price** (row gap 6, align baseline): T "R845" — Oswald Medium 64/100%, surface · T "/ month · 12 months" — IBM Plex Sans Regular 13, onDarkMuted
      - **Tiles** (row gap 8, 310×64): 2 tiles (col, pad 10/12/10/12, w:fill, grow, bg #FFFFFF @8%, r 12): T — Oswald Medium 20, peach + T — IBM Plex Sans Regular 11, onDarkMuted — "R10,140" "total" · "R0" "deposit"
      - (continues in the next chunk)

      - **Checklist** rows (row gap 10, align center): **Frame** (20×20, bg coral, r 999) icon check 11px + T — IBM Plex Sans Medium 14, surface: "One-page custom website" · "Domain & business email" · "Hosting for 12 months" · "SEO setup + Google indexing"
      - **Meter** (col gap 6, pad 12/14/12/14, 310×52, w:fill, bg surface, r 14): **Frame** (row, align space_between): T "October intake" — IBM Plex Sans Medium 12, ink + T "1 of 2 left" — IBM Plex Sans SemiBold 12, coral · segments (row gap 6): 2 × rectangle 138×6 r99 (coral taken, line open)
      - ⧉ Button Style=Coral "Check availability" (310×52, w:fill)
  - **02 · Is this you?** (col gap 16, pad 40/20/40/20, 390×448, w:fill, bg surface)
    - ⧉ Tag Tone=Plum "IS THIS YOU?"
    - T "Made for brand-new businesses." — IBM Plex Sans SemiBold 30/110% ls -2%, ink
    - Rows (row gap 12, pad 12/14/12/14, align center, 350×48, w:fill, r 14): chip 24×24 r 999 + T — IBM Plex Sans Medium 14, ink
      - bg canvas + mint check: "New, or recently started trading" · "No website yet (a social page is fine)" · "You want customers to find and contact you"
      - bg blush + surface x: "Not for redesigns or replacements"
    - (The interactive checker is desktop-only; on mobile the criteria list is enough.)
  - **03 · What’s included (accordion)** (col gap 16, pad 40/20/40/20, 390×450, w:fill, bg canvas)
    - T "Your first website, with the setup handled." — IBM Plex Sans SemiBold 30/110% ls -2%, ink
    - **Open group** (col gap 10, pad 16/14/16/16, 350×146, w:fill, bg surface, r 18, border ink 1.5): **Frame** (row gap 10, align center): T "01" — Oswald Medium 13, coral · T "Planning and design" — IBM Plex Sans SemiBold 16, ink · T "3 items" — IBM Plex Sans Regular 12, muted · item rows (row gap 10): **Frame** (20×20, bg mint, r 999) icon check 11px + T — IBM Plex Sans Regular 14, ink: "Website planning around your goals" · "A custom one-page website" · "Responsive across devices"
    - **Closed groups** (col, pad 16/14/16/16, 350×55, bg surface, r 18, border line 1): "02 Domain, email and hosting · 3 items" · "03 Search and launch · 4 items"
  - **04 · After 12 months** (col gap 16, pad 40/20/40/20, 390×277, w:fill, bg plum)
    - T "After month 12, you choose" — IBM Plex Sans SemiBold 24 ls -1%, surface
    - Tiles (col gap 2, pad 14/16/14/16, 350×67, w:fill, bg #FFFFFF @8%, r 16): T — IBM Plex Sans SemiBold 15, surface + T — IBM Plex Sans Regular 13, onDarkMuted — "Take it with you" "We transfer your domain and website to you." · "Stay looked after" "Move to our maintenance plan."
  - **05 · FAQ** (col gap 16, pad 40/20/40/20, 390×476, w:fill, bg canvas)
    - T "Your questions, answered." — IBM Plex Sans SemiBold 28 ls -1%, ink
    - Rows (row gap 10, pad 14/12/14/16, align center, 350×58, w:fill, bg surface, r 16, border line 1): T — IBM Plex Sans SemiBold 14, ink + **Frame** (28×28, bg canvas, r 999) icon plus 15px — "Who qualifies for this offer?" · "Is there a deposit?" · "What happens after the first 12 months?" · "Will my website appear on Google?"
    - **More row** (350×48, same style): T "+ 6 more questions" — IBM Plex Sans SemiBold 14, muted (expands the rest)
  - **06 · Availability form** (col gap 16, pad 40/20/40/20, 390×789, w:fill, bg plum)
    - T "GET YOUR FIRST BUSINESS WEBSITE UNDERWAY." — Oswald Medium 40/96%, surface
    - **Form card** (col gap 12, pad 18, 350×579, w:fill, bg surface, r 22)
      - ⧉ Form/Field "Your name" "Full name" · "Business name" "Your new business" · "Email address" "name@business.co.za" · Textarea "Tell us about your new business" "What you offer" (all full width, 314)
      - **Confirmation** (row gap 10, pad 10/12/10/12, 314×54, w:fill, bg canvas, r 12): checkbox 22×22 r 6 (unchecked: bg surface, border line 1.5) · T "I confirm this is a new business without a website." — IBM Plex Sans Medium 13, ink
      - ⧉ Button Style=Coral "Check availability" (314×52, w:fill)
  - **Footer** (col gap 20, pad 24/24/96/24, 390×151, w:fill, bg surface) — logo only in this frame; use the shared mobile footer (96px bottom padding leaves room for the sticky bar)
  - **Sticky offer bar (appears after hero)** (row gap 10, pad 8/8/8/18, align center, 358×60, bg ink, r 999, fixed 16px from the left and bottom)
    - **Frame** (col, w:fill, grow): T "R845 / month" — Oswald Medium 18, surface · T "1 of 2 October spots left" — IBM Plex Sans Regular 11, peach
    - **Button** (row, pad 12/16/12/16, 139×41, bg coral, r 999): T "Check availability" — IBM Plex Sans SemiBold 13, surface

### State · Sold out for the month (offer card + hero pill) — node 77:407 (520×572)
- **Hero pill (sold out)** (row gap 8, pad 6/14/6/12, align center, 185×30, bg line, r 99): ellipse 8×8 muted · T "OCTOBER IS FULLY BOOKED" — Oswald Medium 12 ls 6%, ink
- **Offer card (sold out)** (col gap 16, pad 28, 454×342, w:fill, bg plum, r 28)
  - **Price** (row gap 8, align baseline): T "R845" — Oswald Medium 72/100%, surface · T "/ month" — IBM Plex Sans Regular 15, onDarkMuted
  - **Meter** (col gap 8, pad 14/16/14/16, 398×61, w:fill, bg surface, r 16): **Frame** (row, align space_between): T "October intake" — IBM Plex Sans Medium 13, ink + T "Fully booked" — IBM Plex Sans SemiBold 13, ink · segments 2 × rectangle 180×8 ink r99
  - **Next opening** (row gap 10, pad 12/14/12/14, align center, 398×52, w:fill, bg #FFFFFF @8%, r 14): **Frame** (28×28, bg coral, r 999) icon bell 15px · T "Next opening: November, 2 spots." — IBM Plex Sans SemiBold 14, surface
  - ⧉ Button Style=Coral "Join the November waitlist" (398×52, w:fill)
- Annotation: "All “Check availability” buttons on the page become “Join the {Next month} waitlist”; the form heading and submit label change to match, and submissions are tagged plan=launch-waitlist."

