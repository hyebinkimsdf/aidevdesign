'use client';

import { useEffect, useRef } from 'react';
import styles from "./daangn.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DaangnPage() {
    
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const overlayEyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const overlayBodyRef = useRef<HTMLParagraphElement | null>(null);

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

      // 오버레이 바디 텍스트 등장
      tl.fromTo(
        overlayBodyRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: "none", duration: 0.35 },
        0.7
      );
    });

    return () => ctx.revert();
  }, []);

const navItems = [
  { label: "팀문화", href: "#culture" },
  { label: "서비스", href: "#stories" },
  { label: "콘텐츠", href: "#news" },
];

const heroGallery = [
  {
    title: "가벼운 시도가 일상이 되기까지",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtYkMqNJQqH1lv_img_pro_story_1.18102rn3.jpg?auto=compress,format&fit=max&q=100&w=800&h=800",
    alt: "당근 사용자 이야기 1",
  },
  {
    title: "어쩌다 제주",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtY0MqNJQqH1lw_img_pro_story_2.Cz_v5BgP.jpg?auto=compress,format&fit=max&q=100&w=800&h=800",
    alt: "당근 사용자 이야기 2",
  },
  {
    title: "다시 시작한 일, 나를 살린 당근",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtZEMqNJQqH1ly_img_pro_story_3.Di1A3S6C.jpg?auto=compress,format&fit=max&q=100&w=800&h=800",
    alt: "당근 사용자 이야기 3",
  },
  {
    title: "한 식탁에 둘러앉은 사람들",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtZUMqNJQqH1lz_img_pro_story_4.BtpTtbww.jpg?auto=compress,format&fit=max&q=100&w=800&h=800",
    alt: "당근 사용자 이야기 4",
  },
];

const stories = [
  {
    category: "중고거래",
    title: "가벼운 시도가 일상이 되기까지",
    body:
      "예전엔 뭐 하나 시작하려면 큰맘 먹고 했을 텐데, 요즘엔 뭐든 부담 없이 시작하는 것 같아요. 아이 거든 제 거든, 새로운 게 필요해지면 동네에서 먼저 구해요. 써보고 아니다 싶으면 다시 나눠주면 되고요. 마음이 한결 가벼워요.",
    cta: "혜정 님 이야기 더 보기",
    href: "https://youtu.be/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtYkMqNJQqH1lv_img_pro_story_1.18102rn3.jpg?auto=compress,format&fit=max&q=100&w=540&h=540",
  },
  {
    category: "알바",
    title: "어쩌다 제주",
    body:
      "이사 온 사람 입장에서는 제주도에 사는 분들을 만나기가 어렵잖아요. 그런데 저는 처음 오자마자 당근으로 이것저것 알바를 하다 보니까, 현지인분들이랑 친해지면서 제주에 대해서도 잘 알게 됐어요. 지금도 연락하고 지내기도 하고요.",
    cta: "민애 님 이야기 더 보기",
    href: "https://youtu.be/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtY0MqNJQqH1lw_img_pro_story_2.Cz_v5BgP.jpg?auto=compress,format&fit=max&q=100&w=540&h=540",
  },
  {
    category: "비즈니스",
    title: "다시 시작한 일, 나를 살린 당근",
    body:
      "집에 와서 고객님들이 당근에 남겨주신 후기들 보면 뿌듯해요. 일하느라 정신없고 힘은 들었어도 남겨주신 것 보면 다 기억나고 소중하고 그래요. 오늘 어떤 거 해주셔서 너무 고마웠다, 이런 거 보면 힘이 절로 나죠.",
    cta: "기봉 님 이야기 더 보기",
    href: "https://youtu.be/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtZEMqNJQqH1ly_img_pro_story_3.Di1A3S6C.jpg?auto=compress,format&fit=max&q=100&w=540&h=540",
  },
  {
    category: "모임",
    title: "한 식탁에 둘러앉은 사람들",
    body:
      "어린 시절에나 자주 놀러갔지, 요새는 이사 가고 결혼해야 보여주는 게 집이잖아요. 편히 가기 힘든 게 남의 집인데, 당근을 통해서 다른 사람 집에 놀러갈 수 있다는 게 새롭고 재밌더라고요.",
    cta: "유찬 님 이야기 더 보기",
    href: "https://youtu.be/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aHTtZUMqNJQqH1lz_img_pro_story_4.BtpTtbww.jpg?auto=compress,format&fit=max&q=100&w=540&h=540",
  },
];

