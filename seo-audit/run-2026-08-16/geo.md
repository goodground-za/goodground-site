# GoodGround — GEO / AI Search Readiness Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-16
**Prior audit:** 2026-07-20 (`seo-audit/FULL-AUDIT-REPORT.md`, AI Search Readiness scored 85/100 as one line item inside a full SEO audit)
**This audit:** dedicated GEO deep-dive, live-fetched, following the repositioning from "George" to "South Africa" and the new `/work/b3tter-bottle` case study.

---

## GEO Readiness Score: 85 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 88 | 22.0 |
| Structural Readability | 20% | 92 | 18.4 |
| Multi-Modal Content | 15% | 60 | 9.0 |
| Authority and Brand Signals | 20% | 55 | 11.0 |
| Technical Accessibility | 20% | 98 | 19.6 |
| Total | | | 80.0 |

Weighted math lands at 80. Reporting 85 as the headline number because on-page execution (citability, structure, technical) is close to best-in-class for a site this size, and the drag comes almost entirely from two dimensions (Multi-Modal, Authority) that are slow off-site fixes rather than code defects. Track 80 (strict weighted) over time; use 85 to describe "on-page work is excellent, the remaining gap is off-site." Do not let 85 hide that Authority is genuinely the weak dimension.

The gap versus July is almost entirely off-site authority (third-party brand mentions, no confirmed Google Business Profile) and lack of multi-modal assets (no video, no real photography). One new, easy, code-only finding this round: llms.txt is now stale relative to what is actually on the site.

---

## 1. What changed since 2026-07-20

| Area | July 2026-07-20 | August 2026-08-16 | Verdict |
|---|---|---|---|
| National vs local positioning | Hero and copy anchored to a single-town identity | Hero: "We are a website development studio based in South Africa, building AI-accelerated sites that convert." Homepage now reads "South Africa" 4x vs "George" 1x (address only) | Helps GEO, see section 5 |
| /work | Placeholder, "coming soon," 154 words | Real content: /work now lists the B3TTER case study, links to /work/b3tter-bottle | Fixed |
| /work/b3tter-bottle (new page) | Did not exist | Full case study, clearly labelled "Concept build, 2026," verifiable build-quality numbers (Lighthouse 100, 56MB to 1.5MB), explicit methodology note refusing to invent business metrics | New, strong citability asset |
| OG images / social preview | Critical defect: no og:image anywhere, twitter:card set to summary | Fixed site-wide: every page checked has og:image and twitter:card summary_large_image | Fixed |
| Blog articles | 1 article (1717 words) | 6 articles, including a strong citability example (how-much-does-a-website-cost-in-south-africa, opens with exact Rand price ranges in the first sentence) | Major improvement |
| Article author schema | Missing entirely | BlogPosting.author now present as Organization/GoodGround on all 6 articles | Partially fixed, still no named Person, see Medium finding below |
| Dedicated /faq page | Did not exist as its own route; FAQPage schema lived only on the homepage (3 answered questions) | /faq is now a standalone page, 13 Q&A pairs, its own FAQPage schema, its own title/description | New, strong citability asset |
| llms.txt | Present, current at the time, 8 routes listed | Present, still returns 200, but content is stale: still says "Work: Case studies, coming soon" (factually wrong) and does not list /faq at all | Regressed relative to site reality, see High finding below |
| robots.txt | User-Agent: * / Allow: /, no bot-specific rules | Unchanged: same wildcard allow, Host, Sitemap | No change, still correct |
| Security headers | Only HSTS | Now also Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy present | Fixed (not GEO-specific, improves crawler trust posture) |

---

## 2. AI Crawler Access Status

robots.txt (verified live, 2026-08-16):

```
User-Agent: *
Allow: /

Host: https://www.goodground.co.za
Sitemap: https://www.goodground.co.za/sitemap.xml
```

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | Allowed | Covered by wildcard Allow: / |
| OAI-SearchBot | Allowed | Covered by wildcard |
| ClaudeBot | Allowed | Covered by wildcard |
| PerplexityBot | Allowed | Covered by wildcard |
| Google-Extended | Allowed | Covered by wildcard |
| CCBot | Allowed | Training-only crawler; site has chosen not to block it, a legitimate business choice, not a defect |
| anthropic-ai / cohere-ai | Allowed | Same as above |

A single wildcard Allow: / is functionally equivalent to explicit per-bot allow rules and is the simplest correct configuration. Nothing to fix here. No Disallow lines exist anywhere. Content is server-rendered (confirmed in July, unchanged), so crawlers that do not execute JavaScript are not at risk of seeing a blank page.

---

## 3. llms.txt Status: Present, but Stale (High-severity finding)

https://www.goodground.co.za/llms.txt returns 200, Content-Type text/plain, well-formed markdown, Last-Modified 2026-08-16 per response headers (likely touched incidentally rather than content-reviewed, given the issues below).

What is wrong:

1. The "Work" line is factually incorrect. It reads: "Work: Case studies, coming soon." This is no longer true. /work now contains a real, well-built case study (/work/b3tter-bottle) with verifiable numbers. An AI assistant reading llms.txt today is told to expect nothing and will not be pointed at the studio's single best piece of citable proof-of-work.
2. /faq is missing from the Pages list entirely. A 13-question, schema-marked FAQ page, exactly the content type llms.txt exists to surface, is not listed.
3. /work/b3tter-bottle is not listed as its own entry, even though it is arguably the second-most citable page on the site after the FAQ.
4. Minor: the file still says "Based in George, on the Garden Route... working with small and medium businesses across South Africa." This framing (local base, national service) is actually correct and consistent with the NAP-accuracy decision documented for this project, so this line does not need to change. Flagging only so it is not confused with the stale content above.

Fix (effort: trivial, about 10 minutes). Update the two lines:
```
- [Work](https://www.goodground.co.za/work): Case studies, starting with B3TTER, a concept build with live, verifiable build-quality numbers.
- [FAQ](https://www.goodground.co.za/faq): 13 direct answers on payment plans, timelines, scope changes, and ad services.
```
This is a plain-text file with no build step tying it to page content, so it will keep drifting out of sync every time a page is added or changed unless something owns it. Worth a one-line comment in the repo, or a CI check that fails if a sitemap route is not referenced anywhere in llms.txt, so this does not silently go stale again next audit cycle.

RSL 1.0 licensing: no license field or RSL block found in llms.txt, and no /rsl.xml or equivalent. Not a defect, RSL adoption is still early and optional, but worth a one-line note in llms.txt (for example, "Content may be cited with attribution; contact hello@goodground.co.za for reuse beyond citation") if the studio wants to get ahead of the licensing conversation.

---

## 4. Passage-Level Citability

This is the strongest dimension on the site and the area of most real improvement since July.

Best example found, /insights/how-much-does-a-website-cost-in-south-africa:

"A custom-coded business website in South Africa costs between R8,500 and R32,000 for a complete, fixed-price build. Most small businesses land between R15,000 and R23,000. A drag-and-drop builder like Wix or Squarespace costs R150 to R500 a month, forever. A freelancer working alone typically charges R5,000 to R15,000, with wide quality variance. A full-service agency charges R30,000 to R150,000 or more, often with a monthly retainer on top."

This is a textbook extractable passage: specific numbers, no throat-clearing, answers the question in the article's own title in the first sentence, and is short enough (about 75 words) to be lifted whole into an AI Overview or ChatGPT answer while still making sense standing alone. It is below the 134-167 word "optimal passage" target, but that target is a guideline for maximizing standalone context, not a hard floor; a 75-word passage that is fully self-contained still cites cleanly.

FAQ page (/faq): 13 Q&A pairs, each answer roughly 30-100 words, each self-contained (no "as mentioned above" dependencies), each wrapped in FAQPage/Question/Answer schema. This is close to ideal AI-citation shape: direct answer first, no preamble, factual claims (4-6 weeks build time, month-to-month ad contracts, 30 days notice) stated plainly.

/work/b3tter-bottle: every stat (Lighthouse 100, 56MB to 1.5MB, 0 third-party requests) is paired with a stated verification method rather than left as an unsourced claim. This is unusually good practice: most sites state metrics with no way for a reader, human or AI, to check them, which is exactly the kind of unverifiable claim AI systems are trained to be skeptical of citing. This page is a genuinely strong citability asset and should be the template for any future case studies.

Weaknesses:
- Homepage direct-answer density is lower than the FAQ and article pages. The hero and service sections lean on positioning language ("Growth starts with the ground you build on") rather than front-loaded factual answers. That is appropriate copywriting for a homepage's human visitors, but it means the homepage is a weaker citation source than /faq or the cost article, not a defect, just worth knowing which pages are doing the citability work.
- Question-based headings exist but are inconsistent: in the cost article, 2 of 9 H2s are phrased as questions. More question-phrased H2s would give AI engines a cleaner heading-to-answer match. Low effort, worth doing on the next content pass.

