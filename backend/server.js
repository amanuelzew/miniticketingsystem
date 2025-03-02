import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import userRoutes from "./routes/userRoutes.js"

const PORT=process.env.PORT || 5000

const app=express()

app.use("/api/",userRoutes)

app.get("/",(req,res)=>res.send("server is u and running"))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

/* POST /signup → Register users (with role selection).
POST /login → Authenticate users and return a JWT token.

POST /tickets → Create a support ticket (title, description, status).
GET /tickets:
PUT /tickets/:id → Admins can update ticket status (e.g., Open, In Progress, Closed). */