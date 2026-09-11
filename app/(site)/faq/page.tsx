import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { FAQSchema } from "@/components/Schema";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { faq } from "@/content/faq";
import { pageSocialMeta } from "@/lib/metadata";

const title = { absolute: "Frequently Asked Questions | GoodGround" };
const description =
  "Everything you need to know about payment plans, project scope, timelines, and our Google & Meta Ads growth services, before you start with GoodGround.";
const path = "/faq";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "FAQ", path: "/faq" }]} />
      <FAQSchema items={faq} id="faq-page-faq" />

      <PageHero
        eyebrow="FAQ"
        title="Every question we're actually asked."
        intro="Answered plainly, below. No chatbot, no call centre, just a straight answer or an honest admission that we haven't settled something yet."
      />

      <FAQAccordion className="mt-8 sm:mt-12" />
      <CTABand />
    </>
  );
}
