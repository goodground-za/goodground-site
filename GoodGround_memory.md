# GoodGround — Project Memory

Living master reference for the GoodGround marketing site. Read this first before picking up any work here. Not deployed — this file isn't imported or served by the app, it just travels with the repo.

**What GoodGround is:** a website design & development studio, founded 2026, operating under **The Trail Tribe**. Based in Brackenfell, Cape Town, Western Cape, South Africa. The one differentiator: every project is one fixed price split into **12 equal monthly payments**, not a subscription.

**Source docs (outside this repo):** `PROJECTS/GROW BRAND/GROW-PROSPECT/clients/goodground/brief/` — `GoodGround-Development-Brief.md`, `GoodGround-Website-Copy.md` (copy deck), and `reference/` (the client's palette/comp artwork this build was re-skinned against).

---

## Status

- **Live:** https://goodground.co.za and https://www.goodground.co.za (deployed on Vercel, SSL issued, both resolving 200).
- **GitHub:** https://github.com/goodground-za/goodground-site.git — `main` branch, pushed and tracked.
- **DNS:** Afrihost. Root A record → Vercel (`216.198.79.1`), `www` CNAME → Vercel. As of 2026-07-18, propagation across Afrihost's 4 nameservers (`ns.dns1.co.za`, `ns.dns2.co.za`, `ns.otherdns.com`, `ns.otherdns.net`) was mid-sync — one nameserver had already picked up the change, three hadn't. Re-verify all four agree before treating DNS as fully settled (see punch list).
- **Pages live:** Home, Services, About, Contact, Work, Insights (+ 1 article), Start-project, Legal, 404. No `/pricing` (removed by founder — see Decisions).
- **Every page:** Lighthouse mobile 100/100/100/100 (Accessibility, Best Practices, SEO, Agentic Browsing), zero failures, at last check.

---

## Tech stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. npm. No CMS — content lives in typed files under `/content` (hard client requirement, overrides the dev brief's headless-CMS recommendation).

Node/npm versions: whatever's on the build machine; no `.nvmrc` pinned.

---

## Design system

Third art direction (v4), replacing an earlier green/cream system entirely. Palette sampled directly from the client's own `Palette.png`, not eyeballed:

| Token | Hex | Use |
|---|---|---|
| `--color-bark` | `#331816` | Dominant dark sections, footer |
| `--color-pine` | `#1c261d` | Nav bar, deepest sections |
| `--color-ember` | `#ac4119` | CTA bands, buttons, accents |
| `--color-peach` | `#fde5c1` | Text on dark, pill eyebrows |
| `--color-cream` | `#f1e8d7` | Light sections |
| `--color-surface` | `#fdfbf6` | Form cards/inputs on cream |
| `--color-stone` | `#4f5450` | Muted |
| `--color-ink` | `#010602` | Near-black buttons |

Contrast-checked as drawn: peach on bark 13.4:1, white on ember 5.96:1, ember on cream 4.90:1. All AA-clear.

**Typography:** Montserrat only — Bold (700) on every heading per the client, Regular/Medium body. No Sora/Manrope (that was the discarded earlier direction).

**Layout unit:** inset rounded blocks (`--radius-block: 40px`) via `components/Block.tsx` — bark/pine/ember/cream tones, `grain` texture (inline SVG turbulence, not the supplied 1.7MB PNG), and an `AuroraGlow` ambient warmth on dark tones by default.

**Tailwind v4 note:** no `tailwind.config.ts`. Tokens live in `@theme` in `app/globals.css`.

---

## Content model (`/content`, no CMS)

- `site.ts` — NAP, nav links, footer links, legal links. `phone: null`, `socials: []` still unconfirmed — don't invent.
- `images.ts` — the client's real supplied artwork (pre-masked PNGs) for Home/About/Philosophy/Payment/Footer, **plus** placeholder Unsplash URLs used elsewhere (hero photography on inner sections) — these still need swapping for real GoodGround photography.
- `services.ts` — 4 services, each with homepage one-liner + full Problem/Solution/Outcome detail for the Services page deep-dives.
- `process.ts` — the 5-step "Prepare the Ground → Harvest" sequence.
- `faq.ts` — 8 Q&As; **3 have `answer: null`** (cancellation policy, project timeline, service area) and render an honest "still working this one out" state. Do not invent answers.
- `pricing.ts` — `PLACEHOLDER_PRICING = true` gates every rand figure show as illustrative. Tier totals are fake placeholders. Calculator/component still exists but is unused (Pricing page was removed).
- `stats.ts`, `testimonials.ts`, `caseStudies.ts` — built, intentionally empty (no fabricated numbers/quotes/logos for a studio founded 2026).
- `articles.ts` — blog content model (typed `Block[]`), one article live: "why-small-businesses-in-south-africa-need-a-website" (~1620 words, targets "website design in South Africa").

---

## Key shared components

- `components/PageHero.tsx` — **the standard inner-page hero.** Fixes a real bug where every inner page had the H1 crammed left with the whole right half empty: headline left (col-7), lead paragraph bottom-aligned right (col-5). Reuse for any new page.
- `components/Block.tsx` — the dark/light rounded-block layout unit; `glow` prop (default on for bark/pine) adds `AuroraGlow`.
- `components/AuroraGlow.tsx` — ambient animated warmth (ember/gold/peach), technique adapted from a 21st.dev component, recoloured from its original cool blue/violet. See Traps below for two real bugs found building it.
- `components/motion/KineticText.tsx` — phrase-by-phrase colour-reveal headings (not opacity — see Traps).
- `components/motion/MaskReveal.tsx` — the hero wordmark's rise-behind-a-mask entrance.
- `components/Marquee.tsx` — seamless CSS ticker band (services list) on Home.
- `components/ParableModal.tsx` — accessible dialog explaining the Parable of the Sower (the name's origin), portalled to `document.body` (see Traps).
- `lib/enquiry.ts` — **single shared submission path** for every form (`sendEnquiry()`). Both `ContactForm.tsx` and `StartProjectForm.tsx` use it.

---

## Forms

Both forms POST to **Web3Forms** with GoodGround's own key (hardcoded fallback in `lib/enquiry.ts`, since Web3Forms access keys are meant to be public/client-side): `beae6de4-74ed-4868-a4eb-e479e0f43e6c`. Verified live — a real submission returned `success: true` from Web3Forms and delivered to hello@goodground.co.za. An env var `NEXT_PUBLIC_WEB3FORMS_KEY` would override it if ever rotated. If the key is ever missing entirely (it won't be, it's hardcoded), the fallback path opens a pre-filled `mailto:` instead — never fakes a "received" state.

**Do not reuse Grow Brand's Web3Forms key** — that one routes to info@growbrandagency.com, a different inbox.

---

## SEO

Positioning locked by the founder: **development-first wording** ("Website Development & Design Studio" — kept "studio" to match the client's own comp artwork, not "agency") and **South Africa-first geography** (Cape Town kept only as the local-pack anchor in hero trust line + schema address). Primary target keyword: "website development South Africa" / "website design South Africa".

- Every page has unique title/description, one `<h1>`, canonical.
- Schema: `ProfessionalService` + `serviceType` + `areaServed: Country South Africa`, `WebSite`, `FAQPage` (answered Qs only), `BreadcrumbList` on inner pages, `BlogPosting` on articles.
- `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt` (AI-crawler readiness — this is what took the Lighthouse Agentic Browsing score from 67→100).
- Full `/seo audit` explicitly deferred by the founder until later — don't run it unprompted.

---

## Traps already hit — don't repeat these

1. **Framer's `initial` styles are server-rendered.** Scroll-reveal content ships as `opacity:0` in the HTML and stays invisible if JS fails. A `<noscript>` block in `app/layout.tsx` forces `[data-reveal]` visible. Tag every new motion component with `data-reveal`.
2. **KineticText reveals by colour, not opacity.** An `opacity:0.18` resting state is unreadable text and fails Lighthouse/WCAG (this dropped a page from 100→96 once). Both resting colours are chosen to clear AA on their surface.
3. **Next 16 no longer overrides `scroll-behavior:smooth` on route change.** `data-scroll-behavior="smooth"` on `<html>` is required, or every navigation slow-scrolls from wherever the previous page was.
4. **`var(--color-x)` inside a CSS gradient with a position stop computes to `none` in Chrome.** Killed the AuroraGlow entirely the first time — use literal hex inside `repeating-linear-gradient(...)`, not custom properties.
5. **`overflow: hidden` + `filter: blur` on the same element unreliably fails to clip in some Chrome builds** — this caused a real production bug: the 200%-wide aurora layer escaped its container and created massive horizontal overhang/scroll on both sides of the whole site. Fix: keep the clipping wrapper filter-free; put blur/blend/mask on the *inner* animated element. Also added `overflow-x: clip` on `<html>` globally as a hard backstop against any future decorative element doing this again.
6. **Animating `background-position` on a blurred layer repaints every frame.** Switched AuroraGlow to animate `transform: translateX` instead — GPU-composited, no repaint, cheaper with multiple instances on one page.
7. **A modal/dialog rendered inline (not portalled) can end up nested inside a `<p>`** if its trigger is inline text inside a paragraph — breaks HTML validity and throws hydration errors (block elements like `<h2>`/`<ol>` inside `<p>`). `ParableModal` fixed by portalling to `document.body` via `createPortal`. Any future inline-triggered overlay needs the same treatment.
8. **Nav "GG" monogram needed its visible text inside the `aria-label`** (WCAG 2.5.3 — accessible name must contain visible text) — `aria-label="GG — GoodGround home"`, not just "GoodGround — home".
9. **`ui-ux-pro-max --design-system` returns nothing usable for this brief** — its results (florist-green/agency-pink palettes, Cinzel fonts, testimonial-carousel landing patterns) don't fit a studio with zero clients. The client's own brief/comp overrides it; only its generic a11y checklist carried over.
10. **`humanizer` found nothing to fix on most passes** — the copy deck's voice was already clean. Don't manufacture edits to already-human copy just to show activity; only fix genuine tells (found exactly one: the word "premium" on the homepage).
11. **21st.dev MCP was broken for ~4 attempts** via the old stdio server (`@21st-dev/magic`, malformed responses). Fixed 2026-07-18 by switching `~/.claude.json` to the HTTP transport (`type:"http"`, `url:"https://21st.dev/api/mcp"`, `x-api-key` header). Tools are now `mcp__21st__*`. `search` is free; `get_component`/`generate` are paid/rate-limited — use sparingly.
12. **Non-interactive `git push` cannot complete GitHub's browser/device auth flow** and will hang or fail with a misleading "Repository not found" (that error is what an unauthenticated request to a private repo looks like, not a typo in the URL). Needs a real terminal session (or a PAT) to complete the login once.

---

## Business details on file

- **NAP:** GoodGround | Brackenfell, Cape Town, Western Cape, South Africa | Founded 2026.
- **Trading structure:** operates under **The Trail Tribe** (no separate company registration number for "GoodGround" itself — legal page reflects this, not a placeholder).
- **Email:** hello@goodground.co.za (confirmed real, sourced from the client's own footer artwork).
- **Founder:** described by experience, not named, at the founder's explicit request — "a web developer with more than 10 years' experience across UX and UI design, website design and graphic design." No name appears anywhere on the site.
- **Phone / socials:** still unconfirmed — `null` / `[]` in `content/site.ts`.

---

## Premium-perception audit (2026-07-19)

Founder asked point-blank whether the site reads as a premium web development agency. Honest answer: the craft (type rhythm, motion, layout, copy) is agency-grade; two visible elements were undercutting it.

**Fixed (code-only, no new assets, live):**
- **Nav logo was bare "GG" text, no mark.** Always visible, on every page — read as an unfinished placeholder on a site whose whole pitch is "we build things properly." Replaced with a small custom SVG sprout glyph (asymmetric leaves, not literal clipart) + wordmark lockup — `Mark` / `LogoLockup` in `components/Logo.tsx`. Zero new assets.
- **About page repeated a photo.** All 5 client-supplied images (`content/images.ts`) are already used once each on the Home page alone — About had nothing fresh left and reused the `philosophy` image (Home) *and* the `about` image (Home's AboutPreview) within the same short visit. Cut the "Why the name" photo entirely, kept only the hero photo repeat (unavoidable, and it earns its place introducing the founder). Section now runs on typography, same pattern as the Services page — which reads as the strongest page on the whole site *because* it has zero photography and leans on layout/type instead.

**Explicitly NOT changed — flagged to founder instead of overridden:**
- **The brown/ember/cream palette and the seedling/growth photography direction.** Both came directly from the client's own supplied comp and palette file, locked earlier in the build. They read warm/artisan/organic rather than "premium tech studio," which is a real tension — but it's the client's own brand decision, not mine to unilaterally gut. If revisited, this is the deepest remaining lever.
- **Photography scarcity is structural, not fixable in code.** Only 5 client images exist total. Real new photography (or at minimum, a couple more supplied images so About/Services/Work aren't starved) is the actual fix, not something I can generate my way out of.

## Open punch list (see TodoWrite for the live session version)

- Verify domain in Google Search Console + submit sitemap.
- Wire up GA4 (need measurement ID).
- Google Business Profile (founder to create).
- Swap placeholder "GG" logo for the real brand mark.
- Replace placeholder Unsplash photography with real GoodGround images.
- Add real phone number + Facebook/Instagram URLs.
- Write the 3 outstanding FAQ answers.
- Full SEO audit — deferred, don't run unprompted.
- Payment gateway + NCA legal review before any live billing.
- More blog articles.
- Real case studies for `/work`.
- Re-verify all 4 Afrihost nameservers have synced on the DNS change.
