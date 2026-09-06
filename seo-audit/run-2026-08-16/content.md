# GoodGround — Content Quality / E-E-A-T Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Compared against:** `seo-audit/FULL-AUDIT-REPORT.md` (2026-07-20), which scored Content Quality 68/100
**Pages read live for this run:** `/`, `/about`, `/work`, `/work/b3tter-bottle`, `/insights`, `/faq`, `/pricing`, `/legal`,
6 `/services/[slug]` pages (website-care-plans, google-ads, meta-ads, website-redesign, seo, ux-design),
6 `/services/[industry]` pages (trades-and-home-services, hospitality-and-food, health-and-wellness,
professional-and-consulting, retail-and-small-brands, non-profits-and-community), and all 6 `/insights/[slug]`
articles. 28 URLs total, fetched directly from production and parsed for body text, word counts, JSON-LD, and
internal link patterns.

Note on scope: the brief referenced "9 industry pages" — the live site currently has **6**, not 9. Total page count
has grown from 9 (2026-07-20) to 28 (2026-08-16): 5 new service pages, 6 new industry pages, 5 new articles,
`/pricing`, `/faq`, and the `/work/b3tter-bottle` case study.

---

## Score: 79 / 100

Up from 68/100. The case study is a genuine, well-executed fix for the single biggest defect in the prior audit.
It's held below 85+ by one new, self-inflicted issue that didn't exist in July because the site was too small
to have it: heavy verbatim duplication of the service-description blocks across the homepage, `/services`, and
every industry page.

| Sub-factor | 2026-07-20 | 2026-08-16 | Notes |
|---|---|---|---|
| Experience | Weak | Strong | Real, verifiable case study with checkable claims |
| Expertise | Moderate | Moderate-strong | 6 substantive articles, specific pricing knowledge, technical case study detail |
| Authoritativeness | Weak | Weak | Still zero external citations, zero third-party mentions (expected for a young site) |
| Trustworthiness | Moderate-strong | Strong | Honest framing throughout — "concept build," no fabricated metrics, transparent pricing |
| Thin content | `/work` at 154 words | Fixed via case study; templated pages introduce a new near-duplicate risk | See findings below |
| AI citability | Good structurally, weak on authority | Good, and one page (case study) is excellent | See AI-readiness section |

---

## What changed since 2026-07-20

**Yes, `/work` moving from placeholder to real case study meaningfully improved the score — this is the standout
fix.** `/work/b3tter-bottle` (776 words) is the strongest single page on the site from an E-E-A-T standpoint. It:

- States plainly, twice, that it's a concept build with no client and no business-outcome data ("These are
  build-quality measurements, not business outcomes... we are not going to invent any"). This is exactly the
  right call under the no-fabrication rule and is a genuine trust signal — most agency "case studies" invent or
  imply results, this one explicitly refuses to.
