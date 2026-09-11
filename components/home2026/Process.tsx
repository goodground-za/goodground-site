import Link from "next/link";
/**
 * Section 04 — how a project runs.
 *
 * Ported verbatim from the delivered homepage package
 * (website-and-ops/GoodGround-Homepage-Live-Files). Styling lives in
 * home2026.css, scoped so it cannot reach the rest of the site.
 */
export function Process() {
  return (
    <section className="process section-dark section-pad" id="process" aria-labelledby="process-title"><div className="wrap process-layout"><div className="process-intro"><p className="eyebrow">04 / How we work</p><h2 className="section-title reveal" id="process-title">Our<br />process<span className="accent-text">.</span></h2><p>From brief to final design</p><Link className="text-link" href="/start-project">Start your project <span aria-hidden="true">↗︎</span></Link></div><ol className="process-list"><li className="reveal"><span className="step-number" aria-hidden="true">01</span><div><h3>Research</h3><p>We understand your goals, users, and friction points before shaping the solution.</p></div></li><li className="reveal"><span className="step-number" aria-hidden="true">02</span><div><h3>Direction</h3><p>We turn insights into flows, wireframes, and prototypes that make the direction clear.</p></div></li><li className="reveal"><span className="step-number" aria-hidden="true">03</span><div><h3>Design</h3><p>We design the interface, system, content, and assets with careful production detail.</p></div></li><li className="reveal"><span className="step-number" aria-hidden="true">04</span><div><h3>Revisions</h3><p>We refine the work against your feedback, tightening details until everything holds up.</p></div></li><li className="reveal"><span className="step-number" aria-hidden="true">05</span><div><h3>Handoff</h3><p>We hand off files, guidelines, and support so the work lands cleanly.</p></div></li><li className="reveal"><span className="step-number" aria-hidden="true">06</span><div><h3>Beyond Launch</h3><p>One month of support, included.</p></div></li></ol></div></section>
  );
}
