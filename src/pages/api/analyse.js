import applyRateLimit from '../../middleware/rateLimiter'
import fetchAccessibilityData from '../../lib/fetchAccessibilityData'
import fetchMetadata from '../../lib/fetchMetadata'
import fetchCoreWebVitals from '../../lib/fetchCoreWebVitals'

import '../../services/firebaseAdmin'

import urlAnalysisStatuses from '../../modules/urlAnalyses/urlAnalysisStatuses'
import urlAnalyses from '../../modules/urlAnalyses'

const lighthouseOptionsArray = [
  {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['accessibility'],
      emulatedFormFactor: 'desktop',
      output: ['json'],
    },
  },
  {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['accessibility'],
      emulatedFormFactor: 'mobile',
      output: ['json'],
    },
  },
]

export default async function handler(req, res) {
  try {
    await applyRateLimit(req, res)
  } catch {
    return response.status(429).send('Too many requests')
  }  

  if (req.method === 'POST') {
    const {
      url,
      formFactor = 'mobile'
    } = req.body

    if (!url) {
      res.status(400).json({ error: 'URL is required' })
      return
    }

    const lighthouseOptions = lighthouseOptionsArray.find(config => {
      return config.settings.emulatedFormFactor === formFactor
    })

    if (!lighthouseOptions) {
      return res.status(400).json({ error: 'Invalid form factor' })
    }

    let createdScheduledAnalysisId = null

    try {
      const scheduledAnalysis = await urlAnalyses.create({
        url,
        formFactor,
        status: urlAnalysisStatuses[1],
        lighthouseOptions
      })

      createdScheduledAnalysisId = scheduledAnalysis.id

      const [
        metadata,
        axeAccessibilityReport,
        coreWebVitalMetrics
      ] = await Promise.all([
        fetchMetadata(url),
        fetchAccessibilityData(url),
        fetchCoreWebVitals(url, lighthouseOptions),
      ])

      const analysisData = {
        url,
        metadata,
        webreport: coreWebVitalMetrics,
        accessibilityReport: {
          testEngine: axeAccessibilityReport.testEngine,
          testEnvironment: axeAccessibilityReport.testEnvironment,
          violations: axeAccessibilityReport.violations,
        }
      }

      await urlAnalyses.update(scheduledAnalysis.id, {
        ...analysisData,
        status: urlAnalysisStatuses[2],
      })

      res.status(200).json(analysisData)
    } catch (error) {
      console.error(`Error fetching data for ${url}`)
      console.error(error)

      await urlAnalyses.update(createdScheduledAnalysisId, {
        status: urlAnalysisStatuses[3],
        error: error.message
      })

      res.status(500).json({ error })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}