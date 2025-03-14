import mongoose from "mongoose";

const GigSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    workSamples: [{ type: String }],
    price: { type: Number, required: true },
    deliveryTime: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", GigSchema);
