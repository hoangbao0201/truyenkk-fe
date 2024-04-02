import { Metadata, ResolvingMetadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import HomeTemplate from "@/components/Modules/HomeTemplate";
import bookService, { GetBooksProps } from "@/services/book.services";

type Props = {
    params: {
        page: string
    };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const previousImages = (await parent).openGraph?.images || [];
    return {
        title: `Đọc Truyện Tranh Online - Website chính thức - TRUYENKK`,
        description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚100 triệu thành viên tại TRUYENKK`,
        openGraph: {
            title: `Đọc Truyện Tranh Online - Website chính thức - TRUYENKK`,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}`,
            type: "website",
            images: [`${MAIN_BASE_URL}/static/images/bg_page.jpg`, ...previousImages,],
            description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚100 triệu thành viên tại TRUYENKK`,
        },
        alternates: {
            canonical: `${MAIN_BASE_URL}`,
        },
    };
}
export default async function HomePage({ searchParams }: SearchParamProps) {
    const { page: page = "" } = searchParams;
    const currentPage = Number(page) || 1;
    const { countBook, books }: { countBook: number, books: GetBooksProps[] } = await bookService.findAll({
        query: `?take=24&skip=${(currentPage-1)*24}`,
        revalidate: 5*60
    });

    const jsonLd = books?.map((book, index) => {
        return ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`,
        })
    })

    return (
        <>
            <div className="lg:w-8/12 px-3 mb-5">
                <HomeTemplate
                    countPage={Math.ceil( (Number(countBook) || 1) / 24 ) || 1}
                    currentPage={currentPage}
                    books={books}
                />
            </div>
        </>
    );
}
