# Contact

| | |
|---|---|
| **URL** | `/contact (?topic)` |
| **Figma page** | `29:150` |
| **Desktop frame (1440)** | 29:151 |
| **Mobile frame (390)** | 30:172 |
| **Extra states / boards** | Sent 29:352 · validation 29:365 · email copied 29:376 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Contact is its own page; the old redirect to /start-project is cancelled.
- Contact topics are new copy (open item 9). WhatsApp number is open item 5.
- No-JS: redirect to /thanks?form=contact.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /contact page — node 33:182
PAGE · READ FIRST
/contact: purpose, routing, form and SEO
PURPOSE (CONFIRMED 26 OCT 2026)
•  /contact is its own page again (the earlier redirect to /start-project is cancelled). It covers general questions, existing clients and direct channels.
•  Project enquiries still go to /start-project. Every “Start your project”, “Claim a launch spot” and “Get a fixed quote” link points there; “Get in touch” and “Contact” links point here.
•  Old links that arrive at /contact with ?plan or ?intent are redirected to /start-project with the same parameters.
QUICK MESSAGE FORM
•  Fields: name (required), email (required), topic, message (required), plus the hidden honeypot field.
•  Topics: General question | A new project | Existing project or support | Partnerships | Press | Something else.
•  Choosing “A new project” shows an inline hint card: “For projects, the 4-step form gets you a fixed price faster” with a button to /start-project?ref=contact. Their typed message is not lost if they stay.
•  /contact?topic=support (or any topic slug) preselects the topic; used by links for existing clients.
•  Submits to the same endpoint as /start-project with formType=contact. Email subject to GoodGround: “New message · {Topic} · {Name}”.
•  Auto-reply: same rules as /start-project, subject “We’ve got your message, {First name}”.
•  Same validation, spam rules, sending, success and failure behaviour as /start-project Step 4.
CHANNELS
•  Email: shows hello@goodground.co.za; “Copy” uses the Clipboard API (falls back to selecting the text).
•  WhatsApp: wa.me link with the business number from site settings (number to be supplied). Opens in a new tab or the app.
•  Location: a static map image (no live Google Maps embed, so no third-party requests on load). Clicking it opens Google Maps for George in a new tab.
•  Instagram and Facebook links open in new tabs.
SEO
•  <title>: “Contact GoodGround | Website Development, South Africa” (keep the live title).
•  JSON-LD: ContactPage + LocalBusiness (George, Western Cape, email, sameAs Instagram/Facebook). /start-project switches to a plain WebPage.

### Notes · C 01 Hero — node 33:198
01 · Hero
ENTRANCE
•  Tag FADE-UP → headline LINE MASK (120ms per line) → copy FADE-UP → reply-time pill FADE-UP.
•  The green dot in the reply-time pill has a soft pulse ring (scale 1 → 1.8, opacity 0.4 → 0, 2s loop). Off when motion is off.
MOBILE
•  Same; the pill sits under the copy.

### Notes · C 02 Routes — node 33:208
02 · Choose your route
ENTRANCE
•  Three route cards STAGGER GRID 100ms. The plum “Start a project” card lands first.
INTERACTION
•  Each card is one link (LINKED CARD hover): Start a project → /start-project?ref=contact. Ask a question → smooth-scrolls to the quick message form and focuses the name field. Already working with us? → WhatsApp (new tab).
MOBILE
•  Start a project stays a full plum card; the other two become compact rows with a chevron. Pressed state scale 0.99.

### Notes · C 03 Form + channels — node 33:221
03 · Quick message form + channels
ENTRANCE
•  Form column FADE-UP; channel cards STAGGER GRID 80ms; the map card uses the clip-path reveal (inset 8%).
FORM
•  Field behaviour, errors, sending and success exactly as /start-project Step 4 (see that page’s note 01). The success state replaces the form in place; “Send another message” resets it.
•  Choosing “A new project” as the topic slides the hint card down under the topic field (motion/md).
CHANNELS
•  Hover (desktop): channel card background canvas → blush (motion/sm).
•  Copy: the button label changes to “Copied” with a check for 2s, and a toast “Email address copied” rises from the bottom centre (translateY 16px → 0 + fade, motion/sm), stays 2.5s, then fades. role="status".
•  Map card hover: image scale 1.03 (motion/lg); the location pill lifts 2px.
MOBILE
•  Form full width; channels below as rows. Tapping the email row copies it and shows the toast. WhatsApp opens the app.

