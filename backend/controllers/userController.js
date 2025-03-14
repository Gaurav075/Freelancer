import User from "../models/User.js";

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
export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, professionalTitle, bio, skills } = req.body;

    // ✅ Find user and update details
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.professionalTitle = professionalTitle || user.professionalTitle;
    user.bio = bio || user.bio;
    user.skills = skills ? skills.split(",") : user.skills;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};
