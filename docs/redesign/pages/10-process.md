# Process (new page)

| | |
|---|---|
| **URL** | `/process` |
| **Figma page** | `80:150` |
| **Desktop frame (1440)** | 80:151 |
| **Mobile frame (390)** | 84:186 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- New page. The copy is new and needs the user's confirmation (open item 9).
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /process page — node 85:195
PAGE · READ FIRST
/process: a new page, where its content comes from
WHY IT EXISTS
•  New page (it doesn’t exist on the live site). It’s the destination for every “See the full process” link: About, homepage process section, Services, the launch offer page and the onboarding welcome screen.
•  Title: “Our Process | How We Build Websites | GoodGround”. Add “Process” to the main menu and footer (shown in the footer here).
CONTENT FROM YOUR LIVE SITE (CONFIRMED)
•  The six step names and one-line descriptions (homepage and About).
•  Payment options and when they fall; instalments 2–12 start on completion.
•  Revision rounds per package (Micro/Launch 1, Grow 2, Scale 3) and R1,500 per extra round; rush delivery R3,500.
•  Package timelines (Micro ~1 week, Launch ~2, Grow ~3–4, Scale ~4–6), one month of support, Care Plan and Full Service terms, reply time 1–2 business days.
NEW COPY TO CONFIRM BEFORE LAUNCH
•  Each step’s “What we do / What you do / What you get” lists and the share of the timeline (15/15/30/20/20%). They describe how you work today in plain terms; adjust anything that isn’t true.
•  “Feedback within 3 working days of each review link”.
•  “A named project lead”, “Weekly progress update” and the three standard calls (kick-off, design walk-through, handover).
•  “Fixes for things we got wrong never use up a round” and “Changing direction after design approval counts as new scope”.
•  Process FAQ answers for: slow content or feedback, seeing the site while it’s built, and who owns the website (ownership needs your decision; it also belongs in the Terms).
FIXES ELSEWHERE
•  FAQ answer 06 (“most projects take 4–6 weeks”) should match this page’s package timelines.
•  The project tracker in the hero is an illustration (labelled EXAMPLE). If you later give clients a live project dashboard, this is its design language.
DATA
•  Package timelines, revision rounds, prices and the support month come from the shared pricing collection, so this page never disagrees with /pricing.

### Notes · /process motion & interaction — node 85:214
MOTION & INTERACTION
Section behaviour
HERO
•  Headline LINE MASK, copy and quick facts FADE-UP (numbers COUNT-UP).
•  Project tracker: card FADE-UP + scale 0.96→1; the six progress segments fill one by one (coral for done, peach for current), then the checklist rows tick in. Loops once only.
STEP NAV & TIMELINE
•  Sticky step nav with scroll-spy (same as /services); clicking smooth-scrolls to the step card.
•  Gantt chart: each package row’s step segments grow left to right in sequence (scaleX, 80ms stagger, motion/xl total per row), rows 120ms apart. Hover a segment: tooltip “Design · about 30% of your timeline”.
STEP CARDS
•  Each card FADE-UPs; its big number LINE MASKs; the three columns STAGGER 100ms; payment and revision callouts slide in last (6px + fade).
•  Desktop: as each card crosses the middle of the viewport, its number in the sticky nav becomes active.
PAYMENTS, REVISIONS, NEEDS
•  Payment timeline: the coral payment blocks pop in at their step columns (ease/back) left to right, row by row.
•  Revisions table rows reveal top to bottom; the “counts / doesn’t count” cards STAGGER.
•  Needs checklist rows FADE-UP 60ms apart; their “when” pills slide in from the right.
AFTER LAUNCH, FAQ, CTA
•  After-launch strip fills left to right like a progress bar (motion/xl); option cards STAGGER. FAQ: shared accordion. CTA: shared gradient component.
MOBILE
•  Step chips stick under the header. Steps become an accordion (one open; the first open). Inside an open step, a segmented control switches We do / You do / You get (crossfade). The Gantt becomes one bar per package; the payment table becomes three cards.

## Layer-by-layer spec

