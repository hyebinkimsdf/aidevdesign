import React from "react";

type StrengthItem = {
  title: string;
  summary: string;
  points: string[];
  icon: () => React.ReactElement;
};

function ConsultIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v7c0 1.38-1.12 2.5-2.5 2.5H10l-4.5 4v-4H6.5C5.12 16 4 14.88 4 13.5z" />
      <path d="M8 9h8" />
      <path d="M8 12h5" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="9" height="9" rx="2" />
      <rect x="11" y="10" width="9" height="9" rx="2" />
      <path d="M8 18h4" />
    </svg>
  );
}

function SeoIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
      <path d="M8 12.5 10.2 10l1.8 1.6L14 9" />
    </svg>
  );
}

const strengths: StrengthItem[] = [
  {
    title: "클라이언트 상담 및 요구사항 정리",
    summary:
      "초기 상담에서 비즈니스 목표와 사용자 문제를 정리하고, 실행 가능한 화면/기능 범위로 빠르게 구체화합니다.",
    points: [
      "요구사항 인터뷰 및 우선순위 정의",
      "기획 의도와 개발 난이도 간 균형 조율",
      "협업 커뮤니케이션 문서화",
    ],
    icon: ConsultIcon,
  },
  {
    title: "개발 + 디자인 통합 진행",
    summary:
      "디자인 시안부터 구현, QA까지 한 흐름으로 진행해 의도와 결과의 간극을 줄이고 일정 리스크를 낮춥니다.",
    points: [
      "UI/UX 설계와 프론트엔드 구현 동시 리드",
      "컴포넌트 단위 재사용 구조 설계",
      "반응형/접근성 기준을 고려한 완성도 관리",
    ],
    icon: BuildIcon,
  },
  {
    title: "광고 시스템 세팅과 SEO 이해",
    summary:
      "광고 추적 환경과 검색 최적화를 함께 고려해 유입부터 전환까지 측정 가능한 구조를 만드는 데 강점이 있습니다.",
    points: [
      "GA4, Meta Pixel, Google Ads 전환 추적 세팅 경험",
      "메타데이터, 구조화, 성능 지표 기반 SEO 개선",
      "Lighthouse·Search Console 지표 해석 및 개선 방향 도출",
    ],
    icon: SeoIcon,
  },
];

export default function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="section-divider px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="impact-heading"
          className="mb-6 font-mono text-xs uppercase tracking-widest text-accent"
        >
          Business Impact
        </p>

        <h2 className="mb-3 text-2xl font-semibold text-foreground">
          상담부터 실행, 성과까지 연결합니다
        </h2>
        <p className="mb-12 max-w-2xl text-sm leading-7 text-muted">
          단순 구현을 넘어, 클라이언트 커뮤니케이션과 성과 지표를 함께 보는
          방식으로 프로젝트를 진행합니다.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {strengths.map((item) => (
            <article
              key={item.title}
              className="rounded border border-border bg-surface/30 p-5"
            >
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-accent/90">
                <item.icon />
              </div>
              <h3 className="mb-3 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mb-4 text-sm leading-6 text-muted">{item.summary}</p>
              <ul className="space-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
