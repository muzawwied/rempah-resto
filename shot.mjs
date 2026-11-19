import puppeteer from "puppeteer-core";

const url = process.argv[2];
const prefix = process.argv[3];
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--font-render-hinting=none"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1200));

const total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 1;
for (let y = 0; y < total; y += height) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `shots/${prefix}-${i}.png` });
  i++;
  if (i > 6) break;
}
console.log(prefix, "height", total, "shots", i - 1);
await browser.close();
