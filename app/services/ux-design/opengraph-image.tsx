import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";
import { servicePages } from "@/content/servicePages";

const entry = servicePages.find((p) => p.slug === "ux-design")!;

export const alt = entry.metaTitle;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({ eyebrow: "Services", title: entry.h1 });
}
