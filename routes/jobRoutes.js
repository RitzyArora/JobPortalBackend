const express=require("express")
const router=express.Router()
const {createJob,getJobs}=require("../controller/jobController")
const { updateJob } = require("../controller/jobController")
const { deleteJob } = require("../controller/jobController")
const { getJobById } = require("../controller/jobController")
const protect=require("../middleware/authMiddleware")
const authorize=require("../middleware/roleMiddleware")
const {body}=require("express-validator")

router.post("/",protect,authorize("recruiter"),
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("company").notEmpty().withMessage("Company is required"),
        body("location").notEmpty().withMessage("location is required is required"),
    ],createJob)
router.get("/",protect,authorize("recruiter","student"),getJobs)
router.put("/:id",protect,authorize("recruiter"),updateJob)
router.delete("/:id",protect,authorize("recruiter"),deleteJob)
router.get("/:id",protect,authorize("recruiter"),getJobById)

module.exports=router