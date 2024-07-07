import calculateRank from "@/utils/calculateRank";
import Image from "next/image";
import { ReactNode } from "react";

interface TextLevelProps {
    children: ReactNode
    rank: number
    role?: "guest" | "admin" | "editor"
    item: null | number
    isFormLevel?: boolean
    isLevel?: boolean
}
const TextLevel = ({ isLevel = true, isFormLevel = true, children, rank, item, role = "guest" }: TextLevelProps) => {

    if(!isLevel) {
        return children;
    }

    const { level, percentage } = calculateRank(rank);

    return (
        <div className="flex items-center">
            <div
                className={`flex items-end text-base bg-clip-text whitespace-nowrap overflow-hidden relative ${level > 0 && level < 23 ? "font-extrabold text-black/10" : ""}`}
                style={{ backgroundImage: level > 0 && level < 23 ? ( `url("/static/images/level/${level}.gif")` ) : '' }}
            >
                <div className="mr-1">{children}</div>
                {
                    !!item && 
                        <Image
                            width={20}
                            height={20}
                            alt="Item 1"
                            className="w-5 h-5 mb-1 flex-shrink-0 object-cover"
                            src={`/static/images/items/${item}.gif`}
                        />
                }
            </div>
            {/* {
                isFormLevel && (
                    <div className="relative px-[4px] py-[1px] ml-2 text-[11px] border text-red-600 border-red-600 rounded-sm overflow-hidden font-medium">
                        <span>{role !== "guest" ? role : `Cấp ${level}`} </span>
                        <span style={{ right: `calc(100% - ${percentage}%)`}} className={`absolute top-0 bottom-0 left-0 bg-yellow-500/30`}></span>
                    </div>
                )
            } */}
            {
                isFormLevel && (
                    <div className="relative ml-1 font-bold shad text-[10px] text-[#22f2ff] border px-[6px] py-[2px] rounded-sm bg-[url('/static/images/level/bg-rank.gif')]">
                        <span className="">{role !== "guest" ? role : `Cấp ${level}`} </span>
                        <span style={{ right: `calc(100% - ${percentage}%)`}} className={`absolute top-0 bottom-0 left-0 bg-[#22f2ff]/25`}></span>
                    </div>
                )
            }
        </div>
    )
}

export default TextLevel;

