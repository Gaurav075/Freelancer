require("dotenv").config();
const {connectDB} = require("./db/index.js");
// import authRoutes from "./routes/authRoutes";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// connectDB()
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port:${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!!",err);
    
})

app.use("/api/auth", require("./routes/authRoutes.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})