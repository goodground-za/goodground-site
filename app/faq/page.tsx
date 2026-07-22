import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | GoodGround",
  description:
    "Everything you need to know about payment plans, project scope, timelines, and our Google & Meta Ads growth services, before you start with GoodGround.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "FAQ", path: "/faq" }]} />

      <PageHero
        eyebrow="FAQ"
        phrases={["Every question we're", "actually asked."]}
        intro={
          <>
            Answered plainly, below. No chatbot, no call centre, just a straight answer or an
            honest admission that we haven&rsquo;t settled something yet.
          </>
        }
      />

      <FAQ />
      <CTABanner />
    </>
  );
}
