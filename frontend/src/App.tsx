import "./App.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import UserDashboard from "./pages/UserDashBoard"
import AdminDashboard from "./pages/AdminDashboard"
import ProfilePage from "./pages/ProfilePage"
import { PrivateRoute } from "./components/PrivateRoute"
import { AdminRoute } from "./components/AdminRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route
            path="admin"
            element={<AdminDashboard />}
          />
        </Route>
        <Route path="profile" element={<ProfilePage /> }/>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
