const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const { uploadtoCloudinary } = require("../utils/cloudinary");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// **Signup Route**
router.post("/signup", upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]), async (req, res) => {
  try {
    console.log("🟢 Signup Request Received:", req.body);
    console.log("🟢 Uploaded Files:", req.files);

    const { firstName, lastName, email, username, password, phoneNumber } = req.body;
    const skillsArray = req.body.skills ? JSON.parse(req.body.skills) : []; // ✅ Safe parsing
    console.log("🟢 Parsed Skills:", skillsArray);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists!");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePicture = "";
    let resume = "";

    if (req.files.profilePicture) {
      console.log("🟢 Uploading profile picture to Cloudinary...");
      profilePicture = await uploadtoCloudinary(req.files.profilePicture[0].path);
    }

    if (req.files.resume) {
      console.log("🟢 Uploading resume to Cloudinary...");
      resume = await uploadtoCloudinary(req.files.resume[0].path);
    }

    console.log("✅ Cloudinary Upload Successful:", { profilePicture, resume });

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      phoneNumber,
      skills: skillsArray, // ✅ Safe array assignment
      profilePicture,
      resume,
    });

    await newUser.save();
    console.log("✅ User Registered Successfully!");
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("🔥 Signup Error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    console.log("🟢 Login Request Body:", req.body);
    const { email, password } = req.body;
    console.log("🟢 Email:", email, "Password:", password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found!");
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Invalid password!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password matched, generating token...");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user });

  } catch (err) {
    console.error("🔥 Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
