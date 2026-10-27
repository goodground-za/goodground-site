import { ButtonLink } from "../Button";
import { GgShell } from "../GgShell";
import { Icon } from "../Icon";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { FocusOnLoad } from "../utility/FocusOnLoad";
import { site } from "@/content/site";
import { launchOffer, launchRoute } from "@/content/websiteLaunch";
import "../utility/utility.css";

/**
 * The confirmation screens for the no-JavaScript Website Launch enquiry path.
 *
 * With JavaScript the enquiry form answers in place. Without it the browser performs a real POST and
 * the route handler replies with a 303 to one of these two pages. Both carry the same wording the
 * in-page states use, so the message does not depend on whether a script ran.
 *
 * Known limitation of the no-JS path, stated rather than hidden: a redirect cannot carry the
 * visitor's typed values back, so a failure there means re-entering the form.
 */
export function LaunchOutcome({ heading, body, tone }: { heading: string; body: string; tone: "ok" | "bad" }) {
  const failed = tone === "bad";
  return (
    <GgShell crumbs={[{ label: "WEBSITE LAUNCH", href: launchRoute.path }, { label: failed ? "NOT SENT" : "RECEIVED" }]}>
      <section className="th" aria-labelledby="th-title">
        <div className="gg-wrap th__wrap">
          <div className="th__top" data-reveal="header">
            {failed ? (
              <span className="th__badge th__badge--fail" aria-hidden="true">
                <span>
                  <Icon name="alert" size={32} stroke={2.2} />
                </span>
              </span>
            ) : (
              <span className="th__badge" aria-hidden="true">
                <span>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
                  </svg>
                </span>
              </span>
            )}
            <Tag tone="coral" data-part="tag">
              {launchOffer.name.replace(/^The /, "").toUpperCase()}
            </Tag>
            <SplitHeading as="h1" id="th-title" className="gg-display-l th__h1" text={heading.toUpperCase()} />
            <p className="gg-lead th__lead" data-part="sub">
              {body}
            </p>
            <div className="th__fail-buttons">
              {failed ? (
                <ButtonLink href={launchRoute.path} variant="coral">
                  Back to the offer
                </ButtonLink>
              ) : (
                <ButtonLink href="/work" variant="coral">
                  See our work
                </ButtonLink>
              )}
              <ButtonLink href={`mailto:${site.email}`} variant="outline">
                {site.email}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <FocusOnLoad targetId="th-title" />
    </GgShell>
  );
}
