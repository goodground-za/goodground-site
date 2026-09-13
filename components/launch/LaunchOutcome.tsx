import Link from "next/link";
import { site } from "@/content/site";
import { launchOffer, launchRoute } from "@/content/websiteLaunch";

/**
 * The confirmation screens for the no-JavaScript submission path.
 *
 * With JavaScript the enquiry form answers in place. Without it the browser
 * performs a real POST, and the route handler replies with a 303 to one of
 * these two pages. Both carry the same wording the in-page states use, so the
 * message does not depend on whether a script ran.
 *
 * Known limitation of the no-JS path, stated rather than hidden: a redirect
 * cannot carry the visitor's typed values back, so a failure there means
 * re-entering the form. The JavaScript path, which is what almost everyone
 * gets, preserves every field.
 */
export function LaunchOutcome({
  heading,
  body,
  tone,
}: {
  heading: string;
  body: string;
  tone: "ok" | "bad";
}) {
  return (
    <div className="gg-launch">
      <header className="gg-launch__header">
        <div className="gg-launch__wrap gg-launch__header-inner">
          <Link className="gg-launch__brand" href="/" aria-label="GoodGround home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home2026/goodground-logo.svg" width={182} height={30} alt="GoodGround" />
          </Link>
        </div>
      </header>

      <main id="main" className="gg-launch__section gg-launch__dark">
        <div className="gg-launch__wrap">
          <p className="gg-launch__eyebrow">{launchOffer.name}</p>
          <h1 className="gg-launch__section-title">{heading}</h1>
          <p className="gg-launch__lede">{body}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2rem", marginTop: "2.25rem", alignItems: "center" }}>
            {tone === "bad" ? (
              <Link className="gg-launch__btn gg-launch__btn--lg" href={launchRoute.path}>
                Back to the offer
              </Link>
            ) : (
              <Link className="gg-launch__btn gg-launch__btn--lg" href="/work">
                See our work
              </Link>
            )}
            <a className="gg-launch__textlink" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
