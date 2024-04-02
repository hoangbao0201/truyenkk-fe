import { MetadataRoute } from "next";
import { listTag } from "@/constants/data";
import { MAIN_BASE_URL } from "@/lib/config";
import bookService from "@/services/book.services";
import chapterService from "@/services/chapter.services";

interface BooksProps {
    bookId: string
    slug: string
    createdAt: Date
    updatedAt: Date
}
interface ChaptersProps {
    bookId: number
    chapterNumber: number
    book: {
        slug: string
    }
    createdAt: Date
    updatedAt: Date
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const { books }: { books: BooksProps[] } = await bookService.findAllSeo({});
    const { chapters }: { chapters: ChaptersProps[] } = await chapterService.findAllSeo({});

    const listBooks: MetadataRoute.Sitemap = books ? books.map((book) => ({
        url: `${MAIN_BASE_URL}/truyen/${book?.slug}-${book?.bookId}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.5,
    })) : [];
    const listChapters: MetadataRoute.Sitemap = chapters ? chapters.map((chapter) => ({
        url: `${MAIN_BASE_URL}/truyen/${chapter?.book.slug}-${chapter?.bookId}/chapter-${chapter?.chapterNumber}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.5,
    })) : [];
    const listTags: MetadataRoute.Sitemap = listTag.map((tag) => ({
        url: `${MAIN_BASE_URL}/tim-truyen?genres=${tag?.id}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.5,
    }));
    
    return [
        {
            url: `${MAIN_BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 1,
        },
        {
            url: `${MAIN_BASE_URL}/tim-truyen`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.5,
        },
        {
            url: `${MAIN_BASE_URL}/hot`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.5,
        },
        {
            url: `${MAIN_BASE_URL}/auth/login`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.5,
        },
        {
            url: `${MAIN_BASE_URL}/auth/register`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.5,
        },
        {
            url: `${MAIN_BASE_URL}/chinh-sach-bao-mat`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.5,
        },
        ...listTags,
        ...listBooks,
        ...listChapters
    ];
}
