"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────── Types ── */
type DevProject = {
  kind: "dev";
  name: string;
  tagline: string;
  description: string;
  contribution: string;
  period: string;
  team: string;
  outcomes: string[];
  tech: string[];
  github?: string;
  demo?: string;
  thumb: "chat" | "designsys" | "dashboard";
};

type DesignCategory = "banner" | "logo" | "leaflet";
type DesignProject = {
  kind: "design";
  name: string;
  tagline: string;
  description: string;
  contribution: string;
  period: string;
  team: string;
  category: DesignCategory;
  outcomes: string[];
  tools: string[];
  thumb: "banner1" | "banner2" | "logo1" | "logo2" | "leaflet1" | "leaflet2";
  demo?: string;
};

/* ──────────────────────────────────── Data ── */
const devProjects: DevProject[] = [
  {
    kind: "dev",
    name: "AI Chat Interface",
    tagline: "GPT-4 기반 실시간 대화형 인터페이스",
    description:
      "OpenAI GPT-4 API를 활용한 스트리밍 대화 인터페이스입니다. 응답 체감 속도를 크게 개선했으며, 대화 히스토리 관리와 마크다운 렌더링을 포함합니다. Next.js Server Actions로 불필요한 클라이언트 번들을 최소화했습니다.",
    contribution: "단독 기획 및 풀스택 개발, 스트리밍 UX 최적화",
    period: "8주",
    team: "1인",
    outcomes: [
      "API 요청/토큰 사용량 분석 후 프롬프트 구조 조정으로 비용 약 30% 절감",
      "초기 응답 표시 시점 단축(체감 대기 시간 개선)",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    thumb: "chat",
  },
  {
    kind: "dev",
    name: "React Design System",
    tagline: "TypeScript 기반 UI 컴포넌트 라이브러리",
    description:
      "재사용 가능한 React 컴포넌트 라이브러리입니다. WCAG 2.1 접근성 기준을 준수하고 Storybook으로 전체 문서화했습니다. 디자인 토큰 시스템으로 팀 생산성을 높였습니다.",
    contribution: "컴포넌트 아키텍처 설계 및 접근성 표준 적용",
    period: "10주",
    team: "3인",
    outcomes: [
      "중복 UI 제거 및 컴포넌트 재사용률 향상",
      "신규 화면 개발 리드타임 단축(내부 기준 약 40%)",
    ],
    tech: ["React", "TypeScript", "Storybook", "CSS Modules"],
    thumb: "designsys",
  },
  {
    kind: "dev",
    name: "Real-time Analytics",
    tagline: "WebSocket 기반 실시간 데이터 시각화",
    description:
      "초당 수백 건의 업데이트를 처리하면서 60fps 렌더링을 유지하는 대시보드입니다. 성능 최적화와 커스터마이징 가능한 위젯 레이아웃을 설계했습니다.",
    contribution: "프론트엔드 아키텍처 설계 및 성능 최적화",
    period: "12주",
    team: "4인",
    outcomes: [
      "차트 렌더링 병목 구간 개선으로 프레임 드랍 완화",
      "데이터 업데이트 처리량 향상(내부 벤치마크 기준 최대 3배)",
    ],
    tech: ["React", "TypeScript", "WebSocket", "Recharts", "Zustand"],
    thumb: "dashboard",
  },
];

const designProjects: DesignProject[] = [
  {
    kind: "design",
    name: "브랜드 SNS 배너 패키지",
    tagline: "일관된 브랜드 캠페인 소재",
    description:
      "인스타그램·페이스북용 시즌 캠페인 배너를 제작했습니다. 브랜드 컬러 시스템을 기반으로 다양한 사이즈에서 일관성을 유지했습니다.",
    contribution: "시각 콘셉트 설계 및 다중 매체 확장 제작",
    period: "2주",
    team: "2인",
    category: "banner",
    outcomes: [
      "캠페인 규격별 변형 템플릿 구축으로 제작 효율 개선",
      "브랜드 톤 일관성 유지",
    ],
    tools: ["Figma", "Adobe Illustrator"],
    thumb: "banner1",
  },
  {
    kind: "design",
    name: "이벤트 프로모션 배너",
    tagline: "시즌 세일 캠페인",
    description:
      "온·오프라인 동시 활용 가능한 프로모션 배너 세트입니다. 제한된 공간에서 핵심 메시지가 시각적으로 돋보이도록 레이아웃을 설계했습니다.",
    contribution: "프로모션 메시지 우선순위 기반 레이아웃 설계",
    period: "10일",
    team: "1인",
    category: "banner",
    outcomes: [
      "핵심 메시지 가독성 개선",
      "온·오프라인 소재 일관성 확보",
    ],
    tools: ["Figma", "Photoshop"],
    thumb: "banner2",
  },
  {
    kind: "design",
    name: "스타트업 브랜드 로고",
    tagline: "브랜드 아이덴티티 구축",
    description:
      "테크 스타트업의 브랜드 아이덴티티를 처음부터 설계했습니다. 심볼과 워드마크를 결합한 로고 시스템과 컬러 가이드라인을 제공했습니다.",
    contribution: "브랜드 방향성 정의 및 로고 시스템 구축",
    period: "3주",
    team: "2인",
    category: "logo",
    outcomes: [
      "심볼/워드마크/색상 규칙이 포함된 브랜드 가이드 납품",
      "디지털 채널 적용 일관성 개선",
    ],
    tools: ["Figma", "Adobe Illustrator"],
    thumb: "logo1",
  },
  {
    kind: "design",
    name: "카페 리브랜딩 로고",
    tagline: "로컬 카페 브랜드 리뉴얼",
    description:
      "기존 고객층을 유지하면서 젊은 감성을 더한 리브랜딩 프로젝트입니다. 패키지·간판·SNS 채널에 일관되게 적용 가능한 로고 시스템을 완성했습니다.",
    contribution: "기존 자산 분석 기반 리브랜딩 방향 설계",
    period: "4주",
    team: "2인",
    category: "logo",
    outcomes: [
      "오프라인/온라인 채널별 로고 활용 규칙 정립",
      "브랜드 확장 시 적용성 향상",
    ],
    tools: ["Figma", "Illustrator"],
    thumb: "logo2",
  },
  {
    kind: "design",
    name: "제품 소개 3단 리플릿",
    tagline: "B2B 영업용 브로슈어",
    description:
      "제품의 핵심 가치를 3단 접지 구조로 논리적으로 배치했습니다. 인쇄 사양에 맞춘 컬러 프로파일과 블리드 설정을 포함해 인쇄소 납품 파일까지 완성했습니다.",
    contribution: "정보 구조 설계 및 인쇄 납품 규격 최적화",
    period: "2주",
    team: "1인",
    category: "leaflet",
    outcomes: [
      "영업 활용 목적의 정보 우선순위 구조화",
      "인쇄 오류 리스크 감소를 위한 사양 준수",
    ],
    tools: ["Figma", "Illustrator", "InDesign"],
    thumb: "leaflet1",
  },
  {
    kind: "design",
    name: "서비스 안내 2단 리플릿",
    tagline: "고객 온보딩 가이드",
    description:
      "신규 고객 온보딩을 위한 2단 접지 리플릿입니다. 복잡한 서비스 흐름을 시각화하고, 핵심 정보를 빠르게 파악할 수 있도록 정보 계층을 설계했습니다.",
    contribution: "고객 여정 기반 온보딩 콘텐츠 시각화",
    period: "2주",
    team: "1인",
    category: "leaflet",
    outcomes: [
      "온보딩 핵심 안내 흐름 단순화",
      "고객 문의 대응용 보조 자료로 활용",
    ],
    tools: ["Figma", "InDesign"],
    thumb: "leaflet2",
  },
];

/* ─────────────────────── Dev thumbnails (CSS art) ── */
function ChatThumb() {
  return (
    <div className="relative w-full h-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#0a1a0c,#0c0c0c 60%,#0f1508)" }}>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div className="thumb-scanline absolute left-0 right-0 h-8 opacity-[0.04]"
        style={{ background: "linear-gradient(transparent,#4ade80,transparent)" }} />
      <div className="thumb-pulse absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full blur-2xl"
        style={{ background: "rgba(74,222,128,0.18)" }} />
      <div className="absolute top-7 left-6 flex flex-col gap-2.5">
        <div className="thumb-float-1 flex flex-col gap-1">
          <div className="h-2 w-28 rounded-full opacity-30" style={{ background: "#4ade80" }} />
          <div className="h-2 w-20 rounded-full opacity-20" style={{ background: "#4ade80" }} />
        </div>
        <div className="thumb-float-2 mt-1 flex flex-col gap-1 self-end mr-4">
          <div className="h-2 w-32 rounded-full opacity-20" style={{ background: "#e8e8e8" }} />
          <div className="h-2 w-24 rounded-full opacity-15" style={{ background: "#e8e8e8" }} />
        </div>
        <div className="thumb-float-3 flex flex-col gap-1">
          <div className="h-2 w-24 rounded-full opacity-30" style={{ background: "#4ade80" }} />
          <div className="h-2 w-36 rounded-full opacity-20" style={{ background: "#4ade80" }} />
        </div>
      </div>
      <div className="absolute bottom-5 left-5 right-5 h-7 rounded-md flex items-center px-3 gap-2"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(74,222,128,0.2)" }}>
        <div className="h-1.5 w-20 rounded-full opacity-30" style={{ background: "#6b7280" }} />
        <div className="cursor-blink h-3.5 w-0.5 ml-0.5" style={{ background: "#4ade80" }} />
      </div>
      <div className="absolute top-4 right-4 font-mono text-[9px] opacity-30" style={{ color: "#4ade80" }}>
        AI ▸ STREAM
      </div>
    </div>
  );
}

