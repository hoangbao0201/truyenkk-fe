"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "next-auth/react";

const Navbar = dynamic(() => import("./Navbar"), {
    ssr: false,
    loading: () => (
        <span className="w-[38px] h-[38px] rounded-full bg-gray-100 dark:bg-gray-500"></span>
    ),
});
const NavAccount = dynamic(() => import("./NavAccount"), {
    ssr: false,
    loading: () => (
        <span className="w-[38px] h-[38px] rounded-full bg-gray-100 dark:bg-gray-500"></span>
    ),
});
const SearchMain = dynamic(() => import("./SearchMain"), { ssr: false });
const Notification = dynamic(() => import("./Notification"), {
    ssr: false,
    loading: () => (
        <span className="w-[38px] h-[38px] rounded-full bg-gray-100 dark:bg-gray-500"></span>
    ),
});
const ButtonDarkMode = dynamic(() => import("./ButtonDarkMode"), {
    ssr: false,
    loading: () => (
        <span className="w-[38px] h-[38px] rounded-full bg-gray-100 dark:bg-gray-500"></span>
    ),
});

const Header = () => {
    const { status } = useSession();
    const matchesMobile = useMediaQuery("(max-width: 1024px)");

    return (
        <header className="z-10">
            <div className="bg-white dark:bg-slate-600 shadow">
                <div className="mx-auto h-[52px] max-w-screen-xl px-3 flex items-center relative">
                    <div className="mr-4 flex-shrink-0">
                        <Link href={`/`} className="flex items-center">
                            <Image
                                unoptimized
                                priority={true}
                                width={100}
                                height={100}
                                alt="Logo TRUYENKK"
                                src={`/static/images/logo.png`}
                                className="w-8 h-8 object-cover"
                            />
                            <p className="ml-1 text-xl text-red-600 dark:text-white font-bold uppercase">
                                TRUYENKK
                            </p>
                        </Link>
                    </div>

                    {
                        <div className="lg:mr-auto !ml-auto mr-2 md:max-w-lg md:w-full">
                            <SearchMain />
                        </div>
                    }
                    <div className="flex items-center space-x-2">
                        <ButtonDarkMode />

                        <Notification />
                    </div>
                    <div className="ml-2 flex items-center">
                        {status === "loading" ? (
                            <span className="w-[38px] h-[38px] rounded-full bg-gray-100 dark:bg-gray-500"></span>
                        ) : matchesMobile ? (
                            <Navbar />
                        ) : (
                            <NavAccount />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
