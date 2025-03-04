import { useState } from "react"
import { useDispatch } from "react-redux"
import { Ticket, updateTicketStatus } from "../slices/ticketSlice"
import { BASE_URL } from "../utils/constants"


interface TicketListProps {
  tickets: Ticket[]
  isAdmin: boolean
}

export function TicketList({ tickets, isAdmin }: TicketListProps) {
  const [filter, setFilter] = useState<string>("all")
  const dispatch = useDispatch();

  const filteredTickets = filter === "all" ? tickets : tickets.filter((ticket) => ticket.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const onStatusChange=async (ticketId: string, status: string)=>{
    try{
      const res=await fetch(`${BASE_URL}/api/tickets/${ticketId}`,{
        method:"PATCH",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({status})
      })
      if (!res.ok) 
        return
      dispatch(updateTicketStatus({ticketId:ticketId,status:status})); 
    }catch(err){
      console.error()
    }
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-row items-center justify-between p-6 border-b border-gray-200">
        <h3 className="font-semibold">Tickets</h3>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-[180px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Tickets</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No tickets found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  {isAdmin&&
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created By
                  </th>}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  {isAdmin && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                      {ticket.description.slice(0,15)+"..."}
                    </td>
                    {isAdmin&&<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.createdBy}</td>}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={ticket.status}
                          onChange={(e) => onStatusChange(ticket._id, e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

