"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const rapi = (nilai: string) =>
  nilai
    ? new Date(nilai + "T00:00:00").toLocaleDateString("id-ID", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

/** Pemilih tanggal sendiri: bukan kalender bawaan browser. */
export default function PilihTanggal({ nama = "tanggal" }: { nama?: string }) {
  const [nilai, setNilai] = useState("");
  const [buka, setBuka] = useState(false);
  const [lihat, setLihat] = useState(() => new Date());
  const [arah, setArah] = useState<"bawah" | "atas">("bawah");
  const akar = useRef<HTMLDivElement>(null);

  const hariIni = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    if (!buka) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!akar.current?.contains(e.target as Node)) setBuka(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBuka(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [buka]);

  // kalau ruang di bawah pemicu tidak cukup, kalender dibuka ke atas
  useEffect(() => {
    if (!buka) return;
    const ukur = () => {
      if (window.matchMedia("(max-width: 720px)").matches) {
        setArah("bawah");
        return;
      }
      const kotak = akar.current?.getBoundingClientRect();
      if (!kotak) return;
      setArah(window.innerHeight - kotak.bottom < 440 ? "atas" : "bawah");
    };
    ukur();
    window.addEventListener("resize", ukur);
    window.addEventListener("scroll", ukur, { passive: true });
    return () => {
      window.removeEventListener("resize", ukur);
      window.removeEventListener("scroll", ukur);
    };
  }, [buka]);

  useEffect(() => {
    if (!buka) return;
    const sempit = window.matchMedia("(max-width: 720px)").matches;
    if (!sempit) return;
    const asal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = asal;
    };
  }, [buka]);

  const sel = useMemo(() => {
    const tahun = lihat.getFullYear();
    const bln = lihat.getMonth();
    const pertama = new Date(tahun, bln, 1);
    const jumlah = new Date(tahun, bln + 1, 0).getDate();
    const kosong = (pertama.getDay() + 6) % 7; // Senin sebagai kolom pertama
    const sel: (Date | null)[] = Array(kosong).fill(null);
    for (let i = 1; i <= jumlah; i++) sel.push(new Date(tahun, bln, i));
    return sel;
  }, [lihat]);

  const geser = (delta: number) => {
    setLihat((l) => new Date(l.getFullYear(), l.getMonth() + delta, 1));
  };

  return (
    <div className="tgl" ref={akar}>
      <button
        type="button"
        className="tgl__pemicu"
        data-kosong={!nilai}
        onClick={() => setBuka((b) => !b)}
        aria-expanded={buka}
        aria-haspopup="dialog"
      >
        {nilai ? rapi(nilai) : "Pilih tanggal"}
      </button>
      <input type="hidden" name={nama} value={nilai} />

      {buka && <div className="tgl__latar" onClick={() => setBuka(false)} aria-hidden="true" />}
      {buka && (
        <div className="tgl__pop" data-arah={arah} role="dialog" aria-label="Pilih tanggal">
          <div className="tgl__kepala">
            <button type="button" className="tgl__nav" onClick={() => geser(-1)} aria-label="Bulan sebelumnya">
              ‹
            </button>
            <span className="tgl__bulan">
              {bulan[lihat.getMonth()]} {lihat.getFullYear()}
            </span>
            <button type="button" className="tgl__nav" onClick={() => geser(1)} aria-label="Bulan berikutnya">
              ›
            </button>
          </div>

          <div className="tgl__grid tgl__grid--head">
            {["S", "S", "R", "K", "J", "S", "M"].map((h, i) => (
              <span key={`${h}-${i}`} className="label">
                {h}
              </span>
            ))}
          </div>

          <div className="tgl__grid">
            {sel.map((d, i) => {
              if (!d) return <span key={`kosong-${i}`} />;
              const lewat = d < hariIni || d.getDay() === 1; // Senin tutup
              const aktif = iso(d) === nilai;
              return (
                <button
                  key={iso(d)}
                  type="button"
                  className="tgl__hari"
                  data-aktif={aktif}
                  disabled={lewat}
                  onClick={() => {
                    setNilai(iso(d));
                    setBuka(false);
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="tgl__kaki">
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setNilai(iso(hariIni));
                setBuka(false);
              }}
            >
              Hari ini
            </button>
            {nilai && (
              <button type="button" className="link-btn link-btn--muted" onClick={() => setNilai("")}>
                Kosongkan
              </button>
            )}
          </div>
          <span className="tgl__catatan">Senin tutup, pilih hari lain.</span>
        </div>
      )}
    </div>
  );
}
