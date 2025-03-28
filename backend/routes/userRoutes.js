import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

// ✅ Get User Profile (Protected Route)
router.get("/profile", authenticateUser, getUserProfile);

// ✅ Update User Profile (Protected Route)
// router.put("/profile", authenticateUser, updateUserProfile);
router.put("/profile", authenticateUser, upload.single("profilePicture"), updateUserProfile);

export default router;