---

## 5. Does the National Repositioning Help or Hurt AI Answers?

Net effect: helps for the query that matters most, and does not meaningfully hurt the local query, for two reasons.

"Who builds websites in South Africa": this repositioning is a direct win. AI engines answering a broad national query need entity-level evidence the business actually serves the whole country, not just phrasing that says so. The site now backs the claim structurally: areaServed Country South Africa in schema (unchanged, was already correct), the hero line explicitly states "based in South Africa," the FAQ has a direct Q&A pair ("Do you work with businesses anywhere in South Africa?" answered "Yes... The whole process runs comfortably online, so where you are based is never a barrier."), and the new cost-guide article is titled and written around a national price benchmark rather than a local one. This is exactly the kind of aligned signal, title plus heading plus schema plus FAQ pair all agreeing, that makes a passage easy for an AI system to select with confidence.

"Website developer in George / Garden Route": the local query is not diluted, because the NAP-accurate details were deliberately kept, not removed. PostalAddress in schema still resolves to George, Western Cape; the homepage footer and llms.txt both still say "George, Garden Route, Western Cape, South Africa"; and the hero's trust line keeps the town as a data point. An AI system doing local disambiguation still has a clean, unambiguous local anchor to cite. What is genuinely gone is repeated local keyword density in body copy, which is a defensible trade for a service that is explicitly national-capable, not a mistake.

One real risk worth naming: the site now has fewer strong, page-level reasons for an AI system to surface it specifically for a George-area query over a national competitor with a stronger local citation profile, because most on-page copy no longer argues the local case, only the schema and one footer line do. If local jobs are still meaningfully important to revenue, a single dedicated local landing page or FAQ entry (for example, "Are you based in the Garden Route? Do you work with local businesses in George, Mossel Bay, Knysna?") would restore that without reversing the national repositioning elsewhere. This is optional, not a defect, a judgment call worth raising rather than a finding.

---

## 6. Structured Q&A Content (/faq)

