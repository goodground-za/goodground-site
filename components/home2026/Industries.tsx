import Link from "next/link";
/**
 * Section 07 — who it is built for.
 *
 * Ported verbatim from the delivered homepage package
 * (website-and-ops/GoodGround-Homepage-Live-Files). Styling lives in
 * home2026.css, scoped so it cannot reach the rest of the site.
 */
export function Industries() {
  return (
    <section className="industries section-dark section-pad" aria-labelledby="industries-title"><div className="wrap"><div className="section-meta"><span className="eyebrow">07 / Built for your business</span><span className="eyebrow">Across South Africa</span></div><div className="section-heading-row"><h2 className="section-title reveal" id="industries-title">Who we<br />build for<span className="accent-text">.</span></h2><p className="section-description reveal">We build for small and medium businesses across South Africa. These are the categories we know best, where being easy to find and easy to trust is usually what decides whether someone gets in touch.</p></div><div className="industry-links reveal"><Link href="/services/trades-and-home-services">Trades &amp; home services <span aria-hidden="true">↗</span></Link><Link href="/services/health-and-wellness">Health &amp; wellness <span aria-hidden="true">↗</span></Link><Link href="/services/hospitality-and-food">Hospitality &amp; food <span aria-hidden="true">↗</span></Link><Link href="/services/retail-and-small-brands">Retail &amp; small brands <span aria-hidden="true">↗</span></Link><Link href="/services/professional-and-consulting">Professional &amp; consulting services <span aria-hidden="true">↗</span></Link><Link href="/services/non-profits-and-community">Non-profits &amp; community <span aria-hidden="true">↗</span></Link></div></div></section>
  );
}
