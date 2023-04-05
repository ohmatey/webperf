import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

const plugins = []

if (googleAnalyticsId) {
  plugins.push(
    googleAnalytics({
      measurementIds: [googleAnalyticsId]
    })
  )
}

const analytics = Analytics({
  app: 'webperfly',
  plugins
})

export default analytics