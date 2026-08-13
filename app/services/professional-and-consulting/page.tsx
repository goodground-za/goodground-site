import type { Metadata } from "next";
import { IndustryPageTemplate } from "@/components/sections/IndustryPageTemplate";
import { industryPages } from "@/content/industryPages";

const entry = industryPages.find((p) => p.slug === "professional-and-consulting")!;

export const metadata: Metadata = {
  title: entry.metaTitle,
  description: entry.metaDescription,
  alternates: { canonical: `/services/${entry.slug}` },
};

export default function ProfessionalAndConsultingPage() {
  return <IndustryPageTemplate slug={entry.slug} />;
}