function DesignSysThumb() {
  const swatches = ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#a78bfa", "#34d399"];
  return (
    <div className="relative w-full h-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#111,#0c0c0c)" }}>
      <div className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(circle,#4ade80 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute top-6 left-5 flex gap-2">
        {swatches.map((color, i) => (
          <div key={color} className={`rounded-full thumb-float-${Math.min((i % 3) + 1, 3)}`}
            style={{ width: 18, height: 18, background: color, animationDelay: `${i * 0.15}s`, opacity: 0.85, boxShadow: `0 0 8px ${color}60` }} />
        ))}
      </div>
      <div className="absolute top-14 left-5 flex flex-wrap gap-2">
        {[{ w: "w-20", label: "Button" }, { w: "w-28", label: "Card" }, { w: "w-16", label: "Badge" }].map(({ w, label }) => (
          <div key={label} className={`${w} h-7 rounded flex items-center justify-center`}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="font-mono text-[8px] opacity-40" style={{ color: "#e8e8e8" }}>{label}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="flex items-end gap-3 opacity-60">
          <span className="font-bold text-xl leading-none" style={{ color: "#e8e8e8" }}>Aa</span>
          <span className="font-medium text-base leading-none" style={{ color: "#e8e8e8", opacity: 0.6 }}>Aa</span>
          <span className="text-sm leading-none" style={{ color: "#e8e8e8", opacity: 0.35 }}>Aa</span>
        </div>
        <div className="mt-2 h-px opacity-20" style={{ background: "#4ade80" }} />
      </div>
    </div>
  );
}

function DashboardThumb() {
  const bars = [
    { h: "55%", cls: "bar-1" }, { h: "80%", cls: "bar-2" }, { h: "45%", cls: "bar-3" },
    { h: "90%", cls: "bar-4" }, { h: "65%", cls: "bar-5" }, { h: "75%", cls: "bar-6" },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#0a0f0a,#0c0c0c)" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute left-0 right-0 h-px opacity-[0.08]"
          style={{ top: `${20 + i * 18}%`, background: "#4ade80" }} />
      ))}
      <div className="absolute bottom-12 left-5 right-5 flex items-end gap-2 h-28">
        {bars.map(({ h, cls }, i) => (
          <div key={i} className="flex-1 flex items-end">
            <div className={`w-full rounded-t origin-bottom ${cls}`}
              style={{ height: h, background: "linear-gradient(to top,#4ade80,#4ade8060)", boxShadow: "0 0 12px #4ade8040" }} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-5 right-5 flex justify-between">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
          <span key={m} className="font-mono text-[8px] opacity-25" style={{ color: "#6b7280" }}>{m}</span>
        ))}
      </div>
      <div className="absolute top-5 left-5">
        <span className="font-mono text-xs font-bold" style={{ color: "#4ade80" }}>+12.4%</span>
        <span className="font-mono text-[9px] opacity-40 ml-2" style={{ color: "#6b7280" }}>Monthly</span>
      </div>
      <div className="absolute top-5 right-4 flex items-center gap-1.5">
        <div className="thumb-pulse h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80" }} />
        <span className="font-mono text-[8px] opacity-40" style={{ color: "#4ade80" }}>LIVE</span>
      </div>
    </div>
  );
}

