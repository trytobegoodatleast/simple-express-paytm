
export function InputBox({label, placeholder, onChangeInput}) {
    return <div className="pt-4">
      <div className="text-sm font-medium text-left py-1">
        {label}
      </div>
      <input onChange={onChangeInput} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}