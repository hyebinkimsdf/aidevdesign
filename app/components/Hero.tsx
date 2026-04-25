const orbitText = " FULLSTACK · DESIGN · API · DATABASE · SERVICE · ";

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

      {/* Decorative orbiting text (non-essential visual only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block"
      >
        <div className="orbit-ring">
          <div className="orbit-ring-glow" />
          <div className="orbit-letters" role="presentation">
            {orbitText.split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                style={{
                  transform: `rotate(${(360 / orbitText.length) * index}deg) translateY(-88px)`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="orbit-core" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-4 font-mono text-sm text-accent animate-fade-in">
          안녕하세요, 저는
        </p>

        <h1 className="mb-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-slide-up delay-100">
          Hyebin
        </h1>

        <h2 className="mb-6 text-xl font-medium text-foreground/75 sm:text-2xl lg:text-3xl animate-fade-in-up delay-200">
          화면·서버·데이터를 함께 설계하는{" "}
          <span className="text-foreground">풀스택 개발자</span>
        </h2>

        <p className="mb-10 max-w-lg text-base leading-7 text-foreground/60 animate-fade-in-up delay-300 whitespace-pre-line">
          프론트, 백엔드, DB 설계까지 직접 담당합니다.{"\n"}기획 이해부터 배포까지 단독 진행 가능합니다.
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
        <div aria-hidden="true" className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 animate-fade-in delay-400">
          <span className="font-mono text-xs text-muted/70">scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
        </div>
      </div>
    </section>
  );
}
