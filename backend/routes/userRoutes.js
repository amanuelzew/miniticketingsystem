import express from "express"

const router=express.Router()
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from "../controllers/userController.js"

router.post("/login",authUser)
router.post("/signup",registerUser)
router.post("/logout",logoutUser)
router.route("/profile").get(getUserProfile).put(updateUserProfile)

export default router