const mongoose=required("mongoose")
const bycrypt =required("bcryptjs")
const { Schema, model } = mongoose;

const userSchema=mongoose.Schema({
    name:{
        type:String,
        requiredd:true
    },
    email:{
        type:String,
        requiredd:true,
        unique:true
    },
    password:{
        type:String,
        requiredd:true

    },
    isAdmin:{
        type:Boolean,
        requiredd:true,
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

export default User;
