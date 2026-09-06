# GoodGround — Structured Data Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Compared against:** `FULL-AUDIT-REPORT.md` / `ACTION-PLAN.md`, 2026-07-20 (schema scored 92/100)
**Pages fetched:** 28 of 28 sitemap URLs (server-rendered HTML, JSON-LD extracted from initial response — nothing here depends on client-side hydration)

## Score: 90 / 100

Net movement is small but the composition changed a lot. Two real gaps from the
July audit got closed (telephone, per-offering `Service` schema), and one new gap
opened (the new case-study page shipped with no descriptive schema at all). The
hard rule from July — no `aggregateRating`/`review` until real reviews exist — was
respected. Nothing was found to have regressed silently.

---

## What changed since 2026-07-20

| Item | July 20 | Aug 16 | Verdict |
|---|---|---|---|
| `telephone` in Organization schema | Missing (unconfirmed) | `+27670104988` present | **Fixed** — closes the NAP gap flagged as the notable local-SEO issue |
| `legalName` | Not present | `"GoodGround (Pty) Ltd"` present | **New, good** |
| Per-offering `Service` schema | Listed as a nice-to-have; `/services` used `ItemList` only | `/services` now emits 6 `Service` entities *plus* the `ItemList`, and all 15 `/services/[slug]` pages (6 core + 9 industry pages) each carry their own `Service` + `BreadcrumbList` + `FAQPage` | **Done**, and went further than the July recommendation asked for |
| `PostalAddress.addressLocality` | `"Brackenfell"` | `"George"` | **Changed, and consistent** — see NAP section below. Confirmed intentional, not a copy-sweep accident |
| Route count / sitemap | 9 URLs | 28 URLs (pricing, 15 service pages, /faq, /work/b3tter-bottle, 5 new articles) | Site grew substantially |
| `/work/b3tter-bottle` case study | Did not exist | Exists, only `BreadcrumbList` on it | **New gap** — see Finding 1 |
| `aggregateRating` / `review` | Correctly absent | Still correctly absent | **Unchanged — compliant with the hard rule** |
| `BlogPosting.author` | `Organization` (named person deferred, founder's call) | Still `Organization` on all 6 articles | **Unchanged** — consistent with the standing "describe by experience, not name" instruction |
| `FAQPage` | On home only | Now on home, `/faq`, `/services`, `/pricing`, `/services/website-care-plans`, and all 9 industry service pages (15 blocks total) | **Expanded** — see Finding 2 |

---

## NAP consistency check (the specific thing this audit was asked to confirm)

Verified the `PostalAddress` in the `ProfessionalService` block on the homepage
against `areaServed` on every one of the 15 `/services/*` pages:

- Organization (`/`, `@id: #organization`): `addressLocality: "George"`, `addressRegion: "Western Cape"`, `addressCountry: "ZA"`
- Every `/services/*` page's `Service.areaServed` includes `{"@type": "City", "name": "George"}` alongside `{"@type": "Country", "name": "South Africa"}`

**No drift found.** "George" appears identically everywhere schema states a
locality — this is not a Brackenfell/George mismatch and not an accidental
side-effect of the "South Africa" national-copy sweep. The national positioning
lives in `areaServed: Country South Africa` (unchanged, correct), while "George"
is confined to the registered-address fields, which is exactly the right split.
Only flag: `telephone` and `email` are only ever emitted on the homepage
Organization block — fine, since every other page references the org via `@id`
rather than restating NAP fields (see Finding 4 on why that referencing pattern
itself is worth a second look).

---

## Critical

None. No invalid JSON, no deprecated types (`HowTo`, `SpecialAnnouncement`,
`CourseInfo` etc. — not present anywhere), no fabricated review/rating data.

---

## High

### Finding 1 — `/work/b3tter-bottle` has no descriptive schema
**URL:** `https://www.goodground.co.za/work/b3tter-bottle`
**Current schema:** `BreadcrumbList` only.

This is the first entry in the new `/work/[slug]` route and, on content alone, it
is one of the strongest pages on the site: a ~1,500+ word build write-up with
concrete metrics (100 accessibility score, 56MB of source photography shipped as
1.5MB, hand-written HTML/CSS/JS, no framework). The page correctly discloses "B3TTER
is our own concept build" rather than presenting it as client work — that honesty
should carry into the schema too (do not model it as a client testimonial or add
a fictional `Organization` client with a `review`).

The right type is **`CreativeWork`** (or `Article`, since the page reads as a
build narrative with a clear headline/description/body), not `Product` — the
subject is the *website GoodGround built*, not the bottle itself. Suggested
JSON-LD to add to that page (alongside the existing `BreadcrumbList`):

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://www.goodground.co.za/work/b3tter-bottle",
  "name": "B3TTER: A premium product page, built and measured in a day",
  "headline": "B3TTER: A premium product page, built and measured in a day",
  "description": "GoodGround's own concept build: a full product site for an insulated stainless steel bottle, scoring 100 for accessibility on the live URL with 56 MB of source photography shipped as 1.5 MB.",
  "creator": {
    "@id": "https://www.goodground.co.za/#organization"
  },
  "datePublished": "2026-08-16",
  "genre": "Case study",
  "about": "Website design and front-end performance for a direct-to-consumer product page",
  "keywords": "web design case study, accessibility, image optimisation, South Africa",
  "url": "https://www.goodground.co.za/work/b3tter-bottle",
  "mainEntityOfPage": "https://www.goodground.co.za/work/b3tter-bottle",
  "isPartOf": {
    "@id": "https://www.goodground.co.za/#website"
  }
}
```

Confirm the real `datePublished` against the CMS/commit history rather than using
the placeholder date above. As `/work` gains more entries, the same block should
ship on each new case-study page from day one — cheaper to template now than to
retrofit later.

---

## Medium

### Finding 2 — `FAQPage` is now on 15+ blocks across a commercial site
**URLs affected:** `/`, `/faq`, `/services`, `/pricing`, `/services/website-care-plans`,
`/services/google-ads`, `/services/meta-ads`, `/services/seo`, `/services/ux-design`,
`/services/website-redesign`, and all 6 industry pages
(`trades-and-home-services`, `hospitality-and-food`, `health-and-wellness`,
`professional-and-consulting`, `retail-and-small-brands`, `non-profits-and-community`).

Per the standing rule: Google restricted `FAQPage` rich results to government and
healthcare sites in August 2023. GoodGround is neither, so **none of these blocks
are eligible for the FAQ rich result in Google Search** regardless of how well
they're marked up. This is flagged as **Info/Medium, not Critical** — the markup
itself is technically correct (well-formed `Question`/`Answer` pairs, no stub or
unanswered questions), and it still has genuine upside for AI/LLM citation
(ChatGPT, Perplexity, Google AI Overviews-style extraction don't carry the same
2023 restriction as classic Search rich results). Nothing here needs to be
removed.

Two things worth tightening, not urgent:
- **Duplicate content between `/` and `/faq`.** The homepage `FAQPage` block
  (`@id: #faq`) and the dedicated `/faq` page block (`@id: #faq-page-faq`) carry
  **identical** question/answer text for the same 13 questions. Not a schema
  error (schema.org has no uniqueness requirement), but two indexable pages
  presenting verbatim-identical FAQ content is a mild content-duplication smell.
  Consider trimming the homepage's FAQ block to a shorter, more homepage-relevant
  subset (pricing/payment questions only) and letting `/faq` be the canonical
  full list.
