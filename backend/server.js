import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./db/index.js"; // ✅ Import DB Connection
import authRoutes from "./routes/authRoutes.js"; // ✅ Import Auth Routes
import userRoutes from "./routes/userRoutes.js"; // ✅ Import User Routes

dotenv.config(); // ✅ Load environment variables

const app = express();
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://animated-engine-69v4xxvpw45355j9-5173.app.github.dev"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Debugging Middleware to Log CORS Requests
app.use((req, res, next) => {
  console.log("🟢 CORS Middleware Called:", req.method, req.url);
  next();
});

// ✅ Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log(`🚀 Server is running at port: ${process.env.PORT || 5001}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed !!!", err);
  });

// ✅ Routes
app.use("/api/auth", authRoutes);  // ✅ Authentication Routes
app.use("/api/user", userRoutes);  // ✅ User Routes
