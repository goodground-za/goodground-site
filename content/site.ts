/**
 * Single source of truth for NAP, routes and social links.
 * Fields marked TODO are unconfirmed — see the copy deck §0. Do not invent
 * values: the phone and email feed LocalBusiness schema, where a wrong number
 * is worse than an absent one.
 */

export const site = {
  name: "GoodGround",
  tagline: "Build on GoodGround. Website design & development, Cape Town.",
  url: "https://goodground.co.za", // TODO: confirm production domain
  foundingDate: "2026",
  address: {
    locality: "Brackenfell",
    region: "Western Cape",
    city: "Cape Town",
    country: "ZA",
  },
  areaServed: "Cape Town, Western Cape, South Africa",
  phone: null as string | null, // TODO: client to confirm
  email: null as string | null, // TODO: client to confirm
  socials: [] as { label: string; href: string }[], // TODO: client to confirm
} as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];
