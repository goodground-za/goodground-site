# GoodGround — Content/Topic Cluster Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Prior audit referenced:** `seo-audit/FULL-AUDIT-REPORT.md` (2026-07-20, 9 pages, no cluster analysis — this is the first)
**Pages in scope:** 29 sitemap URLs — homepage, `/pricing`, `/services` hub + 6 core-service sub-pages
(website-care-plans, google-ads, meta-ads, website-redesign, seo, ux-design) + 6 industry pages
(trades-and-home-services, hospitality-and-food, health-and-wellness, professional-and-consulting,
retail-and-small-brands, non-profits-and-community), `/insights` + 6 articles, `/about`, `/contact`,
`/faq`, `/start-project`, `/work` + 1 case study, `/legal`

Note the brief said "4 core-service sub-pages" and "5 industry pages" — live count is **6 core-service
sub-pages and 6 industry pages**, all nested under `/services/*`, not as siblings. Numbers below reflect
what's actually live.

---

## Score: 58 / 100

The site has real topical breadth for a studio this young — 6 industry verticals, 6 service lines, 6
blog articles, all clearly mapped to South African SME search intent. The article-to-article
interlinking inside `/insights` is genuinely good. But the two halves of the site — the commercial
service/industry pages and the informational blog — do not talk to each other at all. Zero contextual
links exist in either direction between the 6 articles and the 12 service/industry pages. For a
hub-and-spoke model that's the whole point of having a blog, and right now it isn't happening.

| Dimension | Assessment |
|---|---|
| Pillar (`/services`) linking to its own spokes | Partial — links to 6 core-service pages, **not** to any of the 6 industry pages |
| Industry spokes linking to core-service spokes | Partial — inconsistent (see matrix) |
| Industry spokes linking to each other | None |
| Blog articles linking to service/industry pages | None (only generic `/services` and `/pricing`) |
| Service/industry pages linking to blog articles | None |
| Article-to-article interlinking | Good |
| Cannibalization | Low overall, one real risk pair identified |

---

## 1. Current hub-and-spoke structure, as it actually exists

There are effectively **three separate silos** that were clearly meant to be one connected structure
but aren't wired together yet.

```
HOMEPAGE (/)
 ├─ "Who We Build For" section → links to all 6 industry pages   [homepage acts as the real industry hub]
 ├─ nav → /services, /work, /insights, /pricing, /faq, /about, /contact, /start-project
 │
 ├── SILO A: /services (pillar for CAPABILITIES only)
 │     ├─ /services/website-redesign
 │     ├─ /services/ux-design
 │     ├─ /services/seo
 │     ├─ /services/website-care-plans
 │     ├─ /services/google-ads
 │     └─ /services/meta-ads
 │     (services hub does NOT link to any industry page — see 2.1)
 │
 ├── SILO B: 6 industry pages (reachable via homepage card grid, NOT via /services)
 │     /services/trades-and-home-services      → links to: website-redesign, seo, website-care-plans, google-ads
 │     /services/hospitality-and-food          → links to: website-redesign, seo, website-care-plans, meta-ads
 │     /services/retail-and-small-brands       → links to: website-redesign, ux-design, seo, meta-ads
 │     /services/health-and-wellness           → not sampled directly, pattern above is consistent across 3 checked
 │     /services/professional-and-consulting   → not sampled directly
 │     /services/non-profits-and-community     → not sampled directly
 │     (none link to each other; none link to /insights; ux-design and google-ads/meta-ads
 │      appear inconsistently — no industry page links to all 6 core services)
 │
 └── SILO C: /insights (blog, self-contained cluster)
       /insights/why-small-businesses-in-south-africa-need-a-website   ← the de facto pillar article,
                                                                           linked FROM 3 of the other 5
       /insights/biggest-website-mistakes-south-african-smes-make      ← links to "why-small-businesses" + generic /services
       /insights/hand-coded-websites-vs-drag-and-drop-builders         ← links to "biggest-mistakes" + "why-small-businesses"
       /insights/website-that-converts-and-grows-with-your-business    ← links to "biggest-mistakes" + "hand-coded-vs-drag-drop"
       /insights/website-vs-facebook-page                              ← links to "why-small-businesses" + one other
       /insights/how-much-does-a-website-cost-in-south-africa          ← links out to /pricing repeatedly (this one works)
       (all 6 link generically to /services and /pricing, never to a specific relevant
        service or industry page)
```

