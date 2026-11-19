import { NextResponse } from "next/server";
import { store, nextId, type Pesanan } from "../../../lib/pesanan";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = [...store].sort((a, b) => (a.dibuat < b.dibuat ? 1 : -1));
  return NextResponse.json({ data: list, jumlah: list.length });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body harus JSON." }, { status: 400 });
  }

  const nama = String(body.nama ?? "").trim();
  const telepon = String(body.telepon ?? "").trim();
  if (nama.length < 2 || telepon.length < 6) {
    return NextResponse.json({ error: "Nama dan telepon wajib diisi." }, { status: 400 });
  }

  const pesanan: Pesanan = {
    id: nextId(),
    tipe: body.tipe === "bawa-pulang" ? "bawa-pulang" : "reservasi",
    nama,
    telepon,
    tanggal: body.tanggal ? String(body.tanggal) : undefined,
    jam: body.jam ? String(body.jam) : undefined,
    tamu: body.tamu ? String(body.tamu) : undefined,
    items: body.items ? String(body.items) : undefined,
    catatan: body.catatan ? String(body.catatan) : undefined,
    status: "baru",
    dibuat: new Date().toISOString(),
  };

  store.push(pesanan);
  return NextResponse.json({ data: pesanan }, { status: 201 });
}
