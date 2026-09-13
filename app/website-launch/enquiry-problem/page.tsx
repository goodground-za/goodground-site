import type { Metadata } from "next";
import { LaunchOutcome } from "@/components/launch/LaunchOutcome";
import { launchEnquiry } from "@/content/websiteLaunch";
import "../launch.css";

/**
 * Where the no-JavaScript form POST lands when the enquiry could not be
 * delivered or failed validation on the server.
 *
 * A redirect cannot carry the typed values back, so this page sends the visitor
 * to the form again and offers the email address as the alternative. The
 * JavaScript path keeps every field instead, which is what nearly everyone
 * gets.
 */
export const metadata: Metadata = {
  title: { absolute: "Enquiry not sent | GoodGround" },
  robots: { index: false, follow: true },
};

export default function EnquiryProblemPage() {
  return (
    <LaunchOutcome
      tone="bad"
      heading="We couldn’t send that enquiry."
      body={launchEnquiry.failure}
    />
  );
}
