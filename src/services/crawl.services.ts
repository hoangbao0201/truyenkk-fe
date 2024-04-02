import { API_BASE_URL } from "@/lib/config";

class CrawlService {
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
}

const crawlService = new CrawlService();

export default crawlService;
