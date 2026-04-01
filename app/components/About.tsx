const techStack = [
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Figma / UI Design",
  "OpenAI API",
  "Vercel",
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
              개발로 문제를 해결하고,
              <br />
              디자인으로 경험을 완성합니다.
            </h2>
            <p className="leading-7 text-muted">
              사용자가 실제로 필요한 것을 파악하고, 그것을 직관적이고
              빠른 인터페이스로 구현하는 것을 추구합니다. 프론트엔드
              개발을 주력으로, UI/UX 디자인을 보조 역량으로 활용합니다.
            </p>
            <p className="leading-7 text-muted">
              최근에는 LLM API와 AI 도구를 실제 프로덕트에 통합하는
              작업에 집중하고 있습니다. 사용자가 AI와 자연스럽게
              상호작용할 수 있는 인터페이스를 만드는 것이 목표입니다.
            </p>
            <p className="leading-7 text-muted">
              <span className="text-foreground font-medium">Frontend</span> →{" "}
              <span className="text-foreground/70">UI/UX Design</span> →{" "}
              <span className="text-foreground/50">AI Integration</span>
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
