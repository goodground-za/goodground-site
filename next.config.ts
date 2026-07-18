import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
