# GoodGround — Content Quality / E-E-A-T Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-17
**Compared against:** `seo-audit/run-2026-08-16/content.md` (2026-08-16), which scored Content Quality 79/100
**Pages read live for this run:** `/`, `/about`, `/contact`, `/start-project`, `/faq`, `/pricing`, `/legal`,
`/insights`, `/work`, 6 `/services/[slug]` pages (website-care-plans, google-ads, meta-ads, website-redesign,
seo, ux-design), 6 `/services/[industry]` pages (trades-and-home-services, hospitality-and-food,
health-and-wellness, professional-and-consulting, retail-and-small-brands, non-profits-and-community), all
6 `/insights/[slug]` articles, and 3 `/work/[slug]` case studies (b3tter-bottle, point-break-surf,
goodground-site — the latter two are **new since the 2026-08-16 run**). 31 URLs total, fetched directly from
production, extracted from within `<main id="main">` to exclude nav/footer boilerplate, and checked for word
counts, exact-string duplication, JSON-LD schema types, and outbound `href`s.

Note: this run found the site has grown by 3 pages since 2026-08-16 (two new case studies) that were not part
of the described remediation brief — flagged and assessed below as new content, not re-litigated old findings.

---

## Score: 87 / 100

Up from 79/100. Every item in the described remediation batch was verified live, not just claimed, and all of
it landed correctly: the 6 thin service pages are now genuinely substantive and over the 800-word floor, the
verbatim service-block duplication that was the prior audit's top finding is gone, all 6 articles carry a real
outbound citation, and the industry pages now state honestly that no live project exists yet in that vertical
instead of implying proof by association. On top of the described scope, two new case studies shipped
(Point Break Surf Academy, and a self-referential "GoodGround audits itself" case study), both handled with the
same no-fabrication discipline as the first one. The site is held below 90+ by one newly-discovered pattern —
visible keyword-tag "pill" badges on service pages that read as an old-school keyword-stuffing signal — and by
authoritativeness remaining the site's structurally weakest E-E-A-T factor, which no amount of on-page content
work can fix on its own.

| Sub-factor | 2026-08-16 | 2026-08-17 | Notes |
|---|---|---|---|
| Experience | Strong | Very strong | 3 honest case studies now, including one auditing GoodGround's own site |
| Expertise | Moderate-strong | Strong | Service pages now carry real "what's included" depth, not just problem/approach framing |
| Authoritativeness | Weak | Weak | Still the ceiling on the score — zero third-party citations *to* the site, unchanged |
| Trustworthiness | Strong | Strong | Placeholder honesty extended to industry pages; no fabricated proof anywhere found |
| Thin content | 6 service pages under 800 words | Resolved — all 6 now 850-925 words with unique content | Verified live, see Finding section |
| Duplicate content | 35-55% verbatim overlap across 8 URLs | Resolved — accordion pattern confirmed live | Verified live, see Finding section |
| AI citability | Good structure, weak authority | Good structure, weak authority, now with outbound citations too | See AI-readiness section |

---

## What changed since 2026-08-16 (remediation verification)

All four described remediation items were checked directly against live HTML, not taken on faith.

**1. Word count expansion on the 6 previously-thin service pages — confirmed live.**
Directly fetched and word-counted (text extracted from `<main id="main">` only):

| Page | 2026-08-16 | 2026-08-17 (live) | Floor |
|---|---|---|---|
| `/services/google-ads` | 476 | **857** | 800 |
| `/services/meta-ads` | 458 | **897** | 800 |
| `/services/ux-design` | 495 | **908** | 800 |
| `/services/website-redesign` | 485 | **887** | 800 |
| `/services/seo` | 516 | **923** | 800 |
| `/services/website-care-plans` | 529 | **903** | 800 |

