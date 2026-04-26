export const navItems = [
  { label: "소개", href: "#about" },
  { label: "프로젝트", href: "#stories" },
  { label: "역량", href: "#skills" },
];


export const stories = [
  {
    category: "Academy",
    title: "위드빌댄스스튜디오",
    contribution: "100%",
    tools: ["Next.js", "Supabase", "Vercel"],
    highlights: [
      "클래스 소개·상담 CTA를 한 페이지 흐름으로 구성",
      "모바일 문의 접근성 최적화",
      "Supabase 문의 DB 연동 및 관리자 실시간 조회 구현",
    ],
    cta: "사이트 보러가기",
    href: "https://www.withbilldanceacademy.com",
    thumb: "withbill",
  },
  {
    category: "Corporate",
    title: "평원산업",
    contribution: "100%",
    tools: ["Next.js", "Supabase", "Vercel"],
    highlights: [
      "제품·공법·시공 사례 정보 구조 재설계",
      "Supabase Storage 연동 파일 관리 및 동적 다운로드 처리",
      "EBook PDF 최적화 및 웹 뷰어 구현",
    ],
    cta: "사이트 보러가기",
    href: "https://www.pwin.co.kr",
    thumb: "pwin",
  },
  {
    category: "Commerce",
    title: "LG Best Shop 용산전자상가점",
    contribution: "100%",
    tools: ["Next.js", "Vercel"],
    highlights: [
      "간편 상담 예약 폼 중심 전환 설계",
      "전화·방문 정보 원스톱 제공",
      "Server Action 기반 예약 폼 처리 및 이메일 알림 자동화",
    ],
    cta: "사이트 보러가기",
    href: "https://www.lgshop-ys.com",
    thumb: "lgshop",
  },
  {
    category: "Platform",
    title: "마이크임팩트",
    contribution: "100%",
    tools: ["Next.js", "Supabase", "Vercel"],
    highlights: [
      "키워드·분야·섭외비 기준 탐색 구조",
      "탐색 → 문의 CTA 직결 동선",
      "Supabase 다중 필터 쿼리 최적화 및 무한스크롤 구현",
    ],
    cta: "사이트 보러가기",
    href: "https://www.micimpact.net",
    thumb: "micimpact",
  },
  {
    category: "Service",
    title: "글로벌엠아이지",
    contribution: "100%",
    tools: ["PHP", "MySQL", "Cloudflare"],
    highlights: [
      "서비스 소개·포트폴리오·견적 신청 전 구간 구현",
      "PHP 서버 사이드 렌더링 및 MySQL 쿼리 최적화",
      "관리자 연동 고려한 DB 설계 및 동적 렌더링",
    ],
    cta: "사이트 보러가기",
    href: "https://www.weasley-market.com/homepage-development/",
    thumb: "weasley",
  },
  {
    category: "Service",
    title: "비비드드론",
    contribution: "100%",
    tools: ["Next.js", "SMS API", "Vercel"],
    highlights: [
      "Next.js API Route로 서버 사이드 SMS 발송 처리 및 폼 유효성 검증",
      "SMS API 문의 실시간 알림 연동",
      "다크톤 풀스크린 비주얼 구성",
    ],
    cta: "사이트 보러가기",
    href: "https://www.vividdrone.kr",
    thumb: "vividdrone",
  },
];

