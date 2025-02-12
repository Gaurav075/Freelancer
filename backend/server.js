require("dotenv").config();
const connectDB = require("./db/index.js");
// import authRoutes from "./routes/authRoutes";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
// const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://animated-engine-69v4xxvpw45355j9-5173.app.github.dev"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.options("*", cors({
    origin: [
      "http://localhost:5173", 
      "https://animated-engine-69v4xxvpw45355j9-5173.app.github.dev"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));
  app.use((req, res, next) => {
    console.log("🟢 CORS Middleware Called:", req.method, req.url);
    next();
  });
  
// connectDB()
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5001,()=>{
        console.log(`Server is running at port:${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!!",err);
    
})

app.use("/api/auth", require("./routes/authRoutes.js"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })