import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args:["--no-sandbox","--disable-gpu"] });
for (const [url,w] of [["http://localhost:3210/",1440],["http://localhost:3210/",390]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 900 });
  await p.goto(url, { waitUntil: "networkidle0" });
  await new Promise(r=>setTimeout(r,800));
  const out = await p.evaluate(() => {
    const q = s => document.querySelector(s);
    const cs = el => el ? getComputedStyle(el) : null;
    const t = q(".hero__title"), l2 = q(".hero__title .mask:nth-child(2) > span");
    const mark = q(".foot__mark");
    return {
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      titleFont: cs(t)?.fontSize, titleLH: cs(t)?.lineHeight, titleLS: cs(t)?.letterSpacing,
      line2Color: cs(l2)?.color, line1Color: cs(t)?.color,
      kicker: !!q(".hero__kicker"),
      markFont: cs(mark)?.fontSize, markW: mark?.getBoundingClientRect().width,
      headInner: q(".site-head__inner")?.getBoundingClientRect(),
      heroInner: q(".hero__inner")?.getBoundingClientRect(),
      wrapBox: q(".section .level, .section-head")?.getBoundingClientRect(),
    };
  });
  console.log(w, JSON.stringify(out));
  await p.close();
}
await b.close();
