import getAuthSession from '../modules/auth/getAuthSession'

const restrictedRoute = (req, res, next) => {
  const session = getAuthSession(req, res, authOptions)

  if (!session) {
    throw new Error('Not authenticated')
  }

  next()
}

export default restrictedRoute