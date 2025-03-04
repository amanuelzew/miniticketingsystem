const mongoose=require("mongoose")
const bycrypt =require("bcryptjs")
const { Schema, model } = mongoose;

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true

    },
    isAdmin:{
        type:Boolean,
        require:true,
        default:false
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }] 
},{
    timestamps:true
})

//before saving
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()//move on or pass
    }
    const salt=await bycrypt.genSalt(10)
    this.password=await bycrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bycrypt.compare(enteredPassword,this.password)
}


const User=mongoose.model("User",userSchema)

module.exports=  User;
