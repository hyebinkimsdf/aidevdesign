"use client";

import { useLang } from "../context/LanguageContext";
import translations from "../i18n/translations";
import { useReveal } from "../hooks/useReveal";

const categories = ["Frontend", "Backend & Data", "Design & Communication"];

export default function Skills() {
  const { lang } = useLang();
  const t = translations[lang].skills;
  const sectionRef = useReveal();

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-labelledby="skills-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="skills-heading"
          className="mb-12 font-mono text-xs uppercase tracking-widest text-accent ap-scroll"
        >
          Skills
        </p>

        <div className="grid gap-8 sm:grid-cols-3">
          {t.groups.map((group, idx) => (
            <div
              key={categories[idx]}
              className="ap-scroll"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-foreground">
                  {categories[idx]}
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
