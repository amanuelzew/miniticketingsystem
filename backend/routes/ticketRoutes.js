const express = require("express")
const { getTickets, getUserTickets, createTicket, editTicketStatus} = require("../controllers/ticketController.js")
const {protect,admin} = require("../middleware/authMiddleware.js")


const router=express.Router()

router.post("/tickets",protect,createTicket)
router.get("/tickets",protect,getTickets)
router.patch("/tickets/:id",protect,admin,editTicketStatus)
router.get("/usertickets",protect,getUserTickets)


export default router