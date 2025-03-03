import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"

// Configure CORS options 
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials:true,
};

const PORT=process.env.PORT || 5000

connectDB();
const app=express()
//allow us to send form data
// Use the CORS middleware with the options
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//protect route
app.use(cookieParser())


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