# Client onboarding (new, private)

| | |
|---|---|
| **URL** | `/onboarding (private link, noindex)` |
| **Figma page** | `56:150` |
| **Desktop frame (1440)** | Welcome 57:150 · steps 57:342, 64:892, 64:1208, 58:345, 64:1491, 65:1396, 58:689, 65:1672, 65:2157, 66:2000, 66:2282, 66:2547 · Review 59:684 · Sent 59:975 |
| **Mobile frame (390)** | 60:757, 60:823, 60:950 |
| **Extra states / boards** | Steps sheet 60:1068 · form components 56:151 |

Read the README first (tokens, components, motion patterns, notation). Shared components (⧉) are specified there, not repeated here.

## Build notes
- Largest piece. Needs the storage, retention and recipient decisions first (open item 8).
- The full field inventory for all 13 steps is in this file.
- The Sent screen says "within one working day" on purpose; flag it to the user.
- Header and footer: use the shared Site header (light variant unless noted) and the canonical footer from the README, even where this frame shows a simplified version.
- Before marking this page done, compare it with the Figma frames using `get_screenshot` at 1440 and 390 (README section 12).


## Figma notes for this page (verbatim)

### Notes · Onboarding page — node 62:892
FLOW · READ FIRST
Client onboarding: how it works end to end
PURPOSE
•  A private, multi-step brief sent to a client as soon as they accept their quote. It collects everything needed to design and build the site: people, business, offer, goals, customers, brand, content, features, access, legal.
•  Based on the onboarding document you supplied, rebranded for GoodGround and turned from a download-and-email pack into a hosted form that saves as you go.
ACCESS
•  After quote acceptance, the client gets an email with a private link: /onboarding/{token}. The token is long, random and unguessable; the page is noindex and never linked from the site.
•  Opening the link on a new device asks for a 6-digit code sent to the client’s email (no passwords to create).
•  Prefilled from the quote: client name, email, business name, accepted package and add-ons, payment option. Shown read-only on the Welcome screen and Step 4.
•  The link stays editable until the kick-off call, then turns read-only (“changes go through your project lead”).
SAVING & SENDING
•  Every answer autosaves to the server; files upload straight to storage. There is no download-and-email step.
•  Clients can send with gaps; required answers that are missing are listed on Review and marked on the stepper.
•  On send: GoodGround gets an email with a link to the brief in the admin view plus a generated PDF; the client gets a confirmation email with the same PDF (same auto-reply rules as /start-project).
•  “Download a PDF copy” is available on Review and after sending.
PRIVACY (POPIA)
•  Answers and files are stored with access limited to the GoodGround project team. Retention: kept for the life of the project plus an agreed period, then deleted on request. Confirm the storage region and retention period before build.
•  The Review consents (accuracy, rights to materials, use for delivery) are required to send. Link to a short privacy note.
•  Never collect passwords: the form says so on every step, and access requests happen through a separate secure process.
CHANGES FROM THE SOURCE DOCUMENT
•  “Grow Brand” wording replaced by GoodGround everywhere (consents, “who writes the text”, “who updates after launch”).
•  “What are you working with us on?” uses GoodGround’s services and is pre-ticked from the quote.
•  “Package or budget agreed” is replaced by the read-only quote card.
•  “Continue from a saved file” and “Your pack is ready” are replaced by autosave and online sending.
NEEDS YOUR DECISION
•  Storage region and how long briefs and files are kept.
•  Whether “Online shop” and “Client login area” stay as feature options (your pricing page says no e-commerce or member-portal builds).
•  Who on your team receives the “brief received” email.

### Notes · Onboarding motion & interaction — node 62:914
MOTION & INTERACTION
Behaviour of the form (all steps)
LAYOUT
•  Desktop: sticky sidebar stepper (top 24px), step card, sticky help rail; the footer bar sticks to the bottom of the viewport. Mobile: sticky step header (opens the steps sheet), sticky footer with Back and Save and continue.
•  Every step can be opened from the stepper in any order. Step states: Done, Current, Upcoming, Attention (visited, required answers missing).
AUTOSAVE
•  Saves 800ms after the last keystroke, and immediately on choice changes and uploads. Status in the top bar: “Saving…” (spinner) → “Saved just now” → “Saved 3 min ago”.
•  Offline: “Offline: saved on this device”, kept in IndexedDB and synced when back online. Conflicts (two devices): last write wins per field, with a toast “Updated from another device”.
STEPS
•  Save and continue: saves, marks the step Done (or Attention if required answers are missing), then moves on. It never blocks; Review is the only place sending is blocked by missing consents.
•  Transition: outgoing step fades and slides 24px left, incoming fades in from 24px right (motion/md); Back reverses. Scroll to top of the card; focus moves to the step title and an aria-live region announces “Step 7 of 13: Your brand”.
•  Sidebar progress bar and the done count animate (scaleX, motion/md). The Done check pops in (ease/back).
•  “Skip for now” moves on without marking anything; “Save & finish later” shows a sheet confirming the link has been emailed.
FIELDS
•  Labels above fields; “Optional” on non-required fields only. Errors only on blur or Save (format errors such as email, URL, phone), shown as the Error variant with a specific message.
•  Conditional questions slide open under their trigger (height + fade, motion/md) and close the same way. Answers in hidden questions are kept while editing, but not sent.
•  Radio cards and check chips: selected state animates fill and check (motion/sm). Radio groups use arrow keys; chips are toggle buttons.
•  Repeat groups: “Add another …” inserts a new block that slides in and focuses its first field; “Remove” deletes it with an “Undo” toast for 5 seconds.
•  Dates use the native date picker. URLs auto-add https:// on blur. Phone numbers accept local or +27 formats.
UPLOADS
•  Drag and drop or browse (desktop); “Choose files” and “Take a photo” (mobile). Multiple files at once; up to 50 MB per file, 2 GB per brief. Resumable uploads so a dropped connection doesn’t restart large files.
•  Each file shows a File row: Uploading (progress bar), Done (check, image thumbnail where possible), Error (reason + retry). Unsupported types (for example HEIC) explain how to fix them.
•  Very large photo collections can be shared as a Google Drive, Dropbox or WeTransfer link instead (Step 8).
REVIEW
•  Completion ring = answered required questions ÷ total required questions. Missing required answers are listed with “Answer now”, which opens the step and focuses the field.
•  “Send my brief” is disabled until all three consents are ticked and the name is typed; it shows “Sending…”, then the success screen (check draws in, motion/lg).

### Field inventory (the complete list of questions per step) — nodes 63:892–63:954
Key: * required · [type] · {options} · → shown only when

#### 01 · You & your team
•  Your full name* [text] (prefilled)
•  Your role in the business [text]
•  Email address* [email] (prefilled)
•  Mobile number* [tel]
•  Best way to reach you [radio] {Email · Phone call · WhatsApp}
•  Best days and times to reach you [text]
•  Are you the person who gives final approval?* [radio] {Yes · No}
•  Final approver’s name* [text] → approval = No
•  Their role [text] → approval = No
•  Their email* [email] → approval = No
•  Who else will give feedback? [repeat: Name, Role, Email]
•  Dates you or your approver will be unavailable [textarea]

#### 02 · Business details
•  Registered business name* [text] (prefilled)
•  Trading name, if different [text]
•  Type of business* [select] {Private company (Pty) Ltd · Sole proprietor · Close corporation (CC) · Partnership · Non-profit company (NPC) or NPO · Trust · Other}
•  Registration number [text] → type is not Sole proprietor or Partnership
•  VAT number [text]
•  Directors or office bearers [textarea] → type is Pty Ltd, CC, NPC/NPO or Trust
•  Physical business address* [textarea]
•  Postal address, if different [textarea]
•  Where should your address appear? [radio] {On the contact page and in the footer · Suburb and city on the contact page; full address on the legal page only · Home-based or mobile: legal page only}
•  Business phone · WhatsApp number · Business email for the website [tel/tel/email]
•  Trading hours · Areas you serve [textarea]
•  Year started · Number of people [text]
•  Industry bodies, associations or accreditations [textarea]
•  Google Business Profile · Facebook · Instagram · LinkedIn · TikTok · YouTube [url each]
•  Other profiles or directory listings [textarea]

#### 03 · What you do
•  What do you do and for whom? (1–2 sentences)* [textarea]
•  Your story [textarea]
•  What makes you different?* [textarea]
•  Your services or products* [repeat: Name*, What’s included, Who it’s for, Price or from price, Importance {Most important · Important · Less important}]
•  If visitors remember only three things, what should they be? [textarea]
•  Awards, certifications and qualifications [repeat: What it is, Year, OK to show? {Yes · No}]
•  Numbers you’re proud of, that you can back up [textarea]
•  Guarantees, warranties or promises [textarea]
•  Well-known clients or partners we may name [textarea]

#### 04 · Goals
•  From your accepted quote [read-only card: package, price, payment option, add-ons]
•  What are you working with us on?* [checks, pre-ticked from quote] {A new website · A redesign · Full Service · A monthly Care Plan · SEO and content · Google Ads · Meta Ads · A new brand · A brand refresh · Not sure yet}
•  What must the website achieve?* [checks] {Get more enquiries · Get bookings or appointments · Sell products online · Build credibility and trust · Show our work · Inform and educate · Recruit staff · Support existing customers}
•  The ONE action you most want a visitor to take* [radio] {Call us · WhatsApp us · Fill in a contact form · Request a quote · Book online · Buy online · Visit our premises · Sign up or subscribe}
•  Other actions that also matter [checks] {same 8 + Follow us on social media}
•  In 12 months, how will you know it’s working? [textarea]
•  Monthly enquiries or sales from the internet now [text]
•  How do customers find you today? [checks] {Google search · Google Maps · Word of mouth and referrals · Facebook · Instagram · TikTok · LinkedIn · Online directories · Signage and walk-ins · Advertising}
•  Ideal launch date [date]
•  How fixed is that date? [radio] {Fixed: there’s an event or launch · Preferred · Flexible}
•  What’s happening on that date? [text] → Fixed

