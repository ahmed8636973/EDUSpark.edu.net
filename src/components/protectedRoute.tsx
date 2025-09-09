import { ReactNode, useEffect, useState } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login")
      } else {
        setUser(user)
      }
      setLoading(false)
    })

    return () => unsub()
  }, [navigate])

  if (loading) return <p>Loading...</p>
  return <>{children}</>
}

export default ProtectedRoute
