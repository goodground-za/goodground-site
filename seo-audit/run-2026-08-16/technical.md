# GoodGround — Technical SEO Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Previous run:** 2026-07-20 (`seo-audit/FULL-AUDIT-REPORT.md`, technical score 90/100)
**Pages crawled:** 29 of 29 sitemap URLs (complete)
**Method:** Direct HTTP fetch of every sitemap URL (`curl`), header inspection, HTML/meta parsing, JSON-LD parsing. Chrome DevTools MCP (navigate_page / lighthouse_audit) was **not available in this environment** — no Lighthouse or field CWV data was collected this run. That gap is called out explicitly below rather than left silent; do not read the missing CWV section as "no CWV issues."

---

## Technical SEO score: 82 / 100

Down from 90/100 on 2026-07-20. The drop is not from anything broken — crawlability, indexability, redirects, and security headers are all still clean. It's from **on-page hygiene not scaling with the site**: the July fixes (trimmed meta descriptions, OG images, security headers) were applied to the original 9 pages and have not been consistently extended to the 20 new ones added since. See "What changed" below for the full delta.

---

## 1. Crawlability — Pass

| Check | Result |
|---|---|
| `robots.txt` | 200, present, correct: `User-Agent: * / Allow: /`, `Sitemap:` directive present |
| Sitemap linked in robots.txt | Pass |
| `sitemap.xml` | 200, valid XML, 29 `<url>` entries, all with `lastmod`/`changefreq`/`priority` |
| All 29 sitemap URLs resolve | **29/29 return 200**, zero redirects, zero 4xx/5xx |
| Orphans (sitemap URL not reachable) | None found |
| `noindex` anywhere | None found on any of the 29 pages |
| `X-Robots-Tag` header | Not set anywhere (fine — no need for it here) |

No crawl blockers. This is unchanged from July and remains a strength.

---

## 2. Indexability

| Check | Result |
|---|---|
| Canonical tag present, self-referential, absolute URL | **Pass on all 29 pages** — verified individually |
| Meta robots | 28 pages have no explicit tag (defaults to `index, follow` — correct). `/legal` has an explicit `<meta name="robots" content="index, follow">` — harmless, just inconsistent with the other 28; not a bug |
| Duplicate canonicals / conflicting canonicals | None found |
| Duplicate `<title>` across pages | None found — all 29 titles are unique |
| Thin content | `/work` still exists as a mostly-navigational hub page but is no longer the standalone "coming soon" placeholder flagged in July — it now links to the real `/work/b3tter-bottle` case study, so the thin-content risk from the last audit is materially reduced |

**Finding — apex/www and http/https redirects still single-hop, still correct:**
- `http://goodground.co.za` → `https://goodground.co.za` → **but this is a 308 straight to `https://goodground.co.za/`, not `https://www.goodground.co.za/`** — see Medium finding below.
- `http://www.goodground.co.za` → `https://www.goodground.co.za/` (308, single hop, correct).
- `https://goodground.co.za` (apex, https) → `https://www.goodground.co.za/` (308, single hop, correct).

---

## 3. Security — Pass, unchanged and confirmed

All five headers added 2026-07-20 are still present and identical across every page type sampled (homepage, `/pricing`, `/work/b3tter-bottle`, `robots.txt`):

| Header | Value |
|---|---|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://api.web3forms.com; form-action 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `Strict-Transport-Security` | `max-age=63072000` (2 years) |

HTTPS is enforced everywhere, no mixed-content: all image/script/style sources in the CSP are HTTPS, and `images.unsplash.com` is the only third-party image host, correctly allow-listed. No plaintext HTTP resources found in any crawled page.

---

## 4. URL structure

Clean, flat, lowercase, hyphenated, no query strings, no trailing-slash inconsistency (trailing-slash requests 308-redirect to the canonical no-slash form, e.g. `/pricing/` → `/pricing`). Route structure scales sensibly: `/services/<service>` for the 8 core services + 6 industry pages, `/insights/<slug>` for articles, `/work/<slug>` for case studies. No change needed here.

