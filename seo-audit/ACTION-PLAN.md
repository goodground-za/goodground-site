# GoodGround — SEO Action Plan

Derived from `FULL-AUDIT-REPORT.md`, 2026-08-17. Health score at audit: **87/100** (was 82/100 on 2026-08-16).

Ordered by severity, then value per unit of effort. Effort estimates assume someone already familiar with the codebase. No Critical items this cycle — every prior Critical either shipped or was correctly downgraded on re-verification.

---

## High — fix within 1-2 weeks

### 1. Trim the two new `/work/*` pages' oversized meta descriptions and titles
**Effort: 20 minutes · Impact: high**
`/work/point-break-surf`: description 231 chars (target ≤155-160), title 101 chars (target ≤60). `/work/goodground-site`: description 213 chars, title 83 chars. Both shipped after the last remediation pass, so they missed it entirely. Move the specific metric claims ("331ms LCP," "772ms LCP," "48 statically generated pages") into body copy where they already live, rather than the meta tags.

### 2. Add `og:image` to `/legal`
**Effort: 15 minutes · Impact: high**
Same one-line `ImageResponse` pattern already applied to 16 other pages — this one just fell through both fix lists (July's 9-page pass and this month's 16-page pass) because it was never on either list.

### 3. Fix homepage CLS (0.156) and high TBT (2,290ms)
**Effort: 2-4 hours · Impact: high (real UX + ranking-relevant CWV signal)**
Surfaced by a harder, throttled-mobile Lighthouse test that the prior audit's unthrottled trace didn't catch. Root cause: a ~2,150ms first-party JS chunk (framer-motion hero animation) delays the hero text's paint and causes a layout shift once it renders. Fix: reserve the hero text block's height before web-font swap (`font-display: optional` or preload the exact weights used), and code-split/defer the hero animation so critical text is LCP-eligible before the animation library loads.

### 4. Continue closing the `/work` page-type mismatch
**Effort: varies · Impact: high · Owner: founder for the client-project piece**
Downgraded from Critical to High after last cycle's nav rename + content expansion, but not resolved. Three sub-items, cheapest first:
- Align `/work`'s own `<title>`/`<h1>` with the "Craft" framing the nav now promises (currently still says "Our Work").
- Add the same honest in-progress line already used on the 6 industry pages, to `/work` itself, acknowledging none of the 3 current entries match any of the 6 verticals the site targets.
- Add a bottom CTA to `/work`'s index page (currently a soft dead end — all 3 links go to case studies, none to `/start-project`).
- Longer-term, founder-owned: get one real, named client project live, even discounted/pro-bono — the only fix that actually changes the 2-of-3-concept ratio a comparison-shopping visitor reacts to.

---

## Medium — within a month

### 5. Remove or replace the keyword-tag pill badges on service/industry pages
**Effort: 1-2 hours · Impact: medium**
New since last audit. All 6 `/services/[slug]` pages and (confirmed on 2, likely all 6) industry pages show a row of 4 near-exact-match keyword-variant badges under the hero paragraph — a recognizable keyword-stuffing pattern. Remove, or replace with genuine micro-copy (service area, turnaround time).

### 6. Batch-fix remaining meta description and title length drift
**Effort: 1-2 hours · Impact: medium**
Descriptions over ~155 chars: `/services/seo` (160), `/services/trades-and-home-services` (157), `/services/health-and-wellness` (158), `/start-project` (156), `/work/b3tter-bottle` (168). Titles over ~60 chars: `/services/google-ads` (68), `/services/meta-ads` (63), `/services/website-redesign` (62), `/services/non-profits-and-community` (65), plus 6 of 7 `/insights` article titles (64-75 chars).

### 7. Add `ItemList` schema to `/work`
**Effort: 20 minutes · Impact: medium**
Deferred last cycle until `/work` had 3+ entries — that threshold is now met. Suggested JSON-LD block is in `run-2026-08-17/schema.md`, Finding 1.

### 8. Fix the apex-domain redirect (2 hops → 1)
**Effort: 15-30 minutes · Impact: medium · Requires Vercel dashboard access, not code**
Confirmed still unfixed, exactly as expected — this needs a change in Vercel's Domains settings (point the bare apex's redirect target directly at `https://www.goodground.co.za/`), not a code change. Carried over a second audit cycle.

