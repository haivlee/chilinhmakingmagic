import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
    /** Allow next/image `quality` for Works / Featured / About */
    qualities: [75, 80, 88, 90, 92],
    /** Extra breakpoint so ~1200px-wide tiles can request a crisp 2× width on retina */
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048, 2560, 3840],
  },
};

export default nextConfig;