---

## 5. Mobile

`<meta name="viewport" content="width=device-width, initial-scale=1">` confirmed present on every page sampled, including `/pricing` (the page with the new framer-motion border-trail animation). No fixed-width layout artifacts detected in source. Cannot confirm real-device touch-target sizing or tap-target spacing without a rendered/Lighthouse pass — flagged as unmeasured, not passed.

---

## 6. Core Web Vitals — not measured this run

Chrome DevTools MCP tools (`navigate_page`, `lighthouse_audit`) were not available in this environment, so no Lighthouse run was performed against the homepage, a service page, `/pricing`, or `/work/b3tter-bottle` as the brief requested. The July figures (LCP 490ms, CLS 0.00, Lighthouse mobile 100/100/100/100) should **not** be assumed to still hold — two things have changed since then that specifically touch CWV risk and warrant a real re-run:

- **`/pricing` now ships a client-side framer-motion border-trail animation.** Framer Motion is a real JS dependency (not zero-cost); worth checking bundle size impact and whether the animation causes any layout shift or blocks input on lower-end mobile devices. Source inspection shows the page is still server-prerendered (`X-Nextjs-Prerender: 1`, all page copy present in the raw HTML with no JS required to read it), so this is an interactivity/INP risk, not an indexability one.
- **Site grew from 9 to 29 pages**, several with more DOM (14 headings on `/pricing`, 13 on `/faq`) — worth spot-checking CLS on the FAQ accordion and pricing calculator interactions specifically, since those are exactly the kind of dynamic-height UI that causes layout shift if not sized correctly.

**Recommendation:** re-run Lighthouse against homepage, one service page, `/pricing`, and `/work/b3tter-bottle` with Chrome DevTools MCP available before this category can be scored.

---

## 7. Structured Data (JSON-LD)

Spot-checked `/pricing`: two script blocks parsed cleanly as valid JSON — `BreadcrumbList` and `FAQPage`. No parse errors. Full per-page schema type audit was not re-run across all 29 pages this pass (out of scope for the technical category — see the schema sub-audit for full coverage); flagging only what's directly relevant to indexability: schema is present, well-formed, and not blocking crawling or rendering on the pages checked.

The `George` / `South Africa` NAP question from the brief: confirmed correct. `George` appears exactly 4 times in the homepage/about HTML — twice inside the `PostalAddress` JSON-LD (`addressLocality: "George"`), and twice in the visible footer address block (`<p>George, Garden Route<br/>Western Cape...`). This is intentional, correct NAP behaviour per the brief, not a bug — the national "South Africa" repositioning in body copy coexists correctly with the real registered address.

---

## 8. JavaScript rendering

Confirmed server-rendered, not client-rendered. Pulled raw HTML with `curl` (no JS execution) for `/pricing` and found real page content — e.g. `R8,500` pricing text — present directly in the initial HTML response. Same confirmed for the homepage and `/work/b3tter-bottle`. `X-Nextjs-Prerender: 1` header present on every page sampled, confirming static prerendering rather than pure CSR. This is a genuine strength: AI crawlers and any bot that doesn't execute JS still get full content, and it protects LCP by not gating render on hydration.

---

## 9. IndexNow protocol

No IndexNow key file found (`/*.txt` key at root is the standard implementation pattern) and no evidence of IndexNow pings in the codebase from what's visible externally. Not implemented. This is Bing/Yandex/Naver-specific and was not part of the July audit either — noting it as a gap rather than a regression, since it was never in scope before. Low priority for a South African audience where Google dominates, but cheap to add (a static key file + one ping on deploy) and would give faster Bing indexing for the fast-growing sitemap.

---

## Findings

### Critical
None. No indexing blockers, no broken links, no accidental noindex, no canonical conflicts, no redirect chains.

### High

