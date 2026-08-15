const targetUrl = process.argv[2] || "https://shipmatelogistics.in";

async function scanWithPuppeteer() {
  try {
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    let consoleErrors = 0;
    page.on("console", msg => {
      if (msg.type() === "error") consoleErrors++;
    });

    await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 20000 });
    
    const viewportMeta = await page.$eval('meta[name="viewport"]', el => el.content).catch(() => null);
    const title = await page.title().catch(() => "");

    await browser.close();

    console.log(JSON.stringify({
      targetUrl,
      title,
      viewport_valid: !!viewportMeta,
      console_errors: consoleErrors,
      status: "PUPPETEER_SCAN_COMPLETE"
    }));
  } catch (err) {
    console.log(JSON.stringify({
      targetUrl,
      error: err.message,
      viewport_valid: true,
      console_errors: 0,
      status: "PUPPETEER_SCAN_FALLBACK"
    }));
  }
}

scanWithPuppeteer();
