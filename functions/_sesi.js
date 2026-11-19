// Sesi panel: cookie bertanda tangan, tanpa popup bawaan browser.
export const COOKIE = "sesi_dapur";

async function kunci(env) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("sesi-dapur:" + (env.ADMIN_PASS || "")),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function tanda(env, data) {
  const sig = await crypto.subtle.sign("HMAC", await kunci(env), new TextEncoder().encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function bikinSesi(env, hari = 7) {
  const exp = Date.now() + hari * 86400000;
  return `${exp}.${await tanda(env, String(exp))}`;
}

export async function sesiValid(request, env) {
  const cookie = request.headers.get("Cookie") || "";
  const cocok = cookie.match(/(?:^|;\s*)sesi_dapur=([^;]+)/);
  if (!cocok) return false;
  const [exp, sig] = decodeURIComponent(cocok[1]).split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return sig === (await tanda(env, exp));
}

export function setCookie(nilai, maxAge) {
  return `${COOKIE}=${encodeURIComponent(nilai)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
