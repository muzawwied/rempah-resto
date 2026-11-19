"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tautan = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/dapur", label: "Dapur" },
  { href: "/ruang", label: "Ruang" },
  { href: "/kunjungi", label: "Kunjungi" },
  { href: "/reservasi", label: "Reservasi" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [buka, setBuka] = useState(false);
  const tutupRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setBuka(false);
  }, [pathname]);

  useEffect(() => {
    if (!buka) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBuka(false);
    };
    document.addEventListener("keydown", onKey);
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    tutupRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = sebelumnya;
    };
  }, [buka]);

  return (
    <>
      <header className="site-head" data-over={overHero && !scrolled && !buka}>
        <div className="site-head__inner">
          <Link prefetch={false} href="/" className="brand">
            Rempah
          </Link>
          <nav className="nav">
            <Link prefetch={false} href="/menu">Menu</Link>
            <Link prefetch={false} href="/dapur">Dapur</Link>
            <Link prefetch={false} href="/ruang">Ruang</Link>
            <Link prefetch={false} href="/kunjungi">Kunjungi</Link>
          </nav>
          <div className="head-aksi">
            <Link prefetch={false} href="/reservasi" className="head-cta">
              Reservasi
            </Link>
            <button
              type="button"
              className="head-menu"
              onClick={() => setBuka(true)}
              aria-expanded={buka}
              aria-controls="laci-menu"
              aria-label="Buka menu navigasi"
            >
              <span className="head-menu__garis" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="laci" data-buka={buka} aria-hidden={!buka}>
        <button type="button" className="laci__tirai" tabIndex={-1} aria-label="Tutup menu" onClick={() => setBuka(false)} />
        <aside className="laci__panel" id="laci-menu" role="dialog" aria-modal="true" aria-label="Menu navigasi">
          <div className="laci__atas">
            <span className="label">Navigasi</span>
            <button type="button" className="laci__tutup" onClick={() => setBuka(false)} ref={tutupRef}>
              <span>Tutup</span>
              <i aria-hidden="true" />
            </button>
          </div>

          <nav className="laci__nav">
            {tautan.map((t, i) => (
              <Link prefetch={false}
                key={t.href}
                href={t.href}
                data-aktif={t.href === "/" ? pathname === "/" : pathname.startsWith(t.href)}
                onClick={() => setBuka(false)}
              >
                <span className="laci__no">{String(i + 1).padStart(2, "0")}</span>
                <span className="laci__judul">{t.label}</span>
              </Link>
            ))}
          </nav>

          <div className="laci__kaki">
            <div>
              <span className="label">Telepon</span>
              <p>
                <a href="tel:+622172000140" data-konten-tel="telepon">
                  +62 21 7200 014
                </a>
              </p>
            </div>
            <div>
              <span className="label">Jam buka</span>
              <p data-konten="jam_buka_ringkas">
                Selasa sampai Minggu
                <br />
                11.00–22.00
              </p>
            </div>
            <div>
              <span className="label">Alamat</span>
              <p data-konten="alamat">
                Jl. Bumi No. 14, Kebayoran Baru
                <br />
                Jakarta Selatan 12130
              </p>
            </div>
          </div>

          <Link prefetch={false} href="/reservasi" className="btn laci__cta" onClick={() => setBuka(false)}>
            Reservasi meja
          </Link>
        </aside>
      </div>
    </>
  );
}
