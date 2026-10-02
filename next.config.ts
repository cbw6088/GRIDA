import path from "path";
import type { NextConfig } from "next";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/portfolio/yeoksam-commercial",
        destination: "/portfolio/1",
        permanent: true,
      },
      {
        source: "/portfolio/songpa-residential",
        destination: "/portfolio/2",
        permanent: true,
      },
      {
        source: "/portfolio/seocho-residential",
        destination: "/portfolio/3",
        permanent: true,
      },
      {
        source: "/portfolio/itaewon-residential",
        destination: "/portfolio/4",
        permanent: true,
      },
      {
        source: "/portfolio/pungnap-residential",
        destination: "/portfolio/5",
        permanent: true,
      },
      {
        source: "/portfolio/yeoksam-goshitel",
        destination: "/portfolio/6",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256],
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
