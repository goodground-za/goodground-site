# GoodGround — Structured Data Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-17
**Compared against:** `run-2026-08-16/schema.md` (schema scored 90/100)
**Pages fetched:** 31 of 31 sitemap URLs (server-rendered HTML, JSON-LD extracted from
the initial response via direct `curl` — nothing here depends on client-side hydration)

## Score: 93 / 100

All four claimed fixes verified true against live rendered markup. Site also grew by
three pages since yesterday (two new `/work/[slug]` case studies, `/legal`), all of
which shipped correct schema on day one. No regressions found. The two structural
findings flagged yesterday (dangling `@id` references, duplicate `Service` entities
between hub and detail pages) are still open — neither was in scope for this round
of changes, so that's expected, not a miss.

---

## Verification of the four claimed changes

| Claim | Verified? | Evidence |
|---|---|---|
| `CreativeWork` added to every `/work/<slug>` page, not just the one flagged | **True, and exceeded** | All 3 `/work/*` pages (`b3tter-bottle`, `point-break-surf`, `goodground-site`) carry a `CreativeWork` block alongside `BreadcrumbList`. Two of the three (`point-break-surf`, `goodground-site`) are entirely new pages that didn't exist on Aug 16 — both shipped with the pattern from day one, exactly the "template it now" recommendation from Finding 1 |
| Homepage's duplicate `FAQPage` removed; only `/faq` emits it now | **True** | Homepage `<script type="application/ld+json">` now contains exactly one block: `ProfessionalService` + `WebSite` in a `@graph`. No `FAQPage` present. `/faq` still emits its own `FAQPage` (`@id: #faq-page-faq`, 13 questions) unchanged |
| `BlogPosting` gained `wordCount` and `articleSection` | **True, on all 6 articles** | Every `/insights/<slug>` page's `BlogPosting` block now has both fields, e.g. `"wordCount": 1695, "articleSection": "Pricing"` on the pricing guide. Values differ sensibly per article (1023–1705 words; sections: Pricing, Growth ×2, Websites ×3) — not a copy-pasted placeholder |
| `/services` `ItemList` gained `numberOfItems` | **True** | `"numberOfItems": 6` present, matching the 6 `ListItem` entries (website-development, ux-design, seo-foundations, care-plans, google-ads, meta-ads) |

All four hold up under direct inspection. Nothing here needed correction.

---

## What else changed since 2026-08-16 (not in the brief, found in the fresh scan)

| Item | Aug 16 | Aug 17 | Verdict |
|---|---|---|---|
| Sitemap size | 28 URLs | 31 URLs | `/work/point-break-surf`, `/work/goodground-site`, `/legal` added |
| `/legal` | Did not exist | `BreadcrumbList` only | Reasonable for a legal/terms page — no rich-result type fits a ToS/privacy page, `BreadcrumbList` is the right minimum |
| `/work` (listing) | 1 case study, `BreadcrumbList` only | 3 case studies, still `BreadcrumbList` only | The Aug 16 report explicitly flagged this as a Low item to revisit "once `/work` has 3+ case studies" — that threshold is now met. Elevating to **Medium**, see Finding 1 below |
| Pricing FAQ vs `/faq` overlap | Not checked | Checked this round: 0 question overlap between the 5-question `/pricing` FAQ and the 13-question `/faq` page | **Confirmed clean** — this is not the same duplication pattern the homepage had; no action needed |

---

## Critical

None. No invalid JSON (0 parse errors across ~62 blocks on 31 pages), no deprecated
types (`HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`
— grepped for all of them across every extracted block, none present), no fabricated
`aggregateRating`/`review` data, no `http://schema.org` context anywhere.

---

## High

None new this round.

---

## Medium

### Finding 1 — `/work` listing page has no `ItemList`, and now has 3 entries
**URL:** `https://www.goodground.co.za/work`
**Current schema:** `BreadcrumbList` only.

