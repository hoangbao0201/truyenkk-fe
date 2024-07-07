"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useOnClickOutside } from "usehooks-ts";
import { signOut, useSession } from "next-auth/react";

const NavAccount = () => {
    const searchParams = useSearchParams();
    const returnurl = searchParams.get('returnurl')
    const pathname = usePathname();
    const dropdownNavAccountRef = useRef(null);
    const { data: session, status } = useSession();

    const [isNavAccount, setIsNavAccount] = useState(false);

    const handleLogoutUser = () => {
        signOut({ redirect: false });
    };

    useEffect(() => {
        setIsNavAccount(false);
    }, [searchParams])

    useOnClickOutside(dropdownNavAccountRef, () => setIsNavAccount(false));

    return (
        <div className="z-20">
            {status !== "loading" &&
                (status === "authenticated" ? (
                    <div
                    ref={dropdownNavAccountRef}
                    className="relative h-[52px] flex items-center justify-center"
                    >
                        <div
                            title={session?.user.name}
                            onClick={() => setIsNavAccount(true)}
                            className="relative transition-all duration-75 cursor-pointer active:scale-105 w-10 h-10 rounded-full border overflow-hidden"
                        >
                            <Image
                                unoptimized
                                loading="lazy"
                                alt="Ảnh người dùng"
                                width={50}
                                height={50}
                                title={session?.user.name}
                                src={`/static/images/avatar_default.png`}
                                className="absolute left-0 right-0"
                            />
                        </div>
                        {isNavAccount && (
                            <div className="z-10 border rounded-md bg-white dark:bg-slate-800 w-60 shadow-sm top-full right-0 py-1 absolute">
                                {
                                    session?.user.role.roleName === "admin" && (
                                        <Link title="Trang admin" href={`/admin`} target="_blank">
                                            <div
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500"
                                            >
                                                Admin
                                            </div>
                                        </Link>
                                    )
                                }
                                <Link href={`/secure/dashboard`} title="Trang điều khiển">
                                    <div
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500"
                                    >
                                        Trang cá nhân
                                    </div>
                                </Link>
                                <div
                                    onClick={handleLogoutUser}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500"
                                >
                                    Đăng xuất
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center divide-x">
                        <Link href={`/auth/login?returnurl=${(pathname === "/auth/login" || pathname === "/auth/register") ? returnurl || "/" : pathname}`} title="Trang đăng nhập">
                            <span className="px-2 py-1">Đăng nhập</span>
                        </Link>
                        <Link href={`/auth/register?returnurl=${(pathname === "/auth/login" || pathname === "/auth/register") ? returnurl || "/" : pathname}`} title="Trang đăng kí">
                            <span className="px-2 py-1">Đăng kí</span>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default NavAccount;
