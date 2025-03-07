"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { setTickets } from "../slices/ticketSlice"
import { login } from "../slices/userSlice"
import { RootState } from "../store"
import { BASE_URL } from "../utils/constants"


export default function LoginPage() {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(()=>{
    if (user) {
      if(user.isAdmin==true)
      navigate("/dashboard/admin")
      else
      navigate("/dashboard/user")
    }
  },[]) 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try{
      const res=await fetch(`${BASE_URL}/api/login`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email,password})
      })
      if (!res.ok) {
        setLoading(false)
        setPassword("")
        setError("Invalid email or password")
        return
      }
      setError("")
      const data=await res.json()
      
      dispatch(login({ _id: data._id, name: data.name, email: data.email, isAdmin: data.isAdmin,tickets:data.tickets }));
      
      if(data.isAdmin==true){
        const resTicket=await fetch(`${BASE_URL}/api/tickets`,{
          method:"GET",
          credentials:"include",
          headers:{
            "Content-Type":"application/json",
          },
        })
        
        const dataTicket=await resTicket.json()
        dispatch(setTickets( dataTicket));
        navigate("/dashboard/admin")
      }
      else{
        const resTicket=await fetch(`${BASE_URL}/api/usertickets`,{
          method:"GET",
          credentials:"include",
          headers:{
            "Content-Type":"application/json",
          },
        })
        
        const dataTicket=await resTicket.json()
        dispatch(setTickets( dataTicket));
        navigate("/dashboard/user")
      }
    }catch(err){
      console.error()
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="/">
          <span className="font-bold text-lg">TicketDesk</span>
        </Link>
       
      </header>
    <div className="flex items-center justify-center pt-20">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="abebe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

