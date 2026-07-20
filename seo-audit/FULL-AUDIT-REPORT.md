# GoodGround — Full SEO Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-07-20
**Pages crawled:** 9 of 9 (complete site)
**Business type:** Local service / professional services — website development studio, Brackenfell (Cape Town), serving South Africa nationally

---

## SEO Health Score: 85 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 90 | 19.8 |
| Content Quality | 23% | 68 | 15.6 |
| On-Page SEO | 20% | 90 | 18.0 |
| Schema / Structured Data | 10% | 92 | 9.2 |
| Performance (CWV) | 10% | 97 | 9.7 |
| AI Search Readiness | 10% | 85 | 8.5 |
| Images | 5% | 88 | 4.4 |
| **Total** | | | **85.2** |

The technical build is genuinely strong — this is a well-engineered site and the
score is held down almost entirely by **content depth and authority signals**,
which is expected for a studio founded in 2026 with no published client work yet.
There is one real defect (missing social preview images) that is worth fixing
before you push for traffic.

---

## Audit scope and limitations — read this before acting

Three things this audit could **not** measure. Do not read their absence as a pass:

1. **No Google field data.** Google API credentials (CrUX / Search Console / GA4)
   are not configured on this machine, so all performance figures below are
   **lab measurements from one machine on one connection**, not what real South
   African users on real devices experience. CrUX explicitly returned
   "no data for this page" — the site has insufficient traffic to have a field
   dataset yet.
2. **No rank or keyword data.** No DataForSEO, Moz, or Bing credentials. This
   audit says nothing about what you currently rank for, search volumes, or
   competitor positions.
3. **No backlink data beyond domain level.** Common Crawl only, with zero cached
   domains. For a site this new the honest expectation is a near-empty backlink
   profile — but that is an assumption here, not a measurement.

Everything below is on-page, technical, and content analysis, which is where a
new site's controllable wins actually are.

---

## 1. Critical issues

### 1.1 No social preview image on any page

**Severity: Critical for a design studio. Affects all 9 pages.**

There is no `og:image` and no `twitter:image` anywhere on the site, and
`twitter:card` is set to `summary` rather than `summary_large_image`. No OG image
file exists in `public/` and no Next `opengraph-image` route is defined.

Verified: `/og.png`, `/og-image.png`, `/opengraph-image` all return 404.

**What this means in practice.** Every time the site is shared — WhatsApp
(dominant in South Africa), LinkedIn, Facebook, Slack, iMessage — it renders as a
bare text link with no image. For most businesses that is a missed opportunity.
For a studio whose product *is* visual web design, it actively undercuts the
pitch: the studio's own link looks unfinished.

This also affects the blog article, which is the one asset most likely to be
shared organically.

**Fix.** Next 16 App Router supports file-based OG images. Either add a static
`app/opengraph-image.png` (1200×630), or generate them per-route with
`ImageResponse` so `/services`, `/about` and each article get their own. Set
`twitter:card` to `summary_large_image` at the same time. The brand already has
the assets to do this well — the bark/peach palette and the wordmark.

### 1.2 Nothing else is critical

No indexing blockers, no broken links, no redirect chains, no duplicate content,
no accidental `noindex`, no canonical conflicts. The canonical/www mismatch that
existed earlier today was fixed in commit `28a03fa` and verified — all 9 sitemap
URLs now return 200 with no redirect.

---

## 2. Technical SEO — 90/100

### Passing

| Check | Status |
|---|---|
| HTTPS + valid certificate | Pass |
| HTTP → HTTPS redirect | Pass (308) |
| Apex → www redirect | Pass (308), canonical host consistent |
| `robots.txt` present, allows crawling | Pass |
| XML sitemap, linked in robots.txt | Pass — 9 URLs, all 200 |
| Canonical tags on every page | Pass, all self-referential and absolute |
| Custom 404 returning correct status | Pass |
| HSTS | Pass — `max-age=63072000` (2 years) |
| Mobile rendering | Pass — Lighthouse mobile 100 |
| Server-side rendering (no JS-dependency for content) | Pass |

### Issues

**Missing security headers (Medium).** Only HSTS is set. Absent:
`Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`.

These are not direct ranking factors, but they are trust and safety signals, they
are increasingly checked by procurement and enterprise clients, and — relevant
here — **a web studio being asked "do you follow security best practice?" wants
its own site to answer yes.** All five can be set in `next.config.ts` via the
`headers()` function in roughly 15 lines.

Note CSP needs care: the site loads Google Tag Manager after consent, so the
policy must permit `googletagmanager.com` and the GA inline init script (or use a
nonce). Do not ship a CSP without testing that GA still fires.

