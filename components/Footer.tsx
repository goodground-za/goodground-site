import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { footerLinks, legalLinks, site } from "@/content/site";
import { FooterLogo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { SocialIcon } from "./SocialIcon";

/**
 * Per the comp: the seedling artwork sits behind, with a bark card overlaid and
 * the plant breaking out above it.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto">
      <div className="relative">
        <div className="overflow-hidden rounded-t-[40px]">
          <Image
            src={images.footer.src}
            alt=""
            width={images.footer.width}
            height={images.footer.height}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Overlaps the artwork, as drawn, leaving the seedling visible above.
            Rounded top corners match the comp's footer card. */}
        <div className="bg-bark grain text-peach rounded-t-[40px] -mt-[26%] overflow-hidden sm:-mt-[22%]">
          <div className="relative z-[2] mx-auto max-w-[1434px] px-6 pt-12 pb-8 sm:px-10 md:px-14 md:pt-16">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <Link href="/" className="inline-block" aria-label="GoodGround — home">
                  <FooterLogo />
                </Link>
                <p className="font-heading mt-3 text-[15px] font-bold">{site.tagline}</p>

                {site.socials.length > 0 ? (
                  <ul className="mt-6 flex gap-3">
                    {site.socials.map((social) => (
                      <li key={social.href}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GoodGround on ${social.name}`}
                          className="bg-peach text-bark grid size-9 place-items-center rounded-full transition-transform duration-150 hover:scale-105"
                        >
                          <SocialIcon platform={social.platform} className="size-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <nav aria-label="Quick links" className="md:col-span-2">
                <h2 className="font-heading text-[15px] font-bold">Quick Links</h2>
                <ul className="mt-4 space-y-2.5">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-heading text-[15px] font-bold text-peach/85 transition-colors duration-150 hover:text-peach"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Useful links" className="md:col-span-2">
                <h2 className="font-heading text-[15px] font-bold">Useful Links</h2>
                <ul className="mt-4 space-y-2.5">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-heading text-[15px] font-bold text-peach/85 transition-colors duration-150 hover:text-peach"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="md:col-span-4">
                <h2 className="font-heading text-[15px] font-bold">Get in touch</h2>
                <address className="mt-4 space-y-4 text-[14px] not-italic text-peach/75">
                  <p>
                    {site.address.city}
                    <br />
                    {site.address.region}, South Africa
                  </p>
                  {site.email ? (
                    <p>
                      Email address
                      <br />
                      <a
                        href={`mailto:${site.email}`}
                        className="transition-colors duration-150 hover:text-peach"
                      >
                        {site.email}
                      </a>
                    </p>
                  ) : null}
                  {site.phone ? (
                    <p>
                      <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-peach">
                        {site.phone}
                      </a>
                    </p>
                  ) : null}
                </address>

                <NewsletterForm />
              </div>
            </div>

            <div className="mt-12 border-t border-peach/15 pt-5 text-[13px] text-peach/60">
              <p>© {year} GoodGround. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
