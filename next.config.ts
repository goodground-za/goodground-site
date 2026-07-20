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
  // GA beacons post to these two.
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
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
  images: {
    // Placeholder photography only — every one of these is replaced by the
    // client's own shoot before launch. See content/images.ts.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // A package-lock.json further up the GROW - CLAUDE tree makes Turbopack infer
  // the wrong workspace root; pin it to this app.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
