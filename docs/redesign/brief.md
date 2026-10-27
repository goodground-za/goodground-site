# GoodGround redesign — build brief

Hand-off from the Figma design phase to the build. Put this file in the repo (suggested: `docs/redesign-brief.md`) and keep it up to date as decisions change.

- **Figma file:** https://www.figma.com/design/PI4P3fF9RVIAiTI7ZMxohj
- **Design status (26 Oct 2026):** every page is designed for desktop (1440) and mobile (390), with section notes and a page note beside each frame.
- **Live site:** https://www.goodground.co.za

---

## 1. How to use this brief (for the developer / Claude Code)

1. Connect the Figma MCP server in this environment. Open each frame by its node ID (listed in section 9) to get exact spacing, colours, type and layer structure.
2. **The notes in Figma are the spec.** Every frame has:
   - **section notes** in a column to the left (x = −720)
   - a **page note** further left (x = −1420): URLs, CMS fields, structured data, analytics
   - a **mobile note** to the right of the mobile frame
3. The **global motion system** lives on the Home Page, in the note "MOTION & INTERACTION · READ FIRST" (node `12:150`). Every other note refers to its tokens and pattern names (FADE-UP, HEADER REVEAL, STAGGER GRID, LINE MASK, COUNT-UP, LINKED CARD). Read it before building anything.
4. Build page by page, in the order in section 8. Get each page reviewed before starting the next one. Nothing goes live until the whole site is signed off.
5. **Keep every live URL that already exists** (section 5). Several are indexed by Google.

---

## 2. Design tokens

### Colour (Figma collection "GoodGround Color")

| Token | Hex | Use |
|---|---|---|
| `canvas` | #F7F7F4 | Page background |
| `surface` | #FFFFFF | Cards, white sections |
| `ink` | #111111 | Text, primary buttons |
| `muted` | #5F5B66 | Secondary text |
| `line` | #E7E3DC | Borders, dividers |
| `plum` | #2E1848 | Feature cards, open FAQ text |
| `plumDeep` | #1C0F2E | Dark sections, 404 |
| `wine` | #712344 | Accent |
| `coral` | #EF4A23 | Brand accent, Coral buttons, numbers |
| `peach` | #F7B48F | Kickers on dark backgrounds |
| `lilac` | #EEE8F6 | Tinted cards, open FAQ item |
| `blush` | #FCEDE6 | Tinted cards, icon chips |
| `mint` | #E3F1EA | "Fix" / success tints, ticks |
| `onDarkMuted` | #BDB3CB | Body text on dark |

- **Gradient (CTA cards, "404"):** linear at about 20°: `#3B1A4A 0% → #9A3348 40% → #C9583D 70% → #5A1E3C 100%`.
- **Translucent whites on dark:** 6–14% white fills and borders.

### Type

- **Display / labels / numbers:** Oswald Medium and SemiBold. Uppercase for headlines and kickers. Letter-spacing on kickers is about 6–8% of the font size.
- **Headings and body:** IBM Plex Sans Regular, Medium and SemiBold. Headings are sentence case with slight negative tracking (−1% to −3%).
- **Desktop scale:** hero display 88–120px, H2 56px, card titles 20–34px, body 15–18px.
- **Mobile scale:** display 48–60px, H2 28–34px, body 14–16px.

### Layout

- **Desktop:** 1440 frame, 120px side gutters, 1200px content width, sections usually 120px top and bottom padding.
- **Tablet (768–1199px):** desktop layout with 2-column grids and 40px gutters.
- **Mobile (<768px):** 20px gutters, sections usually 64px top and bottom.
- **Radii:** buttons and pills 999. Cards 20–32 (desktop) and 18–24 (mobile). Icon chips 10–14.

---

## 3. Components to build first

All of these are in Figma. Main sets are on the Home Page "Components" board (`2:17`).

| Component | Figma | Notes |
|---|---|---|
| Button | set `2:38` | Styles: Primary, Light, Coral, Outline. The label is followed by an arrow chip. Hover and pressed rules are in the global note. |
| Tag | set `2:49` | Tones: Neutral, Dark, Coral, Plum, OnDark. Static, never animated. |
| Article cover | set `41:177` | Topic: Websites, Growth, Pricing. |
| Onboarding form parts | `56:215` Field, `56:228` Radio card, `56:237` Check chip, `56:275` File row, `56:294` Step item | Used by the onboarding form, and partly by start-project. |
| Site header | in every frame | Logo pill, centre breadcrumb pill, MENU pill. Light variant on most pages, dark variant on 404. |
| Footer | in every frame | Shared. |
| Gradient CTA card | end of most pages | "GROWTH STARTS HERE." Start your project + email pill. |
| Linked card | everywhere | The whole card is one `<a>`. Hover lifts −4px and the arrow rotates 45°. |
| FAQ accordion | FAQ, industry, service, home | **One answer open at a time.** The first item is open by default. Animate with grid-rows 0fr→1fr. |
| Industry card + "Not on the list?" card | Home section 09 (`7:69`), Services section 08 (`38:246`) | The dashed card makes clear these are only *some* of the industries GoodGround works with. |
| Section header | everywhere | Tag + heading + optional sub-copy. Uses HEADER REVEAL. |

