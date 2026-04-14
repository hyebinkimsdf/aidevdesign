"use client";

import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import translations from "../i18n/translations";
import { useReveal } from "../hooks/useReveal";

function ConsultIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v7c0 1.38-1.12 2.5-2.5 2.5H10l-4.5 4v-4H6.5C5.12 16 4 14.88 4 13.5z" />
      <path d="M8 9h8" /><path d="M8 12h5" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="9" height="9" rx="2" />
      <rect x="11" y="10" width="9" height="9" rx="2" />
      <path d="M8 18h4" />
    </svg>
  );
}

function SeoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
      <path d="M8 12.5 10.2 10l1.8 1.6L14 9" />
    </svg>
  );
}

const icons = [ConsultIcon, BuildIcon, SeoIcon];
const CYCLE_MS = 2000;

export default function Impact() {
  const { lang } = useLang();
  const t = translations[lang].impact;
  const sectionRef = useReveal();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % icons.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-labelledby="impact-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="impact-heading"
          className="mb-6 font-mono text-xs uppercase tracking-widest text-accent ap-scroll"
        >
          Business Impact
        </p>

        <h2 className="mb-10 text-2xl font-semibold text-foreground ap-scroll" style={{ transitionDelay: "80ms" }}>
          {t.h2}
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {t.strengths.map((item, idx) => {
            const Icon = icons[idx];
            const isActive = idx === activeIdx;
            return (
              <article
                key={item.title}
                className={`impact-card rounded border p-5 ${isActive ? "impact-card--active" : "impact-card--inactive"}`}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-accent/90">
                  <Icon />
                </div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-foreground/60">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
