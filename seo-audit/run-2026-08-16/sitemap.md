# GoodGround — Sitemap Audit

**Sitemap:** https://www.goodground.co.za/sitemap.xml
**Date:** 2026-08-16
**Prior audit:** 2026-07-20 (`seo-audit/FULL-AUDIT-REPORT.md`, `seo-audit/ACTION-PLAN.md`) — 9 URLs
**This audit:** 29 URLs

---

## Score: 96 / 100

Deductions: -3 for build-time `lastModified` on all 22 non-article routes (not
a real per-page edit date), -1 for `/legal` still carrying a priority value
above what a low-value legal page merits (cosmetic, Google ignores it, but
worth cleaning for hygiene). No critical or high-severity findings.

---

## Findings by severity

### Critical — none

### High — none

No broken links, no orphaned entries, no missing indexable pages, no
accidental noindex on anything listed.

### Medium

**M1 — All 22 non-article URLs share one build-time `lastmod`, not a real
content-edit date.**
`app/sitemap.ts` sets `lastModified: new Date()` at build time for every
static route (home, pricing, services + all 12 service/industry pages,
start-project, about, contact, faq, insights listing, work, legal, and the
case-study detail page). Every one of those currently reads
`2026-08-16T08:12:59.886Z` — the moment of the last deploy, not the moment
each page's content last changed. This isn't wrong exactly (Google does treat
this as a legitimate "last generated" signal and it will genuinely update on
your next deploy), but it means `lastmod` currently carries no differentiating
information: a typo fix to `/faq` and a full content rewrite of `/pricing`
would both show the identical timestamp. The 6 article pages already do this
correctly (`new Date(a.date)`, pulled from real publish dates in
`content/articles.ts`) — worth doing the same for at least `/pricing`,
`/services`, and the case study page, since those are the ones most likely to
change meaningfully between deploys.

### Low

**L1 — `priority` and `changefreq` are present but both deprecated.**
Google has publicly ignored both fields for years; Bing gives `priority`
minimal weight at best. They're harmless clutter, not an error. No action
required, but if the file is touched again, they can be stripped without any
SEO impact — see the Info row below for the tradeoff.

**L2 — `/legal` priority (0.3) is sane but its presence in the sitemap at all
is worth a second look.** See "Should `/legal` be in the sitemap?" below —
kept as Low because current behavior isn't harmful, just discretionary.

### Info

**Should priority/changefreq be removed?** Not urgent either way. Removing
them shrinks the file slightly and matches current best practice (`sitemaps.org`
still permits them, Google's own docs say they're disregarded). Keeping them
costs nothing. No score impact either direction — flagged for awareness only,
per the standard "Info" severity for this check.

---

## Validation checks

| Check | Result |
|---|---|
| XML well-formed | Pass — valid `<urlset>`, correct namespace, closes cleanly |
| URL count vs 50,000 limit | Pass — 29 of 50,000 |
| Every `<loc>` returns 200 | Pass — all 29 verified live, zero redirects, zero 4xx/5xx |
| No 3xx in chain | Pass — `curl -L` confirms final URL matches submitted URL on every entry |
| `lastmod` present | Pass — every URL has one |
| `lastmod` plausible/differentiated | Partial — see M1 |
| `priority` sane ordering | Pass — home (1.0) > pricing (0.95) > services (0.9) > sub-pages (0.8/0.75) > case study (0.7) ≈ faq/insights (0.7) > work listing (0.6) > legal (0.3). Logical hierarchy, no inversions |
| `priority`/`changefreq` deprecated | Info — present, ignored by Google, harmless (L1) |
| robots.txt references sitemap | Pass — `Sitemap: https://www.goodground.co.za/sitemap.xml` present, `Allow: /` |
| No noindexed URLs in sitemap | Pass — spot-checked `/legal`, `/`, `/work`, `/pricing`; all `index, follow`, all self-canonical, no conflicts |
| No orphaned entries (removed pages still listed) | Pass — every `<loc>` traced to a live `page.tsx` route |
| No missing indexable pages | Pass — cross-checked `app/**/page.tsx` (26 route files), `content/articles.ts` (6), `content/servicePages.ts` (6), `content/industryPages.ts` (6), `content/caseStudies.ts` (1), and both nav configs (`navLinks`, `footerLinks`, `legalLinks` in `content/site.ts`) against the 29 sitemap entries. Full match — the only route not in the sitemap is `/brand-guide`, which is deliberately excluded (see below) |

---

## `/brand-guide` — correctly excluded, not a gap

