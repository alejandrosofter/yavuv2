const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

import {findOne} from "../../../../config/firebase"
const TIME_OUT_INNERTEXT=5000

export default async function handler(req, res) {

    const browser = await playwright.chromium.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      })
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({ path: 'example.png' });

  const result=await browser.close();
    res.status(200).json({result})
}