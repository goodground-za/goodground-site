import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";
import { industryPages } from "@/content/industryPages";

const entry = industryPages.find((p) => p.slug === "health-and-wellness")!;

export const alt = entry.metaTitle;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({ eyebrow: "Industries", title: entry.h1 });
}
