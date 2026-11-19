import Link from "next/link";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Dapur — Rempah",
  description: "Cara Rempah memasak: belanja pasar dua kali seminggu, bumbu ditumbuk di cobek, iga dibakar di atas arang.",
};

export default function DapurPage() {
  return (
    <main>
      <div className="page-top wrap">
        <span className="label">Dapur</span>
        <h1 className="page-title" style={{ marginTop: 16 }}>
          Api arang,
          <br />
          cobek batu
        </h1>
        <div className="page-intro">
          <p className="lede">
            Kami belanja di Pasar Mayestik setiap Selasa dan Jumat, lalu memasak dengan apa yang
            paling bagus pekan itu. Bumbu ditumbuk di cobek, bukan diblender, karena hasilnya kasar
            dan aromanya bertahan lebih lama.
          </p>
          <p className="serif-note">
            Kaldu buntut direbus semalam, iga mulai dibakar pukul sepuluh. Karena itu porsi tiap hari
            terbatas.
          </p>
        </div>
      </div>

      <section className="strip">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" data-parallax src="/img/iga.webp" srcSet="/img/iga.webp 1200w, /img/iga-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" alt="Iga bakar di atas piring enamel" />
        <div className="strip__cap">
          <span className="label">Arang kelapa</span>
          <p className="serif-note" style={{ color: "#f4ece2", marginTop: 8 }}>
            Dibakar mulai pukul sepuluh pagi, supaya siap sebelum jam makan siang.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <Reveal>
          <div className="notes">
            <div className="note" data-reveal>
              <span className="label">Penyedap</span>
              <p>Tidak memakai MSG. Asinnya dari garam, manisnya dari gula dan kecap.</p>
            </div>
            <div className="note" data-reveal>
              <span className="label">Alergi</span>
              <p>Beri tahu saat memesan. Sebagian besar hidangan bisa disesuaikan.</p>
            </div>
            <div className="note" data-reveal>
              <span className="label">Anak</span>
              <p>Porsi setengah dan kursi bayi tersedia tanpa perlu memesan lebih dulu.</p>
            </div>
          </div>
          <div className="after-list" data-reveal>
            <Link href="/menu" className="link-u">
              Lihat menu minggu ini
            </Link>
            <Link href="/ruang" className="link-u">
              Lanjut ke ruang makan
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
