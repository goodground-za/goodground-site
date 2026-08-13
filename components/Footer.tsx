import Image from "next/image";
import Link from "next/link";
import { CloudDivider } from "@/components/CloudDivider";
import { footerLinks, legalLinks, site } from "@/content/site";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { SocialIcon } from "./SocialIcon";

/**
 * Promoted from the approved /home-test variant's HomeTestFooter — now the
 * site's only footer. z-40 continues the ascending section-overlap stack
 * used across the site (each later section outranks the one before it so
 * its own rounded/scalloped edge paints over the seam); the CloudDivider
 * below pokes up into whatever cream section precedes the footer, so that
 * section needs to reserve `pb-[24vw]` of bottom space for it (see
 * CTABand/WhoWeBuildFor-style sections).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ht-purple relative z-40">
      <CloudDivider
        fill="var(--color-ht-purple)"
        className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full -translate-y-[calc(100%-3px)]"
      />

      <div className="relative z-[2] mx-auto max-w-[1600px] px-6 pt-20 pb-16 sm:px-10 sm:pb-10 md:px-14">
        <RevealStagger className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12" y={20}>
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block" aria-label="GoodGround — home">
              <Image
                src="/logos/gg-mark.svg"
                alt="GoodGround"
                width={64}
                height={46}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="font-ht-display text-ht-pink mt-4 text-[15px] font-bold">{site.tagline}</p>

            {site.socials.length > 0 ? (
              <ul className="mt-6 flex gap-3">
                {site.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GoodGround on ${social.name}`}
                      className="bg-ht-orange grid size-9 place-items-center rounded-full text-white transition-transform duration-150 hover:scale-105"
                    >
                      <SocialIcon platform={social.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Quick links" className="md:col-span-2">
            <h2 className="font-ht-display text-[14px] font-bold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ht-body text-[14px] text-white/75 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Useful links" className="md:col-span-2">
            <h2 className="font-ht-display text-[14px] font-bold text-white">Useful Links</h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ht-body text-[14px] text-white/75 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-4">
            <h2 className="font-ht-display text-[14px] font-bold text-white">Get in touch</h2>
            <address className="font-ht-body mt-4 space-y-4 text-[14px] text-white/75 not-italic">
              <p>
                {site.address.locality}, {site.address.area}
                <br />
                {site.address.region}, South Africa
              </p>
              {site.email ? (
                <p>
                  Email address
                  <br />
                  <a href={`mailto:${site.email}`} className="transition-colors duration-150 hover:text-white">
                    {site.email}
                  </a>
                </p>
              ) : null}
              {site.phone ? (
                <p>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors duration-150 hover:text-white">
                    {site.phone}
                  </a>
                </p>
              ) : null}
            </address>
          </div>
        </RevealStagger>

        <div className="mt-14 border-t border-white/15 pt-5 text-[13px] text-white/50">
          <p>© {year} GoodGround. All rights reserved.</p>
        </div>

        <RevealSection y={16} duration={1} start="top 95%">
          <Image
            src="/logos/gg-horizontal.svg"
            alt=""
            aria-hidden="true"
            width={2090}
            height={392}
            className="mt-6 h-auto w-full opacity-10 brightness-0 invert select-none"
          />
        </RevealSection>
      </div>
    </footer>
  );
}
