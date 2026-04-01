interface SkillGroup {
  category: string;
  description: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Development",
    description: "주력 역량",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES2024)",
      "Tailwind CSS",
      "HTML / CSS",
      "Zustand / React Query",
    ],
  },
  {
    category: "UI/UX Design",
    description: "보조 역량",
    items: [
      "Figma",
      "Responsive Design",
      "Design Systems",
      "Accessibility (WCAG)",
      "Prototyping",
    ],
  },
  {
    category: "AI & Tooling",
    description: "관심 영역",
    items: [
      "OpenAI / Claude API",
      "LLM Integration",
      "Prompt Engineering",
      "Vercel",
      "Git / GitHub",
      "REST API",
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
          {skillGroups.map((group, index) => (
            <div key={group.category}>
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-foreground">
                  {group.category}
                </h3>
                <span
                  className={`text-xs font-mono ${
                    index === 0
                      ? "text-accent"
                      : index === 1
                        ? "text-foreground/40"
                        : "text-muted/60"
                  }`}
                >
                  {group.description}
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-sm text-muted"
                  >
                    <span
                      className="h-px w-3 shrink-0 bg-border"
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
