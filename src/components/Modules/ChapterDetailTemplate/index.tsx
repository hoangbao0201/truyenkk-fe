import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";

import NavIncreaseView from "./NavIncreaseView";
import NavNavigationBottom from "./NavNavigationBottom";
import Breadcrumbs from "@/components/Share/BreadCrumbs";
import formatFullDateTime from "@/utils/formatFullDateTime";
import { GetCommentsProps } from "@/services/comment.services";
import ContentComment from "@/components/Share/ContentComment";
import { GetChapterDetailProps, GetChaptersProps } from "@/services/chapter.services";

const NavChapter = dynamic(() => import("./NavChapter"), { ssr: false });


interface ChapterDetailTemplateProps {
    chapter: GetChapterDetailProps;
    chapters: GetChaptersProps[]
    comments: GetCommentsProps[]
}
const ChapterDetailTemplate = ({
    chapter,
    chapters,
    comments
}: ChapterDetailTemplateProps) => {

    return (
        <>
            <div className="bg-black py-2">
                <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto w-full">

                    <div className="py-3 rounded-md bg-white dark:bg-slate-900">
                        <Breadcrumbs
                            listBreadcrumbs={[
                                { title: "Thể loại", slug: "/tim-truyen" },
                                {
                                    title: chapter?.book.title,
                                    slug: `/truyen/${chapter?.book.slug}-${chapter?.bookId}`,
                                },
                                {
                                    title: "Chapter " + chapter?.chapterNumber,
                                    slug: `/truyen/${chapter?.book.slug}-${chapter?.bookId}/chapter-${chapter?.chapterNumber}/${chapter?.bookId}`,
                                },
                            ]}
                            className="px-3 mb-3"
                        />
                        <div className="px-3 mb-3">
                            <h1 className="md:text-2xl text-xl font-semibold">
                                <Link
                                    href={`/truyen/${chapter?.book.slug}-${chapter?.bookId}`}
                                >
                                    {chapter?.book.title}
                                </Link>
                                <span> - Chapter {chapter?.chapterNumber}</span>
                            </h1>
                            <i>
                                [Cập nhật lúc:{" "}
                                {formatFullDateTime(chapter?.createdAt)}]
                            </i>
                        </div>
                        <div className="px-3 mx-3 mb-4 py-1 rounded-md text-center border-[#bce8f1] text-[#31708f] bg-[#d9edf7]">
                            <em>
                                Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển
                                chapter
                            </em>
                        </div>

                        <div className="h-[46px]">
                            <Suspense>
                                <NavChapter
                                    bookId={chapter?.bookId}
                                    title={chapter?.book.title}
                                    slug={chapter?.book.slug}
                                    chapterNumber={chapter?.chapterNumber}
                                    prev={`/truyen/${chapter?.book.slug}-${
                                        chapter?.bookId
                                    }/chapter-${chapter?.chapterNumber - 1}`}
                                    next={`/truyen/${chapter?.book.slug}-${
                                        chapter?.bookId
                                    }/chapter-${chapter?.chapterNumber + 1}`}
                                    chapters={chapters}
                                />
                            </Suspense>
                        </div>

                    </div>

                    <div className="my-2 relative flex justify-center space-x-3">
                        <div className="max-w-[300px] h-[250px] bg-gray-100 rounded-md">
                            {/* <AdsAdsterraBanner /> */}
                            {/* <AdsClickAduBanner id="2021417"/> */}
                        </div>
                        <div className="max-w-[300px] h-[250px] bg-gray-100 rounded-md md:block hidden">
                            {/* <AdsAdsterraBanner /> */}
                            {/* <AdsClickAduBanner id="2021464"/> */}
                        </div>
                    </div>
                    
                    {/* <div className="my-2 relative flex justify-center space-x-3">
                        <div className="max-w-[300px] h-[225px]"><AdsNative id="5c0d7708-23cd-4542-872f-0c0f9275fbf9"/></div>
                        <div className="max-w-[300px] h-[225px] md:block hidden"><AdsNative id="06e10c5c-9a6d-4c09-afd6-978d12ddc5fb"/></div>
                    </div> */}
                    
                    <div className="my-3">
                        {chapter?.content &&
                        JSON.parse(chapter?.content).map(
                            (item: any, index: any) => {
                                return (
                                    <div
                                        key={`${chapter?.bookId}-${chapter?.chapterNumber}-${index}`}
                                        style={{
                                            background:
                                                "URL('/static/images/chapter_load.gif') center center no-repeat",
                                        }}
                                        className="relative text-center min-h-[200px] w-full px-1"
                                    >
                                        <Image
                                            unoptimized
                                            loading="lazy"
                                            width={500}
                                            height={500}
                                            src={`https://d32phrebrjmlad.cloudfront.net/${item}`}
                                            alt={`Ảnh truyện`}
                                            className="max-w-[950px] w-full mx-auto object-cover opacity-1"
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>

                    {/* <div className="my-2 relative flex justify-center space-x-3">
                        <div className="max-w-[300px] h-[225px]"><AdsNative id="e811594b-733b-4466-a904-704e33fa6b2b"/></div>
                    </div> */}

                    <div className="my-2 relative flex justify-center space-x-3">
                        <div className="max-w-[300px] h-[250px] bg-gray-100 rounded-md">
                            {/* <AdsAdsterraBanner /> */}
                            {/* <AdsClickAduBanner id="2021465"/> */}
                        </div>
                        <div className="max-w-[300px] h-[250px] bg-gray-100 rounded-md md:block hidden">
                            {/* <AdsAdsterraBanner /> */}
                            {/* <AdsClickAduBanner id="2021466"/> */}
                        </div>
                    </div>

                    <Suspense>
                        <NavNavigationBottom
                            chapters={chapters}
                            bookId={chapter?.bookId}
                            slug={chapter?.book.slug}
                            chapterNumber={chapter?.chapterNumber}
                        />
                    </Suspense>

                    <div className="my-2 relative flex justify-center space-x-3">
                        <div className="max-w-[300px] h-[250px] bg-gray-100 rounded-md">
                            {/* <AdsAdsterraBanner /> */}
                            {/* <AdsClickAduBanner id="2022992"/> */}
                        </div>
                        <div className="max-w-[300px] h-[250px] bg-gray-100 rounded-md md:block hidden">
                            {/* <AdsAdsterraBanner /> */}
                            {/* <AdsClickAduBanner id="2022993"/> */}
                        </div>
                    </div>

                    {/* <div className="my-2 relative flex justify-center space-x-3">
                        <div className="max-w-[300px] h-[225px] mx-auto"><AdsNative id="7c9ec7f3-fb8b-47ca-ab7b-5e83f92884cd"/></div>
                    </div> */}

                    <div className="bg-white dark:bg-slate-900 rounded-md">
                        <ContentComment
                            comments={comments}
                            bookId={chapter?.bookId}
                            chapterNumber={chapter?.chapterNumber}
                        />
                    </div>
                </div>

            </div>
            <Suspense>
                <NavIncreaseView bookId={chapter?.bookId} chapterNumber={chapter?.chapterNumber}/>
            </Suspense>
        </>
    );
};

export default ChapterDetailTemplate;

