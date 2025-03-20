import express from "express";
import { getFreelancerGigs,getGigById } from "../controllers/gigController.js";
import authenticate from "../middleware/authMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Route to Fetch Freelancer's Gigs
router.get("/my-gigs", authenticate, getFreelancerGigs);
router.get("/:gigId",getGigById);

export default router;