### 9. Add `City: George` to the homepage's org-level `areaServed`
**Effort: 10 minutes · Impact: low-medium**
The 6 industry-page `Service` schemas now correctly list country + city; the parent `ProfessionalService` record on the homepage still says country-only. Small internal inconsistency now that the richer pattern exists elsewhere.

### 10. Investigate `/faq`'s sitemap `lastmod` discrepancy
**Effort: 30 minutes · Impact: low**
Off by ~6 hours from what local git history shows for its tracked file — the only mismatch among 13 routes cross-checked. Likely a shallow-clone git-history edge case on the Vercel build machine. Check the build's git checkout depth setting.

### 11. List the business on Hellopeter, Yellow Pages SA / Brabys, and any George/Garden Route directory
**Effort: 2-3 hours · Impact: medium-high · Owner: founder**
Still zero third-party citations beyond Facebook/Instagram — now the single largest ceiling on both Content Quality and Local scores. Not a content-editing task.

### 12. Create a Google Business Profile
**Effort: 30-60 minutes to submit, verification timeline varies · Impact: high · Owner: founder**
Still the single highest-leverage open item in the whole audit, and still fully unblocked on the code side (real name, address, phone, email all already correct in schema and now reinforced in visible copy on 9 pages).

---

## Low — backlog

13. Add `sameAs` cross-references between the `/services` hub's `Service` entities and their detail-page counterparts (6 one-line additions, no rewrite).
14. Add an inline `Organization` reference (or a shared snippet) so `@id`-only references (`provider`, `creator`) resolve even when a page is fetched in isolation — affects `/services/*` and now the 2 new `/work/*` pages too.
15. Decide whether `/work/*` case studies should keep using raw hero photography as `og:image`, or move to the generated branded-card pattern used everywhere else — not broken, just worth a conscious choice now that 3 pages use the raw-image pattern.
16. Add IndexNow protocol — sitemap grew 2 URLs in 24 hours, strengthening the case for automating a ping-on-publish.
17. Add `Blog`/`ItemList` schema to the `/insights` listing page, mirroring the `/work` and `/services` pattern, once `/work`'s `ItemList` (item 7) ships as a reference.
18. Confirm `CreativeWork.datePublished` on the 2 new case studies is intentionally the publish date, not a placeholder.
19. Add `geo` coordinates and `openingHoursSpecification` to schema — cheap, and needed for GBP setup (item 12) regardless.
20. Add LinkedIn as a footer/social link — needs a real URL from the founder; won't fabricate one.
21. Consider one short video walkthrough of a case study for YouTube — production task, not a code task.
22. Re-run `/seo cluster` — the 08-16 content-cluster score (58/100) is now stale; the described gap (zero blog↔commercial linking) was directly fixed and verified this cycle, so a fresh pass would likely score materially higher.
23. Re-run performance audit once Chrome DevTools MCP / Google API credentials are available, to get a true before/after on the throttled-method numbers and real CrUX field data.

---

## Already closed, verified this cycle (no action needed)

For reference — these were the 2026-08-16 action items, all independently re-verified live rather than trusted from the remediation description:

- ✅ og:image extended to 16 pages (2 new gaps found separately, see items 1-2 above)
- ✅ `/services` meta description regression fixed
- ✅ `/work` page-type mismatch — reframed (see item 4 for what's still open)
- ✅ Duplicate service-description block de-duplicated across 7+ URLs
- ✅ "Industries we build for" section added to `/services`
- ✅ Contextual links between blog articles and service/industry pages added
- ✅ `llms.txt` drift fixed
- ✅ 6 service pages expanded past the 800-word floor
- ✅ One outbound citation added per article
- ✅ Duplicate `FAQPage` schema between `/` and `/faq` removed
- ✅ `CreativeWork` schema added to all case studies (not just the one flagged)
- ✅ Honest placeholder added to industry pages
- ✅ Genuine local anchor added to home/about/services/industry pages
- ✅ Sitemap `lastModified` now uses real git dates (1 minor outlier, see item 10)
- ✅ `wordCount`/`articleSection` added to `BlogPosting`
- ✅ `numberOfItems` added to `/services`'s `ItemList`
- ✅ `/legal`'s inconsistent robots meta tag removed
- ✅ Lower-friction intermediate CTA added to informational articles
- ⏸ Named human author on articles — still an open founder decision, not re-litigated (standing tension with `/about`'s "described by experience" policy)
- ⏸ Phone number visibility — confirmed still WhatsApp-only by deliberate choice, not re-flagged as a gap
