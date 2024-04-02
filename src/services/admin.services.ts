import { API_BASE_URL } from "@/lib/config";

export interface AdminGetBooksProps {
    bookId: number,
    title: string,
    type: string
    nameImage: string
    thumbnail?: string,
    scrapedUrl: string,
    isGreatBook: boolean,
    _count: {
        chapters: number
    }
}
export interface AdminGetUsersProps {
    userId: number
    name: string
    username: string
    email: string
    rank: number
}
class AdminService {
    async findAllBooks({ query, token }: { query?: string, token: string }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/admin/books${query ? query : ""}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store"
            });
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
    
    async updateBook({ book, token }: { book?: { title: string, isGreatBook: boolean }, token: string }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/admin/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({...book})
            });
            const bookR = await bookRes.json();
            return bookR;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async changeCloudBook({ bookId, email, token }: { bookId: number, email: string, token: string }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/admin/change/cloud/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bookId: bookId,
                    email: email,
                })
            });
            const bookR = await bookRes.json();
            return bookR;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async changeCloudChapters({ take, bookId, email, token }: { take: number, bookId: number, email: string, token: string }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/admin/change/cloud/chapters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bookId: bookId,
                    email: email,
                    take: take,
                })
            });
            const bookR = await bookRes.json();
            return bookR;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async deleteBook({ bookId, token }: { bookId: number, token: string }): Promise<any> {
        try {
            const bookRes = await fetch(`${API_BASE_URL}/api/admin/books/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const book = await bookRes.json();
            return book;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async deleteAccoutCloud({ name, token }: { name: string, token: string }): Promise<any> {
        try {
            const accoutRes = await fetch(`${API_BASE_URL}/api/admin/accout/cloud/${name}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const accout = await accoutRes.json();
            return accout;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async getViews({ token }: { token: string }): Promise<any> {
        try {
            const viewsRes = await fetch(`${API_BASE_URL}/api/admin/books/views`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const views = await viewsRes.json();
            return views;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async getUsers({ token }: { token: string }): Promise<any> {
        try {
            const usersRes = await fetch(`${API_BASE_URL}/api/admin/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const users = await usersRes.json();
            return users;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async findAllAccoutCloud({ token }: { token: string }): Promise<any> {
        try {
            const usersRes = await fetch(`${API_BASE_URL}/api/admin/accout/cloud`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const users = await usersRes.json();
            return users;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

    async createAccoutCloud({ accout, token }: { accout: { email: string, name: string, key: string, secret: string }, token: string }): Promise<any> {
        try {
            const usersRes = await fetch(`${API_BASE_URL}/api/admin/accout/cloud`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...accout
                })
            });
            const users = await usersRes.json();
            return users;
        } catch (error) {
            return {
                success: false,
                message: "error update book",
                error: error,
            };
        }
    }

}

const adminService = new AdminService();

export default adminService;
