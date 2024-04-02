"use client"

import { useTheme } from "next-themes";
import IconDark from "../../Modules/Icons/IconDark";
import IconLight from "../../Modules/Icons/IconLight";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";

const ButtonDarkMode = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()
    
    useEffect(() =>  setMounted(true), [])

    if (!mounted) return (
        <span className="w-[38px] h-[38px] rounded-full bg-gray-100 dark:bg-gray-500"></span>
    )
    
    return (
        <button
            title="Nút ẩn/hiện darkmode"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className=""
        >
            <i className="w-10 h-10 bg-gray-100 dark:bg-slate-800/70 rounded-full block outline-blue-600 outline-2 hover:outline-dashed">
                {resolvedTheme === "light" ? (
                    <IconLight size={20} className="h-10 mx-auto"/>
                ) : (
                    <IconDark size={20} className="h-10 mx-auto"/>
                )}
            </i>
        </button>
    );
};

export default ButtonDarkMode;
