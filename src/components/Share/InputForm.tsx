"use client"

import { ChangeEventHandler, useState } from "react"
import IconEye from "../Modules/Icons/IconEye"
import IconEyeSlash from "../Modules/Icons/IconEyeSlash"

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
    const [isShow, setIsShow] = useState(false);

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
                    type={ (type === "password" || type === "rePassword") ? (!isShow ? "password" : "text") : "text" }
                    value={data}
                    onChange={setData}
                    disabled={disabled}
                    className={`${disabled && "pointer-events-none bg-gray-200 dark:bg-gray-700 opacity-60"} border h-11 py-2 pl-4 pr-14 rounded-md w-full transition-all  focus:border-blue-600 focus:outline outline-blue-600`}
                />
                
                {
                    (type === "password" || type === "rePassword") && (
                        <button onClick={() => setIsShow(state => !state)} className="absolute outline-none w-10 h-10 bottom-[22px] right-[2px] rounded-lg border bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            {
                                isShow ? (
                                    <IconEyeSlash className="w-10 h-10 p-3 dark:fill-white"/>
                                ) : (
                                    <IconEye className="w-10 h-10 p-3 dark:fill-white"/>
                                )
                            }
                        </button>
                    )
                }
            </div>
            {error && <div className="text-red-500 line-clamp-none text-end text-[14px] absolute left-0 -bottom-1">{error}</div>}
        </div>
    )
}

export default InputForm;