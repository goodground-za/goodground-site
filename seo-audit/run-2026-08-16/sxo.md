# GoodGround — SXO (Search Experience Optimization) Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Pages assessed:** Homepage, /pricing, /services + 9 sub-pages (4 core + 5 industry
verticals — note the crawl found 6 industry-plus-core service sub-pages under
/services, not 9 as originally briefed; see Limitations), /work, /work/b3tter-bottle,
/about, /contact, /faq, /insights + 6 articles.
**Prior audit:** `seo-audit/FULL-AUDIT-REPORT.md` (2026-07-20) — technical/on-page SEO
only, SEO Health Score 85/100. This is the first dedicated SXO pass. The two scores
measure different things and should not be added together or confused.

---

## SXO Gap Score: 69 / 100

This is separate from the SEO Health Score. It measures how well each page's format
and content match what a real visitor — arriving with real search intent — needs to
act, not whether the page is technically crawlable.

| Dimension | Score | Why |
|---|---|---|
| Page Type Match | 11/15 | Homepage, /pricing, /services and /insights all match their SERP-dominant page type well. /work is the one page that structurally promises a type (Portfolio) it doesn't deliver. |
| Content Depth | 12/15 | Pricing and cost content is unusually deep and transparent for the category. Industry service pages are well-written but shallow on proof. /work is thin by design (one entry). |
| UX Signals | 12/15 | Clear CTAs, working live-updating price configurator, tight FAQ blocks. Weak spot: the primary nav item "Work" sets an expectation the destination doesn't meet, which is a navigation-level UX failure, not just a content one. |
| Schema | 13/15 | Confirmed strong in the prior audit (proper `@graph`, FAQPage, ProfessionalService). One SXO-relevant gap carried forward: `BlogPosting` has no `author` entity, which matters here because it's also a *visitor-facing* trust signal, not just a crawler one. |
| Media | 8/15 | Photography is on-brand but stock/placeholder (per prior audit) and the site's one deep case study (B3TTER) is a concept product photograph set, not photography of real client businesses or team members. |
| Authority | 5/15 | This is the score that drags the total down. Zero testimonials, zero reviews, zero client logos, zero named article authors, no phone number, and exactly one case study — labelled honestly as a concept build. For a visitor actively comparing studios, there is almost nothing to verify against. |
| Freshness | 8/10 | Articles are dated (13 August 2026 etc.), copyright year is current, insights section is actively growing (6 articles). No visible `dateModified`/"updated" convention if older articles get revised later. |

**Total: 69/100.**

The gap between this score (69) and the SEO Health Score (85) is the story: the site
is built and coded well enough to rank, but a real visitor who lands on it mid-decision
runs into the same wall Google's crawler doesn't see — **there is almost nothing here
that lets a stranger verify GoodGround has done this before.** That is a business-stage
problem (the studio has no paying clients yet), not a code problem, and the site
already handles it more honestly than most competitors would. But honesty about the
gap doesn't close it for the visitor standing in front of it.

---

## Primary finding: /work reads as a Portfolio but delivers a single labelled concept build

**Severity: CRITICAL. Affects: /work, /work/b3tter-bottle. Persona: Comparison-Shopping
SMB Owner, Industry-Specific Searcher.**

"Work" sits in the primary navigation next to About, Services, Insights, and Contact —
on every single page of the site. That placement is a page-type promise. Per the
taxonomy, a nav item called "Work" on an agency site sets the same expectation as a
Portfolio/Service Page case-study section: multiple client projects, before/after or
outcome data, and ideally proof spanning a few of the industries the agency claims to
serve.

What's actually there: one entry, **B3TTER**, clearly labelled "Concept build 2026" at
both the /work index and the top of the case study itself. The case study is honest
about what it is — "B3TTER is a concept brand with no customers, so there is no
traffic, revenue or conversion data to report, and we are not going to invent any" —
which is the right call given the project's hard rule against fabricating client work.
That honesty is a strength relative to competitors who'd pad this page with stock
"client" logos. It does not, however, change what the page-type mismatch costs:

