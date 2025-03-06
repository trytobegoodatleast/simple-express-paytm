
export const Balance = ({ value }) => {
    return <div className="flex bg-slate-300 p-3">
        <div className="font-semibold text-2xl ">
            Balance :
        </div>
        <div className="font-bold ml-4 text-2xl">
             {value}
        </div>
    </div>
}