export const about = {
  name: "김혜빈",
  role: "풀스택 웹 개발자",
  photo: "/person.png",
  intro: "디자인부터 개발, SEO, 광고 운영까지 직접 경험하며 전 과정을 이해하는 웹 개발자입니다. 다양한 클라이언트와 소통하며 쌓은 패턴을 데이터로 정리하고, 문제를 빠르게 찾아 개선할 때 가장 보람을 느껴요.",
  tags: ["1998년생", "서울 금천구", "경력 3년 1개월", "영산대 졸업 (3.98/4.5)"],
  careers: [
    {
      company: "㈜글로벌엠아이지",
      period: "2025.03 ~ 재직중",
      role: "웹개발 / 연구개발부",
      tasks: [
        "클라이언트 상담부터 기획·디자인·개발·SEO·배포까지 단독 수행",
        "Figma UI/UX 설계 → 퍼블리싱 → 프론트·백엔드 개발 일괄 진행",
        "네이버 프리미엄 로그 분석 및 부정 클릭 방지 설치",
        "네이버·메타 광고 운영, GTM, GA4, 서치어드바이저 관리",
        "내부 프로그램 UI/UX 설계 및 광고 배너 디자인",
      ],
    },
    {
      company: "요필 디자인",
      period: "2024.06 ~ 2024.08",
      role: "UI/UX 디자인 인턴",
      tasks: [
        "네이버 고객센터 UI/UX 개선 작업 참여",
        "UX 라이팅 제안 및 SVG 아이콘 통일 작업",
      ],
    },
    {
      company: "㈜핸디커뮤니케이션즈",
      period: "2022.07 ~ 2024.02",
      role: "운영 / 개발 / 그래픽디자인",
      tasks: [
        "게임 이벤트 배너·마케팅 배너·사전예약 배너 제작",
        "아이 러브 버거, 마스터 오브 나이츠 등 모바일 게임 광고 배너 제작",
        "마법의 잉크 프로젝트 UI/UX 디자인 및 배치",
        "운영 업무 및 그래픽 디자인 병행",
      ],
    },
  ],
  education: {
    school: "영산대학교",
    major: "게임영상콘텐츠학과",
    period: "2017.03 ~ 2023.02",
    gpa: "3.98 / 4.5",
  },
  strengths: [
    {
      emoji: "🔧",
      title: "처음 보는 기술도 일단 부딪힙니다",
      desc: "모르는 거 나오면 찾아보면 되죠. 실제로 그렇게 디자인에서 개발까지 왔습니다.",
    },
    {
      emoji: "🎨",
      title: "디자인·개발 둘 다 보입니다",
      desc: "'이걸 어떻게 구현해요?'가 없어요. 보이는 것과 동작하는 것 사이에서 직접 결정합니다.",
    },
    {
      emoji: "👂",
      title: "클라이언트 말을 잘 구조화합니다",
      desc: "두리뭉실한 요구사항도 정리해서 다시 확인드려요. 방향이 맞아야 개발도 빠릅니다.",
    },
  ],
  weaknesses: [
    {
      emoji: "🌙",
      title: "완성도에 집착하는 편이에요",
      desc: "마감 전날 밤새는 건 일상입니다. 줄이려고 노력 중인데 쉽지 않네요.",
    },
    {
      emoji: "🤐",
      title: "처음엔 말이 많지 않아요",
      desc: "낯을 좀 가립니다. 친해지면 완전히 달라진다고들 하더라고요.",
    },
  ],
};

export const experts = [
  {
    title: "클라이언트 상담 & 요구사항 정리",
    points: [
      "요구사항 인터뷰 및 우선순위 정의",
      "기획 의도와 개발 난이도 균형 조율",
      "커뮤니케이션 문서화",
    ],
  },
  {
    title: "개발 + 디자인 통합 진행",
    points: [
      "UI/UX 설계와 프론트엔드 구현 동시 리드",
      "컴포넌트 단위 재사용 구조 설계",
      "반응형 · 접근성 기준 완성도 관리",
    ],
  },
  {
    title: "광고 세팅 & SEO",
    points: [
      "GA4 · Meta Pixel · Google Ads 전환 추적",
      "메타데이터 · 구조화 기반 SEO 개선",
      "Lighthouse · Search Console 성능 개선",
    ],
  },
];

export const stats = [
  {
    label: "실서비스 납품 이력",
    value: "6개+",
    note: "포트폴리오 공개 기준",
    detail: "비공개로 진행한 프로젝트가 다수 포함되어 있어, 실제 납품 수는 이보다 많습니다.",
  },
  {
    label: "단독 기여도",
    value: "100%",
    note: "전 프로젝트 공통",
    detail: "기획·UI 설계·프론트엔드·백엔드·SEO·배포까지 전 과정을 혼자 수행한 프로젝트만 집계했습니다.",
  },
  {
    label: "LCP 개선율",
    value: "~28%",
    note: "3.5s → 약 2.5s 단축",
    detail: "next/image priority 설정 · Critical CSS 인라인 처리 · 웹폰트 font-display 최적화 적용.",
  },
  {
    label: "이미지 번들 감소율",
    value: "40~70%",
    note: "PNG·JPG → WebP 전환 기준",
    detail: "squoosh CLI 일괄 변환 후 next/image sizes 속성으로 뷰포트별 최적 해상도를 제공합니다.",
  },
];

