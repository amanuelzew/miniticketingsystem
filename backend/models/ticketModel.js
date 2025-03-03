import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Status = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    CLOSED: 'closed',
};
const ticketSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    status: { type: String, enum: Object.values(Status), required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{
    timestamps:true
})




const TicketModel=mongoose.model("Ticket",ticketSchema)

export  {TicketModel,Status};
