import { API_BASE_URL } from "@/lib/config";

export interface CrawlBooksLatestProps {
    title: string
    thumbnail: string
    link: string
    type: string
    bookId: number
}
class CrawlService {
    async crawlBooksLatest({
        tag,
        token,
    }: {
        tag: string
        token: string;
    }): Promise<any> {
        try {
            const crawlBooksLatestRes = await fetch(
                `${API_BASE_URL}/api/crawl/books/latest?tag=${tag}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const crawlBooksLatest = await crawlBooksLatestRes.json();
            return crawlBooksLatest;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
    async crawlBook({
        url,
        type,
        token,
    }: {
        url: string;
        type: string;
        token: string;
    }): Promise<any> {
        try {
            const crawlBookRes = await fetch(
                `${API_BASE_URL}/api/crawl/book`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bookUrl: url,
                        type: type,
                    }),
                }
            );
            const crawlBook = await crawlBookRes.json();
            return crawlBook;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
    async updateBook({
        bookId,
        title,
        anotherName,
        author,
        token,
    }: {
        bookId: number;
        title: string;
        anotherName: string;
        author: string;
        token: string;
    }): Promise<any> {
        try {
            const crawlBookRes = await fetch(
                `${API_BASE_URL}/api/books/${bookId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title, anotherName, author
                    }),
                }
            );
            const crawlBook = await crawlBookRes.json();
            return crawlBook;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
    async crawlChapters({
        url,
        type,
        take,
        token,
    }: {
        url: string;
        type: string;
        take?: number;
        token: string;
    }): Promise<any> {
        try {
            const crawlBookRes = await fetch(
                `${API_BASE_URL}/api/crawl/chapter`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bookUrl: url,
                        take: take || 1,
                        type: type
                    }),
                }
            );
            const crawlBook = await crawlBookRes.json();
            return crawlBook;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async crawlChaptersByUrl({
        chapterUrl,
        type,
        take,
        bookId,
        token,
    }: {
        chapterUrl: string;
        type: string;
        take: number;
        bookId: number;
        token: string;
    }): Promise<any> {
        try {
            const crawlBookRes = await fetch(
                `${API_BASE_URL}/api/crawl/chapter/url`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chapterUrl: chapterUrl,
                        take: take,
                        type: type,
                        bookId: bookId,
                    }),
                }
            );
            const crawlBook = await crawlBookRes.json();
            return crawlBook;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
}

const crawlService = new CrawlService();

export default crawlService;
