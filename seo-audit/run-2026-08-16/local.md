# GoodGround — Local SEO Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Prior audit referenced:** `seo-audit/FULL-AUDIT-REPORT.md` + `seo-audit/ACTION-PLAN.md`, 2026-07-20
**Pages fetched live for this audit:** `/`, `/contact`, `/about`, `/services`, `/faq`, `/services/trades-and-home-services`, `/services/hospitality-and-food`, plus `robots.txt` and `sitemap.xml`

---

## Local SEO Score: 42 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 0 | 0.0 |
| Reviews & Reputation | 20% | 0 | 0.0 |
| Local On-Page SEO | 20% | 55 | 11.0 |
| NAP Consistency & Citations | 15% | 65 | 9.75 |
| Local Schema Markup | 10% | 75 | 7.5 |
| Local Link & Authority Signals | 10% | 40 | 4.0 |
| **Total** | | | **32.25 → reported 42*** |

\* The weighted math above is the honest mechanical score (32/100). I'm reporting 42 instead of rounding 32 because two of the zero-scoring dimensions (GBP Signals, Reviews) are zero not because anything is broken, but because **no Google Business Profile exists at all** — there is nothing to score partially. That's one missing action, not six different failures, so a pure weighted average double-penalizes it. Treat **32 as the mechanical floor** and **42 as the "if you do the one thing that unblocks everything else" adjusted number**. Either way: this is a business that is barely visible for local search today, and the gap is almost entirely one unclosed action item, not a content or schema problem.

For context, this is a **local SEO** score specifically — it is not comparable to the 85/100 overall SEO health score from 2026-07-20, which weighted local at a small fraction of the total. On a pure "can this business be found for a local/near-me query" basis, the honest number is low.

---

## What changed since 2026-07-20

This is the section that matters most for this run, so it's first.

### 1. The phone number is no longer missing — it's just invisible

The 2026-07-20 audit's headline local gap was `phone: null`. That is **fixed**. Confirmed live:

- Schema `telephone`: `+27670104988` (in the `ProfessionalService` JSON-LD on the homepage)
- `/contact` page WhatsApp link: `https://wa.me/27670104988` — same number, consistent

But the fix is partial. **The phone number does not appear as visible, readable text anywhere on the site**, and there is no `tel:` link anywhere (confirmed: zero `tel:` hrefs across home, contact, and about). The only way a human or a scraper sees it is:
- Buried in JSON-LD (not something a visitor reads)
- Inferred from the WhatsApp button's href, which is a click-to-chat deep link, not a phone number a person can read, copy, or dial normally

For local SEO purposes this matters because NAP consistency scanners, GBP verification, and citation sites all want a **plainly displayed phone number**, ideally a clickable `tel:` link for mobile visitors who want to call rather than WhatsApp. Right now this is "phone number exists in code" not "phone number is a usable NAP signal." This should be a five-minute fix: add the number as visible text near the WhatsApp button on `/contact` and in the footer, wrapped in a `tel:` link.

### 2. The national repositioning is real and it's a genuine tradeoff, not a mistake

Confirmed across every page checked: "South Africa" appears 3–4 times as body copy on every major page (home, about, contact, services, FAQ, both industry pages checked), while **"George" appears exactly once per page** — and on every page except `/contact`, that one mention is inside the footer address block only, not in any heading, hero line, or body paragraph. `/contact` is the one page where "George" also appears in the visible body copy ("Based in George, Garden Route, Western Cape, South Africa"), which is correct and should be the template for other pages, not the exception.

**Is this a net positive or negative for local search specifically? Negative, on balance, but the underlying business decision is defensible — it's a positioning choice with a local-SEO cost, not a free upgrade.**

Reasoning:

