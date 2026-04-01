"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "빠른 납기",
    desc: "소규모 랜딩 기준 최단 3일. 체계적인 프로세스로 납기를 반드시 지킵니다.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "모바일 우선 설계",
    desc: "모바일 트래픽이 60%를 넘는 지금. 모든 디바이스에서 완벽하게 동작합니다.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "SEO 기본 적용",
    desc: "시맨틱 마크업, 메타 태그, Core Web Vitals 최적화를 기본 패키지로 제공합니다.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "성과 중심 설계",
    desc: "예쁜 것보다 전환율. 방문자가 문의·구매·신청으로 자연스럽게 이어지게 설계합니다.",
  },
];

export default function ClientFeatures() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".ap-scroll");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    cards.forEach((c, i) => { c.style.transitionDelay = `${i * 80}ms`; obs.observe(c); });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={ref}
      aria-labelledby="features-heading"
      className="flex flex-col items-center justify-center px-6 py-20"
      style={{ minHeight: "100svh", background: "#f8fafc" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="ap-scroll mb-3 text-center">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#0071e3" }}>
            왜 우리인가
          </p>
          <h2
            id="features-heading"
            className="text-3xl font-bold sm:text-4xl lg:text-5xl"
            style={{ color: "#1d1d1f", letterSpacing: "-0.02em" }}
          >
            결과로 증명하는 강점
          </h2>
        </div>
        <p className="ap-scroll mb-14 text-center mx-auto max-w-lg text-base leading-relaxed" style={{ color: "#6e6e73" }}>
          단순히 예쁜 홈페이지가 아닌, 비즈니스 목표를 달성하는 홈페이지를 만듭니다.
        </p>

        {/* 2×2 grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="ap-scroll">
              <div
                className="group rounded-3xl p-8 transition-all duration-300 hover:shadow-xl"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(15,23,42,0.08)",
                }}
              >
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(0,113,227,0.08)", color: "#0071e3" }}
                >
                  {f.icon}
                </div>
                <h3
                  className="mb-2 text-base font-semibold"
                  style={{ color: "#1d1d1f" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-6" style={{ color: "#6e6e73" }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
