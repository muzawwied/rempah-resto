import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu"] });
const p = await b.newPage();
p.on("response", (r) => { if (r.url().includes("/api/")) console.log("API", r.status(), r.url()); });
p.on("pageerror", (e) => console.log("PAGEERROR", String(e).slice(0,200)));
await p.goto("https://resto.vylonium.biz.id/menu/utama/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2500));
console.log(JSON.stringify(await p.evaluate(() => ({
  dishes: [...document.querySelectorAll(".dish__name")].map(e => e.textContent),
  adaUji: document.body.innerText.includes("Uji Coba UI"),
})), null, 1));
await b.close();