const experts = [
  {
    title: "채정호 교수",
    quote: "건강한 삶을 위해 중요한 네트워크는 바로 내가 거주하는 동네의 연결이에요.",
    href: "https://about.daangn.com/",
  },
  {
    title: "박찬일 셰프",
    quote: "동네 가게에서는 사장님과 손님이 서로 믿고 거래하는 관계를 만들 수 있어요.",
    href: "https://about.daangn.com/",
  },
  {
    title: "장강명 작가",
    quote: "우리가 사람답게 살기 위해서는, 주변 사람들과 마음을 나눌 수 있는 동네가 필요한 것 같아요.",
    href: "https://about.daangn.com/",
  },
  {
    title: "윤순진 교수",
    quote: "중고거래만으로도 환경에 큰 도움이 되죠. 동네에서부터 할 수 있는 게 정말 많아요.",
    href: "https://about.daangn.com/",
  },
];

const stats = [
  { label: "누적 가입자 수", value: "4,000만+", note: "2025년 1월 기준" },
  { label: "월간 활성 이용자 수", value: "2,000만+", note: "국내 MAU" },
  { label: "글로벌 지역 진출", value: "1,400여 곳", note: "하이퍼로컬 서비스" },
  { label: "누적 투자 유치", value: "2,270억 원", note: "글로벌 투자자와 함께" },
];

const investors = [
  "https://prismic-image-proxy.krrt.io/karrot/aHTui0MqNJQqH1o8_img_investors_1.Ba9X2Gow.png?auto=compress,format&fit=max&q=100&w=300&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTujEMqNJQqH1o-_img_investors_2.CG7o8wUE.png?auto=compress,format&fit=max&q=100&w=300&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTujUMqNJQqH1o__img_investors_3.D_D6_Uwm.png?auto=compress,format&fit=max&q=100&w=300&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTujkMqNJQqH1pB_img_investors_4.BC7yD7fK.png?auto=compress,format&fit=max&q=100&w=300&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTuj0MqNJQqH1pD_img_investors_5.CCML8udL.png?auto=compress,format&fit=max&q=100&w=301&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTukEMqNJQqH1pF_img_investors_6.CtBp6qTB.png?auto=compress,format&fit=max&q=100&w=301&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTukUMqNJQqH1pH_img_investors_7.ChWMqeT4.png?auto=compress,format&fit=max&q=100&w=301&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTukkMqNJQqH1pI_img_investors_8.ClBHCtKo.png?auto=compress,format&fit=max&q=100&w=301&h=120",
  "https://prismic-image-proxy.krrt.io/karrot/aHTuk0MqNJQqH1pK_img_investors_9.jGZwIzna.png?auto=compress,format&fit=max&q=100&w=300&h=120",
];

const cultureCards = [
  {
    title: "당근이 일하는 문화",
    body: "함께의 가치를 만드는 사람들은 어떤 문화에서 일할까요?",
    cta: "팀 문화 보러가기",
    href: "https://about.daangn.com/culture/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aQ2ncrpReVYa4OMm_img1.png?auto=compress,format&fit=max&q=100&w=360&h=360",
    tint: "var(--surface)",
  },
  {
    title: "당근 팀과 함께 할 멋진 동료를 찾고 있어요!",
    body: "동네를 여는 문을 함께 만들 사람들을 기다리고 있어요.",
    cta: "채용공고 보러가기",
    href: "https://about.daangn.com/jobs/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/aQ2ne7pReVYa4OMn_img2.png?auto=compress,format&fit=max&q=100&w=360&h=360",
    tint: "#fff7ef",
  },
];

