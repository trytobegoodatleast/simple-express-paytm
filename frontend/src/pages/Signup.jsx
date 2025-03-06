import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from '../components/Button';
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:3000/api/v1/user/signup", {
                userName,
                firstName,
                lastName,
                password
            })
            setTimeout(() => {
                navigate("/signin")
            }, 2000)
            toast.success("User profile created", {
                position: "top-left",
                autoClose: 3000,
                
            })
        } catch(error){
            toast.error("Signup failed", {
                position: "bottom-left",
                autoClose:3000,
            })
        }
    }

    
    return (
            <div className="bg-slate-900 h-screen flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-120 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your infromation to create an account"} />
                    <InputBox onChangeInput={(e) => {
                        setFirstName(e.target.value)
                    }}  placeholder="John" label={"First Name"} />
                    <InputBox onChangeInput={(e) => {
                        setLastName(e.target.value)
                    }} placeholder="Doe" label={"Last Name"} />
                    <InputBox onChangeInput={(e) => {
                        setUserName(e.target.value)
                    }} placeholder="harkirat@gmail.com" label={"Email"} />
                    <InputBox onChangeInput={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                    <Button onClick={handleSignup} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
                <ToastContainer/>
            </div>
            </div>
    )
}