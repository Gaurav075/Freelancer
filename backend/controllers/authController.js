import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Gig from "../models/Gig.js";
import nodemailer from "nodemailer";
import sendEmail from "../utils/sendEmail.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();
/** ✅ Freelancer Signup Controller */
export const signupFreelancer = async (req, res) => {
  try {
    const { name, username, email, phone, password, professionalTitle, bio, skills, gigTitle, category, description, price, deliveryTime } = req.body;

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Upload Profile Picture to Cloudinary
    let profilePictureUrl = "";
    if (req.files?.profilePicture) {
      profilePictureUrl = await uploadToCloudinary(req.files.profilePicture[0].path, "profile_pictures");
    }

    // ✅ Upload Work Samples to Cloudinary
    let workSampleUrls = [];
    if (req.files?.workSamples) {
      const uploadPromises = req.files.workSamples.map(file => uploadToCloudinary(file.path, "work_samples"));
      workSampleUrls = await Promise.all(uploadPromises);
    }

    // ✅ Upload Thumbnail to Cloudinary
    let thumbnailUrl = "";
    if (req.files?.thumbnail) {
      thumbnailUrl = await uploadToCloudinary(req.files.thumbnail[0].path, "gig_thumbnails");
    }

    // ✅ Create Freelancer User
    const newUser = new User({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
      accountType: "freelancer",
      professionalTitle,
      bio,
      skills: skills ? skills.split(",") : [],
    });

    // ✅ Create Initial Gig for Freelancer
    const newGig = new Gig({
      user: newUser._id,
      title: gigTitle,
      category,
      description,
      thumbnail: thumbnailUrl, // ✅ Storing Thumbnail URL
      workSamples: workSampleUrls,
      price,
      deliveryTime,
    });

    // ✅ Save to Database
    await newUser.save();
    await newGig.save();

    // ✅ Return Success Response
    res.status(201).json({ message: "Freelancer registered successfully", user: newUser, gig: newGig });
  } catch (error) {
    res.status(500).json({ message: "Freelancer signup failed", error: error.message });
  }
};


/** ✅ Client Signup Controller */
export const signupClient = async (req, res) => {
  try {
    const { name, username, email, phone, password, companyName, businessType, workNeeded } = req.body;

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Upload Profile Picture to Cloudinary
    let profilePictureUrl = "";
    if (req.file) {
      profilePictureUrl = await uploadToCloudinary(req.file.path, "profile_pictures");
    }

    // ✅ Create Client User
    const newUser = new User({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
      accountType: "client",
      companyName,
      businessType,
      workNeeded
    });

    await newUser.save();
    res.status(201).json({ message: "Client registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Client signup failed", error: error.message });
  }
};


/** ✅ User Login Controller */
export const login = async (req, res) => {
  try {
    console.log("🟢 Login API Hit:", req.body);

    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email }).populate("gigs");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id, accountType: user.accountType }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("✅ User Logged In:", user);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
// forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Generate Reset Token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/reset-password/${resetToken}`;
    console.log("🔹 Generated Reset Link:", resetLink);

    // ✅ Use sendEmail Utility
    const subject = "Password Reset Request";
    const html = `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`;

    await sendEmail(email, subject, html);

    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/** ✅ Reset Password Controller */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // ✅ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Invalid or expired token" });

    // ✅ Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};