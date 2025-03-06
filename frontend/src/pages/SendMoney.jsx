import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
//import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    //const navigate = useNavigate();


    const handleTransaction = () => {
        try {
            axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            toast.success("Transaction complete", {
                position: 'top-left',
                autoClose: 3000,
            })
        } catch(error){
            toast.error("Transaction failed", {
                position: "bottom-left",
                autoClose: 3000,
            })
        }
    }

    return <div className="flex justify-center h-screen bg-gray-300">
        <div className="h-full flex flex-col justify-center">
        <img src="https://assetscdn1.paytm.com/images/catalog/view/308774/1617696247991.png" alt="Paytm Image" />
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-4 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-3">
                <h2 className="text-3xl font-bold text-center text-slate-950 bg-green-400 p-3 border border-slate-950">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4 py-2">
                    <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center border border-slate-950">
                            <span className="text-2xl text-gray-950">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                        <button onClick={handleTransaction} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-400 text-gray-950 hover:bg-gray-950 hover:text-gray-50 hover:cursor-pointer">
                        Transfer
                        </button>
                        <ToastContainer/>
                </div>
                </div>
        </div>
      </div>
    </div>
}