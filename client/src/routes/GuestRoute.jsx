import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default GuestRoute