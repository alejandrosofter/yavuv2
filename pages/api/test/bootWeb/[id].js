import puppeteer from 'puppeteer'

import {findOne} from "../../../../config/firebase"
const TIME_OUT_INNERTEXT=5000

export default async function handler(req, res) {

    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({ path: 'example.png' });

  const result=await browser.close();
    res.status(200).json({result})
}