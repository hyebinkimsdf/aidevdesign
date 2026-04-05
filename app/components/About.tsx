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
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground leading-snug">
              서비스가 어떻게 동작해야 하는지,
              <br />
              처음부터 끝까지 직접 생각합니다.
            </h2>
            <p className="leading-7 text-muted">
              단순히 UI를 구현하는 것에 그치지 않고, 데이터가 어디서 오고
              어떻게 저장되는지, 어떤 API 구조가 유지보수에 유리한지까지
              직접 설계합니다. 프론트엔드, 백엔드, DB 구조, 서버 관리,
              관리자 기능까지 하나의 서비스를 처음부터 끝까지 완성한
              경험이 있습니다.
            </p>
            <p className="leading-7 text-muted">
              디자인 감각이 있어 화면과 UX 방향을 함께 제안할 수 있고,
              클라이언트와 직접 소통하며 모호한 요구사항을 구체적인 기능
              명세로 정리하는 것도 제가 잘하는 일입니다.
            </p>
            <p className="leading-7 text-muted">
              <span className="text-foreground font-medium">기획 이해</span>{" "}
              →{" "}
              <span className="text-foreground/80">설계</span> →{" "}
              <span className="text-foreground/60">구현</span> →{" "}
              <span className="text-foreground/40">배포</span>
            </p>
          </div>

          {/* Tech stack */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-widest text-muted">
              주요 기술
            </h3>
            <ul className="space-y-3">
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-3 font-mono text-sm text-muted"
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
