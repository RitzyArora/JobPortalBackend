const request=require("supertest")
const mongoose=require("mongoose")
const app=require("../app")
const connectDB=require("../config/db")
const User = require("../models/User")
const testEmail=`kelly@test.com`
const testRole="student"
beforeAll(async ()=>{
    await connectDB()
})

afterAll(async ()=>{
    await mongoose.connection.close()
})

describe("Auth APIs",()=>{

    test("Register User",async ()=>{
        const response=await request(app).post("/api/auth/register").send({
            name:"Kelly",
            email:testEmail,
            password:"hello1234",
            role:testRole
        })
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("User Registered Successfully")
    })

     test("Login User",async ()=>{
        const response=await request(app).post("/api/auth/login").send({
            email:testEmail,
            password:"hello1234"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.token).toBeDefined()
    })

   
   

    test("User Already Exists",async ()=>{
        const User=require("../models/User")
const {register}=require("../controller/authController")
 jest.spyOn(User,"findOne").mockResolvedValue({
                email:"kelly@test.com"
            })
            const req={
                body:{
                    name:"Kelly",
                    email:"kelly@test.com",
                    password:"hello1234"
                }
            }
            const res={
                status:jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await register(req,res)
            expect(res.status).toHaveBeenCalledWith(400)
            User.findOne.mockRestore()
        })

  
})