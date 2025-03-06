import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const token = localStorage.getItem("token")

            if (!token) {
                navigate("/signin")
            } else {
                axios.get("http://localhost:3000/api/v1/user/profile", {
                    headers: {
                        Authorization : token
                    }
                }).then(response => {
                    if (response.data) {
                        navigate("/dashboard")
                    }
                })
            }
        }
        fetchUser();
    },[])

    return(
        <div>
            <div className="h-screen w-full bg-gray-200">
            <div className="h-screen w-full flex justify-center items-center">
                <div className="flex justify-center itmes-center">
                    <div className="flex justify-center items-center rounded-sm border-solid border-4 bg-green-400 h  w-100 h-30 animate-pulse">
                        <div className="text-gray-900 font-semibold text-xl">
                            Authenticating
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
    )
}