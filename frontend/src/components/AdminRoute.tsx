import { Navigate } from "react-router"
import { RootState } from "../store";
import { useSelector } from "react-redux";


interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />
  }

  
  if (user.isAdmin == true) {
    return <Navigate to="/dashboard/user" replace />
  }

  return <>{children}</>
}

