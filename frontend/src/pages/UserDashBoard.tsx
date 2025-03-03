"use client"

import { useNavigate } from "react-router"
import { DashboardLayout } from "../components/DashboardLayout"
import { TicketList } from "../components/TicketList"
import { CreateTicketDialog } from "../components/CreateTicketDialog"
import { RootState } from "../store"
import { useSelector } from "react-redux"
import { selectTickets } from "../slices/ticketSlice"

export default function UserDashboard() {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user);
  const tickets = useSelector((state: RootState) => selectTickets(state));
  
  console.log(tickets,"jj")

  return (
    <DashboardLayout user={user!}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Tickets</h1>
          <CreateTicketDialog user={user!}  />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">Open Tickets</h3>
              <p className="text-xs text-gray-500">
                {tickets.filter((ticket) => ticket.status === "open").length} tickets
              </p>
            </div>
            <div className="text-2xl font-bold">{tickets.filter((ticket) => ticket.status === "open").length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">In Progress</h3>
              <p className="text-xs text-gray-500">
                {tickets.filter((ticket) => ticket.status === "in_progress").length} tickets
              </p>
            </div>
            <div className="text-2xl font-bold">
              {tickets.filter((ticket) => ticket.status === "in_progress").length}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="pb-2">
              <h3 className="text-sm font-medium">Closed</h3>
              <p className="text-xs text-gray-500">
                {tickets.filter((ticket) => ticket.status === "closed").length} tickets
              </p>
            </div>
            <div className="text-2xl font-bold">{tickets.filter((ticket) => ticket.status === "closed").length}</div>
          </div>
        </div>

        <TicketList tickets={tickets} isAdmin={false} onStatusChange={() => {}} />
      </div>
    </DashboardLayout>
  )
}