#### 05 · Your customers
•  Your main types of customer* [repeat: Who are they?*, What they need, What worries them, What makes them decide, Where they are (area, age, online habits)]
•  Languages your customers speak [checks] {English · Afrikaans · isiZulu · isiXhosa · Sesotho · Setswana}
•  Should the website be in more than one language? [radio] {English only · English plus another language · Not sure} (note: extra languages are a R5,000 add-on each)
•  Questions customers always ask [repeat: Question, Your answer]

#### 06 · Competitors & inspiration
•  Your main competitors [repeat: Name, Website, What they do well online, Where they’re weak]
•  Websites you like [repeat: Website, What exactly you like]
•  Websites you don’t like [repeat: Website, What you don’t like]
•  How should your website feel? [checks] {Professional · Friendly · Bold · Calm · Premium · Playful · Modern · Classic · Warm · Minimal · Energetic · Trustworthy · Natural and earthy · Technical and expert}
•  How should it definitely NOT feel? [textarea]

#### 07 · Your brand
•  Where is your brand at?* [radio] {Complete brand · Logo only · New brand (part of our project) · Brand refresh}
•  Upload your logo files* [files]
•  Brand guide or style guide [files] → Complete brand or Brand refresh
•  Brand colours [repeat: Colour (picker + hex), Name, Used for {Main colour · Second colour · Accent · Background · Text · Other}]
•  Heading font · Body font [text]
•  Where do your fonts come from? [radio] {Google Fonts (free) · Adobe Fonts · We bought a licence · Don’t know}
•  Font files [files] → We bought a licence
•  Tagline or slogan [text]
•  Brand rules, or things never to do [textarea]
•  Is your business name final? [radio] {Yes · No, we’d like help with naming} → New brand
•  Story or meaning behind the name · Ideas or symbols for the logo · Colours you love · Colours to avoid [text/textarea] → New brand or Brand refresh
•  Logos or brands you admire [repeat: Brand name or link, What you like] → New brand or Brand refresh
•  Where must your logo work? [checks] {Website · Social profile picture · Signage · Vehicle branding · Uniforms and embroidery · Packaging and labels · Business cards and stationery · Merchandise} → New brand or Brand refresh

#### 08 · Pages & content
•  Your current website [url]
•  What should we keep? · What should we change or remove? [textarea] → current website filled
•  Which pages do you think you need? [checks] {Home · About us · Services (one page) · Services (a page each) · Products · Portfolio or gallery · Testimonials and reviews · Team · Pricing · FAQ · Blog or news · Contact · Bookings · Careers · Locations or branches} (show the page allowance of their package next to the count)
•  Anything specific about any page? [textarea]
•  Who will write the website text?* [radio] {GoodGround writes it from this brief · I’ll supply the text · A mix} (GoodGround writing beyond the package is the R1,200/page copywriting add-on)
•  Existing text to reuse [files]
•  Photos for the website* [radio] {We have professional photos · Some photos (phone or amateur) · We need stock photos · We’d like to book a photographer · Not sure}
•  Photos of team, premises, work, products [files]
•  Big photo or video collection link [url]
•  Video links to feature [textarea]
•  Testimonials [repeat: What they said*, Their name*, Role/company/town, Agreed to be quoted?* {Yes · Not yet}]
•  Link to your Google or other reviews [url]
•  Projects or case studies [repeat: Project name, Client (if agreed), What you did and the result, Link, Photos]
•  Team members [repeat: Name, Role, Short bio, Photos]
•  Files visitors can download (price lists, menus, brochures) [files]

#### 09 · Features & tools
•  Which email address(es) should enquiries go to?* [text]
•  Which of these do you need? [checks] {Contact form · Click-to-call · WhatsApp button · Online booking · Quote request form · Newsletter sign-up · Google Map · Show our Google reviews · Instagram or social feed · Blog · Online payments · Online shop · Live chat · Client login area · Job applications · Multiple languages} (items not in the quote show “May change your quote”)
•  Booking system you use or prefer [text] → Online booking
•  Newsletter tool [text] → Newsletter sign-up
•  Payment provider [text] → Online payments or Online shop
•  Do you use a CRM? [text]
•  Already set up? [checks] {Google Analytics · Search Console · Tag Manager · Google Business Profile · Meta Pixel · Don’t know}
•  What would you type into Google to find a business like yours? [textarea]
•  Towns, suburbs or regions to target [textarea]
•  Anything else the website must do? [textarea]

#### 10 · Domain, hosting & access
•  Your domain name(s)* [text]
•  Where is your domain registered? [select] {Domains.co.za · Afrihost · Xneelo · Hetzner · GoDaddy · Hostinger · 1-grid · Register Domain SA · Cloudflare · Google or Squarespace Domains · Other · Don’t know}
•  Who can log in to manage your domain?* [radio] {Me or someone in my business · Our previous web developer · Our IT company · I don’t know}
•  Where is your current website hosted? [select] {Xneelo · Afrihost · Hetzner · Domains.co.za · Hostinger · GoDaddy · SiteGround · Wix/Squarespace/Shopify · Other · No website yet · Don’t know}
•  What is it built with? [select] {WordPress · Wix · Squarespace · Shopify · Webflow · Custom-built · No website yet · Don’t know}
•  Who provides your business email?* [select] {Google Workspace · Microsoft 365 · Email from our web host · Personal Gmail/Outlook.com · Other · Don’t know}
•  Previous developer’s contact details [textarea]
•  Who will update the website after launch?* [radio] {Me · Someone on my team · GoodGround (Care Plan or Full Service) · It will rarely need updating}
•  How comfortable is that person? [radio] {Very comfortable · Some experience · Beginner} → Me or Someone on my team
•  Which of these can you give us access to? [checks] {Domain/DNS · Hosting account · Current website admin · Google Business Profile · Search Console · Google Analytics · Facebook and Instagram business accounts · I’ll need help with all of this} → triggers the secure access request after sending

#### 11 · Legal & privacy
•  Your Information Officer under POPIA: name and email* [text]
•  Registered with the Information Regulator? [radio] {Yes · No · Don’t know}
•  Existing privacy policy, terms or disclaimers [files] · or a link [url]
•  What personal information will your forms collect? [textarea]
•  Will you sell or take payment online? [radio] {Yes · No · Maybe later}
•  Returns, refunds and cancellation policy* [textarea] → sells online = Yes
•  Delivery areas, time frames and costs [textarea] → sells online = Yes
•  Booking cancellation policy [textarea] → features include Online booking
•  Is your industry regulated? [checks] {Financial services (FSCA/FAIS) · Health (HPCSA or another council) · Legal (LPC) · Property (PPRA) · Alcohol or gambling · Education · No, or not sure}
•  Disclaimers your regulator requires [textarea] → any regulated industry ticked
•  Is the website aimed at children (under 18)? [radio] {No · Yes}
•  Do you send marketing emails or SMSes? [radio] {Yes, only to people who opted in · Yes · Not yet}

#### 12 · Anything else
•  Important dates during the project [textarea]
•  Anything you’re worried about? [textarea]
•  What went well or badly with past websites or agencies? [textarea]
•  Anything else we should know? [textarea]
•  Any other files [files]

#### 13 · Review & send
•  Completion overview, missing required answers, section list with Edit links
•  Consent*: “The information in this brief is accurate to the best of my knowledge.” [checkbox]
•  Consent*: “I have the right to use the logos, photos and text I’ve provided, or I’ve noted where I’m unsure.” [checkbox]
•  Consent*: “I agree that GoodGround may use this information to deliver my project, as described in the privacy note.” [checkbox]
•  Your name, to confirm* [text]
•  Send my brief · Download a PDF copy

## Layer-by-layer spec

> Board layout in Figma: row 1 "DESKTOP · WELCOME, STEPS 1, 4, 7, REVIEW, SENT"; row 2 "MOBILE · WELCOME, STEP 7, REVIEW, STEPS SHEET"; row 3 "DESKTOP · STEPS 2, 3, 5, 6, 8, 9, 10, 11, 12". The form components (Form/Field, Form/Radio card, Form/Check chip, Form/File row, Form/Step item) are specified in the Components file.

