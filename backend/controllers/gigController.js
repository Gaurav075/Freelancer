import Gig from "../models/Gig.js";

export const getFreelancerGigs = async (req, res) => {
  try {
    const freelancerId = req.user.id; // Extract freelancer ID from token

    // ✅ Fetch gigs where `user` field matches freelancer's ID
    const gigs = await Gig.find({ user: freelancerId });

    res.status(200).json({ success: true, gigs });
  } catch (error) {
    console.error("❌ Error fetching gigs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch gigs" });
  }
};
export const getGigById = async (req, res) => {
  try {
    const { gigId } = req.params;
    console.log("🔹 Received gigId:", gigId); // Debugging

    if (!gigId) {
      return res.status(400).json({ message: "Gig ID is required" });
    }

    const gig = await Gig.findById(gigId);
    
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    console.log("✅ Gig Found:", gig); // Debugging
    res.status(200).json(gig);

  } catch (error) {
    console.error("❌ Error fetching gig:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};