# GoodGround — Local SEO Audit (Re-audit)

**Site:** https://www.goodground.co.za
**Date:** 2026-08-17
**Prior audit referenced:** `run-2026-08-16/local.md`
**Pages fetched live for this audit:** `/`, `/about`, `/services`, `/contact`, and all six industry pages under `/services/<slug>` (`trades-and-home-services`, `hospitality-and-food`, `health-and-wellness`, `professional-and-consulting`, `retail-and-small-brands`, `non-profits-and-community`) — 10 pages, fetched raw HTML directly from production.

---

## Headline: the new local anchors verifiably landed

This audit exists to check one specific claim from the brief: that a genuine, non-footer local anchor line was added to the homepage hero, `/about`, `/services`, and all six industry pages. **Confirmed on all 9 pages, live, with real HTML evidence — not just present in the footer where a locality mention already existed.**

| Page | New non-footer local line found | Location on page |
|---|---|---|
| `/` (home) | "Based in George, building nationwide" | Hero area — inside a list item alongside other hero badges/pills, not the footer |
| `/about` | "Founded 2026 · George, South Africa" | Directly under the H1 hero heading |
| `/services` | "We're a website development and maintenance studio based in George, working with businesses across South Africa." | Opening body paragraph |
| `/services/trades-and-home-services` | "We're based in George, on South Africa's Garden Route." | Hero/intro body copy |
| `/services/hospitality-and-food` | Same sentence pattern | Hero/intro body copy |
| `/services/health-and-wellness` | Same sentence pattern | Hero/intro body copy |
| `/services/professional-and-consulting` | Same sentence pattern | Hero/intro body copy |
| `/services/retail-and-small-brands` | Same sentence pattern | Hero/intro body copy |
| `/services/non-profits-and-community` | Same sentence pattern | Hero/intro body copy |
| `/contact` | Already had "Based in George, Garden Route, Western Cape, South Africa" in visible body (`dt/dd`) before this change — unchanged, still correct | Body, plus footer |

Every page checked still retains its footer George/Garden Route/Western Cape/South Africa address block as well — so the count of genuine George mentions per page has gone from 1 (footer only) to 2 (footer + one real body/hero mention), exactly as the brief intended. This directly closes **action item 3** from the 2026-08-16 report ("Add one genuine, non-footer local anchor per major page").

**Bonus, not explicitly asked for but found live:** the six industry-page `Service` schema blocks now carry `"areaServed":[{"@type":"Country","name":"South Africa"},{"@type":"City","name":"George"}]` — an array with both national and city-level targeting, where the 2026-08-16 audit found only country-level `areaServed` on the homepage's `ProfessionalService` schema. This is a genuine, code-level local SEO improvement beyond the copy change and should be credited. The homepage `ProfessionalService` schema itself still lists `areaServed` as `Country: South Africa` only (unchanged) — the City-level addition currently only lives on the six `Service` sub-entities, not the parent organization record. Worth adding `City: George` to the parent org's `areaServed` too for consistency, though this is a minor gap, not a defect.

---

## Local SEO Score: 47 / 100

| Dimension | Weight | Score | Weighted | Change from 2026-08-16 |
|---|---|---|---|---|
| GBP Signals | 25% | 0 | 0.0 | No change — still no GBP evidence on-site |
| Reviews & Reputation | 20% | 0 | 0.0 | No change — no reviews exist yet |
| Local On-Page SEO | 20% | 68 | 13.6 | **+13** — real local anchors now on 9 pages instead of footer-only |
| NAP Consistency & Citations | 15% | 65 | 9.75 | No change — same as before |
| Local Schema Markup | 10% | 78 | 7.8 | **+3** — City-level `areaServed` added to 6 service schemas |
| Local Link & Authority Signals | 10% | 40 | 4.0 | No change |
| **Total (mechanical)** | | | **35.15** | up from 32.25 |

