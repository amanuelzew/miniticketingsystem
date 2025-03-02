import { Navigate } from "react-router"

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const userData = localStorage.getItem("user")

  if (!userData) {
    return <Navigate to="/login" replace />
  }

  const user = JSON.parse(userData)
  if (user.role !== "admin") {
    return <Navigate to="/dashboard/user" replace />
  }

  return <>{children}</>
}

