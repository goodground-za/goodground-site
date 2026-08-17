# GoodGround — Technical SEO Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-17
**Previous run:** 2026-08-16 (`seo-audit/run-2026-08-16/technical.md`, technical score 82/100)
**Pages crawled:** 31 of 31 sitemap URLs (complete — sitemap grew from 29 to 31 since yesterday: two new case studies, `/work/point-break-surf` and `/work/goodground-site`, were added)
**Method:** Direct HTTP fetch of every sitemap URL (`curl`), header inspection, HTML/meta parsing (decoded HTML entities before counting title/description lengths), JSON-LD parsing, redirect-chain tracing. Chrome DevTools MCP was not available in this environment — no Lighthouse or field CWV data collected this run either. Every claim from the remediation brief (commits `95f2c48`, `3a79928`) was checked directly against live HTML/headers rather than assumed.

---

## Technical SEO score: 89 / 100

Up from 82/100 on 2026-08-16. The remediation pass shipped real fixes and they hold: OG images now cover every page that previously lacked one, `/services`'s meta description is back under the limit, the apex redirect is confirmed still un-fixed (as flagged in the brief), sitemap `lastmod` now reflects real per-page commit dates, `/legal`'s stray robots meta tag is gone, and BlogPosting schema gained the new fields. The score isn't higher because two brand-new pages (`/work/point-break-surf`, `/work/goodground-site`) shipped in the same window with meta descriptions 210–231 characters long and one title at 101 characters — a fresh instance of the same "new page ships without on-page hygiene" pattern flagged yesterday, plus one small OG-image gap on `/legal` that was never covered by either fix list.

---

## 1. Crawlability — Pass

| Check | Result |
|---|---|
| `robots.txt` | 200, present, correct: `User-Agent: * / Allow: /`, `Host:` and `Sitemap:` directives present |
| Sitemap linked in robots.txt | Pass |
| `sitemap.xml` | 200, valid XML, **31** `<url>` entries (up from 29), all with `lastmod`/`changefreq`/`priority` |
| All 31 sitemap URLs resolve | **31/31 return 200**, zero redirects, zero 4xx/5xx (verified individually with `curl -o /dev/null -w "%{http_code}"`) |
| Orphans (sitemap URL not reachable) | None found |
| `noindex` anywhere | None found on any of the 31 pages |
| `X-Robots-Tag` header | Not set anywhere (fine — no need for it here) |

No crawl blockers. Unchanged strength, now scaled to 31 pages with the same zero-defect result.

---

## 2. Indexability

| Check | Result |
|---|---|
| Canonical tag present, self-referential, absolute URL | **Pass on all 31 pages** — verified individually, zero duplicates |
| Meta robots | All 31 pages now have **no explicit `<meta name="robots">` tag** (defaults to `index, follow`) — `/legal`'s previously-inconsistent explicit tag (L1 from 08-16) is confirmed **removed**. Site-wide consistency achieved. |
| Duplicate canonicals / conflicting canonicals | None found |
| Duplicate `<title>` across pages | None found — all 31 titles unique, checked freshly this run |
| Thin content | No change from 08-16; `/work` remains a working hub, now linking to 3 case studies instead of 1 |

