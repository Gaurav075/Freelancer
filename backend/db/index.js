const mongoose = require("mongoose");
// import { DB_NAME } from "../constants.js";
const {DB_NAME} = require("../constants.js")


const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // console log karke dekhna
        
    }
    catch(error){
        console.log("MONGODB connection error:",error);
        process.exit(1)
        
    }
}

module.exports = connectDB;