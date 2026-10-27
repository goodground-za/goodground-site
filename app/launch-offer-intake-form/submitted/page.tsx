import type { Metadata } from "next";
import { GgShell } from "@/components/gg/GgShell";
import { ButtonLink } from "@/components/gg/Button";
import { intakeCopy } from "@/content/launchIntake";
import "../intake.css";

/**
 * Where the no-JavaScript form POST lands on success. Reached only by a 303
 * from /api/launch-intake AFTER the delivery provider accepted the brief, so
 * arriving here is never a simulated confirmation.
 *
 * noindex: a transactional endpoint with no standalone value in search, and
 * kept out of the sitemap for the same reason.
 */
export const metadata: Metadata = {
  title: { absolute: "Project form received | GoodGround" },
  robots: { index: false, follow: false },
};

export default function IntakeSubmittedPage() {
  return (
    <GgShell crumbs={[{ label: "PROJECT FORM" }, { label: "RECEIVED" }]}>
      <div className="gg-intake gg-intake--outcome">
        <div className="gg-intake__wrap">
          <div className="gg-intake__done">
            <h1>Thank you.</h1>
            <p>{intakeCopy.success}</p>
            <ButtonLink href="/" variant="coral" className="gg-intake__home">
              Back to the home page
            </ButtonLink>
          </div>
        </div>
      </div>
    </GgShell>
  );
}
