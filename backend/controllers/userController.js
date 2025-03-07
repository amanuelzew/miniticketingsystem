const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")
const generateToken = require("../utils/generateToken.js")


// POST/login
//public
const loginUser=expressAsyncHandler (async(req,res)=>{
   const {email,password}=req.body
   const user=await User.findOne({email}).populate('tickets')
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
   const user=await User.create({name,email,password,isAdmin,tickets:[]})
   if(user){
      generateToken(res,user._id)
      res.status(201).json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin,tickets:[]})
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

// GET/profile
//get user profile it is private
const getUserProfile=expressAsyncHandler (async(req,res)=>{
   const user={
      _id:req.user._id,
      name:req.user.name,
      email:req.user.email,
      isAdmin:req.user.isAdmin
   }
   res.status(200).json(user)
})


// PUT/profile
//update user profile it is private
const updateUserProfile=expressAsyncHandler (async(req,res)=>{
   const user=await User.findById(req.user._id)
   if(user){
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
      
      const updatedUser=await user.save()
      res.status(200).json({_id:updatedUser._id,name:updatedUser.name,email:updatedUser.email,isAdmin:updatedUser.isAdmin,tickets:updatedUser.tickets})
   }else{
      res.status(404)
      throw new Error("User not found")
   }
})

module.exports= {loginUser,registerUser,logoutUser,getUserProfile,updateUserProfile}