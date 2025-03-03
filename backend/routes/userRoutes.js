import express from "express"
import { loginUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from "../controllers/userController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

const router=express.Router()


router.post("/login",loginUser)
router.post("/signup",registerUser)
router.post("/logout",logoutUser)
router.get("/profile",protect,getUserProfile)
router.patch("/profile",protect,updateUserProfile)

export default router