import newFirestoreModule from '../../services/newFirestoreModule'

const collectionName = 'urlAnalysis'

const scheduledAnalyses = newFirestoreModule(collectionName)

export default scheduledAnalyses