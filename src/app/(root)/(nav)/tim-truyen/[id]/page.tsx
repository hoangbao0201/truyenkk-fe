import { Metadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import { listIdToData } from "@/constants/data";
import bookService from "@/services/book.services";
import BookTypeTemplate from "@/components/Modules/BookTypeTemplate";

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
        title: `Tìm truyện ${tag} - HENTAIKK`,
        description: `Tìm truyện ❶✔️ Web đọc truyện tranh online lớn nhất - Truyện tranh hay nhất, chất lượng được cập nhật liên tục mỗi ngày`,
        openGraph: {
            title: `Tìm truyện ${tag} - HENTAIKK`,
            siteName: `HENTAIKK`,
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
    params,
    searchParams,
}: SearchParamProps) {
    const { id } = params;
    const { page: page = "1", } = searchParams;

    const { success, countBook, books } = await bookService?.findAll({
        query: `?genres=${id}&take=24&skip=${
            ((Number(page) || 1) - 1) * 24
        }`,
        cache: "no-store"
    });

    return (
        <>
            <BookTypeTemplate
                genre={id}
                books={books}
                currentPage={Number(page) || 1}
                countPage={Math.ceil( (Number(countBook) || 1) / 24 ) || 1}
            />
        </>
    );
}
