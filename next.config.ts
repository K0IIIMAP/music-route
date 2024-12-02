import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vaeelwahprrplqjcicnb.supabase.co",
      },
    ],
  },
};

export default nextConfig;
