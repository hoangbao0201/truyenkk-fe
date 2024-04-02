import { API_BASE_URL } from "@/lib/config";
import { GetChaptersProps } from "./chapter.services";

export type GetBooksProps = {
    bookId: number;
    title: string;
    slug: string;
    nameImage: string;
    thumbnail: string | null;
    isGreatBook: boolean;
    chapters: { chapterNumber: number; createdAt: Date }[];
};
export type GetBookProps = {
    bookId: number;
    title: string;
    slug: string;
    description: string | null;
    status: number;
    anotherName: string;
    nameImage: string;
    thumbnail: string | null;
    tags: { bookId: number; tagId: string }[];
    author: {
        name: string
        authorId: number
    };
    isGreatBook: boolean;
    postedBy: {
        avatarUrl: null;
        role: {
            roleId: 1 | 2 | 3;
            roleName: "admin" | "editor" | "guest";
        };
        name: string;
        username: string;
    };
    chapters: GetChaptersProps[];
    createdAt: Date;
    updatedAt: Date;
    _count: {
        chapters: number;
        userViews: number;
        usersFollow: number;
    };
};
class BookService {
    async findAll({
        query,
        revalidate,
        cache,
    }: {
        query?: string;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const bookRes = await fetch(
                `${API_BASE_URL}/api/books${query ? query : ""}`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                }
            );
            const books = await bookRes.json();
            return books;
        } catch (error) {
            return {
                success: false,
                message: "error get books",
                error: error,
            };
        }
    }

    async findAllBookFollow({
        query,
        token,
        revalidate,
        cache,
    }: {
        query?: string;
        token: string;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const bookRes = await fetch(
                `${API_BASE_URL}/api/books/follow${query ? query : ""}`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token || ""}`,
                    },
                }
            );
            const books = await bookRes.json();
            return books;
        } catch (error) {
            return {
                success: false,
                message: "error get books",
                error: error,
            };
        }
    }

    async findOne({
        bookId,
        revalidate,
        cache
    }: {
        bookId: number;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
                method: "GET",
                cache: cache,
                next: {
                    revalidate: revalidate,
                },
            });
            const book = await bookRes.json();
            return book;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async increaseView({
        bookId,
        chapterNumber,
        token
    }: {
        bookId: number;
        chapterNumber: number;
        token?: string;
    }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/books/increase/views/${bookId}/${chapterNumber}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token || ""}`,
                },
            });
            const book = await bookRes.json();
            return book;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    // Follow Book
    async actionFollow({
        type,
        bookId,
        token
    }: {
        type: "follow" | "unfollow"
        bookId: number;
        token: string;
    }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/books/follow/${bookId}?type=${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token || ""}`,
                },
            });
            const book = await bookRes.json();
            return book;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    // Follow Book
    async checkFollow({
        bookId,
        token,
        revalidate,
        cache
    }: {
        bookId: number;
        token: string;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/books/follow/${bookId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token || ""}`,
                },
                cache: cache,
                next: {
                    revalidate: revalidate,
                },
            });
            const book = await bookRes.json();
            return book;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
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
            const booksRes = await fetch(
                `${API_BASE_URL}/api/books/seo`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                }
            );
            const books = await booksRes.json();
            return books;
        } catch (error) {
            return {
                success: false,
                message: "error get books",
                error: error,
            };
        }
    }
}

const bookService = new BookService();

export default bookService;
