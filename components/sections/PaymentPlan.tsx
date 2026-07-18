import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";
import { images } from "@/content/images";

const steps = [
  {
    number: "1",
    title: "We scope your project",
    rest: " and agree on a fixed price — no hidden extras.",
  },
  {
    number: "2",
    title: "We split it into 12 equal monthly payments",
    rest: ", starting once your project begins.",
  },
  {
    number: "3",
    title: "You keep growing",
    rest: " — your site launches, and your investment stays predictable.",
  },
];

/**
 * Copy deck §1 Section 4, on cream per the comp.
 *
 * Copy stays illustrative: the interactive calculator/pricing page was dropped
 * per the founder, so the CTA routes into the /start-project flow where a real
 * quote is scoped rather than shown as a fixed number (dev brief §6).
 */
export function PaymentPlan() {
  return (
    <section id="payment-plan" className="px-3 py-16 sm:px-5 md:py-24">
      <div className="mx-auto max-w-[1434px]">
        <Eyebrow tone="ember">How it works</Eyebrow>

        <KineticText
          phrases={["A website you can", "actually budget for."]}
          className="font-heading text-pine mt-6 max-w-[16ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]"
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="text-bark max-w-[46ch] space-y-5 text-[clamp(0.95rem,1.25vw,1.1rem)] leading-[1.6]">
              <p>
                Most agencies ask for the full project cost upfront — before you&rsquo;ve seen a
                single page. We don&rsquo;t work that way.
              </p>
              <p>
                Every GoodGround website is split into{" "}
                <strong className="font-bold">12 equal monthly payments</strong>, so the cost of a
                proper website spreads across your year like any other monthly expense, instead of
                landing as one large invoice.
              </p>
            </div>

            <ol className="mt-8 space-y-4">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="font-heading bg-ember text-peach mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[12px] font-bold"
                  >
                    {step.number}
                  </span>
                  <p className="text-bark max-w-[44ch] text-[15px] leading-[1.6]">
                    <strong className="font-bold">{step.title}</strong>
                    {step.rest}
                  </p>
                </li>
              ))}
            </ol>

            <Reveal>
              <div className="mt-9">
                <ButtonLink href="/start-project" size="lg">
                  Find out more
                </ButtonLink>
              </div>
              <p className="text-bark-muted mt-5 text-[13px] leading-relaxed">
                Fixed price. Fixed monthly amount. No interest surprises.
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" delay={0.08}>
            <Image
              src={images.budget.src}
              alt={images.budget.alt}
              width={images.budget.width}
              height={images.budget.height}
              sizes="(max-width: 1024px) 90vw, 46vw"
              className="ml-auto h-auto w-full max-w-[560px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
