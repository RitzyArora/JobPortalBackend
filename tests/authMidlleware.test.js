const jwt=require("jsonwebtoken")
const protect=require("../middleware/authMiddleware")
process.env.JWT_SECRET="testkey"
describe("Auth middleware tests", ()=>{
    test("Valid Token",()=>{
        const token=jwt.sign({
            id:"1",role:"student"
        },process.env.JWT_SECRET)

        const req={
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const res={}
        const next=jest.fn()
        protect(req,res,next)

        expect(next).toHaveBeenCalled()
    })
})