"use client";

import { FormEvent, useMemo, useState } from "react";
import type { PortfolioItem, PortfolioStatus } from "@/lib/portfolio-types";

type FormState = {
  route: string;
  title: string;
  summary: string;
  stackInput: string;
  status: PortfolioStatus;
};

type StatusFilter = "all" | PortfolioStatus;

const initialForm: FormState = {
  route: "",
  title: "",
  summary: "",
  stackInput: "",
  status: "published",
};

function parseStack(input: string) {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminDashboard({
  initialItems,
}: {
  initialItems: PortfolioItem[];
}) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [activeRoute, setActiveRoute] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  async function loadItems() {
    setLoading(true);
    const response = await fetch("/api/portfolio-items", { cache: "no-store" });
    const data = (await response.json()) as { items: PortfolioItem[] };
    setItems(data.items);
    setLoading(false);
  }

  const routes = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.route))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [items]);

  const routeSummary = useMemo(() => {
    return routes.map((route) => {
      const routeItems = items.filter((item) => item.route === route);
      return {
        route,
        total: routeItems.length,
        published: routeItems.filter((item) => item.status === "published").length,
      };
    });
  }, [items, routes]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const routeMatch = activeRoute === "all" || item.route === activeRoute;
      const statusMatch = statusFilter === "all" || item.status === statusFilter;
      const q = search.trim().toLowerCase();
      const searchMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.route.toLowerCase().includes(q) ||
        item.stack.join(" ").toLowerCase().includes(q);

      return routeMatch && statusMatch && searchMatch;
    });
  }, [activeRoute, items, search, statusFilter]);

  const publishedCount = items.filter((item) => item.status === "published").length;
  const draftCount = items.length - publishedCount;
  const stackPreview = parseStack(form.stackInput);
  const isEdit = Boolean(editingId);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function startEdit(item: PortfolioItem) {
    setEditingId(item.id);
    setForm({
      route: item.route,
      title: item.title,
      summary: item.summary,
      stackInput: item.stack.join(", "),
      status: item.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      route: form.route,
      title: form.title,
      summary: form.summary,
      stack: parseStack(form.stackInput),
      status: form.status,
    };

    const response = await fetch(
      editingId ? `/api/portfolio-items/${editingId}` : "/api/portfolio-items",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as { message?: string };
      setMessage(errorData.message ?? "저장 중 오류가 발생했습니다.");
      setSaving(false);
      return;
    }

    await loadItems();
    const savedMode = isEdit ? "수정" : "추가";
    resetForm();
    setMessage(`포트폴리오가 ${savedMode}되었습니다.`);
    setSaving(false);
  }

  async function onDelete(itemId: string) {
    const ok = window.confirm("이 항목을 삭제할까요?");
    if (!ok) return;

    const response = await fetch(`/api/portfolio-items/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setMessage("삭제에 실패했습니다.");
      return;
    }

    if (editingId === itemId) resetForm();

    await loadItems();
    setMessage("포트폴리오가 삭제되었습니다.");
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-border bg-surface/40 p-6 lg:col-span-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-foreground">
                경로별 포트폴리오 운영 패널
              </h1>
              <p className="mt-2 text-sm text-muted">
                검색, 필터, 상태 관리, 편집을 한 화면에서 처리할 수 있습니다.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void loadItems()}
              className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted hover:border-foreground/40 hover:text-foreground"
            >
              {loading ? "새로고침 중..." : "데이터 새로고침"}
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          <StatCard label="전체 항목" value={String(items.length)} subLabel="모든 상태" />
          <StatCard label="공개" value={String(publishedCount)} subLabel="published" />
          <StatCard label="임시저장" value={String(draftCount)} subLabel="draft" />
          <StatCard label="경로 수" value={String(routes.length)} subLabel="route groups" />
        </section>

        <section className="rounded-2xl border border-border bg-surface/30 p-5 lg:col-span-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground">
              {isEdit ? "포트폴리오 수정" : "새 포트폴리오 추가"}
            </h2>
            {isEdit && (
              <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] text-accent">
                EDIT MODE
              </span>
            )}
          </div>

          <form className="space-y-3" onSubmit={onSubmit}>
            <Input
              label="Route"
              placeholder="예: frontend, design, seo"
              value={form.route}
              onChange={(value) => setForm((prev) => ({ ...prev, route: value }))}
            />

            {routes.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {routes.slice(0, 8).map((route) => (
                  <button
                    key={route}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, route }))}
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted hover:border-foreground/30 hover:text-foreground"
                  >
                    {route}
                  </button>
                ))}
              </div>
            )}

            <Input
              label="Title"
              placeholder="포트폴리오 제목"
              value={form.title}
              onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
            />
            <TextArea
              label="Summary"
              placeholder="핵심 설명"
              value={form.summary}
              onChange={(value) => setForm((prev) => ({ ...prev, summary: value }))}
            />
            <Input
              label="Stack"
              placeholder="React, Next.js, TypeScript"
              value={form.stackInput}
              onChange={(value) => setForm((prev) => ({ ...prev, stackInput: value }))}
            />

            {stackPreview.length > 0 && (
              <div className="flex flex-wrap gap-1.5 rounded border border-border bg-background/40 p-2">
                {stackPreview.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border px-2 py-0.5 text-[10px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <label className="flex flex-col gap-1 text-xs text-muted">
              <span>Status</span>
              <select
                className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={form.status}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    status: event.target.value as PortfolioStatus,
                  }))
                }
              >
                <option value="published">published</option>
                <option value="draft">draft</option>
              </select>
            </label>

            <div className="grid gap-2 pt-1 sm:grid-cols-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded border border-accent px-3 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-background disabled:opacity-60"
              >
                {saving ? "저장 중..." : isEdit ? "수정 저장" : "항목 추가"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                초기화
              </button>
            </div>
          </form>

          {message && <p className="mt-3 text-xs text-accent">{message}</p>}
        </section>

        <section className="rounded-2xl border border-border bg-surface/30 p-5 lg:col-span-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              항목 목록 ({filteredItems.length})
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="제목, 설명, 기술 검색"
                className="h-9 w-48 rounded border border-border bg-background px-3 text-xs text-foreground outline-none focus:border-accent/50"
              />
              <select
                value={activeRoute}
                onChange={(event) => setActiveRoute(event.target.value)}
                className="h-9 rounded border border-border bg-background px-2 text-xs text-foreground"
              >
                <option value="all">all routes</option>
                {routes.map((route) => (
                  <option key={route} value={route}>
                    {route}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {(["all", "published", "draft"] as StatusFilter[]).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                  statusFilter === status
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-border text-muted hover:border-foreground/35 hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {routeSummary.length > 0 && (
            <div className="mb-5 grid gap-2 rounded-xl border border-border bg-background/40 p-3">
              <p className="text-[11px] font-medium text-muted">Route 분포</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {routeSummary.map((item) => (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => setActiveRoute(item.route)}
                    className="rounded-lg border border-border px-3 py-2 text-left hover:border-foreground/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-foreground">{item.route}</span>
                      <span className="text-[11px] text-muted">{item.total}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-border/60">
                      <div
                        className="h-1.5 rounded-full bg-accent/60"
                        style={{
                          width: `${
                            item.total > 0 ? Math.max(12, (item.published / item.total) * 100) : 0
                          }%`,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-3">
            {loading && (
              <div className="rounded border border-border p-4 text-sm text-muted">
                불러오는 중...
              </div>
            )}

            {!loading && filteredItems.length === 0 && (
              <div className="rounded border border-border p-4 text-sm text-muted">
                조건에 맞는 항목이 없습니다.
              </div>
            )}

            {!loading &&
              filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-border bg-background/50 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] text-accent/80">/portfolio/{item.route}</p>
                      <h3 className="mt-1 text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted">{item.summary}</p>
                    </div>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                        item.status === "published"
                          ? "border-accent/35 text-accent"
                          : "border-border text-muted"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border px-2 py-0.5 text-[10px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-[10px] text-muted/70">
                      업데이트 {new Date(item.updatedAt).toLocaleString("ko-KR")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`/portfolio/${item.route}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border border-border px-2.5 py-1 text-[11px] text-muted hover:border-foreground/50 hover:text-foreground"
                      >
                        경로 보기
                      </a>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded border border-border px-2.5 py-1 text-[11px] text-muted hover:border-foreground/50 hover:text-foreground"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => void onDelete(item.id)}
                        className="rounded border border-red-500/40 px-2.5 py-1 text-[11px] text-red-300 hover:bg-red-500/10"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  subLabel,
}: {
  label: string;
  value: string;
  subLabel: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface/30 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 font-mono text-[10px] text-muted/70">{subLabel}</p>
    </article>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      <span>{label}</span>
      <input
        required
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      <span>{label}</span>
      <textarea
        required
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      />
    </label>
  );
}
