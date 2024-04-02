"use client";

import Link from "next/link";
import Image from "next/image";

import convertTime from "@/utils/convertTime";
import { GetBooksProps } from "@/services/book.services";

interface CardBookProps {
    book: GetBooksProps;
}
const CardBook = ({ book }: CardBookProps) => {
    return (
        <figure>
            <div className="">
                <div className="relative text-center rounded-md border overflow-hidden mb-2">
                    {book?.isGreatBook && (
                        <span className="absolute w-10 h-5 top-1 left-1 right-0 rounded-sm bg-[#FF2F5F] text-white text-sm font-bold">
                            HOT
                        </span>
                    )}
                    <Link
                        href={`/truyen/${book?.slug}-${book?.bookId}`}
                        title={`Truyện tranh ${book?.title}`}
                        className="align-middle"
                    >
                        <Image
                            key={`${book?.bookId}`}
                            unoptimized
                            // blurDataURL={blurDataURL}
                            // blurDataURL="https://res.cloudinary.com/practicaldev/image/fetch/s--fLWi9apI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eyjy0b7kxpgomdbl6ruh.png"
                            // placeholder="blur"
                            loading="lazy"
                            src={
                                `https://d32phrebrjmlad.cloudfront.net/${book?.thumbnail}` ??
                                "/static/images/book_thumbnail.jpg"
                            }
                            width={175}
                            height={238}
                            sizes="(max-width: 175px) 100vw, 175px"
                            alt={`Truyện tranh ${book?.title}`}
                            className="pt-0 w-full object-cover bg-gray-100 dark:bg-gray-500 align-middle"
                        />
                    </Link>
                </div>
                <div className="">
                    <Link
                        href={`/truyen/${book?.slug}-${book?.bookId}`}
                        title={book?.title}
                    >
                        <h3 className="text-lg line-clamp-2 font-semibold">
                            {book?.title}
                        </h3>
                    </Link>
                    <ul className="mt-2">
                        {book?.chapters.map((chapter, index) => {
                            return (
                                <li
                                    key={index}
                                    className="flex justify-between items-center whitespace-nowrap line-clamp-1 space-x-1 mb-1"
                                >
                                    <Link
                                        href={`/truyen/${book?.slug}-${
                                            book?.bookId
                                        }/chapter-${
                                            chapter?.chapterNumber || 1
                                        }`}
                                        title={`Chapter ${chapter?.chapterNumber}`}
                                        className="visited:text-gray-400"
                                    >
                                        <div className="py-[2px] text-[15px] hover:underline hover:text-blue-500">
                                            {book?.chapters.length > 1
                                                ? "Chapter " +
                                                  chapter?.chapterNumber
                                                : "Oneshot"}
                                        </div>
                                    </Link>
                                    <p className="text-[11px] italic text-gray-400">{`${convertTime(
                                        chapter?.createdAt
                                    )}`}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </figure>
    );
};

export default CardBook;