export const techStack = [
  {
    image: "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge",
    name: "React",
    desc: "컴포넌트 기반 UI 설계, 상태 관리(Zustand · React Query)",
  },
  {
    image: "https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge",
    name: "Next.js",
    desc: "SSR · ISR · App Router, 성능 최적화 및 SEO 대응",
  },
  {
    image: "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge",
    name: "TypeScript",
    desc: "전 프로젝트 타입 안전성 확보, API 계약 명세",
  },
  {
    image: "https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge",
    name: "Tailwind CSS",
    desc: "유틸리티 기반 반응형 UI, 디자인 토큰 시스템 적용",
  },
  {
    image: "https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge",
    name: "Node.js",
    desc: "REST API 설계 및 서버 사이드 로직 구현",
  },
  {
    image: "https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white&style=for-the-badge",
    name: "Supabase",
    desc: "DB 설계 · Auth · Storage, 관리자 기능 연동",
  },
  {
    image: "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge",
    name: "MySQL",
    desc: "관계형 DB 설계, 동적 콘텐츠 렌더링 쿼리 최적화",
  },
  {
    image: "https://img.shields.io/badge/AWS-232F3E?logo=amazonwebservices&logoColor=white&style=for-the-badge",
    name: "AWS / Vercel / Cloudflare",
    desc: "배포 자동화, Edge 캐싱, TTFB 최적화",
  },
  {
    image: "https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white&style=for-the-badge",
    name: "OpenAI · Claude API",
    desc: "AI 기반 기능 구현 및 프롬프트 설계",
  },
];

export const cultureCards = [
  {
    title: "디자인·개발·기획·마케팅을 넘나든 경험",
    body: "팀 프로젝트에서 개발만 맡은 것이 아니라 기획, UI 설계, 마케팅 실행, 클라이언트 소통까지 함께 담당했습니다. 다양한 직무를 직접 경험했기 때문에 팀원의 언어를 이해하고, 빠르게 협업에 녹아들 수 있습니다.",
    cta: "프로젝트 보러가기",
    href: "#stories",
    image: "https://placehold.co/360x360/111827/4ade80?text=Team",
    tint: "var(--surface)",
  },
  {
    title: "함께 만들어요",
    body: "협업 제안이나 채용 문의는 편하게 연락 주세요. 이력서와 경력기술서도 요청해 주시면 바로 전달드립니다.",
    cta: "연락하기",
    href: "mailto:hyebinkimdesign@gmail.com",
    image: "https://placehold.co/360x360/111827/fb923c?text=Contact",
    tint: "#fff7ef",
  },
];

