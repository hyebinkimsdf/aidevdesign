export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col items-start justify-center px-6 pt-16"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-4 font-mono text-sm text-accent animate-fade-in">
          안녕하세요, 저는
        </p>

        <h1 className="mb-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-fade-in-up delay-100">
          Hyebin
        </h1>

        <h2 className="mb-6 text-xl font-medium text-muted sm:text-2xl lg:text-3xl animate-fade-in-up delay-200">
          AI 기반{" "}
          <span className="text-foreground">프론트엔드 개발자</span>
        </h2>

        <p className="mb-10 max-w-lg text-base leading-7 text-muted animate-fade-in-up delay-300">
          React와 Next.js로 사용자 경험을 설계하고, AI 기술을 접목한
          인터랙티브 웹 서비스를 만듭니다. 복잡한 것을 단순하고 빠르게
          구현하는 것을 좋아합니다.
        </p>

        <div className="flex flex-wrap gap-3 animate-fade-in-up delay-400">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent hover:text-background"
          >
            프로젝트 보기
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:border-foreground hover:text-foreground"
          >
            연락하기
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-400">
          <span className="text-xs text-muted/50 font-mono">scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
        </div>
      </div>
    </section>
  );
}
