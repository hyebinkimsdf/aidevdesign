import type { Lang } from "../context/LanguageContext";

const translations: Record<
  Lang,
  {
    hero: {
      greeting: string;
      h2prefix: string;
      h2bold: string;
      p: string;
      cta1: string;
      cta2: string;
    };
    about: {
      h2line1: string;
      h2line2: string;
      p: string;
      pbold1: string;
      pmid: string;
      pbold2: string;
      pend: string;
      steps: string[];
      techLabel: string;
      techStack: string[];
    };
    impact: {
      h2: string;
      strengths: { title: string; points: string[] }[];
    };
    skills: {
      groups: { description: string; items: string[] }[];
    };
    contact: {
      h2: string;
      p: string;
      resumeBtn: string;
    };
    projects: {
      h2line1: string;
      h2line2: string;
      p: string;
      pBold: string;
      pEnd: string;
      searchPlaceholder: string;
      allLabel: string;
      liveBadge: string;
      noResults: string;
    };
    performance: {
      h2: string;
      p: string;
      summary: { label: string; before: string; after: string }[];
      searchPlaceholder: string;
      filterLabel: string;
      resetLabel: string;
      domainLabel: string;
      domainMap: Record<string, string>;
      techLabel: string;
      allLabel: string;
      noResults: string;
      beforeLabel: string;
      afterLabel: string;
      closeLabel: string;
      prevLabel: string;
      nextLabel: string;
      paginationSuffix: string;
      categoryMap: Record<string, string>;
    };
  }
