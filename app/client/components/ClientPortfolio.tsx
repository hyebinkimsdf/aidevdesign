"use client";

import { useEffect, useRef, useState } from "react";

/* ── Project data ── */
type PortfolioCategory = "homepage" | "landing" | "special";

interface PortfolioItem {
  name: string;
  client: string;
  desc: string;
  category: PortfolioCategory;
  tags: string[];
  thumb: 0 | 1 | 2 | 3 | 4 | 5;
}

const items: PortfolioItem[] = [
  {
    name: "SaaS 서비스 랜딩",
    client: "IT 스타트업",
    desc: "핵심 기능 소개 + 프라이싱 + 무료 체험 CTA까지. 전환율 중심 구조 설계.",
    category: "landing",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    thumb: 0,
  },
  {
    name: "카페 브랜드 홈페이지",
    client: "서울 로컬 카페",
    desc: "브랜드 스토리 + 메뉴 + 위치 안내. 따뜻한 감성의 풀-스크롤 레이아웃.",
    category: "homepage",
    tags: ["Next.js", "Tailwind", "Vercel"],
    thumb: 1,
  },
  {
    name: "의원 홈페이지",
    client: "피부과 클리닉",
    desc: "진료과목 소개 + 의료진 프로필 + 예약 안내. 신뢰도 중심 구조.",
    category: "homepage",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    thumb: 2,
  },
  {
    name: "기업 홈페이지",
    client: "B2B 컨설팅 기업",
    desc: "서비스 소개 + 실적 + 팀 소개 + 문의 폼. 프로페셔널한 기업 이미지.",
    category: "homepage",
    tags: ["Next.js", "TypeScript", "Nodemailer"],
    thumb: 3,
  },
  {
    name: "제품 출시 랜딩",
    client: "하드웨어 스타트업",
    desc: "출시 카운트다운 + 사전 예약 CTA. 시각적 임팩트 극대화.",
    category: "landing",
    tags: ["Next.js", "Tailwind", "Vercel"],
    thumb: 4,
  },
  {
    name: "채용 페이지",
    client: "테크 스타트업",
    desc: "팀 문화 소개 + 포지션 목록 + 지원 폼. 개발자 타깃 특화 디자인.",
    category: "special",
    tags: ["Next.js", "TypeScript", "Notion API"],
    thumb: 5,
  },
];

const filters: { value: "all" | PortfolioCategory; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "homepage", label: "기업·브랜드" },
  { value: "landing", label: "서비스 랜딩" },
  { value: "special", label: "특수 목적" },
];

/* ── Website mockup CSS art thumbnails ── */
const thumbConfigs = [
  // 0: SaaS — dark, purple/blue gradient
  {
    bg: "linear-gradient(135deg,#1a0a2e,#0f0818)",
    headerBg: "rgba(139,92,246,0.15)",
    heroGrad: "linear-gradient(135deg,#8b5cf6,#6366f1)",
    accent: "#8b5cf6",
    label: "SaaS",
  },
  // 1: Cafe — warm amber/brown
  {
    bg: "linear-gradient(135deg,#1a0f05,#0f0a05)",
    headerBg: "rgba(245,158,11,0.12)",
    heroGrad: "linear-gradient(135deg,#f59e0b,#d97706)",
    accent: "#f59e0b",
    label: "CAFÉ",
  },
  // 2: Medical — clean, trust blue
  {
    bg: "linear-gradient(135deg,#051525,#060c14)",
    headerBg: "rgba(6,182,212,0.1)",
    heroGrad: "linear-gradient(135deg,#06b6d4,#0891b2)",
    accent: "#06b6d4",
    label: "CLINIC",
  },
  // 3: Corporate — navy, professional
  {
    bg: "linear-gradient(135deg,#04061a,#070818)",
    headerBg: "rgba(99,102,241,0.1)",
    heroGrad: "linear-gradient(135deg,#6366f1,#4f46e5)",
    accent: "#6366f1",
    label: "CORP",
  },
  // 4: Product launch — dramatic dark + orange
  {
    bg: "linear-gradient(135deg,#1a0800,#0c0500)",
    headerBg: "rgba(249,115,22,0.1)",
    heroGrad: "linear-gradient(135deg,#f97316,#ea580c)",
    accent: "#f97316",
    label: "LAUNCH",
  },
  // 5: Hiring — minimal, green dev feel
  {
    bg: "linear-gradient(135deg,#041a0a,#060f06)",
    headerBg: "rgba(34,197,94,0.1)",
    heroGrad: "linear-gradient(135deg,#22c55e,#16a34a)",
    accent: "#22c55e",
    label: "CAREER",
  },
];

