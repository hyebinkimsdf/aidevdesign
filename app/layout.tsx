import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Hyebin | Frontend Developer",
  description:
    "AI 기반 프론트엔드 개발자. React, Next.js, TypeScript를 활용해 사용자 중심의 웹 경험을 만듭니다. UI/UX 디자인과 AI 통합에 관심이 있습니다.",
  keywords: [
    "Frontend Developer",
    "프론트엔드 개발자",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
    "UI/UX",
    "Web Development",
  ],
  openGraph: {
    title: "Hyebin | Frontend Developer",
    description:
      "AI 기반 프론트엔드 개발자. React, Next.js, TypeScript 전문.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