### Shared desktop shell (every desktop onboarding screen)
- **Screen** (col, 1440 wide, bg canvas)
  - **Top bar** (row gap 16, pad 18/32/18/32, align center, 1440×91, w:fill, bg surface, border line 0/0/1/0)
    - **Logo pill** (row, pad 8/16/8/16, 138×42, bg ink, r 999) → T "goodground" — IBM Plex Sans SemiBold 20 ls -3%, surface
    - **Title** (col, w:fill, grow): T "Client onboarding" — IBM Plex Sans SemiBold 15, ink · T "{Business} · {Package} website" (e.g. "Mokoena Plumbing · Grow website") — IBM Plex Sans Regular 13, muted
    - **Autosave status** (row gap 6, align center): **Frame** (20×20, bg mint, r 99) → icon check 10px · T status — IBM Plex Sans Regular 13, muted ("Saves automatically" on Welcome; "Saved just now" / "Saving…" / "Saved 3 min ago" / "Offline: saved on this device" while editing)
    - ⧉ Button Style=Outline "Save & finish later" (212×54)
  - **Body** (row gap 32, pad 32/32/48/32, w:fill)
    - **Sidebar · stepper (sticky top 24)** (col gap 4, pad 20/16/20/16, 300×713, bg surface, r 24, border line 1)
      - **Head** (col gap 8, pad 0/10/12/10, 266×73): T "YOUR BRIEF" — Oswald Medium 12 ls 6%, muted · T "{n} of 13 sections done" — IBM Plex Sans SemiBold 16, ink · progress track (246×6, bg canvas, r 99) → fill coral r99 (width = n/13; 6px minimum)
      - 13 × ⧉ Form/Step item (266×42, w:fill) — states Done / Current / Upcoming / Attention: "01 You & your team" · "02 Business details" · "03 What you do" · "04 Goals" · "05 Your customers" · "06 Competitors & inspiration" · "07 Your brand" · "08 Pages & content" · "09 Features & tools" · "10 Domain, hosting & access" · "11 Legal & privacy" · "12 Anything else" · "13 Review & send"
    - **Main** (col gap 24, 712 wide, w:fill, grow) — step card + sticky step footer
    - **Help rail (sticky)** (col gap 16, 300×445)
      - **Why we ask** (col gap 10, pad 20, 300 wide, bg lilac, r 20): **Frame** (row gap 8) icon help 18px + T "Why we ask" — IBM Plex Sans SemiBold 15, ink · T "{step-specific reason}" — IBM Plex Sans Regular 14/155%, muted
      - **Need help?** (col gap 12, pad 20, 300×167, bg surface, r 20, border line 1): T "Stuck on a question?" — IBM Plex Sans SemiBold 15, ink · T "Skip it and keep going, or message your GoodGround project lead." — IBM Plex Sans Regular 14/155%, muted · pill (row gap 8, pad 10/16/10/14, bg canvas, r 999) icon chat 16px + T "WhatsApp us" — IBM Plex Sans Medium 13, ink
      - **No passwords notice** (row gap 10, pad 14/16/14/16, 300×88, bg blush, r 16): icon lock 18px · T "Please don’t type passwords anywhere in this form. We’ll send you a secure way to share access." — IBM Plex Sans Medium 13/150%, ink
- **Step card** (col gap 28, pad 36/40/36/40, 712 wide, w:fill, bg surface, r 28, border line 1)
  - **Step head** (col gap 10, 630×104): **Frame** (row gap 10, align center): T "STEP n OF 13" — Oswald Medium 13 ls 6%, coral + T "· about {x} min" — IBM Plex Sans Regular 13, muted · T "{step title}" — IBM Plex Sans SemiBold 36/110% ls -2%, ink · T "{step intro}" — IBM Plex Sans Regular 16/155%, muted
  - **Question group** (col gap 14–16, 630 wide, w:fill): **Frame** (col gap 4): T "{group title}" — IBM Plex Sans SemiBold 18 ls -1%, ink (+ optional coral "*" / helper T — IBM Plex Sans Regular 14/150%, muted) · then fields / radio cards (2 per row, row gap 16) / check chips (row wrap gap 8)
  - **Conditional block** (col gap 16, pad 20, w:fill, bg canvas, r 20) — appears under its trigger
  - **Repeat group block** (col gap 14, pad 16/20/20/20, w:fill, bg surface, r 20, border line 1): **Frame** (row, align space_between/center): T "{ITEM} n" — Oswald Medium 12 ls 6%, muted · **Remove** (row gap 6) icon trash 16px + T "Remove" — IBM Plex Sans Medium 13, muted · fields
  - **Add another** (row gap 8, pad 12/18/12/16, align center/center, 630×44, w:fill, bg surface, r 999, border line 1 dashed): icon plus 16px · T "Add another {item}" — IBM Plex Sans Medium 14, ink
- **Step footer (sticky)** (row gap 12, pad 16/20/16/20, align center, 712×88, w:fill, bg surface, r 999, border line 1): ⧉ Button Style=Outline "Back" (121×54) · spacer (grow) · T "Skip for now" — IBM Plex Sans Medium 14, muted · ⧉ Button Style=Coral "Save and continue" (212×52)

