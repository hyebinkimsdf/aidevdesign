"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
};

export default function ClientCTA() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setDetailsOpen(true);
      setErrorMessage("이름, 전화번호, 문의 내용은 필수입니다.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    const response = await fetch("/api/client-inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setErrorMessage(data.message ?? "문의 접수 중 오류가 발생했습니다.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
    setSubmitting(false);
  };

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: "#f8fafc" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-20 -right-20 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-0 right-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p
          className="mb-5 font-mono text-xs uppercase tracking-widest"
          style={{ color: "#a855f7" }}
        >
          문의하기
        </p>

        <h2
          id="cta-heading"
          className="mb-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
          style={{ color: "#111827" }}
        >
          새 프로젝트를 <span className="cl-gradient-text">시작할 준비</span>
          가 됐나요?
        </h2>

        <p
          className="mx-auto mb-10 max-w-md text-sm leading-7"
          style={{ color: "#475569" }}
        >
          20분 무료 상담으로 방향을 잡아드립니다.
          <br />
          예산이나 일정이 불확실해도 괜찮습니다.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-10 grid max-w-3xl gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="client-name"
              label="이름 *"
              value={form.name}
              placeholder="홍길동"
              onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
            />
            <Field
              id="client-phone"
              label="전화번호 *"
              value={form.phone}
              placeholder="010-1234-5678"
              onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
            />
          </div>

          <button
            type="button"
            onClick={() => setDetailsOpen((prev) => !prev)}
            aria-expanded={detailsOpen}
            aria-controls="client-detail-fields"
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/40"
          >
            <span>
              {detailsOpen ? "상세 입력 닫기" : "이메일·회사명·문의내용 입력하기"}
            </span>
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600"
              aria-hidden="true"
            >
              {detailsOpen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
          </button>

          <div
            id="client-detail-fields"
            className={`grid overflow-hidden transition-all duration-300 ${
              detailsOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`grid gap-4 pt-3 transition-all duration-300 sm:grid-cols-2 ${
                detailsOpen ? "translate-y-0" : "-translate-y-1"
              }`}
            >
              <Field
                id="client-email"
                label="이메일"
                value={form.email}
                placeholder="name@company.com"
                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
              />
              <Field
                id="client-company"
                label="회사명"
                value={form.company}
                placeholder="회사 또는 브랜드명"
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, company: value }))
                }
              />

              <label
                className="text-sm font-medium text-slate-700 sm:col-span-2"
                htmlFor="client-message"
              >
                문의 내용 *
              </label>
              <textarea
                id="client-message"
                value={form.message}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, message: event.target.value }))
                }
                placeholder="원하는 페이지 유형, 일정, 예산, 참고 사이트를 자유롭게 적어주세요."
                required
                className="min-h-28 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:col-span-2"
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          {submitted && !errorMessage && (
            <p className="text-sm text-emerald-600">
              상담 요청이 접수되었습니다. 24시간 내로 연락드리겠습니다.
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              필수 항목을 입력하면 바로 접수됩니다.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ boxShadow: "0 0 30px rgba(59,130,246,0.24)" }}
            >
              {submitting ? "접수 중..." : "상담 요청하기"}
            </button>
          </div>
        </form>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:hello@hyebin.dev"
            className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:border-blue-300 hover:text-blue-700"
          >
            이메일 바로 보내기
          </a>
          <a
            href="tel:010-0000-0000"
            className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:border-blue-300 hover:text-blue-700"
          >
            전화 문의
          </a>
        </div>

        <div className="mx-auto flex max-w-lg flex-wrap justify-center gap-x-8 gap-y-3">
          {[
            "✓ 계약서 작성",
            "✓ 중간 결과물 공유",
            "✓ 피드백 2라운드 포함",
            "✓ 소스코드 전달",
          ].map((item) => (
            <span key={item} className="text-xs" style={{ color: "#64748b" }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <label className="text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </>
  );
}
