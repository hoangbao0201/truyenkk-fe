import { Metadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import HomeTemplate from "@/components/Modules/HomeTemplate";
import bookService, { GetBooksProps } from "@/services/book.services";

type Props = {
    params: {
        page: string
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    return {
        title: `Đọc Truyện Tranh Online - Website chính thức - TRUYENKK`,
        description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚100 triệu thành viên tại TRUYENKK`,
        openGraph: {
            title: `Đọc Truyện Tranh Online - Website chính thức - TRUYENKK`,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}`,
            type: "website",
            images: [],
            description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚100 triệu thành viên tại TRUYENKK`,
        },
        alternates: {
            canonical: `${MAIN_BASE_URL}`,
        },
    };
}
export default async function HotPage({ searchParams }: SearchParamProps) {
    const { page: page = "" } = searchParams;
    const currentPage = Number(page) || 1;
    const { countBook, books }: { countBook: number, books: GetBooksProps[] } = await bookService.findAll({
        query: `?take=24&skip=${(currentPage-1)*24}&isGreatBook=true`,
        revalidate: 5*10
    });

    // const jsonLd = books?.map((book, index) => {
    //     return ({
    //         '@type': 'ListItem',
    //         position: index + 1,
    //         url: `${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`,
    //     })
    // })

    return (
        <>
            {/* <Script
                id="Hotpage"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": "ItemList",
                    itemListElement: jsonLd
                })}}
            /> */}
            <div className="lg:w-8/12 px-3 mb-5">
                <HomeTemplate
                    countPage={Math.floor( (Number(countBook) || 1) / 24 )}
                    currentPage={currentPage}
                    books={books}
                />
            </div>
        </>
    );
}