export const perfRecords = [
  {
    metric: "LCP",
    label: "최대 콘텐츠풀 페인트",
    before: "3.5s",
    after: "~2.5s",
    delta: "▼ 28%",
    how: "이미지 preload · next/image 우선순위 설정 · 폰트 최적화",
    problem: "히어로 이미지가 우선순위 없이 lazy load로 처리되어, LCP 대상 요소가 뷰포트에 늦게 렌더링됨. Lighthouse에서 LCP 3.5s 경고 발생.",
    solution: "next/image에 priority 속성을 추가해 preload 처리하고, 폰트에 font-display: swap을 적용해 텍스트 렌더 블로킹을 제거.",
    codeBefore: `// 기존 — lazy load, 우선순위 없음
<img src="/hero.png" loading="lazy" alt="hero" />`,
    codeAfter: `// 개선 — priority preload 적용
<Image src="/hero.png" priority alt="hero"
  width={1200} height={630} />`,
  },
  {
    metric: "FCP",
    label: "첫 콘텐츠 페인트",
    before: "2.1s",
    after: "1.2s",
    delta: "▼ 43%",
    how: "Critical CSS 인라인 처리 · 렌더 블로킹 스크립트 defer 적용",
    problem: "외부 CSS 파일과 동기 스크립트가 렌더링을 블로킹하여 첫 콘텐츠가 늦게 노출됨.",
    solution: "Above-the-fold에 필요한 CSS를 인라인으로 처리하고, 나머지 스크립트에 defer를 적용해 HTML 파싱을 먼저 완료하도록 변경.",
    codeBefore: `// 기존 — 렌더 블로킹
<link rel="stylesheet" href="/styles.css" />
<script src="/analytics.js"></script>`,
    codeAfter: `// 개선 — 비블로킹 처리
<style>{criticalCSS}</style>
<link rel="preload" href="/styles.css" as="style"
  onLoad="this.rel='stylesheet'" />
<script src="/analytics.js" defer></script>`,
  },
  {
    metric: "TTFB",
    label: "첫 바이트 응답 시간",
    before: "~600ms",
    after: "~180ms",
    delta: "▼ 70%",
    how: "Vercel Edge 캐싱 · ISR 적용 · 불필요한 서버 왕복 제거",
    problem: "매 요청마다 서버에서 데이터를 fetch하고 렌더링하여 응답이 느림. CDN 캐시 미활용 상태.",
    solution: "Next.js ISR로 페이지를 주기적으로 재생성하고, Vercel Edge Network에서 캐시되도록 Cache-Control 헤더를 설정.",
    codeBefore: `// 기존 — 매 요청마다 서버 렌더링
export async function getServerSideProps() {
  const data = await fetchData(); // 매번 DB 호출
  return { props: { data } };
}`,
    codeAfter: `// 개선 — ISR 적용 (60초 재검증)
export const revalidate = 60;

export default async function Page() {
  const data = await fetchData(); // 캐시 활용
  return <Component data={data} />;
}`,
  },
  {
    metric: "TBT",
    label: "총 블로킹 시간",
    before: "420ms",
    after: "80ms",
    delta: "▼ 81%",
    how: "무거운 서드파티 스크립트 lazy load · 긴 태스크 분할",
    problem: "GA4, 채팅 위젯 등 서드파티 스크립트가 메인 스레드를 점유하며 인터랙션 응답을 지연시킴.",
    solution: "next/script의 strategy를 lazyOnload로 변경하고, 무거운 컴포넌트는 dynamic import로 분리.",
    codeBefore: `// 기존 — 동기 로드
<script src="https://chat-widget.js"></script>
import HeavyChart from './HeavyChart';`,
    codeAfter: `// 개선 — 지연 로드
<Script src="https://chat-widget.js"
  strategy="lazyOnload" />

const HeavyChart = dynamic(
  () => import('./HeavyChart'),
  { ssr: false }
);`,
  },
  {
    metric: "CLS",
    label: "레이아웃 시프트",
    before: "0.18",
    after: "0.02",
    delta: "▼ 89%",
    how: "이미지 width/height 명시 · 폰트 fallback 크기 맞춤 설정",
    problem: "이미지 크기 미지정으로 로드 후 레이아웃이 밀리고, 웹폰트 로드 전후 fallback 폰트 크기 차이로 텍스트가 튀는 현상 발생.",
    solution: "모든 이미지에 width/height 명시, CSS @font-face에 size-adjust로 fallback 폰트 크기를 웹폰트와 일치시킴.",
    codeBefore: `/* 기존 — 크기 미지정 */
<img src="/banner.jpg" alt="banner" />

@font-face {
  font-family: 'CustomFont';
  src: url('/font.woff2');
}`,
    codeAfter: `/* 개선 — 크기 명시 + fallback 조정 */
<Image src="/banner.jpg" alt="banner"
  width={800} height={400} />

@font-face {
  font-family: 'CustomFont';
  src: url('/font.woff2');
  size-adjust: 98%;
  ascent-override: 90%;
}`,
  },
  {
    metric: "Image",
    label: "이미지 번들 크기",
    before: "원본 PNG/JPG",
    after: "WebP 변환",
    delta: "▼ 40~70%",
    how: "WebP 일괄 전환 · lazy loading · srcset 대응",
    problem: "PNG/JPG 원본 파일이 그대로 서빙되어 파일 크기가 크고, 모바일에서도 데스크탑 해상도 이미지를 내려받는 상황.",
    solution: "squoosh CLI로 WebP 일괄 변환 후 next/image의 자동 최적화 파이프라인을 활용. sizes 속성으로 뷰포트별 적정 해상도 제공.",
    codeBefore: `// 기존 — 원본 PNG 직접 서빙
<img src="/product.png" alt="product" />
// 파일 크기: ~840kb`,
    codeAfter: `// 개선 — next/image 자동 WebP 변환
<Image
  src="/product.png"
  alt="product"
  width={600} height={400}
  sizes="(max-width: 768px) 100vw, 600px"
/>
// 실제 서빙: ~180kb WebP`,
  },
  {
    metric: "Bundle",
    label: "JS 번들 크기",
    before: "~420kb",
    after: "~260kb",
    delta: "▼ 38%",
    how: "dynamic import · 미사용 패키지 제거 · tree shaking 정리",
    problem: "@next/bundle-analyzer 분석 결과, 초기 번들에 모달·차트 등 즉시 불필요한 컴포넌트와 미사용 라이브러리가 포함됨.",
    solution: "dynamic import로 뷰포트 외 컴포넌트를 분리하고, 사용하지 않는 패키지를 제거. lodash 전체 import를 개별 함수 import로 교체.",
    codeBefore: `// 기존 — 전체 번들에 포함
import _ from 'lodash';
import Modal from './Modal';
import Chart from './Chart';`,
    codeAfter: `// 개선 — 필요한 것만, 나머지는 지연 로드
import debounce from 'lodash/debounce';

const Modal = dynamic(() => import('./Modal'));
const Chart = dynamic(() => import('./Chart'),
  { ssr: false });`,
  },
  {
    metric: "Font",
    label: "폰트 로딩",
    before: "FOUT 발생",
    after: "안정적 렌더",
    delta: "개선",
    how: "font-display: swap · preload 적용 · subset 폰트 교체",
    problem: "전체 폰트 파일(~300kb)을 로드하는 동안 텍스트가 보이지 않다가(FOIT) 갑자기 교체되는 현상 발생.",
    solution: "font-display: swap으로 fallback 폰트를 먼저 보여주고, 한글 서브셋 폰트(~60kb)로 교체해 로드 시간 자체를 단축.",
    codeBefore: `/* 기존 — 전체 폰트, FOIT */
@font-face {
  font-family: 'KoreanFont';
  src: url('/font-full.woff2'); /* ~300kb */
}`,
    codeAfter: `/* 개선 — 서브셋 + swap */
@font-face {
  font-family: 'KoreanFont';
  src: url('/font-subset.woff2'); /* ~60kb */
  font-display: swap;
  unicode-range: U+AC00-D7A3;
}`,
  },
  {
    metric: "SEO",
    label: "Lighthouse SEO 점수",
    before: "71",
    after: "98",
    delta: "▲ 38%",
    how: "메타태그 · OG 태그 · 구조화 데이터(JSON-LD) · sitemap 정비",
    problem: "title·description 미설정, OG 태그 없음, robots.txt 누락. 검색엔진이 콘텐츠를 제대로 인식하지 못하는 상태.",
    solution: "Next.js Metadata API로 페이지별 title/description을 설정하고, JSON-LD 구조화 데이터와 sitemap.xml을 추가.",
    codeBefore: `// 기존 — 메타데이터 없음
export default function Page() {
  return <main>...</main>;
}`,
    codeAfter: `// 개선 — Metadata + JSON-LD
export const metadata: Metadata = {
  title: '서비스명 | 설명',
  description: '페이지 설명 160자 이내',
  openGraph: { title: '...', images: ['...'] },
};

// JSON-LD 구조화 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '서비스명',
};`,
  },
  {
    metric: "A11y",
    label: "접근성 점수",
    before: "68",
    after: "94",
    delta: "▲ 38%",
    how: "alt 속성 · aria-label · 색상 대비비 · 키보드 포커스 정비",
    problem: "이미지 alt 누락, 버튼에 텍스트 없음, 색상 대비비 미달(3.2:1), 키보드로 모달 닫기 불가 등 다수 접근성 위반.",
    solution: "모든 이미지에 의미 있는 alt 추가, 아이콘 버튼에 aria-label 부여, 텍스트 색상을 대비비 4.5:1 이상으로 조정, 모달에 focus trap 구현.",
    codeBefore: `// 기존 — 접근성 미흡
<img src="/icon.svg" />
<button onClick={close}>
  <XIcon />
</button>
<p style={{ color: '#aaa' }}>안내 문구</p>`,
    codeAfter: `// 개선 — 접근성 적용
<img src="/icon.svg" alt="검색 아이콘" />
<button onClick={close} aria-label="모달 닫기">
  <XIcon aria-hidden="true" />
</button>
<p style={{ color: '#4d5159' }}>안내 문구</p>
{/* 대비비 4.8:1 확보 */}`,
  },
  {
    metric: "API",
    label: "Supabase 쿼리 응답",
    before: "~340ms",
    after: "~90ms",
    delta: "▼ 74%",
    how: "필요 컬럼만 select · 인덱스 추가 · RLS 조건 최적화",
    problem: "전체 컬럼 select(*)로 불필요한 데이터를 내려받고, 자주 조회하는 컬럼에 인덱스가 없어 풀스캔이 발생.",
    solution: "필요한 컬럼만 명시적으로 select하고, 검색·정렬에 사용되는 컬럼에 인덱스를 추가. RLS 정책도 단순화.",
    codeBefore: `// 기존 — 전체 컬럼 조회
const { data } = await supabase
  .from('speakers')
  .select('*')  // 불필요한 컬럼 포함
  .eq('status', 'active');`,
    codeAfter: `// 개선 — 필요 컬럼만 + 인덱스 활용
const { data } = await supabase
  .from('speakers')
  .select('id, name, category, fee, thumbnail')
  .eq('status', 'active')
  .order('created_at', { ascending: false });

// migration: create index on (status, created_at)`,
  },
  {
    metric: "Cache",
    label: "정적 자산 캐싱",
    before: "no-cache",
    after: "1년 캐시",
    delta: "개선",
    how: "Vercel headers 설정 · 콘텐츠 해시 파일명으로 캐시 버스팅",
    problem: "정적 파일(이미지, JS, CSS)에 캐시 헤더가 없어 재방문 시에도 매번 새로 다운로드. 불필요한 대역폭 낭비.",
    solution: "next.config.ts의 headers()로 정적 자산에 Cache-Control을 1년으로 설정. Next.js 빌드 시 파일명에 콘텐츠 해시가 자동 포함되어 캐시 무효화 문제 없음.",
    codeBefore: `// 기존 — 캐시 헤더 없음
// 매 요청마다 서버에서 파일 재전송`,
    codeAfter: `// next.config.ts
headers: async () => [{
  source: '/_next/static/(.*)',
  headers: [{
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  }],
}, {
  source: '/images/(.*)',
  headers: [{
    key: 'Cache-Control',
    value: 'public, max-age=31536000',
  }],
}]`,
  },
];

