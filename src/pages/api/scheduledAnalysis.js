import '../../services/firebaseAdmin'
import scheduledAnalyses from '../../modules/scheduledAnalyses'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {
      url,
      cron
    } = req.body

    const newscheduledAnalysis = {
      url,
      cron
    }

    // create schedule
    const scheduledAnalysis = await scheduledAnalyses.create(newscheduledAnalysis)

    // create analysis schedule
    return res.status(200).json(scheduledAnalysis)
  }

  if (req.method === 'GET') {
    if (req.query.scheduledAnalysisId) {
      // get analysis schedule by id
      const scheduledAnalysis = await scheduledAnalyses.getById(req.query.scheduledAnalysisId)

      return res.status(200).json(scheduledAnalysis)
    }

    // get all analysis schedules for user
    const scheduledAnalyses = await scheduledAnalyses.getAll()

    return res.status(200).json(scheduledAnalyses)
  }

  if (req.method === 'PUT') {
    // update analysis schedule
    const {
      scheduledAnalysisId,
      url,
      cron
    } = req.body

    const updatedscheduledAnalysis = await scheduledAnalyses.update(scheduledAnalysisId, {
      url,
      cron
    })

    return res.status(200).json(updatedscheduledAnalysis)
  }

  if (req.method === 'DELETE') {
    // delete analysis schedule
    const {
      scheduledAnalysisId
    } = req.body

    const {
      scheduledAnalysisId: scheduledAnalysisIdQueryParam
    } = req.query

    const deleteId = scheduledAnalysisId || scheduledAnalysisIdQueryParam

    await scheduledAnalyses.delete(deleteId)

    console.info(`Deleted ${deleteId}`)

    return res.status(200).json({
      id: deleteId
    })
  }

  res.status(400).json({ text: 'Bad request' })
}

export default handler