/* ────────────────────── Design thumbnails (CSS art) ── */
function Banner1Thumb() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#1a0533 0%,#0c0020 50%,#001a33 100%)" }}>
      <div className="absolute inset-0 opacity-20"
        style={{ background: "radial-gradient(ellipse at 30% 50%,#a78bfa40,transparent 60%), radial-gradient(ellipse at 70% 50%,#60a5fa30,transparent 60%)" }} />
      <div className="relative z-10 flex flex-col items-center gap-2 text-center px-6">
        <div className="h-0.5 w-8 mb-1" style={{ background: "#a78bfa" }} />
        <div className="h-4 w-40 rounded-sm opacity-80" style={{ background: "linear-gradient(90deg,#a78bfa,#60a5fa)" }} />
        <div className="h-2.5 w-28 rounded-sm opacity-40 mt-1" style={{ background: "#e8e8e8" }} />
        <div className="h-2 w-20 rounded-sm opacity-25 mt-0.5" style={{ background: "#e8e8e8" }} />
        <div className="mt-3 h-6 w-20 rounded-full flex items-center justify-center"
          style={{ background: "#a78bfa", opacity: 0.9 }}>
          <div className="h-1.5 w-10 rounded-full opacity-60" style={{ background: "#fff" }} />
        </div>
      </div>
      <div className="absolute top-4 right-5 font-mono text-[9px] opacity-25" style={{ color: "#a78bfa" }}>1080×1080</div>
    </div>
  );
}

