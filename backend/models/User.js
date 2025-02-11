const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  phoneNumber: String,
  skills: [String],
  portfolio: String,
  profilePicture: String,
  resume: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
