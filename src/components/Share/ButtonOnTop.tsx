import { useEffect, useRef, useState } from "react";
import IconArrowUp from "../Modules/Icons/IconArrowUp";

const ButtonOnTop = () => {
    const buttonRef = useRef<any>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 150) {
                setShowButton(true);
            } else {
                setShowButton(false);
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
        <div className="mr-2">
            {showButton ? (
                <div className="w-[42px] h-[43px] shadow-md border border-gray-300 rounded-lg bg-white/50">
                    <button
                        ref={buttonRef}
                        title="Nút cuộn lên"
                        onClick={eventOnTop}
                    >
                        <IconArrowUp className="fill-black w-[42px] h-[43px] p-3" />
                    </button>
                </div>
            ) : (
                <span></span>
            )}
        </div>
    );
};

export default ButtonOnTop;
