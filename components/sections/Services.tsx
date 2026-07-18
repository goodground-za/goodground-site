import Link from "next/link";
import { Block, BlockInner } from "@/components/Block";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealGroup, RevealItem } from "@/components/motion/KineticText";
import { services } from "@/content/services";

/**
 * Copy deck §1 Section 3, on the comp's dark bark block.
 *
 * Card widths alternate 4+2 then 2+4, measured off the comp. The icons from the
 * previous direction are gone: the client's cards are type only.
 */
export function Services() {
  const ordered = [...services.filter((s) => s.flagship), ...services.filter((s) => !s.flagship)];
  const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"];

  return (
    <Block tone="bark" id="services">
      <BlockInner>
        <Eyebrow>What we do</Eyebrow>
        <h2 className="font-heading mt-6 max-w-[12ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          One team. One website. Built properly.
        </h2>
        <p className="mt-6 max-w-[46ch] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.6] text-peach/75">
          We&rsquo;re a website development studio — every project we build includes the design, UX,
          and SEO foundations to make it work, not just look good.
        </p>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-6">
          {ordered.map((service, i) => (
            <RevealItem key={service.slug} className={spans[i]}>
              <Link
                href={`/services#${service.slug}`}
                className="rounded-card bg-cream text-bark group flex h-full flex-col p-7 transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-lift md:p-9"
              >
                <span className="font-heading text-[clamp(1.25rem,2vw,1.75rem)] leading-tight font-bold tracking-[-0.02em]">
                  {service.title}
                </span>
                <span className="text-bark-muted mt-5 block max-w-[30ch] text-[15px] leading-[1.6]">
                  {service.description}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <ButtonLink href="/services" size="lg">
            Explore our services
          </ButtonLink>
        </div>
      </BlockInner>
    </Block>
  );
}
