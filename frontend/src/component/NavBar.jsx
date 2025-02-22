import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function NavBar(){
    const navigate = useNavigate();

    return <div className="bg-yellow-400 h-20 flex justify-between">
        <div className="text-white font-stretch-expanded text-4xl flex flex-col justify-center ml-3">
            Keeper
        </div>
        <div className="flex">
            <NavButton label={"SignIn as Guest"} onClick={async()=>{
                //signin as guest user
                try{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username: "guest@gmail.com",
                        password: "123456"
                    })

                    //store the token sent in response in localstorage
                    localStorage.setItem("token", response.data.token)
                    
                    navigate("/todopage")
               }catch(error)
               {
                    console.log(`Signin error : ${error}`);
                    alert("Invalid username or password!")
               }
            }}/>
        </div>
    </div>
}

function TodoPageNavBar(){
    const navigate = useNavigate();

    //fetch the first name and last name of the user when component mounts
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/getUserData", {
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response=>{
            setFname(response.data.firstName)
            setLname(response.data.lastName)
        })
    }, [])


    return <div className="bg-yellow-400 h-20 flex justify-between">
        <div className="text-white font-stretch-expanded text-4xl flex flex-col justify-center ml-3">
            Keeper
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center p-2">
                <div className="text-right text-2xl font-semibold text-gray-700">Hello</div>
                <div className="text-gray-700 font-serif">{fname} {lname}</div>
            </div>
            <NavButton label={"Logout"} onClick={()=>{
                localStorage.removeItem("token")    //clear the token
                navigate("/")   //navigate to default route
            }}/>
        </div>
    </div>
}
export {NavBar, TodoPageNavBar};