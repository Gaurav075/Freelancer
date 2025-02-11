
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { uploadtoCloudinary } = require("../utils/cloudinary");
const multer = require("multer");
const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.post("/signup",upload.fields([{name:'profilePicture'},{name:'resume'}]),async(req,res)=>{
    try{
        const {firstName,lastName,email,username,password,phoneNumber,skills,portfolio} = req.body;
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const profilepicture = require.files.profilepicture ? await uploadtoCloudinary(req.files.profilepicture[0].path) : "";
        const resume = require.files.resume ? await uploadtoCloudinary(req.files.resume[0].path) : "";

        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            phoneNumber,
            skills:JSON.parse(skills),
            profilePicture: profilepicture,
            resume,
        })

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
    }
})

// login route
router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body
        const User = await User.findOne({email})
        if(!User) return res.status(404).json({message: "User does not exist"})

         // Verify Password
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({userId:User._id},process.env.JWT_SECRET,{expiresIn:"7d"})
    res.json({token,User})
    
    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
    }

})

module.exports = router;