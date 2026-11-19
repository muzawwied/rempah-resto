import Link from "next/link";
import HeroIntro from "../components/HeroIntro";
import Reveal from "../components/Reveal";
import Band from "../components/Band";
import MenuPanggung from "../components/MenuPanggung";
import JamBuka from "../components/JamBuka";

export default function Home() {
  return (
    <main>
      <link rel="preload" as="image" href="/img/rawon-1600.webp" media="(min-width: 701px)" fetchPriority="high" />
      <HeroIntro>
        <section className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__media" data-hero-media src="/img/rawon-900.webp" srcSet="/img/rawon-900.webp 900w, /img/rawon-1600.webp 1600w" sizes="100vw" alt="Semangkuk rawon buntut di atas taplak" fetchPriority="high" decoding="async" />
          <div className="hero__scrim" />
          <div className="hero__inner wrap">
            <h1 className="hero__title">
              <span className="mask">
                <span data-line>Masak</span>
              </span>
              <span className="mask">
                <span data-line>Pelan</span>
              </span>
            </h1>
            <div className="hero__foot">
              <div className="hero__cell" data-fade>
                <span className="label">Buka</span>
                <p data-konten="jam_buka_ringkas">
                  Selasa sampai Minggu
                  <br />
                  11.00–22.00
                </p>
              </div>
              <div className="hero__cell" data-fade>
                <span className="label">Alamat</span>
                <p data-konten="alamat">
                  Jl. Bumi No. 14
                  <br />
                  Kebayoran Baru
                </p>
              </div>
              <div className="hero__cell" data-fade>
                <span className="label">Kapasitas</span>
                <p>
                  40 kursi di dalam
                  <br />
                  12 kursi di teras
                </p>
              </div>
              <Link prefetch={false} href="/reservasi" className="hero__cta" data-fade>
                Reservasi meja
              </Link>
            </div>
          </div>
        </section>
      </HeroIntro>

      <Band text="Masakan rumah — menu baru tiap Senin — dimasak dengan arang — tanpa penyedap tambahan —" />

      {/* 01 — Dapur */}
      <section className="section wrap" id="dapur">
        <Reveal>
          <div className="cerita">
            <div className="cerita__teks">
              <span className="label" data-reveal>01 — Dapur</span>
              <h2 className="h2" data-reveal style={{ marginTop: 14 }}>
                Api arang,
                <br />
                cobek batu
              </h2>
              <p className="lede" data-reveal style={{ marginTop: 22 }}>
                Kami belanja di Pasar Mayestik setiap Selasa dan Jumat, lalu memasak dengan apa yang
                paling bagus pekan itu. Bumbu ditumbuk di cobek, bukan diblender, karena hasilnya kasar
                dan aromanya bertahan lebih lama.
              </p>
              <p className="lede" data-reveal style={{ marginTop: 16 }}>
                Kaldu buntut direbus semalam, iga mulai dibakar pukul sepuluh di atas arang kelapa.
                Karena itu jumlah porsi tiap hari terbatas, dan beberapa hidangan habis sebelum malam.
              </p>
            </div>
            <figure className="cerita__foto" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/dapur.webp" srcSet="/img/dapur.webp 1200w, /img/dapur-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" loading="lazy" decoding="async" alt="Bumbu ditumbuk di cobek batu di dapur Rempah" />
              <figcaption className="label">Cobek batu, ditumbuk pagi sebelum dapur dibuka</figcaption>
            </figure>
          </div>

          <div className="notes" data-reveal>
            <div className="note">
              <span className="label">Penyedap</span>
              <p data-konten="catatan_penyedap">Tidak memakai MSG. Asinnya dari garam, manisnya dari gula dan kecap.</p>
            </div>
            <div className="note">
              <span className="label">Alergi</span>
              <p data-konten="catatan_alergi">Beri tahu saat memesan. Sebagian besar hidangan bisa disesuaikan.</p>
            </div>
            <div className="note">
              <span className="label">Anak</span>
              <p data-konten="catatan_anak">Porsi setengah dan kursi bayi tersedia tanpa perlu memesan lebih dulu.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 02 — Menu */}
      <section className="panggung" id="menu">
        <div className="wrap">
          <Reveal>
            <div className="panggung__kepala">
              <span className="label" data-reveal>02 — Menu</span>
              <h2 className="panggung__judul" data-reveal>
                Yang paling
                <br />
                dicari
              </h2>
              <p className="panggung__lede" data-reveal>
                Daftar berganti tiap Senin mengikuti pasar. Ini yang paling sering dipesan tamu, dan
                yang paling cepat habis menjelang malam.
              </p>
            </div>

            <div className="panggung__isi">
              <figure className="panggung__foto" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/iga.webp" srcSet="/img/iga.webp 1200w, /img/iga-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" loading="lazy" decoding="async" alt="Iga bakar kecap di atas piring tanah liat" />
                <figcaption className="label">Iga bakar kecap, dioles tiga kali di atas arang kelapa</figcaption>
              </figure>
              <div className="panggung__daftar" data-reveal>
                <MenuPanggung />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — Ruang */}
      <section className="strip" id="ruang">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/ruang.webp" srcSet="/img/ruang.webp 1200w, /img/ruang-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" loading="lazy" decoding="async" alt="Ruang makan Rempah saat lampu menyala" data-parallax />
        <div className="strip__cap">
          <span className="label">03 — Ruang</span>
          <p className="serif-note" style={{ color: "#f4ece2", marginTop: 8 }} data-konten="catatan_ruang">
            Empat puluh kursi, satu meja panjang dua belas orang, dan dapur yang terlihat dari meja.
          </p>
        </div>
      </section>

      {/* Sudut rumah — galeri */}
      <section className="galeri wrap">
        <Reveal>
          <div className="galeri__kepala">
            <div>
              <span className="label" data-reveal>Sudut rumah</span>
              <h2 className="h2" data-reveal style={{ marginTop: 14 }}>
                Teras,
                <br />
                meja panjang
              </h2>
            </div>
            <p className="lede" data-reveal>
              Dua belas kursi di teras untuk yang datang tanpa pesan, satu meja panjang untuk keluarga
              besar, dan lampu kuning yang menyala sejak pukul lima sore.
            </p>
          </div>

          <div className="galeri__grid">
            <figure className="galeri__besar" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/meja.webp" srcSet="/img/meja.webp 1200w, /img/meja-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" loading="lazy" decoding="async" alt="Meja panjang dua belas orang di ruang utama Rempah" />
              <figcaption className="label">Meja panjang, muat dua belas orang</figcaption>
            </figure>
            <figure className="galeri__kecil" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/teras.webp" srcSet="/img/teras.webp 1200w, /img/teras-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" loading="lazy" decoding="async" alt="Teras Rempah dengan lampu gantung saat senja" />
              <figcaption className="label">Teras, dua belas kursi tanpa reservasi</figcaption>
            </figure>
            <figure className="galeri__kecil" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/penutup.webp" srcSet="/img/penutup.webp 1200w, /img/penutup-800.webp 800w" sizes="(max-width: 700px) 100vw, 55vw" loading="lazy" decoding="async" alt="Klepon dan es kelapa jeruk sebagai penutup" />
              <figcaption className="label">Klepon dan es kelapa jeruk</figcaption>
            </figure>
          </div>
        </Reveal>
      </section>

      {/* 04 — Datang */}
      <section className="datang wrap" id="datang">
        <Reveal>
          <div className="datang__kepala">
            <span className="label" data-reveal>04 — Datang</span>
            <h2 className="h2" data-reveal style={{ marginTop: 14 }}>
              Datang
              <br />
              kapan
            </h2>
            <p className="lede" data-reveal>
              Senin kami tutup untuk belanja dan bersih-bersih dapur. Selebihnya dapur menyala sampai
              satu jam sebelum tutup.
            </p>
          </div>

          <div className="datang__isi" data-reveal>
            <div className="datang__jam">
              <span className="label">Jam buka</span>
              <JamBuka />
            </div>
            <div className="datang__ket">
              <div>
                <span className="label">Alamat</span>
                <p data-konten="alamat">
                  Jl. Bumi No. 14, Kebayoran Baru
                  <br />
                  Jakarta Selatan 12130
                </p>
              </div>
              <div>
                <span className="label">Telepon</span>
                <p data-konten="telepon">+62 21 7200 014</p>
              </div>
              <div>
                <span className="label">Parkir</span>
                <p data-konten="parkir">Di belakang gedung, muat dua belas mobil</p>
              </div>
              <Link prefetch={false} href="/kunjungi" className="link-u">
                Arah dan transportasi
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Kutipan */}
      <section className="petik wrap">
        <Reveal>
          <span className="label" data-reveal>Catatan dapur</span>
          <p className="petik__teks serif-note" data-reveal data-konten="kutipan">
            “Menu berganti tiap Senin, bukan karena tren, tapi karena pasar yang berubah.”
          </p>
          <span className="label petik__kaki" data-reveal>Rempah, Kebayoran Baru</span>
        </Reveal>
      </section>

      {/* Rute */}
      <section className="rute wrap">
        <Reveal>
          <div className="rute__kepala">
            <span className="label" data-reveal>Selanjutnya</span>
          </div>
          <div className="rute__daftar" data-reveal>
            <Link prefetch={false} href="/menu">
              <span className="rute__no">01</span>
              <span className="rute__judul">Menu lengkap</span>
              <span className="rute__ket">Tujuh belas hidangan, berganti tiap Senin</span>
              <span className="rute__panah" aria-hidden="true">→</span>
            </Link>
            <Link prefetch={false} href="/reservasi">
              <span className="rute__no">02</span>
              <span className="rute__judul">Reservasi</span>
              <span className="rute__ket">Meja ditahan lima belas menit</span>
              <span className="rute__panah" aria-hidden="true">→</span>
            </Link>
            <Link prefetch={false} href="/kunjungi">
              <span className="rute__no">03</span>
              <span className="rute__judul">Kunjungi</span>
              <span className="rute__ket">Lima menit jalan kaki dari MRT Blok M</span>
              <span className="rute__panah" aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 05 — Reservasi */}
      <section className="reserve-band">
        <div className="wrap">
          <Reveal>
            <div className="reserve-band__grid">
              <div>
                <span className="label" data-reveal>05 — Reservasi</span>
                <h2 className="h2" data-reveal style={{ marginTop: 14 }}>
                  Simpan
                  <br />
                  meja
                </h2>
                <p className="lede" data-reveal data-konten="reservasi_telepon_note" style={{ color: "rgba(242,235,227,0.78)", marginTop: 20 }}>
                  Akhir pekan biasanya penuh. Untuk rombongan di atas sepuluh orang, sebaiknya telepon
                  supaya meja panjang bisa kami tata lebih dulu.
                </p>
                <div style={{ marginTop: 26 }} data-reveal>
                  <Link prefetch={false} href="/reservasi" className="btn">
                    Reservasi meja
                  </Link>
                </div>
              </div>
              <div className="facts">
                <div data-reveal>
                  <span className="label">Telepon</span>
                  <p data-konten="telepon">+62 21 7200 014</p>
                </div>
                <div data-reveal>
                  <span className="label">Konfirmasi</span>
                  <p>Paling lambat satu jam kerja</p>
                </div>
                <div data-reveal>
                  <span className="label">Uang muka</span>
                  <p>Tidak ada, bayar setelah makan</p>
                </div>
                <div data-reveal>
                  <span className="label">Rombongan</span>
                  <p>Di atas sepuluh orang, telepon dulu</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
