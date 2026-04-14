"use client";

import { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";

const links = [
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
 
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-mono text-sm text-accent hover:opacity-80 transition-opacity"
        >
          hyebin.dev
        </a>

        {/* Desktop navigation */}
        <ul className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language toggle — desktop */}
        <div className="hidden sm:flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setLang("ko")}
            className={`transition-colors ${lang === "ko" ? "text-foreground font-semibold" : "text-muted hover:text-foreground"}`}
          >
            KO
          </button>
          <span className="text-muted/40">/</span>
          <button
            onClick={() => setLang("en")}
            className={`transition-colors ${lang === "en" ? "text-foreground font-semibold" : "text-muted hover:text-foreground"}`}
          >
            EN
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-muted hover:text-foreground transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            {open ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background sm:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm text-muted hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Language toggle — mobile */}
          <div className="flex items-center gap-1 px-2 pb-2 font-mono text-xs">
            <button
              onClick={() => setLang("ko")}
              className={`transition-colors ${lang === "ko" ? "text-foreground font-semibold" : "text-muted hover:text-foreground"}`}
            >
              KO
            </button>
            <span className="text-muted/40">/</span>
            <button
              onClick={() => setLang("en")}
              className={`transition-colors ${lang === "en" ? "text-foreground font-semibold" : "text-muted hover:text-foreground"}`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
