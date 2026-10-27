# Start your project (multi-step)

| | |
|---|---|
| **URL** | `/start-project (?plan, ?package, ?service, ?intent, ?ref)` |
| **Figma page** | `24:150` |
| **Desktop frame (1440)** | 24:151 |
| **Mobile frame (390)** | 26:171, 26:248, 26:323 |
| **Extra states / boards** | ?plan=launch 25:151 · ?intent=quote 25:242 · validation 25:302 · sent 25:387 · failed 25:428 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Step 2 is not drawn. Build it in the same style from the notes and show it for sign-off.
- Whitelist every query value (list in the README, section 7).
- Auto-reply email spec is in the page note.
- No-JS: the form posts to the server and redirects to /thanks?form=start-project.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /start-project data, URL parameters & submission — node 27:176
PAGE · READ FIRST
/start-project: URL parameters, data and submission
PROJECT ENQUIRIES (UPDATED · 26 OCT 2026)
•  Every “Start your project”, “Claim a launch spot” and “Get a fixed quote” link points to /start-project.
•  /contact is its own page again (see the “Contact” page) for general questions, existing clients and direct channels. The earlier 301 redirect is cancelled; only /contact links that carry ?plan or ?intent are sent here with their parameters.
•  The sidebar keeps email, WhatsApp and location as a shortcut.
STEPS AND FIELDS (SAME AS THE LIVE FORM)
•  Step 1 · service: new-website | redesign | full-service | not-sure.
•  Step 2 · size: starter | standard | custom | not-sure.
•  Step 3 · timeline: asap | 1-3-months | 3-6-months | exploring.
•  Step 4 · fullName (required), businessName, email (required), phone, message. Plus a hidden honeypot field (“website”) for spam.
URL PARAMETERS (WHITELISTED VALUES ONLY)
•  ?plan=launch → coral “Launch offer” banner (price and spots from the same CMS values as homepage section 03). Pre-answers service = new-website and size = starter, and opens at Step 3. Summary shows “Plan · Launch · R845/mo”.
•  If the launch offer is sold out when they arrive, ?plan=launch behaves exactly like ?plan=launch-waitlist.
•  ?plan=launch-waitlist → banner “Join the {Next month} waitlist”, same pre-answers, submit button reads “Join the waitlist”.
•  ?intent=quote → lilac “Fixed quote” banner, nothing pre-answered, submit button reads “Request my fixed quote”.
•  ?service=new-website | redesign | full-service | not-sure → pre-answers Step 1 and opens at Step 2 (use from the /services/… pages).
•  ?ref=home | work | case-{slug} | service-{slug} → stored as a hidden field. For case-{slug}, the sidebar shows a mint chip “You came from the {Project} case study” (name looked up from the slug; unknown slug = no chip).
•  utm_source, utm_medium, utm_campaign, utm_term and utm_content are kept as hidden fields.
•  Parameters combine: plan + ref both apply. If plan and intent are both present, the plan banner shows and intent is still stored.
•  Unknown values are ignored silently. Never write raw parameter text into the page.
•  “Remove” on a banner clears that parameter (history.replaceState), keeps any answers given, and stays on the current step.
STEP STATE
•  Each step change adds ?step=n with history.pushState, so the browser Back button goes to the previous step.
•  Answers are kept in sessionStorage, so a refresh or an accidental Back keeps everything. Cleared after a successful send.
SUBMISSION
•  POST to the existing form endpoint. Payload: all answers, plan, intent, ref, UTMs, page URL and timestamp.
•  Email subject to GoodGround, e.g. “New enquiry · Launch · New website · from case-b3tter-bottle”.
•  Validation runs in the browser and again on the server. Reject submissions where the honeypot is filled or the form was sent less than 3 seconds after loading.
•  Success → success state, plus an automatic confirmation email to the visitor with a copy of their answers (confirmed: see “Auto-reply email” below).
•  Failure → send-failed state. Answers kept; “Email my answers instead” opens a mailto: with subject and body pre-filled.
ANALYTICS & SEO
•  Events: step_view (n), step_complete (n, answer), enquiry_sent (plan, intent, ref, service). Never send name, email or phone to analytics.
•  <title>: “Start Your Project | GoodGround Website Development”. JSON-LD WebPage (ContactPage + LocalBusiness now live on /contact). Filtered or parameter URLs are canonical to /start-project.
AUTO-REPLY EMAIL (CONFIRMED · 26 OCT 2026)
•  When: sent by the server straight after the enquiry is saved and passes spam checks (honeypot and the 3-second rule). Never sent for rejected submissions.
•  From: “GoodGround <hello@goodground.co.za>”, Reply-To: hello@goodground.co.za, so a reply goes straight to the team.
•  Subject: “We’ve got your enquiry, {First name}”. Waitlist: “You’re on the {Month} launch waitlist”. Quote: “Your fixed-quote request is in”.
•  Body, in this order: thank-you line → a summary of their answers (service, size, timeline, plan if any, their message) → “What happens next” (reply within 1–2 business days → short call → one fixed price, paid 50/50 or over 12 months) → link to /work → sign-off from the team with email and WhatsApp.
•  Format: simple branded HTML (logo, canvas background, ink text, one coral link) plus a plain-text version. No tracking pixels or click tracking.
•  Delivery: use a transactional email provider with SPF, DKIM and DMARC set up for goodground.co.za so it lands in the inbox, not spam.
•  Limits: at most one auto-reply per email address every 10 minutes. If the auto-reply fails, the enquiry still counts as sent (log the failure; never show the visitor an error for it).
•  Success screen copy stays: “We’ve sent a copy to {email}”.

