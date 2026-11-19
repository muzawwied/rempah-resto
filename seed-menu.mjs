import { menuLengkap } from "./lib/menu.ts";
const rows = [];
for (const g of menuLengkap) g.items.forEach((d, i) => rows.push({ grup: g.slug, nama: d.name, catatan: d.note, harga: d.price, urutan: (i + 1) * 10, tampil: 1 }));
const esc = (s) => String(s).replace(/'/g, "''");
const sql = [
  `CREATE TABLE IF NOT EXISTS menu_item (id INTEGER PRIMARY KEY AUTOINCREMENT, grup TEXT NOT NULL, nama TEXT NOT NULL, catatan TEXT, harga INTEGER NOT NULL DEFAULT 0, urutan INTEGER DEFAULT 0, tampil INTEGER DEFAULT 1, diubah TEXT);`,
  `CREATE TABLE IF NOT EXISTS konten (kunci TEXT PRIMARY KEY, nilai TEXT, diubah TEXT);`,
];
const values = rows.map(r => `('${esc(r.grup)}','${esc(r.nama)}','${esc(r.catatan)}',${r.harga},${r.urutan},${r.tampil},'2026-11-18T00:00:00Z')`).join(",");
sql.push(`INSERT INTO menu_item (grup,nama,catatan,harga,urutan,tampil,diubah) VALUES ${values};`);
const konten = {
  band: "Masakan rumah — menu baru tiap Senin — dimasak dengan arang — tanpa penyedap tambahan —",
  jam_buka: "Selasa sampai Minggu|11.00–22.00",
  jam_buka_ringkas: "Selasa sampai Minggu\n11.00–22.00",
  telepon: "+62 21 7200 014",
  email: "dapur@rempah.id",
  alamat: "Jl. Bumi No. 14, Kebayoran Baru\nJakarta Selatan 12130",
  jam_harian: "Selasa–Kamis|11.00–22.00\nJumat–Sabtu|11.00–23.00\nMinggu|11.00–22.00\nSenin|Tutup",
  kutipan: "“Menu berganti tiap Senin, bukan karena tren, tapi karena pasar yang berubah.”",
  catatan_penyedap: "Tidak memakai MSG. Asinnya dari garam, manisnya dari gula dan kecap.",
  catatan_alergi: "Beri tahu saat memesan. Sebagian besar hidangan bisa disesuaikan.",
  catatan_anak: "Porsi setengah dan kursi bayi tersedia tanpa perlu memesan lebih dulu.",
  catatan_ruang: "Empat puluh kursi, satu meja panjang dua belas orang, dan dapur yang terlihat dari meja.",
  reservasi_telepon_note: "Akhir pekan biasanya penuh. Untuk rombongan di atas sepuluh orang, sebaiknya telepon supaya meja panjang bisa kami tata lebih dulu.",
  parkir: "Di belakang gedung, muat dua belas mobil",
};
const kv = Object.entries(konten).map(([k, v]) => `('${k}','${esc(v)}','2026-11-18T00:00:00Z')`).join(",");
sql.push(`INSERT OR IGNORE INTO konten (kunci,nilai,diubah) VALUES ${kv};`);
console.log(sql.join("\n"));
