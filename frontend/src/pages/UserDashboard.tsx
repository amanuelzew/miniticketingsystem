"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { DashboardLayout } from "../components/DashboardLayout"
import { TicketList } from "../components/TicketList"
import { CreateTicketDialog } from "../components/CreateTicketDialog"
import type { Ticket } from "../../lib/types"

export default function UserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Get tickets from localStorage or initialize empty array
    const storedTickets = localStorage.getItem("tickets")
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets)
      // Filter tickets for current user
      setTickets(parsedTickets.filter((ticket: Ticket) => ticket.userEmail === parsedUser.email))
    }

    setLoading(false)
  }, [navigate])

  const handleCreateTicket = (newTicket: Ticket) => {
    // Get existing tickets
    const existingTickets = localStorage.getItem("tickets")
    const allTickets = existingTickets ? JSON.parse(existingTickets) : []

    // Add new ticket
    allTickets.push(newTicket)

    // Save to localStorage
    localStorage.setItem("tickets", JSON.stringify(allTickets))

    // Update state
    setTickets([...tickets, newTicket])
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <DashboardLayout user={user}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Tickets</h1>
          <CreateTicketDialog user={user} onCreateTicket={handleCreateTicket} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">Open Tickets</h3>
              <p className="text-xs text-gray-500">
                {tickets.filter((ticket) => ticket.status === "Open").length} tickets
              </p>
            </div>
            <div className="text-2xl font-bold">{tickets.filter((ticket) => ticket.status === "Open").length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">In Progress</h3>
              <p className="text-xs text-gray-500">
                {tickets.filter((ticket) => ticket.status === "In Progress").length} tickets
              </p>
            </div>
            <div className="text-2xl font-bold">
              {tickets.filter((ticket) => ticket.status === "In Progress").length}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">Closed</h3>
              <p className="text-xs text-gray-500">
                {tickets.filter((ticket) => ticket.status === "Closed").length} tickets
              </p>
            </div>
            <div className="text-2xl font-bold">{tickets.filter((ticket) => ticket.status === "Closed").length}</div>
          </div>
        </div>

        <TicketList tickets={tickets} isAdmin={false} onStatusChange={() => {}} />
      </div>
    </DashboardLayout>
  )
}