- A **Comparison-Shopping SMB Owner** clicking "Work" from the nav — the exact
  behaviour the SERP for "website developer South Africa" trains, since that query is
  dominated by directory sites (Clutch, GoodFirms) and competitor agency homepages
  that lead with client portfolios — hits one item and has to actively reason their
  way past the disappointment ("okay, but is this studio actually any good at *my*
  kind of site?").
- An **Industry-Specific Searcher** (trades, health, hospitality, retail, professional,
  non-profit — the six verticals the site itself targets under /services) gets zero
  proof matched to their industry. B3TTER is a stainless-steel-bottle product page —
  outdoor gear, direct-to-consumer. None of the six industry landing pages the site
  built specifically to capture "website for [industry]" queries can point to a single
  example of that kind of business's site.

**This is not a "publish fake testimonials" problem** — the project correctly refuses
that. It's a page-type problem: the current design asks the /work page to do the job
of a portfolio when the honest content available (one concept build, this site itself,
the studio's own build) is closer to a "how we build" showcase. Two options, not
mutually exclusive:

1. **Reframe, don't hide.** Rename the nav item and page from "Work" (which sets a
   portfolio expectation) to something like "Craft" or "How We Build" and restructure
   the page around *demonstrated capability* rather than *client roster* — B3TTER
   plus a self-referential case study of goodground.co.za itself (a legitimate,
   measurable build the project notes already point to: Lighthouse 100, 490ms LCP,
   96% image-weight reduction). Two honest, measured examples read very differently
   from one lonely "concept build" badge next to a nav item that promises more.
2. **Get one real project live and reframe /work only once it exists**, even a
   discounted or pro-bono first client site, so the industry pages have at least one
   real matched example to point to.

---

## Secondary findings by severity

### HIGH

**Zero social proof anywhere on the site.** No testimonials, no client logos, no
review scores, no "trusted by X businesses" line. This is the same root cause as the
/work finding but it's site-wide, not page-specific — it shows up on the homepage,
every service page, every industry page, and /pricing. Trust score on every persona
below reflects this. Cross-reference: `/seo content` for E-E-A-T remediation guidance.

**Industry landing pages ask for proof they don't supply.** The trades page's own FAQ
says: *"I already have some good reviews. Can they go on the site? Yes, real reviews
from your existing customers are exactly the kind of proof that helps a first-time
visitor decide to call you instead of the next name on the list."* That's correct
advice — and it's not being followed on GoodGround's own six industry pages, each of
which makes an industry-specific pitch with zero industry-matched proof behind it.

### MEDIUM

**Blog articles have no named author.** Byline reads "By GoodGround," not a person.
For the "should I get a website" informational persona — who is in a fact-checking,
skeptical mindset by definition (they haven't decided the premise yet) — an anonymous
corporate byline on an article making specific claims about the South African SME
market is a weaker trust signal than a founder's name and a line of credibility. Same
finding as the prior SEO audit's E-E-A-T section, but it matters here as a *visitor*
trust signal, not just a ranking signal. Cross-reference: `/seo content`.

**"George" is not a searchable local qualifier on its own.** Running the SERP check
for "website development George" returns almost nothing relevant to George, Garden
Route, Western Cape — the results are dominated by St. George, Utah agencies and
businesses literally named "George" (George Builds Websites, Websites by George). A
Local George/Garden Route business owner searching a short, unqualified local query
will not find this site through Google today. The footer and schema correctly state
the location, but there is no dedicated local landing page built around a qualified
variant ("web design George Western Cape," "website developer Garden Route") to give
that persona a page to land on if they do search the qualified version. Given the
brief's confirmation that the business is now positioned nationally rather than
locally, this may be an acceptable trade-off — but it should be a deliberate one, not
a default.

**B3TTER doesn't map to the site's target industries.** It's a genuinely well-executed
piece (measured claims, checkable numbers, real accessibility rigor) but it's a
direct-to-consumer product page for a physical good. None of the six industries the
site explicitly targets (trades, health & wellness, hospitality, retail, professional
services, non-profits) are service businesses selling a single hero product — so even
a persona who does read the case study in full still can't picture their own site from
it.

### LOW

**Informational-stage articles jump straight to a commitment CTA.** Every article ends
on "Start your project," a decision-stage action, for a reader who arrived at
awareness stage asking "should I even get a website." There's no lower-friction
intermediate step (e.g., "read the pricing guide next," a related-article prompt
earlier in the piece, or a no-commitment "see what we'd build for a business like
yours").

**No phone number anywhere on the site** (carried over from the prior SEO audit, but
relevant here too). The Quote-Seeking and Local personas both include people who'd
rather call than fill a form; right now every path funnels to a form or email.

---

## User stories (derived from observed signals, not assumed)

**Homepage — targeting "website developer South Africa" / "website development
[town]"**

1. As a **small-business owner comparing studios**, I want to quickly see what makes
   this studio different from the dozen others in the SERP, because I don't have time
   to read six agency homepages in full, but I'm blocked by **comparison fatigue** —
   the homepage states differentiators clearly ("Six Reasons to Choose Us," the
   payment-plan model) but offers no head-to-head framing against the DIY-builder or
   freelancer alternatives that the SERP itself surfaces as competing options.
   *(Source: SERP mix of agency homepages + "how much does a website cost" guides
   comparing DIY/freelancer/agency/studio — GoodGround's own article does this
   comparison, the homepage doesn't point to it.)*

2. As a **budget-conscious owner**, I want to know roughly what this will cost before
   I commit to a conversation, because most competitor sites hide pricing behind a
   quote form, but I'm reassured almost immediately — the homepage surfaces "Two ways
   to pay" prominently and links straight to real numbers on /pricing.
   *(Source: SERP result `websitedesign.co.za` leads with "FROM R1950" in its title —
   price-forward framing is what wins this category; GoodGround matches that pattern
   well.)*

**/pricing — targeting "website design packages South Africa pricing"**

3. As a **quote-seeking business owner ready to buy**, I want an exact number for my
   specific project, not a range, because vague quotes from competitors waste my time,
   and this page delivers — the live-updating à la carte configurator answers this in
   under a minute with no form required.
   *(Source: SERP is a mix of agency pricing pages and third-party "pricing breakdown"
   guides — an interactive, self-serve total is a stronger match to this intent than
   either.)*

**/work — targeting the implicit "show me your work" intent baked into the primary
nav**

4. As a **comparison-shopping SMB owner**, I want to see 3-5 real client sites close
   to my own business type before I trust this studio with mine, because that's the
   standard every competitor portfolio page sets, but I'm blocked immediately — one
   labelled concept build with no client history is a **trust gap**, not an
   information gap, and no amount of reading further down the page closes it.
   *(Source: taxonomy — Service Page "common mismatch" for missing case studies is
   rated HIGH; here it's compounded to CRITICAL by the nav-level promise.)*

**/insights — targeting "how much does a website cost in South Africa" and "should I
get a website"**

5. As an **informational-stage researcher who hasn't decided a website is worth it
   yet**, I want a plain-language, unbiased-feeling answer with real numbers, because
   every agency's "pricing" content usually turns out to be a pitch, and the guide
   article delivers unusually well on this — real ranges for DIY/freelancer/agency
   options are given before GoodGround's own pricing appears — but I'm left slightly
   **skeptical** at the trust layer, because the article carries no named author, just
   "By GoodGround."
   *(Source: SERP for this query is entirely third-party cost-guide blog posts with
   real numbers — GoodGround's article matches that dominant format well; the
   anonymous byline is the gap relative to bylined competitor guides.)*

---

## Persona scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Quote-Seeking Business Owner | 24/25 | 23/25 | 14/25 | 22/25 | **83/100** | Excellent |
| Budget-Conscious SME Owner | 24/25 | 22/25 | 15/25 | 20/25 | **81/100** | Excellent |
| "Should I Get a Website" Researcher | 22/25 | 18/25 | 9/25 | 14/25 | **63/100** | Good |
| Industry-Specific Searcher (trades/health/hospitality/etc.) | 21/25 | 18/25 | 6/25 | 17/25 | **62/100** | Good |
| Comparison-Shopping SMB Owner | 18/25 | 16/25 | 8/25 | 18/25 | **60/100** | Good |
| Local George/Garden Route Business Owner | 12/25 | 10/25 | 10/25 | 14/25 | **46/100** | Needs Work |

### Weakest persona: Local George/Garden Route Business Owner (46/100)

**Top issue:** This persona has almost no realistic organic path to the site. The
live SERP check for "website development George" returns St. George, Utah agencies
and unrelated brands, not GoodGround, and there is no dedicated page built around a
qualified local variant for the few searchers who do type "George Western Cape" or
"George Garden Route."

**Recommended fix:** This may be an intentional trade-off given the national
repositioning described in the brief — confirm that deliberately, rather than by
default. If local George/Garden Route trade is still wanted at all, it needs a
qualified-term landing page (not a keyword stuffed into the homepage), and a Google
Business Profile (already flagged in the prior SEO audit) so this persona has a
verifiable local presence to check against before clicking through.

### Systemic issue across personas: Trust

Every persona except Budget-Conscious scores under 15/25 on Trust, and even
Budget-Conscious's 15 is carried mostly by *pricing* transparency (a different kind of
trust) rather than *capability* proof. This is one root cause wearing five different
scores: zero testimonials, zero reviews, one labelled concept case study, anonymous
article bylines, no phone number.

### Priority actions

1. **Fix the /work page-type mismatch first** (Critical finding above) — it's the
   single highest-leverage action because it sits at the intersection of the two
   weakest personas (Comparison-Shopping, Industry-Specific) and the systemic Trust
   issue.
2. **Add named authors to the six /insights articles.** Concrete, low-effort,
   addresses the Researcher persona's Trust score directly — a founder byline with one
   line of credibility (the "10+ years UX/UI, website design and graphic design"
   detail already on /about) is enough to start.
3. **Give each of the six industry service pages at least a placeholder acknowledging
   the proof gap honestly** (e.g., "We're building our first trades/health/hospitality
   projects now — ask to see what we're currently working on") rather than silence,
   until real matched case studies exist. Silence reads as an oversight; an honest
   in-progress line reads as momentum, consistent with how the site already handles
   /work's "coming soon" framing.
4. **Decide the George/Garden Route local question explicitly.** Either commit a
   qualified local landing page + Google Business Profile, or confirm the national-only
   strategy is intentional and stop treating the absence as a gap.

---

## Cross-skill references

- **E-E-A-T / anonymous authorship, no client proof** → run `/seo content` for a deep
  authority/trust remediation pass.
- **Local George/Garden Route ambiguity, no Google Business Profile** → run
  `/seo local` to scope a GBP + local-page plan, or confirm national-only intent.
- **BlogPosting schema missing `author`** → run `/seo schema` to generate the
  `Person`/`author` entity addition (small, already scoped in the prior SEO audit).
- **/work thinness** → this was flagged as content-thin in the prior SEO audit
  (`/seo page`); this SXO pass adds the page-type/intent framing on top of that.

---

## Limitations — read before acting

1. **SERP analysis used WebSearch, not a dedicated SERP-scraping tool.** Results are
   summarized organic links, not a full rendered SERP — no confirmed PAA question
   list, no featured-snippet format detection, no AI Overview visibility, no ad
   density count, and no guarantee of exact top-10 ordering or South Africa-specific
   geolocation targeting. Treat page-type consensus and the "George" finding as
   directionally reliable, not as a certified rank-tracking result.
2. **No Search Console, GA4, or click-through data.** All persona friction points are
   inferred from page content and SERP signal, not from observed real-user behaviour
   (bounce rate on /work, scroll depth on articles, etc.). If GA4/Search Console are
   ever connected, re-run this against real behavioural data.
3. **Personas are derived from a mix of SERP signals and the task brief's explicit
   personas** (comparison-shopper, quote-seeker, informational researcher), extended
   with two more (Budget-Conscious, Industry-Specific, Local) that trace to repeated
   signals across the site's own content and the SERP checks run. They are not a
   substitute for real user research or interviews.
4. **The nine /services sub-pages referenced in the task brief were confirmed as 4
   core services (Website Development, UX & Design, SEO, Website Care Plans) plus 6
   industry verticals (Trades, Health & Wellness, Hospitality & Food, Retail,
   Professional & Consulting, Non-Profits) plus 2 growth services (Google Ads, Meta
   Ads)** — 12 sub-pages total, not 9. Noted so the count in any downstream summary is
   accurate.
5. **No wireframe was generated** (not requested for this run). If a visual IST/SOLL
   comparison for /work is wanted, ask for it explicitly and it can be generated from
   the parsed page structure already captured for this audit.

---

Generate a PDF report? Use `/seo google report`
