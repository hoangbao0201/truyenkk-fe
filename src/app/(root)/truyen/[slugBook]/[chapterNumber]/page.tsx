import { Metadata, ResolvingMetadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import commentService from "@/services/comment.services";
import ChapterDetailTemplate from "@/components/Modules/ChapterDetailTemplate";
import chapterService, {
    GetChapterDetailProps, GetChaptersProps,
} from "@/services/chapter.services";

type Props = {
    params: { slugBook: string; chapterNumber: string };
};
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { chapterNumber, slugBook } = params;

    const cvBookId = slugBook.substring(slugBook.lastIndexOf("-") + 1);
    const cvChapterNumber = chapterNumber.substring(
        chapterNumber.lastIndexOf("-") + 1
    );

    const { chapter } = await chapterService.findOne({
        bookId: +cvBookId,
        chapterNumber: +cvChapterNumber,
        revalidate: 10 * 60,
    });
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${chapter?.book.title || ""} Chap ${
            chapter?.chapterNumber
        } Next Chap ${chapter?.chapterNumber + 1} - TRUYENKK`,

        description: `❶✔️ Đọc truyện tranh ${chapter?.book.title} Chap ${chapter?.chapterNumber} Tiếng Việt bản đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại TRUYENKK`,
        openGraph: {
            title: `${chapter?.book.title || ""} Chap ${
                chapter?.chapterNumber
            } Next Chap ${chapter?.chapterNumber + 1} - TRUYENKK`,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}/truyen/${chapter?.book.slug}-${chapter?.bookId}/chapter-${chapter?.chapterNumber}`,
            type: "article",
            description: `❶✔️ Đọc truyện tranh ${chapter?.book.title} Chap ${chapter?.chapterNumber} Tiếng Việt bản đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại TRUYENKK`,
            images: [
                "https://d32phrebrjmlad.cloudfront.net/" +
                    chapter?.book.thumbnail || "",
                ...previousImages,
            ],
        },
    };
}
const ChapterDetailPage = async ({ params }: Props) => {
    const { chapterNumber, slugBook } = params;

    const cvBookId = slugBook.substring(slugBook.lastIndexOf("-") + 1);
    const cvChapterNumber = chapterNumber.substring(
        chapterNumber.lastIndexOf("-") + 1
    );

    const { chapter }: { chapter: GetChapterDetailProps } =
        await chapterService.findOne({
            bookId: +cvBookId,
            chapterNumber: +cvChapterNumber,
            revalidate: 10 * 60,
        });
    const { chapters }: { chapters: GetChaptersProps[] } =
        await chapterService.findAll({
            query: `?bookId=${cvBookId}`,
            revalidate: 10 * 60,
        });
    const { comments } = await commentService.findAll({
        query: `?bookId=${cvBookId}&chapterNumber=${cvChapterNumber}`,
        revalidate: 10 * 60,
    });

    // const jsonLdBook = {
    //     "@context": "http://schema.org",
    //     "@type": "Article",
    //     mainEntityOfPage: `${MAIN_BASE_URL}/truyen/${chapter?.book.slug}-${chapter?.bookId}/chapter-${chapter?.chapterNumber}`,
    //     headline: `${chapter?.book.title} Chapter ${chapter?.chapterNumber}`,
    //     datePublished: chapter?.createdAt,
    //     dateModified: chapter?.updatedAt,
    //     description: `❶✔️ Đọc truyện tranh ${chapter?.book.title} Chap ${chapter?.chapterNumber} Tiếng Việt bản đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại TRUYENKK`,
    //     author: { "@type": "Person", name: "TRUYENKK" },
    //     // publisher: {
    //     //     "@type": "Organization",
    //     //     name: "TRUYENKK",
    //     //     logo: {
    //     //         "@type": "ImageObject",
    //     //         url: "//st.nettruyenbb.com/data/logos/logo-nettruyen.png",
    //     //         width: 150,
    //     //         height: 30,
    //     //     },
    //     // },
    //     // image: {
    //     //     "@type": "ImageObject",
    //     //     url: "https://st.nettruyenbb.com/data/comics/188/dai-quan-gia-la-ma-hoang-904.jpg",
    //     //     height: 904,
    //     //     width: 696,
    //     // },
    // };
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
    //         {
    //             "@type": "ListItem",
    //             position: 3,
    //             name: chapter?.book.title,
    //             item: MAIN_BASE_URL + "/truyen/" + slugBook,
    //         },
    //         {
    //             "@type": "ListItem",
    //             position: 4,
    //             name: `${chapter?.book.title} Chapter ${chapter?.chapterNumber}`,
    //             item:
    //                 MAIN_BASE_URL +
    //                 "/truyen/" +
    //                 slugBook +
    //                 "/chapter-" +
    //                 chapter?.chapterNumber,
    //         },
    //     ],
    // };

    return (
        <>
            {/* <Script
                id="chapter_bookdetail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBook) }}
            />
            <Script
                id="breadcrumb_bookdetail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdBreadcrumb),
                }}
            /> */}
            <ChapterDetailTemplate
                chapter={chapter}
                chapters={chapters || []}
                comments={comments}
            />
        </>
    );
};

export default ChapterDetailPage;
