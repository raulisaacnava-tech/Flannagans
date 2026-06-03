import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '.next-local',
  allowedDevOrigins: ['192.168.1.110'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