### Process — Desktop (1440) — node 80:151 (1440×11204)
- **Process — Desktop (1440)** (col, 1440×11204, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "OUR PROCESS" (116×44)
  - **01 · Hero + project tracker** (col gap 48, pad 48/120/64/120, 1440×763, w:fill, bg canvas)
    - **Frame** (row gap 64, align center, 1200×651, w:fill)
      - **Frame** (col gap 24, 696×651, w:fill, grow)
        - ⧉ Tag Tone=Coral "OUR PROCESS"
        - T "HOW YOUR WEBSITE GETS BUILT, STEP BY STEP." — Oswald Medium 104/92%, ink
        - T "Every project follows the same six steps, run by one team. Here’s exactly what happens at each one: what we do, what we need from you, what you get, how long it takes and when you pay." — IBM Plex Sans Regular 18/155%, muted
        - **Quick facts** (row gap 10, 696×81) — 4 tiles (col, pad 12/16/12/16, w:fill, grow, bg surface, r 16, border line 1): T value — Oswald Medium 26, ink + T label — IBM Plex Sans Regular 12, muted — "6" steps · "1–6" weeks, by package · "1" fixed price · "1 month" support included
      - **Project tracker (illustrative)** (col gap 16, pad 28, 440×349, bg plum, r 32, shadow 0 30 60 #2E1747@25%)
        - **Frame** (row, align space_between/center): **Frame** (col): T "Your project" — IBM Plex Sans Regular 12, onDarkMuted + T "Grow website" — IBM Plex Sans SemiBold 18, surface · ⧉ Tag Tone=OnDark "EXAMPLE"
        - **Progress segments** (row gap 4, 384×8): 6 × rectangle 61×8 r99 — 2 coral (done), 1 peach (current), 3 #FFFFFF @15%
        - **Current step** (row gap 12, pad 14/16/14/16, align center, 384×64, w:fill, bg surface, r 18): **Frame** (36×36, bg blush, r 999) icon eye 18px · **Frame** (col, w:fill, grow): T "Step 3 of 6 · Design" — IBM Plex Sans SemiBold 15, ink + T "First homepage design ready for your review" — IBM Plex Sans Regular 12, muted
        - **Checklist rows** (row gap 12, align center, 384×34): **Frame** (24×24, r 99) icon check 13px (done: bg coral; upcoming: bg surface) · **Frame** (col): T — IBM Plex Sans SemiBold 14, surface + T — IBM Plex Sans Regular 12, onDarkMuted
          - (done) "Research" "Brief and goals agreed" · (done) "Direction" "Wireframes approved" · (next) "Next: your feedback" "Review link sent · round 1 of 2"
  - **02 · Sticky step nav (scroll-spy)** (col gap 48, pad 0/120/24/120, 1440×75, w:fill, bg canvas)
    - **Step nav** (row gap 6, pad 6, align center, 1200×51, w:fill, bg surface, r 999, border line 1) — 7 equal chips (row gap 8, pad 10/14/10/14, align center/center, w:fill, grow, r 999): T "0n" — Oswald Medium 11 (peach when active, muted otherwise) · T name — IBM Plex Sans Medium 13 (surface active, ink otherwise); active chip bg ink
      - 00 Before we start (active) · 01 Research · 02 Direction · 03 Design · 04 Revisions · 05 Handoff · 06 Beyond launch
  - **03 · Before we start (step 00)** (col gap 48, pad 72/120/72/120, 1440×550, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Neutral "00 / BEFORE WE START" · T "From “yes” to kick-off." · side copy "Three short steps before the clock starts on your project."
    - **Frame** (row gap 16, align center, 1200×247) — 3 cards (col gap 12, pad 24, ~364×247, w:fill, h:fill, grow, bg surface, r 24, border line 1) separated by T "→" — IBM Plex Sans SemiBold 24, muted
      - Card: **Frame** (44×44, bg lilac, r 12) → icon 22px · T title — IBM Plex Sans SemiBold 19 ls -1%, ink · T body — IBM Plex Sans Regular 14/150%, muted · **Note** (row, pad 8/12/8/12, w:fill, bg canvas, r 12) T — IBM Plex Sans Medium 13, ink
      - receipt "Accept your fixed quote" / "One price, agreed before any work starts. Choose 50/50 or 12 instalments." / note "You pay: the deposit, or your first instalment, to book your slot."
      - doc "Complete your onboarding brief" / "A private online form for everything we need: business, goals, brand, content and access." / note "Saves as you go. Rough notes are fine."
      - cal "Kick-off call" / "We walk through your brief, confirm the plan and timeline, and agree how we’ll keep in touch." / note "You leave with dates for every step."
  - **04 · Timelines by package (Gantt)** (col gap 48, pad 120, 1440×802, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "HOW LONG IT TAKES" · T "Your timeline depends on your package." · side copy "Typical durations from kick-off to launch. Your exact dates are confirmed at kick-off and shown in your project plan."
    - **Timeline chart** (col gap 14, pad 28/32/28/32, 1200×344, w:fill, bg canvas, r 28)
      - **Axis** (row, pad 0/0/0/200, 1136×16): "Kick-off" · "Week 1" … "Week 6" — IBM Plex Sans Regular 12, muted (evenly spread across the 936px track ≈ 156px per week)
      - **Package rows** (row, align center, 1136×37): **Label** (col, 200 wide): T name — IBM Plex Sans SemiBold 16, ink + T duration — IBM Plex Sans Regular 12, muted · **Track** (free layout, 936×36, w:fill, grow) → segment rectangles h 36 r8 at x positions:
        - Step colours: Research #2E1848 · Direction #5B3A7A · Design #EF4A23 · Revisions #F7B48F · Handoff #9A3348 · Beyond launch #E3F1EA with a line stroke (always 124 wide = the support month)
        - Micro "~1 week": 18@0 · 18@21 · 38@41 · 25@83 · 25@110 · support 124@144
        - Launch "~2 weeks": 38@0 · 38@41 · 80@83 · 52@165 · 52@220 · support 124@281
        - Grow "~3–4 weeks": 69@0 · 69@72 · 141@144 · 93@289 · 93@385 · support 124@487
        - Scale "~4–6 weeks": 100@0 · 100@103 · 203@206 · 135@413 · 135@550 · support 124@694
      - **Legend** (row wrap gap 16, pad 8/0/0/0): swatch rectangle 14×14 r4 + T — IBM Plex Sans Regular 12, muted: "Research" · "Direction" · "Design" · "Revisions" · "Handoff" · "Beyond launch (1 month, after launch)"
      - T "Step proportions are indicative. Rush delivery (R3,500) cuts about a week; late content or feedback moves dates, not the price." — IBM Plex Sans Regular 12, muted
  - **05 · The six steps (deep dives)** (col gap 24, pad 120, 1440×2771, w:fill, bg canvas)
    - **Frame** (col gap 16, pad 0/0/24/0): ⧉ Tag Tone=Coral "THE SIX STEPS" · T "Every step, in detail." — IBM Plex Sans SemiBold 56/106% ls -3%, ink
    - **Step card template** (row gap 40, pad 40, 1200 wide, w:fill, bg surface, r 32, border line 1)
      - **Left** (col gap 16, 340 wide): **Frame** (row gap 12, align center): T "0n" — Oswald Medium 64/100%, coral + **Frame** (44×44, bg lilac, r 12) → icon 22px · T step — IBM Plex Sans SemiBold 32 ls -2%, ink · T description — IBM Plex Sans Regular 16/155%, muted · **Time pill** (row gap 8, pad 8/14/8/12, align center, bg canvas, r 99): icon clock 14px + T "About {n}% of your timeline" — IBM Plex Sans Medium 13, ink · optional callout
      - **Columns** (row gap 16, 738 wide, w:fill, grow) — 3 columns (col gap 12, pad 20, w:fill, h:fill, grow, r 20):
        - Header (row gap 8, align center): icon 16px + T — Oswald Medium 11 ls 6%, muted: users "WHAT WE DO" (bg canvas) · user "WHAT YOU DO" (bg canvas) · gift "WHAT YOU GET" (bg mint)
        - Items (row gap 8): icon check 14px + T — IBM Plex Sans Regular 14/145%, ink
      - **Payment moment callout** (row gap 10, pad 12/14/12/14, 340 wide, w:fill, bg blush, r 16): icon wallet 18px · **Frame** (col gap 2): T "PAYMENT" — Oswald Medium 10 ls 6%, coral + T — IBM Plex Sans Medium 13/145%, ink
      - **Revision rounds callout** (col gap 6, pad 12/14/12/14, bg lilac, r 16): T "REVISION ROUNDS" — Oswald Medium 10 ls 6%, plum + lines IBM Plex Sans Medium 13, ink
    - **01 Research** (icon search; "About 15% of your timeline") — "We understand your goals, users and friction points before shaping the solution."
      - Payment callout: "Deposit or first instalment paid at booking"
      - We do: "Review your onboarding brief and goals" · "Study your customers and competitors" · "Audit your current site and search presence, if you have one" · "Research the search terms and areas to target"
      - You do: "Complete your onboarding brief" · "Join the kick-off call" · "Approve access through our secure request"
      - You get: "A written project plan: goals, pages and how we’ll measure success" · "A first sitemap" · "Dates for every step"
    - **02 Direction** (icon compass; 15%) — "We turn insights into flows, wireframes and prototypes that make the direction clear."
      - We do: "Page structure and navigation" · "Wireframes for your key pages" · "The visitor journey to your ONE main action" · "A content plan: who writes what, by when"
      - You do: "Review the wireframes" · "Approve the structure" · "Start gathering any content you’re supplying"
      - You get: "Approved sitemap and wireframes" · "A content checklist with due dates"
    - **03 Design** (icon pen; 30%) — "We design the interface, system, content and assets with careful production detail."
      - We do: "Visual design for your homepage and key pages" · "Mobile-first layouts" · "Copywriting, if it’s part of your package" · "Your site built on a private review link"
      - You do: "Review designs on the review link" · "Supply the remaining content and photos"
      - You get: "Your designed site, live on a private preview link"
    - **04 Revisions** (icon refresh; 20%) — "We refine the work against your feedback, tightening details until everything holds up."
      - Revision rounds callout: "Micro & Launch: 1 round" · "Grow: 2 rounds" · "Scale: 3 rounds" · "Extra rounds: R1,500 each"
      - We do: "Apply your feedback, round by round" · "Test on phones, tablets and desktops" · "Speed, accessibility and SEO checks"
      - You do: "Send one combined set of feedback per round" · "Final approver signs off"
      - You get: "An approved, tested site, ready to launch"
    - **05 Handoff** (icon rocket; 20%) — "We hand off files, guidelines and support so the work lands cleanly."
      - Payment callout: "50/50: balance due before handover · 12-month plan: instalments 2–12 start once your site is completed"
      - We do: "Launch and connect your domain" · "Submit your site to Google Search Console" · "Set up analytics behind a consent banner" · "Hand over logins, files and a short guide" · "Scale: a 1-hour training session"
      - You do: "Approve go-live" · "Settle the balance (50/50 option)"
      - You get: "Your live website" · "All files and access details" · "A handover guide"
    - **06 Beyond launch** — dark variant: card bg plum, no border, number peach, icon chip bg coral (icon heart), title surface, description onDarkMuted, time pill bg #FFFFFF @10% "1 month after launch" (surface text); columns bg #FFFFFF @6% (You get: #FFFFFF @12%), headers peach, item text surface
      - Description "One month of support, included."
      - We do: "Fix anything that isn’t right" · "Keep an eye on speed, uptime and forms" · "Small tweaks as real visitors arrive"
      - You do: "Tell us if anything looks off"
      - You get: "A smooth first month, then a choice of ongoing care"
  - **06 · When you pay (payments on the timeline)** (col gap 48, pad 120, 1440×987, w:fill, bg plum)
    - **Section header** (light-on-dark): ⧉ Tag Tone=OnDark "WHEN YOU PAY" · T "Payments, mapped to the work." — surface · side copy "One fixed price either way. Here’s exactly when each payment falls." — onDarkMuted
    - **Payment timeline** (col, 1200×460, w:fill, bg #FFFFFF @6%, r 28)
      - **Header row** (row, pad 16/0/16/0): label cell (220 wide, pad left 24) T "STEP" — Oswald Medium 11 ls 6%, onDarkMuted · 7 equal step columns (pad left 8, w:fill, grow) T — IBM Plex Sans Medium 13, surface: "Book" · "Research" · "Direction" · "Design" · "Revisions" · "Handoff" · "After launch"
      - **Plan rows** (row, pad 18/0/18/0, align center, 137 tall, border #FFFFFF @12% 1/0/0/0): label (col gap 2, pad left 24, 220 wide): T plan — IBM Plex Sans SemiBold 16, surface + T sub — IBM Plex Sans Regular 12, onDarkMuted · step cells (row, pad 0/8/0/8, w:fill, grow) holding payment blocks (col gap 2, pad 10/12/10/12, w:fill, r 14): T amount — Oswald Medium 18, surface + T caption — IBM Plex Sans Regular 11, surface. Due payments bg coral; ongoing monthly bg #FFFFFF @12%.
        - "50 / 50" / "Deposit + completion": Book → coral "50%" "to book your slot" · Handoff → coral "50%" "before handover"
        - "12 instalments" / "Same total, spread": Book → coral "1 of 12" "books your slot" · Handoff → coral "2 of 12" "starts on completion" · After launch → ongoing "3–12" "monthly"
        - "Website Launch Offer" / "R845 × 12": Book → coral "R845" "month 1" · Research → ongoing "R845" "monthly" · After launch → ongoing "…to month 12"
    - T "Instalments 2–12 only begin once your site is completed; if the build takes longer because of us, your payments wait too." — IBM Plex Sans Medium 15/150%, peach
  - **07 · How revisions work** (col gap 48, pad 120, 1440×838, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "REVISIONS" · T "Clear rounds, so feedback never drags on." · side copy "A round is one combined set of feedback from your final approver, which we then apply in full."
    - **Frame** (row gap 24, 1200×380)
      - **Rounds by package** (col, 588×380, w:fill, grow, bg canvas, r 24)
        - Header (row, pad 16/24/16/24, bg lilac): T "Package" · T "Rounds included" — Oswald Medium 12 ls 6%, plum (space-between)
        - Rows (row, pad 16/24/16/24, 66 tall, border line 1/0/0/0, space-between): T — IBM Plex Sans SemiBold 16, ink · T — Oswald Medium 22, ink
          - "Micro" "1" · "Launch" "1" · "Grow" "2" · "Scale" "3" · "Extra round" "R1,500 each" (coral)
      - **Frame** (col gap 12, 588 wide, w:fill, grow)
        - **Counts as one round** (col gap 10, pad 20/24/20/24, w:fill, bg mint, r 24): T "Counts as one round" — IBM Plex Sans SemiBold 17, ink · rows (row gap 10): **Frame** (22×22, bg surface, r 99) icon check 11px + T — IBM Plex Sans Regular 14/150%, ink
          - "All your feedback on a design, sent together" · "Comments from everyone, combined by your final approver" · "Fixes for things we got wrong (these never use up a round)"
        - **Counts as new scope (quoted first)** (col gap 10, pad 20/24/20/24, w:fill, bg blush, r 24): T "Counts as new scope (quoted first)" · rows with icon x 11px:
          - "A new page or feature that wasn’t in your quote" · (continues in the next chunk)

          - "Changing direction after the design is approved"
  - **08 · What we need from you, and when** (col gap 48, pad 120, 1440×1009, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Neutral "YOUR PART" · T "What we need from you, and when." · side copy "Most delays come from waiting on content. Here’s everything up front, so nothing catches you out."
    - **Needs checklist** (col, 1200×439, w:fill, bg surface, r 28, border line 1) — rows (row gap 16, pad 16/24/16/24, align center, ~1198×73, w:fill; rows 2–6 border line 1/0/0/0): **Frame** (40×40, bg blush, r 12) → icon 20px · T — IBM Plex Sans Medium 16, ink (w:fill) · **When pill** (row, pad 6/12/6/12, bg canvas, r 99) T — IBM Plex Sans SemiBold 12, ink
      - doc "Your onboarding brief" — "Before kick-off"
      - key "Access to domain, hosting and email (via our secure request)" — "Research"
      - list "Approval of the sitemap and wireframes" — "End of Direction"
      - image "Your logo, photos and any text you’re supplying" — "Start of Design"
      - thumb "One combined set of feedback per round" — "Revisions"
      - check "Final sign-off from your approver" — "End of Revisions"
    - **Note** (row gap 12, pad 16/20/16/20, align center, 1200×64, w:fill, bg mint, r 18): **Frame** (32×32, bg surface, r 99) icon clock 16px · T "We ask for feedback within 3 working days of each review link. Late content or feedback moves the launch date, never the price." — IBM Plex Sans Medium 14/150%, ink
  - **09 · How we work together** (col gap 48, pad 120, 1440×836, w:fill, bg surface)
    - **Section header**: ⧉ Tag Tone=Neutral "WORKING TOGETHER" · T "One team. One project lead. No chasing." · side copy "You always know who’s working on your site and what’s happening next."
    - **Grid** (col gap 16) — 2 rows (row gap 16) of 3 cards (col gap 12, pad 24, 389×181, w:fill, h:fill, grow, bg canvas, r 24): **Frame** (44×44, bg lilac, r 12) → icon 22px · T — IBM Plex Sans SemiBold 18 ls -1%, ink · T — IBM Plex Sans Regular 14/150%, muted
      - user "A named project lead" "One person who knows your project, from kick-off to launch."
      - chat "WhatsApp and email" "Quick questions on WhatsApp; decisions confirmed in writing by email."
      - clock "Replies within 1–2 business days" "Usually much sooner during your project."
      - link "Private review links" "See your real site as it’s built, on any device."
      - video "Calls when they help" "Kick-off, design walk-through and handover; more if you need them."
      - list "Weekly progress update" "A short note: what’s done, what’s next, anything we need."
  - **10 · After launch** (col gap 48, pad 120, 1440×970, w:fill, bg canvas)
    - **Section header**: ⧉ Tag Tone=Neutral "AFTER LAUNCH" · T "Launch is the start, not the finish line." · side copy "Your first month of support is included. After that, choose how much you’d like us to look after."
    - **After-launch timeline** (row, 1200×125, w:fill, bg surface, r 24, border line 1, clip) — 4 segments (col gap 6, pad 18/20/18/20, w:fill, h:fill, grow; segments 2–4 border line 0/0/0/1): T label — Oswald Medium 12 ls 6% · T — IBM Plex Sans SemiBold 15/140%
      - bg coral (text surface): "LAUNCH" "Your site goes live"
      - bg mint: "MONTH 1" (muted) "Support included, every project" (ink)
      - bg lilac: "MONTHS 2–12" "On the 12-month plan: basic maintenance, health checks and monitoring included"
      - bg canvas: "THEN" "Care Plan, Full Service, or look after it yourself"
    - **Option cards** (row gap 20, 1200×339) — 3 cards (col gap 14, pad 28, ~388×339, w:fill, grow, r 28): **Frame** (48×48, r 14) → icon 24px · T — IBM Plex Sans SemiBold 22 ls -1% · T — IBM Plex Sans Regular 15/155% · **Price chip** (row gap 8, pad 8/12/8/12, align center, w:fill, r 12): icon wallet 14px + T — IBM Plex Sans SemiBold 13 · spacer (grow) · Button
      - bg surface, border line 1 (chip bg lilac, icon heart): "Look after it yourself" / "We hand over everything you need. You can always call on us later." / "Free" / ⧉ Button Style=Outline "Read the handover guide"
      - bg blush (chip bg surface, icon shield): "Website Care Plan" / "Round-the-clock monitoring, certificate tracking, updates, content changes and a monthly note." / "Priced per site · 30 days’ notice" / ⧉ Button Style=Outline "Ask about a Care Plan"
      - bg plum (chip bg coral, icon repeat, text surface / onDarkMuted, price chip bg #FFFFFF @10%): "Full Service" / "Hosting, mailboxes, ongoing SEO, updates and maintenance in one monthly price." / "From R1,500/month · cancel any time" / ⧉ Button Style=Coral "See Full Service pricing"
  - **11 · Process FAQ** (col gap 48, pad 120, 1440×757, w:fill, bg surface)
    - **Frame** (row gap 80): **Frame** (col gap 20, 400): ⧉ Tag Tone=Neutral "PROCESS QUESTIONS" · T "Questions about how it works." — IBM Plex Sans SemiBold 48/106% ls -2%, ink · ⧉ Button Style=Outline "All FAQs"
    - **Accordion** (col gap 10, 720×517) — items bg canvas on this white section
      - Open (pad 16/16/16/24, border ink 1.5): "What happens if the project scope changes partway through?" — "We’ll always let you know before any change affects the price. If you add scope beyond what was agreed, we quote it separately rather than silently adjusting what you’ve already agreed to pay."
      - Closed (720×68, border line 1, chip bg surface icon plus 17px): "What if I need to pause or cancel partway through?" · "What if I’m slow with content or feedback?" · "Can I see the site while it’s being built?" · "Who owns the website when it’s done?" · "What happens after my website launches?"
  - **12 · CTA + footer** (col gap 24, pad 24/24/40/24, 1440×739, w:fill)
    - **CTA card** (row gap 48, pad 96, align space_between/max, 1392×489, w:fill, bg #3A1A44, r 40)
      - **Frame** (col gap 24, 880×297, w:fill, grow): ⧉ Tag Tone=OnDark "READY WHEN YOU ARE" · T "STEP ONE IS A CONVERSATION." — Oswald Medium 104/92%, surface · T "Tell us about your business. We’ll come back with a fixed price, a timeline and the dates for every step." — IBM Plex Sans Regular 18/150%, surface
      - **Frame** (col gap 12, 320×116): ⧉ Button Style=Light "Start your project" · ⧉ Button Style=Coral "See pricing"
    - **Footer** — desktop footer with LEGAL column (STUDIO here: About · Process · Work · Insights)

### Process — Mobile (390) — node 84:186 (390×3839)
- **Process — Mobile** (col, 390×3839, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 16, pad 16/20/24/20, 390×450, w:fill, bg canvas)
    - ⧉ Tag Tone=Coral "OUR PROCESS"
    - T "HOW YOUR WEBSITE GETS BUILT, STEP BY STEP." — Oswald Medium 50/94%, ink
    - T "Six steps, one team. What we do, what you do, what you get, how long it takes and when you pay." — IBM Plex Sans Regular 16/155%, muted
    - **Quick facts** (row gap 8, 350×69): 3 tiles (col, pad 10/12/10/12, w:fill, grow, bg surface, r 14, border line 1): T — Oswald Medium 22, ink + T — IBM Plex Sans Regular 11, muted — "6" steps · "1–6" weeks · "1" fixed price
    - (The project tracker is desktop-only.)
  - **02 · Sticky step chips** (col gap 16, pad 4/0/8/20, 390×51, w:fill, bg canvas) — horizontally scrolling chips (row, pad 10/14/10/14, r 999) T — IBM Plex Sans Medium 13: "Before" · "01 Research" (active: bg ink, surface) · "02 Direction" · "03 Design" · "04 Revisions" · "05 Handoff" · "06 After" (inactive: bg surface, border line 1, ink)
  - **03 · Timeline by package** (col gap 16, pad 40/20/40/20, 390×324, w:fill, bg surface)
    - T "How long it takes" — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Package bars** (col gap 6, 350×36): **Frame** (row, align space_between): T name — IBM Plex Sans SemiBold 14, ink + T duration — IBM Plex Sans Regular 12, muted · track (350×12, bg canvas, r 99) → coral fill r99
      - "Micro" "~1 week" fill 58 · "Launch" "~2 weeks" fill 117 · "Grow" "~3–4 weeks" fill 204 · "Scale" "~4–6 weeks" fill 292
  - **04 · Steps (accordion)** (col gap 16, pad 40/20/40/20, 390×917, w:fill, bg canvas)
    - T "Every step, in detail." — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Step (open)** (col gap 12, pad 16/14/16/16, 350×340, w:fill, bg surface, r 20, border ink 1.5)
      - **Head** (row gap 12, align center): T "01" — Oswald Medium 26, coral · T "Research" — IBM Plex Sans SemiBold 18 ls -1%, ink · **Frame** (30×30, bg ink, r 999) icon minus 15px
      - T "We understand your goals, users and friction points before shaping the solution." — IBM Plex Sans Regular 14/150%, muted
      - **Pills** (row gap 8): (row gap 6, pad 6/12/6/10, r 99) icon 12px + T — IBM Plex Sans Medium 12, ink — clock "~15% of timeline" (bg canvas) · wallet "Paid at booking" (bg blush)
      - **Segmented** (row gap 4, pad 4, 317×40, bg canvas, r 999): "We do" (selected bg ink, surface) · "You do" · "You get" — IBM Plex Sans SemiBold 12
      - Items (row gap 8): icon check 14px + T — IBM Plex Sans Regular 14, ink — "Review your brief and goals" · "Study your customers and competitors" · "Audit your current site, if any" · "Research search terms and areas"
    - **Steps (closed)** (col, pad 16/14/16/16, 350×73, bg surface, r 20, border line 1): T "0n" — Oswald Medium 26, coral · T name — IBM Plex Sans SemiBold 18 ls -1%, ink · **Frame** (30×30, bg canvas, r 999) icon plus 15px — 02 Direction · 03 Design · 04 Revisions · 05 Handoff · 06 Beyond launch
  - **05 · When you pay** (col gap 16, pad 40/20/40/20, 390×431, w:fill, bg plum)
    - T "When you pay" — IBM Plex Sans SemiBold 28 ls -2%, surface
    - **Plan cards** (col gap 8, pad 14/16/14/16, 350×89, w:fill, bg #FFFFFF @8%, r 18): T plan — IBM Plex Sans SemiBold 16, surface · **Frame** (row gap 8): 2 blocks (row, pad 8/10/8/10, w:fill, grow, bg coral, r 12) T — IBM Plex Sans Medium 12, surface
      - "50 / 50": "50% at booking" · "50% before handover"
      - "12 instalments": "1st at booking" · "2–12 from completion"
      - "Launch Offer": "R845 monthly" · "for 12 months"
  - **06 · Revisions + your part** (col gap 16, pad 40/20/40/20, 390×633, w:fill, bg canvas)
    - T "Revisions and your part" — IBM Plex Sans SemiBold 28 ls -2%, ink
    - **Rounds** (row gap 8, 350×72): 4 tiles (col, pad 10, align center, w:fill, grow, bg surface, r 14, border line 1): T — Oswald Medium 24, ink + T — IBM Plex Sans Regular 11, muted — "1" Micro · "1" Launch · "2" Grow · "3" Scale
    - T "Extra rounds R1,500 each." — IBM Plex Sans Medium 13, coral
    - **Needs rows** (row gap 10, pad 12/12/12/14, align center, 350×50, w:fill, bg surface, r 14, border line 1): T — IBM Plex Sans Medium 14, ink (w:fill) · when pill (row, pad 5/10/5/10, bg canvas, r 99) T — IBM Plex Sans SemiBold 11, ink
      - "Onboarding brief" "Before kick-off" · "Secure access" "Research" · "Wireframe approval" "Direction" · "Logo, photos, text" "Design" · "Combined feedback" "Revisions" · "Final sign-off" "Revisions"
  - **07 · After launch** (col gap 16, pad 40/20/40/20, 390×444, w:fill, bg surface)
    - T "After launch" — IBM Plex Sans SemiBold 28 ls -2%, ink
    - Tiles (col gap 2, pad 14/16/14/16, 350×66, w:fill, r 16): T — IBM Plex Sans SemiBold 15 + T — IBM Plex Sans Regular 12
      - bg mint "Month 1" "Support included" · bg canvas "Look after it yourself" "Free · handover guide" · bg blush "Care Plan" "Per site · 30 days’ notice" · bg plum (surface / onDarkMuted) "Full Service" "From R1,500/month"
  - **08 · CTA + footer** (col gap 16, pad 12/12/32/12, 390×511, w:fill, bg canvas)
    - **CTA card** (col gap 20, pad 48/24/24/24, 366×294, w:fill, bg #3A1A44, r 32): T "STEP ONE IS A CONVERSATION." — Oswald Medium 42/94%, surface · ⧉ Button Style=Light "Start your project" (318×52, w:fill) · ⧉ Button Style=Coral "See pricing" (318×52, w:fill)
    - **Footer** — mobile footer with LEGAL column: STUDIO (About · Process · Work) · SERVICES (Websites · Full service · SEO) · LEGAL (Notice · Privacy · Terms)

