import { useEffect, useRef, useState } from "react";
import IconArrowUp from "../Modules/Icons/IconArrowUp";

const ButtonOnTop = () => {
    const buttonRef = useRef<any>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 150) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        };
    }, []);

    const eventOnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <div>
            {showButton ? (
                <button
                    ref={buttonRef}
                    title="Nút cuộn lên"
                    onClick={eventOnTop}
                    className="fixed right-7 bottom-7 z-50 shadow-md border border-gray-300 rounded-lg text-center flex flex-col justify-center items-center p-3"
                >
                    <IconArrowUp className="fill-red-700" />
                </button>
            ) : <span></span>}
        </div>
    )
}

export default ButtonOnTop;