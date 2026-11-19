export type KunciKonten = {
  kunci: string;
  label: string;
  bantuan?: string;
  panjang?: boolean;
  baris?: number;
};

/** Teks situs yang sering berubah, disunting dari panel. */
export const daftarKonten: KunciKonten[] = [
  { kunci: "jam_buka_ringkas", label: "Jam buka (ringkas)", bantuan: "Dipakai di beranda dan footer. Satu baris per kalimat.", baris: 2 },
  { kunci: "jam_harian", label: "Jam buka per hari", bantuan: "Format: Hari|Jam, satu baris per hari.", panjang: true, baris: 5 },
  { kunci: "telepon", label: "Telepon", baris: 1 },
  { kunci: "email", label: "Email", baris: 1 },
  { kunci: "alamat", label: "Alamat", bantuan: "Dua baris: jalan, lalu kota dan kode pos.", baris: 2 },
  { kunci: "band", label: "Teks pita berjalan", panjang: true, baris: 2 },
  { kunci: "kutipan", label: "Kutipan di beranda", panjang: true, baris: 3 },
  { kunci: "catatan_penyedap", label: "Catatan dapur — penyedap", baris: 2 },
  { kunci: "catatan_alergi", label: "Catatan dapur — alergi", baris: 2 },
  { kunci: "catatan_anak", label: "Catatan dapur — anak", baris: 2 },
  { kunci: "catatan_ruang", label: "Keterangan foto ruang", baris: 2 },
  { kunci: "reservasi_telepon_note", label: "Catatan blok reservasi", panjang: true, baris: 3 },
  { kunci: "parkir", label: "Keterangan parkir", baris: 2 },
];
