import { createClientInquiry, type ClientInquiryInput } from "@/lib/client-inquiry-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ClientInquiryInput>;

    const saved = await createClientInquiry({
      name: body.name ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      company: body.company ?? "",
      message: body.message ?? "",
    });

    return Response.json({ inquiry: saved }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "문의 접수 중 오류가 발생했습니다.";
    return Response.json({ message }, { status: 400 });
  }
}
