import path from "node:path";
import type { NextConfig } from "next";

/**
 * Content-Security-Policy note, because the trade-off here is deliberate.
 *
 * `script-src` allows 'unsafe-inline'. The strict alternative is a per-request
 * nonce, but nonces force every page to render dynamically, which would give up
 * static generation and the 490ms LCP that comes with it. This is a brochure
 * site: it renders no user-submitted content, so the stored-XSS surface that
 * 'unsafe-inline' widens is close to nil. Static delivery is worth more here.
 *
 * googletagmanager.com is required for analytics, which loads only after the
 * visitor accepts cookies. Removing it silently breaks GA — see
 * components/Analytics.tsx.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  // data: covers the inline SVG grain utility and OG image data URIs.
  "img-src 'self' data: https://images.unsplash.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  // GA beacons post to the first two; ContactForm/StartProjectForm submit via
  // fetch() (not a native form POST), so it's connect-src, not just
  // form-action, that has to allow the Web3Forms API — see lib/enquiry.ts.
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://api.web3forms.com",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Redundant alongside frame-ancestors, kept for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Website Care Plans was retired 2026-08-25 and replaced by the Full
      // Service monthly package, which lives on /pricing rather than its own
      // service page — permanent redirect so the old indexed/bookmarked URL
      // still lands somewhere useful instead of 404ing.
      {
        source: "/services/website-care-plans",
        destination: "/pricing#full-service",
        permanent: true,
      },
    ];
  },
  images: {
    // Placeholder photography only — every one of these is replaced by the
    // client's own shoot before launch. See content/images.ts.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // Default is qualities: [75] — any other `quality` prop on <Image> is
    // silently coerced back to 75. 90 is for case-study lifestyle photography
    // (app/work/[slug]/page.tsx), which visibly double-compresses at 75 on
    // top of an already-compressed WebP source.
    qualities: [75, 90],
  },
  // A package-lock.json further up the GROW - CLAUDE tree makes Turbopack infer
  // the wrong workspace root; pin it to this app.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
