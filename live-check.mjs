import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("https://rempah-demo.pages.dev/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r=>setTimeout(r,300));
const early = await p.evaluate(() => {
  const l = document.querySelector("[data-line]");
  return l ? getComputedStyle(l).transform : null;
});
await new Promise(r=>setTimeout(r,2600));
const after = await p.evaluate(() => {
  const img = document.querySelector("[data-hero-media]");
  const l = document.querySelector("[data-line]");
  return {
    img: img ? getComputedStyle(img).transform.slice(0,42) : null,
    line: l ? getComputedStyle(l).transform : null,
  };
});
await p.screenshot({ path: "shots/live-hero.png" });
await p.evaluate(() => window.scrollTo(0, 2100));
await new Promise(r=>setTimeout(r,1400));
const mid = await p.evaluate(() => {
  const strip = document.querySelector(".strip img");
  const rev = [...document.querySelectorAll("[data-reveal]")].slice(0,5).map(e=>getComputedStyle(e).opacity);
  return { strip: strip?getComputedStyle(strip).transform.slice(0,42):null, rev };
});
console.log(JSON.stringify({ early, after, mid }, null, 1));
await b.close();
