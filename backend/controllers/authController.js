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
    console.log("🟢 Freelancer Signup API Hit");
    console.log("🔹 Request Body:", req.body); // ✅ Debug incoming request
    console.log("🔹 Files Received:", req.files);
    const requiredFields = [
      "name",
      "username",
      "email",
      "phone",
      "password",
      "professionalTitle",
      "bio",
      "skills",
      "gigTitle",
      "category",
      "description",
      "price",
      "deliveryTime"
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      console.error("❌ Missing Fields:", missingFields);
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }

    console.log("✅ All required fields received!");

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("✅ Hashed Password:", hashedPassword);

    // ✅ Handle file uploads
    let profilePictureUrl = "";
    let workSampleUrls = [];
    let thumbnailUrl = "";

    if (req.files?.profilePicture) {
      profilePictureUrl = await uploadToCloudinary(req.files.profilePicture[0].path, "profile_pictures");
    }

    if (req.files?.workSamples) {
      try {
        const uploadResults = await Promise.allSettled(
          req.files.workSamples.map(file =>
            uploadToCloudinary(file.path, "work_samples", file.mimetype) // ✅ Pass file type
          )
        );
    
        workSampleUrls = uploadResults
          .filter(result => result.status === "fulfilled")
          .map(result => result.value);
      } catch (error) {
        console.error("❌ Work Samples Upload Error:", error);
      }
    }

    if (req.files?.thumbnail && req.files.thumbnail.length > 0) {
      thumbnailUrl = await uploadToCloudinary(req.files.thumbnail[0].path, "gig_thumbnails");
    } else {
      console.error("❌ Thumbnail file missing");
      return res.status(400).json({ message: "Thumbnail file is required" });
    }

    console.log("✅ File Uploads Done");

    // ✅ Create Freelancer User
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
      accountType: "freelancer",
      professionalTitle: req.body.professionalTitle,
      bio: req.body.bio,
      skills: req.body.skills ? req.body.skills.split(",").map(skill => skill.trim()) : [],
    });

    // ✅ Create Initial Gig for Freelancer
    const newGig = new Gig({
      user: newUser._id,
      title: req.body.gigTitle,
      category: req.body.category,
      description: req.body.description,
      thumbnail: thumbnailUrl,
      workSamples: workSampleUrls,
      price: req.body.price,
      deliveryTime: req.body.deliveryTime,
    });

    // ✅ Save to Database
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(500).json({ message: "User registration failed" });
    }

    const savedGig = await newGig.save();
    if (!savedGig) {
      return res.status(500).json({ message: "Gig creation failed" });
    }

    console.log("✅ Freelancer Registered Successfully:", savedUser._id);
    console.log("✅ Gig Created Successfully:", savedGig._id);

    // ✅ Return Success Response
    res.status(201).json({ message: "Freelancer registered successfully", user: newUser, gig: newGig });

  } catch (error) {
    console.error("❌ Freelancer Signup Error:", error);
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

    // ✅ Step 1: Check if user exists
    const user = await User.findOne({ email }).populate("gigs");
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Step 2: Compare Password (Debugging)
    console.log("🔹 Hashed Password from DB:", user.password);
    console.log("🔹 Entered Password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Password Match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Step 3: Generate JWT Token
    const token = jwt.sign(
      { id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ User Logged In Successfully:", user._id);

    // ✅ Step 4: Send Response
    res.status(200).json({ message: "Login successful", token, user });

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

    const resetLink = `https://animated-engine-69v4xxvpw45355j9-5173.app.github.dev/reset-password/${resetToken}`;
    console.log("🔹 Generated Reset Link:", resetLink);

    // ✅ Use sendEmail Utility
    const subject = "Password Reset Request";
    const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #333;">Password Reset Request</h2>
    <p>We received a request to reset your password. Click the button below to proceed.</p>
    <a href="${resetLink}" 
       style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      Reset Password
    </a>
    <p>If you didn't request this, ignore this email.</p>
  </div>`;

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