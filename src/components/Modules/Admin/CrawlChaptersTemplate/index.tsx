"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChangeEvent, Suspense, useEffect, useState } from "react";

import IconXmark from "../../Icons/IconXmark";
import crawlService from "@/services/crawl.services";
import getTypeByUrlBook from "@/utils/getTypeByUrlBook";
import IconLoadingSpin from "../../Icons/IconLoadingSpin";
import IconMagnifyingGlass from "../../Icons/IconMagnifyingGlass";
import adminService, { AdminGetBooksProps } from "@/services/admin.services";
import bookService, { GetBooksProps } from "@/services/book.services";
import { useDebounceValue } from "usehooks-ts";
import Link from "next/link";

const CrawlChaptersTemplate = () => {
    const { data: session, status } = useSession();
    const [isAction, setIsAction] = useState("");
    const [isCheckCrawlChapter, setIsCheckCrawlChapter] = useState<null | {
        success: boolean;
        message: string;
    }>(null);
    const [selectBook, setSelectBook] = useState<null | {
        bookId: number;
        title: string;
        slug: string;
        thumbnail: string | null;
        countChapters: number;
    }>(null);
    const [dataChapterCrawl, setDataChapterCrawl] = useState<{
        chapterUrl: string;
        take: number;
    }>({
        chapterUrl: "",
        take: 1,
    });
    const [valueSearch, setValueSearch] = useState("");
    const [booksSearch, setBooksSearch] = useState<null | GetBooksProps[]>(
        null
    );

    const valueSearchDebouce = useDebounceValue(valueSearch.trim(), 500);

    // Event Onchange Value Search
    const eventOnchangeValueSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value);
    };

    const handleSearchBooks = async () => {
        if (status !== "authenticated") {
            return;
        }
        try {
            const booksRes = await bookService?.findAll({
                query: `?q=${valueSearchDebouce[0]}&take=6`,
            });

            if (booksRes?.success) {
                setBooksSearch(booksRes?.books);
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (valueSearchDebouce[0].length > 0) {
            handleSearchBooks();
        } else {
            setBooksSearch(null);
        }
    }, [valueSearchDebouce[0]]);

    const handleSelectBook = (book: GetBooksProps) => {
        const { bookId, slug, title, thumbnail, chapters } = book;
        setSelectBook({
            bookId: bookId,
            title: title,
            slug: slug,
            thumbnail: thumbnail,
            countChapters: chapters[0].chapterNumber,
        });
    };

    // Handle Onchange Data Crawl
    const handleOnchangeChapterCrawl = (e: ChangeEvent<HTMLInputElement>) => {
        setDataChapterCrawl({
            ...dataChapterCrawl,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Crawl Chapters
    const handleCrawlChapters = async () => {
        if (status !== "authenticated") {
            return;
        }
        const { take, chapterUrl } = dataChapterCrawl;
        const typeBook = getTypeByUrlBook(chapterUrl);
        if (!typeBook) {
            alert("Url không thuộc type có sẵn chính xác");
            return;
        }

        if (!selectBook || !take) {
            alert("Dữ liệu cào truyện không chính xác");
            return;
        }
        setIsAction("loading_crawl_chapters");
        setIsCheckCrawlChapter(null);
        try {
            const chaptersCrawlRes = await crawlService.crawlChaptersByUrl({
                token: session?.backendTokens.accessToken,
                chapterUrl: chapterUrl,
                take: take,
                type: typeBook,
                bookId: selectBook?.bookId
            });

            console.log(chaptersCrawlRes);
            if (chaptersCrawlRes?.success) {
                setIsCheckCrawlChapter({
                    success: true,
                    message: "Thành công lấy chương truyện",
                });
            } else {
                setIsCheckCrawlChapter({
                    success: false,
                    message: chaptersCrawlRes?.message || "Lỗi",
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
        setDataChapterCrawl({
            chapterUrl: "",
            take: 1,
        });
        setBooksSearch(null);
        setValueSearch("");
        setIsCheckCrawlChapter(null);
    };

    return (
        <div>
            <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-base mb-2">
                    Lựa chọn truyện
                </h3>
                <div className="mb-4 relative">
                    <input
                        value={valueSearch}
                        onChange={eventOnchangeValueSearch}
                        className="border h-10 px-4 rounded-md outline-none w-full"
                    />
                    <div className="py-3">
                        {selectBook ? (
                            <div>
                                <div className="flex mb-4">
                                    <div className="w-24 h-[130px] rounded-md border overflow-hidden">
                                        <Image
                                            unoptimized
                                            loading="lazy"
                                            width={100}
                                            height={130}
                                            alt=""
                                            className="w-24 h-[130px] object-cover"
                                            src={`https://d32phrebrjmlad.cloudfront.net/${selectBook?.thumbnail}`}
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="mb-3">
                                            Tên truyện: {selectBook?.title}
                                        </div>
                                        <div className="mb-1">
                                            Số lượng chương:{" "}
                                            {selectBook?.countChapters}
                                        </div>
                                        <div className="mb-2">
                                            <Link
                                                target="_blank"
                                                className="underline text-blue-500"
                                                href={`/truyen/${selectBook?.slug}-${selectBook?.bookId}/chapter-${selectBook?.countChapters}`}
                                            >
                                                Tới chương 44 ngay
                                            </Link>
                                        </div>
                                        <button
                                            onClick={handleCloseBook}
                                            className="px-4 py-2 rounded-md bg-red-500"
                                        >
                                            <IconXmark className="fill-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            booksSearch &&
                            (booksSearch.length > 0 ? (
                                <div>
                                    {booksSearch?.map((book) => {
                                        return (
                                            <div
                                                key={book?.bookId}
                                                onClick={() =>
                                                    handleSelectBook(book)
                                                }
                                                className="flex items-center px-3 py-3 rounded-md cursor-pointer select-none hover:bg-gray-600"
                                            >
                                                <Image
                                                    unoptimized
                                                    loading="lazy"
                                                    src={
                                                        `https://d32phrebrjmlad.cloudfront.net/${book?.thumbnail}` ??
                                                        `/static/images/book_thumbnail.jpg`
                                                    }
                                                    width={50}
                                                    height={70}
                                                    alt={`Ảnh truyện ${""}`}
                                                    className="w-[50px] h-[70px] object-cover rounded shadow"
                                                />
                                                <div className="ml-3">
                                                    <p className="font-medium text-lg line-clamp-1">
                                                        {book?.title}
                                                    </p>
                                                    <div>
                                                        Số chương:{" "}
                                                        {book?.chapters.length >
                                                        0
                                                            ? book?.chapters[0]
                                                                  .chapterNumber
                                                            : 0}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="">Không tìm thấy truyện.</div>
                            ))
                        )}
                    </div>
                </div>
                <h3 className="font-semibold text-base mb-2">
                    Địa chỉ chương truyện
                </h3>
                <div
                    className={`flex items-center mb-4 ${
                        (!selectBook || isAction === "loading_crawl_book") &&
                        "pointer-events-none cursor-none opacity-70 [&>input]:bg-gray-200"
                    }`}
                >
                    <input
                        name="chapterUrl"
                        value={dataChapterCrawl?.chapterUrl}
                        onChange={handleOnchangeChapterCrawl}
                        className={`border h-10 px-4 rounded-md w-full outline-none`}
                    />
                </div>

                <h3 className="font-semibold text-base mb-2">Số lượng:</h3>
                <div
                    className={`flex items-center mb-4 ${
                        !selectBook &&
                        "pointer-events-none [&>button]:cursor-none select-none opacity-80 [&>input]:bg-gray-200"
                    }`}
                >
                    <input
                        name="take"
                        value={dataChapterCrawl?.take}
                        onChange={handleOnchangeChapterCrawl}
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

export default CrawlChaptersTemplate;
