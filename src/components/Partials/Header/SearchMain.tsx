
"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useDebounceValue } from "usehooks-ts";

import Modal from "@/components/Share/Modal";
import IconClose from "@/components/Modules/Icons/IconClose";
import IconSearch from "@/components/Modules/Icons/IconSearch";
import bookService, { GetBooksProps } from "@/services/book.services";
import IconChevronRight from "@/components/Modules/Icons/IconChevronRight";

const SearchMain = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isModalSearch, setIsModalSearch] = useState<boolean>(false);

    const [valueSearch, setValueSearch] = useState("");
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
    const [resultSearch, setResultSearch] = useState<GetBooksProps[]>([]);
    const [valueSearchDebounce] = useDebounceValue(valueSearch, 500);

    const eventOnchangeValueSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value);
    };

    const eventSearch = async (text: string) => {
        try {
            const booksRes = await bookService.findAll({ query: `?q=${text}&take=10` });

            if (booksRes?.success) {
                setResultSearch(booksRes?.books);
            }

            setIsLoadingSearch(false);
        } catch (error) {
            setIsLoadingSearch(false);
        }
    };

    useEffect(() => {
        if (valueSearchDebounce === "") {
            setResultSearch([]);
        } else if (valueSearchDebounce) {
            setIsLoadingSearch(true);
            eventSearch(valueSearchDebounce);
        }
    }, [valueSearchDebounce]);

    return (
        <>
            <div
                onClick={() => {
                    setIsModalSearch(true);
                    inputRef.current?.focus();
                }}
                className="hidden md:block px-4 py-2 text-base bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white/50 border hover:border-blue-400 rounded-md cursor-text select-none w-full max-w-sm"
            >
                Tìm kiếm...
            </div>
            <button
                title="Tìm kiếm"
                onClick={() => setIsModalSearch(true)}
                className="w-10 block cursor-pointer md:hidden bg-gray-100 dark:bg-slate-800/70 rounded-full outline-blue-600 outline-2 hover:outline-dashed"
            >
                <IconSearch size={18} className="h-10 mx-auto dark:stroke-white" />
            </button>
            <Modal
                title="Tìm kiếm"
                isOpen={isModalSearch}
                setIsOpen={setIsModalSearch}
                size="large"
            >
                <div className="mb-4">
                    <div className="border-b flex items-center">
                        <i>
                            <IconSearch className="" />
                        </i>
                        <input
                            ref={inputRef}
                            value={valueSearch}
                            onChange={eventOnchangeValueSearch}
                            className="w-full outline-none border-none py-2 px-2 bg-transparent"
                            placeholder="Tên bài viết..."
                        />
    
                        {valueSearchDebounce !== "" &&
                            (isLoadingSearch ? (
                                <span className="loading-search"></span>
                            ) : (
                                <i
                                    onClick={() => {
                                        setValueSearch("");
                                        setResultSearch([]);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                                >
                                    <IconClose className="w-5 h-5 block dark:fill-white" />
                                </i>
                            ))}
                    </div>
                    <div style={{ height: "2px" }} className={clsx(
                        "loading-bar",
                            {
                                "before:content-none": !isLoadingSearch
                            }
                        )}>
                    </div>
                </div>
                <ul className="flex-auto overflow-y-auto md:px-2">
                    {resultSearch.map((book) => {
                        return (
                            <li
                                key={book?.bookId}
                                className="rounded-md mb-2 bg-gray-50 dark:bg-slate-800/70 group hover:bg-slate-400 hover:text-white border"
                            >
                                <Link
                                    aria-label={`${book?.title}`}
                                    onClick={() => setIsModalSearch(false)}
                                    href={`/truyen/${book?.slug}-${book?.bookId}`}
                                >
                                    <div className="flex items-center px-3 py-3">
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
                                            <p className="font-medium text-lg line-clamp-1">{book?.title}</p>
                                            <div>Số chương: {book?.chapters.length>0 ? book?.chapters[0].chapterNumber : 0}</div>
                                        </div>
                                        <IconChevronRight
                                            size={15}
                                            className="ml-auto fill-gray-800 group-hover:fill-white"
                                        />
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Modal>
        </>
    );
};

export default SearchMain;