- Uses only verifiable, checkable numbers: Lighthouse Accessibility 100, Lighthouse Best Practices 100,
  56 MB → 1.5 MB photography payload, 0 third-party requests, 0 console errors — and tells the reader exactly
  how to verify each one themselves ("Run Lighthouse against the live URL," "Open the Network panel and filter
  by domain"). This is a first-hand experience signal done properly: specific, falsifiable, and it invites
  scrutiny rather than asking for trust on faith.
- Demonstrates real technical expertise in the writeup itself (explains *why* a monochrome interface makes a
  colourway range read as a range, *why* uniform card grids are a template default to avoid, the actual
  before/after asset numbers) — this is the opposite of generic AI filler; it's specific and opinionated.

This is a template other future case studies should follow once real client work exists, and it should raise
confidence that when a paying-client case study is added, it'll be handled with the same discipline.

**Also new since July:** 5 more articles (now 6, up from 1), `/pricing` with a working cost breakdown, `/faq`,
5 new standalone service pages, and 6 industry landing pages. This is a large volume increase and most of it is
handled well — but see Finding 1 below, because the industry-page expansion is also where the new problem lives.

**Unchanged from July, still open:**
- Zero outbound citations anywhere on the site, including all 6 articles (confirmed again this run — grepped
  every article for external `href`s; only match on any page is a Facebook share link, not a citation).
- Article `author` is still `{"@type":"Organization","name":"GoodGround"}` in `BlogPosting` schema, not a
  `Person`. Per the standing founder decision (About page deliberately describes the founder by experience,
  not name), this is correctly **not** treated as a defect here — noted only because it's still the status quo,
  not because it should change.

---

## Critical findings

None. Nothing on the site is broken, misleading, or fabricated. The no-fabrication discipline is holding up
under real scrutiny (see the case study review above).

---

## High findings

### 1. Verbatim duplicate content across the homepage, `/services`, and all 6 industry pages

**Severity: High. Affects `/`, `/services`, and all 6 `/services/[industry]` pages — 8 URLs.**

The "problem / approach / outcome" description block for each core service (Website Development, UX & Design,
SEO Foundations, Website Care Plans, Google Ads, Meta Ads) is copied **word-for-word, including punctuation**,
across every page that references that service. Example — the Website Development block below appears
identically on `/`, `/services`, and all 6 industry pages checked:

> "The problem: Most business websites are built fast and then left alone. They get slow and outdated, and they
> quietly cost you customers every month they stay that way. Our approach: We design and build custom websites
> from the ground up..."

Each industry page pulls 3-4 of these ~100-150-word blocks depending on which services are marked relevant to
that industry. Concretely: of an 800-950 word industry page, roughly 350-500 words (35-55%) is byte-identical
text shared with at least 7 other URLs. Verified directly against `/services/health-and-wellness`,
`/services/non-profits-and-community`, `/services/trades-and-home-services`, `/services/hospitality-and-food`,
`/services/retail-and-small-brands`, `/services/professional-and-consulting`, `/services`, and `/`.

**What's genuinely unique per industry page and works well:** the three numbered pain-point statements at the
top (specific, not spun — e.g. "Word of mouth got you this far, but it doesn't show up in a Google search" for
trades vs. "A visitor who's ready to donate or volunteer needs that path in front of them immediately" for
non-profits), and the 3-4 question FAQ block at the bottom, which is genuinely tailored per audience (POPIA
question on the health page, donation-platform question on the non-profit page, payment-gateway question on
retail). This is real differentiation and it's the reason these pages read as intentional landing pages rather
than spun content when read by a human.

**Why it's a problem anyway.** Google's Quality Rater Guidelines and the (now core-merged) Helpful Content
system evaluate whether a page adds enough unique value to justify existing as its own indexed URL. Right now,
a crawler comparing `/services/hospitality-and-food` and `/services/professional-and-consulting` will find over
a third of the body text is identical. That's a real signature of templated/programmatic content, even though
the framing paragraphs and FAQs genuinely differ. It also directly creates the keyword cannibalization risk
below, and it means an AI engine summarizing "what does GoodGround's website-care-plan actually include" will
find the identical answer duplicated across 8 different URLs with no signal for which one is canonical for that
question.

**Fix, in order of effort:** (a) cheapest — vary the wording of each service block per surface it appears on
(homepage version, `/services` version, and 1-2 rotating variants for industry pages), even light rewriting
breaks exact-match duplication; (b) better — on industry pages, replace the generic block with 1-2 sentences of
industry-specific framing before linking out to the full service page rather than reproducing the whole block;
(c) also add `rel="canonical"` awareness isn't the fix here since these are legitimately different pages with
different H1/title — the fix is content, not canonicalization.

### 2. Keyword cannibalization risk between `/`, `/services`, and `/services/[slug]`

**Severity: High risk if it compounds, currently Medium in practice.**

Because the identical service blocks live on the homepage, the `/services` hub, and (in condensed form) the
individual `/services/[slug]` pages, all three are making a similar pitch for similar terms ("website
development South Africa," "SEO for small business South Africa"). Title tags and H1s are meaningfully
differentiated (`/` = "Website Development in South Africa," `/services/seo` = "SEO Services for Small
Business," `/services` = "Website Development Services in South Africa"), which is the main thing protecting
against outright cannibalization — but the near-identical body copy narrows that protection. If two pages target
overlapping queries with overlapping body text, Google tends to pick one and suppress the other's visibility for
that query, which wastes the crawl and link equity spent on the suppressed page.

This is not yet acute (titles are distinct enough) but it will get worse, not better, as more industry pages are
added using the same block pattern. Worth fixing at the same time as Finding 1.

---

## Medium findings

### 3. Service pages are thin against the 800-word service-page floor

**Severity: Medium.** `/services/google-ads` (476 words), `/services/meta-ads` (458), `/services/ux-design`
(495), `/services/website-redesign` (485), `/services/seo` (516), `/services/website-care-plans` (529) all fall
below the 800-word service-page floor. Per the note in the scoring rubric, word count is not itself a ranking
factor — the real question is topical coverage — and these pages do cover their topic (problem statements,
what's included, FAQ, pricing pointer) without padding. `/services/seo` and `/services/website-care-plans` are
the best of the six: each has a genuinely distinct "what's included" bullet list not reused elsewhere. But
`/services/google-ads`, `/services/meta-ads`, and `/services/ux-design` lean heavily on the same growth-section
copy that also appears on `/services` verbatim (see Finding 1's pattern extending here too), so their unique
contribution is thinner than the word count alone suggests. Recommend adding one genuinely unique
section per service page — a worked pricing example, a common mistake, or a "how we measure this" explainer —
rather than raising word count for its own sake.

### 4. `/work` index page still thin in isolation

**Severity: Medium, down from the prior "genuinely thin, placeholder" finding.** The `/work` index itself is
130 words. That's appropriate for an index page linking to one case study — it isn't trying to be a landing
page, it's a gateway, and its copy is honest about scope ("Where a project was a concept build rather than
client work, it says so at the top"). The one inconsistency worth a look: the index copy says "Every case study
**here** ends in numbers" (plural framing) while there is currently exactly one. Minor, but reads slightly
ahead of the site's actual content — worth revisiting once a second case study exists, or softening to singular
in the meantime.

### 5. Zero outbound citations, still, across all 6 articles

**Severity: Medium**, unchanged from July's finding, now compounding across 6x the article content.
`/insights/how-much-does-a-website-cost-in-south-africa` makes specific, checkable claims (Wix/Squarespace
pricing tiers, hosting cost ranges, domain pricing) that would be strengthened by even one or two outbound
citations — a provider's own pricing page, ZADNA's `.co.za` domain pricing, or POPIA text where compliance is
mentioned on the health-and-wellness FAQ. This is a recognized E-E-A-T signal and helps AI engines verify
claims rather than take them on the site's word alone. Costs little, and the site has now published enough
factual/numeric claims across 6 articles that it's worth doing as a batch rather than one at a time.

### 6. `/work/b3tter-bottle` has no `Article`/`CreativeWork` schema

**Severity: Low-medium.** The page carries only `BreadcrumbList` — no structured markup describing it as a case
study or creative work, despite being the single most citation-worthy page on the site (specific, verifiable
stats an AI engine could lift directly). Adding `CreativeWork` or a lightweight custom type with the key stats
as structured properties would make those numbers more reliably extractable than plain-text scraping.

---

## Low findings

### 7. Readability is consistently good across the new content

Spot-checked `/insights/how-much-does-a-website-cost-in-south-africa` (1,799 words) and the case study (776
words): short paragraphs, concrete numbers instead of vague claims, direct address ("you"), minimal jargon,
active voice. No AI-writing tells detected — no "in today's fast-paced world," no significance inflation, no
listicle padding. The pricing article in particular reads like someone who actually prices these jobs wrote it
("A R12,000 quote and a R25,000 quote for what looks like the same project usually aren't quoting the same
project at all" is a specific, opinionated sentence a template generator wouldn't produce).

### 8. Keyword optimization reads natural, not stuffed, on every page checked

No keyword stuffing detected anywhere in this run. Industry pages use the target term ("website design for
electricians," "ecommerce website design for small brands") once in the H1/intro and let natural variation
carry the rest of the page. This is good practice and unchanged from July.

### 9. AI citability: Service and FAQPage schema now deployed on service/industry pages — a real improvement

**Severity: informational, this is a strength, not a defect.** Since July, `Service` schema (item 13 from the
prior action plan) is now live on service and industry pages, and `FAQPage` schema is now present on `/faq`,
`/pricing`, and every service/industry page checked, each with genuinely answered (not stubbed) Q&A pairs. This
gives AI engines and featured-snippet extraction clean, pre-formatted passages — e.g. the SEO page's "What's the
difference between SEO foundations and Advanced SEO?" answer is a self-contained, quotable, accurate answer.
Combined with the case study's checkable-stat format, this is genuinely strong AI-citation structure; the
limiting factor for AI visibility remains off-site authority (brand mentions, directory listings), not
structure, consistent with the July finding.

---

## What's already done well (carried forward and reconfirmed)

- No fabricated content anywhere, including under real temptation (the case study could have implied business
  results and didn't).
- Heading hierarchy and schema graph quality remain strong across the expanded page set.
- The pricing article is a genuinely useful, specific, checkable reference — exactly the kind of page that earns
  organic links and AI citations once authority catches up.
- Industry-page FAQs and pain-point framing are honestly differentiated per audience, not spun — this is the
  right instinct, it just needs to extend into the shared service blocks too.

---

## Recommended priority order

1. De-duplicate the service description blocks across `/`, `/services`, and the 6 industry pages (Finding 1) —
   highest leverage, addresses both the content-quality and cannibalization risk at once.
2. Add outbound citations to the 6 articles as a batch (Finding 5) — cheap, compounds now that there's 6x the
   article surface area to benefit from it.
3. Add `CreativeWork`/case-study schema to `/work/b3tter-bottle` (Finding 6) — cheap, strengthens the site's best
   AI-citability asset.
4. Add one unique section per thin service page (Finding 3) — lower urgency, do opportunistically.
5. Revisit the `/work` index's plural "case studies" framing once a second case study exists, or soften it now
   (Finding 4) — trivial, do whenever convenient.