> = {
  ko: {
    hero: {
      greeting: "안녕하세요, 저는",
      h2prefix: "화면·서버·데이터를 함께 설계하는",
      h2bold: "풀스택 개발자",
      p: "프론트, 백엔드, DB 설계까지 직접 담당합니다.\n기획 이해부터 배포까지 단독 진행 가능합니다.",
      cta1: "프로젝트 보기",
      cta2: "연락하기",
    },
    about: {
      h2line1: "서비스가 어떻게 동작해야 하는지,",
      h2line2: "처음부터 끝까지 직접 생각합니다.",
      p: "프론트부터 백엔드, DB 설계, 서버 관리까지 직접 담당합니다.",
      pbold1: "디자인 감각",
      pmid: "으로 화면 방향을 잡고, 클라이언트 요구사항을 ",
      pbold2: "기능 명세로 구체화",
      pend: "하는 것까지 혼자 가능합니다.",
      steps: ["기획 이해", "설계", "구현", "배포"],
      techLabel: "주요 기술",
      techStack: [
        "React / Next.js / TypeScript",
        "Node.js / REST API 설계",
        "Supabase / DB 설계",
        "Figma / UI Design",
        "Vercel / AWS / Cloudflare",
        "클라이언트 소통 / 요구사항 정리",
      ],
    },
    impact: {
      h2: "상담부터 실행, 성과까지 연결합니다",
      strengths: [
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
      ],
    },
    skills: {
      groups: [
        {
          description: "화면 레이어",
          items: [
            "React / Next.js",
            "TypeScript",
            "Tailwind CSS",
            "HTML / CSS",
            "Zustand / React Query",
          ],
        },
        {
          description: "서버 레이어",
          items: [
            "Node.js / REST API 설계",
            "PHP",
            "MySQL",
            "Supabase (DB / Auth)",
            "관리자 기능 구현",
            "Vercel / AWS / Cloudflare",
            "OpenAI / Claude API",
          ],
        },
        {
          description: "차별점",
          items: [
            "Figma / UI Design",
            "Responsive Design",
            "UX 방향 제안",
            "요구사항 정리 / 기능 명세",
            "클라이언트 커뮤니케이션",
          ],
        },
      ],
    },
    contact: {
      h2: "함께 만들어요",
      p: "협업 제안이나 채용 문의는 편하게 연락 주세요.",
      resumeBtn: "이력서/경력기술서 요청",
    },
    projects: {
      h2line1: "실제 운영 중인 사이트를 중심으로",
      h2line2: "제작 범위와 서비스 목적이 드러나도록 정리했습니다.",
      p: "화면 디자인뿐 아니라 상담 전환, 정보 구조, 운영 반영까지 함께 맡았던 프로젝트들입니다.",
      pBold: "모두 실제 서비스",
      pEnd: " 도메인 기준으로 정리했고, 공개 가능한 경우 라이브 링크와 저장소를 연결했습니다.",
      searchPlaceholder: "프로젝트 검색",
      allLabel: "전체",
      liveBadge: "실운영",
      noResults: "검색 결과가 없습니다.",
    },
    performance: {
      h2: "성능 최적화 작업 기록",
      p: "Lighthouse 측정 기반으로 LCP · INP · 접근성 문제를 진단하고 개선했습니다. 각 항목을 클릭하면 상세 내용을 확인할 수 있습니다.",
      summary: [
        { label: "LCP", before: "3.5s", after: "~2.5s" },
        { label: "TTFB", before: "가변", after: "60–80% ↓" },
        { label: "이미지", before: "JPG", after: "40–70% ↓" },
        { label: "대비율", before: "불합격", after: "AA 통과" },
      ],
      searchPlaceholder: "제목, 태그, 내용 검색...",
      filterLabel: "필터",
      resetLabel: "초기화",
      domainLabel: "도메인",
      domainMap: { "프론트엔드": "프론트엔드", "백엔드": "백엔드" },
      techLabel: "기술 스택",
      allLabel: "전체",
      noResults: "검색 결과가 없습니다.",
      beforeLabel: "변경 전",
      afterLabel: "변경 후",
      closeLabel: "닫기",
      prevLabel: "이전 페이지",
      nextLabel: "다음 페이지",
      paginationSuffix: "개",
      categoryMap: {
        Rendering: "렌더링",
        LCP: "LCP",
        "LCP / FCP": "LCP / FCP",
        INP: "INP",
        Accessibility: "접근성",
      },
    },
  },
  en: {
    hero: {
      greeting: "Hi, I'm",
      h2prefix: "A full-stack developer who designs UI, server, and data —",
      h2bold: "end to end",
      p: "I handle front-end, back-end, and DB design myself.\nSolo delivery from planning to production.",
      cta1: "View Projects",
      cta2: "Contact",
    },
    about: {
      h2line1: "I think through how the service should work,",
      h2line2: "from start to finish.",
      p: "I own the front-end, back-end, DB design, and server management.",
      pbold1: "Design sensibility",
      pmid: " shapes the UI direction, and I can",
      pbold2: "translate client requirements into specs",
      pend: " — all on my own.",
      steps: ["Planning", "Design", "Build", "Deploy"],
      techLabel: "Tech Stack",
      techStack: [
        "React / Next.js / TypeScript",
        "Node.js / REST API Design",
        "Supabase / DB Design",
        "Figma / UI Design",
        "Vercel / AWS / Cloudflare",
        "Client Communication / Requirements",
      ],
    },
    impact: {
      h2: "From consultation to execution — results delivered",
      strengths: [
        {
          title: "Client Consultation & Requirements",
          points: [
            "Requirements interview & priority definition",
            "Balancing product intent with dev complexity",
            "Communication documentation",
          ],
        },
        {
          title: "Integrated Development + Design",
          points: [
            "Leading UI/UX design and front-end implementation in parallel",
            "Component-driven reusable architecture",
            "Responsive & accessibility quality management",
          ],
        },
        {
          title: "Ad Setup & SEO",
          points: [
            "GA4 · Meta Pixel · Google Ads conversion tracking",
            "Metadata & structured data SEO improvements",
            "Lighthouse · Search Console performance tuning",
          ],
        },
      ],
    },
    skills: {
      groups: [
        {
          description: "UI Layer",
          items: [
            "React / Next.js",
            "TypeScript",
            "Tailwind CSS",
            "HTML / CSS",
            "Zustand / React Query",
          ],
        },
        {
          description: "Server Layer",
          items: [
            "Node.js / REST API Design",
            "PHP",
            "MySQL",
            "Supabase (DB / Auth)",
            "Admin Panel Dev",
            "Vercel / AWS / Cloudflare",
            "OpenAI / Claude API",
          ],
        },
        {
          description: "Differentiator",
          items: [
            "Figma / UI Design",
            "Responsive Design",
            "UX Direction",
            "Requirements / Feature Spec",
            "Client Communication",
          ],
        },
      ],
    },
    contact: {
      h2: "Let's Build Together",
      p: "Feel free to reach out for collaboration or job inquiries.",
      resumeBtn: "Request Resume / CV",
    },
    projects: {
      h2line1: "Focused on live production sites —",
      h2line2: "organised to show scope and service purpose.",
      p: "Projects where I owned not just screen design but also conversion flow, information architecture, and ongoing updates.",
      pBold: "All live services",
      pEnd: " — organised by domain, with live links and repos where available.",
      searchPlaceholder: "Search projects",
      allLabel: "All",
      liveBadge: "Live",
      noResults: "No results found.",
    },
    performance: {
      h2: "Performance Optimisation Log",
      p: "Diagnosed and improved LCP, INP, and accessibility issues based on Lighthouse audits. Click each item for details.",
      summary: [
        { label: "LCP", before: "3.5s", after: "~2.5s" },
        { label: "TTFB", before: "variable", after: "60–80% ↓" },
        { label: "Image", before: "JPG", after: "40–70% ↓" },
        { label: "Contrast", before: "Fail", after: "AA Pass" },
      ],
      searchPlaceholder: "Search by title, tag, or content...",
      filterLabel: "Filter",
      resetLabel: "Reset",
      domainLabel: "Domain",
      domainMap: { "프론트엔드": "Frontend", "백엔드": "Backend" },
      techLabel: "Tech Stack",
      allLabel: "All",
      noResults: "No results found.",
      beforeLabel: "Before",
      afterLabel: "After",
      closeLabel: "Close",
      prevLabel: "Previous page",
      nextLabel: "Next page",
      paginationSuffix: "",
      categoryMap: {
        Rendering: "Rendering",
        LCP: "LCP",
        "LCP / FCP": "LCP / FCP",
        INP: "INP",
        Accessibility: "Accessibility",
      },
    },
  },
};

export default translations;
