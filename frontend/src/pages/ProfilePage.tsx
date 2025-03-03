"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { DashboardLayout } from "../components/DashboardLayout"
import { RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { setUser } from "../slices/userSlice"

export default function ProfilePage() {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user!.name)
  const [email, setEmail] = useState(user!.email)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const res = await fetch(`${BASE_URL}/api/profile`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name })
      })
      if (!res.ok) {
        setLoading(false)
        return
      }
      // Update user data
      setIsSaving(false)
      const updatedUser = { ...user, name, email }
      const data = await res.json()
      dispatch(setUser({ _id: data._id, name: updatedUser.name, email: updatedUser.email, isAdmin: data.isAdmin ,tickets:data.tickets}));
      if (data.isAdmin == true)
        navigate("/dashboard/admin")
      else
        navigate("/dashboard/user")
    } catch (err) {
      console.error()
    }

  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <DashboardLayout user={user!}>
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


            </div>

            <div className="p-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaving}
                className={`py-2 px-4 rounded-md text-white font-medium ${isSaving
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



