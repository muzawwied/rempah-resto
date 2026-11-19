import puppeteer from "puppeteer-core";
const B = "https://resto.vylonium.biz.id";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 960 });

const klikTeks = async (teks, hanyaTombol = true) => {
  const ok = await p.evaluate((t, khusus) => {
    const akar = khusus ? document.querySelectorAll("button") : document.querySelectorAll("button, a");
    const el = [...akar].find((e) => e.textContent.trim() === t);
    if (!el) return false;
    el.click();
    return true;
  }, teks, hanyaTombol);
  if (!ok) throw new Error("tidak ketemu tombol: " + teks);
  await new Promise((r) => setTimeout(r, 600));
};

// 1. login
await p.goto(B + "/admin/", { waitUntil: "networkidle0" });
console.log("redirect ke:", new URL(p.url()).pathname);
await p.screenshot({ path: "shots/masuk.png" });
await p.type("#sandi", "xoxvj90i3999");
await p.click("button[type=submit]");
await p.waitForFunction(() => location.pathname.startsWith("/admin") && !location.pathname.includes("masuk"), { timeout: 15000 });
await new Promise((r) => setTimeout(r, 1500));
console.log("setelah masuk:", new URL(p.url()).pathname);

// 2. tab menu
await p.evaluate(() => [...document.querySelectorAll(".admin__tab")].find(e => e.textContent.trim() === "Menu").click());
await new Promise((r) => setTimeout(r, 900));
await p.screenshot({ path: "shots/panel-menu.png" });
console.log("jml hidangan tampil:", await p.evaluate(() => document.querySelectorAll(".admin__menu li").length));

// 3. tambah hidangan
await klikTeks("Tambah hidangan");
await p.waitForSelector("#f-nama");
await p.type("#f-nama", "Uji Coba UI");
await p.evaluate(() => { document.querySelector("#f-harga").value = ""; });
await p.type("#f-harga", "15000");
await p.type("#f-catatan", "Hidangan uji dari panel.");
await p.screenshot({ path: "shots/panel-modal.png" });
await klikTeks("Simpan");
await new Promise((r) => setTimeout(r, 1800));
console.log("muncul di panel:", await p.evaluate(() => document.body.innerText.includes("Uji Coba UI")));

// 4. cek situs publik
const q = await b.newPage();
await q.goto(B + "/menu/utama/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));
console.log("muncul di /menu/utama:", await q.evaluate(() => document.body.innerText.includes("Uji Coba UI")));
await q.close();

// 5. hapus via panel
await p.bringToFront();
await p.evaluate(() => {
  const li = [...document.querySelectorAll(".admin__menu li")].find((e) => e.innerText.includes("Uji Coba UI"));
  [...li.querySelectorAll("button")].find((e) => e.textContent.trim() === "Hapus").click();
});
await new Promise((r) => setTimeout(r, 600));
await klikTeks("Hapus");
await new Promise((r) => setTimeout(r, 1800));
console.log("setelah hapus masih ada:", await p.evaluate(() => document.body.innerText.includes("Uji Coba UI")));

// 6. tab teks situs
await p.evaluate(() => [...document.querySelectorAll(".admin__tab")].find(e => e.textContent.trim() === "Teks situs").click());
await new Promise((r) => setTimeout(r, 900));
await p.waitForSelector("#k-parkir");
await p.screenshot({ path: "shots/panel-konten.png" });
await p.evaluate(() => { const t = document.querySelector("#k-parkir"); t.value = "Parkir di belakang gedung, muat dua belas mobil. Uji panel."; t.dispatchEvent(new Event("input", { bubbles: true })); });
await klikTeks("Simpan perubahan");
await new Promise((r) => setTimeout(r, 1500));
const h = await b.newPage();
await h.goto(B + "/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1800));
console.log("beranda ikut berubah:", await h.evaluate(() => document.body.innerText.includes("Uji panel")));
await h.close();

// 7. kembalikan
await p.bringToFront();
await p.evaluate(() => { const t = document.querySelector("#k-parkir"); t.value = "Di belakang gedung, muat dua belas mobil"; t.dispatchEvent(new Event("input", { bubbles: true })); });
await klikTeks("Simpan perubahan");
await new Promise((r) => setTimeout(r, 1200));

await b.close();