function Banner2Thumb() {
  return (
    <div className="relative w-full h-full overflow-hidden"
      style={{ background: "linear-gradient(120deg,#1a0a00 0%,#0c0c0c 50%,#001a0a 100%)" }}>
      <div className="absolute inset-0 opacity-15"
        style={{ background: "radial-gradient(ellipse at 20% 60%,#fb923c40,transparent 50%), radial-gradient(ellipse at 80% 40%,#4ade8030,transparent 50%)" }} />
      {/* Sale tag */}
      <div className="absolute top-5 left-5 flex flex-col gap-1">
        <div className="h-2 w-10 rounded-sm opacity-60" style={{ background: "#fb923c" }} />
        <div className="h-6 w-28 rounded-sm opacity-75" style={{ background: "linear-gradient(90deg,#fb923c,#fbbf24)" }} />
        <div className="h-2 w-20 rounded-sm opacity-35" style={{ background: "#e8e8e8" }} />
      </div>
      {/* Price tag */}
      <div className="absolute bottom-6 right-5 text-right flex flex-col gap-1 items-end">
        <div className="h-2 w-10 rounded-sm opacity-25 line-through" style={{ background: "#6b7280" }} />
        <div className="h-4 w-16 rounded-sm opacity-80" style={{ background: "#fb923c" }} />
      </div>
      <div className="absolute bottom-4 left-5 font-mono text-[9px] opacity-25" style={{ color: "#fb923c" }}>1920×600</div>
    </div>
  );
}

function Logo1Thumb() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-3"
      style={{ background: "#0c0c0c" }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle,#e8e8e8 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
      {/* Geometric mark */}
      <div className="thumb-float-1 relative flex items-center justify-center">
        <div className="absolute h-10 w-10 rotate-45 rounded-sm opacity-20" style={{ background: "#4ade80", border: "1.5px solid #4ade80" }} />
        <div className="absolute h-7 w-7 rotate-12 rounded-sm opacity-40" style={{ border: "1.5px solid #4ade80" }} />
        <div className="h-4 w-4 rounded-sm rotate-45 opacity-90" style={{ background: "#4ade80" }} />
      </div>
      {/* Wordmark */}
      <div className="flex flex-col items-center gap-1">
        <div className="h-2.5 w-24 rounded-sm opacity-70" style={{ background: "#e8e8e8" }} />
        <div className="h-1 w-16 rounded-sm opacity-25" style={{ background: "#6b7280" }} />
      </div>
      <div className="absolute bottom-4 font-mono text-[9px] opacity-20" style={{ color: "#4ade80" }}>BRAND IDENTITY</div>
    </div>
  );
}

