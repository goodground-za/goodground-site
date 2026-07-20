# GoodGround — SEO Action Plan

Derived from `FULL-AUDIT-REPORT.md`, 2026-07-20. Health score at audit: **85/100**.

Ordered by value per unit of effort. Effort estimates assume someone already
familiar with the codebase.

> **Status update, 2026-07-20 (same day).** Items 1, 5, 8, 9, 10, 11 are done and
> live, plus item 7 and the `noise.png` half of item 14. Verified on production.
> Commits `e52c070` and `715d2db`. What remains is mostly founder decisions, not
> dev work. Re-score once Search Console has data.

---

## Critical — do before pushing for traffic

### 1. ~~Add social preview (OG) images~~ — DONE
**Shipped 2026-07-20 · commit `e52c070`**

Shared `ImageResponse` card at `app/_og/card.tsx`, used by home, services,
about, contact, insights and per-article routes. `twitter:card` set to
`summary_large_image`. Montserrat ships as a repo asset so the build has no
network dependency.

Two things worth knowing for future edits: the card uses `logo-footer.png`
because `logo-hero.png` is the dark wordmark and vanishes on bark; and Satori
cannot parse WOFF2, so the font must stay TTF.

Verified live: `https://www.goodground.co.za/opengraph-image` returns a 1200×630
PNG. **Still worth checking in the LinkedIn Post Inspector** — their cache is
sticky.


---

## High — within a week

### 2. Decide whether to name a person as the article author
**Effort: 30 minutes once decided · Impact: medium–high · Owner: founder**

**Correction to the original audit:** the report said the article had no author.
It does. `content/articles.ts` sets `author: "GoodGround"`, which renders as a
byline and appears in `BlogPosting` schema as an `Organization`. The real gap is
`Organization` → `Person`, which is smaller than first stated.

A named person is still the stronger E-E-A-T signal, since "Experience" is the
first E and a founder writing about SA businesses is exactly that. But the About
page deliberately describes the founder by experience rather than by name, at his
own request, so **naming him contradicts a standing instruction and is a founder
decision, not a dev fix.**

If the answer is yes:
- Set `author` to the person's name in `content/articles.ts`
- Change the schema `author` to `{"@type": "Person", ...}` with a `url` to `/about`
- Add a 2–3 sentence bio under the byline

### 3. Decide what to do with `/work`
**Effort: varies · Impact: medium–high · Owner: founder**

154 words, currently indexed as a near-empty page.

- **Best:** publish one real case study. This site itself, written up as a build
  story, is legitimate and available now.
- **Interim:** remove `/work` from `app/sitemap.ts` until it has content. The page
  stays reachable for humans; you just stop asking Google to index it. The sitemap
  file's own comment already states this principle.

### 4. Create the Google Business Profile
**Effort: 1 hour + verification wait · Impact: high for local · Owner: founder**

Already on the punch list. Highest-value single off-site action for a Cape Town
service business, and the main lever on AI-search visibility, which is currently
limited by authority rather than structure.

**Blocked on:** the phone number (item 6).

---

## Medium — within a month

### 5. ~~Add security headers~~ — DONE
**Shipped 2026-07-20 · commit `e52c070`**

Added CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and
`Permissions-Policy` via `headers()` in `next.config.ts`.

The CSP allows `'unsafe-inline'` for scripts deliberately. The strict
alternative is a per-request nonce, which forces dynamic rendering and would
give up static generation and the 490ms LCP. This site renders no user-submitted
content, so the widened XSS surface is close to nil.

Verified after shipping: GA still fires after consent, and no CSP violations
appear in the console. **If you edit the CSP, keep `googletagmanager.com` in
`script-src` and `connect-src` or analytics breaks silently.**

### 6. Confirm and publish the phone number
**Effort: 5 minutes once decided · Impact: medium · Owner: founder**

NAP consistency is foundational for local SEO and one third of it is missing.
Add to `content/site.ts` → flows to schema and the contact page automatically.
Also unblocks the Google Business Profile.

### 7. ~~Add contextual internal links~~ — DONE
**Shipped 2026-07-20 · commit `e52c070`**

`/services` now links to the article, and the article links back to `/services`.
The article previously had exactly one inbound link, from the `/insights`
listing.

### 8. ~~Trim five long meta descriptions~~ — DONE
**Shipped 2026-07-20 · commit `e52c070`**

Rewritten to 138–146 characters each so the call to action lands inside the
visible window.

