import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/app/_og/card";

export const alt = "GoodGround website development services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Services",
    title: "Websites built properly. Paid for sensibly.",
  });
}