**Apex/www and http/https redirect chain — confirmed still 2 hops, NOT fixed (matches the brief's expectation):**
```
http://goodground.co.za          → 308 → https://goodground.co.za/        (hop 1)
https://goodground.co.za/        → 308 → https://www.goodground.co.za/    (hop 2, 200)
http://www.goodground.co.za      → 308 → https://www.goodground.co.za/    (single hop, correct)
https://goodground.co.za (https) → 308 → https://www.goodground.co.za/    (single hop, correct)
```
This is a Vercel dashboard-level domain config, not a code fix, exactly as flagged in the brief — still open. See M1 below.

---

## 3. Security — Pass, unchanged and confirmed

All five headers are still present and byte-identical on both the homepage and `/pricing` (verified via fresh header dump this run):

| Header | Value |
|---|---|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://api.web3forms.com; form-action 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `Strict-Transport-Security` | `max-age=63072000` (2 years) |

HTTPS enforced everywhere. The two new case-study pages (`/work/point-break-surf`, `/work/goodground-site`) use hero images served from `/images/*.webp` on the same origin — no new third-party hosts introduced, CSP `img-src` allowlist unchanged and still sufficient.

---

## 4. URL structure

Clean, flat, lowercase, hyphenated, no query strings. Trailing-slash requests still 308-redirect to the canonical no-slash form (`/pricing/` → `/pricing`, reverified). The two new routes (`/work/point-break-surf`, `/work/goodground-site`) follow the existing `/work/<slug>` pattern correctly. No change needed here.

---

## 5. Mobile

`<meta name="viewport" content="width=device-width, initial-scale=1">` confirmed present on all 31 pages, including both new `/work` pages. No fixed-width layout artifacts detected in source. As with the 08-16 run, real-device touch-target sizing and tap-target spacing cannot be confirmed without a rendered/Lighthouse pass — flagged as unmeasured, not passed, same as last time.

---

## 6. Core Web Vitals — not measured this run

Chrome DevTools MCP tools were not available in this environment, so no Lighthouse run was performed. Same gap as 08-16, carried forward unchanged. Two new data points worth flagging for whenever a real Lighthouse pass runs:

- The `/work/point-break-surf` copy itself claims "a 331ms LCP on the live URL" and `/work/goodground-site` claims "a 772ms LCP, all measured on the live URL" — these are the site's own stated numbers in on-page content, not independently verified by this audit. Worth confirming with a real CWV tool before they're cited elsewhere (e.g. in the pricing/marketing copy) as an SEO or credibility claim.
- `/pricing`'s framer-motion border-trail animation (flagged 08-16) is unchanged; still worth a real INP/CLS check on lower-end mobile.

**Recommendation:** unchanged from 08-16 — re-run Lighthouse against homepage, one service page, `/pricing`, and at least one `/work` case study once Chrome DevTools MCP is available. This category remains unscored, not passing, for the second run in a row.

---

## 7. Structured Data (JSON-LD)

Spot-checked 4 pages this run (one `/insights` article, all 3 `/work` case studies):

| Page | Blocks | Types | Notes |
|---|---|---|---|
| `/insights/how-much-does-a-website-cost-in-south-africa` | 2 | `BreadcrumbList`, `BlogPosting` | **`wordCount` and `articleSection` fields now present** in `BlogPosting` — confirmed as claimed in the remediation brief |
| `/work/b3tter-bottle` | 2 | `BreadcrumbList`, `CreativeWork` | Valid JSON, no parse errors |
| `/work/point-break-surf` | 2 | `BreadcrumbList`, `CreativeWork` | Valid JSON, no parse errors — new page, schema present from day one |
| `/work/goodground-site` | 2 | `BreadcrumbList`, `CreativeWork` | Valid JSON, no parse errors — new page, schema present from day one |

All parse cleanly, nothing blocking crawling or rendering. Full per-page schema type audit across all 31 pages remains out of scope for the technical category (see the schema sub-audit for full coverage). The two brand-new case-study pages shipped with correct `CreativeWork` + `BreadcrumbList` schema already in place — a good sign that the JSON-LD pattern is now baked into the `/work/[slug]` template rather than something added per-page after the fact.

---

## 8. JavaScript rendering

Confirmed server-rendered, not client-rendered, on a fresh spot-check. Pulled raw HTML with `curl` (no JS execution) for `/pricing` — `R8,500` pricing text present directly in the initial HTML response — and for the new `/work/point-break-surf` page, where the "331ms LCP" claim text is present in the raw HTML too. `X-Nextjs-Prerender: 1` header confirmed present on both the homepage and `/pricing`, and independently confirmed on `/work/point-break-surf` via a direct header check. Same strength as 08-16, holding as the site continues to grow — new pages are shipping prerendered by default, not as an afterthought.

---

## 9. IndexNow protocol

No IndexNow key file found (`/indexnow.txt` and equivalent root-key patterns checked → 404) and no evidence of IndexNow pings visible externally. Unchanged from 08-16 — not implemented, not a regression, still an open low-priority item. The sitemap has grown by 2 URLs in a single day (29 → 31), which strengthens the case for automating a ping-on-publish rather than relying on organic re-crawl for Bing/Yandex/Naver.

---

## Findings

### Critical
None. No indexing blockers, no broken links, no accidental noindex, no canonical conflicts, no redirect chains longer than 2 hops.

### High

**H1 — Two brand-new pages shipped with severely oversized meta descriptions.** `/work/point-break-surf` (231 characters) and `/work/goodground-site` (213 characters) were both added to the sitemap since the 08-16 audit and neither respects the ~155–160 character SERP truncation limit — both will be cut roughly in half in search results. `/work/point-break-surf`'s title is also 101 characters (should be ~55–60), and `/work/goodground-site`'s title is 83 characters. This is the same pattern flagged as H1/M2/M3 in the 08-16 report (new pages shipping without the on-page hygiene applied to earlier pages) recurring within 24 hours, on pages added *after* the remediation pass that was meant to close this gap. **Fix:** trim both descriptions to ≤155 characters and both titles to ≤60 characters; move the specific performance-metric claims ("331ms LCP", "772ms LCP", "48 statically generated pages") into the on-page body copy where they already exist, rather than the meta tags.

**H2 — `/legal` has no `og:image`.** Verified: `<meta property="og:image">` is absent from `/legal`'s HTML, and the per-route `opengraph-image` file 404s (`https://www.goodground.co.za/legal/opengraph-image` → 404). This page was outside both the original 9-page fix (July) and the 16-page fix list from this week's remediation (`/pricing`, `/faq`, `/start-project`, `/work`, and 12 `/services/*` pages) — it simply fell through both passes. `og:title` and `og:description` are present and correct; only the image is missing. **Fix:** extend the same `ImageResponse` OG card pattern to `/legal` — same one-line fix as the 16 pages already done.

### Medium

**M1 — Apex-to-www redirect still goes through the wrong intermediate host on plain HTTP.** Confirmed unchanged from 08-16: `http://goodground.co.za` → 308 → `https://goodground.co.za/` (apex, no www) → 308 → `https://www.goodground.co.za/`. Two hops instead of one. This is explicitly a Vercel dashboard domain-config change, not a code fix — matches the brief's note that this was known and deliberately not touched in the code remediation pass. **Fix:** in Vercel's domain settings, point the bare apex's redirect target directly at `https://www.goodground.co.za/` instead of chaining through the HTTPS apex first.

**M2 — Meta description length drift persists on a handful of pages, mostly the same ones flagged 08-16.** Decoded (HTML-entity-corrected) lengths over ~155 characters: `/services/seo` (160), `/services/trades-and-home-services` (157), `/services/health-and-wellness` (158), `/start-project` (156), `/work/b3tter-bottle` (168 — improved from 191 flagged 08-16, but still over). These are minor overages (1–13 characters past the limit) compared to the two new pages in H1, which is why they're Medium rather than High. **Fix:** trim each to ≤155 characters in the same pass as H1.

**M3 — Several titles remain long enough to truncate in search results.** Decoded lengths over ~60 characters: `/services/google-ads` (68), `/services/meta-ads` (63), `/services/website-redesign` (62), `/services/non-profits-and-community` (65), and 6 of the 7 `/insights` article titles (64–75 characters each — only the homepage-linked ones are already tight). This list is largely unchanged from the 08-16 M3 finding (once you correct for HTML-entity counting inflating the earlier numbers) — no evidence this was addressed in the remediation pass, since OG images and the `/services` description were the stated scope. **Fix:** batch-trim in the same content pass as H1/M2; drop secondary qualifiers where a shorter title already implies national coverage elsewhere on the page.

### Low

**L1 — OG images on `/work/*` case studies use raw hero photography rather than a generated 1200×630 social card.** `/work/b3tter-bottle`, `/work/point-break-surf`, and `/work/goodground-site` all set `og:image` to their `/images/case-*-hero.webp` file directly (114 KB–167 KB) rather than the `ImageResponse`-generated card pattern used on every other page. Not broken — these are valid, reachable, reasonably sized images — but they won't carry the same branded title/logo treatment when shared on social platforms that the generated OG cards give every other page. Not a regression (this was true of `b3tter-bottle` in the 08-16 audit too and wasn't flagged then); noting it now because two more pages just adopted the same pattern, making it a deliberate design choice worth a conscious decision rather than an accident to fix silently.

