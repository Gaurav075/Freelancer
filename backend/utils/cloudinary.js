import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** ✅ Function to Upload Files to Cloudinary */
export const uploadToCloudinary = async (filePath, folder = "user_uploads", fileType = "") => {
  try {
    if (!fileType) {
      console.error("❌ File type is missing. Defaulting to 'image'.");
      fileType = "image/png"; // Default to image if undefined
    }

    console.log(`🟢 Uploading file: ${filePath} as ${fileType}`);

    // ✅ Determine Resource Type (Image or Video)
    const resourceType = fileType.startsWith("video/") ? "video" : "image";

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType, // ✅ Set correct type
    });

    console.log(`✅ Upload Successful: ${result.secure_url}`);

    // ✅ Remove File from Server After Upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err);
    return "";
  }
};

export default cloudinary;
