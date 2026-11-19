export type Status = "baru" | "dikonfirmasi" | "selesai" | "batal";

export type Pesanan = {
  id: string;
  tipe: "reservasi" | "bawa-pulang";
  nama: string;
  telepon: string;
  tanggal?: string;
  jam?: string;
  tamu?: string;
  items?: string;
  catatan?: string;
  status: Status;
  dibuat: string;
};

const seed: Pesanan[] = [
  {
    id: "PSN-1041",
    tipe: "reservasi",
    nama: "Ayu Prameswari",
    telepon: "0812 8899 1020",
    tanggal: "2026-11-19",
    jam: "19:00",
    tamu: "4 orang",
    catatan: "Satu tamu tidak makan pedas.",
    status: "baru",
    dibuat: "2026-11-18T02:10:00.000Z",
  },
  {
    id: "PSN-1040",
    tipe: "bawa-pulang",
    nama: "Bimo Saputra",
    telepon: "0857 1200 4455",
    jam: "18:30",
    items: "Rawon buntut ×2, Perkedel jagung ×1",
    catatan: "Ambil sendiri, bawa kantong kain.",
    status: "dikonfirmasi",
    dibuat: "2026-11-18T01:40:00.000Z",
  },
  {
    id: "PSN-1039",
    tipe: "reservasi",
    nama: "Keluarga Hardjo",
    telepon: "0811 900 7712",
    tanggal: "2026-11-18",
    jam: "12:30",
    tamu: "8 orang",
    catatan: "Butuh meja panjang, ada dua anak kecil.",
    status: "baru",
    dibuat: "2026-11-17T23:05:00.000Z",
  },
  {
    id: "PSN-1038",
    tipe: "bawa-pulang",
    nama: "Sarah Lim",
    telepon: "0821 3388 9012",
    jam: "17:45",
    items: "Iga bakar kecap ×1, Es kelapa jeruk ×2",
    status: "selesai",
    dibuat: "2026-11-17T21:30:00.000Z",
  },
];

const g = globalThis as unknown as { __pesanan?: Pesanan[] };
export const store: Pesanan[] = g.__pesanan ?? (g.__pesanan = [...seed]);

export function nextId(): string {
  const n = store.reduce((max, p) => Math.max(max, Number(p.id.split("-")[1]) || 0), 1030);
  return `PSN-${n + 1}`;
}
