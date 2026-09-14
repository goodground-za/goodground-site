import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="gg-intake gg-intake--outcome">
      <main className="gg-intake__wrap" id="main">
        <div className="gg-intake__done">
          <h1>Thank you.</h1>
          <p>{intakeCopy.success}</p>
          <Link className="gg-intake__btn" href="/">
            Back to the GoodGround home page
          </Link>
        </div>
      </main>
    </div>
  );
}
