import { Metadata, ResolvingMetadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import commentService from "@/services/comment.services";
import bookService, { GetBookProps } from "@/services/book.services";
import BookDetailTemplate from "@/components/Modules/BookDetaiTemplate";
import { listTagSeo } from "@/constants/data";

type Props = {
    params: {
        slugBook: string;
    };
};
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slugBook } = params;

    const cvBookId = slugBook.substring(slugBook.lastIndexOf("-") + 1);
    const { book }: { book: GetBookProps } = await bookService.findOne({
        bookId: +cvBookId,
        revalidate: 10*60
    });
    const previousImages = (await parent).openGraph?.images || [];

    const title = `${book?.title || ""}${
        book?.chapters[0]?.chapterNumber ? " [Tới Chap " + book?.chapters[0]?.chapterNumber + "] " : " "
    }Tiếng Việt - TRUYENKK`;
    const description = `❶✔️ Đọc truyện tranh ${book?.title}${
        book?.anotherName ? " [Tác giả: " + book?.anotherName + "] " : " "
    }Tiếng Việt bản đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại TRUYENKK`;

    return {
        title: title,
        description: description,
        category: "TRUYEN",
        keywords: listTagSeo,
        publisher: "TRUYENKK",
        openGraph: {
            title: title,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`,
            type: "article",
            description: description,
            images: [
                "https://d32phrebrjmlad.cloudfront.net/" +
                    book?.thumbnail || "",
                ...previousImages,
            ],
            tags: listTagSeo,
            authors: "TRUYENKK",
        },
    };
}
export default async function HomePage({ params, searchParams }: Props & { searchParams: any }) {
    const { slugBook } = params;
    const { isRead } = searchParams;

    const cvBookId = slugBook.substring(slugBook.lastIndexOf("-") + 1);
    const { book }: { book: GetBookProps } = await bookService.findOne({
        bookId: +cvBookId,
        revalidate: 2*60
    });
    const { countComments, comments } = await commentService.findAll({
        query: `?bookId=${cvBookId}&otherId=${isRead || ""}&take=8&skip=0`,
        revalidate: isRead ? undefined : 2*60
    });

    return (
        <>
            <BookDetailTemplate book={book} countComments={countComments} comments={comments} isRead={isRead}/>
        </>
    );
}
