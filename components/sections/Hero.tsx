import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { Wordmark } from "@/components/Logo";
import { Reveal } from "@/components/motion/KineticText";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { images } from "@/content/images";

/**
 * Per the client's comp: the wordmark IS the H1, set enormous across the cream
 * field, with the seedling photo below breaking out of its own frame, and the
 * orange band carrying the pitch and the CTAs.
 *
 * The comp's subhead drops the copy deck's 12-payment sentence. That is the
 * studio's one differentiator, so the micro-trust line is kept under the CTAs
 * (client-approved) to hold it in the first fold.
 */
export function Hero() {
  return (
    <>
      <section className="px-3 pt-8 pb-0 sm:px-5 sm:pt-12">
        <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
          {/* The whole heading is one H1: the giant wordmark plus the keyword
              subtitle, so the page's main heading actually contains "Website
              Development ... South Africa" for ranking, not just the brand name.
              Montserrat Bold renders "GoodGround" at a fixed 6.45:1 width-to-
              font-size ratio, so the wordmark fills the measured gutter exactly
              at any width instead of a vw guess that drifts. */}
          <h1 className="text-pine">
            <MaskReveal className="text-[calc((100vw-48px)/6.45)] leading-[0.8] md:text-[min(calc((100vw-128px)/6.45),202px)]">
              <Wordmark />
            </MaskReveal>
            <MaskReveal
              delay={0.4}
              duration={0.7}
              className="font-heading text-bark mt-5 text-[clamp(0.95rem,1.6vw,1.4rem)] leading-tight font-bold"
            >
              Website Development &amp; Design Studio
              <span className="block">South Africa</span>
            </MaskReveal>
          </h1>
        </div>
      </section>

      {/* Pre-masked artwork: rounded corners and the transparent break-out are
          baked into the PNG, so it is placed at its own ratio and never cropped. */}
      <div className="relative -mt-[4vw] px-3 sm:px-5">
        <div className="mx-auto max-w-[1434px]">
          <Image
            src={images.header.src}
            alt={images.header.alt}
            width={images.header.width}
            height={images.header.height}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* The orange band overlaps the image bottom, as drawn. */}
      <div className="relative z-[3] -mt-[8vw] px-3 sm:px-5">
        <div className="bg-ember rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
          <div className="relative z-[2] px-6 py-12 text-center sm:px-10 md:py-16">
            <Reveal>
              <p className="font-heading text-[clamp(0.9rem,1.4vw,1.05rem)] font-bold">Build on</p>
              <p className="font-heading mt-1 text-[clamp(1.75rem,4.2vw,3.5rem)] leading-none font-bold tracking-[-0.02em]">
                GoodGround
              </p>

              <p className="mx-auto mt-7 max-w-[52ch] text-[clamp(1rem,1.9vw,1.6rem)] leading-[1.3] font-normal">
                We&rsquo;re a website development studio. We build small and medium businesses a
                strong digital foundation, made to grow, not just launch.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/start-project" variant="ink" size="lg">
                  Start your project
                </ButtonLink>
                <ButtonLink href="/work" variant="peach" size="lg">
                  View our work
                </ButtonLink>
              </div>

              {/* Kept from the copy deck: the comp omits it, but this is the
                  studio's whole differentiator and it belongs above the fold. */}
              <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[13px] font-medium text-peach/85">
                {["No large upfront cost", "12 equal monthly payments", "Based in Cape Town"].map(
                  (item, i) => (
                    <li key={item} className="flex items-center gap-3">
                      {i > 0 ? (
                        <span aria-hidden="true" className="hidden size-1 rounded-full bg-peach/50 sm:block" />
                      ) : null}
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
