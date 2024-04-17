"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { listTag } from "@/constants/data";
import IconBars from "@/components/Modules/Icons/IconBars";

const Navbar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const returnurl = searchParams.get('returnurl')
    const [isSide, setIsSide] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        setIsSide(false);
    }, [pathname]);

    return (
        <>  
            <button title="Menu" onClick={() => setIsSide(state => !state)} className="px-1 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-sm">
                <IconBars size={30} className="fill-white"/>
            </button>
            
            {isSide && <div onClick={() => setIsSide(false)} className="transition-all fixed z-[19] top-0 left-0 right-0 bottom-0 bg-black/30"></div> }
            <div className={`max-w-72 w-full z-[20] bg-white dark:bg-slate-900 fixed transition-all ease-out duration-300 overflow-y-auto left-0 ${isSide ? "translate-x-0" : "-translate-x-72"} top-0 bottom-0 border-r`}>
                <div className="text-2xl font-bold text-red-700 dark:text-white px-4 py-4">TRUYENKK</div>
                <div className="px-2">
                    <div>
                        <div className="mb-3">
                            {
                                status === "unauthenticated" && (
                                    <>
                                        <Link href={`/auth/login?returnurl=${(pathname === "/auth/login" || pathname === "/auth/register") ? returnurl || "/" : pathname}`}>
                                            <div className="px-2 py-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600">Đăng nhập</div>
                                        </Link>
                                        <Link href={`/auth/register?returnurl=${(pathname === "/auth/login" || pathname === "/auth/register") ? returnurl || "/" : pathname}`}>
                                            <div className="px-2 py-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600">Đăng kí</div>
                                        </Link>
                                    </>
                                )
                            }
                            {
                                status === "authenticated" && (
                                    <>
                                        {
                                            session?.user.role.roleName === "admin" && (
                                                <Link href={`/admin`} target="_blank">
                                                    <div className="px-2 py-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600">Admin</div>
                                                </Link>
                                            )
                                        }
                                        <Link href={`/theo-doi`}>
                                            <div className="px-2 py-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600">Theo dõi</div>
                                        </Link>
                                        <div onClick={() => signOut({ redirect: false })} className="px-2 py-2 cursor-pointer rounded-md hover:bg-gray-100 hover:dark:bg-gray-600">Đăng xuất</div>
                                    </>
                                )
                            }
                            <div className="w-full h-0 border-b my-2 bg-gray-200"></div>
                            <Link href={`/tim-truyen`}>
                                <div className="px-2 py-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600">Tìm truyện</div>
                            </Link>
                        </div>
                        <h4 className="px-2 mb-2 font-semibold">Thể loại</h4>
                        <ul className="grid grid-cols-2 pb-5">
                            {
                                listTag.map((tag, index) => {
                                    return (
                                        <li key={tag?.id}>
                                            <Link prefetch={false} href={`/tim-truyen?genres=${tag?.id}`}>
                                                <div className={`line-clamp-1 px-2 py-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600 ${tag?.isGreatBook ? "font-semibold text-red-500" : ""}`}>
                                                    {tag?.title}
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;