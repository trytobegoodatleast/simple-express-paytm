import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from '../components/Button';
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"

export const Signin = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                userName,
                password
            })
            localStorage.setItem("token", "Bearer " + response.data.token);
            toast.success("User login successfully!", {
                position: "bottom-left",
                autoClose: 3000,
                
            })
            setTimeout(() => {
                navigate("/dashboard")
            },3000)
        } catch (error) {
            toast.error("User login failed", {
                position: "bottom-left",
                autoClose:3000
            })
        }
    }

    return (
        <div className="bg-slate-900 h-screen flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-120 text-center p-2 h-max px-4">
                    <Heading label={"Sign In"} />
                    <SubHeading label={"Enter your credentials to login"} />
                    <InputBox onChangeInput={(e) => {
                        setUserName(e.target.value)
                    }} placeholder="harkirat@gmail.com" label={"Email"} />
                    <InputBox onChangeInput={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                    <Button onClick={handleSignin} label={"Sign in"} />
                    </div>
                    <div className="text-gray-900 font-semibold">
                    <ToastContainer/>
                    </div>
                    <BottomWarning label={"Dont have an account, just create one"} buttonText={"Sign up"} to={"/signup"} />
                    </div>
            </div>
            </div>
    )
}