function MockupThumb({ idx }: { idx: number }) {
  const c = thumbConfigs[idx];
  return (
    <div className="w-full h-full" style={{ background: c.bg }}>
      {/* Nav bar */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: c.headerBg, borderBottom: `1px solid ${c.accent}15` }}
      >
        <div className="h-2 w-10 rounded-full" style={{ background: c.accent, opacity: 0.7 }} />
        <div className="flex gap-1.5">
          {[0.5, 0.4, 0.3].map((op, i) => (
            <div key={i} className="h-1.5 w-5 rounded-full"
              style={{ background: "#e8e8e8", opacity: op }} />
          ))}
        </div>
        <div className="h-5 w-12 rounded-full"
          style={{ background: c.heroGrad, opacity: 0.8 }} />
      </div>

      {/* Hero block */}
      <div className="px-3 pt-4 pb-3">
        <div className="h-1.5 w-8 rounded-full mb-2" style={{ background: c.accent, opacity: 0.6 }} />
        <div className="h-3.5 w-32 rounded-sm mb-1.5"
          style={{ background: c.heroGrad, opacity: 0.75 }} />
        <div className="h-2 w-24 rounded-sm mb-1" style={{ background: "#e8e8e8", opacity: 0.2 }} />
        <div className="h-2 w-20 rounded-sm mb-3" style={{ background: "#e8e8e8", opacity: 0.12 }} />
        <div className="flex gap-2">
          <div className="h-5 w-14 rounded-full"
            style={{ background: c.heroGrad, opacity: 0.85 }} />
          <div className="h-5 w-10 rounded-full"
            style={{ border: `1px solid ${c.accent}40`, opacity: 0.5 }} />
        </div>
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-3 gap-1.5 px-3 pb-3">
        {[0.7, 0.55, 0.65].map((op, i) => (
          <div key={i} className="rounded-lg p-2"
            style={{ background: `${c.accent}08`, border: `1px solid ${c.accent}15`, opacity: op }}>
            <div className="h-2 w-2 rounded-full mb-1.5" style={{ background: c.accent, opacity: 0.6 }} />
            <div className="h-1.5 w-full rounded-full mb-1" style={{ background: "#e8e8e8", opacity: 0.3 }} />
            <div className="h-1.5 w-2/3 rounded-full" style={{ background: "#e8e8e8", opacity: 0.15 }} />
          </div>
        ))}
      </div>

      {/* Label badge */}
      <div className="absolute top-2.5 right-2.5">
        <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded"
          style={{ background: `${c.accent}20`, color: c.accent, border: `1px solid ${c.accent}30` }}>
          {c.label}
        </span>
      </div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── Main component ── */
export default function ClientPortfolio() {
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".cl-scroll-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); obs.unobserve(e.target); } }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    cards.forEach((c, i) => { c.style.transitionDelay = `${i * 70}ms`; obs.observe(c); });
    return () => obs.disconnect();
  }, [filter]);

  return (
    <section
      id="portfolio"
      ref={ref}
      aria-labelledby="portfolio-heading"
      className="px-6 py-24"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8" style={{ background: "#0ea5e9" }} />
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#0ea5e9" }}>
            클라이언트 포트폴리오
          </p>
        </div>
        <h2 id="portfolio-heading" className="mb-4 text-3xl font-bold sm:text-4xl" style={{ color: "#111827" }}>
          직접 만든{" "}
          <span className="ap-gradient-text">결과물들</span>
        </h2>
        <p className="mb-10 max-w-md text-sm leading-6" style={{ color: "#475569" }}>
          다양한 업종의 기업·브랜드 홈페이지와 랜딩 페이지 제작 경험이 있습니다.
        </p>

        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map(({ value, label }) => {
            const count = value === "all" ? items.length : items.filter((i) => i.category === value).length;
            return (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-200"
                style={
                  filter === value
                    ? { background: "linear-gradient(135deg,#8b5cf6,#ec4899)", color: "#fff", border: "1px solid transparent" }
                    : { background: "transparent", color: "#475569", border: "1px solid rgba(15,23,42,0.08)" }
                }
              >
                {label}
                <span className="ml-1.5 opacity-60 font-mono">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div key={filter} className="animate-tab-content grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.name} className="cl-scroll-card">
              <article className="cl-card rounded-3xl overflow-hidden cursor-default h-full"
                style={{ border: "1px solid rgba(15,23,42,0.08)", background: "#ffffff" }}>
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <div className="cl-card-thumb w-full h-full">
                    <MockupThumb idx={item.thumb} />
                  </div>
                  {/* Hover overlay */}
                  <div className="cl-card-overlay absolute inset-0 flex flex-col justify-end p-4"
                    style={{ background: "linear-gradient(to top, rgba(15,23,42,0.18) 0%, rgba(255,255,255,0.9) 50%, transparent 100%)" }}>
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {item.tags.map((t) => (
                        <span key={t}
                          className="rounded px-2 py-0.5 font-mono text-[9px]"
                          style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-mono text-[10px] mb-0.5" style={{ color: "#64748b" }}>
                        {item.client}
                      </p>
                      <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>
                        {item.name}
                      </h3>
                    </div>
                    <button
                      className="shrink-0 mt-0.5 transition-colors"
                      style={{ color: "#4a4a6a" }}
                      aria-label="자세히 보기"
                    >
                      <ExternalIcon />
                    </button>
                  </div>
                  <p className="text-xs leading-5" style={{ color: "#475569" }}>
                    {item.desc}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
