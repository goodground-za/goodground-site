import Image from "next/image";
import { KineticText, Reveal } from "@/components/motion/KineticText";
import { ParableLink } from "@/components/ParableModal";
import { images } from "@/content/images";

/**
 * Copy deck §1 Section 2, with one client-side change carried from the comp:
 * the closing note now names the Parable of the Sower outright, where the deck
 * deliberately kept the reference implicit.
 */
export function Philosophy() {
  return (
    <section className="px-3 py-16 sm:px-5 md:py-24">
      <div className="mx-auto max-w-[1434px]">
        <KineticText
          phrases={["Growth starts with the", "ground you build on."]}
          className="font-heading text-pine max-w-[18ch] text-[clamp(2rem,5.6vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.03em]"
        />

        <div className="mt-12 grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="text-bark max-w-[46ch] space-y-6 text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.6]">
              <p>
                Every business wants the same thing — more enquiries, more customers, more
                opportunity. But growth doesn&rsquo;t start with marketing. It starts with the
                foundation underneath it.
              </p>
              <p>
                Good ground is where seeds take root, grow, and produce a harvest. Businesses work
                the same way. A logo without strategy has little value. A website without purpose
                rarely performs. No amount of marketing can fix a weak foundation.
              </p>
              <p className="font-heading text-pine text-[clamp(1.1rem,1.5vw,1.3rem)] leading-snug font-bold">
                That&rsquo;s the ground we help you build on — before you grow.
              </p>
              <p className="text-bark-muted max-w-[44ch] text-[15px] leading-relaxed italic">
                The name comes from the biblical <ParableLink />. Good ground represents
                preparation, intention, and growth.
              </p>
            </div>
          </div>

          <Reveal className="lg:col-span-6" delay={0.08}>
            <Image
              src={images.philosophy.src}
              alt={images.philosophy.alt}
              width={images.philosophy.width}
              height={images.philosophy.height}
              sizes="(max-width: 1024px) 90vw, 46vw"
              className="ml-auto h-auto w-full max-w-[560px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
