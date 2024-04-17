"use client"

import Link from "next/link";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

import { listTag } from "@/constants/data";
import CardBook from "@/components/Share/CardBook";
import { GetBooksProps } from "@/services/book.services";
import Breadcrumbs from "@/components/Share/BreadCrumbs";
import { NavPagination } from "@/components/Share/NavPagination";

interface SearchBookTemplateProps {
    isShow: boolean
    author: string
    tags: { [key: string]: "can" | "not" | "have" }
    countPage: number
    currentPage: number
    books: GetBooksProps[]
}
const SearchBookTemplate = ({ isShow, author, tags, books, countPage, currentPage }: SearchBookTemplateProps) => {
    const router = useRouter();

    const [isBookFilter, setIsBookFilter] = useState(isShow);
    const [tagStatus, setTagStatus] = useState<{
        [key: string]: "can" | "not" | "have";
    }>(tags || {});

    // Handle Checked
    const handleChecked = (e: any) => {
        const id = e.currentTarget.getAttribute("id");
        setTagStatus((prevStatus) => {
            const currentStatus = prevStatus[id];
            switch (currentStatus) {
                case "can":
                    return { ...prevStatus, [id]: "have" };
                case "not":
                    return { ...prevStatus, [id]: "can" };
                case "have":
                    return { ...prevStatus, [id]: "not" };
                default:
                    return { ...prevStatus, [id]: "have" };
            }
        });
    };

    // Handle Change Page
    const handleChangePage = (page: number) => {
        const haveArray = [];
        const notArray = [];
        for (const key in tagStatus) {
            if (tagStatus[key] === "have") {
                haveArray.push(key);
            } else if (tagStatus[key] === "not") {
                notArray.push(key);
            }
        }
        const queryC = `tim-truyen?genres=${
            !!haveArray && haveArray.join(",")
        }&notgenres=${!!notArray && notArray.join(",")}&isShow=false&page=${page}&author=${author || ''}`;

        router.push(queryC);
    };

    return (
        <>
            <div className="py-2">
                <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto bg-white dark:bg-slate-800 md:rounded-md shadow">
                    <Breadcrumbs
                        listBreadcrumbs={[
                            { title: "Tìm truyện", slug: "/tim-truyen" },
                        ]}
                        className="mx-3 mb-3 py-3 rounded-t-md"
                    />
    
                    <div className="pb-4">
                        <h1 className="text-center mx-3 pb-4 font-semibold text-2xl">
                            Tìm truyện nâng cao
                        </h1>
                        <div className="text-center mb-4">
                            <button
                                className="py-2 px-3 min-w-44 rounded-md text-white bg-blue-500"
                                onClick={() => setIsBookFilter(!isBookFilter)}
                            >
                                {isBookFilter
                                    ? "Ẩn khung tìm kiếm"
                                    : "Hiện khung tìm kiếm"}
                            </button>
                        </div>
                        {isBookFilter && (
                            <div className="mx-3">
                                <div>
                                    <div className="flex items-center mx-3 mb-2">
                                        <span
                                            style={{
                                                background: `url(/static/images/icon_checkbox.png) 0 -36px no-repeat #fff`,
                                            }}
                                            className={`w-[18px] h-[18px] flex-shrink-0 transition-all rounded-sm bg-gray-50 mr-2`}
                                        ></span>
                                        Tìm trong những thể loại này
                                    </div>
    
                                    <div className="flex items-center mx-3 mb-2">
                                        <span
                                            style={{
                                                background: `url(/static/images/icon_checkbox.png) 0 0px no-repeat #fff`,
                                            }}
                                            className={`w-[18px] h-[18px] flex-shrink-0 transition-all rounded-sm bg-gray-50 mr-2`}
                                        ></span>
                                        Loại trừ những thể loại này
                                    </div>
    
                                    <div className="flex items-center mx-3 mb-2">
                                        <span
                                            style={{
                                                background: `url(/static/images/icon_checkbox.png) 0 -18px no-repeat #fff`,
                                            }}
                                            className={`w-[18px] h-[18px] flex-shrink-0 transition-all rounded-sm bg-gray-50 mr-2`}
                                        ></span>
                                        Truyện có thể thuộc hoặc không thuộc thể
                                        loại này
                                    </div>
                                </div>
                                <div className="mx-3 pb-3 flex items-end justify-between">
                                    <h2 className="font-semibold text-lg">
                                        Thể loại
                                    </h2>
                                    <button
                                        onClick={() => setTagStatus({})}
                                        className="px-3 py-1 rounded-md text-white bg-green-500 hover:bg-green-600"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className="pb-3 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                                    {listTag?.map((tag, index) => {
                                        const status = tagStatus[tag.id] || "can";
                                        return (
                                            <div
                                                key={tag.id}
                                                id={tag.id}
                                                onClick={handleChecked}
                                                className={`flex items-center mx-3 mb-2 cursor-pointer select-none ${
                                                    tag?.isGreatBook
                                                        ? "font-semibold text-red-500"
                                                        : ""
                                                }`}
                                            >
                                                <span
                                                    style={{
                                                        background: `url(/static/images/icon_checkbox.png) ${
                                                            status === "have"
                                                                ? "0 -36px"
                                                                : status === "not"
                                                                ? "0 0"
                                                                : "0 -18px"
                                                        } no-repeat #fff`,
                                                    }}
                                                    className={`w-[18px] h-[18px] transition-all rounded-sm bg-gray-50 mr-2`}
                                                ></span>
                                                {tag?.title}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mx-3 pt-3">
                                    <Link
                                        href={"/tim-truyen"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleChangePage(1)
                                        }}
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Tìm truyện
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
    
                    <div className="pb-4 px-3">
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-5 gap-y-3">
                            {
                                books && books.map((book, index) => {
                                    return (
                                        <Fragment key={book?.bookId}>
                                            <CardBook book={book} />
                                        </Fragment>
                                    );
                                })
                            }
                        </div>
                    </div>
    
                    <div className="pb-4">
                        {
                            books && (
                                <NavPagination
                                    countPage={countPage}
                                    currentPage={currentPage}
                                    handleChangePage={handleChangePage}
                                />
                            )
                        }
                    </div>
    
                </div>
            </div>
        </>
    )
}

export default SearchBookTemplate;