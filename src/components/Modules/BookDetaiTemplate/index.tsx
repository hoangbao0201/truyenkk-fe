import Link from "next/link";
import Image from "next/image";

import Follow from "./Follow";
import ListChapter from "./ListChapter";
import IconListUl from "../Icons/IconListUl";
import IconFileLines from "../Icons/IconFileLines";
import BoxHeading from "@/components/Share/BoxHeading";
import { GetBookProps } from "@/services/book.services";
import Breadcrumbs from "@/components/Share/BreadCrumbs";
import { GetCommentsProps } from "@/services/comment.services";
import ContentComment from "@/components/Share/ContentComment";
import { MAIN_BASE_URL } from "@/lib/config";
import IconFacebook from "../Icons/IconFacebook";
import IconTwitter from "../Icons/IconTwitter";
import IconPinterest from "../Icons/IconPinterest";
import IconWhatsapp from "../Icons/IconWhatsapp";
import { listIdToData } from "@/constants/data";

const listTagAdd = [
    {
        id: "nettruyen",
        title: "nettruyen",
    },
    {
        id: "manhwa",
        title: "manhwa",
    },
    {
        id: "manhua",
        title: "manhua",
    },
    {
        id: "truyen",
        title: "truyen",
    },
];

interface BookDetailTemplateProps {
    isRead?: string;
    book: GetBookProps;
    countComments: number;
    comments: GetCommentsProps[];
}
const BookDetailTemplate = ({
    isRead,
    book,
    countComments,
    comments,
}: BookDetailTemplateProps) => {
    return (
        <>
            <div className="py-2">
                <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md mx-auto shadow dark:shadow-none bg-white dark:bg-slate-800 md:rounded-md">
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
                                    <div className="mx-auto mb-1 rounded md:w-full w-60">
                                        {book ? (
                                            <Image
                                                unoptimized
                                                loading="lazy"
                                                src={
                                                    `https://d32phrebrjmlad.cloudfront.net/${book?.thumbnail}` ??
                                                    `/static/images/book_thumbnail.jpg`
                                                }
                                                width={400}
                                                height={400}
                                                alt={`Ảnh truyện ${""}`}
                                                className="w-[230px] h-[310px] object-cover rounded shadow"
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="px-3 md:mx-0 mx-auto mb-4 flex flex-col max-w-[600px]">
                                    <ul className="mb-4 space-y-3 [&>li]:flex [&>li>p]:font-semibold [&>li>p]:w-4/12 [&>li>div]:w-8/12">
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
                                                {book?.author?.name ? (
                                                    <Link
                                                        className="hover:underline text-blue-500"
                                                        href={`/tim-truyen?author=${book?.author?.name}`}
                                                        prefetch={false}
                                                    >
                                                        {book?.author?.name}
                                                    </Link>
                                                ) : (
                                                    "Đang cập nhật"
                                                )}
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
                                                {book?.tags.map(
                                                    (tag, index) => {
                                                        return (
                                                            <Link
                                                                key={tag?.tagId}
                                                                href={`/tim-truyen/${tag?.tagId}`}
                                                                title={
                                                                    tag?.tagId
                                                                }
                                                            >
                                                                <p className="px-2 h-6 block leading-6 text-sm text-white bg-slate-700 rounded-md">
                                                                    {listIdToData[
                                                                    tag?.tagId as keyof typeof listIdToData
                                                                ].title || ""}
                                                                </p>
                                                            </Link>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </li>
                                        <li>
                                            <p>Đăng bởi:</p>
                                            <div>TRUYENKK</div>
                                        </li>
                                        <li>
                                            <p>Chia sẽ lên</p>
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    title="Chi sẽ truyện lên Facebook"
                                                    target="_blank"
                                                    href={`https://www.facebook.com/sharer/sharer.php?u=${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`}
                                                >
                                                    <div className="h-10 leading-10 px-3 lg:[&>span]:block [&>span]:hidden rounded-md text-white flex items-center bg-blue-600">
                                                        <IconFacebook className="fill-white" />
                                                        <span className="ml-2">
                                                            Facebook
                                                        </span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    title="Chi sẽ truyện lên Twitter"
                                                    target="_blank"
                                                    href={`https://twitter.com/intent/tweet?url=${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`}
                                                >
                                                    <div className="h-10 leading-10 px-3 lg:[&>span]:block [&>span]:hidden rounded-md text-white flex items-center bg-blue-500">
                                                        <IconTwitter className="fill-white" />
                                                        <span className="ml-2">
                                                            Twitter
                                                        </span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    title="Chi sẽ truyện lên Pinterest"
                                                    target="_blank"
                                                    href={`https://www.pinterest.com/pin/create/button?url=${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`}
                                                >
                                                    <div className="h-10 leading-10 px-3 lg:[&>span]:block [&>span]:hidden rounded-md text-white flex items-center bg-red-600">
                                                        <IconPinterest className="fill-white" />
                                                        <span className="ml-2">
                                                            Pinterest
                                                        </span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    title="Chi sẽ truyện lên Whatsapp"
                                                    target="_blank"
                                                    href={`whatsapp://send?text=${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`}
                                                >
                                                    <div className="h-10 leading-10 px-3 lg:[&>span]:block [&>span]:hidden rounded-md text-white flex items-center bg-green-500">
                                                        <IconWhatsapp className="fill-white" />
                                                        <span className="ml-2">
                                                            Whatsapp
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="mb-2 flex items-center space-x-2">
                                        <Follow book={book} />
                                        <strong>
                                            {book?._count.usersFollow}
                                        </strong>
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
                                                <div className="text-center min-w-[130px] h-10 leading-10 text-lg rounded-md bg-red-500 border-red-500 hover:bg-red-600 dark:bg-emerald-500 hover:dark:bg-emerald-600 text-white">
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
                                                <div className="text-center min-w-[130px] h-10 leading-10 text-lg rounded-md bg-red-500 border-red-500 hover:bg-red-600 dark:bg-emerald-500 hover:dark:bg-emerald-600 text-white">
                                                    {" "}
                                                    Đọc mới nhất
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4 px-3">
                                <h2
                                    title="Nội dung"
                                    className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold flex items-center border-b border-red-600"
                                >
                                    <BoxHeading>
                                        <IconFileLines
                                            size={32}
                                            className="py-1 fill-white"
                                        />
                                    </BoxHeading>
                                    NỘI DUNG
                                </h2>
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
                                    là một bộ truyện nổi tiếng thuộc thể
                                    loại:{" "}
                                    {book?.tags
                                        .map((tag) => {
                                            return listIdToData[
                                                tag?.tagId as keyof typeof listIdToData
                                            ].title;
                                        })
                                        .join(", ")}{" "}
                                    được viết bởi tác giả{" "}
                                    {book?.author?.name || "đang cập nhật "} .
                                    Được cập nhật nhanh và đầy đủ nhất tại
                                    TRUYENKK. Bạn đọc đừng quên để lại bình luận
                                    và chia sẻ, ủng hộ TRUYENKK ra các chương
                                    mới nhất của truyện{" "}
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
                                <h2
                                    title="TỪ KHOÁN"
                                    className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold flex items-center border-b border-red-600"
                                >
                                    <BoxHeading>
                                        <IconFileLines
                                            size={32}
                                            className="py-1 fill-white"
                                        />
                                    </BoxHeading>
                                    TỪ KHOÁ
                                </h2>
                                <div className="flex flex-wrap gap-1">
                                    {listTagAdd.map((tagAdd) => {
                                        return (
                                            <Link
                                                key={tagAdd?.id}
                                                title={`${book?.title} ${tagAdd?.title}`}
                                                href={`/${book?.slug}-${tagAdd?.id}`}
                                                prefetch={false}
                                            >
                                                <div className="px-2 py-1 flex flex-wrap text-sm rounded-sm bg-gray-200 text-black dark:bg-[#c6d4df26] dark:text-[#c6d4df]">
                                                    <span className="">{book?.title.toLowerCase()}&nbsp;</span>
                                                    {tagAdd?.title}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="mb-4 px-3">
                                <h2
                                    title="Danh sách chương"
                                    className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold flex items-center border-b border-red-600"
                                >
                                    <BoxHeading>
                                        <IconListUl
                                            size={32}
                                            className="py-1 fill-white"
                                        />
                                    </BoxHeading>
                                    DANH SÁCH CHƯƠNG
                                </h2>
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
                                <ListChapter
                                    slug={book?.slug}
                                    bookId={book?.bookId}
                                    chapters={book?.chapters}
                                />
                            </div>
                        </article>
                    </div>

                    <ContentComment
                        isRead={!!isRead}
                        bookId={book?.bookId}
                        comments={comments}
                        countPage={Math.ceil((Number(countComments) || 1) / 8) || 1}
                    />
                </div>
            </div>
        </>
    );
};

export default BookDetailTemplate;
