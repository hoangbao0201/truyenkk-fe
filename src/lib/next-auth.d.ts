import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            userId: number,
            name: string,
            username: string,
            email: string,
            description: null | "",
            rank: number,
            item: null | number
            avatarUrl: string | null,
            createdAt: Date,
            updatedAt: Date,
            roleId: number,
            role: {
                roleId: number,
                roleName: "admin" | "editor" | "guest"
            }
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            userId: number,
            name: string,
            username: string,
            email: string,
            description: null | "",
            rank: number,
            item: null | number
            avatarUrl: string | null,
            createdAt: Date,
            updatedAt: Date,
            roleId: number,
            role: {
                roleId: number,
                roleName: "admin" | "editor" | "guest"
            }
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
