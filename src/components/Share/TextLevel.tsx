import { ReactNode } from "react";

interface TextLevelProps {
    children: ReactNode
    rank: number
    role?: "guest" | "admin" | "editor"
}
const TextLevel = ({ children, rank, role = "guest" }: TextLevelProps) => {
    let level = 0;
    let percentage = 0;
    if (rank >= 10 && rank < 20) {
        level = 1
        percentage = (rank - 10) / (20 - 10) * 100;
    } else if (rank >= 20 && rank < 50) {
        level = 2
        percentage = (rank - 20) / (50 - 20) * 100;
    } else if (rank >= 50 && rank < 120) {
        level = 3
    } else if (rank >= 120 && rank < 220) {
        level = 4
        percentage = (rank - 120) / (220 - 120) * 100;
    } else if (rank >= 220 && rank < 360) {
        level = 5
        percentage = (rank - 220) / (360 - 220) * 100;
    } else if (rank >= 360 && rank < 550) {
        level = 6
        percentage = (rank - 360) / (550 - 360) * 100;
    } else if(rank >= 550) {
        level = 7
        percentage = 100;
    }

    return (
        <div className="flex items-center">
            <span
                className={`text-base bg-clip-text whitespace-nowrap overflow-hidden relative ${level > 0 && level < 8 ? "font-extrabold text-black/10" : ""}`}
                style={{ backgroundImage: level > 0 && level < 8 ? ( `url("/static/images/level/${level}.gif")` ) : '' }}
            >
                {children}
            </span>
            <div className="relative px-[4px] py-[2px] ml-2 text-xs border rounded-sm overflow-hidden font-medium">
                <span>{role !== "guest" ? role : `Cấp ${level}`} </span>
                <span style={{ right: `calc(100% - ${percentage}%)`}} className={`absolute top-0 bottom-0 left-0 bg-red-500/30`}></span>
            </div>
        </div>
    )
}

export default TextLevel;

// 1: 0->10
// 2: 10->50     50
// 3: 50->120    70
// 4: 120->220   100
// 5: 220->360   140
// 6: 360->550   190
// 7: 550->