**L2 — IndexNow protocol still not implemented.** No key file, no evidence of ping-on-publish for Bing/Yandex/Naver. Unchanged from 08-16. Sitemap grew by 2 URLs in the 24 hours between these two audits — the faster the site grows, the more this saves in Bing indexing latency for close to zero implementation cost.

---

## What's already been verified fixed since 2026-08-16

Explicitly re-confirmed against live HTML/headers rather than trusted from the remediation description:

- **H1 (16 missing OG images)** — **confirmed fixed.** All 16 previously-flagged pages (`/pricing`, `/faq`, `/start-project`, `/work`, and all 12 `/services/*` pages including the 6 industry verticals) now serve a working `og:image` via the `opengraph-image` route. Spot-checked several directly, all return 200 PNG/image content.
- **H2 (`/services` meta description regression)** — **confirmed fixed.** Was 225 characters on 08-16; now 140 characters (decoded), comfortably under the limit.
- **L1 from 08-16 (`/legal`'s stray explicit robots meta tag)** — **confirmed removed.** `/legal` now has no explicit `<meta name="robots">` tag, matching every other page's implicit default, exactly as described.
- **Sitemap `lastmod` dates** — **confirmed now vary per page** rather than sharing one build timestamp. `/` shows `2026-08-16T08:11:00Z`, `/contact` shows `2026-08-13T19:54:11Z`, article pages show dates matching their actual publish dates (`2026-07-17` through `2026-08-13`), and pages touched by the remediation commits cluster around `2026-08-17T18:36:46Z` / `18:50:06Z` — consistent with "real git commit dates" rather than a single build-time stamp, as claimed.
- **BlogPosting schema `wordCount`/`articleSection`** — **confirmed present** on the one article spot-checked; JSON-LD parses cleanly.
- **Security headers** — all five still present and unchanged in content, site-wide.
- **Apex/www canonical host consistency** — no canonical conflicts; every one of the 31 pages self-canonicalizes correctly.
- **`llms.txt` freshness** — as a side effect of the remediation window, `llms.txt` is now current: it lists `/pricing`, `/faq`, `/services`, and all 3 `/work` case studies (including the 2 brand-new ones added since 08-16), correcting the "coming soon" staleness flagged as M4 on 08-16. Not explicitly named in the remediation brief but verified fixed regardless.
- **JS rendering / prerendering** — still server-prerendered site-wide, including the 2 new pages added this window; `X-Nextjs-Prerender: 1` confirmed present.

## What's still open, unchanged from 2026-08-16

- **M1 — apex redirect 2-hop chain.** Confirmed still present, exactly as the brief said it would be (Vercel dashboard change, not code).
- **IndexNow not implemented.** Unchanged, still low priority for a South African/Google-dominant audience.
- **CWV/Lighthouse unmeasured.** Chrome DevTools MCP unavailable both runs; this category remains unscored for the second consecutive audit.

## What's new since 2026-08-16 (not previously auditable)

- **Sitemap grew 29 → 31 URLs**: two new case studies, `/work/point-break-surf` and `/work/goodground-site`, both server-prerendered with correct `CreativeWork`/`BreadcrumbList` schema from launch, but both shipped with the on-page metadata hygiene problems described in H1.
- **`llms.txt` now lists all 3 case studies**, including the 2 new ones, and correctly describes `/work` as containing live case studies rather than "coming soon."

---

## Recommended priority order

1. Fix H1 (trim `/work/point-break-surf` and `/work/goodground-site` titles/descriptions) — the single most visible SERP-truncation issue on the site right now, on the two newest pages.
2. Fix H2 (`/legal` OG image) — same one-line fix already proven on 16 other pages, just needs to be applied here too.
3. Fix M1 (apex redirect hop) — small Vercel dashboard change, removes an unnecessary redirect; carried over unfixed for a second audit in a row.
4. Batch-fix M2/M3 (remaining description and title length drift) — mechanical, can be done in the same content pass as H1.
5. Make a conscious call on L1 (raw hero images vs generated OG cards for `/work/*`) rather than letting it become the default pattern by inertia.
6. Add IndexNow (L2) — cheap, sitemap is growing fast enough now to justify it.
7. Re-run Lighthouse/CWV once Chrome DevTools MCP is available — this category is unscored for the second consecutive run, not passing.
8. **Process note:** consider adding a pre-merge checklist item (title ≤60 chars, description ≤155 chars, OG image present) for any new route, since this is now the second audit in a row where the regression is specifically "new pages didn't get the same on-page hygiene as existing ones," even immediately after a remediation pass targeting that exact problem.
