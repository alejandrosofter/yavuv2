const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

export async  function callBoot(){
    const browser = await playwright.chromium.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      })
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({ path: 'example.png' });

  return await browser.close();
} 