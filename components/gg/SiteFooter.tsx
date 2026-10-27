import Link from "next/link";

/**
 * Canonical footer (README 4.6, from Home section 11). Used on every rebuilt
 * page, even where a frame shows a simplified one.
 *
 * `ruled`: pages without the gradient CTA above (Start project, Contact,
 * Pricing) get a top border. `stickyBar`: pages with a sticky mobile bar
 * (Industry, Pricing, Website launch) need 96px under the footer.
 */
const INSTAGRAM = "https://www.instagram.com/goodground.company";
const FACEBOOK = "https://www.facebook.com/share/14jTaX4tHhU/";
const EMAIL = "hello@goodground.co.za";

const COLUMNS = [
  {
    heading: "STUDIO",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "Our story", href: "/about#our-story" },
    ],
  },
  {
    heading: "SERVICES",
    links: [
      { label: "Website development", short: "Websites", href: "/services#website-development" },
      { label: "Full service", href: "/services#full-service" },
      { label: "SEO", href: "/services/seo" },
      { label: "Google & Meta Ads", short: "Ads", href: "/services/google-ads" },
    ],
  },
];

const LEGAL = [
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Legal", href: "/legal" },
];

function Label({ label, short }: { label: string; short?: string }) {
  if (!short) return <>{label}</>;
  // Mobile shows the shorter label (README 3.4: render one per breakpoint, never truncate).
  return (
    <>
      <span className="gg-footer__short">{short}</span>
      <span className="gg-footer__long">{label}</span>
    </>
  );
}

export function SiteFooter({ ruled = false, stickyBar = false }: { ruled?: boolean; stickyBar?: boolean }) {
  const year = new Date().getFullYear();
  const cls = ["gg-footer", ruled && "gg-footer--ruled", stickyBar && "gg-footer--sticky-bar"].filter(Boolean).join(" ");

  return (
    <footer className={cls}>
      {/* Columns FADE-UP 60ms apart. Each column carries its own reveal
          because .gg-footer__cols is display:contents on desktop, and a
          display:contents box cannot fade. */}
      <div className="gg-footer__main">
        <div className="gg-footer__brand" data-reveal="fade-up">
          {/* "The goodground logo smooth-scrolls to the top" (Home 11 note). */}
          <a className="gg-footer__logo" href="#top">
            goodground
          </a>
          <p className="gg-footer__tagline">Web development studio · South Africa</p>
        </div>
        <div className="gg-footer__cols">
          {COLUMNS.map((col, i) => (
            <nav
              key={col.heading}
              className="gg-footer__col"
              aria-label={col.heading.toLowerCase()}
              data-reveal="fade-up"
              data-delay={(i + 1) * 60}
            >
              <p className="gg-kicker gg-footer__heading">{col.heading}</p>
              {col.links.map((link) => (
                <Link key={link.href} className="gg-text-link" href={link.href}>
                  <Label {...link} />
                </Link>
              ))}
            </nav>
          ))}
          <div className="gg-footer__col" data-reveal="fade-up" data-delay={180}>
            <p className="gg-kicker gg-footer__heading">CONNECT</p>
            <a className="gg-text-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a className="gg-text-link" href={FACEBOOK} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a className="gg-text-link" href={`mailto:${EMAIL}`}>
              <Label label={EMAIL} short="Email us" />
            </a>
          </div>
        </div>
      </div>
      <div className="gg-footer__bottom">
        <p className="gg-footer__copy">© {year} GoodGround · George, Garden Route</p>
        <nav className="gg-footer__legal" aria-label="More">
          {LEGAL.map((link, i) => (
            <span key={link.href}>
              {i > 0 ? (
                <span className="gg-footer__dot" aria-hidden="true">
                  ·
                </span>
              ) : null}
              <Link className="gg-text-link" href={link.href}>
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
