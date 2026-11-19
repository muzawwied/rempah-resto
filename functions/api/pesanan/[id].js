// Cloudflare Pages Function: ubah status pesanan
const IZIN = ["baru", "dikonfirmasi", "selesai", "batal"];

export async function onRequestPatch({ params, request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ pesan: "Format tidak valid" }, 400);
  }
  if (!IZIN.includes(body.status)) return json({ pesan: "Status tidak dikenal" }, 422);

  const has = await env.DB.prepare("SELECT id FROM pesanan WHERE id = ?").bind(params.id).first();
  if (!has) return json({ pesan: "Pesanan tidak ditemukan" }, 404);

  await env.DB.prepare("UPDATE pesanan SET status = ? WHERE id = ?").bind(body.status, params.id).run();
  return json({ data: { id: params.id, status: body.status } });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
