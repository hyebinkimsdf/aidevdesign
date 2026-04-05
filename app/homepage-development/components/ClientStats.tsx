"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 28, suffix: "+", label: "완성된 프로젝트", color: "#a855f7" },
  { value: 100, suffix: "%", label: "납기 준수율", color: "#ec4899" },
  { value: 4.9, suffix: "", label: "평균 클라이언트 만족도", color: "#f97316", decimals: 1 },
  { value: 3, suffix: "일~", label: "최단 납기", color: "#06b6d4" },
];

function useCountUp(target: number, decimals: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(parseFloat((target * eased).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration, decimals]);
  return val;
}

function StatItem({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const decimals = stat.decimals ?? 0;
  const count = useCountUp(stat.value, decimals, 1600, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <div className="text-4xl font-bold sm:text-5xl xl:text-6xl tabular-nums leading-none"
        style={{ color: stat.color }}>
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{stat.suffix}
      </div>
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#94a3b8" }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function ClientStats() {
  return (
    <section
      aria-label="통계"
      className="px-6 py-24"
      style={{ background: "#f8fafc" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#0f172a" }}>
            핵심 지표
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: "#111827", letterSpacing: "-0.03em" }}>
            데이터로 확인하는 신뢰
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7" style={{ color: "#475569" }}>
            프로젝트 성과와 납기, 만족도를 수치로 보여드립니다. 모든 데이터는 실제 클라이언트 경험을 바탕으로 합니다.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
              <StatItem stat={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
