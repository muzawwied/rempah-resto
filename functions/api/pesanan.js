// Cloudflare Pages Function: daftar & terima pesanan (D1)
export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM pesanan ORDER BY dibuat DESC LIMIT 100"
  ).all();
  return json({ data: results ?? [] });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ pesan: "Format tidak valid" }, 400);
  }
  const nama = (body.nama || "").toString().trim();
  const telepon = (body.telepon || "").toString().trim();
  if (!nama || !telepon) return json({ pesan: "Nama dan telepon wajib diisi" }, 422);

  const id = "PSN-" + Math.floor(1000 + Math.random() * 9000);
  const row = {
    id,
    tipe: body.tipe === "bawa-pulang" ? "bawa-pulang" : "reservasi",
    nama,
    telepon,
    tanggal: body.tanggal || null,
    jam: body.jam || null,
    tamu: body.tamu || null,
    catatan: (body.catatan || "").toString().trim() || null,
    status: "baru",
    dibuat: new Date().toISOString(),
  };
  await env.DB.prepare(
    "INSERT INTO pesanan (id, tipe, nama, telepon, tanggal, jam, tamu, catatan, status, dibuat) VALUES (?,?,?,?,?,?,?,?,?,?)"
  ).bind(id, row.tipe, row.nama, row.telepon, row.tanggal, row.jam, row.tamu, row.catatan, row.status, row.dibuat).run();

  return json({ data: row }, 201);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
