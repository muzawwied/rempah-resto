"use client";

import { useEffect } from "react";

/** Menyisipkan teks situs dari panel ke elemen bertanda data-konten. */
export default function KontenSync() {
  useEffect(() => {
    let hidup = true;
    fetch("/api/konten", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!hidup || !j?.data) return;
        const data: Record<string, string> = j.data;

        document.querySelectorAll<HTMLElement>("[data-konten]").forEach((el) => {
          const kunci = el.dataset.konten!;
          if (!(kunci in data)) return;
          const isi = data[kunci];
          if (el.dataset.kontenMode === "html") {
            el.textContent = isi;
            return;
          }
          const nodes: (string | HTMLElement)[] = [];
          isi.split("\n").forEach((baris, i) => {
            if (i) nodes.push(document.createElement("br"));
            nodes.push(baris);
          });
          el.replaceChildren(...nodes);
        });

        document.querySelectorAll<HTMLElement>("[data-konten-dl]").forEach((dl) => {
          const isi = data[dl.dataset.kontenDl!];
          if (!isi) return;
          const rows = isi
            .split("\n")
            .filter(Boolean)
            .map((baris) => {
              const [hari, jam] = baris.split("|").map((s) => (s ?? "").trim());
              const div = document.createElement("div");
              const dt = document.createElement("dt");
              const dd = document.createElement("dd");
              dt.textContent = hari;
              dd.textContent = jam ?? "";
              div.append(dt, dd);
              return div;
            });
          dl.replaceChildren(...rows);
        });

        document.querySelectorAll<HTMLAnchorElement>("[data-konten-tel]").forEach((a) => {
          const nomor = data[a.dataset.kontenTel!];
          if (!nomor) return;
          a.href = "tel:" + nomor.replace(/[^+\d]/g, "");
          a.textContent = nomor;
        });

        document.querySelectorAll<HTMLAnchorElement>("[data-konten-mail]").forEach((a) => {
          const alamat = data[a.dataset.kontenMail!];
          if (!alamat) return;
          a.href = "mailto:" + alamat;
          a.textContent = alamat;
        });
      })
      .catch(() => {});
    return () => {
      hidup = false;
    };
  }, []);

  return null;
}
