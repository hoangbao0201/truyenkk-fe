"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChangeEvent, Suspense, useEffect, useState } from "react";

import IconXmark from "../../Icons/IconXmark";
import crawlService, { CrawlBooksLatestProps } from "@/services/crawl.services";
import getTypeByUrlBook from "@/utils/getTypeByUrlBook";
import IconLoadingSpin from "../../Icons/IconLoadingSpin";
import IconMagnifyingGlass from "../../Icons/IconMagnifyingGlass";
import Link from "next/link";
import ToggleCheck from "@/components/Share/ToggleCheck";
import clsx from "clsx";
import SkeletonCrawlLatestBooks from "../../Skeleton/CrawlLatestBooksSkeleton";
import { listTagManhuavn } from "@/constants/data";

const optionsWebCrawl = ["lxhentai", "hentaivn", "truyenvn", "cgtruyentranh"];

const CrawlListBookTemplate = () => {
    const { data: session, status } = useSession();
    const [isAction, setIsAction] = useState("");
    const [selectBook, setSelectBook] = useState<null | {
        title: string;
        nameImage: string;
        thumbnail: string;
        description: string;
        anotherName: string;
        status: number;
        author: string;
        tags: string[];
        next: string | null;
    }>(null);

    const [isShow, setIsShow] = useState(true);
    const [urlAdd, setUrlAdd] = useState<string>("");
    const [listUrl, setListUrl] = useState<{ type: string; url: string }[]>([]);
    const [listBook, setListBook] = useState<
        (CrawlBooksLatestProps & { isAdd?: boolean })[] | null
    >(null);
    const [listUrlError, setListUrlError] = useState<
        { type: string; url: string; message: string }[]
    >([]);
    const [tagSelect, setTagSelect] = useState("co-dai");

    // Handle Crawl Book
    const handleCrawlBooks = async () => {
        if (status !== "authenticated") {
            return;
        }
        setIsAction("loading_crawl_book");

        try {
            let newListUrl = [...listUrl];
            while (newListUrl.length > 0) {
                const { type, url } = newListUrl[0];
                const bookCrawlRes = await crawlService.crawlBook({
                    token: session?.backendTokens.accessToken,
                    url: url,
                    type: type,
                });

                if (bookCrawlRes?.success) {
                    setSelectBook(bookCrawlRes?.book);

                    // const crawlChapterRes = await handleCrawlChapters({
                    //     url: newListUrl[0].url,
                    //     type: newListUrl[0].type,
                    // });
                    // if (!crawlChapterRes?.success) {
                    //     let newListUrlError = [
                    //         {
                    //             type: type,
                    //             url: url,
                    //             message:
                    //                 crawlChapterRes?.message ||
                    //                 "Lỗi không xác định",
                    //         },
                    //         ...listUrlError,
                    //     ];
                    //     setListUrlError(newListUrlError);
                    // }
                } else {
                    let newListUrlError = [
                        {
                            type: type,
                            url: url,
                            message:
                                bookCrawlRes?.message || "Lỗi không xác định",
                        },
                        ...listUrlError,
                    ];
                    setListUrlError(newListUrlError);
                }
                newListUrl.splice(0, 1);
                setListUrl([...newListUrl]);
                setSelectBook(null);

                console.log("================ Xong 1 truyện ================");
            }

            console.log("================ Hoàn thành ================");

            setIsAction("");
        } catch (error) {
            setIsAction("");
        }
    };

    // Handle Crawl Chapters
    const handleCrawlChapters = async ({
        url,
        type,
    }: {
        url: string;
        type: string;
    }) => {
        if (status !== "authenticated") {
            return {
                success: false,
                message: "Chưa đăng nhập",
            };
        }
        try {
            const chaptersCrawlRes = await crawlService.crawlChapters({
                token: session?.backendTokens.accessToken,
                url: url,
                take: 50,
                type: type,
            });

            if (!chaptersCrawlRes?.success) {
                return {
                    success: false,
                    message: chaptersCrawlRes?.message,
                };
            }

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    };

    // Handle Add Book
    const handleAddBook = async (data?: { id: number; url: string }) => {
        const valueUrl = data ? data?.url.trim() : urlAdd.trim();
        if (!!data && listBook) {
            const indexBook = listBook.findIndex((book) => {
                return book?.bookId === data?.id;
            });
            if (indexBook !== -1) {
                const filteredBooks = listBook.filter(
                    (book, index) => index !== indexBook
                );

                setListBook([
                    { ...listBook[indexBook], isAdd: true },
                    ...filteredBooks,
                ]);
            }
        }

        if (valueUrl.length === 0) {
            alert("Chưa điền url truyện");
            return;
        }
        const findIndexExist = listUrl.findIndex(
            (urlBook) => urlBook?.url === valueUrl
        );
        if (findIndexExist !== -1) {
            alert("Truyện đã tồn tại");
            return;
        }
        const type = getTypeByUrlBook(valueUrl);
        if (!type) {
            console.log("Type truyện không tồn tại");
            return;
        }
        setUrlAdd("");
        setListUrl([...listUrl, { url: valueUrl, type: type }]);
    };

    // Handle Remove Book In list Url
    const handleRemoveBook = (url: string) => {
        if(listBook) {
            const indexBook = listBook.findIndex((book) => {
                return book?.link === url;
            });
            let setBookInList = [...listBook];
            setBookInList[indexBook].isAdd = false;
            setListBook(setBookInList);
        }
        const newListUrl = listUrl.filter((urlBook) => urlBook?.url !== url);
        setListUrl(newListUrl);
    };

    // Event Get Books
    const eventGetBooks = async ({ page = 1 }: { page?: number }) => {
        if (status !== "authenticated") {
            return;
        }
        try {
            const booksRes = await crawlService.crawlBooksLatest({
                // query: `?take=30&skip=${(page - 1) * 30}`,
                tag: tagSelect,
                token: session?.backendTokens.accessToken,
            });

            if (booksRes?.success) {
                setListBook(booksRes?.books);
            }
        } catch (error) {}
    };

    useEffect(() => {
        setListBook(null)
        eventGetBooks({});
    }, [status, tagSelect]);

    // useEffect(() => {
    // }, [tagSelect]);

    // console.log(se)

    return (
        <div>
            <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm mb-3">
                <h3 className="font-semibold text-lg mb-2">Trang web</h3>

                <h3 className="font-semibold text-base mb-2">
                    Danh sách truyện
                </h3>
                <div
                    className={`mb-4 ${
                        (!!selectBook || isAction === "loading_crawl_book") &&
                        "pointer-events-none cursor-none opacity-70 [&>input]:bg-gray-200"
                    }`}
                >
                    <div
                        className={`border resize-none min-h-40 px-3 py-3 mb-4 rounded-md w-full outline-none`}
                    >
                        <ul>
                            <li className="flex items-center border-b pb-2 mb-2">
                                <div className="w-10/12">Url</div>
                                <div className="w-3/12">Type</div>
                                <div>Action</div>
                            </li>
                            {listUrl?.map((url) => {
                                return (
                                    <li
                                        key={url?.url}
                                        className="flex items-center mb-2"
                                    >
                                        <div className="w-10/12">
                                            {url?.url}
                                        </div>
                                        <div className="w-3/12">
                                            {url?.type}
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleRemoveBook(url?.url)
                                            }
                                            className="px-4 py-2 rounded-md bg-red-500"
                                        >
                                            <IconXmark className="fill-white" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <input
                        value={urlAdd}
                        onChange={(e) => setUrlAdd(e.target.value.trim())}
                        className="border h-10 px-4 rounded-md w-full outline-none mb-4"
                    />

                    <button
                        onClick={() => handleAddBook()}
                        className="min-w-36 h-10 px-5 text-white bg-blue-600 rounded-md flex items-center justify-center"
                    >
                        Thêm truyện
                    </button>
                </div>

                {selectBook && (
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
                        </div>
                    </div>
                )}

                <div className="mb-5">
                    <button
                        onClick={handleCrawlBooks}
                        className="min-w-36 h-10 px-5 text-white bg-blue-600 rounded-md flex items-center justify-center"
                    >
                        {isAction === "loading_crawl_book" ? (
                            <IconLoadingSpin />
                        ) : (
                            "Đăng tải truyện"
                        )}
                    </button>
                </div>

                <h3 className="font-semibold text-base mb-2">Url thất bại</h3>
                <div
                    className={`border resize-none min-h-40 px-3 py-3 mb-4 rounded-md w-full outline-none`}
                >
                    <ul>
                        <li className="flex items-center border-b pb-2 mb-2">
                            <div className="w-7/12">Url</div>
                            <div className="w-3/12">Type</div>
                            <div className="w-2/12">Message</div>
                        </li>
                        {listUrlError?.map((url) => {
                            return (
                                <li
                                    key={url?.url}
                                    className="flex items-center mb-2"
                                >
                                    <div className="w-7/12">{url?.url}</div>
                                    <div className="w-3/12">{url?.type}</div>
                                    <div className="w-2/12">{url?.message}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm mb-3">
                
                <div className="flex flex-wrap gap-2 mb-3">
                    {
                        listTagManhuavn.map((tag) => {
                            return (
                                <button key={tag?.href} onClick={() => setTagSelect(tag?.href)} className={`rounded-sm px-2 py-1 ${tag?.href === tagSelect ? "bg-blue-600" : "bg-gray-600"}`}>
                                    {tag?.href}
                                </button>
                            )
                        })
                    }
                </div>

                {/* <div className="mb-4 sticky top-[52px] bg-white dark:bg-slate-700 z-10 left-0 right-0 border rounded-md px-4 py-3 flex items-end">
                    <div className="font-semibold mr-4">Ẩn / Hiện</div>
                    <ToggleCheck
                        checked={isShow}
                        handleChecked={() => setIsShow((state) => !state)}
                    />
                </div> */}

                <div className="mb-4">
                    <button
                        onClick={() => {
                            let getAllBook : { type: string; url: string }[] = []
                            listBook?.forEach((book) => {
                                getAllBook.push({ url: book?.link, type: book?.type});
                                listBook[book?.bookId - 1] = {
                                    ...listBook[book?.bookId],
                                    isAdd: true
                                }
                            })
                            setListBook(listBook);
                            setListUrl(getAllBook);
                        }}
                        className="min-w-36 h-10 px-5 text-white bg-blue-600 rounded-md flex items-center justify-center"
                    >
                        Chọn tất cả
                    </button>
                </div>

                <div className="overflow-y-auto relative border rounded-md mb-5">
                    <table className="table-auto w-full">
                        <colgroup>
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "75%" }} />
                            <col style={{ width: "15%" }} />
                        </colgroup>
                        <thead className="text-gray-600 bg-gray-100">
                            <tr className="whitespace-nowrap [&>th]:px-2 [&>th]:py-2 [&>th]:font-semibold">
                                <th className="rounded-tl-md">Id</th>
                                <th>Truyện</th>
                                <th className="rounded-tr-md">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {status === "authenticated" &&
                                (listBook ? (
                                    listBook?.map((book, index) => {
                                        // const typeBook = calculateTypeBook(book?.type);
                                        return (
                                            <tr
                                                key={book?.bookId}
                                                className="[&>td]:px-2 [&>td]:py-2 divide-x"
                                            >
                                                <td className="text-center">
                                                    {book?.bookId}
                                                </td>
                                                <td className="">
                                                    <div className="flex">
                                                        <div className="w-20 h-28 flex-shrink-0 rounded-md border overflow-hidden mr-2">
                                                            <Image
                                                                unoptimized
                                                                loading="lazy"
                                                                width={100}
                                                                height={200}
                                                                alt=""
                                                                className={`w-20 h-28 object-cover ${
                                                                    !isShow &&
                                                                    "blur-xl"
                                                                }`}
                                                                src={`${book?.thumbnail}`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="mb-2 hover:underline line-clamp-2">
                                                                <strong className="text-base">
                                                                    <Link
                                                                        href={`${book?.link}`}
                                                                        prefetch={
                                                                            false
                                                                        }
                                                                        target="_blank"
                                                                    >
                                                                        {
                                                                            book?.title
                                                                        }
                                                                    </Link>
                                                                </strong>
                                                            </div>
                                                            <div>
                                                                <span className="mr-3">Type:{" "}</span>
                                                                <strong className={clsx(
                                                                    "py-1 px-2 rounded-sm uppercase text-sm",
                                                                    {
                                                                        // "text-white bg-blue-600": book?.type === "",
                                                                        // "text-white bg-pink-600": book?.type === "",
                                                                        // "text-white bg-violet-600": book?.type === "",
                                                                        // "text-white bg-green-600": book?.type === "",
                                                                        // "text-white bg-red-600": book?.type === "",
                                                                        // "text-white bg-orange-600": book?.type === "",
                                                                    }
                                                                )}>
                                                                    {
                                                                        book?.type
                                                                    }
                                                                </strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    className={`${
                                                        book?.isAdd
                                                            ? "pointer-events-none opacity-50"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleAddBook({
                                                                id: book?.bookId,
                                                                url: book?.link,
                                                            })
                                                        }
                                                        className={`h-10 px-5 text-white bg-blue-600 rounded-md min-w-20 flex items-center justify-center mx-auto`}
                                                    >
                                                        {isAction ===
                                                        `loading_crawl_book_${book?.bookId}` ? (
                                                            <IconLoadingSpin />
                                                        ) : (
                                                            "Thêm"
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <SkeletonCrawlLatestBooks count={20} />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CrawlListBookTemplate;
