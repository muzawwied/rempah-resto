"use client";

import { useEffect, useState } from "react";
import { menuLengkap, rupiah } from "../lib/menu";

type Item = { id?: number; grup?: string; nama: string; catatan: string; harga: number };

const judulGrup = (slug: string) => menuLengkap.find((g) => g.slug === slug)?.title ?? slug;

export default function MenuLive({
  awal,
  grup,
  batas,
  mode = "datar",
}: {
  awal: Item[];
  grup?: string;
  batas?: number;
  mode?: "datar" | "semua";
}) {
  const [items, setItems] = useState<Item[]>(awal);

  useEffect(() => {
    let hidup = true;
    fetch("/api/menu", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!hidup || !j?.data) return;
        const semua = (j.data as Item[]).filter((d) => d.nama);
        setItems(semua);
      })
      .catch(() => {});
    return () => {
      hidup = false;
    };
  }, []);

  const saring = (daftar: Item[]) => {
    let hasil = grup ? daftar.filter((d) => d.grup === grup || (!d.grup && awal.length)) : daftar;
    if (batas) hasil = hasil.slice(0, batas);
    return hasil;
  };

  if (mode === "semua") {
    const slugs = [...new Set([...menuLengkap.map((g) => g.slug), ...items.map((d) => d.grup ?? "")])].filter(Boolean);
    return (
      <>
        {slugs.map((slug) => {
          const daftar = items.filter((d) => d.grup === slug);
          if (!daftar.length) return null;
          return (
            <section className="group" key={slug}>
              <div className="group__title">
                <a href={`/menu/${slug}`} data-reveal>
                  <h2>{judulGrup(slug)}</h2>
                </a>
                <span className="label" data-reveal>
                  {String(daftar.length).padStart(2, "0")} hidangan
                </span>
              </div>
              <ul className="dishes">
                {daftar.map((d, i) => (
                  <li className="dish" key={d.id ?? `${d.nama}-${i}`} data-reveal>
                    <span className="dish__name">{d.nama}</span>
                    <span className="dish__dots" />
                    <span className="dish__price">{rupiah(d.harga)}</span>
                    {d.catatan && <p className="dish__note">{d.catatan}</p>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </>
    );
  }

  return (
    <ul className="dishes">
      {saring(items).map((d, i) => (
        <li className="dish" key={d.id ?? `${d.nama}-${i}`} data-reveal>
          <span className="dish__name">{d.nama}</span>
          <span className="dish__dots" />
          <span className="dish__price">{rupiah(d.harga)}</span>
          {d.catatan && <p className="dish__note">{d.catatan}</p>}
        </li>
      ))}
    </ul>
  );
}