> Build note: other query values used elsewhere in the designs — ?ref=industry-{slug}, ?ref=industry-other (leave the industry empty), ?ref=service-{slug}, ?ref=services, ?ref=services-consult, ?ref=about, ?ref=work, ?ref=insights, ?ref=404, ?service=full-service&ref=pricing, ?intent=seo-audit, ?package=micro|launch|grow|scale (from the pricing notes) — must be added to the whitelist.

### Notes · SP Header — node 27:223
00 · Site header
BEHAVIOUR
•  Same header as the rest of the site (light variant). Centre pill “START YOUR PROJECT” is the current page; hidden on mobile.

### Notes · SP Main — node 27:198
01 · Intro, form card and sidebar
ENTRANCE
•  Tag FADE-UP → title LINE MASK (120ms per line) → intro copy FADE-UP.
•  Form card FADE-UP at +200ms. Sidebar cards STAGGER GRID 100ms. A context banner (if any) slides down + fades in after the card lands (motion/md).
OPTIONS (STEPS 1–3)
•  Each step is a radiogroup of option cards. Hover: border ink 1.5px, background canvas (motion/sm).
•  Selecting: border coral 2px, background blush, icon chip turns white with a coral icon, radio fills coral and its check pops in (scale 0.6 → 1, ease/back).
•  Mouse or touch selection auto-advances 350ms later, so the choice is seen. Keyboard: arrow keys move the selection without advancing; Enter or Space advances.
•  “Back” returns to the previous step with its answer still selected.
STEP TRANSITION
•  Outgoing content: translateX -24px + fade out, 200ms. Incoming: translateX 24px → 0 + fade in, 300ms, ease/out. Going Back reverses the direction.
•  The card’s height animates between steps (measure, then transition height, motion/md, ease/in-out).
•  Progress: the next segment fills scaleX 0 → 1 (motion/md); the current step label turns semibold.
•  Focus moves to the new step’s question (tabindex="-1"), and an aria-live region announces “Step 2 of 4: How big is the project?”.
SIDEBAR
•  Sticky (top 120px) while the form scrolls.
•  When an answer is chosen, its row value crossfades from “—” to the answer and the row flashes blush for 600ms. An “Edit” link appears and jumps back to that step.
STEP 4 · DETAILS
•  Labels sit above fields (no floating labels). Focus: 2px ink ring.
•  Correct autocomplete and keyboard: name, organization, email (type="email"), tel (type="tel", inputmode="tel").
•  Errors appear on blur or submit, never while typing the first time. The error text slides down 4px + fades in; the field turns blush with a coral border and icon. aria-invalid and aria-describedby are set.
•  On submit with errors: focus the first invalid field and scroll it into view.
•  Sending: button label “Sending…”, the arrow chip becomes a spinner, the button is disabled (minimum 600ms so it never flickers).
SUCCESS & FAILURE
•  Success: the form card content crossfades to the success state; the check icon draws in (stroke, 500ms) and its chip scales 0.8 → 1. Focus moves to the success heading.
•  Failure: the error banner (role="alert") slides down above the button; nothing typed is lost.
MOBILE
•  Intro shows on Step 1 only. After the first answer, the page smooth-scrolls so the progress bar sits at the top.
•  The progress bar (with Back and “Step n of 4”) sticks under the header with a 12px backdrop blur.
•  The sidebar becomes a collapsed “Your answers (n)” accordion at the bottom of each step. “What happens next” and direct contact show on Step 1 and on the success screen only.
•  Option cards are full width, at least 64px tall. Same step transitions.

