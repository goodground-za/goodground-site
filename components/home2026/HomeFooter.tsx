import Link from "next/link";

const ARROW = "\u2197\ufe0e";

/**
 * The site footer, used on every page.
 *
 * The delivered design was a single page, so five of these links pointed at
 * sections of it (`#top`, `#services`, `#work`, `#contact`, `#faq`). Once the
 * design went site-wide those became dead everywhere but the homepage: there is
 * no `#services` on /about. They now go to the pages that actually exist, and
 * the destinations match `navLinks` in content/site.ts and the menu in
 * HomeChrome, so the three cannot drift apart.
 *
 * "Our Craft" -> /work is deliberate and matches the note in site.ts: the
 * destination is one concept build plus the studio's own site, and calling it
 * "Work" in a nav promises a client portfolio that isn't there yet.
 */
const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Craft", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const USEFUL_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/legal#privacy" },
  { label: "Terms", href: "/legal#terms" },
];

export function HomeFooter() {
  return (
    <footer className="footer section-dark">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-contact">
            <Link className="footer-mark-link" href="/" aria-label="GoodGround home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="footer-mark"
                src="/home2026/goodground-mark.svg"
                width={64}
                height={64}
                alt="GoodGround"
              />
            </Link>
            <p>
              George, Garden Route
              <br />
              Western Cape, South Africa
            </p>
            <a href="mailto:hello@goodground.co.za">hello@goodground.co.za</a>
          </div>

          <nav className="footer-links" aria-label="Quick links">
            <span className="eyebrow">Quick links</span>
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="footer-links" aria-label="Useful links">
            <span className="eyebrow">Useful links</span>
            {USEFUL_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/goodground.company"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <span aria-hidden="true">{ARROW}</span>
            </a>
            <a
              href="https://www.facebook.com/share/14jTaX4tHhU/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook <span aria-hidden="true">{ARROW}</span>
            </a>
          </nav>

          {/* #top is the header's id, which every page renders, so this stays an
              in-page anchor rather than becoming a route. */}
          <a className="back-top" href="#top" aria-label="Back to top">
            {"\u2191\ufe0e"}
          </a>
        </div>

        <Link className="footer-wordmark" href="/" aria-label="GoodGround home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/home2026/goodground-logo.svg" width={1200} height={196} alt="GoodGround" />
        </Link>

        <div className="footer-bottom">
          <span>© 2026 GoodGround. All rights reserved.</span>
          <span>Growth starts here.</span>
        </div>
      </div>
    </footer>
  );
}