function Logo2Thumb() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-3"
      style={{ background: "#0f0a04" }}>
      <div className="absolute inset-0 opacity-10"
        style={{ background: "radial-gradient(ellipse at 50% 50%,#f59e0b20,transparent 70%)" }} />
      {/* Coffee cup silhouette (simplified) */}
      <div className="thumb-float-2 relative flex items-center justify-center">
        <div className="h-10 w-8 rounded-b-xl opacity-70" style={{ background: "linear-gradient(180deg,#f59e0b,#d97706)", border: "1.5px solid #f59e0b60" }} />
        <div className="absolute -right-2.5 top-1 h-4 w-2.5 rounded-r-full border-2 opacity-60"
          style={{ borderColor: "#f59e0b", borderLeft: "none" }} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="h-2.5 w-20 rounded-sm opacity-70" style={{ background: "#f59e0b" }} />
        <div className="h-1 w-12 rounded-sm opacity-30" style={{ background: "#6b7280" }} />
      </div>
      <div className="absolute bottom-4 font-mono text-[9px] opacity-20" style={{ color: "#f59e0b" }}>REBRAND</div>
    </div>
  );
}

function Leaflet1Thumb() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-stretch"
      style={{ background: "#0c0c0c" }}>
      {/* 3 panels */}
      {[
        { bg: "#0f1a0f", accent: "#4ade80" },
        { bg: "#141414", accent: "#86efac" },
        { bg: "#0a0f0a", accent: "#4ade80" },
      ].map(({ bg, accent }, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-center gap-2 p-2"
          style={{ background: bg, borderRight: i < 2 ? "1px solid #242424" : undefined }}>
          {i === 0 && (
            <>
              <div className="h-5 w-5 rounded-full opacity-60" style={{ background: accent }} />
              <div className="h-1.5 w-10 rounded-full opacity-50" style={{ background: "#e8e8e8" }} />
              <div className="h-1 w-8 rounded-full opacity-20" style={{ background: "#6b7280" }} />
            </>
          )}
          {i === 1 && (
            <>
              <div className="flex flex-col gap-1 w-full px-1">
                {[12, 16, 10, 14, 8].map((w, j) => (
                  <div key={j} className="h-1 rounded-full opacity-20" style={{ width: `${w * 4}px`, background: "#e8e8e8" }} />
                ))}
              </div>
            </>
          )}
          {i === 2 && (
            <>
              <div className="h-8 w-full rounded-sm opacity-15" style={{ background: accent }} />
              <div className="h-1 w-8 rounded-full opacity-30" style={{ background: "#e8e8e8" }} />
              <div className="h-4 w-10 rounded-sm opacity-40" style={{ background: accent, border: `1px solid ${accent}` }} />
            </>
          )}
        </div>
      ))}
      <div className="absolute top-3 right-3 font-mono text-[8px] opacity-20" style={{ color: "#4ade80" }}>3단접지</div>
    </div>
  );
}

function Leaflet2Thumb() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-stretch"
      style={{ background: "#0c0c0c" }}>
      {[
        { bg: "#0f0f18", accent: "#60a5fa" },
        { bg: "#0c0c0c", accent: "#93c5fd" },
      ].map(({ bg, accent }, i) => (
        <div key={i} className="flex-1 flex flex-col items-start justify-start gap-2 p-3"
          style={{ background: bg, borderRight: i === 0 ? "1px solid #242424" : undefined }}>
          {i === 0 && (
            <>
              <div className="h-6 w-full rounded-sm opacity-25" style={{ background: accent }} />
              <div className="flex flex-col gap-1 w-full mt-1">
                {[3, 4, 2, 3].map((_, j) => (
                  <div key={j} className="flex items-center gap-1">
                    <div className="h-1 w-1 rounded-full opacity-40" style={{ background: accent }} />
                    <div className="h-1 rounded-full opacity-20 flex-1" style={{ background: "#e8e8e8" }} />
                  </div>
                ))}
              </div>
            </>
          )}
          {i === 1 && (
            <>
              <div className="h-3 w-3/4 rounded-sm opacity-50" style={{ background: accent }} />
              <div className="flex flex-col gap-1 w-full">
                {[16, 14, 12, 16, 10, 14].map((w, j) => (
                  <div key={j} className="h-1 rounded-full opacity-15" style={{ width: `${w * 4}px`, background: "#e8e8e8" }} />
                ))}
              </div>
            </>
          )}
        </div>
      ))}
      <div className="absolute top-3 right-3 font-mono text-[8px] opacity-20" style={{ color: "#60a5fa" }}>2단접지</div>
    </div>
  );
}

