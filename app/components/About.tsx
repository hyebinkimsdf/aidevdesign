"use client";

import { useLang } from "../context/LanguageContext";
import translations from "../i18n/translations";
import { useReveal } from "../hooks/useReveal";


export default function About() {
  const { lang } = useLang();
  const t = translations[lang].about;
  const sectionRef = useReveal();

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-labelledby="about-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="about-heading"
          className="mb-12 font-mono text-xs uppercase tracking-widest text-accent ap-scroll"
        >
          About
        </p>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Bio */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-2xl font-semibold text-foreground leading-snug ap-scroll" style={{ transitionDelay: "80ms" }}>
              {t.h2line1}
              <br />
              {t.h2line2}
            </h2>
            <p className="leading-7 text-foreground/70 ap-scroll" style={{ transitionDelay: "160ms" }}>
              {t.p}{" "}
              <span className="text-foreground font-medium">{t.pbold1}</span>
              {t.pmid}
              <span className="text-foreground font-medium">{t.pbold2}</span>
              {t.pend}
            </p>

            {/* 흐름 표시 */}
            <div className="flex items-center gap-2 pt-1 ap-scroll" style={{ transitionDelay: "240ms" }}>
              {t.steps.map((step, i, arr) => (
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
          <div className="lg:col-span-2 ap-scroll" style={{ transitionDelay: "200ms" }}>
            <h3 className="mb-5 text-xs font-medium uppercase tracking-widest text-foreground/40">
              {t.techLabel}
            </h3>
            <ul className="space-y-3">
              {t.techStack.map((tech, i) => (
                <li
                  key={tech}
                  className="flex items-center gap-3 font-mono text-sm text-foreground/75 ap-scroll"
                  style={{ transitionDelay: `${280 + i * 50}ms` }}
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
