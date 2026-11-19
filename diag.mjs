import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu"] });
const p = await b.newPage();
p.on("console", (m) => console.log("CONSOLE", m.type(), m.text().slice(0, 200)));
p.on("pageerror", (e) => console.log("PAGEERROR", String(e).slice(0, 300)));
p.on("requestfailed", (r) => console.log("FAILED", r.url(), r.failure()?.errorText));
p.on("response", (r) => { if (r.url().includes("/api/")) console.log("API", r.status(), r.url()); });
await p.goto("https://resto.vylonium.biz.id/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2500));
const info = await p.evaluate(() => ({
  kontenEls: document.querySelectorAll("[data-konten]").length,
  parkir: document.querySelector('[data-konten="parkir"]')?.textContent,
  dishCount: document.querySelectorAll(".dish").length,
  hidrasi: !!document.querySelector("[data-konten]") && document.body.innerText.includes("Di belakang gedung"),
}));
console.log(JSON.stringify(info, null, 1));
await b.close();
