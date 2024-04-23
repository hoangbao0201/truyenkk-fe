import { Metadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import { listIdToData } from "@/constants/data";
import bookService from "@/services/book.services";
import SearchBookTemplate from "@/components/Modules/SearchBookTemplate";

export async function generateMetadata({ searchParams }: SearchParamProps): Promise<Metadata> {
    const {
        genres = ""
    } = searchParams;
    let tag = "nâng cao";
    if (typeof genres === 'string') {
        const genreString = genres as keyof typeof listIdToData;
        if (listIdToData.hasOwnProperty(genreString)) {
            tag = listIdToData[genreString].title;
        }
    }
    
    return {
        title: `Tìm truyện ${tag} - TRUYENKK`,
        description: `Tìm truyện ❶✔️ Web đọc truyện tranh online lớn nhất - Truyện tranh hay nhất, chất lượng được cập nhật liên tục mỗi ngày`,
        openGraph: {
            title: `Tìm truyện ${tag} - TRUYENKK`,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}/tim-truyen`,
            type: "website",
            images: [],
            description: `Tìm truyện ❶✔️ Web đọc truyện tranh online lớn nhất - Truyện tranh hay nhất, chất lượng được cập nhật liên tục mỗi ngày`,
        },
        alternates: {
            canonical: `${MAIN_BASE_URL}/tim-truyen`,
        },
    };
}
export default async function SearchBookPage({
    searchParams,
}: SearchParamProps) {
    const {
        author: author = "",
        genres: genres = "",
        notgenres: notgenres = "",
        isShow: isShow = "false",
        page: page = "1",
    } = searchParams;

    const genresTag =
        typeof genres === "string" && genres !== "" ? genres.split(",") : [];
    const notgenresTag =
        typeof notgenres === "string" && notgenres !== ""
            ? notgenres.split(",")
            : [];
    let objNew: { [key: string]: "can" | "not" | "have" } = {};
    for (const key in genresTag) {
        objNew[genresTag[key]] = "have";
    }
    for (const key in notgenresTag) {
        objNew[notgenresTag[key]] = "not";
    }

    const { success, countBook, books } = await bookService?.findAll({
        query: `?genres=${genres}&notgenres=${notgenres}&take=24&skip=${
            ((Number(page) || 1) - 1) * 24
        }&author=${author}`,
        cache: "no-store"
    });

    // const jsonLdBreadcrumb = {
    //     "@context": "https://schema.org",
    //     "@type": "BreadcrumbList",
    //     itemListElement: [
    //         {
    //             "@type": "ListItem",
    //             position: 1,
    //             name: "TRUYENKK",
    //             item: MAIN_BASE_URL,
    //         },
    //         {
    //             "@type": "ListItem",
    //             position: 2,
    //             name: "✅Website chính thức",
    //             item: MAIN_BASE_URL + "/tim-truyen",
    //         },
    //     ],
    // };

    // const jsonQuerySearch = {
    //     "@context": "http://schema.org",
    //     "@type": "WebSite",
    //     url: MAIN_BASE_URL,
    //     potentialAction: {
    //         "@type": "SearchAction",
    //         target: `${MAIN_BASE_URL}/tim-truyen?keyword={search_term_string}`,
    //         "query-input": "required name=search_term_string",
    //     },
    // };

    return (
        <>
            {/* <Script
                id="bookdetail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdBreadcrumb),
                }}
            />
            <Script
                id="breadcrumb_bookdetail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonQuerySearch),
                }}
            /> */}
            <SearchBookTemplate
                tags={objNew}
                books={books}
                author={String(author) || ''}
                currentPage={Number(page) || 1}
                isShow={isShow === "false" ? false : true}
                countPage={Math.ceil( (Number(countBook) || 1) / 24 ) || 1}
            />
        </>
    );
}
