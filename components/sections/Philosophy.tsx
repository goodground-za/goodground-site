import Image from "next/image";
import { KineticText, Reveal } from "@/components/motion/KineticText";
import { ParableLink } from "@/components/ParableModal";
import { images } from "@/content/images";

/**
 * Copy deck §1 Section 2.
 *
 * Drawn per the comp as a full-bleed forest panel: the aerial forest road reads
 * clearly behind the heading up top, then dissolves down into solid textured
 * bark (#331816) so the section hands straight off into the dark "What we build"
 * block with no seam. Text is a single readable column rather than the old
 * text-left / photo-right split — the photo IS the section now.
 */
export function Philosophy() {
  return (
    // Pulled up under the hero's "Build on GoodGround" band (which paints above
    // at z-[3]); the forest then sits behind that band's rounded bottom corners
    // instead of the cream page, so the corners read as cut out of the forest.
    <section className="grain relative isolate -mt-[64px] overflow-hidden">
      {/* Back layer: the forest photo, covering the whole panel. Portrait crop
          below sm (tall/narrow), landscape from sm up. */}
      <Image
        src={images.forestPortrait.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top sm:hidden"
      />
      <Image
        src={images.forest.src}
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover object-top sm:block"
      />
      {/* Fade the photo down into solid bark. */}
      <div aria-hidden="true" className="forest-brown absolute inset-0 z-[1]" />

      <div className="relative z-[2] mx-auto max-w-[1434px] px-6 pt-16 pb-14 sm:px-10 md:px-14 md:py-32">
        <KineticText
          tone="light"
          phrases={["Growth starts with the", "ground you build on."]}
          className="font-heading max-w-[18ch] text-[clamp(2rem,5.6vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.08} className="mt-10 max-w-[52ch]">
          <div className="text-peach/90 space-y-6 text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.6]">
            <p>
              Every business wants more enquiries and more customers. But growth doesn&rsquo;t start
              with marketing. It starts with the foundation underneath it.
            </p>
            <p>
              Good ground is where seeds take root, grow, and produce a harvest. Businesses work
              the same way. A logo without strategy has little value. A website without purpose
              rarely performs. No amount of marketing can fix a weak foundation.
            </p>
            <p className="font-heading text-peach text-[clamp(1.1rem,1.5vw,1.3rem)] leading-snug font-bold">
              That&rsquo;s the ground we help you build on, before you grow.
            </p>
            <p className="text-peach/70 max-w-[44ch] text-[15px] leading-relaxed italic">
              {/* ParableLink's default text already starts with "the", so
                  "the biblical <ParableLink/>" rendered as "the biblical the
                  Parable of the Sower". Pass the label explicitly instead. */}
              The name comes from the biblical{" "}
              <ParableLink>Parable of the Sower</ParableLink>. Good ground represents
              preparation, intention, and growth.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
