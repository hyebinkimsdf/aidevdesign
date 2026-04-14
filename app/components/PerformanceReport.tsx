"use client";

import { startTransition, useDeferredValue, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import translations from "../i18n/translations";

type ItemText = {
  title: string;
  summary: string;
  cause: string;
  note?: string;
  metrics: { label: string; before: string; after: string }[];
};

type Domain = "프론트엔드" | "백엔드";

type Item = {
  id: string;
  domain: Domain;
  category: string; // English key used for color map
  tags: string[];
  ko: ItemText;
  en: ItemText;
  beforeCode?: string;
  afterCode?: string;
};

const items: Item[] = [
  {
    id: "ssg",
    domain: "프론트엔드",
    category: "Rendering",
    tags: ["Next.js", "App Router"],
    ko: {
      title: "SSR → SSG 전환",
      summary: "매 요청마다 서버 렌더링 → 빌드 시 HTML 사전 생성으로 CDN 캐시 서빙",
      cause: "포트폴리오는 콘텐츠가 정적이어서 SSR의 이점이 없음에도 요청마다 서버가 HTML을 새로 생성하고 있었습니다.",
      metrics: [
        { label: "TTFB", before: "서버 응답 의존", after: "CDN 캐시" },
        { label: "단축률", before: "—", after: "60–80%" },
      ],
    },
    en: {
      title: "SSR → SSG Migration",
      summary: "Server-side render per request → pre-generated HTML served via CDN cache",
      cause: "The portfolio serves static content, so SSR provided no benefit — yet the server was re-generating HTML on every request.",
      metrics: [
        { label: "TTFB", before: "server-dependent", after: "CDN cached" },
        { label: "Reduction", before: "—", after: "60–80%" },
      ],
    },
    beforeCode: `// 기본 SSR — 설정 없음`,
    afterCode: `export const dynamic = "force-static";`,
  },
  {
    id: "lcp-animation",
    domain: "프론트엔드",
    category: "LCP",
    tags: ["Next.js", "React", "Tailwind CSS"],
    ko: {
      title: "Hero 제목 opacity 애니메이션",
      summary: "h1이 opacity:0 에서 시작해 브라우저가 LCP 측정을 지연",
      cause: "animate-fade-in-up은 opacity:0 에서 시작하고 delay-100은 120ms 딜레이를 추가합니다. 브라우저는 opacity가 0인 동안 해당 요소를 LCP 후보로 인식하지 않아 측정이 2.7s 이후로 밀렸습니다.",
      metrics: [
        { label: "LCP", before: "3.5s", after: "~2.5s" },
        { label: "단축", before: "—", after: "최대 1.0s" },
      ],
      note: "FCP 1.9s + delay 120ms + 애니메이션 650ms = 기준점 2.7s 이후",
    },
    en: {
      title: "Hero Heading opacity Animation",
      summary: "h1 starting at opacity:0 delays browser LCP measurement",
      cause: "animate-fade-in-up starts at opacity:0 and delay-100 adds 120ms. The browser doesn't recognise the element as an LCP candidate while opacity is 0, pushing measurement past 2.7s.",
      metrics: [
        { label: "LCP", before: "3.5s", after: "~2.5s" },
        { label: "Reduction", before: "—", after: "up to 1.0s" },
      ],
      note: "FCP 1.9s + delay 120ms + animation 650ms = baseline 2.7s",
    },
    beforeCode: `<h1 className="animate-fade-in-up delay-100">Hyebin</h1>`,
    afterCode: `<h1 className="text-foreground">
  <span className="animate-fade-in-up delay-100 inline-block">Hyebin</span>
</h1>`,
  },
  {
    id: "lcp-image",
    domain: "프론트엔드",
    category: "LCP / FCP",
    tags: ["Next.js", "next/image"],
    ko: {
      title: "프로젝트 이미지 최적화",
      summary: "unoptimized 옵션 제거로 WebP 자동 변환 및 크기 최적화 활성화",
      cause: "프로젝트 썸네일에 unoptimized prop이 설정되어 있어 Next.js의 WebP 변환, 크기 조정, 캐시 헤더가 전혀 동작하지 않았습니다.",
      metrics: [
        { label: "이미지 전송량", before: "JPG 원본", after: "WebP 변환" },
        { label: "감소율", before: "—", after: "40–70%" },
      ],
    },
    en: {
      title: "Project Image Optimisation",
      summary: "Removed unoptimized flag — enabling WebP auto-conversion and size optimisation",
      cause: "The unoptimized prop was set on project thumbnails, completely disabling Next.js WebP conversion, resizing, and cache headers.",
      metrics: [
        { label: "Image size", before: "JPG original", after: "WebP converted" },
        { label: "Reduction", before: "—", after: "40–70%" },
      ],
    },
    beforeCode: `<Image src={...} fill unoptimized sizes="..." />`,
    afterCode: `<Image src={...} fill sizes="(max-width: 640px) 100vw, 50vw" />`,
  },
  {
    id: "inp-filter",
    domain: "프론트엔드",
    category: "INP",
    tags: ["Next.js", "React"],
    ko: {
      title: "검색 / 필터 응답성 개선",
      summary: "키 입력마다 즉시 필터링 → React가 여유 시간에 처리",
      cause: "검색어를 입력할 때마다 즉시 필터링 연산이 실행되어 메인 스레드를 블로킹했습니다.",
      metrics: [
        { label: "처리 방식", before: "동기 즉시 실행", after: "startTransition" },
        { label: "체감", before: "타이핑 끊김", after: "즉각 반응" },
      ],
    },
    en: {
      title: "Search / Filter Responsiveness",
      summary: "Synchronous filtering on every keystroke → deferred to React idle time",
      cause: "Filtering ran synchronously on every keystroke, blocking the main thread.",
      metrics: [
        { label: "Processing", before: "Sync immediate", after: "startTransition" },
        { label: "Feel", before: "Typing lag", after: "Instant response" },
      ],
    },
    beforeCode: `setQuery(value);`,
    afterCode: `startTransition(() => setQuery(value));
const deferred = useDeferredValue(query);`,
  },
  {
    id: "inp-scroll",
    domain: "프론트엔드",
    category: "INP",
    tags: ["Next.js", "React"],
    ko: {
      title: "스크롤 리렌더링 최소화",
      summary: "스크롤 이벤트마다 setState → 결과가 바뀔 때만 업데이트",
      cause: "스크롤할 때마다 Nav 컴포넌트가 React 상태를 업데이트해 불필요한 리렌더링이 반복됐습니다.",
      metrics: [
        { label: "setState 빈도", before: "이벤트마다", after: "변화 시에만" },
        { label: "리렌더", before: "매우 빈번", after: "필요한 경우만" },
      ],
    },
    en: {
      title: "Scroll Re-render Reduction",
      summary: "setState on every scroll event → update only when value changes",
      cause: "Every scroll event triggered a React state update in the Nav component, causing unnecessary re-renders.",
      metrics: [
        { label: "setState freq.", before: "every event", after: "on change only" },
        { label: "Re-renders", before: "very frequent", after: "only when needed" },
      ],
    },
    beforeCode: `window.addEventListener("scroll", () => setScrolled(true));`,
    afterCode: `window.addEventListener("scroll", () => {
  const next = window.scrollY > 10;
  if (next !== scrolled) setScrolled(next);
});`,
  },
  {
    id: "gtm",
    domain: "프론트엔드",
    category: "INP",
    tags: ["Next.js", "next/script"],
    ko: {
      title: "GTM / Analytics 로딩 지연",
      summary: "초기 로드 시 스크립트 실행 → 페이지 완전 로드 후 실행",
      cause: "GTM 스크립트가 페이지 초기 로딩 시 실행되어 첫 상호작용 응답 속도에 영향을 줬습니다.",
      metrics: [
        { label: "로딩 전략", before: "afterInteractive", after: "lazyOnload" },
        { label: "초기 INP 영향", before: "메인 스레드 경합", after: "경합 없음" },
      ],
    },
    en: {
      title: "GTM / Analytics Load Deferral",
      summary: "Scripts running on initial load → deferred until after full page load",
      cause: "GTM scripts were executing during initial page load, impacting first interaction response time.",
      metrics: [
        { label: "Load strategy", before: "afterInteractive", after: "lazyOnload" },
        { label: "Initial INP impact", before: "main thread contention", after: "no contention" },
      ],
    },
    beforeCode: `<Script strategy="afterInteractive" src="gtm.js" />`,
    afterCode: `<Script strategy="lazyOnload" src="gtm.js" />`,
  },
  {
    id: "a11y",
    domain: "프론트엔드",
    category: "Accessibility",
    tags: ["Next.js", "Tailwind CSS"],
    ko: {
      title: "색상 대비 WCAG AA 통과",
      summary: "--muted 값 상향으로 텍스트 대비율 기준 충족",
      cause: "어두운 배경(#0c0c0c)에 회색 텍스트(#6b7280)를 사용하고, 투명도까지 낮춰 기준치 미달이었습니다.",
      metrics: [
        { label: "text-muted 대비율", before: "~4.8:1", after: "~5.8:1" },
        { label: "text-muted/80", before: "~3.8:1 ✗", after: "~4.6:1 ✓" },
        { label: "기준", before: "불합격", after: "WCAG AA 통과" },
      ],
    },
    en: {
      title: "Colour Contrast WCAG AA Pass",
      summary: "Raised --muted value to meet text contrast ratio requirements",
      cause: "Dark background (#0c0c0c) with grey text (#6b7280), further reduced with opacity, fell below the required contrast threshold.",
      metrics: [
        { label: "text-muted contrast", before: "~4.8:1", after: "~5.8:1" },
        { label: "text-muted/80", before: "~3.8:1 ✗", after: "~4.6:1 ✓" },
        { label: "Standard", before: "Fail", after: "WCAG AA Pass" },
      ],
    },
    beforeCode: `--muted: #6b7280;   /* gray-500, 대비율 부족 */`,
    afterCode: `--muted: #9ca3af;   /* gray-400, ~5.8:1 → AA 통과 */`,
  },
];

// category color — English keys
const categoryColor: Record<string, string> = {
  Rendering: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  LCP: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "LCP / FCP": "text-violet-400 bg-violet-400/10 border-violet-400/20",
  INP: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Accessibility: "text-accent bg-accent/10 border-accent/20",
};

const techColor: Record<string, string> = {
  "Next.js": "text-foreground/80 bg-surface border-border",
  "App Router": "text-foreground/80 bg-surface border-border",
  React: "text-sky-300 bg-sky-300/10 border-sky-300/20",
  "Tailwind CSS": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "next/image": "text-foreground/80 bg-surface border-border",
  "next/script": "text-foreground/80 bg-surface border-border",
};

const ALL_TAGS = Array.from(new Set(items.flatMap((i) => i.tags)));

type PerformanceT = (typeof translations)["ko"]["performance"];

function Modal({
  item,
  onClose,
  lang,
  t,
}: {
  item: Item;
  onClose: () => void;
  lang: "ko" | "en";
  t: PerformanceT;
}) {
  const text = item[lang];
  const categoryLabel = t.categoryMap[item.category] ?? item.category;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted hover:text-foreground transition-colors"
          aria-label={t.closeLabel}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-wrap gap-1.5">
          <span className={`inline-block rounded border px-2 py-0.5 font-mono text-xs ${categoryColor[item.category] ?? "text-muted bg-surface border-border"}`}>
            {categoryLabel}
          </span>
          {item.tags.map((tag) => (
            <span key={tag} className={`inline-block rounded border px-2 py-0.5 font-mono text-xs ${techColor[tag] ?? "text-muted bg-surface border-border"}`}>
              {tag}
            </span>
          ))}
        </div>

        <h3 id="modal-title" className="mt-3 text-lg font-semibold text-foreground">
          {text.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{text.cause}</p>

        {text.note && (
          <p className="mt-3 rounded border border-border bg-background/60 px-3 py-2 font-mono text-xs text-muted">
            {text.note}
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {text.metrics.map((m) => (
            <div key={m.label} className="rounded border border-border bg-background/40 p-3">
              <p className="mb-1 font-mono text-xs text-muted">{m.label}</p>
              <p className="text-xs text-foreground/70 line-through">{m.before}</p>
              <p className="text-sm font-semibold text-foreground">{m.after}</p>
            </div>
          ))}
        </div>

        {(item.beforeCode || item.afterCode) && (
          <div className="mt-5 space-y-3">
            {item.beforeCode && (
              <div>
                <p className="mb-1 font-mono text-xs text-muted">{t.beforeLabel}</p>
                <pre className="overflow-x-auto rounded border border-border bg-background/60 px-3 py-2 font-mono text-xs text-foreground/70 whitespace-pre-wrap">
                  {item.beforeCode}
                </pre>
              </div>
            )}
            {item.afterCode && (
              <div>
                <p className="mb-1 font-mono text-xs text-accent">{t.afterLabel}</p>
                <pre className="overflow-x-auto rounded border border-accent/20 bg-accent/5 px-3 py-2 font-mono text-xs text-foreground whitespace-pre-wrap">
                  {item.afterCode}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PerformanceReport() {
  const PAGE_SIZE = 8;
  const { lang } = useLang();
  const t = translations[lang].performance;

  const [selected, setSelected] = useState<Item | null>(null);
  const [rawQuery, setRawQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const isComposing = useRef(false);

  const deferredQuery = useDeferredValue(rawQuery);

  const filtered = items.filter((item) => {
    const matchDomain = activeDomain === null || item.domain === activeDomain;
    const matchTag = activeTag === null || item.tags.includes(activeTag);
    const q = deferredQuery.trim().toLowerCase();
    const text = item[lang];
    const matchSearch =
      q === "" ||
      text.title.toLowerCase().includes(q) ||
      text.summary.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      (t.categoryMap[item.category] ?? item.category).toLowerCase().includes(q);
    return matchDomain && matchTag && matchSearch;
  });

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isComposing.current) {
      setRawQuery(value);
    } else {
      startTransition(() => { setRawQuery(value); setPage(1); });
    }
  }

  function handleCompositionStart() {
    isComposing.current = true;
  }

  function handleCompositionEnd(e: React.CompositionEvent<HTMLInputElement>) {
    isComposing.current = false;
    startTransition(() => { setRawQuery(e.currentTarget.value); setPage(1); });
  }

  function handleDomainClick(domain: Domain) {
    startTransition(() => { setActiveDomain((prev) => (prev === domain ? null : domain)); setPage(1); });
  }

  function handleTagClick(tag: string) {
    startTransition(() => { setActiveTag((prev) => (prev === tag ? null : tag)); setPage(1); });
  }

  return (
    <section
      id="performance"
      aria-labelledby="performance-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="performance-heading"
          className="mb-6 font-mono text-xs uppercase tracking-widest text-accent"
        >
          Performance
        </p>
        <h2 className="mb-3 text-2xl font-semibold text-foreground">
          {t.h2}
        </h2>
        <p className="mb-10 text-sm text-muted">
          {t.p}
        </p>

        {/* Summary bar */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {t.summary.map((s) => (
            <div key={s.label} className="rounded border border-border bg-surface/30 p-4 text-center">
              <p className="font-mono text-xs text-muted">{s.label}</p>
              <p className="mt-1 text-xs text-foreground/50 line-through">{s.before}</p>
              <p className="text-base font-semibold text-accent">{s.after}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={rawQuery}
            onChange={handleQueryChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={t.searchPlaceholder}
            className="w-full rounded border border-border bg-surface/30 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted/60 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 rounded border border-border bg-surface/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{t.filterLabel}</p>
            {(activeDomain !== null || activeTag !== null) && (
              <button
                onClick={() => startTransition(() => { setActiveDomain(null); setActiveTag(null); setPage(1); })}
                className="flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground transition-colors"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                {t.resetLabel}
              </button>
            )}
          </div>

          {/* Domain */}
          <div className="mb-4">
            <p className="mb-2 font-mono text-xs text-muted/60">{t.domainLabel}</p>
            <div className="flex flex-wrap gap-2">
              {(["프론트엔드", "백엔드"] as Domain[]).map((d) => (
                <button
                  key={d}
                  onClick={() => handleDomainClick(d)}
                  className={`rounded border px-3 py-1 text-xs transition-colors ${
                    activeDomain === d
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-border bg-background/40 text-muted hover:text-foreground"
                  }`}
                >
                  {t.domainMap[d]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 border-t border-border" />

          {/* Tech tags */}
          <div>
            <p className="mb-2 font-mono text-xs text-muted/60">{t.techLabel}</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => startTransition(() => { setActiveTag(null); setPage(1); })}
                className={`rounded border px-3 py-1 font-mono text-xs transition-colors ${
                  activeTag === null
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-border bg-background/40 text-muted hover:text-foreground"
                }`}
              >
                {t.allLabel}
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`rounded border px-3 py-1 font-mono text-xs transition-colors ${
                    activeTag === tag
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-border bg-background/40 text-muted hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        {(() => {
          const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
          const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

          return filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted">{t.noResults}</p>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {paged.map((item) => {
                  const text = item[lang];
                  const categoryLabel = t.categoryMap[item.category] ?? item.category;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className="group rounded border border-border bg-surface/30 p-5 text-left transition-colors hover:border-accent/40 hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                    >
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          <span className={`inline-block rounded border px-2 py-0.5 font-mono text-xs ${categoryColor[item.category] ?? "text-muted bg-surface border-border"}`}>
                            {categoryLabel}
                          </span>
                          {item.tags.map((tag) => (
                            <span key={tag} className={`inline-block rounded border px-2 py-0.5 font-mono text-xs ${techColor[tag] ?? "text-muted bg-surface border-border"}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="mt-0.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7M7 7h10v10" />
                        </svg>
                      </div>
                      <h3 className="mb-1.5 text-sm font-semibold text-foreground">
                        {text.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">{text.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {text.metrics.slice(0, 2).map((m) => (
                          <span key={m.label} className="rounded bg-background/60 px-2 py-1 font-mono text-xs text-foreground/70">
                            {m.label}: <span className="text-accent">{m.after}</span>
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                  <p className="font-mono text-xs text-muted">
                    {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}{t.paginationSuffix ? ` / ${filtered.length}${t.paginationSuffix}` : ` / ${filtered.length}`}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startTransition(() => setPage((p) => p - 1))}
                      disabled={page === 1}
                      aria-label={t.prevLabel}
                      className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        onClick={() => startTransition(() => setPage(n))}
                        aria-current={page === n ? "page" : undefined}
                        className={`flex h-8 w-8 items-center justify-center rounded border font-mono text-xs transition-colors ${
                          page === n
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-border text-muted hover:border-accent/40 hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}

                    <button
                      onClick={() => startTransition(() => setPage((p) => p + 1))}
                      disabled={page === totalPages}
                      aria-label={t.nextLabel}
                      className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {selected && (
        <Modal item={selected} onClose={() => setSelected(null)} lang={lang} t={t} />
      )}
    </section>
  );
}
