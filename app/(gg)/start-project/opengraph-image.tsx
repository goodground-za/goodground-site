import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";

export const alt = "Start your project with GoodGround";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Start your project",
    title: "Let's plant something that grows.",
  });
}