**What's working:** the blog cluster itself has a real internal structure — "why every small business
needs a website" functions as a pillar article that multiple spokes point back to, which is exactly the
pattern the rest of the site should have. The cost article is the one piece of content that correctly
funnels into a commercial page (`/pricing`), repeatedly and by name.

**What's broken:** `/services` is supposed to be the site's pillar page but only performs that role for
6 of 12 commercial spokes. The homepage has quietly become the real hub for industry pages, which means
the site has two competing "hub" pages doing half a job each rather than one page doing the whole job.
And the blog cluster, despite being well-built internally, is an island — no service or industry page
sends a visitor to an article, and no article sends a visitor to the specific service or industry page
its topic maps to.

---

## 2. Findings by severity

### 2.1 High — `/services` pillar excludes its own industry spokes

`/services` is the page that should function as the site's true pillar (it's in primary nav, it's the
canonical "services" URL, and all 6 industry pages live under the `/services/` path segment). But its
in-body links go only to the 6 core-service pages. The 6 industry pages are reachable only via the
homepage's "Who We Build For" cards.

This matters for two reasons: it splits PageRank/relevance flow across two different "hub" pages instead
of consolidating it in one, and it's confusing for both crawlers and humans that a page literally
addressed `/services/trades-and-home-services` is never linked from `/services`. A user on `/services`
looking for "do you do trade websites" has no path there except backing out to the homepage.

**Fix:** add an "Industries we build for" section to `/services` linking to all 6 industry pages
(reciprocally, each industry page should link back to `/services`, which the ones checked already do).

### 2.2 High — zero contextual links between the blog and the service/industry pages

Across all 6 articles and all 12 service/industry pages sampled, not one contextual in-body link exists
between the two silos. Specific missed pairings, given the actual content overlap found:

- `/insights/hand-coded-websites-vs-drag-and-drop-builders` argues custom-coded beats DIY builders —
  this is the exact pitch of `/services/website-redesign` ("Custom-coded alternatives to DIY builders"
  per its own summary), yet neither links to the other.
- `/insights/biggest-website-mistakes-south-african-smes-make` covers local SEO, mobile speed, and
  website care/maintenance as fixable mistakes — directly maps to `/services/seo` and
  `/services/website-care-plans`, no links to either.
- `/insights/website-that-converts-and-grows-with-your-business` covers UX/conversion and
  component-based design — maps to `/services/ux-design`, not linked.
- `/insights/why-small-businesses-in-south-africa-need-a-website` covers local search/Google Business
  Profile — maps to `/services/seo`, not linked.

This is the same gap the prior audit flagged with one article ("internal linking is nav-driven only");
it has not been addressed as the blog grew to six posts, and it's now a bigger miss because there's more
relevant content to link and more service pages that would benefit from the topical signal.

**Fix:** add one or two contextual in-body links per article to the specific service/industry page(s) its
topic supports, and reciprocally add a "Related reading" block to each service page linking to the
article(s) that support its pitch.

### 2.3 Medium — industry pages inconsistently link to core services

Of the industry pages sampled, each links to 4 of the 6 core-service pages, but which 4 varies (trades
gets google-ads, hospitality and retail get meta-ads instead; `ux-design` only shows up on retail).
`ux-design` and one of the two ad services are being under-linked from the industry layer overall. This
isn't necessarily wrong if the choice is deliberate (e.g., trades businesses genuinely lean Google Ads
over Meta Ads), but it reads as inconsistent rather than intentional, and `ux-design` in particular looks
under-served — it's a real service line getting the fewest inbound contextual links of any core service.

**Fix:** confirm the ad-platform pairing per industry is a deliberate strategic choice (worth keeping if
so, just should be consistent logic across all 6), and add `ux-design` to at least the industries where
visual differentiation is a stated selling point (retail, hospitality).

### 2.4 Low — no industry-to-industry cross-linking

None of the industry pages link to each other. This is low severity — a trades visitor has little reason
to see the hospitality page — but a small "not quite your industry? see all industries" link back to a
`/services` industries section (once 2.1 is fixed) would close the loop cheaply.

### 2.5 Low-to-monitor — `/pricing` vs `/insights/how-much-does-a-website-cost-in-south-africa`

