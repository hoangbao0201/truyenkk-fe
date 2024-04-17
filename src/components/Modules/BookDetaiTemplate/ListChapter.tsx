"use client";

import Link from "next/link";
import convertTime from "@/utils/convertTime";
import { GetChaptersProps } from "@/services/chapter.services";
import { useState } from "react";

interface ListChapterProps {
    slug: string;
    bookId: number;
    chapters: GetChaptersProps[];
}
const ListChapter = ({ slug, bookId, chapters }: ListChapterProps) => {
    const [isShow, setIsShow] = useState(chapters?.length > 20 ? false : true);

    return (
        <nav
            className={`relative py-2 px-2 border rounded-md ${
                isShow ? "" : "max-h-[400px] overflow-hidden"
            }`}
        >
            <ul className={`divide-y min-h-5`}>
                {chapters?.length ? chapters.map((chapter, index) => {
                    return (
                        <li
                            className="grid grid-cols-12"
                            key={chapter?.chapterNumber}
                        >
                            <div className="col-span-5 whitespace-nowrap my-1">
                                <Link
                                    href={`/truyen/${slug}-${bookId}/chapter-${
                                        chapter?.chapterNumber || 1
                                    }`}
                                    title=""
                                    className="visited:text-gray-400"
                                >
                                    <div className="px-1 py-1 hover:bg-gray-100 hover:dark:bg-gray-500 rounded-md">{chapters.length>1 ? "Chapter " + chapter?.chapterNumber : "Oneshot"}</div>
                                </Link>
                            </div>
                            <div className="col-span-4 whitespace-nowrap text-center py-2">{`${convertTime(
                                chapter?.createdAt
                            )}`}</div>
                            <div className="col-span-3 whitespace-nowrap text-center py-2">
                                {chapter?._count?.views || 0}
                            </div>
                        </li>
                    );
                }) : (
                    <div className="text-center py-2 bg-gray-200 dark:bg-slate-600 rounded-md">Chưa có chương nào!</div>
                )}
            </ul>
            {!isShow && (
                <div
                    onClick={() => setIsShow(true)}
                    style={{
                        boxShadow:
                            "0px 0px 0px -100px rgba(255, 255, 255, 0.098), 0px 0px 201px 155px #ffffff54;",
                    }}
                    className="absolute bottom-1 left-1 right-1 py-2 rounded-md  hover:underline text-center bg-slate-100 dark:bg-slate-600 border border-gray-300 select-none cursor-pointer"
                >
                    Xem thêm
                </div>
            )}
        </nav>
    );
};

export default ListChapter;
