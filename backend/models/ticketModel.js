import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Status = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    CLOSED: 'Closed',
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
    createdBy:{  type:String,required:true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{
    timestamps:true
})




const TicketModel=mongoose.model("Ticket",ticketSchema)

export  {TicketModel,Status};
