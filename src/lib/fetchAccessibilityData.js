import { AxePuppeteer } from 'axe-puppeteer'

import {
  launchPuppeteer,
} from '../services/puppeteer'

async function fetchAccessibilityData(url) {
  let browser

  try {
    browser = await launchPuppeteer({ headless: true })
    
    const page = await browser.newPage()
    
    await page.goto(url)

    const results = await new AxePuppeteer(page).analyze()

    await browser.close()

    return results
  } catch (error) {
    if (browser) {
      await browser.close()
    }

    throw error
  }
}

export default fetchAccessibilityData