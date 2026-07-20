import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";

export const alt = "GoodGround, a website development studio in South Africa";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    title: "Website development in South Africa, paid monthly.",
  });
}
