import Link from "next/link";
/**
 * Section 03 — the numbered service rows.
 *
 * Ported verbatim from the delivered homepage package
 * (website-and-ops/GoodGround-Homepage-Live-Files). Styling lives in
 * home2026.css, scoped so it cannot reach the rest of the site.
 */
export function Services() {
  return (
    <section className="services section-light section-pad" id="services" aria-labelledby="services-title">
          <div className="wrap"><div className="section-meta"><span className="eyebrow">03 / What we build</span><span className="eyebrow">One team, one connected process.</span></div><div className="section-heading-row"><h2 className="section-title reveal" id="services-title">What we<br />build<span className="accent-text">.</span></h2><p className="section-description reveal">One team, one connected process.<br />Here is what we do.</p></div>
            <div className="service-list">
              <Link className="service-row reveal" href="/services"><span className="service-number">01</span><div className="service-name"><span className="service-type">Flagship</span><h3>Website Development</h3></div><p>Custom-built, fast, and made to grow with your business.</p><span className="round-arrow" aria-hidden="true">↗</span></Link>
              <Link className="service-row reveal" href="/services/ux-design"><span className="service-number">02</span><div className="service-name"><span className="service-type">Included</span><h3>UX &amp; Design</h3></div><p>Every page designed around how your customers actually decide.</p><span className="round-arrow" aria-hidden="true">↗</span></Link>
              <Link className="service-row reveal" href="/services/seo"><span className="service-number">03</span><div className="service-name"><span className="service-type">Included</span><h3>SEO Foundations</h3></div><p>Built to be found, not just built to look nice.</p><span className="round-arrow" aria-hidden="true">↗</span></Link>
              <Link className="service-row reveal" href="/pricing"><span className="service-number">04</span><div className="service-name"><span className="service-type">Monthly</span><h3>Full Service</h3></div><p>Build, hosting, mailboxes, SEO, and maintenance, all for one monthly price.</p><span className="round-arrow" aria-hidden="true">↗</span></Link>
              <Link className="service-row reveal" href="/services/google-ads"><span className="service-number">05</span><div className="service-name"><span className="service-type">Growth</span><h3>Google Ads</h3></div><p>Be there the moment someone searches for you.</p><span className="round-arrow" aria-hidden="true">↗</span></Link>
              <Link className="service-row reveal" href="/services/meta-ads"><span className="service-number">06</span><div className="service-name"><span className="service-type">Growth</span><h3>Meta Ads</h3><span className="service-platforms">Facebook &amp; Instagram</span></div><p>Stay in front of the people deciding whether to trust you.</p><span className="round-arrow" aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>
  );
}
