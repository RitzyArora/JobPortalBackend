const mongoose=require("mongoose")
const logger = require("../utils/logger")
const dotenv=require("dotenv")
dotenv.config()
const connectDB=async()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    }
    catch(error)
    {
        console.log(error)
        logger.error(error)
        process.exit(1)
    }
}
module.exports=connectDB