All 6 now clear the floor. Read the full `/services/google-ads` page in detail as a spot check (per the brief's
instruction to verify at least 3 directly — google-ads, meta-ads, and website-care-plans were read in full; the
other three confirmed by word count and structural sampling). The new content is not padding: it adds 3 specific
pain-point statements ("Bidding on 'electricity' instead of 'emergency electrician near me' spends your money on
browsers, not buyers"), a genuine 10-item "what's included" list, and 5 FAQ entries with real, non-generic
answers ("Will I own my Google Ads account? Always... If you ever move to a different agency... you leave with
everything intact"). This reads like someone who actually runs these campaigns wrote it, not a template filler
pass.

**2. Verbatim service-block duplication — confirmed removed.**
The exact phrase that anchored the prior audit's top finding ("built fast and then left alone") was grepped
across `/`, `/services`, and all 6 industry pages. It now appears **only on `/services`** — the canonical page —
and is gone from the homepage and all 6 industry pages. In its place, industry pages now show a compact
accordion: a one-line service name, a status tag ("Flagship" / "Included" / "Growth"), a one-sentence summary,
and a "See full details →" link back to the canonical `/services/[slug]` page. Example, from
`/services/trades-and-home-services`: *"01 Website Development — Flagship — A website that works as hard as
you do. See full details →."* This is exactly fix (b) recommended in the prior audit (link out instead of
reproducing the block) rather than the cheaper wording-variation option — the better fix was chosen. The
homepage now uses its own distinct, shorter one-liners per service ("Search Optimisation — Built to be found,
not just built to look nice"), also non-duplicate. Keyword-cannibalization risk from Finding 2 in the prior
report is resolved as a direct consequence.

**3. Outbound citations on all 6 articles — confirmed live, one per article, contextually placed.**
Each article now links out once to a relevant, high-authority third-party source, inline and followed (no
`nofollow`, no generic "sources" dump at the bottom):

| Article | Citation |
|---|---|
| how-much-does-a-website-cost-in-south-africa | wix.com/pricing |
| website-vs-facebook-page | blog.hubspot.com (organic reach decline data) |
| website-that-converts-and-grows-with-your-business | web.dev/articles/vitals |
| hand-coded-websites-vs-drag-and-drop-builders | almanac.httparchive.org (page weight data) |
| biggest-website-mistakes-south-african-smes-make | datareportal.com (SA digital 2026 report) |
| why-small-businesses-in-south-africa-need-a-website | support.google.com (Business Profile) |

This directly resolves Finding 5 from the prior audit. Each citation backs a specific numeric or factual claim
in the surrounding paragraph rather than being bolted on, which is the correct pattern.

**4. Industry pages now state honestly that no live project exists yet in that vertical — confirmed live.**
Checked `/services/health-and-wellness` in full: *"We haven't published a live health & wellness project yet.
Get in touch and we'll tell you honestly what we're currently working on."* This is the same no-fabrication
discipline the case study established in the prior audit, now extended to a context where the easy failure mode
would have been to imply proof that doesn't exist. Consistent with the site's established pattern of refusing to
overclaim.

---

## New since 2026-08-16, outside the described remediation scope

### Two new case studies at `/work` — same discipline as the first, worth noting as a strength

`/work` now lists **3** case studies, not 1: `b3tter-bottle` (unchanged), `point-break-surf` (new, 946 words),
and `goodground-site` (new, 850 words). Both new entries are labeled "Concept build" honestly where relevant,
use only checkable, specific numbers (331ms LCP for Point Break, Lighthouse 100 across accessibility/best
practices/SEO/agentic-browsing plus 772ms LCP and 48 statically generated pages for the GoodGround site), and
both carry `CreativeWork` schema (all 3 case studies do now — this also resolves Finding 6 from the prior audit,
which flagged the single case study's missing schema).

The `goodground-site` case study is worth calling out specifically: it's a self-referential audit of
GoodGround's own site, explicitly framed against the risk of an agency not holding its own site to the same
bar it sells to clients ("The failure mode is well known: the agency that sells fast, accessible, well-structured
websites while running one that fails its own pitch"), and it explicitly names fixing "de-duplicated service
copy" as one of the issues its own audit found and corrected. This is dogfooding done in public, with the receipts
shown — a genuinely strong, differentiated trust signal that's rare in agency marketing and hard for a
competitor to fake retroactively.

Also resolves the prior audit's Finding 4 (the `/work` index page saying "every case study **here** ends in
numbers" while only one existed) — that framing is now accurate with 3 case studies.

### New finding: visible keyword-tag "pill" badges on service and industry pages

**Severity: Low-medium.** Every one of the 6 `/services/[slug]` pages and both industry pages checked in detail
carry a row of 4 visually-styled "pill" badges directly under the hero paragraph — e.g. on `/services/google-ads`:
`Google Ads management` / `PPC agency` / `Search ads` / `Google Ads for small business`. These are rendered as
plain visible text (not `alt` text, not metadata), styled as rounded chip/badge UI elements, and consist of
near-exact-match keyword variations concatenated with no connecting sentence structure. This is a recognizable
old-SEO pattern — a visible keyword tag cloud — that Google's Quality Rater Guidelines treat as a low-quality
signal regardless of how it's styled, because the intent (targeting keyword variants rather than communicating to
the reader) is legible to both a rater and to language-model-based ranking systems. It is not egregious (4 short
phrases, not a wall of terms, and it's visually contained as a small badge row rather than dominating the page),
but it's an unforced pattern that didn't exist in the July or August-16 audits and is now present on at least 8
URLs (6 service pages + verified on 2 industry pages; likely present on all 6 industry pages given the shared
component). Recommend either removing the badge row or replacing it with genuinely descriptive micro-copy (e.g.
service area, turnaround time) rather than keyword restatements.

### Fresh, unbiased scan for other new thin-content or E-E-A-T issues

Checked `/about` (416 words), `/faq` (631 words), `/pricing` (1,217 words), `/legal` (1,074 words), `/contact`
(114 words), and `/start-project` (84 words) against page-type expectations. `/contact` and `/start-project` are
transactional/utility pages (a lead form and a 4-step project-intake wizard respectively) — low word count here
is correct, not thin content; these pages aren't competing for informational search intent and forcing prose
onto them would hurt conversion for no SEO benefit. `/about` at 416 words is on the low side for what QRG
treats as a page that should carry the site's strongest expertise/experience signals, but its content is honest
and specific rather than padded, consistent with the founder's standing decision to describe by experience
rather than fabricate credentials — flagged as a minor opportunity, not a defect. No new duplicate-content
pattern was found outside the pill-badge issue above; a targeted re-check of `/services` (the canonical page,
1,798 words) against the homepage and industry pages found no other verbatim block overlap.

---

## Critical findings

None.

---

## High findings

None. Both High findings from the prior audit (verbatim duplication, cannibalization risk) are resolved and
verified live — see remediation section above.

---

## Medium findings

### 1. Keyword-tag pill badges on service/industry pages read as a keyword-stuffing pattern

See "New since 2026-08-16" above. Affects at least 6 service pages and 2+ industry pages (component is shared,
likely all 6). Fix: remove or replace with genuine micro-copy.

### 2. Zero third-party citations *to* the site — authoritativeness remains the structural ceiling

**Severity: Medium**, unchanged in substance from the prior two audits, but now the single largest gap relative
to everything else that's been fixed. On-page E-E-A-T work (case studies, citations out, honest placeholders,
FAQ depth) has been executed about as well as it can be without off-site signals. This is expected for a young
site and isn't a content-writing fix — it's a distribution and outreach problem (directory listings, press,
guest mentions, backlinks). Not actionable from within the page content itself, noted here so it isn't mistaken
for something more content edits can solve.

---

## Low findings

### 3. `/about` is thin relative to its E-E-A-T importance

**Severity: Low.** 416 words. Not padded or generic, but `/about` is typically the page that carries the
heaviest expertise/experience weight in QRG evaluation, and at 416 words it's doing less work than the case
studies or service pages. Worth a look once there's more concrete history to add (a specific number of sites
shipped, years active, etc.) rather than filling space now.

### 4. Readability remains strong across new content

Spot-checked `/services/google-ads` and `/work/point-break-surf`: short paragraphs, concrete numbers, direct
address, active voice, no AI-writing tells ("in today's fast-paced world," significance inflation, listicle
padding). The FAQ answers in particular read like someone who has actually had the underlying conversation with
a client ("If your current site needs work first, we'll tell you honestly before you spend a rand on clicks").

### 5. Keyword optimization outside the pill-badge pattern remains natural

No stuffing detected in body copy on any page checked this run — consistent with the July and August-16
findings.

### 6. AI citability continues to improve structurally

`CreativeWork` schema now present on all 3 case studies (was missing on the one case study in the prior audit —
resolved). `Service`/`FAQPage` schema continues to be deployed correctly. Outbound citations in articles are a
genuine, if small, additional AI-verifiability signal. The `goodground-site` case study's self-audit framing
("This case study exists because that audit found real issues, and this is the record of fixing them") is
itself a strong, quotable, checkable passage.

---

## What's already done well (carried forward and reconfirmed)

- No fabricated content anywhere, including under real temptation — extended this run to the industry-page
  placeholders and the two new case studies.
- Both described and undescribed remediation work verified live, not just claimed — word counts, duplicate-string
  removal, citations, and placeholder copy all checked directly against production HTML.
- The self-referential "GoodGround audits its own site" case study is a distinctive, hard-to-copy trust signal.
- Heading hierarchy and schema graph quality remain strong across the full 31-URL set checked this run.

---

## Recommended priority order

1. Remove or replace the keyword-tag pill badges on service/industry pages (Finding 1) — cheap, removes the only
   newly-introduced quality regression.
2. Off-site authority building (Finding 2) — directory listings, press, backlinks. Not a content-writing task,
   but the score ceiling until addressed.
3. Expand `/about` opportunistically once there's more concrete track record to add (Finding 3) — low urgency.
