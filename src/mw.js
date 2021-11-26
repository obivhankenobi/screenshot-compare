const puppeteer = require("puppeteer");
const urls = require("../mw.json");

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
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });
    console.log(index + "-" + url);
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewport({ width: 1920, height: bodyHeight });

    if (index == 0) {
      await page.waitForFunction(
        "document.querySelector('.optanon-allow-all')  != 0"
      );

      const btnNext = await page.$(".optanon-allow-all");

      await btnNext.click();

      await page.waitForFunction(
        "document.querySelector('.optanon-alert-box-wrapper').clientHeight == 0"
      );
    }
    /*  Please out comment this one if you run it before the release
    await page.screenshot({
      path: "../ss/mw/" + index + "b" + ".jpeg",
      fullPage: true,
    });

*/

    /*/*  Please out comment this one if you run it after the release

    await page.screenshot({
      path: "../ss/mw/" + index + "a" + ".jpeg",
      fullPage: true,
    });
    
    */
  }

  await browser.close();
})();
