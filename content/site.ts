/**
 * Single source of truth for NAP, routes and social links.
 * Fields marked TODO are unconfirmed — see the copy deck §0. Do not invent
 * values: these feed LocalBusiness schema, where a wrong number is worse than
 * an absent one.
 */

export const site = {
  name: "GoodGround",
  // Registered entity, confirmed by the founder 2026-07-23. GoodGround no
  // longer operates under The Trail Tribe — it's its own registered company.
  legalName: "GoodGround (Pty) Ltd",
  registrationNumber: "2024/641034/07",
  vatRegistered: false, // not VAT registered — all displayed prices are VAT inclusive
  tagline: "Growth starts here.",
  // Canonical host is www: Vercel serves www and 308-redirects the apex, so
  // this must match or every sitemap URL and canonical tag points at a
  // redirect. Confirmed against the live site 2026-07-20.
  url: "https://www.goodground.co.za",
  foundingDate: "2026",
  address: {
    locality: "George",
    area: "Garden Route",
    region: "Western Cape",
    country: "ZA",
  },
  areaServed: "George, Garden Route, Western Cape, South Africa",
  /**
   * Stays `null` ON PURPOSE, even though a number now exists (see `whatsapp`
   * below). This field is the *displayable* phone number: `Footer.tsx` renders
   * a `tel:` link whenever it's truthy. Setting it would print the digits as
   * text on every page, which is exactly what the owner asked to avoid, and
   * exactly what number-harvesting bots scrape. Leave it null.
   */
  phone: null as string | null,
  /**
   * Confirmed by the owner 2026-08-13. Deliberately reachable only as a
   * click-to-chat link, never rendered as digits: `/contact` shows a
   * "WhatsApp" button and nothing else, and `e164` feeds `telephone` in the
   * LocalBusiness schema so Google can match the site against the Google
   * Business Profile (NAP consistency is a real local-ranking factor).
   * Email is, and should stay, the primary channel everywhere.
   */
  whatsapp: {
    e164: "+27670104988",
    link: "https://wa.me/27670104988",
  },
  // Taken from the client's own footer artwork.
  email: "hello@goodground.co.za",
  // Confirmed by the founder 2026-07-25.
  socials: [
    { platform: "facebook", name: "Facebook", href: "https://www.facebook.com/share/14jTaX4tHhU/" },
    { platform: "instagram", name: "Instagram", href: "https://www.instagram.com/goodground.company" },
  ] as { platform: "facebook" | "instagram"; name: string; href: string }[],
} as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** The comp's footer adds Home to the nav set. */
export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks = [
  { label: "FAQ", href: "/faq" },
  // Both of these point into the single /legal page, matching the source content.
  { label: "Privacy Policy", href: "/legal#privacy" },
  { label: "Terms", href: "/legal#terms" },
];
