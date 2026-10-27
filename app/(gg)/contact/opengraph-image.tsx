import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";

export const alt = "Contact GoodGround";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Contact",
    title: "Let's build something that lasts.",
  });
}
