# GoodGround — SXO (Search Experience Optimization) Audit — RE-AUDIT

**Site:** https://www.goodground.co.za
**Date:** 2026-08-17
**Pages assessed (this run):** Homepage, /services, /work + all 3 case studies
(/work/b3tter-bottle, /work/point-break-surf, /work/goodground-site), /pricing,
/start-project.
**Prior audit:** `seo-audit/run-2026-08-16/sxo.md` — first dedicated SXO pass,
SXO Gap Score 69/100, primary finding was a CRITICAL page-type mismatch on /work.
**Purpose of this run:** re-evaluate that specific finding after two changes (nav
label "Work" → "Craft"; /work grew from 1 case study to 3), and run a fresh
persona-based pass across the main funnel (home → services → work → pricing →
start-project) rather than only re-checking the old finding.

---

## SXO Gap Score: 74 / 100 (was 69/100)

Separate from the SEO Health Score (85/100 as of the 2026-07-20 technical audit —
not re-run here). +5 points versus the 2026-08-16 SXO pass, driven almost entirely
by Page Type and Content Depth improvements on /work. Authority is still the
dominant drag on the total.

| Dimension | Score | Change | Why |
|---|---|---|---|
| Page Type Match | 13/15 | +2 | Homepage, /services, /pricing, /start-project all still match their SERP-dominant type well. /work moved from a hard mismatch (nav literally said "Work," delivered one item) to a softer, residual one — see Primary Finding below. |
| Content Depth | 14/15 | +2 | /work went from 216 words / 1 entry to 216 (index) + 749 + 943 + 870 words across three case studies (~2,780 words of case-study content total), each with real, checkable metrics (Lighthouse scores, LCP, image-weight reduction). This is now genuinely deep for the category. |
| UX Signals | 12/15 | 0 | Same as prior run: clear CTAs, working pricing configurator, tight FAQ blocks. New minor deduction: the /work index page itself has no CTA to /start-project or /contact — only three "Read the case study →" links. A persona convinced by the case studies has to backtrack to the nav to act (the case-study detail pages do fix this with a "Start Your Project" CTA, but the index doesn't). |
| Schema | 13/15 | 0 | Unchanged from prior audit's finding. /work index carries only `BreadcrumbList` (no `CollectionPage`/`ItemList` for the three case studies). Each case-study page correctly uses `CreativeWork`, not `Product` or `Review` schema — the right, honest choice given none are commissioned client work. `BlogPosting` author gap on /insights (not re-checked this run, carried forward). |
| Media | 9/15 | +1 | Same photography/imagery character as before. Small improvement: two more visual case studies now exist, so /work no longer reads as a single-image page. Still no photography of real client businesses, staff, or premises anywhere on the site. |
| Authority | 5/15 | 0 | Unchanged. The core problem — zero testimonials, zero reviews, zero client logos, zero named article authors, no phone number — is untouched by the /work changes. Adding two more self-published entries (one concept, one self-referential) does not add third-party verifiable proof. This is still the score dragging the total down. |
| Freshness | 8/10 | 0 | Not re-checked in depth this run; carried forward from 2026-08-16. |

**Total: 74/100** (+5 vs. 2026-08-16's 69/100).

The five-point gain is real but narrow: it comes entirely from /work being a
better-built version of the same fundamental thing it was before — a self-published
showcase, not third-party-verified client work. The site is more honest and more
detailed about what it is; it has not yet closed the trust gap that a comparison-
shopping visitor comes to /work looking to close.

---

## Primary finding: the /work mismatch is PARTIALLY RESOLVED — downgraded from CRITICAL to HIGH, not eliminated

**Severity: HIGH (was CRITICAL). Affects: /work and its three case-study pages.
Personas: Comparison-Shopping SMB Owner, Industry-Specific Searcher.**

### What actually changed

1. **Nav label:** "Work" → "Craft" (confirmed live in the header nav on every
   page, still linking to `/work`).
2. **Content volume:** /work grew from one entry (B3TTER, "Concept build") to
   three: **B3TTER** ("Concept build"), **Point Break Surf Academy** ("Concept
   build"), and **GoodGround** ("Our own site"). All three status labels are
   printed directly on the card, at the top of each entry, exactly as the
   page's own intro copy promises: *"Where a project was a concept build rather
   than client work, it says so at the top."*
3. **Depth per entry increased sharply.** Each case study is now 750-950 words
   with specific, checkable metrics (B3TTER: accessibility 100, 56MB of source
   photography shipped as 1.5MB; Point Break: 331ms LCP, zero-framework
   client-side pricing engine; GoodGround's own site: Lighthouse 100 across
   accessibility/best-practices/SEO, 772ms LCP, 48 statically generated pages) —
   this is unusually rigorous, checkable content for the category.

### Does this resolve the mismatch? Only partly.

**What's genuinely fixed:**
- "Craft" is a materially softer promise than "Work." A visitor clicking a nav
  item called "Craft" is primed to expect a demonstration of *how the studio
  builds*, not necessarily *who has paid them to build for them*. Per the
  taxonomy, this nudges the page's implicit type away from strict Portfolio
  toward something closer to a Service Page's "process/methodology" section —
  a type the content now actually delivers well.
- The self-disclosure is best-practice: "Concept build" appears at the top of
  every relevant card *and* inside the page meta description of both concept
  case studies (confirmed in the fetched `<meta>` tags), so even a search
  snippet or share preview carries the honesty forward, not just the on-page
  copy. Very few competitor agency sites do this.
- Volume tripled and depth roughly quadrupled per entry — /work is no longer
  thin by any reasonable definition.

**What's not fixed:**
- **The destination still self-identifies as a portfolio.** The page's `<h1>`
  is still "Our Work," the `<title>` tag is still "Our Work | GoodGround
  Website Development," and the URL is still `/work`. A visitor who clicks
  "Craft" in the nav lands on a page that immediately calls itself "Our Work"
  — the softened entry point doesn't carry through to the destination's own
  self-labelling. This is a smaller, more subtle version of the same
  mismatch: the promise changed, the delivery format didn't fully follow.
- **The SERP consensus this page is implicitly competing against hasn't
  moved.** A fresh check of "web design agency portfolio South Africa" (run
  for this audit) is still dominated by directory listings and agency
  portfolio pages built around **real, named enterprise clients with logos**
  (Designtalks' portfolio leads with Sasol, FNB, Takealot, Old Mutual,
  Vodacom; WebDevine has a dedicated `/web-design-portfolio/` page). That is
  still the page type Google rewards and visitors expect for this intent.
  GoodGround's /work, however framed, still has zero entries in that category.
- **Two of three entries are still concept builds, not client work.** The
  ratio didn't improve — it went from 1-of-1 concept to 2-of-3 concept. A
  visitor who reads all three now sees a clear, established *pattern*
  (concept, concept, self-referential) rather than what a single early-stage
  entry could plausibly read as ("they're just getting started"). More
  content makes the pattern more legible, not less, to a comparison-shopping
  visitor scanning for real client proof.
- **The Industry-Specific Searcher gap is completely unchanged.** None of the
  three entries — a DTC product page, a fictional surf academy, and the
  studio's own marketing site — maps to any of the six verticals the site
  itself targets under /services (trades, health & wellness, hospitality &
  food, retail, professional & consulting, non-profits). This persona still
  gets zero industry-matched proof from /work, identically to the prior
  audit.

### Verdict

**Downgrade CRITICAL → HIGH.** The rename plus the honest, detailed
disclosure is a genuine improvement in tone and depth, and it likely helps a
narrower "technical evaluator" persona who cares about demonstrated build
quality more than client roster (see Persona Scores below — this persona
scores well). But for the two personas the original finding was built on —
Comparison-Shopping SMB Owner and Industry-Specific Searcher — the underlying
problem (no third-party-verified client work, no vertical-matched proof) is
untouched. The fix addressed the page's *tone* and *framing*, not its
*evidentiary content*. That still requires either a real client project (even
one) or an explicit acknowledgement on /work itself that industry-specific
proof doesn't exist yet (the same "honest in-progress line" recommendation
made in the prior audit for the /services vertical pages, not yet applied to
/work).

---

## Fresh persona pass across the funnel (homepage → /services → /work → /pricing → /start-project)

Five personas, derived from this run's SERP checks (fresh WebSearch queries run
for "website developer South Africa," "web design agency portfolio South
Africa," and "website design packages pricing South Africa") plus the site's
own declared segmentation.

**Comparison-Shopping SMB Owner** — Role: owner evaluating 3-4 studios before
committing. Goal: find a reason to pick this studio over a directory-listed
competitor. Journey stage: Consideration. SERP evidence: "web design agency
portfolio South Africa" surfaces agency portfolio pages built around named
enterprise clients and directory listicles (mo.agency, TechBehemoths,
DesignRush) — the category norm is a client roster.

**Industry-Specific Searcher** — Role: trades/health/hospitality/retail/
professional/non-profit business owner. Goal: see a site built for a business
like theirs. Journey stage: Consideration. SERP evidence: the site's own
/services and homepage both build dedicated sections for six verticals,
setting an internal expectation that /work should be able to match at least
one.

**Budget-Conscious SME Owner** — Role: owner who wants a number before a call.
Goal: self-serve pricing without a sales conversation. Journey stage:
Decision. SERP evidence: "website design packages pricing South Africa" is
dominated by price-forward titles and cost-breakdown guides (from R2,950 /
R1,990 / R5,000 framing across multiple competitors).

**Quote-Seeking / Ready-to-Start Owner** — Role: owner who has already decided
and wants to begin. Goal: start the project with minimal friction. Journey
stage: Decision. SERP evidence: "website developer South Africa" results
mix directories with agency sites whose primary CTA is a quote/contact form —
low-friction intake is the norm being competed against.

**Craft-Curious Technical Evaluator** — NEW this run, generated directly by
the "Craft" reframe and the metrics-heavy case-study content (Lighthouse
scores, LCP times, image-weight reduction, "check it yourself" framing).
Role: a technically literate visitor — could be another designer, a referring
partner, or an owner who has been burned by a slow site before. Goal: judge
actual build quality, not client roster. Journey stage: Consideration. SERP
evidence: none directly (this persona isn't reachable via the "portfolio"
SERP) — it's a signal generated by the page's own content shift, included
because it shows the reframe did land for someone, even though it isn't the
primary audience /work needs to win.

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Craft-Curious Technical Evaluator | 22/25 | 21/25 | 18/25 | 15/25 | **76/100** | Good |
| Budget-Conscious SME Owner | 24/25 | 22/25 | 15/25 | 20/25 | **81/100** | Excellent |
| Quote-Seeking / Ready-to-Start Owner | 23/25 | 21/25 | 13/25 | 22/25 | **79/100** | Good |
| Industry-Specific Searcher | 18/25 | 17/25 | 6/25 | 16/25 | **57/100** | Needs Work |
| Comparison-Shopping SMB Owner | 19/25 | 17/25 | 9/25 | 14/25 | **59/100** | Needs Work |

Notes on movement vs. the 2026-08-16 scores: Comparison-Shopping moved from
60→59 (essentially flat — Relevance and Clarity ticked up slightly because
there's more to read and the page is better structured, but Trust and Action
both stayed weak or dipped: Trust because the concept-heavy pattern is now
more visible, Action because the /work index page itself has no CTA and the
persona has to navigate away to act). Industry-Specific moved from 62→57
(down slightly — with three entries now available and still zero vertical
matches, the absence reads as more deliberate than it did with one entry).

### Weakest persona: Industry-Specific Searcher (57/100)

**Top issue:** Trust (6/25) — identical root cause to the prior audit, now
slightly worse in relative terms. This persona reads /services, sees their
own industry named explicitly (e.g., "Trades & home services"), then clicks
through to /work expecting at least one matched example and finds a product
page, a fictional surf school, and the studio's own site — none of which is
a trades, health, hospitality, retail, professional-services, or non-profit
business.

**Recommended fix:** Add one honest line to each of the six /services
industry sub-pages and to the /work index acknowledging the gap directly —
e.g., on /work: *"None of the projects below are trades, health, hospitality,
retail, professional-services, or non-profit businesses yet — if that's you,
ask what we'd build for a business like yours."* This was recommended in the
prior audit for the industry pages specifically; it should now be added to
/work too, since /work is the page most likely to be visited by a persona
actively looking for that match.

### Second-weakest: Comparison-Shopping SMB Owner (59/100)

**Top issue:** Trust (9/25) and Action (14/25). This persona is the one the
original CRITICAL finding was written for. The nav/label softening helped
Relevance and Clarity marginally but didn't move Trust, and Action actually
underperforms because /work's index page — the page this persona lands on
first — has no CTA of its own; the visitor has to either read all three case
studies through to their individual "Start Your Project" links or return to
the nav.

**Recommended fix:** Two changes, low effort: (1) add a single CTA to the
/work index itself, not just the case-study detail pages — e.g., a closing
line "Want to see what we'd build for your business? Start your project" with
a link to /start-project; (2) commission or fast-track one real, named client
project (even discounted/pro-bono) so the next visitor to read all three
entries sees a genuine 1-of-4 or better ratio, not a locked 2-of-3 concept
pattern.

### Systemic issue across personas: Trust

Every persona still scores under 20/25 on Trust, and the two personas closest
to the original mismatch (Comparison-Shopping, Industry-Specific) score
under 10/25. This is the same root cause identified in the 2026-08-16 audit —
zero testimonials, zero reviews, zero client logos, anonymous article
bylines, no phone number — and the /work changes, however well executed,
did not touch it, because they added more self-published content rather than
third-party-verified proof.

---

## User stories (derived from this run's signals)

1. As a **Comparison-Shopping SMB Owner** clicking "Craft" in the nav, I want
   to quickly judge whether this studio has done work for businesses like
   mine, because that's the standard set by the SERP for "web design agency
   portfolio South Africa" (dominated by portfolios showing named enterprise
   clients), but I'm blocked by a **trust gap** — the page is honest and
   detailed, but two of three entries are self-labelled "Concept build" and
   the third is the studio measuring itself, so I still have no third-party
   evidence to check against.
   *(Source: fresh SERP check "web design agency portfolio South Africa" +
   fetched /work page content — case-study labels confirmed via live fetch.)*

2. As an **Industry-Specific Searcher** who just read a dedicated section for
   my vertical on /services or the homepage, I want /work to show me one
   matched example, because the site itself set that expectation by naming
   my industry explicitly, but I'm blocked because **none of the three /work
   entries match any of the six verticals the site targets** — same gap as
   the prior audit, now slightly more visible because there's more content
   to scan through before confirming the absence.
   *(Source: /services and homepage both list the six verticals verbatim;
   /work's three case studies parsed directly show a DTC product page, a
   fictional booking site, and the studio's own marketing site.)*

3. As a **Craft-Curious Technical Evaluator**, I want to judge actual build
   quality — not client roster — because I've seen agencies claim speed and
   deliver bloated sites before, and this page serves me unusually well: real
   Lighthouse scores, real LCP numbers, and explicit "check it yourself"
   framing on every entry.
   *(Source: parsed case-study meta descriptions and body copy — B3TTER
   "scoring 100 for accessibility... 56 MB of photography shipped as 1.5 MB,"
   Point Break "331ms LCP," GoodGround's own site "Lighthouse 100... 772ms
   LCP" — all self-reported but specific and checkable.)*

4. As a **Budget-Conscious SME Owner**, I want a firm number before I talk to
   anyone, because the SERP for pricing queries in this category is
   price-forward and comparison-heavy, and /pricing still delivers this well
   (live à la carte configurator, four fixed packages from R8,500, two
   payment options) — unchanged and still a strength.
   *(Source: fresh SERP check "website design packages pricing South Africa"
   — dominated by price-anchored titles; /pricing parse confirms configurator
   and package structure still present.)*

5. As a **Quote-Seeking / Ready-to-Start Owner**, I want to begin with minimal
   friction once I've decided, because competing agency sites in the SERP
   for "website developer South Africa" lead with quote/contact forms, and
   /start-project matches this well — a four-step, low-friction intake form
   ("New website / Website redesign / Website care plan / Not sure yet")
   with "no obligation" framing stated up front — but the **path into it from
   /work specifically is weaker than from other pages**, since the /work
   index has no CTA of its own pointing there (the case-study detail pages
   do, the index doesn't).
   *(Source: parsed /start-project body copy + /work index link audit — three
   links total, all "Read the case study," none to /start-project or
   /contact.)*

---

## Secondary findings by severity

### HIGH

**The concept-to-real ratio on /work is now a visible pattern, not a
placeholder.** With one entry, a comparison-shopping visitor could reasonably
read B3TTER as "early-stage studio, one demo, give it time." With three
entries and two still labelled "Concept build," the same visitor now reads a
consistent choice rather than a temporary gap. This doesn't mean the honesty
framing is wrong — it's the right call over fabricating client logos — but it
does mean the fix's ceiling is lower than it might first appear: more honest
content about the same underlying gap reads as more evidence of the gap, not
less.

**/work index has no CTA of its own.** Carried forward as a new, more
specific version of the prior audit's UX finding. All three links on the page
go to case studies; none goes to /start-project or /contact. The individual
case-study pages fix this (confirmed: /work/goodground-site ends with a
"Start Your Project" link), but a visitor who reads the index and doesn't
click through to any one case study reaches a soft dead end.

### MEDIUM

**Zero social proof anywhere on the site, site-wide.** Unchanged from the
prior audit — no testimonials, no client logos, no review scores. This is the
same root cause as the /work finding but spans every funnel page checked this
run (home, /services, /pricing, /start-project).

**Industry landing pages still ask for proof they don't supply.** Unchanged
from 2026-08-16 — not re-verified line-by-line this run, but the /services
page structure (six vertical sub-sections, confirmed via headings) still sets
up the same expectation /work still can't answer.

**"Our Work" title/H1 doesn't follow the "Craft" nav rename.** The page's own
self-labelling (`<title>Our Work | GoodGround Website Development</title>`,
`<h1>Our Work</h1>`, URL `/work`) still uses "Work," undercutting the softer
promise the nav rename was meant to set. If "Craft" is the intended framing,
the destination page's title and H1 should match it (e.g., "Our Craft" or
"How We Build") to avoid a promise that changes at the door and reverts once
inside.

### LOW

**No CollectionPage/ItemList schema for the three case studies on /work.**
The index currently only carries `BreadcrumbList`. Given there are now three
distinct entries, adding `ItemList` (or `CollectionPage`) with the three
`CreativeWork` entries referenced would be a small, correct enhancement —
cross-reference `/seo schema`.

---

## Gap analysis detail (see score table above for the numeric breakdown)

No material change to Page Type, UX Signals, Schema, Media, Authority, or
Freshness scoring methodology from the prior run — deltas are explained
inline in the table. Content Depth is the largest single-dimension gain this
run, driven entirely by /work's expansion from one to three case studies.

---

## Cross-skill references

- **E-E-A-T / zero client proof, anonymous authorship** → `/seo content` for
  a deep authority/trust remediation pass (unchanged recommendation from
  2026-08-16).
- **Missing `ItemList`/`CollectionPage` schema on /work** → `/seo schema` to
  generate the addition around the existing three `CreativeWork` entries.
- **/work index missing a bottom CTA** → straightforward UX fix, no
  cross-skill hand-off needed; add a link to /start-project.
- **Industry-vertical proof gap on /services and now /work** → this SXO pass
  reconfirms the prior audit's finding; still recommend the "honest
  in-progress line" fix over silence until real vertical-matched case studies
  exist.

---

## Limitations — read before acting

1. **SERP analysis used WebSearch, not a dedicated SERP-scraping tool.**
   Same limitation as the prior audit — summarized organic links only, no
   confirmed PAA list, no featured-snippet format detection, no AI Overview
   visibility, no ad density count, no South Africa-specific geolocation
   targeting confirmed. Treat the "web design agency portfolio South Africa"
   consensus (directory + named-client portfolios) as directionally reliable,
   not a certified rank-tracking result.
2. **No Search Console, GA4, or click-through data.** All persona friction
   points, including the "Action" dimension score for /work's missing CTA,
   are inferred from page content, not observed real-user behaviour (bounce
   rate on /work, whether visitors actually read all three case studies,
   etc.).
3. **This run did not re-verify every finding from 2026-08-16** — /about,
   /contact, /faq, /insights and its six articles, the "George" local-search
   finding, and the BlogPosting author-schema gap were not re-fetched this
   run. They're referenced as "carried forward, not re-checked" where
   relevant and should not be read as re-confirmed.
4. **Personas are derived from a mix of this run's fresh SERP signals and the
   site's own declared segmentation** (the six industry verticals), extended
   with one new persona (Craft-Curious Technical Evaluator) generated by the
   /work content shift itself rather than an external SERP signal — flagged
   explicitly in that persona's card.
5. **No wireframe was generated** (not requested for this run). If a visual
   IST/SOLL comparison for /work is wanted — particularly to spec the missing
   index CTA and the "Craft" vs. "Our Work" title mismatch — ask for it
   explicitly.
6. **SXO Gap Score of 74/100 is a same-methodology re-score, not an
   independently audited absolute number.** Both this run's score and the
   prior 69/100 come from the same 7-dimension rubric applied by the same
   process; treat the +5 delta as more reliable than either absolute number
   in isolation.

---

Generate a PDF report? Use `/seo google report`
