# Rempah — template situs restoran

Next.js 15 (App Router) + React 19 + TypeScript + GSAP, diekspor statis ke Cloudflare Pages. Panel kasir, QR meja, dan form reservasi memakai Pages Functions dan D1.

Demo: https://resto.vylonium.biz.id

## Isi
- Situs publik: beranda panjang, menu bertingkat, dapur, ruang, kunjungi, reservasi.
- Panel kasir di /admin: pesanan, menu, info situs, QR meja.
- API: /api/pesanan, /api/menu, /api/konten, /api/masuk.

## Menjalankan
1. `bun install`
2. `bunx next dev` untuk pengembangan
3. `bunx wrangler pages dev out --d1 DB=resto-orders` untuk menguji Functions dan D1

## Membangun dan mengunggah
1. `NEXT_EXPORT=1 bunx next build`
2. `bunx wrangler pages deploy out --project-name rempah-demo`

Sandi panel dan sesi disimpan sebagai secret di Cloudflare Pages, bukan di repo.

## Basis data
Tabel: `pesanan`, `menu_item`, `konten`. Seed awal ada di `scripts/seed-menu.mjs`.
