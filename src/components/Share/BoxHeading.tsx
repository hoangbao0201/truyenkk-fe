import { ReactNode } from "react";
import IconFireFlameCurved from "../Modules/Icons/IconFireFlameCurved";

interface BoxHeadingProps {
    children: ReactNode
}
const BoxHeading = ({ children }: BoxHeadingProps) => {

    return (
        <>
            <span style={{ background: 'linear-gradient(to right,#eb3349 40%,#f45c43)' }} className="h-8 w-8 mr-2">
                {children}
            </span>
        </>
    )
}

export default BoxHeading;