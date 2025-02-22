import { Todo, User } from "../Database/mongoDb.js";
import userMiddleware from "../Middlewares/userMiddleware.js";
import express from "express"
const router = express.Router()
import zod from "zod"


//route to get all the todos of the user
router.get("/getTodos", userMiddleware, async(req,res)=>{
    const userId = req.userId

    try{
        //fetch todo of the user
        const todos = await Todo.find({
            userId: userId
        })
        res.json({
            todos: todos
        })
    }catch(error){
        return res.json({
            message: "Error while fetching todos!",
            error: error
        })
    }
})

//todo Schema
const todoSchema = zod.object({
    title: zod.string().min(1)
})

//route to create todos
router.post("/addtodo", userMiddleware, async(req,res)=>{
    const userId = req.userId
    const response = todoSchema.safeParse(req.body)

    if(!response.success)
    {
        return res.status(411).json({
            message: "Empty todo title!"
        })
    }

    try{
        const newTodo = await Todo.create({
            userId: userId,
            title: req.body.title,
            description: req.body.description
        })

        //return the new todo created
        res.json({
            message: "Todo created successfully!",
            newTodo: newTodo
        })
    }catch(error)
    {
        return res.status(411).json({
            message: "Error while adding todo",
            error: error
        })
    }
})

//route to delete todo
router.post("/deleteTodo", userMiddleware, async(req,res)=>{
    const userId = req.userId   //put by the usermiddleware
    const todoId = req.body.id  //put by the frontend
    try{
        console.log(todoId);
        await Todo.deleteOne({
            _id: todoId
        })

        res.json({
            message: "Todo deleted successfully!"
        })
        // res.redirect("/todo/get")
    }catch(error)
    {
        return res.status(403).json({
            message: "Error while deleting todo!",
            error: error
        })
    }
})



export default router;