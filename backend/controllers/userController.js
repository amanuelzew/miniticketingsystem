import expressAsyncHandler from "express-async-handler"

// POST/login
//public
const authUser=expressAsyncHandler (async(req,res)=>{
   res.status(200).json({message:"login users"})
})

// POST/signup
//regiester a new user it is public 
const registerUser=expressAsyncHandler (async(req,res)=>{
   res.status(200).json({message:"register users"})
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