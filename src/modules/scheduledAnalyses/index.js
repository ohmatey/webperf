import newFirestoreModule from '../../services/newFirestoreModule'

const collectionName = 'scheduledAnalyses'

const scheduledAnalyses = newFirestoreModule(collectionName)

export default scheduledAnalyses