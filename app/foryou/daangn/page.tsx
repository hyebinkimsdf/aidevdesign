'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./daangn.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  navItems,
  stories,
  experts,
  stats,
  techStack,
  perfRecords,
  news,
  claudeWorkflow,
  about,
} from "./data";

const SLIDE_COUNT = 3;
const SLIDE_INTERVAL = 3000;

function StoryThumb({ thumb }: { thumb: string }) {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState<boolean[]>(Array(SLIDE_COUNT).fill(false));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => setCurrent((prev) => (prev + 1) % SLIDE_COUNT);

  useEffect(() => {
    timerRef.current = setInterval(advance, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className={styles.storyThumb}>
      {Array.from({ length: SLIDE_COUNT }, (_, i) => (
        <Image
          key={i}
          src={`/thumbs/${thumb}/${i + 1}.jpg`}
          alt={`${thumb} screenshot ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => setFailed((prev) => { const n = [...prev]; n[i] = true; return n; })}
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: current === i && !failed[i] ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      ))}
      {/* dot indicators */}
      <div className={styles.storyDots}>
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            aria-label={`슬라이드 ${i + 1}`}
            onClick={() => {
              setCurrent(i);
              if (timerRef.current) clearInterval(timerRef.current);
              timerRef.current = setInterval(advance, SLIDE_INTERVAL);
            }}
            className={`${styles.storyDot} ${current === i ? styles.storyDotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

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

function PerfAccordion({ records }: { records: typeof import('./data').perfRecords }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={styles.perfList}>
      {records.map((rec, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={rec.metric} className={`${styles.perfRow} ${isOpen ? styles.perfRowOpen : ''}`}>
            <button
              className={styles.perfRowBtn}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <span className={styles.perfMetric}>{rec.metric}</span>
              <span className={styles.perfLabel}>{rec.label}</span>
              <span className={styles.perfBefore}>{rec.before}</span>
              <span className={styles.perfArrow}>→</span>
              <span className={styles.perfAfter}>{rec.after}</span>
              <span className={`${styles.perfDelta} ${rec.delta.startsWith('▲') ? styles.perfDeltaUp : ''}`}>{rec.delta}</span>
              <span className={styles.perfHow}>{rec.how}</span>
              <span className={`${styles.perfChevron} ${isOpen ? styles.perfChevronOpen : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className={styles.perfDetail}>
                <div className={styles.perfDetailGrid}>
                  <div className={styles.perfDetailBlock}>
                    <p className={styles.perfDetailLabel}>문제</p>
                    <p className={styles.perfDetailText}>{rec.problem}</p>
                  </div>
                  <div className={styles.perfDetailBlock}>
                    <p className={styles.perfDetailLabel}>해결 방안</p>
                    <p className={styles.perfDetailText}>{rec.solution}</p>
                  </div>
                </div>
                <div className={styles.perfCodeGrid}>
                  <div className={styles.perfCodeBlock}>
                    <p className={styles.perfCodeLabel}>Before</p>
                    <pre className={styles.perfCode}><code>{rec.codeBefore}</code></pre>
                  </div>
                  <div className={styles.perfCodeBlock}>
                    <p className={`${styles.perfCodeLabel} ${styles.perfCodeLabelAfter}`}>After</p>
                    <pre className={`${styles.perfCode} ${styles.perfCodeAfter}`}><code>{rec.codeAfter}</code></pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const STRENGTH_ICONS = [ConsultIcon, BuildIcon, SeoIcon];
const CYCLE_MS = 2000;

export default function DaangnPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STRENGTH_ICONS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const overlayEyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const overlayTitleRef = useRef<HTMLHeadingElement | null>(null);
  const overlayBodyRef = useRef<HTMLParagraphElement | null>(null);
  const metricSectionRef = useRef<HTMLElement | null>(null);
  const metricHeadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: false,
        },
      });

      // 텍스트 페이드아웃
      tl.to(heroCopyRef.current, { opacity: 0, y: -24, ease: "none", duration: 0.35 }, 0);

      // 영상 풀스크린 확대
      tl.to(
        videoRef.current,
        { width: "100vw", height: "100vh", borderRadius: 0, ease: "none", duration: 0.8 },
        0
      );

      // 오버레이 eyebrow 등장
      tl.fromTo(
        overlayEyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
        0.5
      );

      // 오버레이 메인 타이틀 등장
      tl.fromTo(
        overlayTitleRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, ease: "none", duration: 0.35 },
        0.6
      );

      // 오버레이 바디 텍스트 등장
      tl.fromTo(
        overlayBodyRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
        0.78
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!metricSectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = metricSectionRef.current.querySelectorAll<HTMLElement>('[data-metric-value]');

    cards.forEach((card) => {
      const raw = card.dataset.metricValue ?? '';
      // 숫자 추출: "~28%" → 28, "40~70%" → 70, "6개+" → 6, "100%" → 100
      const numbers = raw.match(/\d+/g);
      if (!numbers) return;

      const target = parseInt(numbers[numbers.length - 1], 10);
      const prefix = raw.startsWith('~') ? '~' : '';
      const suffix = raw.replace(/[~\d]/g, '');

      const obj = { val: 0 };

      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metricHeadingRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate() {
            const display = numbers.length > 1
              ? `${raw.split('~')[0]}~${Math.round(obj.val)}${suffix}`
              : `${prefix}${Math.round(obj.val)}${suffix}`;
            card.textContent = display;
          },
        }
      );
    });

    // 카드 페이드+슬라이드업
    gsap.fromTo(
      metricSectionRef.current.querySelectorAll('[data-metric-card]'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: metricHeadingRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

return (

    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <a className={styles.logo} href="#top" aria-label="Hyebin 포트폴리오">
              <span className={styles.logoBadge}>HB</span>
            </a>
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              ))}
              <a href="mailto:hyebinkimdesign@gmail.com" className={styles.hireLink}>
                연락하기
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* 히어로 — 텍스트 + 영상 카드 통합 pin 섹션 */}
      <div ref={heroRef} className={styles.heroStage} id="top">
        {/* 좌상단 텍스트 — 스크롤 시 페이드아웃 */}
        <div ref={heroCopyRef} className={styles.heroCopy}>
          <p className={styles.heroEyebrow}> 풀스택 개발 · 디자인 · SEO · 데이터 분석을 하는</p>
          <h1 className={styles.heroHeadline}>
           
            웹 개발자 김혜빈입니다
          </h1>
          
        </div>

        {/* 영상 카드 — 확대되며 풀스크린 */}
        <div className={styles.heroVideoWrapper} ref={videoRef}>
          <video
            className={styles.heroVideo}
            src="/video/hero_dangn_2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* 확장 후 오버레이 텍스트 */}
          <div className={styles.heroVideoOverlay}>
            <p className={styles.overlayEyebrow} ref={overlayEyebrowRef}>
              디자인 · 개발 · SEO 컨설팅 경험으로            </p>
            <h2 className={styles.overlayTitle} ref={overlayTitleRef}>
                당근처럼 생활에 스며드는 경험을 만들고 싶습니다
            </h2>
            <p className={styles.overlayBody} ref={overlayBodyRef}>
             실서비스를 직접 만들며, LCP 28% 단축 · 이미지 최적화 40~70%를 달성했습니다.
            </p>
          </div>
        </div>
      </div>

      <section className={`${styles.section} ${styles.expertSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Core Strengths</p>
            <h2>상담부터 실행, 성과까지 연결합니다</h2>
          </div>

          {/* 프로필 카드 */}
          <div className={styles.aboutCard}>
            <div className={styles.aboutTop}>
              <div className={styles.aboutPhotoWrap}>
                <Image src={about.photo} alt={about.name} width={120} height={120} className={styles.aboutPhoto} />
              </div>
              <div className={styles.aboutInfo}>
                <p className={styles.aboutName}>{about.name} <span>{about.role}</span></p>
                <p className={styles.aboutIntro}>{about.intro}</p>
                <div className={styles.aboutTags}>
                  {about.tags.map((tag) => (
                    <span key={tag} className={styles.aboutTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 경력 타임라인 */}
            <div className={styles.aboutSection}>
              <p className={styles.aboutSectionLabel}>경력</p>
              <div className={styles.careerList}>
                {about.careers.map((c) => (
                  <div key={c.company} className={styles.careerItem}>
                    <div className={styles.careerHeader}>
                      <strong className={styles.careerCompany}>{c.company}</strong>
                      <span className={styles.careerPeriod}>{c.period}</span>
                    </div>
                    <p className={styles.careerRole}>{c.role}</p>
                    <ul className={styles.careerTasks}>
                      {c.tasks.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 학력 */}
            <div className={styles.aboutSection}>
              <p className={styles.aboutSectionLabel}>학력</p>
              <div className={styles.careerItem}>
                <div className={styles.careerHeader}>
                  <strong className={styles.careerCompany}>{about.education.school}</strong>
                  <span className={styles.careerPeriod}>{about.education.period}</span>
                </div>
                <p className={styles.careerRole}>{about.education.major} · GPA {about.education.gpa}</p>
              </div>
            </div>

            {/* 장단점 */}
            <div className={styles.aboutSwGrid}>
              <div className={styles.aboutSwCol}>
                <p className={styles.aboutSectionLabel}>이런 점이 강점이에요</p>
                {about.strengths.map((s) => (
                  <div key={s.title} className={styles.swItem}>
                    <span className={styles.swEmoji}>{s.emoji}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.aboutSwCol}>
                <p className={styles.aboutSectionLabel}>솔직히 이런 점은 부족해요</p>
                {about.weaknesses.map((w) => (
                  <div key={w.title} className={styles.swItem}>
                    <span className={styles.swEmoji}>{w.emoji}</span>
                    <div>
                      <strong>{w.title}</strong>
                      <p>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.strengthGrid}>
            {experts.map((expert, idx) => {
              const Icon = STRENGTH_ICONS[idx];
              const isActive = idx === activeIdx;
              return (
                <article
                  key={expert.title}
                  className={`${styles.strengthCard} ${isActive ? styles.strengthCardActive : styles.strengthCardInactive}`}
                >
                  <div className={styles.strengthIcon}>
                    <Icon />
                  </div>
                  <h3 className={styles.strengthTitle}>{expert.title}</h3>
                  <ul className={styles.strengthPoints}>
                    {expert.points.map((point) => (
                      <li key={point} className={styles.strengthPoint}>
                        <span className={styles.strengthDot} aria-hidden="true" />
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

      <section className={styles.section} id="stories">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Projects</p>
            <h2>실제 운영 중인 사이트를 직접 설계·개발했습니다</h2>
          </div>
          <div className={styles.storyGrid}>
            {stories.map((story) => (
              <article key={story.title} className={styles.storyCard}>
                <StoryThumb thumb={story.thumb} />
                <div className={styles.storyCardBody}>
                  <div className={styles.storyMeta}>
                    <span>{story.category}</span>
                    <span className={styles.storyContrib}>기여도 {story.contribution}</span>
                  </div>
                  <h3>{story.title}</h3>
                  <div className={styles.storyTools}>
                    {story.tools.map((t) => (
                      <span key={t} className={styles.storyTool}>{t}</span>
                    ))}
                  </div>
                  <p className='text-[10px] font-bold pt-2 w-full border-t  border-gray-200'>Highlights</p>
                  <ul className={styles.storyHighlights}>
                    {story.highlights.map((h) => (
                      <li key={h}>
                        <span className={styles.storyDotInline} aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a href={story.href} target="_blank" rel="noreferrer" className={styles.storyLink}>
                    자세히 보기 &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={metricSectionRef} className={`${styles.section} ${styles.metricsSection}`}>
        <div className={styles.container}>
          <div ref={metricHeadingRef} className={styles.sectionHeading}>
            <p className={styles.kicker}>실서비스 기준</p>
            <h2>직접 설계하고 배포한 서비스들</h2>
          </div>
          <div className={styles.metricGrid}>
            {stats.map((item) => (
              <article key={item.label} className={styles.metricCard} data-metric-card>
                <p>{item.label}</p>
                <strong data-metric-value={item.value}>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="news">
        <div className={styles.container}>
          <div className={styles.newsHeader}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>개선 기록을 확인해보세요!</p>
              <h2>개선 기록</h2>
            </div>
            <Link href="/foryou/daangn/improvements" className={styles.ghostButton}>
              전체 기록 보러가기
            </Link>
          </div>
          <div className={styles.newsGrid}>
            {news.map((item) => (
              <a key={item.title} href={item.href} className={styles.newsCard}>
                <div className={styles.newsThumb}>
                  <Image src={item.image} alt={item.title} width={600} height={338} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.newsMeta}>
                  <strong>{item.title}</strong>
                  <span>{item.date}</span>
                </div>
              </a>
            ))}
          </div>
          <div className='mt-20'>
  <PerfAccordion records={perfRecords} />
          </div>

        </div>
      </section>

      <section className={`${styles.section} ${styles.metricsSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <h2>사용하는 기술 스택</h2>
          </div>
          <div className={styles.investorGrid}>
            {techStack.map((tech) => (
              <div key={tech.name} className={styles.investorCard}>
                <Image src={tech.image} alt={tech.name} width={160} height={28} unoptimized />
                <div className={styles.techInfo}>
                  <strong>{tech.name}</strong>
                  <span>{tech.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claude AI 활용 섹션 */}
      <section className={`${styles.section} ${styles.claudeSection}`} id="claude">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>AI-Driven Workflow</p>
            <h2>Claude AI로 개발 효율화</h2>
          </div>
          <p className={styles.claudeSummary}>{claudeWorkflow.summary}</p>

          <div className={styles.claudeSteps}>
            {claudeWorkflow.steps.map((s) => (
              <div key={s.step} className={styles.claudeStep}>
                <div className={styles.claudeStepHeader}>
                  <span className={styles.claudeStepNum}>{s.step}</span>
                  <h3 className={styles.claudeStepTitle}>{s.title}</h3>
                </div>
                <p className={styles.claudeStepDesc}>{s.desc}</p>
                <div className={styles.claudeStepTags}>
                  {s.tags.map((tag) => (
                    <span key={tag} className={styles.claudeTag}>{tag}</span>
                  ))}
                </div>
                <pre className={styles.claudeCode}><code>{s.code}</code></pre>
              </div>
            ))}
          </div>

          <div className={styles.claudeGains}>
            {claudeWorkflow.gains.map((g) => (
              <div key={g.label} className={styles.claudeGainCard}>
                <strong className={styles.claudeGainValue}>{g.value}</strong>
                <p className={styles.claudeGainLabel}>{g.label}</p>
                <span className={styles.claudeGainNote}>{g.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.container}>
          <div className={styles.contactInner}>
            <p className={styles.contactLabel}>Contact</p>
            <h2 className={styles.contactHeading}>함께 만들고 싶은 게 있다면<br />언제든 연락 주세요</h2>
            <div className={styles.contactLinks}>
              <a href="mailto:hyebinkimdesign@gmail.com" className={styles.contactEmail}>hyebinkimdesign@gmail.com</a>
              <a href="https://github.com/hyebinkimsdf" target="_blank" rel="noreferrer" className={styles.contactGithub}>GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerLeft}>
              <p className={styles.footerName}>Hyebin Kim</p>
              <p className={styles.footerBio}>기획부터 개발, 성능 개선과 배포까지<br />직접 만드는 프론트엔드·풀스택 개발자입니다.</p>
              <p className={styles.footerCopy}>© 2026 Hyebin Kim</p>
            </div>
            <nav className={styles.footerNav}>
              <div className={styles.footerNavCol}>
                <p className={styles.footerNavLabel}>페이지</p>
                <Link href="/">포트폴리오 메인</Link>
                <a href="#stories">프로젝트 보기</a>
                <a href="/foryou/daangn/improvements">개선 기록</a>
              </div>
              <div className={styles.footerNavCol}>
                <p className={styles.footerNavLabel}>연락</p>
                <a href="mailto:hyebinkimdesign@gmail.com">이메일</a>
                <a href="https://github.com/hyebinkimsdf" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  )
}
