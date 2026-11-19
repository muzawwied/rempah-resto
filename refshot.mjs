import puppeteer from "puppeteer-core";
const list = [
  ["https://noma.dk/", "ref-noma"],
  ["https://www.kaum.com/", "ref-kaum"],
  ["https://www.donangie.com/", "ref-donangie"],
];
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new",
  args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
for (const [url, name] of list) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise(r => setTimeout(r, 5000));
    // dismiss common cookie/age overlays by pressing Escape and clicking obvious accept buttons
    await page.keyboard.press("Escape").catch(()=>{});
    await page.screenshot({ path: `${name}.png` });
    console.log(name, "ok");
  } catch (e) { console.log(name, "err", String(e).slice(0,80)); }
  await page.close();
}
await browser.close();
