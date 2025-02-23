import {TodoPageNavBar} from "../component/NavBar"
import plusImage from "../assets/plus.png"
import TodoComponent from "../component/TodoComponent"
import axios from "axios"
import { useEffect, useState } from "react"


//Input component 
function InputComponent(props)
{
    return <div>
        <input type="text" placeholder={props.placeholder} 
        onChange={props.onChange} value={props.value} className="p-2 w-full m-1"/>
    </div>
}


function Todopage()
{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todos, setTodos] = useState([])  //storing all todos
    
    //fetch all todos of the user from backend
    useEffect(()=>{
        try{
            axios.get("https://keeperapp-yol9.onrender.com/api/v1/todo/getTodos", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(response=>{
                    setTodos(response.data.todos)
                })
        }catch(error)
        {
            console.log(`Error fetching todos : ${error}`);
            alert("Error fetching todos")
        }
    }, [])

    return <div className="flex flex-col ">
        <TodoPageNavBar/>
        <div className="flex justify-center flex-grow">
            <div className="w-[95%] md:w-[30%] h-40 mt-10  shadow-2xl rounded-md border p-4">
                <div className="flex flex-col justify-center">
                    <InputComponent placeholder={"Title"} onChange={e=>setTitle(e.target.value)} value={title}/>
                    <InputComponent placeholder={"Description"} onChange={e=>setDescription(e.target.value)} value={description}/>
                    <div className="mt-4 mr-5 flex justify-end">
                        <button className="rounded-full w-12 h-12 bg-yellow-400 flex justify-center cursor-pointer hover:bg-yellow-600 shadow-lg" onClick={async()=>{
                            try{
                                //add a new todo
                                const response = await axios.post("https://keeperapp-yol9.onrender.com/api/v1/todo/addtodo", {
                                    title: title,
                                    description: description
                                },{
                                    headers: {
                                    Authorization : "Bearer " + localStorage.getItem("token")}
                                })

                                //update todos array
                                setTodos([...todos, response.data.newTodo])
                                
                                //clear the title and description inputs
                                setTitle("")
                                setDescription("")

                            }catch(error)
                            {
                                console.log(`Error Adding todos : ${error}`);
                                alert("Error Adding todo")
                            }
                        }}>
                            {/* <div className="flex justify-center"> */}
                                <div className="flex justify-center items-center p-1">
                                    <img src={plusImage} className="flex  justify-center invert size-9" />
                                </div>
                            {/* </div> */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-center mt-15">
            {todos.map(todo=>{
                return <TodoComponent key={todo._id} title={todo.title} description={todo.description}
                onDelete={async()=>{
                    //delete the todo using _id and trigger re-render
                    try{
                        const response = await axios.post("https://keeperapp-yol9.onrender.com/api/v1/todo/deleteTodo", {
                            id: todo._id
                        }, {
                            headers: {
                                Authorization: "Bearer "+localStorage.getItem("token")
                            }
                        })
                        console.log(response.data.message);

                        //trigger a re-render
                        setTodos(todos.filter(t=>t._id !== todo._id))

                    }catch(error)
                    {
                        console.log(`Error deleting todo : ${error}`);
                        alert("Error deleting todo!")
                    }
                }}/>
            })}
            
        </div>
        <div className="flex flex-col justify-center h-full">
            <div className="flex justify-center font-medium text-gray-600 mt-4 mb-2">
               
            </div>
        </div>
    </div>
}

export default Todopage;