'use client'

import IconAnglesLeft from "../Modules/Icons/IconAnglesLeft";
import IconAnglesRight from "../Modules/Icons/IconAnglesRight";

interface NavButtonPaginationProps {
    countPage: number;
    currentPage: number;
    handleChangePage?: any;
}

export const NavButtonPagination = ({
    countPage,
    currentPage,
    handleChangePage,
}: NavButtonPaginationProps) => {
    return (
        <div className="flex justify-center">
            <ul className="flex flex-wrap [&>li]:m-[1px]">
                <li>
                    {
                        currentPage >= 2 && (
                            <button onClick={(e) => {
                                e.preventDefault();
                                handleChangePage(currentPage - 1)
                            }}>
                                <span
                                    className={`w-10 leading-9 text-center block border select-none cursor-pointer hover:bg-gray-200 active::bg-gray-300 dark:hover:bg-white/5`}
                                >
                                    <IconAnglesLeft className="h-9 py-3 mx-auto dark:fill-white fill-gray-700"/>
                                </span>
                            </button>
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
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    handleChangePage(number)
                                }}>
                                    <span
                                        className={`w-10 leading-9 text-center block border select-none cursor-pointer dark:hover:bg-white/5 ${
                                            currentPage === number
                                                ? " bg-blue-500 text-white"
                                                : "hover:bg-gray-200 active::bg-gray-300"
                                        }`}
                                    >
                                        {number}
                                    </span>
                                </button>
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
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    handleChangePage(number)
                                }}>
                                    <span
                                        className={`w-10 leading-9 text-center block border select-none cursor-pointer dark:hover:bg-white/5 ${
                                            currentPage === number
                                                ? " bg-blue-500 text-white"
                                                : "hover:bg-gray-200 active::bg-gray-300"
                                        }`}
                                    >
                                        {number}
                                    </span>
                                </button>
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
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    handleChangePage(number)
                                }}>
                                    <span
                                        className={`w-10 leading-9 text-center block border select-none cursor-pointer hover:bg-gray-200 active::bg-gray-300 dark:hover:bg-white/5 ${
                                            currentPage === number
                                                ? " bg-blue-500 text-white"
                                                : "hover:bg-gray-200 active::bg-gray-300"
                                        }`}
                                    >
                                        {number}
                                    </span>
                                </button>
                            </li>
                        );
                    }
                })}

                {
                    currentPage <= countPage - 1 && (
                        <li>
                            <button onClick={(e) => {
                                e.preventDefault();
                                handleChangePage(currentPage + 1)
                            }}>
                                <span
                                    className={`w-10 leading-9 text-center block border select-none cursor-pointer dark:hover:bg-white/5`}
                                >
                                    <IconAnglesRight className="h-9 py-3 mx-auto dark:fill-white fill-gray-700"/>
                                </span>
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};
