import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";

/**
 * The studio's one differentiator, given the emphasis colour and a full-bleed
 * band so it can't be missed (PRODUCT.md: "hero-level treatment, not a pricing
 * footnote"). A compact reinstatement of the old §4 section after it was cut in
 * the full-bleed redesign. The number is spelled out as an oversize figure, and
 * the subscription-vs-ownership line is stated plainly, which is the single
 * thing PRODUCT.md flags as most likely to be misread.
 *
 * Copy stays illustrative: no live figure. The CTA routes into /start-project
 * where a real quote is scoped (dev brief §6).
 */
export function PaymentPlan() {
  return (
    <section
      id="payment-plan"
      className="bg-ember grain text-peach relative isolate overflow-hidden"
    >
      <div className="relative z-[2] mx-auto max-w-[1434px] px-6 py-16 sm:px-10 md:px-14 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
          <div className="md:col-span-7">
            <Eyebrow>How it works</Eyebrow>

            <KineticText
              tone="light"
              phrases={["A website you can", "actually budget for."]}
              className="font-heading mt-6 max-w-[16ch] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]"
            />

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[48ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.55]">
                Most agencies want the full project cost upfront. We split every GoodGround website
                into <strong className="font-bold">12 equal monthly payments</strong>. Then it&rsquo;s
                yours. <strong className="font-bold">It&rsquo;s not a subscription</strong>, and
                you&rsquo;re not renting your website.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/start-project" variant="ink" size="lg">
                  See how it works
                </ButtonLink>
                <span className="text-[13px] leading-relaxed text-peach/80">
                  Fixed price. Fixed monthly amount. No interest surprises.
                </span>
              </div>
            </Reveal>
          </div>

          {/* The number, spelled large so it lands before the copy does. */}
          <Reveal delay={0.12} className="md:col-span-5">
            <div className="flex items-end gap-4 md:justify-end">
              <span className="font-heading text-[clamp(5rem,20vw,11rem)] leading-[0.78] font-bold tracking-[-0.05em]">
                12
              </span>
              <span className="font-heading mb-2 max-w-[7ch] text-[clamp(1rem,1.6vw,1.5rem)] leading-tight font-bold text-peach/85">
                equal monthly payments
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
