import type { Metadata } from "next";
import Link from "next/link";
import { intakeCopy, intakeRoute } from "@/content/launchIntake";
import { site } from "@/content/site";
import "../intake.css";

/**
 * Where the no-JavaScript form POST lands when the brief did NOT reach us —
 * a validation failure, a rejected delivery or a blocked request.
 *
 * It says so plainly and offers a way through rather than implying the form
 * arrived. Without JavaScript the answers are gone, which is the honest cost of
 * that path, so this page points at email as the alternative rather than
 * pretending a retry is free.
 */
export const metadata: Metadata = {
  title: { absolute: "Your form did not send | GoodGround" },
  robots: { index: false, follow: false },
};

export default function IntakeProblemPage() {
  return (
    <div className="gg-intake gg-intake--outcome">
      <main className="gg-intake__wrap" id="main">
        <div className="gg-intake__done gg-intake__done--bad">
          <h1>That did not send.</h1>
          <p>{intakeCopy.failure}</p>
          <p>
            You can{" "}
            <Link href={intakeRoute.path}>go back and try the form again</Link>, or email us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will take your answers that
            way instead.
          </p>
        </div>
      </main>
    </div>
  );
}
