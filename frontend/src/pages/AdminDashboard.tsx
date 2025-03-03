"use client"


import { DashboardLayout } from "../components/DashboardLayout"
import { TicketList } from "../components/TicketList"
import { RootState } from "../store"
import { useSelector } from "react-redux"
import { selectTickets } from "../slices/ticketSlice"

export default function AdminDashboard() {
 
  const user = useSelector((state: RootState) => state.user.user);
  const tickets = useSelector((state: RootState) => selectTickets(state));



  return (
    <DashboardLayout user={user!}>
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

        <TicketList tickets={tickets} isAdmin={true}  />
      </div>
    </DashboardLayout>
  )
}

