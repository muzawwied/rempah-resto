import { sesiValid, json } from "../_sesi.js";

const GRUP = ["pembuka", "utama", "sayur", "penutup-dan-minum"];

function rapikan(b, lama = {}) {
  const harga = Number(b.harga ?? lama.harga ?? 0);
  return {
    grup: GRUP.includes(b.grup) ? b.grup : lama.grup || "utama",
    nama: (b.nama ?? lama.nama ?? "").toString().trim(),
    catatan: (b.catatan ?? lama.catatan ?? "").toString().trim(),
    harga: Number.isFinite(harga) && harga >= 0 ? Math.round(harga) : 0,
    urutan: Number.isFinite(Number(b.urutan ?? lama.urutan)) ? Number(b.urutan ?? lama.urutan) : 0,
    tampil: b.tampil === undefined ? (lama.tampil ?? 1) : b.tampil ? 1 : 0,
  };
}

export async function onRequestGet({ request, env }) {
  const admin = await sesiValid(request, env);
  const sql = admin
    ? "SELECT * FROM menu_item ORDER BY grup, urutan, id"
    : "SELECT * FROM menu_item WHERE tampil = 1 ORDER BY grup, urutan, id";
  const { results } = await env.DB.prepare(sql).all();
  return json({ data: results ?? [] });
}

export async function onRequestPost({ request, env }) {
  if (!(await sesiValid(request, env))) return json({ pesan: "Perlu masuk panel." }, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ pesan: "Format tidak valid" }, 400);
  }
  const r = rapikan(body);
  if (!r.nama) return json({ pesan: "Nama hidangan wajib diisi." }, 422);
  const now = new Date().toISOString();
  const res = await env.DB.prepare(
    "INSERT INTO menu_item (grup, nama, catatan, harga, urutan, tampil, diubah) VALUES (?,?,?,?,?,?,?)"
  ).bind(r.grup, r.nama, r.catatan, r.harga, r.urutan, r.tampil, now).run();
  return json({ data: { id: res.meta?.last_row_id, ...r } }, 201);
}

export async function onRequestPut({ request, env }) {
  if (!(await sesiValid(request, env))) return json({ pesan: "Perlu masuk panel." }, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ pesan: "Format tidak valid" }, 400);
  }
  const id = Number(body.id);
  if (!id) return json({ pesan: "ID hidangan tidak dikenal." }, 422);
  const lama = await env.DB.prepare("SELECT * FROM menu_item WHERE id = ?").bind(id).first();
  if (!lama) return json({ pesan: "Hidangan tidak ditemukan." }, 404);
  const r = rapikan(body, lama);
  if (!r.nama) return json({ pesan: "Nama hidangan wajib diisi." }, 422);
  await env.DB.prepare(
    "UPDATE menu_item SET grup=?, nama=?, catatan=?, harga=?, urutan=?, tampil=?, diubah=? WHERE id=?"
  ).bind(r.grup, r.nama, r.catatan, r.harga, r.urutan, r.tampil, new Date().toISOString(), id).run();
  return json({ data: { id, ...r } });
}

export async function onRequestDelete({ request, env }) {
  if (!(await sesiValid(request, env))) return json({ pesan: "Perlu masuk panel." }, 401);
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return json({ pesan: "ID hidangan tidak dikenal." }, 422);
  await env.DB.prepare("DELETE FROM menu_item WHERE id = ?").bind(id).run();
  return json({ ok: true, id });
}
