import Gig from "../models/Gig.js";
import { v2 as cloudinary } from "cloudinary";
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

// ✅ Update Gig Function
export const updateGig = async (req, res) => {
  const { gigId } = req.params;

  try {
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    const { title, category, description, price, deliveryTime, deletedSamples } = req.body;

    // Update Basic Fields
    if (title) gig.title = title;
    if (category) gig.category = category;
    if (description) gig.description = description;
    if (price) gig.price = Number(price);
    if (deliveryTime) gig.deliveryTime = deliveryTime;

    const getPublicId = (url) => url.split("/").pop().split(".")[0];

    // Delete Work Samples if Provided
    if (deletedSamples) {
      const samplesToDelete = JSON.parse(deletedSamples);
      if (samplesToDelete.length > 0) {
        await Promise.all(samplesToDelete.map(async (url) => {
          try {
            const publicId = getPublicId(url);
            await cloudinary.uploader.destroy(`gigs/workSamples/${publicId}`);
            gig.workSamples = gig.workSamples.filter((sample) => sample !== url);
          } catch (error) {
            console.error(`Error deleting sample: ${url}`, error);
          }
        }));
      }
    }

    // Update Thumbnail if Provided
    if (req.files?.thumbnail) {
      const thumbnailFile = req.files.thumbnail[0];
      if (gig.thumbnail) {
        try {
          const publicId = getPublicId(gig.thumbnail);
          await cloudinary.uploader.destroy(`gigs/thumbnails/${publicId}`);
        } catch (error) {
          console.error("Error deleting old thumbnail:", error);
        }
      }
      const cloudResponse = await cloudinary.uploader.upload(thumbnailFile.path, { folder: "gigs/thumbnails" });
      gig.thumbnail = cloudResponse.secure_url;
    }

    // Update Work Samples if Provided
    if (req.files?.workSamples) {
      const workSampleFiles = req.files.workSamples;
      const uploadedSamples = await Promise.all(workSampleFiles.map(async (file) => {
        try {
          const res = await cloudinary.uploader.upload(file.path, { folder: "gigs/workSamples" });
          return res.secure_url;
        } catch (error) {
          console.error("Error uploading work sample:", error);
          return null;
        }
      }));
      gig.workSamples.push(...uploadedSamples.filter((url) => url));
    }

    const updatedGig = await gig.save();
    res.status(200).json({ success: true, gig: updatedGig });

  } catch (error) {
    res.status(500).json({ message: "Failed to update gig", error: error.message });
  }
};
// Get all gigs for client dashboard
export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({});
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gigs", error });
  }
};





