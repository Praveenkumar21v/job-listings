import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors: true
   },
   eslint:{
    ignoreDuringBuilds: true
   },
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: '**', 
      },
    ],
  },
};

export default nextConfig;
