import { ChangeEventHandler } from "react"

interface InputFormProps {
    title: string
    type: string
    placehoder?: string
    data?: string
    setData?: ChangeEventHandler<HTMLInputElement>
    error?: string
    disabled?: boolean
}
const InputForm = ({ title, type, placehoder, data, setData, error, disabled = false }: InputFormProps) => {

    return (
        <div className="relative">
            <div className="pb-[20px]">
                <label
                    htmlFor={`formRegisterInput${type}`}
                    className="select-none cursor-pointer mb-1 block font-semibold"
                >
                    {title}
                </label>
                <input
                    id={`formRegisterInput${type}`}
                    name={type}
                    value={data}
                    onChange={setData}
                    disabled={disabled}
                    className={`${disabled && "pointer-events-none bg-gray-200 dark:bg-gray-700 opacity-60"} border h-11 py-2 px-4 rounded-md w-full transition-all  focus:border-blue-600 focus:outline outline-blue-600`}
                />
            </div>
            {error && <div className="text-red-500 line-clamp-none text-end text-[14px] absolute left-0 -bottom-1">{error}</div>}
        </div>
    )
}

export default InputForm;