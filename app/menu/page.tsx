import Link from "next/link";
import Reveal from "../../components/Reveal";
import { menuLengkap } from "../../lib/menu";
import MenuLive from "../../components/MenuLive";

export const metadata = {
  title: "Menu — Rempah",
  description: "Menu Rempah minggu ini: pembuka, utama, sayur, penutup dan minum.",
};

export default function MenuPage() {
  return (
    <main>
      <div className="page-top wrap">
        <span className="label">Menu · ditulis ulang tiap Senin</span>
        <h1 className="page-title" style={{ marginTop: 16 }}>
          Menu
        </h1>
        <div className="page-intro">
          <p className="lede">
            Dua puluh empat hidangan, dimasak dari bahan yang datang pekan ini. Harga sudah termasuk
            pajak, belum termasuk biaya layanan.
          </p>
          <p className="serif-note">
            Rasa lengkap berisi tujuh hidangan pilihan koki, Rp 385.000, minimal untuk dua orang.
            Sebagian hidangan bisa dipesan setengah porsi.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: "clamp(40px,6vw,80px)" }}>
        <Reveal>
          <MenuLive
            mode="semua"
            awal={menuLengkap.flatMap((g) =>
              g.items.map((d) => ({ nama: d.name, catatan: d.note, harga: d.price, grup: g.slug })),
            )}
          />
        </Reveal>
      </div>

      <section className="strip">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src="/img/iga.webp" srcSet="/img/iga.webp 1200w, /img/iga-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" alt="Iga bakar kecap dengan sambal terasi" />
        <div className="strip__cap">
          <span className="label">Dari arang</span>
          <p className="serif-note" style={{ color: "#f4ece2", marginTop: 8 }}>
            Iga mulai dibakar pukul sepuluh pagi di atas arang kelapa, supaya siap sebelum jam makan
            siang. Karena itu porsinya terbatas tiap hari.
          </p>
        </div>
      </section>

      <section className="section wrap" style={{ textAlign: "center" }}>
        <span className="label">Datang, atau simpan meja dulu</span>
        <h2 className="h2" style={{ marginTop: 14 }}>
          Simpan meja
        </h2>
        <div style={{ marginTop: 26 }}>
          <Link prefetch={false} href="/reservasi" className="btn btn--ink">
            Reservasi meja
          </Link>
        </div>
      </section>
    </main>
  );
}