### Onboarding — Desktop · Welcome — node 57:150 (1440×1222)
- Shell with stepper "0 of 13 sections done" (all steps Upcoming), autosave "Saves automatically"
- **Main** (col gap 24, 712×1051)
  - **Welcome card** (col gap 24, pad 48, 712×589, w:fill, bg plum, r 32)
    - ⧉ Tag Tone=OnDark "WELCOME, THANDI" (120×30)
    - T "LET’S BUILD YOUR BRIEF." — Oswald Medium 88/94%, surface
    - T "Everything we need to design and build your website, in one place. Answer in your own words; rough notes are fine. Skip anything you’re unsure of and come back to it later." — IBM Plex Sans Regular 18/155%, onDarkMuted
    - **Chips** (row gap 10): chips (row gap 8, pad 8/14/8/12, align center, bg #FFFFFF @10%, r 99) icon check 14px + T — IBM Plex Sans Medium 13, surface: "13 short sections" · "Saves as you go" · "Finish in more than one sitting"
    - **Accepted quote** (row gap 16, pad 16/20/16/20, align center, 616×84, w:fill, bg #FFFFFF @8%, r 18)
      - **Frame** (col gap 2, w:fill, grow): T "YOUR ACCEPTED QUOTE" — Oswald Medium 11 ls 6%, onDarkMuted · T "Grow website · R32,000 · 12 monthly instalments" — IBM Plex Sans SemiBold 15, surface
      - ⧉ Button Style=Coral "Start my brief" (180×52)
  - **Frame** (row gap 24, 712×438) — 2 cards (col, pad 28, 344×438, w:fill, h:fill, grow, bg surface, r 24, border line 1)
    - **Have these ready** (col gap 12): T "Have these ready" — IBM Plex Sans SemiBold 20 ls -1%, ink · T "Not essential, but they make it quicker." — IBM Plex Sans Regular 14, muted · rows (row gap 12, align center): **Frame** (32×32, bg lilac, r 10) → icon 16px + T — IBM Plex Sans Medium 14, ink
      - image "Logo files (SVG, AI or PNG)" · palette "Brand colours and fonts, if you have them" · image "Photos of your team, premises and work" · doc "Any text, brochures or menus to reuse" · star "Reviews and testimonials" · globe "Who manages your domain and email" · shield "Your POPIA Information Officer’s details"
    - **How it works** (col gap 16): T "How it works" — IBM Plex Sans SemiBold 20 ls -1%, ink · steps (row gap 14): **Number** (32×32, bg ink, r 99) → T "0n" — Oswald Medium 12, surface · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 15, ink + T — IBM Plex Sans Regular 14/150%, muted
      - "01" "Answer what you can" "Every answer saves to your private link as you type." · "02" "Add your files" "Upload logos, photos and documents straight into the form." · "03" "Review and send" "We check it, then book your kick-off call."
- **Help rail** — "Why we ask": "This brief replaces back-and-forth emails. The more you tell us now, the fewer questions we ask later, and the faster your site goes live."

### Onboarding — Desktop · Step 1 You & your team — node 57:342 (1440×1871)
- Shell: autosave "Saved just now"; stepper "0 of 13" with 01 Current
- **Step card** (712×1588): "STEP 1 OF 13" "· about 4 min" · title "You and your team" · intro "Who we’ll be working with, and who signs off the work."
  - **Group · About you** (col gap 16): T "About you"
    - Row: ⧉ Form/Field Kind=Input State=Filled "Your full name" = "Thandi Mokoena" · ⧉ Form/Field Kind=Input State=Filled "Your role in the business" (Optional) = "Owner"
    - Row: ⧉ Form/Field Kind=Input State=Filled "Email address" = "thandi@mokoenaplumbing.co.za" · ⧉ Form/Field Kind=Input State=Focus "Mobile number" = "082 555 0142", helper "We’ll only use this about your project."
  - **Group · Best way to reach you** (col gap 16): T "Best way to reach you"
    - Row of 3 ⧉ Form/Radio card: Selected "WhatsApp" / "Quick questions and updates" · "Phone call" / "For anything detailed" · "Email" / "Written updates"
    - ⧉ Form/Field Kind=Input State=Default "Best days and times to reach you" (Optional) placeholder "e.g. weekdays after 2pm"
  - **Group · Final approval** (col gap 16): T "Final approval" · helper "The person who says “yes, go live”."
    - Row of 2 ⧉ Form/Radio card: "Yes, that’s me" / "I approve the final work" · Selected "No, someone else" / "Add their details below"
    - **Conditional · approver details** (col gap 16, pad 20, 630×210, bg canvas, r 20): row ⧉ Field Filled "Final approver’s name" = "Sipho Mokoena" · ⧉ Field Filled "Their role" (Optional) = "Co-owner" · ⧉ Field Filled "Their email" = "sipho@mokoenaplumbing.co.za" (full width)
  - **Group · Who else will give feedback?**: T "Who else will give feedback?" · helper "Optional. Add anyone who should see drafts."
    - **Repeat group · person 1**: "PERSON 1" + Remove · 3 fields in a row: "Name" (Optional) = "Lerato Dube" · "Role" (Optional) = "Office manager" · "Email" (Optional) placeholder "name@business.co.za"
    - **Add another** "Add another person"
  - ⧉ Form/Field Kind=Textarea State=Default "Any dates you or your approver will be unavailable during the project?" (Optional) placeholder "e.g. away 12–20 December" (630×146)
- **Step footer** — Back · Skip for now · Save and continue
- **Help rail** — "Why we ask": "Knowing who approves the work avoids delays at the end. Drafts go to everyone you list; sign-off comes from the final approver only."

### Onboarding — Desktop · Step 4 Goals — node 58:345 (1440×2469)
- Shell: stepper "3 of 13 sections done" (progress fill 57 of 246), steps 01–03 Done, 04 Current
- **Step card** (712×2186): "STEP 4 OF 13" "· about 5 min" · title "Goals for the project" · intro "What success looks like, so every design decision can be measured against it."
  - **From your quote (read-only)** (row gap 14, pad 16/18/16/18, align center, 630×86, w:fill, bg mint, r 18)
    - **Frame** (36×36, bg surface, r 999) → icon receipt 18px
    - **Frame** (col gap 2, w:fill, grow): T "FROM YOUR ACCEPTED QUOTE" — Oswald Medium 11 ls 6%, muted · T "Grow website · R32,000 · 12 monthly instalments · Blog setup and WhatsApp button added" — IBM Plex Sans SemiBold 14, ink
    - T "Not right? Tell us" — IBM Plex Sans Medium 13, coral
  - **Group · What are you working with us on?** — helper "Pre-ticked from your quote. Add anything else you’re considering." · ⧉ Form/Check chip (row wrap gap 8): On "A new website" · "A redesign of our current website" · "Full Service (monthly)" · "A monthly Care Plan" · "SEO and content" · "Google Ads" · "Meta Ads" · "A new brand (logo and identity)" · "A refresh of our existing brand" · "Not sure yet"
  - **Group · What must the website achieve?** — helper "Tick all that apply." · chips: On "Get more enquiries" · "Get bookings or appointments" · "Sell products online" · On "Build credibility and trust" · On "Show our work" · "Inform and educate" · "Recruit staff" · "Support existing customers"
  - **Group · The ONE action you most want a visitor to take** — helper "Everything on the site will lead here." · 4 rows of 2 ⧉ Form/Radio card: "Call us" / "Tap-to-call on mobile" · "WhatsApp us" / "Start a chat" · "Fill in a contact form" / "Send an enquiry" · Selected "Request a quote" / "Describe the job" · "Book online" / "Choose a time" · "Buy online" / "Checkout on the site" · "Visit our premises" / "Get directions" · "Sign up or subscribe" / "Join a list"
  - **Group · Other actions that also matter** · chips: On "Call us" · "WhatsApp us" · On "Fill in a contact form" · On "Request a quote" · "Book online" · "Buy online" · "Visit our premises" · "Sign up or subscribe" · "Follow us on social media"
  - (continues in the next chunk)

  - ⧉ Form/Field Kind=Textarea State=Filled "In 12 months, how will you know the website is working?" (Optional) = "At least 20 quote requests a month from the website, and people telling us they found us on Google." (630×146)
  - ⧉ Form/Field Kind=Input State=Default "Roughly how many enquiries or sales come from the internet each month now?" (Optional) placeholder "A rough guess is fine", hint "This becomes the starting point we measure against." (630×104)
  - **Group · How do customers find you today?** · chips: "Google search" · On "Google Maps" · On "Word of mouth and referrals" · On "Facebook" · "Instagram" · "TikTok" · "LinkedIn" · "Online directories" · On "Signage and walk-ins" · "Advertising"
  - **Group · Timing**
    - Row: ⧉ Field Filled "Ideal launch date" (Optional) = "15 February 2027" · ⧉ Field Filled "What’s happening on that date?" (Optional) = "Start of our busy season"
    - Row of 3 ⧉ Form/Radio card: Selected "Fixed" / "There’s an event or launch" · "Preferred" / "A target we’d like to hit" · "Flexible" / "Whenever it’s ready"
- **Step footer** — Back · Skip for now · Save and continue
- **Help rail** (Why we ask + No passwords; this step omits the "Need help?" card) — "Why we ask": "Your answers here become the yardstick for the whole project. When we propose a layout or feature, we’ll show how it serves these goals."

### Onboarding — Desktop · Step 7 Your brand — node 58:689 (1440×1942)
- Shell: stepper "5 of 13 sections done" (fill 95/246); 01–04 Done, 05 Attention, 06 Done, 07 Current, 08–13 Upcoming
- **Step card** (712×1659): "STEP 7 OF 13" "· about 8 min" · "Your brand" · "Logos, colours and fonts, so the site looks unmistakably like you."
  - **Group · Where is your brand at?** — 2 rows of 2 ⧉ Form/Radio card: "Complete brand" / "Logo, colours, fonts and guidelines" · Selected "Logo only" / "No full brand guide" · "New brand" / "It’s part of our project" · "Brand refresh" / "Refresh our existing brand"
  - **Group · Upload your logo files** — helper "SVG, AI, EPS or PDF are best. High-resolution PNG works too. Max 50 MB per file."
    - **Dropzone** (col gap 10, pad 28/24/28/24, align center, 630×164, w:fill, bg canvas, r 20, border line 1.5 dashed): **Frame** (48×48, bg surface, r 999) → icon upload 24px · T "Drag files here, or browse" — IBM Plex Sans SemiBold 15, ink · T "You can add more files later" — IBM Plex Sans Regular 13, muted
    - ⧉ Form/File row Status=Done "mokoena-logo-full-colour.svg" / "42 KB · uploaded" (630×64)
    - ⧉ Form/File row Status=Uploading "mokoena-logo-white.png" / "Uploading… 64%" (630×72)
    - ⧉ Form/File row Status=Error "van-signage-photo.heic" / "HEIC isn’t supported yet. Export as JPG or PNG." (630×64)
  - **Group · Your brand colours** — helper "Paste a hex code, or pick a colour from your logo."
    - **Colour row** (row gap 12, pad 12, align center, 630×72, w:fill, bg surface, r 16, border line 1): swatch rectangle 44×44 r12 (the colour) · hex input (row gap 6, pad 12/14/12/14, align center, 110×46, bg canvas, r 12, border line 1) T — IBM Plex Sans Medium 15, ink · name input (same, w:fill, grow) T — IBM Plex Sans Regular 15, ink · "Used for" select (same, w:fill, grow) T + icon chevron 16px · icon trash 18px
      - #0B4F8A "Mokoena Blue" "Main colour" · #F2A900 "Safety Yellow" "Highlights & buttons"
    - **Add another** "Add a colour"
  - **Group · Fonts** — row: ⧉ Field Default "Font used for headings" (Optional) placeholder "e.g. Montserrat", hint "Not sure? Leave it; we’ll identify it from your logo." · ⧉ Field Default "Font used for body text" (Optional) placeholder "e.g. Open Sans"
  - ⧉ Field Filled "Tagline or slogan, if you have one" (Optional) = "No job too small, no leak too big." (630×77)
  - ⧉ Field Textarea Default "Brand rules we must follow, or things never to do" (Optional) placeholder "e.g. never stretch the logo; never use red" (630×146)
- **Step footer** — Back · Skip for now · Save and continue
- **Help rail** — "Why we ask": "We match your existing brand exactly. If anything is missing, we’ll pick colours and fonts that fit your logo and show you before we use them."

### Onboarding — Desktop · Step 13 Review & send — node 59:684 (1440×1929)
- Shell variant: top bar 79 tall with no "Save & finish later" button; stepper "10 of 13 sections done" (fill 191/246); 05 and 11 Attention, 13 Current, others Done; **no help rail** — the main column widens to 1044
- **Review card** (col gap 28, pad 36/40/36/40, 1044×1770, w:fill, bg surface, r 28, border line 1)
  - **Head** (col gap 10): T "STEP 13 OF 13" — Oswald Medium 13 ls 6%, coral · T "Review and send" — IBM Plex Sans SemiBold 36 ls -2%, ink · T "Check what’s missing, confirm the details below, then send. You can still send with gaps; we’ll follow up on anything we need." — IBM Plex Sans Regular 16/155%, muted
  - **Completion overview** (row gap 24, pad 24, align center, 962×160, w:fill, bg plum, r 24)
    - **Completion ring** (112×112): ellipse track #FFFFFF @12% + ellipse arc coral (92%) + T "92%" — Oswald Medium 30, surface (centred)
    - **Frame** (col gap 6, w:fill, grow): T "Almost there, Thandi" — IBM Plex Sans SemiBold 22 ls -1%, surface · T "10 of 12 sections complete · 2 required answers missing · 14 files uploaded (86 MB)" — IBM Plex Sans Regular 14/150%, onDarkMuted
  - **Missing required answers** (col gap 10, pad 18/20/18/20, 962×197, w:fill, bg blush, r 20)
    - **Frame** (row gap 10, align center): icon alert 20px (coral) · T "2 required answers missing" — IBM Plex Sans SemiBold 16, ink
    - Rows (row gap 12, pad 12/14/12/14, align center, 922×60, w:fill, bg surface, r 14): **Frame** (col gap 2, w:fill, grow): T section — Oswald Medium 11 ls 6%, coral + T question — IBM Plex Sans Medium 14, ink · T "Answer now →" — IBM Plex Sans SemiBold 13, coral
      - "YOUR CUSTOMERS" "Your main types of customer" · "LEGAL & PRIVACY" "Your Information Officer under POPIA: name and email"
  - **Section list** (col, 962×685, w:fill, bg surface, r 20, border line 1) — 12 rows (row gap 14, pad 14/20/14/20, align center, 960×57, w:fill; all but last border line 0/0/1/0):
    - status chip (28×28, r 999): complete = bg mint + icon check 14px; missing = bg blush + icon alert 14px
    - T "0n  {Section}" — IBM Plex Sans Medium 15, ink (w:fill)
    - status pill (row, pad 4/10/4/10, r 99) T — IBM Plex Sans Medium 12: complete = bg canvas, muted; missing = bg blush, coral
    - **Edit** (row gap 6) icon edit 14px + T "Edit" — IBM Plex Sans Medium 13, ink
    - Rows: 01 You & your team "Complete · 2 optional skipped" · 02 Business details "Complete · 1 optional skipped" · 03 What you do "Complete" · 04 Goals "Complete · 3 optional skipped" · 05 Your customers "1 required missing" · 06 Competitors & inspiration "Complete · 5 optional skipped" · 07 Your brand "Complete · 2 optional skipped" · 08 Pages & content "Complete · 4 optional skipped" · 09 Features & tools "Complete · 1 optional skipped" · 10 Domain, hosting & access "Complete" · 11 Legal & privacy "1 required missing" · 12 Anything else "Complete · 2 optional skipped"
  - **Confirmations** (col gap 12, 962×244)
    - T "Please confirm" — IBM Plex Sans SemiBold 18 ls -1%, ink
    - Rows (row gap 12, pad 14/16/14/16, 962×52, w:fill, r 16): checkbox 22×22 r 6 · T — IBM Plex Sans Medium 14/150%, ink. Checked row: bg canvas, border canvas 1, box bg ink + icon check 13px. Unchecked row: bg surface, border line 1, box bg surface + border line 1.5.
      - (checked) "The information in this brief is accurate to the best of my knowledge."
      - (checked) "I have the right to use the logos, photos and text I’ve provided, or I’ve noted where I’m unsure."
      - (unchecked) "I agree that GoodGround may use this information to deliver my project, as described in the privacy note."
    - **Frame** (row gap 8, align center): icon eye 16px · T "Read the privacy note" — IBM Plex Sans Medium 13, coral
  - ⧉ Form/Field Kind=Input State=Filled "Your name, to confirm" = "Thandi Mokoena" (962×77)
  - **Send actions** (row gap 12, align center, 962×54): ⧉ Button Style=Outline "Back" · spacer · **Frame** (row gap 6) icon download 16px + T "Download a PDF copy" — IBM Plex Sans Medium 14, ink · ⧉ Button Style=Coral "Send my brief" (181×52) (disabled until all consents + name)

### Onboarding — Desktop · Sent — node 59:975 (1440×993)
- Top bar (79 tall, no Save & finish later) · no stepper, no help rail
- **Main** (col gap 24, pad 0/200/0/200, w:fill, grow) — content 976 wide
  - **Success card** (col gap 24, pad 56, 976×424, w:fill, bg plum, r 32)
    - **Frame** (72×72, bg coral, r 999) → icon check 34px
    - T "BRIEF RECEIVED. THANK YOU, THANDI." — Oswald Medium 72/94%, surface
    - T "Your answers and 14 files are safely with us. We’ve emailed you a copy. We’ll confirm we’ve read it within one working day." — IBM Plex Sans Regular 18/155%, onDarkMuted
  - **What happens next** (col gap 16, pad 28/32/28/32, 976×267, w:fill, bg surface, r 28, border line 1)
    - T "What happens next" — IBM Plex Sans SemiBold 22 ls -1%, ink
    - Rows (row gap 16): **Frame** (40×40, bg lilac, r 12) → icon 20px · **Frame** (col gap 2, w:fill, grow): T — IBM Plex Sans SemiBold 16, ink + T — IBM Plex Sans Regular 14/150%, muted
      - cal "01  We review your brief" "Within one working day we’ll confirm and follow up on the 2 missing answers."
      - lock "02  We ask for access, securely" "A separate secure link for domain, hosting and email access. Never by email."
      - cal "03  Kick-off call" "We walk through the plan, timeline and first designs."
  - **Frame** (row gap 12): ⧉ Button Style=Outline "Download a PDF copy" (237×54) · ⧉ Button Style=Outline "Edit my answers" (201×54)
  - T "You can keep editing until your kick-off call. After that, changes go through your project lead." — IBM Plex Sans Regular 13, muted

### Shared mobile shell (onboarding)
- **Top bar** (row gap 10, pad 14/16/14/16, align center, 390×62, w:fill, bg surface, border line 0/0/1/0): logo pill (row, pad 6/12/6/12, 109×33, bg ink, r 999) T "goodground" — IBM Plex Sans SemiBold 16 ls -3%, surface · spacer · **Frame** (20×20, bg mint, r 999) icon check 10px · T "Saved" — IBM Plex Sans Regular 12, muted
- **Sticky step header** (col gap 10, pad 12/16/12/16, 390×93, w:fill, bg canvas, border line 0/0/1/0)
  - **Step pill** (row gap 10, pad 10/12/10/14, align center, 358×54, w:fill, bg surface, r 999, border line 1): icon list 18px · **Frame** (col, w:fill, grow): T "Step n of 13" — IBM Plex Sans Regular 11, muted + T "{step}" — IBM Plex Sans SemiBold 14, ink · icon chevron 18px — opens the steps sheet
  - **Segments** (row gap 3, 358×4): 13 × rectangle 25×4 r99 — done ink, current coral, upcoming line
- **Body** (col gap 20, pad 20/16/24/16, w:fill)
- **Sticky footer** (row gap 10, pad 12/16/20/16, align center, 390×87, w:fill, bg surface, border line 1/0/0/0): ⧉ Button Style=Outline "Back" (121×54) · ⧉ Button Style=Coral "Save and continue" (227×52, w:fill)

### Onboarding — Mobile · Welcome — node 60:757 (390×921)
- Top bar only (no step header, no footer)
- **Body** (col gap 20, pad 20/16/24/16)
  - **Welcome card** (col gap 16, pad 24/20/24/20, 358×478, w:fill, bg plum, r 24)
    - ⧉ Tag Tone=OnDark "WELCOME, THANDI"
    - T "LET’S BUILD YOUR BRIEF." — Oswald Medium 48/94%, surface
    - T "Everything we need to build your website, in one place. Rough notes are fine; skip what you’re unsure of." — IBM Plex Sans Regular 15/155%, onDarkMuted
    - Ticks (row gap 8): icon check 14px + T — IBM Plex Sans Medium 13, surface: "13 short sections" · "Saves as you go"
    - **Quote** (col gap 2, pad 12/14/12/14, 318×59, w:fill, bg #FFFFFF @8%, r 14): T "YOUR ACCEPTED QUOTE" — Oswald Medium 10 ls 6%, onDarkMuted · T "Grow website · R32,000 · 12 instalments" — IBM Plex Sans SemiBold 14, surface
    - ⧉ Button Style=Coral "Start my brief" (318×52, w:fill)
  - **Have these ready** (col gap 10, pad 18, 358×256, w:fill, bg surface, r 20, border line 1): T "Have these ready" — IBM Plex Sans SemiBold 17, ink · rows (row gap 10, align center) icon check 14px + T — IBM Plex Sans Regular 14, ink: "Logo files" · "Brand colours and fonts" · "Photos of your team and work" · "Text, brochures or menus" · "Reviews and testimonials" · "Who manages your domain and email" · "POPIA Information Officer details"
  - **No passwords** (row gap 10, pad 12/14/12/14, 358×41, w:fill, bg blush, r 14): icon lock 16px · T "Never type passwords in this form." — IBM Plex Sans Medium 13, ink

### Onboarding — Mobile · Step 7 Your brand — node 60:823 (390×1402)
- Mobile shell: step pill "Step 7 of 13" / "Your brand"; segments 1–6 ink, 7 coral, 8–13 line
- **Body**
  - T "Your brand" — IBM Plex Sans SemiBold 28 ls -1%, ink · T "Logos, colours and fonts, so the site looks unmistakably like you." — IBM Plex Sans Regular 15/155%, muted
  - T "Where is your brand at?" — IBM Plex Sans SemiBold 16, ink · 4 full-width ⧉ Form/Radio card (358 wide): "Complete brand" · Selected "Logo only" · "New brand" · "Brand refresh" (same sub-lines as desktop)
  - T "Upload your logo files" — IBM Plex Sans SemiBold 16, ink
  - **Upload buttons** (row gap 10, 358×44): 2 pills (row gap 8, pad 12/14/12/14, align center/center, w:fill, grow, bg surface, r 999, border line 1): icon upload 16px "Choose files" · icon camera 16px "Take a photo" — IBM Plex Sans Medium 14, ink
  - ⧉ Form/File row Status=Done "mokoena-logo.svg" / "42 KB · uploaded" · ⧉ Form/File row Status=Uploading "logo-white.png" / "Uploading… 64%"
  - T "Your brand colours" — IBM Plex Sans SemiBold 16, ink
  - **Colour rows (compact)** (row gap 12, pad 12, align center, 358×66, w:fill, bg surface, r 16, border line 1): swatch 40×40 r10 · **Frame** (col, w:fill, grow): T hex — IBM Plex Sans SemiBold 14, ink + T "{name} · {use}" — IBM Plex Sans Regular 12, muted · icon chevron 16px (tap to edit)
    - #0B4F8A "Mokoena Blue · Main colour" · #F2A900 "Safety Yellow · Highlights"
  - ⧉ Form/Field Kind=Input State=Default "Font used for headings" (Optional) placeholder "e.g. Montserrat"
- **Sticky footer** — Back · Save and continue

### Onboarding — Mobile · Review & send — node 60:950 (390×1237)
- Mobile shell: step pill "Step 13 of 13" / "Review & send"; segments 1–12 ink, 13 coral
- **Body**
  - T "Review and send" — IBM Plex Sans SemiBold 28 ls -1%, ink
  - **Completion** (row gap 14, pad 16, align center, 358×88, w:fill, bg plum, r 20): **Frame** (56×56, bg coral, r 999) → T "92%" — Oswald Medium 18, surface · **Frame** (col gap 2, w:fill, grow): T "Almost there" — IBM Plex Sans SemiBold 17, surface + T "2 required answers missing · 14 files" — IBM Plex Sans Regular 12, onDarkMuted
  - **Missing** (col gap 8, pad 14, 358×136, w:fill, bg blush, r 18): **Frame** (row gap 8) icon alert 18px + T "2 required answers missing" — IBM Plex Sans SemiBold 14, ink · rows (row gap 8, pad 10/12/10/12, align center, 330×37, bg surface, r 12): T — IBM Plex Sans Medium 13, ink + T "Answer →" — IBM Plex Sans SemiBold 12, coral — "Your main types of customer" · "POPIA Information Officer"
  - **Section list** (col, pad 0/14/0/14, 358×289, w:fill, bg surface, r 18, border line 1) — rows (row gap 10, pad 12/0/12/0, align center, w:fill, border bottom): status chip 24×24 (mint check / blush alert) · T — IBM Plex Sans Medium 14, ink · T "Edit" — IBM Plex Sans Medium 12, coral
    - "You & your team" · "Business details" · "What you do" · "Goals" · "Your customers" (alert) · last row T "…7 more sections" — IBM Plex Sans Medium 14, muted (expands)
  - T "Please confirm" — IBM Plex Sans SemiBold 16, ink
  - Consent rows (row gap 10, pad 12, 358×48, w:fill, bg surface, r 14, border line 1): checkbox 22×22 r 6 · T — IBM Plex Sans Medium 13/145%, ink — (checked) "The information is accurate." · (checked) "I have the right to use what I’ve provided." · (unchecked) "GoodGround may use it to deliver my project."
  - ⧉ Form/Field Kind=Input State=Filled "Your name, to confirm" = "Thandi Mokoena"
- **Sticky footer** — ⧉ Button Style=Outline "Back" · ⧉ Button Style=Coral "Send my brief"

### State · Mobile steps sheet (opens from step header) — node 60:1068 (390×680)
- **Bottom sheet** (col gap 4, pad 12/16/24/16, align center, 390×680, bg surface, r 28 (top), shadow 0 -8 40 #000000@18%)
  - rectangle 40×4 line r99 (drag handle)
  - **Frame** (row, pad 8/0/8/0, align space_between/center, 358×38): T "Your brief · 5 of 13 done" — IBM Plex Sans SemiBold 17, ink · icon x 20px (close)
  - 13 × ⧉ Form/Step item (358×42, w:fill): Done ×4 · Attention "05 Your customers" · Done "Competitors & inspiration" · Current "07 Your brand" · Upcoming 08–13


### Onboarding form components — node 56:151 (1796×1156)
The five form components every onboarding screen is built from (variant props in the names).

- **Form/Field** — Kind = Input | Textarea · State = Default | Focus | Filled | Error
  - **Field** (col gap 8, 380 wide in the board; w:fill when used)
    - **Label row** (row gap 6, align center, h 18, w:fill): T "{Label}" — IBM Plex Sans Medium 14, ink · T "Optional" — IBM Plex Sans Regular 13, muted (only on optional fields)
    - **Box** (row gap 10, pad 14/16/14/16, align center (Input) / top (Textarea), r 14, w:fill) — Input height 51; Textarea height 120
      - Default: bg canvas, border line 1 · T placeholder — IBM Plex Sans Regular 16, muted
      - Focus: bg surface, border ink 1.5 (box 52 tall) · placeholder muted
      - Filled: bg canvas, border line 1 · T value — IBM Plex Sans Regular 16, ink
      - Error: bg blush, border coral 1.5 · T value — ink · icon alert 18px (coral) at the right
    - **Hint / error** (optional): T — IBM Plex Sans Regular 13/145%, muted (coral in Error state)
- **Form/Radio card** — Selected = No | Yes
  - No (row gap 14, pad 16/18/16/18, ~380×75, bg surface, r 18, border line 1): **Radio** (22×22, bg surface, r 99, border line 1.5) · **Frame** (col gap 2, w:fill, grow): T title — IBM Plex Sans SemiBold 15, ink + T description — IBM Plex Sans Regular 13/145%, muted (description optional)
  - Yes (77 tall): bg blush, border coral 2 · Radio bg coral + icon check 13px
- **Form/Check chip** — On = No | Yes
  - No (row gap 8, pad 10/16/10/12, align center, h 40, bg surface, r 999, border line 1): box (18×18, bg surface, r 6, border line 1.5) · T — IBM Plex Sans Medium 14, ink
  - Yes (h 38): bg ink, no border · box bg coral + icon check 12px · T surface
- **Form/File row** — Status = Uploading | Done | Error
  - Common (row gap 12, pad 12/14/12/14, align center, ~420 wide, r 14): **File chip** (36×36, bg lilac, r 10) → icon file 18px · **Frame** (col gap 4, w:fill, grow): T filename — IBM Plex Sans Medium 14, ink + status line
  - Uploading (72 tall, bg surface, border line 1): progress track (w:fill, h 4, bg canvas, r 99) → coral fill · T "Uploading… 64%" — IBM Plex Sans Regular 12, muted · icon x 18px (cancel)
  - Done (64 tall, bg surface, border line 1): T "{size} · uploaded" — IBM Plex Sans Regular 12, muted · **Frame** (24×24, bg mint, r 99) icon check 13px · icon x 18px (remove). Image files show a thumbnail in place of the file chip.
  - Error (64 tall, bg blush, border coral 1): T reason — IBM Plex Sans Regular 12, coral · icon retry 18px · icon x 18px
- **Form/Step item** — State = Done | Current | Upcoming | Attention
  - Common (row gap 12, pad 8/12/8/10, align center, 260×42 (w:fill in the stepper), r 12): **Indicator** (26×26, r 99) · T step name — IBM Plex Sans 14
  - Done: indicator bg mint + icon check 13px · name Medium ink
  - Current: row bg surface · indicator bg ink + T "0n" — Oswald Medium 11, surface · name SemiBold ink
  - Upcoming: indicator bg surface, border line 1.5 + T "0n" — Oswald Medium 11, muted · name Medium muted
  - Attention: indicator bg blush + T "0n" — Oswald Medium 11, coral · name Medium ink · trailing ellipse 8×8 coral

### Onboarding — Desktop · Step 2 Business details — node 64:892 (1440×2624)
- Shell: stepper "1 of 13 sections done" (fill 19/246); 01 Done, 02 Current
- **Step card** (col gap 20, 712×2341): head (pad bottom 8) "STEP 2 OF 13" "· about 6 min" · "Your business details" · "The official details we need for your contact page, footer and legal pages."
  - **Group heading** pattern on this and later steps: (col gap 4, pad 8/0/0/0, w:fill) T — IBM Plex Sans SemiBold 18 ls -1%, ink (+ helper IBM Plex Sans Regular 14/150%, muted)
  - Heading "Registered details"
    - Row: Field Filled "Registered business name" = "Mokoena Plumbing (Pty) Ltd" · Field Filled "Trading name, if different" (Optional) = "Mokoena Plumbing"
    - Field Filled "Type of business" = "Private company (Pty) Ltd", hint "Choose from the list" (full width; it is a select)
    - **Conditional block** (col gap 16, pad 16/20/20/20, 630×307, bg canvas, r 20): **Frame** (row gap 6, align center) icon info 14px + T "Shown because you chose a (Pty) Ltd" — IBM Plex Sans Regular 12, muted · row: Field Filled "Registration number" (Optional) = "2019/123456/07" · Field Default "VAT number, if VAT registered" (Optional) "e.g. 4123456789" · Field Textarea Filled "Directors or office bearers (full names)" (Optional) = "Thandi Mokoena, Sipho Mokoena"
  - Heading "Address" — row of 2 textareas: Filled "Physical business address" = "14 Market Street, George, 6529" · Default "Postal address, if different" (Optional) "PO Box…"
  - Heading "Where should your address appear on the website?" — row of 3 radio cards: "Contact page and footer" / "Full address, everywhere" · Selected "Suburb and city only" / "Full address on the legal page only" · "Home-based or mobile" / "Legal page only"
  - Heading "Contact details for the website" — row of 3 fields: "Business phone" = "044 555 0100" · "WhatsApp number" = "082 555 0142" · "Business email" = "info@mokoenaplumbing.co.za" (all Optional, Filled)
  - Row of 2 textareas: "Trading hours" = "Mon–Fri 7:30–17:00, Sat 8:00–12:00, 24/7 emergencies" · "Areas you serve" = "George, Wilderness, Mossel Bay, Knysna"
  - Row: "Year the business started" = "2019" · "How many people work in the business?" = "8"
  - Textarea "Industry bodies, associations or accreditations" = "PIRB registered, IOPSA member"
  - Heading "Online profiles" + helper "Paste the full link to each one you have." — 3 rows of 2 fields: "Google Business Profile" = "https://g.page/mokoena-plumbing" · "Facebook page" = "https://facebook.com/mokoenaplumbing" · "Instagram" "https://instagram.com/…" · "LinkedIn" "https://linkedin.com/company/…" · "TikTok" "https://tiktok.com/@…" · "YouTube" "https://youtube.com/@…"
  - Textarea Default "Other profiles or directory listings" "e.g. Snupit, Yellow Pages"
- **Help rail** — "Why we ask": "These details appear on your contact and legal pages, and help Google show the right business information in search and on Maps."

### Onboarding — Desktop · Step 3 What you do — node 64:1208 (1440×2775)
- Shell: "2 of 13 sections done" (fill 38); 01–02 Done, 03 Current
- **Step card** (712×2492): "STEP 3 OF 13" "· about 10 min" · "What you do" · "Your offer in your own words. This becomes the backbone of your homepage and services pages."
  - Textarea Filled "In one or two sentences, what do you do and for whom?" = "We fix, install and maintain plumbing for homes and businesses across the Garden Route, with 24/7 emergency call-outs."
  - Textarea Default "Your story: how and why did the business start?" (Optional) "A few lines is plenty"
  - Textarea Filled "What makes you different from the alternatives?" = "We arrive within 60 minutes for emergencies, quote before we start, and clean up after ourselves."
  - Heading "Your services or products" + "Add each one you want on the website."
    - **Repeat · SERVICE 1** (630×398): row "Name" = "Burst pipes & leaks" · "Price or “from” price" (Optional) = "Call-out from R650" · textarea "What it is and what’s included" = "Leak detection, repairs and pipe replacement, 24/7." · row "Who it’s for" = "Homeowners and landlords" · "How important is it to your business?" = "Most important" (select)
    - **Repeat · SERVICE 2** (630×307): "Name" = "Geyser installation" · "Price or “from” price" "e.g. from R8,500" · textarea "What it is and what’s included" "Describe it in a sentence or two"
    - **Add another** "Add another service"
  - Textarea Filled "If visitors remember only three things about you, what should they be?" (Optional) = "Fast emergency response · Honest upfront quotes · Qualified, insured plumbers"
  - Heading "Awards, certifications and qualifications"
    - **Repeat · AWARD 1** (630×238): row "What it is" = "PIRB Licensed Plumber" · "Year" = "2019" · row of 2 radio cards (title only): Selected "Show on the website" · "Keep it private"
    - **Add another** "Add another award or certification"
  - Textarea Filled "Numbers you’re proud of, that you can back up" (Optional) = "1,200+ jobs completed · 4.9 stars from 180 Google reviews", hint "Only numbers you could prove if asked."
  - Row of 2 textareas: "Guarantees, warranties or promises" = "12-month workmanship guarantee" · "Well-known clients we may name" "Only with their permission"
- **Help rail** — "We write and structure your pages from these answers. The clearer the “what makes you different”, the stronger your homepage."

### Onboarding — Desktop · Step 5 Your customers — node 64:1491 (1440×2026)
- Shell: "4 of 13 sections done" (fill 76); 01–04 Done, 05 Current
- **Step card** (712×1743): "STEP 5 OF 13" "· about 6 min" · "Your customers" · "Who you serve, and what they need to hear before they choose you."
  - Heading "Your main types of customer" + "Add up to four. Think of the people who bring in most of your work."
    - **Repeat · CUSTOMER TYPE 1** (630×419): Field "Who are they?" = "Homeowners with an emergency" (full width) · row of 2 textareas "What do they need from you?" = "Someone reliable, fast, who won’t overcharge" · "What worries them or makes them hesitate?" = "Hidden costs; strangers in the house" · row of 2 fields "What makes them decide to buy?" = "Reviews, a quick reply, a clear price" · "Where are they? (area, age, online habits)" = "Garden Route, 30–65, Google on mobile"
    - **Repeat · CUSTOMER TYPE 2** (collapsed to its first field, 630×147): "Who are they?" = "Property managers and landlords"
    - **Add another** "Add another customer type"
  - Heading "Languages your customers speak" — chips: On "English" · On "Afrikaans" · "isiZulu" · On "isiXhosa" · "Sesotho" · "Setswana"
  - Heading "Should the website be in more than one language?" — row of 3 radio cards: Selected "English only" · "English plus another language" / "Extra languages are R5,000 each" · "Not sure" / "We’ll advise"
  - Heading "Questions customers always ask, with your answers" + "These become your FAQ section."
    - **Repeat · QUESTION 1** (630×307): Field "Question" = "Do you charge for a quote?" · Textarea "Your answer" = "No. Quotes are free; call-outs for emergencies start at R650."
    - **Add another** "Add another question"
- **Help rail** — "Pages that speak to a specific customer convert far better than pages written for everyone. Your FAQs also become a page Google can show in search."

### Onboarding — Desktop · Step 6 Competitors & inspiration — node 65:1396 (1440×2264)
- Shell: "5 of 13 sections done" (fill 95); 01–05 Done, 06 Current
- **Step card** (712×1981): "STEP 6 OF 13" "· about 6 min" · "Competitors and inspiration" · "Who you’re up against, and the kind of websites you like (and don’t)."
  - Heading "Your main competitors"
    - **Repeat · COMPETITOR 1**: row "Name" = "Garden Route Plumbers" · "Website" = "https://gardenrouteplumbers.co.za" · row of 2 textareas "What do they do well online?" = "Lots of Google reviews; clear prices" · "Where are they weak?" = "Slow site, hard to use on a phone"
    - **Add another** "Add another competitor"
  - Heading "Websites you like" + "Any industry. Tell us what exactly you like."
    - **Repeat · WEBSITE 1**: "Website" = "https://www.revolut.com" · textarea "What exactly do you like about it?" = "Clean, confident, easy to scan on a phone"
    - **Add another** "Add another website you like"
  - Heading "Websites you don’t like"
    - **Repeat · WEBSITE 1**: "Website" "https://…" · textarea "What don’t you like?" "e.g. too busy, pop-ups everywhere"
    - **Add another** "Add another"
  - Heading "How should your website feel?" + "Pick up to five." — chips: On "Professional" · On "Friendly" · "Bold" · "Calm" · "Premium" · "Playful" · On "Modern" · "Classic" · "Warm" · "Minimal" · "Energetic" · On "Trustworthy" · "Natural and earthy" · On "Technical and expert"
  - Textarea Filled "How should it definitely NOT feel?" = "Cheap, cluttered or salesy"
- **Help rail** — "Seeing what you like and dislike saves whole rounds of design revisions. Competitors show us where your site can stand out."

### Onboarding — Desktop · Step 8 Pages & content — node 65:1672 (1440×4018)
- Shell: "6 of 13 sections done" (fill 114); 01–04 Done, 05 Attention, 06–07 Done, 08 Current (continues in the next chunk)

- **Step card** (col gap 20, 712×3735): "STEP 8 OF 13" "· about 12 min" · "Website pages and content" · "The pages, words, photos and proof that go on your site."
  - Field Filled "Your current website, if you have one" (Optional) = "https://mokoenaplumbing.co.za"
  - **Conditional · Shown because you have a current website** (630×214, bg canvas, r 20): info line · row of 2 textareas "What should we keep from your current website?" = "Our services list and the photo of the team" · "What should we change or remove?" = "The old prices and the slideshow"
  - Heading "Which pages do you think you need?" + helper "Your Grow package includes up to 10 pages. 8 selected." (live count vs package allowance)
    - chips: On "Home" · On "About us" · "Services (one page)" · On "Services (a page each)" · "Products" · On "Portfolio or gallery" · On "Testimonials and reviews" · "Team" · "Pricing" · On "FAQ" · On "Blog or news" · On "Contact" · "Bookings" · "Careers" · "Locations or branches"
  - Textarea Default "Anything specific about any page?" (Optional) "e.g. the gallery should be sorted by job type"
  - Heading "Who will write the website text?" — row of 3 radio cards: "GoodGround writes it" / "From this brief (copywriting add-on)" · "I’ll supply the text" / "We’ll edit it for the web" · Selected "A mix" / "I’ll supply some, you write the rest"
  - **Compact dropzone** (col gap 8, pad 22/24/22/24, align center, 630×87, w:fill, bg canvas, r 20, border line 1.5 dashed): **Frame** (row gap 12, align center): **Frame** (40×40, bg surface, r 999) icon upload 20px · **Frame** (col gap 2): T title — IBM Plex Sans SemiBold 15, ink + T sub — IBM Plex Sans Regular 13, muted
    - "Existing text to reuse" / "Word documents, PDFs, brochures, menus"
  - ⧉ Form/File row Done "services-list-2024.docx" / "38 KB · uploaded"
  - Heading "Photos for the website" — row of 3 + row of 2 radio cards: "Professional photos" / "We have them" · Selected "Some photos" / "Phone or amateur" · "Stock photos" / "We need them" · "Book a photographer" / "We’d like to" · "Not sure" / "We’ll advise"
  - Compact dropzone "Upload photos of your team, premises, work and products" / "Drag files here, or browse · max 50 MB each"
  - File rows: Done "team-outside-van.jpg" "4.2 MB · uploaded" · Done "geyser-install-before-after.jpg" "3.1 MB · uploaded" · Uploading "bathroom-renovation-12.jpg" "Uploading… 38%"
  - Row: Field Default "A big photo or video collection? Paste a link" (Optional) "Google Drive, Dropbox or WeTransfer" · Field Default "Video links to feature" (Optional) "YouTube or Vimeo"
  - Heading "Testimonials"
    - **Repeat · TESTIMONIAL 1** (630×398): Textarea "What they said" = "They arrived within the hour on a Sunday night and fixed our burst pipe. Fair price, no mess." · row "Their name" = "Annelie V." · "Role, company or town" (Optional) = "Homeowner, Wilderness" · row of 2 radio cards: Selected "Yes, they agreed to be quoted" · "Not yet" / "We’ll ask before launch"
    - **Add another** "Add another testimonial"
  - Field Filled "Link to your Google or other reviews" (Optional) = "https://g.page/mokoena-plumbing/review"
  - Heading "Projects or case studies to feature" + "Optional. Great for the portfolio page."
    - **Repeat · PROJECT 1**: row "Project name" = "Guesthouse re-plumb, Knysna" · "Client (if they agreed to be named)" "Leave blank to keep private" · textarea "What you did, and the result" = "Replaced all copper piping in 12 rooms over 4 days with no guest downtime."
    - **Add another** "Add another project"
  - Heading "Team members to show on the website" + "Optional."
    - **Repeat · TEAM MEMBER 1**: row "Name" = "Sipho Mokoena" · "Role" = "Master plumber" · textarea "Short bio" "One or two sentences"
    - **Add another** "Add another team member"
  - Compact dropzone "Files visitors should be able to download" / "Price lists, menus, brochures · optional"
- **Help rail** — "Content is the most common reason websites launch late. Telling us early what exists, and who writes the rest, keeps your timeline on track."

### Onboarding — Desktop · Step 9 Features & tools — node 65:2157 (1440×1893)
- Shell: "7 of 13 sections done" (fill 134); 05 Attention; 09 Current
- **Step card** (712×1610): "STEP 9 OF 13" "· about 6 min" · "Features and tools" · "What the site needs to do, and the tools it should connect to."
  - Field Filled "Which email address(es) should website enquiries go to?" = "info@mokoenaplumbing.co.za, thandi@mokoenaplumbing.co.za", hint "Separate several addresses with commas."
  - Heading "Which of these do you need?" — chips: On "Contact form" · On "Click-to-call button" · On "WhatsApp button" · On "Online booking" · On "Quote request form" · "Newsletter sign-up" · On "Google Map" · On "Show our Google reviews" · "Instagram or social feed" · On "Blog" · "Online payments" · "Online shop" · "Live chat" · "Client login area" · "Job applications" · "Multiple languages"
  - **Info note** (row gap 10, pad 12/16/12/16, 630×64, w:fill, bg mint, r 14): icon info 16px · T "Included in your Grow package: calendar or booking widget, Google Map and WhatsApp button. Anything ticked that isn’t included is flagged like this before we start." — IBM Plex Sans Medium 13/150%, ink
  - **Conditional · Shown because you ticked Online booking** (630×307): Field Filled "Which booking system do you use or prefer?" = "Calendly" · Textarea Default "Your booking cancellation policy" "We’ll show this on the booking page"
  - Field Default "Do you use a CRM or customer database?" "e.g. HubSpot, a spreadsheet, none"
  - Heading "Do you already have any of these set up?" — chips: "Google Analytics" · "Google Search Console" · "Google Tag Manager" · On "Google Business Profile" · "Meta (Facebook) Pixel" · "Don’t know"
  - Textarea Filled "What would you type into Google to find a business like yours?" = "plumber george, emergency plumber garden route, geyser installation george"
  - Row of 2 textareas: "Which towns, suburbs or regions should we target?" = "George, Wilderness, Mossel Bay, Knysna, Plettenberg Bay" · "Anything else the website must do?" "Anything we haven’t asked"
- **Help rail** — "Features shape both the build and your quote. If you tick something that isn’t in your quote, we’ll talk it through before we start."

### Onboarding — Desktop · Step 10 Domain, hosting & access — node 66:2000 (1440×1981)
- Shell: "8 of 13 sections done" (fill 153); 10 Current
- **Step card** (712×1698): "STEP 10 OF 13" "· about 5 min" · "Domain, hosting and access" · "Where your domain, website and email live today, and who can log in."
  - **Warning note** (row gap 10, pad 12/16/12/16, 630×64, w:fill, bg blush, r 14): icon lock 16px · T "Never type passwords here. After you send the brief, we’ll email you a secure way to give us access to the accounts you tick below." — IBM Plex Sans Medium 13/150%, ink
  - Field Filled "Your domain name(s)" = "mokoenaplumbing.co.za", hint "Add every domain you own, separated by commas."
  - Row: select "Where is your domain registered?" = "Domains.co.za" hint "Choose from the list, or “Don’t know”." · select "Where is your current website hosted?" = "Afrihost" hint "Choose from the list."
  - Heading "Who can log in to manage your domain?" — 2×2 radio cards: "Me or someone in my business" · Selected "Our previous web developer" · "Our IT company" · "I don’t know" / "We’ll help you find out"
  - Row: "What is your current website built with?" = "WordPress" · "Who provides your business email?" = "Google Workspace (Gmail)"
  - Textarea Filled "Previous developer’s name and contact details, if we need a handover" = "Jaco at Coastal Web, jaco@coastalweb.co.za"
  - Heading "Who will update the website after launch?" — 2×2 radio cards: "Me" · Selected "Someone on my team" · "GoodGround" / "On a Care Plan or Full Service" · "It will rarely need updating"
  - **Conditional** (630×181) info line "How comfortable is that person with editing websites? (shown because someone on your team will update it)" · row of 3 radio cards: "Very comfortable" · Selected "Some experience" · "Beginner"
  - Heading "Which of these can you give us access to?" + "We’ll send step-by-step instructions for each." — chips: On "Domain / DNS" · On "Hosting account" · On "Current website admin" · On "Google Business Profile" · "Google Search Console" · "Google Analytics" · On "Facebook and Instagram business accounts" · "I’ll need help with all of this"
- **Help rail** — "A smooth move to your new site depends on getting into the right accounts. We only ask who has access here; the actual access happens later, securely."

### Onboarding — Desktop · Step 11 Legal & privacy — node 66:2282 (1440×2073)
- Shell: "9 of 13 sections done" (fill 172); 11 Current
- **Step card** (712×1790): "STEP 11 OF 13" "· about 6 min" · "Legal and privacy" · "What your site needs to stay on the right side of POPIA and your industry’s rules."
  - ⧉ Form/Field Kind=Input **State=Error** "Your Information Officer under POPIA: name and email" placeholder "e.g. Thandi Mokoena, thandi@mokoenaplumbing.co.za", error "Required. Usually the owner or managing director."
  - Heading "Is your Information Officer registered with the Information Regulator?" — 3 radio cards: "Yes" · "No" / "We can point you to how" · Selected "Don’t know"
  - Compact dropzone "Existing privacy policy, terms or disclaimers" / "PDF or Word · optional"
  - Field Default "Or a link to them" "https://…"
  - Textarea Filled "What personal information will your website forms collect?" = "Name, phone, email, address and a description of the job."
  - Heading "Will you sell or take payment online?" — 3 radio cards: "Yes" · Selected "No" · "Maybe later"
  - Info note (bg mint, 630×44): "Returns, refunds and delivery questions appear only if you sell online."
  - Textarea Filled "Your booking cancellation policy" = "Cancel at least 2 hours before your slot at no charge.", hint "Shown because you ticked Online booking in Features."
  - Heading "Is your industry regulated?" — chips: "Financial services (FSCA / FAIS)" · "Health (HPCSA or another council)" · "Legal (LPC)" · "Property (PPRA)" · "Alcohol or gambling" · "Education" · On "No, or not sure"
  - Heading "Is the website aimed at children (under 18)?" — 2 radio cards: Selected "No" · "Yes"
  - Heading "Do you send marketing emails or SMSes?" — 3 radio cards: "Yes, only to people who opted in" · "Yes" · Selected "Not yet"
- **Help rail** — "Why we ask" (180 tall): "South African law (POPIA) requires a named Information Officer and a privacy policy for any site that collects personal information, which every contact form does."

### Onboarding — Desktop · Step 12 Anything else — node 66:2547 (1440×1388)
- Shell: "10 of 13 sections done" (fill 191); 12 Current
- **Step card** (712×1105): "STEP 12 OF 13" "· about 4 min" · "Anything else" · "The last few things that help the project run smoothly."
  - Textarea Filled "Important dates during the project" = "Closed 23 Dec – 3 Jan. Trade show in Cape Town, 10–12 March."
  - Textarea Filled "Anything you’re worried about with this project?" = "That it takes too much of our time to get the content together."
  - Textarea Filled "What went well or badly with past websites or agencies?" = "Our last developer stopped answering after launch, and we couldn’t update anything ourselves."
  - Textarea Default "Anything else we should know?" "Anything at all"
  - Compact dropzone "Any other files you’d like to share" / "Optional · max 50 MB each"
  - File row Done "vehicle-wrap-design.pdf" "2.4 MB · uploaded"
  - Info note (bg mint): "Next: review everything, see what’s missing, and send. You can still send with gaps."
- **Step footer** — on this step the primary button reads ⧉ Button Style=Coral "Save and review" (198×52)
- **Help rail** — "This is where the useful surprises come out: a busy season, a past bad experience, a file you forgot. Nothing is too small."