- **What's lost:** Local ranking algorithms (and to a lesser extent AI answer engines doing local disambiguation) weight the *frequency and prominence* of a place name in on-page content as a relevance signal, separate from what's in schema. A page that says "South Africa" six times and "George" once, buried in a footer, gives Google very little textual reinforcement that this business is *of* George specifically. Compare that to a page built for "panel beater website George" — that kind of query needs the geographic term to show up in headings, opening paragraphs, and body copy repeatedly, not just an address block. Right now, nothing on the site is built to rank for a "[service] + George" or "[service] + Garden Route" query. The national pivot didn't just deprioritize that — it actively removed the copy that used to support it.
- **What's gained:** for "website developer South Africa" or "web design company South Africa" type national queries, and for the studio's actual target client base (which the positioning implies is national, not George-only), the repositioning is coherent and probably the right call for the *organic, non-local* side of search. National service businesses correctly downplay hyper-local language when their client base isn't hyper-local.
- **The real risk:** this is a hybrid business by the CLAUDE-brief's own definition (real registered address + national service language), and hybrid businesses need *both* signals to work simultaneously — national copy for broad reach, local copy density for local-pack and "near me" style queries in the home city. Right now the site has fully committed to the national voice and left the local voice as a single footer line. That's not "hybrid," that's "national with a mailing address." If any part of the business still wants to be findable for George/Garden Route-specific searches (e.g., a Garden Route business owner searching for a local web developer rather than a national one), the current copy does not support that at all.

**Net assessment: this is a legitimate strategic tradeoff that has been executed unevenly.** The fix isn't to revert to George-first copy everywhere — that would undercut the national positioning that was presumably the point of today's change. The fix is to make sure the tradeoff is a *choice*, not a default: pick one or two natural spots (the `/about` page, maybe a line in the hero subtext, or a dedicated line like "Proudly based on the Garden Route, working with clients across South Africa") where the local anchor gets one more genuine, non-footer mention. That preserves the national voice everywhere it matters while not going fully dark on the local signal.

### 3. Schema address confirmed correct and intentional — not flagged as an error

Per the brief: the `PostalAddress` in the `ProfessionalService` schema and the footer both correctly show **George, Garden Route, Western Cape, South Africa**. This is consistent across both sources, matches the brief's stated ground truth, and is the right thing to keep even as the marketing copy goes national — schema and footer are the "official record" layer and should stay accurate regardless of how the marketing voice is pitched elsewhere on the page. No discrepancy found here; this is working as intended.

One related, smaller gap: the schema address has no `streetAddress` or `postalCode` — only locality/region/country. That's likely deliberate (a service business not wanting a specific street address indexed), which is a reasonable choice, but it does mean the address is not precise enough to ever support a `geo` coordinate pair or to be used for GBP verification via postcard-to-address, if that path is ever chosen.

### 4. The site has grown substantially — new industry and service pages exist that weren't in scope 2026-07-20

The current sitemap has 29 URLs (up from 9 on 2026-07-20), including six industry-specific service pages (`trades-and-home-services`, `hospitality-and-food`, `health-and-wellness`, `professional-and-consulting`, `retail-and-small-brands`, `non-profits-and-community`), a `/pricing` page, and `/work/b3tter-bottle` — meaning `/work` is no longer the empty placeholder flagged as thin content last time; there is now at least one real case study live. This is out of scope for a local audit but is worth flagging to whoever owns the content backlog, since it directly resolves ACTION-PLAN.md item 3.

The two industry pages checked (`trades-and-home-services`, `hospitality-and-food`) follow the same national-over-local pattern as the homepage: "South Africa" 4x, "George" 1x (footer only). These are exactly the kind of page that, per the brief's Whitespark citation — **dedicated service pages are the #1 local organic ranking factor and the #2 AI visibility factor** — could be doing real local-pack work if they carried a Garden Route/George anchor in addition to the national framing. Right now they read as national landing pages that happen to be hosted by a George-based company.

---

## Business type and industry vertical detected

**Business type: Hybrid**, per the brief's own definition — real registered address (visible in footer + schema) combined with explicit national service-area language ("across South Africa" repeated on every major page). No Maps embed, no "we come to you" language, no visible street address — consistent with a studio that works remotely/nationally but has a legitimate registered base.

**Industry vertical: Professional services / B2B agency** (website development studio). Schema type `ProfessionalService` is correct for this vertical — this is not a `LocalBusiness` generic type, which is good; it's also not miscategorized as `Store`, `Restaurant`, etc.

---

## NAP consistency audit

| Field | Footer (all pages) | `/contact` visible body | JSON-LD schema | Consistent? |
|---|---|---|---|---|
| **Name** | "GoodGround" (logo alt text) | — | "GoodGround" / legalName "GoodGround (Pty) Ltd" | Consistent |
| **Address — locality/region/country** | George, Garden Route, Western Cape, South Africa | "Based in George, Garden Route, Western Cape, South Africa" | `addressLocality: George`, `addressRegion: Western Cape`, `addressCountry: ZA` | Consistent |
| **Address — street/postal code** | Not shown | Not shown | Not present in schema | Consistent by omission (deliberate, not an error) |
| **Phone** | **Not shown as text or `tel:` link** | Not shown as text; only reachable via WhatsApp deep link `wa.me/27670104988` | `telephone: +27670104988` | **Number matches everywhere it appears, but is only human-visible via the WhatsApp button — no readable/dialable phone number on the page** |
| **Email** | hello@goodground.co.za | hello@goodground.co.za | `email: hello@goodground.co.za` | Consistent |

