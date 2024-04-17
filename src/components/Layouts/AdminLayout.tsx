"use client";

import dynamic from "next/dynamic";
import { ReactNode, Suspense, useEffect, useState } from "react";

import { useMediaQuery } from "usehooks-ts";

import { usePathname } from "next/navigation";
import IconBars from "../Modules/Icons/IconBars";
import NavAccount from "../Partials/Header/NavAccount";

const AdminSidebar = dynamic(() => import("./AdminSidebar"), { ssr: false });

interface AdminLayoutProps {
    children: ReactNode;
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
    const pathName = usePathname();

    const [isSide, setIsSide] = useState(false);

    const matchesMobile = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (matchesMobile) {
            setIsSide(false);
        }
    }, [pathName]);

    return (
        <>
            <div className="">
                <header
                    className={`transition-all ease-out duration-300 z-10 ml-0 px-3 fixed bg-white dark:bg-slate-700 border-b top-0 left-0 right-0 ${
                        isSide ? "lg:ml-16" : "lg:ml-72"
                    }`}
                >
                    <div className="h-[52px] relative flex items-center justify-between">
                        <button
                            onClick={() => setIsSide((state) => !state)}
                            title=""
                            className="hover:bg-gray-100 dark:hover:bg-gray-500 p-2 rounded-full"
                            // className="hover:bg-gray-100 p-2 rounded-full lg:hidden block"
                        >
                            <IconBars size={25} className="fill-gray-600 dark:fill-gray-100" />
                        </button>

                        <div className="ml-auto flex items-center">
                            {/* {isSide ? "true" : "false"} */}
                            <NavAccount />
                        </div>
                    </div>
                </header>
                <AdminSidebar
                    isSide={isSide}
                    matchesMobile={matchesMobile}
                    pathName={pathName}
                    setIsSide={setIsSide}
                />
                <div
                    className={`h-full min-h-[calc(100vh-52px)] mt-[52px] transition-all ease-out duration-300 ${
                        isSide ? "lg:ml-16 ml-0" : "lg:ml-72 ml-0"
                    }`}
                >
                    <div className="p-3">{children}</div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