### Notes · C 04 Quick answers — node 33:237
04 · Quick answers
BEHAVIOUR
•  Cards STAGGER GRID 80ms. Each is a LINKED CARD to the matching FAQ item: /#faq-payment-options, /#faq-project-length, /work.
MOBILE
•  Rows with chevrons; pressed state background canvas.

## Layer-by-layer spec

### Contact — Desktop (1440) — node 29:151 (1440×2475)
- **Contact — Desktop (1440)** (col, 1440×2475, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "CONTACT" (89×44)
  - **01 · Hero** (col gap 48, pad 64/120/48/120, 1440×534, w:fill, bg canvas)
    - **Frame** (row gap 64, align space_between/max, 1200×422, w:fill)
      - **Frame** (col gap 24, 899×422, w:fill, grow)
        - ⧉ Tag Tone=Coral "GET IN TOUCH" (97×30)
        - T "LET’S BUILD SOMETHING ⏎ THAT LASTS." — Oswald Medium 104/92%, ink
        - T "Every project starts with a conversation, not a contract. Pick the route that fits, and a real person will get back to you." — IBM Plex Sans Regular 18/155%, muted
      - **Reply time pill** (row gap 12, pad 14/22/14/18, align center, 301×50, bg surface, r 999, border line 1)
        - ellipse 10×10 #2FA36B (green status dot, pulse ring)
        - T "We reply within 1–2 business days" — IBM Plex Sans Medium 15, ink
  - **02 · Choose your route** (col gap 24, pad 0/120/56/120, 1440×333, w:fill, bg canvas)
    - **Route cards** (row gap 24, 1200×277, w:fill) — 3 cards (col gap 20, pad 32, align space_between, ~384×277, w:fill, h:fill, grow, r 28):
      - Card header (row, align space_between/center, 319×48): **Frame** (48×48, r 14) → icon 24px · kicker T — Oswald Medium 12 ls 6%
      - **Frame** (col gap 8, w:fill): T "{title}" — IBM Plex Sans SemiBold 28 ls -2% · T "{body}" — IBM Plex Sans Regular 15/155%
      - Button
      - **Start a project** — bg plum · chip bg coral, icon spark · kicker "MOST ENQUIRIES" onDarkMuted · title surface "Start a project" · body onDarkMuted "Four quick questions, about a minute. We’ll come back with a fixed price, split however you’d like to pay it." · ⧉ Button Style=Coral "Start your project" (206×52)
      - **Ask a question** — bg surface, border line 1 · chip bg lilac, icon help · kicker "GENERAL" muted · title ink "Ask a question" · body muted "Not ready for a project yet? Send us a quick message below about anything at all." · ⧉ Button Style=Outline "Write a message" (201×54)
      - **Already working with us?** — bg surface, border line 1 · chip bg lilac, icon user · kicker "EXISTING CLIENTS" · "Already working with us?" · "For changes, support or your Full Service plan, message us directly and we’ll pick it up." · ⧉ Button Style=Outline "WhatsApp us" (179×54)
  - **03 · Message form + channels** (col gap 48, pad 120, 1440×870, w:fill, bg surface)
    - **Frame** (row gap 64, 1200×630, w:fill)
      - **Quick message form** (col gap 24, 696×630, w:fill, grow)
        - ⧉ Tag Tone=Neutral "QUICK MESSAGE" (111×32)
        - T "Send us a quick message" — IBM Plex Sans SemiBold 44/110% ls -2%, ink
        - T "For project enquiries, the 4-step project form gets you a fixed price faster." — IBM Plex Sans Regular 16/150%, muted
        - **Field pattern** (col gap 8): label row (row gap 6) T "{label}" — IBM Plex Sans Medium 14, ink · input (row gap 8, pad 14/16/14/16, align center, h 51, w:fill, bg canvas, r 14, border line 1) T placeholder — IBM Plex Sans Regular 16, muted (filled value = ink)
        - **Row** (row gap 16, 696×77, w:fill): "Your name" / "Full name" (340, w:fill, grow) · "Email" / "name@business.co.za" (340, w:fill, grow)
        - **Field** (696×77): "What’s it about?" / select showing "General question" (ink) + icon chevron 18px
        - **Field** (696×176): "Message" / textarea 696×150 "How can we help?"
        - ⧉ Button Style=Primary "Send message" (185×52)
      - **Channels** (col gap 16, 440×570)
        - **Channel row** (row gap 16, pad 18/16/18/20, align center, 440×80, w:fill, bg canvas, r 20): **Frame** (44×44, bg blush, r 999) → icon 22px · **Frame** (col gap 2, w:fill, grow): T label — IBM Plex Sans Regular 13, muted + T value — IBM Plex Sans SemiBold 16, ink · optional action pill (row gap 6, pad 8/12/8/12, align center, bg surface, r 999, border line 1) icon 14px + T — IBM Plex Sans Medium 13, ink
          - mail · "Email" · "hello@goodground.co.za" · action icon copy "Copy"
          - chat · "WhatsApp" · "Message us directly" · action icon arrow "Open"
          - clock · "Reply time" · "Within 1–2 business days" · no action
        - **Socials** (row gap 12, 440×46): 2 pills (row gap 10, pad 14/16/14/16, align center, 214×46, w:fill, grow, bg canvas, r 16): icon ig 18px "Instagram" · icon fb 18px "Facebook" — IBM Plex Sans Medium 14, ink
        - **Location card · static map (replace)** (col, pad 20, align max (bottom), 440×220, w:fill, bg gradient(#DDE8DF 0%, #C7D9E6 100%) placeholder for the static map image, r 20)
          - **Location pill** (row gap 12, pad 12/16/12/14, align center, 361×58, bg surface, r 16)
            - icon pin 20px
            - **Frame** (col): T "George, Garden Route" — IBM Plex Sans SemiBold 14, ink · T "Western Cape · working with clients across South Africa" — IBM Plex Sans Regular 12, muted
  - **04 · Before you message (quick answers)** (col gap 24, pad 96/120/96/120, 1440×404, w:fill, bg canvas)
    - T "Quick answers" — IBM Plex Sans SemiBold 32 ls -2%, ink
    - **Frame** (row gap 16, 1200×146, w:fill) — 3 LINKED CARDS (col gap 10, pad 24, 389×146, w:fill, h:fill, grow, bg surface, r 20, border line 1):
      - **Card top** (row, align space_between/center, 339×32): T kicker — Oswald Medium 11 ls 6%, coral · **Frame** (32×32, bg canvas, r 999) → icon arrow 16px
      - T question — IBM Plex Sans SemiBold 18 ls -1%, ink · T answer — IBM Plex Sans Regular 14/150%, muted
      - "PRICING" "How do the payment options work?" "One fixed price: 50/50, or 12 monthly instalments." → /#faq-payment-options
      - "TIMELINES" "How long does a project take?" "See typical timelines in our FAQ." → /#faq-project-length
      - "PROOF" "Can I see your work first?" "Every case study has numbers you can check." → /work
  - **05 · Footer** (row, pad 40/48/48/48, align space_between, 1440×227, w:fill, border line 1/0/0/0) — shared desktop footer content; on this page there is no CTA card above it, so it carries a 1px top border.

### Contact — Mobile (390) — node 30:172 (390×2350)
- **Contact — Mobile (390)** (col, 390×2350, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 16, pad 24/20/24/20, 390×380, w:fill)
    - ⧉ Tag Tone=Coral "GET IN TOUCH" (97×30)
    - T "LET’S BUILD ⏎ SOMETHING ⏎ THAT LASTS." — Oswald Medium 60/92%, ink
    - T "Every project starts with a conversation, not a contract." — IBM Plex Sans Regular 16/155%, muted
    - **Reply pill** (row gap 10, pad 10/16/10/14, align center, 237×39, bg surface, r 999, border line 1): ellipse 8×8 #2FA36B · T "Reply within 1–2 business days" — IBM Plex Sans Medium 13, ink
  - **02 · Routes** (col gap 10, pad 8/20/32/20, 390×410, w:fill)
    - **Route · Start a project** (col gap 14, pad 20, 350×202, w:fill, bg plum, r 24)
      - **Frame** (row gap 12, align center, 310×40): **Frame** (40×40, bg coral, r 12) → icon spark 20px · T "Start a project" — IBM Plex Sans SemiBold 22 ls -1%, surface
      - T "Four quick questions. We’ll come back with a fixed price." — IBM Plex Sans Regular 14/150%, onDarkMuted
      - ⧉ Button Style=Coral "Start your project" (310×52, w:fill)
    - **Route rows** (row gap 14, pad 16, align center, 350×74, w:fill, bg surface, r 20, border line 1): **Frame** (40×40, bg lilac, r 12) → icon 20px · **Frame** (col gap 2, w:fill, grow): T title — IBM Plex Sans SemiBold 16 ls -1%, ink + T sub — IBM Plex Sans Regular 13, muted · icon chevron 18px
      - help "Ask a question" "Send a quick message below" · user "Already working with us?" "WhatsApp us for changes or support"
  - **03 · Quick message** (col gap 16, pad 40/20/40/20, 390×662, w:fill, bg surface)
    - ⧉ Tag Tone=Neutral "QUICK MESSAGE" (111×32)
    - T "Send us a quick message" — IBM Plex Sans SemiBold 30/110% ls -2%, ink
    - Fields (col gap 6, w:fill): label IBM Plex Sans Medium 14, ink · input (row, pad 14/16/14/16, align center, 350×51, bg canvas, r 14, border line 1) placeholder IBM Plex Sans Regular 16, muted
      - "Your name" / "Full name" · "Email" / "name@business.co.za" · "What’s it about?" / "General question" (ink) + icon chevron · "Message" / textarea 350×120 "How can we help?"
    - ⧉ Button Style=Primary "Send message" (350×52, w:fill)
  - **04 · Channels** (col gap 10, pad 40/20/24/20, 390×333, w:fill)
    - T "Or reach us directly" — IBM Plex Sans SemiBold 22 ls -1%, ink
    - **Channel rows** (row gap 14, pad 14/16/14/14, align center, 350×70, w:fill, bg surface, r 18, border line 1): **Frame** (40×40, bg blush, r 999) → icon 20px · **Frame** (col, w:fill, grow): T label — IBM Plex Sans Regular 12, muted + T value — IBM Plex Sans SemiBold 15, ink
      - mail "Email · tap to copy" "hello@goodground.co.za" · chat "WhatsApp" "Message us directly" · pin "Based in" "George, Garden Route"
  - **05 · Quick answers** (col gap 10, pad 24/20/40/20, 390×285, w:fill)
    - T "Quick answers" — IBM Plex Sans SemiBold 22 ls -1%, ink
    - **Rows** (row gap 12, pad 16, align center, 350×54, w:fill, bg surface, r 16, border line 1): T — IBM Plex Sans Medium 15, ink · icon chevron 18px
      - "How do the payment options work?" · "How long does a project take?" · "Can I see your work first?"
  - **Footer** (col gap 20, pad 24/24/32/24, 390×202, w:fill, border line 1/0/0/0) — shared mobile footer content with a 1px top border (no CTA card on this page)

### State · Message sent (replaces the form in place) — node 29:352 (760×406)
(The "STATE" kicker and the state title are annotation labels, not part of the UI.)
- **Success panel** (col gap 20, pad 32/40/40/40, bg surface, r 28, border line 1)
  - **Frame** (64×64, bg mint, r 999) → icon check 30px
  - T "Thanks, your message is in." — IBM Plex Sans SemiBold 32 ls -2%, ink
  - T "We’ve sent a copy to your inbox and will reply within 1–2 business days." — IBM Plex Sans Regular 16/155%, muted
  - ⧉ Button Style=Outline "Send another message" (245×54)

### State · Validation error (on blur or submit) — node 29:365 (760×264)
- **Field in error** (col gap 8, 678×103, w:fill)
  - T "Email" — IBM Plex Sans Medium 14, ink
  - **Input** (row, pad 14/16/14/16, align center, 678×52, w:fill, bg blush, r 14, border coral 1.5)
    - T "hello@business" — IBM Plex Sans Regular 16, ink
    - icon alert 18px (coral)
  - T "Add the rest of your email, for example name@business.co.za" — IBM Plex Sans Medium 13, coral

### State · Email copied (toast, bottom centre, 2.5s) — node 29:376 (520×203)
- **Toast (role=status)** (row gap 10, pad 12/20/12/18, align center, 201×42, bg ink, r 999)
  - icon check 16px
  - T "Email address copied" — IBM Plex Sans Medium 14, surface