### Notes · SP States — node 27:230
STATES
States shown below
ORDER
•  1 · Arrived with ?plan=launch (opens at Step 3).
•  2 · Arrived with ?intent=quote.
•  3 · Step 4 with a validation error and ?ref=case-b3tter-bottle.
•  4 · Sent successfully.
•  5 · Send failed.
•  Mobile equivalents of Step 1, the launch arrival and Step 4 are in the frames to the right of the desktop page.
EXAMPLE CONTENT
•  “Thandi Mokoena” and “Mokoena Plumbing” are made-up example data for the design only.

## Layer-by-layer spec

> The state frames carry a "STATE" kicker, a title and an explanation line at the top: those are annotations, not UI.

### Start project — Desktop (1440) · Step 1 default — node 24:151 (1440×1504)
- **Start project — Desktop (1440) · Step 1 default** (col, 1440×1504, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "START YOUR PROJECT" (156×44)
  - **01 · Main (form + summary)** (row gap 48, pad 48/120/120/120, 1440×1170, w:fill)
    - **Left column** (col gap 40, 752×1002, w:fill, grow)
      - **Intro** (col gap 20, 752×375, w:fill)
        - ⧉ Tag Tone=Coral "START YOUR PROJECT" (138×30)
        - T "LET’S PLANT SOMETHING ⏎ THAT GROWS." — Oswald Medium 88/94%, ink
        - T "A few quick questions, then your details. It takes about a minute, and there’s no obligation, just a starting point for the conversation." — IBM Plex Sans Regular 18/155%, muted
      - **Form card · Step 1** (col gap 32, pad 36/40/40/40, 752×587, w:fill, bg surface, r 32, border line 1)
        - **Progress** (col gap 12, 670×65, w:fill)
          - **Frame** (row, align space_between, 670×19): T "STEP 1 OF 4" — Oswald Medium 13 ls 6%, coral · T "About a minute" — IBM Plex Sans Regular 13, muted
          - **Segments** (row gap 6, 670×6): 4 × rectangle 163×6 r99 — done/current = ink, upcoming = line
          - **Labels** (row gap 6, 670×16): "Service" (IBM Plex Sans SemiBold 12, ink — current) · "Size" · "Timeline" · "Your details" (IBM Plex Sans Regular 12, muted)
        - **Question** (col gap 8, 670×71): T "What can we help you with?" — IBM Plex Sans SemiBold 32 ls -2%, ink · T "Choose the area you need help in." — IBM Plex Sans Regular 16, muted
        - **Options (radiogroup)** (col gap 16, 670×260, w:fill) — 2 rows (row gap 16) of 2 option cards
          - **Option card** (row gap 16, pad 20, ~327×112–132, w:fill, h:fill, grow, bg surface, r 20, border line 1): **Icon chip** (44×44, bg lilac, r 12) → icon 22px · **Frame** (col gap 4, w:fill, grow): T title — IBM Plex Sans SemiBold 18 ls -1%, ink + T sub — IBM Plex Sans Regular 14/150%, muted · **Radio** (22×22, bg surface, r 99, border line 1.5)
          - Hover state (shown on "Website redesign"): bg canvas, border ink 1.5
          - Selected state: bg blush, border coral 2, icon chip bg surface (coral icon), radio bg coral with icon check 13px
          - spark "New website" "A brand-new site, built from scratch." · refresh "Website redesign" "Rebuild or refresh an existing site." · repeat "Full Service" "Build, hosting, mailboxes, SEO and maintenance, monthly." · help "Not sure yet" "Help me work out what I need."
        - **Footer row** (row, align space_between/center, 670×17): **Frame** (row gap 8) icon lock 14px + T "No obligation. We never share your details." — IBM Plex Sans Regular 13, muted · T "Choosing an option moves you to the next step" — IBM Plex Sans Regular 13, muted
    - **Summary sidebar (sticky)** (col gap 20, 400×738)
      - **Your answers** (col, pad 24/28/12/28, 400×214, w:fill, bg surface, r 24, border line 1)
        - T "YOUR ANSWERS" — Oswald Medium 12 ls 6%, muted
        - Rows (row, pad 16/0/16/0, align space_between, 342×53, w:fill; rows 1–2 border line 0/0/1/0): T label — IBM Plex Sans Regular 15, muted · T value — IBM Plex Sans SemiBold 15 ("—" muted when empty, ink when answered, followed by an "Edit" link IBM Plex Sans Medium 12, coral)
          - "Service" · "Size" · "Timeline"
      - **What happens next** (col gap 16, pad 24/28/28/28, 400×222, w:fill, bg plum, r 24)
        - T "WHAT HAPPENS NEXT" — Oswald Medium 12 ls 6%, onDarkMuted
        - Steps (row gap 14, w:fill): **Number chip** (30×30, bg #FFFFFF @12%, r 99) → T "0n" — Oswald Medium 12, surface · T — IBM Plex Sans Medium 15/145%, surface
          - "01" "We reply within 1–2 business days" · "02" "A short call to understand your business" · "03" "One fixed price, paid 50/50 or over 12 months"
      - **Rather talk directly** (col, pad 24/28/12/28, 400×262, w:fill, bg surface, r 24, border line 1)
        - T "RATHER TALK DIRECTLY?" — Oswald Medium 12 ls 6%, muted
        - Rows (row gap 14, pad 14/0/14/0, align center, 342×69, w:fill; rows 1–2 border line 0/0/1/0): **Frame** (40×40, bg blush, r 999) → icon 20px · **Frame** (col gap 2, w:fill, grow): T label — IBM Plex Sans Regular 12, muted + T value — IBM Plex Sans SemiBold 15, ink
          - mail "Email" "hello@goodground.co.za" · chat "WhatsApp" "Message us" · pin "Based in" "George, Garden Route, Western Cape"
  - **02 · Footer** (row, pad 40/48/48/48, align space_between, 1440×227, w:fill, border line 1/0/0/0) — shared footer content (no CTA card on this page)

### Start project — Mobile · Step 1 default — node 26:171 (390×1208)
- **Start project — Mobile · Step 1 default** (col, 390×1208, bg canvas)
  - **Header** — shared mobile header
  - **Intro** (col gap 16, pad 24/20/8/20, 390×303, w:fill)
    - ⧉ Tag Tone=Coral "START YOUR PROJECT" (138×30)
    - T "LET’S PLANT ⏎ SOMETHING ⏎ THAT GROWS." — Oswald Medium 56/94%, ink
    - T "A few quick questions, then your details. About a minute, no obligation." — IBM Plex Sans Regular 16/155%, muted
  - **Sticky progress** (col gap 10, pad 14/20/14/20, 390×62, w:fill, bg canvas, border line 0/0/1/0; sticky with 12px backdrop blur)
    - **Frame** (row, align space_between/center, 350×18): left slot = T "About a minute" — IBM Plex Sans Regular 13, muted on Step 1, or **Back** (row gap 6) icon back 16px + T "Back" — IBM Plex Sans Medium 14, ink on later steps · T "STEP n OF 4" — Oswald Medium 12 ls 6%, coral
    - **Segments** (row gap 4, 350×5): 4 × rectangle 85×5 r99 (ink done, line upcoming)
  - **Body** (col gap 20, pad 24/20/32/20, 390×765, w:fill)
    - T "What can we help you with?" — IBM Plex Sans SemiBold 26 ls -1%, ink
    - T "Choose the area you need help in." — IBM Plex Sans Regular 15, muted
    - **Options** (col gap 10, 350×348) — option row (row gap 14, pad 16, align center, 350×75 (93 when text wraps), w:fill, bg surface, r 18, border line 1): icon chip 40×40 bg lilac r 12 (icon 20px) · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 16 ls -1%, ink + T — IBM Plex Sans Regular 13/140%, muted · radio 22×22 (border line 1.5)
      - Same four options as desktop
    - **What happens next** (col gap 12, pad 20, 350×146, w:fill, bg plum, r 20)
      - T "WHAT HAPPENS NEXT" — Oswald Medium 11 ls 6%, onDarkMuted
      - T "01  We reply within 1–2 business days" / "02  A short call about your business" / "03  One fixed price, 50/50 or 12 months" — IBM Plex Sans Medium 14, surface
    - **Direct contact** (row gap 10, 350×44, w:fill): 2 pills (row gap 8, pad 12/14/12/14, align center/center, w:fill, grow, bg surface, r 999, border line 1): icon mail 18px "Email us" · icon chat 18px "WhatsApp" — IBM Plex Sans Medium 14, ink
    - T "Based in George, Garden Route, Western Cape" — IBM Plex Sans Regular 13, muted

### Start project — Mobile · Step 3 (?plan=launch) — node 26:248 (390×774)
- **Start project — Mobile · Step 3 (?plan=launch)** (col, 390×774, bg canvas)
  - **Header** — shared mobile header (intro hidden after Step 1)
  - **Sticky progress** — Back + "STEP 3 OF 4"; segments 1–3 ink, 4 line
  - **Body** (col gap 20, pad 24/20/32/20, 390×634, w:fill)
    - **Context banner** (row gap 12, pad 14, 350×64, w:fill, bg blush, r 16)
      - **Frame** (32×32, bg surface, r 999) → icon tag 16px
      - **Frame** (col gap 2, w:fill, grow): T "Launch offer · R845/mo" — IBM Plex Sans SemiBold 14, ink · T "1 of 2 November spots left." — IBM Plex Sans Regular 12, muted
      - T "Remove" — IBM Plex Sans Medium 12, coral
    - T "When would you like to start?" — IBM Plex Sans SemiBold 26 ls -1%, ink
    - T "No pressure, it just helps us plan." — IBM Plex Sans Regular 15, muted
    - **Options** (col gap 10, 350×332)
      - **Selected** "As soon as possible" / "We’re ready to go." — row bg blush, border coral 2, icon chip bg surface (icon zap 20px), radio bg coral with icon check 13px
      - icon cal "In 1–3 months" / "Planning ahead." · icon cal "In 3–6 months" / "On the horizon." · icon compass "Just exploring" / "Gathering information."
    - **Your answers (collapsible)** (col, pad 14/18/14/18, 350×48, w:fill, bg surface, r 18, border line 1): **Frame** (row, align space_between/center) T "Your answers (3)" — IBM Plex Sans SemiBold 14, ink · icon chevron 18px

### Start project — Mobile · Step 4 details — node 26:323 (390×980)
- **Start project — Mobile · Step 4 details** (col, 390×980, bg canvas)
  - **Header** + **Sticky progress** (Back, "STEP 4 OF 4", all 4 segments ink)
  - **Body** (col gap 20, pad 24/20/32/20, 390×840, w:fill)
    - T "How can we reach you?" — IBM Plex Sans SemiBold 26 ls -1%, ink
    - T "We’ll reply within 1–2 business days." — IBM Plex Sans Regular 15, muted
    - **Fields** (col gap 6, 350 wide): label row (row gap 6) T — IBM Plex Sans Medium 14, ink + optional "Optional" — IBM Plex Sans Regular 13, muted · input (row, pad 14/16/14/16, 350×51, w:fill, bg surface, r 14, border line 1) value IBM Plex Sans Regular 16 (ink when filled, muted placeholder)
      - "Full name" / "Thandi Mokoena" (filled) · "Business name" Optional / "Business name" · "Email" / "name@business.co.za" · "Phone" Optional / "082 000 0000" · "Anything else?" Optional / textarea 350×110 "Tell us more about what you’re building."
    - **Your answers (collapsible)** — "Your answers (3)" + chevron
    - ⧉ Button Style=Coral "Send your enquiry" (350×52, w:fill)
    - T "We never share your details." — IBM Plex Sans Regular 12, muted

### State · Arrived with ?plan=launch (from “Claim a launch spot”) — node 25:151 (1440×899)
Annotation: "Service and size are pre-answered from the offer, so the visitor lands on Step 3. They can still go Back and change anything."
- **Layout** (row gap 48, pad 0/72/0/72, 1344×698)
  - **Form card · Step 3 · launch** (col gap 28, pad 36/40/40/40, 752×698, w:fill, grow, bg surface, r 32, border line 1)
    - **Progress** (col gap 12, 670×37): **Frame** (row, align space_between/center): T "STEP 3 OF 4" — Oswald Medium 13 ls 6%, coral · **Back** (row gap 6) icon back 14px + T "Back" — IBM Plex Sans Medium 13, muted · segments 1–3 ink, 4 line (163×6)
    - **Context banner** (row gap 14, pad 16/18/16/18, 670×74, w:fill, bg blush, r 18)
      - **Frame** (36×36, bg surface, r 999) → icon tag 18px
      - **Frame** (col gap 2, w:fill, grow): T "Launch offer · R845 a month for 12 months" — IBM Plex Sans SemiBold 15, ink · T "Domain, hosting and email included. 1 of 2 November spots left." — IBM Plex Sans Regular 13/150%, muted
      - T "Remove" — IBM Plex Sans Medium 13, coral
    - **Question** (col gap 8): T "When would you like to start?" — IBM Plex Sans SemiBold 32 ls -2%, ink · T "No pressure, it just helps us plan ahead." — IBM Plex Sans Regular 16, muted
    - **Options (single column on Step 3)** (col gap 12, 670×354) — rows (row gap 16, pad 18/20/18/20, align center, 670×79, w:fill, r 20): icon chip 40×40 r 12 (icon 20px) · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 17 ls -1%, ink + T — IBM Plex Sans Regular 13, muted · radio 22×22
      - Selected (bg blush, border coral 2, chip bg surface, radio coral + check): zap "As soon as possible" "We’re ready to go."
      - Default (bg surface, border line 1, chip bg lilac): cal "In 1–3 months" "Planning ahead." · cal "In 3–6 months" "On the horizon." · compass "Just exploring" "Gathering information for now."
  - **Summary sidebar** (col gap 16, 400×243) → **Your answers** (col, pad 24/28/12/28, bg surface, r 24, border line 1)
    - T "YOUR ANSWERS" — Oswald Medium 12 ls 6%, muted
    - Rows (row gap 12, pad 14/0/14/0, align space_between/center, 342×47, border bottom except last): label IBM Plex Sans Regular 14, muted · **Frame** (row gap 10, align center): value IBM Plex Sans SemiBold 14, ink + "Edit" IBM Plex Sans Medium 12, coral
      - "Plan" "Launch · R845/mo" (no Edit) · "Service" "New website" Edit · "Size" "Starter" Edit · "Timeline" "As soon as possible" Edit

### State · Arrived with ?intent=quote (from “Get a fixed quote”) — node 25:242 (1440×812)
Annotation: "No answers are pre-filled; the banner and the final button change to match the visitor’s intent."
- **Form card · Step 1 · quote** (col gap 28, pad 36/40/40/40, 752×611, w:fill, grow, bg surface, r 32, border line 1)
  - **Progress**: T "STEP 1 OF 4" · segment 1 ink, 2–4 line
  - **Context banner** (row gap 14, pad 16/18/16/18, 670×74, w:fill, bg lilac, r 18)
    - **Frame** (36×36, bg surface, r 999) → icon tag 18px
    - **Frame** (col gap 2, w:fill, grow): T "You’re asking for a fixed quote" — IBM Plex Sans SemiBold 15, ink · T "We’ll reply with one fixed price and both ways to pay: 50/50, or 12 monthly instalments." — IBM Plex Sans Regular 13/150%, muted
  - T "What can we help you with?" — IBM Plex Sans SemiBold 32 ls -2%, ink
  - **Options** (col gap 12) — same row style as the launch state: "New website" "A brand-new site, built from scratch." · "Website redesign" "Rebuild or refresh an existing site." · (annotation) "…same four options as Step 1. On Step 4 the button reads “Request my fixed quote”."
- **Summary sidebar** (400×196) → "YOUR ANSWERS" with "Service" "—" · "Size" "—" · "Timeline" "—" (all muted)

### State · Step 4 · Your details, with a validation error and ?ref=case-b3tter-bottle — node 25:302 (1440×966)
Annotation: "Errors show after leaving a field (on blur) or on submit, never while typing the first time."
- **Layout** (row gap 48, pad 0/72/0/72, 1344×765)
  - **Form card · Step 4 · details** (col gap 28, pad 36/40/40/40, 752×765, w:fill, grow, bg surface, r 32, border line 1)
    - **Progress**: "STEP 4 OF 4" + Back · all 4 segments ink
    - **Question** (col gap 8): T "How can we reach you?" — IBM Plex Sans SemiBold 32 ls -2%, ink · T "We’ll get back to you within 1–2 business days." — IBM Plex Sans Regular 16, muted
    - **Field pattern** (col gap 8): label row (row gap 6) T — IBM Plex Sans Medium 14, ink (+ "Optional" — IBM Plex Sans Regular 13, muted) · input (row gap 10, pad 14/16/14/16, align center, h 51, w:fill, bg canvas, r 14, border line 1) T — IBM Plex Sans Regular 16
    - **Row** (row gap 16, 670×77): "Full name" / "Thandi Mokoena" (ink) · "Business name" Optional / "Mokoena Plumbing" (ink)
    - **Row** (row gap 16, 670×120):
      - **Email (error)**: input bg blush, border coral 1.5, h 52 · T "thandi@mokoena" — ink · icon alert 18px (coral) · error line (row gap 6, align center) T "Add the rest of your email, for example name@business.co.za" — IBM Plex Sans Medium 13, coral
      - "Phone" Optional / "082 000 0000" (muted)
    - **Field** (670×146): "Anything else?" Optional / textarea 670×120 "Tell us more about what you’re building." (muted)
    - ⧉ Button Style=Coral "Send your enquiry" (670×52, w:fill)
    - T "By sending, you agree we can contact you about this enquiry. We never share your details." — IBM Plex Sans Regular 12, muted
  - **Summary sidebar** — continues in the next chunk


  - **Summary sidebar** (col gap 16, 400×278)
    - **Your answers** (col, pad 24/28/12/28, 400×196, bg surface, r 24, border line 1): "Service" "New website" Edit · "Size" "Standard" Edit · "Timeline" "In 1–3 months" Edit
    - **Ref chip (from ?ref)** (row gap 12, pad 14/20/14/20, align center, 400×66, w:fill, bg mint, r 18)
      - icon link 18px
      - T "You came from the B3TTER case study. We’ll mention it in our reply." — IBM Plex Sans Regular 13/145%, ink

> Step 2 (size) is not drawn as its own frame. Build it with the same option-card grid as Step 1 (2 × 2), using the live form's labels for starter | standard | custom | not-sure, and the question "How big is the project?" (the aria-live text in note 01).

### State · Sent successfully — node 25:387 (1440×661)
Annotation: "Replaces the form card in place; the summary stays so the visitor can see what they sent."
- **Form card · Success** (col gap 20, pad 36/40/40/40, 752×460, w:fill, grow, bg surface, r 32, border line 1)
  - **Frame** (row, align center/center, 72×72, bg mint, r 999) → icon check 34px
  - T "Thanks, Thandi. Your enquiry is in." — IBM Plex Sans SemiBold 32 ls -2%, ink
  - T "We’ve sent a copy to thandi@mokoena.co.za. Expect a reply within 1–2 business days, usually sooner." — IBM Plex Sans Regular 16/155%, muted
  - **While you wait** (col gap 10, pad 18/20/18/20, 670×84, w:fill, bg canvas, r 18)
    - T "WHILE YOU WAIT" — Oswald Medium 12 ls 6%, muted
    - T "See how we measure every build in our case studies." — IBM Plex Sans Medium 15, ink
  - **Frame** (row gap 12): ⧉ Button Style=Primary "See our work" (176×52) · ⧉ Button Style=Outline "Back to home" (181×54)
- **Summary sidebar** (400×196) — "YOUR ANSWERS" rows without Edit links: "Service" "New website" · "Size" "Standard" · "Timeline" "In 1–3 months"

### State · Send failed (network or server error) — node 25:428 (1440×505)
Annotation: "Nothing the visitor typed is lost. They can retry or use email, with their answers pre-filled."
- **Form card · Send failed** (col gap 28, pad 36/40/40/40, 752×304, w:fill, grow, bg surface, r 32, border line 1)
  - **Progress**: "STEP 4 OF 4" + Back · all 4 segments ink
  - **Error banner (role=alert)** (row gap 14, pad 16/18/16/18, 670×79, w:fill, bg blush, r 18, border coral 1.5)
    - icon alert 22px (coral)
    - **Frame** (col gap 4, w:fill, grow): T "We couldn’t send that just now." — IBM Plex Sans SemiBold 15, ink · T "Your answers are saved. Try again, or email them to us in one tap." — IBM Plex Sans Regular 13/150%, muted
  - **Frame** (row gap 12): ⧉ Button Style=Coral "Try again" (148×52) · ⧉ Button Style=Outline "Email my answers instead" (267×54)
  - (The filled fields stay above the banner in the real page; this state frame shows only the banner area.)
- **Summary sidebar** (400×196) — same rows as the success state

