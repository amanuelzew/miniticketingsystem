import { Navigate, Outlet } from "react-router"
import {  useSelector } from "react-redux"
import { RootState } from "../store";

export function PrivateRoute() {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