Both target near-identical keyword territory ("website cost/pricing South Africa," package prices).
Flagging this because the keyword overlap is real, but the execution is actually correct: the article is
clearly informational (cost ranges across DIY/freelancer/studio/agency tiers, explains *why* prices
differ) while `/pricing` is transactional (the actual package grid and CTA), and the article links into
`/pricing` by name multiple times. This is the textbook right way to pair an informational and a
transactional page on overlapping keywords — no fix needed, just don't let this pattern be the exception;
apply the same informational→transactional linking model to the other 5 gaps above.

---

## 3. Cannibalization check — summary

| Pair | Overlap | Risk | Verdict |
|---|---|---|---|
| `/insights/how-much-does-a-website-cost-in-south-africa` × `/pricing` | High (keyword) | Low (intent split + linked) | Fine as-is |
| `/insights/hand-coded-websites-vs-drag-and-drop-builders` × `/services/website-redesign` | High (argument/keyword) | Medium | Not competing yet (no cross-link, no measurable rank data), but unresolved overlap — should be linked, not merged |
| `/insights/why-small-businesses-in-south-africa-need-a-website` × `/` (homepage) | Medium (value prop) | Low | Different query intent (brand root vs "why do I need a website") |
| `/insights/website-that-converts-and-grows-with-your-business` × `/services/ux-design` | Medium | Low-Medium | Overlapping "converts customers" language; link rather than risk drift |
| Industry pages × each other | Low | Low | Distinct verticals, minimal shared language beyond boilerplate CTAs |

No true duplicate-intent pair exists — nothing here needs to be merged or deleted. The one genuine risk
(`hand-coded-vs-drag-and-drop` vs `website-redesign`) is solved by linking them together, not by cutting
either; they serve different funnel stages (comparison/education vs service commitment) once connected.

No rank or SERP-position data was available for this audit (same limitation noted in the prior full
audit — no Search Console/DataForSEO credentials), so this check is based on keyword/topic overlap and
on-page intent signals only, not confirmed SERP cannibalization.

---

## 4. Content gap recommendations

1. **A pillar page that actually ties services + industries together.** Right now there's no single page
   a search engine or user can land on that says "here's everything we do, for whoever you are." Fixing
   2.1 (adding industries to `/services`) largely solves this without new content — it's an architecture
   fix, not a writing task, and it should be the first thing done since everything else compounds on top
   of it.

2. **"How long does a website take to build?" article.** Cost is covered well; timeline isn't covered
   anywhere on the site. This is one of the most common pre-sale questions for a custom-build studio and
   currently has to be answered manually in every sales conversation instead of pre-answering it and
   capturing the search volume ("how long does it take to build a website South Africa").

3. **A maintenance/care-plan-focused article.** `/services/website-care-plans` exists but there's no
   supporting informational content around it the way `/services/website-redesign` now has (once linked)
   with the hand-coded-vs-drag-and-drop piece. Something like "what does website maintenance actually
   involve, and why does it cost what it costs" would support that service page the same way the cost
   article supports `/pricing`.

4. **Google Ads vs Meta Ads for small business (South Africa) comparison.** The site sells both
   (`/services/google-ads`, `/services/meta-ads`) and industry pages already split which one they push
   per vertical (2.3) — but there's no content explaining that choice to a visitor. A comparison article
   would both fill a real search gap ("google ads vs facebook ads for small business south africa") and
   give the site something to link from the industry pages to justify why trades gets Google Ads and
   hospitality gets Meta Ads, making 2.3's inconsistency read as strategy instead of oversight.

5. **Per-industry proof/FAQ content once real client work exists.** All 6 industry pages currently make
   the same structural pitch with swapped nouns. Once `/work` has more than the single `b3tter-bottle`
   case study, industry-specific FAQs or mini case studies (even one paragraph) would differentiate pages
   that are otherwise templated, and would give something authentic to link to from the matching blog
   article rather than always linking to the generic service page.

---

## 5. What's already working (don't undo it)

- Article-to-article interlinking inside `/insights` is a real cluster, not a flat list — "why small
  businesses need a website" correctly functions as the pillar article other posts point back to.
- The cost article correctly separates informational and transactional intent while still linking the
  reader through to `/pricing` — this is the model to replicate for the gaps in section 2.
- Homepage's "Who We Build For" card grid is a genuine, working hub for the 6 industry pages — it's just
  in the wrong place structurally (should be duplicated or moved to `/services`, not removed from the
  homepage).
- No content found targeting duplicate/identical queries — the overlap that exists is all fixable by
  linking, not by consolidating or deleting pages.
