"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { DashboardLayout } from "../components/DashboardLayout"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setName(parsedUser.name || "")
    setEmail(parsedUser.email || "")

    setLoading(false)
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Update user data
    const updatedUser = { ...user, name, email }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Simulate API call
    setTimeout(() => {
      setUser(updatedUser)
      setIsSaving(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <DashboardLayout user={user}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-2">
            <h2 className="text-xl font-bold">Profile Settings</h2>
            <p className="text-sm text-gray-500">Update your account information</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 border-t border-gray-100">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <input
                  id="role"
                  value={user.role}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 cursor-not-allowed"
                />
                <p className="text-sm text-gray-500">Your role cannot be changed</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaving}
                className={`py-2 px-4 rounded-md text-white font-medium ${
                  isSaving
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