**H1 — 16 of 29 pages have no `og:image` at all.** Verified by direct HTML inspection (not just missing `<meta>` render — the underlying per-route `opengraph-image` file/route also 404s for each, e.g. `https://www.goodground.co.za/pricing/opengraph-image` → 404). Affected: `/pricing`, `/faq`, `/start-project`, `/work`, and all 12 pages under `/services/*` (including all 6 new industry pages: trades-and-home-services, hospitality-and-food, health-and-wellness, professional-and-consulting, retail-and-small-brands, non-profits-and-community). `og:title`, `og:description`, and `twitter:card: summary_large_image` are all present and correct on these pages — only the image is missing. **Fix:** extend the existing `ImageResponse` OG card pattern (already implemented for `/`, `/services`, `/about`, `/contact`, `/insights`, and per-article routes — confirmed working) to the remaining 16 routes; the pattern is proven and just needs to be applied to the new routes. This is the single most consequential regression since July: the original audit's #1 critical finding was "no OG image anywhere," it was fixed for the 9 pages that existed at the time, and more than half the pages added since then shipped without it.

**H2 — `/services` meta description regressed from 160 to 225 characters.** This exact page was in the original 9-page audit and was flagged at 160 chars (already at the edge) — it has since grown to 225, well past Google's ~155–160 character truncation point on desktop. One-line fix: trim `/services` meta description in `content/site.ts` (or wherever the page-level metadata lives) back under ~155 chars, landing the CTA inside the visible window, same treatment already applied to the other 5 pages in July.

### Medium

**M1 — Apex-to-www redirect goes through the wrong intermediate host on plain HTTP.** `http://goodground.co.za` 308-redirects to `https://goodground.co.za/` (apex, no www) rather than straight to `https://www.goodground.co.za/`. A second 308 then completes the hop to www. This is two redirect hops instead of one for anyone typing the bare apex domain into a browser without `https://` or `www.` — a real-world case (print material, verbal referrals, old bookmarks). **Fix:** collapse to a single redirect from `http://goodground.co.za` directly to `https://www.goodground.co.za/` in the Vercel/Next redirect config.

**M2 — Widespread meta description length drift on pages added since July.** The July fix disciplined 5 descriptions to 138–146 characters; that discipline wasn't carried into the 20 new pages. Currently over ~160 characters (will truncate in SERPs): `/pricing` (172), `/services/hospitality-and-food` (207), `/services/non-profits-and-community` (176), `/start-project` (173), `/work` (178), `/legal` (169), `/services/website-care-plans` (166), `/services/google-ads` (166), `/services/website-redesign` (165), `/insights/why-small-businesses-in-south-africa-need-a-website` (184), `/work/b3tter-bottle` (191), `/insights/website-that-converts-and-grows-with-your-business` (168), `/services/meta-ads` (162), `/services/ux-design` (161), `/insights/how-much-does-a-website-cost-in-south-africa` (162), `/insights/hand-coded-websites-vs-drag-and-drop-builders` (166). **Fix:** batch-trim all of these to ≤155 characters; not urgent individually, but as a set this is now the majority of the site.

**M3 — Several new page titles are long enough to truncate in search results.** Google typically renders ~55–60 characters fully. Longest offenders: `/services/hospitality-and-food` (93 chars — "Website Design for Restaurants, Cafés & Guesthouses | Garden Route & SA | GoodGround"), `/services/health-and-wellness` (87), `/services/professional-and-consulting` (87), `/services/trades-and-home-services` (84), `/services/retail-and-small-brands` (82), `/work/b3tter-bottle` (72). **Fix:** shorten to keep the primary keyword + brand only; drop the secondary qualifier ("| Garden Route & SA") where a shorter form already implies national coverage elsewhere on the page.

