import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import ListChapter from "./ListChapter";
import { listIdToData } from "@/constants/data";
import IconFileLines from "../Icons/IconFileLines";
import { GetBookProps } from "@/services/book.services";
import Breadcrumbs from "@/components/Share/BreadCrumbs";
import { GetCommentsProps } from "@/services/comment.services";
import ContentComment from "@/components/Share/ContentComment";
import Follow from "./Follow";
import BoxHeading from "@/components/Share/BoxHeading";
import IconListUl from "../Icons/IconListUl";

interface BookDetailTemplateProps {
    isRead?: string
    book: GetBookProps;
    comments: GetCommentsProps[];
}
const BookDetailTemplate = ({ isRead, book, comments }: BookDetailTemplateProps) => {
    
    return (
        <>
            <div className="py-2">
                <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto bg-white dark:bg-slate-900 md:rounded-md shadow">
                    <div className="py-4">
                        <Breadcrumbs
                            listBreadcrumbs={[
                                {
                                    title: book?.title,
                                    slug: `/truyen/${book?.slug}-${book?.bookId}`,
                                },
                            ]}
                            className="mx-3 mb-3 pb-3"
                        />
                        <article>
                            <div className="md:flex">
                                <div className="px-3 mb-4">
                                    <div className="mx-auto w-[200px] h-[250px] bg-gray-100 rounded">
                                        {book ? (
                                            <Image
                                                unoptimized
                                                loading="lazy"
                                                src={
                                                    `https://d32phrebrjmlad.cloudfront.net/${book?.thumbnail}` ??
                                                    `/static/images/book_thumbnail.jpg`
                                                }
                                                width={300}
                                                height={300}
                                                alt={`Ảnh truyện ${""}`}
                                                className="w-[200px] h-[250px] object-cover rounded shadow"
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="px-3 md:mx-0 mx-auto mb-4 flex flex-col max-w-[600px]">
                                    <ul className="mb-4 space-y-2 [&>li]:flex [&>li>p]:font-semibold [&>li>p]:w-4/12 [&>li>div]:w-8/12">
                                        <li>
                                            <h1
                                                className="text-2xl lg:text-start text-center md:mx-0 mx-auto font-semibold mb-3"
                                                title=""
                                            >
                                                {book?.title}
                                            </h1>
                                        </li>
                                        <li>
                                            <p>Tác giả</p>
                                            <div className="">
                                                {book?.author?.name ? <Link className="hover:underline text-blue-500" href={`/tim-truyen?author=${book?.author?.name}`} prefetch={false}>{book?.author?.name}</Link> : "Đang cập nhật"}
                                            </div>
                                        </li>
                                        <li>
                                            <p>Lượt xem</p>
                                            <div className="">
                                                {book?._count.userViews || 0}
                                            </div>
                                        </li>
                                        <li className="">
                                            <p>Thể loại</p>
                                            <div className="flex flex-wrap gap-x-1 gap-y-2">
                                                {book?.tags.map((tag, index) => {
                                                    return (
                                                        <Link
                                                            key={tag?.tagId}
                                                            href={`/tim-truyen/${tag?.tagId}`}
                                                            title={tag?.tagId}
                                                        >
                                                            <p className="px-2 h-6 block leading-6 text-sm text-white bg-slate-700 rounded-md">
                                                                {listIdToData[
                                                                    tag?.tagId as keyof typeof listIdToData
                                                                ].title || ""}
                                                            </p>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="mb-2 flex items-center space-x-2">
                                        <Follow book={book}/>
                                        <strong>{book?._count.usersFollow}</strong>
                                        <span>Lượt theo dõi</span>
                                    </div>

                                    {book?.chapters.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            <Link
                                                href={`/truyen/${book?.slug}-${
                                                    book?.bookId
                                                }/chapter-${
                                                    book?.chapters[-1]
                                                        ?.chapterNumber || 1
                                                }`}
                                                title=""
                                            >
                                                <div className="btn bg-yellow-500 border-yellow-500 hover:bg-yellow-600 dark:bg-emerald-500 hover:dark:bg-emerald-600 text-white">
                                                    Đọc từ đầu
                                                </div>
                                            </Link>
                                            <Link
                                                href={`/truyen/${book?.slug}-${
                                                    book?.bookId
                                                }/chapter-${
                                                    book?.chapters[0]
                                                        ?.chapterNumber || 1
                                                }`}
                                                title=""
                                            >
                                                <div className="btn bg-yellow-500 border-yellow-500 hover:bg-yellow-600 dark:bg-emerald-500 hover:dark:bg-emerald-600 text-white">
                                                    {" "}
                                                    Đọc mới nhất
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4 px-3">
                                <h3
                                    title="Nội dung"
                                    className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold flex items-center border-b border-red-600"
                                >
                                    <BoxHeading>
                                        <IconFileLines size={32} className="py-1 fill-white"/>
                                    </BoxHeading>
                                    NỘI DUNG
                                </h3>
                                <p>
                                    <Link
                                        className="text-blue-600 dark:text-gray-100 hover:underline"
                                        href={`/`}
                                    >
                                        Truyện tranh
                                    </Link>{" "}
                                    <Link
                                        className="text-blue-500 hover:underline"
                                        href={`/truyen/${book?.slug}-${book?.bookId}`}
                                        title={book?.title}
                                    >
                                        {book?.title}
                                    </Link>{" "}
                                    {book?.description &&
                                    book?.description.length > 0
                                        ? book?.description
                                        : " được cập nhật nhanh và đầy đủ nhất tại TRUYENKK. Bạn đọc đừng quên để lại bình luận và chia sẻ, ủng hộ TRUYENKK ra các chương mới nhất của truyện"}{" "}
                                    <Link
                                        className="text-blue-500 hover:underline"
                                        href={`/truyen/${book?.slug}-${book?.bookId}`}
                                        title={book?.title}
                                    >
                                        {book?.title}
                                    </Link>
                                </p>
                            </div>
                            <div className="mb-4 px-3">
                                <h3
                                    title="Danh sách chương"
                                    className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold flex items-center border-b border-red-600"
                                >
                                    <BoxHeading>
                                        <IconListUl size={32} className="py-1 fill-white"/>
                                    </BoxHeading>
                                    DANH SÁCH CHƯƠNG
                                </h3>
                                <div className="grid grid-cols-12 mb-1">
                                    <div className="col-span-5 whitespace-nowrap">
                                        Số chương
                                    </div>
                                    <div className="col-span-4 whitespace-nowrap text-center">
                                        Cập nhật
                                    </div>
                                    <div className="col-span-3 whitespace-nowrap text-center">
                                        Xem
                                    </div>
                                </div>
                                <Suspense>
                                    <ListChapter
                                        slug={book?.slug}
                                        bookId={book?.bookId}
                                        chapters={book?.chapters}
                                    />
                                </Suspense>
                            </div>
                        </article>
                    </div>

                    <div>
                        <ContentComment
                            isRead={!!isRead}
                            bookId={book?.bookId}
                            comments={comments}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetailTemplate;
