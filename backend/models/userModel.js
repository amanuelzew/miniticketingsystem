import mongoose from "mongoose";
import bycrypt from "bcryptjs"

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3931308880.
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
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


const User=mongoose.model("User",userSchema)

export default User;
