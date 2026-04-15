"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./daangn/daangn.module.css";

/* ── Hero Section ── */
function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const typoCopyRef = useRef<HTMLDivElement>(null);
  const [typoCopy, setTypoCopy] = useState({ label: "풀스택 개발자", strong: "화면부터 서버까지,\n처음부터 끝까지 직접" });

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; opacity: number };
    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.08,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,111,15,${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      // Dots
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,111,15,${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      parallaxRef.current.style.transform = `translate(${x * 22}px, ${y * 16}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scroll: video animation + type change + color overlay
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const content = contentRef.current;
      const videoContainer = videoContainerRef.current;
      const typoCopy = typoCopyRef.current;
      
      if (!hero || !content || !videoContainer || !typoCopy) return;

      const heroHeight = hero.offsetHeight;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      
      // Content fade-out
      content.style.opacity = String(Math.max(1 - progress * 1.3, 0));
      content.style.transform = `translateY(${progress * -48}px) scale(${1 - progress * 0.04})`;

      // Video expand from initial position to fullscreen
      const videoProgress = Math.max(0, (progress - 0.4) / 0.5); // starts at 40% of scroll
      const isVideoActive = videoProgress > 0;
      
      if (isVideoActive) {
        const w = 100 + videoProgress * (100 - 100) * 0.5; // width expansion
        const h = 54 + videoProgress * (100 - 54) * 0.5; // height expansion (16:9 ratio)
        const radius = 12 - videoProgress * 12; // border radius → 0
        
        videoContainer.style.width = `${Math.min(w, 100)}vw`;
        videoContainer.style.height = `${Math.min(h, 100)}vh`;
        videoContainer.style.borderRadius = `${Math.max(radius, 0)}px`;
        videoContainer.style.left = `${50 - Math.min(w, 100) / 2}vw`;
        videoContainer.style.top = `${50 - Math.min(h, 100) / 2}vh`;
        
        // 타이포 색 변경: 비디오가 타이포와 닿을 때
        if (videoProgress > 0.15) {
          typoCopy.style.color = "#ffffff";
        } else {
          typoCopy.style.color = "#212124";
        }
        
        // 타이포 내용 변경: 풀스크린 10% 남았을 때
        if (videoProgress > 0.9) {
          setTypoCopy({ 
            label: "영상 로딩 중", 
            strong: "프로젝트 동작\n직접 확인하세요" 
          });
        } else {
          setTypoCopy({ 
            label: "풀스택 개발자", 
            strong: "화면부터 서버까지,\n처음부터 끝까지 직접" 
          });
        }
      } else {
        // Reset when not scrolled enough
        videoContainer.style.width = "28vw";
        videoContainer.style.height = "15.12vw";
        videoContainer.style.borderRadius = "12px";
        videoContainer.style.left = "36vw";
        videoContainer.style.top = "auto";
        videoContainer.style.bottom = "clamp(-14vh, -10vh, -48px)";
        typoCopy.style.color = "#212124";
        setTypoCopy({ 
          label: "풀스택 개발자", 
          strong: "화면부터 서버까지,\n처음부터 끝까지 직접" 
        });
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      <canvas ref={canvasRef} className={styles.heroCanvas} aria-hidden="true" />
      <div className={styles.heroBg} aria-hidden="true" />
      <div ref={parallaxRef} className={styles.heroParallax} aria-hidden="true">
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
      </div>

      {/* 비디오 영역 */}
      <div ref={videoContainerRef} className={styles.heroVideoContainer} style={{ position: "fixed" }}>
        <div className={styles.heroVideoShade} />
        <div className={styles.videoPill} style={{ 
          position: "absolute", 
          top: "1.5rem", 
          left: "1.5rem",
          zIndex: 2 
        }}>
          ▶ 프로젝트 영상
        </div>
        <div ref={typoCopyRef} className={styles.heroVideoCopy}>
          <span className={styles.videoPill}>{typoCopy.label}</span>
          <strong>{typoCopy.strong}</strong>
        </div>
      </div>

      <div className={styles.container} ref={contentRef}>
        <div className={styles.heroInner}>
          {/* ── Left: text ── */}
          <div className={styles.heroLeft}>
            <p className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              풀스택 개발자
            </p>
            <div className={styles.heroTitleWrap}>
              <span className={styles.heroLine1}>화면부터 서버까지,</span>
              <span className={styles.heroLine2}>
                <em className={styles.heroKeyword}>처음부터 끝까지</em> 직접
              </span>
            </div>
            <p className={styles.heroDesc}>
              프론트엔드, 백엔드, DB 설계, 서버 관리까지 직접 담당합니다.
              기획 이해부터 배포까지 단독 진행 가능합니다.
            </p>
            <div className={styles.heroActions}>
              <a href="#about" className={styles.heroCta}>
                소개 보기
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#contact" className={styles.heroCtaGhost}>연락하기</a>
            </div>
          </div>

          {/* ── Right: floating mockup ── */}
          <div className={styles.heroRight} aria-hidden="true">
            <div className={styles.heroMockup}>
              <div className={styles.mockupCard}>
                <div className={styles.mockupHeader}>
                  <span className={styles.mockupDot} style={{ background: "#ff5f57" }} />
                  <span className={styles.mockupDot} style={{ background: "#ffbd2e" }} />
                  <span className={styles.mockupDot} style={{ background: "#28c840" }} />
                  <span className={styles.mockupTitle}>portfolio · live</span>
                  <span className={styles.mockupStat}>↑ 98 LCP</span>
                </div>
                <div className={styles.mockupImg}>🚀</div>
                <div className={styles.mockupMeta}>
                  <span className={styles.mockupBadge}>실운영</span>
                  <span className={styles.mockupStat}>Next.js · Supabase</span>
                </div>
              </div>
              <div className={styles.mockupMini}>
                {[
                  { label: "프로젝트", value: "20+" },
                  { label: "운영 중", value: "Full" },
                ].map((m) => (
                  <div key={m.label} className={styles.mockupMiniCard}>
                    <div className={styles.mockupMiniLabel}>{m.label}</div>
                    <div className={styles.mockupMiniValue}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroScroll} aria-hidden="true">
        scroll
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
}

/* ── Scroll Reveal Hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Data ── */
const features = [
  {
    icon: "💬",
    title: "클라이언트 상담 & 요구사항 정리",
    points: ["요구사항 인터뷰 및 우선순위 정의", "기획 의도와 개발 난이도 균형 조율", "커뮤니케이션 문서화"],
  },
  {
    icon: "⚡",
    title: "개발 + 디자인 통합 진행",
    points: ["UI/UX 설계와 프론트엔드 구현 동시 리드", "컴포넌트 단위 재사용 구조 설계", "반응형 · 접근성 기준 완성도 관리"],
  },
  {
    icon: "📈",
    title: "광고 세팅 & SEO",
    points: ["GA4 · Meta Pixel · Google Ads 전환 추적", "메타데이터 · 구조화 기반 SEO 개선", "Lighthouse · Search Console 성능 개선"],
  },
];

const skillGroups = [
  {
    category: "Frontend",
    label: "화면 레이어",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "Zustand", "React Query"],
  },
  {
    category: "Backend & Data",
    label: "서버 레이어",
    items: ["Node.js", "REST API 설계", "PHP", "MySQL", "Supabase", "Vercel / AWS", "OpenAI / Claude API"],
  },
  {
    category: "Design & Comm.",
    label: "차별점",
    items: ["Figma", "UI Design", "Responsive Design", "UX 방향 제안", "요구사항 정리", "클라이언트 커뮤니케이션"],
  },
];

const techStack = [
  "React / Next.js / TypeScript",
  "Node.js / REST API 설계",
  "Supabase / DB 설계",
  "Figma / UI Design",
  "Vercel / AWS / Cloudflare",
  "클라이언트 소통 / 요구사항 정리",
];

/* ── Visual Placeholder Components ── */
function CodeBlock() {
  const lines = [
    { indent: false, content: [{ c: "#89b4fa", t: "const " }, { c: "#cba6f7", t: "dev" }, { c: "#89dceb", t: " = {" }] },
    { indent: true,  content: [{ c: "#a6e3a1", t: "name" }, { c: "#cdd6f4", t: ": " }, { c: "#f9e2af", t: '"Hyebin",' }] },
    { indent: true,  content: [{ c: "#a6e3a1", t: "stack" }, { c: "#cdd6f4", t: ": [" }, { c: "#f9e2af", t: '"React"' }, { c: "#cdd6f4", t: ", " }, { c: "#f9e2af", t: '"Next.js"' }, { c: "#cdd6f4", t: ", " }, { c: "#f9e2af", t: '"Node"' }, { c: "#cdd6f4", t: "]," }] },
    { indent: true,  content: [{ c: "#a6e3a1", t: "canDo" }, { c: "#cdd6f4", t: ": " }, { c: "#f9e2af", t: '"full-cycle",' }] },
    { indent: false, content: [{ c: "#cdd6f4", t: "}" }] },
    { indent: false, content: [{ c: "#6c7086", t: "// 기획 → 설계 → 구현 → 배포" }] },
  ];
  return (
    <div style={{ background: "#1e1e2e", borderRadius: 12, padding: "1.5rem", fontFamily: "monospace", fontSize: "0.8125rem", lineHeight: 1.8, color: "#cdd6f4", width: "100%" }}>
      {lines.map((line, i) => (
        <div key={i} style={{ paddingLeft: line.indent ? "1.25rem" : 0 }}>
          {line.content.map((tok, j) => (
            <span key={j} style={{ color: tok.c }}>{tok.t}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function SkillChart() {
  const bars = [
    { label: "Frontend", pct: 90, color: "#ff6f0f" },
    { label: "Backend", pct: 78, color: "#009ceb" },
    { label: "Design", pct: 82, color: "#1aa174" },
    { label: "Communication", pct: 88, color: "#f7be68" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {bars.map((b) => (
        <div key={b.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#212124" }}>{b.label}</span>
            <span style={{ fontSize: "0.8125rem", color: "#868b94" }}>{b.pct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: "#eaebee", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${b.pct}%`, borderRadius: 999, background: b.color, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Page ── */
export default function DaangnPage() {
  const pageRef = useReveal();

  return (
    <div className={styles.page} ref={pageRef}>
      {/* ─────────── Nav ─────────── */}
      <header className={styles.nav}>
        <div className={`${styles.container} ${styles.navInner}`}>
          <a href="#" className={styles.navLogo}>Hyebin</a>
          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#about" className={styles.navLink}>About</a></li>
              <li><a href="#skills" className={styles.navLink}>Skills</a></li>
              <li><a href="#contact" className={styles.navLink}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ─────────── Hero ─────────── */}
      <HeroSection />

      {/* ─────────── About — Split ─────────── */}
      <section className={styles.section} id="about">
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={styles.splitText}>
              <p className={`${styles.sectionLabel} ${styles.reveal}`}>About</p>
              <h2 className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay1}`}>
                서비스가 어떻게<br />동작해야 하는지,<br />
                처음부터 끝까지 직접 생각합니다.
              </h2>
              <p className={`${styles.sectionDesc} ${styles.reveal} ${styles.delay2}`}>
                프론트부터 백엔드, DB 설계, 서버 관리까지 직접 담당합니다.{" "}
                <strong style={{ color: "#212124" }}>디자인 감각</strong>으로 화면 방향을 잡고,
                클라이언트 요구사항을 <strong style={{ color: "#212124" }}>기능 명세로 구체화</strong>하는 것까지 혼자 가능합니다.
              </p>
              <div className={`${styles.stepFlow} ${styles.reveal} ${styles.delay3}`} style={{ marginTop: "1.75rem" }}>
                {["기획 이해", "설계", "구현", "배포"].map((step, i, arr) => (
                  <span key={step} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className={styles.stepBadge}>{step}</span>
                    {i < arr.length - 1 && <span className={styles.stepArrow}>→</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${styles.splitVisual} ${styles.reveal} ${styles.delay2}`}>
              <div className={styles.splitVisualInner} style={{ padding: "2rem", background: "linear-gradient(135deg, #f7f8fa 0%, #fff3ea 100%)" }}>
                <CodeBlock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Stats ─────────── */}
      <section className={styles.sectionAccent}>
        <div className={styles.container}>
          <div className={`${styles.statGrid} ${styles.reveal}`}>
            {[
              { value: "3+", label: "년간 풀스택 개발 경력" },
              { value: "20+", label: "실운영 프로젝트 경험" },
              { value: "100%", label: "기획부터 배포 단독 진행" },
              { value: "Full", label: "Stack Coverage" },
            ].map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Strength Cards ─────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={`${styles.sectionLabel} ${styles.reveal}`}>Impact</p>
          <h2 className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay1}`} style={{ marginBottom: "3rem" }}>
            상담부터 실행, 성과까지 연결합니다
          </h2>
          <div className={`${styles.cardGrid}`}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`${styles.featureCard} ${styles.reveal}`}
                style={{ transitionDelay: `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className={styles.featureCardIcon}>{f.icon}</div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <ul className={styles.pointList}>
                  {f.points.map((pt) => (
                    <li key={pt} className={styles.pointItem}>
                      <span className={styles.pointDot} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Tech Stack — Split (reverse) ─────────── */}
      <section className={styles.sectionAccent}>
        <div className={styles.container}>
          <div className={`${styles.split} ${styles.splitReverse}`}>
            <div className={`${styles.splitVisual} ${styles.reveal}`}>
              <div className={styles.splitVisualInner} style={{ padding: "2.5rem", background: "#fff" }}>
                <SkillChart />
              </div>
            </div>
            <div className={styles.splitText}>
              <p className={`${styles.sectionLabel} ${styles.reveal}`}>Tech</p>
              <h2 className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay1}`}>
                주요 기술 스택
              </h2>
              <p className={`${styles.sectionDesc} ${styles.reveal} ${styles.delay2}`} style={{ marginBottom: "1.5rem" }}>
                프론트엔드부터 서버, 데이터베이스, 클라우드까지 직접 다룹니다.
              </p>
              <ul className={`${styles.pointList} ${styles.reveal} ${styles.delay3}`}>
                {techStack.map((tech) => (
                  <li key={tech} className={styles.pointItem}>
                    <span className={styles.pointDot} />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Skills ─────────── */}
      <section className={styles.section} id="skills">
        <div className={styles.container}>
          <p className={`${styles.sectionLabel} ${styles.reveal}`}>Skills</p>
          <h2 className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay1}`} style={{ marginBottom: "3rem" }}>
            다룰 수 있는 기술 전체
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {skillGroups.map((g, i) => (
              <div
                key={g.category}
                className={`${styles.skillCard} ${styles.reveal}`}
                style={{ transitionDelay: `${i * 0.12}s` } as React.CSSProperties}
              >
                <p className={styles.skillCardCategory}>{g.label}</p>
                <h3 className={styles.skillCardTitle}>{g.category}</h3>
                <div className={styles.skillTags}>
                  {g.items.map((item) => (
                    <span key={item} className={styles.skillTag}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA Banner ─────────── */}
      <section className={styles.ctaBanner} id="contact">
        <div className={styles.container}>
          <h2 className={`${styles.ctaBannerTitle} ${styles.reveal}`}>함께 만들어요</h2>
          <p className={`${styles.ctaBannerDesc} ${styles.reveal} ${styles.delay1}`}>
            협업 제안이나 채용 문의는 편하게 연락 주세요.
          </p>
          <div className={`${styles.reveal} ${styles.delay2}`} style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="mailto:hyebinkimdesign@gmail.com" className={styles.ctaBannerBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              이메일 보내기
            </a>
            <a
              href="https://github.com/hyebinkimsdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBannerBtnGhost}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── Footer ─────────── */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <span className={styles.footerLogo}>Hyebin</span>
          <ul className={styles.footerLinks}>
            <li><a href="#about" className={styles.footerLink}>About</a></li>
            <li><a href="#skills" className={styles.footerLink}>Skills</a></li>
            <li><a href="#contact" className={styles.footerLink}>Contact</a></li>
          </ul>
          <span className={styles.footerCopy}>© 2026 Hyebin · Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
