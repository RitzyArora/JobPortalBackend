const express=require("express")
const cors=require("cors")
const jobRoutes=require("./routes/jobRoutes")
const authRoutes=require("./routes/authRoutes")
const errorHandler=require("./middleware/errorHandler")
const morgan=require("morgan")

const app=express()
app.use(cors({
    origin:"https://job-portal-frontend-ten-ruddy.vercel.app"
}))
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/jobs",jobRoutes)
app.use(morgan("dev"))

app.use(errorHandler)
module.exports=app