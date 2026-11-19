"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Pesanan, Status } from "../../lib/pesanan";
import { daftarKonten } from "../../lib/konten";

const statusLabel: Record<Status, string> = {
  baru: "Baru",
  dikonfirmasi: "Dikonfirmasi",
  selesai: "Selesai",
  batal: "Dibatalkan",
};

const filters: { key: "semua" | Status; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "baru", label: "Baru" },
  { key: "dikonfirmasi", label: "Dikonfirmasi" },
  { key: "selesai", label: "Selesai" },
  { key: "batal", label: "Dibatalkan" },
];

const GRUP = [
  { slug: "pembuka", judul: "Pembuka" },
  { slug: "utama", judul: "Utama" },
  { slug: "sayur", judul: "Sayur" },
  { slug: "penutup-dan-minum", judul: "Penutup & Minum" },
];

type MenuItem = {
  id: number;
  grup: string;
  nama: string;
  catatan: string | null;
  harga: number;
  urutan: number;
  tampil: number;
};

type Tab = "pesanan" | "menu" | "konten" | "qr";

const jam = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

const tanggal = (iso?: string) =>
  iso
    ? new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { weekday: "short", day: "2-digit", month: "short" })
    : "—";

const rupiah = (n: number) => "Rp " + Number(n || 0).toLocaleString("id-ID");

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("pesanan");
  const [toast, setToast] = useState("");

  const bunyi = (pesan: string) => {
    setToast(pesan);
    window.setTimeout(() => setToast(""), 3200);
  };

  /* ---------------- Pesanan ---------------- */
  const [rows, setRows] = useState<Pesanan[]>([]);
  const [aktif, setAktif] = useState<"semua" | Status>("semua");
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");

  const muatPesanan = useCallback(async () => {
    try {
      const r = await fetch("/api/pesanan", { cache: "no-store" });
      const j = await r.json();
      setRows(j.data ?? []);
      setGalat("");
    } catch {
      setGalat("Gagal mengambil data pesanan.");
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => {
    muatPesanan();
    const t = setInterval(muatPesanan, 15000);
    return () => clearInterval(t);
  }, [muatPesanan]);

  const ubahStatus = async (id: string, status: Status) => {
    setRows((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    await fetch(`/api/pesanan/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    muatPesanan();
  };

  const tampilPesanan = useMemo(
    () => (aktif === "semua" ? rows : rows.filter((r) => r.status === aktif)),
    [rows, aktif],
  );
  const hitung = (s: Status) => rows.filter((r) => r.status === s).length;

  /* ---------------- Menu ---------------- */
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [memuatMenu, setMemuatMenu] = useState(true);
  const [form, setForm] = useState<MenuItem | null>(null);
  const [hapusTarget, setHapusTarget] = useState<MenuItem | null>(null);

  const muatMenu = useCallback(async () => {
    try {
      const r = await fetch("/api/menu", { cache: "no-store" });
      const j = await r.json();
      setMenu(j.data ?? []);
    } catch {
      bunyi("Gagal mengambil data menu.");
    } finally {
      setMemuatMenu(false);
    }
  }, []);

  useEffect(() => {
    muatMenu();
  }, [muatMenu]);

  const kosong: MenuItem = { id: 0, grup: "utama", nama: "", catatan: "", harga: 0, urutan: 10, tampil: 1 };

  const simpanMenu = async (data: MenuItem) => {
    const baru = !data.id;
    const r = await fetch("/api/menu", {
      method: baru ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      bunyi(j.pesan ?? "Gagal menyimpan hidangan.");
      return;
    }
    setForm(null);
    await muatMenu();
    bunyi(baru ? "Hidangan ditambahkan." : "Hidangan diperbarui.");
  };

  const hapusMenu = async (item: MenuItem) => {
    const r = await fetch(`/api/menu?id=${item.id}`, { method: "DELETE" });
    if (!r.ok) {
      bunyi("Gagal menghapus hidangan.");
      return;
    }
    setHapusTarget(null);
    await muatMenu();
    bunyi("Hidangan dihapus.");
  };

  const ubahTampil = async (item: MenuItem) => {
    await fetch("/api/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, tampil: item.tampil ? 0 : 1 }),
    });
    await muatMenu();
    bunyi(item.tampil ? "Hidangan disembunyikan." : "Hidangan ditampilkan.");
  };

  const geser = async (item: MenuItem, arah: -1 | 1) => {
    const satuGrup = menu.filter((m) => m.grup === item.grup);
    const i = satuGrup.findIndex((m) => m.id === item.id);
    const tukar = satuGrup[i + arah];
    if (!tukar) return;
    await Promise.all([
      fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, urutan: tukar.urutan }),
      }),
      fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...tukar, urutan: item.urutan }),
      }),
    ]);
    await muatMenu();
  };

  /* ---------------- Konten ---------------- */
  const [konten, setKonten] = useState<Record<string, string>>({});
  const [memuatKonten, setMemuatKonten] = useState(true);
  const [simpanLoading, setSimpanLoading] = useState(false);

  useEffect(() => {
    fetch("/api/konten", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setKonten(j.data ?? {}))
      .catch(() => bunyi("Gagal mengambil teks situs."))
      .finally(() => setMemuatKonten(false));
  }, []);

  const simpanKonten = async () => {
    setSimpanLoading(true);
    const r = await fetch("/api/konten", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nilai: konten }),
    });
    setSimpanLoading(false);
    bunyi(r.ok ? "Teks situs disimpan." : "Gagal menyimpan teks situs.");
  };

  /* ---------------- QR meja ---------------- */
  const [meja, setMeja] = useState("");
  const [qr, setQr] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const dasar = typeof window !== "undefined" ? window.location.origin : "https://resto.vylonium.biz.id";
    const nomor = meja.trim();
    const alamat = `${dasar}/reservasi/${nomor ? `?meja=${encodeURIComponent(nomor)}` : ""}`;
    setUrl(alamat);
    let hidup = true;
    import("qrcode")
      .then((mod) =>
        mod.default.toDataURL(alamat, {
          errorCorrectionLevel: "M",
          width: 760,
          margin: 1,
          color: { dark: "#191512", light: "#f2ebe3" },
        }),
      )
      .then((gambar) => {
        if (hidup) setQr(gambar);
      })
      .catch(() => bunyi("Gagal membuat QR."));
    return () => {
      hidup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meja]);

  const unduhQr = () => {
    if (!qr) return;
    const a = document.createElement("a");
    a.href = qr;
    a.download = `qr-rempah${meja.trim() ? `-meja-${meja.trim()}` : ""}.png`;
    a.click();
    bunyi("QR diunduh.");
  };

  const unduhPoster = async () => {
    if (!qr) return;
    const kanvas = document.createElement("canvas");
    kanvas.width = 1240;
    kanvas.height = 1754;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    const display = getComputedStyle(document.body).getPropertyValue("--font-display").trim() || "Impact, sans-serif";
    try {
      await document.fonts.ready;
    } catch {
      /* abaikan */
    }

    ctx.fillStyle = "#f2ebe3";
    ctx.fillRect(0, 0, kanvas.width, kanvas.height);

    ctx.fillStyle = "#191512";
    ctx.textAlign = "center";
    ctx.font = `72px ${display}`;
    ctx.fillText("REMPAH", kanvas.width / 2, 200);

    const gambar = new Image();
    gambar.src = qr;
    await new Promise((selesai) => {
      gambar.onload = selesai;
      gambar.onerror = selesai;
    });
    const sisi = 780;
    ctx.drawImage(gambar, (kanvas.width - sisi) / 2, 320, sisi, sisi);

    ctx.fillStyle = "#191512";
    ctx.font = `56px ${display}`;
    ctx.fillText("PINDAI UNTUK RESERVASI", kanvas.width / 2, 1230);

    ctx.font = `26px ${display}`;
    ctx.fillStyle = "#8b2a21";
    ctx.fillText(meja.trim() ? `MEJA ${meja.trim()}` : "KEBAYORAN BARU, JAKARTA", kanvas.width / 2, 1300);

    ctx.font = "22px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#7a6f63";
    ctx.fillText("Arahkan kamera ponsel ke kode di atas", kanvas.width / 2, 1360);

    const tautan = document.createElement("a");
    tautan.href = kanvas.toDataURL("image/png");
    tautan.download = `poster-rempah${meja.trim() ? `-meja-${meja.trim()}` : ""}.png`;
    tautan.click();
    bunyi("Poster diunduh, siap dicetak.");
  };

  const keluar = async () => {
    await fetch("/api/masuk", { method: "DELETE" });
    window.location.href = "/admin/masuk/";
  };

  return (
    <main className="admin">
      <div className="admin__bar">
        <div className="wrap admin__bar-inner">
          <div className="admin__id">
            <Link href="/" className="brand">
              Rempah
            </Link>
            <span className="label">Panel kasir</span>
          </div>
          <div className="admin__bar-aksi">
            <Link href="/" className="link-u">
              Lihat situs
            </Link>
            <button type="button" className="link-btn" onClick={keluar}>
              Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="admin__tabs">
          {(
            [
              ["pesanan", "Pesanan"],
              ["menu", "Menu"],
              ["konten", "Info situs"],
              ["qr", "QR meja"],
            ] as [Tab, string][]
          ).map(([k, l]) => (
            <button key={k} type="button" className="admin__tab" data-aktif={tab === k} onClick={() => setTab(k)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {tab === "pesanan" && (
        <>
          <div className="wrap admin__head">
            <span className="label">Pesanan masuk</span>
            <h1 className="h2" style={{ marginTop: 12 }}>
              Dapur hari ini
            </h1>
            <p className="lede admin__lede">
              Reservasi dan pesanan bawa pulang dari situs masuk ke sini. Halaman menyegarkan sendiri
              tiap lima belas detik.
            </p>
          </div>

          <div className="wrap">
            <div className="admin__stats">
              <div>
                <span className="label">Baru</span>
                <strong>{hitung("baru")}</strong>
              </div>
              <div>
                <span className="label">Dikonfirmasi</span>
                <strong>{hitung("dikonfirmasi")}</strong>
              </div>
              <div>
                <span className="label">Selesai</span>
                <strong>{hitung("selesai")}</strong>
              </div>
              <div>
                <span className="label">Total</span>
                <strong>{rows.length}</strong>
              </div>
            </div>

            <div className="admin__filters">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className="chip"
                  data-aktif={aktif === f.key}
                  onClick={() => setAktif(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {galat && <p className="admin__galat">{galat}</p>}

            {memuat ? (
              <p className="admin__kosong">Memuat pesanan…</p>
            ) : tampilPesanan.length === 0 ? (
              <div className="admin__kosong">
                <p>Belum ada pesanan di bagian ini.</p>
                <p style={{ fontSize: 13, marginTop: 6 }}>
                  Pesanan baru dari formulir reservasi akan muncul sendiri.
                </p>
              </div>
            ) : (
              <ul className="orders">
                {tampilPesanan.map((p) => (
                  <li className="order" key={p.id} data-status={p.status}>
                    <div className="order__top">
                      <span className="order__kode">{p.id}</span>
                      <span className="order__tipe">
                        {p.tipe === "reservasi" ? "Reservasi" : "Bawa pulang"}
                      </span>
                      <span className="order__status" data-status={p.status}>
                        {statusLabel[p.status]}
                      </span>
                    </div>

                    <div className="order__grid">
                      <div className="order__cell">
                        <span className="label">Tamu</span>
                        <p className="order__nama">{p.nama}</p>
                        <p className="order__meta">{p.telepon}</p>
                      </div>
                      <div className="order__cell">
                        <span className="label">Waktu</span>
                        <p className="order__meta">
                          {p.tipe === "reservasi"
                            ? `${tanggal(p.tanggal)} · ${p.jam ?? "—"} · ${p.tamu ?? "—"}`
                            : `Ambil ${p.jam ?? "—"} hari ini`}
                        </p>
                        <p className="order__meta" style={{ opacity: 0.6 }}>
                          Masuk {jam(p.dibuat)}
                        </p>
                      </div>
                      <div className="order__cell order__cell--wide">
                        <span className="label">{p.tipe === "reservasi" ? "Catatan" : "Pesanan"}</span>
                        <p className="order__meta">{p.items ?? p.catatan ?? "—"}</p>
                        {p.items && p.catatan && <p className="order__meta">{p.catatan}</p>}
                      </div>
                    </div>

                    <div className="order__aksi">
                      {p.status !== "dikonfirmasi" && p.status !== "selesai" && (
                        <button type="button" className="btn btn--sm" onClick={() => ubahStatus(p.id, "dikonfirmasi")}>
                          Konfirmasi
                        </button>
                      )}
                      {p.status !== "selesai" && (
                        <button type="button" className="link-btn" onClick={() => ubahStatus(p.id, "selesai")}>
                          Tandai selesai
                        </button>
                      )}
                      {p.status !== "batal" && p.status !== "selesai" && (
                        <button
                          type="button"
                          className="link-btn link-btn--muted"
                          onClick={() => ubahStatus(p.id, "batal")}
                        >
                          Batalkan
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {tab === "menu" && (
        <>
          <div className="wrap admin__head">
            <span className="label">Menu</span>
            <h1 className="h2" style={{ marginTop: 12 }}>
              Hidangan
            </h1>
            <p className="lede admin__lede">
              Tambah, ubah, sembunyikan, atau hapus hidangan. Perubahan langsung tampil di halaman menu
              tanpa perlu deploy ulang.
            </p>
            <div style={{ marginTop: 20 }}>
              <button type="button" className="btn btn--ink" onClick={() => setForm({ ...kosong })}>
                Tambah hidangan
              </button>
            </div>
          </div>

          <div className="wrap">
            {memuatMenu ? (
              <p className="admin__kosong">Memuat menu…</p>
            ) : (
              GRUP.map((g) => {
                const daftar = menu.filter((m) => m.grup === g.slug);
                return (
                  <section className="admin__grup" key={g.slug}>
                    <div className="admin__grup-head">
                      <h2 className="h3">{g.judul}</h2>
                      <span className="label">{String(daftar.length).padStart(2, "0")} hidangan</span>
                    </div>

                    {daftar.length === 0 ? (
                      <p className="admin__kosong" style={{ padding: "16px 0" }}>
                        Belum ada hidangan di bagian ini.
                      </p>
                    ) : (
                      <ul className="admin__menu">
                        {daftar.map((m) => (
                          <li key={m.id} data-sembunyi={!m.tampil}>
                            <div className="admin__menu-main">
                              <p className="admin__menu-nama">
                                {m.nama}
                                {!m.tampil && <span className="admin__tag">disembunyikan</span>}
                              </p>
                              {m.catatan && <p className="admin__menu-note">{m.catatan}</p>}
                            </div>
                            <span className="admin__menu-harga">{rupiah(m.harga)}</span>
                            <div className="admin__menu-aksi">
                              <button type="button" className="link-btn" onClick={() => geser(m, -1)} aria-label="Naikkan">
                                ↑
                              </button>
                              <button type="button" className="link-btn" onClick={() => geser(m, 1)} aria-label="Turunkan">
                                ↓
                              </button>
                              <button type="button" className="link-btn" onClick={() => ubahTampil(m)}>
                                {m.tampil ? "Sembunyikan" : "Tampilkan"}
                              </button>
                              <button type="button" className="link-btn" onClick={() => setForm({ ...m, catatan: m.catatan ?? "" })}>
                                Ubah
                              </button>
                              <button type="button" className="link-btn link-btn--muted" onClick={() => setHapusTarget(m)}>
                                Hapus
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })
            )}
          </div>
        </>
      )}

      {tab === "konten" && (
        <>
          <div className="wrap admin__head">
            <span className="label">Info situs</span>
            <h1 className="h2" style={{ marginTop: 12 }}>
              Jam buka, kontak, catatan
            </h1>
            <p className="lede admin__lede">
              Semua tulisan ini bisa disunting kapan saja, dan langsung berganti di situs.
            </p>
          </div>

          <div className="wrap">
            {memuatKonten ? (
              <p className="admin__kosong">Memuat teks…</p>
            ) : (
              <div className="admin__konten">
                {daftarKonten.map((k) => (
                  <div className="field" key={k.kunci}>
                    <label className="label" htmlFor={`k-${k.kunci}`}>
                      {k.label}
                    </label>
                    {k.bantuan && <p className="admin__bantuan">{k.bantuan}</p>}
                    <textarea
                      id={`k-${k.kunci}`}
                      rows={k.baris ?? 2}
                      value={konten[k.kunci] ?? ""}
                      onChange={(e) => setKonten({ ...konten, [k.kunci]: e.target.value })}
                    />
                  </div>
                ))}
                <div className="admin__konten-aksi">
                  <button type="button" className="btn btn--ink" onClick={simpanKonten} disabled={simpanLoading}>
                    {simpanLoading ? "Menyimpan…" : "Simpan perubahan"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {tab === "qr" && (
        <>
          <div className="wrap admin__head">
            <span className="label">QR meja</span>
            <h1 className="h2" style={{ marginTop: 12 }}>
              Pindai, langsung pesan
            </h1>
            <p className="lede admin__lede">
              Cetak atau tempel QR ini di meja. Pelanggan yang memindai langsung dibawa ke formulir
              reservasi di ponselnya, tanpa perlu mencari alamat situs.
            </p>
          </div>

          <div className="wrap qr">
            <div className="qr__atur no-print">
              <div className="field">
                <label className="label" htmlFor="qr-meja">
                  Nomor meja (boleh dikosongkan)
                </label>
                <input
                  id="qr-meja"
                  inputMode="numeric"
                  placeholder="misal 7"
                  value={meja}
                  onChange={(e) => setMeja(e.target.value.replace(/[^\d]/g, "").slice(0, 3))}
                />
              </div>
              <p className="admin__bantuan">
                Nomor meja ikut terkirim di catatan pesanan, jadi dapur tahu tamu duduk di mana.
              </p>
              <div className="qr__aksi">
                <button type="button" className="btn btn--ink" onClick={unduhQr} disabled={!qr}>
                  Unduh PNG
                </button>
                <button type="button" className="link-btn" onClick={unduhPoster} disabled={!qr}>
                  Unduh poster
                </button>
              </div>
              <p className="qr__url">{url}</p>
            </div>

            <div className="qr-cetak">
              <div className="qr-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={qr || "/img/rawon.webp"} alt={qr ? `QR menuju ${url}` : "Menyiapkan QR"} className="qr-card__gambar" />
                <span className="qr-card__merek">Rempah</span>
                <p className="qr-card__judul">Pindai untuk reservasi</p>
                <p className="qr-card__kecil">
                  {meja.trim() ? `Meja ${meja.trim()} · ` : ""}Arahkan kamera ponsel ke kode ini
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {form && (
        <div className="modal">
          <form
            className="modal__card"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              simpanMenu(form);
            }}
          >
            <span className="label">{form.id ? "Ubah hidangan" : "Hidangan baru"}</span>
            <h2 className="h3" style={{ marginTop: 8 }}>
              {form.nama || "Hidangan"}
            </h2>

            <div className="field" style={{ marginTop: 18 }}>
              <label className="label" htmlFor="f-grup">
                Bagian menu
              </label>
              <select id="f-grup" value={form.grup} onChange={(e) => setForm({ ...form, grup: e.target.value })}>
                {GRUP.map((g) => (
                  <option key={g.slug} value={g.slug}>
                    {g.judul}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="f-nama">
                Nama
              </label>
              <input id="f-nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required />
            </div>

            <div className="form__row">
              <div className="field">
                <label className="label" htmlFor="f-harga">
                  Harga (Rp)
                </label>
                <input
                  id="f-harga"
                  type="number"
                  min={0}
                  step={1000}
                  value={form.harga}
                  onChange={(e) => setForm({ ...form, harga: Number(e.target.value) })}
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="f-urutan">
                  Urutan
                </label>
                <input
                  id="f-urutan"
                  type="number"
                  value={form.urutan}
                  onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="f-catatan">
                Keterangan
              </label>
              <textarea
                id="f-catatan"
                rows={3}
                value={form.catatan ?? ""}
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              />
            </div>

            <label className="admin__cek">
              <input
                type="checkbox"
                checked={!!form.tampil}
                onChange={(e) => setForm({ ...form, tampil: e.target.checked ? 1 : 0 })}
              />
              Tampilkan di situs
            </label>

            <div className="modal__aksi">
              <button type="button" className="link-btn link-btn--muted" onClick={() => setForm(null)}>
                Batal
              </button>
              <button type="submit" className="btn">
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {hapusTarget && (
        <div className="modal">
          <div className="modal__card">
            <span className="label">Hapus hidangan</span>
            <h2 className="h3" style={{ marginTop: 8 }}>
              {hapusTarget.nama}
            </h2>
            <p className="masuk__lede">Hidangan ini akan hilang dari daftar menu. Bisa ditambahkan lagi kapan saja.</p>
            <div className="modal__aksi">
              <button type="button" className="link-btn link-btn--muted" onClick={() => setHapusTarget(null)}>
                Batal
              </button>
              <button type="button" className="btn btn--ink" onClick={() => hapusMenu(hapusTarget)}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
