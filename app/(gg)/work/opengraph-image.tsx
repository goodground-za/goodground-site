import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";

export const alt = "GoodGround work: built, then measured";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Our Work",
    title: "Built, then measured.",
  });
}
