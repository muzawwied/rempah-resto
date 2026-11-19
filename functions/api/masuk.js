import { bikinSesi, setCookie, json } from "../_sesi.js";

// Masuk panel lewat formulir sendiri, bukan popup browser.
export async function onRequestPost({ request, env }) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ pesan: "Format tidak valid" }, 400);
  }
  const sandi = (body.sandi || "").toString();
  const benar = env.ADMIN_PASS || "";
  if (!benar) return json({ pesan: "Sandi panel belum diatur." }, 500);
  if (sandi.length !== benar.length || sandi !== benar) {
    return json({ pesan: "Sandi salah." }, 401);
  }
  const sesi = await bikinSesi(env, 7);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "Set-Cookie": setCookie(sesi, 7 * 24 * 3600),
    },
  });
}

export async function onRequestDelete() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "Set-Cookie": "sesi_dapur=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    },
  });
}