function Thumb({ type }: { type: DevProject["thumb"] | DesignProject["thumb"] }) {
  if (type === "chat") return <ChatThumb />;
  if (type === "designsys") return <DesignSysThumb />;
  if (type === "dashboard") return <DashboardThumb />;
  if (type === "banner1") return <Banner1Thumb />;
  if (type === "banner2") return <Banner2Thumb />;
  if (type === "logo1") return <Logo1Thumb />;
  if (type === "logo2") return <Logo2Thumb />;
  if (type === "leaflet1") return <Leaflet1Thumb />;
  return <Leaflet2Thumb />;
}

/* ─────────────────────────────── Icon helpers ── */
function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function hasExternalLink(url?: string) {
  return Boolean(url && url !== "#");
}

/* ──────────────────────────────── Card component ── */
function DevCard({ project, featured }: { project: DevProject; featured?: boolean }) {
  const githubAvailable = hasExternalLink(project.github);
  const demoAvailable = hasExternalLink(project.demo);
  const externalAvailable = githubAvailable || demoAvailable;

  return (
    <article className="project-card-inner rounded-xl border border-border bg-surface overflow-hidden cursor-default h-full">
      <div className={`project-thumb-wrap relative ${featured ? "h-56 sm:h-64" : "h-44"}`}>
        <div className="project-thumb-inner w-full h-full">
          <Thumb type={project.thumb} />
        </div>
        <div className="project-thumb-overlay absolute inset-0 flex items-end p-4"
          style={{ background: "linear-gradient(to top,rgba(20,20,20,0.95) 0%,rgba(20,20,20,0.3) 60%,transparent 100%)" }}>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent border border-accent/25">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={featured ? "p-6" : "p-5"}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="font-mono text-[10px] text-accent/70 mb-1">{project.tagline}</p>
            <h3 className={`font-semibold text-foreground ${featured ? "text-lg" : "text-sm"}`}>{project.name}</h3>
          </div>
          <div className="flex gap-2.5 shrink-0 mt-0.5">
            {githubAvailable && project.github && (
              <a href={project.github} className="text-muted hover:text-foreground transition-colors" aria-label="GitHub">
                <GitHubIcon />
              </a>
            )}
            {demoAvailable && project.demo && (
              <a href={project.demo} className="text-muted hover:text-foreground transition-colors" aria-label="Demo">
                <ExternalIcon />
              </a>
            )}
            {!externalAvailable && (
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] text-muted/60">
                비공개
              </span>
            )}
          </div>
        </div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted/70">
            기간 {project.period}
          </span>
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted/70">
            팀 {project.team}
          </span>
        </div>
        <p className={`leading-6 text-muted mb-3 ${featured ? "text-sm" : "text-xs"}`}>{project.description}</p>
        <p className="mb-2 text-[10px] text-muted/50">
          <span className="text-accent/60 font-medium">기여: </span>{project.contribution}
        </p>
        <ul className="space-y-1.5">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2 text-[11px] text-muted/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
        {!externalAvailable && (
          <p className="mt-3 text-[10px] text-muted/50">
            보안/계약 이슈로 링크 비공개, 요청 시 시연 또는 상세 설명 가능합니다.
          </p>
        )}
      </div>
    </article>
  );
}

const categoryLabel: Record<DesignCategory, string> = {
  banner: "배너제작",
  logo: "로고",
  leaflet: "리플릿",
};

