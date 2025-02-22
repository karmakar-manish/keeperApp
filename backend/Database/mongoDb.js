import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:manish@manishdb.3v1ul.mongodb.net/keeperApp")

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
})

const TodoSchema = new mongoose.Schema({
    //refer to the username of UserSchema
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

//now create tables in the database
const User = mongoose.model('User', UserSchema)
const Todo = mongoose.model('Todo', TodoSchema)

export {User, Todo}