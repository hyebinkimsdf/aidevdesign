function EmailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="contact-heading"
          className="mb-6 font-mono text-xs uppercase tracking-widest text-accent"
        >
          Contact
        </p>

        <h2 className="mb-3 text-2xl font-semibold text-foreground">
          함께 만들어요
        </h2>
        <p className="mb-10 max-w-md text-sm leading-7 text-muted">
          새로운 기회, 협업 제안, 혹은 단순한 인사도 환영합니다.
          이메일로 편하게 연락해 주세요.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:hello@hyebin.dev"
            className="inline-flex items-center gap-2.5 rounded border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent hover:text-background"
          >
            <EmailIcon />
            hello@hyebin.dev
          </a>
          <a
            href="https://github.com/hyebin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded border border-border px-5 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:border-foreground/50 hover:text-foreground"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
