const user=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const register=async(req,res)=>{
    try
    {
        const {name,email,password,role}=req.body
        const userExists=await user.findOne({email})
        if(userExists)
        {
            return res.status(400).json({message:"User Already exists!!"})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        await user.create({
            name,
            email,
            role,
            password:hashedPassword
        })
        res.status(201).json({message:"User Registered Successfully"})
        
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

const login=async(req,res)=>{

    try
    {
        const {email,password}=req.body
        const userExists=await user.findOne({email})
        if(!userExists)
        {
            return res.status(400).json({message:"Invalid Credentials!!"})
        }
        const isMatch=await bcrypt.compare(password,userExists.password)
        if(!isMatch)
        {
             return res.status(400).json({message:"Invalid Credentials!!"})
        }

        const token=jwt.sign({
            id:userExists._id,
            role:userExists.role
        },process.env.JWT_SECRET,{
            expiresIn:"2d"
        }
    )
    res.status(200).json({
        token,
        user:{
            id:userExists._id,
            name:userExists.name,
            email:userExists.email,
            role:userExists.role       
        }
    })

    }
     catch(error)
    {
        res.status(500).json({message:error.message})
    }

}
module.exports={ register,login}