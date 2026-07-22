/**
 * Single source of truth for NAP, routes and social links.
 * Fields marked TODO are unconfirmed — see the copy deck §0. Do not invent
 * values: these feed LocalBusiness schema, where a wrong number is worse than
 * an absent one.
 */

export const site = {
  name: "GoodGround",
  tagline: "Growth starts here.",
  // Canonical host is www: Vercel serves www and 308-redirects the apex, so
  // this must match or every sitemap URL and canonical tag points at a
  // redirect. Confirmed against the live site 2026-07-20.
  url: "https://www.goodground.co.za",
  foundingDate: "2026",
  address: {
    locality: "Brackenfell",
    region: "Western Cape",
    city: "Cape Town",
    country: "ZA",
  },
  areaServed: "Cape Town, Western Cape, South Africa",
  phone: null as string | null, // TODO: client to confirm
  // Taken from the client's own footer artwork.
  email: "hello@goodground.co.za",
  // The comp shows FB and IG marks but no destinations yet.
  socials: [] as { label: string; href: string }[], // TODO: client to confirm URLs
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
