import type { Metadata } from "next";
import { LaunchOutcome } from "@/components/launch/LaunchOutcome";
import { launchEnquiry } from "@/content/websiteLaunch";
import "../launch.css";

/**
 * Where the no-JavaScript form POST lands on success. Reached only by a 303
 * from /api/website-launch AFTER the delivery provider accepted the message,
 * so arriving here is never a simulated confirmation.
 *
 * noindex: a transactional endpoint with no standalone value in search. It is
 * also kept out of the sitemap for the same reason.
 */
export const metadata: Metadata = {
  title: { absolute: "Enquiry received | GoodGround" },
  robots: { index: false, follow: true },
};

export default function EnquiryReceivedPage() {
  return (
    <LaunchOutcome
      tone="ok"
      heading="Thanks for your enquiry."
      body={launchEnquiry.success}
    />
  );
}