**`/favicon.ico` returns 404 (Low).** The site correctly declares
`<link rel="icon" href="/icon.png">` and `apple-touch-icon`, so browsers are fine.
But some crawlers, RSS readers, and link-preview services request `/favicon.ico`
at the root by convention and will get nothing. Adding a real `favicon.ico` to
`public/` closes this.

**Leftover Next.js template files in `public/` (Low).** `next.svg`, `vercel.svg`,
`file.svg`, `globe.svg`, `window.svg` are default create-next-app boilerplate,
still publicly served. Harmless for ranking, but they are Vercel and Next branding
sitting on a client-facing studio domain. Delete them.

---

## 3. On-Page SEO — 90/100

Genuinely well executed. Every page has a unique title, unique meta description,
exactly one `<h1>`, and a clean heading hierarchy.

**Heading structure: no skipped levels on any of the 9 pages.** This is rarer than
it should be and worth noting as a strength.

| Page | Title len | Desc len | H1 | Words |
|---|---|---|---|---|
| `/` | 62 | 179 | 1 | 1027 |
| `/services` | 57 | 160 | 1 | 723 |
| `/about` | 59 | 163 | 1 | 429 |
| `/contact` | 54 | 181 | 1 | 198 |
| `/start-project` | 51 | 136 | 1 | 172 |
| `/insights` | 76 | 120 | 1 | 173 |
| `/work` | 41 | 145 | 1 | 154 |
| `/legal` | 42 | 159 | 1 | 1143 |
| `/insights/why-small-businesses...` | 64 | 179 | 1 | 1717 |

### Issues

**Five meta descriptions exceed ~160 characters (Low).** `/contact` (181), `/` (179),
the article (179), `/about` (163), `/services` (160). Google truncates around
155–160 characters on desktop and shorter on mobile, so the tail of each is being
cut. Nothing breaks, but the trimmed text is wasted persuasion — and in each case
the cut falls mid-sentence. Worth tightening to land the call to action inside the
visible window.

**`/insights` title is 76 characters (Low).** "Insights | Website Design & Growth
for South African Businesses | GoodGround" will truncate in results. It also uses
two separators. Something like "Insights | Website Advice for South African
Businesses" keeps the keyword and fits.

**Internal linking is nav-driven only (Medium).** Every main page has exactly 9
inbound internal links, which is the navigation and footer — meaning there is
almost no *contextual* in-body linking between pages. The blog article has **1
inbound link** (from the `/insights` listing) and no editorial links pointing into
it from `/services` or the homepage.

This matters more as the blog grows. Contextual links are how you pass relevance
between related pages and how Google understands topical relationships. Right now
`/services` never links to the article that argues why a business needs a website,
which is the obvious supporting content for it.