export const claudeWorkflow = {
  summary: "CLAUDE.md 규칙 정의부터 오류 MD 문서화까지, Claude AI를 개발 파트너로 활용해 반복 지시 없이 일관된 코드 품질을 유지합니다.",
  steps: [
    {
      step: "01",
      title: "CLAUDE.md 규칙 정의",
      desc: "프로젝트별 작업 원칙·보안 규칙·파일 탐색 방식을 CLAUDE.md에 고정. 매 대화마다 반복 설명 없이 동일한 기준으로 작업이 시작됩니다.",
      tags: ["토큰 절약", "보안 경계 설정", "작업 범위 제한"],
      code: `# CLAUDE.md 예시
## 작업 방식
- 요청과 직접 관련된 파일만 읽는다
- 전체 프로젝트를 한 번에 스캔하지 않는다
- 답변은 요약 위주로 짧게 작성한다

## 보안 규칙
- .env*, API 키는 읽거나 출력하지 않는다
- 비밀값은 사용자가 직접 설정했다 가정하고 진행`,
    },
    {
      step: "02",
      title: "오류·데이터 MD 문서화",
      desc: "반복 발생 오류, API 응답 구조, DB 스키마를 MD 파일로 정리. Claude에게 컨텍스트를 빠르게 전달해 디버깅 시간을 단축합니다.",
      tags: ["오류 추적", "API 스펙 문서화", "DB 스키마 관리"],
      code: `# errors.md 예시
## Supabase RLS 오류 패턴
- 증상: 데이터 조회 시 [] 빈 배열 반환
- 원인: Row Level Security 정책 미설정
- 해결: auth.uid() 기반 정책 추가
  \`\`\`sql
  CREATE POLICY "read_own" ON table
  FOR SELECT USING (auth.uid() = user_id);
  \`\`\``,
    },
    {
      step: "03",
      title: "개선 프로세스 정착",
      desc: "규칙 기반으로 Claude가 일관된 코드를 생성하고, 개선 사항은 다시 MD로 누적됩니다. 반복 지시 없이 프로젝트 컨텍스트가 자동으로 유지됩니다.",
      tags: ["재작업 감소", "일관된 코드 품질", "컨텍스트 누적"],
      code: `# 실제 변화
## 반복 지시 제거
- 이전: 매 대화마다 "보안 주의, 파일 최소화..." 설명
- 이후: CLAUDE.md 한 번 정의 → 이후 대화에서 자동 적용

## 토큰·컨텍스트 절약
- 이전: 전체 파일 스캔 요청 → 불필요한 토큰 소모
- 이후: 탐색 규칙 제한 → 관련 파일만 읽어 비용 절감

## 오류 해결
- 이전: 오류 상황을 매번 재설명하며 원인 탐색
- 이후: errors.md 참조로 재설명 없이 빠르게 접근`,
    },
  ],
  gains: [
    { label: "반복 지시 횟수", value: "~70%↓", note: "CLAUDE.md 정의 후 매 대화 재설명 대폭 감소" },
    { label: "오류 재설명 시간", value: "~40%↓", note: "errors.md 참조로 컨텍스트 전달 단축" },
    { label: "불필요한 토큰 소모", value: "~30%↓", note: "탐색 규칙 제한으로 관련 파일만 읽음" },
    { label: "컨텍스트 누적", value: "지속", note: "MD 문서가 쌓일수록 정확도 향상" },
  ],
};

