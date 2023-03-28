import NextAuth from 'next-auth'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'

import GoogleProvider from 'next-auth/providers/google'

import { db } from '../../../services/firebaseAdmin'

export const authOptions = {
  adapter: FirestoreAdapter(db),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url
      }

      return baseUrl
    }
  }
}

export default NextAuth(authOptions)