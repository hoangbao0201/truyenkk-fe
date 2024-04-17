"use client"

import Link from "next/link";

import IconAnglesLeft from "../Icons/IconAnglesLeft";
import IconAnglesRight from "../Icons/IconAnglesRight";
import { GetChaptersProps } from "@/services/chapter.services";

const NavNavigationBottom =  ({
    slug,
    bookId,
    chapters,
    chapterNumber,
}: {
    slug: string,
    bookId: number,
    chapterNumber: number,
    chapters: GetChaptersProps[]
}) => {
    // Tìm vị trí của chương hiện tại trong mảng
    const currentIndex = chapters.findIndex(item => item.chapterNumber === chapterNumber);

    // Kiểm tra xem có thể tiến hoặc lui không
    const canGoForward = currentIndex < chapters.length - 1;
    const canGoBackward = currentIndex > 0;

    return (
        <div className="flex items-center justify-center space-x-2 bg-white dark:bg-slate-900 rounded-md py-4">
            <Link href={`/truyen/${slug}-${bookId}/chapter-${chapterNumber - 1}`} title="">
                <div className={`${canGoBackward ? "bg-red-600 hover:bg-red-700" : "bg-gray-400"} flex items-center px-2 h-[36px] text-white rounded-md`}>
                    <IconAnglesLeft className="fill-white h-[36px] py-2 mx-auto" />
                    Chapter
                </div>
            </Link>
            <Link href={`/truyen/${slug}-${bookId}/chapter-${chapterNumber + 1}`} title="">
                <div className={`${canGoForward ? "bg-red-600 hover:bg-red-700" : "bg-gray-400"} flex items-center px-2 h-[36px] text-white rounded-md`}>
                    Chapter
                    <IconAnglesRight className="fill-white h-[36px] py-2 mx-auto" />
                </div>
            </Link>
        </div>
    )
}

export default NavNavigationBottom;