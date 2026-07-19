import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { footerLinks, legalLinks, site } from "@/content/site";
import { FooterLogo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

/**
 * Per the comp: the seedling artwork sits behind, with a bark card overlaid and
 * the plant breaking out above it.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[1434px]">
        <div className="rounded-block overflow-hidden">
          <Image
            src={images.footer.src}
            alt=""
            width={images.footer.width}
            height={images.footer.height}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Overlaps the artwork, as drawn, leaving the seedling visible above. */}
        <div className="rounded-block bg-bark grain text-peach -mt-[26%] overflow-hidden sm:-mt-[22%]">
          <div className="relative z-[2] px-6 pt-12 pb-8 sm:px-10 md:px-14 md:pt-16">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
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
                          className="bg-peach text-bark font-heading grid size-9 place-items-center rounded-full text-[12px] font-bold"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <nav aria-label="Footer" className="md:col-span-3">
                <ul className="space-y-2.5">
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

            <div className="mt-12 flex flex-col gap-4 border-t border-peach/15 pt-5 text-[13px] text-peach/60 sm:flex-row sm:items-center sm:justify-between">
              <p>© {year} GoodGround. All rights reserved.</p>
              <ul className="flex gap-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-pill border border-peach/25 px-4 py-1.5 transition-colors duration-150 hover:border-peach/60 hover:text-peach"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
