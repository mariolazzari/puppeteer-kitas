const puppeteer = require("puppeteer");

const URL =
  "https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A11036071%2Cp_36%3A1253503011&dc&fs=true&qid=1635596580&rnid=16225007011&ref=sr_pg_1";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./userData",
  });
  const page = await browser.newPage();
  await page.goto(URL);

  const productsHandles = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  let title = "",
    price = "",
    image = "",
    items = [];

  for (let productHenlde of productsHandles) {
    try {
      title = await page.evaluate(
        el => el.querySelector("h2 > a > span").textContent,
        productHenlde
      );

      price = await page.evaluate(
        el => el.querySelector(".a-price > .a-offscreen").textContent,
        productHenlde
      );

      img = await page.evaluate(
        el => el.querySelector(".s-image").getAttribute("src"),
        productHenlde
      );

      if (title) {
        items.push({ title, price, img });
      }
    } catch (ex) {
      //console.error("Error:", ex.message);
    }
  }

  console.log(items.length);

  //  await page.screenshot({ path: "google.png" });

  await browser.close();
})();