**Zero external outbound links site-wide (Low).** Not a penalty, but citing
authoritative sources (POPIA legislation text, research on mobile usage in SA,
Google's own documentation) is a recognised E-E-A-T signal and helps AI engines
verify claims. The article in particular makes factual assertions about South
African small businesses with nothing to point at.

---

## 4. Content Quality — 68/100

This is the weakest category and the honest reason the overall score is not higher.
Almost all of it traces to one root cause: **the studio is new and has not
published proof of work.** That is a real constraint, not a fixable oversight, and
the site already handles it more honestly than most (`/work` says "coming soon"
rather than inventing a portfolio, which is the right call and should stay).

### Thin pages

| Page | Words | Assessment |
|---|---|---|
| `/work` | 154 | Genuinely thin — it is a placeholder |
| `/start-project` | 172 | Thin, but it is a form; acceptable |
| `/insights` | 173 | Thin because there is only 1 article |
| `/contact` | 198 | Thin, but acceptable for a contact page |

`/work` is the one to think about. It is in the sitemap and will be indexed as a
near-empty page. Options, in order of preference:

1. **Best:** publish one real case study. Even this site itself, written up as a
   build story, is legitimate proof of work.
2. **Interim:** remove `/work` from `app/sitemap.ts` until it has content. Keep the
   page reachable for humans via nav; just stop actively asking Google to index it.
   The sitemap file already documents this principle in its own comment: "Only
   routes that actually exist and are indexable go in."
3. Leave it. Low risk, but it is a weak page competing for your crawl budget.

### E-E-A-T assessment

| Signal | Status |
|---|---|
| Named author on articles | **Missing** — the article has no byline |
| Author bio / credentials | **Missing** |
| About page with real people | Partial — names Johandre, no photo-credited bio, no role detail |
| Client testimonials / reviews | **Missing** (none exist yet — do not fabricate) |
| Case studies / proof of work | **Missing** (acknowledged, "coming soon") |
| Physical address | Present — Brackenfell, Western Cape, in schema |
| Contact email | Present — hello@goodground.co.za |
| Phone number | **Missing** — still unconfirmed in `content/site.ts` |
| External citations | **Missing** |
| Company registration number | **Missing** — deliberately "to be confirmed" |

**The single highest-leverage content fix is adding a named author byline and a
short bio to the blog article.** "Experience" is the first E in E-E-A-T, and right
now the site's one substantial piece of content is anonymous. A founder writing
about why South African businesses need websites is exactly the kind of
first-person experience signal Google and AI engines look for — but only if the
author is identified.

### Content strengths

- The article is 1717 words, substantive, SA-specific, and not generic filler.
- `/services` at 723 words has real depth per service (problem / approach / outcome).
- The homepage at 1027 words covers the proposition properly.
- Copy reads as human-written. No AI tells, no keyword stuffing.
- The payment-plan proposition (12 equal monthly instalments) is a genuine
  differentiator and is stated clearly and repeatedly.

---

## 5. Schema / Structured Data — 92/100

The strongest area of the audit. Implemented as a proper `@graph` with `@id`
cross-references rather than disconnected blocks — this is correct and better than
most production sites.

| Page | Schema types |
|---|---|
| `/` | ProfessionalService, WebSite, FAQPage |
| `/services` | BreadcrumbList, ItemList |
| `/contact` | BreadcrumbList, ContactPage |
| Article | BreadcrumbList, BlogPosting |
| `/about`, `/insights`, `/work`, `/start-project`, `/legal` | BreadcrumbList |

All JSON-LD parsed without errors. `ProfessionalService` correctly carries
`areaServed: Country South Africa`, `serviceType`, `PostalAddress`, `email`, and
`foundingDate`. `FAQPage` contains only answered questions — correct, since the
three unanswered FAQs are deliberately excluded rather than stubbed.

### Opportunities

- **`BlogPosting` has no `author`.** Same root issue as the E-E-A-T finding.
  Adding a `Person` author with a `name` (and ideally `url` to an about/bio) is a
  small change with real value for article visibility.
- **No `Service` schema per service offering.** `/services` uses `ItemList`, which
  is fine, but individual `Service` entities linked to the organisation would
  describe the four offerings more precisely.
- **No `aggregateRating` or `review`.** Correct for now — there are no real reviews.
  **Do not add these until genuine reviews exist**; fabricated review markup is a
  manual-action risk.
- **No `telephone` in the organisation schema** because the number is unconfirmed.
  Correct to omit rather than invent, per the existing project rule.

---

## 6. Performance (Core Web Vitals) — 97/100

**Lighthouse mobile: Accessibility 100 · Best Practices 100 · SEO 100 · Agentic Browsing 100. 56 audits passed, 0 failed.**

Lab-measured Core Web Vitals on the live homepage:

| Metric | Value | Threshold | Status |
|---|---|---|---|
| LCP | 490 ms | < 2500 ms | Good |
| CLS | 0.00 | < 0.1 | Good |
| TTFB | 16 ms | < 800 ms | Good |

LCP breakdown: TTFB 16ms → load delay 40ms → load duration 80ms → **render delay
354ms**. Render delay is the dominant phase, which is consistent with the hero
wordmark's `MaskReveal` entrance animation. At 490ms total this is comfortably
inside "good" and not worth optimising — noted only so it is not mistaken for a
server or network problem later.

**Image delivery is working well.** The source `header-image.png` is 916 KB; served
through `next/image` to a modern browser it comes down as **36 KB WebP** — a 96%
reduction. The decision to stay on Next.js specifically for `next/image` (recorded
in the project notes) is measurably paying off.

**Third-party impact of the new GA setup:** Google Tag Manager accounts for
**106 ms of main-thread time** with **no measurable LCP or CLS cost** and Chrome's
own estimated savings listed as "none". Note that this trace was captured with
analytics consent already granted, so it reflects the consented-visitor worst
case, not the default. Visitors who decline, or who have not yet answered, load
zero third-party code.

**Caveat:** all of the above is lab data from one machine. CrUX has no field
dataset for this site yet. Real-world South African mobile performance on
constrained networks is unmeasured. Revisit once GA and Search Console have
accumulated a few weeks of data.

---

## 7. Images — 88/100

**Alt text is correct across all 9 pages** — this is done properly and is worth
calling out. Content images carry genuinely descriptive alt text ("A seedling
breaking through dark soil, backlit by low sun"), while decorative images (nav
logos, footer background, footer logo) correctly use `alt=""` so screen readers
skip them. Zero images are missing an `alt` attribute entirely.

| Check | Status |
|---|---|
| Missing `alt` attributes | 0 |
| Descriptive alt on content images | Pass |
| Empty `alt` on decorative images | Pass (correct) |
| Modern format delivery (WebP/AVIF) | Pass — via `next/image` |
| Responsive `srcset` | Pass — via `next/image` |
| CLS from images | Pass — 0.00 |

### Issues

- **No social preview image** — see Critical 1.1. This is the only significant
  image gap.
- **Source assets are large PNGs** (up to 916 KB). `next/image` handles this at
  serve time so real users are unaffected, but the repository is carrying heavy
  originals and every new deploy re-optimises them. Converting the sources to
  WebP would trim the repo and build time. Low priority.
- **Photography is still placeholder stock.** Already on the project punch list.
  The seedling imagery is on-brand and works, but real work/team photography
  would strengthen both E-E-A-T and the OG images once those exist.

---

## 8. AI Search Readiness (GEO) — 85/100

Well positioned structurally, weak on authority — which is the same story as the
content section.

| Signal | Status |
|---|---|
| `llms.txt` present and valid | Pass — now lists all 8 routes (updated today) |
| AI crawlers allowed in robots.txt | Pass — `User-Agent: * / Allow: /` |
| Lighthouse Agentic Browsing | 100 |
| Semantic HTML structure | Pass — clean heading hierarchy aids passage extraction |
| Content server-rendered (not JS-gated) | Pass — critical for AI crawlers |
| `FAQPage` schema | Pass — directly citable Q&A pairs |
| Named author / expertise signals | **Missing** |
| External citations to authoritative sources | **Missing** |
| Third-party brand mentions across the web | **Near zero** (new business) |

**The structural work is done well.** Content is server-rendered, headings are
clean, and the FAQ schema gives AI engines pre-formatted answer pairs — the
homepage FAQ answers about the 12-month payment model are exactly the kind of
passage an AI engine can lift and cite.

**What limits AI visibility is authority, not structure.** AI engines weight brand
mentions across the wider web heavily, and a business founded in 2026 with no
directory listings, no press, and no reviews has almost nothing for them to draw
on. The fixes here are off-site and slow: Google Business Profile, local
directories, and genuine third-party mentions. Google Business Profile is already
on your punch list and is the highest-value single item for a Cape Town service
business.

---

## 9. Local SEO

Detected business type: **hybrid** — physical address in Brackenfell, but serving
clients nationally across South Africa. The site handles this correctly by
targeting "website development South Africa" nationally while keeping Cape Town as
the local anchor in the hero trust line and schema address.

| Signal | Status |
|---|---|
| `PostalAddress` in schema | Pass — Brackenfell, Western Cape, ZA |
| `areaServed: Country South Africa` | Pass |
| NAP consistency on site | Partial — **no phone number anywhere** |
| Google Business Profile | **Not created** (on punch list) |
| Local directory citations | **None** |
| Reviews | **None** |
| Location-specific landing pages | None (reasonable for a national service) |

**The missing phone number is the notable gap.** NAP (Name, Address, Phone)
consistency is foundational to local SEO, and one third of it is absent. It is
correctly omitted rather than invented — the fix is a business decision, not a
code change. A Google Business Profile will also require a phone number.

---

## 10. What is already done well

Worth stating plainly, because the score is dragged down by newness rather than by
poor work:

- Heading hierarchy clean on all 9 pages, zero skipped levels
- Alt text handled correctly, including the decorative-vs-content distinction
- Schema implemented as a proper cross-referenced `@graph`
- Lighthouse 100 across all four categories on mobile
- LCP 490ms, CLS 0.00
- 96% image weight reduction via `next/image`
- Every page has unique title, description, canonical, single H1
- `llms.txt` present — genuinely uncommon, and it is what took Agentic Browsing to 100
- No fabricated content: no fake portfolio, no invented reviews, no stub FAQ answers
- Analytics implemented with real consent gating rather than a cosmetic banner

---

## Appendix: method

- Pages fetched with `seo/scripts/fetch_page.py`, parsed with BeautifulSoup
- All 9 sitemap URLs status-checked individually
- Headers inspected via `curl -I`
- Lighthouse and CWV via Chrome DevTools MCP against live production
- Image delivery tested with and without a modern `Accept` header
- Schema extracted and JSON-parsed from live HTML
- Internal link graph built from all crawled pages

Not run: Search Console, CrUX, GA4, DataForSEO, Moz, Bing Webmaster — no
credentials configured. See "Audit scope and limitations".
