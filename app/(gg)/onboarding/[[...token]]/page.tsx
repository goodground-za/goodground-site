import type { Metadata } from "next";

import { Onboarding } from "@/components/gg/onboarding/Onboarding";
import "@/components/gg/home/home.css";
import "@/components/gg/onboarding/onboarding.css";

// Private working document sent by link: never indexed, never in the sitemap, never linked from the site.
export const metadata: Metadata = {
  title: { absolute: "Client onboarding | GoodGround" },
  description: "Your private project brief for GoodGround.",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage({ params }: { params: Promise<{ token?: string[] }> }) {
  const { token } = await params;
  // The token will select the saved brief once server storage exists (open item 8); for now it only names the local draft.
  const key = (token?.[0] ?? "default").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64) || "default";
  return (
    <div className="gg">
      <Onboarding token={key} />
    </div>
  );
}
