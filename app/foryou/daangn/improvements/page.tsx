import Link from "next/link";
import styles from "./improvements.module.css";

type Metric = { label: string; before: string; after: string };

type Item = {
  id: string;
  category: string;
  tags: string[];
  title: string;
  summary: string;
  cause: string;
  metrics: Metric[];
  beforeCode?: string;
  afterCode?: string;
};

const items: Item[] = [
  {
    id: "ssg",
    category: "Rendering",
    tags: ["Next.js", "App Router"],
    title: "SSR → SSG 전환",
    summary: "매 요청마다 서버 렌더링 → 빌드 시 HTML 사전 생성으로 CDN 캐시 서빙",
    cause: "포트폴리오는 콘텐츠가 정적이어서 SSR의 이점이 없음에도 요청마다 서버가 HTML을 새로 생성하고 있었습니다.",
    metrics: [
      { label: "TTFB", before: "서버 응답 의존", after: "CDN 캐시" },
      { label: "단축률", before: "—", after: "60–80%" },
    ],
    beforeCode: `// 기본 SSR — 설정 없음`,
    afterCode: `export const dynamic = "force-static";`,
  },
  {
    id: "lcp-animation",
    category: "LCP",
    tags: ["Next.js", "React", "Tailwind CSS"],
    title: "Hero 제목 opacity 애니메이션 제거",
    summary: "h1이 opacity:0 에서 시작해 브라우저가 LCP 측정을 지연",
    cause: "animate-fade-in-up은 opacity:0 에서 시작하고 delay-100은 120ms 딜레이를 추가합니다. 브라우저는 opacity가 0인 동안 해당 요소를 LCP 후보로 인식하지 않아 측정이 2.7s 이후로 밀렸습니다.",
    metrics: [
      { label: "LCP", before: "3.5s", after: "~2.5s" },
      { label: "단축", before: "—", after: "최대 1.0s" },
    ],
    beforeCode: `<h1 className="animate-fade-in-up delay-100">Hyebin</h1>`,
    afterCode: `<h1 className="text-foreground">
  <span className="animate-fade-in-up delay-100 inline-block">Hyebin</span>
</h1>`,
  },
  {
    id: "lcp-image",
    category: "LCP / FCP",
    tags: ["Next.js", "next/image"],
    title: "프로젝트 이미지 최적화",
    summary: "unoptimized 옵션 제거로 WebP 자동 변환 및 크기 최적화 활성화",
    cause: "프로젝트 썸네일에 unoptimized prop이 설정되어 있어 Next.js의 WebP 변환, 크기 조정, 캐시 헤더가 전혀 동작하지 않았습니다.",
    metrics: [
      { label: "이미지 전송량", before: "JPG 원본", after: "WebP 변환" },
      { label: "감소율", before: "—", after: "40–70%" },
    ],
    beforeCode: `<Image src={...} fill unoptimized sizes="..." />`,
    afterCode: `<Image src={...} fill sizes="(max-width: 640px) 100vw, 50vw" />`,
  },
  {
    id: "inp-filter",
    category: "INP",
    tags: ["Next.js", "React"],
    title: "검색 / 필터 응답성 개선",
    summary: "키 입력마다 즉시 필터링 → React가 여유 시간에 처리",
    cause: "검색어를 입력할 때마다 즉시 필터링 연산이 실행되어 메인 스레드를 블로킹했습니다.",
    metrics: [
      { label: "처리 방식", before: "동기 즉시 실행", after: "startTransition" },
      { label: "체감", before: "타이핑 끊김", after: "즉각 반응" },
    ],
    beforeCode: `setQuery(value);`,
    afterCode: `startTransition(() => setQuery(value));
const deferred = useDeferredValue(query);`,
  },
  {
    id: "inp-scroll",
    category: "INP",
    tags: ["Next.js", "React"],
    title: "스크롤 리렌더링 최소화",
    summary: "스크롤 이벤트마다 setState → 결과가 바뀔 때만 업데이트",
    cause: "스크롤할 때마다 Nav 컴포넌트가 React 상태를 업데이트해 불필요한 리렌더링이 반복됐습니다.",
    metrics: [
      { label: "setState 빈도", before: "이벤트마다", after: "변화 시에만" },
      { label: "리렌더", before: "매우 빈번", after: "필요한 경우만" },
    ],
    beforeCode: `window.addEventListener("scroll", () => setScrolled(true));`,
    afterCode: `window.addEventListener("scroll", () => {
  const next = window.scrollY > 10;
  if (next !== scrolled) setScrolled(next);
});`,
  },
  {
    id: "gtm",
    category: "INP",
    tags: ["Next.js", "next/script"],
    title: "GTM / Analytics 로딩 지연",
    summary: "초기 로드 시 스크립트 실행 → 페이지 완전 로드 후 실행",
    cause: "GTM 스크립트가 페이지 초기 로딩 시 실행되어 첫 상호작용 응답 속도에 영향을 줬습니다.",
    metrics: [
      { label: "로딩 전략", before: "afterInteractive", after: "lazyOnload" },
      { label: "초기 INP 영향", before: "메인 스레드 경합", after: "경합 없음" },
    ],
    beforeCode: `<Script strategy="afterInteractive" src="gtm.js" />`,
    afterCode: `<Script strategy="lazyOnload" src="gtm.js" />`,
  },
  {
    id: "a11y",
    category: "Accessibility",
    tags: ["Next.js", "Tailwind CSS"],
    title: "색상 대비 WCAG AA 통과",
    summary: "--muted 값 상향으로 텍스트 대비율 기준 충족",
    cause: "어두운 배경(#0c0c0c)에 회색 텍스트(#6b7280)를 사용하고, 투명도까지 낮춰 기준치 미달이었습니다.",
    metrics: [
      { label: "text-muted 대비율", before: "~4.8:1", after: "~5.8:1" },
      { label: "text-muted/80", before: "~3.8:1 ✗", after: "~4.6:1 ✓" },
      { label: "기준", before: "불합격", after: "WCAG AA 통과" },
    ],
    beforeCode: `--muted: #6b7280;   /* gray-500, 대비율 부족 */`,
    afterCode: `--muted: #9ca3af;   /* gray-400, ~5.8:1 → AA 통과 */`,
  },
];