function DesignCard({ project }: { project: DesignProject }) {
  const demoAvailable = hasExternalLink(project.demo);

  return (
    <article className="project-card-inner rounded-xl border border-border bg-surface overflow-hidden cursor-default h-full">
      <div className="project-thumb-wrap relative h-44">
        <div className="project-thumb-inner w-full h-full">
          <Thumb type={project.thumb} />
        </div>
        <div className="project-thumb-overlay absolute inset-0 flex items-end p-4"
          style={{ background: "linear-gradient(to top,rgba(20,20,20,0.95) 0%,rgba(20,20,20,0.3) 60%,transparent 100%)" }}>
          <div className="flex flex-wrap gap-1.5">
            {project.tools.map((t) => (
              <span key={t} className="rounded bg-muted/10 px-2 py-0.5 font-mono text-[10px] text-muted border border-border">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full px-2 py-0.5 text-[9px] font-mono border"
                style={{
                  color: project.category === "banner" ? "#a78bfa" : project.category === "logo" ? "#fb923c" : "#60a5fa",
                  borderColor: project.category === "banner" ? "#a78bfa40" : project.category === "logo" ? "#fb923c40" : "#60a5fa40",
                  background: project.category === "banner" ? "#a78bfa10" : project.category === "logo" ? "#fb923c10" : "#60a5fa10",
                }}>
                {categoryLabel[project.category]}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
            <p className="font-mono text-[10px] text-muted/60 mt-0.5">{project.tagline}</p>
          </div>
          {demoAvailable && project.demo && (
            <a href={project.demo} className="text-muted hover:text-foreground transition-colors shrink-0 mt-0.5" aria-label="Demo">
              <ExternalIcon />
            </a>
          )}
          {!demoAvailable && (
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] text-muted/60">
              비공개
            </span>
          )}
        </div>
        <p className="text-xs leading-5 text-muted">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted/70">
            기간 {project.period}
          </span>
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted/70">
            팀 {project.team}
          </span>
        </div>
        <p className="mt-2 text-[10px] text-muted/50">
          <span className="text-accent/60 font-medium">기여: </span>{project.contribution}
        </p>
        <ul className="mt-2 space-y-1.5">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2 text-[11px] text-muted/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ──────────────────────────────── Main section ── */
type MainTab = "dev" | "design";
type DesignFilter = "all" | DesignCategory;

const designFilters: { value: DesignFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "banner", label: "배너제작" },
  { value: "logo", label: "로고" },
  { value: "leaflet", label: "리플릿" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<MainTab>("dev");
  const [designFilter, setDesignFilter] = useState<DesignFilter>("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Scroll-triggered entrance */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".project-card");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); } }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [activeTab, designFilter]);

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setDesignFilter("all");
  };

  const filteredDesign =
    designFilter === "all"
      ? designProjects
      : designProjects.filter((p) => p.category === designFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="projects-heading"
          className="mb-8 font-mono text-xs uppercase tracking-widest text-accent"
        >
          Projects
        </p>
        <p className="mb-8 max-w-2xl text-xs leading-6 text-muted/75">
          기업 제출용 포트폴리오 기준으로 역할, 기간, 팀 구성, 성과 근거를 함께 기재했습니다.
          일부 프로젝트는 보안/계약 이슈로 링크가 비공개이며 요청 시 시연 가능합니다.
        </p>

        {/* ── Main tabs ── */}
        <div className="flex items-center gap-0 mb-8 border-b border-border" role="tablist" aria-label="프로젝트 유형">
          {(["dev", "design"] as MainTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="relative px-5 py-3 text-sm font-medium transition-colors duration-200"
              style={{ color: activeTab === tab ? "var(--foreground)" : "var(--muted)" }}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab === "dev" ? "개발" : "디자인"}
              {activeTab === tab && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Design sub-filters ── */}
        {activeTab === "design" && (
          <div className="flex flex-wrap gap-2 mb-8 animate-tab-content">
            {designFilters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setDesignFilter(value)}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
                style={
                  designFilter === value
                    ? { background: "var(--accent)", color: "var(--background)", border: "1px solid var(--accent)" }
                    : { background: "transparent", color: "var(--muted)", border: "1px solid var(--border)" }
                }
              >
                {label}
                <span className="ml-1.5 opacity-60 font-mono text-[10px]">
                  {value === "all"
                    ? designProjects.length
                    : designProjects.filter((p) => p.category === value).length}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── Dev projects grid ── */}
        {activeTab === "dev" && (
          <div key="dev" className="animate-tab-content">
            {/* Featured */}
            <div className="project-card mb-5">
              <DevCard project={devProjects[0]} featured />
            </div>
            {/* 2-col */}
            <div className="grid gap-5 sm:grid-cols-2">
              {devProjects.slice(1).map((p) => (
                <div key={p.name} className="project-card">
                  <DevCard project={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Design projects grid ── */}
        {activeTab === "design" && (
          <div key={`design-${designFilter}`} className="animate-tab-content">
            {filteredDesign.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted">해당 카테고리의 프로젝트가 없습니다.</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDesign.map((p, i) => (
                  <div
                    key={p.name}
                    className="project-card"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <DesignCard project={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
