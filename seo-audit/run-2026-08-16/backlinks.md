# Backlink Profile — 2026-08-16

**Written by the main session directly.** The dedicated `seo-backlinks` agent hit the
platform's session limit mid-run; this check is quick enough to finish directly rather than
wait for a retry window.

**Tier confirmed: 0 — Common Crawl + verification only.**

```
[MISSING] Moz Link Explorer API   — no MOZ_API_KEY configured
[MISSING] Bing Webmaster Tools API — no BING_WEBMASTER_API_KEY configured
[OK] Common Crawl Web Graph
[OK] Backlink Verification Crawler
```

Same as 2026-07-20. Neither credential has been added since.

## What was checked

```
py commoncrawl_graph.py goodground.co.za --json
```

```json
{
  "in_crawl": false,
  "in_rankings": false,
  "pagerank": null,
  "top_referring_domains": [],
  "referring_domains_sample": 0,
  "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."
}
```

## Result

**Nothing found, as expected.** `goodground.co.za` does not appear in Common Crawl's web
graph at all — not zero backlinks measured, but absent from the dataset entirely, which
tracks with a studio site launched in 2026 that has not yet been picked up by Common Crawl's
periodic re-crawl (their datasets lag live the web by weeks to months, and a domain needs
inbound links from crawled pages to appear in the graph in the first place).

This is identical to the July finding. Nothing has moved, which is the expected outcome for a
6-week gap with no deliberate link-building activity in between.

## What this audit could not measure

At Tier 0, there is no visibility into:
- Total backlink count or referring domain count
- Domain Authority / Page Authority or any spam score
- Anchor text distribution
- Toxic or spammy link detection
- Individual linking pages

## What a paid tier would add, if this becomes worth investing in

- **Moz** (free tier: 2,500 rows/month) — DA/PA, spam score, anchor text. Cheapest way to get
  real numbers.
- **Bing Webmaster Tools** (free) — inbound link list as Bing sees it, plus indexation data
  that would also help the technical audit.
- **DataForSEO or Ahrefs** (paid) — the closest to Google's own view of the link graph, but
  not justified yet for a site with (confirmed) no measurable backlink profile to analyze.

## Recommendation

Not worth spending on paid backlink tooling yet — there is nothing to measure. Revisit once
the site has been live for a few months and has picked up at least a handful of real inbound
links (directories, the Google Business Profile once created, any press or partner mentions).
Common Crawl is free and sufficient to re-check periodically until then.
