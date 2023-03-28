import firebaseAdmin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

let app
let firestore

if (firebaseAdmin.apps.length) {
  app = firebaseAdmin.app()
} else {
  app = firebaseAdmin.initializeApp()
  firestore = getFirestore(app)
  firestore.settings({ ignoreUndefinedProperties: true })
}

export const db = firestore || getFirestore(app)

export default app