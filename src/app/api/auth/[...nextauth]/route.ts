
import { JWT } from "next-auth/jwt";
import { API_BASE_URL } from "@/lib/config";
import authService from "@/services/auth.services";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(API_BASE_URL + "/api/auth/refresh", {
        method: "POST",
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
    });

    const response = await res.json();

    return {
        ...token,
        backendTokens: response,
    };
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "login-basic",
            name: "Username And Password",
            credentials: {
                accout: {
                    label: "Accout",
                    type: "text",
                    placeholder: "",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.accout || !credentials?.password) return null;
                const { accout, password } = credentials;
                const loginRes = await authService.login({ accout, password });
                if (!loginRes.success) {
                    return null;
                }

                return loginRes?.data;
            },
        }),
        CredentialsProvider({
            id: "login-token",
            name: "Token",
            credentials: {
                token: {
                    label: "Token",
                    type: "text",
                    placeholder: "",
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.token) return null;
                const { token } = credentials;
                const loginRes = await authService.loginWithToken(token);
            
                if (!loginRes.success) {
                    return null;
                }

                return loginRes?.data;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if(trigger === "update") {
                console.log("trigger: ", trigger);
                console.log("user: ", user);
                console.log("session: ", session);
                return {
                    ...session
                }
            }
            if (user) {
                return { ...token, ...user }
            };

            if (new Date().getTime() < token.backendTokens.expiresIn)
                return token;

            return await refreshToken(token);
        },
        async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
