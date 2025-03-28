import express from "express";
import { getFreelancerGigs, getGigById, updateGig ,getAllGigs} from "../controllers/gigController.js";
import authenticate from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js"; // Replace with correct multer path

const router = express.Router();

// ✅ Route to Fetch Freelancer's Gigs
router.get("/my-gigs", authenticate, getFreelancerGigs);

// ✅ Route to Get Single Gig by ID
router.get("/:gigId", authenticate, getGigById);
// ✅ Route to Fetch All Gigs for Client Dashboard
router.get("/gigs", getAllGigs);

// ✅ Route to Update Gig with Authentication & Multer
router.put("/:gigId", authenticate, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "workSamples", maxCount: 10 }
]), updateGig);

export default router;
