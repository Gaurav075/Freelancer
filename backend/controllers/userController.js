import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

/** ✅ Get Logged-in User Profile */
export const getUserProfile = async (req, res) => {
  try {
    // ✅ Find user by ID from JWT
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve profile", error: error.message });
  }
};

/** ✅ Update User Profile */
// export const updateUserProfile = async (req, res) => {
//   try {
//     const { name, phone, professionalTitle, bio, skills } = req.body;
//     let profilePictureUrl = null;

//     // ✅ Find user and update details
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // ✅ If there's a file, upload to Cloudinary
//     if (req.file) {
//       profilePictureUrl = await uploadToCloudinary(
//         req.file.path,
//         "profile_pictures",
//         req.file.mimetype
//       );
//     }

//     // ✅ Update fields if provided
//     user.name = name || user.name;
//     user.phone = phone || user.phone;
//     user.professionalTitle = professionalTitle || user.professionalTitle;
//     user.bio = bio || user.bio;
//     user.skills = skills ? skills.split(",") : user.skills;
//     user.profilePicture = profilePictureUrl || user.profilePicture;

//     await user.save();

//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update profile", error: error.message });
//   }
// };

/** ✅ Update User Profile */
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password, phone, professionalTitle, bio, skills } = req.body;
    let profilePictureUrl = null;

    // ✅ Find user and update details
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ If there's a file, upload to Cloudinary
    if (req.file) {
      profilePictureUrl = await uploadToCloudinary(
        req.file.path,
        "profile_pictures",
        req.file.mimetype
      );
    }

    // ✅ Update fields if provided
    user.name = name || user.name;
    user.email = email || user.email; // Add Email
    if (password) user.password = password; // Hash if needed
    user.phone = phone || user.phone;
    user.professionalTitle = professionalTitle || user.professionalTitle;
    user.bio = bio || user.bio;
    user.skills = skills ? skills.split(",") : user.skills;
    user.profilePicture = profilePictureUrl || user.profilePicture;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

