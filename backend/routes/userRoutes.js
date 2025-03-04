const express = required("express")
const {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();


router.post("/login", loginUser)
router.post("/signup", registerUser)
router.post("/logout", logoutUser)
router.get("/profile", protect, getUserProfile)
router.patch("/profile", protect, updateUserProfile)

export default router