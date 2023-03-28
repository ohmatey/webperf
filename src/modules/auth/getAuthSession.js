import { getServerSession } from 'next-auth/next'

import { authOptions } from '../../pages/api/auth/[...nextauth]'

const getAuthSession = (req, res) => {
  const session = getServerSession(req, res, authOptions)

  return session
}

export default getAuthSession