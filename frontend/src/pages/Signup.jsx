import {NavBar} from "../component/NavBar";
import Heading from "../component/Heading";
import SubHeading from "../component/SubHeading";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import BottomWarning from "../component/BottomWarning";
import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";

function Signup()
{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return <div className="bg-slate-200 h-screen">
        <NavBar/>
        <div className="flex justify-center mt-6">
            <div className="flex flex-col justify-center">
                <div className="text-center rounded-lg bg-white w-90 h-max p-2">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"We are so excited to have you here. Create an account to access the Keeper App"}/>
                    <InputBox label={"First Name"} placeholder={"Manish"} onChange={(e)=>setFirstName(e.target.value)}/>
                    <InputBox label={"Last Name"} placeholder={"Karmakar"} onChange={(e)=>setLastName(e.target.value)}/>
                    <InputBox label={"Email"} placeholder={"manish@gmail.com"} onChange={(e)=>setUsername(e.target.value)}/>
                    <InputBox label={"Password"} placeholder={"123"} onChange={(e)=>setPassword(e.target.value)}/>

                    <Button label={"Sign up"} onClick={()=>{
                        try{
                            axios.post("http://localhost:3000/api/v1/user/signup", {
                                firstName: firstName,
                                lastName: lastName,
                                username: username,
                                password: password
                            })
                                .then(response=>{
                                    //store in localstorage
                                    localStorage.setItem("token", response.data.token)
                                    //navigate to the todoPage
                                    navigate("/todopage")
                                })
                        }catch(error){
                            console.log(`Signup failed : ${error}`)
                            alert("Invalid credentials, please try again!")
                        }
                    }}/>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
        <div className="flex justify-center mb-1 mt-4 font-medium text-gray-600">
            <Footer/>
        </div>
    </div>
}

export default Signup;