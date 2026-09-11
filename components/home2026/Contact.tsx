import Link from "next/link";
/**
 * Closing call to action.
 *
 * Ported verbatim from the delivered homepage package
 * (website-and-ops/GoodGround-Homepage-Live-Files). Styling lives in
 * home2026.css, scoped so it cannot reach the rest of the site.
 */
export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title"><div className="contact-media" aria-hidden="true"></div><div className="wrap contact-content"><p className="eyebrow">Get in touch</p><h2 id="contact-title" className="reveal">Growth<br />starts here.</h2><Link className="button button-white" href="/start-project"><span>Start your project</span><span className="button-arrow" aria-hidden="true">↗</span></Link><a className="contact-email" href="mailto:hello@goodground.co.za">hello@goodground.co.za <span aria-hidden="true">↗</span></a></div></section>
  );
}
