import Link from "next/link";
/**
 * The homepage footer.
 *
 * The homepage does NOT use the shared <Footer /> — the delivered design
 * ships its own, which is why the chrome moved into app/(site)/layout.tsx.
 */
export function HomeFooter() {
  return (
    <footer className="footer section-dark"><div className="wrap"><div className="footer-top"><div className="footer-contact"><img className="footer-mark" src="/home2026/goodground-mark.svg" width="64" height="64" alt="GoodGround" /><p>George, Garden Route<br />Western Cape, South Africa</p><a href="mailto:hello@goodground.co.za">hello@goodground.co.za</a></div><nav className="footer-links" aria-label="Quick links"><span className="eyebrow">Quick links</span><a href="#top">Home</a><Link href="/about">About</Link><a href="#services">Services</a><Link href="/pricing">Pricing</Link><a href="#work">Our Craft</a><Link href="/insights">Insights</Link><a href="#contact">Contact</a></nav><nav className="footer-links" aria-label="Useful links"><span className="eyebrow">Useful links</span><a href="#faq">FAQ</a><a href="/legal#privacy">Privacy Policy</a><a href="/legal#terms">Terms</a><a href="https://www.instagram.com/goodground.company" target="_blank" rel="noopener noreferrer">Instagram ↗︎</a><a href="https://www.facebook.com/share/14jTaX4tHhU/" target="_blank" rel="noopener noreferrer">Facebook ↗︎</a></nav><a className="back-top" href="#top" aria-label="Back to top">↑︎</a></div><div className="footer-wordmark"><img src="/home2026/goodground-logo.svg" width="1200" height="196" alt="GoodGround" /></div><div className="footer-bottom"><span>© 2026 GoodGround. All rights reserved.</span><span>Growth starts here.</span></div></div></footer>
  );
}
