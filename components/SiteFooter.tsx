import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="foot" id="kunjungi">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <span className="label">Alamat</span>
            <p data-konten="alamat">
              Jl. Bumi No. 14, Kebayoran Baru
              <br />
              Jakarta Selatan 12130
            </p>
            <p style={{ marginTop: 12, opacity: 0.7 }}>
              Lima menit jalan kaki dari MRT Blok M, seberang kantor pos.
            </p>
          </div>
          <div>
            <span className="label">Halaman</span>
            <div className="foot__cols">
              <Link prefetch={false} href="/menu">Menu</Link>
              <Link prefetch={false} href="/reservasi">Reservasi</Link>
              <Link prefetch={false} href="/dapur">Dapur</Link>
              <Link prefetch={false} href="/ruang">Ruang</Link>
              <Link prefetch={false} href="/kunjungi">Kunjungi</Link>
            </div>
          </div>
          <div>
            <span className="label">Kontak</span>
            <div className="foot__cols">
              <a href="tel:+622172000140" data-konten-tel="telepon">+62 21 7200 014</a>
              <a href="mailto:dapur@rempah.id" data-konten-mail="email">dapur@rempah.id</a>
              <a href="https://maps.google.com/?q=Kebayoran+Baru+Jakarta">Petunjuk arah</a>
            </div>
          </div>
          <div>
            <span className="label">Jam buka</span>
            <div className="foot__cols">
              <span data-konten="jam_buka_ringkas">
                Selasa sampai Minggu
                <br />
                11.00–22.00
              </span>
              <span style={{ opacity: 0.65 }}>Senin tutup</span>
            </div>
          </div>
        </div>
      </div>

      <div className="foot__mark" aria-hidden="true">
        Rempah
      </div>

      <div className="wrap">
        <div className="foot__base">
          <span>© 2026 Rempah. Dapur Nusantara, Kebayoran Baru.</span>
          <span>Anton, Instrument Serif, Inter · foto 35mm</span>
        </div>
      </div>

      <div className="wrap">
        <div className="foot__watermark">
          <span>Vylonium&rsquo;s</span>
        </div>
      </div>
    </footer>
  );
}
