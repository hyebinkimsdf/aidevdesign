"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { siteProjects, type SiteProject, type SiteProjectThumb } from "@/lib/site-projects";

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function BrowserChrome({ tint }: { tint: string }) {
  return (
    <div
      className="flex items-center justify-between border-b px-4 py-3"
      style={{ borderColor: `${tint}24`, background: `${tint}12` }}
    >
      <div className="flex items-center gap-1.5">
        {[0.85, 0.55, 0.35].map((opacity, index) => (
          <span
            key={index}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: tint, opacity }}
          />
        ))}
      </div>
      <div
        className="h-7 w-40 rounded-full border"
        style={{ borderColor: `${tint}30`, background: "rgba(255,255,255,0.04)" }}
      />
      <div
        className="h-7 w-16 rounded-full"
        style={{ background: `linear-gradient(135deg, ${tint}, rgba(255,255,255,0.18))` }}
      />
    </div>
  );
}

function WithbillThumb() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#1f1020 0%,#12080f 45%,#281115 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(251,113,133,0.28), transparent 28%), radial-gradient(circle at 78% 35%, rgba(251,191,36,0.18), transparent 24%)",
        }}
      />
      <BrowserChrome tint="#fb7185" />
      <div className="relative px-5 py-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#fda4af]">
              Dance Academy
            </p>
            <h4 className="mt-2 text-xl font-semibold text-white">WITHBILL</h4>
            <div className="mt-2 h-2 w-36 rounded-full bg-white/30" />
            <div className="mt-1.5 h-2 w-24 rounded-full bg-white/15" />
          </div>
          <div className="grid h-24 w-24 place-items-center rounded-[2rem] border border-white/10 bg-white/5 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#fecdd3]">
              Class
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["Program", "Coach", "Location"].map((label) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="mb-3 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5" />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#fecdd3]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-5 rounded-full border border-[#fb718540] bg-[#fb71851a] px-3 py-1 font-mono text-[10px] text-[#fecdd3]">
        상담 전환 중심
      </div>
    </div>
  );
}

function PwinThumb() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#102015 0%,#0f1411 45%,#201a10 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "linear-gradient(transparent 0 78%, rgba(163,230,53,0.08) 78% 79%, transparent 79%), radial-gradient(circle at 75% 20%, rgba(190,242,100,0.12), transparent 26%)",
        }}
      />
      <BrowserChrome tint="#a3e635" />
      <div className="relative px-5 py-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#bef264]">
              Corporate
            </p>
            <h4 className="mt-2 text-xl font-semibold text-white">PWIN</h4>
          </div>
          <div className="rounded-full border border-[#a3e63533] px-3 py-1 font-mono text-[10px] text-[#d9f99d]">
            Contribution 100%
          </div>
        </div>
        <div className="grid grid-cols-[1.35fr_1fr] gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 h-20 rounded-xl bg-gradient-to-br from-[#a3e63533] to-transparent" />
            <div className="h-2 w-28 rounded-full bg-white/30" />
            <div className="mt-1.5 h-2 w-20 rounded-full bg-white/15" />
          </div>
          <div className="space-y-3">
            {["Product", "Method", "Cases"].map((label) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d9f99d]">
                  {label}
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-5 rounded-full border border-[#a3e63533] bg-[#a3e6351a] px-3 py-1 font-mono text-[10px] text-[#d9f99d]">
        제품 · 시공 사례
      </div>
    </div>
  );
}