- Since new service-specific FAQPage blocks keep being added per page (services
  hub + 15 sub-pages + pricing + care-plans), this is the point to explicitly
  decide it's an AI-citation play rather than a Google-rich-result play, so
  nobody spends time later chasing FAQ rich results that structurally cannot
  appear.

### Finding 3 — `provider`/`publisher`/`about` reference an `@id` that isn't inline on that page
**URLs affected:** effectively every non-homepage page. Examples:
`/services` → `Service.provider: {"@id": "https://www.goodground.co.za/#organization"}`;
`/contact` → `ContactPage.about: {"@id": ".../#organization"}`;
every `/services/*` page → same pattern.

This is the same `@graph`/`@id` cross-reference pattern the July audit praised as
"correct and better than most production sites" — and the pattern itself is
fine. The thing worth flagging now that it's spread across ~25 pages instead of
9: Google's structured-data parser evaluates each page's JSON-LD **independently**
per fetch. It does not cross a page boundary to resolve an `@id` defined only in
`/`'s `<script type="application/ld+json">` block. In practice this means, e.g.,
the `Service` entities on `/services/google-ads` reference an `Organization` that,
*from that page's point of view*, has no `name`, `logo`, or `sameAs` — just a
dangling identifier. It's valid JSON-LD syntax, not an error, and Google is
generally tolerant of it for non-required fields. But it's worth a 10-minute
check in Search Console's Rich Results / Enhancement reports to confirm no
"missing field" warnings are actually being raised on `Service` items site-wide,
since that would only surface there, not in a spot-check like this one.
Low-effort mitigation if it does show up: inline `"name": "GoodGround"` next to
the `@id` reference on `provider`/`publisher`/`about` fields, which costs nothing
and removes the ambiguity.

