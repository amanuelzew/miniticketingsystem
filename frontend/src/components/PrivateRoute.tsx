import { Navigate, Outlet } from "react-router"

export function PrivateRoute() {
  const user = localStorage.getItem("user")

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

