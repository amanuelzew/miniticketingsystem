import express from "express"
import { getTickets, getUserTickets, createTicket, editTicketStatus} from "../controllers/ticketController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

const router=express.Router()

router.post("/tickets",protect,createTicket)
router.get("/tickets",protect,getTickets)
router.patch("/tickets/:id",protect,admin,editTicketStatus)
router.get("/usertickets",protect,getUserTickets)


export default router