**M4 — `llms.txt` is stale relative to the current 29-URL sitemap.** It still lists only the original ~8 routes and describes `/work` as "Case studies, coming soon" — that's no longer accurate now that `/work/b3tter-bottle` is live. It has no entries at all for `/pricing`, `/faq`, any of the 8 `/services/*` subpages, or the 6 new `/insights` articles. Since `llms.txt` was specifically what took the site's Agentic Browsing score to 100 in July, letting it drift out of sync with actual site structure undercuts that same signal as the site grows. **Fix:** regenerate `llms.txt` from the current sitemap, or better, generate it programmatically at build time so it can't drift again.

### Low

**L1 — `/legal` carries an explicit `<meta name="robots" content="index, follow">` tag that no other page has.** Not wrong (matches the implicit default everywhere else) but inconsistent — worth knowing it's there if anyone later assumes all pages behave identically at the code level. No user-facing impact.

**L2 — IndexNow protocol not implemented.** No key file, no evidence of ping-on-publish for Bing/Yandex/Naver. Not previously in scope, not a regression, just noted as an open item given the sitemap now changes weekly with new articles.

---

## What's already been verified fixed since 2026-07-20

Explicitly re-confirmed rather than re-flagged:

- **Security headers** — all five (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) still present and unchanged in content, site-wide.
- **`/favicon.ico`** — still returns 200 (was 404 before the July fix).
- **Next.js boilerplate files** (`next.svg`, `noise.png`, etc.) — still gone, still 404, haven't crept back.
- **OG images on the original 9 pages** — `/`, `/services`, `/about`, `/contact`, `/insights`, and all 6 article pages all correctly serve a working `opengraph-image` route with `twitter:card: summary_large_image`. The July fix holds; it just wasn't extended to what's been added since (see H1).
- **Apex/www canonical host consistency** — no canonical conflicts found; every one of the 29 pages self-canonicalizes to its own `https://www.goodground.co.za/...` URL.
- **`/insights` title length** — the July fix (76 → 56 chars) holds.
- **Contextual internal linking `/services` ↔ article** — still present.
- **Sitemap cleanliness** — all 29 URLs return 200 with zero redirects; this is a materially larger sitemap (9 → 29) with the same zero-defect result as before, which is a genuine engineering win worth noting, not just a repeat pass.

## What's new since 2026-07-20 (not previously auditable)

- **Sitemap grew 9 → 29 URLs**: `/pricing`, 8 `/services/*` subpages (4 core services + 6 industry verticals — note that's 8 new listed individually where July only measured `/services` as one page), `/faq`, 5 new `/insights` articles, and the first `/work/[slug]` case study (`/work/b3tter-bottle`).
- **`/work` is no longer a placeholder** — it now hosts and links to a real case study with concrete, verifiable claims (accessibility score, image-weight reduction), which materially improves on the "coming soon" content-quality gap flagged in July. Worth re-scoring in the content-quality pass, not just here.
- **`/pricing` added client-side framer-motion animation** (border-trail effect) — flagged above as an unmeasured CWV risk pending a Lighthouse re-run, not a confirmed problem.
- **National repositioning ("George" → "South Africa" in most body copy)** — confirmed correctly implemented. Registered address in `PostalAddress` schema and the visible footer NAP block both still correctly say George; this is intentional and correct, not a bug.

---

## Recommended priority order

1. Fix H1 (OG images on 16 pages) — highest-visibility regression, direct repeat of the July critical finding on new routes.
2. Fix H2 (`/services` meta description) — a genuine regression on a page that was already fixed once.
3. Fix M1 (apex redirect hop) — small config change, removes an unnecessary redirect.
4. Batch-fix M2/M3 (description and title lengths) — mechanical, can be done in one pass across `content/site.ts` or wherever page metadata lives.
5. Regenerate `llms.txt` (M4), ideally make it build-time generated so it can't drift again.
6. Re-run Lighthouse/CWV against homepage, a service page, `/pricing`, and `/work/b3tter-bottle` once Chrome DevTools MCP is available — this category is currently unscored, not passing.
