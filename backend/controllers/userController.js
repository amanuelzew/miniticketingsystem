import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// POST/login
//public
const loginUser=expressAsyncHandler (async(req,res)=>{
   const {email,password}=req.body
   const user=await User.findOne({email})
   if(user && (await user.matchPassword(password))){
      generateToken(res,user._id)
      res.status(201).json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})
   }else{
      res.status(400)
      throw new Error("Invalid email or password")
   }
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
      generateToken(res,user._id)
      res.status(201).json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})
   }else{
      res.status(400)
      throw new Error("Invalid user data")
   }
})

// POST/logout
//logout user it is public
const logoutUser=expressAsyncHandler (async(req,res)=>{
   res.cookie("jwt","",{
      httpOnly:true,
      expires:new Date(0)
   })
   res.status(200).json({message:"user logged out"})
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
export {loginUser,registerUser,logoutUser,getUserProfile,updateUserProfile}