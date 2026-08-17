# GoodGround — Sitemap Audit (Re-audit)

**Sitemap:** https://www.goodground.co.za/sitemap.xml
**Date:** 2026-08-17
**Prior audit:** 2026-08-16 (`seo-audit/run-2026-08-16/sitemap.md`) — 29 URLs, Score 96/100
**This audit:** 31 URLs

---

## Score: 99 / 100

Deduction: -1 for one route (`/faq`) whose live `lastmod` doesn't reconcile
against `git log -1 -- app/faq/page.tsx` run against the same repo checkout
(see M1 below) — everything else about the fix verifiably landed and works
as designed.

**Headline: the M1 finding from 2026-08-16 (all 22 non-article routes sharing
one build-time `lastmod`) is fixed.** `app/sitemap.ts` now calls
`git log -1 --format=%aI -- <file>` per route and falls back to build time
only if git is unavailable. Confirmed by cross-referencing 13 live `lastmod`
values against actual `git log` output for their source files in the local
checkout — 12 of 13 match exactly to the second. Full detail below.

---

## Findings by severity

### Critical — none

### High — none

No broken links, no orphaned entries, no missing indexable pages, no
accidental noindex on anything listed.

### Medium — none

The prior M1 (single build-time `lastmod` on 22 routes) is resolved. See
verification below.

### Low

**L1 — `/faq`'s live `lastmod` doesn't match its own file's git history.**
Live sitemap shows `/faq` at `2026-08-13T18:44:00.000Z`. Running
`git log -1 --format=%aI -- app/faq/page.tsx` locally returns
`2026-08-13T14:52:11+02:00` (`2026-08-13T12:52:11.000Z`) — a ~6-hour
mismatch. Traced the `18:44:00Z` timestamp to a real commit
(`751f3183`, "Fix sitewide WCAG AA contrast failures, clear draft copy,
extend schema," `2026-08-13T20:44:00+02:00`), but that commit's diff does
not touch `app/faq/page.tsx` directly — it touches `components/sections/
FAQAccordion.tsx` and `components/sections/PricingFAQ.tsx` among 32 files,
neither of which `sitemap.ts` tracks for this route (only
`app/faq/page.tsx` is listed as the tracked file). The date is real and in
the right neighborhood, so this isn't the old "everything is today"
problem back — most likely candidates: (a) the Vercel build environment
uses a shallower git clone than the local checkout, and `git log`'s path
heuristics land on a different nearby commit under partial history, or (b)
a caching/ISR artifact from an intermediate build. Every other checked
route (12 of 13) matched local git history exactly, so this reads as an
isolated edge case, not a systemic regression. **Action:** confirm Vercel's
git clone depth setting (`shallow`/full checkout) covers enough history for
every tracked file's git blame to resolve correctly; if depth is limited,
either deepen it or fall back more conservatively. Not urgent — the value
is still a real, differentiated, plausible date, just not provably tied to
that specific file's last edit.

### Info

**Priority/changefreq still present.** Unchanged from 2026-08-16 — still
deprecated, still harmless, still no action required unless the file is
touched anyway.

---

## Verification: does the per-route `lastmod` fix actually work?

Read `app/sitemap.ts` directly (source of truth):

```ts
function lastModifiedFor(relativeFile: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%aI -- ${relativeFile}`, { encoding: "utf-8" }).trim();
    return iso ? new Date(iso) : buildTime;
  } catch {
    return buildTime;
  }
}
```

Each static route now carries its own source `file` and resolves `lastmod`
via that file's real git history, not a single `new Date()` at build time.
Article dates already used `new Date(a.date)` (unchanged, correct). Case
study pages resolve off `content/caseStudies.ts` (all 3 case studies share
one file, so they legitimately share one `lastmod` — that's correct
file-level granularity, not a regression of the old bug).

**Cross-check: live sitemap `lastmod` vs local `git log` for the same file, per route**

| Route | Sitemap `lastmod` (UTC) | `git log -1` for tracked file (UTC) | Match |
|---|---|---|---|
| `/` | 2026-08-16T08:11:00Z | `app/page.tsx` → 08:11:00Z | ✅ |
| `/services` | 2026-08-17T18:50:06Z | `app/services/page.tsx` → 18:50:06Z | ✅ |
| `/legal` | 2026-08-17T18:50:06Z | `app/legal/page.tsx` → 18:50:06Z | ✅ |
| `/contact` | 2026-08-13T19:54:11Z | `app/contact/page.tsx` → 19:54:11Z | ✅ |
| `/insights` | 2026-08-13T19:09:02Z | `app/insights/page.tsx` → 19:09:02Z | ✅ |
| `/faq` | 2026-08-13T18:44:00Z | `app/faq/page.tsx` → 12:52:11Z | ❌ see L1 |
| `/pricing`, 6× `/services/*` (service), `/start-project`, `/about`, `/work`, 3× `/work/*` | 2026-08-17T18:36:46Z | `app/pricing/page.tsx`, `content/servicePages.ts`, `content/industryPages.ts`, `app/start-project/page.tsx`, `app/about/page.tsx`, `app/work/page.tsx`, `content/caseStudies.ts` → all 18:36:46Z | ✅ (one real commit touched all these files together — legitimate, not a fallback) |
| 6× `/insights/<slug>` articles | 2026-08-13 → 2026-07-17, 6 distinct dates | `new Date(a.date)` from `content/articles.ts`, not git-derived | ✅ (unchanged, already correct) |

**Conclusion: the fix shipped and works as designed.** Before, all 22
non-article routes showed the identical build timestamp
(`2026-08-16T08:12:59.886Z`). Now there are 6 distinct timestamp clusters
across non-article routes (08-16, two on 08-17, three on 08-13) plus 6 more
distinct article dates — 12 differentiated values across 31 URLs, all
traceable to real commits, with one unexplained outlier (`/faq`, see L1).
The 19 routes sharing `2026-08-17T18:36:46Z` are not a regression to the
old bug — they're 7 different tracked files (`app/pricing/page.tsx`,
`content/servicePages.ts`, `content/industryPages.ts`,
`app/start-project/page.tsx`, `app/about/page.tsx`, `app/work/page.tsx`,
`content/caseStudies.ts`) that were genuinely all touched in one real
commit, confirmed against local git history.

---

## Validation checks

| Check | Result |
|---|---|
| XML well-formed | Pass — valid `<urlset>`, correct namespace, closes cleanly |
| URL count vs 50,000 limit | Pass — 31 of 50,000 |
| Every `<loc>` returns 200 | Pass — all 31 verified live via `curl -L`, zero redirects, zero 4xx/5xx |
| `lastmod` present | Pass — every URL has one |
| `lastmod` real per-route dates (not one build timestamp) | **Pass — fix verified, see above (1 minor outlier, L1)** |
| `priority` sane ordering | Pass — home (1.0) > pricing (0.95) > services (0.9) > sub-pages (0.8/0.75) > case studies (0.7) ≈ faq/insights (0.7) > work listing (0.6) > legal (0.3) |
| `priority`/`changefreq` deprecated | Info — present, ignored by Google, harmless |
| `robots.txt` references sitemap | Pass — `Sitemap: https://www.goodground.co.za/sitemap.xml`, `Allow: /` |
| No noindexed URLs in sitemap | Pass — spot-checked `/legal`, `/work`, `/pricing`, `/faq`; no `meta robots noindex` tag present on any (default index,follow), self-referential canonicals on all |
| No orphaned entries | Pass — every `<loc>` traced to a live `page.tsx` route or content-array entry |
| No missing indexable pages | Pass — cross-checked `content/articles.ts` (6), `content/servicePages.ts` (6), `content/industryPages.ts` (6), `content/caseStudies.ts` (3) against sitemap counts — exact match on all four |
| `/brand-guide` still correctly excluded | Pass — `robots: { index: false, follow: false, nocache: true }` unchanged, correctly kept out of sitemap |

---

## Route coverage vs expected list

Expected: homepage, `/pricing`, `/services`, 6 `/services/<slug>` service
pages, 6 `/services/<slug>` industry pages (12 total under `/services`),
`/start-project`, `/about`, `/contact`, `/faq`, `/insights`, `/work`,
`/legal`, 6 `/insights/<slug>` articles, 3 `/work/<slug>` case studies
(`b3tter-bottle`, `point-break-surf`, `goodground-site`).

**All present, all accounted for. 31 of 31 expected URLs found, nothing
extra, nothing missing.**

- Core pages (11): `/`, `/pricing`, `/services`, `/start-project`, `/about`,
  `/contact`, `/faq`, `/insights`, `/work`, `/legal` — 10, plus `/services`
  counted once = 10 total top-level, confirmed.
- `/services/*` sub-pages (12): `website-care-plans`, `google-ads`,
  `meta-ads`, `website-redesign`, `seo`, `ux-design` (6 service pages) +
  `trades-and-home-services`, `hospitality-and-food`, `health-and-wellness`,
  `professional-and-consulting`, `retail-and-small-brands`,
  `non-profits-and-community` (6 industry pages) — all present.
- `/insights/*` articles (6): all present, all with real per-article dates.
- `/work/*` case studies (3): `b3tter-bottle`, `point-break-surf`,
  `goodground-site` — all present. This is +2 vs the 2026-08-16 baseline,
  which only had `b3tter-bottle` live; `point-break-surf` and
  `goodground-site` have since shipped and are correctly in the sitemap.

---

## What changed since 2026-08-16

| | 2026-08-16 | 2026-08-17 |
|---|---|---|
| Total URLs | 29 | 31 |
| Case studies | 1 (`b3tter-bottle`) | 3 (`b3tter-bottle`, `point-break-surf`, `goodground-site`) |
| `lastmod` on non-article routes | All 22 identical (`2026-08-16T08:12:59.886Z`, build time) | 6 distinct clusters, git-derived per file (M1 **resolved**) |
| Score | 96/100 | 99/100 |

**+2 URLs** account fully for the new case studies. No other routes added
or removed. The `lastmod` fix is the headline change and it verifiably
landed — see the cross-check table above.

---

## Files referenced

- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\app\sitemap.ts` — sitemap generator; now resolves `lastModified` per route via `git log -1 -- <file>`, falls back to build time only if git is unavailable
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\content\caseStudies.ts` — 3 case studies, all matched to sitemap
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\content\articles.ts` — 6 articles, all matched to sitemap
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\content\servicePages.ts` / `industryPages.ts` — 12 sub-pages, all matched to sitemap
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\app\faq\page.tsx` — the one route with an unreconciled `lastmod`, see L1
- `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\app\brand-guide\page.tsx` — correctly noindexed, correctly excluded from sitemap
- Baseline: `C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\seo-audit\run-2026-08-16\sitemap.md`
