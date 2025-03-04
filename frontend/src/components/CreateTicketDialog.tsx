import type React from "react"

import { BASE_URL } from "../utils/constants"
import { addTicket, setTickets } from "../slices/ticketSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { User } from "../slices/userSlice"
import { useState } from "react"


interface CreateTicketDialogProps {
  user: User
}

export function CreateTicketDialog({ user}: CreateTicketDialogProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    // Create new ticket
    try{
      const res=await fetch(`${BASE_URL}/api/ticket`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({title,description,userId:user._id})
      })
      if (!res.ok) {
        setIsSubmitting(true)
        return
      }
     
      const data=await res.json()
      dispatch(addTicket({ _id: data._id, title: data.title, description: data.description,createdBy:data.createdBy, status: data.status,user:data.user }));
      const resTicket=await fetch(`${BASE_URL}/api/usertickets`,{
        method:"GET",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
      })
      
      const dataTicket=await resTicket.json()
      dispatch(setTickets( dataTicket));
      
      setOpen(false)
      setIsSubmitting(false)
      
      navigate("/dashboard/user")
    }catch(err){
      console.error()
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create New Ticket
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setOpen(false)}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Support Ticket</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Fill out the form below to create a new support ticket.</p>
                      </div>

                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                          </label>
                          <input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Brief description of the issue"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Detailed explanation of your issue"
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }`}
                  >
                    {isSubmitting ? "Creating..." : "Create Ticket"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



