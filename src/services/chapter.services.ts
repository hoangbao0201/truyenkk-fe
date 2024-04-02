import { API_BASE_URL } from "@/lib/config";

export interface GetChapterDetailProps {
    bookId: number;
    chapterNumber: number;
    nameImage: string
    content: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    book: {
        title: string;
        slug: string;
        anotherName: string;
        author: string | null;
        postedBy: {
            name: string;
            username: string;
        };
    };
}
export interface GetChaptersProps {
    title: string;
    chapterNumber: number;
    _count: {
        views: number;
    };
    createdAt: Date;
    updatedAt: Date;
}
class ChapterService {
    async findOne({
        chapterNumber,
        bookId,
        revalidate,
        cache,
    }: {
        chapterNumber: number;
        bookId: number;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const chapterRes = await fetch(
                `${API_BASE_URL}/api/chapters/${chapterNumber}/${bookId}`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                }
            );
            const chapter = await chapterRes.json();
            return chapter;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
    async findAll({
        query,
        revalidate,
        cache,
    }: {
        query: string;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const chaptersRes = await fetch(
                `${API_BASE_URL}/api/chapters${query ? query : ""}`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                }
            );
            const chapters = await chaptersRes.json();
            return chapters;
        } catch (error) {
            return {
                success: false,
                message: "error chapters successful",
                error: error,
            };
        }
    }

    // SEO
    async findAllSeo({
        revalidate,
        cache,
    }: {
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const chaptersRes = await fetch(
                `${API_BASE_URL}/api/chapters/seo`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                }
            );
            const chapters = await chaptersRes.json();
            return chapters;
        } catch (error) {
            return {
                success: false,
                message: "error get books",
                error: error,
            };
        }
    }
}

const chapterService = new ChapterService();

export default chapterService;
