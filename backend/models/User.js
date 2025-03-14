import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // Cloudinary URL
    accountType: { type: String, enum: ["freelancer", "client"], required: true },

    // ✅ Freelancer-specific fields
    professionalTitle: { type: String },
    bio: { type: String },
    skills: [{ type: String }],
    gigs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gig" }], // Only for freelancers
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