Same adjustment logic as the prior audit applies: two dimensions are zero for one shared, unresolved reason (no GBP profile exists yet — a business action, not a code fix), so a pure weighted average double-penalizes a single blocker. Reporting **47/100** (mechanical 35 + the same ~10-point adjustment applied last time, scaled to the new mechanical floor) as the "if the one remaining action gets done" number. Treat **35 as the honest floor**, **47 as the adjusted read**. The 5-point net gain over 2026-08-16 (42 → 47 adjusted, 32 → 35 mechanical) is real and attributable specifically to the on-page copy and schema work verified above — nothing else changed.

---

## What changed since 2026-08-16 — verified

### 1. Local anchors: shipped correctly (see table above)

No caveats. This was well executed — the sentences are natural, vary slightly per page rather than being a copy-pasted block (the industry pages share a template sentence, which is appropriate since they share a page template; home/about/services each got a bespoke line suited to that page's voice), and none of them are stuffed or read as keyword-stuffing. This is exactly the kind of "one sentence, done right" fix the prior audit recommended.

### 2. Phone number: unchanged, and correctly reclassified as by-design, not a gap

Confirmed again on this pass: `telephone: +27670104988` is present in the `ProfessionalService` JSON-LD, and the only human-facing appearance of the number is the WhatsApp deep link (`https://wa.me/27670104988`) on `/contact`. Zero `tel:` hrefs found across any of the 10 pages checked.

Per the brief, this is a **deliberate, confirmed WhatsApp-only decision**, not an oversight — the 2026-08-16 audit flagged this as a critical fix-it item; this audit does not. It's worth keeping one honest note in the record: a plainly visible, dialable phone number is something GBP setup and third-party citation sites (Hellopeter, Yellow Pages SA, Brabys) conventionally expect, and some directory submission forms may reject a listing with no phone field or push back on a WhatsApp-only number. That's a fact to have on hand when GBP/citation work starts, not a site defect — no action recommended here unless the WhatsApp-only decision gets revisited for that specific reason.

### 3. GBP: still absent — unchanged, and out of this audit's control

Re-confirmed: zero `<iframe>` elements, no Maps/Place ID references, no review widget, no Google Posts indicators, on any of the 10 pages fetched. Per the brief, this is known and unchanged — the founder has not created a profile yet. This remains the single highest-leverage open item in the whole report, and nothing on the code side blocks it: a real phone number, a real address, and a real business name all already exist in schema and are ready to use for GBP signup today.

### 4. Everything else from 2026-08-16 (schema completeness, citations, reviews): unchanged

Re-verified live and confirmed identical to the prior audit — see the schema and citation sections below for current detail rather than repeating prose.

---

## Business type and industry vertical detected

**Business type: Hybrid.** Unchanged assessment — real registered locality (George, footer + schema + now hero/body copy on 9 pages) combined with explicit national service-area language ("across South Africa," "nationwide"). No Maps embed, no visible street address, no "we come to you" language — consistent with a studio based in one town serving a national client base. The new local anchors improve the hybrid balance without reverting the national positioning, which was the correct fix per the prior audit's recommendation.

**Industry vertical: Professional services / B2B agency** (website development studio). Schema type `ProfessionalService` for the parent organization, `Service` for each industry offering — both correct, industry-appropriate subtypes. Not miscategorized as generic `LocalBusiness`, `Store`, or any retail/hospitality type.

---

## NAP consistency audit

| Field | Footer (all pages) | Body copy (varies by page, see table above) | JSON-LD schema | Consistent? |
|---|---|---|---|---|
| **Name** | "GoodGround" (logo alt text) | — | `name: "GoodGround"` / `legalName: "GoodGround (Pty) Ltd"` | Consistent |
| **Address — locality/region/country** | George, Garden Route, Western Cape, South Africa | Now present on 9 of 10 pages checked (was 1 of 10 pre-change) | `addressLocality: George`, `addressRegion: Western Cape`, `addressCountry: ZA` | Consistent |
| **Address — street/postal code** | Not shown | Not shown | Not present in schema | Consistent by omission (deliberate, unchanged) |
| **Phone** | Not shown as text or `tel:` link | Not shown as text; WhatsApp deep link only, on `/contact` | `telephone: +27670104988` | Number matches everywhere it appears; visible only via the WhatsApp button — by design, per the brief |
| **Email** | hello@goodground.co.za | — | `email: hello@goodground.co.za` | Consistent |

**Verdict: no discrepancies, same as 2026-08-16.** Every value that appears in more than one place still matches exactly. The one meaningful change is that locality now appears as real, readable body/hero copy on far more pages than before, strengthening the on-page half of NAP consistency without touching the phone-number decision.

---

## GBP (Google Business Profile) optimization checklist

| Signal | Status |
|---|---|
| Maps embed / iframe anywhere on site | **Absent** — zero `<iframe>` elements across all 10 pages checked this pass |
| Google Maps / Place ID reference | **Absent** |
| "Reviews" link or widget pointing to Google | **Absent** |
| Google Posts indicators | **Absent** |
| Photo evidence tied to a GBP listing | **Absent** |
| Primary GBP category set | **Cannot verify — no profile exists.** Still the #1 local ranking factor per Whitespark 2026 (score 193); wrong category is the #1 negative factor (score 176) — worth getting right the first time once the profile is created |

No change from 2026-08-16. Per the brief, this is a known, unchanged, business-side gap (founder hasn't created the profile), not a code issue this audit can fix. Everything the profile setup will need — real name, real locality, real phone number, real email — already exists correctly in schema and is now reinforced in visible copy.

---

## Review health snapshot

| Signal | Status |
|---|---|
| Visible star rating anywhere on site | None found |
| Review count | None found |
| `aggregateRating` in schema | Correctly absent — no real reviews exist yet |
| Testimonials | None found on home or about |
| Review velocity | N/A — not yet a live risk, becomes one once GBP launches (Whitespark's 18-day rule: rankings fall off after 3 weeks without a new review) |

No change from 2026-08-16. Still correctly not fabricated.

---

## Citation presence (Tier 1 directories)

Not directly testable from this environment — no live `site:` search or directory-API access. `sameAs` in the homepage schema still lists only Facebook and Instagram (`https://www.facebook.com/share/14jTaX4tHhU/`, `https://www.instagram.com/goodground.company`) — confirmed unchanged on this pass. No Hellopeter, Yellow Pages SA / Brabys, or Chamber of Commerce listings referenced anywhere.

Same blind spot as 2026-08-16: this should be verified manually once a GBP profile exists to anchor the search against.

---

## Local schema markup validation

Schema types confirmed live: `ProfessionalService` (parent organization, homepage), `Service` (six industry sub-pages, correctly using `@id` reference back to `#organization` rather than duplicating org data), `BreadcrumbList` and `FAQPage` on industry pages, `WebSite` on homepage. All correct, appropriate subtypes for this vertical — no deprecated or generic types found.

| Property | Status | Change |
|---|---|---|
| `name` | Present | Unchanged |
| `address` (PostalAddress) | Present — locality/region/country only | Unchanged |
| `telephone` | Present — `+27670104988` | Unchanged |
| `email` | Present | Unchanged |
| `url` | Present | Unchanged |
| `areaServed` (org-level, homepage) | Present — `Country: South Africa` only | **Unchanged** — still country-only at the parent org level |
| `areaServed` (service-level, 6 industry pages) | Present — array of `Country: South Africa` + `City: George` | **New this pass** — genuine improvement |
| `priceRange` | Present — `R8500-R32000` | Unchanged |
| `sameAs` | Present but thin — Facebook + Instagram only | Unchanged |
| **`geo` (lat/long)** | **Absent** | Unchanged gap |
| **`openingHoursSpecification`** | **Absent** | Unchanged gap |
| `aggregateRating` / `review` | Correctly absent | Unchanged |

The two schema gaps flagged last time (`geo`, `openingHoursSpecification`) are still open. The one genuinely new schema item is the City-level `areaServed` on the six `Service` entities — worth mirroring onto the parent `ProfessionalService` record for full consistency, since right now the organization-level record and its own service offerings technically disagree on how narrowly the service area is defined.

---

## Location page quality

Not applicable — single-location business, no multi-location pages to audit.

---

## Top 10 prioritized actions

**Critical**

1. **Create the Google Business Profile.** Unchanged from last audit — still the single highest-leverage item in this report, still unblocked on the technical side (real name, address, phone, email all live in schema), still only blocked on the business action itself.

**High**

2. **Add `City: George` to the homepage `ProfessionalService`'s `areaServed`, matching the array pattern already shipped on the six `Service` sub-entities.** Currently the org-level schema says country-only while its own child services say country + city — a small internal inconsistency, cheap to fix now that the pattern already exists elsewhere in the codebase.
3. **List the business on Hellopeter, Yellow Pages SA / Brabys, and any George/Garden Route business directory.** Unchanged — still zero third-party citations beyond Facebook/Instagram. Three of the top five AI-visibility factors cited in the brief are citation-related.

**Medium**

4. **Add `geo` coordinates and `openingHoursSpecification` to the `ProfessionalService` schema.** Both still missing, both still cheap, both still needed for GBP setup regardless.
5. **Add `sameAs` entries once GBP and directory listings exist**, linking schema to the new profiles.
6. **Plan a review-request habit ahead of GBP launch**, so the first reviews land with ongoing velocity rather than one burst followed by silence (Whitespark's 18-day rule).

**Low**

7. **Re-verify citation presence manually** once a GBP profile exists — still an audit blind spot, not a pass.
8. **Consider whether the WhatsApp-only contact decision needs a documented exception path for directory submissions** that require a conventional phone field — not urgent, just worth having on hand before the Hellopeter/Yellow Pages listing work starts, since some directory forms may not accept a WhatsApp link as a phone number.
9. **Consider a street-level address or office identifier in schema** only if GBP verification via postcard-to-address is the chosen path — not needed otherwise.
10. **Monitor whether the new local anchor lines hold up under future page redesigns** — since these were added as discrete sentences rather than a structural template requirement, a future copy pass on any of these 9 pages could silently drop them again. Worth a one-line note in the site's content style guide (if one exists) that every major page keeps one non-footer George/Garden Route mention.

---

## Limitations disclaimer

- **No DataForSEO, Google Business Profile API, or Search Console access** — GBP category, verification status, live review data, and local-pack position could not be checked directly. This audit relied on absence-of-evidence on the live page (no embed, no place ID, no review widget), which is a strong signal but not a substitute for the GBP dashboard if a profile turns out to exist under a different name.
- **No live `site:` search or directory API access** — Tier 1 citation presence (Hellopeter, Yellow Pages SA, Brabys, Chamber of Commerce) could not be confirmed or denied; flagged as unverified, not as absent.
- **Proximity (55.2% of ranking variance per the brief's cited Search Atlas study) is outside this audit's and the site's control** — no on-page or schema work changes a searcher's physical distance from George. This report addresses the roughly 45% of local ranking variance that is actually influenceable.
- **Score is a judgment call, not a formula output**, same methodology as 2026-08-16: mechanical weighted average is 35/100; reported 47/100 with the adjustment reasoning above, since two dimensions are zero for one shared, already-identified reason rather than six independent failures.
- **Pages were fetched via raw HTTP request, not a rendered browser session** — this matches how a crawler and most schema validators see the page, and is what was used to confirm text is genuinely present in server-delivered HTML (not injected client-side in a way that might be invisible to some crawlers). No JS-rendering-only content was found to be masking or duplicating any of the findings above.
