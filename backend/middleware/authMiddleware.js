import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/** ✅ Middleware to Authenticate Users */
const authenticateUser = (req, res, next) => {
  try {
    // ✅ Get token from headers
    const token = req.header("Authorization")?.split(" ")[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // ✅ Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request

    next(); // Move to the next middleware
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;
