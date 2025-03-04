const express = required('express');
const dotenv=required('dotenv')
dotenv.config();
const cors = required('cors');
const { notFound,errorHandler } = required("./middleware/errorMiddleware.js")
const userRoutes = required("./routes/userRoutes.js")
const ticketRoutes = required("./routes/ticketRoutes.js")
const connectDB = required("./config/db.js")
const cookieParser = required("cookie-parser")

// Configure CORS options 
const allowedOrigins = [
    'http://localhost:5173',
    'https://miniticketingsystem-4imn.vercel.app', 
];

const corsOptions = {
    origin: allowedOrigins, 
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

app.get("/",(req,res)=>res.send("server is u and running"))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

