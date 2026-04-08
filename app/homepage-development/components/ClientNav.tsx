"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "서비스", href: "/homepage-development#features" },
  { label: "프로세스", href: "/homepage-development#process" },
  { label: "포트폴리오", href: "/homepage-development#portfolio" },
  { label: "디자인 전문", href: "/homepage-development/design" },
];

export default function ClientNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      const nextScrolled = window.scrollY > 10;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/homepage-development" className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: "#1d1d1f" }}>
            hyebin<span style={{ color: "#0071e3" }}>studio</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-8 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm transition-colors duration-150"
                style={{ color: "#6e6e73" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1d1d1f")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6e6e73")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden sm:block">
          <a
            href="#cta"
            className="ap-btn-primary inline-block px-4 py-2 text-xs font-medium"
          >
            프로젝트 의뢰
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden p-1"
          style={{ color: "#1d1d1f" }}
          onClick={() => setOpen(!open)}
          aria-label="메뉴"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            {open ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M3.293 3.293a1 1 0 011.414 0L9 7.586l4.293-4.293a1 1 0 111.414 1.414L10.414 9l4.293 4.293a1 1 0 01-1.414 1.414L9 10.414l-4.293 4.293a1 1 0 01-1.414-1.414L7.586 9 3.293 4.707a1 1 0 010-1.414z" />
            ) : (
              <path fillRule="evenodd" clipRule="evenodd" d="M2 4a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className="sm:hidden"
          style={{ background: "rgba(255,255,255,0.96)", borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <ul className="flex flex-col px-6 py-4 gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block py-2.5 text-sm"
                  style={{ color: "#6e6e73" }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#cta"
                className="ap-btn-primary inline-block w-full text-center px-4 py-2.5 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                프로젝트 의뢰
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
