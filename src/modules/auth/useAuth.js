import {
  useEffect,
  useState,
  createContext,
  useContext
} from 'react'
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth'
import firebase from '../../services/firebase'

const auth = getAuth(firebase)

export const AuthContext = createContext({})

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    
    return () => unsubscribe()
  }, [])
  
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth