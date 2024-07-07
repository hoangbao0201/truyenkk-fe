import { Metadata, ResolvingMetadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import JoinBookTemplate from "@/components/Modules/JoinBookTemplate";
import bookService, {
    GetBookProps,
    GetBooksProps,
} from "@/services/book.services";
import { listTagSeo } from "@/constants/data";

export async function generateMetadata(
    { params, searchParams }: SearchParamProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = params;

    const mang = id.split("-");
    const tag = mang[mang.length - 1];
    const slug = mang.slice(0, -1).join("-");

    const { page: page = "" } = searchParams;
    const currentPage = Number(page) || 1;
    const { countBook, books }: { countBook: number; books: GetBooksProps[] } =
        await bookService.findAll({
            query: `?slug=${
                slug ? slug : listTagSeo.includes(tag) ? "" : tag
            }&take=24&skip=${(currentPage - 1) * 24}`,
            revalidate: 5 * 60,
        });

    const isOnlyBook = books.length === 1;
    const title = (
        isOnlyBook
            ? books[0].slug === slug
                ? books[0].title + " " + tag
                : slug.replaceAll("-", " ") + " " + tag
            : slug.replaceAll("-", " ") + " " + tag
    ).trim();

    const previousImages = (await parent).openGraph?.images || [];
    const thumbnail = isOnlyBook ? books[0].thumbnail : "";

    const description = `❶✔️ Đọc truyện tranh ${title}${
        isOnlyBook
            ? " [Tới chap " + ( books[0].chapters.length > 0 ? books[0].chapters[0].chapterNumber : 0 ) + "] "
            : " "
    }Tiếng Việt bản đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại TRUYENKK`;

    return {
        title: `${title} - TRUYENKK`,
        description: description,
        authors: { name: "TRUYENKK", url: "https://TRUYENKK.vip" },
        category: "HENTAI",
        keywords: listTagSeo,
        publisher: "TRUYENKK",
        openGraph: {
            title: `${title} - TRUYENKK`,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}/${id}`,
            type: "article",
            description: description,
            images: [
                `${ thumbnail ? "https://d32phrebrjmlad.cloudfront.net/" + thumbnail : "" }`,
                ...previousImages,
            ],
            tags: listTagSeo,
            authors: "TRUYENKK",
        },
    };
}

export default async function JoinBookPage({
    params,
    searchParams,
}: SearchParamProps) {
    const { id } = params;

    const mang = id.split("-");
    const tag = mang[mang.length - 1];
    const slug = mang.slice(0, -1).join("-");

    const { page: page = "" } = searchParams;
    const currentPage = Number(page) || 1;
    const { countBook, books }: { countBook: number; books: GetBooksProps[] } =
        await bookService.findAll({
            query: `?slug=${
                slug ? slug : listTagSeo.includes(tag) ? "" : tag
            }&take=24&skip=${(currentPage - 1) * 24}`,
            revalidate: 5 * 60,
        });

    const title =
        books?.length === 1
            ? books[0].slug === slug
                ? books[0].title + " " + tag
                : slug.replaceAll("-", " ") + " " + tag
            : slug.replaceAll("-", " ") + " " + tag;

    return (
        <>
            <JoinBookTemplate
                tag={tag}
                slug={slug}
                title={title}
                books={books}
                currentPage={currentPage}
                countPage={Math.ceil((Number(countBook) || 1) / 24) || 1}
            />
        </>
    );
}
