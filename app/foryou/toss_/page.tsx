'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./daangn.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
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
    <div className="relative overflow-hidden rounded-[14px] aspect-square bg-[#F2F4F6]">
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
      <div className="absolute bottom-[10px] right-[10px] flex gap-[5px] z-[2]">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            aria-label={`슬라이드 ${i + 1}`}
            onClick={() => {
              setCurrent(i);
              if (timerRef.current) clearInterval(timerRef.current);
              timerRef.current = setInterval(advance, SLIDE_INTERVAL);
            }}
            className={`h-[5px] rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
              current === i ? 'w-4 bg-white/95' : 'w-[5px] bg-white/45'
            }`}
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
    <div className="flex flex-col rounded-[16px] overflow-hidden border border-[#E5E8EB]">
      {records.map((rec, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={rec.metric}
            className={`border-b border-[#E5E8EB] last:border-b-0 ${isOpen ? 'bg-[#EBF3FF]' : 'bg-white'}`}
          >
            <button
              className="w-full grid items-center gap-3 px-7 py-[18px] bg-transparent border-none cursor-pointer text-left transition-colors hover:bg-[#EBF3FF]"
              style={{ gridTemplateColumns: '64px 160px 80px 20px 80px 72px 1fr 24px' }}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <span className="text-[11px] font-extrabold text-[#3182F6] tracking-[0.06em] uppercase bg-[#3182F6]/10 py-[3px] px-2 rounded-[6px] text-center">
                {rec.metric}
              </span>
              <span className="text-[14px] font-bold text-[#191F28] tracking-[-0.03em]">
                {rec.label}
              </span>
              <span className="text-[13px] text-[#8B95A1] line-through text-right">
                {rec.before}
              </span>
              <span className="text-[13px] text-[#8B95A1] text-center">→</span>
              <span className="text-[13px] font-bold text-[#191F28]">
                {rec.after}
              </span>
              <span className="text-[12px] font-extrabold py-[3px] px-2 rounded-[6px] text-center whitespace-nowrap text-[#00C471] bg-[#E9FAF3]">
                {rec.delta}
              </span>
              <span className="text-[13px] text-[#4E5968] tracking-[-0.02em] break-keep">
                {rec.how}
              </span>
              <span className={`text-[#8B95A1] flex items-center justify-center transition-transform duration-[250ms] ${isOpen ? 'rotate-180' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="px-7 pb-6 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-[12px] p-5 border border-[#E5E8EB]">
                    <p className="m-0 mb-2 text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#3182F6]">문제</p>
                    <p className="m-0 text-[13px] text-[#4E5968] leading-[1.7] tracking-[-0.02em] break-keep">{rec.problem}</p>
                  </div>
                  <div className="bg-white rounded-[12px] p-5 border border-[#E5E8EB]">
                    <p className="m-0 mb-2 text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#3182F6]">해결 방안</p>
                    <p className="m-0 text-[13px] text-[#4E5968] leading-[1.7] tracking-[-0.02em] break-keep">{rec.solution}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-[6px]">
                    <p className="m-0 text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#8B95A1]">Before</p>
                    <pre className="m-0 p-4 rounded-[10px] bg-[#191F28] text-[#D8DCE2] text-[12px] leading-[1.7] overflow-x-auto whitespace-pre font-mono flex-1">
                      <code>{rec.codeBefore}</code>
                    </pre>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <p className="m-0 text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#00C471]">After</p>
                    <pre className="m-0 p-4 rounded-[10px] bg-[#0A2218] text-[#6EE7B7] text-[12px] leading-[1.7] overflow-x-auto whitespace-pre font-mono flex-1">
                      <code>{rec.codeAfter}</code>
                    </pre>
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
const PAGE_NAV_ITEMS = [
  { label: 'ABOUT', href: '#strengths' },
  { label: '프로젝트', href: '#stories' },
  { label: '개선 기록', href: '#news' },
  { label: 'AI효율개선', href: '#claude' },
];

type ModalType = 'yopil' | 'handi' | null;

function CareerModal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<string>('커뮤니티');
  const secCommunity = useRef<HTMLDivElement>(null);
  const secMechaArena = useRef<HTMLDivElement>(null);
  const secBanner = useRef<HTMLDivElement>(null);
  const secUiux = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isYopil = type === 'yopil';

  const yopilImages = [
    '/요필/naver01.png', '/요필/naver02.png', '/요필/naver03.png',
    '/요필/naver04.png', '/요필/naver05.png', '/요필/naver06.png',
    '/요필/naver07.png', '/요필/naver08.png', '/요필/naver09.png',
  ];

  const handiBannerImages = [
    '/핸디/FI.png', '/핸디/ILB.png', '/핸디/bi.png',
    '/핸디/banner01.png', '/핸디/05.png', '/핸디/06.png',
    '/핸디/umi.png', '/핸디/umi02.png', '/핸디/maona02.png',
    '/핸디/maona03.png', '/핸디/maona04.png',
  ];
  const handiGameImages = [
    '/핸디/이미지.png', '/핸디/이미지 2.png', '/핸디/이미지 3.png',
  ];

  const handiNav = [
    { label: '커뮤니티', ref: secCommunity },
    { label: '메카 아레나', ref: secMechaArena },
    { label: '배너', ref: secBanner },
    { label: 'UIUX', ref: secUiux },
  ];

  function scrollToSection(label: string, ref: React.RefObject<HTMLDivElement | null>) {
    setActiveSection(label);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    if (!type || isYopil || !scrollRef.current) return;

    const sections = handiNav
      .map(({ label, ref }) => ({ label, element: ref.current }))
      .filter((section): section is { label: string; element: HTMLDivElement } => Boolean(section.element));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const nextLabel = sections.find(
          (section) => section.element === visibleEntries[0].target
        )?.label;

        if (nextLabel) {
          setActiveSection(nextLabel);
        }
      },
      {
        root: scrollRef.current,
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-10% 0px -55% 0px',
      }
    );

    sections.forEach(({ element }) => observer.observe(element));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYopil, type]);

  useEffect(() => {
    if (!type) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [type]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[20px] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 px-8 pt-7 pb-5 border-b border-[#E5E8EB] flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#3182F6] m-0 mb-1">
              {isYopil ? '요필 디자인 · 2024.06 ~ 2024.09' : '㈜핸디커뮤니케이션즈 · 2022.07 ~ 2024.02'}
            </p>
            <h3 className="m-0 text-[20px] font-bold text-[#191F28] tracking-[-0.04em]">
              {isYopil ? 'Naver 디지털 ASR' : '커뮤니티 운영 & UIUX 디자인'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#F9FAFB] border border-[#E5E8EB] text-[#8B95A1] hover:bg-[#E5E8EB] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* LNB - 핸디 only */}
          {!isYopil && (
            <nav className="shrink-0 w-36 border-r border-[#E5E8EB] py-6 px-3 flex flex-col gap-1">
              {handiNav.map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(label, ref)}
                  className={`text-left w-full px-3 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
                    activeSection === label
                      ? 'bg-[#EBF3FF] text-[#3182F6]'
                      : 'text-[#8B95A1] hover:bg-[#F9FAFB] hover:text-[#191F28]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          )}

          {/* Scrollable content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-8">
            {isYopil ? (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Image src="/figma.png" alt="Figma" width={20} height={20} className="w-5 h-5 object-contain" />
                    <span className="text-[12px] font-semibold text-[#8B95A1]">Figma</span>
                  </div>
                  <p className="text-[14px] leading-[1.8] text-[#4E5968] break-keep">
                    네이버 디지털 보이는 ARS 서비스의 UI/UX 디자인 개선을 담당했습니다.<br />
                    기존 음성 ARS 대신 웹 기반 인터페이스로 사용자가 시각적으로 쉽게 안내를 받을 수 있도록 설계하여 접근성과 사용성을 향상시켰습니다.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {['UI/UX 개선', '아이콘 SVG 통일화', 'UX Writing 제안', '접근성 향상'].map((tag) => (
                      <span key={tag} className="py-1 px-3 rounded-full bg-[#F9FAFB] border border-[#E5E8EB] text-[12px] font-semibold text-[#8B95A1]">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {yopilImages.map((src, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-[#F2F4F6] border border-[#E5E8EB]">
                      <Image src={src} alt={`네이버 디지털 ASR ${i + 1}`} width={600} height={400} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* 커뮤니티 섹션 */}
                <div ref={secCommunity} className="flex flex-col gap-3 scroll-mt-6">
                  <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#3182F6] m-0">커뮤니티</p>
                  <div className="flex items-center gap-2">
                    <Image src="/photoshop.png" alt="Photoshop" width={20} height={20} className="w-5 h-5 object-contain" />
                    <span className="text-[12px] font-semibold text-[#8B95A1]">Photoshop</span>
                  </div>
                  <p className="text-[14px] leading-[1.8] text-[#4E5968] break-keep">
                    네이버 게임 <a href="https://game.naver.com/lounge/mecharena/board" target="_blank" rel="noopener noreferrer" className="text-[#3182F6] underline underline-offset-2">메카 아레나 커뮤니티</a>를 2023~2024년 운영했습니다. 유저 소통, 이벤트 기획을 담당했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['커뮤니티 운영', '이벤트 기획', '유저 소통'].map((tag) => (
                      <span key={tag} className="py-1 px-3 rounded-full bg-[#F9FAFB] border border-[#E5E8EB] text-[12px] font-semibold text-[#8B95A1]">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* 메카 아레나 섹션 */}
                <div ref={secMechaArena} className="flex flex-col gap-4 scroll-mt-6">
                  <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#3182F6] m-0">메카 아레나</p>
                  <p className="text-[14px] leading-[1.8] text-[#4E5968] break-keep">
                    커뮤니티 운영과 함께 메카 아레나 이벤트용 비주얼도 직접 제작했습니다. 공지성 전달이 바로 읽히도록 강한 타이포와 게임 톤을 살린 배너 스타일로 작업했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['이벤트 배너', '커뮤니티 운영', '프로모션 디자인'].map((tag) => (
                      <span key={tag} className="py-1 px-3 rounded-full bg-[#F9FAFB] border border-[#E5E8EB] text-[12px] font-semibold text-[#8B95A1]">{tag}</span>
                    ))}
                  </div>
                  <div className="rounded-[16px] overflow-hidden bg-[#191F28] border border-[#E5E8EB]">
                    <Image
                      src="/핸디/메크아레나.jpeg"
                      alt="메카 아레나 이벤트 배너"
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* 배너 섹션 */}
                <div ref={secBanner} className="flex flex-col gap-3 scroll-mt-6">
                  <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#3182F6] m-0">배너</p>
                  <p className="text-[14px] leading-[1.8] text-[#4E5968] break-keep">
                    마케팅 배너·사전예약 배너 등 다양한 그래픽 디자인 작업을 진행했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['배너 디자인', '그래픽 디자인'].map((tag) => (
                      <span key={tag} className="py-1 px-3 rounded-full bg-[#F9FAFB] border border-[#E5E8EB] text-[12px] font-semibold text-[#8B95A1]">{tag}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    {handiBannerImages.map((src, i) => (
                      <div key={i} className="rounded-xl overflow-hidden bg-[#F2F4F6] border border-[#E5E8EB]">
                        <Image src={src} alt={`배너 작업물 ${i + 1}`} width={600} height={400} className="w-full h-auto object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* UIUX 섹션 */}
                <div ref={secUiux} className="flex flex-col gap-3 scroll-mt-6">
                  <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#3182F6] m-0">UIUX</p>
                  <p className="text-[14px] leading-[1.8] text-[#4E5968] break-keep">
                    모바일 게임 &lsquo;마법의 잉크&rsquo; 프로젝트에 참여해 메인 화면 버튼 및 모달 창 등 게임 UI 배치와 디자인을 담당했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['UIUX 디자인', '모바일 게임', 'UI 배치'].map((tag) => (
                      <span key={tag} className="py-1 px-3 rounded-full bg-[#F9FAFB] border border-[#E5E8EB] text-[12px] font-semibold text-[#8B95A1]">{tag}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {handiGameImages.map((src, i) => (
                      <div key={i} className="rounded-lg overflow-hidden bg-[#F2F4F6] border border-[#E5E8EB]">
                        <Image src={src} alt={`게임 UI 작업물 ${i + 1}`} width={300} height={200} className="w-full h-auto object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TossPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modal, setModal] = useState<ModalType>(null);
  const [claudeTitle, setClaudeTitle] = useState('');
  const [claudeSummaryText, setClaudeSummaryText] = useState('');
  const [claudeStepTitles, setClaudeStepTitles] = useState<string[]>(() => claudeWorkflow.steps.map(() => ''));
  const [claudeStepDescs, setClaudeStepDescs] = useState<string[]>(() => claudeWorkflow.steps.map(() => ''));
  const [claudeGainLabels, setClaudeGainLabels] = useState<string[]>(() => claudeWorkflow.gains.map(() => ''));
  const [claudeGainValues, setClaudeGainValues] = useState<string[]>(() => claudeWorkflow.gains.map(() => ''));
  const [claudeGainNotes, setClaudeGainNotes] = useState<string[]>(() => claudeWorkflow.gains.map(() => ''));
  const [activeClaudeCursor, setActiveClaudeCursor] = useState<string | null>(null);

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
  const traitSectionRef = useRef<HTMLDivElement | null>(null);
  const claudeSectionRef = useRef<HTMLElement | null>(null);
  const techSectionRef = useRef<HTMLElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);
  const contactFrameRef = useRef<HTMLDivElement | null>(null);

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

      tl.to(heroCopyRef.current, { opacity: 0, y: -24, ease: "none", duration: 0.35 }, 0);
      tl.to(
        videoRef.current,
        { width: "100vw", height: "100vh", borderRadius: 0, ease: "none", duration: 0.8 },
        0
      );
      tl.fromTo(
        overlayEyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
        0.5
      );
      tl.fromTo(
        overlayTitleRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, ease: "none", duration: 0.35 },
        0.6
      );
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

    const valueCards = metricSectionRef.current.querySelectorAll<HTMLElement>('[data-metric-value]');
    valueCards.forEach((card) => {
      const raw = card.dataset.metricValue ?? '';
      const numbers = raw.match(/\d+/g);
      if (!numbers) return;

      const target = parseInt(numbers[numbers.length - 1], 10);
      const prefix = raw.startsWith('~') ? '~' : '';
      const suffix = raw.replace(/[~\d]/g, '');
      const obj = { val: 0 };

      gsap.fromTo(obj, { val: 0 }, {
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
      });
    });

    const metricCards = metricSectionRef.current.querySelectorAll<HTMLElement>('[data-metric-card]');
    const metricLabels = metricSectionRef.current.querySelectorAll<HTMLElement>('[data-metric-label]');
    const metricValues = metricSectionRef.current.querySelectorAll<HTMLElement>('[data-metric-value]');
    const metricNotes = metricSectionRef.current.querySelectorAll<HTMLElement>('[data-metric-note]');

    gsap.fromTo(
      metricCards,
      {
        opacity: 0,
        y: 30,
        backgroundColor: '#EBF3FF',
        borderColor: '#93C5FD',
        boxShadow: '0 22px 50px rgba(49,130,246,0.20)',
      },
      {
        opacity: 1,
        y: 0,
        backgroundColor: '#ffffff',
        borderColor: '#E5E8EB',
        boxShadow: '0 0 0 rgba(49,130,246,0)',
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

    gsap.fromTo(
      metricSectionRef.current.querySelectorAll('[data-metric-accent]'),
      {
        width: '0%',
        opacity: 0,
        backgroundColor: '#3182F6',
      },
      {
        width: '100%',
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: metricHeadingRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      metricValues,
      { color: '#3182F6', textShadow: '0 0 18px rgba(49,130,246,0.30)' },
      {
        color: '#191F28',
        textShadow: '0 0 0 rgba(49,130,246,0)',
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: metricHeadingRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      [...metricLabels, ...metricNotes],
      { color: '#1B64DA' },
      {
        color: '#8B95A1',
        duration: 0.9,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: metricHeadingRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!traitSectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = traitSectionRef.current.querySelectorAll<HTMLElement>('[data-trait-card]');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: traitSectionRef.current,
          start: 'top 78%',
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!techSectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = techSectionRef.current.querySelectorAll<HTMLElement>('[data-tech-card]');
    const badges = techSectionRef.current.querySelectorAll<HTMLElement>('[data-tech-badge]');
    const texts = techSectionRef.current.querySelectorAll<HTMLElement>('[data-tech-text]');

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 28,
        scale: 0.97,
        backgroundColor: '#EBF3FF',
        boxShadow: '0 18px 42px rgba(49,130,246,0.10)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        backgroundColor: '#F9FAFB',
        boxShadow: '0 0 0 rgba(49,130,246,0)',
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: techSectionRef.current,
          start: 'top 78%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      badges,
      { opacity: 0, y: 12, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: techSectionRef.current,
          start: 'top 78%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      texts,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: techSectionRef.current,
          start: 'top 76%',
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!contactSectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const items = contactSectionRef.current.querySelectorAll<HTMLElement>('[data-contact-item]');

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 28,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!contactSectionRef.current || !contactFrameRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      }).to(
        contactFrameRef.current,
        {
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          ease: 'none',
          duration: 1,
        },
        0
      );
    }, contactSectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!claudeSectionRef.current) return;

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let cancelled = false;

    const typeText = async (
      id: string,
      text: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      speed: number
    ) => {
      setActiveClaudeCursor(id);
      setter('');

      for (let index = 1; index <= text.length; index += 1) {
        if (cancelled) return;
        setter(text.slice(0, index));
        await sleep(speed);
      }
    };

    const typeArrayText = async (
      id: string,
      text: string,
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      itemIndex: number,
      speed: number
    ) => {
      setActiveClaudeCursor(id);
      setter((prev) => {
        const next = [...prev];
        next[itemIndex] = '';
        return next;
      });

      for (let index = 1; index <= text.length; index += 1) {
        if (cancelled) return;
        setter((prev) => {
          const next = [...prev];
          next[itemIndex] = text.slice(0, index);
          return next;
        });
        await sleep(speed);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setClaudeTitle('');
        setClaudeSummaryText('');
        setClaudeStepTitles(claudeWorkflow.steps.map(() => ''));
        setClaudeStepDescs(claudeWorkflow.steps.map(() => ''));
        setClaudeGainLabels(claudeWorkflow.gains.map(() => ''));
        setClaudeGainValues(claudeWorkflow.gains.map(() => ''));
        setClaudeGainNotes(claudeWorkflow.gains.map(() => ''));

        void (async () => {
          await typeText('title', 'Claude AI로 개발 효율화', setClaudeTitle, 85);
          if (cancelled) return;
          await sleep(140);

          await typeText('summary', claudeWorkflow.summary, setClaudeSummaryText, 16);
          if (cancelled) return;
          await sleep(180);

          for (const [index, step] of claudeWorkflow.steps.entries()) {
            await typeArrayText(`step-title-${index}`, step.title, setClaudeStepTitles, index, 28);
            if (cancelled) return;
            await sleep(70);
            await typeArrayText(`step-desc-${index}`, step.desc, setClaudeStepDescs, index, 11);
            if (cancelled) return;
            await sleep(180);
          }

          for (const [index, gain] of claudeWorkflow.gains.entries()) {
            await typeArrayText(`gain-value-${index}`, gain.value, setClaudeGainValues, index, 38);
            if (cancelled) return;
            await sleep(60);
            await typeArrayText(`gain-label-${index}`, gain.label, setClaudeGainLabels, index, 18);
            if (cancelled) return;
            await sleep(60);
            await typeArrayText(`gain-note-${index}`, gain.note, setClaudeGainNotes, index, 9);
            if (cancelled) return;
            await sleep(140);
          }

          setActiveClaudeCursor(null);
        })();

        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(claudeSectionRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <main className={`${styles.page} bg-white text-[#191F28]`}>
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-[20px] border-b border-[#E5E8EB]">
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div className="min-h-[64px] flex items-center justify-between gap-5">
            <a className="inline-flex items-center gap-3" href="#top" aria-label="토스용 김혜빈 포트폴리오">
              <span className="inline-flex items-center justify-center min-w-[40px] h-[40px] rounded-full bg-[#3182F6] text-white text-[15px] font-bold">
                HB
              </span>
              <span className="flex flex-col leading-none">
                <strong className="text-[14px] font-bold text-[#191F28]">For Toss</strong>
                <span className="text-[12px] text-[#8B95A1] mt-[2px]">김혜빈 포트폴리오</span>
              </span>
            </a>
            <nav className="flex items-center gap-1 flex-wrap">
              {PAGE_NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="h-9 inline-flex items-center px-[14px] rounded-full text-[14px] font-semibold text-[#4E5968] transition-colors hover:bg-[#F2F4F6] hover:text-[#191F28]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="mailto:hyebinkimdesign@gmail.com"
                className="h-9 inline-flex items-center px-[16px] rounded-full text-[14px] font-bold bg-[#3182F6] text-white hover:bg-[#1B64DA] transition-colors ml-2"
              >
                연락하기
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* 히어로 — GSAP pin 섹션 */}
      <div
        ref={heroRef}
        id="top"
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end pb-0"
        style={{
          background: 'radial-gradient(circle at 15% 10%, rgba(49,130,246,0.08), transparent 28%), radial-gradient(circle at 85% 15%, rgba(49,130,246,0.05), transparent 26%), linear-gradient(180deg,#EEF5FF 0%,#fff 40%,#fff 100%)',
        }}
      >
        {/* 좌상단 텍스트 */}
        <div
          ref={heroCopyRef}
          className="absolute z-2 text-left"
          style={{
            top: 'clamp(72px, 11vh, 120px)',
            left: 'clamp(24px, 5vw, 80px)',
            maxWidth: 'min(560px, 46vw)',
            willChange: 'opacity, transform',
          }}
        >
          <p className="inline-flex items-center min-h-9 m-0 px-3.5 rounded-full bg-[#3182F6]/10 text-[#3182F6] text-[13px] font-bold tracking-[0.02em]">
            풀스택 개발 · 디자인 · SEO · 데이터 분석을 하는
          </p>
          <h1
            className="mt-5 mb-20 text-[#191F28] font-bold leading-[1.02] tracking-[-0.06em] break-keep"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 5.1rem)', textWrap: 'balance' }}
          >
            웹 개발자 김혜빈입니다
          </h1>
        </div>

        {/* 영상 카드 */}
        <div
          ref={videoRef}
          className="relative overflow-hidden bg-[#191F28] shrink-0"
          style={{
            width: '90vw',
            height: '62vh',
            borderRadius: '20px',
            boxShadow: '0 24px 72px rgba(0,0,0,0.18)',
            transform: 'translateY(24px)',
            willChange: 'width, height, border-radius',
          }}
        >
          <video
            className="w-full h-full object-cover bg-[#191F28]"
            src="/video/hero_dangn_2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div
            className="absolute inset-0 flex flex-col justify-end pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.42) 100%)',
              paddingTop: 'clamp(24px, 3.2vw, 52px)',
              paddingInline: 'clamp(24px, 3.2vw, 52px)',
              paddingBottom: 'clamp(64px, 6vw, 112px)',
            }}
          >
            <p
              ref={overlayEyebrowRef}
              className="m-0 mb-4 text-white/75 font-semibold tracking-[-0.02em] break-keep opacity-0"
              style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)', willChange: 'opacity, transform' }}
            >
              디자인 · 개발 · SEO 컨설팅 경험으로
            </p>
            <h2
              ref={overlayTitleRef}
              className="mt-3 mb-0 text-white font-bold leading-[1.12] tracking-[-0.05em] break-keep opacity-0"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 4.2rem)', willChange: 'opacity, transform' }}
            >
              토스처럼 생활에 스며드는 경험을 만들고 싶습니다
            </h2>
            <p
              ref={overlayBodyRef}
              className="mt-4 mb-0 text-white/65 leading-[1.6] tracking-[-0.02em] font-medium break-keep opacity-0"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', willChange: 'opacity, transform' }}
            >
              실서비스를 직접 만들며, LCP 28% 단축 · 이미지 최적화 40~70%를 달성했습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 개선 기록 섹션 */}
      <section className="py-[88px] bg-[#F9FAFB]" id="news">
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div className="flex items-end justify-between gap-5 mb-10">
            <div>
              <p className="mb-[10px] text-[#3182F6] text-[16px] font-bold tracking-[-0.02em]">개선 기록을 확인해보세요!</p>
              <h2 className="m-0 text-[#191F28] font-bold leading-[1.2] tracking-[-0.05em] break-keep" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)' }}>
                개선 기록
              </h2>
            </div>
            <Link
              href="/foryou/daangn/improvements"
              className="inline-flex items-center h-11 px-5 rounded-full border border-[#E5E8EB] text-[#191F28] bg-white text-[14px] font-bold flex-shrink-0 hover:bg-[#F2F4F6] transition-colors"
            >
              전체 기록 보러가기
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-5 max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
            {news.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex flex-col gap-[16px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_rgba(25,31,40,0.08)]"
              >
                <div className="rounded-[16px] overflow-hidden aspect-video bg-[#F2F4F6]">
                  <Image src={item.image} alt={item.title} width={600} height={338} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <strong className="text-[20px] leading-[1.45] break-keep tracking-[-0.04em] text-[#191F28]">{item.title}</strong>
                  <span className="text-[#8B95A1] text-[13px] leading-[1.5]">{item.date}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-20">
            <PerfAccordion records={perfRecords} />
          </div>
        </div>
      </section>

      {/* Core Strengths 섹션 */}
      <section id="strengths" className="py-[88px] bg-white">
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div className="mb-10">
            <p className="mb-2.5 text-[#3182F6] text-[16px] font-bold tracking-[-0.02em]">Core Strengths</p>
            <h2 className="m-0 text-[#191F28] font-bold leading-[1.2] tracking-[-0.05em] break-keep" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)' }}>
              더 쉽고 편한 경험이 되도록 구현하고, <br/> 데이터를 바탕으로 개선합니다
            </h2>
          </div>

          {/* 프로필 카드 */}
          <div className="bg-white border border-[#E5E8EB] rounded-[24px] overflow-hidden mb-8">
            <div className="flex gap-7 items-start p-9 border-b border-[#E5E8EB]">
              <div className="shrink-0 h-64 w-auto rounded-[16px] overflow-hidden bg-[#F9FAFB] border border-[#E5E8EB]">
                <Image src={about.photo} alt={about.name} width={256} height={256} className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="m-0 text-[20px] font-extrabold text-[#191F28]">
                  {about.name}
                  <span className="text-[14px] font-medium text-[#8B95A1] ml-2">{about.role}</span>
                </p>
                <p className="m-0 text-[15px] leading-[1.75] text-[#191F28] max-w-150">{about.intro}</p>
                <div className="flex flex-wrap gap-1.5">
                  {about.tags.map((tag) => (
                    <span key={tag} className="py-1 px-3 rounded-full bg-[#F2F4F6] border border-[#E5E8EB] text-[12px] font-semibold text-[#4E5968]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-9 py-7 border-b border-[#E5E8EB]">
              <div className="grid grid-cols-3 gap-5 max-[820px]:grid-cols-1">
                {experts.map((expert, idx) => {
                  const Icon = STRENGTH_ICONS[idx];
                  const isActive = idx === activeIdx;
                  return (
                    <article
                      key={expert.title}
                      className={`rounded-[16px] p-6 flex flex-col border transition-all duration-300 ${
                        isActive
                          ? 'border-[#3182F6] bg-[#EBF3FF] shadow-[0_8px_24px_rgba(49,130,246,0.12)]'
                          : 'border-[#E5E8EB] bg-[#F9FAFB]'
                      }`}
                    >
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-[12px] border mb-4 flex-shrink-0 transition-colors duration-300 ${
                        isActive ? 'border-[#3182F6]/20 bg-white text-[#3182F6]' : 'border-[#E5E8EB] bg-white text-[#3182F6]'
                      }`}>
                        <Icon />
                      </div>
                      <h3 className="m-0 mb-3 text-[#191F28] text-[15px] font-bold tracking-[-0.03em] break-keep">
                        {expert.title}
                      </h3>
                      <ul className="list-none m-0 p-0 flex flex-col gap-2">
                        {expert.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-[14px] text-[#4E5968] leading-[1.6] tracking-[-0.02em] break-keep">
                            <span className="inline-block w-1 h-1 rounded-full bg-[#3182F6] shrink-0 mt-2" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* 경력 */}
            <div className="px-9 py-7 border-b border-[#E5E8EB]">
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#8B95A1] m-0 mb-4">경력</p>
              <div className="flex flex-col gap-6">
                {about.careers.map((c) => {
                  const isGlobal = c.company.includes('글로벌엠아이지');
                  const isYopil = c.company.includes('요필');
                  const isHandi = c.company.includes('핸디');
                  return (
                    <div key={c.company} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <strong className="text-[15px] font-bold text-[#191F28]">{c.company}</strong>
                        <span className="text-[12px] text-[#8B95A1]">{c.period}</span>
                        {isGlobal && (
                          <a href="#stories" className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#3182F6] hover:underline">
                            포트폴리오 보기 →
                          </a>
                        )}
                        {isYopil && (
                          <button
                            onClick={() => setModal('yopil')}
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#3182F6] hover:underline bg-none border-none cursor-pointer p-0"
                          >
                            포트폴리오 보기 →
                          </button>
                        )}
                        {isHandi && (
                          <button
                            onClick={() => setModal('handi')}
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#3182F6] hover:underline bg-none border-none cursor-pointer p-0"
                          >
                            포트폴리오 보기 →
                          </button>
                        )}
                      </div>
                      <p className="m-0 text-[13px] text-[#3182F6] font-semibold">{c.role}</p>
                      <ul className="mt-1.5 m-0 p-0 list-none flex flex-col gap-1">
                        {c.tasks.map((t) => (
                          <li key={t} className="text-[14px] text-[#8B95A1] pl-3.5 relative leading-[1.6] before:content-['–'] before:absolute before:left-0 before:text-[#D1D6DB]">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 학력 */}
            <div className="px-9 py-7 border-b border-[#E5E8EB]">
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#8B95A1] m-0 mb-4">학력</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <strong className="text-[15px] font-bold text-[#191F28]">{about.education.school}</strong>
                  <span className="text-[12px] text-[#8B95A1]">{about.education.period}</span>
                </div>
                <p className="m-0 text-[13px] text-[#3182F6] font-semibold">
                  {about.education.major} · GPA {about.education.gpa}
                </p>
              </div>
            </div>

            {/* 강점/약점 */}
            <div ref={traitSectionRef} className="grid grid-cols-2 gap-6 px-9 py-7">
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#8B95A1] m-0 mb-1">이런 점이 강점이에요</p>
                {about.strengths.map((s) => (
                  <div
                    key={s.title}
                    data-trait-card
                    className="flex flex-col gap-2 bg-[#F9FAFB] border border-[#E5E8EB] rounded-[16px] p-5 transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#EBF3FF] hover:border-[#93C5FD] hover:shadow-[0_12px_28px_rgba(49,130,246,0.08)]"
                  >
                    <span className="text-[22px]">{s.emoji}</span>
                    <strong className="text-[14px] font-bold text-[#191F28]">{s.title}</strong>
                    <p className="m-0 text-[13px] text-[#8B95A1] leading-[1.6]">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#8B95A1] m-0 mb-1">솔직히 이런 점은 부족해요</p>
                {about.weaknesses.map((w) => (
                  <div
                    key={w.title}
                    data-trait-card
                    className="flex flex-col gap-2 bg-[#F2F4F6] border border-[#DDE0E4] rounded-[16px] p-5 transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#EBF3FF] hover:border-[#93C5FD] hover:shadow-[0_12px_28px_rgba(49,130,246,0.08)]"
                  >
                    <span className="text-[22px]">{w.emoji}</span>
                    <strong className="text-[14px] font-bold text-[#191F28]">{w.title}</strong>
                    <p className="m-0 text-[13px] text-[#8B95A1] leading-[1.6]">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section ref={techSectionRef} className="py-[88px] bg-white">
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div className="mb-10">
            <h2 className="m-0 text-[#191F28] font-bold leading-[1.2] tracking-[-0.05em] break-keep" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)' }}>
              사용하는 기술 스택
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
            {techStack.map((tech) => (
              <div key={tech.name} data-tech-card className="rounded-[16px] p-6 bg-[#F9FAFB] flex flex-col items-start gap-[12px] border border-[#E5E8EB]">
                <div data-tech-badge>
                  <Image src={tech.image} alt={tech.name} width={160} height={28} unoptimized style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
                </div>
                <div className="flex flex-col gap-1">
                  <strong data-tech-text className="text-[14px] font-bold text-[#191F28] tracking-[-0.03em]">{tech.name}</strong>
                  <span data-tech-text className="text-[13px] text-[#8B95A1] leading-[1.55] tracking-[-0.02em] break-keep">{tech.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 실서비스 지표 섹션 */}
      <section ref={metricSectionRef} className="py-[88px] bg-[#F9FAFB]">
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div ref={metricHeadingRef} className="mb-10">
            <p className="mb-[10px] text-[#3182F6] text-[16px] font-bold tracking-[-0.02em]">실서비스 기준</p>
            <h2 className="m-0 text-[#191F28] font-bold leading-[1.2] tracking-[-0.05em] break-keep" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)' }}>
              직접 설계하고 배포한 서비스들
            </h2>
          </div>
          <div className="grid grid-cols-4 border border-[#E5E8EB] rounded-[20px] overflow-hidden max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
            {stats.map((item) => (
              <article
                key={item.label}
                data-metric-card
                className="relative overflow-hidden p-9 flex flex-col gap-2 border-r border-r-[#E5E8EB] last:border-r-0 bg-white transition-colors hover:bg-[#F9FAFB]"
              >
                <span
                  data-metric-accent
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-[3px] rounded-r-full opacity-0"
                />
                <p data-metric-label className="m-0 text-[#8B95A1] text-[13px] font-semibold">{item.label}</p>
                <strong
                  data-metric-value={item.value}
                  className="font-extrabold leading-[1.1] text-[#191F28]"
                  style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', letterSpacing: '-0.04em' }}
                >
                  {item.value}
                </strong>
                <span data-metric-note className="text-[13px] text-[#8B95A1] mt-[2px]">{item.note}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects 섹션 */}
      <section className="py-[88px]" id="stories">
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div className="mb-10">
            <p className="mb-2.5 text-[#3182F6] text-[16px] font-bold tracking-[-0.02em]">Projects</p>
            <h2 className="m-0 text-[#191F28] font-bold leading-[1.2] tracking-[-0.05em] break-keep" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)' }}>
              실제 운영 중인 사이트를 직접 설계·개발했습니다
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5 max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
            {stories.map((story) => (
              <article
                key={story.title}
                className="flex flex-col rounded-[20px] p-5 bg-white border border-[#E5E8EB] gap-3.5 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_rgba(25,31,40,0.08)] cursor-pointer"
                role="link"
                tabIndex={0}
                onClick={() => window.open(story.href, '_blank', 'noopener,noreferrer')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.open(story.href, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <StoryThumb thumb={story.thumb} />
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[#3182F6] text-[13px] font-bold">
                    <span>{story.category}</span>
                    <span className="text-[#8B95A1] text-[12px] font-semibold">기여도 {story.contribution}</span>
                  </div>
                  <h3 className="m-0 text-[#191F28] text-[17px] leading-[1.4] tracking-[-0.04em] font-bold break-keep">
                    {story.title}
                  </h3>
                  <div className="flex flex-wrap gap-[5px]">
                    {story.tools.map((t) => (
                      <span key={t} className="py-[2px] px-2 rounded-full border border-[#E5E8EB] text-[11px] font-semibold text-[#4E5968]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold pt-2 w-full border-t border-[#E5E8EB] text-[#8B95A1]">Highlights</p>
                  <ul className="list-none m-0 p-0 flex flex-col gap-[5px]">
                    {story.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-[6px] text-[13px] text-[#4E5968] leading-[1.55] tracking-[-0.02em] break-keep">
                        <span className="inline-block w-1 h-1 rounded-full bg-[#3182F6] flex-shrink-0 mt-[7px]" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={story.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-1 mt-4 text-[14px] font-bold text-[#4E5968] transition-colors hover:text-[#3182F6]"
                  >
                    자세히 보기 &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Claude AI 워크플로우 섹션 */}
      <section
        id="claude"
        ref={claudeSectionRef}
        className="py-[88px]"
        style={{ background: 'linear-gradient(160deg, #0D1B2E 0%, #141F32 100%)' }}
      >
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div className="mb-10">
            <p className="mb-[10px] text-[#3182F6]/90 text-[16px] font-bold tracking-[-0.02em]">AI-Driven Workflow</p>
            <h2
              className="m-0 text-[#E8EAED] font-bold leading-[1.2] tracking-[-0.05em] break-keep"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)' }}
            >
              <span className="inline-flex items-center">
                <span>{claudeTitle || ' '}</span>
                <span
                  aria-hidden="true"
                  className={`ml-1 inline-block h-[0.95em] w-[2px] rounded-full bg-[#3182F6] ${
                    activeClaudeCursor === 'title' ? 'animate-pulse' : 'opacity-70'
                  }`}
                />
              </span>
            </h2>
          </div>
          <p className="max-w-[680px] text-[15px] font-medium leading-[1.8] text-[#A0A8B4] tracking-[-0.03em] break-keep m-0 mb-[52px]">
            {claudeSummaryText || ' '}
            {activeClaudeCursor === 'summary' && (
              <span aria-hidden="true" className="ml-1 inline-block h-[0.95em] w-[2px] rounded-full bg-[#3182F6] animate-pulse align-[-0.05em]" />
            )}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-[52px] max-[1100px]:grid-cols-1">
            {claudeWorkflow.steps.map((s, index) => (
              <div
                key={s.step}
                className="rounded-[16px] p-[24px] flex flex-col gap-[14px]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-[10px]">
                  <span
                    className="text-[11px] font-bold text-[#3182F6] tracking-[-0.01em] rounded-full py-[2px] px-[10px] flex-shrink-0"
                    style={{ background: 'rgba(49,130,246,0.12)', border: '1px solid rgba(49,130,246,0.20)' }}
                  >
                    {s.step}
                  </span>
                  <h3 className="m-0 text-[15px] font-bold text-[#E8EAED] tracking-[-0.04em] break-keep">
                    {claudeStepTitles[index] || ' '}
                    {activeClaudeCursor === `step-title-${index}` && (
                      <span aria-hidden="true" className="ml-1 inline-block h-[0.95em] w-[2px] rounded-full bg-[#3182F6] animate-pulse align-[-0.05em]" />
                    )}
                  </h3>
                </div>
                <p className="m-0 text-[13px] text-[#A0A8B4] leading-[1.7] tracking-[-0.02em] break-keep">
                  {claudeStepDescs[index] || ' '}
                  {activeClaudeCursor === `step-desc-${index}` && (
                    <span aria-hidden="true" className="ml-1 inline-block h-[0.95em] w-[2px] rounded-full bg-[#3182F6] animate-pulse align-[-0.05em]" />
                  )}
                </p>
                <div className="flex flex-wrap gap-[5px]">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="py-[2px] px-2 rounded-full text-[11px] font-semibold text-[#8B95A1] tracking-[-0.01em]"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <pre className="m-0 p-4 rounded-[10px] bg-[#0D1B2E] text-[#D8DCE2] text-[12px] leading-[1.7] overflow-x-auto whitespace-pre font-mono flex-1">
                  <code>{s.code}</code>
                </pre>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2">
            {claudeWorkflow.gains.map((g, index) => (
              <div
                key={g.label}
                className="py-[28px] px-[24px] rounded-[16px] flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <strong
                  className="text-[#3182F6] font-bold leading-[1.15] tracking-[-0.05em]"
                  style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)' }}
                >
                  {claudeGainValues[index] || ' '}
                  {activeClaudeCursor === `gain-value-${index}` && (
                    <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[2px] rounded-full bg-[#3182F6] animate-pulse align-[-0.05em]" />
                  )}
                </strong>
                <p className="m-0 text-[14px] font-bold text-[#B8BFC8] tracking-[-0.03em] break-keep">
                  {claudeGainLabels[index] || ' '}
                  {activeClaudeCursor === `gain-label-${index}` && (
                    <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[2px] rounded-full bg-[#3182F6] animate-pulse align-[-0.05em]" />
                  )}
                </p>
                <span className="text-[12px] text-[#8B95A1] leading-[1.55] tracking-[-0.01em] break-keep">
                  {claudeGainNotes[index] || ' '}
                  {activeClaudeCursor === `gain-note-${index}` && (
                    <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[2px] rounded-full bg-[#3182F6] animate-pulse align-[-0.05em]" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section ref={contactSectionRef} className="relative h-screen text-white overflow-hidden flex items-center justify-center bg-[#0D1B2E]">
        <div
          ref={contactFrameRef}
          className="relative overflow-hidden"
          style={{
            width: '88vw',
            height: '64vh',
            borderRadius: '24px',
            boxShadow: '0 24px 72px rgba(0,0,0,0.32)',
            willChange: 'width, height, border-radius',
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/video/hero_dangn_2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(13,27,46,0.70) 0%, rgba(8,16,28,0.88) 100%)',
            }}
          />
          <div className="relative w-full h-full flex items-center justify-center px-6">
            <div className="flex flex-col items-center text-center gap-6">
              <p data-contact-item className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#3182F6] m-0">Contact</p>
              <h2 data-contact-item className="font-bold leading-[1.3] m-0 text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                함께 만들고 싶은 게 있다면<br />언제든 연락 주세요
              </h2>
              <div data-contact-item className="flex gap-4 flex-wrap mt-2 justify-center">
                <a
                  href="mailto:hyebinkimdesign@gmail.com"
                  className="inline-flex items-center py-[14px] px-7 bg-[#3182F6] text-white rounded-full text-[15px] font-semibold transition-opacity hover:opacity-85"
                >
                  hyebinkimdesign@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-14 border-t border-[#E5E8EB] bg-[#F9FAFB]">
        <div className="w-[min(1152px,calc(100vw-48px))] mx-auto">
          <div className="flex justify-between gap-12 max-[820px]:flex-col">
            <div className="flex flex-col gap-[10px]">
              <p className="text-[16px] font-bold text-[#191F28] m-0">Hyebin Kim</p>
              <p className="text-[14px] text-[#8B95A1] leading-[1.6] m-0">기획부터 개발, 성능 개선과 배포까지<br />직접 만드는 프론트엔드·풀스택 개발자입니다.</p>
              <p className="text-[13px] text-[#8B95A1] m-0 mt-auto opacity-60">© 2026 Hyebin Kim</p>
            </div>
            <nav className="flex gap-12 flex-shrink-0">
              <div className="flex flex-col gap-[10px]">
                <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#191F28] m-0 mb-1">페이지</p>
                <Link href="/" className="text-[14px] text-[#8B95A1] transition-colors hover:text-[#191F28]">포트폴리오 메인</Link>
                <a href="#stories" className="text-[14px] text-[#8B95A1] transition-colors hover:text-[#191F28]">프로젝트 보기</a>
                <a href="/foryou/daangn/improvements" className="text-[14px] text-[#8B95A1] transition-colors hover:text-[#191F28]">개선 기록</a>
              </div>
              <div className="flex flex-col gap-[10px]">
                <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#191F28] m-0 mb-1">연락</p>
                <a href="mailto:hyebinkimdesign@gmail.com" className="text-[14px] text-[#8B95A1] transition-colors hover:text-[#191F28]">이메일</a>
              </div>
            </nav>
          </div>
        </div>
      </footer>

      <CareerModal type={modal} onClose={() => setModal(null)} />
    </main>
  );
}
