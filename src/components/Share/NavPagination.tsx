'use client'

import IconEllipsis from "../Modules/Icons/IconEllipsis";

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
        <ul className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-100">
            <li onClick={() => handleChangePage(1)}>
                <span
                    className={`py-2 px-4 block border select-none cursor-pointer dark:hover:bg-white/5 ${
                        currentPage === 1
                            ? "dark:bg-white/25 bg-blue-400 text-white"
                            : "hover:bg-gray-200"
                    }`}
                >
                    1
                </span>
            </li>

            {currentPage > 4 && (
                <li className="block dark:fill-white flex-shrink-0">
                    <IconEllipsis />
                </li>
            )}

            {[
                currentPage - 2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                currentPage + 2,
            ].map((number) => {
                if (number > 1 && number < countPage) {
                    return (
                        <li
                            key={number}
                            onClick={() => handleChangePage(number)}
                        >
                            <span
                                className={`py-2 px-4 block border select-none cursor-pointer dark:hover:bg-white/5 ${
                                    currentPage === number
                                        ? "dark:bg-white/25 bg-blue-400 text-white"
                                        : "hover:bg-gray-200"
                                }`}
                            >
                                {number}
                            </span>
                        </li>
                    );
                }
            })}

            {countPage - currentPage >= 4 && (
                <li className="block px-2 dark:fill-white flex-shrink-0">
                    <IconEllipsis />
                </li>
            )}

            {countPage > 1 && (
                <li onClick={() => handleChangePage(countPage)}>
                    <span
                        className={`py-2 px-4 block border select-none cursor-pointer dark:hover:bg-white/5 ${
                            currentPage === countPage
                                ? "dark:bg-white/25 bg-blue-400 text-white"
                                : "hover:bg-gray-200"
                        }`}
                    >
                        {countPage}
                    </span>
                </li>
            )}
        </ul>
    );
};
