const authorize=require("../middleware/roleMiddleware")
test("Student Authorized",()=>{
    const req={
        user:{
            role:"student"
        }
    }
    const res={}
    const next=jest.fn()
    authorize("student")(req,res,next)
    expect(next).toHaveBeenCalled()
})