const categoryMeta: Record<string, { label: string; color: string; bg: string; border: string }> = {
  Rendering:     { label: "렌더링",    color: "#38bdf8", bg: "rgba(56,189,248,0.08)",  border: "rgba(56,189,248,0.22)" },
  LCP:           { label: "LCP",       color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.22)" },
  "LCP / FCP":   { label: "LCP/FCP",  color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.22)" },
  INP:           { label: "INP",       color: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.22)" },
  Accessibility: { label: "접근성",   color: "#ff6f0f", bg: "rgba(255,111,15,0.08)",  border: "rgba(255,111,15,0.22)" },
};

export default function ImprovementsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <Link href="/foryou/daangn" className={styles.backLink}>
              ← 포트폴리오로 돌아가기
            </Link>
            <span className={styles.headerTitle}>개선 기록</span>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>Lighthouse 측정 기반</p>
          <h1 className={styles.heroTitle}>성능 최적화 작업 기록</h1>
          <p className={styles.heroDesc}>
            LCP · INP · 접근성 문제를 진단하고 개선한 실제 작업 기록입니다.
          </p>
          <div className={styles.summaryRow}>
            {[
              { label: "LCP", before: "3.5s", after: "~2.5s" },
              { label: "TTFB", before: "서버", after: "60–80% ↓" },
              { label: "이미지", before: "JPG", after: "40–70% ↓" },
              { label: "접근성", before: "미달", after: "AA 통과" },
            ].map((s) => (
              <div key={s.label} className={styles.summaryCard}>
                <span className={styles.summaryLabel}>{s.label}</span>
                <span className={styles.summaryBefore}>{s.before}</span>
                <span className={styles.summaryArrow}>→</span>
                <span className={styles.summaryAfter}>{s.after}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.list}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {items.map((item) => {
              const meta = categoryMeta[item.category] ?? { label: item.category, color: "#868b94", bg: "rgba(134,139,148,0.08)", border: "rgba(134,139,148,0.22)" };
              return (
                <article key={item.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span
                      className={styles.categoryBadge}
                      style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}
                    >
                      {meta.label}
                    </span>
                    <div className={styles.tags}>
                      {item.tags.map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  <p className={styles.cardSummary}>{item.summary}</p>
                  <p className={styles.cardCause}>{item.cause}</p>

                  <div className={styles.metrics}>
                    <div className={styles.metricsHeader}>
                      <span>항목</span>
                      <span>변경 전</span>
                      <span>변경 후</span>
                    </div>
                    {item.metrics.map((m) => (
                      <div key={m.label} className={styles.metricRow}>
                        <span className={styles.metricLabel}>{m.label}</span>
                        <span className={styles.metricBefore}>{m.before}</span>
                        <span className={styles.metricAfter}>{m.after}</span>
                      </div>
                    ))}
                  </div>

                  {item.beforeCode && item.afterCode && (
                    <div className={styles.codeBlock}>
                      <div className={styles.codeSide}>
                        <span className={styles.codeLabel}>변경 전</span>
                        <pre className={styles.pre}><code>{item.beforeCode}</code></pre>
                      </div>
                      <div className={styles.codeSide}>
                        <span className={`${styles.codeLabel} ${styles.codeLabelAfter}`}>변경 후</span>
                        <pre className={`${styles.pre} ${styles.preAfter}`}><code>{item.afterCode}</code></pre>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <Link href="/foryou/daangn" className={styles.backLink}>
            ← 포트폴리오로 돌아가기
          </Link>
          <span className={styles.footerCopy}>© Hyebin Kim</span>
        </div>
      </footer>
    </main>
  );
}
