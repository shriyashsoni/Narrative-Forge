import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from searching upwards for middleware or lockfiles
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
