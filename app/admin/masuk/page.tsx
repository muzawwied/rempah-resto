"use client";

import { useState } from "react";

export default function MasukPage() {
  const [sandi, setSandi] = useState("");
  const [galat, setGalat] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="masuk">
      <div className="masuk__card">
        <span className="label">Panel kasir</span>
        <h1 className="h2" style={{ marginTop: 10 }}>
          Rempah
        </h1>
        <p className="masuk__lede">
          Masukkan sandi dapur untuk membuka pesanan, menu, dan teks situs.
        </p>

        <form
          className="masuk__form"
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            if (!sandi.trim()) {
              setGalat("Sandi belum diisi.");
              return;
            }
            setLoading(true);
            setGalat("");
            try {
              const r = await fetch("/api/masuk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sandi }),
              });
              const j = await r.json().catch(() => ({}));
              if (!r.ok) throw new Error(j.pesan ?? "Gagal masuk.");
              window.location.href = "/admin/";
            } catch (err) {
              setGalat(err instanceof Error ? err.message : "Gagal masuk.");
              setLoading(false);
            }
          }}
        >
          <div className="field">
            <label className="label" htmlFor="sandi">
              Sandi
            </label>
            <input
              id="sandi"
              type="password"
              autoComplete="current-password"
              value={sandi}
              onChange={(e) => setSandi(e.target.value)}
              autoFocus
            />
          </div>

          {galat && <p className="masuk__galat">{galat}</p>}

          <button type="submit" className="btn" disabled={loading} style={{ width: "100%", marginTop: 18 }}>
            {loading ? "Memeriksa…" : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}
