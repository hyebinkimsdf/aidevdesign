import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["@vercel/analytics", "@vercel/speed-insights"],
  },
  async headers() {
    return [
      {
        // 프로젝트 썸네일 — 내용 바뀌면 파일명 바꿔야 하므로 immutable
        source: "/thumbs/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // favicon, og-image 등 public 정적 파일
        source: "/:file(favicon.ico|og-image.jpg|icon.svg|robots.txt|sitemap.xml)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
