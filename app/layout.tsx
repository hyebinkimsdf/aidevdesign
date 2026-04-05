import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

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
  title: "Hyebin | Fullstack Developer",
  description:
    "풀스택 개발, 디자인 감각과 클라이언트 소통 역량을 함께 갖추고 있습니다.",
  alternates: {
    canonical: "/",
  },
    icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
      "AI, 디자인, 개발을 모두 갖춘 풀스택 개발자",
    type: "website",
    url: "https://aidevdesign.com",
    siteName: "Hyebin dev & design",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MC9FBZXV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HDW459JL4V"
          strategy="afterInteractive"
        />
        <Script
          id="gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HDW459JL4V');`,
          }}
        />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MC9FBZXV');`,
          }}
        />
      </body>
    </html>
  );
}