### 9. ~~Shorten the `/insights` title~~ — DONE
**Shipped 2026-07-20. Now "Website Advice for South African Businesses".**


---

## Low — backlog

### 10. ~~Add a real `favicon.ico`~~ — DONE 2026-07-20

Generated from `app/icon.png`. Browsers were already fine via the declared
`icon.png`; this covers crawlers and link-preview services that request the root
path by convention.

### 11. ~~Delete leftover Next.js boilerplate from `public/`~~ — DONE 2026-07-20

Removed `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`, and
**the unused 1.7MB `noise.png`**, which was still being served despite having
been replaced by an inline SVG grain long ago. All now 404.

### 12. Add external citations to the article
**Effort: 30 minutes.** Zero outbound links site-wide. Citing POPIA legislation,
SA mobile-usage research, or Google documentation is a recognised E-E-A-T signal
and helps AI engines verify claims.

### 13. Add `Service` schema per offering
**Effort: 45 minutes.** `/services` uses `ItemList`; individual `Service` entities
linked to the organisation would describe the four offerings more precisely.

### 14. Convert source images to WebP
**Effort: 20 minutes.** Sources are PNGs up to 916 KB. `next/image` already
handles serve-time optimisation so users are unaffected — this is repo weight and
build time only.

---

## Explicitly do NOT do

- **Do not add `aggregateRating` or `review` schema** until genuine reviews exist.
  Fabricated review markup is a manual-action risk.
- **Do not invent a portfolio for `/work`.** The current honest placeholder is the
  right call and should stay until real work exists.
- **Do not invent the company registration number** — still "to be confirmed".
- **Do not add a phone number until it is real.**

---

## Deliberately not measured

Re-run this audit once these are available — several scores will move:

- **Google Search Console** — indexation status, real query and CTR data. Set this
  up now that the sitemap is clean; it is the single biggest missing data source.
- **CrUX field data** — real-user Core Web Vitals. Needs traffic to accumulate.
- **GA4** — configured today (`G-T4JF7EJLW9`), no data yet.
- **Rank / keyword data** — no DataForSEO, Moz or Bing credentials configured.
- **Backlink profile** — Common Crawl only, zero cached domains.

---

## Queued for later

### 15. Finish Google Search Console setup
**Effort: 10 minutes · Owner: founder · Started 2026-07-20**

Verification tag is shipped and live (`verification.google` in
`app/layout.tsx`, token `RDMvId_yS37hPFjJbBuZg4A8c1pZ0IBobkOrX6l1Ih4`). It is
emitted site-wide, not just on the homepage, because Search Console
re-validates periodically. **Do not remove it once verified.**

Left to do:
- Confirm verification passed
- Submit `sitemap.xml` (10 URLs, all 200, no redirects)
- Use the **URL prefix** property for `https://www.goodground.co.za/`. The apex
  308-redirects to www, so an apex property would report almost nothing.

### 16. Re-run this audit once Search Console has data
**Effort: 1 hour · Owner: dev · Wait a few weeks after item 15**

The 2026-07-20 audit scored **85/100** with no indexation, query, CTR or CrUX
field data available. Everything in "Deliberately not measured" below was
genuinely unmeasured, not passing.

When re-running, compare against `FULL-AUDIT-REPORT.md` rather than starting
fresh, so the movement is visible. Expect the biggest changes in:
- **Performance** — currently lab-only from one machine; CrUX gives real South
  African mobile numbers, which may be materially worse.
- **Content Quality (68)** — the score holding the total down. Indexation data
  will show whether the thin pages (`/work` especially) are actually being
  indexed as suspected.
- **AI Search Readiness** — brand-mention signals should improve once the
  Google Business Profile exists.

---

## What's actually left

Everything a developer could do without a business decision is done. The
remaining high-value items are all yours to answer:

| # | Item | Blocked on |
|---|---|---|
| 2 | Name a person as article author? | Contradicts the "describe me by experience, not name" instruction |
| 3 | Case study for `/work`, or drop it from the sitemap? | Having work to show |
| 4 | Google Business Profile | The phone number (6) |
| 6 | Confirm the phone number | Business decision |

**Google Search Console (item 15) is part-done** as of 2026-07-20: the
verification tag is shipped and live, founder was finishing verification in the
GSC UI. Once that passes and the sitemap is submitted, item 16 (re-run this
audit) unlocks after a few weeks of data.

Content Quality (68) is what is holding the
overall 85 down, and most of that lifts as soon as there is proof of work and a
named author.
