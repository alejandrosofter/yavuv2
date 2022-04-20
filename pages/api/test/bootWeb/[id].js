import { chromium } from 'playwright'

import {findOne} from "../../../../config/firebase"
const TIME_OUT_INNERTEXT=5000

export default async function handler(req, res) {

    const { id } = req.body
    const browser = await chromium.launch(); 
    const page = await browser.newPage();
    const result=await page.goto("https://google.com")
    res.status(200).json({result})
}