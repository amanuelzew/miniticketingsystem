const mongoose=required("mongoose")

const { Schema, model } = mongoose;

const Status = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    CLOSED: 'Closed',
};
const ticketSchema=mongoose.Schema({
    title:{
        type:String,
        requiredd:true
    },
    description:{
        type:String,
        requiredd:true,
        unique:true
    },
    status: { type: String, enum: Object.values(Status), requiredd: true },
    createdBy:{  type:String,requiredd:true},
    user: { type: Schema.Types.ObjectId, ref: 'User', requiredd: true },
},{
    timestamps:true
})




const TicketModel=mongoose.model("Ticket",ticketSchema)

export  {TicketModel,Status};