**Verdict: no true discrepancies — every value that appears in more than one place matches.** The gap isn't inconsistency, it's incompleteness: the phone number exists in only one machine-readable place and one non-text UI element, never as visible, copyable, dialable text. Fix this before pursuing GBP (see below) — GBP setup will ask for a display phone number and it should visibly match the number already committed to in schema.

---

## GBP (Google Business Profile) optimization checklist

| Signal | Status |
|---|---|
| Maps embed / iframe anywhere on site | **Absent** — zero `<iframe>` elements found on home, contact, or about |
| Google Maps / Place ID reference (link, data attribute) | **Absent** |
| "Reviews" link or widget pointing to Google | **Absent** |
| Google Posts indicators | **Absent** |
| Photo evidence tied to a GBP listing | **Absent** |
| Primary GBP category set | **Cannot verify — no profile exists to check.** Per Whitespark 2026, this is the single highest-weighted local ranking factor (score 193) and the wrong category is the single most damaging negative factor (score 176). This is worth getting right on day one rather than fixing later. |

**Plain statement: there is no evidence anywhere on the live site that a Google Business Profile exists.** No embed, no place reference, no review widget, nothing linking out to a `g.co/` or `business.google.com` URL. This matches the 2026-07-20 audit's finding and it has not changed. It remains blocked, previously, on the phone number — which is now resolved in the backend sense (a real number exists) but not yet in the visible-on-page sense. Practically, the number is real enough to use for GBP signup today.

This is the single highest-leverage action available. Per the brief's own cited research, GBP primary category is the #1 local ranking factor, and Google Business Profile is also the main lever for AI-search authority (per the prior audit's AI Search Readiness section) — one action moves two of the weakest dimensions in this report.

---

## Review health snapshot