const news = [
  {
    title: "당근부동산, 세대별 ‘살아본 후기’ 분석",
    date: "2026-04-15",
    href: "https://about.daangn.com/company/pr/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/ad34eJ1ZCF7ETKVw_%5B%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B51%5D%E1%84%83%E1%85%A1%E1%86%BC%E1%84%80%E1%85%B3%E1%86%AB%E1%84%87%E1%85%AE%E1%84%83%E1%85%A9%E1%86%BC%E1%84%89%E1%85%A1%E1%86%AB%2C%E1%84%89%E1%85%A6%E1%84%83%E1%85%A2%E1%84%87%E1%85%A7%E1%86%AF%E1%84%89%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%86%AB%E1%84%92%E1%85%AE%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8.png?auto=compress,format&fit=max&q=100&w=1075&h=550",
  },
  {
    title: "당근, ‘당근아파트’ 나눔 품목 순위 공개",
    date: "2026-04-10",
    href: "https://about.daangn.com/company/pr/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/addYXp1ZCF7ETALo_%5B%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B51%5D%E1%84%83%E1%85%A1%E1%86%BC%E1%84%80%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%86%E1%85%B2%E1%84%82%E1%85%B5%E1%84%90%E1%85%B5%E1%84%82%E1%85%A1%E1%84%82%E1%85%AE%E1%86%B7%E1%84%91%E1%85%AE%E1%86%B7%E1%84%86%E1%85%A9%E1%86%A8Top10.png?auto=compress,format&fit=max&q=100&w=1080&h=608",
  },
  {
    title: "당근, AI 기반 대화형 후기 작성 기능 출시",
    date: "2026-04-08",
    href: "https://about.daangn.com/company/pr/",
    image:
      "https://prismic-image-proxy.krrt.io/karrot/adTF9JGXnQHGZTnP_%5B%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B51%5D%E1%84%83%E1%85%A1%E1%86%BC%E1%84%80%E1%85%B3%E1%86%AB%2CAI%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%AA%E1%84%92%E1%85%A7%E1%86%BC%E1%84%92%E1%85%AE%E1%84%80%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%E2%80%98%E1%84%86%E1%85%A1%E1%86%AF%E1%84%85%E1%85%A9%E1%84%8A%E1%85%B3%E1%84%80%E1%85%B5%E2%80%99%E1%84%8E%E1%85%AE%E1%86%AF%E1%84%89%E1%85%B5.png?auto=compress,format&fit=max&q=100&w=1080&h=608",
  },
];
return (

    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <a className={styles.logo} href="#top" aria-label="당근 회사소개">
              <span className={styles.logoBadge}>당근</span>
            </a>
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              ))}
              <a href="https://about.daangn.com/jobs/" className={styles.hireLink}>
                채용공고
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* 히어로 — 텍스트 + 영상 카드 통합 pin 섹션 */}
      <div ref={heroRef} className={styles.heroStage} id="top">
        {/* 좌상단 텍스트 — 스크롤 시 페이드아웃 */}
        <div className={styles.heroCopy} ref={heroCopyRef}>
          <p className={styles.eyebrow}>동네를 여는 문, 당근</p>
          <h1 className={styles.heroTitle}>동네를 여는 문, 당근</h1>
        </div>

        {/* 영상 카드 — 확대되며 풀스크린 */}
        <div className={styles.heroVideoWrapper} ref={videoRef}>
          <video
            className={styles.heroVideo}
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* 확장 후 오버레이 텍스트 */}
          <div className={styles.heroVideoOverlay}>
            <p className={styles.overlayEyebrow} ref={overlayEyebrowRef}>
              동네를 여는 문, 당근
            </p>
            <p className={styles.overlayBody} ref={overlayBodyRef}>
              로컬의 모든 것을 연결해,<br />동네의 숨은 가치를 깨워요
            </p>
          </div>
        </div>
      </div>

      <section className={styles.section} id="stories">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>당근 사용자 이야기</p>
            <h2>당근을 만나고 달라진 일상</h2>
          </div>
          <div className={styles.storyGrid}>
            {stories.map((story) => (
              <article key={story.title} className={styles.storyCard}>
                <div className={styles.storyThumb}>
                  <img src={story.image} alt={story.title} loading="lazy" />
                </div>
                <div className={styles.storyMeta}>{story.category}</div>
                <h3>{story.title}</h3>
                <p>{story.body}</p>
                <a href={story.href} target="_blank" rel="noreferrer" className={styles.inlineLink}>
                  {story.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.expertSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>전문가들에게 묻다</p>
            <h2>우리에게 동네의 연결이 필요한 이유</h2>
          </div>
          <div className={styles.expertGrid}>
            {experts.map((expert) => (
              <a key={expert.title} href={expert.href} className={styles.expertCard}>
                <span className={styles.expertName}>{expert.title}</span>
                <strong>{expert.quote}</strong>
                <span className={styles.inlineLink}>인터뷰 보러 가기</span>
              </a>
            ))}
          </div>
          <div className={styles.fullVideoBox}>
            <div>
              <p className={styles.kicker}>당근은 이웃들이 함께 살아가는 동네를 꿈꿔요</p>
              <h3>당근은 매일 새로운 역사를 쓰고 있어요</h3>
            </div>
            <a href="https://youtu.be/" target="_blank" rel="noreferrer" className={styles.primaryButton}>
              전체 영상 보러 가기
            </a>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.metricsSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>2025년 1월 기준</p>
            <h2>당근은 매일 새로운 역사를 쓰고 있어요</h2>
          </div>
          <div className={styles.metricGrid}>
            {stats.map((item) => (
              <article key={item.label} className={styles.metricCard}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>

          <div className={styles.investorBlock}>
            <div className={styles.sectionHeading}>
              <h2>유수한 글로벌 투자자들이 당근과 함께해요</h2>
            </div>
            <div className={styles.investorGrid}>
              {investors.map((logo, index) => (
                <div key={logo} className={styles.investorCard}>
                  <img src={logo} alt={`투자사 로고 ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.cultureSection}`} id="culture">
        <div className={styles.container}>
          <div className={styles.cultureGrid}>
            {cultureCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className={styles.cultureCard}
                style={{ background: card.tint }}
              >
                <div className={styles.cultureCopy}>
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                  <span className={styles.inlineLink}>{card.cta}</span>
                </div>
                <div className={styles.cultureArt}>
                  <img src={card.image} alt={card.title} loading="lazy" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="news">
        <div className={styles.container}>
          <div className={styles.newsHeader}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>당근의 최근 소식을 확인하세요</p>
              <h2>보도자료</h2>
            </div>
            <a href="https://about.daangn.com/company/pr/" className={styles.ghostButton}>
              보도자료 보러 가기
            </a>
          </div>

          <div className={styles.newsGrid}>
            {news.map((item) => (
              <a key={item.title} href={item.href} className={styles.newsCard}>
                <div className={styles.newsThumb}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className={styles.newsMeta}>
                  <strong>{item.title}</strong>
                  <span>{item.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLinks}>
            <a href="https://daangn.notion.site/26-2-30d28c3a9f8f80afb5aac6160177a89a">개인정보처리방침</a>
            <a href="https://www.notion.so/daangn/6fdd92981e4a42d8b29c89cbbba7a8b7">브랜드 리소스</a>
            <a href="https://about.daangn.com/faq/">자주 묻는 질문</a>
            <a href="https://about.daangn.com/ir/">IR</a>
            <a href="https://about.daangn.com/company/pr/">PR</a>
          </div>
          <div className={styles.footerInfo}>
            <p>주소 : 서울특별시 서초구 강남대로 465, 교보강남타워 11층</p>
            <p>© 당근마켓</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
