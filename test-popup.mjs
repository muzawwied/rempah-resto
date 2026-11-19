import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });

// 1. Halaman publik: kirim reservasi, tidak boleh ada 401 / popup
const p = await b.newPage();
const codes = [];
p.on("response", (r) => { if (r.url().includes("/api/pesanan")) codes.push(r.status()); });
await p.goto("https://resto.vylonium.biz.id/reservasi/", { waitUntil: "networkidle0", timeout: 60000 });
await p.type("#nama", "Uji Tanpa Popup");
await p.type("#telepon", "0812 0000 7777");
await p.type("#tanggal", "2026-11-25");
await p.select("#jam", "19:00").catch(()=>{});
await p.select("#tamu", "2 orang").catch(()=>{});
await p.click("button[type=submit]");
await new Promise(r=>setTimeout(r,2500));
const txt = await p.evaluate(() => document.body.innerText.slice(0, 400));
console.log("API statuses:", codes.join(","));
console.log("ada konfirmasi:", /Tercatat|kode PSN/.test(txt));

// 2. Panel: login, pastikan daftar pesanan termuat lewat cookie
const a = await b.newPage();
await a.authenticate({ username: "dapur", password: "xoxvj90i3999" });
const acodes = [];
a.on("response", (r) => { if (r.url().includes("/api/pesanan")) acodes.push(r.status()); });
await a.goto("https://resto.vylonium.biz.id/admin/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r=>setTimeout(r,2500));
const list = await a.evaluate(() => document.body.innerText);
console.log("panel api statuses:", acodes.join(","));
console.log("panel memuat pesanan:", /PSN-/.test(list), "| jumlah baris PSN:", (list.match(/PSN-/g)||[]).length);
await a.screenshot({ path: "shots/kasir.png" });
await b.close();
