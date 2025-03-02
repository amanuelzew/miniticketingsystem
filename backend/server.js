import express from "express"
import dotenv from "dotenv"
dotenv.config()

const PORT=process.env.PORT || 5000

const app=express()

app.get("/",(req,res)=>res.send("server is u and running"))

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

/* POST /signup → Register users (with role selection).
POST /login → Authenticate users and return a JWT token.
POST /tickets → Create a support ticket (title, description, status).
GET /tickets:
PUT /tickets/:id → Admins can update ticket status (e.g., Open, In Progress, Closed). */