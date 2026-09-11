import Link from "next/link";
/**
 * Section 02 — the project grid.
 *
 * Ported verbatim from the delivered homepage package
 * (website-and-ops/GoodGround-Homepage-Live-Files). Styling lives in
 * home2026.css, scoped so it cannot reach the rest of the site.
 */
export function Work() {
  return (
    <section className="work section-dark section-pad" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <div className="section-meta"><span className="eyebrow">02 / Our craft</span><Link className="text-link" href="/work">View all <span aria-hidden="true">↗︎</span></Link></div>
            <div className="section-heading-row"><h2 className="section-title reveal" id="work-title">Work<span className="accent-text">.</span></h2><p className="section-description reveal">Real builds, not mockups. Every project below is live at a public URL you can open, click through, and test yourself. Some are client work and some are concept builds, and each one says which it is.</p></div>
            <div className="project-grid">
              <article className="project reveal"><Link className="project-image" href="/work/b3tter-bottle" aria-label="Latest project: view B3TTER project"><img src="/home2026/b3tter.webp" width="1042" height="1218" loading="lazy" alt="The B3TTER bottle website displayed on a laptop" /><span className="project-badge">Latest project</span><span className="project-open" aria-hidden="true">↗︎</span></Link><div className="project-info"><h3><Link href="/work/b3tter-bottle">B3TTER</Link></h3><span className="project-kind">Concept build</span></div><div className="tags"><span>Design</span><span>Development</span><span>Accessibility</span></div><p className="project-description">B3TTER is our own concept build: a complete product website for an insulated bottle, designed to look expensive, work for every visitor, and still load fast with dozens of high-resolution photos on the page.</p></article>
              <article className="project project-offset reveal"><Link className="project-image" href="/work/point-break-surf" aria-label="View Point Break Surf Academy project"><img src="/home2026/point-break.webp" width="1042" height="1218" loading="lazy" alt="The Point Break Surf Academy website on a laptop" /><span className="project-open" aria-hidden="true">↗︎</span></Link><div className="project-info"><h3><Link href="/work/point-break-surf">Point Break Surf Academy</Link></h3></div><div className="tags"><span>Design</span><span>Development</span><span>Booking UX</span></div></article>
              <article className="project reveal"><Link className="project-image project-image-wide" href="/work/goodground-site" aria-label="View GoodGround project"><img src="/home2026/goodground.webp" width="1600" height="1000" loading="lazy" alt="The GoodGround website showing the studio's work and brand" /><span className="project-open" aria-hidden="true">↗︎</span></Link><div className="project-info"><h3><Link href="/work/goodground-site">GoodGround</Link></h3></div><div className="tags"><span>Design</span><span>Development</span><span>SEO</span></div></article>
              <article className="project project-offset reveal"><Link className="project-image project-image-wide" href="/work/sunbird-early-learners" aria-label="View Sunbird Early Learners project"><img src="/home2026/sunbird.webp" width="1042" height="1218" loading="lazy" alt="The Sunbird Early Learners website with its green colour palette" /><span className="project-open" aria-hidden="true">↗︎</span></Link><div className="project-info"><h3><Link href="/work/sunbird-early-learners">Sunbird Early Learners</Link></h3></div><div className="tags"><span>Design</span><span>Development</span><span>Motion</span></div></article>
            </div>
            <div className="work-next reveal"><div><h3>Your project could be next</h3><p>We’re a young studio and we’d rather show you real, testable work than pad this out with stock mock-ups.</p></div><Link className="button button-white" href="/start-project"><span>Start your project</span><span className="button-arrow" aria-hidden="true">↗︎</span></Link></div>
          </div>
        </section>
  );
}