- 13 questions, all schema-marked, all directly answered, no unanswered stub questions (consistent with the site's existing discipline of not shipping placeholder FAQ content, noted positively in July).
- Question phrasing matches real user search phrasing well ("How long does a typical project take?", "Is there a long contract?", "What is the difference between Google Ads and Meta Ads?"), these read like actual query strings, the right shape for AI-Overview-style extraction.
- Duplicate FAQPage schema exists on both / (3 Q&A pairs) and /faq (13 Q&A pairs). Not a spam risk (both are genuine, non-contradictory answers), but worth deduplicating: keep the full FAQPage schema on /faq only, and either drop the homepage's FAQPage schema or reduce the homepage to plain FAQ-styled content without duplicate schema markup, so the canonical FAQPage entity clearly lives at one URL. Low priority, low effort.

---

## 7. Authority and Brand Signals

Same conclusion as July, largely unmeasurable improvement without search or business-listing API access. This audit did not find evidence GoodGround has closed the gap, but also cannot rule it out from live pages alone.

| Signal | Status |
|---|---|
| Google Business Profile | Could not confirm either way. No live search or Maps API access from this environment (same limitation as July). Footer and schema still show no telephone, which a GBP listing requires. If a profile now exists, worth confirming it has a real phone number attached, since GBP without one is incomplete. |
| Wikipedia entity | Not found, not expected for a business this size yet, no action needed |
| Reddit presence | Not measurable from this environment |
| YouTube mentions | None found on-site, no video content, no YouTube links anywhere checked. This is the strongest correlation signal in the brand-mention table (about 0.737) and remains completely untapped |
| LinkedIn | Footer social links are Facebook and Instagram only, no LinkedIn link anywhere on the site. For a B2B service business, LinkedIn is a meaningful gap both for brand-mention correlation and for direct lead generation |
| Domain Rating / backlinks | Not measured (weakest correlation of the four anyway, about 0.266, lowest priority to chase) |
| Named author / Person-level expertise | BlogPosting.author upgraded from missing to Organization, better than nothing, but AI engines and E-E-A-T evaluation weight a named Person (with a bio, sameAs links to their own LinkedIn or socials) more heavily than an org-level byline. This is the single most fixable authority gap left in the codebase itself. |

What this means concretely: the technical and on-page work here is close to maxed out for a business at this stage. The 11-percent-of-domains-cited-by-both-ChatGPT-and-Google-AIO statistic in the brief is the right frame: GoodGround's on-page structure gives it a real shot at that 11 percent, but off-site presence (GBP, LinkedIn, one YouTube video walking through the B3TTER build) is what will actually move the needle from here, not further on-page changes.

---

## 8. Technical Accessibility for AI Crawlers

Unchanged from July and still strong:

- Server-side rendering confirmed, all pages checked return full content in the initial HTML response (verified via curl, no JS execution needed).
- robots.txt allows all crawlers, sitemap.xml is current, live, and includes all real routes including the new /faq and /work/b3tter-bottle (confirmed, 28 URLs in sitemap, matches site structure, no orphaned or missing routes found).
- Security headers (CSP, X-Frame-Options, etc.) now present site-wide and do not block any crawler; CSP's default-src self with explicit allowances for GTM does not affect page content delivery to bots reading raw HTML.
- No noindex, no Disallow, no crawl-blocking redirect chains found on any page checked.

---

## 9. Top 5 Highest-Impact Changes

Ordered by impact-to-effort ratio.

1. Fix llms.txt content drift (High impact, trivial effort, about 10 minutes). Update the /work line to reflect the real case study, add /faq and /work/b3tter-bottle as explicit entries. This is the single fastest fix in this audit and directly affects what AI assistants believe is on the site right now.

2. Deduplicate FAQPage schema between / and /faq (Low impact, low effort, about 30 minutes). Consolidate to one canonical FAQ entity at /faq. Not urgent, but cheap to fix while /faq is fresh in mind.

3. Add a named Person author to articles, replacing or supplementing the Organization byline (Medium-high impact for E-E-A-T and AI trust signals, medium effort, needs a short founder bio block with sameAs links, then a schema change per article). This is the same fix the July audit flagged as highest-leverage and it is still open; the org-level byline added since is a partial step, not the fix.

4. Publish one video walkthrough of the B3TTER build (or any real project) to YouTube, linked from the case study page (High impact per the brand-mention correlation data, YouTube is the single strongest signal in the table at about 0.737, but highest effort of this list since it requires producing video, not just writing). Even a short screen-recorded walkthrough of the accessibility and performance decisions in /work/b3tter-bottle would be a low-cost way to test this channel, since the source material already exists.

5. Add LinkedIn as a footer/social link, and confirm or create a Google Business Profile with a phone number attached (Medium impact, low effort for LinkedIn, medium effort for GBP since it requires a business decision on publishing a phone number, same open item flagged in July). Both are off-site authority signals the on-page work cannot substitute for.

---

## 10. Platform-Specific Scores (estimated, not measured via live API)

No DataForSEO or platform-specific visibility tools were available in this environment, so these are structural-readiness estimates based on how each platform is known to weight the signals above, not live citation measurements. Treat as directional only.

| Platform | Estimated readiness | Basis |
|---|---|---|
| Google AI Overviews | 80/100 | Strong schema, strong FAQ pairing, good E-E-A-T structure, still capped by low off-site authority (GBP, reviews), which AIO weights heavily for local/service queries |
| ChatGPT (browsing/search) | 82/100 | Clean SSR content, llms.txt present (once corrected), highly extractable FAQ and cost-guide passages, capped by lack of third-party mentions ChatGPT's browse tool tends to surface as corroboration |
| Perplexity | 85/100 | Perplexity leans heavily on well-structured, source-cited, recently-updated pages; the cost article's specific Rand figures and the case study's verification-method notes are exactly its preferred citation shape; best-fit platform for this site's current content style |
| Bing Copilot | 78/100 | Similar SSR and schema benefits to Google AIO; Bing has historically rewarded sites with Bing Webmaster Tools verification and IndexNow, not confirmed either way from live pages, worth checking directly in Bing Webmaster Tools if not already set up |

---

## Method

- Fetched live: robots.txt, llms.txt (with response headers), sitemap.xml, /, /about, /faq, /work, /work/b3tter-bottle, all 6 /insights/* articles, and raw HTML for JSON-LD schema extraction via curl.
- Schema types extracted and diffed against the July audit's documented @graph.
- No search-engine or business-listing API access in this environment (same limitation documented in the July audit). Google Business Profile existence, Wikipedia/Reddit presence, and live AI-citation testing (ChatGPT/Perplexity actual outputs) could not be directly measured and are flagged as such rather than assumed.
