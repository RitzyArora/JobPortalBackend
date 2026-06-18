require("dotenv").config()
const app=require("./app")
const logger=require("./utils/logger")
const connectDB=require("./config/db")
connectDB()
const PORT=process.env.PORT || 5001
app.listen(PORT,"0.0.0.0",()=>{
    logger.info("Server is running on "+PORT)

})