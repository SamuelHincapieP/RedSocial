import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
