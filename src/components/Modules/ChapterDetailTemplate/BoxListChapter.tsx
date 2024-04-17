import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import Link from "next/link";
import Modal from "@/components/Share/Modal";

interface BoxListChapterProps {
    slug: string;
    bookId: number;
    countChapter: number;
    chapterCurrent: number;
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}
const BoxListChapter = ({
    isShow,
    setIsShow,
    slug,
    bookId,
    countChapter,
    chapterCurrent,
}: BoxListChapterProps) => {
    const [chapterSearch, setChapterSearch] = useState("");

    const eventOnchangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const chapter = e.target.value;

        setChapterSearch(chapter);
    };

    useEffect(() => {
        if(isShow && chapterCurrent) {
            const chapterElement = document.getElementById(`chapter-${chapterCurrent}`);

            if(chapterElement) {
                chapterElement.scrollIntoView({ behavior: 'instant' });
            }
        }
    }, [isShow])

    return (
        <div>
            <Modal
                size="medium"
                title="Danh sách truyện"
                isOpen={isShow}
                setIsOpen={setIsShow}
            >
                <div className="mb-3">
                    <input
                        value={chapterSearch}
                        onChange={eventOnchangeValue}
                        placeholder="Nhập số chap, ví dụ: 100"
                        className="border px-2 py-1 h-[35px] rounded-sm outline-none focus:border-blue-500"
                    />
                </div>
                <div className="h-[500px] overflow-y-auto">
                    <div className="grid lg:grid-cols-4 grid-cols-3 gap-1 pr-3 pb-10">
                        {Array.from(
                            { length: countChapter },
                            (_, index) => index + 1
                        ).map((chap) => {
                            return (
                                <Link
                                    key={chap}
                                    prefetch={false}
                                    id={`chapter-${chap}`}
                                    href={`/truyen/${slug}-${bookId}/chapter-${chap}`}
                                    style={{ display: `${chapterSearch.trim() === "" || String(chap).includes(String(chapterSearch))  ? "" : "none"}` }}
                                >
                                    <div
                                        className={`${
                                            chap === chapterCurrent
                                                ? "border-red-700" : ""
                                        } hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 w-full border text-center line-clamp-1`}
                                    >
                                        Chương {chap}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BoxListChapter;