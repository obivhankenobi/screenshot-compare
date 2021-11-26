const puppeteer = require("puppeteer");
const urls = require("../uym.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      isMobile: false,
    },
  });
  const page = await browser.newPage();

  for (const [index, url] of urls.entries()) {
    console.log(index + "-->" + url);
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewport({ width: 1920, height: bodyHeight });

    try {
      const [button] = await page.$x("//button[contains(., 'Sí')]");
      if (button) {
        await button.click();
        console.log("clicked age validation");
      }
    } catch (err) {}

    /* Please out comment this one if you run it before the release
    await page.screenshot({ path: "../ss/uym/" + index + "b" + ".jpeg" });
*/
    /* Please out comment this one if you run it after the release
    await page.screenshot({ path: "../ss/uym/" + index + "a" + ".jpeg" });
  */
  }

  await browser.close();
})();
