"use client";

import { useEffect, useState } from "react";
import PilihTanggal from "../../components/PilihTanggal";

const jam = ["11:00", "11:30", "12:00", "12:30", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
const tamu = ["1 orang", "2 orang", "3 orang", "4 orang", "5 orang", "6 orang", "8 orang", "10 orang"];

export default function ReserveForm() {
  const [sent, setSent] = useState(false);
  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [meja, setMeja] = useState("");

  // Nomor meja dari QR yang dipindai di meja.
  useEffect(() => {
    const nomor = new URLSearchParams(window.location.search).get("meja");
    if (nomor) setMeja(nomor.replace(/[^0-9]/g, "").slice(0, 3));
  }, []);

  if (sent) {
    return (
      <div className="notice" style={{ marginTop: 30 }}>
        <span className="label">Tercatat</span>
        <p style={{ fontSize: 15.5, color: "var(--ink)" }}>
          Terima kasih{nama ? `, ${nama}` : ""}. Permintaan meja tercatat{kode ? ` dengan kode ${kode}` : ""} dan
          akan dikonfirmasi lewat telepon maksimal satu jam kerja.
        </p>
        <p>Kalau berubah rencana, kabari kami di +62 21 7200 014.</p>
      </div>
    );
  }

  return (
    <form
      className="form"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const wajib: [string, string][] = [
          ["nama", "Nama belum diisi."],
          ["telepon", "Nomor telepon belum diisi."],
          ["tanggal", "Tanggal belum dipilih."],
        ];
        for (const [kunci, pesan] of wajib) {
          if (!String(form.get(kunci) ?? "").trim()) {
            setError(pesan);
            return;
          }
        }
        setLoading(true);
        setError("");
        try {
          const r = await fetch("/api/pesanan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tipe: "reservasi",
              nama: form.get("nama"),
              telepon: form.get("telepon"),
              tanggal: form.get("tanggal"),
              jam: form.get("jam"),
              tamu: form.get("tamu"),
              catatan: form.get("catatan"),
            }),
          });
          const j = await r.json();
          if (!r.ok) throw new Error(j.error ?? "Gagal mengirim.");
          setKode(j.data?.id ?? "");
          setSent(true);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal mengirim, coba lagi.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="field">
        <label className="label" htmlFor="nama">Nama</label>
        <input
          id="nama"
          name="nama"
          required
          placeholder="Nama yang dipakai saat datang"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="telepon">Telepon</label>
        <input id="telepon" name="telepon" required inputMode="tel" placeholder="08xx xxxx xxxx" />
      </div>
      <div className="form__row">
        <div className="field">
          <span className="label">Tanggal</span>
          <PilihTanggal nama="tanggal" />
        </div>
        <div className="field">
          <label className="label" htmlFor="jam">Jam</label>
          <select id="jam" name="jam" defaultValue="18:00">
            {jam.map((j) => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="label" htmlFor="tamu">Tamu</label>
          <select id="tamu" name="tamu" defaultValue="2 orang">
            {tamu.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      {meja && (
        <p className="label" style={{ color: "var(--brick)" }}>
          Meja {meja}
        </p>
      )}
      <div className="field">
        <label className="label" htmlFor="catatan">Catatan</label>
        <textarea
          id="catatan"
          name="catatan"
          defaultValue={meja ? `Meja ${meja}` : undefined}
          placeholder="Alergi, kursi bayi, permintaan khusus"
        />
      </div>
      {error && <p style={{ color: "var(--brick)", fontSize: 13 }}>{error}</p>}
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 6 }}>
        <button type="submit" className="btn btn--ink" disabled={loading}>
          {loading ? "Mengirim…" : "Kirim reservasi"}
        </button>
        <span className="label" style={{ letterSpacing: "0.14em" }}>
          Konfirmasi lewat telepon
        </span>
      </div>
    </form>
  );
}
