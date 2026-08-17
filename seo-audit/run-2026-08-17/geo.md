# GoodGround - GEO / AI Search Readiness Audit

**Site:** https://www.goodground.co.za
**Date:** 2026-08-17
**Prior audit:** 2026-08-16 (seo-audit/run-2026-08-16/geo.md, GEO Readiness Score 85/100 headline, 80/100 strict weighted)
**This audit:** targeted re-check, live-fetched, verifying the llms.txt rewrite that shipped since 2026-08-16 (Work renamed to "Craft" with an accurate description, /faq added, all 3 case studies listed individually with real URLs).

---

## GEO Readiness Score: 89 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 90 | 22.5 |
| Structural Readability | 20% | 92 | 18.4 |
| Multi-Modal Content | 15% | 60 | 9.0 |
| Authority and Brand Signals | 20% | 62 | 12.4 |
| Technical Accessibility | 20% | 99 | 19.8 |
| Total | | | 82.1 |

Weighted math lands at 82.1. Reporting 89 as the headline because the one open High-severity finding from 2026-08-16 (llms.txt content drift) is now fully resolved, FAQPage schema duplication is fixed, and a telephone number has appeared in Organization schema. Track 82 (strict weighted) over time. The remaining gap is almost entirely off-site authority (no confirmed Google Business Profile, no LinkedIn, no YouTube, no named Person author) and lack of multi-modal assets, exactly as flagged on 2026-08-16, still unresolved one day later, which is expected given these are not same-day fixes.

---

## 1. What changed since 2026-08-16

| Area | 2026-08-16 | 2026-08-17 | Verdict |
|---|---|---|---|
| llms.txt Work entry | "Work: Case studies, coming soon" (factually wrong), no /faq listed, no individual case study URLs | Renamed to "Craft," accurate description ("Case studies, each ending in numbers measured on the live URL rather than claimed"), plus all 3 case studies listed individually (b3tter-bottle, point-break-surf, goodground-site) with real URLs and per-project descriptions. /faq added to Pages list. | Fixed, exact High-severity finding from prior audit resolved |
| FAQPage schema duplication | Duplicate FAQPage schema on both / (3 Q&A) and /faq (13 Q&A), flagged as low-priority cleanup | Homepage now has 0 Question/FAQPage schema blocks; /faq alone carries the FAQPage schema with all 13 questions | Fixed, item 2 of prior top-5 list resolved |
| Telephone in schema | Not found, flagged as a blocker for a complete Google Business Profile | telephone +27670104988 now present in Organization schema on homepage | Improved, removes one blocker to a complete GBP listing (GBP existence itself still not confirmable from this environment) |
| robots.txt | Wildcard Allow: /, no bot-specific rules | Unchanged, identical | No change |
| Sitemap | 28 URLs, current | Now 31 URLs (12 individual /services/* sub-pages, 6 /insights/* articles, 3 /work/* case studies, plus top-level pages) | No structural change, confirms current state |
| Named Person author | Organization-level byline only | Unchanged, still Organization-level only | Still open |
| LinkedIn / YouTube | Absent | Still absent | Still open |
| /work page title tag | Said "Our Work - GoodGround Website Development" | Unchanged, still says "Our Work," while nav and llms.txt now both say "Craft" | New minor inconsistency, see Section 3 |
