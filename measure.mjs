import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:3210/", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,700));
const m = await p.evaluate(() => {
  const el = document.querySelector(".foot__mark");
  const r = document.createRange();
  r.selectNodeContents(el);
  const rect = r.getBoundingClientRect();
  return { textW: rect.width, boxW: el.getBoundingClientRect().width, fontSize: getComputedStyle(el).fontSize };
});
console.log(JSON.stringify(m), "needed vw factor:", (28 * m.boxW / m.textW).toFixed(2));
await b.close();
