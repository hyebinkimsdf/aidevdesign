import type { Metadata } from "next";
import ClientNav from "./components/ClientNav";
import ClientHero from "./components/ClientHero";
import ClientFeatures from "./components/ClientFeatures";
import ClientStats from "./components/ClientStats";
import ClientProcess from "./components/ClientProcess";
import ClientPortfolio from "./components/ClientPortfolio";
import ClientCTA from "./components/ClientCTA";

export const metadata: Metadata = {
  title: "기업용 랜딩 페이지 전문 제작 | Hyebin Studio",
  description:
    "기업의 첫인상을 설계합니다. 기업 홈페이지, 서비스 랜딩 페이지, 브랜드 사이트 전문 제작. 빠른 납기 · 모바일 최적화 · SEO 기본 적용.",
  keywords: [
    "기업 홈페이지 제작",
    "랜딩 페이지 제작",
    "홈페이지 제작",
    "웹사이트 제작",
    "브랜드 사이트",
    "Next.js",
    "React",
  ],
  alternates: {
    canonical: "/homepage-development",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  verification: {
    other: {
      "naver-site-verification": "c019519e9e2c3d283ed9f5af9ebed23488d1a013",
    },
  },
  openGraph: {
    title: "기업용 랜딩 페이지 전문 제작 | Hyebin Studio",
    description:
      "기업 홈페이지·서비스 랜딩·브랜드 사이트 전문 제작. 빠른 납기 · 모바일 최적화 · SEO 기본 적용.",
    type: "website",
    url: "https://aidevdesign.com/homepage-development",
    siteName: "Hyebin dev & design",
    locale: "ko_KR",
  },
};

export default function ClientPage() {
  return (
    <>
      <ClientNav />
      <main className="bg-white text-[#111827]">
        <ClientHero />
        <ClientFeatures />
        <ClientStats />
        <ClientProcess />
        <ClientPortfolio />
        <ClientCTA />
      </main>
      <footer
        className="border-t bg-white px-6 py-8"
        style={{ borderColor: "#e5e7eb" }}
      >
        <div
          className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-mono text-xs" style={{ color: "#6b7280" }}>
            © 2026 Hyebin Studio
          </span>
          <span className="font-mono text-xs" style={{ color: "#6b7280" }}>
            기업용 랜딩 페이지 전문 제작
          </span>
        </div>
      </footer>
    </>
  );
}
