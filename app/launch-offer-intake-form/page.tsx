import type { Metadata } from "next";
import Link from "next/link";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { site } from "@/content/site";
import { intakeAssets, intakeHero, intakeRoute, intakeSections } from "@/content/launchIntake";
import "./intake.css";

/**
 * The launch-offer project form.
 *
 * WHO SEES THIS. Not the public. Johandre sends the link after someone enquires
 * about the launch offer, so the page assumes the offer is already understood
 * and gets straight to the questions. It carries no price, no availability
 * claim and no sales argument — that work has already happened on
 * /website-launch, and repeating it here would just delay someone who has
 * already said yes.
 *
 * NOINDEX. It is a private working document, not a landing page. Indexing it
 * would put a bare form in search results with no context, and would compete
 * with /website-launch for the same terms. Kept out of the sitemap too.
 *
 * ROUTING. Outside app/(site)/ for the same reason /website-launch is: the full
 * site chrome and its six-item menu would be a distraction on a page whose only
 * job is to be filled in. The URL is unaffected by that choice.
 *
 * STYLING. Namespaced .gg-intake, reading the shared @theme tokens, so it
 * inherits the brand without being able to reach another route.
 */

export const metadata: Metadata = {
  title: { absolute: intakeRoute.title },
  description: intakeRoute.description,
  alternates: { canonical: intakeRoute.path },
  robots: { index: false, follow: false },
};

export default function LaunchIntakePage() {
  return (
    <div className="gg-intake">
      <a className="gg-intake__skip" href="#main">
        Skip to the form
      </a>

      <header className="gg-intake__header">
        <div className="gg-intake__wrap gg-intake__header-inner">
          <Link className="gg-intake__brand" href="/" aria-label="GoodGround home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home2026/goodground-logo.svg" width={182} height={30} alt="GoodGround" />
          </Link>
          <p className="gg-intake__header-tag">{intakeHero.eyebrow}</p>
        </div>
      </header>

      <main id="main">
        <section className="gg-intake__hero" aria-labelledby="gi-hero-title">
          <div className="gg-intake__wrap">
            <p className="gg-intake__eyebrow">{intakeHero.eyebrow}</p>
            <h1 className="gg-intake__title" id="gi-hero-title">
              {intakeHero.heading}
            </h1>
            <p className="gg-intake__standfirst">{intakeHero.standfirst}</p>

            <ul className="gg-intake__points">
              {intakeHero.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            {/* What the form covers, before anyone starts. Seeing the whole
                shape up front is what stops a long form feeling endless. */}
            <div className="gg-intake__toc">
              <p className="gg-intake__toc-title">What we will ask about</p>
              <ol>
                {intakeSections.map((section) => (
                  <li key={section.id}>
                    <a href={`#section-${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="gg-intake__assets" aria-labelledby="gi-assets-title">
          <div className="gg-intake__wrap">
            <div className="gg-intake__assets-card">
              <h2 className="gg-intake__assets-title" id="gi-assets-title">
                {intakeAssets.heading}
              </h2>
              <p>{intakeAssets.body}</p>
              <ul>
                {intakeAssets.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {/* A link only when there is a real one. While the folder is
                  created per client and emailed, the copy above already says
                  so, which is true — rather than printing a dead placeholder. */}
              {intakeAssets.driveUrl ? (
                <a
                  className="gg-intake__btn gg-intake__btn--quiet"
                  href={intakeAssets.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open your upload folder
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="gg-intake__body">
          <div className="gg-intake__wrap">
            <IntakeForm />
          </div>
        </section>
      </main>

      <footer className="gg-intake__footer">
        <div className="gg-intake__wrap gg-intake__footer-inner">
          <Link className="gg-intake__brand" href="/" aria-label="GoodGround home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home2026/goodground-logo.svg" width={182} height={30} alt="GoodGround" />
          </Link>
          <div className="gg-intake__footer-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link href="/legal#privacy">Privacy Policy</Link>
            <Link href="/legal#terms">Terms</Link>
          </div>
          <p className="gg-intake__footer-legal">
            &copy; 2026 {site.legalName}. {site.address.locality}, {site.address.region}, South
            Africa.
          </p>
        </div>
      </footer>
    </div>
  );
}
