import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/home" },
      { source: "/patient", destination: "/patient/dashboard" },
      { source: "/staff", destination: "/staff/dashboard" },
    ];
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
