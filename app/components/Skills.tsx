interface SkillGroup {
  category: string;
  description: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    description: "화면 레이어",
    items: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML / CSS",
      "Zustand / React Query",
    ],
  },
  {
    category: "Backend & Data",
    description: "서버 레이어",
    items: [
      "Node.js / REST API 설계",
      "PHP",
      "MySQL",
      "Supabase (DB / Auth)",
      "관리자 기능 구현",
      "Vercel / AWS / Cloudflare",
      "OpenAI / Claude API",
    ],
  },
  {
    category: "Design & Communication",
    description: "차별점",
    items: [
      "Figma / UI Design",
      "Responsive Design",
      "UX 방향 제안",
      "요구사항 정리 / 기능 명세",
      "클라이언트 커뮤니케이션",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="skills-heading"
          className="mb-12 font-mono text-xs uppercase tracking-widest text-accent"
        >
          Skills
        </p>

        <div className="grid gap-8 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-foreground">
                  {group.category}
                </h3>
                <span className="text-xs font-mono text-accent">
                  {group.description}
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-sm text-foreground/75"
                  >
                    <span
                      className="h-px w-3 shrink-0 bg-accent/40"
                      aria-hidden="true"
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
