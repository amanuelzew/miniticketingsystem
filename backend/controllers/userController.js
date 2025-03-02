import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// POST/login
//public
const authUser=expressAsyncHandler (async(req,res)=>{
   res.status(200).json({message:"login users"})
})

// POST/signup
//regiester a new user it is public 
const registerUser=expressAsyncHandler (async(req,res)=>{
   const {name,email,password,isAdmin}=req.body
   const userExists=await User.findOne({email})
   if(userExists){
      res.status(400)
      throw new Error("User already exists")
   }
   const user=await User.create({name,email,password,isAdmin})
   if(user){
      res.status(201).json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})
   }else{
      res.status(400)
      throw new Error("Invalid user data")
   }
})

// POST/logout
//logout user it is public
const logoutUser=expressAsyncHandler (async(req,res)=>{
   res.status(200).json({message:"logout users"})
})

// GET/users/profile
//get user profile it is private
const getUserProfile=expressAsyncHandler (async(req,res)=>{
   res.status(200).json({message:"user profile"})
})


// PUT/users/profile
//update user profile it is private
const updateUserProfile=expressAsyncHandler (async(req,res)=>{
   res.status(200).json({message:"update user profile"})
})
export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile}