export type SiteProjectCategory =
  | "academy"
  | "corporate"
  | "commerce"
  | "platform"
  | "service";

export type SiteProjectThumb =
  | "withbill"
  | "pwin"
  | "lgshop"
  | "micimpact"
  | "weasley"
  | "vividdrone";

export type SiteProject = {
  id: string;
  route: string;
  name: string;
  client: string;
  tagline: string;
  description: string;
  contribution: string;
  category: SiteProjectCategory;
  tags: string[];
  highlights: string[];
  demo: string;
  domain: string;
  thumb: SiteProjectThumb;
  github?: string;
};

export const siteProjects: SiteProject[] = [
  {
    id: "site-withbill",
    route: "withbill-dance-studio",
    name: "위드빌댄스스튜디오",
    client: "Withbill Dance Academy",
    tagline: "수강 안내와 상담 전환에 초점을 둔 아카데미 웹사이트",
    description:
      "댄스 아카데미의 클래스 소개, 브랜드 무드, 상담 유입을 한 흐름으로 연결한 실서비스 웹사이트입니다. 학원 소개형 페이지에 머무르지 않도록 정보 구조와 문의 동선을 함께 설계했습니다.",
    contribution: "기여도 100%",
    category: "academy",
    tags: ["Next.js", "Supabase", "Vercel", "Academy Site", "Responsive Web", "Inquiry Flow", "Brand UI"],
    highlights: [
      "클래스 소개와 상담 유도 CTA를 한 페이지 흐름 안에서 정리",
      "모바일 환경에서도 위치 확인과 문의 접근성이 자연스럽게 이어지도록 구성",
      "아카데미 분위기에 맞는 비주얼 톤과 실사용 정보를 함께 반영",
    ],
    demo: "https://www.withbilldanceacademy.com",
    domain: "withbilldanceacademy.com",
    thumb: "withbill",
    github: "https://github.com/globalmig/WithbillDanceStudio",
  },
  {
    id: "site-pwin",
    route: "pwin-industry",
    name: "평원산업",
    client: "PYEONGWON INDUSTRY",
    tagline: "제품 소개와 시공 사례를 체계화한 기업 웹사이트",
    description:
      "친환경 보강토·축조·호안 블록 제품과 공법, 시공 사례를 한곳에서 전달하는 기업 홈페이지입니다. 제품 탐색과 회사 신뢰도를 동시에 보여줄 수 있도록 콘텐츠 구조를 재정리했습니다.",
    contribution: "기여도 100%, 사이트 기획부터 제작 및 운영 반영까지 단독 진행",
    category: "corporate",
    tags: ["Next.js", "Supabase", "Vercel", "Corporate Site", "Product Catalog", "Construction Cases", "Lead CTA"],
    highlights: [
      "제품 소개, 공법 소개, 시공 사례를 분리해 정보 탐색 흐름을 명확하게 설계",
      "카탈로그 다운로드와 연락 유입 포인트를 메인 동선에 배치",
      "브랜드 신뢰감을 높이는 기업형 톤과 현장 중심 콘텐츠를 함께 구성",
    ],
    demo: "https://www.pwin.co.kr",
    domain: "pwin.co.kr",
    thumb: "pwin",
  },
  {
    id: "site-lgshop",
    route: "lg-best-shop-yongsan",
    name: "LG Best Shop 용산전자상가점",
    client: "LG Best Shop",
    tagline: "상담 예약 전환 중심의 매장 프로모션 웹사이트",
    description:
      "오프라인 매장의 상담 예약과 빠른 문의 전환을 목표로 제작한 웹사이트입니다. 제품 판매보다도 예약 신청과 상담 흐름이 바로 이어지도록 화면 우선순위를 설계했습니다.",
    contribution: "기여도 100%",
    category: "commerce",
    tags: ["Next.js", "Vercel", "Reservation Flow", "Store Landing", "Consulting Form", "Map UX"],
    highlights: [
      "간편 상담 신청 폼을 중심으로 전환 목적이 바로 보이게 구성",
      "전화 상담과 매장 방문 정보를 한 번에 확인할 수 있도록 정리",
      "프로모션 배너와 예약 CTA의 우선순위를 명확히 배치",
    ],
    demo: "https://www.lgshop-ys.com",
    domain: "lgshop-ys.com",
    thumb: "lgshop",
  },
  {
    id: "site-weasley",
    route: "weasley-homepage-development",
    name: "글로벌엠아이지 홈페이지 개발",
    client: "GLOBAL MIG",
    tagline: "홈페이지 개발 서비스 전체 섹션 구축",
    description:
      "마케팅 전문 회사 글로벌엠아이지의 홈페이지 개발 서비스 전 페이지를 단독으로 설계·개발했습니다. 서비스 소개, 제작 유형, 포트폴리오, 견적 신청까지 전체 흐름을 PHP와 MySQL 기반으로 구현했습니다.",
    contribution: "기여도 100%, 기획·설계·개발·DB 구조 전부 단독 진행",
    category: "service",
    tags: ["PHP", "MySQL", "Cloudflare", "Full-Stack", "Service Page", "DB 설계"],
    highlights: [
      "PHP + MySQL 기반으로 서비스 소개·포트폴리오·견적 신청 전 구간 직접 개발",
      "제작 유형별(쇼핑몰·기업·글로벌 등) 페이지 구조 및 콘텐츠 분리 설계",
      "관리자 연동을 고려한 DB 구조 설계 및 동적 콘텐츠 렌더링 구현",
    ],
    demo: "https://www.weasley-market.com/homepage-development/",
    domain: "weasley-market.com",
    thumb: "weasley",
  },
  {
    id: "site-vividdrone",
    route: "vividdrone",
    name: "비비드드론",
    client: "VIVID DRONE",
    tagline: "드론 촬영·뮤직비디오·CF·방송 제작 전문 스튜디오 웹사이트",
    description:
      "드론 촬영과 영상 제작 전문 스튜디오의 포트폴리오·서비스 소개·문의 유입을 한 흐름으로 구성한 웹사이트입니다. 뮤직비디오, CF, 방송 영상 등 제작 분야별 레퍼런스를 효과적으로 보여주고, SMS API 기반 문의 알림으로 빠른 응대가 가능하도록 설계했습니다.",
    contribution: "기여도 100%, 기획·설계·개발·배포 단독 진행",
    category: "service",
    tags: ["Next.js", "SMS API", "Vercel", "Video Production", "Portfolio Site", "Inquiry Flow", "Responsive Web"],
    highlights: [
      "드론 촬영·뮤직비디오·CF·방송 제작 분야별로 레퍼런스를 분리해 탐색 흐름 설계",
      "SMS API 연동으로 문의 접수 즉시 담당자에게 실시간 알림 전송",
      "영상 스튜디오 특성에 맞는 다크톤 비주얼과 풀스크린 레퍼런스 강조 구성",
    ],
    demo: "https://www.vividdrone.kr",
    domain: "vividdrone.kr",
    thumb: "vividdrone",
  },
  {
    id: "site-micimpact",
    route: "micimpact",
    name: "마이크임팩트",
    client: "MICIMPACT",
    tagline: "강연자·아티스트 탐색과 문의 유입을 위한 플랫폼형 사이트",
    description:
      "강연자와 아티스트를 탐색하고 문의까지 연결할 수 있도록 구성한 플랫폼형 웹사이트입니다. 검색, 카테고리, 상담 유입 흐름을 함께 고려해 콘텐츠 탐색성을 높였습니다.",
    contribution: "기여도 100%",
    category: "platform",
    tags: ["Next.js", "Supabase", "Vercel", "Platform UI", "Search Flow", "Category UX", "Inquiry Conversion"],
    highlights: [
      "키워드, 분야, 섭외비 기준으로 탐색 가능한 구조를 반영",
      "사용자가 탐색 후 바로 문의 액션으로 넘어갈 수 있게 CTA를 연결",
      "플랫폼 성격에 맞는 정보 밀도와 신뢰감을 균형 있게 구성",
    ],
    demo: "https://www.micimpact.net",
    domain: "micimpact.net",
    thumb: "micimpact",
  },
];
