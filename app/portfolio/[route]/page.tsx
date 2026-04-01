import { getPortfolioItems } from "@/lib/portfolio-store";

type Params = { route: string };

export const dynamic = "force-dynamic";

export default async function PortfolioRoutePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { route } = await params;
  const items = await getPortfolioItems();
  const currentItems = items.filter((item) => item.route === route);

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Portfolio Route
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground">
          /portfolio/{route}
        </h1>
        <p className="mt-2 text-sm text-muted">
          관리자 페이지에서 등록된 경로별 포트폴리오 항목입니다.
        </p>

        <div className="mt-8 grid gap-4">
          {currentItems.length === 0 && (
            <article className="rounded border border-border bg-surface/30 p-4 text-sm text-muted">
              아직 등록된 항목이 없습니다.
            </article>
          )}

          {currentItems.map((item) => (
            <article
              key={item.id}
              className="rounded border border-border bg-surface/30 p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                <span className="rounded border border-border px-2 py-0.5 text-xs text-muted">
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border px-2 py-0.5 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
