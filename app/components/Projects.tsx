interface Project {
  name: string;
  description: string;
  contribution: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    name: "AI Chat Interface",
    description:
      "OpenAI GPT-4 API를 활용한 실시간 대화형 인터페이스입니다. 스트리밍 응답 처리를 구현해 응답 체감 속도를 크게 개선했으며, 대화 히스토리 관리와 마크다운 렌더링을 포함합니다. Next.js App Router의 Server Actions를 적극 활용해 불필요한 클라이언트 번들을 줄였습니다.",
    contribution:
      "단독 기획 및 풀스택 개발 — 스트리밍 UX 최적화, API 토큰 비용 30% 절감",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
  {
    name: "React Design System",
    description:
      "TypeScript 기반의 재사용 가능한 UI 컴포넌트 라이브러리입니다. 접근성 가이드라인(WCAG 2.1)을 준수하고 Storybook으로 문서화했습니다. 컴포넌트 간 일관성을 유지하는 디자인 토큰 시스템을 설계해 팀 전체의 개발 생산성을 높였습니다.",
    contribution:
      "컴포넌트 아키텍처 설계, 접근성 표준 구현 — 팀 개발 속도 40% 향상",
    tech: ["React", "TypeScript", "Storybook", "CSS Modules"],
    github: "#",
    demo: "#",
  },
  {
    name: "Real-time Analytics Dashboard",
    description:
      "WebSocket 기반의 실시간 데이터 시각화 대시보드입니다. 초당 수백 건의 데이터 업데이트를 처리하면서도 60fps 렌더링을 유지하도록 성능을 최적화했습니다. 모바일 반응형과 커스터마이징 가능한 위젯 레이아웃을 지원합니다.",
    contribution:
      "프론트엔드 아키텍처 설계 및 성능 최적화 — 렌더링 성능 3배 개선",
    tech: ["React", "TypeScript", "WebSocket", "Recharts", "Zustand"],
    github: "#",
    demo: "#",
  },
];

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
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="projects-heading"
          className="mb-12 font-mono text-xs uppercase tracking-widest text-accent"
        >
          Projects
        </p>

        <div className="space-y-5">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group relative rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:bg-surface/80"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
                <div className="flex items-center gap-3 shrink-0 pt-0.5">
                  {project.github && (
                    <a
                      href={project.github}
                      className="text-muted hover:text-foreground transition-colors"
                      aria-label={`${project.name} GitHub 저장소`}
                    >
                      <GitHubIcon />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="text-muted hover:text-foreground transition-colors"
                      aria-label={`${project.name} 데모 보기`}
                    >
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-3 text-sm leading-6 text-muted">
                {project.description}
              </p>

              {/* Contribution */}
              <p className="mb-4 text-xs text-muted/60">
                <span className="text-accent/70 font-medium">기여 &amp; 성과: </span>
                {project.contribution}
              </p>

              {/* Tech badges */}
              <ul className="flex flex-wrap gap-2" aria-label="사용 기술">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded bg-background px-2.5 py-1 font-mono text-xs text-muted/80 border border-border"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
