import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Impact from "../components/Impact";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import PerformanceReport from "../components/PerformanceReport";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Homepage Dev, Design, AI — ALL IN ONE",
  description:
    "Full-stack development, design sensibility, and client communication — all in one.",
  alternates: {
    canonical: "/en",
  },
};

const Projects = dynamicImport(() => import("../components/ProjectsEn"), {
  loading: () => (
    <section className="section-divider px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="h-8 w-24 animate-pulse rounded bg-surface" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-surface" />
          ))}
        </div>
      </div>
    </section>
  ),
});

export default function EnHome() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Impact />
        <PerformanceReport />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="section-divider px-6 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="font-mono text-xs text-muted/70">
            © 2026 Hyebin
          </span>
          <span className="font-mono text-xs text-muted/70">
            Built with Next.js &amp; TypeScript
          </span>
        </div>
      </footer>
    </>
  );
}