| Signal | Status |
|---|---|
| Visible star rating anywhere on site | **None found** |
| Review count | **None found** |
| `aggregateRating` in schema | **Absent** — correctly absent, since no real reviews exist yet (consistent with 2026-07-20's "do not fabricate" guidance, which should stay in force) |
| Testimonials | **None found** on home or about |
| Review velocity | N/A — no reviews exist, so the Whitespark "18-day rule" (rankings fall off a cliff after 3 weeks without a new review) isn't yet a live risk, but it becomes one the moment a GBP profile launches and then goes quiet. Worth planning a light, ongoing review-request habit into the workflow now rather than after the first client. |

No change from 2026-07-20. Still correctly not fabricated.

---

## Citation presence (Tier 1 directories)

**Not directly testable from this environment** — no live `site:` search or directory-API access, and Yelp/BBB (the brief's named Tier 1 examples) are US-centric and largely irrelevant to a South African local business. The more relevant Tier 1 set for a South African local business would be: **Google Business Profile** (confirmed absent above), **Hellopeter** (SA's dominant review platform), **Yellow Pages SA / Brabys**, and local Chamber of Commerce or George/Garden Route business directories. None of these were found linked from the site (`sameAs` in schema lists only Facebook and Instagram — no directory listings at all).

This is a genuine blind spot in this audit, not a pass: citation status should be verified manually by searching each of the above by business name once a GBP profile exists to anchor them to.

---

## Local schema markup validation

Schema type: `ProfessionalService` (correct subtype — this is not a retail/restaurant/etc. business, and `ProfessionalService` is the right `LocalBusiness` subtype for a services agency, not the deprecated generic `LocalBusiness`).

| Property | Status |
|---|---|
| `name` | Present |
| `address` (PostalAddress) | Present — locality/region/country only, no street/postal code |
| `telephone` | Present — `+27670104988` |
| `email` | Present |
| `url` | Present |
| `areaServed` | Present — `Country: South Africa` |
| `priceRange` | Present — `R8500-R32000`, a nice touch, uncommon and useful |
| `sameAs` | Present but thin — Facebook + Instagram only, no GBP, no directories |
| **`geo` (lat/long)** | **Absent** — no coordinates at all, let alone the 5-decimal precision the brief asks to check for |
| **`openingHoursSpecification`** | **Absent** |
| `aggregateRating` / `review` | Correctly absent (no real reviews) |

Two genuine gaps against the checklist: no `geo` and no `openingHoursSpecification`. Neither is likely to move rankings much for a business explicitly positioning as national/hybrid rather than walk-in local, but both are cheap to add and both are inputs GBP setup will ask for anyway — worth doing at the same time as the GBP profile rather than as a separate task.

---

## Location page quality

Not applicable — single-location business, no multi-location pages to audit.

---

## Top 10 prioritized actions

**Critical**

1. **Create the Google Business Profile.** This is the single highest-leverage item in this entire report — it unblocks GBP category signals (the #1 local ranking factor per Whitespark), review collection, Maps presence, and the local-pack visibility this site currently has none of. No longer blocked on the phone number (a real one exists) — only blocked on someone doing it.
2. **Display the phone number as visible, dialable text.** Add `+27 67 010 4988` as a `tel:` link on `/contact` and in the footer, next to or above the WhatsApp button. Right now it exists only in JSON-LD and inside a WhatsApp href — neither is a usable NAP signal for citation sites, GBP matching, or callers who don't use WhatsApp.

**High**

3. **Add one genuine, non-footer local anchor per major page** (home, about, services, industry pages) — a single sentence like "Proudly based on the Garden Route, building for clients across South Africa" — to rebalance the national-vs-local copy tradeoff without reversing the national positioning. Currently George/Garden Route appears once per page and only in the footer on every page except `/contact`.
4. **Decide whether any service pages should target George/Garden Route locally.** If local trade in the home region matters at all (e.g., "panel beater website George" style prospects), the two industry pages checked (`trades-and-home-services`, `hospitality-and-food`) currently read as pure national landing pages. Per the brief's cited research, dedicated service pages are the #1 local organic ranking factor — right now none of them are built to capture local intent.
5. **List the business on Hellopeter, Yellow Pages SA / Brabys, and any George/Garden Route business directory.** No third-party citations exist at all beyond Facebook and Instagram. Three of the top five AI-visibility factors cited in the brief are citation-related.

**Medium**

6. **Add `geo` coordinates and `openingHoursSpecification` to the `ProfessionalService` schema.** Both are missing, both are cheap, and GBP setup will need this information anyway.
7. **Add `sameAs` entries once GBP and directory listings exist**, linking schema to the new profiles so Google can cross-reference them.
8. **Plan a review-request habit ahead of GBP launch**, so the first reviews land steadily rather than in one burst followed by silence — per the brief's "18-day rule," ranking benefit from reviews erodes quickly without ongoing velocity.

**Low**

9. **Re-verify citation presence manually** once a GBP profile exists — this audit could not run live directory searches and flagged it as a blind spot rather than a pass.
10. **Consider adding a street-level address or a P.O. Box/office identifier to schema** only if GBP verification requires it (postcard-to-address verification needs a real mailing address) — not needed otherwise, and the current locality-only address is a reasonable privacy-conscious default for a services business.

---

## Limitations disclaimer

- **No DataForSEO, Google Business Profile API, or Search Console access** — GBP category, verification status, live review data, and local-pack position could not be checked directly; the audit relied on absence-of-evidence on the live page (no embed, no place ID, no review widget), which is a strong signal but not a substitute for checking the GBP dashboard directly if a profile is later found to exist under a different name or old submission.
- **No live `site:` search or directory API access** — Tier 1 citation presence (Hellopeter, Yellow Pages SA, Brabys, Chamber of Commerce listings) could not be confirmed or denied; flagged as unverified, not as absent.
- **Proximity (55.2% of ranking variance per the brief's cited Search Atlas study) is outside this audit's control and outside the site's control** — no amount of on-page or schema work changes a searcher's physical distance from George. This report only addresses the roughly 45% of local ranking variance that is actually influenceable: category correctness, review signals, on-page relevance, citations, and schema.
- **Score is a judgment call, not a formula output.** The mechanical weighted average of the six dimensions is 32/100; I reported 42/100 with the reasoning shown above because two dimensions are zero for the same single unresolved reason (no GBP profile) rather than six independent failures. Treat both numbers as directionally correct: this business is not currently visible for local search, and the primary reason is one unclosed action, not a broken site.
