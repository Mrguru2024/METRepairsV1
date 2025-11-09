import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid flaky pack file cache errors on Windows
      Object.assign(config, { cache: false });
    }
    return config;
  },
};

export default nextConfig;


