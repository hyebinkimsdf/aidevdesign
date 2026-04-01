"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "상담 & 요건 수집",
    desc: "목적, 타깃 고객, 예산, 일정을 파악합니다. 20분 무료 상담으로 방향을 잡습니다.",
    detail: "화상 or 채팅 · 무료",
    accent: "#8b5cf6",
  },
  {
    num: "02",
    title: "기획 & 구조 설계",
    desc: "페이지 구조(와이어프레임)와 콘텐츠 흐름을 정리합니다. 방향이 확정되면 진행합니다.",
    detail: "1–2일",
    accent: "#a855f7",
  },
  {
    num: "03",
    title: "디자인 & 프로토타입",
    desc: "브랜드 컬러·폰트 기반의 고퀄리티 UI를 완성합니다. Figma로 미리보기를 공유합니다.",
    detail: "2–3일",
    accent: "#c026d3",
  },
  {
    num: "04",
    title: "개발 & 최적화",
    desc: "Next.js로 퍼포먼스·SEO·반응형을 갖춘 실제 사이트를 구현합니다.",
    detail: "2–4일",
    accent: "#ec4899",
  },
  {
    num: "05",
    title: "검토 · 수정 · 론칭",
    desc: "피드백 2라운드를 포함합니다. 최종 확인 후 도메인 연결 및 배포까지 완료합니다.",
    detail: "1–2일 · 도메인 연결 포함",
    accent: "#f97316",
  },
];

export default function ClientProcess() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".cl-step-left, .cl-step-right");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      aria-labelledby="process-heading"
      className="px-6 py-24"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10" style={{ background: "#0ea5e9" }} />
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#0ea5e9" }}>
              진행 프로세스
            </p>
          </div>
          <h2 id="process-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: "#111827" }}>
            의뢰부터 론칭까지 <span className="ap-gradient-text">5단계</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7" style={{ color: "#475569" }}>
            단계별 커뮤니케이션과 결과물 확인으로 안정감 있는 프로젝트 진행을 제공합니다.
          </p>
        </div>

        <div className="grid gap-5">
          {steps.map((step, i) => (
            <div key={step.num} className={i % 2 === 0 ? "cl-step-left" : "cl-step-right"}>
              <article className="rounded-[2rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full shrink-0 font-mono text-sm font-semibold"
                    style={{
                      background: `${step.accent}18`,
                      color: step.accent,
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase"
                      style={{
                        background: `${step.accent}12`,
                        color: step.accent,
                      }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7" style={{ color: "#475569" }}>
                  {step.desc}
                </p>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div
            className="inline-flex flex-col gap-2 rounded-[2rem] border border-slate-200 bg-white px-6 py-6 text-center shadow-sm sm:flex-row sm:items-center"
          >
            <span className="font-mono text-xs text-slate-500">⏱ 평균 총 납기</span>
            <span className="text-lg font-semibold text-slate-900">7–12일</span>
            <span className="text-sm text-slate-500">(프로젝트 규모에 따라 조율 가능)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
