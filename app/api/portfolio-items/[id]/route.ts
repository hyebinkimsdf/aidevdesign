import {
  deletePortfolioItem,
  updatePortfolioItem,
  type PortfolioItemInput,
} from "@/lib/portfolio-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<PortfolioItemInput>;

    const updated = await updatePortfolioItem(id, {
      route: body.route ?? "",
      title: body.title ?? "",
      summary: body.summary ?? "",
      stack: Array.isArray(body.stack) ? body.stack : [],
      status: body.status === "draft" ? "draft" : "published",
    });

    if (!updated) {
      return Response.json({ message: "item not found" }, { status: 404 });
    }

    return Response.json({ item: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return Response.json({ message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const removed = await deletePortfolioItem(id);

  if (!removed) {
    return Response.json({ message: "item not found" }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
