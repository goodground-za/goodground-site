import Image from "next/image";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { RevealGroup, RevealItem } from "@/components/motion/KineticText";
import { images } from "@/content/images";

/**
 * Copy deck §1 Section 6, drawn per the comp as one rounded panel that starts on
 * solid pine green and dissolves down into the forest photo — the "We build
 * foundations" reasons up top, then the "Who we are" preview (AboutPreview)
 * sitting over the forest at the bottom. Both halves share a single background
 * image and gradient so the green→image blend is seamless.
 *
 * The comp rewrites the first card: the deck says "We don't open Figma until we
 * understand your business", the comp says "We don't start developing". The
 * comp is the newer client artifact, so it wins.
 */
const reasons = [
  {
    title: "Strategy before design",
    body: "We don't start developing until we understand your business. Design without strategy is decoration.",
    image: "/images/foundation-strategy.webp",
  },
  {
    title: "Built for the long term",
    body: "We think in years, not launch dates. Every decision is made with growth in mind.",
    image: "/images/foundation-longterm.webp",
  },
  {
    title: "A partner, not a vendor",
    body: "We build with you. Our Care Plans keep the relationship going after launch, without a sudden bill to go with it.",
    image: "/images/foundation-partner.webp",
  },
];

export function WhyUs() {
  return (
    // Cream gutter above and below so the rounded corners of the panel read as a
    // floating card, matching the comp's spacing off the Process card and FAQ.
    <section className="bg-cream py-4 md:py-8">
      <div className="rounded-[40px] grain bg-pine relative isolate overflow-hidden">
        {/* Shared forest photo + gradient behind both halves of the panel.
            Portrait crop below sm, landscape from sm up. */}
        <Image
          src={images.forestPortrait.src}
          alt=""
          fill
          sizes="100vw"
          className="forest-warm object-cover object-bottom sm:hidden"
        />
        <Image
          src={images.forest.src}
          alt=""
          fill
          sizes="100vw"
          className="hidden forest-warm object-cover object-bottom sm:block"
        />
        <div aria-hidden="true" className="forest-panel absolute inset-0 z-[1]" />

        <div className="relative z-[2]">
          {/* We build foundations, not just front-ends. */}
          <div className="mx-auto max-w-[1434px] px-6 pt-14 sm:px-10 md:px-14 md:pt-24">
            <h2 className="font-heading text-peach max-w-[18ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]">
              We build foundations, not just front-ends.
            </h2>

            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-6">
              {reasons.map((reason, i) => (
                <RevealItem key={reason.title}>
                  <article className="flex h-full flex-col">
                    {/* Textured image cap. */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[20px] sm:aspect-[16/11]">
                      <Image
                        src={reason.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Ember body, with the step number straddling the seam. */}
                    <div className="bg-ember relative flex flex-1 flex-col rounded-b-[20px] px-7 pt-10 pb-7">
                      <span
                        aria-hidden="true"
                        className="bg-ember border-peach/70 text-peach font-heading absolute top-0 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-[14px] font-bold tabular-nums shadow-sm"
                      >
                        {i + 1}
                      </span>
                      <h3 className="font-heading text-peach text-[17px] font-bold text-balance">
                        {reason.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.6] text-peach/85">{reason.body}</p>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Who we are — sits over the forest half of the same panel. */}
          <AboutPreview />
        </div>
      </div>
    </section>
  );
}
