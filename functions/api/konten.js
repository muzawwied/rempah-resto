import { sesiValid, json } from "../_sesi.js";

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare("SELECT kunci, nilai FROM konten").all();
  const peta = {};
  for (const r of results ?? []) peta[r.kunci] = r.nilai ?? "";
  return json({ data: peta });
}

export async function onRequestPut({ request, env }) {
  if (!(await sesiValid(request, env))) return json({ pesan: "Perlu masuk panel." }, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ pesan: "Format tidak valid" }, 400);
  }
  const nilai = body?.nilai && typeof body.nilai === "object" ? body.nilai : null;
  if (!nilai) return json({ pesan: "Tidak ada yang disimpan." }, 422);
  const now = new Date().toISOString();
  const stmt = env.DB.prepare(
    "INSERT INTO konten (kunci, nilai, diubah) VALUES (?,?,?) ON CONFLICT(kunci) DO UPDATE SET nilai=excluded.nilai, diubah=excluded.diubah"
  );
  const batch = Object.entries(nilai).map(([k, v]) => stmt.bind(k, String(v ?? ""), now));
  if (!batch.length) return json({ pesan: "Tidak ada yang disimpan." }, 422);
  await env.DB.batch(batch);
  return json({ ok: true, jumlah: batch.length });
}
