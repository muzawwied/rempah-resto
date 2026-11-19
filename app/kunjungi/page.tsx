import Link from "next/link";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Kunjungi — Rempah",
  description: "Alamat, jam buka, transportasi, dan parkir di Rempah, Kebayoran Baru, Jakarta Selatan.",
};

const jamBuka = [
  { hari: "Selasa–Kamis", jam: "11.00–22.00" },
  { hari: "Jumat–Sabtu", jam: "11.00–23.00" },
  { hari: "Minggu", jam: "11.00–22.00" },
  { hari: "Senin", jam: "Tutup" },
];

export default function KunjungiPage() {
  return (
    <main>
      <div className="page-top wrap">
        <span className="label">Kunjungi</span>
        <h1 className="page-title" style={{ marginTop: 16 }}>
          Jl. Bumi 14
        </h1>
        <div className="page-intro">
          <p className="lede">
            Kami di Kebayoran Baru, lima menit jalan kaki dari MRT Blok M, seberang kantor pos. Kalau
            bingung, telepon saja, biasanya ada yang bisa mengarahkan.
          </p>
          <p className="serif-note">Parkir di belakang gedung, muat dua belas mobil.</p>
        </div>
      </div>

      <section className="section wrap">
        <Reveal>
          <div className="visit">
            <div className="visit__col">
              <span className="label" data-reveal>Alamat</span>
              <p data-reveal data-konten="alamat">
                Jl. Bumi No. 14
                <br />
                Kebayoran Baru, Jakarta Selatan 12130
              </p>
              <p data-reveal style={{ marginTop: 16 }}>
                <a className="link-u" href="https://maps.google.com/?q=Kebayoran+Baru+Jakarta">
                  Buka di peta
                </a>
              </p>
            </div>

            <div className="visit__col">
              <span className="label" data-reveal>Jam buka</span>
              <dl className="hours" data-reveal data-konten-dl="jam_harian">
                {jamBuka.map((j) => (
                  <div key={j.hari}>
                    <dt>{j.hari}</dt>
                    <dd>{j.jam}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="visit__col">
              <span className="label" data-reveal>Ke sini</span>
              <p data-reveal>
                MRT Blok M, keluar pintu barat, jalan kaki lima menit.
                <br />
                TransJakarta Blok M, lalu jalan dua blok.
              </p>
              <p data-reveal style={{ marginTop: 16 }}>
                <a className="link-u" href="tel:+622172000140" data-konten-tel="telepon">
                  +62 21 7200 014
                </a>
              </p>
            </div>
          </div>

          <div className="after-list" data-reveal>
            <Link prefetch={false} href="/reservasi" className="btn btn--ink">
              Reservasi meja
            </Link>
            <Link prefetch={false} href="/menu" className="link-u">
              Lihat menu
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
