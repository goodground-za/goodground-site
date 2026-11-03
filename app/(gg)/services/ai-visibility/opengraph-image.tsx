import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";
import { aiPage } from "@/content/aiVisibility";

export const alt = aiPage.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({ eyebrow: "Services", title: "Does AI recommend your business?" });
}
