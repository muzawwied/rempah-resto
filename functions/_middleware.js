import { sesiValid } from "./_sesi.js";

// Tidak ada lagi popup sandi bawaan browser. Halaman panel tanpa sesi
// dialihkan ke formulir masuk sendiri; API membalas JSON 401 tanpa header pemicu popup.
export async function onRequest({ request, next, env }) {
  const { pathname } = new URL(request.url);

  // Rute bebas
  if (pathname === "/api/masuk" || pathname.startsWith("/api/masuk/")) return next();
  if (pathname === "/admin/masuk" || pathname.startsWith("/admin/masuk/")) return next();
  if (request.method === "POST" && pathname === "/api/pesanan") return next();
  if (request.method === "GET" && pathname === "/api/menu") return next();
  if (request.method === "GET" && pathname === "/api/konten") return next();

  const perluSesi = pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/");
  if (!perluSesi) return next();

  const masuk = await sesiValid(request, env);

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const lanjut = masuk
      ? await next()
      : new Response(null, {
          status: 302,
          headers: { Location: "/admin/masuk/", "cache-control": "no-store" },
        });
    // Panel tidak boleh masuk mesin pencari mana pun.
    const jawab = new Response(lanjut.body, lanjut);
    jawab.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return jawab;
  }

  if (!masuk) {
    return new Response(JSON.stringify({ pesan: "Perlu masuk panel." }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
  }
  return next();
}