---

## 4. Motion system (summary; full spec in note `12:150`)

- **Durations:** `motion/xs` 120ms · `sm` 200ms · `md` 400ms · `lg` 700ms · `xl` 1200ms
- **Stagger:** 80ms between items, capped at 8 items.
- **Easing:**
  - `ease/out` cubic-bezier(0.16,1,0.3,1): entrances and hover-in
  - `ease/in-out` cubic-bezier(0.65,0,0.35,1): toggles
  - `ease/back` cubic-bezier(0.34,1.56,0.64,1): small pops only
- **Patterns:** FADE-UP, HEADER REVEAL, STAGGER GRID, LINE MASK, COUNT-UP, LINKED CARD.
- **Build approach (confirmed):**
  - CSS transitions plus one small IntersectionObserver helper for all reveals.
  - **GSAP + ScrollTrigger only for scroll-linked pieces:** Home 05 parallax, 06 process line, 08 heading highlight, and the industry page's typing search demo.
- **Must-haves:**
  - Animate only transform and opacity (plus clip-path and stroke-dashoffset where a note says so).
  - Hidden start states apply only when `<html class="js">`, so the site works with JavaScript off.
  - Honour `prefers-reduced-motion`.
  - The existing **"Pause motion" toggle** sets `html[data-motion="off"]` and is remembered in localStorage.
  - Loops pause when off-screen or when the tab is hidden.
  - Hover styles only inside `@media (hover:hover) and (pointer:fine)`.
  - Touch targets at least 44px.
  - Targets: CLS 0, and no long tasks caused by animation code.

---

## 5. URL map

Keep existing URLs. **New** marks pages that don't exist on the live site yet.

| URL | Page | Figma page |
|---|---|---|
| `/` | Home (keep the existing hero as-is) | Home Page |
| `/about` (+ `#our-story`) | About | About |
| `/services` | Services, including Website development (`#website-development`), Full service (`#full-service`) and the comparison table (`#compare`) | Services |
| `/services/{service-slug}` | Service detail template. Slugs: `seo`, `website-redesign`, `ux-design`, `google-ads`, `meta-ads` | Service detail template |
| `/services/{industry-slug}` | Industry template. Slugs: `trades-and-home-services`, `health-and-wellness`, `hospitality-and-food`, `retail-and-small-brands`, `professional-and-consulting`, `non-profits-and-community` | Industry template |
| `/work` | Work listing | Projects |
| `/work/{slug}` | Case study (example: B3TTER). **Project cards open the case study, not the live site.** | Case Study template |
| `/pricing` | Pricing + build-your-own configurator | Pricing |
| `/website-launch` | Website launch offer, including the sold-out state | Website launch offer |
| `/process` | **New.** How we work | Process |
| `/insights` | Insights listing | Insights |
| `/insights/{slug}` | Article (example: website cost guide) | Insights article template |
| `/start-project` | Multi-step project enquiry. Reads `?plan`, `?intent`, `?ref`. | Start project (contact) |
| `/contact` | Separate general contact page. **The earlier redirect to /start-project is cancelled.** | Contact |
| `/faq` | FAQ with search | FAQ |
| `/legal#privacy`, `/legal#terms` | Legal | Legal |
| `/onboarding` (private, sent to clients who accepted a quote) | **New.** Client onboarding form, 13 steps | Client onboarding |
| `/thanks?form=start-project\|contact\|onboarding` | **New.** No-JS fallback and conversion URL. noindex. | Utility pages |
| any unknown path | 404, which must return real HTTP 404 | Utility pages |

**Query parameters (spec in the Start project page note):**
- `?plan=launch` preselects the launch offer.
- `?intent=quote` / `?intent=seo-audit` sets the enquiry type.
- `?ref=...` records the source, for example `industry-trades-and-home-services`, `service-seo`, `case-{slug}`, `industry-other`, `404`.

Never put personal data in URLs.

---

## 6. Confirmed decisions

- Home hero banner stays exactly as it is live.
- Launch offer sold out: the bar shows full, the button becomes "Join the waitlist", and a "NEXT OPENING · {Month}" tag appears.
- Project cards → case study pages (`/work/{slug}`).
- FAQ: one answer open at a time, everywhere.
- Build: CSS + IntersectionObserver, with GSAP only for scroll-linked pieces.
- `/contact` is its own page. Project enquiries go to `/start-project`.
- **Auto-reply email** to the visitor after every successful enquiry. Spec in the Start project page note: subject per path, summary of their answers, what happens next.
- **Reply time copy:** "1–2 business days" everywhere.
- **Payment copy:** one fixed price; 50% deposit and 50% on completion, or 12 monthly instalments.
- Industry pages: if an industry has no published project, show the honesty card ("We haven't published a live … project yet"). Never show placeholder or fake projects.
- Industry lists always say these are only some of the industries GoodGround works with ("Not on the list?" card).
- Illustrations (phone mock, search results, ad previews) are labelled as illustrations. No invented metrics or ranking promises.
- Website development has no separate detail page. It lives on `/services`.

