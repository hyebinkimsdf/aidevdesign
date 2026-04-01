import {
  createPortfolioItem,
  getPortfolioItems,
  type PortfolioItemInput,
} from "@/lib/portfolio-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getPortfolioItems();
  return Response.json({ items });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PortfolioItemInput>;
    const next = await createPortfolioItem({
      route: body.route ?? "",
      title: body.title ?? "",
      summary: body.summary ?? "",
      stack: Array.isArray(body.stack) ? body.stack : [],
      status: body.status === "draft" ? "draft" : "published",
    });

    return Response.json({ item: next }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return Response.json({ message }, { status: 400 });
  }
}
