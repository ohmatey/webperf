import { AxePuppeteer } from 'axe-puppeteer'
import puppeteer from 'puppeteer'

async function fetchAccessibilityData(url) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url)

  const results = await new AxePuppeteer(page).analyze()

  await browser.close()

  return results
}

export default fetchAccessibilityData