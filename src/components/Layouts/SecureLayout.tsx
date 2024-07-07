"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const contentNav = [
    {
        title: "Thông tin chung",
        link: "/secure/dashboard",
        icon: null,
    },
    // {
    //     title: "Lịch sử đọc",
    //     link: "/secure/history",
    //     icon: null,
    // },
    // {
    //     title: "Lịch sử giao dịch",
    //     link: "/secure/history/payment",
    //     icon: null,
    // },
    // {
    //     title: "Mua điểm",
    //     link: "/secure/payment/rank",
    //     icon: null,
    // },
    {
        title: "Thông tin tài khoản",
        link: "/secure/user-profile",
        icon: null,
    },
];

interface SecureLayoutLayoutProps {
    children: ReactNode;
}
const SecureLayoutLayout = ({ children }: SecureLayoutLayoutProps) => {
    const pathName = usePathname();

    return (
        <>
            <div className="py-2">
                <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md py-4 mx-auto bg-white dark:bg-slate-900 md:rounded-md shadow">
                    <div className="lg:grid lg:grid-cols-12 min-h-[500px]">
                        <div className="lg:col-span-3 px-3 mb-4">
                            <nav className="bg-gray-100 dark:bg-gray-700 px-2 py-2 rounded-md">
                                <ul>
                                    {contentNav.map((item) => {
                                        return (
                                            <li key={item?.link} className="mb-1">
                                                <Link href={item?.link}>
                                                    <div
                                                        className={`px-2 py-2 dark:fill-white flex items-center space-x-2 rounded-md whitespace-nowrap overflow-hidden ${
                                                            item?.link ===
                                                            pathName
                                                                ? "text-white fill-white bg-blue-500"
                                                                : "hover:bg-gray-200/50 dark:hover:bg-gray-500"
                                                        }`}
                                                    >
                                                        {item?.title}
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                        <div className="lg:col-span-9 px-3">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SecureLayoutLayout;
