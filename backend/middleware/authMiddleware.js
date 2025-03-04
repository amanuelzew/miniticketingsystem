//protect routes
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")


const protect=asyncHandler(async (req,res,next)=>{
    let token;

    token=req.cookies.jwt

    if(token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.userId).select("-password")
            next()
        }catch(error){
            res.status(401)
            throw new Error("Not authorized,invalid token")
        }
    }else{
        res.status(401)
        throw new Error("Not authorized,no token")
    }
})


const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
}
module.exports = {
    protect,admin
};
