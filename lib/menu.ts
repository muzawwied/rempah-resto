export type Dish = { name: string; price: number; note: string };

export const pilihan: Dish[] = [
  { name: "Rawon Buntut", price: 96000, note: "Kluwek dari Ngawi, buntut direbus semalam sampai kuahnya hitam pekat." },
  { name: "Iga Bakar Kecap", price: 145000, note: "Arang kelapa, dioles kecap manis tiga kali, disajikan dengan sambal terasi." },
  { name: "Sate Buntel", price: 78000, note: "Daging cincang dibungkus lemak, dibakar sebentar, ditaburi bawang goreng." },
  { name: "Opor Ayam Kampung", price: 72000, note: "Santan encer, kemiri sangrai, ayam dipotong besar dan dimasak pelan." },
];

export const menuLengkap: { title: string; slug: string; items: Dish[] }[] = [
  {
    title: "Pembuka",
    slug: "pembuka",
    items: [
      { name: "Perkedel Jagung", price: 34000, note: "Jagung manis dipipil kasar, digoreng tipis, dimakan hangat." },
      { name: "Lumpia Udang", price: 44000, note: "Kulit tipis, isi udang dan bengkuang, saus cabai asam." },
      { name: "Sup Buntut Bening", price: 58000, note: "Kaldu jernih, wortel, kentang, taburan seledri." },
    ],
  },
  {
    title: "Utama",
    slug: "utama",
    items: [
      { name: "Rawon Buntut", price: 96000, note: "Kluwek dari Ngawi, kuah hitam pekat, disajikan dengan nasi." },
      { name: "Iga Bakar Kecap", price: 145000, note: "Arang kelapa, sambal terasi, lalap mentah." },
      { name: "Sate Buntel", price: 78000, note: "Daging cincang dibungkus lemak, ditaburi bawang goreng." },
      { name: "Opor Ayam Kampung", price: 72000, note: "Santan encer, kemiri sangrai, ayam kampung." },
      { name: "Gudeg Komplit", price: 58000, note: "Hanya Jumat sampai Minggu. Krecek, telur, areh." },
    ],
  },
  {
    title: "Sayur",
    slug: "sayur",
    items: [
      { name: "Terong Sambal Teri", price: 46000, note: "Terong dibakar dulu, sambal ditumbuk kasar. Bisa tanpa teri." },
      { name: "Sayur Lodeh Nangka", price: 38000, note: "Nangka muda, kacang panjang, kuah santan encer." },
      { name: "Kangkung Terasi", price: 32000, note: "Ditumis cepat di api besar, bawang putih, sedikit terasi." },
      { name: "Urap Sayur", price: 34000, note: "Kelapa parut muda, kacang panjang, kangkung, kencur." },
    ],
  },
  {
    title: "Penutup & Minum",
    slug: "penutup-dan-minum",
    items: [
      { name: "Klepon", price: 28000, note: "Enam butir, gula jawa cair, kelapa parut." },
      { name: "Pisang Goreng Madu", price: 34000, note: "Pisang raja, madu hutan, sedikit keju." },
      { name: "Es Kelapa Jeruk", price: 32000, note: "Kelapa muda, perasan jeruk nipis, gula batu." },
      { name: "Kopi Tubruk", price: 26000, note: "Robusta Temanggung, diseduh di gelas kaca." },
      { name: "Teh Melati", price: 18000, note: "Teh tubruk, gula batu disajikan terpisah." },
    ],
  },
];

export const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export const grupDariSlug = (slug: string) => menuLengkap.find((g) => g.slug === slug);
