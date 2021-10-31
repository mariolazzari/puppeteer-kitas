const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await page.screenshot({ path: "google.png" });
  await browser.close();
})();
