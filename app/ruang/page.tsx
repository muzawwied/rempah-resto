import Link from "next/link";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Ruang — Rempah",
  description: "Ruang makan Rempah di Kebayoran Baru: 40 kursi, satu meja panjang dua belas orang, dapur terbuka.",
};

export default function RuangPage() {
  return (
    <main>
      <div className="page-top wrap">
        <span className="label">Ruang</span>
        <h1 className="page-title" style={{ marginTop: 16 }}>
          Empat puluh
          <br />
          kursi
        </h1>
        <div className="page-intro">
          <p className="lede">
            Satu ruang, satu meja panjang, dan dapur yang terlihat dari mana saja. Kami tidak memutar
            musik keras, karena percakapan tamu lebih penting daripada suasana.
          </p>
          <p className="serif-note">
            Meja panjang muat dua belas orang, cocok untuk ulang tahun kecil atau makan keluarga.
          </p>
        </div>
      </div>

      <section className="strip">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" data-parallax src="/img/ruang.webp" srcSet="/img/ruang.webp 1200w, /img/ruang-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" alt="Ruang makan Rempah saat lampu menyala" />
        <div className="strip__cap">
          <span className="label">Lampu menyala pukul lima</span>
          <p className="serif-note" style={{ color: "#f4ece2", marginTop: 8 }}>
            Empat puluh kursi di dalam, dua belas di teras, dan dapur terbuka di sisi barat.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <Reveal>
          <div className="facts facts--light">
            <div data-reveal>
              <span className="label">Kapasitas</span>
              <p>40 kursi di dalam, 12 di teras</p>
            </div>
            <div data-reveal>
              <span className="label">Meja komunal</span>
              <p>Satu meja panjang, muat 12 orang</p>
            </div>
            <div data-reveal>
              <span className="label">Dapur</span>
              <p>Terbuka, terlihat dari seluruh ruang</p>
            </div>
            <div data-reveal>
              <span className="label">Suasana</span>
              <p>Tanpa musik keras, lampu diturunkan saat malam</p>
            </div>
          </div>
          <div className="after-list" data-reveal>
            <Link prefetch={false} href="/reservasi" className="link-u">
              Simpan meja
            </Link>
            <Link prefetch={false} href="/kunjungi" className="link-u">
              Alamat dan jam buka
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
