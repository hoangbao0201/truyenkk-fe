import { API_BASE_URL } from "@/lib/config";

export interface GetCommentsProps {
    bookId: number,
    chapterNumber: null | number,
    commentId: number,
    commentText: string
    parentId: null | number,
    createdAt: Date,
    updatedAt: Date,
    _count: {
        replyComments: number
    },
    sender: {
        userId: number,
        name: string,
        username: string,
        rank: number,
        item: number | null
        role: {
            roleId: number,
            roleName: "admin" | "editor" | "guest"
        },
        avatarUrl: null | string
    }
}
export interface GetNotificationsProps {
    commentId: number,
    bookId: number,
    parentId: number,
    isRead: boolean
    chapterNumber: null | number,
    book: {
        title: string
    },
    sender: {
        name: string,
        avatarUrl: null | string
    },
    createdAt: Date
}
class CommentService {
    async addComment({
        data,
        token,
    }: {
        data: {
            bookId: number;
            chapterNumber?: number;
            parentId?: number;
            receiverId?: number;
            commentText: string;
        };
        token: string;
    }): Promise<any> {
        const { receiverId, parentId, bookId, chapterNumber, commentText } = data;

        try {
            const commentRes = await fetch(`${API_BASE_URL}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bookId,
                    chapterNumber,
                    receiverId,
                    parentId,
                    commentText,
                }),
            });
            const comment = await commentRes.json();
            return comment;
        } catch (error) {
            return {
                success: false,
                message: "error comment successful",
                error: error,
            };
        }
    }

    async findAll({
        query,
        revalidate,
        cache
    }: {
        query?: string;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const commentRes = await fetch(
                `${API_BASE_URL}/api/comments${query ? query : ""}`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                }
            );
            const comment = await commentRes.json();
            return comment;
        } catch (error) {
            return {
                success: false,
                message: "error comments successful",
                error: error,
            };
        }
    }

    async findAllNotification({
        token,
        revalidate,
        cache
    }: {
        token: string;
        revalidate?: number;
        cache?: RequestCache;
    }): Promise<any> {
        try {
            const commentsRes = await fetch(
                `${API_BASE_URL}/api/comments/notification`,
                {
                    method: "GET",
                    cache: cache,
                    next: {
                        revalidate: revalidate,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const comments = await commentsRes.json();
            return comments;
        } catch (error) {
            return {
                success: false,
                message: "error comments successful",
                error: error,
            };
        }
    }

    async readComment({
        commentId,
        token,
    }: {
        commentId: number;
        token: string;
    }): Promise<any> {
        try {
            const commentRes = await fetch(
                `${API_BASE_URL}/api/comments/read/${commentId || ''}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const comment = await commentRes.json();
            return comment;
        } catch (error) {
            return {
                success: false,
                message: "error comments successful",
                error: error,
            };
        }
    }

    async delete({
        commentId,
        token,
    }: {
        commentId: number;
        token: string;
    }): Promise<any> {
        try {
            const commentRes = await fetch(
                `${API_BASE_URL}/api/comments/${commentId || ''}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const comment = await commentRes.json();
            return comment;
        } catch (error) {
            return {
                success: false,
                message: "error delete comments",
                error: error,
            };
        }
    }

}

const commentService = new CommentService();

export default commentService;
