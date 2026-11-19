import Reveal from "../../components/Reveal";
import ReserveForm from "./ReserveForm";

export const metadata = {
  title: "Reservasi — Rempah",
  description: "Simpan meja di Rempah, Kebayoran Baru. Meja ditahan 15 menit.",
};

export default function ReservasiPage() {
  return (
    <main className="resv">
      <div className="resv__form-col">
        <div className="wrap" style={{ paddingInline: 0, maxWidth: 560 }}>
          <Reveal>
            <span className="label" data-reveal>Reservasi</span>
            <h1 className="h2" data-reveal style={{ marginTop: 14 }}>
              Simpan
              <br />
              meja
            </h1>
            <p className="lede" data-reveal style={{ marginTop: 18 }}>
              Empat puluh kursi saja, jadi akhir pekan cepat penuh. Isi formulir di bawah, kami
              konfirmasi lewat telepon paling lambat satu jam kerja.
            </p>
            <div data-reveal>
              <ReserveForm />
            </div>
            <div className="aside-list">
              <div data-reveal>
                <span className="label">Meja ditahan lima belas menit</span>
                <p>Kalau lebih dari itu, meja kami berikan ke tamu lain.</p>
              </div>
              <div data-reveal>
                <span className="label">Tanpa uang muka</span>
                <p>Semua pembayaran dilakukan setelah selesai makan.</p>
              </div>
              <div data-reveal>
                <span className="label">Rombongan besar</span>
                <p>Lebih dari sepuluh orang, sebaiknya telepon +62 21 7200 014 supaya meja panjang bisa
                kami siapkan.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="resv__media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src="/img/iga.webp" srcSet="/img/iga.webp 1200w, /img/iga-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" alt="" />
      </div>
    </main>
  );
}
