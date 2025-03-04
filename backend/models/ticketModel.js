const mongoose=require("mongoose")

const { Schema, model } = mongoose;

const Status = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    CLOSED: 'Closed',
};
const ticketSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
        unique:true
    },
    status: { type: String, enum: Object.values(Status), require: true },
    createdBy:{  type:String,require:true},
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
},{
    timestamps:true
})




const TicketModel=mongoose.model("Ticket",ticketSchema)

module.exports=  {TicketModel,Status};
