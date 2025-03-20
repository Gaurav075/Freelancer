import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js"; // ✅ Import DB Connection
import authRoutes from "./routes/authRoutes.js"; // ✅ Import Auth Routes
import userRoutes from "./routes/userRoutes.js"; // ✅ Import User Routes
import gigRoutes from "./routes/gigRoutes.js"; // ✅ Import Gig Routes

dotenv.config(); // ✅ Load environment variables

const app = express();

// ✅ Increase Request Size Limit (Fixes "Payload Too Large" Error)
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// ✅ Define Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://animated-engine-69v4xxvpw45355j9-5173.app.github.dev"
];

// ✅ CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// ✅ Debugging Middleware (Logs Incoming Requests)
app.use((req, res, next) => {
  console.log(`🟢 ${req.method} Request: ${req.url}`);
  next();
});

// ✅ Connect to MongoDB and Start Server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!", err);
  });

// ✅ Routes
app.use("/api/auth", authRoutes); // Authentication Routes
app.use("/api/user", userRoutes); // User Management Routes
app.use("/api/gigs", gigRoutes); // Gig Management Routes