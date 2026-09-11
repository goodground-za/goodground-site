import Link from "next/link";
/**
 * Section 06 — the thinking behind the work.
 *
 * Ported verbatim from the delivered homepage package
 * (website-and-ops/GoodGround-Homepage-Live-Files). Styling lives in
 * home2026.css, scoped so it cannot reach the rest of the site.
 */
export function Strategy() {
  return (
    <section className="strategy section-light section-pad" aria-labelledby="strategy-title"><div className="wrap"><div className="section-meta"><span className="eyebrow">06 / Why we start here</span><span className="eyebrow">Preparation. Intention. Growth.</span></div><div className="strategy-layout"><div><h2 className="section-title reveal" id="strategy-title">Our<br />strategy<span className="accent-text">.</span></h2><div className="origin-note reveal"><h3>Where the name comes from</h3><p>The name comes from the biblical Parable of the Sower: a farmer scatters seed on a path, on rocky ground, among thorns, and on good soil. Only the good soil, prepared and deep-rooted, produces a harvest. Good ground represents preparation, intention, and growth. That’s the ground we help you build on, before you grow.</p><Link className="text-link" href="/about">Read the full story <span aria-hidden="true">↗︎</span></Link></div></div><div className="strategy-points"><article className="reveal"><span>01</span><div><h3>Foundation first</h3><p>We start with your business and your customers, not a blank canvas. Strategy gets agreed before anything gets designed, because a website without purpose rarely performs, however good it looks.</p></div></article><article className="reveal"><span>02</span><div><h3>Built to be found</h3><p>Every site we build carries its SEO foundations from day one: fast load times, proper page structure, and content built around how your customers actually search. Not a second project six months later to fix it.</p></div></article><article className="reveal"><span>03</span><div><h3>Designed around the decision</h3><p>We map what a visitor needs to see, and in what order, before they trust you enough to act. Every page is laid out around the decision your customer is actually making, not a generic template.</p></div></article><article className="reveal"><span>04</span><div><h3>Support past launch</h3><p>Launch is the start, not the finish line. One month of support is included with every project, and our Full Service package can take hosting, mailboxes, SEO, and maintenance off your hands after that.</p></div></article></div></div></div></section>
  );
}
