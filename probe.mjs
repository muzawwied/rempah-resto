import puppeteer from "puppeteer-core";
const urls = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new",
  args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
for (const url of urls) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise(r => setTimeout(r, 3500));
    const info = await page.evaluate(() => {
      const cs = (el, p) => el ? getComputedStyle(el)[p] : null;
      const h1 = document.querySelector("h1");
      const body = document.body;
      const btns = [...document.querySelectorAll("a,button")].slice(0,60).map(b => (b.innerText||"").trim()).filter(Boolean);
      return {
        title: document.title,
        bodyFont: cs(body,"fontFamily"),
        bodyBg: cs(body,"backgroundColor"),
        bodyColor: cs(body,"color"),
        h1: h1 ? { text: h1.innerText.slice(0,70).replace(/\n/g," / "), font: cs(h1,"fontFamily"), size: cs(h1,"fontSize"),
                   weight: cs(h1,"fontWeight"), lh: cs(h1,"lineHeight"), ls: cs(h1,"letterSpacing"), tt: cs(h1,"textTransform"),
                   color: cs(h1,"color") } : null,
        imgs: document.images.length, videos: document.querySelectorAll("video").length,
        cta: btns.slice(0,12),
        height: document.documentElement.scrollHeight
      };
    });
    console.log(JSON.stringify({ url, ...info }, null, 1));
  } catch (e) { console.log(JSON.stringify({ url, error: String(e).slice(0,120) })); }
  await page.close();
}
await browser.close();
