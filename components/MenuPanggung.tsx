"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { menuLengkap, rupiah } from "../lib/menu";

type Item = { id?: number; grup: string; nama: string; catatan: string; harga: number };

const grup = menuLengkap.map((g) => ({ slug: g.slug, judul: g.title }));
const awal: Item[] = menuLengkap.flatMap((g) =>
  g.items.map((d) => ({ grup: g.slug, nama: d.name, catatan: d.note, harga: d.price })),
);

export default function MenuPanggung() {
  const [items, setItems] = useState<Item[]>(awal);
  const [aktif, setAktif] = useState(grup[1]?.slug ?? grup[0]?.slug ?? "utama");

  useEffect(() => {
    let hidup = true;
    fetch("/api/menu", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!hidup || !j?.data) return;
        const semua = (j.data as Item[]).filter((d) => d.nama && d.grup);
        if (semua.length) setItems(semua);
      })
      .catch(() => {});
    return () => {
      hidup = false;
    };
  }, []);

  const daftar = useMemo(() => items.filter((d) => d.grup === aktif), [items, aktif]);

  return (
    <div className="mp">
      <div className="mp__pilih" role="tablist" aria-label="Bagian menu">
        {grup.map((g) => (
          <button
            key={g.slug}
            type="button"
            role="tab"
            className="mp__tab"
            data-aktif={aktif === g.slug}
            aria-selected={aktif === g.slug}
            onClick={() => setAktif(g.slug)}
          >
            {g.judul}
          </button>
        ))}
      </div>

      <div className="mp__meta">
        <span className="label">{String(daftar.length).padStart(2, "0")} hidangan</span>
        <span className="label">Harga termasuk pajak</span>
      </div>

      <ul className="mp__daftar" key={aktif}>
        {daftar.map((d, i) => (
          <li className="mp__baris" key={d.id ?? `${d.nama}-${i}`} style={{ animationDelay: `${i * 45}ms` }}>
            <div className="mp__atas">
              <h3 className="mp__nama">{d.nama}</h3>
              <span className="mp__harga">{rupiah(d.harga)}</span>
            </div>
            {d.catatan && <p className="mp__catatan">{d.catatan}</p>}
          </li>
        ))}
      </ul>

      <Link prefetch={false} href={`/menu/${aktif}`} className="mp__tautan">
        Buka daftar lengkap
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
