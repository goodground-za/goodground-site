# Legal

| | |
|---|---|
| **URL** | `/legal (#notice, #privacy, #terms)` |
| **Figma page** | `69:150` |
| **Desktop frame (1440)** | Privacy 69:151 · Terms 71:163 |
| **Mobile frame (390)** | 72:190 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- The Legal notice tab is not drawn. Build it in the same document style with the live legal notice text.
- POPIA Information Officer, providers list and Terms wording are open items 1–3. Do not invent legal text.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · /legal page — node 72:358
PAGE · READ FIRST
/legal: structure, content and what’s missing
STRUCTURE
•  One page, three documents in tabs: Legal notice (#notice), Privacy policy (#privacy), Terms & conditions (#terms). The tab bar sticks under the header; switching tabs swaps the document (crossfade, motion/md), updates the hash and scrolls to the top of the document.
•  Old links: /legal#terms currently points to the legal notice. After launch #terms opens Terms & conditions, and #notice is the legal notice. Section anchors from the live page (#sec-collection, #sec-rights, #sec-cookies…) keep working.
•  Each document has its own sticky contents list (scroll-spy, coral active bar) and a “Last updated” date taken from the CMS, changed only when the wording changes.
•  Legal notice tab: section 01 from the live page plus the company details card (not drawn separately; same layout as the privacy view).
CONTENT
•  Privacy and legal notice wording is the live text, lightly shortened for readability; meaning unchanged. Have your attorney approve the final wording.
•  “The short version” and the plain-language summaries are new and must match the full text.
•  The Terms & conditions view is a design draft. Its summaries come from what your site already promises (fixed price, payment options, scope changes, cancellation, revisions, monthly services). Sections 1 and 16 (“signed contract wins”, “changes never affect signed contracts”) are suggestions for your attorney. Ownership, warranties/liability and disputes need your attorney.
MISSING TODAY (POPIA)
•  The privacy policy doesn’t name your Information Officer. POPIA expects their name and contact details; the design shows the field in coral until it’s added.
•  The provider table lists only Google today. Add your email/form, hosting and any other providers that process personal data (shown in coral as “to add”).
•  Cookie preferences: the live policy says to clear site data to change your choice. The design adds a real toggle here and a “Cookie settings” footer link that reopens the banner.
INTERACTION
•  Copy (registration number): copies and shows the “Copied” toast.
•  Make a privacy request: opens mailto:hello@goodground.co.za with subject “Privacy request: {type}”; on desktop, choosing a right card first preselects the type.
•  Cookie toggle: on = load GA4 and store consent; off = remove GA cookies and stop loading it. Takes effect immediately with a toast.
•  Download as PDF (Terms): generated from the same content.
•  Motion: calm reading rules from the article template (no paragraph animations; cards FADE-UP 12px).
SEO
•  Keep <title> “Legal Notice & Privacy Policy | GoodGround” (add “& Terms” once terms are live). Pages are indexable but excluded from the sitemap priority list.

## Layer-by-layer spec

### Legal — Desktop (1440) · Privacy policy — node 69:151 (1440×5971)
- **Legal — Desktop (1440) · Privacy policy** (col, 1440×5971, bg canvas)
  - **00 · Site header (light variant)** — shared; centre pill T "LEGAL" (74×44)
  - **01 · Hero + tabs** (col gap 24, pad 56/120/32/120, 1440×494, w:fill)
    - **Tags** (row gap 8): ⧉ Tag Tone=Coral "LEGAL" · ⧉ Tag Tone=Neutral "LAST UPDATED 26 OCT 2026"
    - T "LEGAL NOTICE, PRIVACY & TERMS." — Oswald Medium 104/92%, ink
    - T "GoodGround is committed to transparency, data protection and responsible use of information. Here’s exactly how we work, in plain language first and full detail below." — IBM Plex Sans Regular 18/155%, muted
    - **Document tabs (sticky)** (row gap 4, pad 4, 465×54, bg surface, r 999, border line 1) — tabs (row, pad 12/22/12/22, h 44, r 999) T — IBM Plex Sans SemiBold 15: "Legal notice" · "Privacy policy" (active: bg ink, text surface) · "Terms & conditions"
  - **02 · Body (TOC + document)** (row gap 80, pad 24/240/96/120, 1440×5143, w:fill)
    - **Contents (sticky)** (col gap 2, 280×562)
      - T "ON THIS PAGE" — Oswald Medium 12 ls 6%, muted
      - **Item** (row gap 10, pad 7/0/7/12, align center, 280×32, w:fill, r 10): rectangle 3×16 r2 (line; coral when active) · T "0n" — Oswald Medium 11, muted · T label — IBM Plex Sans 14 (Regular muted; active SemiBold ink with bg surface)
      - Items: 02 Privacy policy · 03 Data collection (active) · 04 How we use your data · 05 Artificial intelligence (AI) · 06 Non-personal data · 07 Recruitment · 08 Data sharing · 09 International transfers · 10 Your rights (POPIA) · 11 Data retention · 12 Data security · 13 Cookies · 14 Third-party links · 15 Minors · 16 Updates · 17 Contact
    - **Document column (720)** (col gap 28, 720×5023, w:fill, grow)
      - T "Who’s responsible for your data" — IBM Plex Sans SemiBold 20 ls -1%, ink
      - **Company details card** (col, pad 8/28/8/28, 720×378, w:fill, bg surface, r 24, border line 1) — rows (row gap 16, pad 14/0/14/0, align center, w:fill; all but last border line 0/0/1/0): T label — Oswald Medium 11 ls 6%, muted · T value — IBM Plex Sans Medium 15, ink
        - "REGISTERED COMPANY NAME" "GoodGround (Pty) Ltd"
        - "TRADING AS" "GoodGround"
        - "REGISTRATION NUMBER" "2024/641034/07" + **Copy pill** (row gap 6, pad 6/12/6/10, align center, bg canvas, r 99) icon copy 14px + T "Copy" — IBM Plex Sans Medium 12, ink
        - "FOUNDED" "2026"
        - "REGISTERED LOCATION" "George, Garden Route, Western Cape, South Africa"
        - "VAT STATUS" "Not VAT registered; all prices are VAT inclusive"
        - "INFORMATION OFFICER (POPIA)" "Name and email to be added" (coral) + ⧉ Tag Tone=Coral "REQUIRED BY POPIA"
      - **The short version** (col gap 16, pad 28, 720×283, w:fill, bg plum, r 28)
        - ⧉ Tag Tone=OnDark "THE SHORT VERSION"
        - 2 rows (row gap 12) of 2 tiles (row gap 12, pad 16, w:fill, h:fill, grow, bg #FFFFFF @8%, r 18): **Frame** (36×36, bg coral, r 10) → icon 18px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, surface + T — IBM Plex Sans Regular 13/145%, onDarkMuted
          - ban "We never sell your data" "Not to anyone, ever." · cookie "Analytics only if you say yes" "Nothing loads until you accept." · spark "AI helps; people decide" "Every AI-assisted output is reviewed by our team." · user "Your data, your rights" "Ask to see, fix or delete it any time."
      - **Section pattern** (col gap 12, pad 16/0/0/0, w:fill): **Heading** (row gap 12, align baseline): T "0n" — Oswald Medium 16, coral · T title — IBM Plex Sans SemiBold 28 ls -1%, ink · then paragraphs T — IBM Plex Sans Regular 17/170%, ink (footnote paragraphs IBM Plex Sans Regular 15/165%, muted)
      - **Chip list card** (col gap 10, pad 18/20/18/20, w:fill, bg surface, r 20, border line 1): T lead — IBM Plex Sans SemiBold 15, ink · **Chips** (row wrap gap 8): chips (row gap 6, pad 7/14/7/12, align center, bg canvas, r 99) icon check 13px + T — IBM Plex Sans Regular 13.5, ink
      - **02 Privacy policy**: "We take your privacy seriously. This section explains how we collect, use, store and protect your personal information in line with applicable laws, including the Protection of Personal Information Act (POPIA)."
      - **03 Data collection**: "We only collect personal data that is necessary to deliver our services and improve your experience."
        - Chip card "You may provide information when you:" — "Submit a contact or project form" · "Request a quote or proposal" · "Subscribe to updates" · "Apply for a job" · "Communicate with us directly"
        - Chip card "Personal data collected may include:" — "Full name" · "Email address" · "Phone number" · "Company or business name" · "Project details and requirements" · "Anything else you choose to share"
        - Footnote (muted): "Providing this information is voluntary. If required information is not provided, we may not be able to deliver certain services."
      - **04 How we use your data**: chip card "We use your data to:" — "Respond to enquiries" · "Deliver services and manage projects" · "Improve our website and services" · "Analyse site performance" · "Send updates or marketing, with your consent" · footnote "We process your data based on legitimate business interests, contractual necessity, or your explicit consent."
      - **05 Artificial intelligence (AI)**: "GoodGround uses AI tools to support how we deliver our services. AI is a productivity tool, not a replacement for human expertise or decision-making."
        - Chip card "AI may assist with:" — "Content and copywriting" · "Design concepts" · "Website development" · "Research and brainstorming" · "Workflow automation" · "Administrative support"
        - **Callout · human review** (row gap 12, pad 16/18/16/18, 720×98, w:fill, bg mint, r 18): **Frame** (32×32, bg surface, r 999) icon check 16px · T "All AI-assisted work is reviewed, edited and approved by a member of the GoodGround team before it’s delivered or published. We don’t intentionally use confidential client information to train public AI models." — IBM Plex Sans Medium 14/155%, ink
      - **06 Non-personal data collection**: "We may automatically collect non-identifiable data to improve performance and find technical issues. It does not personally identify you." · chip card "This may include:" — "IP address" · "Browser type and device" · "Pages visited and time spent" · "Referral sources"
      - **07 Recruitment and candidate data**: "If you apply for a role, we use your data to review your application, assess your experience, manage hiring and consider you for future roles. We keep it for up to 24 months unless you ask us to delete it sooner, and you can request access, correction or deletion at any time."
      - **08 Data sharing and third parties**: "We do not sell, rent or trade your personal information. We share data only with trusted providers we need to run the business, and where the law requires it or to prevent fraud or security threats."
        - **Provider table** (col, 720×197, w:fill, bg surface, r 18, border line 1)
          - Header (row, bg canvas, 42 tall): 3 equal cells (pad 13/14/13/18) T — Oswald Medium 11 ls 6%, muted: "PROVIDER" · "PURPOSE" · "WHEN"
          - Rows (row, border line 1/0/0/0): col 1 IBM Plex Sans SemiBold 14 · cols 2–3 IBM Plex Sans Regular 14, ink
            - "Google (Analytics 4)" · "Analytics and performance" · "Only after you accept cookies"
            - "Email and form provider (to add)" (coral) · "Receiving and replying to enquiries" · "When you contact us"
            - "Hosting provider (to add)" (coral) · "Running this website" · "Every visit"
      - **09 International data transfers**: "As we work with global tools, your data may be processed outside South Africa. When it is, we make sure appropriate safeguards are in place and that it’s handled in line with applicable data protection laws."
      - **10 Your rights under POPIA**: "You can exercise any of these rights by emailing us. We’ll respond within a reasonable time, and you can also complain to the Information Regulator of South Africa."
        - **Rights grid** (col gap 12) — 3 rows of 2 cards (row gap 12, pad 16, w:fill, h:fill, grow, bg surface, r 18, border line 1): **Frame** (36×36, bg lilac, r 10) → icon 18px · T — IBM Plex Sans SemiBold 15, ink + T — IBM Plex Sans Regular 13/145%, muted
          - eye "Access" "See the personal data we hold about you" · edit "Correct" "Fix or update inaccurate data" · trash "Delete" "Ask us to delete your data" · pause "Object or restrict" "Limit how we process it" · undo "Withdraw consent" "At any time, for anything you consented to" · download "Transfer" "Get your data in a usable format"
        - **Frame** (row gap 12, align center): ⧉ Button Style=Primary "Make a privacy request" (245×52) · T "Opens an email to hello@goodground.co.za with the request type filled in." — IBM Plex Sans Regular 13, muted
      - **11 Data retention**: "We keep personal data only as long as we need it, depending on why it was collected, legal and regulatory requirements, and business needs. When it’s no longer needed, it’s securely deleted or anonymised."
      - **12 Data security**: "We take reasonable technical and organisational steps to protect your data: secure hosting, restricted access, encrypted connections and regular monitoring. No online system is completely secure, so you share information at your own risk."
      - **13 Cookies and tracking technologies**: "We use Google Analytics 4 to understand which pages visitors find useful. Its cookies only load if you accept them. Decline, and the analytics script is never loaded. The rest of the site works exactly the same either way. We don’t use advertising or cross-site tracking cookies."
        - **Cookie settings card** (row gap 16, pad 16/16/16/20, align center, 720×74, w:fill, bg surface, r 20, border line 1): **Frame** (40×40, bg blush, r 999) icon cookie 20px · **Frame** (col gap 2, w:fill, grow): T "Your current choice" — IBM Plex Sans Regular 13, muted + T "Analytics cookies: Off" — IBM Plex Sans SemiBold 16, ink · **Toggle switch** 48 wide (off state)
        - T "Change your choice here at any time; it takes effect immediately." — IBM Plex Sans Regular 14, muted
      - **14 Third-party links**: "Our website may link to other websites. We don’t control them and aren’t responsible for their content or policies, so please read their privacy policies before sharing personal data."
      - **15 Minors**: "Our services aren’t intended for anyone under 16. We don’t knowingly collect personal data from minors without a parent’s or guardian’s consent, and we remove it promptly if we find any."
      - **16 Updates to this policy**: "We may update this legal notice and privacy policy from time to time. Changes are published on this page with a new “Last updated” date."
      - **17 Contact**
        - **Contact card** (row gap 16, pad 20/16/20/24, align center, 720×92, w:fill, bg plum, r 24): **Frame** (44×44, bg coral, r 999) icon mail 22px · **Frame** (col gap 2, w:fill, grow): T "Questions about this policy or your data?" — IBM Plex Sans SemiBold 17, surface + T "hello@goodground.co.za" — IBM Plex Sans Medium 15, peach · ⧉ Button Style=Light "Get in touch" (169×52)
  - **03 · Footer** (row, pad 40/48/48/48, align space_between, 1440×227, w:fill, bg surface, border line 1/0/0/0) — desktop footer with LEGAL column: "Legal notice" · "Privacy policy" · "Terms & conditions" · "Cookie settings" (reopens the cookie banner)

### Legal — Desktop (1440) · Terms & conditions (draft structure) — node 71:163 (1440×4705)
- **Legal — Terms & conditions** (col, 1440×4705, bg canvas)
  - **00 · Site header** — same as the privacy view
  - **01 · Hero + tabs** (col gap 24, pad 56/120/32/120, 1440×517)
    - Tags · title "LEGAL NOTICE, PRIVACY & TERMS." (no intro paragraph in this view)
    - **Document tabs**: "Terms & conditions" active (bg ink, text surface)
    - **Draft banner (design file only — does NOT ship)** (row gap 12, pad 16/20/16/20, 1200×79, w:fill, bg blush, r 18, border coral 1.5): icon alert 20px · T "DESIGN DRAFT: GoodGround has no Terms & Conditions page yet. The section structure and plain-language summaries below come from what your site already promises. The full legal wording must come from your attorney before launch. This banner does not ship." — IBM Plex Sans Medium 14/155%, ink
  - **02 · Body (TOC + terms)** (row gap 80, pad 24/240/96/120, 1440×3854, w:fill)
    - **Contents (sticky)** (col gap 2, 280×634) — same item pattern as the privacy TOC (items can wrap to 50 tall)
      - 01 About these terms (active) · 02 Quotes and fixed prices · 03 Payment options · 04 Scope changes · 05 Pausing and cancelling a project · 06 Your responsibilities · 07 Revisions · 08 Timelines · 09 Ownership and intellectual property · 10 Hosting, domains and third-party services · 11 Monthly services · 12 AI-assisted work · 13 Warranties and liability · 14 Confidentiality and personal information · 15 Disputes and governing law · 16 Changes to these terms
      - **Download** (row gap 8, pad 16/0/0/12, align center): icon download 16px · T "Download as PDF" — IBM Plex Sans Medium 14, ink
    - **Terms column (720)** (col gap 24, 720×3734, w:fill, grow)
      - **Term pattern** (col gap 12, pad 12/0/0/0, w:fill)
        - **Heading** (row gap 12, align baseline): T "0n" — Oswald Medium 16, coral · T title — IBM Plex Sans SemiBold 26 ls -1%, ink
        - **In plain language** (row gap 12, pad 14/16/14/16, w:fill, bg mint, r 16): icon info 18px · **Frame** (col gap 2, w:fill, grow): T "IN PLAIN LANGUAGE" — Oswald Medium 10 ls 6%, muted + T summary — IBM Plex Sans Medium 14.5/155%, ink
        - **Full wording (placeholder)** (col gap 8, 720×46): 3 grey bars (rectangles 700/644/420 × 10, line, r99) — replaced by the attorney's text
      - 01 About these terms — "These terms apply to every project and monthly service we provide. Your signed quote and contract sit alongside them; if they ever disagree, your signed contract wins."
      - 02 Quotes and fixed prices — "Every website project gets one fixed price before work begins. Package prices are starting points; your quote confirms the real number, and it doesn’t change once you accept it."
      - 03 Payment options — "Pay a 50% deposit and 50% on completion, before handover; or 12 equal monthly instalments, where the first books your slot and the other 11 start once the project is completed. The total is the same either way."
      - 04 Scope changes — (continues in the next chunk)

      - 04 Scope changes — "We tell you before any change affects the price. Extra scope is quoted separately; we never adjust what you’ve already agreed to pay."
      - 05 Pausing and cancelling a project — "The project price is fixed. If you cancel partway through, the outstanding balance of the agreed price becomes payable, whichever payment option you chose."
      - 06 Your responsibilities — "Supplying content, feedback and approvals on time, giving us the access we need, and making sure you have the right to use what you give us."
      - 07 Revisions — "Each package includes set revision rounds (Micro and Launch: 1, Grow: 2, Scale: 3). Extra rounds are R1,500 each."
      - 08 Timelines — "Timelines are estimates agreed at kick-off. Delays in content, feedback or access move the timeline, not the price."
      - 09 Ownership and intellectual property — **attorney-needed variant** (summary box bg blush, kicker coral): "Who owns the site, code, designs and content, and when ownership passes (for example on final payment). Needs your decision."
      - 10 Hosting, domains and third-party services — "Hosting, domains and email are arranged separately unless you’re on Full Service or the Website Launch Offer. Third-party tools are governed by their own terms."
      - 11 Monthly services — "Full Service: month to month, cancel any time. Care Plans and ad management: 30 days’ notice. Ad budgets are paid to Google or Meta and your ad accounts always belong to you."
      - 12 AI-assisted work — "We use AI tools to work faster; a person on our team reviews and approves everything before it reaches you."
      - 13 Warranties and liability — attorney-needed (blush): "What we guarantee, and the limits of our liability. Wording from your attorney."
      - 14 Confidentiality and personal information — "We keep your business information confidential and handle personal information as described in our Privacy policy."
      - 15 Disputes and governing law — attorney-needed (blush): "South African law applies. How disagreements are resolved. Wording from your attorney."
      - 16 Changes to these terms — "We may update these terms; changes apply to new quotes, never to a contract you’ve already signed."
      - **Questions card** (row gap 16, pad 20/16/20/24, align center, 720×92, w:fill, bg plum, r 24): **Frame** (col gap 2, w:fill, grow): T "Questions about these terms?" — IBM Plex Sans SemiBold 17, surface + T "Ask before you sign. We’ll explain anything in plain language." — IBM Plex Sans Regular 14, onDarkMuted · ⧉ Button Style=Light "Get in touch" (169×52)
  - **03 · Footer** — same LEGAL-column footer as the privacy view

### Legal — Mobile (390) · Privacy policy — node 72:190 (390×2136)
- **Legal — Mobile** (col, 390×2136, bg canvas)
  - **Header** — shared mobile header
  - **01 · Hero** (col gap 14, pad 24/20/24/20, 390×318, w:fill)
    - **Tags** (row gap 6): ⧉ Tag Tone=Coral "LEGAL" · ⧉ Tag Tone=Neutral "UPDATED 26 OCT 2026"
    - T "LEGAL NOTICE, PRIVACY & TERMS." — Oswald Medium 48/94%, ink
    - **Document tabs** (row gap 4, pad 4, 350×48, w:fill, bg surface, r 999, border line 1) — 3 equal tabs (row, pad 10/0/10/0, align center, w:fill, grow, r 999) T — IBM Plex Sans SemiBold 14: "Notice" · "Privacy" (active bg ink, surface) · "Terms"
    - **On this page (sticky)** (row gap 10, pad 12/14/12/16, align center, 350×58, w:fill, bg surface, r 999, border line 1): icon list 18px · **Frame** (col, w:fill, grow): T "On this page · 3 of 16" — IBM Plex Sans Regular 11, muted + T "Data collection" — IBM Plex Sans SemiBold 14, ink · icon chevron 18px (opens a bottom sheet of sections)
  - **02 · Document** (col gap 20, pad 8/20/40/20, 390×1513, w:fill)
    - **The short version** (col gap 10, pad 18, 350×202, w:fill, bg plum, r 22): ⧉ Tag Tone=OnDark "THE SHORT VERSION" · rows (row gap 10, align center): **Frame** (24×24, bg coral, r 999) icon check 12px + T — IBM Plex Sans Medium 14, surface — "We never sell your data" · "Analytics only if you say yes" · "AI helps; people decide" · "Your data, your rights"
    - **Company details (compact)** (col, pad 0/16/0/16, 350×187, w:fill, bg surface, r 18, border line 1) — rows (col gap 2, pad 12/0/12/0, w:fill; border bottom except last): T label — Oswald Medium 10 ls 6%, muted · T value — IBM Plex Sans Medium 15, ink
      - "COMPANY" "GoodGround (Pty) Ltd" · "REG. NUMBER" "2024/641034/07" · "INFORMATION OFFICER" "To be added" (coral)
    - **Section (mobile)** (col gap 8, w:fill): **Heading** (row gap 10, align baseline): T "0n" — Oswald Medium 14, coral · T title — IBM Plex Sans SemiBold 22 ls -1%, ink · paragraph IBM Plex Sans Regular 16/170%, ink
      - 02 "Privacy policy" — "We explain how we collect, use, store and protect your personal information under POPIA."
      - 03 "Data collection" — "We only collect what we need to deliver our services." + chips (row wrap gap 6; chip row gap 6, pad 6/12/6/10, bg surface, r 99; icon check 12px + T IBM Plex Sans Regular 13, ink): "Full name" · "Email" · "Phone" · "Business name" · "Project details"
      - 10 "Your rights under POPIA" — rows (row gap 10, pad 12/12/12/14, align center, 350×44, w:fill, bg surface, r 14, border line 1): T — IBM Plex Sans Medium 14, ink + icon chevron 16px: "Access your data" · "Correct it" · "Delete it" · "Object or restrict" · "Withdraw consent" · "Transfer it" · then ⧉ Button Style=Primary "Make a privacy request" (350×52, w:fill)
      - 13 "Cookies" — **Cookie row** (row gap 12, pad 14, align center, 350×66, w:fill, bg surface, r 16, border line 1): **Frame** (36×36, bg blush, r 999) icon cookie 18px · **Frame** (col, w:fill, grow): T "Analytics cookies" — IBM Plex Sans Regular 12, muted + T "Off" — IBM Plex Sans SemiBold 15, ink · toggle switch 48 wide
      - Annotation: "…sections 04–09, 11, 12 and 14–17 follow the same pattern."
    - **Contact card** (col gap 12, pad 18, 350×144, w:fill, bg plum, r 22): T "Questions about this policy or your data?" — IBM Plex Sans SemiBold 17, surface · ⧉ Button Style=Light "Get in touch" (314×52, w:fill)
  - **Footer** (col gap 20, pad 24/24/32/24, 390×227, w:fill, bg surface) — mobile footer with LEGAL column: STUDIO (About · Work · FAQ) · SERVICES (Websites · Full service · SEO) · LEGAL (Notice · Privacy · Terms · Cookies)

> The Legal notice tab (#notice) is not drawn as its own frame: build it with the same hero, tabs, sticky contents and document column — section 01 (the live legal-notice text) followed by the Company details card.

