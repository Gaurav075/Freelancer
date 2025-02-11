const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadtoCloudinary = async(filePath)=>{
    try{
        const result = await cloudinary.uploader.upload(filePath,{
            folder:"user_uploads",
        });
        
        return result.secure_url;
    }catch(err){
        console.error("Cloudinary Upload Error:", err);
    return "";
    }
}

module.exports = { uploadtoCloudinary };