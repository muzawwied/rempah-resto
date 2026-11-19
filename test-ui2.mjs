import puppeteer from "puppeteer-core";
const B = "https://resto.vylonium.biz.id";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 980 });
await p.goto(B + "/admin/masuk/", { waitUntil: "networkidle0" });
await p.screenshot({ path: "shots/masuk.png" });
await p.type("#sandi", "xoxvj90i3999");
await p.click("button[type=submit]");
await p.waitForFunction(() => location.pathname === "/admin/", { timeout: 15000 });
await new Promise((r) => setTimeout(r, 1200));

const tab = async (nama) => {
  await p.evaluate((t) => [...document.querySelectorAll(".admin__tab")].find((e) => e.textContent.trim() === t).click(), nama);
  await new Promise((r) => setTimeout(r, 700));
};
const klikModal = async (teks) => {
  await p.evaluate((t) => {
    const m = document.querySelector(".modal");
    [...m.querySelectorAll("button")].find((e) => e.textContent.trim() === t).click();
  }, teks);
  await new Promise((r) => setTimeout(r, 900));
};

await tab("Menu");
await p.screenshot({ path: "shots/panel-menu.png" });

// tambah
await p.evaluate(() => [...document.querySelectorAll("button")].find((e) => e.textContent.trim() === "Tambah hidangan").click());
await p.waitForSelector("#f-nama");
await p.type("#f-nama", "Uji Hapus");
await p.evaluate(() => {
  const h = document.querySelector("#f-harga");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(h, "18000");
  h.dispatchEvent(new Event("input", { bubbles: true }));
});
await p.screenshot({ path: "shots/panel-modal.png" });
await klikModal("Simpan");
console.log("tambah ok:", await p.evaluate(() => document.body.textContent.includes("Uji Hapus")));

// hapus lewat konfirmasi sendiri
await p.evaluate(() => {
  const li = [...document.querySelectorAll(".admin__menu li")].find((e) => e.textContent.includes("Uji Hapus"));
  [...li.querySelectorAll("button")].find((e) => e.textContent.trim() === "Hapus").click();
});
await new Promise((r) => setTimeout(r, 700));
await p.screenshot({ path: "shots/panel-hapus.png" });
await klikModal("Hapus");
await new Promise((r) => setTimeout(r, 1200));
console.log("hapus ok:", !(await p.evaluate(() => document.body.textContent.includes("Uji Hapus"))));

await tab("Teks situs");
await p.waitForSelector("#k-parkir");
await new Promise((r) => setTimeout(r, 500));
await p.screenshot({ path: "shots/panel-konten.png" });

await p.setViewport({ width: 390, height: 844 });
await new Promise((r) => setTimeout(r, 600));
await p.screenshot({ path: "shots/panel-mobile.png" });
await b.close();