function LgshopThumb() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#2b090e 0%,#180608 42%,#2f1116 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(248,113,113,0.25), transparent 28%), radial-gradient(circle at 82% 38%, rgba(254,202,202,0.14), transparent 20%)",
        }}
      />
      <BrowserChrome tint="#f87171" />
      <div className="relative px-5 py-5">
        <div className="grid grid-cols-[1.2fr_0.9fr] gap-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#fca5a5]">
              Store 상담예약
            </p>
            <div className="mt-3 h-3 w-32 rounded-full bg-white/30" />
            <div className="mt-1.5 h-2 w-24 rounded-full bg-white/15" />
            <div className="mt-5 rounded-2xl bg-white/6 p-3">
              {["이름", "전화번호", "구매 유형"].map((label) => (
                <div key={label} className="mb-2 last:mb-0">
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#fecaca]">
                    {label}
                  </div>
                  <div className="h-9 rounded-xl border border-white/10 bg-black/10" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#f8717130] to-transparent p-4">
              <div className="h-16 rounded-2xl bg-white/10" />
              <div className="mt-3 h-2 w-16 rounded-full bg-white/25" />
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#fecaca]">
                Kakao Map
              </div>
              <div className="h-20 rounded-2xl bg-black/15" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-5 rounded-full border border-[#f8717133] bg-[#f8717118] px-3 py-1 font-mono text-[10px] text-[#fecaca]">
        예약 전환 최적화
      </div>
    </div>
  );
}

function MicimpactThumb() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#08131d 0%,#05070c 46%,#111827 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 16% 16%, rgba(56,189,248,0.22), transparent 24%), radial-gradient(circle at 78% 34%, rgba(59,130,246,0.18), transparent 22%)",
        }}
      />
      <BrowserChrome tint="#38bdf8" />
      <div className="relative px-5 py-5">
        <div className="mb-4 flex items-center gap-2">
          {["Speaker", "Artist", "Price"].map((label) => (
            <span
              key={label}
              className="rounded-full border px-3 py-1 font-mono text-[10px]"
              style={{ borderColor: "rgba(56,189,248,0.24)", color: "#bae6fd", background: "rgba(56,189,248,0.10)" }}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((card) => (
            <div key={card} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="mb-3 h-16 rounded-xl bg-gradient-to-br from-[#38bdf826] to-transparent" />
              <div className="h-2 w-20 rounded-full bg-white/25" />
              <div className="mt-1.5 h-2 w-12 rounded-full bg-white/12" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-5 rounded-full border border-[#38bdf833] bg-[#38bdf818] px-3 py-1 font-mono text-[10px] text-[#bae6fd]">
        검색 · 카테고리 탐색
      </div>
    </div>
  );
}

function WeasleyThumb() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#0d1117 0%,#0a0c10 45%,#131a24 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(99,179,237,0.22), transparent 26%), radial-gradient(circle at 76% 38%, rgba(129,140,248,0.16), transparent 22%)",
        }}
      />
      <BrowserChrome tint="#63b3ed" />
      <div className="relative px-5 py-5">
        <div className="mb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#93c5fd]">
            Homepage Dev Service
          </p>
          <h4 className="mt-2 text-xl font-semibold text-white">글로벌엠아이지</h4>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {["쇼핑몰", "기업사이트", "글로벌"].map((label) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center">
              <div className="mb-2 h-8 rounded-lg bg-gradient-to-br from-[#63b3ed22] to-transparent" />
              <div className="font-mono text-[9px] text-[#bfdbfe]">{label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#93c5fd]">Portfolio</div>
          <div className="grid grid-cols-4 gap-1.5">
            {[0,1,2,3].map(i => (
              <div key={i} className="h-10 rounded-lg bg-white/8" />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-5 rounded-full border border-[#63b3ed33] bg-[#63b3ed18] px-3 py-1 font-mono text-[10px] text-[#bfdbfe]">
        PHP · MySQL
      </div>
    </div>
  );
}

const FALLBACK_COMPONENTS: Record<SiteProjectThumb, () => React.ReactElement> = {
  withbill: WithbillThumb,
  pwin: PwinThumb,
  lgshop: LgshopThumb,
  micimpact: MicimpactThumb,
  weasley: WeasleyThumb,
};

const SLIDE_COUNT = 3;
const SLIDE_INTERVAL = 3000;

function ProjectThumb({ thumb }: { thumb: SiteProjectThumb }) {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState<boolean[]>(Array(SLIDE_COUNT).fill(false));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(advance, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const allFailed = failed.every(Boolean);
  const Fallback = FALLBACK_COMPONENTS[thumb];

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      {allFailed ? (
        <Fallback />
      ) : (
        <>
          {Array.from({ length: SLIDE_COUNT }, (_, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: current === i ? 1 : 0 }}
            >
              {!failed[i] && (
                <Image
                  src={`/thumbs/${thumb}/${i + 1}.jpg`}
                  alt={`${thumb} screenshot ${i + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top"
                  onError={() =>
                    setFailed((prev) => {
                      const next = [...prev];
                      next[i] = true;
                      return next;
                    })
                  }
                />
              )}
            </div>
          ))}

          <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  if (timerRef.current) clearInterval(timerRef.current);
                  timerRef.current = setInterval(advance, SLIDE_INTERVAL);
                }}
                aria-label={`슬라이드 ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: current === i ? "16px" : "6px",
                  background: current === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: SiteProject }) {
  return (
    <article className="project-card-inner group relative h-full overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-accent/40">
      {/* 카드 전체 클릭 링크 */}
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0"
        aria-label={`${project.name} 사이트 열기`}
      />

      <div className="project-thumb-wrap relative h-52">
        <div className="project-thumb-inner h-full w-full transition-transform duration-300 group-hover:scale-[1.02]">
          <ProjectThumb thumb={project.thumb} />
        </div>
        <div
          className="project-thumb-overlay absolute inset-0 flex items-end justify-between p-4"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,12,0.96) 0%, rgba(11,15,12,0.35) 60%, transparent 100%)",
          }}
        >
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-accent/25 bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* 실무 뱃지 */}
          <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[9px] text-white/80 backdrop-blur-sm">
            실운영
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] text-accent/70">{project.client}</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">{project.name}</h3>
            <p className="mt-1 text-xs text-muted">{project.tagline}</p>
          </div>
          <div className="relative z-10 flex shrink-0 gap-2.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
                aria-label={`${project.name} GitHub`}
              >
                <GitHubIcon />
              </a>
            )}
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
              aria-label={`${project.name} 라이브 사이트`}
            >
              <ExternalIcon />
            </a>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted/70">
            {project.domain}
          </span>
          <span className="rounded border border-accent/30 bg-accent/8 px-2 py-0.5 font-mono text-[10px] text-accent/80">
            {project.contribution}
          </span>
        </div>

        <p className="mb-4 text-xs leading-6 text-muted">{project.description}</p>

        <ul className="space-y-1.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-[11px] text-muted/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  all: "전체",
  academy: "Academy",
  corporate: "Corporate",
  commerce: "Commerce",
  platform: "Platform",
  service: "Service",
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = siteProjects.filter((p) => {
    const matchCategory =
      activeCategory === "all" || p.category === activeCategory;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.domain.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".project-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 60}ms`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, [filtered]);

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
        <h2 className="mb-4 max-w-2xl text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
          실제 운영 중인 사이트를 중심으로
          <br />
          제작 범위와 서비스 목적이 드러나도록 정리했습니다.
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-6 text-muted/75">
          화면 디자인뿐 아니라 상담 전환, 정보 구조, 운영 반영까지 함께 맡았던 프로젝트들입니다.
          모두 실제 서비스 도메인 기준으로 정리했고, 공개 가능한 경우 라이브 링크와 저장소를 연결했습니다.
        </p>

        {/* 검색 + 카테고리 필터 */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/50"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="프로젝트 검색"
              className="w-full rounded border border-border bg-surface py-2 pl-8 pr-3 font-mono text-xs text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className="rounded border px-3 py-1.5 font-mono text-[11px] transition-colors duration-150"
                style={{
                  borderColor: activeCategory === key ? "var(--accent)" : "var(--border)",
                  color: activeCategory === key ? "var(--accent)" : "var(--muted)",
                  background: activeCategory === key ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 균일 그리드 */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((project) => (
              <div key={project.id} className="project-card">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-border">
            <p className="font-mono text-xs text-muted/50">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
