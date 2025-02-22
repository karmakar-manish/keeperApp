import axios from "axios"
import DeleteImg from "../assets/delete.png"


function TodoComponent(props){
    return <div className="w-75 h-35 shadow-2xl rounded-md border-1 p-4">
        <div className="text-3xl font-semibold text-zinc-700 mb-1">{props.title}</div>
        <div className="text-zinc-600">{props.description}</div>

        <div className="flex justify-end mt-3">
            <div className="bg-yellow-500 w-10 h-10 rounded-full flex justify-center  hover:bg-yellow-600 shadow-md">
                <button className="cursor-pointer" onClick={props.onDelete}>
                    <img src={DeleteImg} className="invert h-7 w-6"/>
                </button>
            </div>
        </div>
    </div>
}

export default TodoComponent