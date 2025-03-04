const express = require('express');
const dotenv=require('dotenv')
dotenv.config();
const cors = require('cors');
const { notFound,errorHandler } = require("./middleware/errorMiddleware.js")
const userRoutes = require("./routes/userRoutes.js")
const ticketRoutes = require("./routes/ticketRoutes.js")
const connectDB = require("./config/db.js")
const cookieParser = require("cookie-parser")

// Configure CORS options 
const allowedOrigins = [
    'http://localhost:5173',
    'https://miniticketingsystem-4imn.vercel.app', 
];

const corsOptions = {
    origin:  ['http://localhost:5173', 'https://miniticketingsystem-4imn.vercel.app'],
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
app.use("/api/",ticketRoutes)

app.get("/",(req,res)=>res.send("server is up and running"))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

module.exports = app;