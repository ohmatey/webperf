import lighthouse from 'lighthouse'
import puppeteer from 'puppeteer'

const usefulMetrics = [
  {
    id: 'first-contentful-paint',
    critical: true,
    goal: 'Sites should strive to have a First Contentful Paint of 1.8 seconds or less',
    ranges: [
      { min: 0, max: 1000, rank: 'good' },
      { min: 1000, max: 3000, rank: 'needsImprovement' },
      { min: 3000, max: Infinity, rank: 'poor' }
    ]
  },
  {
    id: 'largest-contentful-paint',
    critical: true,
    ranges: [
      { min: 0, max: 2500, rank: 'good' },
      { min: 2500, max: 4000, rank: 'needsImprovement' },
      { min: 4000, max: Infinity, rank: 'poor' }
    ]
  },
  {
    id: 'cumulative-layout-shift',
    critical: true,
    ranges: [
      { min: 0, max: 0.1, rank: 'good' },
      { min: 0.1, max: 0.25, rank: 'needsImprovement' },
      { min: 0.25, max: Infinity, rank: 'poor' }
    ]
  },
  {
    id: 'total-blocking-time',
    critical: true,
    ranges: [
      { min: 0, max: 300, rank: 'good' },
      { min: 300, max: 600, rank: 'needsImprovement' },
      { min: 600, max: Infinity, rank: 'poor' }
    ]
  }
]

async function fetchCoreWebVitals(url, lighthouseOptions) {
  let browser

  try {
    browser = await puppeteer.launch({ headless: true })
    
    // run lighthouse
    const { lhr } = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: 'json',
      logLevel: 'info',
      ...lighthouseOptions
    })

    await browser.close()

    const audit = lhr.audits

    const coreWebVitalMetrics = usefulMetrics.map(metric => {
      return {
        ...audit[metric.id],
        metric
      }
    }).filter(metric => metric !== undefined)

    return {
      coreWebVitalMetrics,
      categories: lhr.categories,
      entities: lhr.entities,
      environment: lhr.environment,
      finalDisplayedUrl: lhr.finalDisplayedUrl
    }
  } catch (error) {
    console.error(error)

    if (browser) {
      await browser.close()
    }

    return null
  }
}

export default fetchCoreWebVitals