This was flagged as a Low/deferred item on Aug 16 specifically because there was
only one case study at the time. There are now three (`b3tter-bottle`,
`point-break-surf`, `goodground-site`), which is the stated threshold for adding an
`ItemList` — mirroring the pattern already proven on `/services`. Suggested addition:

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.goodground.co.za/work#list",
  "name": "GoodGround case studies",
  "numberOfItems": 3,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": { "@id": "https://www.goodground.co.za/work/goodground-site" }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": { "@id": "https://www.goodground.co.za/work/point-break-surf" }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": { "@id": "https://www.goodground.co.za/work/b3tter-bottle" }
    }
  ]
}
```

Order above follows publish-recency (`datePublished`: goodground-site and
point-break-surf both `2026-08-17`, b3tter-bottle `2026-08-15`) — adjust to whatever
display order the page actually renders in, since `ItemList` position should match
what a user/crawler sees on the page, not just publish date.

### Finding 2 — Duplicate `Service` entities between `/services` hub and detail pages (carried over, unfixed)
**Still present, unchanged from Aug 16.** Confirmed directly on `/services/seo`: the
sub-page's `Service` is `@id: .../services/seo#service`, `name: "SEO services for
small businesses across South Africa."` — a different `@id` and different `name`
from the hub page's `@id: .../services#seo-foundations`, `name: "SEO Foundations"`.
Same pattern holds for all 6 offerings (checked the hub page's full `Service` array:
none of the 6 entities carry a `sameAs` field pointing at their detail-page
counterpart). Not a validator error, still just a canonicalization ambiguity for
crawlers/AI trying to treat "GoodGround's SEO service" as one entity. Cheapest fix
unchanged from yesterday: add `"sameAs"` cross-references between the two entities
per offering — 6 one-line additions, no rewrite.

### Finding 3 — Dangling `@id` cross-page references (carried over, unfixed)
**Still present, unchanged from Aug 16, now spread across 31 pages instead of 28.**
Confirmed again on `/services/seo`: `Service.provider` is `{"@id":
"https://www.goodground.co.za/#organization"}` with no inline `name`. Since Google's
structured-data parser evaluates each page's JSON-LD independently per fetch, this
`@id` resolves to nothing when that page is fetched in isolation. Still valid JSON-LD,
still generally tolerated for non-required fields, still worth a 10-minute pass
through Search Console's Rich Results report to confirm no "missing field" warnings
are firing site-wide. The two brand-new `/work/*` pages inherited this same pattern
on their `CreativeWork.creator` field — worth fixing centrally (one shared
`Organization` inline snippet, referenced by every page) rather than page-by-page if
it does turn out to matter.