---

## 7. Open items (need GoodGround's answer before launch)

1. **POPIA Information Officer:** name and contact for the privacy policy.
2. **Third-party providers list** for the privacy policy. Only Google is listed live.
3. **Terms & Conditions wording:** an attorney needs to supply or review it. The design is a draft structure only.
4. **Number format:** `R12,000` (as designed) or `R12 000`. Pick one and apply it site-wide.
5. **WhatsApp number** for contact and the industry mockups.
6. **Real photos:** team, studio and projects.
7. **FAQ answer 06:** "4–6 weeks" conflicts with the package timelines. Align the copy.
8. **Onboarding decisions:**
   - storage region and retention period for uploaded files
   - whether the "Online shop" and "Client login area" options stay
   - who receives the "brief received" email
9. **New copy to confirm:**
   - Process page
   - Contact topics
   - About "On the web" lines
   - Services comparison "Ask us" cells
   - illustrative ad report numbers
   - service-page visuals for Website redesign, UX & design, Google Ads and Meta Ads (described in the Service template page note, not drawn)
10. **Redirects list:** any live URL that changes needs a 301. Keep the list in the repo.

---

## 8. Suggested build order

1. **Foundations:** tokens as CSS variables, fonts, base styles, the `js` / `data-motion` setup, the IntersectionObserver reveal helper, Button, Tag, Linked card, Section header, Header + menu, Footer, Gradient CTA, FAQ accordion.
2. **Home** (keep the hero as-is).
3. **Services**, then the **Service detail template** (SEO first), then the **Industry template** (Trades first). These share most components.
4. **Work listing** + **Case study template**.
5. **Pricing** (configurator) + **Website launch**.
6. **Start project** (multi-step, query params, auto-reply email, success and failure states) + **Contact** + **/thanks**.
7. **About** + **Process**.
8. **Insights** + **Article template**.
9. **FAQ** (with search) + **Legal** + **404**.
10. **Client onboarding** (largest; needs the backend and storage decisions from section 7 first).
11. **QA:**
    - reduced motion and Pause motion
    - JS off
    - keyboard and focus
    - Lighthouse
    - structured data (FAQPage, Service, BreadcrumbList)
    - analytics events listed in the page notes
    - 301s

---

## 9. Frame index (Figma node IDs)

| Page | Desktop | Mobile | Extra states |
|---|---|---|---|
| Home | `2:50` | `9:84` | Components `2:17`, global motion note `12:150` |
| About | `31:151` | `32:176` | |
| Services | `35:151` | `39:229` | |
| Service detail (SEO) | `95:159` | `98:201` | |
| Industry (Trades) | `86:151` | `90:198` | |
| Work listing | `20:151` | `21:169` | Filter sheet `21:344` |
| Case study (B3TTER) | `15:151` | `18:171` | |
| Pricing | `50:151` | `53:206` | Build sheet `53:469` |
| Website launch | `74:151` | `77:215` | Sold out `77:407` |
| Process | `80:151` | `84:186` | |
| Insights | `41:178` | `42:212` | Cover set `41:177` |
| Article | `44:151` | `47:198` | |
| Start project | `24:151` | `26:171`, `26:248`, `26:323` | `?plan=launch` `25:151`, `?intent=quote` `25:242`, validation `25:302`, sent `25:387`, failed `25:428` |
| Contact | `29:151` | `30:172` | Sent `29:352`, validation `29:365`, email copied `29:376` |
| FAQ | `67:151` | `68:167` | Search results `67:400` |
| Legal | Privacy `69:151`, Terms `71:163` | `72:190` | |
| Onboarding | Welcome `57:150`; steps 1–12: `57:342`, `64:892`, `64:1208`, `58:345`, `64:1491`, `65:1396`, `58:689`, `65:1672`, `65:2157`, `66:2000`, `66:2282`, `66:2547`; Review `59:684`; Sent `59:975` | `60:757`, `60:823`, `60:950` | Steps sheet `60:1068`, components `56:151` |
| Thank you | `100:159` | `100:227` | |
| 404 | `100:290` | `100:338` | |

---

## 10. Starting prompt for the build session

> Read `docs/redesign-brief.md`. The redesign is fully designed in Figma (file PI4P3fF9RVIAiTI7ZMxohj). Before writing code, open the Home Page note `12:150` (global motion system) and the Components board `2:17` with the Figma MCP tools, then look at how this codebase is structured and propose how the tokens, components and motion helper will fit into it. Start with step 1 of the build order (foundations) only, and stop for review before building any page. Keep every existing live URL working.
