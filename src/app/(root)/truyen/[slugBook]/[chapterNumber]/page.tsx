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
            revalidate: 2 * 60,
        });
    const { chapters }: { chapters: GetChaptersProps[] } =
        await chapterService.findAll({
            query: `?bookId=${cvBookId}`,
            revalidate: 2 * 60,
        });
    const { comments, countComments } = await commentService.findAll({
        query: `?bookId=${cvBookId}&chapterNumber=${cvChapterNumber}&take=8&skip=0`,
        revalidate: 2 * 60,
    });

    return (
        <>
            <ChapterDetailTemplate
                chapter={chapter}
                chapters={chapters || []}
                comments={comments}
                countComments={countComments}
            />
        </>
    );
};

export default ChapterDetailPage;