`app/brand-guide/page.tsx` is a live route (200) but is not, and should not be,
in the sitemap. It's an internal design-reference page, explicitly marked
`robots: { index: false, follow: false, nocache: true }` in its own metadata,
with a code comment stating this is deliberate belt-and-suspenders (noindex
*and* sitemap omission, "since a stray internal/external link could still get
it crawled otherwise"). This is the correct pattern and needs no action.

---

## Should `/legal` be in the sitemap?

Kept in, and that's the right call here — this is not a generic doorway-style
legal page. `/legal` carries 1,143 words of substantive privacy-policy and
terms content (confirmed in the prior audit's word count), it's linked from
the footer on every page (`legalLinks` in `content/site.ts`), and it's already
correctly weighted at the bottom of the priority hierarchy (0.3, the lowest of
any URL in the file). A privacy policy and terms page is a legitimate,
low-but-nonzero-value page to have indexed — it supports E-E-A-T/trust
signals and answers a real, if rare, search query ("[business] privacy
policy"). The alternative (excluding it) would only be worth doing if it were
thin, duplicated boilerplate — it isn't. No change recommended.

## Is `/work/b3tter-bottle` appropriately prioritized against `/pricing`?

Yes. `/pricing` sits at 0.95 (second only to the homepage) and
`/work/b3tter-bottle` sits at 0.7, below the core commercial pages
(`/start-project`, `/about`, `/contact`, `/services` sub-pages all at 0.75–0.8)
but above the `/work` listing page itself (0.6) and the blog articles (0.6).
That ordering is correct: `/pricing` is the page that actually converts a
visitor into a lead, so it should outrank every other non-homepage page on the
site, and it does. The case study is proof-of-craft content that supports the
sale rather than closing it, so a mid-tier priority below the direct
commercial pages but above the listing page that merely links to it is the
right position. No change recommended, though as a reminder: this ordering is
a courtesy signal to crawlers at best (deprecated field, see L1) — it's not
what's actually determining ranking.

## Is `/work` (the listing page) still sensible to have indexed?

**Yes, and this closes out the open item from the prior audit.** The
2026-07-20 action plan's item 3 said: *"publish one real case study OR remove
`/work` from the sitemap."* That's now done — `/work/b3tter-bottle` exists,
is in the sitemap, and carries 805 words of substantive, independently
verifiable content (Lighthouse scores, payload sizes, request counts, all
with a "verify" instruction pointing at the live URL). It is honestly labeled
`kind: "concept"` rather than dressed up as a client engagement, which keeps
it clear of any misrepresentation risk.

The `/work` listing page itself is still short (159 words — nearly identical
to its 154-word count on 2026-07-20), but that's expected and fine for a
listing/index page whose job is to introduce and link to the real content
sitting one level down, not to duplicate it. This is a materially different
situation from three weeks ago, when `/work` was a 154-word page pointing at
nothing. Keep as-is; no further action needed unless a second case study is
still pending founder sign-off, in which case adding it will only strengthen
the page further.

---

## What changed since 2026-07-20

| | 2026-07-20 | 2026-08-16 |
|---|---|---|
| Total URLs | 9 | 29 |
| Service sub-pages | 0 (only `/services` listing) | 6 (`website-care-plans`, `google-ads`, `meta-ads`, `website-redesign`, `seo`, `ux-design`) |
| Industry pages | 0 | 6 (`trades-and-home-services`, `hospitality-and-food`, `health-and-wellness`, `professional-and-consulting`, `retail-and-small-brands`, `non-profits-and-community`) |
| `/pricing` | Not present | Added, priority 0.95 |
| `/faq` | Not present | Added, priority 0.7 |
| Articles | 1 | 6 |
| Case studies | 0 (`/work` was a placeholder, action-plan item 3 open) | 1 (`/work/b3tter-bottle`, 805 words, real measured content) |
| `/legal` | Present | Present, unchanged |

**Growth fully reflected, no gaps.** Every one of the 20 new URLs traces to a
live, 200-status, indexable page, and every content-source file that could
plausibly hold an un-sitemapped page (`app/**/page.tsx`, `content/articles.ts`,
`content/servicePages.ts`, `content/industryPages.ts`, `content/caseStudies.ts`,
`content/site.ts` nav/footer configs) was cross-checked line by line against
the sitemap. The 9→29 jump accounts for: 6 service sub-pages, 6 industry
pages, `/pricing`, `/faq`, 5 additional articles, and the case study detail
page — that's 20 additions, matching 9 + 20 = 29 exactly. The only route that
exists outside the sitemap (`/brand-guide`) is intentionally excluded and
correctly noindexed, not a gap.

**Prior action-plan item 3 (`/work`) is resolved.** A real case study now
exists, is live, is in the sitemap at a sensible priority, and is honestly
labeled as a concept build rather than a fabricated client win. No further
action required on this item.

---

## Files referenced

- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\app\sitemap.ts` — sitemap generator, source of the `lastmod`/priority pattern flagged in M1
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\content\caseStudies.ts` — the single, real, honestly-labeled case study
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\content\articles.ts` — 6 articles, all matched to sitemap
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\content\servicePages.ts` / `industryPages.ts` — 12 sub-pages, all matched to sitemap
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\content\site.ts` — nav/footer link configs, cross-checked for orphans
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\app\brand-guide\page.tsx` — correctly noindexed, correctly excluded from sitemap
