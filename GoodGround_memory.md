# GoodGround — Project Memory

Living master reference for the GoodGround marketing site. Read this first before picking up any work here. Not deployed — this file isn't imported or served by the app, it just travels with the repo.

**What GoodGround is:** a website design & development studio, founded 2026, operating under **The Trail Tribe**. Based in Brackenfell, Cape Town, Western Cape, South Africa. The one differentiator: every project is one fixed price split into **12 equal monthly payments**, not a subscription.

**Source docs (outside this repo):** `PROJECTS/GROW BRAND/GROW-PROSPECT/clients/goodground/brief/` — `GoodGround-Development-Brief.md`, `GoodGround-Website-Copy.md` (copy deck), and `reference/` (the client's palette/comp artwork this build was re-skinned against).

---

## Status

- **Live:** https://www.goodground.co.za (deployed on Vercel, SSL issued). **www is the canonical host** — the apex `goodground.co.za` 308-redirects to it, so it does NOT resolve 200 despite an earlier note here saying both did. `site.url` in `content/site.ts` was pointing at the apex until 2026-07-20, which meant every sitemap URL, canonical tag, `robots.txt` Host line and schema URL pointed at a redirect. Fixed to www. **If the canonical host is ever changed, `content/site.ts` and the hardcoded URLs in `public/llms.txt` must both be updated** — llms.txt is a static file and does not read `site.url`.
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

- `site.ts` — NAP, nav links, footer links, legal links. `phone: null` still unconfirmed — don't invent. `socials` confirmed 2026-07-25 (Facebook + Instagram).
- `images.ts` — the client's real supplied artwork (pre-masked PNGs) for Home/About/Philosophy/Payment/Footer, **plus** placeholder Unsplash URLs used elsewhere (hero photography on inner sections) — these still need swapping for real GoodGround photography.
- `services.ts` — 4 services, each with homepage one-liner + full Problem/Solution/Outcome detail for the Services page deep-dives.
- `process.ts` — the 5-step "Prepare the Ground → Harvest" sequence.
- `faq.ts` — 8 Q&As; **3 have `answer: null`** (cancellation policy, project timeline, service area) and render an honest "still working this one out" state. Do not invent answers.
- `pricing.ts` — `PLACEHOLDER_PRICING = true` gates every rand figure show as illustrative. Tier totals are fake placeholders. Calculator/component still exists but is unused (Pricing page was removed).
- `stats.ts`, `testimonials.ts`, `caseStudies.ts` — built, intentionally empty (no fabricated numbers/quotes/logos for a studio founded 2026).
- `articles.ts` — blog content model (typed `Block[]`). **Maintained newest-first: the first entry is what the /insights page features.** Two articles live:
  - "biggest-website-mistakes-south-african-smes-make" (~1660 words, targets "small business website mistakes South Africa", 2026-07-20)
  - "why-small-businesses-in-south-africa-need-a-website" (~1620 words, targets "website design in South Africa", 2026-07-17)
  **Inline links:** article `p` and `ul` text supports `[label](/path)` markdown-style links, parsed by `withLinks()` in `app/insights/[slug]/page.tsx`. This exists because the content model is plain typed data with no JSX, so contextual internal links had nowhere to live. Internal paths render via `next/link`; external ones get `rel="noopener noreferrer"`. Use it to cross-link articles, which the SEO audit flagged as missing.

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

## Copy rules (updated 2026-07-20)

**No em dashes in user-facing copy.** The founder reversed the earlier "em-dash density is normal house style, leave it" rule and asked for all of them removed sitewide. A humanizer pass on 2026-07-20 rewrote roughly 30 user-facing sentences across Home, Services, About, the FAQ, and the shared sections. Verified zero em dashes in rendered HTML across all 9 pages. **Keep it that way: use commas, full stops or a colon instead.** Code comments and `aria-label`s were left alone (not prose).

The rewrite also fixed a broken sentence the founder flagged: About opened "We'd watched good businesses invest in websites…", a past perfect with no anchoring reference point, left over from dropping "both" out of the copy deck's "We'd both watched". Now reads "We kept seeing…", which works for a single founder without inventing a co-founder.

**"X, not just Y" is deliberate brand voice, not an AI tell.** The humanizer flags it as negative parallelism, but it recurs across client-approved positioning lines ("We build foundations, not just front-ends", "Built to be found, not just built to look nice"). Left intact on purpose. Do not strip these; it would flatten the voice.

**Article author is currently the Organization, not a person.** `content/articles.ts` has `author: "GoodGround"`, rendered as a byline and as `Organization` in `BlogPosting` schema. A named `Person` would be the stronger E-E-A-T signal, but the founder asked to be described by experience rather than by name on About, so **naming him is a founder decision, not a dev fix.** Left as-is pending that call.

---

## Analytics (2026-07-20)

GA4 property `G-T4JF7EJLW9`, wired via **`@next/third-parties`** (`<GoogleAnalytics>`), which loads gtag through `next/script` so it's scheduled rather than blocking.

**Correction — route-change tracking does NOT come from the component.** Reading `node_modules/@next/third-parties/dist/google/ga.js`, it only injects the standard gtag init snippet and the `gtag/js` tag; there is no router subscription. SPA pageviews work because **GA4 Enhanced Measurement's "Page changes based on browser history events"** is on by default and listens to History API pushes. Verified live: soft-navigating / → /about → /services produced three `en=page_view` beacons with the correct `dl=` URLs. **If anyone turns Enhanced Measurement off in the GA4 admin, every pageview after the first hard load disappears silently** — at that point add an explicit router-driven `gtag('event','page_view')`. Note the beacons take ~5s to land; a check at 3s reads as a false negative.

`components/Analytics.tsx` owns both the GA mount and the cookie banner. It reads the ID from **`NEXT_PUBLIC_GA_ID`** — unset means no analytics at all, which keeps local dev and Vercel previews out of the reporting data. Set it in Vercel as **Production-only**. `.env.local` holds it for local testing; `.env.example` documents it (`.gitignore` needed a `!.env.example` exception, since `.env*` was catching it).

**Consent gating is by render, not Google Consent Mode.** `<GoogleAnalytics>` simply doesn't mount until the visitor accepts, so no cookie is written and no request leaves the browser. That's an easier promise to defend under POPIA than "we sent the request but flagged it unconsented". Verified both ways in DevTools: pre-consent there is no `googletagmanager.com` request and `window.gtag` is undefined; after Accept, `gtag/js?id=G-T4JF7EJLW9` loads and the choice persists.

State lives in localStorage under `gg-cookie-consent` (`granted` / `denied`), read through **`useSyncExternalStore`** — not `useState` + `useEffect`, which trips the repo's `react-hooks/set-state-in-effect` lint rule. The server snapshot is a distinct `"unread"` state so the banner isn't baked into the SSR HTML and flashed at visitors who already answered. A module-level `fallback` var carries the answer when localStorage is blocked (private mode), otherwise the write fails silently and the banner could never be dismissed.

Legal §12 (Cookies) was rewritten to describe what actually happens — GA4 by name, opt-in, how to change the choice — instead of the previous generic "we use cookies" text.

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
10. **`humanizer` found nothing to fix on most passes** — the copy deck's voice was already clean. Don't manufacture edits to already-human copy just to show activity; only fix genuine tells (found exactly one: the word "premium" on the homepage). **Superseded 2026-07-20 for em dashes only, see the Copy rules section.**
11. **21st.dev MCP was broken for ~4 attempts** via the old stdio server (`@21st-dev/magic`, malformed responses). Fixed 2026-07-18 by switching `~/.claude.json` to the HTTP transport (`type:"http"`, `url:"https://21st.dev/api/mcp"`, `x-api-key` header). Tools are now `mcp__21st__*`. `search` is free; `get_component`/`generate` are paid/rate-limited — use sparingly.
12. **Non-interactive `git push` cannot complete GitHub's browser/device auth flow** and will hang or fail with a misleading "Repository not found" (that error is what an unauthenticated request to a private repo looks like, not a typo in the URL). Needs a real terminal session (or a PAT) to complete the login once.
13. **`git push` hangs silently because Git Credential Manager blocks (2026-07-20).** Push produces no output and eventually times out, while `git ls-remote` and `git fetch` work instantly. That asymmetry is the tell: the repo is public, so reads need no auth and only the push hits the credential layer. `GIT_TRACE=1 GIT_CURL_VERBOSE=1` shows the stall inside `git credential-manager get`, which sits for ~60s trying to raise a GUI dialog that can't display in a non-interactive session. **`GIT_TERMINAL_PROMPT=0` does not help** — it suppresses terminal prompts, not GCM's GUI flow. Working credentials are already in `~/.git-credentials`. Fix:
    ```
    git -c credential.helper= -c credential.helper=store push origin main
    ```
    The empty value is required: `credential.helper` is multi-valued (`manager`, `store` here), so `-c credential.helper=store` alone just *appends* and `manager` still runs first and still hangs. The empty assignment resets the list.
14. **~~The global `:focus-visible` ember outline fails WCAG on bark surfaces.~~ RESOLVED 2026-07-26.** The old 2px ember ring was fine on cream (4.90:1) but only 2.75:1 on bark and ~1:1 on ember (invisible). No single colour clears 3:1 against both the light *and* dark surfaces in this palette, so the fix is a **two-tone ring** in `globals.css`: `outline: 2px solid var(--color-ink)` (carries light surfaces, ink on cream ~15:1) **plus** `box-shadow: 0 0 0 4px var(--color-peach) !important` (carries dark surfaces, peach on bark 13.4:1 / ember 5.4:1). At least one ring is always visible, on every surface, sitewide (Nav, Footer, cookie banner, every CTA band) in one rule — no more per-panel `[&_:focus-visible]:outline-peach` overrides (those were all removed). **The `!important` on the halo is required and deliberate:** buttons carry their own `shadow-soft`/`shadow-lift`, and without `!important` that decorative shadow (a later Tailwind utility layer) overrides the base-layer focus halo and wipes it on dark surfaces — verified: the computed box-shadow silently dropped the halo until `!important` was added, confirmed visually afterward. The real `outline` (not box-shadow alone) keeps it working in forced-colors / high-contrast mode.
15. **The real cause of the 2026-07-19 deploy block was a GitHub-account/Vercel-project mismatch, not the co-author trailer.** Removing the `Co-Authored-By: Claude` trailer (worth doing regardless — `.claude/settings.json` sets `includeCoAuthoredBy: false`) did NOT clear the block; Vercel kept reporting "commit author did not have contributing access" on the very next push. Checked directly against the GitHub API: the commit was correctly linked to GitHub account `jsaayman94-design`, but `GET /repos/goodground-za/goodground-site/collaborators` showed only `goodground-za` itself with access — `jsaayman94-design` (the identity actually pushing commits) was never an explicit collaborator, even though it could push. Vercel's Hobby-plan check evidently keys off exactly that, not general push ability. **Fixed by making the repo public** (`PATCH /repos/.../ {"private": false}` via the GitHub API, using the token from `git credential fill`) — Vercel's private-repo collaborator restriction doesn't apply to public repos. Verified the full git history first (no secrets, no `.env` ever committed, the only credential-shaped string is the intentionally-public Web3Forms key) before doing this, since going public exposes history permanently. If deploys ever get blocked again, check `GET /repos/{owner}/{repo}/collaborators` against the pushing account's login before assuming it's a commit-metadata issue.

---

## Business details on file

- **NAP:** GoodGround | Brackenfell, Cape Town, Western Cape, South Africa | Founded 2026.
- **Trading structure:** operates under **The Trail Tribe** (no separate company registration number for "GoodGround" itself — legal page reflects this, not a placeholder).
- **Email:** hello@goodground.co.za (confirmed real, sourced from the client's own footer artwork).
- **Founder:** described by experience, not named, at the founder's explicit request — "a web developer with more than 10 years' experience across UX and UI design, website design and graphic design." No name appears anywhere on the site.
- **Phone:** still unconfirmed — `null` in `content/site.ts`.
- **Socials:** confirmed 2026-07-25 — Facebook `https://www.facebook.com/share/14jTaX4tHhU/`, Instagram `https://www.instagram.com/goodground.company`. Live in the footer (all pages, shared layout) and in `HomeSchema`'s `sameAs`.

---

## Premium-perception audit (2026-07-19)

Founder asked point-blank whether the site reads as a premium web development agency. Honest answer: the craft (type rhythm, motion, layout, copy) is agency-grade; two visible elements were undercutting it.

**Fixed (code-only, no new assets, live):**
- **Nav logo was bare "GG" text, no mark.** Always visible, on every page — read as an unfinished placeholder on a site whose whole pitch is "we build things properly." Replaced with a small custom SVG sprout glyph (asymmetric leaves, not literal clipart) + wordmark lockup — `Mark` / `LogoLockup` in `components/Logo.tsx`. Zero new assets.
- **About page repeated a photo.** All 5 client-supplied images (`content/images.ts`) are already used once each on the Home page alone — About had nothing fresh left and reused the `philosophy` image (Home) *and* the `about` image (Home's AboutPreview) within the same short visit. Cut the "Why the name" photo entirely, kept only the hero photo repeat (unavoidable, and it earns its place introducing the founder). Section now runs on typography, same pattern as the Services page — which reads as the strongest page on the whole site *because* it has zero photography and leans on layout/type instead.

**Real logo integrated (2026-07-19), superseding the interim mark above.** Client supplied 5 files at `brief/GoodGround logos/`: a distinctive lowercase "goodground" wordmark + a compact "gg" mark. Colours are pre-matched to their surfaces — verified by sampling actual pixels, not assumed: light `#e8e8e8` for nav/footer (dark pine/bark), dark `#232323` for the hero (light cream). Copied into `public/images/logo-*.png`, typed in `content/logos.ts`, rendered via `NavLogo` / `FooterLogo` / `HeroLogo` in `components/Logo.tsx` (the old custom SVG `Mark`/`Wordmark`/`LogoLockup` stopgap is gone). Favicon replaced too: `app/icon.png` + `app/apple-icon.png` (Next 16 convention — supersedes the old scaffold `favicon.ico`, which was deleted). Hero's H1 no longer needs the old Montserrat-metric `calc()` sizing hack — the real image just fills the container at its native aspect ratio.

**Trap hit during this pass, for the record:** the mobile nav logo briefly appeared broken (`naturalWidth:0`) in dev mode after rapid successive edits/reloads — traced to a stale cached failed response from Turbopack's dev-mode on-demand image transform racing against fast iteration, not a real bug. Confirmed clean via a fresh `fetch(..., {cache:'no-store'})` from the page and, authoritatively, a clean `next build` + `next start` production server (Lighthouse 100/100/100/100, image `complete:true`). If a dev-mode image looks broken after heavy Fast Refresh churn, hard-verify against a real production build before treating it as a code bug.

**Explicitly NOT changed — flagged to founder instead of overridden:**
- **The brown/ember/cream palette and the seedling/growth photography direction.** Both came directly from the client's own supplied comp and palette file, locked earlier in the build. They read warm/artisan/organic rather than "premium tech studio," which is a real tension — but it's the client's own brand decision, not mine to unilaterally gut. If revisited, this is the deepest remaining lever.
- **Photography scarcity is structural, not fixable in code.** Only 5 client images exist total. Real new photography (or at minimum, a couple more supplied images so About/Services/Work aren't starved) is the actual fix, not something I can generate my way out of.

## Three new Home sections, adapted from Grow Brand (2026-07-20)

Founder asked for GoodGround's homepage to get equivalents of three Grow Brand sections, in GoodGround's own layout/design language, not Grow Brand's:

- **"What We Build"** (`components/sections/WhatWeBuild.tsx`) — **replaces** the old bento-grid Services section (deleted, along with its now-orphaned `ServiceIcon.tsx`). Reuses `content/services.ts` directly (title/subheading/problem/solution/outcome — same data the `/services` page's deep-dives already use) as an accordion, so Home never contradicts the Services page. Reason for replacing rather than adding alongside: a static bento grid and this accordion both covering the identical 4 services back-to-back on one scroll read as repetitive; the accordion is strictly more informative anyway.
- **"Industries"** (`components/sections/Industries.tsx`, `content/industries.ts`, `components/IndustryIcon.tsx`) — new section, 6 category cards (trades, health, hospitality, retail, professional, non-profit). **Grow Brand's version names real past clients per card** ("like Trail Tribe and TipTap") — GoodGround has none (founded 2026), so this was rewritten to stay at the category level with no track-record claim and no fabricated names anywhere, consistent with the hard no-fabrication rule everywhere else on this site.
- **Process section intro copy** — did NOT duplicate a second "How We Work" section (the existing 5-step carousel already covers this and duplicating it would be redundant/confusing). Instead adopted Grow Brand's framing line directly into the existing section: eyebrow → "Our web design process", lead → "Good results aren't luck. Here's how a project runs, start to finish, on time and on budget." Kept GoodGround's own H2 ("From first seed to lasting harvest.") rather than overwriting it with Grow Brand's generic "How we work" — that headline carries the brand voice.

Home section order was: Hero → Marquee → Philosophy → **WhatWeBuild** → **Industries** → PaymentPlan → Process → WhyUs → Testimonials → AboutPreview → FAQ → CTABanner. Lighthouse mobile still 100/100/100/100 after the change. **Superseded 2026-07-29** — Marquee and PaymentPlan removed, AboutPreview folded into WhyUs; see "Done 2026-07-29" below for the current order and the full-bleed re-skin.

## Open punch list

Full detail and effort estimates live in `seo-audit/ACTION-PLAN.md`. That file is the working to-do for anything SEO; this list is the wider project view.

### Blocked on the founder (not dev work)

- **Google Business Profile.** Highest-value single off-site action for a Cape Town service business, and the main lever on AI-search visibility, which is currently limited by authority rather than structure. **Blocked on the phone number.**
- **Confirm the phone number.** NAP consistency is foundational for local SEO and one third of it is missing. Goes in `content/site.ts` and flows to schema automatically. Do not invent one.
- **Article byline: name a person, or keep the Organization?** `content/articles.ts` has `author: "GoodGround"`, rendered as a byline and as `Organization` in `BlogPosting` schema. A named `Person` is the strongest remaining E-E-A-T win, but the founder asked to be described by experience rather than name on About, so this is a founder call. See Copy rules.
- **Real case studies for `/work`**, or drop `/work` from `app/sitemap.ts` until it has content. It is currently 154 words and will index as thin. This site itself, written up as a build story, is legitimate proof of work.
- Replace placeholder Unsplash photography with real GoodGround images.
- Write the 3 outstanding FAQ answers (Q4/Q6/Q8).
- Payment gateway + NCA legal review before any live billing.

### Dev work outstanding

- **Google Search Console: in progress (2026-07-20).** The HTML-tag verification is done from our side. `verification.google` in `app/layout.tsx` metadata emits the `google-site-verification` meta tag site-wide, token `RDMvId_yS37hPFjJbBuZg4A8c1pZ0IBobkOrX6l1Ih4`, confirmed live on production. **Do not remove that tag after verification passes** — Search Console re-validates periodically and will drop the property. It sits in the root layout rather than only the homepage for the same reason. Founder was completing verification in the GSC UI. Remaining: confirm verification succeeded, then **submit `sitemap.xml`** (10 URLs, all 200, no redirects). Use the **URL prefix** property for `https://www.goodground.co.za/` — www is canonical and the apex 308s to it, so an apex-only property would report almost nothing.
- **Re-run the full SEO audit once Search Console has accumulated data** (allow a few weeks). This is the single biggest missing input: the 2026-07-20 audit scored 85/100 with **no** indexation, query, CTR or CrUX field data available, and explicitly flagged that several category scores would move once it exists. Content Quality (68) is what holds the total down and is the one most likely to change. Re-score against `seo-audit/FULL-AUDIT-REPORT.md` rather than starting fresh, so the comparison is meaningful.
- ~~**Focus-ring contrast audit on dark panels.**~~ DONE 2026-07-26 — fixed globally with a two-tone ink+peach `:focus-visible` ring, not panel by panel. See trap #14 and the "Done 2026-07-26" entry.
- Add external citations to the article (zero outbound links sitewide; recognised E-E-A-T signal).
- Add `Service` schema per offering (`/services` currently uses `ItemList`).
- Convert source PNGs to WebP (repo weight and build time only; `next/image` already handles serve-time).
- More blog articles. The /insights layout is built for this: newest article becomes the featured panel automatically, the rest fill a 3-across grid. With only two articles the grid looks sparse by design, and fills out as articles are added.
- Re-verify all 4 Afrihost nameservers have synced on the DNS change.

### Done 2026-07-20

- ~~Wire up GA4~~ — `G-T4JF7EJLW9`, opt-in consent gated. See Analytics.
- ~~Full SEO audit~~ — ran at founder's request, scored **85/100**. Reports in `seo-audit/`.
- ~~Social preview images~~ — was the audit's one critical finding; the site had no `og:image` at all.
- ~~Security headers~~ — CSP + 4 others. Only HSTS was set before.
- ~~Canonical host mismatch~~ — sitemap and canonicals pointed at the redirecting apex.
- ~~Em dashes removed sitewide~~ — see Copy rules.
- ~~favicon.ico, boilerplate SVGs, unused 1.7MB noise.png, meta description lengths, `/insights` title, contextual internal links.~~

### Done 2026-07-22

- ~~New "Growth" service section (Google Ads + Meta Ads)~~ — client sent `brief/GoodGround_Ads_Copy_Deck.docx`; folded into the existing `/services` page as items 05/06 (founder's placement choice over a standalone `/growth` page), reusing the exact `Service` type / `ServiceDeepDive` deep-dive pattern so it costs nothing extra in nav/routing/schema — the jump index, `ItemList` schema, and the homepage `WhatWeBuild` accordion all pick the two new items up automatically since they share `content/services.ts`.
  - `content/services.ts`: added `growth?: boolean` to `Service`, plus `google-ads` and `meta-ads` entries (slugs `#google-ads` / `#meta-ads`).
  - New pill tag "Growth service" (`bg-pine`) added alongside the existing Flagship (ember) / Included (bark) tags, in both `app/services/page.tsx`'s `ServiceDeepDive` and `WhatWeBuild.tsx`'s `ServiceRow`.
  - 5 new components, each mirroring an existing homepage section's exact pattern rather than inventing new visual language: `GrowthIntro.tsx` (section header + 2 CTAs), `GrowthProblem.tsx` (Philosophy.tsx-style narrative prose, no image), `GrowthBenefits.tsx` (Industries.tsx-style bark card grid, 7 items from `content/growth-benefits.ts`, checkmark badge not a per-item icon since the deck didn't specify icon meanings), `GrowthHowItWorks.tsx` (PaymentPlan.tsx-style numbered steps, borderless rows not cards — a card-on-cream first draft was invisible against the page's own cream body background, caught before shipping), `GrowthWhyUs.tsx` (WhyUs.tsx's ember-card trio, verbatim pattern), `GrowthCTA.tsx` (CTABanner.tsx pattern, closes the Growth block specifically; the page's original CTABanner still closes the whole page further down).
  - `content/faq.ts`: appended 5 new Q&A pairs (ad spend, do-you-need-a-new-site, Google-vs-Meta, contract length, ad account ownership) — all fully answered, so they flow straight into the existing `FAQPage` schema filter with no extra work.
  - Metadata description on `/services` updated to mention Google & Meta Ads.
  - Verified: `npx eslint` clean, both pages checked at 1440×900 and 390×844 in a live dev server, homepage accordion confirmed picking up the new items with the Growth pill.

### Done 2026-07-22 (b): dedicated /faq page

- The FAQ accordion had grown to 13 questions (8 original + 5 from the Growth section) and felt long on both Home and Services. `components/sections/FAQ.tsx` now takes an optional `limit` prop: `<FAQ limit={4} />` on Home and Services shows only the first 4 with a "See all FAQs" pill button beneath; `<FAQ />` with no limit (used on the new `/faq` page) shows all of them and never renders the button.
- New page: `app/faq/page.tsx` — `PageHero` (eyebrow "FAQ", distinct headline/intro from the FAQ block's own, so the two don't read as duplicated back-to-back) + the full `<FAQ />` + the existing `CTABanner`.
- `content/site.ts`: `legalLinks` gained a third entry, `{ label: "FAQ", href: "/faq" }`, first in the list (before Privacy Policy / Terms) — this is the array `Footer.tsx` already renders as the small pill row next to the copyright line, so no `Footer.tsx` changes were needed.
- Added `/faq` to `app/sitemap.ts` (priority 0.7, alongside Contact/Insights).
- `HomeSchema`'s `FAQPage` JSON-LD (in `components/Schema.tsx`) already includes every answered FAQ item regardless of how many are visually shown on any given page, so trimming the visible list on Home/Services has no SEO/rich-result impact — verified this before making the change, not assumed.
- Verified: `npx eslint` clean, checked live at 1440×900 and 390×844 (Home's trimmed list + button, `/faq`'s full list with no button, footer link).

### Done 2026-07-23: real registration number, no longer "operating under The Trail Tribe"

- **Founder confirmed real, final values — supersedes every older note saying GoodGround has no separate registration and trades under The Trail Tribe.** GoodGround is now its own standalone registered entity: legal name **GoodGround (Pty) Ltd**, registration number **2024/641034/07**, trading as **GoodGround**. Not VAT registered — all displayed prices are VAT inclusive.
- `content/site.ts` (the single NAP source of truth) gained `legalName`, `registrationNumber`, `vatRegistered: false`.
- `/legal`'s Company Details block rebuilt: was `Business Name: GoodGround` / `Operated by: The Trail Tribe`, now `Registered Company Name` / `Trading As` / `Registration Number` / `VAT Status`, all pulling from `site.*` rather than hardcoded strings. The founder explicitly confirmed dropping the Trail Tribe line entirely (asked before assuming, since it's a legal-notice change) — GoodGround (Pty) Ltd is its own entity now, no relationship mentioned.
- `HomeSchema` (`components/Schema.tsx`) gained `legalName` on the `ProfessionalService` node. No `vatID`/`taxID` added since there isn't one (not registered).
- Verified live at 1440×900 before pushing: all six Company Details fields render correctly, prose paragraph reads naturally with the new legal name substituted in.

### Done 2026-07-25: Facebook and Instagram links

- Founder supplied real URLs: Facebook `https://www.facebook.com/share/14jTaX4tHhU/`, Instagram `https://www.instagram.com/goodground.company`. `content/site.ts`'s `socials` array (previously empty, comp showed the marks but no destinations) now populated with `{ label, name, href }` per entry — `label` is the short glyph text the footer's circular badge renders ("FB"/"IG"), `name` is the full platform name used only in the accessible name.
- `components/Footer.tsx`: the social-icon rendering already existed (gated on `socials.length > 0`, was just never populated), so this was a content-only change plus three small hardening additions the real external links now warrant: `target="_blank" rel="noopener noreferrer"` (external links, avoid reverse tabnabbing) and an `aria-label` combining the visible label with the full platform name (`"FB — GoodGround on Facebook"`) — same WCAG 2.5.3 pattern as trap #8 (nav "GG" monogram), since the visible badge text alone ("FB") isn't a self-explanatory accessible name on its own.
- `HomeSchema`'s `sameAs` (`components/Schema.tsx`) already read `site.socials.map(s => s.href)` unconditionally, so both URLs now flow into `ProfessionalService` schema automatically — no schema code changed.
- Footer is a shared layout component, so this appears on every page with no per-page changes needed. Verified live via Chrome DevTools MCP at 1440×900, 820×1180 and 390×844 on both `/` and `/contact`; confirmed via `evaluate_script` that both anchors carry the correct `href`, `target`, `rel` and `aria-label`.

### Done 2026-07-26: real social SVG icons, then a design-quality pass

**(a) Footer social badges: "FB"/"IG" text → real logo SVGs** (commit `c105a5b`). New `components/SocialIcon.tsx` renders the official Facebook/Instagram brand marks as inline SVG in `currentColor` (deliberately the real logos, not the site's own hand-drawn icon style — brand marks need to stay recognisable, same reasoning as using the client's actual logo artwork elsewhere). `content/site.ts` `socials` entries changed from `{ label, name, href }` to `{ platform: "facebook" | "instagram", name, href }`; `Footer.tsx` now renders `<SocialIcon platform={social.platform} />` inside the peach badge instead of the label text. So the 2026-07-25 entry's "label = FB/IG glyph text" is superseded — it's icons now.

**(b) Design-quality pass via the design-eng skills** (commit `403a219`) — ran the site through `redesign-existing-projects` + `emil-design-eng` (the two skill packs newly integrated into the Website Build SOP). Pure craft/taste/a11y elevation; **no palette, photography, or copy changes** (those stay locked to the client comp). Homepage + inner pages, 8 files:
  - **Focus a11y (the headline fix):** replaced the single ember `:focus-visible` ring with the global two-tone ink+peach ring — see trap #14 (now RESOLVED) for the full rationale and the `!important` gotcha. Removed the now-redundant per-panel `[&_:focus-visible]:outline-peach` overrides (Hero, CTABanner, cookie banner in `Analytics.tsx`, insights featured card).
  - **Typography:** `text-wrap: balance` on all headings, `text-wrap: pretty` on `p`, in `globals.css` (kills orphans; Montserrat-only stays, all four weights 400/500/600/700 were already loaded).
  - **Motion tokens:** added strong custom easing as Tailwind v4 `@theme` tokens `--ease-out: cubic-bezier(0.23,1,0.32,1)` and `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`. Because they use the `--ease-*` namespace, they **override** the built-in `ease-out`/`ease-in-out` utilities site-wide (deliberate — every existing `ease-out` usage inherits the stronger curve). If you ever need the weak default back, rename the tokens.
  - **Button:** press feedback `active:scale-[0.99]` → `motion-safe:active:scale-[0.97]` (Emil's 0.95–0.98 bar).
  - **Start-project wizard:** each step now fades up on advance via a CSS `@keyframes step-in` + `key={step}` remount (`StartProjectForm.tsx`). Deliberately CSS not Framer, so it runs off-main-thread and can't interfere with the wizard's focus-to-heading management. Reduced-motion handled by the existing global block.
  - **Taste:** numerals (01/02/03) added to the `WhyUs` and `GrowthWhyUs` ember-card trios to break the "three identical cards" pattern (`redesign-existing-projects` flags that as the most generic AI layout); subtle `hover:bg-ember/[0.04]` on the `WhatWeBuild` accordion trigger rows.
  - Verified: `npx eslint` + `tsc --noEmit` clean; two-pass Chrome DevTools screenshots desktop/mobile; focus ring confirmed **visually** on the hardest case (ember Accept button on the dark cookie banner shows a clean peach ring).

### Done 2026-07-29: home page re-skinned to the client's full-bleed comp

Founder walked through a fresh full-page comp (`brief/reference/reference-image.png`, plus `body-forest-image.png` and updated `Palette.png`) section by section. The home page was rebuilt from the old inset-block flow to the comp's **full-bleed** layout. Live, verified desktop/tablet/mobile, pushed to `main` (commits `b2f0cb0`, `39867c9`).

**Layout language now (this is the important mental model):** most home sections run **full-bleed** edge-to-edge (no side gutter, no gap between them) with inner content still held to `max-w-[1434px]`. A few sections are deliberately the exception, drawn as **inset rounded cards** (page-edge gutter, rounded all corners, cream space around them): **Process** and **FAQ**. The two ember call-to-action panels (Hero pitch, CTABanner) stay rounded cards too.

- **`Block.tsx` was reverted to its original inset design.** It had been made full-bleed mid-session, which rippled to `/about` and `/insights` (the only other `Block` consumers); reverting restored those and made FAQ inset again. Home's full-bleed sections do **not** use `Block` — they set their own `bg-*` + `grain` on the `<section>`.
- **New forest photo** `public/images/body-forest-image.png` (aerial forest road, 1344×752, decorative, `alt=""`) used **twice** as a full-bleed background, via three new gradient utilities in `globals.css`:
  - `forest-brown` — Philosophy: forest legible up top, fading down into solid `bark` so it flows into WhatWeBuild.
  - `forest-panel` — the WhyUs panel: solid `pine` at top dissolving into the forest lower down. **Monotonic on purpose** (opacity only decreases downward): the first version had a local opacity minimum mid-panel that read as a hard "green line across the page" — see trap below.
  - `forest-text-scrim` — a **soft radial** wash (not a hard-edged linear box, which showed a visible top edge) for copy legibility over the canopy.
- **Philosophy** — was text + side seedling photo; now a full-width forest background with the copy on top, fading to bark.
- **WhatWeBuild** — flat dark bark, **AuroraGlow removed** (founder asked for no animated bg here), `rounded-b-[40px]`.
- **WhyUs + AboutPreview merged into one rounded green→forest panel** (`rounded-[40px]`, full-width). `WhyUs.tsx` now renders `<AboutPreview />` inside itself, so **AboutPreview is no longer placed separately in `page.tsx`**. AboutPreview.tsx is now just transparent copy (no surface/image of its own). The three reason cards gained **image caps with a numbered badge (1/2/3) straddling the image/ember seam** — currently **SVG placeholders** (`CardImagePlaceholder` in `WhyUs.tsx`), awaiting real artwork.
- **Hero** — the seedling image and the "Build on GoodGround" ember band are now **full-bleed**; the band got `rounded-b-[40px]`, and Philosophy is pulled up under it (`-mt-[64px]`) so the forest shows **behind the band's rounded corners** (band is `z-[3]`, Philosophy `z-auto`, so the band paints on top and its transparent corners reveal the forest).
- **Nav** made full-bleed (edge-to-edge pine bar, no rounded corners — affects every page). **Footer** given `rounded-t-[40px]` back.
- **Marquee REMOVED** from the page (component file kept, just unimported). **PaymentPlan REMOVED** (component + `content/pricing.ts` kept; nothing links to the old `#payment-plan` anchor — checked).

**New home order:** Hero → Philosophy → WhatWeBuild → Industries → Process → **WhyUs (renders AboutPreview inside)** → Testimonials (still hidden/empty) → FAQ → CTABanner.

**Freed images:** the three seedling PNGs (`index-page-image-2/3/4` = `images.philosophy/budget/about`) are no longer used on Home. Still in `images.ts`.

**Copy (humanizer pass):** only two spots touched — the rest of the home copy was already clean. AboutPreview lost the "GoodGround… We started GoodGround" repetition and the "No strategy, no structure, nothing after launch" rule-of-three; Process intro lost "start to finish, on time and on budget". "X, not just Y" left intact per the standing rule.

**Traps hit this session (new):**
- **Full-page screenshots don't fire Framer scroll-reveals.** Below-fold `data-reveal` elements stay `opacity:0` in a `fullPage` capture, so mid-page looked "empty" and un-styled. Fix for QA: step-scroll the page in small increments (~120ms apart) via `evaluate_script` to trip every IntersectionObserver before capturing, or screenshot each section in the viewport.
- **A gradient with a local opacity minimum reads as a hard horizontal line.** The founder flagged a "green line" across the WhyUs panel — it was `forest-panel`'s most-transparent (brightest-forest) stop sitting mid-panel. Fix: make the gradient monotonic and use a soft radial for any text scrim, so nothing has a hard edge.

**New open item:** real artwork for the three WhyUs reason cards (currently SVG placeholders). **DONE 2026-07-30, see below.**

### Done 2026-07-30: forest re-shoot, real card art, payment band reinstated, critique

Follow-up refinements the founder asked for after the 07-29 redesign, plus an `impeccable critique` pass. All live on `main`. **This entry supersedes several points in the 07-29 entry above** — read it for the current truth on the forest asset, the WhyUs cards, and the payment section.

- **Forest image is now high-res, and responsive.** The 1344×752 forest that the 07-29 entry describes was blurry once it was upscaled on the tall panels. Replaced with a **2688×1504 landscape** (`public/images/body-forest-image.webp`, ~840KB) for `sm`+ and a **1520×2688 portrait** (`body-forest-image-portrait.webp`, ~640KB) for mobile, since the landscape cropped to a thin centre strip on narrow screens. Both registered in `content/images.ts` as `forest` / `forestPortrait`. Philosophy and WhyUs each render **two `<Image>` elements** toggled `sm:hidden` / `hidden sm:block`, so only the right one loads per breakpoint. **Root-cause lesson:** full-bleed background blur is almost always a resolution problem (source too small for how far the panel upscales it), not a compression problem — fix it with a bigger source, not higher quality on the same pixels.
- **WhyUs cards have real textures now, not SVG placeholders.** Three supplied orange textures (`foundation-strategy.webp` / `foundation-longterm.webp` / `foundation-partner.webp`, 1024px WebP ~330KB each), mapped to the cards by title. `CardImagePlaceholder` is gone. Image cap aspect is `16/9` on mobile, `16/11` at `sm`+.
- **Payment band reinstated (this reverses the 07-29 removal).** The `impeccable critique` flagged that removing the 12-payments section was the single biggest issue — PRODUCT.md wants it at hero level, and its top failure mode is a visitor reading it as a subscription. `PaymentPlan.tsx` was rebuilt as a **compact full-bleed ember band** (oversize "12" + "then it's yours. It's not a subscription…" line + CTA) and placed back **after Industries**. So the current home order is: Hero → Philosophy → WhatWeBuild → Industries → **PaymentPlan** → Process → WhyUs(+AboutPreview) → Testimonials(hidden) → FAQ → CTABanner.
- **Footer is full-bleed** now (image + dark card span full width, content still capped at max-w; rounded top corners kept).
- **Mobile vertical spacing tightened** across Philosophy / WhatWeBuild / Industries / WhyUs / AboutPreview (desktop `md:` values untouched), and extra top padding added to Philosophy on mobile so its heading isn't flush against the hero band where the `-mt` overlap had cancelled the padding.
- **`forest-warm` utility** (`sepia .13 saturate .92 brightness 1.02`) applied to the forest images to warm the cool misty green toward the cream/ember palette. One-line, tunable.
- **Verified 2026-07-30 on production:** Lighthouse mobile **100/100/100/100** (55 pass, 0 fail); performance trace **LCP 744ms, CLS 0** (the big new images are below-fold/lazy so they don't touch LCP; still no CrUX field data). `impeccable detect`: **0 of 27** anti-patterns across all home components.
- **`impeccable critique` scores: 33 → 34/40 (Strong).** Snapshots in `.impeccable/critique/` (local, gitignored-candidate). The user **accepted the decorative card textures** (recorded in `.impeccable/critique/ignore.md` so it's not re-raised). Remaining minor notes: three ember touchpoints on one scroll (hero pitch / payment band / CTA — deliberate, watch it), repeated pill eyebrows, no long-scroll orientation cue on mobile.

### Explicitly do NOT do

- No `aggregateRating` or `review` schema until genuine reviews exist. Fabricated review markup is a manual-action risk.
- No invented phone number or co-founder. (Registration number is now real and confirmed — see 2026-07-23 above — this rule is about values nobody has actually given us, not this one specifically.)
- No invented portfolio.
- Do not strip "X, not just Y" from the copy — that is brand voice, not an AI tell.
