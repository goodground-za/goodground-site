# GoodGround — Full SEO Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-17
**Prior audit:** 2026-08-16, Health Score 82/100 (`run-2026-08-16/` holds that cycle's raw category reports; `run-2026-08-17/` holds this cycle's)
**Pages crawled:** 31 of 31 sitemap URLs (up from 29 — two new case studies, `/work/point-break-surf` and `/work/goodground-site`, shipped since the last audit)
**Business type:** Hybrid — real registered address (George, Western Cape) + national service language ("across South Africa")
**Trigger for this audit:** a full remediation pass against the 2026-08-16 action plan shipped in two commits (`95f2c48`, `3a79928`) between the two audit dates. This run verifies every claimed fix directly against live production rather than trusting the description, and does a fresh unbiased scan for anything new.

---

## SEO Health Score: 87 / 100 (was 82/100 — up 5)

| Category | Weight | Score | Weighted | 08-16 | Δ |
|---|---|---|---|---|---|
| Technical SEO | 22% | 89 | 19.6 | 82 | +7 |
| Content Quality | 23% | 87 | 20.0 | 79 | +8 |
| On-Page SEO | 20% | 88 | 17.6 | 74 | +14 |
| Schema / Structured Data | 10% | 93 | 9.3 | 90 | +3 |
| Performance (CWV) | 10% | 76* | 7.6 | 94* | -18* |
| AI Search Readiness | 10% | 82** | 8.2 | 80** | +2 |
| Images | 5% | 88*** | 4.4 | 88 | 0 |
| **Total** | | | **86.7 → 87** | | **+5** |

\* **Not directly comparable to 08-16.** The prior run used an unthrottled single trace (1x CPU, full network) and measured 3 pages. This run used Lighthouse's standard mobile-simulated profile (4x CPU slowdown, throttled network) across 7 pages — the closer analogue to a real South African mobile user, and a materially harder test. 76 is the average Lighthouse performance score across all 7 pages tested this run (homepage 57, `/pricing` 70, `/services` 75, `/services/seo` 75, `/services/trades-and-home-services` 80, `/work/b3tter-bottle` 85, one article 87). Read the -18 delta as "we finally used a realistic test," not "performance got worse overnight." See section 3 for the real homepage finding this method uncovered.
\** GEO/AI-readiness report's own headline is 89, but it explicitly recommends tracking the strict weighted score (82) over time rather than the adjusted headline — this table uses 82 for consistency with that guidance and with how 08-16's 80 (strict) was used here.
\*** Images was not independently re-audited this cycle either (no `seo-image-gen` pass run) — carried forward unchanged, still unverified rather than confirmed stable.

**The honest read: the remediation pass worked, and worked well — verified, not just claimed — but it surfaced one real new problem and the more realistic performance test exposed a genuine homepage issue that the easier method had been hiding.** Every one of the ten 2026-08-16 action-plan items that got worked on this cycle shipped correctly: OG images, schema de-duplication, content depth, citations, local anchors, sitemap dates. The score gain (+5) reflects that. It isn't higher because (a) two brand-new pages shipped in the same window without the on-page hygiene the remediation pass was specifically about, repeating the exact "new pages skip the checklist" pattern from last time, and (b) a harder, more realistic performance test found a genuine homepage CLS/TBT problem that the easier unthrottled trace never surfaced. Neither is a regression from anything that shipped — they're new information.

---

## 1. What changed since 2026-08-16 — the short version

