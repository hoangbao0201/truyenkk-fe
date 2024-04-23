import { API_BASE_URL } from "@/lib/config";

export interface GetTopMembersProps {
    userId: number;
    username: string;
    avatarUrl: null | string;
    name: string;
    rank: number;
    role: {
        roleName: "admin" | "guest" | "editor";
    };
}
export interface GetUserDetailProps {
    userId: number,
    username: string,
    name: string,
    avatarUrl: null | string,
    createdAt: Date,
    description: null | string,
    rank: number,
    role: {
        roleName: "admin" | "guest" | "editor";
    }
}
class UserServices {
    async findOne({
        username,
        cache,
        revalidate,
    }: {
        username: string;
        cache?: RequestCache;
        revalidate?: number;
    }): Promise<any> {
        try {
            const userRes = await fetch(`${API_BASE_URL}/api/users/${username}`, {
                method: "GET",
                cache: cache,
                next: {
                    revalidate: revalidate,
                },
            });
            const user = await userRes.json();
            return user;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async updateName({
        name,
        token
    }: {
        name: string
        token: string
    }): Promise<any> {
        try {
            const userRes = await fetch(`${API_BASE_URL}/api/users/update/name`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: name })
            });
            const user = await userRes.json();
            return user;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async topUsers({
        cache,
        revalidate,
    }: {
        cache?: RequestCache;
        revalidate?: number;
    }): Promise<any> {
        try {
            const usersRes = await fetch(`${API_BASE_URL}/api/users/top`, {
                method: "GET",
                cache: cache,
                next: {
                    revalidate: revalidate,
                },
            });
            const users = await usersRes.json();
            return users;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
}

const userService = new UserServices();

export default userService;
