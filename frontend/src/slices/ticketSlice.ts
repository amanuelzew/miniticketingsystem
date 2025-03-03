import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the Ticket interface
export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  user: string
}

// Define the TicketState interface
interface TicketState {
  tickets: Ticket[];
}

// Define the initial state
const initialState: TicketState = {
  tickets: []
};

// Create a slice of the state
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      console.log(action.payload,"me")
      state.tickets = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicketStatus: (state, action: PayloadAction<{ ticketId: string, status: string }>) => {
      const ticket = state.tickets.find(ticket => ticket._id === action.payload.ticketId);
      if (ticket) {
        ticket.status = action.payload.status;
      }
    }
  }
});

// Export the actions
export const { setTickets, addTicket, updateTicketStatus } = ticketSlice.actions;

// Define selectors
export const selectTickets = (state: RootState) => state.ticket.tickets;
export const selectTicketById = (state: RootState, ticketId: string) =>
  state.ticket.tickets.find(ticket => ticket._id === ticketId);

// Export the reducer
export default ticketSlice.reducer;
