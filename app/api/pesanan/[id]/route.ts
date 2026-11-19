import { NextResponse } from "next/server";
import { store } from "../../../../lib/pesanan";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const row = store.find((p) => p.id === id);
  if (!row) return NextResponse.json({ error: "Pesanan tidak ditemukan." }, { status: 404 });

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body harus JSON." }, { status: 400 });
  }

  const allowed = ["baru", "dikonfirmasi", "selesai", "batal"];
  if (!body.status || !allowed.includes(body.status)) {
    return NextResponse.json({ error: "Status tidak dikenal." }, { status: 400 });
  }

  row.status = body.status as typeof row.status;
  return NextResponse.json({ data: row });
}
