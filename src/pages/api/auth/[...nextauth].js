import NextAuth from 'next-auth'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'

import { db } from '../../../services/firebaseAdmin'

export default NextAuth({
  adapter: FirestoreAdapter(db),
  providers: [
  ]  
})