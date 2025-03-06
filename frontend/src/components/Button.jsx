

export function Button({ label , onClick}) {
    return (
        <button onClick={onClick} type="button" className="w-full text-slate-900 bg-green-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:cursor-pointer hover:text-gray-50 transition-all duration-300">{label}
        </button>
    )
}
  