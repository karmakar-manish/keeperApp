import express from "express"
import {User, Todo} from "../Database/mongoDb.js"
import jwt from "jsonwebtoken"
import zod from "zod"
import JWT_SECRET from "../config.js"
import userMiddleware from "../Middlewares/userMiddleware.js"
const router = express.Router();

//sign up schema for user
const signUpSchema = zod.object({
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    username: zod.string().min(1),
    password: zod.string().min(1),
})

router.post("/signup", async(req,res)=>{
    const response = signUpSchema.safeParse(req.body)
    //incase of any error
    if(!response.success)
    {
        return res.status(411).json({
            message: "Invalid input!"
        })
    }

    //now check if any user with the same username is present in database or not
    const user = await User.findOne({
        username: req.body.username
    })


    //incase present
    if(user)
    {
        return res.status(411).json({
            message: "Email already exists!"
        })
    }

    let newUser;
    try{
        //create an user
        newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password
        })
    }catch(error)
    {
        return res.status(411).json({
            message:"Error while creating User",
            error: error
        })
    }
    
    //create a jwt-token
    const token = jwt.sign({userId: newUser._id}, JWT_SECRET)

    //return the jwt secret
    res.json({
        message :"User created successfully!",
        token: token
    })
})

//signin body schema
const signinSchema = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1)
})

router.post("/signin", async(req,res)=>{
    const response = signinSchema.safeParse(req.body)
    //incase of no success
    if(!response.success)
    {
        return res.status(411).json({
            message: "Invalid username or password!"
        })
    }

    
    try{
        //check if user exists in database
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })

        //incase of no user
        if(!user)
        {
            return res.status(411).json({
                message: "Incorrect username or password!"
            })
        }

        //create a token and return
        const token = jwt.sign({userId: user._id}, JWT_SECRET)
        res.json({
            message: "Signed-in successfully!",
            token: token
        })

    }catch(error)
    {
        res.status(411).json({
            message:"Error while fetching data from database",
            error: error
        })
    }
})

//route to get the firstname and lastname of user
router.get("/getUserData", userMiddleware, async(req,res)=>{
    const userId = req.userId;
   
    try{
        const response = await User.findOne({
            _id: userId
        })
        res.json({
            firstName: response.firstName,
            lastName: response.lastName
        })
    }catch(error)
    {
        res.status(411).json({
            message: "Error while fetching firstname and lastname!",
            error: error
        })
    }

})
export default router;