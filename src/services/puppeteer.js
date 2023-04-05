import puppeteer from 'puppeteer'

export const launchPuppeteer = async (options = {}) => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
    ...options,
  })

  return browser
}