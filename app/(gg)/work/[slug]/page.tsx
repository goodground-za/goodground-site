import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CasePage } from "@/components/gg/case/CasePage";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { site } from "@/content/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.client}: ${study.title}`;
  const description = study.standfirst;
  const url = `${site.url}/work/${study.slug}`;
  const ogImage = study.heroImage
    ? { url: study.heroImage.src, width: study.heroImage.width, height: study.heroImage.height, alt: study.heroImage.alt }
    : { url: study.image, width: 1440, height: 900, alt: study.imageAlt };

  return {
    title: { absolute: `${title} | GoodGround` },
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: "article", url, title, description, images: [ogImage] },
    // Without its own twitter block this inherits the root layout's homepage
    // title/description on X specifically — same fix as the insights pages.
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CasePage study={study} />;
}