### Finding 4 — `FAQPage` footprint, still restricted to gov/healthcare for Google rich results (informational, not critical)
`FAQPage` is **no longer on the homepage** (that's the fix verified above). It is
still present on `/faq`, `/pricing`, `/services`, `/services/website-care-plans`,
`/services/google-ads`, `/services/meta-ads`, `/services/website-redesign`,
`/services/seo`, `/services/ux-design`, and all 6 industry pages — 15 blocks total,
same count as before (removing the homepage duplicate and none being added elsewhere
nets to the same total). None of these are eligible for Google's classic FAQ rich
result since GoodGround is a commercial site, not government/healthcare (restricted
August 2023). This remains **Info/Medium, not Critical** — the markup is well-formed,
and the AI/LLM-citation upside (ChatGPT, Perplexity, AI Overviews-style extraction)
still applies. No action needed; flagging only so it doesn't get re-litigated as a
"bug" later. Confirmed this round that `/pricing`'s 5-question FAQ and `/faq`'s
13-question FAQ have **zero question overlap** — this is not the same
verbatim-duplication issue the homepage had; it's a legitimate page-relevant subset.

---

## Low

- **`/insights` (listing) has only `BreadcrumbList`, same as `/work` did before this
  audit.** With 6 published articles now live, a `Blog` type wrapping the collection
  (or an `ItemList` referencing each `BlogPosting` `@id`, mirroring the `/work` and
  `/services` pattern) is a reasonable next addition once someone's doing another
  schema pass — not urgent at 6 items the way `/work` became at 3, but worth queuing.
- **`/legal` has no `WebPage`/`TermsOfService` typing beyond `BreadcrumbList`.** Fine
  as-is; schema.org's `TermsOfService`-adjacent types don't have meaningful rich-result
  value, so this is a non-issue, noted only for completeness.
- **`CreativeWork.datePublished` on `/work/point-break-surf` and
  `/work/goodground-site` is `2026-08-17`** — today's date, i.e. the date these pages
  went live, not necessarily the date the underlying project was built. Worth
  confirming this is intentional (publish date) rather than accidentally using the
  audit-run date as a placeholder, the same caution flagged for `b3tter-bottle` on
  Aug 16 (that one now correctly shows `2026-08-15`, two days before publish, so the
  pattern there was fine — just flagging the newer two dates as worth a human glance).

---

## Validation checklist (applied to every block found)

| Check | Result |
|---|---|
| `@context` is `https://schema.org` (not `http`) | Pass, all 31 pages |
| No deprecated types (`HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`) | Pass — none present anywhere |
| All JSON-LD blocks parse as valid JSON | Pass — 0 parse errors across ~62 blocks on 31 pages |
| URLs absolute, not relative | Pass |
| Dates ISO 8601 | Pass (`datePublished`/`dateModified` on all 6 `BlogPosting` and all 3 `CreativeWork` blocks) |
| No placeholder text (`[Business Name]` etc.) | Pass |
| `BreadcrumbList` on every nested route | Pass — present on all 30 non-homepage pages, correct `position` sequencing, including 3-level breadcrumbs on all 3 `/work/*` pages |
| `aggregateRating` / `review` absent | Pass — correctly still not present anywhere |
| Homepage `FAQPage` duplicate | Pass — confirmed removed; only `/faq` emits it now |
| `BlogPosting.wordCount` / `articleSection` | Pass — present and page-specific on all 6 articles |
| `/services` `ItemList.numberOfItems` | Pass — `6`, matches item count |
| `CreativeWork` on all `/work/<slug>` pages | Pass — 3 of 3 |

### Pass/warn/fail counts by schema type (this round)

| Schema type | Instances found | Pass | Warn | Fail |
|---|---|---|---|---|
| `ProfessionalService` (Organization) | 1 | 1 | 0 | 0 |
| `WebSite` | 1 | 1 | 0 | 0 |
| `BreadcrumbList` | 30 | 30 | 0 | 0 |
| `Service` | 12 (6 hub + 6 detail-page) | 12 | 12* | 0 |
| `ItemList` | 1 | 1 | 0 | 0 |
| `FAQPage` | 15 | 15 | 15** | 0 |
| `ContactPage` | 1 | 1 | 0 | 0 |
| `BlogPosting` | 6 | 6 | 0 | 0 |
| `CreativeWork` | 3 | 3 | 0 | 0 |

\* All 12 `Service` blocks are individually valid; the "warn" is the cross-entity
duplication issue (Finding 2), not a per-block error.
\** All 15 `FAQPage` blocks are individually valid, well-formed markup; the "warn" is
the standing informational note that none are eligible for Google's classic FAQ rich
result on a commercial site (Finding 4), not a per-block error.

No hard fails anywhere in the site's structured data.

---

## Explicitly do NOT do (unchanged from Aug 16/July, still holds)

- Do not add `aggregateRating` or `review` schema until genuine reviews exist.
- Do not add `FAQPage` to any *new* commercial page expecting a Google rich result —
  it will not get one. Existing FAQ blocks are fine to leave for the AI-citation
  upside.
- Do not treat the two open structural findings (dangling `@id` references,
  duplicate `Service` entities) as urgent — both are tolerated by validators today;
  fix opportunistically, not as a fire drill.

---

## Method

- Fetched the live sitemap (`https://www.goodground.co.za/sitemap.xml`) to get the
  current URL list — 31 URLs, up from 28 on Aug 16
- Fetched all 31 URLs directly via `curl` (server-rendered HTML, no client-side JS
  execution — confirms JSON-LD is present in the initial response as required for
  crawlers)
- Extracted every `<script type="application/ld+json">` block with a regex pass,
  parsed each with Python `json.loads()` to confirm syntactic validity (0 errors)
- Directly diffed the four specific claims in the brief against the parsed JSON
  (not against the HTML source text, against the actual decoded structure) —
  homepage graph, `/faq` + `/pricing` FAQ question sets, all 6 `BlogPosting` blocks,
  the `/services` `ItemList`, and all 3 `/work/<slug>` `CreativeWork` blocks
- Ran a fresh, unbiased pass across every other page type (about, contact,
  start-project, legal, insights listing, work listing, all 9 service sub-pages) to
  surface anything not mentioned in the brief
- Grepped the full extracted corpus for deprecated type names and `http://schema.org`
  to confirm neither appears anywhere
