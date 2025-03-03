import expressAsyncHandler from "express-async-handler"
import { TicketModel, Status } from "../models/ticketModel.js"
import UserModel from "../models/userModel.js"

//POST /tickets → Create a support ticket (title, description, status).
//GET /tickets:
//PUT /tickets/:id → Admins can update ticket status (e.g., Open, In Progress, Closed).

// GET/tickets
//private
const getTickets = expressAsyncHandler(async (req, res) => {
    try {
        const tickets = await TicketModel.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }

})

// GET/usertickets
//private
const getUserTickets = async (req, res) => {
    try {
      const tickets = await TicketModel.find({ user: req.user._id, });
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tickets for the user' });
    }
};

// POST/ticket
//private
const createTicket = async (req, res) => {
    const { title, description, userId } = req.body;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const ticket = new TicketModel({ title, description, status: Status.OPEN, user: user._id });
      await ticket.save();
  
      user.tickets.push(ticket._id);
      await user.save();
  
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create the ticket' });
    }
};

// PUT/ticket
//private and only accessible by admin
const editTicketStatus = async (req, res) => {
    const { ticketId } = req.params;
    const { status } = req.body;
    try {
        const ticket = await TicketModel.findByIdAndUpdate(
            ticketId,
            { status },
            { new: true }
        );
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update the ticket status' });
    }
};

export {getTickets,getUserTickets,createTicket,editTicketStatus};