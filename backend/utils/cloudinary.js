import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** ✅ Function to Upload Files to Cloudinary */
export const uploadToCloudinary = async (filePath, folder = "user_uploads") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result.secure_url;
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err);
    return "";
  }
};

export default cloudinary; // Exporting Cloudinary instance for direct use
