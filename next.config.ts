import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  // Next.js 15.1.0 entryCSSFiles 오류 해결
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // 정적 생성 비활성화하여 SSR 사용
  trailingSlash: false,
  // 빌드 시 정적 생성 건너뛰기
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
