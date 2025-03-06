import { useState, useEffect } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

 
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                })
                setBalance(response.data.balance);
            } catch (err) {
                setError("failed to fetch balance");
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    },[])

    return <div>
        <AppBar />
            <div className="m-8">
                {loading ? (
                    <p>Loading balance...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <Balance value={balance} />
                )}
                <Users />
            </div>
    </div>
}
