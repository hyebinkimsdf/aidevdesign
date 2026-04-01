export default function ClientHero() {
  return (
    <>
      {/* ── Hero — full viewport ── */}
      <section
        id="hero"
        aria-label="Hero"
        className="relative flex flex-col items-center justify-center px-6 text-center"
        style={{
          minHeight: "100svh",
          background: "#ffffff",
        }}
      >
        {/* Subtle halo behind headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(15,23,42,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Eyebrow pill */}
          <div className="ap-reveal ap-d0 mb-8 flex justify-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
              style={{
                background: "rgba(0,113,227,0.08)",
                color: "#0071e3",
                border: "1px solid rgba(0,113,227,0.15)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              기업용 랜딩 페이지 전문 제작
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="ap-reveal ap-d1 mb-6 font-bold tracking-tight"
            style={{ color: "#1d1d1f", lineHeight: 1.06 }}
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              기업의 첫인상,
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl ap-gradient-text">
              우리가 설계합니다.
            </span>
          </h1>

          {/* Sub-description */}
          <p
            className="ap-reveal ap-d2 mx-auto mb-10 max-w-xl text-lg leading-relaxed sm:text-xl"
            style={{ color: "#6e6e73" }}
          >
            홈페이지 하나로 신뢰를 얻고, 문의를 늘리고, 브랜드를 키웁니다.
            빠른 납기 · 모바일 최적화 · SEO 기본 적용.
          </p>

          {/* CTA buttons */}
          <div className="ap-reveal ap-d3 flex flex-wrap justify-center gap-3">
            <a
              href="#cta"
              className="ap-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium"
            >
              프로젝트 의뢰하기
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#portfolio"
              className="ap-btn-ghost inline-flex items-center px-7 py-3.5 text-sm font-medium"
            >
              포트폴리오 보기
            </a>
          </div>

          {/* Trust indicators */}
          <div className="ap-fade ap-d5 mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {["완성 프로젝트 28+", "납기 준수율 100%", "평균 만족도 4.9"].map((t) => (
              <span key={t} className="text-xs" style={{ color: "#ababab" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="ap-fade ap-d5 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#ababab" }}
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Thin divider strip ── */}
      <div
        style={{
          background: "#f8fafc",
          borderTop: "1px solid rgba(15,23,42,0.06)",
          borderBottom: "1px solid rgba(15,23,42,0.06)",
        }}
        className="overflow-hidden py-4"
        aria-hidden="true"
      >
        <div className="cl-marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }, (_, rep) =>
            ["기업 홈페이지", "서비스 랜딩", "브랜드 사이트", "제품 소개", "채용 페이지", "이벤트 페이지"].map((item, i) => (
              <span
                key={`${rep}-${i}`}
                className="inline-flex items-center gap-6 px-8 font-mono text-xs uppercase tracking-widest"
                style={{ color: "rgba(0,0,0,0.2)" }}
              >
                {item}
                <span style={{ color: "rgba(0,0,0,0.12)" }}>·</span>
              </span>
            ))
          )}
        </div>
      </div>
    </>
  );
}
