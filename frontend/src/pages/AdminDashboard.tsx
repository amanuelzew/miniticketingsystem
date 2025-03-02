"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { DashboardLayout } from "../components/DashboardLayout"
import { TicketList } from "../components/TicketList"
import type { Ticket } from "../../lib/types"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      navigate("/dashboard/user")
      return
    }

    setUser(parsedUser)

    // Get tickets from localStorage or initialize empty array
    const storedTickets = localStorage.getItem("tickets")
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets))
    }

    setLoading(false)
  }, [navigate])

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    // Update ticket status
    const updatedTickets = tickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket))

    // Save to localStorage
    localStorage.setItem("tickets", JSON.stringify(updatedTickets))

    // Update state
    setTickets(updatedTickets)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <DashboardLayout user={user}>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">Total Tickets</h3>
              <p className="text-xs text-gray-500">All support tickets</p>
            </div>
            <div className="text-2xl font-bold">{tickets.length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">Open Tickets</h3>
              <p className="text-xs text-gray-500">Require attention</p>
            </div>
            <div className="text-2xl font-bold">{tickets.filter((ticket) => ticket.status === "Open").length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">Closed Tickets</h3>
              <p className="text-xs text-gray-500">Resolved issues</p>
            </div>
            <div className="text-2xl font-bold">{tickets.filter((ticket) => ticket.status === "Closed").length}</div>
          </div>
        </div>

        <TicketList tickets={tickets} isAdmin={true} onStatusChange={handleStatusChange} />
      </div>
    </DashboardLayout>
  )
}

