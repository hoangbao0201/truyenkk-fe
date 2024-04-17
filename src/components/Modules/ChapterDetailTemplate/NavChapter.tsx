"use client";

import Link from "next/link";
import {
    useEffect,
    useRef,
    useState,
} from "react";
import dynamic from "next/dynamic";

import IconHouse from "../Icons/IconHouse";
import IconListUl from "../Icons/IconListUl";
import IconAngleDown from "../Icons/IconAngleDown";
import IconAnglesLeft from "../Icons/IconAnglesLeft";
import IconAnglesRight from "../Icons/IconAnglesRight";
import { GetChaptersProps } from "@/services/chapter.services";

const BoxListChapter = dynamic(() => import("./BoxListChapter"), { ssr: false })

interface NavChapterProps {
    prev: string | null;
    next: string | null;
    title: string;
    slug: string;
    bookId: number;
    chapterNumber: number;
    chapters: GetChaptersProps[];
}
const NavChapter = ({
    bookId,
    title,
    slug,
    prev,
    next,
    chapters,
    chapterNumber,
}: NavChapterProps) => {
    const paginationRef = useRef<HTMLDivElement>(null);
    const paginationFakeRef = useRef<HTMLDivElement>(null);

    const [isFixed, setIsFixed] = useState(false);
    const [isListChapter, setIsListChapter] = useState(false);

    // Scroll Show/Hidden row options chapter
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition =
                window.pageYOffset || document.documentElement.scrollTop;

            if (paginationRef.current && paginationFakeRef.current) {
                const targetNavPosition = paginationRef?.current?.offsetTop;
                const targetNavFakePosition =
                    paginationFakeRef?.current?.offsetTop;

                if (
                    targetNavFakePosition === 0 &&
                    scrollPosition > targetNavPosition
                ) {
                    setIsFixed(true);
                } else if (
                    targetNavFakePosition !== 0 &&
                    scrollPosition < targetNavFakePosition
                ) {
                    setIsFixed(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Tìm vị trí của chương hiện tại trong mảng
    // const currentIndex = chapters?.findIndex(
    //     (item) => item.chapterNumber === chapterNumber
    // );

    // Kiểm tra xem có thể tiến hoặc lui không
    const canGoForward = chapterNumber < chapters.length;
    const canGoBackward = chapterNumber > 1;

    // useEffect(() => {
    //     if(virtuosoRef.current) {
    //         virtuosoRef.current.scrollToIndex({
    //             index: 0,
    //             align: "start",
    //             behavior: "smooth"
    //         });
    //     }
    // }, [])

    return (
        <>
            <div
                ref={paginationFakeRef}
                className={`h-[46px] w-full ${isFixed ? "block" : "hidden"}`}
            ></div>
            <div
                ref={paginationRef}
                className={`bg-gray-100 dark:bg-slate-700 select-none ${
                    isFixed
                        ? "z-10 fixed top-0 left-0 right-0 md:px-6 px-3"
                        : "rounded-md px-3 md:mx-3"
                }`}
            >
                <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto w-full flex items-center justify-center py-1 space-x-2">
                    <Link href={`${"/"}`} title="Trang chủ">
                        <div className="hover:bg-gray-200 hover:dark:bg-gray-600 px-2 h-[36px] rounded-md">
                            <IconHouse
                                size={22}
                                className="fill-red-600 h-[36px] mx-auto"
                            />
                        </div>
                    </Link>
                    <Link
                        href={`${prev ?? ""}`}
                        title=""
                        className={`${
                            canGoBackward ? "" : "pointer-events-none"
                        }`}
                    >
                        <div
                            className={`${
                                canGoBackward
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-gray-400"
                            } w-[36px] h-[36px] rounded-md`}
                        >
                            <IconAnglesLeft className="fill-white h-[36px] py-2 mx-auto" />
                        </div>
                    </Link>

                    <div
                        onClick={() => setIsListChapter(true)}
                        className="px-1 text-[15px] h-[38px] w-[133px] bg-white dark:text-black flex items-center justify-center space-x-2 rounded-md border hover:border-gray-400 select-none bg-gray-white cursor-pointer"
                    >
                        <span className="text-base">
                            Chapter {chapterNumber}
                        </span>{" "}
                        <IconAngleDown size={16} className="fill-gray-700" />
                    </div>

                    <Link
                        href={`${next ?? ""}`}
                        title=""
                        className={`${
                            canGoForward ? "" : "pointer-events-none"
                        }`}
                    >
                        <div
                            className={`${
                                canGoForward
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-gray-400"
                            } w-[36px] h-[36px] rounded-md`}
                        >
                            <IconAnglesRight className="fill-white h-[36px] py-2 mx-auto" />
                        </div>
                    </Link>
                    <Link href={`/truyen/${slug}-${bookId}`} title={title}>
                        <div className="hover:bg-gray-200 hover:dark:bg-gray-600 px-2 h-[36px] rounded-md">
                            <IconListUl
                                size={22}
                                className="fill-red-600 h-[36px] mx-auto"
                            />
                        </div>
                    </Link>
                    {/* <button title="Theo dõi" className="w-24 h-[36px] whitespace-nowrap text-center text-white leading-10 bg-green-600 hover:bg-green-700 rounded-md">
                        {"Theo dõi"}
                    </button> */}
                </div>
            </div>

            {isListChapter && chapters.length > 0 && (
                <BoxListChapter
                    bookId={bookId}
                    slug={slug}
                    countChapter={chapters.length}
                    chapterCurrent={chapterNumber}
                    isShow={isListChapter}
                    setIsShow={setIsListChapter}
                />
            )}
        </>
    );
};

export default NavChapter;

// const ItemWrapper = ({ children }: { children: ReactNode }) => {
//     return (
//         <>{children}</>
//     )
// }
// const ItemContainer = ({ children }: { children: ReactNode }) => {
//     return (
//         <>{children}</>
//     )
// }
// const ListContainer = ({ children }: { children: ReactNode }) => {
//     return (
//         <>{children}</>
//     )
// }
