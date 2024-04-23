"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChangeEvent, Suspense, useState } from "react";

import IconXmark from "../../Icons/IconXmark";
import crawlService from "@/services/crawl.services";
import IconLoadingSpin from "../../Icons/IconLoadingSpin";
import IconMagnifyingGlass from "../../Icons/IconMagnifyingGlass";
import SelectOptions from "@/components/Share/SelectOptions";

const optionsWebCrawl = ["nettruyen", "manhuavn","truyenqq"]

const CrawlBookTemplate = () => {
    const { data: session, status } = useSession();
    const [isAction, setIsAction] = useState("");
    const [isCheckCrawlChapter, setIsCheckCrawlChapter] = useState<null | {
        success: boolean;
        message: string;
    }>(null);
    const [selectBook, setSelectBook] = useState<null | {
        bookId: number;
        title: string;
        thumbnail: string;
        anotherName: string;
        author: string;
    }>(null);
    const [dataCrawlBook, setDataCrawlBook] = useState<{
        type: string,
        bookUrl: string,
        take: number,
    }>({
        type: optionsWebCrawl[0],
        bookUrl: "",
        take: 1,
    });

    // Handle Onchange Data Crawl
    const handleOnchangeDataCrawlBook = (e: ChangeEvent<HTMLInputElement>) => {
        setDataCrawlBook({
            ...dataCrawlBook,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Onchange Data Select
    const handleOnchangeDataSelectBook = (e: ChangeEvent<HTMLInputElement>) => {
        if(!selectBook) {
            return;
        }
        setSelectBook({
            ...selectBook,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Crawl Book
    const handleCrawlBook = async () => {
        if (status !== "authenticated") {
            return;
        }
        setIsAction("loading_crawl_book");
        try {
            const bookCrawlRes = await crawlService.crawlBook({
                token: session?.backendTokens.accessToken,
                url: dataCrawlBook?.bookUrl,
                type: dataCrawlBook?.type,
            });

            if (bookCrawlRes?.success) {
                const { bookId, title, thumbnail, anotherName, author } = bookCrawlRes?.book;
                setSelectBook({
                    bookId: bookId,
                    title: title,
                    thumbnail: thumbnail,
                    anotherName: anotherName,
                    author: author
                });
            }

            setIsAction("");
        } catch (error) {
            setIsAction("");
        }
    };

    // Handle Update Book
    const handleUpdateBook = async () => {
        if (status !== "authenticated" || !selectBook) {
            return;
        }
        setIsAction("loading_update_book");
        try {
            const { bookId, title, anotherName, author} = selectBook;
            const bookUpdateRes = await crawlService.updateBook({
                bookId, title, anotherName, author,
                token: session?.backendTokens.accessToken,
            });

            if (bookUpdateRes?.success) {
                const { title, anotherName, author } = bookUpdateRes?.book;
                setSelectBook({
                    ...selectBook,
                    title: title,
                    anotherName: anotherName,
                    author: author
                });
            }

            setIsAction("");
        } catch (error) {
            setIsAction("");
        }
    };

    // Handle Crawl Chapters
    const handleCrawlChapters = async () => {
        if (status !== "authenticated") {
            return;
        }
        setIsAction("loading_crawl_chapters");
        setIsCheckCrawlChapter(null);
        try {
            const chaptersCrawlRes = await crawlService.crawlChapters({
                token: session?.backendTokens.accessToken,
                url: dataCrawlBook?.bookUrl,
                take: dataCrawlBook?.take,
                type: dataCrawlBook?.type,
            });

            if (chaptersCrawlRes?.success) {
                setIsCheckCrawlChapter({
                    success: true,
                    message: "Thành công lấy chương truyện",
                });
            }
            else {
                setIsCheckCrawlChapter({
                    success: false,
                    message: JSON.stringify(chaptersCrawlRes?.error) || "Lỗi",
                });
            }

            setIsAction("");
        } catch (error) {
            setIsAction("");
        }
    };

    // Handle Close Book
    const handleCloseBook = () => {
        setSelectBook(null);
        setIsAction("");
        setDataCrawlBook({
            type: optionsWebCrawl[0],
            bookUrl: "",
            take: 1,
        });
        setIsCheckCrawlChapter(null);
    };

    return (
        <div>
            <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm">

                <h3 className="font-semibold text-base mb-2">
                    Trang web
                </h3>
                <div className="mb-3">
                    <SelectOptions
                        value={dataCrawlBook?.type}
                        options={optionsWebCrawl}
                        handleOnchange={(selectOption: string) => {setDataCrawlBook({ ...dataCrawlBook, type: selectOption })}}
                    />
                </div>

                <h3 className="font-semibold text-base mb-2">
                    Địa chỉ bộ truyện
                </h3>
                <div
                    className={`flex items-center mb-4 ${
                        (!!selectBook || isAction === "loading_crawl_book") &&
                        "pointer-events-none cursor-none opacity-70 [&>input]:bg-gray-200"
                    }`}
                >
                    <input
                        name="bookUrl"
                        value={dataCrawlBook?.bookUrl}
                        onChange={handleOnchangeDataCrawlBook}
                        className={`border h-10 px-4 rounded-md w-full outline-none`}
                    />
                    <button
                        onClick={handleCrawlBook}
                        className="h-10 px-5 bg-blue-600 rounded-md min-w-20 ml-3 flex items-center justify-center"
                    >
                        {isAction === "loading_crawl_book" ? (
                            <IconLoadingSpin />
                        ) : (
                            <IconMagnifyingGlass className="fill-white" />
                        )}
                    </button>
                </div>

                {selectBook && (
                    <>
                        <div className="flex mb-4">
                            <div className="w-24 h-28 rounded-md border overflow-hidden">
                                <Image
                                    unoptimized
                                    loading="lazy"
                                    width={100}
                                    height={200}
                                    alt=""
                                    className="w-24 h-28 object-cover"
                                    src={`https://d32phrebrjmlad.cloudfront.net/${selectBook?.thumbnail}`}
                                />
                            </div>
                            <div className="ml-2">
                                <div className="mb-3">{selectBook?.title}</div>
                                <button
                                    onClick={handleCloseBook}
                                    className="px-4 py-2 rounded-md bg-red-500"
                                >
                                    <IconXmark className="fill-white" />
                                </button>
                            </div>
    
                        </div>
                        <div className="mb-4">
                            <div className="mb-3">
                                <h3 className="font-semibold text-base mb-2">
                                    Tên truyện
                                </h3>
                                <input
                                    name="title"
                                    value={selectBook?.title}
                                    onChange={handleOnchangeDataSelectBook}
                                    className={`border h-10 px-4 rounded-md w-full outline-none`}
                                />
                            </div>
                            <div className="mb-3">
                                <h3 className="font-semibold text-base mb-2">
                                    Tên khác
                                </h3>
                                <input
                                    name="anotherName"
                                    value={selectBook?.anotherName}
                                    onChange={handleOnchangeDataSelectBook}
                                    className={`border h-10 px-4 rounded-md w-full outline-none`}
                                />
                            </div>
                            <div className="mb-3">
                                <h3 className="font-semibold text-base mb-2">
                                    Tác giả
                                </h3>
                                <input
                                    name="author"
                                    value={selectBook?.author}
                                    onChange={handleOnchangeDataSelectBook}
                                    className={`border h-10 px-4 rounded-md w-full outline-none`}
                                />
                            </div>

                            <button
                                onClick={handleUpdateBook}
                                className="px-4 py-2 w-full flex justify-center rounded-md bg-blue-500"
                            >
                                {isAction === "loading_update_book" ? (
                                    <IconLoadingSpin />
                                ) : (
                                    "Cập nhật"
                                )}
                            </button>
                        </div>
                    </>
                )}

                <h3 className="font-semibold text-base mb-2">
                    Số lượng:
                </h3>
                <div
                    className={`flex items-center mb-4 ${
                        !selectBook &&
                        "pointer-events-none [&>button]:cursor-none select-none opacity-80 [&>input]:bg-gray-200"
                    }`}
                >
                    <input
                        name="take"
                        value={dataCrawlBook?.take}
                        onChange={handleOnchangeDataCrawlBook}
                        className={`border w-full h-10 px-2 text-center rounded-md outline-none`}
                    />
                    <button
                        onClick={handleCrawlChapters}
                        className="h-10 px-5 bg-blue-600 rounded-md min-w-20 ml-3 flex items-center justify-center"
                    >
                        {isAction === "loading_crawl_chapters" ? (
                            <IconLoadingSpin />
                        ) : (
                            <IconMagnifyingGlass className="fill-white" />
                        )}
                    </button>
                </div>

                <div className="mb-3">
                    {isCheckCrawlChapter && (
                        <div className="text-green-500">
                            {isCheckCrawlChapter?.message}
                        </div>
                    )}
                </div>

                {/* <div>
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all"
                            style={{ width: "50%" }}
                        >
                            {" "}
                            50%
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default CrawlBookTemplate;
