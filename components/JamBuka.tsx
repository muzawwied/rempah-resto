"use client";

import { useEffect, useState } from "react";

const bawaan = "Selasa–Kamis|11.00–22.00\nJumat–Sabtu|11.00–23.00\nMinggu|11.00–22.00\nSenin|Tutup";

export default function JamBuka() {
  const [teks, setTeks] = useState(bawaan);

  useEffect(() => {
    let hidup = true;
    fetch("/api/konten", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const nilai = j?.data?.jam_harian;
        if (hidup && typeof nilai === "string" && nilai.trim()) setTeks(nilai);
      })
      .catch(() => {});
    return () => {
      hidup = false;
    };
  }, []);

  const baris = teks
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [hari, jam] = l.split("|");
      return { hari: (hari ?? "").trim(), jam: (jam ?? "").trim() };
    });

  return (
    <ul className="jam__daftar">
      {baris.map((b) => (
        <li key={b.hari} data-tutup={/tutup/i.test(b.jam)}>
          <span className="jam__hari">{b.hari}</span>
          <span className="jam__waktu">{b.jam}</span>
        </li>
      ))}
    </ul>
  );
}
