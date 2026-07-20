import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";
import { images } from "@/content/images";

/**
 * Copy deck §1 Section 7. On cream per the comp, with the artwork bleeding to
 * the right edge and an ink button rather than a peach one.
 *
 * The founder is described by experience, not by name, at the owner's request.
 */
export function AboutPreview() {
  return (
    <section className="overflow-hidden px-3 py-12 sm:px-5 md:py-16">
      <div className="mx-auto grid max-w-[1434px] items-center gap-8 lg:grid-cols-12">
        <div className="px-3 sm:px-6 md:px-11 lg:col-span-6">
          <Eyebrow tone="ember">Who we are</Eyebrow>

          <KineticText
            phrases={["Built by people", "who care about", "the foundation."]}
            className="font-heading text-bark mt-6 max-w-[13ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.03] font-bold tracking-[-0.03em]"
          />

          <Reveal delay={0.08}>
            <p className="text-bark-muted mt-8 max-w-[44ch] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6]">
              GoodGround was founded in Cape Town&rsquo;s Northern Suburbs. We started GoodGround
              because too many good businesses were being let down by websites that looked fine and
              did nothing for them. No strategy, no structure, nothing after launch.
            </p>
            <div className="mt-9">
              <ButtonLink href="/about" variant="ink" size="lg">
                Read our story
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Bleeds off the right edge, as drawn. */}
        <div className="lg:col-span-6">
          <Image
            src={images.about.src}
            alt={images.about.alt}
            width={images.about.width}
            height={images.about.height}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="ml-auto h-auto w-full max-w-[640px]"
          />
        </div>
      </div>
    </section>
  );
}
