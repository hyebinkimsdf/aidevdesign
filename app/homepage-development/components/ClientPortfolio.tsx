"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { siteProjects, type SiteProject, type SiteProjectCategory, type SiteProjectThumb } from "@/lib/site-projects";

const categoryLabel: Record<SiteProjectCategory, string> = {
  academy: "교육·아카데미",
  corporate: "기업 홈페이지",
  commerce: "매장·상담 전환",
  platform: "플랫폼·서비스",
  service: "서비스 페이지",
};

const THUMB_PALETTE: Record<SiteProjectThumb, { bg: string; accent: string; soft: string; label: string }> = {
  withbill: { bg: "linear-gradient(135deg,#fff1f2,#ffe4e6)", accent: "#e11d48", soft: "rgba(225,29,72,0.10)", label: "Dance" },
  pwin:     { bg: "linear-gradient(135deg,#f7fee7,#ecfccb)", accent: "#65a30d", soft: "rgba(101,163,13,0.10)", label: "B2B" },
  lgshop:   { bg: "linear-gradient(135deg,#fef2f2,#fee2e2)", accent: "#dc2626", soft: "rgba(220,38,38,0.10)", label: "Shop" },
  micimpact:{ bg: "linear-gradient(135deg,#eff6ff,#dbeafe)", accent: "#2563eb", soft: "rgba(37,99,235,0.10)", label: "Media" },
  weasley:    { bg: "linear-gradient(135deg,#f0f9ff,#e0f2fe)", accent: "#0369a1", soft: "rgba(3,105,161,0.10)", label: "Web" },
  vividdrone: { bg: "linear-gradient(135deg,#060810,#0c0f1a)", accent: "#63d2ff", soft: "rgba(99,210,255,0.10)", label: "Drone" },
};

const SLIDE_COUNT = 3;
const SLIDE_INTERVAL = 3000;

function ClientThumbSlide({ thumb }: { thumb: SiteProjectThumb }) {
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
  const palette = THUMB_PALETTE[thumb];

  if (allFailed) {
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: palette.bg }}>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b px-4 py-3" style={{ borderColor: `${palette.accent}18` }}>
          <div className="flex gap-1.5">
            {[0.75, 0.5, 0.35].map((opacity, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: palette.accent, opacity }} />
            ))}
          </div>
          <div className="h-6 w-24 rounded-full" style={{ background: palette.soft, border: `1px solid ${palette.accent}20` }} />
        </div>
        <div className="px-4 pt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: palette.accent }}>{palette.label}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0,1,2].map((i) => (
              <div key={i} className="rounded-2xl p-2.5" style={{ background: "rgba(255,255,255,0.72)", border: `1px solid ${palette.accent}12` }}>
                <div className="mb-2 h-8 rounded-xl" style={{ background: palette.soft }} />
                <div className="h-1.5 rounded-full bg-slate-300/80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-100">
      <div className="absolute inset-0 transition-opacity duration-500">
        {!failed[current] && (
          <Image
            src={`/thumbs/${thumb}/${current + 1}.jpg`}
            alt={`${thumb} screenshot ${current + 1}`}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover object-top"
            onError={() => {
              setFailed((prev) => {
                const next = [...prev];
                next[current] = true;
                return next;
              });
              setCurrent((prev) => (prev + 1) % SLIDE_COUNT);
            }}
          />
        )}
      </div>

      <div className="absolute bottom-2 right-2 flex gap-1.5 z-10">
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
              width: current === i ? "14px" : "5px",
              background: current === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ClientPortfolio() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".cl-scroll-card");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
    );

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 70}ms`;
      obs.observe(card);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      ref={ref}
      aria-labelledby="portfolio-heading"
      className="px-6 py-24"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8" style={{ background: "#0ea5e9" }} />
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#0ea5e9" }}>
            Client Portfolio
          </p>
        </div>
        <h2 id="portfolio-heading" className="mb-4 text-3xl font-bold sm:text-4xl" style={{ color: "#111827" }}>
          직접 제작한
          <span className="ap-gradient-text"> 실서비스 웹사이트</span>
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-6" style={{ color: "#475569" }}>
          업종에 맞는 화면 구성, 문의 전환 흐름, 운영 목적을 함께 설계한 실제 제작 사례입니다.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteProjects.map((project) => (
            <div key={project.id} className="cl-scroll-card">
              <article
                className="cl-card group relative h-full overflow-hidden rounded-3xl transition-shadow duration-200 hover:shadow-md"
                style={{ border: "1px solid rgba(15,23,42,0.08)", background: "#ffffff" }}
              >
                {/* 카드 전체 클릭 링크 */}
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-0"
                  aria-label={`${project.name} 사이트 열기`}
                />

                <div className="relative h-48 overflow-hidden">
                  <div className="cl-card-thumb h-full w-full transition-transform duration-300 group-hover:scale-[1.02]">
                    <ClientThumbSlide thumb={project.thumb} />
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <p className="mb-0.5 font-mono text-[10px]" style={{ color: "#64748b" }}>
                        {project.client}
                      </p>
                      <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>
                        {project.name}
                      </h3>
                    </div>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 mt-0.5 shrink-0 transition-colors"
                      style={{ color: "#4a4a6a" }}
                      aria-label={`${project.name} 사이트 열기`}
                    >
                      <ExternalIcon />
                    </a>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-1.5">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                      style={{ background: "rgba(14,165,233,0.08)", color: "#0284c7" }}
                    >
                      {categoryLabel[project.category]}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                      style={{ background: "rgba(15,23,42,0.04)", color: "#64748b" }}
                    >
                      {project.domain}
                    </span>
                  </div>

                  <p className="text-xs leading-5" style={{ color: "#475569" }}>
                    {project.tagline}
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
