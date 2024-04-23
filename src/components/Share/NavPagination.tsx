'use client'

import Link from "next/link";
import IconAnglesLeft from "../Modules/Icons/IconAnglesLeft";
import IconAnglesRight from "../Modules/Icons/IconAnglesRight";

interface NavPaginationProps {
    countPage: number;
    currentPage: number;
    handleChangePage?: any;
}

export const NavPagination = ({
    countPage,
    currentPage,
    handleChangePage,
}: NavPaginationProps) => {
    return (
        <div className="flex justify-center">
            <ul className="flex flex-wrap [&>li]:m-[1px]">
                <li>
                    {
                        currentPage >= 2 && (
                            <Link href={'/'} onClick={(e) => {
                                e.preventDefault();
                                handleChangePage(currentPage - 1)
                            }}>
                                <span
                                    className={`w-10 leading-9 text-center block border select-none cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5`}
                                >
                                    <IconAnglesLeft className="h-9 py-3 mx-auto dark:fill-white fill-gray-700"/>
                                </span>
                            </Link>
                        )
                    }
                </li>
                {[
                    1,
                    2,
                    3,
                ].map((number) => {
                    if (number >= 1 && number <= countPage) {
                        return (
                            <li key={number}>
                                <Link  href={'/'} onClick={(e) => {
                                    e.preventDefault();
                                    handleChangePage(number)
                                }}>
                                    <span
                                        className={`w-10 leading-9 text-center block border select-none cursor-pointer dark:hover:bg-white/5 ${
                                            currentPage === number
                                                ? "dark:bg-white/25 bg-blue-400 text-white"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        {number}
                                    </span>
                                </Link>
                            </li>
                        );
                    }
                })}
                {[
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                ].map((number) => {
                    if (number >= 4 && number <= countPage - 3) {
                        return (
                            <li key={number}>
                                <Link href={'/'} onClick={(e) => {
                                    e.preventDefault();
                                    handleChangePage(number)
                                }}>
                                    <span
                                        className={`w-10 leading-9 text-center block border select-none cursor-pointer dark:hover:bg-white/5 ${
                                            currentPage === number
                                                ? "dark:bg-white/25 bg-blue-400 text-white"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        {number}
                                    </span>
                                </Link>
                            </li>
                        );
                    }
                })}
                {[
                    countPage - 2,
                    countPage - 1,
                    countPage,
                ].map((number) => {
                    if (number >= 4 && number <= countPage) {
                        return (
                            <li key={number}>
                                <Link href={'/'} onClick={(e) => {
                                    e.preventDefault();
                                    handleChangePage(number)
                                }}>
                                    <span
                                        className={`w-10 leading-9 text-center block border select-none cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 ${
                                            currentPage === number
                                                ? "dark:bg-white/25 bg-blue-400 text-white"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        {number}
                                    </span>
                                </Link>
                            </li>
                        );
                    }
                })}

                {
                    currentPage <= countPage - 1 && (
                        <li>
                            <Link href={'/'} onClick={(e) => {
                                e.preventDefault();
                                handleChangePage(currentPage + 1)
                            }}>
                                <span
                                    className={`w-10 leading-9 text-center block border select-none cursor-pointer dark:hover:bg-white/5`}
                                >
                                    <IconAnglesRight className="h-9 py-3 mx-auto dark:fill-white fill-gray-700"/>
                                </span>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};
