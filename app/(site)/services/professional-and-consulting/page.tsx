import type { Metadata } from "next";
import { IndustryPageTemplate } from "@/components/sections/IndustryPageTemplate";
import { industryPages } from "@/content/industryPages";
import { pageSocialMeta } from "@/lib/metadata";

const entry = industryPages.find((p) => p.slug === "professional-and-consulting")!;
const path = `/services/${entry.slug}`;

export const metadata: Metadata = {
  title: entry.metaTitle,
  description: entry.metaDescription,
  alternates: { canonical: path },
  ...pageSocialMeta({ title: entry.metaTitle, description: entry.metaDescription, path }),
};

export default function ProfessionalAndConsultingPage() {
  return <IndustryPageTemplate slug={entry.slug} />;
}
