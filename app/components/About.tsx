const techStack = [
  "React / Next.js / TypeScript",
  "Node.js / REST API 설계",
  "Supabase / DB 설계",
  "Figma / UI Design",
  "Vercel / AWS / Cloudflare",
  "클라이언트 소통 / 요구사항 정리",
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="about-heading"
          className="mb-12 font-mono text-xs uppercase tracking-widest text-accent"
        >
          About
        </p>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Bio */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-2xl font-semibold text-foreground leading-snug">
              서비스가 어떻게 동작해야 하는지,
              <br />
              처음부터 끝까지 직접 생각합니다.
            </h2>
            <p className="leading-7 text-foreground/70">
              프론트부터 백엔드, DB 설계, 서버 관리까지 직접 담당합니다.{" "}
              <span className="text-foreground font-medium">디자인 감각</span>으로 화면 방향을 잡고,
              클라이언트 요구사항을{" "}
              <span className="text-foreground font-medium">기능 명세로 구체화</span>하는 것까지 혼자 가능합니다.
            </p>

            {/* 흐름 표시 */}
            <div className="flex items-center gap-2 pt-1">
              {["기획 이해", "설계", "구현", "배포"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-xs text-foreground/80">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-accent/50 text-xs">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-widest text-foreground/40">
              주요 기술
            </h3>
            <ul className="space-y-3">
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-3 font-mono text-sm text-foreground/75"
                >
                  <span className="text-accent text-xs" aria-hidden="true">
                    ▹
                  </span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
