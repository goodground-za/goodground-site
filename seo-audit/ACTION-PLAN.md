# GoodGround — SEO Action Plan

Derived from `FULL-AUDIT-REPORT.md`, 2026-07-20. Health score at audit: **85/100**.

Ordered by value per unit of effort. Effort estimates assume someone already
familiar with the codebase.

---

## Critical — do before pushing for traffic

### 1. Add social preview (OG) images
**Effort: 1–2 hours · Impact: high · Owner: dev**

No `og:image` exists on any page, so every share on WhatsApp, LinkedIn or
Facebook renders as a bare text link. For a web design studio this actively
undercuts credibility.

- Add `app/opengraph-image.tsx` using Next's `ImageResponse` (1200×630), or a
  static `app/opengraph-image.png`
- Give `/services`, `/about` and each article their own via route-level files
- Change `twitter:card` from `summary` to `summary_large_image`
- Verify with the LinkedIn Post Inspector and WhatsApp before calling it done

Blocked on nothing. Brand assets already exist.

---

## High — within a week

### 2. Add a named author to the blog article
**Effort: 30 minutes · Impact: high · Owner: dev + founder decision**

The site's one substantial content asset is anonymous. "Experience" is the first
E in E-E-A-T and this is the cheapest credibility signal available.

- Add a byline (Johandre Saayman) with a 2–3 sentence bio
- Add `author` as a `Person` to the `BlogPosting` schema
- Link the byline to `/about`

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

### 5. Add security headers
**Effort: 30 minutes · Impact: medium (trust, not ranking) · Owner: dev**

Only HSTS is set. Add via `headers()` in `next.config.ts`:
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, and a `Content-Security-Policy`.

**Caution:** CSP must allow `googletagmanager.com` and the GA inline init script
(or use a nonce), or analytics silently breaks. Test consent → GA fires after
shipping.

A studio that gets asked "do you follow security best practice?" wants its own
site to answer yes.

### 6. Confirm and publish the phone number
**Effort: 5 minutes once decided · Impact: medium · Owner: founder**

NAP consistency is foundational for local SEO and one third of it is missing.
Add to `content/site.ts` → flows to schema and the contact page automatically.
Also unblocks the Google Business Profile.

### 7. Add contextual internal links
**Effort: 1 hour · Impact: medium · Owner: dev**

All internal linking is currently navigation and footer only — every page has
exactly 9 inbound links and the article has 1.

- Link `/services` → the article on why SA businesses need a website
- Link the article → `/services` and `/start-project` in-body
- Link `/about` → the article

### 8. Trim five long meta descriptions
**Effort: 20 minutes · Impact: low–medium (CTR) · Owner: dev**

Over ~160 chars and truncating mid-sentence: `/contact` (181), `/` (179), the
article (179), `/about` (163), `/services` (160). Rewrite so the call to action
lands inside the visible window.

### 9. Shorten the `/insights` title
**Effort: 5 minutes · Impact: low · Owner: dev**

76 characters, will truncate, uses two separators. Suggested:
"Insights | Website Advice for South African Businesses".

---

## Low — backlog

### 10. Add a real `favicon.ico`
**Effort: 10 minutes.** `/favicon.ico` 404s. Browsers are fine via the declared
`icon.png`, but some crawlers and link-preview services request the root path by
convention.

### 11. Delete leftover Next.js boilerplate from `public/`
**Effort: 2 minutes.** `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`,
`window.svg` are create-next-app defaults still publicly served on a client-facing
studio domain.

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

## Sequencing suggestion

**This week:** items 1, 2, 3 (dev) and 4, 6 (founder).
**This month:** items 5, 7, 8, 9.
**Then:** re-run the audit with Search Console connected and re-score.

The technical foundation is strong. Items 1–4 are where the actual movement is —
everything below item 5 is polish.
