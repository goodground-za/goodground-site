import Link from "next/link";
/**
 * Section 01 — who GoodGround is, with the stats strip.
 *
 * Ported verbatim from the delivered homepage package
 * (website-and-ops/GoodGround-Homepage-Live-Files). Styling lives in
 * home2026.css, scoped so it cannot reach the rest of the site.
 */
export function Intro() {
  return (
    <section className="intro section-light section-pad" id="about" aria-labelledby="intro-title">
          <div className="wrap">
            <div className="section-meta"><span className="eyebrow">01 / GoodGround</span><Link className="text-link" href="/about">About us <span aria-hidden="true">↗︎</span></Link></div>
            <div className="intro-layout">
              <div className="intro-visual reveal"><img src="/home2026/studio.webp" width="1024" height="1024" loading="lazy" alt="A dual-monitor workspace showing code and a website in progress" /><div className="image-caption"><span>Strategy. Design. Development.</span><span aria-hidden="true">↗︎</span></div></div>
              <div className="intro-copy"><h2 className="display-heading reveal" id="intro-title">We build <span className="accent-text">AI-accelerated, search-first</span> websites and digital systems that help category leaders lead their industries.</h2><div className="intro-note reveal"><p>Every business wants the same thing: more enquiries, more customers, more opportunity. But growth doesn’t start with marketing. It starts with the foundation underneath it.</p><a className="button button-orange" href="#services"><span>All services</span><span className="button-arrow" aria-hidden="true">↗︎</span></a></div></div>
            </div>
            <div className="stats reveal"><div><strong>01</strong><span>team, one connected process.</span></div><div><strong>20<span>+</span></strong><span>years combined experience</span></div><div><strong>10<span>+</span></strong><span>projects completed</span></div><div><strong>100<span>%</span></strong><span>satisfied clients</span></div></div>
          </div>
        </section>
  );
}
