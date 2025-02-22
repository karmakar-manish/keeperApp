import {NavBar} from "../component/NavBar";
import Heading from "../component/Heading";
import InputBox from "../component/InputBox";
import BottomWarning from "../component/BottomWarning";
import Button from "../component/Button";
import SubHeading from "../component/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Footer from "../component/Footer";

function Signin()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return <div className="bg-slate-200 h-screen">
        <NavBar/>
        <div className="flex justify-center mt-20">
            <div className="flex flex-col justify-center">
                <div className="text-center rounded-lg bg-white w-75 h-max p-2">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <InputBox label={"Email"} placeholder={"manish@gmail.com"} onChange={e=>setUsername(e.target.value)}/>
                    <InputBox label={"Password"} placeholder={"123"} onChange={e=>setPassword(e.target.value)}/>
                    <Button label={"Sign in"} onClick={async()=>{
                       try{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username: username,
                                password: password
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
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
            </div>
        </div>
        <div className="flex justify-center mb-1 mt-25 font-medium text-gray-600">
            <Footer/>
        </div>
    </div>
}

export default Signin;