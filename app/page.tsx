import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="section-divider px-6 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="font-mono text-xs text-muted/50">
            © 2026 Hyebin
          </span>
          <span className="font-mono text-xs text-muted/50">
            Built with Next.js &amp; TypeScript
          </span>
        </div>
      </footer>
    </>
  );
}
