'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import { listTag } from "@/constants/data";
import IconHouse from "@/components/Modules/Icons/IconHouse";
import IconCaretDown from "@/components/Modules/Icons/IconCaretDown";


interface MainNavProps {
    isDynamic?: boolean
}
const MainNav = ({ isDynamic = false }: MainNavProps) => {
    const pathname = usePathname()

    return (
        <>
            <nav className={`z-10 lg:block hidden ${isDynamic ? "sticky top-0 left-0 right-0" : ""}`}>
                <div className="mt-2">
                    <div className="relative xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md mx-auto py-1 bg-gray-600 text-white md:rounded-sm shadow-sm">
                        <ul className="flex items-center px-1 space-x-1">

                            <li>
                                <Link href={"/"} title="Trang chủ">
                                    <div className={`h-[42px] px-4 flex items-center text-base ${pathname === "/" ? "bg-white md:rounded-sm fill-gray-700" : "fill-white"}`}>
                                        <IconHouse />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/theo-doi"} title="Tìm kiếm truyện">
                                    <div className={`h-[42px] px-4 flex items-center text-base ${pathname === "/theo-doi" ? "bg-white md:rounded-sm text-gray-700 font-medium" : ""}`}>
                                        Theo dõi
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/tim-truyen"} title="Tìm kiếm truyện">
                                    <div className={`h-[42px] px-4 flex items-center text-base ${pathname === "/tim-truyen" ? "bg-white md:rounded-sm text-gray-700 font-medium" : ""}`}>
                                        Tìm truyện
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className="relative dropdown">
                                    <div className={`h-[42px] px-4 flex items-center text-base cursor-pointer dropdown-toggle`}>
                                        Thể loại <IconCaretDown size={17} className="ml-2 mb-[2px] fill-white"/>
                                    </div>
                                    <div className="z-20 absolute top-full -left-[170px] w-[800px] dropdown-menu">
                                        <ul className="mt-2 bg-white dark:bg-slate-700 text-black dark:text-white shadow-sm border-x border-b rounded-md px-2 py-2 grid grid-cols-5 gap-1">
                                            {
                                                listTag?.map((tag) => {
                                                    return (
                                                        <li key={tag?.id}>
                                                            <Link href={`/tim-truyen/${tag?.id}`} title={tag?.title} prefetch={false}>
                                                                <div className={`pl-2 pr-1 py-[3px] line-clamp-1 rounded-md hover:bg-gray-100 hover:dark:text-black ${tag?.isGreatBook ? "font-semibold text-red-500" : ""}`}>{tag?.title}</div>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link href={"/hot"} title="Truyện Hot">
                                    <div className={`h-[42px] px-4 flex items-center text-base ${pathname === "/hot" ? "bg-white md:rounded-sm text-gray-700 font-medium" : ""}`}>
                                        Hot
                                    </div>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
        
    )
}

export default MainNav;