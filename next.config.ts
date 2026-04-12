import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // 정적 생성 최적화
  experimental: {
    optimizePackageImports: ['@next/third-parties'],
  },
};

export default nextConfig;
