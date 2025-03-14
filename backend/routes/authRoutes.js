import express from "express";
import { signupFreelancer, signupClient, login } from "../controllers/authController.js";
import { forgotPassword, resetPassword } from "../controllers/authController.js";
import upload from "../middleware/multerMiddleware.js"; // Import Multer Middleware

const router = express.Router();

// ✅ Freelancer Signup (Uploads profile, work samples, and thumbnail)
router.post(
  "/signup/freelancer",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "workSamples", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 } // ✅ Added Thumbnail Upload
  ]),
  async (req, res, next) => {
    try {
      console.log("🟢 Freelancer Signup API Hit");
      await signupFreelancer(req, res, next);
    } catch (err) {
      console.error("❌ Error in Freelancer Signup:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// ✅ Client Signup (Uploads profile only)
router.post("/signup/client", upload.single("profilePicture"), async (req, res, next) => {
  try {
    console.log("🟢 Client Signup API Hit");
    await signupClient(req, res, next);
  } catch (err) {
    console.error("❌ Error in Client Signup:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ User Login Route
router.post("/login", async (req, res, next) => {
  try {
    console.log("🟢 Login API Hit");
    await login(req, res, next);
  } catch (err) {
    console.error("❌ Error in Login:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
