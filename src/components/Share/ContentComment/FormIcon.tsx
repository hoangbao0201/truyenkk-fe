import Image from "next/image";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { ListIconComment } from "@/constants/data";


interface FormIconProps {
    handleInsertIcon: (value: string) => void
}
const FormIcon = ({ handleInsertIcon }: FormIconProps) => {
    const [countIcon, setCountIcon] = useState<number>(0);
    const [selectIcon, setSelectIcon] = useState<null | "trollface" | "bafu" | "rabit">(null);

    const optionRef = useRef<HTMLDivElement>(null)
    
    useOnClickOutside(optionRef, () => setSelectIcon(null));

    const handleAddIcon = (icon: string) => {
        if(countIcon >= 3) {
            alert("Số icon tối đa chỉ có thể là 3");
            return;
        }
        setSelectIcon(null);
        setCountIcon(state => state+1);
        handleInsertIcon(`<img src="${icon}" alt="emoji"/>`);
    }

    return (
        <div className="relative">
            <div className="flex space-x-1">
                <div onClick={() => setSelectIcon("trollface")} title="Icon TrollFace" className="p-1 cursor-pointer border bg-white">
                    <Image
                        width={40}
                        height={40}
                        unoptimized
                        loading="lazy"
                        alt="Icon TrollFace"
                        className="w-10 h-10 object-cover"
                        src={ListIconComment["trollface"][0]}

                    />
                </div>
                <div onClick={() => setSelectIcon("bafu")} title="Icon Bafu" className="p-1 cursor-pointer border bg-white">
                    <Image
                        width={40}
                        height={40}
                        unoptimized
                        loading="lazy"
                        alt="Icon Bafu"
                        className="w-10 h-10 object-cover"
                        src={ListIconComment["bafu"][0]}

                    />
                </div>
                <div onClick={() => setSelectIcon("rabit")} title="Icon Rabit" className="p-1 cursor-pointer border bg-white">
                    <Image
                        width={40}
                        height={40}
                        unoptimized
                        loading="lazy"
                        alt="Icon Rabit"
                        className="w-10 h-10 object-cover"
                        src={ListIconComment["rabit"][0]}

                    />
                </div>

            </div>
            {
                selectIcon && (
                    <div ref={optionRef} className="absolute top-full max-w-[400px] mt-1 w-full z-10 shadow">
                        <div className="bg-white flex flex-wrap">
                            {
                                ListIconComment[selectIcon].map((icon, index) => {
                                    return (
                                        <div onClick={() => handleAddIcon(icon)} key={index} className="cursor-pointer border border-transparent hover:border-blue-500 hover:bg-gray-100">
                                            <Image
                                                width={50}
                                                height={50}
                                                unoptimized
                                                loading="lazy"
                                                alt="Icon Rabit"
                                                className="h-[50px] object-cover"
                                                src={icon}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default FormIcon;