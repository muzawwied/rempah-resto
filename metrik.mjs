import puppeteer from "puppeteer-core";
const B = "https://resto.vylonium.biz.id";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu"] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, isMobile: true });
for (const [nama, url] of [["masuk", "/admin/masuk/"], ["beranda", "/"], ["menu", "/menu/utama/"]]) {
  await p.goto(B + url, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));
  const m = await p.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    kartu: (() => { const c = document.querySelector(".masuk__card"); if (!c) return null; const r = c.getBoundingClientRect(); return { x: Math.round(r.x), w: Math.round(r.width), y: Math.round(r.y) }; })(),
  }));
  console.log(nama, JSON.stringify(m));
}
await b.close();