- **Every claimed remediation item was independently verified live**, not trusted from the commit description. All held up: 16 missing OG images now present, `/services` meta description back under 160 chars, homepage's duplicate `FAQPage` schema removed, `CreativeWork` schema on every case study, six thin service pages now 850–925 words with genuine new content (not padding), all 6 articles carry a real outbound citation, industry pages state honestly that no live project exists yet in that vertical, local anchor lines landed on all 9 target pages, and sitemap `lastModified` now uses real per-file git dates instead of one shared build timestamp.
- **The site grew by 3 pages outside the described remediation scope**: two new case studies (`Point Break Surf Academy`, and a self-referential audit of GoodGround's own site) and `/legal` newly appearing in the sitemap tracking.
- **The `/work` page-type mismatch — last cycle's single highest-leverage finding — is now downgraded from Critical to High, not resolved.** Nav renamed "Work" → "Craft," and `/work` grew from 1 case study to 3. Genuinely better tone and depth, but the destination page still titles and H1s itself "Our Work," and 2 of 3 entries are still concept builds, not paying-client work — the underlying evidentiary gap for a comparison-shopping visitor is untouched.
- **A new, unforced pattern appeared**: visible keyword-tag "pill" badges on all 6 service pages and (likely) all 6 industry pages read as an old-school keyword-stuffing signal — small, but new since the last audit and worth a quick fix.
- **The exact "new pages skip on-page hygiene" pattern that drove last cycle's biggest finding recurred within 24 hours**, on the two brand-new `/work/*` pages (severely oversized meta descriptions/titles) and on `/legal` (missing OG image, never covered by either fix pass).
- **A harder performance test (throttled mobile, not unthrottled desktop) found the homepage has a real CLS (0.156) and TBT (2,290ms) problem**, traced to the hero's framer-motion animation bundle — not visible in the easier method used last time.
- **Score is up 5 points net**, driven by real, verified content/technical/schema/on-page gains, partly offset by the more realistic performance number and the two fresh findings above.

---

## 2. Critical issues

**None.** No indexing blockers, no broken links, no accidental noindex, no canonical conflicts, no fabricated content anywhere (including under real temptation — the new case studies and industry-page placeholders all maintained the site's no-fabrication discipline), no deprecated schema types.

---

## 3. High-severity issues

### 3.1 `/work`'s page-type mismatch is downgraded, not resolved

**Severity: High (was Critical). SXO Gap Score moved 69 → 74/100.**

"Craft" is a materially softer nav promise than "Work," and the case-study content genuinely deepened (216 words / 1 entry → ~2,780 words across 3 entries, each with specific, checkable metrics). But the destination page's own `<title>` and `<h1>` still say "Our Work," undercutting the softer entry-point promise. More importantly, the underlying evidentiary gap didn't move: 2 of 3 entries are still concept builds, not client work — the ratio went from 1-of-1 concept to 2-of-3 concept, which reads as a more visible pattern to a comparison-shopping visitor, not a temporary gap. Neither of the two personas the original finding was built on (Comparison-Shopping SMB Owner, Industry-Specific Searcher) scored above 60/100 this round. **Fix:** align `/work`'s own title/H1 with "Craft" (or whatever the intended framing is); add a short, honest line on `/work` itself acknowledging that none of the three entries are trades/health/hospitality/retail/professional/non-profit work yet; add a bottom CTA to `/work`'s index page (currently has none — all three links go to case studies, none to `/start-project`); and prioritize getting one real, named client project live, even discounted or pro-bono.

### 3.2 Two brand-new pages shipped with severely oversized meta descriptions and titles

**Severity: High. Affects: `/work/point-break-surf`, `/work/goodground-site`.**

Both added to the sitemap since the last audit. `/work/point-break-surf`'s meta description is 231 characters (should be ≤155–160) and its title is 101 characters (should be ≤60). `/work/goodground-site`'s description is 213 characters, title 83 characters. Both will be cut roughly in half in search results. This is the same "new page skips on-page hygiene" pattern flagged as the top finding last cycle, recurring within 24 hours, on pages added *after* the remediation pass meant to close exactly this gap. **Fix:** trim both descriptions to ≤155 characters and titles to ≤60 characters; move the specific performance-metric claims ("331ms LCP," "772ms LCP," "48 statically generated pages") into body copy, where they already exist, rather than the meta tags.

### 3.3 `/legal` has no `og:image`

**Severity: High.** Confirmed: `<meta property="og:image">` absent, and the per-route `opengraph-image` file 404s. This page fell through both the original July fix and this week's 16-page fix list — it was simply never on either list, not a broken fix. `og:title`/`og:description` are correct; only the image is missing. **Fix:** same one-line `ImageResponse` pattern already applied to the other 16 pages.

### 3.4 Homepage has a real Core Web Vitals problem, surfaced by a harder test

**Severity: High.** Under Lighthouse's standard mobile-throttled profile (4x CPU slowdown), the homepage scores 57/100 with CLS 0.156 ("Needs Improvement") and TBT 2,290ms — both meaningfully worse than every other page tested. Root cause: a single ~2,150ms JS chunk (almost certainly the framer-motion hero animation bundle) delays the hero text's paint and causes a layout shift once it finally renders — first-party code, not third-party scripts, so fully within the team's control. Not visible in the 08-16 audit's unthrottled trace, which is why this wasn't caught until now. **Fix:** reserve the hero text block's box before web-font swap (or use `font-display: optional`) to kill the CLS; code-split or defer the hero animation script so critical text is LCP-eligible before the animation library loads.

---

## 4. Medium-severity issues

- **Meta description length drift persists on ~5 pages** — mostly minor overages (1–13 characters past the limit): `/services/seo` (160), `/services/trades-and-home-services` (157), `/services/health-and-wellness` (158), `/start-project` (156), `/work/b3tter-bottle` (168, improved from 191 but still over).
- **Several titles remain over ~60 characters**: `/services/google-ads` (68), `/services/meta-ads` (63), `/services/website-redesign` (62), `/services/non-profits-and-community` (65), and 6 of 7 `/insights` article titles (64–75 characters) — largely unchanged from last cycle, since title/description length wasn't the described scope of this remediation pass.
- **New: visible keyword-tag "pill" badges read as keyword stuffing.** All 6 `/services/[slug]` pages and (confirmed on 2, likely all 6) industry pages show a row of 4 near-exact-match keyword-variant badges directly under the hero paragraph. Not egregious, but a recognizable low-quality pattern that didn't exist in the July or 08-16 audits. **Fix:** remove, or replace with genuine micro-copy (service area, turnaround time).
- **Apex-to-www redirect still 2 hops instead of 1** — confirmed unchanged, exactly as expected. This is a Vercel dashboard domain-config change, not code, and was correctly left untouched by the code remediation.
- **`/work` listing page needs its own `ItemList` schema.** Flagged as deferred-until-3-entries last cycle; that threshold is now met (3 case studies), still only has `BreadcrumbList`.
- **`sitemap.xml`'s `/faq` entry has an unreconciled `lastmod`** — off by ~6 hours from what local git history shows for its tracked file. All 12 other checked routes matched exactly; likely a shallow-clone git-history edge case on the Vercel build machine, not a systemic bug. Worth confirming the build's git checkout depth.
- **Homepage `ProfessionalService` schema still lists `areaServed` as country-only**, while the six `Service` sub-entities it owns now correctly list country + `City: George` — a small internal inconsistency now that the richer pattern exists elsewhere in the codebase.
- **Two structural schema findings carried over, unfixed** (correctly deferred, not urgent): duplicate `Service` entities between the `/services` hub and each detail page with no `sameAs` cross-reference; dangling `@id` references (`provider`/`creator` pointing at an `Organization` not inlined on that page) — now also present on the two new `/work/*` pages via `CreativeWork.creator`.
- **Zero third-party citations *to* the site** beyond Facebook/Instagram — no Hellopeter, Yellow Pages SA/Brabys, or local directory listings. This is now the single largest ceiling on both Content Quality and Local scores; not a content-editing fix, needs off-site distribution work.
- **No Google Business Profile exists yet** — still the single highest-leverage open item in the whole audit. Everything it needs (real name, address, phone, email) is already correct in schema and now reinforced in visible copy on 9 pages. Purely a business action away, not a code gap.

---

## 5. Low-severity issues

- OG images on all 3 `/work/*` case studies use raw hero photography rather than the generated 1200×630 branded card pattern used everywhere else — not broken, just a design choice worth making consciously now that a third page has adopted it.
- IndexNow protocol still not implemented — cheap, and the sitemap grew 2 URLs in 24 hours, strengthening the case for automating a ping-on-publish.
- `/insights` listing page has only `BreadcrumbList` schema — a `Blog`/`ItemList` wrapper is a reasonable next addition once someone's doing another schema pass, not urgent at 6 articles.
- `CreativeWork.datePublished` on the two new case studies is today's publish date, not necessarily the underlying project's build date — same pattern already correctly handled on `b3tter-bottle`, just worth a human glance to confirm intent.
- `geo` coordinates and `openingHoursSpecification` still absent from schema — cheap, and needed for Google Business Profile setup regardless.
- Named human author on blog articles remains an open founder decision (standing tension with the `/about` page's "described by experience, not named" policy) — already surfaced to and deferred by the founder; not re-litigated here.
- LinkedIn and YouTube presence still absent — LinkedIn needs a real URL from the founder (won't fabricate one); a video walkthrough is a production task, not a code task.

---

## 6. What's genuinely working — don't undo it

- **The remediation pass held up under direct, adversarial verification, not just claimed.** Every one of ten described fixes was checked against live HTML/JSON-LD/sitemap output rather than trusted, and all ten were confirmed genuinely shipped.
- **The `goodground-site` case study is a distinctive, hard-to-fake trust signal.** A self-referential audit of GoodGround's own site, explicitly naming the de-duplication bug this exact remediation cycle fixed as one of the issues it found and corrected — dogfooding done in public, with receipts.
- **No fabricated content anywhere, under real temptation.** Extended this cycle to two new case studies and six industry-page "honest placeholder" blocks — the easy failure mode (implying proof that doesn't exist) was avoided everywhere it was checked.
- **New pages ship with correct structured data and server-rendering by default now**, not as an afterthought — both new `/work/*` pages had `CreativeWork`/`BreadcrumbList` schema and `X-Nextjs-Prerender: 1` from day one, evidence the JSON-LD pattern is now baked into the template.
- **Sitemap `lastModified` fix genuinely works** — 12 of 13 cross-checked routes matched local git history exactly; real per-file dates, not a single shared timestamp.
- **Duplicate content is fully resolved**, not just reduced. The exact verbatim phrase anchoring last cycle's top content finding now appears only once, on its canonical page.
- **All 31 sitemap URLs return 200** with zero redirects, orphans, or gaps.
- **Security headers remain complete and byte-identical site-wide.**
- **The doubled copy on 6 service/industry pages had no measurable performance cost** — CLS 0.000 and LCP in the same band as unchanged pages on both content-expanded pages tested.
- **Zero visual defects found from this entire content-expansion round** — no overflow, no cramped mobile layout, no broken cards, across 4 representative pages at 2 breakpoints.

---

## 7. `/work` page-type mismatch — still the top open item, now more specific

Last cycle's #1 recommendation (reframe the nav label, add a second measured example) shipped and helped. What's left, in priority order:

1. **Align the destination page's self-labelling with the softened nav promise.** `/work`'s `<title>` and `<h1>` still say "Our Work" while the nav says "Craft" — pick one framing and carry it through.
2. **Add the same honest in-progress line already used on the 6 industry pages, to `/work` itself**, acknowledging that none of the three current entries match any of the six verticals the site targets.
3. **Add a bottom CTA to `/work`'s index page** — currently a soft dead end for a visitor who reads the list but doesn't click into any single case study.
4. **Get one real, named client project live**, even discounted or pro-bono — this is the only fix that actually changes the 2-of-3-concept ratio a comparison-shopping visitor reacts to.

---

## 8. Supplementary deep-dive scores (not part of the weighted Health Score above)

| Audit | Score | Headline finding |
|---|---|---|
| Local SEO | 47/100 (mechanical: 35), up from 42 (32) | Local anchors verifiably landed on 9 pages; GBP absence remains the single highest-leverage unclosed item, unblocked on the code side |
| SXO (visitor-experience gap) | 74/100, up from 69 | `/work` mismatch downgraded Critical → High; systemic trust gap (zero social proof) still drags every persona's Trust score |
| GEO / AI readiness | 89/100 headline, 82/100 strict weighted (track this one), up from 80 strict | `llms.txt` drift fully resolved; remaining gap is off-site authority (no GBP, LinkedIn, or video) |
| Visual / above-the-fold | Clean, no defects (not independently scored this run) | This round's entire content-expansion pass verified visually clean across 4 pages, 2 breakpoints |
| Content cluster / hub-spoke | Not re-run this cycle (08-16 score: 58/100, now stale) | The described gap (zero blog↔commercial linking) was directly fixed and verified in this cycle's content and schema audits — a fresh `/seo cluster` pass would likely score materially higher; recommend re-running before trusting 58 |
| Backlinks | Not scored — Tier 0 only (unchanged) | Domain still not found in Common Crawl; expected for a site this age, no new data this cycle |

---

## 9. Audit scope and limitations

1. **No Google field data.** No CrUX, Search Console, or GA4 access — all performance figures are lab measurements, and this cycle's method (throttled) differs from last cycle's (unthrottled), so the two performance numbers are not directly comparable. See the footnote on the Health Score table.
2. **No rank or keyword data.** No DataForSEO, Moz, or Bing credentials.
3. **No backlink data beyond domain level.** Common Crawl only; not re-checked this cycle.
4. **No GBP or business-listing API access.** Local findings rely on absence-of-evidence on the live page — a strong signal, not a certified GBP dashboard check.
5. **SERP checks (SXO) used WebSearch, not a dedicated SERP tool** — directional, not a certified rank-tracking result.
6. **Personas (SXO) are derived from SERP signals and the site's own segmentation, not real user research.**
7. **Content cluster analysis was not re-run this cycle** — its 08-16 score is carried forward but known stale given fixes verified elsewhere this cycle.

---

*Full category-level raw reports (technical, content, schema, sitemap, performance, local, sxo, geo, visual) for this cycle are in `run-2026-08-17/`. The 2026-08-16 cycle's reports remain in `run-2026-08-16/` for reference.*
