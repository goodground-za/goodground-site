import Image from "next/image";
import Link from "next/link";
import { footerLinks, legalLinks, site } from "@/content/site";
import { CloudDivider } from "@/components/home-test/CloudDivider";
import { SocialIcon } from "@/components/SocialIcon";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";

/**
 * Same real content as the live site's footer (Quick Links / Useful Links /
 * Get in touch, socials, NAP) — only the visual system changes. Reuses the
 * real `SocialIcon` brand marks rather than the mockup's literal "FB"/"IG"
 * text circles, since the live site already carries the proper brand SVGs
 * and there's no reason to regress to a text placeholder here.
 */
export function HomeTestFooter() {
  const year = new Date().getFullYear();

  return (
    // z-40 continues the ascending overlap stack (... < WhatWeBuild z-30) —
    // the cloud divider below pokes up into CTABand's reserved cream strip,
    // so this needs to out-rank everything painted before it.
    <footer className="bg-ht-purple relative z-40">
      <CloudDivider
        fill="var(--color-ht-purple)"
        className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full -translate-y-full"
      />

      <div className="relative z-[2] mx-auto max-w-[1600px] px-6 pt-20 pb-10 sm:px-10 md:px-14">
        <RevealStagger className="grid gap-10 md:grid-cols-12" y={20}>
          <div className="md:col-span-4">
            <Image
              src="/home-test/logos/gg-mark.svg"
              alt="GoodGround"
              width={64}
              height={46}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="font-ht-display text-ht-pink mt-4 text-[15px] font-bold">
              {site.tagline}
            </p>

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

          <div className="md:col-span-4">
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
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors duration-150 hover:text-white"
                  >
                    {site.email}
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
            src="/home-test/logos/gg-horizontal.svg"
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
