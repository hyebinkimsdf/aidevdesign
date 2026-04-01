import type { Metadata } from "next";
import ClientNav from "../components/ClientNav";

export const metadata: Metadata = {
  title: "디자인 전문 | Hyebin Studio",
  description: "아트워크 중심의 디자인 전문 페이지. 심플하지만 강력한 비주얼, 큰 이미지와 생동감 있는 레이아웃.",
};

export default function ClientDesignPage() {
  return (
    <>
      <ClientNav />
      <main className="bg-[#f8fafc] text-slate-950">
        <section className="relative overflow-hidden px-6 pt-32 pb-24 lg:pt-36 lg:pb-32">
          <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-200 to-cyan-200 opacity-60 blur-3xl" />
          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-300 to-violet-200 opacity-50 blur-3xl" />

          <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-center">
            <div className="relative z-10 max-w-2xl space-y-8">
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 shadow-sm">
                Design Studio</span>
              <h1 className="text-6xl font-semibold leading-tight tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                디자인을 전문으로,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-600">
                  아트워크처럼 풀어냅니다.
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                크고 단순한 텍스트, 넉넉한 여백, 이미지를 활용한 압도적인 비주얼. 디테일은 정교하게, 레이아웃은 대담하게 구성합니다.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                  <p className="text-4xl font-bold text-slate-900">브랜딩</p>
                  <p className="mt-3 text-sm text-slate-500">이미지와 시스템으로 감성을 설계합니다.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                  <p className="text-4xl font-bold text-slate-900">UI/UX</p>
                  <p className="mt-3 text-sm text-slate-500">심플하지만 깊은 사용 경험을 남깁니다.</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex-1">
              <div className="design-image-hero overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-950 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.12)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_35%)] opacity-90" />
                <div className="absolute inset-y-0 left-8 w-1/3 rounded-[2rem] bg-gradient-to-b from-white/80 to-slate-300/20 blur-2xl opacity-60" />
                <div className="relative flex h-full flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur">
                      Art Direction</span>
                    <div className="rounded-[2rem] border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                      <p className="text-xl font-semibold text-white">이미지를 크게, 레이어를 다양하게.</p>
                      <p className="mt-3 text-sm leading-6 text-slate-200/80">강렬한 비주얼 블록과 간결한 메시지를 결합한 디자인.</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="h-40 rounded-[2rem] bg-gradient-to-br from-sky-400 via-cyan-300 to-slate-200 shadow-xl shadow-sky-300/25 animate-design-float" />
                    <div className="h-40 rounded-[2rem] bg-gradient-to-br from-violet-500 via-fuchsia-400 to-pink-300 shadow-xl shadow-fuchsia-300/25 animate-design-slow-spin" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-24">
          <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-gradient-to-r from-sky-200 to-cyan-100 opacity-40 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-gradient-to-r from-pink-200 to-violet-200 opacity-40 blur-3xl" />

          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Design System</p>
              <h2 className="text-5xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
                단순하지만 강렬한 메시지,
                <span className="block text-slate-900">다양한 레이아웃 언어로 풀어냅니다.</span>
              </h2>
              <p className="max-w-xl text-base leading-8 text-slate-600">
                스크롤마다 변하는 리듬, 너비가 다른 이미지 블록, 그리고 작은 움직임이 쌓여서 시선을 이끄는 페이지를 만듭니다.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-lg font-semibold text-slate-900">컬러 모션</p>
                  <p className="mt-2 text-sm text-slate-500">색감이 자연스럽게 이어지는 그래픽 패턴.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-lg font-semibold text-slate-900">타이포 그래피</p>
                  <p className="mt-2 text-sm text-slate-500">크고 단순한 텍스트로 강한 인상을 남깁니다.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="design-gallery-card design-image-card-1" />
              <div className="design-gallery-card design-image-card-2" />
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Motion & Layout</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">다양한 리듬의 페이지를 경험하세요.</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_rgba(15,23,42,0.12)]">
                <div className="mb-6 flex h-56 items-end overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 to-cyan-300 shadow-[0_15px_40px_rgba(56,189,248,0.35)]">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.85),_transparent_50%)]" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">스케일 이미지</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">큰 비주얼 블록으로 리드감을 만듭니다.</p>
              </article>
              <article className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_rgba(15,23,42,0.12)]">
                <div className="mb-6 flex h-56 items-end overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-500 to-fuchsia-400 shadow-[0_15px_40px_rgba(168,85,247,0.28)] animate-design-float">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_left,_rgba(255,255,255,0.9),_transparent_40%)]" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">페이드 모션</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">부드러운 움직임으로 안정적인 리듬을 만듭니다.</p>
              </article>
              <article className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_rgba(15,23,42,0.12)]">
                <div className="mb-6 flex h-56 items-end overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-400 to-lime-300 shadow-[0_15px_40px_rgba(34,197,94,0.28)] animate-design-slide">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.9),_transparent_45%)]" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">레이어 플레이</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">다양한 레이어와 깊이감 있는 구성을 사용합니다.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