### Finding 4 — Same real-world service modeled as two different `Service` entities
**Example:** `/services` hub lists `Service` `@id: .../services#care-plans`,
`name: "Website Care Plans"`. The dedicated page
`/services/website-care-plans` lists a **different** `Service` entity,
`@id: .../services/website-care-plans#service`,
`name: "Website maintenance and care plans for South African businesses."`

Same pattern repeats for Google Ads (`#google-ads` vs
`/services/google-ads#service`), Meta Ads, UX & Design, and SEO
(`#seo-foundations` on the hub vs `#seo` on the sub-page — different slug too).
This isn't wrong — each page's `Service` description is legitimate, page-specific
copy, and having two entities isn't a validator error — but it means a crawler
or AI system trying to canonicalize "GoodGround's SEO service" currently sees two
distinct, unlinked entities with different names and different `@id`s rather than
one entity described from two angles. If this is worth tidying, the cheapest fix
is adding `"sameAs"` on the hub-page `Service` pointing at the detail-page
`Service` `@id` (or vice versa) — not a rewrite, just a cross-reference.

---

## Low

- **`BlogPosting` missing `wordCount` and `articleSection`.** Optional, not
  required for `BlogPosting` eligibility, but cheap to add and gives Google/AI a
  clearer signal of depth (the articles are 1,000–1,700+ words, which is worth
  stating rather than leaving implicit).
- **`/work` (listing page) has only `BreadcrumbList`.** Reasonable while there's
  one entry; once `/work` has 3+ case studies, an `ItemList` referencing each
  `CreativeWork` (mirroring the `/services` `ItemList` pattern already in use)
  would be a natural, cheap addition — template it now if Finding 1 gets shipped.
- **`ItemList` on `/services` uses `position` starting at 1 with no `numberOfItems`.**
  Valid without it, but `numberOfItems: 6` is a one-line addition that removes
  any ambiguity for parsers that expect it.

---

## Validation checklist (applied to every block found)

| Check | Result |
|---|---|
| `@context` is `https://schema.org` (not `http`) | Pass, all 28 pages |
| No deprecated types (`HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`) | Pass — none present anywhere |
| All JSON-LD blocks parse as valid JSON | Pass — 0 parse errors across ~50 blocks on 28 pages |
| URLs absolute, not relative | Pass |
| Dates ISO 8601 | Pass (`datePublished`/`dateModified` on all 6 `BlogPosting` blocks, e.g. `2026-08-13`) |
| No placeholder text (`[Business Name]` etc.) | Pass |
| `BreadcrumbList` on every nested route | Pass — present on all 27 non-homepage pages, correct `position` sequencing, including the new 3-level `/work/b3tter-bottle` breadcrumb |
| `aggregateRating` / `review` absent | Pass — correctly still not present anywhere |
| NAP consistency (`George`, Western Cape, ZA) | Pass — confirmed identical across Organization + all 15 Service `areaServed` blocks |

---

## Explicitly do NOT do (unchanged from July, still holds)

- Do not add `aggregateRating` or `review` schema until genuine reviews exist.
- Do not add `FAQPage` to any *new* commercial page expecting a Google rich
  result — it will not get one. Existing FAQ blocks are fine to leave for the
  AI-citation upside; just don't expand the FAQ footprint under the assumption
  it helps classic Search rich results.
- Do not invent a `datePublished` for the `/work/b3tter-bottle` `CreativeWork`
  block above — confirm the real date before shipping Finding 1's fix.

---

## Method

- Fetched all 28 sitemap URLs directly via `curl` (server-rendered HTML, no
  client-side JS execution needed — confirms JSON-LD is present in the initial
  response as required for crawlers)
- Extracted every `<script type="application/ld+json">` block with a regex pass,
  parsed each with `json.loads()` to confirm syntactic validity
- Cross-checked `PostalAddress`/`areaServed` fields across all 16 relevant blocks
  (1 Organization + 15 Service) for the NAP consistency check specifically asked
  for in scope
- Compared type/property inventory page-by-page against the July 20 audit table
  to build the "what changed" section
