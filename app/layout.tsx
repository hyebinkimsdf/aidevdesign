import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aidevdesign.com"),
  title: "홈페이지 개발, 디자인, AI, ALL IN ONE",
  description:
    "풀스택 개발, 디자인 감각과 클라이언트 소통 역량을 함께 갖추고 있습니다.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  keywords: [
    "Fullstack Developer",
    "풀스택 개발자",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "REST API",
    "서비스 설계",
    "웹 개발",
    "Vercel",
    "AWS",
    "SEO",
  ],
  verification: {
    other: {
      "naver-site-verification": "c019519e9e2c3d283ed9f5af9ebed23488d1a013",
    },
  },
  openGraph: {
    title: "AI, 디자인, 개발, ALL IN ONE",
    description:
      "풀스택 개발, 디자인 감각과 클라이언트 소통 역량을 함께 갖추고 있습니다.",
    url: "https://aidevdesign.com",
    siteName: "AI Dev Design",
    images: [
      {
        url: "https://aidevdesign.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Dev Design",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI, 디자인, 개발, ALL IN ONE",
    description:
      "풀스택 개발, 디자인 감각과 클라이언트 소통 역량을 함께 갖추고 있습니다.",
    images: ["https://aidevdesign.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MC9FBZXV');`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MC9FBZXV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}