export const news = [
  {
    title: "늦게 보이던 첫 화면, LCP 개선으로 앞당기기",
    date: "2026-04-15",
    image: "/news/improvement-lcp-thumb.svg",
    body: "히어로 이미지가 lazy load로 처리되어 LCP 대상 요소가 뷰포트에 늦게 렌더링되던 문제를 발견했습니다. next/image priority 속성과 폰트 최적화를 함께 적용해 체감 로딩을 크게 단축했습니다.",
    metrics: ["LCP", "FCP"],
  },
  {
    title: "느린 첫 응답, 캐싱 전략으로 더 빠르게",
    date: "2026-04-10",
    image: "/news/improvement-ttfb-thumb.svg",
    body: "매 요청마다 서버에서 데이터를 fetch하고 렌더링해 응답이 느렸습니다. ISR과 Vercel Edge 캐싱, 정적 자산 Cache-Control 설정을 통해 TTFB를 70% 단축했습니다.",
    metrics: ["TTFB", "Cache"],
  },
  {
    title: "무거운 이미지와 낮은 대비, 함께 정리한 최적화",
    date: "2026-04-08",
    image: "/news/improvement-image-a11y-thumb.svg",
    body: "PNG/JPG 원본 파일이 그대로 서빙되어 모바일에서 불필요하게 큰 이미지를 내려받고 있었습니다. WebP 전환과 함께 색상 대비·alt 속성 등 접근성 항목도 함께 개선했습니다.",
    metrics: ["Image", "A11y"],
  },
];
