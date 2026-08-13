import type { Metadata } from "next";
import { IndustryPageTemplate } from "@/components/sections/IndustryPageTemplate";
import { industryPages } from "@/content/industryPages";
import { pageSocialMeta } from "@/lib/metadata";

const entry = industryPages.find((p) => p.slug === "hospitality-and-food")!;
const path = `/services/${entry.slug}`;

export const metadata: Metadata = {
  title: entry.metaTitle,
  description: entry.metaDescription,
  alternates: { canonical: path },
  ...pageSocialMeta({ title: entry.metaTitle, description: entry.metaDescription, path }),
};

export default function HospitalityAndFoodPage() {
  return <IndustryPageTemplate slug={entry.slug} />;
}
