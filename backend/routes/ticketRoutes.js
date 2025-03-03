import express from "express"
import { getTickets, getUserTickets, createTicket, editTicketStatus} from "../controllers/ticketController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

const router=express.Router()

router.post("/ticket",protect,createTicket)
router.get("/tickets",protect,getTickets)
router.get("/usertickets",protect,getUserTickets)
router.patch("/ticket/:id",protect,admin,editTicketStatus)


export default router