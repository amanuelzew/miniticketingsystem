const express = required("express")
const { getTickets, getUserTickets, createTicket, editTicketStatus} = required("../controllers/ticketController.js")
const {protect,admin} = required("../middleware/authMiddleware.js")


const router=express.Router()

router.post("/tickets",protect,createTicket)
router.get("/tickets",protect,getTickets)
router.patch("/tickets/:id",protect,admin,editTicketStatus)
router.get("/usertickets",protect,getUserTickets)


export default router